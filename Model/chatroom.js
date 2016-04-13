/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chatroom', {
    idChatroom: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      primaryKey: true,
    },
    message: {
      type: DataTypes.CHAR(255),
      allowNull: false
    },
    idSender: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }, {
    tableName: 'chatroom',
    freezeTableName: true
  });
};
