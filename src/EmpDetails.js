import React, { Component } from "react";
import "./EmpDetails.css";

export default function EmpDetails(props) {
      const details = props.details;
    return (
      <div>
        <h2>Emp Details</h2>
        {details.length !== 0 ? ( <div id="details">
          <table  id="table-details">
              <tbody  id="tbody-details">
            { details.length !== 0 &&  Object.keys(details).map((key,i)=>(  //console.log(key,this.props.deatils[key]) 
            <tr id={`tr-${i}`} >
              <th id={`th-${i}`} >{key}</th>
              <td id={`td-${i}`} >{details[key]}</td>
            </tr>
            ))  }

            </tbody>
          </table>
        </div>
        ) : (
          <span>Please select emplyee to view details</span>
        )}
      </div>
    );
}
