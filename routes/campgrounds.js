var express = require("express"),
router = express.Router(),
Campground = require("../models/campground"),
middleware = require("../middleware");

//INDEX Route
router.get("/", function(req, res){
    //get all campground from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log("Something went wrong...");
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
        
});
//NEW Route
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});
//CREATE Route
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, price: price, image: image, description: desc, author: author};
    //create a new campground and save to databse
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});
// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || foundCampground == undefined){
            console.log(err);
            req.flash('error', 'Sorry, that campground does not exist!');
            return res.redirect('/campgrounds');
        }
        console.log(foundCampground)
        //render show template with that campground
        res.render("campgrounds/show", {campground: foundCampground});
    });
});


// EDIT - shows edit form for a campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
      if(err || foundCampground == undefined){
          console.log(err);
          req.flash('error', 'Sorry, that campground does not exist!');
          return res.redirect('/campgrounds');
      }
      //render edit template with that campground
      res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//UDATE Route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});
//DESTROY Route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
    
});



module.exports = router;