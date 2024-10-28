from django.contrib import admin
from .models import SampleModel, TodoModel
# Register your models here.

admin.site.register(SampleModel)
admin.site.register(TodoModel)