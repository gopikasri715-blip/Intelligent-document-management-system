from app.extensions import db


class Activity(db.Model):
    __tablename__ = "activities"

    id = db.Column(db.Integer, primary_key=True)

    activity_type = db.Column(
        db.String(50),
        nullable=False
    )

    description = db.Column(
        db.String(255),
        nullable=False
    )

    document_id = db.Column(
        db.Integer,
        db.ForeignKey("documents.id"),
        nullable=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )

    document = db.relationship(
        "Document",
        backref="activities"
    )

    user = db.relationship(
        "User",
        backref="activities"
    )

    def __repr__(self):
        return f"<Activity {self.activity_type}>"