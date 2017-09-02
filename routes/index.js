var express = require("express"),
    router = express.Router(),
    User = require("../models/user"),
    passport = require("passport");

router.get("/", function(req, res){
   res.render("landing"); 
});
//AUTH Routes
router.get("/register", function(req, res){
    res.render("register");
});
//handle registration logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp, " + user.username);
            res.redirect("/campgrounds");
        });
    });
});
//show login form
router.get("/login", function(req, res){
    res.render("login");
});
//handle login logic
router.post("/login", passport.authenticate("local",
    {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
    }));
//logout logic
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Successfully logged out. Bye!");
    res.redirect("/campgrounds");
});



module.exports = router;