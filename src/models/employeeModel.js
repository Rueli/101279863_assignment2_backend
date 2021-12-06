const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    firstname:{
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    emailid:{ 
        type: String, 
        required: true 
    }
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;