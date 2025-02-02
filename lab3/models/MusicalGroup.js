const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const MusicalGroup = sequelize.define('MusicalGroup', {
  musical_group_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  group_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  year_foundation: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  chart_position: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'musical_group',
  timestamps: false
});

module.exports = MusicalGroup;