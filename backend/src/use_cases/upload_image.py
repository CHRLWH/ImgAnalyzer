from typing import Tuple
from domain.entities import Image
from domain.interfaces import ImageRepository

class UploadImageUseCase:
    def __init__(self, image_repository: ImageRepository, image_analyzer_service):
        self.image_repository = image_repository
        self.image_analyzer_service = image_analyzer_service

    def execute(self, file, latitude: float, longitude: float, image_folder: str) -> Image:
        # Save file and get path (handled by service or util, here simplified)
        filename, saving_path = self.image_analyzer_service.save_file(file, image_folder)
        
        # Analyze image
        name, description = self.image_analyzer_service.analyze(saving_path)
        
        # Create entity
        from datetime import datetime
        date = datetime.now().strftime("%d de %B de %Y")
        
        image = Image(
            id=None,
            image=filename,
            value=5,
            name=name,
            description=description,
            date=date,
            latitude=latitude,
            longitude=longitude
        )
        
        # Save to DB
        return self.image_repository.save(image)
