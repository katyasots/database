const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const MusicalRole = sequelize.define('MusicalRole', {
  musical_role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  role_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'musical_role',
  timestamps: false
});

module.exports = MusicalRole;