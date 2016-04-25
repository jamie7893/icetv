/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('google', {
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    idGoogle: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    displayName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    gmail: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'google',
    freezeTableName: true
  });
};
