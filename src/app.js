const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Employee = require('./models/employeeModel');

const app = express();

// mongoose.connect('mongodb+srv://newUser:pa$$w0rd1@basicconnection.z0rmu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser:true, useUnifiedTopology:true })
mongoose.connect('mongodb+srv://User1:Jemima2308@employeedatabase.ewvkm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser:true, useUnifiedTopology:true })
const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return next();
});

app.get('/api/v1/employees', async function(req, res, next) {
    const employees = await Employee.find({});
  
    try {
      res.send(employees);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.post('/api/v1/employees', async function(req, res){
    const employee = new Employee(req.body);

    try {
        await employee.save();
        return res.send(employee);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/api/v1/employees/:id', async (req, res, next) => {
    const employeeId = req.params.id;

    try {
        const employee = await Employee.find({ _id: employeeId });
        return res.status(200).json({
            status: 200,
            message: "Successfully retrieved employee.",
            response: employee
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        });
    }
});

app.put('/api/v1/employees/:id', async (req, res, next) => {
    const employeeId = req.params.id;
    const employeeInfo = req.body

    try {
        const employee = await Employee.findOneAndUpdate({ _id: employeeId }, employeeInfo, { upsert: true, new: true });
        return res.status(200).json({
            status: 200,
            message: "Successfully updated!",
            response: employee
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        });
    }
});

app.delete('/api/v1/employees/:id', async (req, res, next) => {
    const employeeId = req.params.id;

    try {
        const employee = await Employee.findOneAndRemove({ _id: employeeId })
        return res.status(200).json({
            status: 200,
            message: "Successfully removed!",
            response: employee
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        });
    }
});

app.get('/ping', function(req, res, next) {
    console.log("Ping successful!");
    res.status(200).json({
        message: "Ping successful!"
    });
});

module.exports = app;