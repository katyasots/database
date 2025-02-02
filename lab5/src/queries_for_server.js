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

    if (!track) {
      console.log(`Track not found: ${trackName}`);
      return { error: 'Track not found' };
    }

    const result = {
      composer: track.composer,
      lyricsAuthor: track.lyrics_author,
      releaseDate: track.release_date,
      groupName: track.MusicalGroup.group_name
    };

    console.log(`Track Info:`, result);
    return result;
  },

  async getMostPopularGroupRepertoire() {
    const mostPopularGroup = await MusicalGroup.findOne({
      order: [['chart_position', 'ASC']]
    });

    if (!mostPopularGroup) {
      console.log('No popular group found');
      return { error: 'No popular group found' };
    }

    const tracks = await Track.findAll({
      where: { musical_group_id: mostPopularGroup.musical_group_id }
    });

    const result = tracks.map(track => ({
      trackName: track.track_name,
      composer: track.composer,
      lyricsAuthor: track.lyrics_author,
      releaseDate: track.release_date
    }));

    console.log(`Repertoire for ${mostPopularGroup.group_name}:`, result);
    return result;
  },

  async getLastConcertTicketPrice(groupName) {
    const group = await MusicalGroup.findOne({
      where: { group_name: groupName }
    });

    if (!group) {
      console.log(`Group not found: ${groupName}`);
      return { error: 'Group not found' };
    }

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

    if (concerts.length === 0) {
      console.log(`No concerts found for group: ${groupName}`);
      return { error: 'No concerts found' };
    }

    const result = concerts[0].Concert.ticket_price;
    console.log(`Last Concert Ticket Price for ${groupName}:`, result);
    return result;
  },

  async getGroupMembers(groupName) {
    const group = await MusicalGroup.findOne({
      where: { group_name: groupName }
    });

    if (!group) {
      console.log(`Group not found: ${groupName}`);
      return { error: 'Group not found' };
    }

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

    const result = members.map(member => ({
      name: member.Member.member_name,
      surname: member.Member.surname,
      age: new Date().getFullYear() - new Date(member.Member.birth_date).getFullYear(),
      role: member.MusicalRole.role_name
    }));

    console.log(`Members of ${groupName}:`, result);
    return result;
  },

  async getGroupTourInfo(groupName) {
    const group = await MusicalGroup.findOne({
      where: { group_name: groupName }
    });

    if (!group) {
      console.log(`Group not found: ${groupName}`);
      return { error: 'Group not found' };
    }

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

    const result = tours.map(tour => {
      const duration = new Date(tour.end_day) - new Date(tour.start_day);
      return {
        tourName: tour.tour_name,
        duration,
        cities: tour.ConcertInTours.map(concertInTour => concertInTour.Concert.city)
      };
    });

    console.log(`Tour info for ${groupName}:`, result);
    return result;
  },

  async getAnniversaryGroups() {
    const currentYear = new Date().getFullYear();
    const groups = await MusicalGroup.findAll({
      where: sequelize.literal(`(${currentYear} - year_foundation) % 5 = 0 AND ${currentYear} - year_foundation > 0`)
    });

    const result = groups.map(group => ({
      groupName: group.group_name,
      foundationYear: group.year_foundation,
      anniversary: currentYear - group.year_foundation
    }));

    console.log(`Anniversary groups for ${currentYear}:`, result);
    return result;
  },

  async getAnniversaryGroupsTest(myYear) {
    const groups = await MusicalGroup.findAll({
      where: sequelize.literal(`(${myYear} - year_foundation) % 5 = 0 AND ${myYear} - year_foundation > 0`)
    });

    const result = groups.map(group => ({
      groupName: group.group_name,
      foundationYear: group.year_foundation,
      anniversary: myYear - group.year_foundation
    }));

    console.log(`Anniversary groups for ${myYear}:`, result);
    return result;
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

    if (!vocalist) {
      console.log('No vocalist found');
      return { error: 'No vocalist found' };
    }

    const age = new Date().getFullYear() - new Date(vocalist.Member.birth_date).getFullYear();
    const result = {
      name: vocalist.Member.member_name,
      surname: vocalist.Member.surname,
      age,
      groupName: vocalist.MusicalGroup.group_name
    };

    console.log('Youngest Vocalist:', result);
    return result;
  }
};
