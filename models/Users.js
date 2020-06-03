module.exports = function(sequelize, Dataypes){
    return sequelize.define('users', {
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
        email: {
            type: Dataypes.STRING(256),
            allowNull: false, 
        },
        location: {
            type: Dataypes.STRING(256),
            allowNull: true, 
        },
        budget: {
            type: Dataypes.STRING(10),
            allowNull: true, 
        },
        cap: {
            type: Dataypes.STRING(10),
            allowNull: true, 
        },
        avatar: {
            type: Dataypes.STRING(256),
            allowNull: true, 
        },
        // notifications: {
        //     type: Dataypes.BOOLEAN(true),
        //     allowNull: true, 
        // },
        // newsletter: {
        //     type: Dataypes.BOOLEAN(true),
        //     allowNull: true, 
        // },
    }, {
        tablename: 'users',
        timestamps: false
    })
};

 