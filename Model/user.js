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
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    desc: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    img: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    username: {
      type: DataTypes.CHAR(45),
      allowNull: false
    }
  }, {
    tableName: 'user',
    freezeTableName: true,
    timestamps: false
  });
};
