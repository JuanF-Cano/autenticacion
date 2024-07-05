import express from "express";
import cookieParser from "cookie-parser";
import movieRouter from "./routes/movie.js";
import tvRouter from "./routes/tv.js";
import peopleRouter from "./routes/people.js";
import trendingRouter from "./routes/trending.js";
import authoRouter from "./routes/auth.js";
import authTokenRouter from "./routes/auth-token.js";
import authoSessionRouter from "./routes/auth-session.js";
import dotenv from "dotenv";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cookieParser());
app.use("/api", express.static(path.join(__dirname, "public")));
app.use(express.json())
app.use("/api", movieRouter);
app.use("/api", tvRouter);
app.use("/api", peopleRouter);
app.use("/api", trendingRouter);
app.use("/auth", authoRouter)
app.use("/auth-token", authTokenRouter)
app.use("/auth-session", authoSessionRouter)

app.listen(PORT, () => {
  console.clear();
  console.log("Servidor iniciado");
});
import { fileURLToPath } from 'url';
