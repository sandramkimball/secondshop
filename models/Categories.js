module.exports = function(sequelize, Dataypes){
    return sequelize.define('categories', {
        id: {
            type: Dataypes.INTEGER(10).UNSIGNED,
            allowNull: false, 
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Dataypes.STRING(256),
            allowNull: false, 
        },
        tags: {
            type: Dataypes.STRING(256),
            allowNull: true, 
        },
        count: {
            type: Dataypes.INTEGER(10),
            allowNull: false, 
        },
        images: {
            type: Dataypes.STRING(256),
            allowNull: true, 
        },
    }, {
        tablename: 'categories',
        timestamps: false
    })
};