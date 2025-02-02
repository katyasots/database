const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Concert = sequelize.define('Concert', {
  concert_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  city: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  date_concert: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ticket_price: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'concert',
  timestamps: false
});

module.exports = Concert;