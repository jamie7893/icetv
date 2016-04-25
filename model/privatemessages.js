/* jshint indent: 2 */

/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('privateMessages', {
    idMessage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    messageType: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    idUserSender: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idUserReceiver: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    messageStatus: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    messages: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'privateMessages',
    freezeTableName: true,
    timestamps: true
  });
};
