import json

from rest_framework.renderers import JSONRenderer

class IdltJSONRenderer(JSONRenderer):
    charset = 'utf-8'
    object_label = 'object'

    def render(self, data, media_type=None, renderer_context=None):

        if data.get('errors', None) is not None:
            return super(IdltJSONRenderer, self).render(data)

        else:
            return json.dumps({
                self.object_label:data
            })
        