from flask import Blueprint, request, jsonify, send_from_directory, current_app
from infrastructure.db.repositories import SQLAlchemyImageRepository
from infrastructure.services.image_analyzer import ImageAnalyzerService
from use_cases.get_images import GetImagesUseCase
from use_cases.upload_image import UploadImageUseCase
from use_cases.delete_image import DeleteImageUseCase
from infrastructure.db.models import ImageModel

images_bp = Blueprint('images', __name__)

# Helper to dump entity to dict (simple version, or use Marshmallow)
def image_to_dict(image):
    return {
        'id': image.id,
        'image': image.image,
        'name': image.name,
        'value': image.value,
        'description': image.description,
        'date': image.date,
        'latitude': image.latitude,
        'longitude': image.longitude
    }

@images_bp.route('/images/getImages', methods=['GET'])
def get_images():
    repo = SQLAlchemyImageRepository()
    use_case = GetImagesUseCase(repo)
    images = use_case.execute()
    return jsonify([image_to_dict(img) for img in images])

@images_bp.route('/images/uploadImage', methods=['POST'])
def upload_image():
    try:
        file = request.files.get('photo')
        latitude = request.files.get('latitude', type=float)
        longitude = request.files.get('longitude', type=float)
        
        repo = SQLAlchemyImageRepository()
        service = ImageAnalyzerService()
        use_case = UploadImageUseCase(repo, service)
        
        new_image = use_case.execute(file, latitude, longitude, current_app.config['IMAGE_FOLDER'])
        
        return jsonify({
            'message': 'Image saved with analysis and location',
            **image_to_dict(new_image)
        })
    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400
    except Exception as e:
        current_app.logger.exception("Error uploading image")
        return jsonify({'error': 'Internal Server Error', 'detail': str(e)}), 500

@images_bp.route('/images/delete/<id>/', methods=['DELETE'])
def delete_image(id):
    repo = SQLAlchemyImageRepository()
    use_case = DeleteImageUseCase(repo)
    deleted_image = use_case.execute(id)
    if deleted_image:
        return jsonify(image_to_dict(deleted_image))
    return jsonify({'error': 'Image not found'}), 404

@images_bp.route('/images/getVisualizableImages/<path:filename>')
def get_image_file(filename):
    return send_from_directory(current_app.config['IMAGE_FOLDER'], filename)
