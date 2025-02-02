const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Tour = require('./Tour');
const Concert = require('./Concert');

const ConcertInTour = sequelize.define('ConcertInTour', {
  tour_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Tour,
      key: 'tour_id'
    }
  },
  concert_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Concert,
      key: 'concert_id'
    }
  }
}, {
  tableName: 'concert_in_tour',
  timestamps: false
});

ConcertInTour.belongsTo(Tour, { foreignKey: 'tour_id' });
ConcertInTour.belongsTo(Concert, { foreignKey: 'concert_id' });

Tour.hasMany(ConcertInTour, { foreignKey: 'tour_id' });
Concert.hasMany(ConcertInTour, { foreignKey: 'concert_id' });

module.exports = ConcertInTour;