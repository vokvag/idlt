from django.conf.urls import url

from .views import (
    CategoryAPIView, ArticleViewSet
)

urlpatterns = [
    # url(r'^category/(?P<category_id>[-\d]+)/?$', CategoryAPIView.as_view()),
    url(r'^articles/?$', CategoryAPIView.as_view()),
    # url(r'^category/(?P<subcategory_id>[-\d]+)/lang/(?P<prolang_id>[-\d]+)/?$', ArticleViewSet.as_view()),
]