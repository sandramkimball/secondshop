function(sequelize, Dataypes){
    return sequelize.define('users', {
        id: {
            type: Dataypes.INTEGER(10).UNSIGNED,
            allowNull: false, 
            primaryKey: checkForResolveTypeResolver,
            autoIncrement: true
        },
        name: {},
        email: {},
        
    })
}