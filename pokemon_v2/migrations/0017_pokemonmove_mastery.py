# Generated by Django 3.2.23 on 2024-09-22 08:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pokemon_v2', '0016_typesprites'),
    ]

    operations = [
        migrations.AddField(
            model_name='pokemonmove',
            name='mastery',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
