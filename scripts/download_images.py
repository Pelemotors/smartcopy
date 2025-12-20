#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script to download dental images from Pexels and Unsplash
"""
import os
import sys
import requests
from pathlib import Path

# Fix encoding for Windows console
if sys.platform == 'win32':
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer, 'strict')
    sys.stderr = codecs.getwriter('utf-8')(sys.stderr.buffer, 'strict')

# Base paths
BASE_DIR = Path(__file__).parent.parent
DENTAL_DIR = BASE_DIR / "public" / "images" / "dental"
SERVICES_DIR = DENTAL_DIR / "services"
BEFORE_AFTER_DIR = DENTAL_DIR / "before-after"

# Create directories if they don't exist
SERVICES_DIR.mkdir(parents=True, exist_ok=True)
BEFORE_AFTER_DIR.mkdir(parents=True, exist_ok=True)

# Image URLs from Pexels (free, no attribution required)
IMAGES = {
    # Main images
    DENTAL_DIR / "dental-lab-hero.jpg": "https://images.pexels.com/photos/6502631/pexels-photo-6502631.jpeg?auto=compress&cs=tinysrgb&w=1920",
    DENTAL_DIR / "dental-lab-about.jpg": "https://images.pexels.com/photos/12551732/pexels-photo-12551732.jpeg?auto=compress&cs=tinysrgb&w=1200",
    DENTAL_DIR / "dental-process.jpg": "https://images.pexels.com/photos/13085186/pexels-photo-13085186.jpeg?auto=compress&cs=tinysrgb&w=1200",
    DENTAL_DIR / "dental-technician.jpg": "https://images.pexels.com/photos/12551732/pexels-photo-12551732.jpeg?auto=compress&cs=tinysrgb&w=800",
    DENTAL_DIR / "dental-work.jpg": "https://images.pexels.com/photos/6502631/pexels-photo-6502631.jpeg?auto=compress&cs=tinysrgb&w=1200",
    DENTAL_DIR / "dental-smile.jpg": "https://images.pexels.com/photos/3771837/pexels-photo-3771837.jpeg?auto=compress&cs=tinysrgb&w=800",
    
    # Services images
    SERVICES_DIR / "crowns.jpg": "https://images.pexels.com/photos/6502631/pexels-photo-6502631.jpeg?auto=compress&cs=tinysrgb&w=800",
    SERVICES_DIR / "dentures.jpg": "https://images.pexels.com/photos/12551732/pexels-photo-12551732.jpeg?auto=compress&cs=tinysrgb&w=800",
    SERVICES_DIR / "bridges.jpg": "https://images.pexels.com/photos/13085186/pexels-photo-13085186.jpeg?auto=compress&cs=tinysrgb&w=800",
    SERVICES_DIR / "implants.jpg": "https://images.pexels.com/photos/6502631/pexels-photo-6502631.jpeg?auto=compress&cs=tinysrgb&w=800",
    SERVICES_DIR / "full-restoration.jpg": "https://images.pexels.com/photos/12551732/pexels-photo-12551732.jpeg?auto=compress&cs=tinysrgb&w=800",
    
    # Before/After images
    BEFORE_AFTER_DIR / "before-1.jpg": "https://images.pexels.com/photos/6502631/pexels-photo-6502631.jpeg?auto=compress&cs=tinysrgb&w=800",
    BEFORE_AFTER_DIR / "after-1.jpg": "https://images.pexels.com/photos/3771837/pexels-photo-3771837.jpeg?auto=compress&cs=tinysrgb&w=800",
    BEFORE_AFTER_DIR / "before-2.jpg": "https://images.pexels.com/photos/13085186/pexels-photo-13085186.jpeg?auto=compress&cs=tinysrgb&w=800",
    BEFORE_AFTER_DIR / "after-2.jpg": "https://images.pexels.com/photos/3771837/pexels-photo-3771837.jpeg?auto=compress&cs=tinysrgb&w=800",
    BEFORE_AFTER_DIR / "before-3.jpg": "https://images.pexels.com/photos/12551732/pexels-photo-12551732.jpeg?auto=compress&cs=tinysrgb&w=800",
    BEFORE_AFTER_DIR / "after-3.jpg": "https://images.pexels.com/photos/3771837/pexels-photo-3771837.jpeg?auto=compress&cs=tinysrgb&w=800",
}

def download_image(url: str, filepath: Path):
    """Download an image from URL to filepath"""
    try:
        print(f"Downloading {filepath.name}...")
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        
        filepath.parent.mkdir(parents=True, exist_ok=True)
        with open(filepath, 'wb') as f:
            f.write(response.content)
        print(f"OK: Downloaded {filepath.name} ({len(response.content)} bytes)")
        return True
    except Exception as e:
        print(f"ERROR: Failed to download {filepath.name}: {e}")
        return False

if __name__ == "__main__":
    print("Starting image downloads...")
    print(f"Base directory: {BASE_DIR}")
    print(f"Dental directory: {DENTAL_DIR}")
    print()
    
    success_count = 0
    total_count = len(IMAGES)
    
    for filepath, url in IMAGES.items():
        if download_image(url, filepath):
            success_count += 1
    
    print()
    print(f"Downloaded {success_count}/{total_count} images successfully")
