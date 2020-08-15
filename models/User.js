module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            required: true,
            unique: true,
            isEmail: true,
            len: [8, 50],
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            required: true,
            len: [6, 25],
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
        }
    }, {
        underscored: true,
    });
};
