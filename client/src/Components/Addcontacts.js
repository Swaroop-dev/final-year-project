import React, { useState, useEffect } from "react";

import { addContacts } from "./Api calls/helper functions";

export default function Addcontacts() {
  const [contacts, setContacts] = useState(null);
  const [patient, setpatient] = useState(null);

  const handelChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      console.log("e.target.result", e.target.result);
      addContacts(e.target.result).then((data) => {
        if (data?.error) {
          console.log(data.error);
        } else {
          console.log(data)
          setContacts(data[0].contacts);
          setpatient(data[0].deviceid )
        }
      });
    };
  };
  return (
    <div>
      <h1>add contacts page</h1>
      <input type="file" onChange={(e) => handelChange(e)} />
      {contacts
        ?.filter(
          (thing, index, self) =>
            index ===
            self.findIndex(
              (t) => t.deviceid === thing.deviceid
            )
        )
        .map((c) => (
          <h1 key={c.deviceid}>
            {c.deviceid} {c.phoneNumber}
            {c.name}
          </h1>
        ))}
      
    </div>
  );
}
