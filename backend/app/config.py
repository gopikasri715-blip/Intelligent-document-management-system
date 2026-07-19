import os
from dotenv import load_dotenv # type: ignore

load_dotenv()
BASE_DIR = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'idms-dev-secret-key-change-in-production'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MAX_CONTENT_LENGTH = 20 * 1024 * 1024  # 16 MB max upload size
    UPLOAD_FOLDER = UPLOAD_FOLDER
    ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg', 'tiff', 'bmp'}

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(os.path.dirname(os.path.dirname(__file__)), 'instance', 'idms.db')

class ProductionConfig(Config):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}