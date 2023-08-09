from os import environ

CORS_CONFIG = {"resources": {"/*": {"origins": "*"}}}


class Config:
    # SERVERNAME = "localhost:5000"
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = "mysql://root:admin@localhost/ferreteria"
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True


class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = environ.get("SQLALCHEMY_DATABASE_URI")


class TestConfig(Config):
    TESTING = True
    DEBUG = True


class DevelopmentConfig(Config):
    DEBUG = True


config = {
    "development": DevelopmentConfig,
    "testing": TestConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig,
}
