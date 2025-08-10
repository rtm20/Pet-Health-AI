import numpy as np
from PIL import Image

def preprocess_image(image: Image.Image, target_size=(380, 380)):
    """
    Preprocess image for model input
    """
    # Resize image
    image = image.resize(target_size)
    
    # Convert to array and normalize
    img_array = np.array(image)
    img_array = img_array.astype(np.float32) / 255.0
    
    # Add batch dimension
    img_array = np.expand_dims(img_array, axis=0)
    
    return img_array

def detect_image_issues(image: Image.Image) -> list:
    """
    Check for common image issues
    """
    issues = []
    
    # Check image size
    if image.size[0] < 200 or image.size[1] < 200:
        issues.append("Image resolution too low")
    
    # Check image mode/channels
    if image.mode not in ['RGB', 'RGBA']:
        issues.append("Image format not supported")
    
    # Check image brightness
    img_array = np.array(image)
    brightness = np.mean(img_array)
    if brightness < 30:
        issues.append("Image too dark")
    elif brightness > 240:
        issues.append("Image too bright")
    
    return issues

def format_results(model_outputs: dict) -> dict:
    """
    Format model outputs into user-friendly results
    """
    health_status_map = {
        0: "healthy",
        1: "minor_issues",
        2: "attention_needed",
        3: "requires_vet",
        4: "emergency"
    }
    
    # Convert predictions to human-readable format
    formatted_results = {
        "health_status": health_status_map[np.argmax(model_outputs['health_status'])],
        "confidence": float(np.max(model_outputs['health_status'])),
        "conditions_detected": [],
        "recommendations": []
    }
    
    # Add conditions if detected
    if 'conditions' in model_outputs:
        condition_scores = model_outputs['conditions']
        threshold = 0.5  # Confidence threshold
        
        for idx, score in enumerate(condition_scores):
            if score > threshold:
                formatted_results['conditions_detected'].append({
                    "condition": f"condition_{idx}",  # Replace with actual condition names
                    "confidence": float(score)
                })
    
    # Generate recommendations based on health status
    if formatted_results['health_status'] == "healthy":
        formatted_results['recommendations'].append(
            "Continue regular care and monitoring"
        )
    elif formatted_results['health_status'] in ["minor_issues", "attention_needed"]:
        formatted_results['recommendations'].extend([
            "Schedule a check-up with your veterinarian",
            "Monitor symptoms closely",
            "Take follow-up photos for comparison"
        ])
    else:
        formatted_results['recommendations'].append(
            "Seek immediate veterinary care"
        )
    
    return formatted_results
