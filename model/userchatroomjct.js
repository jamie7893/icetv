/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes){
	return sequelize.define('userChatroomJct', {
		idUser: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		idChatroom: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	},{
		tableName: 'userChatroomJct',
		freezeTableName: true,
		timestamps: false
	});
};
