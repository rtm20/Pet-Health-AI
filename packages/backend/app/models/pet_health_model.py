import torch
import torch.nn as nn
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image
import numpy as np
from pathlib import Path

class PetHealthModel(nn.Module):
    def __init__(self, num_health_classes=5, num_conditions=10):
        super(PetHealthModel, self).__init__()
        
        # Load pre-trained EfficientNet model
        self.backbone = models.efficientnet_b0(pretrained=True)
        
        # Freeze backbone layers
        for param in self.backbone.features.parameters():
            param.requires_grad = False
            
        # Modify classifier for our specific tasks
        num_features = self.backbone.classifier[1].in_features
        
        # Multi-head classifiers
        self.health_classifier = nn.Sequential(
            nn.Dropout(p=0.2),
            nn.Linear(num_features, num_health_classes)
        )
        
        self.condition_classifier = nn.Sequential(
            nn.Dropout(p=0.2),
            nn.Linear(num_features, num_conditions)
        )
        
        # Initialize weights
        self._initialize_weights()
        
    def _initialize_weights(self):
        for m in self.modules():
            if isinstance(m, nn.Linear):
                nn.init.kaiming_normal_(m.weight)
                nn.init.constant_(m.bias, 0)
    
    def forward(self, x):
        # Extract features
        features = self.backbone.features(x)
        features = self.backbone.avgpool(features)
        features = torch.flatten(features, 1)
        
        # Multi-task predictions
        health_output = self.health_classifier(features)
        condition_output = self.condition_classifier(features)
        
        return {
            'health_status': health_output,
            'conditions': condition_output
        }

class PetHealthPredictor:
    def __init__(self, model_path=None):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model = PetHealthModel().to(self.device)
        
        if model_path and Path(model_path).exists():
            self.model.load_state_dict(torch.load(model_path, map_location=self.device))
        
        self.model.eval()
        
        # Define image transformations
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406],
                              std=[0.229, 0.224, 0.225])
        ])
        
        # Define class mappings
        self.health_status_map = {
            0: 'healthy',
            1: 'minor_issues',
            2: 'attention_needed',
            3: 'requires_vet',
            4: 'emergency'
        }
        
        self.condition_map = {
            0: 'skin_infection',
            1: 'eye_problem',
            2: 'ear_infection',
            3: 'dental_issue',
            4: 'weight_concern',
            5: 'mobility_issue',
            6: 'respiratory_problem',
            7: 'digestive_issue',
            8: 'behavioral_concern',
            9: 'other'
        }
    
    def preprocess_image(self, image):
        """Preprocess image for model input"""
        if isinstance(image, np.ndarray):
            image = Image.fromarray(image)
        return self.transform(image).unsqueeze(0)
    
    @torch.no_grad()
    def predict(self, image):
        """Run prediction on an image"""
        # Preprocess image
        x = self.preprocess_image(image).to(self.device)
        
        # Get model predictions
        outputs = self.model(x)
        
        # Process health status
        health_probs = torch.softmax(outputs['health_status'], dim=1)
        health_idx = torch.argmax(health_probs, dim=1).item()
        health_confidence = health_probs[0][health_idx].item()
        
        # Process conditions
        condition_probs = torch.sigmoid(outputs['conditions'])
        condition_threshold = 0.5
        detected_conditions = []
        
        for idx, prob in enumerate(condition_probs[0]):
            if prob.item() > condition_threshold:
                detected_conditions.append({
                    'condition': self.condition_map[idx],
                    'confidence': prob.item()
                })
        
        return {
            'health_status': self.health_status_map[health_idx],
            'confidence': health_confidence,
            'conditions_detected': detected_conditions,
        }

# Usage example:
# predictor = PetHealthPredictor('path/to/model.pth')
# result = predictor.predict(image)
