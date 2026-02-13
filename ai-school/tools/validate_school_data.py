#!/usr/bin/env python3
"""Validate AI school content data before launch.

Usage:
  python3 tools/validate_school_data.py
  python3 tools/validate_school_data.py --check-videos
"""
from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path

ALLOWED_CATEGORIES = {
    "営業",
    "Amazon運用",
    "楽天運用",
    "自社サイト運用",
    "新人研修",
    "プロンプト集",
    "マーケティング用",
}

ALLOWED_DEPARTMENTS = {
    "新人研修",
    "営業",
    "運用",
    "経理・総務",
    "その他",
}

REQUIRED_KEYS = {"id", "title", "category", "duration", "description", "departments", "video"}


def eprint(msg: str) -> None:
    print(msg, file=sys.stderr)


def validate_course(course: dict, idx: int, check_videos: bool, root: Path) -> list[str]:
    errs: list[str] = []
    missing = REQUIRED_KEYS - set(course.keys())
    if missing:
        errs.append(f"[{idx}] missing keys: {sorted(missing)}")
        return errs

    if not isinstance(course["id"], str) or not course["id"].strip():
        errs.append(f"[{idx}] id is empty")
    if not isinstance(course["title"], str) or not course["title"].strip():
        errs.append(f"[{idx}] title is empty")
    if course["category"] not in ALLOWED_CATEGORIES:
        errs.append(f"[{idx}] invalid category: {course['category']}")

    deps = course.get("departments")
    if not isinstance(deps, list) or not deps:
        errs.append(f"[{idx}] departments must be non-empty list")
    else:
        bad = [d for d in deps if d not in ALLOWED_DEPARTMENTS]
        if bad:
            errs.append(f"[{idx}] invalid departments: {bad}")

    video = course.get("video")
    if not isinstance(video, str) or not video.strip():
        errs.append(f"[{idx}] video is empty")
    elif check_videos:
        rel = video.replace("./", "", 1)
        path = (root / rel).resolve()
        if not path.exists():
            errs.append(f"[{idx}] video file not found: {video}")

    return errs


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check-videos", action="store_true", help="check if video files exist")
    parser.add_argument("--file", default="courses.json", help="path to courses json (default: courses.json)")
    args = parser.parse_args()

    json_path = Path(args.file).resolve()
    if not json_path.exists():
        eprint(f"ERROR: file not found: {json_path}")
        return 2

    try:
        data = json.loads(json_path.read_text(encoding="utf-8"))
    except Exception as ex:
        eprint(f"ERROR: invalid JSON: {ex}")
        return 2

    if not isinstance(data, list):
        eprint("ERROR: root must be an array")
        return 2

    errors: list[str] = []
    ids = set()
    for i, course in enumerate(data, start=1):
        if not isinstance(course, dict):
            errors.append(f"[{i}] course must be object")
            continue

        cid = course.get("id")
        if isinstance(cid, str):
            if cid in ids:
                errors.append(f"[{i}] duplicated id: {cid}")
            ids.add(cid)

        errors.extend(validate_course(course, i, args.check_videos, json_path.parent))

    if errors:
        print("NG: courses.json validation failed")
        for err in errors:
            print(f" - {err}")
        return 1

    print("OK: courses.json validation passed")
    print(f" - courses: {len(data)}")
    print(f" - categories: {len({c.get('category') for c in data})}")
    print(f" - with video check: {'yes' if args.check_videos else 'no'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
