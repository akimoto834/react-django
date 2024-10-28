from django.http import HttpResponse
from django.views.generic import TemplateView

def testfunc(request):
    responceObject = HttpResponse("<h1>this is test</h1>")#requestオブジェクトを受け取りresponceオブジェクトを返す
    return responceObject

class TestClass(TemplateView):#pythonでは引数にクラスを書くことで継承できる　testClassはTemplateViewを継承
    template_name = "test.html"