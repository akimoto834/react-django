"""
WSGI config for todo_project project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""

#ウェブサーバーとdjango間を取り持つような役割
#ウェブサーバーから受け取ったrequestをdjangoが解釈できる形に変換し、djangoからのresponceをウェブサーバーが解釈できる形に変換する
#ウェブサーバー　⇔　wsgi ⇔ django (wsgi ⇔ django間はオブジェクトをやり取りしてる)
import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'todo_project.settings')

application = get_wsgi_application()
