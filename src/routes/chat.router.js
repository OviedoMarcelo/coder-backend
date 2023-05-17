import { Router } from "express";
import Message from "../data/dbManagers/message.js";


const router = Router();

const messageManager = new Message();

router.get("/", async (req, res) => {
    try {
        const messages = await messageManager.getAll();
        res.render("chat", { messages });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error retrieving messages");
    }
});

export default router;