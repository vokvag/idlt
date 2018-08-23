from django.conf.urls import url

from .views import (
    CategoryAPIView, ArticleAPIView, ProgrammingLanguageAPIView
)

urlpatterns = [
    # url(r'^category/(?P<category_id>[-\d]+)/?$', CategoryAPIView.as_view()),
    url(r'^articles/?$', ArticleAPIView.as_view()),
    url(r'^categories/?$', CategoryAPIView.as_view()),
    url(r'^prolangs/?$', ProgrammingLanguageAPIView.as_view()),
    # url(r'^category/(?P<subcategory_id>[-\d]+)/lang/(?P<prolang_id>[-\d]+)/?$', ArticleViewSet.as_view()),
]