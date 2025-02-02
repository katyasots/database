const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const MusicalGroup = require('./MusicalGroup');

const Tour = sequelize.define('Tour', {
  tour_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  musical_group_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: MusicalGroup,
      key: 'musical_group_id'
    }
  },
  tour_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  start_day: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_day: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'tour',
  timestamps: false
});

Tour.belongsTo(MusicalGroup, { foreignKey: 'musical_group_id' });
MusicalGroup.hasMany(Tour, { foreignKey: 'musical_group_id' });

module.exports = Tour;