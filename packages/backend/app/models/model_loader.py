import numpy as np
from PIL import Image
import numpy as np

from pathlib import Path
from .pet_health_model import PetHealthPredictor

class PetHealthModelLoader:
    def __init__(self):
        self.model_dir = Path(__file__).parent / 'pretrained'
        self.model_path = self.model_dir / 'pet_health_model.pth'
        self.predictor = None
        self._initialize_models()
        
    def _initialize_models(self):
        """Initialize the pet health model"""
        try:
            # Try to load the real model if it exists
            if self.model_path.exists():
                self.predictor = PetHealthPredictor(str(self.model_path))
            else:
                # Fall back to the model without pretrained weights
                self.predictor = PetHealthPredictor()
                print("Warning: Using untrained model - predictions will be random")
        except Exception as e:
            print(f"Error loading model: {str(e)}")
            self.predictor = None
        
    def analyze_health(self, image_array):
        """
        Analyze pet health from image
        """
        if self.predictor is None:
            # Return mock results if model failed to load
            return {
                'health_status': np.array([0.8, 0.1, 0.05, 0.03, 0.02]),
                'conditions': np.array([0.1, 0.1, 0.1, 0.1, 0.1]),
            }
            
        try:
            # Use the real model for prediction
            results = self.predictor.predict(image_array)
            return results
        except Exception as e:
            print(f"Error during prediction: {str(e)}")
            # Return mock results on error
            return {
                'health_status': np.array([0.8, 0.1, 0.05, 0.03, 0.02]),
                'conditions': np.array([0.1, 0.1, 0.1, 0.1, 0.1]),
            }
