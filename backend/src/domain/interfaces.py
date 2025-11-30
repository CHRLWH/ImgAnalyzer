from abc import ABC, abstractmethod
from typing import List, Optional
from .entities import Image

class ImageRepository(ABC):
    @abstractmethod
    def save(self, image: Image) -> Image:
        pass

    @abstractmethod
    def get_all(self) -> List[Image]:
        pass

    @abstractmethod
    def get_by_id(self, image_id: int) -> Optional[Image]:
        pass

    @abstractmethod
    def delete(self, image_id: int) -> Optional[Image]:
        pass
