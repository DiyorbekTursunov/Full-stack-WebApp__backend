import { DataTypes, Model } from "sequelize";
import sequelize from '../config/db_config.js'

class AdminModels extends Model{}

AdminModels.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: DataTypes.STRING,
},
{
sequelize,
tableName: "admins",
underscored: true
})

export default AdminModels