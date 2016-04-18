/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('google', {
    idUser: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    idGoogle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gmail: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'google',
    freezeTableName: true
  });
};