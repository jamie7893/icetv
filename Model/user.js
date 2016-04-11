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
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cell: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: 'user',
    freezeTableName: true,
    timestamps: true
  });
};