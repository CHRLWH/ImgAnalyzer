from flask_sqlalchemy import SQLAlchemy
from domain.entities import Image

db = SQLAlchemy()

class ImageModel(db.Model):
    __tablename__ = 'image'
    
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(100))
    name = db.Column(db.String(100))
    value = db.Column(db.Integer)
    description = db.Column(db.String(255))
    date = db.Column(db.String(100))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)

    def to_entity(self) -> Image:
        return Image(
            id=self.id,
            image=self.image,
            name=self.name,
            value=self.value,
            description=self.description,
            date=self.date,
            latitude=self.latitude,
            longitude=self.longitude
        )

    @staticmethod
    def from_entity(image: Image) -> 'ImageModel':
        return ImageModel(
            id=image.id,
            image=image.image,
            name=image.name,
            value=image.value,
            description=image.description,
            date=image.date,
            latitude=image.latitude,
            longitude=image.longitude
        )
