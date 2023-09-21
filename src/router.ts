import { Router, Request, Response } from "express";

// Multer
const multer = require("multer");
const multerConfig = require("../config/multer");

// Controller
import { createProduct } from "./controllers/productController";

// Services
import {
  findProducts,
  findProductById,
  deleteProductById,
} from "./services/productService";

// Model
const ProductModel = require("./models/Product");

const router = Router();

export default router
  .get("/test", (req: Request, res: Response) => {
    res.status(200).send("API Working!!!"); // Resposta no POSTMAN quando der certo (200), ou seja, entrar na rota de test
  })
  /**
   * Rotas para os produtos
   */
  .post("/images", multer(multerConfig).single("file"), createProduct) // Criar um produto
  .get("/images", findProducts) // Listar todos os produtos
  .get("/images/:id", findProductById) // Listar produto por ID
  .delete("/images/:id", deleteProductById); // Deletar produto por ID
