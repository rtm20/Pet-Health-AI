import requests
import json
from pathlib import Path

def test_health_check():
    """Test the health check endpoint"""
    response = requests.get("http://localhost:8000/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to Pet Health AI API"}
    print("✅ Health check endpoint working")

def test_analysis_types():
    """Test the analysis types endpoint"""
    response = requests.get("http://localhost:8000/api/v1/health/analysis-types")
    assert response.status_code == 200
    data = response.json()
    assert "analysis_types" in data
    assert len(data["analysis_types"]) > 0
    print("✅ Analysis types endpoint working")

def test_health_analysis():
    """Test the health analysis endpoint with a test image"""
    # Create a test image
    test_image_path = Path(__file__).parent / "test_data" / "images" / "test_pet.jpg"
    
    if not test_image_path.exists():
        print("❌ Test image not found")
        return
    
    with open(test_image_path, "rb") as f:
        files = {"image": ("test_pet.jpg", f, "image/jpeg")}
        data = {
            "pet_id": "test_pet_1",
            "analysis_type": "general"
        }
        response = requests.post(
            "http://localhost:8000/api/v1/health/analyze",
            files=files,
            data=data
        )
    
    assert response.status_code == 200
    result = response.json()
    assert "status" in result
    assert "results" in result
    print("✅ Health analysis endpoint working")
    print(f"Analysis result: {json.dumps(result, indent=2)}")

if __name__ == "__main__":
    print("Running API tests...")
    try:
        test_health_check()
        test_analysis_types()
        test_health_analysis()
        print("\n✨ All tests passed!")
    except Exception as e:
        print(f"\n❌ Test failed: {str(e)}")
