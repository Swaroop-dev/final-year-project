import React, { useState, useEffect } from "react";
import { CSVReader } from "react-papaparse";
import { addContacts } from "./Api calls/helper functions";


export default function Addcontacts() {
  const [contacts, setContacts] = useState(null);

  const handelChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      console.log("e.target.result", e.target.result);
      addContacts(e.target.result).then((data) => {
        if (data?.error) {
        console.log(data.error);
        }
        else {
          setContacts(e.target.result)
          console.log(data)
        }
      }
        
      )
          
    };
  };
  return (
    <div>
      <h1>add contacts page</h1>
      <input type="file" onChange={(e) => handelChange(e)} />
    </div>
  );
}
