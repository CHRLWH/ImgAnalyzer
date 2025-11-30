from flask import Flask
from flask_cors import CORS
import os
from infrastructure.db.models import db
from interfaces.controllers import images_bp

class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:@127.0.0.1/flask'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    IMAGE_FOLDER = os.path.join(os.getcwd(), 'imgs')

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    os.makedirs(app.config['IMAGE_FOLDER'], exist_ok=True)

    CORS(app)
    db.init_app(app)

    app.register_blueprint(images_bp)

    with app.app_context():
        db.create_all()

    return app

if __name__ == "__main__":
    app = create_app()
    host = os.environ.get('FLASK_RUN_HOST', '0.0.0.0')
    port = int(os.environ.get('FLASK_RUN_PORT', 3000))
    app.run(host=host, port=port, debug=True)
