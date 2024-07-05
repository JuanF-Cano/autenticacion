import { Router } from "express";
import { getMovie, getMovieById } from "../controllers/movieController.js";

const router = Router();

router.get("/movies", getMovie);
router.get("/movies/:id", getMovieById);

export default router;
