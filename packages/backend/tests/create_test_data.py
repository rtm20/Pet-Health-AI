from PIL import Image
import numpy as np
from pathlib import Path

def create_test_image():
    """Create a test image that looks like a simple pet silhouette"""
    
    # Create a 300x300 white background
    image = np.full((300, 300, 3), 255, dtype=np.uint8)
    
    # Create a simple "pet" silhouette (dark gray oval)
    y, x = np.ogrid[:300, :300]
    center_x, center_y = 150, 150
    pet_mask = ((x - center_x)**2 / (100**2) + (y - center_y)**2 / (80**2) <= 1)
    image[pet_mask] = [100, 100, 100]  # Dark gray for the pet silhouette
    
    # Add "eyes" (two small white dots)
    eye1_x, eye1_y = 120, 130
    eye2_x, eye2_y = 180, 130
    eye_radius = 10
    
    eye1_mask = ((x - eye1_x)**2 + (y - eye1_y)**2 <= eye_radius**2)
    eye2_mask = ((x - eye2_x)**2 + (y - eye2_y)**2 <= eye_radius**2)
    
    image[eye1_mask] = [255, 255, 255]  # White for eyes
    image[eye2_mask] = [255, 255, 255]
    
    # Convert to PIL Image
    image = Image.fromarray(image)
    
    # Save the image
    save_path = Path(__file__).parent / 'test_data' / 'images' / 'test_pet.jpg'
    save_path.parent.mkdir(parents=True, exist_ok=True)
    image.save(save_path, quality=95)
    print(f"Test image created at: {save_path}")

if __name__ == "__main__":
    create_test_image()
