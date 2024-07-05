import { Router } from 'express';
import { USERS_BBDD } from '../bbdd.js';
import { SignJWT, jwtVerify } from 'jose';

const authTokenRouter = Router();

authTokenRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.send(400);

  try {
    const user = USERS_BBDD.find(user => user.email === email);
    if (!user) return res.status(401).send("Invalido, email");
    if (user.password !== password) return res.status(401).send("Invalido, contraseña");

    const encoder = new TextEncoder();
    const guid = user.guid;
    const jwtConstructor = new SignJWT({ guid })
    const jwt = await jwtConstructor
    .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(encoder.encode("tokenDePrueba"));

    return res.send({jwt});
  } catch (err) {
    res.send("valido");
  }
});

authTokenRouter.get("/profile", async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send();

  try {
    const encoder = new TextEncoder();
    const {payload} = await jwtVerify(authorization, encoder.encode("tokenDePrueba"))
    const user = USERS_BBDD.find((user) => user.guid === payload.guid);
    if (!user) return res.status(401).send();
  
    delete user.password;
  
    return res.send(user);
  } catch(err) {
    return res.status(401).send();
  }

})


export default authTokenRouter;