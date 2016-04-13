/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chatroom', {
    idChatroom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idSender: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    }
  }, {
    tableName: 'chatroom',
    freezeTableName: true
  });
};
