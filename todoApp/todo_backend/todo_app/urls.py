from django.urls import path, include
from .views import todofunc, TodoViewSet
from rest_framework import routers

##Django REST framework (DRF)を使ってAPIのルーティングを設定する際のコード
#DefaultRouterはDjango REST frameworkの提供する標準のルーターです。このルーターは、ViewSetに基づいてURLパターンを自動的に生成し、またブラウザでのAPIナビゲーションを提供します。
router = routers.DefaultRouter()
#r'todo': この部分はURLパスのプレフィックスを指定　今回は/todo/というエンドポイントが生成されます。
#ViewSetを使用することで、CRUD操作（Create, Read, Update, Delete）に対応したエンドポイントが自動生成されます
router.register(r'todo', TodoViewSet)

#プロジェクトのurls.pyからアプリのurls.pyを呼び出す時はプロジェクトに記載した文字列情報は含まないようにする
urlpatterns = [
    path("todo_app/", todofunc),
    path("", include(router.urls))#viewsetを使う場合はrouterを使う
]
