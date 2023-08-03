class Config:
    SERVERNAME = "localhost:5000"
    DEBUG = True
    # DATABASE_PATH = "./app/database/ferreteria.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = "mysql://root:admin@localhost/ferreteria"
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
