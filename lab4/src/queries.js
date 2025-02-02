const { Op } = require('sequelize');
const sequelize = require('./sequelize');
const MusicalGroup = require('./models/MusicalGroup');
const Track = require('./models/Track');
const Member = require('./models/Member');
const MusicalRole = require('./models/MusicalRole');
const RoleOfMember = require('./models/RoleOfMember');
const Tour = require('./models/Tour');
const Concert = require('./models/Concert');
const ConcertInTour = require('./models/ConcertInTour');

module.exports = {
  async getTrackInfo(trackName) {
    const track = await Track.findOne({
      where: { track_name: trackName },
      include: {
        model: MusicalGroup,
        attributes: ['group_name']
      }
    });

    console.log(`Composer: ${track.composer}, Lyrics Author: ${track.lyrics_author}, Release Date: ${track.release_date}, Group: ${track.MusicalGroup.group_name}`);
  },

  async getMostPopularGroupRepertoire() {
    const mostPopularGroup = await MusicalGroup.findOne({
      order: [['chart_position', 'ASC']]
    });

    const tracks = await Track.findAll({
      where: { musical_group_id: mostPopularGroup.musical_group_id }
    });

    tracks.forEach(track => {
      console.log(`Track: ${track.track_name}, Composer: ${track.composer}, Lyrics Author: ${track.lyrics_author}, Release Date: ${track.release_date}`);
    });
  },

  async getLastConcertTicketPrice(groupName) {
    const group = await MusicalGroup.findOne({
      where: { group_name: groupName }
    });

    const tours = await Tour.findAll({
      where: { musical_group_id: group.musical_group_id }
    });

    const concerts = await ConcertInTour.findAll({
      where: { tour_id: tours.map(tour => tour.tour_id) },
      include: {
        model: Concert,
        attributes: ['date_concert', 'ticket_price']
      },
      order: [[Concert, 'date_concert', 'DESC']]
    });

    console.log(`Last Concert Ticket Price: ${concerts[0].Concert.ticket_price}`);
  },

  async getGroupMembers(groupName) {
    const group = await MusicalGroup.findOne({
      where: { group_name: groupName }
    });

    const members = await RoleOfMember.findAll({
      where: { musical_group_id: group.musical_group_id },
      include: [
        {
          model: Member,
          attributes: ['member_name', 'surname', 'birth_date']
        },
        {
          model: MusicalRole,
          attributes: ['role_name']
        }
      ]
    });

    members.forEach(member => {
      const age = new Date().getFullYear() - new Date(member.Member.birth_date).getFullYear();
      console.log(`Name: ${member.Member.member_name}, Surname: ${member.Member.surname}, Age: ${age}, Role: ${member.MusicalRole.role_name}`);
    });
  },

  async getGroupTourInfo(groupName) {
    const group = await MusicalGroup.findOne({
      where: { group_name: groupName }
    });

    const tours = await Tour.findAll({
      where: { musical_group_id: group.musical_group_id },
      include: {
        model: ConcertInTour,
        include: {
          model: Concert,
          attributes: ['city']
        }
      }
    });

    tours.forEach(tour => {
      const duration = new Date(tour.end_day) - new Date(tour.start_day);
      tour.ConcertInTours.forEach(concertInTour => {
        console.log(`Tour: ${tour.tour_name}, City: ${concertInTour.Concert.city}, Duration: ${duration} ms`);
      });
    });
  },

  async getAnniversaryGroups() {
    const currentYear = new Date().getFullYear();
    const groups = await MusicalGroup.findAll({
      where: sequelize.literal(`(${currentYear} - year_foundation) % 5 = 0 AND ${currentYear} - year_foundation > 0`)
    });

    groups.forEach(group => {
      const anniversary = currentYear - group.year_foundation;
      console.log(`Group: ${group.group_name}, Foundation Year: ${group.year_foundation}, Anniversary: ${anniversary}`);
    });
  },

  async getAnniversaryGroupsTest(my_year) {
    const groups = await MusicalGroup.findAll({
      where: sequelize.literal(`(${my_year} - year_foundation) % 5 = 0 AND ${my_year} - year_foundation > 0`)
    });

    groups.forEach(group => {
      const anniversary = my_year - group.year_foundation;
      console.log(`Group: ${group.group_name}, Foundation Year: ${group.year_foundation}, Anniversary: ${anniversary}`);
    });
  },

  async getYoungestVocalist() {
    const vocalist = await RoleOfMember.findOne({
      where: { musical_role_id: 1 },
      include: [
        {
          model: Member,
          attributes: ['member_name', 'surname', 'birth_date']
        },
        {
          model: MusicalGroup,
          attributes: ['group_name']
        }
      ],
      order: [[Member, 'birth_date', 'DESC']]
    });

    const age = new Date().getFullYear() - new Date(vocalist.Member.birth_date).getFullYear();
    console.log(`Name: ${vocalist.Member.member_name}, Surname: ${vocalist.Member.surname}, Age: ${age}, Group: ${vocalist.MusicalGroup.group_name}`);
  }
};