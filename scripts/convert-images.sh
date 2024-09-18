#!/bin/bash

# IMPORTANT to use this script you need to install cwebp
# https://developers.google.com/speed/webp/docs/precompiled

# Define the directory containing the images
image_dir="public/images"

# Function to recursively convert PNG files
convert_images() {
  local dir="$1"
  
  # Iterate over each file in the directory
  for file in "$dir"/*; do
    if [ -d "$file" ]; then
      # If the file is a directory, recursively call convert_images on it
      convert_images "$file"
    elif [[ "$file" == *.png ]]; then
      # If the file is a PNG file, convert it to WebP
      filename=$(basename -- "$file")
      filename_no_ext="${filename%.*}"
      
      # Convert PNG to WebP
      cwebp -q 100 -lossless "$file" -o "$dir/$filename_no_ext.webp"
      
      # Check if conversion was successful
      if [ $? -eq 0 ]; then
        echo "Converted $filename to $filename_no_ext.webp"
        
        # Remove the original PNG file
        rm "$file"
        echo "Removed $filename"
      else
        echo "Failed to convert $filename"
      fi
    fi
  done
}

convert_images "$image_dir"