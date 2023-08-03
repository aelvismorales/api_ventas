from flask import Flask
from config import Config
from .models.models import db, ma
from flask_migrate import Migrate
from .routes import producto_scope, comprador_scope, venta_scope

migrate = Migrate()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    ma.init_app(app)
    with app.app_context():
        db.create_all()
    migrate.init_app(app, db)
    app.register_blueprint(producto_scope, url_prefix="/producto")
    app.register_blueprint(comprador_scope, url_prefix="/comprador")
    app.register_blueprint(venta_scope, url_prefix="/venta")
    return app
