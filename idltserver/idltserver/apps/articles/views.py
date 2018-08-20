from rest_framework import generics, mixins, status, viewsets
from rest_framework.exceptions import NotFound
from rest_framework.permissions import (
    AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
)
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Article, ProgrammingLanguage, ProgrammingLanguagewithCategory, Category
from .renderers import CategoryJSONRenderer, ArticleJSONRenderer, ProgrammingLanguageJSONRenderer
from .serializers import ArticleSerializer, CategorySerializer, ProgrammingLanguageSerializer, ProgrammingLanguagewithCategorySerializer


class ProgrammingLanguageAPIView(generics.ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ProgrammingLanguageSerializer
    renderer_classes = (ProgrammingLanguageJSONRenderer,)
    
    
    def list(self, request):
        serializer_context = {'request': request}
        try:
            serializer_instance = ProgrammingLanguage.objects.all()
        except ProgrammingLanguage.DoesNotExist:
            raise NotFound('Can not find any programming language.')

        serializer = self.serializer_class(
            serializer_instance,
            context=serializer_context,
            many=True
        )

        return Response(serializer.data, status=status.HTTP_200_OK)


class CategoryAPIView(generics.RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = CategorySerializer
    renderer_classes = (CategoryJSONRenderer,)

    def retrieve(self, request):
        serializer_context = {'request': request}
        try:
            category_id = request.GET['category']
        except:
            category_id = 1
        try:
            serializer_instance = Category.objects.get(id=category_id)
        except Category.DoesNotExist:
            raise NotFound('An article with this slug does not exist.')

        serializer = self.serializer_class(
            serializer_instance,
            context=serializer_context
        )

        return Response(serializer.data, status=status.HTTP_200_OK)
    
class ArticleViewSet(generics.RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ArticleSerializer
    renderer_classes = (ArticleJSONRenderer,)

    def retrieve(self, request):
        serializer_context = {'request': request}
        serializer = self.serializer_class(
            Article.objects.first(),
            context=serializer_context,
        )

        return Response(serializer.data, status=status.HTTP_200_OK)




# class ArticleViewSet(mixins.CreateModelMixin,mixins.ListModelMixin,mixins.RetrieveModelMixin,viewsets.GenericViewSet):
#     lookup_field = 'slug'
#     queryset = Article.objects.select_related('author', 'author__user')
#     permission_classes = (IsAuthenticatedOrReadOnly,)
#     renderer_classes = (ArticleJSONRenderer,)
#     serializer_class = ArticleSerializer

#     def get_queryset(self):
#         queryset = self.queryset

#         author = self.request.query_params.get('author', None)
#         if author is not None:
#             queryset = queryset.filter(author__user__username=author)
        
#         tag = self.request.query_params.get('tag', None)
#         if tag is not None:
#             queryset = queryset.filter(tags__tag=tag)

#         favorited_by = self.request.query_params.get('favorited', None)
#         if favorited_by is not None:
#             queryset = queryset.filter(
#                 favorited_by__user__username=favorited_by
#             )
        
#         return queryset

#     def create(self, request):
#         serializer_context = {
#             'author': request.user.profile,
#             'request': request
#         }
#         serializer_data = request.data.get('article', {})

#         serializer = self.serializer_class(
#             data=serializer_data, context=serializer_context
#         )

#         serializer.is_valid(raise_exception=True)
#         serializer.save()

#         return Response(serializer.data, status=status.HTTP_201_CREATED)

#     def list(self, request):
#         serializer_context = {'request': request}
#         page = self.paginate_queryset(self.get_queryset())

#         serializer = self.serializer_class(
#             page,
#             context=serializer_context,
#             many=True
#         )

#         return self.get_paginated_response(serializer.data)

#     def retrieve(self, request, slug):
#         serializer_context = {'request': request}

#         try:
#             serializer_instance = self.queryset.get(slug=slug)
#         except Article.DoesNotExist:
#             raise NotFound('An article with this slug does not exist.')

#         serializer = self.serializer_class(
#             serializer_instance,
#             context=serializer_context
#         )

#         return Response(serializer.data, status=status.HTTP_200_OK)

#     def update(self, request, slug):
#         serializer_context = {'request': request}

#         try:
#             serializer_instance = self.queryset.get(slug=slug)
#         except Article.DoesNotExist:
#             raise NotFound('An article with this slug does not exist.')

#         serializer_data = request.data.get('article', {})

#         serializer = self.serializer_class(
#             serializer_instance,
#             context=serializer_context,
#             data=serializer_data,
#             partial=True
#         )
#         serializer.is_valid(raise_exception=True)
#         serializer.save()

#         return Response(serializer.data, status=status.HTTP_200_OK)

