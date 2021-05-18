import express from "express";
import * as path from "path";
import hbs from "express-handlebars";
import cookieParser from "cookie-parser";

const rootDir = process.cwd();
const port = 3000;
const app = express();

// Выбираем в качестве движка шаблонов Handlebars
app.set("view engine", "hbs");
app.use(express.static('.'))
// Настраиваем пути и дефолтный view
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultView: "default",
    layoutsDir: path.join(rootDir, "/views/layouts/"),
    partialsDir: path.join(rootDir, "/views/partials/"),
  })
);

app.use(express.static('static'));


let orders = [];


app.get("/", (_, res) => {
  //res.sendFile(path.join(rootDir, "/static/html/index.html"));
  res.redirect('/menu')
});

app.get("/menu", (_, res) => {
  res.render("menu", {
    layout: "default",
    items: [
      {
        name: "Americano",
        image: "/img/americano.jpg",
        price: 999,
      },
      { name: "Cappuccino", image: "/img/cappuccino.jpg", price: 999 },
      { name: "Zaluppucino", image: "/img/flat-white.jpg", price: 999 },
      { name: "Xyuatte", image: "/img/latte.jpg", price: 999 },
    ],
  });
});

app.get("/buy/:name", (req, res) => {
  let paths = req.path.split('/');
  let order = {
    name: paths[paths.length-1],
    image: `/img/${paths[paths.length-1]}.jpg`,
    price: 5051
  }
  orders.push(order);
  console.log(orders);
  res.redirect('/menu')
});

app.get("/cart", (req, res) => {
  res.render('cart', {
    layout: "default",
    amount: 1000,
    items: orders
  })
});

app.post("/cart", (req, res) => {
  orders = [];
  res.redirect('/menu')
});

app.get("/login", (req, res) => {
  res.status(501).end();
});

app.listen(port, () => console.log(`App listening on port ${port}`));
