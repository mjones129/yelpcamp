var Campground = require("../models/campground"),
    Comment = require("../models/comment")

//all the middleware goes here
var middlewareObj = {
    
}

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found.");
                res.redirect("/campgrounds");
                    } else {
                        //does user own campground?
                        if(foundCampground.author.id.equals(req.user._id)) {
                        next();    
                    } else {
                        req.flash("error", "It's impolite to delete other people's posts.");
                        res.redirect("back");
                    }
                    }
        });
    } else {
        req.flash("error", "HEY! Shouldn't you be logged in?");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
                    } else {
                        //does user own campground?
                        if(foundComment.author.id.equals(req.user._id)) {
                        next();    
                    } else {
                        req.flash("error", "Don't mess with other people's stuff, okay?");
                        res.redirect("back");
                    }
                    }
        });
    } else {
        req.flash("error", "You gotta be logged in to do that, champ.");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash("error", "You gotta be logged in to do that, man!");
        res.redirect("/login");
    }
};



module.exports = middlewareObj