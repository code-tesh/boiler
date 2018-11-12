const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const mongoose = require('mongoose');

// Import Data Model

const User = require('../../models/User');

const Event = require('../../models/Event');

//@route Test
//@desc Tests post toute
//@access public

router.get('/test', (req, res) => res.json({msg: 'working'}));


//@route post
//@desc Register
//@access public


router.post('/reg', (req, res) => {

    //  res.send(req.body);

    console.log(req.body);


    User.findOne({email: req.body.email})
        .then(user => {

            console.log(user)

            if (user) {

                return res.status(400).json({email: 'already exists'});

            } else {

                const newUser = new User();

                newUser.name = req.body.name;
                newUser.email = req.body.email;
                //newUser.password  = req.body.password ;


                bcrypt.genSalt(10, (err, salt) => {

                    bcrypt.hash(req.body.password, salt, (err, hash) => {

                        if (err) throw  err;

                        console.log('Here inside')

                        newUser.password = hash;

                        newUser.save((err, user) => {

                            if (err) {

                                res.send(err);
                            } else {

                                console.log(user);
                            }

                        });

                    });

                });


                return res.status(400).json({email: 'Done'});
            }

        }).catch(err => console.log(err));

});


//@route get
//@desc get all users
//@access public


router.get('/getall', (req, res) => {

    console.log('Here');
    // User.find({}).then((user) => {
    //
    //     res.send(user);
    //
    //
    // });

    //  var id = "ab29a05da630efe274e5057ab956e05f";

    console.log(mongoose.Types.ObjectId.isValid('ab29a05da630efe274e5057ab956e05f'));

    // Event.findById(id).then((user) => {
    //
    //     res.send(user);
    //
    //     console.log(user);
    //
    //
    // });
});


//@route post
//@desc update
//@access public


router.put('/update', (req, res) => {

    User.findOneAndUpdate({email: req.body.email}, {$set: {name: req.body.name}}, {upsert: true}, (err, update) => {

        // console.log(err);
        // console.log(update);

        if (err) {

            res.send('Here');
        } else {

            console.log(update);

            // return res.status('204').json({state:'ok'});

            return res.status('200').json({state: 'ok'});
        }

    });


});

//@route get
//@desc delete
//@access public


router.get('/del/:email', (req, res) => {

    //  console.log(req.params.email);

    User.findOneAndRemove({email: req.params.email}, (err, user) => {


        if (err) {

            res.send('Here Error');
        } else {

            console.log(user);

            // return res.status('204').json({state:'ok'});

            return res.status('200').json({state: 'delete'});
        }


    });

});


//@route post
//@desc login
//@access public


router.post('/login', (req, res) => {

    User.findOne({email: req.body.email}, (err, user) => {


        if (!user) {

            res.status(404).json({user: 'not found'});
        } else {

            bcrypt.compare(req.body.pw, user.password).then(isMatch => {

                if (isMatch) {

                    const jwt_playload = {id: user.id, name: user.name};

                    jwt.sign(jwt_playload, keys.secertJKey, {expiresIn: 3600}, (err, token) => {

                        res.status(200).json({user: 'found', token: 'Bearer ' + token});

                    });

                } else {

                    res.status(401).json({user: 'found', state: 'incorecct'});
                }

            });


        }

    });

});


//@route post
//@desc Check Auth or not
//@access private


router.get('/cuser', passport.authenticate('jwt', {session: false}), (req, res) => {

    res.json(req.user);

});


module.exports = router;