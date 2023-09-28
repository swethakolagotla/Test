/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

import { Button, Divider, TextField } from "@mui/material";
import { collection, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import app from "../firebase";
import styles from "./edit.module.css"
import { Card } from '@mui/material';

function Edit() {
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      middleName:"",
    },
  });
  const navigate =useNavigate()
  const { userId } = useParams();
  console.log(userId, "IDGET");
  // Simulate fetching data (you can replace this with an actual API call)
  useEffect(() => {
    // Replace this with your data fetching logic
    const fetchData = async () => {
      try {
        const db = getFirestore(app);
        const querySnapshot = await getDocs(collection(db, "users"));
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const mainData = data.filter((item) => item.id === userId)[0];
        console.log(mainData, "MAINDATA");
        // Set the form field values with the fetched data
        setValue("firstName", mainData.firstName);
        setValue("lastName", mainData.lastName);
        setValue("middleName", mainData.middleName);
        setValue("userName", mainData.userName);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setValue]);

  // Handle form submission
  const onSubmit = (data) => {
const db = getFirestore(app);
const userDoc = doc(db, "users", userId);
updateDoc(userDoc, data)
  .then(() => {
 goBack()
  })
  .catch((error) => {
    console.error("Error updating document: ", error);
  });
  };

  const goBack=()=>{
    navigate('/dashboard')
  }

  return (
    <div className={styles.main}>
      {" "}
      <Card className={styles.card}>
        {" "}
        <h2 style={{color:"blue",marginLeft:"180px"}}>Edit User</h2>
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.editsection}>
            <div>
            <label>First Name</label><br/>
            <Controller
              name='firstName'
              control={control}
               render={({ field }) => <TextField style={{width:"200px",marginTop:"20px"}}
               {...field} />}
            />
            </div>
           <div>
           <label>Middle Name</label>
            <Controller
              name='middleName'
              control={control}
              render={({ field }) => <TextField               style={{width:"200px",marginTop:"20px"}}
              {...field} />}
            />
           </div>
             
          </div>
           
          <div className={styles.editsection2}>
            <div>
            <label>Last Name</label>
            <Controller
              name='lastName'
              control={control}
              render={({ field }) => <TextField               style={{width:"200px",marginTop:"20px"}}
              {...field} />}
            />
          </div>
          <div>
            <label>User Name</label>
            <Controller
              name='userName'
              control={control}
              style={{marginTop:"20px"}}
              render={({ field }) => <TextField style={{width:"200px",marginTop:"20px"}}
              {...field} />}
            />
          </div>
</div>
          <div className={styles.buttonDiv}>
            {" "}
            <Button sx={{width:"175px"}} variant='contained' color='primary' type='submit'>
            Submit
            </Button>
            <Button sx={{width:"175px"}} 
              variant='contained'
              color='primary'
              type='button'
              onClick={() => goBack()}
            >
              Cancel{" "}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
export default Edit;
