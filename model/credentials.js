/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('credentials', {
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    hash: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'credentials',
    freezeTableName: true,
    timestamps: false
  });
};
