const express = require("express");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const _handlebars = require('handlebars')
const Axios = require("axios");
const dateFormat = require("dateformat");
const mysql = require("mysql");
const User1 = require("./models/User1");
const { response } = require("express");
const Course = require("./models/Course");
const Category = require("./models/Category")

require("dotenv").config();

const port = process.env.PORT || 8080;

const app = express();

app.use(morgan("dev"));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose
  .connect(process.env.MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {})
  .catch((err) => console.log(err));

app.use(express.static(__dirname + "/public"));

app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main.hbs",
    handlebars: allowInsecurePrototypeAccess(_handlebars),
    extname: ".hbs",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
    helpers: {
      times: function (n, block) {
        var accum = "";
        for (var i = 0; i < n; ++i) accum += block.fn(i);
        return accum;
      },
    },
  })
);

app.set("view engine", "hbs");

app.use("/signup", require("./routes/register"));
app.use("/signin", require("./routes/signin"));
app.use("/logout", require("./routes/logout"));
app.use("/upload", require("./routes/upload"));
app.use("/profile", require("./routes/profile"));
app.use("/course", require("./routes/course"));
app.use("/update", require("./routes/update"));
app.use("/admin", require("./routes/admin"));
app.use("/",require("./routes/home"));

// app.use('/api/signin', require('./routes/login'));
// app.use('/api/user', require('./routes/user'));
// app.use('/api/posts', require('./routes/post'));
// app.use('/api/admin', require('./routes/admin'));

// app.get("/",(req,res)=>res.sendFile(`${__dirname}/index.html`));


app.get("/:page", async (req, res) => {
  let perPage = 1;
  let page = req.params.page || 1; 
  const courses = await Course.find({}).populate("teacher").lean()
            .skip((perPage * page) - perPage)
            .limit(perPage);
  const category = await Category.find({}).lean();
  res.render("home", {
    courses,
    category
  });
});

// app.get("/index",(req,res)=> res.sendFile(`${__dirname}/index.html`))


//app.get("/news", require("./routes/news"))




app.get("/index", (req, res) => res.render("haha"));

app.listen(3000, (req, res) => console.log(`Server started at localhost:3000`));

// const mysqlConnection = mysql.createConnection({
//   host:'localhost',
//   user:'root',
//   database:'my_db',
//   password:'password',
//   port:'3306'
// })

// mysqlConnection.connect();

// app.get('/create',(req,res)=>{
//   var sql = "INSERT INTO User (email,password,userName,age,address,phone) VALUES ?";
//     var values = [
//     ['hao@gmail.com', 'Bharatasd', 'Hao pro', 16,'hai ba trung','091323213'],  ];
//   mysqlConnection.query(sql,[values],(err,result)=>{
//     if(err) throw err;
//     console.log(result);
//     res.send("database created");
//   })
// })

// app.get('/query',  (req,res)=>{
//     User1.checkEmailExist('hao@gmail.com').then(response =>
//       res.send(response)
//     ).catch( err=>
//       res.send({message:"NOOOO"})
//     )

// })
