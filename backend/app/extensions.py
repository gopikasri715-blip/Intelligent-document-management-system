from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS # type: ignore

db = SQLAlchemy()
cors = CORS()