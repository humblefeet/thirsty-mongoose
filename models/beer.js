var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var commentsSchema = new Schema({
    comment: String
});

var beerSchema = new Schema({
    name: String,
    style: String,
    bars: [{type: Schema.Types.ObjectId, ref: 'Bar'}],
    comments: [commentsSchema]
},{
    timestamps: true
});

module.exports = mongoose.model('Beer', beerSchema);
