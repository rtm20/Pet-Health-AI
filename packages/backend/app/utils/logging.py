import logging
from pathlib import Path
from datetime import datetime

# Configure logging
log_dir = Path(__file__).parent.parent / 'logs'
log_dir.mkdir(exist_ok=True)

# Create formatters and handlers
formatter = logging.Formatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

# File handler for all logs
file_handler = logging.FileHandler(
    log_dir / f'api_{datetime.now().strftime("%Y%m%d")}.log'
)
file_handler.setFormatter(formatter)

# Error handler for error logs only
error_handler = logging.FileHandler(
    log_dir / f'error_{datetime.now().strftime("%Y%m%d")}.log'
)
error_handler.setFormatter(formatter)
error_handler.setLevel(logging.ERROR)

def get_logger(name: str) -> logging.Logger:
    """Get a logger with the specified name"""
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)
    
    # Add handlers if they haven't been added already
    if not logger.handlers:
        logger.addHandler(file_handler)
        logger.addHandler(error_handler)
    
    return logger
