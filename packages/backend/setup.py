from setuptools import setup, find_packages

setup(
    name="pet-health-ai",
    version="0.1",
    packages=find_packages(),
    install_requires=[
        "fastapi",
        "uvicorn",
        "tensorflow",
        "tensorflow-hub",
        "torch",
        "torchvision",
        "Pillow",
        "numpy",
        "python-multipart"
    ],
)
