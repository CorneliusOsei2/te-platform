import app.ents.learning.models as learning_models
import app.ents.learning.schema as learning_schema
import app.ents.learning.dependencies as learning_dependencies


def read_lessons_v1(skip: int, limit: int):
    dsa_lessons = learning_dependencies.read_lessons_v1()
    return dsa_lessons


def create_lesson_v1(data: learning_schema.LessonCreate):
    lesson = learning_models.Lesson(**data.dict())

    return lesson
