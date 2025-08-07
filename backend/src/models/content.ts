import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
    title: String,
    link: String,
    type: String,
    file: String,
    tag: [{type: mongoose.Types.ObjectId, ref: "Tag"}],
    userId: {type: mongoose.Types.ObjectId, ref: "User", required: true}
})

const LinkSchema = new mongoose.Schema({
    hash: String,
    userId: {type: mongoose.Types.ObjectId, ref: "User", required: true, unique: true}
})

export const linkModel = mongoose.model("Link", LinkSchema);
export const contentModel = mongoose.model("Content",  ContentSchema);
