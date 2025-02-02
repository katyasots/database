const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const MusicalGroup = require('./MusicalGroup');

const Track = sequelize.define('Track', {
  track_id: {
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
  track_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  composer: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  lyrics_author: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  release_date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'track',
  timestamps: false
});

Track.belongsTo(MusicalGroup, { foreignKey: 'musical_group_id' });
MusicalGroup.hasMany(Track, { foreignKey: 'musical_group_id' });

module.exports = Track;