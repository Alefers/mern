module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
            len: [60],
            allowNull: false
        }
    }, {
        underscored: true
    });
};
