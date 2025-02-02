const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Member = require('./Member');
const MusicalGroup = require('./MusicalGroup');
const MusicalRole = require('./MusicalRole');

const RoleOfMember = sequelize.define('RoleOfMember', {
  member_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Member,
      key: 'member_id'
    }
  },
  musical_group_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: MusicalGroup,
      key: 'musical_group_id'
    }
  },
  musical_role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: MusicalRole,
      key: 'musical_role_id'
    }
  }
}, {
  tableName: 'role_of_member',
  timestamps: false
});

RoleOfMember.belongsTo(Member, { foreignKey: 'member_id' });
RoleOfMember.belongsTo(MusicalGroup, { foreignKey: 'musical_group_id' });
RoleOfMember.belongsTo(MusicalRole, { foreignKey: 'musical_role_id' });

Member.hasMany(RoleOfMember, { foreignKey: 'member_id' });
MusicalGroup.hasMany(RoleOfMember, { foreignKey: 'musical_group_id' });
MusicalRole.hasMany(RoleOfMember, { foreignKey: 'musical_role_id' });

module.exports = RoleOfMember;