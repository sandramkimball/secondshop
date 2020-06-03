const sqlite3 = require('sqlite3').verbose();
const Sequelize = require('sequelize');
const db = new sqlite3.Database(':memory:')

var db = {}

const sequelize = new Sequelize(
    'DATABASE_NAME',
    'DATABASE_EMAIL',
    'DATABASE_PASSWORD',
    {
        host: 'localhost',
        port '3300',
        dialect: 'sqlite3',
        define: {
            freezeTableName: true,
        },
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },

    operatorsAliases: false,
    
    },
)

let models = []

models.forEach(model => {
    const seqModel = model(sequelize, Sequelize)
    db[seqModel.name] = seqModel
})

// Apply associations
Object.keys(db).forEach(key => {
    if ('associate' in db[key]) {
        db[key].associate(db)
    }
})

db.sequalize = sequalize
db.Sequelize = Sequelize

module.exports = db