from django.db import models

#データの名前、入れるデータとその型などを記述
#作成したモデルはadmin.pyに記述することで管理画面に反映される
# Create your models here.
#変更時はmigrationを行う必要がある
#python manage.py makemigrations "アプリ名(省略するとすべてのアプリに実行する)"
#を実行すると、モデル(model.py)に変更があれば、その変更をmigrationsディレクトリに新たにファイルを追加し記録する。
#その後python manage.py migrateを実行しデータベースにその変更を反映させる

class SampleModel(models.Model):
    title = models.CharField(max_length=100)
    number = models.IntegerField()

class TodoModel(models.Model):
    name = models.CharField(max_length=64, blank=False, null=False)
    checked = models.BooleanField(default=False)
    
    def __str__(self):
        return self.name
    
