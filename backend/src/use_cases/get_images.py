from typing import List
from domain.entities import Image
from domain.interfaces import ImageRepository

class GetImagesUseCase:
    def __init__(self, image_repository: ImageRepository):
        self.image_repository = image_repository

    def execute(self) -> List[Image]:
        return self.image_repository.get_all()
