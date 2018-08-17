from django.conf.urls import url

from .views import (
    CategoryAPIView
)

urlpatterns = [
    url(r'^category/?$', CategoryAPIView.as_view()),
]