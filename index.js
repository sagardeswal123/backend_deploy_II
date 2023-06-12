const express = require("express");
const cors = require("cors")
const { connection } = require("./db");
const { userRouter } = require("./routes/userRoutes");
const { noteRouter } = require("./routes/notesRoute");
require("dotenv").config()



const app = express();

app.use(express.json());
app.use(cors())

app.use("/users", userRouter);
app.use("/notes", noteRouter)


app.listen(process.env.port, async () => {
    try {
        await connection

        console.log("connected to db")
        console.log("server is running at port 8080")
    } catch (error) {
        console.log("something went wrong")
    }
})