require("dotenv").config()
const notionScript = require("./notion")
const express = require("express")

require("ejs")
const path = require("path");

const app = express()

app.set("views", "./views")
app.set("view engine", "ejs")

app.use(express.static(path.join(__dirname, "public")))

app.get("/", async (req, res) => {
    const test = await notionScript.findName("testing")
    res.render("index", { test })
})

app.listen(process.env.PORT)