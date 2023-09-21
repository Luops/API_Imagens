import { Request, Response } from "express";

// Model
import { ProductModel } from "../models/Product";

// Logger
import Logger from "../../config/logger";

// AWS
const aws = require("aws-sdk");
const s3 = new aws.S3();

// Node
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

export async function findProducts(req: Request, res: Response) {
  try {
    const products = await ProductModel.find();

    return res.status(200).json(products);
  } catch (e: any) {
    Logger.error(`Erro no sistema: ${e.message}`);
  }
}

export async function deleteProductById(req: Request, res: Response) {
  try {
    const id: string = req.params.id;

    const product = await ProductModel.findOne({ _id: id });

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    // Execute o código de exclusão antes de chamar deleteOne, caso seja no S3
    if (process.env.STORAGE_TYPE === "s3") {
      await s3
        .deleteObject({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: product.key, // Use a chave do produto
        })
        .promise();
    } else {
      await promisify(fs.unlink)(
        path.resolve(__dirname, "..", "..", "tmp", "uploads", product.key)
      );
    }
    await product.deleteOne();
    return res.status(204).send(); // 204 No Content, indicando que o produto foi removido com sucesso.
  } catch (e: any) {
    Logger.error(`Erro no sistema: ${e.message}`);
  }
}

export async function findProductById(req: Request, res: Response) {
  try {
    // Coletar a id pelo parametro passado pela url (/api/product/xxxxxxxxxx)
    const id: string = req.params.id;

    // Buscar os dados do usuário no banco de dados
    const product = await ProductModel.findOne({ _id: id });

    if (!product) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json(product);
  } catch (e: any) {
    Logger.error(`Erro no sistema: ${e.message}`);
  }
}
