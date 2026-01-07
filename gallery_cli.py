#!/usr/bin/python3
# Copyright (c) 2026 iiPython

# Modules
import json
import subprocess
from pathlib import Path
from datetime import datetime, timezone

import inquirer
from inquirer.errors import ValidationError

# Initialization
KNOWN_UUIDS = {
    "RomeoWasAsleep": "271f1987-57dc-4550-b7ad-a1b1c4bb1a7c",
	"tonyz1111":      "2fb80ffb-b4e8-46be-86f3-e7eae1a6c38f",
	"rockttlol":      "6102acab-975f-42bd-a720-144ca3995585",
	"eunyung":        "617d0b8a-148f-47c0-b4f4-36dfe1ac79c7",
	"iiPythonx":      "8018c39c-3d81-434e-a02d-6e0813340fd6",
	"LittleHebo":     "a695d266-e3fe-4931-a961-0d8eafc0385d",
	"ernistus":       "bf0f7598-e7fe-4e09-b7a2-a1289d907bbd",
	"DmmDGaming":     "d9736929-859d-478a-8575-02cc397673d7"
}
KNOWN_USERS = sorted(KNOWN_UUIDS.keys())

# Helping methods
def process_timestamp(timestamp: str) -> str:
    try:
        date = datetime.fromisoformat(timestamp)

    except ValueError:
        date = datetime.strptime(timestamp, "%m/%d/%y %I:%M %p").replace(tzinfo = timezone.utc)

    return date.isoformat(timespec = "milliseconds")[:-6] + "Z"

def validate_timestamp(_, timestamp: str) -> bool:
    try:
        process_timestamp(timestamp)
        return True

    except ValueError:
        raise ValidationError("", reason = "Invalid timestamp given.")

# Handle auto detection
for file in Path("data").rglob("*.avif"):
    data_file, image_data = file.with_suffix(".json"), {}

    # Figure out what we're missing
    if not data_file.is_file():
        required_fields = ["name", "description", "time", "camera"]

    else:
        image_data, required_fields = json.loads(data_file.read_text()), []
        for key, value in image_data.items():
            if isinstance(value, str) and not value.strip():
                required_fields.append(key)

    if not required_fields:
        continue

    # Load data
    season_id = file.parents[1].name
    season_data = json.loads((file.parents[1] / "season.json").read_text())

    # Launch image in current window
    subprocess.run(["vscodium", file.absolute()])

    # Ask our questions
    queries = {
        "name": inquirer.Text("name", message = "Screenshot Name", validate = lambda _, v: v.strip()),
        "description": inquirer.Text("description", message = "Short Description", validate = lambda _, v: v.strip()),
        "time": inquirer.Text("time", message = "Timestamp", validate = validate_timestamp, default = season_data["since"]),
        "camera": inquirer.List("camera", message = "Who took it?", choices = KNOWN_USERS)
    }
    answers = inquirer.prompt([queries[x] for x in ["name", "description", "time", "camera"] if x in required_fields])
    if answers is None:
        break

    if "time" in answers:
        answers["time"] = process_timestamp(answers["time"])

    if "name" in answers:
        answers["name"] = KNOWN_UUIDS[answers["name"]]

    # Save data to disk
    data_file.write_text(json.dumps(image_data | answers | {
        "filename": file.name,
        "season": season_id,
        "url": f"/data/{season_id}/gallery/{file.name}"
    }, indent = 4))
