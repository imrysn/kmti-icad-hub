"""
Generate Sample Excel File for Testing

Creates a sample iCAD manual Excel file based on SAMPLE_STRUCTURE.
Run this to create test data for the knowledge base.

Usage:
    python generate_sample_excel.py
"""

import pandas as pd
from pathlib import Path

# Sample data structure
data = {
    "Concept ID": [
        "orthographic_view_intro",
        "isometric_view_basics", 
        "tolerance_specs",
        "surface_creation",
        "assembly_basics",
        "3d_modeling_intro",
        "dimension_tools",
        "layer_management"
    ],
    "Topic": [
        "Orthographic Projection",
        "Isometric View",
        "Tolerance Specifications",
        "Surface Modeling",
        "Component Assembly",
        "3D Modeling Basics",
        "Dimensioning Tools",
        "Layer Management"
    ],
    "Description": [
        "A method of representing 3D objects in 2D using parallel projection lines perpendicular to the projection plane.",
        "A type of axonometric projection showing all three dimensions with 30-degree angles from the horizontal.",
        "Acceptable deviation from nominal dimensions in technical drawings.",
        "Creating complex curved surfaces using NURBS or B-spline surfaces.",
        "Combining multiple parts into a single assembly with constraints.",
        "Fundamental 3D modeling operations including extrude, revolve, and sweep.",
        "Tools for adding precise measurements and annotations to technical drawings.",
        "Organizing drawing elements using layers for better control and visibility."
    ],
    "Instructions": [
        "1. Select the View menu. 2. Choose Orthographic. 3. Select Front, Top, or Side view.",
        "1. Go to View > Isometric. 2. The axes will rotate to 30-degree angles automatically.",
        "1. Select dimension. 2. Right-click > Properties. 3. Set Upper/Lower tolerance limits.",
        "1. Surface menu > Create Surface. 2. Select control points. 3. Adjust curve degree.",
        "1. File > New Assembly. 2. Insert parts. 3. Add mate constraints (coincident, parallel, etc.).",
        "1. Create sketch. 2. Select extrude/revolve/sweep. 3. Define parameters and direction.",
        "1. Select Dimension tool. 2. Click two points. 3. Position dimension text. 4. Press Enter.",
        "1. Open Layer Manager (Ctrl+L). 2. Create new layer. 3. Set properties (color, line type). 4. Assign objects to layer."
    ],
    "Tips": [
        "Use orthographic views for technical drawings with precise dimensions. No perspective distortion.",
        "Isometric views are ideal for visualizing 3D assemblies while maintaining scale.",
        "Standard tolerances: ±0.1mm for general features, ±0.01mm for precision fits.",
        "Use surface modeling for ergonomic designs, aerodynamic shapes, or aesthetic parts.",
        "Always constrain parts fully to avoid unexpected movement during design changes.",
        "Plan your modeling strategy before starting. Consider manufacturing constraints.",
        "Use reference dimensions (in parentheses) for calculated values that shouldn't be modified.",
        "Use separate layers for dimensions, centerlines, and construction geometry for clarity."
    ]
}

# Create DataFrame
df = pd.DataFrame(data)

# Ensure knowledge_base directory exists
Path("knowledge_base").mkdir(exist_ok=True)

# Save to Excel
output_path = "knowledge_base/sample_icad_manual.xlsx"
df.to_excel(output_path, index=False, engine='openpyxl')

print(f"✅ Created sample Excel file: {output_path}")
print(f"   Rows: {len(df)}")
print(f"   Columns: {list(df.columns)}")
print("\nNext steps:")
print(f"   1. Review the file: {output_path}")
print(f"   2. Ingest into ChromaDB: python ingest_knowledge_base.py {output_path}")
