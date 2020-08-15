const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();

router.post(
    '/register',
    [
        check('email', 'Email incorrect').isEmail(),
        check('password', 'Minimal length 6 characters').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Wrong data while registration'
                });
            }

            const {email, password} = req.body;

            const candidate = await User.findOne({
                where: { email }
            });

            if (candidate) {
                return res.status(400).json({message: 'This email is already in use'});
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            User.create({
                email,
                password: hashedPassword
            });

            res.status(201).json({message: 'User created'});

        } catch (e) {
            res.status(500).json({message: e.message})
        }
    }
);

router.post(
    '/login',
    [
        check('email', 'Enter email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Wrong data while login'
                });
            }

            const {email, password} = req.body;

            const user = await User.findOne({
                where: {email}
            });

            if (!user) {
                return res.status(400).json({
                    message: 'User not found'
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({
                    message: 'Incorrect password, try again'
                })
            }

            const token = jwt.sign(
                {
                    userId: user.id
                },
                config.get('jwtSecret'),
                {
                    expiresIn: '1h'
                }
            );

            res.json({
                token,
                userId: user.id
            })

        } catch (e) {
            res.status(500).json({
                message: 'Something goes wrong, please try again'
            })
        }
    }
);

module.exports = router;
