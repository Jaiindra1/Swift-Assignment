import express, { Request, Response } from "express";
import { loadData, deleteAllUsers, deleteUser, getUser, addUser } from "./controllers";

const router = express.Router();

router.get("/load", (req: Request, res: Response) => loadData(req, res));
router.delete("/users", (req: Request, res: Response) => deleteAllUsers(req, res));
router.delete("/users/:userId", (req: Request, res: Response) => deleteUser(req, res));
router.get("/users/:userId", (req: Request, res: Response) => getUser(req, res));
router.put("/users", (req: Request, res: Response) => addUser(req, res));

export default router;
