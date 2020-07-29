# Simple Router

**Only for learning! Not for production!**
This is an example of a simple router implementation.

## Usage

- Copy the `router.js` file into you project.
- Import this file and use it. Like:
```
const SimpleRouter = require("./router");
const app = new SimpleRouter();
```
- Define middlewares with `.use`. Like:
```
app.use((req, res, next) => {
  console.log("Hello world!");
  next();
});
```
- Define routers with `.get` or `.post`. Like:
```
app.post('/', (req, res, next) => {
  res.end('POST /');
});
```

or

```
app.get('/', (req, res, next) => {
  res.end('GET /');
});
```
- Start the server:
```
app.listen(port);
```

## Example

You can find an example of usage in the `index.js` file
