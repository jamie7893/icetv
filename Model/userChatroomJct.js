/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes){
	return sequelize.define('userChatroomJct', {
		idUser: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			references: {
				model: 'user',
				key: 'id'
			}
		},
		idChatroom: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			references: {
				model: 'chatroom',
				key: 'idChatroom'
			}
		}
	},{
		tableName: 'userChatroomJct',
		freezeTableName: true,
		timestamps: false
	})
}