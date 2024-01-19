import {Sequelize} from 'sequelize'
import 'dotenv/config'

const sequelize = new Sequelize({
    username: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
})

!(async ()=>{
try {
    await sequelize.authenticate();
    await sequelize.sync({alter:true})
    console.log("db connection");
} catch (error) {
    console.log("db error: " , error.message)
}
})()

export default sequelize