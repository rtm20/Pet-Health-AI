from fastapi import APIRouter, UploadFile, File, HTTPException, Query
from PIL import Image
import io
from typing import Optional
from app.models.model_loader import PetHealthModelLoader
from app.utils.image_processing import preprocess_image, detect_image_issues, format_results
from app.schemas.health import (
    AnalysisType,
    AnalysisResponse,
    AnalysisTypesResponse,
    AnalysisTypeInfo
)
from app.utils.logging import get_logger

router = APIRouter()
model_loader = PetHealthModelLoader()
logger = get_logger("health_analysis")

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_pet_health(
    image: UploadFile = File(...),
    pet_id: Optional[str] = None,
    analysis_type: AnalysisType = Query(default=AnalysisType.GENERAL)
):
    """
    Analyze pet health from uploaded image
    
    Parameters:
    - image: Pet photo to analyze
    - pet_id: Optional ID of the pet
    - analysis_type: Type of analysis to perform
    
    Returns:
    - Analysis results including health status, conditions, and recommendations
    """
    try:
        logger.info(f"Starting health analysis - Type: {analysis_type}, Pet ID: {pet_id}")
        
        # Read and validate image
        contents = await image.read()
        img = Image.open(io.BytesIO(contents))
        
        # Check for image issues
        issues = detect_image_issues(img)
        if issues:
            logger.warning(f"Image quality issues detected: {issues}")
            return {
                "status": "error",
                "message": "Image quality issues detected",
                "issues": issues
            }
        
        # Preprocess image
        processed_image = preprocess_image(img)
        
        # Run analysis
        raw_results = model_loader.analyze_health(processed_image)
        
        # Format results
        results = format_results(raw_results)
        
        logger.info(f"Analysis completed successfully - Health Status: {results['health_status']}")
        
        return {
            "status": "success",
            "pet_id": pet_id,
            "analysis_type": analysis_type,
            "results": results
        }
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing image: {str(e)}"
        )

@router.get("/analysis-types", response_model=AnalysisTypesResponse)
async def get_analysis_types():
    """
    Get available analysis types
    
    Returns:
    - List of available analysis types with descriptions
    """
    return {
        "analysis_types": [
            AnalysisTypeInfo(
                id=AnalysisType.GENERAL,
                name="General Health",
                description="Overall health assessment"
            ),
            AnalysisTypeInfo(
                id=AnalysisType.SKIN,
                name="Skin & Coat",
                description="Skin conditions, parasites, coat quality"
            ),
            AnalysisTypeInfo(
                id=AnalysisType.EYES,
                name="Eye Health",
                description="Eye clarity, discharge, inflammation"
            ),
            AnalysisTypeInfo(
                id=AnalysisType.EARS,
                name="Ear Health",
                description="Ear infections, wax buildup, inflammation"
            ),
            AnalysisTypeInfo(
                id=AnalysisType.MOUTH,
                name="Oral Health",
                description="Teeth, gums, oral hygiene"
            )
        ]
    }
