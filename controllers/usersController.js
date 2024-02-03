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

        return res.status(200).json({_id: id, username: user.username, date, duration: parseInt(duration), description});

    } catch (err) {
        console.log(err);
        return res.status(500).json({error: "Internal Server Error"});
    }
}

const getLogs = async (req, res) => {
    try {
        const id = req.params._id;
        const from = req.query.from || new Date(0);
        const to = req.query.to || new Date(Date.now());
        const limit = Number(req.query.limit) || 0;

        const user = await Users.findById(id);
        let originalLogs = [];

        for(const log of user.logs){
            originalLogs.push({
                description: log.description,
                duration: log.duration,
                date: log.date
            });
        }

        let filteredLogs = [];

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (from || to) {
            const fromDate = from ? new Date(`${from}T00:00:00Z`) : new Date(0);
            const toDate = to ? new Date(`${to}T23:59:59Z`) : new Date();

            for (const log of originalLogs) {
                const dateLog = new Date(log.date);

                if (dateLog >= fromDate && dateLog <= toDate) {
                    filteredLogs.push(log);
                }
            }
        }
        
        if(limit !== 0) {
            originalLogs = originalLogs.slice(0, limit);

            if(filteredLogs.length > 0){
                filteredLogs = filteredLogs.slice(0, limit);
            }
        }

        return res.status(200).json({
            _id: id,
            username: user.username,
            count: user.count,
            log: filteredLogs.length > 0 ? filteredLogs : originalLogs,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = { addUsers, getUsers, addExercises, getLogs};