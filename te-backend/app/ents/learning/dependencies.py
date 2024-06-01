import json
import os


def read_lessons_v1():
    with open("app/ents/learning/data/dsa.json", "r") as f:
        lessons = json.load(f)
    return lessons
