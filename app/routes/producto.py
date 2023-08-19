from datetime import datetime, timezone
from flask import Blueprint, jsonify, request
from ..models.models import Producto, db, ProductoSquema

producto_scope = Blueprint("producto", __name__)

producto_schema = ProductoSquema()
productos_schema = ProductoSquema(many=True)


# CREATE
@producto_scope.route("/crear", methods=["POST"])
def crear_producto():
    """
    La funcion crear producto () recibe un json para la creacion de un nuevo producto
    return Json Object confirmando la creacion de un producto o el fallo

    '
        Formato de Creacion de un producto:
        {
        "pr_name": "cemento andino",
        "pr_tipo": "construccion",
        "pr_bprice": 26.20,
        "pr_sprice": 29.20,
        "pr_quantity": 100
        }
    '
    """
    pr_name = request.json["pr_name"].upper().strip()
    pr_tipo = request.json["pr_tipo"].upper().strip()
    pr_bprice = request.json["pr_bprice"]
    pr_sprice = request.json["pr_sprice"]
    pr_quantity = request.json["pr_quantity"]

    if Producto.query.filter_by(pr_name=pr_name).first():
        return {"message": "El producto ya existe", "producto": pr_name}, 200

    producto = Producto(pr_name, pr_tipo, pr_bprice, pr_sprice, pr_quantity)
    try:
        db.session.add(producto)
        db.session.commit()
    except Exception as ex:
        error = ex.args[0]
        db.session.rollback()
        return {
            "message": "No se pudo crear el producto",
            "producto": pr_name,
            "error": error,
        }, 500

    return (
        jsonify(
            {
                "message": "Se creo el producto correctamente",
                "producto": producto_schema.dump(producto),
            }
        ),
        201,
    )


# CREATE
@producto_scope.route("/crear/varios", methods=["POST"])
def crear_productos():
    """
    La funcion crear_productos() recibe una lista de productos en formato json,
    la cual se carga en la variable request_data, para  ir agregando los productos
    a la base de datos si este no existe en anteriormente.

    Return : un Json Object en donde nos informa sobre los productos cargados y los productos
    ya existentes que no se cargaron.
    '
        Formato de Creacion de una Lista de Productos:
        [
            {
                "pr_name": "cemento andino",
                "pr_tipo": "construccion",
                "pr_bprice": 26.20,
                "pr_sprice": 29.20,
                "pr_quantity": 100
            },
            {
                "pr_name": "ladrillos para construcción",
                "pr_tipo": "construccion",
                "pr_bprice": 0.50,
                "pr_sprice": 0.75,
                "pr_quantity": 500
            }
        ]
    '
    """
    request_data = request.get_json()
    response = {"message": "Los productos que ya existen", "productos": []}
    productos_cargados = []
    for rq in request_data:
        pr_name = rq["pr_name"].upper().strip()
        pr_tipo = rq["pr_tipo"].upper().strip()
        pr_bprice = rq["pr_bprice"]
        pr_sprice = rq["pr_sprice"]
        pr_quantity = rq["pr_quantity"]

        if Producto.query.filter_by(pr_name=pr_name).first():
            response["productos"].append(pr_name)
            continue
        producto = Producto(pr_name, pr_tipo, pr_bprice, pr_sprice, pr_quantity)
        try:
            db.session.add(producto)
            db.session.commit()
        except Exception as e:
            error = e.args[0]
            return {
                "message": "No se pudo crear el producto",
                "producto": pr_name,
                "error": error,
            }, 500
        productos_cargados.append(producto.get_name())
    return (
        jsonify(
            {
                "message": "Se crearon los productos correctamente",
                "cargados": len(productos_cargados),
                "productos": productos_cargados,
            },
            response,
        ),
        201,
    )


# READ
@producto_scope.route("/buscar/<string:texto>", methods=["GET"])
def buscar_producto(texto):
    """
    La función de buscar producto recibe un valor string texto,
    en cual sera buscado en la base de datos en la lista de productos
    que contengan un contenido similar
    texto : "palabra_palabra"
    Para la obtencion del texto orignal reemplazar _ por " "

    return Json object con los productos similares

    '
        Formato para buscar un producto:
         http://127.0.0.1:5000/producto/buscar/pegamento_
         {url/producto/nombre_del_producto}
    '
    """

    busqueda = texto.replace("_", " ").upper()
    productos = Producto.query.filter(Producto.pr_name.like("%" + busqueda + "%")).all()
    if len(productos) > 0:
        result = productos_schema.dump(productos)
        return (
            jsonify({"message": "Se encontraron productos", "productos": result}),
            200,
        )
    else:
        return (
            jsonify({"message": "No se encontraron productos", "productos": []}),
            404,
        )


# READ
@producto_scope.route("/productos", methods=["GET"])
def list_productos():
    """
    La funcion list_productos(), nos devuelve todos los productos en la base de datos,

    Return Json Object informando todos los productos encontrados.

    '
        Formato para retornar toda la lista de productos:
        http://127.0.0.1:5000/producto/productos
        {url/producto/productos}
    '
    """
    try:
        productos = Producto.query.all()
        result = productos_schema.dump(productos)
    except:
        return {
            "message": "No se pudo obtener la lista de productos",
            "productos": {},
        }, 404
    return jsonify({"message": "Se encontraron productos", "productos": result}), 200


# UPDATE
@producto_scope.route("/actualizar/<int:id_>", methods=["PUT"])
def actualizar(id_):
    """
    La funcion actualizar() recibe un valos a traves de URL id, con el cual realizar la busqueda
    si este existe se podran modificar los valores, verificando primero si los valores ingresados no son
    coincidentes con los datos ya registrados para evitar ingresar constantemente a la base de datos y sobreescribir
    los mismos datos ya obtenidos.

    Return Json Object en el cual se confirma o niega la actualizacion del producto
    '
        Formato para actualizar un producto:
        http://127.0.0.1:5000/producto/actualizar/1
        {url/producto/actualizar/id_producto}
    '
    """
    producto = Producto.query.get(id_)
    if producto is None:
        return (
            jsonify(
                {
                    "message": "El producto no se encuentra en la base de datos",
                    "producto": {},
                }
            ),
            404,
        )
    producto_equivalente = Producto(
        " ".join(request.json["pr_name"].upper().strip().split()),
        " ".join(request.json["pr_tipo"].upper().strip().split()),
        request.json["pr_bprice"],
        request.json["pr_sprice"],
        request.json["pr_quantity"],
    )
    if producto == producto_equivalente:
        return (
            jsonify(
                {"message": "Los datos ingresados son iguales a los ya registrados"}
            ),
            200,
        )

    producto.pr_name = request.json["pr_name"].upper().rstrip().lstrip()
    producto.pr_tipo = request.json["pr_tipo"].upper().rstrip().lstrip()
    producto.pr_bprice = request.json["pr_bprice"]
    producto.pr_sprice = request.json["pr_sprice"]
    producto.pr_quantity = request.json["pr_quantity"]
    producto.pr_date_modified = datetime.now(timezone.utc).astimezone()
    try:
        db.session.commit()
    except Exception as ex:
        error = ex.args[0]
        db.session.rollback()
        return (
            jsonify({"message": "No se pudo actualizar el producto", "error": error}),
            500,
        )
    return (
        jsonify(
            {
                "message": "El producto se ha actualizado correctamente",
                "producto": producto_schema.dump(producto),
            }
        ),
        200,
    )


# DELETE
@producto_scope.route("/eliminar/<int:id_>", methods=["DELETE"])
def eliminar_producto(id_):
    """
    La funcion eliminar producto(), permite recibir un dato atraves de la URL id, con el final de
    buscar dicho producto en la base de datos y eliminarlo.

    Return Json Object confirmando o negando la eliminacion del producto.
    '
        Formato para eliminar un producto:
        http://127.0.0.1:5000/producto/eliminar/1
        {url/producto/eliminar/id_producto}
    '
    """
    producto = Producto.query.get(id_)
    if producto is None:
        return (
            jsonify(
                {
                    "message": "No se pudo eliminar el producto, ya que no existe en la base de datos"
                }
            ),
            500,
        )
    db.session.delete(producto)
    try:
        db.session.commit()
    except Exception as e:
        error = e.args[0]
        return (
            jsonify(
                {
                    "message": "Hubo un error al eliminar el producto",
                    "producto": productos_schema.dump(producto),
                    "error": error,
                }
            ),
            500,
        )
    return jsonify({"message": "El producto se eliminio correctamente"}), 200
