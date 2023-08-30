from datetime import datetime, timezone
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from decimal import Decimal

db = SQLAlchemy()
ma = Marshmallow()

precision = 10
scale = 2


class Comprador(db.Model):
    __tablename__ = "comprador"
    com_id = db.Column(db.Integer, primary_key=True)
    com_name = db.Column(db.String(255), nullable=False)
    com_address = db.Column(db.String(255), nullable=False)
    com_telefono = db.Column(db.String(20), nullable=False)
    com_dni = db.Column(db.String(10), nullable=False)

    com_compras = db.relationship("Venta", backref="comprador", lazy="dynamic")

    def __init__(self, com_name, com_address, com_telefono, com_dni):
        self.com_name = com_name
        self.com_address = com_address
        self.com_telefono = com_telefono
        self.com_dni = com_dni

    def __str__(self):
        return str(
            {
                "Comprador": {
                    "com_name": self.com_name,
                    "com_address": self.com_address,
                    "com_telefono": self.com_telefono,
                    "com_dni": self.com_dni,
                }
            }
        )

    def __eq__(self, other):
        if not isinstance(other, Comprador):
            return False
        return (
            (self.com_name == other.com_name)
            and (self.com_address == other.com_address)
            and (self.com_telefono == other.com_telefono)
            and (self.com_dni == other.com_dni)
        )

    def get_com_id(self):
        return self.com_id

    def get_com_name(self):
        return self.com_name

    def get_com_address(self):
        return self.com_address

    def get_com_telefono(self):
        return self.com_telefono

    def get_com_dni(self):
        return self.com_dni

    def get_com_compras(self):
        return self.com_compras

    def set_com_name(self, name):
        self.com_name = name


class CompradorSquema(ma.SQLAlchemySchema):
    class Meta:
        fields = ("com_id", "com_name", "com_address", "com_telefono", "com_dni")


detalle_venta = db.Table(
    "detalle_venta",
    db.Column("ven_id", db.Integer, db.ForeignKey("venta.ven_id")),
    db.Column("pr_id", db.Integer, db.ForeignKey("producto.pr_id")),
    db.Column("dv_quantity", db.Numeric(precision=10, scale=2)),
    db.Column("dv_discount", db.Numeric(precision=10, scale=2)),
    db.Column("pr_sprice", db.Numeric(precision=10, scale=2), default=None),
)


class Producto(db.Model):
    __tablename__ = "producto"
    pr_id = db.Column(db.Integer, primary_key=True)
    pr_name = db.Column(db.String(255), nullable=False, unique=True)
    pr_tipo = db.Column(db.String(255), nullable=False)
    pr_bprice = db.Column(db.Numeric(precision=10, scale=2), nullable=False)
    pr_sprice = db.Column(db.Numeric(precision=10, scale=2), nullable=False)
    pr_quantity = db.Column(db.Numeric(precision=10, scale=2), nullable=False)
    pr_date_modified = db.Column(
        db.DateTime, default=datetime.now(timezone.utc).astimezone()
    )

    def __init__(self, pr_name, pr_tipo, pr_bprice, pr_sprice, pr_quantity):
        self.pr_name = pr_name
        self.pr_tipo = pr_tipo
        self.pr_bprice = Decimal(pr_bprice).quantize(Decimal("1e-{0}".format(scale)))
        self.pr_sprice = Decimal(pr_sprice).quantize(Decimal("1e-{0}".format(scale)))
        self.pr_quantity = Decimal(pr_quantity).quantize(
            Decimal("1e-{0}".format(scale))
        )

    def __str__(self):
        return str(
            {
                "Producto": {
                    "name": self.pr_name,
                    "tipo": self.pr_tipo,
                    "sprice": self.pr_sprice,
                    "quantity": self.pr_quantity,
                }
            }
        )

    def __eq__(self, other):
        if not isinstance(other, Producto):
            return False
        return (
            (self.get_name() == other.get_name())
            and (self.get_tipo() == other.get_tipo())
            and (self.get_bprice() == other.get_bprice())
            and (self.get_sprice() == other.get_sprice())
            and (self.get_quantity() == other.get_quantity())
        )

    def get_pr_id(self):
        return self.pr_id

    def get_name(self):
        return self.pr_name

    def get_tipo(self):
        return self.pr_tipo

    def get_bprice(self):
        return self.pr_bprice

    def get_sprice(self):
        return self.pr_sprice

    def get_quantity(self):
        return self.pr_quantity

    def get_date(self):
        return self.pr_date_modified.strftime("%d/%m/%Y")

    def set_quantity(self, quantity):
        self.pr_quantity = quantity

    def set_bprice(self, bprice):
        self.pr_bprice = bprice

    def set_sprice(self, sprice):
        self.pr_sprice = sprice

    def set_date(self, date_mod):
        self.pr_date_modified = date_mod


class ProductoSquema(ma.SQLAlchemySchema):
    class Meta:
        fields = (
            "pr_id",
            "pr_name",
            "pr_tipo",
            "pr_bprice",
            "pr_sprice",
            "pr_quantity",
        )


class Venta(db.Model):
    __tablename__ = "venta"
    ven_id = db.Column(db.Integer, primary_key=True)
    ven_date = db.Column(db.DateTime, default=datetime.now(timezone.utc).astimezone())
    ven_tipo = db.Column(db.String(255), nullable=False)
    ven_address = db.Column(db.String(255), nullable=False)
    comp_id = db.Column(db.Integer, db.ForeignKey("comprador.com_id"))

    productos = db.relationship(
        "Producto",
        secondary=detalle_venta,
        backref=db.backref("ventas", lazy="dynamic"),
        lazy="dynamic",
    )
    ven_total = db.Column(db.Numeric(precision=10, scale=2), default=0.0)

    def __init__(self, ven_tipo, comprador_id, ven_address="-"):
        self.ven_tipo = ven_tipo
        self.comp_id = comprador_id
        self.ven_address = ven_address

    def __str__(self):
        return str(
            {
                "Venta": {
                    "id": self.get_ven_id(),
                    "ven_date": self.get_date(),
                    "ven_tipo": self.get_ven_tipo(),
                    "ven_comp_id": self.get_comp_id(),
                }
            }
        )

    def get_ven_id(self):
        return self.ven_id

    def get_comp_id(self):
        return self.comp_id

    def get_ven_tipo(self):
        return self.ven_tipo

    def get_productos(self):
        return self.productos

    def get_date(self):
        return self.ven_date.strftime("%d/%m/%Y")

    def get_suma_total(self):
        return self.ven_total

    def set_ven_tipo(self, ven_tipo):
        self.ven_tipo = ven_tipo


class VentaSquema(ma.SQLAlchemySchema):
    class Meta:
        fields = (
            "ven_id",
            "ven_date",
            "ven_tipo",
            "comp_id",
            "ven_address",
            "ven_total",
        )
        datetimeformat = "%d/%m/%Y"
