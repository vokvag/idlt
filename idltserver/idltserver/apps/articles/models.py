from django.db import models

from idltserver.apps.core.models import TimestampedModel


class ProgrammingLanguage(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=255)

    parentcategory = models.ForeignKey('self' ,related_name='subcategories' ,blank=True ,null=True, on_delete=models.CASCADE)

    sort_order = models.IntegerField()

    def __str__(self):
        return self.name

    class Meta:
        unique_together=('parentcategory','sort_order')
        ordering=['sort_order']




class ProgrammingLanguagewithCategory(models.Model):
    prolang = models.ForeignKey('articles.ProgrammingLanguage', related_name='prolang', on_delete=models.CASCADE)

    category = models.ForeignKey('articles.Category', related_name='pl',on_delete=models.CASCADE)

    class Meta:
        unique_together = (("prolang", "category"),)


class Article(TimestampedModel):
    plwc= models.OneToOneField('articles.ProgrammingLanguagewithCategory',related_name='article', on_delete=models.CASCADE, db_index=True)

    title = models.CharField(db_index=True, max_length=255)

    body = models.TextField()

    def __str__(self):
        return self.title


