# Generated manually - JSON list fields -> TextField (one line = one item)

from django.db import migrations, models


def json_list_to_text(val):
    """Convert JSON list to text, one item per line."""
    if val is None:
        return ""
    if isinstance(val, list):
        return "\n".join(str(x).strip() for x in val if x)
    return str(val) if val else ""


def forward_convert(apps, schema_editor):
    Solution = apps.get_model("solutions", "Solution")
    for obj in Solution.objects.all():
        obj.avantage_ar_txt = json_list_to_text(getattr(obj, "avantage_ar", None))
        obj.avantage_fr_txt = json_list_to_text(getattr(obj, "avantage_fr", None))
        obj.avantage_en_txt = json_list_to_text(getattr(obj, "avantage_en", None))
        obj.avantage_es_txt = json_list_to_text(getattr(obj, "avantage_es", None))
        obj.avantage_de_txt = json_list_to_text(getattr(obj, "avantage_de", None))
        obj.principale_fonctions_ar_txt = json_list_to_text(getattr(obj, "principale_fonctions_ar", None))
        obj.principale_fonctions_fr_txt = json_list_to_text(getattr(obj, "principale_fonctions_fr", None))
        obj.principale_fonctions_en_txt = json_list_to_text(getattr(obj, "principale_fonctions_en", None))
        obj.principale_fonctions_es_txt = json_list_to_text(getattr(obj, "principale_fonctions_es", None))
        obj.principale_fonctions_de_txt = json_list_to_text(getattr(obj, "principale_fonctions_de", None))
        obj.use_cases_ar_txt = json_list_to_text(getattr(obj, "use_cases_ar", None))
        obj.use_cases_fr_txt = json_list_to_text(getattr(obj, "use_cases_fr", None))
        obj.use_cases_en_txt = json_list_to_text(getattr(obj, "use_cases_en", None))
        obj.use_cases_es_txt = json_list_to_text(getattr(obj, "use_cases_es", None))
        obj.use_cases_de_txt = json_list_to_text(getattr(obj, "use_cases_de", None))
        obj.save()


def backward_convert(apps, schema_editor):
    """When reversing, _txt fields exist again (after RenameField reverse) and JSON fields re-added (after RemoveField reverse)."""
    Solution = apps.get_model("solutions", "Solution")
    for obj in Solution.objects.all():
        obj.avantage_ar = _text_to_list(getattr(obj, "avantage_ar_txt", None) or "")
        obj.avantage_fr = _text_to_list(getattr(obj, "avantage_fr_txt", None) or "")
        obj.avantage_en = _text_to_list(getattr(obj, "avantage_en_txt", None) or "")
        obj.avantage_es = _text_to_list(getattr(obj, "avantage_es_txt", None) or "")
        obj.avantage_de = _text_to_list(getattr(obj, "avantage_de_txt", None) or "")
        obj.principale_fonctions_ar = _text_to_list(getattr(obj, "principale_fonctions_ar_txt", None) or "")
        obj.principale_fonctions_fr = _text_to_list(getattr(obj, "principale_fonctions_fr_txt", None) or "")
        obj.principale_fonctions_en = _text_to_list(getattr(obj, "principale_fonctions_en_txt", None) or "")
        obj.principale_fonctions_es = _text_to_list(getattr(obj, "principale_fonctions_es_txt", None) or "")
        obj.principale_fonctions_de = _text_to_list(getattr(obj, "principale_fonctions_de_txt", None) or "")
        obj.use_cases_ar = _text_to_list(getattr(obj, "use_cases_ar_txt", None) or "")
        obj.use_cases_fr = _text_to_list(getattr(obj, "use_cases_fr_txt", None) or "")
        obj.use_cases_en = _text_to_list(getattr(obj, "use_cases_en_txt", None) or "")
        obj.use_cases_es = _text_to_list(getattr(obj, "use_cases_es_txt", None) or "")
        obj.use_cases_de = _text_to_list(getattr(obj, "use_cases_de_txt", None) or "")
        obj.save()


def _text_to_list(text):
    if not text:
        return []
    return [line.strip() for line in text.splitlines() if line.strip()]


TEXT_FIELD = models.TextField(blank=True, default="")


class Migration(migrations.Migration):

    dependencies = [
        ("solutions", "0003_remove_solution_department"),
    ]

    operations = [
        # Add new TextFields with _txt suffix
        migrations.AddField(
            model_name="solution",
            name="avantage_ar_txt",
            field=TEXT_FIELD,
        ),
        migrations.AddField(
            model_name="solution",
            name="avantage_fr_txt",
            field=TEXT_FIELD,
        ),
        migrations.AddField(
            model_name="solution",
            name="avantage_en_txt",
            field=TEXT_FIELD,
        ),
        migrations.AddField(
            model_name="solution",
            name="avantage_es_txt",
            field=TEXT_FIELD,
        ),
        migrations.AddField(
            model_name="solution",
            name="avantage_de_txt",
            field=TEXT_FIELD,
        ),
        migrations.AddField(
            model_name="solution",
            name="principale_fonctions_ar_txt",
            field=TEXT_FIELD,
        ),
        migrations.AddField(
            model_name="solution",
            name="principale_fonctions_fr_txt",
            field=TEXT_FIELD,
        ),
        migrations.AddField(
            model_name="solution",
            name="principale_fonctions_en_txt",
            field=TEXT_FIELD,
        ),
        migrations.AddField(
            model_name="solution",
            name="principale_fonctions_es_txt",
            field=TEXT_FIELD,
        ),
        migrations.AddField(
            model_name="solution",
            name="principale_fonctions_de_txt",
            field=TEXT_FIELD,
        ),
        migrations.AddField(
            model_name="solution",
            name="use_cases_ar_txt",
            field=TEXT_FIELD,
        ),
        migrations.AddField(
            model_name="solution",
            name="use_cases_fr_txt",
            field=TEXT_FIELD,
        ),
        migrations.AddField(
            model_name="solution",
            name="use_cases_en_txt",
            field=TEXT_FIELD,
        ),
        migrations.AddField(
            model_name="solution",
            name="use_cases_es_txt",
            field=TEXT_FIELD,
        ),
        migrations.AddField(
            model_name="solution",
            name="use_cases_de_txt",
            field=TEXT_FIELD,
        ),
        migrations.RunPython(forward_convert, backward_convert),
        # Remove old JSON fields
        migrations.RemoveField(model_name="solution", name="avantage_ar"),
        migrations.RemoveField(model_name="solution", name="avantage_fr"),
        migrations.RemoveField(model_name="solution", name="avantage_en"),
        migrations.RemoveField(model_name="solution", name="avantage_es"),
        migrations.RemoveField(model_name="solution", name="avantage_de"),
        migrations.RemoveField(model_name="solution", name="principale_fonctions_ar"),
        migrations.RemoveField(model_name="solution", name="principale_fonctions_fr"),
        migrations.RemoveField(model_name="solution", name="principale_fonctions_en"),
        migrations.RemoveField(model_name="solution", name="principale_fonctions_es"),
        migrations.RemoveField(model_name="solution", name="principale_fonctions_de"),
        migrations.RemoveField(model_name="solution", name="use_cases_ar"),
        migrations.RemoveField(model_name="solution", name="use_cases_fr"),
        migrations.RemoveField(model_name="solution", name="use_cases_en"),
        migrations.RemoveField(model_name="solution", name="use_cases_es"),
        migrations.RemoveField(model_name="solution", name="use_cases_de"),
        # Rename _txt to final name
        migrations.RenameField(model_name="solution", old_name="avantage_ar_txt", new_name="avantage_ar"),
        migrations.RenameField(model_name="solution", old_name="avantage_fr_txt", new_name="avantage_fr"),
        migrations.RenameField(model_name="solution", old_name="avantage_en_txt", new_name="avantage_en"),
        migrations.RenameField(model_name="solution", old_name="avantage_es_txt", new_name="avantage_es"),
        migrations.RenameField(model_name="solution", old_name="avantage_de_txt", new_name="avantage_de"),
        migrations.RenameField(model_name="solution", old_name="principale_fonctions_ar_txt", new_name="principale_fonctions_ar"),
        migrations.RenameField(model_name="solution", old_name="principale_fonctions_fr_txt", new_name="principale_fonctions_fr"),
        migrations.RenameField(model_name="solution", old_name="principale_fonctions_en_txt", new_name="principale_fonctions_en"),
        migrations.RenameField(model_name="solution", old_name="principale_fonctions_es_txt", new_name="principale_fonctions_es"),
        migrations.RenameField(model_name="solution", old_name="principale_fonctions_de_txt", new_name="principale_fonctions_de"),
        migrations.RenameField(model_name="solution", old_name="use_cases_ar_txt", new_name="use_cases_ar"),
        migrations.RenameField(model_name="solution", old_name="use_cases_fr_txt", new_name="use_cases_fr"),
        migrations.RenameField(model_name="solution", old_name="use_cases_en_txt", new_name="use_cases_en"),
        migrations.RenameField(model_name="solution", old_name="use_cases_es_txt", new_name="use_cases_es"),
        migrations.RenameField(model_name="solution", old_name="use_cases_de_txt", new_name="use_cases_de"),
    ]
