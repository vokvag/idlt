from django.conf.urls import include, url

from rest_framework.routers import DefaultRouter

from .views import (
    CategoryAPIView, ArticleAPIView, ProgrammingLanguageAPIView, CategoryEditViewSet, ArticleEditViewSet,ArticleUpdateAPIView
)

router = DefaultRouter(trailing_slash=False)
router.register(r'modifycategory', CategoryEditViewSet)
router.register(r'modifyarticle', ArticleEditViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^articles/?$', ArticleAPIView.as_view()),
    url(r'^categories/?$', CategoryAPIView.as_view()),
    url(r'^updatearticle/(?P<plwc>[-\d]+)/?$', ArticleUpdateAPIView.as_view()),
    url(r'^prolangs/?$', ProgrammingLanguageAPIView.as_view())
]