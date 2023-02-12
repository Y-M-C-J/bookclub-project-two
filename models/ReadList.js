const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Book = require('./Book');

class ReadList extends Model { }

ReadList.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'ReadList',
    }
);

ReadList.belongsTo(Book, { foreignKey: 'book_id' });

module.exports = ReadList;
