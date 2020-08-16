const {Router} = require('express');
const config = require('config');
const shortid = require('shortid');
const db = require('../models');

const router = Router();

router.post('/generate', async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl');
        const {linkFrom} = req.body;

        const code = shortid.generate();

        const existing = await db.link.findOne({
            where: { linkFrom }
        });

        if (existing) {
            res.json({link: existing});
        }

        const linkTo = baseUrl + '/t/' + code;

        const link = await db.link.create({
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

router.get('/', async (req, res) => {
    try {
        const links = await db.link.findAll({
            where: {
                userId: req.user.userId
            }
        });
        res.json(links);
    } catch (e) {
        res.status(500).json({ message: 'Something goes wrong' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const link = await db.link.findByPk(req.params.id);
        const updatedLink = await db.link.update(
            { clicks: link.clicks + 1 },
            { where: { id: link.id }}
        );
        res.json(link);
    } catch (e) {
        res.status(500).json({ message: 'Something goes wrong' });
    }
});

module.exports = router;