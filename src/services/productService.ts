import { Request, Response } from "express";

// Model
import { ImageModel } from "../models/Images";

// Logger
import Logger from "../../config/logger";

export async function findProducts(req: Request, res: Response) {
  try {
    const products = await ImageModel.find();

    return res.status(200).json(products);
  } catch (e: any) {
    Logger.error(`Erro no sistema: ${e.message}`);
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const products = await ImageModel.findByIdAndDelete(req.params.id);

    await products?.remove();

    return res.send();
  } catch (e: any) {
    Logger.error(`Erro no sistema: ${e.message}`);
  }
}
