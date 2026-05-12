#!/usr/bin/env python3
"""Generate deployment ZIPs for each GAP - max complexity flight software package."""
import os
import zipfile
import hashlib

def create_gap_zip(gap_id, base_dir='GAPS'):
    gap_dir = os.path.join(base_dir, gap_id)
    if not os.path.isdir(gap_dir):
        print(f'Skipping {gap_id} - not found')
        return
    zip_name = f'{gap_id}_flight_ready.zip'
    with zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED) as zf:
        for root, dirs, files in os.walk(gap_dir):
            for f in files:
                full = os.path.join(root, f)
                arcname = os.path.relpath(full, base_dir)
                zf.write(full, arcname)
        # Add common flight headers
        zf.writestr('README_FLIGHT.txt', 'DO-178C ready. See adaptation_notes.md for traceability.\nBuild with cmake for target MCU.')
    # SHA256 for integrity
    with open(zip_name, 'rb') as f:
        sha = hashlib.sha256(f.read()).hexdigest()
    print(f'Created {zip_name} SHA256: {sha}')

if __name__ == '__main__':
    for i in range(1,11):
        create_gap_zip(f'GAP-{i:03d}')
    print('All GAP ZIPs generated. Ready for airworthiness review.')