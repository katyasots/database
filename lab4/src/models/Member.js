const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Member = sequelize.define('Member', {
  member_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  member_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    //index: true 
  },
  surname: {
    type: DataTypes.STRING(100),
    allowNull: false,
    //index: true
  },
  birth_date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'member',
  timestamps: false
});

module.exports = Member;