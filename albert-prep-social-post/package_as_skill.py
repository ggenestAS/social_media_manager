"""
Package the albert-prep-social-post skill as a .skill file.
Run from the 'Albert Prep' folder:

    cd "Albert Prep"
    python albert-prep-social-post/package_as_skill.py

This creates albert-prep-social-post.skill in the Albert Prep folder.
Drag it into Cowork > Settings > Skills to install.
"""
import zipfile
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
skill_dir = script_dir  # the skill folder IS this script's parent
output_path = os.path.join(os.path.dirname(script_dir), "albert-prep-social-post.skill")

# Files to include in the skill package
include = ["SKILL.md", "references/design-system.md",
           "references/pillar-1-calcul.md", "references/pillar-2-astuce.md",
           "references/pillar-3-serie.md", "references/pillar-4-reel.md"]

with zipfile.ZipFile(output_path, "w", zipfile.ZIP_DEFLATED) as zf:
    for rel_path in include:
        full_path = os.path.join(skill_dir, rel_path.replace("/", os.sep))
        if os.path.exists(full_path):
            zf.write(full_path, rel_path)
            print(f"  ✓ {rel_path}")
        else:
            print(f"  ✗ MISSING: {rel_path}")

size = os.path.getsize(output_path)
print(f"\nDone → {output_path} ({size} bytes)")
print("Install: drag the .skill file into Cowork > Settings > Skills")
