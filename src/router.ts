import { Router, Request, Response } from "express";

// Multer
const multer = require("multer");
const multerConfig = require("../config/multer");

// Controller
import { createImage } from "./controllers/imageController";

// Model
const ImageModel = require("./models/Images");

const router = Router();

export default router
  .get("/test", (req: Request, res: Response) => {
    res.status(200).send("API Working!!!"); // Resposta no POSTMAN quando der certo (200), ou seja, entrar na rota de test
  })
  .post("/images", multer(multerConfig).single("file"), createImage);
