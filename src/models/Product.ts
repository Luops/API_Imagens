// model e mongoose
import { model, Schema } from "mongoose";
const mongoose = require("mongoose");

// Logger
import Logger from "../../config/logger";

const productSchema = new Schema({
  title: String,
  description: String,
  nameImage: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.pre("save", function () {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`; //
  }
});

export const ProductModel = model("Image", productSchema, "images");
