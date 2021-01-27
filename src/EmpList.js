import React, { Component } from "react";
import EmpDetails from "./EmpDetails.js";
import axios from "axios";
import "./EmpList.css";
import AddEmp from "./AddEmp.js";
export default class EmpList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empdetails: [],
      allemp: [],
      addempflag: false,
    };
  }

  componentDidMount() {
    this.getemp();
  }
  getemp(){
    axios.get("http://localhost:8000/getemp").then((response) => {
        var result = response.data;
        this.setState({ allemp: result });
        
      });
  }
  addemp() {
    this.setState({ addempflag: true });
  }
  showemp() {
    this.getemp();
    this.setState({ addempflag: false });
  }
  empdelete(id){
    console.log("delete",id)
    axios.delete(`http://localhost:8000/empdelete/${id}`).then((res)=>{
        this.getemp()
        console.log("deleted");
        this.setState({empdetails:[]})
  })
  }
  sendempdetails(id) {
    var empdeatils = this.state.allemp.filter((empname) => empname.Id === id);
    this.setState({ empdetails: empdeatils[0] });
  }
  render() {
    var empnames = this.state.allemp;
    return (
      <div id="employee">
        {this.state.addempflag ? (
          <div id="addemployee">
            <div id="leftpane" className="split left">
              <div id="leftpane-centre" className="centered">
                <button className="button" onClick={(e) => this.showemp()}>
                  View Employee Details
                </button>
              </div>
            </div>
            <div id="rightpane" className="split right">
              <div id="rightpane-centre" className="centered">
                <AddEmp headers={Object.keys(this.state.allemp[0])} />
              </div>
            </div>
          </div>
        ) : (
          <div  id="empList">
            <div id="leftpane" className="split left">
              <div id="leftpane-centre" className="centered">
                <button className="button" onClick={(e) => this.addemp()}>
                  Add Employee
                </button>
                <h2 style={{ color: "white" }}>Emp List</h2>
                <table  id="table-emplist">
                   <tbody  id="tbody-emplist">
                {empnames.map((empname,i) => (
                            <tr id="tr-emplist">
                    <th 
                    id={empname.Id}
                    className="menu-link"
                    key={empname.Id.toString()}
                    onClick={(e) => this.sendempdetails(empname.Id)}
                  >
                    {empname.Name}
                  </th>
                  <td id={`td-${i}`} style={{color:"white"}}  className="empDelete" onClick={()=>{this.empdelete(empname.Id)}}>❌
                  </td>
                  
                    </tr>

                ))}
                                  </tbody>
                  </table>
              </div>
            </div>
            <div id="rightpane" className="split right">
              <div id="rightpane-centre" className="centered">
                <EmpDetails details={this.state.empdetails} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
