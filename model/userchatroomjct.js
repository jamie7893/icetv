/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes){
	return sequelize.define('userChatroomJct', {
		idUser: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		idChatroom: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},{
		tableName: 'userChatroomJct',
		freezeTableName: true,
		timestamps: false
	});
};
