from flask import Flask
from .models.models import db, ma
from flask_migrate import Migrate
from flask_cors import CORS
from config import CORS_CONFIG, config
from .routes import producto_scope, comprador_scope, venta_scope

migrate = Migrate()
cors = CORS()


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config.get(config_name, "default"))
    db.init_app(app)
    ma.init_app(app)
    with app.app_context():
        db.create_all()
    migrate.init_app(app, db)
    cors.init_app(app, **CORS_CONFIG)
    app.register_blueprint(producto_scope, url_prefix="/producto")
    app.register_blueprint(comprador_scope, url_prefix="/comprador")
    app.register_blueprint(venta_scope, url_prefix="/venta")
    return app
