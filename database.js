const Sequelize = require('sequelize');

var db = {}

const sequelize = new Sequelize({
    host: 'localhost',
    port: '3300',
    dialect: 'mysql',
    define: {
        freezeTableName: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 40000,
        idle: 10000,
    },

    operatorsAliases: false,
})

let models = [
    require('./models/Users'),
    require('./models/Products'),
    require('./models/Categories'),
    require('./models/Explore'),
]

// Initialize models
models.forEach(model => {
    const seqModel = model(sequelize, Sequelize)
    db[seqModel.name] = seqModel
})

// Apply associations
// Associations delcares secondary index to primary db
Object.keys(db).forEach(key => {
    if ('associate' in db[key]) {
        db[key].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db;