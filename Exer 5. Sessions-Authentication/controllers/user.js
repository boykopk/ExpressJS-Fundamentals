const encryption = require('../util/encryption');
const User = require('../models/User');
const Rent = require('../models/Rent');
const Car = require('../models/Car');

module.exports = {
    registerGet: (req, res) => {
        res.render('user/register');
    },
    registerPost: async (req, res) => {
       const userBody = req.body;

       if (!userBody.username || !userBody.password || !userBody.repeatPassword) {
           userBody.error = 'Please fill all fields!';
           res.render('user/register', userBody);
           return;
       }

       if (userBody.password !== userBody.repeatPassword) {
           userBody.error = 'Passwords must match!';
           res.render('user/register', userBody);
           return;
       }

       const salt = encryption.generateSalt();
       const hashedPass = encryption.generateHashedPassword(salt, userBody.password);
       try {
            const user = await User.create({
                username: userBody.username,
                hashedPass,
                salt,
                firstName: userBody.firstName,
                lastName: userBody.lastName,
                roles: [ 'User' ]
            });

            req.logIn(user, (err) => {
                if (err) {
                    userBody.error = error;
                    res.render('user/register', userBody);
                } else {
                    res.redirect('/');
                }
            });
       } catch(err) {
            console.log(err);
       }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    loginGet: (req, res) => {
        res.render('user/login');
    },
    loginPost: async (req, res) => {
        const userBody = req.body;

        try {
            const user = await User.findOne({ username: userBody.username });
            if (!user) {
                userBody.error = 'Invalid username!';
                res.render('user/login', userBody);
                return;
            }

            if (!user.authenticate(userBody.password)) {
                userBody.error = 'Invalide password!';
                res.render('user/login', userBody);
                return;
            }

            req.logIn(user, (err) => {
                if (err) {
                    userBody.error = error;
                    res.render('user/register', userBody);
                } else {
                    res.redirect('/');
                }
            });
        } catch(err) {
            console.log(err);
        }
    },
    myRents: (req, res) => {
        const userId = req.user._id;

        Rent.find({ user: userId })
            .populate('car')
            .then((rents) => {
                let cars = [];
                for (const rent of rents) {
                    rent.car.expiresOn = `In ${rent.days} days.`
                    cars.push(rent.car);
                }

                res.render('user/rented', { cars });
            })
    },
};