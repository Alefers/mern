const Sequelize = require('sequelize');
const db = require('../config/database');

const Link = db.define('link', {
    linkFrom: {
        type: Sequelize.STRING,
        required: true
    },
    linkTo: {
        type: Sequelize.STRING,
        required: true,
        unique: true
    },
    code: {
        type: Sequelize.STRING,
        required: true,
        unique: true
    },
    createdAt: {
        field: 'created_at',
        type: Sequelize.DATE
    },
    clicks: {
        type: Sequelize.NUMBER,
        default: 0
    },
    userId: {
        type: Sequelize.INTEGER
    }
});

module.exports = Link;