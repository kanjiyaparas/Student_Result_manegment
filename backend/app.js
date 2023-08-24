const express  =require("express")
const DBconnect = require("./connection")
const studentController = require("./Student/studentController")
const subjectController = require("./Subject/subjectController")
const marksController = require("./Marks/MarksController")
const cors = require("cors")

const app = express()
app.use(cors())
DBconnect()

app.use(express.json())


app.post("/student", studentController.AddStudent)

app.post("/subject", subjectController.AddSubject)

app.post("/marks", marksController.AddMarks)

app.get("/marks/:id", marksController.ShowResult)

app.get("/Getstudent", studentController.GetStudent)

app.get("/getsubject", subjectController.GetSubject)

app.listen(5500, () => {
    console.log("Server Started");
})