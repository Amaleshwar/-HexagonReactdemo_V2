var express = require("express");
var app = express();

var cors = require("cors");
app.use(cors());
// var emp = [
//   { Name: "Amaleshwar", Id: "101", Age: 25, Address: "Hyderabad" },
//   { Name: "CHANDRAN Nithin", Id: "102", Age: 23, Address: "Hyderabad" },
//   { Name: "Shashank", Id: "103", Age: 25, Address: "Hyderabad" },
//   { Name: "Mohan Krishna", Id: "104", Age: 25, Address: "Hyderabad" },
// ];
var filePath = __dirname + '/files/EmployeeData.json';
var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get("/getemp", function (req, res) {
  var empjsondata = fs.readFileSync(filePath);
  res.send(empjsondata);
});
app.delete("/empdelete/:id", function (req, res) {
  console.log(req.params.id);

  var empjsondata = fs.readFileSync(filePath);
  var empdata = JSON.parse(empjsondata);
  var empdatafilter = empdata.filter((emp)=>{return emp.Id !==req.params.id})
  console.log(empdatafilter);
   fs.writeFileSync(filePath,JSON.stringify(empdatafilter) );
   res.sendStatus(200);
});
app.post("/addemp",function (req,res) {
  let newempdata = req.body.data;
   console.log(JSON.parse(newempdata));

  var empjsondata = fs.readFileSync(filePath);
  var empdata = JSON.parse(empjsondata);

  empdata.push(JSON.parse(newempdata));

  fs.writeFileSync(filePath,JSON.stringify(empdata) );
  res.sendStatus(200);
})
app.listen(8000, function () {
  console.log("started");
});
