from typing import Optional
from domain.entities import Image
from domain.interfaces import ImageRepository

class DeleteImageUseCase:
    def __init__(self, image_repository: ImageRepository):
        self.image_repository = image_repository

    def execute(self, image_id: int) -> Optional[Image]:
        return self.image_repository.delete(image_id)
