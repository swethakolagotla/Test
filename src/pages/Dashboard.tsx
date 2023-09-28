/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import styles from "./dashboard.module.css";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { useForm, Controller } from "react-hook-form";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface UserData {
  firstName: string;
  lastName: string;
  middleName: string;
  password: string;
  userName: string;
  confirmPassword: string;
}

interface RowData {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  password: string;
  userName: string;
  confirmPassword: string;
}

interface Column {
  field: keyof RowData;
  headerName: string;
}

import app from "../firebase";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
function DashboardPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState<string | null>(
    null
  );
  const [passwordMatchError, setPasswordMatchError] = useState<string | null>(
    null
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserData>();

  const [alldata, setAllData] = useState([]);
  const [reload, setReload] = useState(0);
  const [dataTobeDeleted, setDataTobeDeleted] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, "users"));
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAllData(data);
    };

    fetchData();
  }, [reload]);

  const CurrentUser = alldata.filter((item) => {
    if (item.id === localStorage.getItem("userId")) {
      return item.firstName;
    }
  });
  console.log(CurrentUser, "ALLDATA");
  const handleClickOpen = (data: RowData) => {
    setDataTobeDeleted(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const createDocument = async (userData: UserData) => {
    const db = getFirestore(app);
    const collectionRef = collection(db, "users");
    const {
      userName,
      password,
      lastName,
      firstName,
      middleName,
      confirmPassword,
    } = userData;
    const data = {
      userName,
      password,
      lastName,
      firstName,
      middleName
    };
    if (password !== confirmPassword) {
      setPasswordMatchError("Passwords do not match");
      return;
    } else {
      setPasswordMatchError(null);
    }
    if (password.length < 8 || password.length > 16) {
      setPasswordLengthError("Password must be between 8 and 16 characters");
      return;
    } else {
      setPasswordLengthError(null);
    }
    console.log('errors.password:', errors.password);
console.log('passwordLengthError:', passwordLengthError);

    try {
      await addDoc(collectionRef, data);
      console.log("Document created successfully!");
      reset();
      setReload((prev) => prev + 1);
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  const columns = [
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "userName", headerName: "User Name", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params: { row: RowData; column: Column }) => (
        <>
          <EditIcon
            onClick={() => {
              handleEdit(params.row);
            }}
            style={{ cursor: "pointer", marginRight: 8 }}
          />
          <DeleteIcon
            onClick={() => handleClickOpen(params.row)}
            style={{ cursor: "pointer" }}
          />
        </>
      ),
    },
  ];
  const handleEdit = (data: RowData) => {
    navigate(`/edit/${data.id}`);
  };

  const handleDelete = () => {
    console.log(dataTobeDeleted, "DATAto be deleted");
    // Handle delete logic here
    const db = getFirestore();
    const usersCollection = collection(db, "users");
    const userDoc = doc(usersCollection, `${dataTobeDeleted.id}`);

    deleteDoc(userDoc)
      .then(() => {
        console.log("Document successfully deleted!");
        setDataTobeDeleted("");
        setOpen(false);
        setReload((prev) => prev + 1);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <div>
      {" "}
      <div className={styles.navbar}>
        <Avatar
          sx={{ cursor: "pointer" }}
          alt=""
          src="/static/images/avatar/1.jpg"
        />{" "}
        {CurrentUser.length > 0 && (
          <h3 style={{ cursor: "pointer" }}>{CurrentUser[0].firstName}</h3>
        )}
      </div>
      <div className={styles.main}>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            <h3>Delete User</h3>
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ fontSize: "20px", fontWeight: "500" }}>
              Are you Sure you Want to Delete ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              type="button"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <form onSubmit={handleSubmit(createDocument)}>
          <h2 style={{color:"blue"}}>ADD USER</h2>
          <div className={styles.form}>
            {" "}
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              rules={{ required: true }} // Add any validation rules you need
              render={({ field }) => (
                <TextField
                  label="First Name"
                  value={field.value}
                  onChange={field.onChange}
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName ? "First Name is required" : ""}
                />
              )}
            />
            <Controller
              name="middleName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="Middle Name"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              rules={{ required: true }} // Add any validation rules you need
              render={({ field }) => (
                <TextField
                  label="Last Name"
                  value={field.value}
                  onChange={field.onChange}
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName ? "Last Name is required" : ""}
                />
              )}
            />
            <Controller
              name="userName"
              control={control}
              defaultValue=""
              rules={{ required: true }} // Add any validation rules you need
              render={({ field }) => (
                <TextField
                  label="Email"
                  type="email"
                  value={field.value}
                  onChange={field.onChange}
                  error={Boolean(errors.userName)}
                  helperText={errors.userName ? "Email is required" : ""}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 8,
                maxLength: 16,
              }}
              render={({ field }) => (
                <TextField
                  label="Password"
                  type="password"
                  value={field.value}
                  onChange={field.onChange}
                  error={Boolean(
                    errors.password ||
                      (passwordLengthError && !errors.confirmPassword)
                  )}
                  helperText={
                    errors.password
                      ? "Password is required"
                      : passwordLengthError || " "
                  }
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{ required: true }} // Add any validation rules you need
              render={({ field }) => (
                <TextField
                  label="Confirm Password"
                  type="password"
                  value={field.value}
                  onChange={field.onChange}
                  error={Boolean(errors.confirmPassword || passwordMatchError)}
                  helperText={
                    errors.confirmPassword
                      ? "Confirm Password is required"
                      : passwordMatchError || ""
                  }
                />
              )}
            />
          </div>
          <div className={styles.buttonDiv}>
            {" "}
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={() => reset()}
            >
              clear
            </Button>
          </div>
        </form>

        <div className={styles.card}>
          <h2 style={{color:"blue"}}> ALL USERS</h2>
          <DataGrid rows={alldata} columns={columns} pageSize={5} />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
