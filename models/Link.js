module.exports = (sequelize, DataTypes) => {
    return sequelize.define('link', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        linkFrom: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
            field: 'link_from'
        },
        linkTo: {
            type: DataTypes.STRING,
            required: true,
            unique: true,
            allowNull: false,
            field: 'link_to'
        },
        code: {
            type: DataTypes.STRING,
            required: true,
            unique: true,
            allowNull: false
        },
        clicks: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 0
        },
        userId: {
            //fk in users
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false,
            field: 'user_id'
        }
    }, {
        underscored: true
    });
};