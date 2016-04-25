/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chatroom', {
    idChatroom: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    idSender: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'chatroom',
    freezeTableName: true
  });
};
