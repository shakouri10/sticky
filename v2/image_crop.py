import os
from PIL import Image
import glob

def crop_image_to_content(input_path, output_path):
    image = Image.open(input_path)
    image = image.convert("RGBA")
    bbox = image.getbbox()
    if bbox:
        image_cropped = image.crop(bbox)
        image_cropped.save(output_path)
        print(f"Image cropped and saved to {output_path}")
    else:
        print(f"No need to crop {input_path}; it has no transparent borders.")

def process_directory(directory):
    # Create a directory for the cropped images if it doesn't exist
    output_directory = os.path.join(directory, "cropped")
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)
    
    # Process each PNG image in the directory
    for input_path in glob.glob(os.path.join(directory, "*.png")):
        filename = os.path.splitext(os.path.basename(input_path))[0]  # Get the file name without the extension
        output_filename = f"{filename}_cropped.png"  # Append '_cropped' to the filename
        output_path = os.path.join(output_directory, output_filename)
        crop_image_to_content(input_path, output_path)

def main():
    # Predefined directory path
    directory = "/Users/shak/program/sticker/v2"
    process_directory(directory)

if __name__ == "__main__":
    main()
