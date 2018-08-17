from idltserver.apps.core.renderers import IdltJSONRenderer

class CategoryJSONRenderer(IdltJSONRenderer):
    object_label = 'categories'

    # def render(self, data, media_type=None, renderer_context=None):
    #     token = data.get('token', None)

    #     if token is not None and isinstance(token, bytes):
    #         data['token'] = token.decode('utf-8')

    #     return super(CategoryJSONRenderer, self).render(data)