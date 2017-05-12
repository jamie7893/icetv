/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    userId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    displayName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    accessToken: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    color: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'user',
    freezeTableName: true,
    timestamps: false
  });
};
