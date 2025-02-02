const sequelize = require('./sequelize');
const queries = require('./queries_limit');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    console.time('getTrackInfo');
    await queries.getTrackInfo('Дворцовый мост');
    console.timeEnd('getTrackInfo');

    console.time('getMostPopularGroupRepertoire');
    await queries.getMostPopularGroupRepertoire(10); 
    console.timeEnd('getMostPopularGroupRepertoire');

    console.time('getLastConcertTicketPrice');
    await queries.getLastConcertTicketPrice('Монеточка');
    console.timeEnd('getLastConcertTicketPrice');

    console.time('getGroupMembers');
    await queries.getGroupMembers('The Cure', 10); 
    console.timeEnd('getGroupMembers');

    console.time('getGroupTourInfo');
    await queries.getGroupTourInfo('ЛСП', 10); 
    console.timeEnd('getGroupTourInfo');

    console.time('getAnniversaryGroups');
    await queries.getAnniversaryGroups(10);
    console.timeEnd('getAnniversaryGroups');

    console.time('getYoungestVocalist');
    await queries.getYoungestVocalist();
    console.timeEnd('getYoungestVocalist');

    console.time('getAnniversaryGroupsTest');
    await queries.getAnniversaryGroupsTest(2025, 10);
    console.timeEnd('getAnniversaryGroupsTest');

    console.time('getAnniversaryGroupsSort');
    await queries.getAnniversaryGroupsSort(10);
    console.timeEnd('getAnniversaryGroupsSort');


  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();