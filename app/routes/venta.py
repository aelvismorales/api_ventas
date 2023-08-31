from flask import Blueprint, request, jsonify
from sqlalchemy import asc
from ..models.models import Venta, db, VentaSquema, Producto, detalle_venta, Comprador
from decimal import Decimal
from datetime import datetime, timezone, timedelta

venta_scope = Blueprint("venta", __name__)

venta_schema = VentaSquema()
ventas_schema = VentaSquema(many=True)

precision = 10
scale = 2


# CREATE
@venta_scope.route("/crear", methods=["POST"])
def crear_venta():
    """
    La funcion crear venta, recibe datos en formato JSON los cuales recibe los valroes del Comprador si este no existe se crea un nuevo comprador
    Return Json Object confirmando o negando la creacion de la nota.
    '
        Formato para crear una venta:
        {
            "ven_tipo":"CANCELADO",
            "com_name": "ELVIS MORALES",
            "com_address": "Av.San Martin",
            "com_telefono": "902748345",
            "com_dni": "75568362",
            "productos": [
                            {
                                "pr_id": 3,
                                "quantity": "100.00",
                                "discount": "10.20"
                            },
                            {
                                "pr_id": 2,
                                "quantity": "10.00",
                                "discount": "0"
                            }
                        ]
        }
    '
    """
    data = request.json
    ven_tipo = data.get("ven_tipo", "-")
    comp_name = " ".join(data.get("com_name", "VARIOS").strip().upper().split())
    productos = data.get("productos", [])
    acuenta = data.get("acuenta", 0.0)
    comprador = Comprador.query.filter_by(com_name=comp_name).first()
    if comprador is None:
        com_address = " ".join(data.get("com_address", "").strip().upper().split())
        com_telefono = data.get("com_telefono", "")
        com_dni = data.get("com_dni", "")
        comprador = Comprador(comp_name, com_address, com_telefono, com_dni)
        try:
            db.session.add(comprador)
            db.session.commit()
        except Exception as ex:
            error = ex.args[0]
            db.session.rollback()
            return (
                jsonify({"message": "No se pudo crear la Venta", "error": error}),
                500,
            )

    venta = Venta(
        ven_tipo=ven_tipo,
        comprador_id=comprador.com_id,
        ven_address=" ".join(data.get("com_address", "").strip().upper().split()),
    )
    db.session.add(venta)
    db.session.commit()
    total_sale = Decimal(0.0).quantize(Decimal("1e-{0}".format(2)))
    try:
        for producto_data in productos:
            producto_id = producto_data.get("pr_id")
            cantidad = Decimal(producto_data.get("quantity", 1)).quantize(
                Decimal("1e-{0}".format(2))
            )
            descuento = Decimal(producto_data.get("discount", 0)).quantize(
                Decimal("1e-{0}".format(2))
            )
            pr_sprices = Decimal(producto_data.get("pr_sprice", 1)).quantize(
                Decimal("1e-{0}".format(2))
            )

            # producto = Producto.query.get(producto_id)
            # if not producto:
            #    return jsonify(
            #        {"message": f"El producto con ID {producto_id} no se encuentra"}
            #    )
            total_sale += (pr_sprices * cantidad) - descuento
            detalle = detalle_venta.insert().values(
                ven_id=venta.ven_id,
                pr_id=producto_id,
                dv_quantity=cantidad,
                dv_discount=descuento,
                pr_sprice=pr_sprices,
            )
            db.session.execute(detalle)

        venta.ven_total = total_sale
        venta.ven_acuenta = acuenta
        db.session.commit()

        return jsonify({"message": "Venta creada exitosamente"}), 201
    except Exception as ex:
        error = ex.args[0]
        db.session.rollback()
        return jsonify({"message": "No se pudo crear la Venta", "error": error}), 500


# READ
@venta_scope.route("/ver/<int:id_>", methods=["GET"])
def obtener_Venta(id_):
    """
    La funcion Obtener Venta sirve para obtener los datos de una venta realizada verificando su ID de la misma,
    Return JSON Object con los datos de la nota de venta.

    '
        Formato para obtener una venta:
        http://127.0.0.1:5000/venta/ver/4
        {url/venta/ver/id_venta}
    '
    """
    venta = Venta.query.get(id_)
    if not venta:
        return jsonify({"message": "Venta no encontrada"}), 404

    detalles = (
        db.session.query(
            Producto,
            detalle_venta.c.dv_quantity,
            detalle_venta.c.dv_discount,
            detalle_venta.c.pr_sprice,
        )
        .join(detalle_venta, Producto.pr_id == detalle_venta.c.pr_id)
        .filter(detalle_venta.c.ven_id == id_)
        .all()
    )
    venta_data = {
        "ven_id": venta.get_ven_id(),
        "comp_name": venta.comprador.get_com_name(),
        "com_addresses": venta.comprador.get_com_address(),
        "com_dni": venta.comprador.get_com_dni(),
        "com_telefono": venta.comprador.get_com_telefono(),
        "ven_date": venta.get_date(),
        "ven_tipo": venta.get_ven_tipo(),
        "ven_total": venta.get_suma_total(),
        "productos": [],
    }
    for producto, cantidad, descuento, sprice in detalles:
        producto_data = {
            "pr_name": producto.get_name(),
            "pr_sprice": sprice if sprice is not None else producto.get_sprice(),
            "dv_quantity": Decimal(cantidad).quantize(Decimal("1e-{0}".format(scale))),
            "dv_discount": Decimal(descuento).quantize(Decimal("1e-{0}".format(scale))),
        }
        venta_data["productos"].append(producto_data)
    return jsonify(venta_data), 200


# READ
@venta_scope.route("/buscar/nombre/<string:com_name>", methods=["GET"])
def buscar_ventas(com_name):
    """
    La funcion buscar_ventas, buscara las ventas por nombre de la persona segun exista en la base de datos

    Return Json Object confirmando o negando que exista venta con el nombre de la persona y mandando los datos de la venta.
    '
        Formato para buscar ventas por nombre del comprador:
        http://127.0.0.1:5000/venta/buscar/elvis_morales
        {url/venta/buscar/nombre_comprador}
    '
    """
    busqueda = com_name.replace("_", " ").upper()
    if not busqueda:
        return jsonify({"message": "Debes proporcionar el nombre del comprador"}), 404

    ventas = (
        Venta.query.join(Comprador)
        .filter(Comprador.com_name.like("%" + busqueda + "%"))
        .all()
    )

    if not ventas:
        return (
            jsonify(
                {
                    "message": f"No se encontraron ventas para el comprador {busqueda}",
                    "compras": [],
                }
            ),
            404,
        )
    data_venta = []
    for v in ventas:
        data_venta.append(
            {
                "ven_id": v.get_ven_id(),
                "ven_date": v.get_date(),
                "vent_tipo": v.get_ven_tipo(),
                "comp_name": v.comprador.get_com_name(),
                "vent_total": v.get_suma_total(),
                "ven_comment": v.get_comment(),
                "ven_acuenta": v.get_acuenta(),
            }
        )

    return (
        jsonify(
            {
                "message": "Se encontraron las compras del  satisfactoriamente",
                "compras": data_venta,
            }
        ),
        200,
    )


# READ
@venta_scope.route("/buscar/fechas", methods=["GET", "POST"])
def buscar_ventas_fechas():
    """
    Return Json Object con ventas del rango de fecha dado
    '
        Formato para buscar entre fechas:
        {
            "fecha_inicio": "03/08/2023",
            "fecha_final": "04/08/2023"
        }
    '
    """
    data = request.json
    fecha_inicio = data.get("fecha_inicio", datetime.now(timezone.utc).astimezone())
    fecha_final = data.get("fecha_final", datetime.now(timezone.utc).astimezone())
    # fecha_final = data.get(
    #   "fecha_final", datetime.now(timezone.utc).astimezone() + timedelta(days=1)
    # )
    ventas = (
        Venta.query.filter(Venta.ven_date.between(fecha_inicio, fecha_final))
        .order_by(asc(Venta.ven_id))
        .all()
    )
    data_venta = []
    for v in ventas:
        data_venta.append(
            {
                "ven_id": v.get_ven_id(),
                "ven_date": v.get_date(),
                "vent_tipo": v.get_ven_tipo(),
                "comp_name": v.comprador.get_com_name(),
                "vent_total": v.get_suma_total(),
                "ven_comment": v.get_comment(),
                "ven_acuenta": v.get_acuenta(),
            }
        )
    if ventas is None:
        return (
            jsonify(
                {"message": "No se encontraron ventas en esta fecha", "compras": []}
            ),
            404,
        )

    return (
        jsonify(
            {
                "message": "Se encontraron las ventas satisfactoriamente",
                "compras": data_venta,
            }
        ),
        200,
    )


# READ
@venta_scope.route("/buscar/<int:id_>", methods=["GET"])
def buscar_ventas_comprador_id(id_):
    """
    La funcion buscasr_ventas_comprador_id, buscara todas las ventas que tenga un comprador apartir de su ID.

    Return JSON Object confirmacndo o negando que exista ventas con el ID del comprador.
    """
    ventas = Venta.query.filter(Venta.comp_id.like(id_)).all()
    if not ventas:
        return (
            jsonify(
                {
                    "message": "No se encontraron nota de pedido del comprador",
                    "compras": [],
                }
            ),
            404,
        )
    return (
        jsonify(
            {
                "message": "Se encontraron las notas de pedido del comprador",
                "compras": ventas_schema.dump(ventas),
            }
        ),
        200,
    )


# UPDATE
@venta_scope.route("/actualizar/<int:ven_id>", methods=["PUT"])
def actualizar_venta(ven_id):
    """
    La funcion actualizar venta nos permite obtener los datos de la venta y actualizarlos con el ID de la venta
    Return JSON Object confirmando la actualizacion de la venta o la negacion.

    '
        Formato para actualizar una venta:
            {
                "ven_tipo":"CANCELADO-ENTREGADO",
                "comp_name": "ELVIS MORALES",
                "productos": [
                    {
                        "pr_id": 1,
                        "pr_quantity": "100.00",
                        "discount": "10.20"

                    },
                    {
                        "pr_id": 2,
                        "quantity": "10.00",
                        "discount": 0
                    },
                    {
                        "pr_id": 3,
                        "quantity": "20.00",
                        "discount": 0
                    }
                ]
            }
    '
    """
    venta = Venta.query.get(ven_id)
    if not venta:
        return jsonify({"message": "Venta no encontrada"}), 404

    data = request.json
    ven_tipo = data.get("ven_tipo")
    comp_name = data.get("comp_name")
    productos = data.get("productos", [])

    try:
        for producto_data in productos:
            producto_id = producto_data.get("pr_id")
            cantidad = Decimal(producto_data.get("quantity", 1)).quantize(
                Decimal("1e-{0}".format(2))
            )
            descuento = Decimal(producto_data.get("discount", 0)).quantize(
                Decimal("1e-{0}".format(2))
            )

            producto = Producto.query.get(producto_id)
            if not producto:
                return (
                    jsonify(
                        {"message": f"Producto con ID {producto_id} no encontrado"}
                    ),
                    404,
                )

            detalle = (
                detalle_venta.update()
                .where(detalle_venta.c.ven_id == ven_id)
                .where(detalle_venta.c.pr_id == producto_id)
                .values(dv_quantity=cantidad, dv_discount=descuento)
            )
            db.session.execute(detalle)

        venta.ven_tipo = ven_tipo
        venta.comprador.set_com_name(comp_name)
        db.session.commit()
        return jsonify({"message": "Venta actualizada exitosamente"}), 200
    except Exception as e:
        error = e.args[0]
        db.session.rollback()
        return (
            jsonify({"message": "No se pudo actualizar la venta", "error": error}),
            500,
        )


# UPDATE
@venta_scope.route("/actualizar/anular/<int:id_>", methods=["PUT"])
def actualizar_anular(id_):
    venta = Venta.query.get(id_)
    if not venta:
        return jsonify({"message": "Venta no encontrada"}), 404
    venta.ven_tipo = "ANULADO"
    db.session.commit()
    return jsonify({"message": "Venta actualizada correctamente"}), 200


# DELETE
@venta_scope.route("/eliminar/<int:ven_id>", methods=["DELETE"])
def eliminar_venta(ven_id):
    """
    La funciones eliminar venta nos permite eliminar una  venta apartir del ID de la misma.
    Return JSON Object confirmando o negando la eliminacion de la venta.

    '
        Formato para eliminar una venta:
        http://127.0.0.1:5000/venta/eliminar/2
        {url/venta/eliminar/id_venta}
    '
    """
    venta = Venta.query.get(ven_id)
    if not venta:
        return jsonify({"message": "Venta no encontrada"}), 404

    try:
        db.session.delete(venta)
        db.session.commit()
        return jsonify({"message": "Venta eliminada exitosamente"}), 200
    except:
        db.session.rollback()
        return jsonify({"message": "No se pudo eliminar la venta"}), 500
