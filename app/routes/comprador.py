from flask import Blueprint, request, jsonify
from ..models.models import Comprador, db, CompradorSquema

comprador_scope = Blueprint("comprador", __name__)

comprador_squema = CompradorSquema()
compradores_squema = CompradorSquema(many=True)


# CREATE
@comprador_scope.route("/crear", methods=["POST"])
def crear_comprador():
    """
    La funcion crear comprador recibe datos en formato JSON para la creacion de un nuevo comprador

    Return Json Object confirmado la creacion del comprador o el fallo en su creacion

    '
        Formato de Creacion de un comprador:
        {
            "com_name": "ELVIS morales",
            "com_address": "555 Pine Lane, City, Country",
            "com_telefono": "+1 (555) 321-0987",
            "com_dni": "75568362"
        }
    '
    """
    data = request.json
    com_name = " ".join(data.get("com_name").strip().upper().split())
    com_address = " ".join(data.get("com_address").strip().upper().split())
    com_telefono = data.get("com_telefono", "")
    com_dni = data.get("com_dni", "")

    comprador_ = Comprador.query.filter_by(com_dni=com_dni).first()
    if comprador_ is not None:
        return {
            "message": "El comprador ya existe",
            "comprador": comprador_squema.dump(comprador_),
        }, 200
    comprador_ = Comprador(com_name, com_address, com_telefono, com_dni)
    try:
        db.session.add(comprador_)
        db.session.commit()
    except Exception as ex:
        error = ex.args[0]
        db.session.rollback()
        return {
            "message": "No se pudo crear al comprador",
            "comprador": com_name,
            "error": error,
        }, 500
    return (
        jsonify(
            {
                "message": "Se creo al comprador correctamente",
                "comprador": comprador_squema.dump(comprador_),
            }
        ),
        201,
    )


# CREATE
@comprador_scope.route("/crear/varios", methods=["POST"])
def crear_compradores():
    """
    La funcion crear_compradores() recibe una list con datos en formato json, los cuales son leidos y cargados
    para la creacion de nuevos compradores

    Return Json Object confirmando la carga de los comprados y aquellos que ya existian.
    '
        Formato de Creacion de una lista  de compradores:
        [
            {
                "com_name": "ELVIS morales",
                "com_address": "555 Pine Lane, City, Country",
                "com_telefono": "+1 (555) 321-0987",
                "com_dni": "75568362"
            },
            {
                "com_name": "ELVIS morales",
                "com_address": "555 Pine Lane, City, Country",
                "com_telefono": "+1 (555) 321-0987",
                "com_dni": "75568362"
            }
        ]
    '
    """
    request_data = request.get_json()
    response = {"message": "Los compradores ya existen", "compradores": []}
    compradores_cargados = []

    for rq in request_data:
        com_name = " ".join(rq["com_name"].strip().upper().split())
        com_address = " ".join(rq["com_address"].strip().upper().split())
        com_telefono = rq["com_telefono"]
        com_dni = rq["com_dni"]

        if Comprador.query.filter_by(com_dni=com_dni).first():
            response["compradores"].append({"nombre": com_name, "dni": com_dni})
            continue
        comprador = Comprador(com_name, com_address, com_telefono, com_dni)
        try:
            db.session.add(comprador)
            db.session.commit()
        except Exception as ex:
            error = ex.args[0]
            return {
                "message": "No se pudo crear el comprador",
                "comprador": com_name,
                "error": error,
            }, 500
        compradores_cargados.append(
            {"nombre": comprador.get_com_name(), "dni": comprador.get_com_dni()}
        )
    return (
        jsonify(
            {
                "message": "Se crearon los compradores correctamente",
                "cargados": len(compradores_cargados),
                "compradores": compradores_cargados,
            },
            response,
        ),
        201,
    )


# READ
@comprador_scope.route("/buscar/<string:name>", methods=["GET"])
def buscar_comprador(name):
    """
    La funcion buscar_comprador() recibe un string dni que se va a realizar la busqueda asi como una palabra clave " * "
    para retornar todos los compradores registrados.

    Return Json Object donde se confirma la existencia del comprador y sus valores.

    '
        Formato para buscar a un comprador:
        http://127.0.0.1:5000/comprador/buscar/75568362
        {url/comprador/buscar/name}
        {url/comprador/buscar/*} // Devuelve todos los compradores registrados
    '
    """
    busqueda = name.replace("_", " ").upper()
    if busqueda == "*":
        compradores = Comprador.query.all()
    else:
        compradores = Comprador.query.filter(
            Comprador.com_name.like("%" + busqueda + "%")
        ).all()
    if len(compradores) > 0:
        result = compradores_squema.dump(compradores)
        return (
            jsonify(
                {
                    "message": "Se encontrador los compradores correctamente",
                    "compradores": result,
                }
            ),
            200,
        )
    else:
        return (
            jsonify({"message": "No se encontro al comprador", "compradores": []}),
            404,
        )


# UPDATE
@comprador_scope.route("/actualizar/<int:id_>", methods=["PUT"])
def actualizar(id_):
    """
    La funcion actualizar nos permite recibir un valor ID atraves de la URL con el cual buscamos al comprador
    y comparamos los datos obtenidos con los datos ingresados si estos no son iguales se puede modificar los datos del comprador

    Return Json Object el cual verifica si los datos han sido modificados o no.
     '
        Formato para buscar a un comprador:
        http://127.0.0.1:5000/comprador/actualizar/1
        {url/comprador/actualizar/id_comprador}
    '
    """
    comprador = Comprador.query.get(id_)
    if comprador is None:
        return (
            jsonify(
                {
                    "message": "El comprador no se encuentra en la base datos",
                    "comprador": {},
                }
            ),
            404,
        )
    comprador_equivalente = Comprador(
        " ".join(request.json["com_name"].strip().upper().split()),
        " ".join(request.json["com_address"].strip().upper().split()),
        request.json["com_telefono"],
        request.json["com_dni"],
    )
    if comprador == comprador_equivalente:
        return (
            jsonify(
                {"message": "Los datos ingresados son iguales a los ya registrados "}
            ),
            200,
        )

    comprador.com_name = " ".join(request.json["com_name"].strip().upper().split())
    comprador.com_address = " ".join(
        request.json["com_address"].strip().upper().split()
    )
    comprador.com_telefono = request.json["com_telefono"]
    comprador.com_dni = request.json["com_dni"]
    try:
        db.session.commit()
    except Exception as ex:
        error = ex.args[0]
        db.session.rollback()
        return jsonify(
            {
                "message": "No se puede actualizar los datos del comprador",
                "error": error,
            }
        )
    return (
        jsonify(
            {
                "message": "El comprador se ha actualizado correctamente",
                "comprador": comprador_squema.dump(comprador),
            }
        ),
        200,
    )


# DELETE
@comprador_scope.route("/eliminar/<int:id_>", methods=["DELETE"])
def eliminar_comprador(id_):
    """
    La funcion eliminar comprador () permite recibir un id atraves del URL para buscarlo en la base de datos
    y poder eliminarlo.

    Return Json Object confirmando o negando la eliminacion del comprador de la base datos.
    '
        Formato para eliminar a un comprador:
        http://127.0.0.1:5000/comprador/eliminar/1
        {url/comprador/eliminar/id_comprador}
    '
    """
    comprador = Comprador.query.get(id_)
    if comprador is None:
        return (
            jsonify(
                {"message": "No se puede eliminar dado que no existe el comprador"}
            ),
            500,
        )
    try:
        db.session.delete(comprador)
    except Exception as ex:
        error = ex.argsp[0]
        return (
            jsonify(
                {
                    "message": "Hubo un error al eliminar al comprador",
                    "comprador": comprador_squema.dump(comprador),
                    "error": error,
                }
            ),
            500,
        )
    return jsonify({"message": "El comprador se elimino correctamente"}), 200
