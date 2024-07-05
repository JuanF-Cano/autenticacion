import { Router } from 'express';
import { USERS_BBDD } from '../bbdd.js';

const authoRouter = Router();

//Publico
authoRouter.get("/publico", (req, res) => {
  res.send("Endpoint Publico");
});

//Autenticado

authoRouter.post("/Autenticado", (req, res) => {
  const {email, password} = req.body;

  if(!email || !password) return res.send(400);

  const user = USERS_BBDD.find(user => user.email === email);
  if (!user) return res.status(401).send("Invalido, email");
  if (user.password !== password) return res.status(401).send("Invalido, contraseña");

  res.send("valido")
});

//Autorizado

authoRouter.post("/Autorizado", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.send(400);

  const user = USERS_BBDD.find(user => user.email === email);
  if (!user) return res.status(401).send("Invalido, email");
  if (user.password !== password) return res.status(401).send("Invalido, contraseña");
  if (user.role !== "admin") return res.status(403).send("Invalido, usuario no autoriazdo");

  res.send("valido")
});

export default authoRouter;