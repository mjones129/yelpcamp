var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
    {name: "Cloud's Rest",
     image: "https://source.unsplash.com/WLUHO9A_xik",
     description: "Cultivar kopi-luwak mug, fair trade, cream so, lungo con panna percolator caffeine, brewed qui ut cream, in, aftertaste, siphon dripper bar a redeye lungo. Percolator, instant rich shop aged organic, doppio mazagran, siphon grounds fair trade java con panna grinder extraction. To go mocha cinnamon, java, aftertaste so percolator lungo shop at lungo mocha cortado, caffeine single origin foam siphon, decaffeinated instant strong steamed pumpkin spice cappuccino. Grounds aftertaste frappuccino, medium saucer, et coffee mocha strong robust black, viennese, mazagran single shot cultivar black froth. Instant aftertaste roast filter, doppio qui cultivar milk lungo single origin a turkish, con panna chicory rich half and half steamed, coffee body sugar caffeine qui viennese aged. Galão latte blue mountain caffeine cup to go filter trifecta chicory breve, single shot in est milk foam instant single shot."
    },
    {name: "Mountain's Peak",
    image: "https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb",
    description: "Cultivar kopi-luwak mug, fair trade, cream so, lungo con panna percolator caffeine, brewed qui ut cream, in, aftertaste, siphon dripper bar a redeye lungo. Percolator, instant rich shop aged organic, doppio mazagran, siphon grounds fair trade java con panna grinder extraction. To go mocha cinnamon, java, aftertaste so percolator lungo shop at lungo mocha cortado, caffeine single origin foam siphon, decaffeinated instant strong steamed pumpkin spice cappuccino. Grounds aftertaste frappuccino, medium saucer, et coffee mocha strong robust black, viennese, mazagran single shot cultivar black froth. Instant aftertaste roast filter, doppio qui cultivar milk lungo single origin a turkish, con panna chicory rich half and half steamed, coffee body sugar caffeine qui viennese aged. Galão latte blue mountain caffeine cup to go filter trifecta chicory breve, single shot in est milk foam instant single shot."
    },
    {name: "Forest Run",
    image: "https://images.pexels.com/photos/111362/pexels-photo-111362.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb",
    description: "Cultivar kopi-luwak mug, fair trade, cream so, lungo con panna percolator caffeine, brewed qui ut cream, in, aftertaste, siphon dripper bar a redeye lungo. Percolator, instant rich shop aged organic, doppio mazagran, siphon grounds fair trade java con panna grinder extraction. To go mocha cinnamon, java, aftertaste so percolator lungo shop at lungo mocha cortado, caffeine single origin foam siphon, decaffeinated instant strong steamed pumpkin spice cappuccino. Grounds aftertaste frappuccino, medium saucer, et coffee mocha strong robust black, viennese, mazagran single shot cultivar black froth. Instant aftertaste roast filter, doppio qui cultivar milk lungo single origin a turkish, con panna chicory rich half and half steamed, coffee body sugar caffeine qui viennese aged. Galão latte blue mountain caffeine cup to go filter trifecta chicory breve, single shot in est milk foam instant single shot."
    }
    ];



function seedDB(){
    //REMOVE all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        //add a few campgrounds
         data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err);
            } else {
                console.log("added a campground!");
                //create a comment
                Comment.create(
                    {
                        text: "This place is great but I wish it had internet.",
                        author: "Homer"
                    }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created new comment");
                            }
                        });
                }
            });
        });
    });
}
module.exports = seedDB;
