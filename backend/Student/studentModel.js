const { default: mongoose } = require("mongoose");

class StudentModel { 
    constructor(){
        this.schema = new mongoose.Schema({
            name : { type: String, required: true },
            std : { type: String , required: true }
        })    

        this.student = mongoose.model("tbl_students" , this.schema)
    }

    InsertStudent(data){
        return this.student.create(data)
    }

    GetStudent(data){
        return this.student.find(data)
    }
}

const studentModel = new StudentModel()
module.exports = studentModel
