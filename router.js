const http = require("http");

module.exports = class SimpleRouter {
  constructor() {
    this.stack = [];
    this.routes = [];
  }

  use(middleware) {
    if (typeof middleware !== 'function') {
      throw new Error('Middleware must be a function!');
    }
    this.stack.push(middleware);
  }

  addRoute(method, path, cb) {
    if (this.routes.find(r => r.path === path && r.method === method)) return;
    this.routes.push({
      method,
      path,
      cb,
    });
  }

  get(path, cb) {
    this.addRoute("GET", path, cb);
  }

  post(path, cb) {
    this.addRoute("POST", path, cb);
  }

  handle(req, res, cb) {
    let index = 0;
  
    const next = (err) => {
      if (err != null) {
        return cb(err);
      }
      if (index >= this.stack.length) {
        return this.route_handle(req, res, cb);
      }

      const middleware = this.stack[index++];
      try {
        middleware(req, res, next);
      } catch(error) {
        next(error);
      }
    };
  
    next();
  }

  route_handle(req, res, cb) {  
    const next = (err) => {
      if (err != null) {
        return cb(err);
      }
      
      const route = this.routes.find(r => r.method === req.method && r.path === req.url);

      if (!route) {
        res.writeHead(404);
        res.end('Page not found');
      }

      try {
        route.cb(req, res, next);
      } catch(error) {
        next(error);
      }
    };
  
    next();
  }

  listen(port, callback) {
    const handler = (req, res) => {
      this.handle(req, res, err => {
        if (err) {
          res.writeHead(500);
          res.end('Internal Server Error');
        }
      });
    };

    return http.createServer(handler).listen({ port }, callback);
  }
}
