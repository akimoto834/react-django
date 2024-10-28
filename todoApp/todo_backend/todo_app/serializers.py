from rest_framework import serializers
from .models import TodoModel

#入力された値をモデルに合わせてバリデーションし、レコードに伝える。
#このシリアライザを使用すると、Todoモデルのインスタンスを簡単にJSON形式に変換可能。
#また、クライアントから送信されたJSONデータを使ってTodoの新しいインスタンスを作成したり、既存のインスタンスを更新することも可能
class TodoSerializer(serializers.ModelSerializer):
   class Meta:#クラス内でシリアライザーの設定を指定
       model = TodoModel #シリアライザーが対応するモデルを指定 Todoモデルのフィールドと対応する形でシリアライズされる
       fields = ('id', 'name', 'checked')#シリアライズ対象のフィールドを指定