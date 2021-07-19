import React, { useState, useEffect } from "react";

import { addContacts } from "./Api calls/helper functions";

// export default function Addcontacts() {
//   const [contacts, setContacts] = useState(null);
//   const [patient, setpatient] = useState(null);

//   const handelChange = (e) => {
//     const fileReader = new FileReader();
//     fileReader.readAsText(e.target.files[0], "UTF-8");
//     fileReader.onload = (e) => {
//       console.log("e.target.result", e.target.result);
//       addContacts(e.target.result).then((data) => {
//         if (data?.error) {
//           console.log(data.error);
//         } else {
//           console.log(data)
//           setContacts(data[0].contacts);
//           setpatient(data[0].deviceid )
//         }
//       });
//     };
//   };
//   return (
//     <div>
//       <h1>add contacts page</h1>
//       <input type="file" onChange={(e) => handelChange(e)} />
//       {contacts
//         ?.filter(
//           (thing, index, self) =>
//             index ===
//             self.findIndex(
//               (t) => t.deviceid === thing.deviceid
//             )
//         )
//         .map((c) => (
//           <h1 key={c.deviceid}>
//             {c.deviceid} {c.phoneNumber}
//             {c.name}
//           </h1>
//         ))}

//     </div>
//   );
// }

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";


const useStyles = makeStyles({
  root: {
    maxWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Addcontacts() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
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
          console.log(data);
          setContacts(data[0].contacts);
          setpatient(data[0].deviceid);
        }
      });
    };
  };

  return (
    <div>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <FolderIcon type="file" onChange={(e) => handelChange(e)} />
          <input type="file" onChange={(e) => handelChange(e)} />
        </CardContent>
      </Card>
      {contacts
        ?.filter(
          (thing, index, self) =>
            index === self.findIndex((t) => t.deviceid === thing.deviceid)
        )
        .map((c) => (
          <card key={c.deviceid} className={classes.root} variant="outlined">
            <CardContent>
              {/* <CardHeader>{c.name}</CardHeader> */}
              <Typography>{c.deviceid}</Typography>
              <Typography>{c.name}</Typography>
              <Typography>{c.phoneNumber}</Typography>
            </CardContent>
          </card>
        ))}
    </div>
  );
}
