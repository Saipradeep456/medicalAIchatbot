import os
from dotenv import load_dotenv

# ✅ Load environment variables from .env file
load_dotenv()

import logging
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from werkzeug.middleware.proxy_fix import ProxyFix

# Set up logging
logging.basicConfig(level=logging.DEBUG)

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

# Create the app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "healthcare-chatbot-secret-key")
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

# Configure the database - using SQLite3
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///./healthcare_chatbot.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize the app with the extension
db.init_app(app)

with app.app_context():
    # Import models here so their tables are created
    import models
    db.create_all()

# Import and register routes
from routes import *

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
