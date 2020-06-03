module.exports = function(sequelize, Dataypes){
    return sequelize.define('explore', {
        id: {
            type: Dataypes.INTEGER(10).UNSIGNED,
            allowNull: false, 
            primaryKey: true,
            autoIncrement: true
        },
        images: {
            type: Dataypes.STRING(256),
            allowNull: true, 
        },
    }, {
        tablename: 'explore',
        timestamps: false
    })
};