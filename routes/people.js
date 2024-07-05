import { Router } from "express";
import { getPeople, getPeopleById } from "../controllers/peopleController.js";

const router = Router();

router.get("/people", getPeople);
router.get("/people/:id", getPeopleById);

export default router;
