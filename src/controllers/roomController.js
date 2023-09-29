import RoomModel from "../models/RoomModel.js";
import {sequelize} from "../database.js";

class RoomController{

    async create(req, res){
        try {
            console.log('Creating the room...')
            const {hostName, gameType} = req.body

            const room = await RoomModel.create({
                host: hostName,
                game: gameType,
                users: [hostName]
            })

            console.log('The room has been created!')
            res.json(room)

        } catch (error) {
            console.log(`Error: ${error}`)
            res.json({ error: 'Failrue creating room' })
        }
    }

    async joinRoom(req, res) {
        try {
            console.log('Joining to the room...')
            const { user, roomId } = req.body

            const updatedRoom = await RoomModel.update(
                { users: sequelize.literal(`array_append(users, '${user}'::VARCHAR)`) },
                { where: { id: roomId }, returning: true, plain: true }
            );

            console.log('Joining to the room completed!')
            res.json(updatedRoom)
        } catch (error) {
            console.log(`Error: ${error}`)
            res.json({ error: 'Failure joining room' })
        }
    }

    async leaveRoom(req, res) {
        try {
            console.log('Removing user from room...')
            const { user, roomId } = req.body

            await RoomModel.update(
                { users: sequelize.literal(`array_remove(users, '${user}'::VARCHAR)`) },
                { where: { id: roomId } }
            );

            const updatedRoom = await RoomModel.findByPk(roomId);

            if (!updatedRoom || updatedRoom.users.length === 0) {
                await RoomModel.destroy({ where: { id: roomId } });
                console.log('Room has been deleted because it has no users.');
            }

            console.log('Removing user from room completed!')
            res.json({ success: true });
        } catch (error) {
            console.log(`Error: ${error}`)
            res.json({ error: 'Failure removing user from room' })
        }
    }

    async getAll(req, res){
        try {
            const { limit, offset } = req.params

            const rooms = await RoomModel.findAll({
                limit: limit || 10,
                offset: offset || 0,
            })

            res.json(rooms)
        } catch (error){
            console.log(`Error: ${error}`)
            res.json({ msg: 'Failrue fetching rooms!' })
        }
    }

    async getById(req, res){
        try {
            const { roomId } = req.query

            const room = await RoomModel.findByPk(roomId)
            if (!room){
                res.json({error: 'can not to find rooms by id'})
            }

            res.json(room)
        } catch (error){
            console.log(`Error: ${error}`)
            res.json({ msg: 'Failrue fetching room!' })
        }
    }

}

export default new RoomController()