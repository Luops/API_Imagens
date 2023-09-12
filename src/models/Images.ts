import { model, Schema } from "mongoose";

const mongoose = require('mongoose');

const imageSchema = new Schema ({
    title: String,
    description: String,
    nameImage: String,
    size: Number,
    key: String,
    url: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const ImageModel = model("Image", imageSchema, "images");