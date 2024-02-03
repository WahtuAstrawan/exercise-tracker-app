const Users = require('../models/user');

const addUsers = async (req, res) => {
    try {
        const { username } = req.body;
        const newUser = await Users.create({ username });

        return res.status(200).json({username: newUser.username, _id: newUser._id});
    } catch (err) {
        console.log(err);
        return res.status(400).json({error: "Bad Request Body e.g. username: <string>"});
    }
}

const getUsers = async (req, res) => {
    try {
        let filteredUsers = [];
        const users = await Users.find();
        for(user of users){
            filteredUsers.push({_id: user._id, username: user.username});
        }

        return res.status(200).json(filteredUsers);
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: "Internal Server Error"});
    }
}

const addExercises = async (req, res) => {
    try {
        const id = req.params._id;
        let { description, duration, date } = req.body;

        if(!date){
            const currentDate = new Date();
            date = currentDate.toDateString();
        }

        date = new Date(date).toDateString();
        const user = await Users.findById(id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.logs.push({ description, duration, date });
        user.count += 1;
        await user.save();

        return res.status(200).json({_id: id, username: user.username, date, duration, description});

    } catch (err) {
        console.log(err);
        return res.status(500).json({error: "Internal Server Error"});
    }
}

const getLogs = async (req, res) => {
    try {
        const id = req.params._id;
        const {from, to, limit} = req.query;

        const user = await Users.findById(id);
        let filteredLogs = [];
        
        if(!user){
            return res.status(404).json({ error: "User not found" });
        }

        if(from && to){

            const fromDate = new Date(from);
            const toDate = new Date(to);

            for(log of user.logs){
                const dateLog = new Date(log);

                if(dateLog >= fromDate && dateLog <= toDate){
                    filteredLogs.push(log);
                }

                if(filteredLogs.length === parseInt(limit)) break;

            }
        }


        return res.status(200).json({_id: id, username: user.username, count: user.count, log: filteredLogs.length > 0 ? filteredLogs : user.logs});
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: "Internal Server Error"});
    }
}

module.exports = { addUsers, getUsers, addExercises, getLogs};