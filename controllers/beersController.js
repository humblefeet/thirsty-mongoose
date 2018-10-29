var Beer = require('../models/beer');
var Bar = require('../models/bar')

module.exports =  {

    index: function(req,res,next){
        Beer.find({}, function(err, beers){
            if(err)return next(err);
            res.render('beers/index',{beers});
        });
    },

    new: function(req,res,next){
        res.render('beers/new');
    },

    create: function(req,res,next){
        let data = req.body;
        Beer.create({
            name: data.name,
            style: data.style
        }, function(err){
            if (err) return next(err);
            res.redirect('/beers');
        })
    },

    show: function(req,res,next){
        Beer.findById(req.params.id).populate('bars').exec(function(err,beer){
            if(err)return next(err);
            Bar.find({}, function(err,bars){
                res.render('beers/show',{beer, bars});
            });
        });
    },

    addComment: function(req,res,next){
        Beer.findById(req.params.id, function(err, beer){
            let newComment = {
                comment: req.body.comment
            }
            beer.comments.push(newComment);
            beer.save(function(err){
                if(err) return next(err);
                res.redirect('/beers/'+beer._id);
            })
        })
    },

    destroy: function(req,res,next){
        Beer.remove({_id: req.params.id}, function(err){
            if(err)return next(err);
            res.redirect('/beers');
        })
    }

}