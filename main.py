# -*- coding: utf-8 -*-
import webapp2
import json


class MainHandler(webapp2.RequestHandler):
    def get(self):
        """
        Método para gerênciar requisições GET.
        """
        message = {
            'msg': 'Hello Horld!'
        }

        self.response.headers['Content-Type'] = 'application/json; charset=utf-8'
        self.response.write(json.dumps(message))


class UsersIdHandler(webapp2.RequestHandler):
    def get(self):
        response = {
            'users_id': [1,2,3,4,5,6,7,8,9,10]
        }

        self.response.headers['Content-Type'] = 'application/json; charset=utf-8'
        self.response.write(json.dumps(response))

app = webapp2.WSGIApplication([
    ('/api/hello', MainHandler),
    ('/api/users', UsersIdHandler)
], debug=True)