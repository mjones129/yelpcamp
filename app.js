var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    flash = require("connect-flash"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds"),
    methodOverride = require("method-override"),
    passport = require("passport"),
    LocalStrategy = require("passport-local")

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");
//seedDB();
var port = (process.env.PORT || 3000);
// mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true });
mongoose.connect("mongodb://matt:Aiden@ds151963.mlab.com:51963/yelp_camp", { useNewUrlParser: true});

mongoose.Promise = global.Promise;

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//PASSPORT configuration
app.use(require("express-session")({
    secret: "It blows my mind how intelligent Aiden is.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use(indexRoutes);

app.set("view engine", "ejs");



app.listen(port, function(){
  console.log("Listening on port " + port);
});
