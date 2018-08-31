from rest_framework import generics, mixins, status, viewsets
from rest_framework.exceptions import NotFound
from rest_framework.permissions import (
    AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser
)
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Article, ProgrammingLanguage, ProgrammingLanguagewithCategory, Category
from .renderers import CategoryJSONRenderer, ArticleJSONRenderer, ProgrammingLanguageJSONRenderer
from .serializers import (
    ArticleSerializer, 
    CategorySerializer, 
    ProgrammingLanguageSerializer, 
    ProgrammingLanguagewithCategorySerializer,
    ArticleswithCategorySerializer,
    ArticlesPLwithCategorySerializer
)


class ProgrammingLanguageAPIView(generics.ListCreateAPIView):
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

    def create(self, request):
        data = request.data.get('prolang', {})
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CategoryAPIView(generics.RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = CategorySerializer
    renderer_classes = (CategoryJSONRenderer,)

    def retrieve(self, request):
        serializer_context = {'request': request}
        try:
            serializer_instance = Category.objects.get(id=0)
        except Category.DoesNotExist:
            raise NotFound('the Category with this slug does not exist.')

        serializer = self.serializer_class(
            serializer_instance,
            context=serializer_context
        )

        return Response(serializer.data, status=status.HTTP_200_OK)

class CategoryEditViewSet(viewsets.GenericViewSet,mixins.CreateModelMixin,mixins.UpdateModelMixin,mixins.DestroyModelMixin):
    permission_classes = (IsAdminUser,)
    serializer_class = CategorySerializer
    renderer_classes = (CategoryJSONRenderer,)
    queryset = Category.objects.all()

    def get_queryset(self): 
        queryset = self.queryset
        
        return queryset

    def create(self, request):
        serializer_context = {
            'request': request
        }

        serializer_data = request.data.get('category', {})
        serializer = self.serializer_class(
            data=serializer_data, context=serializer_context
        )
        
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk):
        serializer_context = {'request': request}

        try:
            serializer_instance = self.queryset.get(nameslug=pk)
        except Category.DoesNotExist:
            raise NotFound('An category with this nameslug does not exist.')

        serializer_data = request.data.get('category', {})

        serializer = self.serializer_class(
            serializer_instance,
            context=serializer_context,
            data=serializer_data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, pk):

        try:
            serializer_instance = self.queryset.get(nameslug=pk)
        except Category.DoesNotExist:
            raise NotFound('An category with this nameslug does not exist.')

        self.perform_destroy(serializer_instance)

        return Response(None, status=status.HTTP_204_NO_CONTENT)



class ArticleAPIView(generics.RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ArticleswithCategorySerializer
    renderer_classes = (ArticleJSONRenderer,)

    def retrieve(self, request):
        serializer_context = {'request': request}
        if('nameslug' in request.GET):
            try:
                name_slug = request.GET['nameslug']
            except:
                name_slug = "root"
            try:
                serializer_instance = Category.objects.get(nameslug=name_slug)
            except Category.DoesNotExist:
                raise NotFound('An article with this slug does not exist.')
        else: 
            try:
                category_id = request.GET['category']
            except:
                category_id = 0
            try:
                serializer_instance = Category.objects.get(id=category_id)
            except Category.DoesNotExist:
                raise NotFound('An article with this slug does not exist.')

        serializer = self.serializer_class(
            serializer_instance,
            context=serializer_context
        )
        serializerdata = serializer.data
        try:
            subcate = request.GET['subcategory']
        except:
            subcate = "yes"
        if(subcate == "no"):
            serializerdata.pop('subcategories')
        return Response(serializerdata, status=status.HTTP_200_OK)


class ArticleEditViewSet(viewsets.GenericViewSet,mixins.CreateModelMixin,mixins.DestroyModelMixin):
    permission_classes = (IsAdminUser,)
    serializer_class = ArticlesPLwithCategorySerializer
    renderer_classes = (ArticleJSONRenderer,)
    queryset = ProgrammingLanguagewithCategory.objects.select_related('article')

    def get_queryset(self): 
        queryset = self.queryset
        
        return queryset

    def create(self, request):
        serializer_context = {
            'article': request.data.get('newarticle').get('article'),
            'request': request
        }
        serializer_data = request.data.get('newarticle', {})
        serializer = self.serializer_class(
            data=serializer_data, context=serializer_context
        )
        
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, pk):

        try:
            serializer_instance = self.queryset.get(id=pk)
        except Category.DoesNotExist:
            raise NotFound('An category with this nameslug does not exist.')

        self.perform_destroy(serializer_instance)

        return Response(None, status=status.HTTP_204_NO_CONTENT)

class ArticleUpdateAPIView(generics.UpdateAPIView):
    permission_classes = (IsAdminUser,)
    serializer_class = ArticleSerializer
    renderer_classes = (ArticleJSONRenderer,)

    def update(self, request, plwc):
        serializer_context = {'request': request}

        try:
            serializer_instance = Article.objects.get(plwc=plwc)
        except Article.DoesNotExist:
            raise NotFound('The Article with this plwc_id does not exist.')

        serializer_data = request.data.get('article', {})

        serializer = self.serializer_class(
            serializer_instance,
            context=serializer_context,
            data=serializer_data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)