/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nameLast: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nameFirst: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'user',
    freezeTableName: true,
    timestamps: false
  });
};
