from app import create_app
from os import environ

app = create_app(environ.get("APP_CONFIG", "default"))
if __name__ == "__main__":
    app.run(port=5000)
