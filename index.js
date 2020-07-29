const SimpleRouter = require("./router");

const app = new SimpleRouter();
app.use((req, res, next) => {
  console.log("Hello world!");
  next();
});
app.post('/', (req, res, next) => {
  res.end('POST /');
});
app.get('/', (req, res, next) => {
  res.end('GET /');
});
server = app.listen(3000);