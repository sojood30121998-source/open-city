#!/usr/bin/env bash
# Plan (default) or execute one Banana render for this floor plan.
# Usage: plan.sh <cutaway|kitchen|living|dining> [--execute --confirm APPROVAL_ID]
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
view="$1"; shift
ratio="$(python3 -I -c 'import json,sys;print(json.load(open(sys.argv[1]))["output"]["aspect_ratio"])' "$here/briefs/$view.json")"
python3 "$here/../../.claude/skills/banana/scripts/edit.py" \
  --image "$here/floor-plan.png" --reference-name "user floor plan" --reference-role object \
  --reference-purpose "geometry and furniture layout" --reference-subject-id open-plan-floor \
  --prompt "$(cat "$here/briefs/$view.prompt.txt")" --model gemini-3-pro-image \
  --aspect-ratio "$ratio" --resolution 1K --mime-type image/jpeg \
  --output-dir "$here/renders" --brief-file "$here/briefs/$view.json" --label "$view" "$@"
