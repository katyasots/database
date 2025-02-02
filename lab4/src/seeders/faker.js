const sequelize = require('../sequelize');
const MusicalGroup = require('../models/MusicalGroup');
const Track = require('../models/Track');
const Member = require('../models/Member');
const MusicalRole = require('../models/MusicalRole');
const RoleOfMember = require('../models/RoleOfMember');
const Tour = require('../models/Tour');
const Concert = require('../models/Concert');
const ConcertInTour = require('../models/ConcertInTour');
const faker = require('faker');

// Генерация тестовых данных для MusicalGroup
const generateMusicalGroups = (count) => {
  const musicalGroups = [];
  const usedGroupNames = new Set();

  for (let i = 0; i < count; i++) {
    let groupName;
    do {
      groupName = faker.company.companyName();
    } while (usedGroupNames.has(groupName));

    usedGroupNames.add(groupName);

    musicalGroups.push({
      group_name: groupName,
      year_foundation: faker.datatype.number({ min: 1900, max: 2024 }),
      country: faker.address.country(),
      chart_position: faker.datatype.number({ min: 1, max: 100 }),
    });
  }

  return musicalGroups;
};

// Генерация тестовых данных для Track
const generateTracks = (count, musicalGroups) => {
  const tracks = [];
  for (let i = 0; i < count; i++) {
    const randomGroup = musicalGroups[Math.floor(Math.random() * musicalGroups.length)];
    tracks.push({
      musical_group_id: randomGroup.musical_group_id,
      track_name: faker.lorem.words(3),
      composer: faker.name.findName(),
      lyrics_author: faker.name.findName(),
      release_date: faker.date.past(),
    });
  }
  return tracks;
};

// Генерация тестовых данных для Member
const generateMembers = (count) => {
  const members = [];
  for (let i = 0; i < count; i++) {
    members.push({
      member_name: faker.name.firstName(),
      surname: faker.name.lastName(),
      birth_date: faker.date.past(),
    });
  }
  return members;
};

// Генерация тестовых данных для MusicalRole
const generateMusicalRoles = (count) => {
  const musicalRoles = [];
  for (let i = 0; i < count; i++) {
    musicalRoles.push({
      role_name: faker.name.jobTitle(),
    });
  }
  return musicalRoles;
};

// Генерация тестовых данных для RoleOfMember
const generateRoleOfMembers = (count, members, musicalGroups, musicalRoles) => {
  const roleOfMembers = [];
  const usedCombinations = new Set();

  while (roleOfMembers.length < count) {
    const randomMember = members[Math.floor(Math.random() * members.length)];
    const randomGroup = musicalGroups[Math.floor(Math.random() * musicalGroups.length)];
    const randomRole = musicalRoles[Math.floor(Math.random() * musicalRoles.length)];
    const combination = `${randomMember.member_id}-${randomGroup.musical_group_id}-${randomRole.musical_role_id}`;

    if (!usedCombinations.has(combination)) {
      usedCombinations.add(combination);
      roleOfMembers.push({
        member_id: randomMember.member_id,
        musical_group_id: randomGroup.musical_group_id,
        musical_role_id: randomRole.musical_role_id,
      });
    }
  }

  return roleOfMembers;
};

// Генерация тестовых данных для Tour
const generateTours = (count, musicalGroups) => {
  const tours = [];
  for (let i = 0; i < count; i++) {
    const randomGroup = musicalGroups[Math.floor(Math.random() * musicalGroups.length)];
    const startDay = faker.date.past();
    const endDay = faker.date.future(1, startDay);
    tours.push({
      musical_group_id: randomGroup.musical_group_id,
      tour_name: faker.lorem.words(3),
      start_day: startDay,
      end_day: endDay,
    });
  }
  return tours;
};

// Генерация тестовых данных для Concert
const generateConcerts = (count) => {
  const concerts = [];
  for (let i = 0; i < count; i++) {
    concerts.push({
      city: faker.address.city(),
      date_concert: faker.date.future(),
      ticket_price: faker.datatype.number({ min: 10, max: 100 }),
    });
  }
  return concerts;
};

// Генерация тестовых данных для ConcertInTour
const generateConcertInTours = (count, tours, concerts) => {
  const concertInTours = [];
  const usedCombinations = new Set();

  while (concertInTours.length < count) {
    const randomTour = tours[Math.floor(Math.random() * tours.length)];
    const randomConcert = concerts[Math.floor(Math.random() * concerts.length)];
    const combination = `${randomTour.tour_id}-${randomConcert.concert_id}`;

    if (!usedCombinations.has(combination)) {
      usedCombinations.add(combination);
      concertInTours.push({
        tour_id: randomTour.tour_id,
        concert_id: randomConcert.concert_id,
      });
    }
  }

  return concertInTours;
};

(async () => {
  //await sequelize.sync({ force: true }); // Удаляет и создает таблицы заново

  const musicalGroups = await MusicalGroup.bulkCreate(generateMusicalGroups(1000));
  const tracks = await Track.bulkCreate(generateTracks(1000, musicalGroups));
  const members = await Member.bulkCreate(generateMembers(1000));
  const musicalRoles = await MusicalRole.bulkCreate(generateMusicalRoles(1000));
  const roleOfMembers = await RoleOfMember.bulkCreate(generateRoleOfMembers(1000, members, musicalGroups, musicalRoles));
  const tours = await Tour.bulkCreate(generateTours(1000, musicalGroups));
  const concerts = await Concert.bulkCreate(generateConcerts(1000));
  const concertInTours = await ConcertInTour.bulkCreate(generateConcertInTours(1000, tours, concerts));

  console.log('Данные успешно загружены');
})();