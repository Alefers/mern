const {Router} = require('express');
const config = require('config');
const shortid = require('shortid');
const Link = require('../models/Link');
const authMiddlewhare = require('../middleware/auth.middleware');

const router = Router();

router.post('/generate', authMiddlewhare, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl');
        const {linkFrom} = req.body;

        const code = shortid.generate();

        const existing = await Link.findOne({
            where: {
                linkFrom: linkFrom
            }
        });

        if (existing) {
            res.json({link: existing});
        }

        const linkTo = baseUrl + '/t/' + code;

        const link = await Link.create({
            linkFrom,
            linkTo,
            code,
            userId: req.user.userId
        });

        res.json({link});
    } catch (e) {
        res.status(500).json({ message: 'Something goes wrong ' + e.message});
    }
});

router.get('/', authMiddlewhare, async (req, res) => {
    try {
        const links = await Link.findAll({
            where: {
                userId: req.user.userId
            }
        });
        res.json(links);
    } catch (e) {
        res.status(500).json({ message: 'Something goes wrong' });
    }
});

router.get('/:id', authMiddlewhare, async (req, res) => {
    try {
        const link = await Link.findByPk(req.params.id);
        res.json(link);
    } catch (e) {
        res.status(500).json({ message: 'Something goes wrong' });
    }
});

module.exports = router;