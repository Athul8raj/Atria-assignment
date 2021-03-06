# Generated by Django 2.2.5 on 2021-01-23 04:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Sensor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sensor_type', models.CharField(max_length=200, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='SensorData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reading', models.FloatField()),
                ('timestamp', models.DateTimeField()),
                ('sensor_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sensor.Sensor')),
            ],
        ),
    ]
