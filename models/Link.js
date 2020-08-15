module.exports = (sequelize, DataTypes) => {
    return sequelize.define('link', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        link_from: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        link_to: {
            type: DataTypes.STRING,
            required: true,
            unique: true,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING,
            required: true,
            unique: true,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE
        },
        clicks: {
            type: DataTypes.INTEGER,
            default: 0
        },
        user_id: {
            //fk in users
            type: DataTypes.UUID,
            required: true,
            allowNull: false
        }
    }, {
        underscored: true
    });
};