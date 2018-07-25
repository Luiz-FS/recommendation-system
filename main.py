# -*- coding: utf-8 -*-
import webapp2
import json
import os
from backend import get_top_5_movies_knn, user_set, get_top_5_movies_svd, get_top_5_neighbors

__all__ = ['app']

class ResultsHandler(webapp2.RequestHandler):
    def get(self):
        """
        Método para gerênciar requisições GET.
        """
        uid = self.request.get('uid')
        response = {
            'result_knn': get_top_5_movies_knn(uid),
            'result_svd': get_top_5_movies_svd(uid),
            'neighbors': sorted(list(map(int, get_top_5_neighbors(uid))))
        }

        self.response.headers['Content-Type'] = 'application/json; charset=utf-8'
        self.response.write(json.dumps(response))


class UsersIdHandler(webapp2.RequestHandler):
    def get(self):
        response = {
            'users_id': sorted(list(map(int, user_set)))
        }

        self.response.headers['Content-Type'] = 'application/json; charset=utf-8'
        self.response.write(json.dumps(response))


class IndexHandler(webapp2.RequestHandler):
    def get(self):
        path = os.path.dirname(os.path.realpath(__file__))
        index_stream = open(path + '/frontend/index.html', 'r')
        index = index_stream.read()
        index_stream.close()
        self.response.write(index)

class StaticsFilesHandler(webapp2.RequestHandler):
    def get(self):
        path = os.path.dirname(os.path.realpath(__file__)) + '/frontend'
        path += self.request.path
        file_stream = open(path, 'r')
        data = file_stream.read()
        file_stream.close()

        if 'js' in path:
            self.response.headers['Content-Type'] = 'application/javascript'
        else:
            self.response.headers['Content-Type'] = 'text/css'

        self.response.write(data)
        

app = webapp2.WSGIApplication([
    ('/api/results.*', ResultsHandler),
    ('/api/users', UsersIdHandler),
    ('/', IndexHandler),
    ('/.*', StaticsFilesHandler)
], debug=True)


def main():
    from paste import httpserver
    httpserver.serve(app, host='127.0.0.1', port='8081')


if __name__ == '__main__':
    main()