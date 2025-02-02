const sequelize = require('./sequelize');
const queries = require('./queries');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await queries.getTrackInfo('Дворцовый мост');
    await queries.getMostPopularGroupRepertoire();
    await queries.getLastConcertTicketPrice('Монеточка');
    await queries.getGroupMembers('The Cure');
    await queries.getGroupTourInfo('ЛСП');
    await queries.getAnniversaryGroups();
    await queries.getYoungestVocalist();
    await queries.getAnniversaryGroupsTest('2025');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();