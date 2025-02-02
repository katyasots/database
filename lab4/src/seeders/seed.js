const sequelize = require('../sequelize');
const MusicalGroup = require('../models/MusicalGroup');
const Track = require('../models/Track');
const Member = require('../models/Member');
const MusicalRole = require('../models/MusicalRole');
const RoleOfMember = require('../models/RoleOfMember');
const Tour = require('../models/Tour');
const Concert = require('../models/Concert');
const ConcertInTour = require('../models/ConcertInTour');

(async () => {
  await sequelize.sync({ force: true }); // Удаляет и создает таблицы заново

  await MusicalGroup.bulkCreate([
    { group_name: 'Queen', year_foundation: 1970, country: 'Великобритания', chart_position: 5 },
    { group_name: 'The Cure', year_foundation: 1978, country: 'Англия', chart_position: 2 },
    { group_name: 'Pink Floyd', year_foundation: 1965, country: 'Англия', chart_position: 4 },
    { group_name: 'Монеточка', year_foundation: 2015, country: 'Россия', chart_position: 3 },
    { group_name: 'ЛСП', year_foundation: 2007, country: 'Беларусь', chart_position: 1 },
    { group_name: 'Pyrokinesis', year_foundation: 2012, country: 'Россия', chart_position: 6 }
  ]);

  await Track.bulkCreate([
    { musical_group_id: 1, track_name: 'Bohemian Rhapsody', composer: 'Queen', lyrics_author: 'Фредди Меркьюри', release_date: '1975-10-31' },
    { musical_group_id: 1, track_name: 'We Will Rock You', composer: 'Брайан Мэй', lyrics_author: 'Брайан Мэй', release_date: '1977-10-07' },
    { musical_group_id: 2, track_name: 'Lovesong', composer: 'Роберт Смит', lyrics_author: 'Роберт Смит', release_date: '1989-08-21' },
    { musical_group_id: 2, track_name: 'Friday I am in Love', composer: 'Роберт Смит', lyrics_author: 'Роберт Смит', release_date: '1992-05-11' },
    { musical_group_id: 3, track_name: 'Another Brick in the Wall', composer: 'Роджер Уотерс', lyrics_author: 'Роджер Уотерс', release_date: '1979-11-30' },
    { musical_group_id: 3, track_name: 'Time', composer: 'Роджер Уотерс', lyrics_author: 'Роджер Уотерс', release_date: '1973-01-01' },
    { musical_group_id: 4, track_name: 'Это было в России', composer: 'Витя Исаев', lyrics_author: 'Витя Исаев', release_date: '2024-05-01' },
    { musical_group_id: 4, track_name: 'Каждый раз', composer: 'Елизавета Гырдымова', lyrics_author: 'Елизавета Гырдымова', release_date: '2018-05-25' },
    { musical_group_id: 5, track_name: 'Тело', composer: 'Олег Савченко', lyrics_author: 'Рома Англичанин', release_date: '2017-04-28' },
    { musical_group_id: 5, track_name: 'Коктейль', composer: 'Олег Савченко', lyrics_author: 'Рома Англичанин', release_date: '2013-05-13' },
    { musical_group_id: 6, track_name: 'Черное солнышко', composer: 'Андрей Федорович', lyrics_author: 'Андрей Федорович', release_date: '2019-08-15' },
    { musical_group_id: 6, track_name: 'Дворцовый мост', composer: 'Андрей Федорович', lyrics_author: 'Виталий Клячин', release_date: '2023-12-15' }
  ]);

  await Member.bulkCreate([
    { member_name: 'Брайн', surname: 'Мэй', birth_date: '1947-07-19' },
    { member_name: 'Роджер', surname: 'Тейлор', birth_date: '1949-07-26' },
    { member_name: 'Роберт', surname: 'Смит', birth_date: '1959-04-21' },
    { member_name: 'Саймон', surname: 'Гэллап', birth_date: '1960-06-01' },
    { member_name: 'Ник', surname: 'Мейсон', birth_date: '1944-01-27' },
    { member_name: 'Роджер', surname: 'Уотерс', birth_date: '1943-09-06' },
    { member_name: 'Елизавета', surname: 'Гырдымова', birth_date: '1998-06-01' },
    { member_name: 'Олег', surname: 'Савченко', birth_date: '1989-07-10' },
    { member_name: 'Петр', surname: 'Клюев', birth_date: '1989-05-28' },
    { member_name: 'Андрей', surname: 'Федорович', birth_date: '1995-12-16' }
  ]);

  await MusicalRole.bulkCreate([
    { role_name: 'Вокалист' },
    { role_name: 'Барабанщик' },
    { role_name: 'Гитарист' },
    { role_name: 'Бэк-вокалист' },
    { role_name: 'Автор песен' },
    { role_name: 'Бас-гитарист' }
  ]);

  await RoleOfMember.bulkCreate([
    { member_id: 1, musical_group_id: 1, musical_role_id: 3 },
    { member_id: 1, musical_group_id: 1, musical_role_id: 5 },
    { member_id: 2, musical_group_id: 1, musical_role_id: 1 },
    { member_id: 2, musical_group_id: 1, musical_role_id: 2 },
    { member_id: 3, musical_group_id: 2, musical_role_id: 1 },
    { member_id: 3, musical_group_id: 2, musical_role_id: 3 },
    { member_id: 4, musical_group_id: 2, musical_role_id: 6 },
    { member_id: 5, musical_group_id: 3, musical_role_id: 2 },
    { member_id: 6, musical_group_id: 3, musical_role_id: 1 },
    { member_id: 6, musical_group_id: 3, musical_role_id: 6 },
    { member_id: 7, musical_group_id: 4, musical_role_id: 1 },
    { member_id: 7, musical_group_id: 4, musical_role_id: 5 },
    { member_id: 8, musical_group_id: 5, musical_role_id: 1 },
    { member_id: 8, musical_group_id: 5, musical_role_id: 5 },
    { member_id: 9, musical_group_id: 5, musical_role_id: 4 },
    { member_id: 10, musical_group_id: 6, musical_role_id: 1 },
    { member_id: 10, musical_group_id: 6, musical_role_id: 5 }
  ]);

  await Tour.bulkCreate([
    { musical_group_id: 1, tour_name: 'Magic Tour', start_day: '1986-06-07', end_day: '1986-08-09' },
    { musical_group_id: 2, tour_name: 'Shows of a lost world', start_day: '2023-11-19', end_day: '2023-12-10' },
    { musical_group_id: 3, tour_name: 'Syd BARRET', start_day: '2007-05-10', end_day: '2007-05-10' },
    { musical_group_id: 4, tour_name: 'Молитвы. Анекдоты. Тосты', start_day: '2024-11-11', end_day: '2024-11-30' },
    { musical_group_id: 5, tour_name: 'Бриллианты', start_day: '2024-10-12', end_day: '2024-12-08' },
    { musical_group_id: 6, tour_name: 'Тур-2024', start_day: '2024-09-06', end_day: '2024-10-27' }
  ]);

  await Concert.bulkCreate([
    { city: 'Париж', date_concert: '1986-06-14', ticket_price: 1000 },
    { city: 'Лондон', date_concert: '1986-07-11', ticket_price: 1000 },
    { city: 'Буэнос-Айрес', date_concert: '2023-11-25', ticket_price: 5000 },
    { city: 'Монтевидео', date_concert: '2023-11-27', ticket_price: 5100 },
    { city: 'Лондон', date_concert: '2007-05-10', ticket_price: 2000 },
    { city: 'Барселона', date_concert: '2024-11-25', ticket_price: 5800 },
    { city: 'Прага', date_concert: '2024-11-30', ticket_price: 7800 },
    { city: 'Тюмень', date_concert: '2024-11-19', ticket_price: 2600 },
    { city: 'Омск', date_concert: '2024-12-08', ticket_price: 3200 },
    { city: 'Орел', date_concert: '2024-10-08', ticket_price: 2500 },
    { city: 'Тамбов', date_concert: '2024-10-11', ticket_price: 2000 }
  ]);

  await ConcertInTour.bulkCreate([
    { tour_id: 1, concert_id: 1 },
    { tour_id: 1, concert_id: 2 },
    { tour_id: 2, concert_id: 3 },
    { tour_id: 2, concert_id: 4 },
    { tour_id: 3, concert_id: 5 },
    { tour_id: 4, concert_id: 6 },
    { tour_id: 4, concert_id: 7 },
    { tour_id: 5, concert_id: 8 },
    { tour_id: 5, concert_id: 9 },
    { tour_id: 6, concert_id: 10 },
    { tour_id: 6, concert_id: 11 }
  ]);

  console.log('Данные успешно загружены');
})();