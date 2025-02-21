const express = require('express');
const app = express();
const cookieparser = require('cookie-parser');
const session = require('express-session')
const path = require("path");
const db = require("./config/mongoose-config");
const productRoutes = require('./routes/productsRouter')
const userRoutes = require('./routes/usersRouter')
const ownerRoutes = require('./routes/ownersRouter');
const indexRoutes = require('./routes/index')
const flash = require('connect-flash');
require("dotenv").config();

app.use(express.json());
app.use(session(
    {  resave: false,
       saveUninitialized: true,
       secret: process.env.SESSION_SECRET,
    }
))
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());
app.use(express.static(path.join( __dirname , "public")));
app.set("view engine" , "ejs");
app.use(flash());

app.use('/' , indexRoutes)
app.use('/owner' , ownerRoutes );
app.use('/products' , productRoutes );
app.use('/users' , userRoutes)

app.listen(3000);