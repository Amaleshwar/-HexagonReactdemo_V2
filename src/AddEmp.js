import React, { Component } from 'react'
import axios from "axios";

export default class AddEmp extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             newemp:[],
             submitflag:false,
             errormsg:'',
        }
    }
    componentDidMount() {
            this.setnewemp();
      }
      setnewemp(){
        var tempemp = {}
        this.props.headers.map((header)=> tempemp[header]="")
       this.setState({ newemp: tempemp });
      }
      changetext(e,inptid){
        e.preventDefault();
        var tempemp =this.state.newemp;
        if(inptid === 'Age' ||inptid === 'Id' ){
            if(isNaN( e.target.value)){
                this.setState({errormsg:'Enter only numeric values'});
                return;
            }
            else{
                tempemp[inptid] =e.target.value;
                this.setState({errormsg:''});
            }
        }
        else{ 
        tempemp[inptid] =e.target.value;
        }
        this.setState({ newemp: tempemp });
      }
      mySubmitHandler(e){
        e.preventDefault();
        if( this.state.newemp.Id ==='' ){
            this.setState({errormsg:'ID should not be empty'});
            return;
        }
        axios.post('http://localhost:8000/addemp',{
           data: JSON.stringify( this.state.newemp)
      }
        )
        .then(res=>{
            this.setState({submitflag:true})
            console.log("submited",this.state.newemp)
        })

      }
      addanotherEmp(){
        this.setnewemp();
        this.props.headers.map((header)=> document.getElementById(header).value="")
        this.setState({submitflag:false,errormsg:false});
      }
    render() {
        const headers = this.props.headers;
        return (
          <div>
            <h2>Add Employee</h2>
            {headers.length !== 0 ? ( <div id="details">
            <form onSubmit={(e)=>this.mySubmitHandler(e)}>
              <table  id="table-details">
                  <tbody  id="tbody-details">
                { headers.length !== 0 && headers.map((header,i)=>(  
                <tr id={`tr-${i}`} >
                  <th id={`th-${i}`} >{header}</th>
                  <td id={`td-${i}`} >
                      <input type="text" disabled={this.state.submitflag} id={header} onChange={(e)=>this.changetext(e,header)}></input>
                  </td>
                </tr>
                ))  }
    
                </tbody>
              </table>
             { !this.state.submitflag ?  <input type='submit' className="btn" disabled={this.state.submitflag} />
             :
              <button id="btn-add" className="btn" disabled={!this.state.submitflag} onClick={()=>this.addanotherEmp()} >Add </button>}
              {this.state.submitflag && <div> Submitted successfully. You can add more.</div>}
              {this.state.errormsg.length !==0 && <div style={{color:'red'}}> {this.state.errormsg}</div>}
              </form>
            </div>
            ) : (
              <span>Please select emplyee to view details</span>
            )}
          </div>
        );
    }
}
