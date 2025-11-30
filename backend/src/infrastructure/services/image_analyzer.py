import os
from datetime import datetime
from werkzeug.utils import secure_filename
from deep_translator import GoogleTranslator
from azure.ai.vision.imageanalysis import ImageAnalysisClient
from azure.ai.vision.imageanalysis.models import VisualFeatures
from azure.core.credentials import AzureKeyCredential

class ImageAnalyzerService:
    def save_file(self, file, directory) -> tuple[str, str]:
        if not file or file.filename == '':
            raise ValueError("No valid image sent")
        timestamp_photo = datetime.now().strftime('%Y%m%d%H%M%S')
        filename = secure_filename(f"photo_{timestamp_photo}.jpg")
        save_image_path = os.path.join(directory, filename)
        file.save(save_image_path)
        return filename, save_image_path

    def analyze(self, image_path) -> tuple[str, str]:
        try:
            endpoint = os.environ.get("VISION_ENDPOINT")
            key = os.environ.get("VISION_KEY")
            if not endpoint or not key:
                return "Error", "Missing Azure Credentials"
        except Exception:
            return "Error", "Configuration Error"

        with open(image_path, "rb") as f:
            image_data = f.read()

        client = ImageAnalysisClient(
            endpoint=endpoint,
            credential=AzureKeyCredential(key),
        )

        result = client.analyze(
            image_data=image_data,
            visual_features=[
                VisualFeatures.TAGS,
                VisualFeatures.CAPTION
            ]
        )
        
        tagsEnLaImagen = []
        tag_mas_probable = ""
        palabras_clave = ["arbol", "bus stop", "trash can", "dog", "bird"]

        if result.tags:
            for tag in result.tags.list:
                tagsEnLaImagen.append(tag.name)
                if tag.name in ["tree", "trash can", "bus stop"]:
                    tag_mas_probable = tag.name

        caption_texto = result.caption['text'] if result.caption else "Sin descripción"

        for palabra in palabras_clave:
            if palabra in caption_texto:
                tag_mas_probable = palabra
                break

        traducido = GoogleTranslator(source='auto', target='es').translate(tag_mas_probable) if tag_mas_probable else "Desconocido"
        caption_traducida = GoogleTranslator(source='auto', target='es').translate(caption_texto)
        
        return traducido, caption_traducida
