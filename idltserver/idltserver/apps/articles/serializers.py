from rest_framework import serializers

from .models import (
    Category, Article, ProgrammingLanguage, ProgrammingLanguagewithCategory
)

class ArticleSerializer(serializers.ModelSerializer):
    createdAt = serializers.SerializerMethodField(method_name='get_created_at')
    updatedAt = serializers.SerializerMethodField(method_name='get_updated_at')

    class Meta:
        model = Article
        fields = (
            'plwc',
            'title',
            'body',
            'createdAt',
            'updatedAt'
        )

    def get_created_at(self, instance):
        return instance.created_at.isoformat()

    def get_updated_at(self, instance):
        return instance.created_at.isoformat()



class ProgrammingLanguageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProgrammingLanguage
        fields = ('id','name')


class FilteredListSerializer(serializers.ListSerializer):
    def to_representation(self, data):
        if('prolang1' in self.context['request'].GET and 'prolang2' in self.context['request'].GET):
                data = data.filter(prolang=self.context['request'].GET['prolang1']) | data.filter(prolang=self.context['request'].GET['prolang2'])
        elif('prolang1' in self.context['request'].GET):
                data = data.filter(prolang=self.context['request'].GET['prolang1'])
        return super(FilteredListSerializer, self).to_representation(data)


class ProgrammingLanguagewithCategorySerializer(serializers.ModelSerializer):
    plname = serializers.CharField(source='prolang.name', read_only=True)
    class Meta:
        list_serializer_class = FilteredListSerializer
        model = ProgrammingLanguagewithCategory
        fields = ('id','prolang','plname','category')


class ArticlesPLwithCategorySerializer(ProgrammingLanguagewithCategorySerializer):
    article = ArticleSerializer(read_only=True)

    class Meta:
        list_serializer_class = FilteredListSerializer
        model = ProgrammingLanguagewithCategory
        fields = ('id','prolang','plname','category','article')

    def create(self, validated_data):
        article = self.context.get('article',{})
        title = article.get('title')
        body = article.get('body')
        plwc = ProgrammingLanguagewithCategory.objects.create(**validated_data)
        Article.objects.create(plwc=plwc, title=title, body=body)

        return plwc


class RecursiveField(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data

class CategorySerializer(serializers.ModelSerializer):
    subcategories = RecursiveField(many=True,read_only=True)
    pl = ProgrammingLanguagewithCategorySerializer(many=True,read_only=True)

    class Meta:
        model = Category
        fields = ('id','name','nameslug','sort_order','parentcategory','pl','subcategories')

    def create(self, validated_data):

        category = Category.objects.create(**validated_data)

        return category

class ArticleswithCategorySerializer(serializers.ModelSerializer):
    subcategories = RecursiveField(many=True)
    pl = ArticlesPLwithCategorySerializer(many=True,read_only=True)

    class Meta:
        model = Category
        fields = ('id','name','nameslug','pl','subcategories')

