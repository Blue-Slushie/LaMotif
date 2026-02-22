import os
import time
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import requests
from PIL import Image
from io import BytesIO

# Configuration
save_dir = r"C:\Users\ghosh\Desktop\lamotif website\LaMotif\src\assets"
Path(save_dir).mkdir(parents=True, exist_ok=True)

# All 32 Facebook Photo IDs with item names
items = [
    ("1525891569544843", "IMG_1525891569544843_Statement_Neckpiece"),
    ("1526064596200581", "IMG_1526064596200581_Dove_Choker"),
    ("1525905062877401", "IMG_1525905062877401_Pendant_Necklace"),
    ("1525898132878094", "IMG_1525898132878094_Rutile_Necklace"),
    ("1525878969557177", "IMG_1525878969557177_Coral_Moissanite"),
    ("1525736699343137", "IMG_1525736699343137_Spring_Earrings_1"),
    ("1525717459364938", "IMG_1525717459364938_Amethyst_Moissanite"),
    ("1525694799366204", "IMG_1525694799366204_Spring_Earrings_2"),
    ("1525672932879057", "IMG_1525672932879057_Multi_Line_Necklace"),
    ("1525651266192559", "IMG_1525651266192559_Dangling_Earrings"),
    ("1525602499543769", "IMG_1525602499543769_Gemstone_Mala"),
    ("779237164733460", "IMG_779237164733460_Jhumka_Earrings"),
    ("1525542139579595", "IMG_1525542139579595_Ruby_Necklace"),
    ("1525514439582365", "IMG_1525514439582365_Holi_Earrings"),
    ("1525477832576359", "IMG_1525477832576359_Hazel_Set"),
    ("1525457569244719", "IMG_1525457569244719_Duarsini_Choker"),
    ("1525431285914681", "IMG_1525431285914681_Unisex_Neckline"),
    ("1525408289248314", "IMG_1525408289248314_Sapphire_Set"),
    ("1525385692577407", "IMG_1525385692577407_Emerald_Necklace"),
    ("1525349385878371", "IMG_1525349385878371_Kundan_Polki_Set"),
    ("1525293325883887", "IMG_1525293325883887_Bead_Necklines"),
    ("1525269239552629", "IMG_1525269239552629_Sapphire_Necklace"),
    ("1525244952984391", "IMG_1525244952984391_Ruby_Valentine"),
    ("1525220385918514", "IMG_1525220385918514_Kundan_Jadau_Set"),
    ("1525202019253017", "IMG_1525202019253017_Moissanite_Set"),
    ("1525179222552897", "IMG_1525179222552897_Bangle_Collections"),
    ("1525146679539418", "IMG_1525146679539418_Humeur_Earrings"),
    ("1525118646508888", "IMG_1525118646508888_Kundan_Series"),
    ("1525094039916682", "IMG_1525094039916682_Humeur_Collection"),
    ("1525060499253369", "IMG_1525060499253369_Kadas_Set"),
    ("1525039879582098", "IMG_1525039879582098_Bodhu_Danglers"),
    ("1525015699585183", "IMG_1525015699585183_Kundan_Showcase"),
]

print(f"Starting download to: {save_dir}\n")
print("=" * 80)

# Initialize Selenium WebDriver
driver = webdriver.Chrome()  # Make sure you have ChromeDriver installed
driver.set_window_size(1280, 1024)

downloaded = 0
failed = []

for photo_id, filename in items:
    try:
        print(f"\nDownloading {downloaded + 1}/32: {filename}")
        
        # Navigate to Facebook photo
        url = f"https://www.facebook.com/photo/?fbid={photo_id}"
        driver.get(url)
        
        # Wait for image to load
        time.sleep(2)
        
        # Take screenshot of just the image
        screenshot_path = os.path.join(save_dir, f"{filename}.png")
        driver.save_screenshot(screenshot_path)
        
        print(f"✓ Saved: {filename}.png")
        downloaded += 1
        
    except Exception as e:
        print(f"✗ Failed: {filename} - {str(e)}")
        failed.append((filename, str(e)))
        time.sleep(1)

driver.quit()

print("\n" + "=" * 80)
print(f"\nDownload Summary:")
print(f"Successfully downloaded: {downloaded}/32")
print(f"Failed: {len(failed)}/32")

if failed:
    print("\nFailed items:")
    for name, error in failed:
        print(f"  - {name}: {error}")

print(f"\nAll images saved to: {save_dir}")
