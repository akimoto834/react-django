from django.http import HttpResponse
from rest_framework import viewsets
from .models import TodoModel
from .serializers import TodoSerializer

# Create your views here.

def todofunc(request):
    return HttpResponse("hello")

#ModelViewSet は、Django REST framework の ViewSet の一種で、標準的なCRUD操作（Create, Retrieve, Update, Delete）を提供します。
#このクラスを拡張することで、基本的なデータベース操作に対応するエンドポイントをすぐに利用できるようになります
#このTodoViewSetは以下のような機能を提供します：
#/todo/: GETリクエストで Todo オブジェクトの一覧を取得。
#/todo/: POSTリクエストで新しい Todo オブジェクトを作成。
#/todo/{id}/: 特定の Todo オブジェクトの詳細を取得（GET）、更新（PUT, PATCH）、削除（DELETE）。
#/todo/?name=example: nameフィールドでフィルタリングして結果を取得。
#これにより、Todoモデルに対する標準的なAPI操作を簡単に実装できます。
class TodoViewSet(viewsets.ModelViewSet):
    queryset = TodoModel.objects.all()
    #TodoモデルのインスタンスをJSONなどのフォーマットに変換するためのシリアライザを指定しています。TodoSerializerは、Todoモデルのフィールドをシリアライズ（データ変換）し、クライアントと通信できる形にします
    serializer_class = TodoSerializer
    #クエリパラメータを使ってフィルタリングができるフィールドを指定します。この場合、APIのリクエストで name フィールドに基づいてフィルタリングが可能です。例えば、/todo/?name=example といったリクエストが可能です。
    filter_fields = ("name",)
