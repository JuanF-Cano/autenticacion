import { Router } from "express";
import { getTrending } from "../controllers/trendingController.js";

const router = Router();

router.get("/trending/:type", getTrending);

export default router;