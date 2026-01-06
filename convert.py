import json
from pathlib import Path
from datetime import datetime, timezone

for file in Path("data/s6/gallery").iterdir():
    timestamp = datetime.fromtimestamp(file.stat().st_mtime, tz = timezone.utc).isoformat(timespec = "milliseconds").replace("+00:00", "Z")
    file.with_suffix(".json").write_text(json.dumps({
        "camera": "8018c39c-3d81-434e-a02d-6e0813340fd6",
        "description": "",
        "filename": str(file.with_suffix(".avif")),
        "name": "",
        "season": "s6",
        "time": str(timestamp),
        "url": f"/data/s5/gallery/{file.with_suffix('.avif')}"
    }, indent = 4))

