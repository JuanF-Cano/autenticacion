import { Router } from 'express';
import { USERS_BBDD } from '../bbdd.js';
import { nanoid } from 'nanoid';
import { configDotenv } from 'dotenv';

const sessions = [];
const authoSessionRouter = Router();

authoSessionRouter.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.send(400);

    try {
        const user = USERS_BBDD.find(user => user.email === email);
        if (!user) return res.status(401).send("Invalido, email");
        if (user.password !== password) return res.status(401).send("Invalido, contraseña");

        const guid = user.guid;
        const sessionId = nanoid();
        sessions.push({ sessionId, guid })
        
        res.cookie('sessionId', sessionId, {
            httpOnly: true,
        })

        return res.send(`Usuario ${user.name} autenticado`);
    } catch (err) {
        res.send("valido");
    }
});

authoSessionRouter.get("/profile", (req, res) => {
    const { cookies } = req;
    if (!cookies.sessionId) return res.status(401).send();

    const userSession = sessions.find((session) => session.sessionId === cookies.sessionId);
    if (!userSession) return res.status(401).send();

    const user = USERS_BBDD.find((user) => user.guid === userSession.guid);
    if (!user) return res.status(401).send();

    delete user.password;

    return res.send(user);
})

export default authoSessionRouter;