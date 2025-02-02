const sequelize = require('../sequelize');
async function createIndexes() {
  try {
    await sequelize.query(`
      CREATE INDEX musical_group_group_name_idx ON musical_group (group_name);
      CREATE INDEX musical_group_chart_position_idx ON musical_group (chart_position);
      CREATE INDEX concert_date_concert_idx ON concert (date_concert);
      CREATE INDEX concert_city_idx ON concert (city);
      CREATE INDEX member_member_name_idx ON member (member_name);
    `);
    console.log('Индексы успешно созданы.');
  } catch (error) {
    console.error('Ошибка при создании индексов:', error);
  }
}

createIndexes();