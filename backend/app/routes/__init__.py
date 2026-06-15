from flask import Blueprint, jsonify

main = Blueprint('main', __name__)

@main.route('/api/health')
def health_check():
    return jsonify({
        'status': 'ok',
        'message': 'IDMS Backend is running',
        'version': '1.0.0'
    })