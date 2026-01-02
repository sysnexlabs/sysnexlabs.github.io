import os
import base64
from PIL import Image

def create_svg_from_image(image, output_path):
    # Save image to bytes
    import io
    img_byte_arr = io.BytesIO()
    image.save(img_byte_arr, format='PNG')
    img_byte_arr = img_byte_arr.getvalue()
    b64_str = base64.b64encode(img_byte_arr).decode('utf-8')
    
    width, height = image.size
    
    svg_content = f'''<svg width="{width}" height="{height}" viewBox="0 0 {width} {height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <image width="{width}" height="{height}" xlink:href="data:image/png;base64,{b64_str}"/>
</svg>'''
    
    with open(output_path, 'w') as f:
        f.write(svg_content)

def extract_icons():
    # Configuration
    base_path = "/Users/schauanr/.gemini/antigravity/brain/7df47379-47a2-4b85-8ddd-f79e4a25b8b6"
    output_dir = "/Users/schauanr/Documents/sysnex/pages/sysnex-labs.github.io/src/assets/icons"
    os.makedirs(output_dir, exist_ok=True)
    
    images_config = [
        {
            "path": f"{base_path}/uploaded_image_0_1767373053732.png",
            "grid": (3, 2), # cols, rows
            "names": [
                "Multi-Platform Delivery", "AI-First Architecture", "10x Performance",
                "Git-Native Workflows", "Multi-Industry Compliance", "Enterprise Analytics"
            ],
            # Approximate standard box size or aspect ratio logic if detection fails
             # The image has white background. The icons are dark rounded squares.
        },
        {
            "path": f"{base_path}/uploaded_image_1_1767373053732.png",
            "grid": (2, 2),
            "names": [
                "Systems Engineering", "Model-Based Engineering",
                "Functional Safety", "Tool Development"
            ]
        }
    ]

    for config in images_config:
        print(f"Processing {config['path']}...")
        img = Image.open(config['path']).convert("RGBA")
        
        # Simple thresholding to find the dark boxes
        # The background is white (255, 255, 255). The boxes are dark blue.
        # We can find bounding boxes of connected components of non-white pixels.
        # But wait, the text is also non-white. We only want the big boxes.
        
        # Let's create a binary map: 1 where pixel is significantly dark, 0 otherwise
        # The text is black, the box is dark blue.
        # We can detect the boxes by size.
        
        width, height = img.size
        # Create a mask
        mask = Image.new('L', (width, height), 0)
        pixels = img.load()
        mask_pixels = mask.load()
        
        for y in range(height):
            for x in range(width):
                r, g, b, a = pixels[x, y]
                # Check for "dark" pixels (the box and text)
                # Background is essentially white
                if r < 240 or g < 240 or b < 240:
                    mask_pixels[x, y] = 255

        # Now find bounding boxes of the blobs
        try:
            # We can use a simple scan or recursion, but let's try a simpler grid approach since they are regular.
            # OR better: use the alpha channel if the image has one? No, it's likely a screenshot (flat).
            
            # Let's project to X and Y axes to find gaps.
            # Y-projection
            row_spans = []
            in_row = False
            start_y = 0
            
            # Count pixels in each row
            row_counts = [0] * height
            for y in range(height):
                count = 0
                for x in range(width):
                    if mask_pixels[x, y] == 255:
                        count += 1
                row_counts[y] = count
            
            # Identify rows (horizontal bands)
            # Threshold for "row presence"
            row_threshold = width * 0.1 # at least 10% of width is dark
            
            current_row_start = -1
            rows = []
            for y in range(height):
                if row_counts[y] > row_threshold:
                    if current_row_start == -1:
                        current_row_start = y
                else:
                    if current_row_start != -1:
                        # End of a row
                        if y - current_row_start > 50: # Minimum height to be a valid icon row
                            rows.append((current_row_start, y))
                        current_row_start = -1
                        
            # Now for each row, identify columns
            # But wait, the text is below the icon.
            # The icon box is a large block. The text is smaller lines below it.
            # If we project horizontally, we might see the icon block, a gap, then text?
            # Or maybe they are close.
            
            # Alternative: Find connected components (blobs).
            # Writing a full blob detector in pure python PIL is slow/hard.
            # BUT: The layout is a grid.
            # Detailed visual inspection of typical screenshots:
            # Image 0: 3 cols, 2 rows.
            # Image 1: 2 cols, 2 rows.
            # We can just construct the grid geometry if we find the outer bounds.
            
            # Let's find the bounds of all content
            left, top, right, bottom = mask.getbbox()
            
            # Naive grid slicing
            # This is risky if margins vary.
            # Let's try to detect the separate blobs.
            
            # IMPROVED STRATEGY:
            # 1. Scan for the large dark rectangular areas.
            # The icons are essentially large rects.
            # We can iterate through the mask and flood fill? No, too slow in pure python.
            
            # Let's stick to projections but be smarter.
            # X-projection (sum of dark pixels per column)
            col_counts = [0] * width
            for x in range(width):
                count = 0
                for y in range(height):
                    if mask_pixels[x, y] == 255:
                        count += 1
                col_counts[x] = count

            # Find column gaps
            cols = []
            current_col_start = -1
            col_threshold = height * 0.05
            
            for x in range(width):
                if col_counts[x] > col_threshold:
                    if current_col_start == -1:
                        current_col_start = x
                else:
                    if current_col_start != -1:
                        if x - current_col_start > 50:
                            cols.append((current_col_start, x))
                        current_col_start = -1
            
            # Now intersect rows and cols to get cells
            # We already found rows. We need to split rows if they contain text.
            # A "Row" found above might include the icon AND the text below it.
            # We need to separate the icon from the text.
            
            cells = []
            for r_start, r_end in rows:
                for c_start, c_end in cols:
                    # Defined cell region
                    # Check if there is content here
                    # Crop this cell
                    cell_crop = mask.crop((c_start, r_start, c_end, r_end))
                    if cell_crop.getbbox():
                        # Analyze vertical profile of this cell to separate Icon from Text
                        # The icon is the top massive block. Text is below.
                        # Project Y within this cell.
                        c_w, c_h = cell_crop.size
                        cell_row_counts = [0] * c_h
                        c_pixels = cell_crop.load()
                        for cy in range(c_h):
                            cnt = 0
                            for cx in range(c_w):
                                if c_pixels[cx, cy] == 255:
                                    cnt += 1
                            cell_row_counts[cy] = cnt
                            
                        # Find the first block (Icon)
                        # It should start near 0 (relative) and end before the text.
                        # Look for a gap after the big block.
                        
                        icon_bottom = c_h
                        # Scan from top
                        in_block = False
                        # We expect a solid block of high density
                        
                        for cy in range(c_h):
                             # Simple heuristic: if row is mostly empty, it's a gap
                             if cell_row_counts[cy] < (c_w * 0.1): # Empty-ish
                                 if in_block:
                                     # We just finished the icon block
                                     icon_bottom = cy
                                     break
                             else:
                                 in_block = True
                        
                        # Now we have the icon bounds within the cell
                        # (c_start, r_start) to (c_end, r_start + icon_bottom)
                        
                        # Refine width? Usually the column detection is tight enough.
                        
                        cells.append({
                            "box": (c_start, r_start, c_end, r_start + icon_bottom),
                            "center_y": r_start + (icon_bottom/2),
                            "center_x": c_start + ((c_end - c_start)/2)
                        })

            # Sort cells
            # Row-major order: Sort by center_y, then center_x
            # We need to group by row approximately
            cells.sort(key=lambda k: k["center_y"])
            
            # Group into rows
            sorted_cells = []
            if cells:
                current_row_y = cells[0]["center_y"]
                current_row_cells = []
                row_tolerance = 50 # pixels
                
                for cell in cells:
                    if abs(cell["center_y"] - current_row_y) < row_tolerance:
                        current_row_cells.append(cell)
                    else:
                        # New row
                        # Sort previous row by X
                        current_row_cells.sort(key=lambda k: k["center_x"])
                        sorted_cells.extend(current_row_cells)
                        
                        current_row_cells = [cell]
                        current_row_y = cell["center_y"]
                
                # Append last row
                current_row_cells.sort(key=lambda k: k["center_x"])
                sorted_cells.extend(current_row_cells)

            # Check if count matches
            expected_count = len(config["names"])
            if len(sorted_cells) != expected_count:
                print(f"Warning: Found {len(sorted_cells)} cells but expected {expected_count} for {config['path']}")
                # Proceed anyway, matching as many as possible
            
            for i, cell in enumerate(sorted_cells):
                if i >= len(config["names"]):
                    break
                
                name = config["names"][i]
                safe_name = name.replace(" ", "-").replace("/", "-").lower()
                # Extra cleanup for safe filename
                safe_name = "".join([c for c in safe_name if c.isalnum() or c == '-'])
                
                box = cell["box"]
                # Crop from original color image
                icon_img = img.crop(box)
                
                # Save
                output_filename = f"{output_dir}/{safe_name}.svg"
                create_svg_from_image(icon_img, output_filename)
                print(f"Saved {output_filename}")
                
        except Exception as e:
            print(f"Error processing {config['path']}: {e}")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    extract_icons()
