/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chatroom', {
    idChatroom: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
    },
    idChatroomType: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    locationName: {
      type: DataTypes.STRING,
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
    freezeTableName: true,
    timestamps: true
  });
};