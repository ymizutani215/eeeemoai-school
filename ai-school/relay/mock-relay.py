#!/usr/bin/env python3
from http.server import BaseHTTPRequestHandler, HTTPServer
import json

class Handler(BaseHTTPRequestHandler):
    def _send(self, code, body):
        data = json.dumps(body).encode('utf-8')
        self.send_response(code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_POST(self):
        if self.path != '/chatwork':
            self._send(404, {'ok': False, 'error': 'not found'})
            return

        try:
            length = int(self.headers.get('Content-Length', '0'))
            raw = self.rfile.read(length).decode('utf-8')
            payload = json.loads(raw)
        except Exception as e:
            self._send(400, {'ok': False, 'error': f'invalid json: {e}'})
            return

        required = ['provider', 'roomId', 'message']
        missing = [k for k in required if not payload.get(k)]
        if missing:
            self._send(400, {'ok': False, 'error': f'missing fields: {", ".join(missing)}'})
            return

        print('--- relay received ---')
        print(json.dumps(payload, ensure_ascii=False, indent=2))
        print('----------------------')
        self._send(200, {'ok': True, 'provider': payload.get('provider'), 'roomId': payload.get('roomId')})

if __name__ == '__main__':
    server = HTTPServer(('127.0.0.1', 8788), Handler)
    print('Mock relay listening at http://127.0.0.1:8788/chatwork')
    server.serve_forever()
