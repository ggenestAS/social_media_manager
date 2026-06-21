"""
Package the organic-post skill as a .skill file.
Run from the repo root:

    python .agents/skills/organic-post/package_as_skill.py

This creates organic-post.skill in the repo root.
Drag it into Cowork > Settings > Skills to install.
"""
import zipfile
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
skill_dir = script_dir
repo_root = os.path.dirname(os.path.dirname(os.path.dirname(script_dir)))
output_path = os.path.join(repo_root, "organic-post.skill")

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
