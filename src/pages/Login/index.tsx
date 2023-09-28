/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import "./login.css";
import { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import CustomBtn from "../../Components/CustomBtn/index";
import { useNavigate, Link } from "react-router-dom";
import CustomInput from "../../Components/CustomInput/index";
import { Snackbar, Alert } from "@mui/material";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../../firebase";
interface FormData {
  email: string;
  password: string;
}
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);


    const fetchData = async () => {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, "users"));
       const data = querySnapshot.docs.map((doc) => ({
         ...doc.data(),
         id: doc.id,
       }));
      setData(data);
    };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };


  useEffect(() => {
    document.title = `Login Page | Interview Assignment`;
    fetchData();
  }, [navigate]);

  console.log(data, "data");

  const signIn = async (e) => {
    e.preventDefault()
    console.log(email,password,"TEST")
    const filteredArray = data.filter(
      (obj) => obj.userName === email && obj.password === password
    );
    console.log(filteredArray, "THIS IS LOGGED IN DATA");
    if (filteredArray.length > 0) {
      localStorage.setItem("userName", filteredArray[0].userName);
      localStorage.setItem("name", filteredArray[0].firstName);
      localStorage.setItem("userId", filteredArray[0].id);
      navigate("/dashboard");
    }
    if (filteredArray.length === 0) {
      setOpen(true);
    }
  };

  return (
    <div className='loginPage'>
      <div className='sectionContent'>
        <section className='infoLeft'>
          <div className='headingContent'>
            <h1>Welcome</h1>
            <h2>to online help center!</h2>
          </div>

          <div className='highlightsContent'>
            <span>
              <DoneIcon />
              Secure and reliable for user
            </span>
            <span>
              <DoneIcon />
              Even your grandma can use it
            </span>
            <span>
              <DoneIcon />
              Work 15% faster than others
            </span>
          </div>
        </section>

        <section className='formData'>
          <form>
            <CustomInput
              name='email'
              fldType='email'
              label='E-mail'
              value={email}
              onchange={(event) => setEmail(event.target.value)}
              className='emailInpFld'
            />
            <CustomInput
              name='password'
              fldType='password'
              label='Password'
              value={password}
              onchange={(event) => setPassword(event.target.value)}
              className='passInpFld'
            />
            <CustomBtn className='cusLoginBtn' onClick={(e) => signIn(e)}>
              Login
            </CustomBtn>
          </form>
        </section>
        <div className='dontHaveAccount'>
          Dont have an account? <Link>Contact us</Link>
        </div>
      </div>
      {open && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='error' sx={{ width: "100%" }}>
            Incorrect Email or Password
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default Login;
