from typing import List, Optional
from domain.entities import Image
from domain.interfaces import ImageRepository
from .models import db, ImageModel

class SQLAlchemyImageRepository(ImageRepository):
    def save(self, image: Image) -> Image:
        image_model = ImageModel.from_entity(image)
        db.session.add(image_model)
        db.session.commit()
        return image_model.to_entity()

    def get_all(self) -> List[Image]:
        models = ImageModel.query.all()
        return [model.to_entity() for model in models]

    def get_by_id(self, image_id: int) -> Optional[Image]:
        model = ImageModel.query.get(image_id)
        if model:
            return model.to_entity()
        return None

    def delete(self, image_id: int) -> Optional[Image]:
        model = ImageModel.query.get(image_id)
        if model:
            db.session.delete(model)
            db.session.commit()
            return model.to_entity()
        return None
