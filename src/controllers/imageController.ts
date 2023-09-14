// Lógica do backend
import { Request, Response } from "express";

// Model
import { ImageModel } from "./../models/Images";

// Logger
import Logger from "../../config/logger";

// Multer
const multer = require("multer");
const multerConfig = require("../../config/logger");

import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export async function createImage(req: Request, res: Response) {
  // return res.status(200).send("Deu certo o controller"); // Retornar a mensagem quando entrar na rota pelo POSTMAN
  try {
    /**
     * renomear os arquivos que foram enviados
     */
    const {
      originalname: nameImage,
      size,
      key,
      location: url = "",
    } = req.file;

    /**
     * Coletar dados do que foi escrito e dos arquivos e enviar para o mongoDB
     */
    const image = await ImageModel.create({
      title: req.body.title,
      description: req.body.description,
      nameImage,
      size,
      key,
      url,
    }); // Aguardando um input do model, e criar o usuário com os dados da requisição
    return res.status(201).json(image); // Retornar o status 201 (algo criado no sistema) e mandar os dados via json
  } catch (e: any) {
    Logger.error(`Erro no sistema: ${e.message}`);
  }
}
