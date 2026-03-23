import os
import re

comp_dir = r"d:\kmti-icad-hub\kmti-icad-hub\frontend\src\components\3D_Modeling"
assets_dir = r"d:\kmti-icad-hub\kmti-icad-hub\frontend\src\assets\3D_Image_File"

# Get all valid files, with a map from lowercase base name -> actual filename
valid_files = os.listdir(assets_dir)
valid_bases = {}
for f in valid_files:
    base, ext = os.path.splitext(f)
    valid_bases[base.lower()] = f
    # Also support exact matches in mapping
    valid_bases[f.lower()] = f

fixed_count = [0]

for root, _, files in os.walk(comp_dir):
    for fn in files:
        if fn.endswith(".tsx"):
            fp = os.path.join(root, fn)
            with open(fp, "r", encoding="utf-8") as file:
                content = file.read()
                
            new_content = content
            
            # Find all imports like: import name from '../../assets/3D_Image_File/filename';
            pattern = re.compile(r"(import\s+.*?from\s+['\"].*?assets/3D_Image_File/)([^'\"]+)(['\"])")
            
            def replace_match(match):

                prefix = match.group(1)
                img_name = match.group(2)
                suffix = match.group(3)
                
                base, ext = os.path.splitext(img_name)
                
                if img_name in valid_files:
                    return match.group(0) # Already correct
                    
                # Try finding by basename regardless of extension
                if base.lower() in valid_bases:
                    correct_name = valid_bases[base.lower()]
                    fixed_count[0] += 1
                    print(f"Fixed {img_name} -> {correct_name} in {fn}")
                    return prefix + correct_name + suffix
                
                print(f"MISSING: {img_name} in {fn}")
                return match.group(0)
                
            new_content = pattern.sub(replace_match, content)
            
            if new_content != content:
                with open(fp, "w", encoding="utf-8") as file:
                    file.write(new_content)

print(f"Done. Fixed {fixed_count[0]} imports.")
