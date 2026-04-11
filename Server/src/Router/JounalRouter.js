import express from "express"
import { verifyJwt } from "../Middleware/JWT.js"
import { create_journals, getAllJounals, getJounalDetails } from "../Controller/DailyJournals.js"

const router = express.Router()

router.post("/create_journal", verifyJwt, create_journals);
router.get("/getAllJournal", verifyJwt, getAllJounals);
router.get("/journalDetails/:id", verifyJwt, getJounalDetails);

export default router;