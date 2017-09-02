var mongoose = require("mongoose");

//SCHEMA SETUP
var campgroundSchema = mongoose.Schema({
    name: String,
    image: String,
    price: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            },
        username: String
            },
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
        }
        ]
});

module.exports = mongoose.model("Campground", campgroundSchema);