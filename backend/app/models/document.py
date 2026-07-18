from app.extensions import db


class Document(db.Model):
    __tablename__ = "documents"

    id = db.Column(db.Integer, primary_key=True)

    filename = db.Column(db.String(255), nullable=False)

    original_filename = db.Column(db.String(255), nullable=False)

    file_type = db.Column(db.String(20), nullable=False)

    file_size = db.Column(db.Float)

    category = db.Column(db.String(100))

    extracted_text = db.Column(db.Text)

    upload_date = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )

    uploaded_by = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    user = db.relationship(
        "User",
        backref="documents"
    )

    def __repr__(self):
        return f"<Document {self.original_filename}>"