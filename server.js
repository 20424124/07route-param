// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var shortid = require('shortid')

app.set("view engine", "pug");
app.set("views", "./views");

//------------------- Database Lowdb
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);
// Set some defaults (required if your JSON file is empty)
db.defaults({ todos: [] })
    .write();

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// var todos = [
//   { id: 1, do: "Đi Chợ" },
//   { id: 2, do: "Nấu Cơm" },
//   { id: 3, do: "Rửa Bát" }

//https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  
  response.render("index",{
    todos: db.get('todos').value()
  });
});

app.get("/todos", (request, response) => {
  
  response.render("index",{
    todos: db.get('todos').value()
  });
});

// app.get("/todos", function(req, res) {
//   var q = req.query.q;
//   var matchedTodos = db.get('todos').value().filter(function(todo) {
//     console.log(todo.do.toLowerCase());
//     return todo.do.toLowerCase().indexOf(q) !== -1;
//   });
//   res.render("index", {
//     todos: matchedTodos
//   });
// });

app.get('/todos/create', function(req, res) {
    res.render('todos/create');
})

app.get('/todos/:id/delete', function(req, res) {
    var id = req.params.id;
    db.get('todos')
    .remove({ id: id })
    .write();
    res.render("index",{
    todos: db.get('todos').value()
  });
})

app.post("/todos/create", function(req, res){
    req.body.id = shortid.generate();
    db.get('todos').push(req.body).write();
    res.redirect('/');
})
// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
