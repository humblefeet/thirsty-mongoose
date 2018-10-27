var Bar = require('../models/bar');
var Beer = require('../models/beer');

module.exports =  {

    index: function(req,res,next){
        Bar.find({}, function(err, bars){
            if(err) return next(err);
            res.render('bars/index',{bars});
        })
    },

    new: function(req,res,next){
        res.render('bars/new');
    },

    create: function(req,res,next){

    },

    show: function(req,res,next){
        Bar.findById(req.params.id).populate('beers').exec(function(err,bar){
                if(err)return next(err);
                Beer.find({}, function(err,beers){
                    res.render('bars/show',{bar,beers})
                })
        })
    },

    addBeer: function(req,res,next){

    },

    removeBeer: function(req,res,next){

    },

    destroy: function(req,res,next){

    }

}