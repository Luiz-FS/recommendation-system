# -*- coding: utf-8 -*-
import webapp2
import json
from . import get_top_5_movies_knn, user_set, get_top_5_movies_svd

__all__ = ['app']

class ResultsHandler(webapp2.RequestHandler):
    def get(self):
        """
        Método para gerênciar requisições GET.
        """
        uid = self.request.get('uid')
        message = {
            'result_knn': get_top_5_movies_knn(uid),
            'result_svd': get_top_5_movies_svd(uid)
        }

        self.response.headers['Content-Type'] = 'application/json; charset=utf-8'
        self.response.write(json.dumps(message))


class UsersIdHandler(webapp2.RequestHandler):
    def get(self):
        response = {
            'users_id': sorted(list(map(int, user_set)))
        }

        self.response.headers['Content-Type'] = 'application/json; charset=utf-8'
        self.response.write(json.dumps(response))

app = webapp2.WSGIApplication([
    ('/api/results.*', ResultsHandler),
    ('/api/users', UsersIdHandler)
], debug=True)