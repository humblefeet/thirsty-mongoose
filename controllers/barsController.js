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
        let data = req.body;
        Bar.create({
            name: data.name,
            location: data.location
        }, function(err){
            if (err) return next(err);
            res.redirect('/bars')
        })
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
        Bar.findById(req.params.id, function(err, bar){
            if(err)return next(err);
            Beer.findById(req.body.beer, function(err, beer){
                if(err)return next(err);
                bar.beers.push(beer);
                bar.save(function(err){
                    if(err)return next(err);
                    beer.bars.push(bar);
                    beer.save(function(err){
                        if(err)return next(err);
                        res.redirect('./');
                    })
                });
            })
        })
    },

    removeBeer: function(req,res,next){
        Bar.findById(req.params.id, function(err, bar){
            if(err)return next(err);
            bar.beers.remove(req.params.beerid);
            bar.save(function(err){
                if(err)return next(err);
                Beer.findById(req.params.beerid, function(err,beer){
                    if(err)return next(err);
                    beer.bars.remove(bar._id);
                    beer.save(function(err){
                        if(err) return next(err);
                        res.redirect('/bars/'+bar._id);
                    })
                })
            })
        })
    },

    destroy: function(req,res,next){
        Bar.remove({_id: req.params.id}, function(err){
            if(err)return next(err);
            res.redirect('/bars');
        })
    }

}