import { DataTypes } from "sequelize";
import {sequelize} from "../database.js";

const RoomModel = sequelize.define('room', {
    id: {
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    game: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    users: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
    },
    host: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Waiting'
    }
});

export default RoomModel
