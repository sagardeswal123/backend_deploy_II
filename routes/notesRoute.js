const express = require("express");
const { NoteModel } = require("../model/noteModel")
const { auth } = require("../middleware/auth")

const noteRouter = express.Router();


noteRouter.use(auth)
noteRouter.post("/create", async (req, res) => {

    try {
        const note = new NoteModel(req.body)
        await note.save();
        res.json({ msg: "new note has been added", note: req.body })
    }
    catch (error) {
        res.json({ msg: error.msg })
    }
})

noteRouter.get("/", async (req, res) => {
    try {
        let notes = await NoteModel.find({ userId: req.body.userId });
        res.json({ msg: "getting", notes })
    } catch (error) {
        res.json({ msg: error.message })
    }
})

noteRouter.patch("/update/:noteId", async (req, res) => {
    const userIdinUserdoc = req.body.userId
    const { noteId } = req.params
    try {
        const note = await NoteModel.findOne({ _id: noteId })
        const userIdinNotedoc = note.userId
        if (userIdinUserdoc === userIdinNotedoc) {
            await NoteModel.findByIdAndUpdate({ _id: noteId }, req.body)
            res.json({ msg: "note has been updated", note })
        }
        else {
            res.json({ msg: "not authorised" })
        }
    }
    catch (error) {
        res.json({ err: error })
    }


})

noteRouter.delete("/delete/:noteId", async (req, res) => {
    const userIdinUserdoc = req.body.userId
    const { noteId } = req.params
    try {
        const note = await NoteModel.findOne({ _id: noteId })
        const userIdinNotedoc = note.userId
        if (userIdinUserdoc === userIdinNotedoc) {
            await NoteModel.findByIdAndDelete({ _id: noteId })
            res.json({ msg: "note has been deleted" })
        }
        else {
            res.json({ msg: "not authorised" })
        }
    }
    catch (error) {
        res.json({ err: error })
    }
})

module.exports = { noteRouter }