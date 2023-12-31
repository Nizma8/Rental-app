import React, { useContext, useEffect, useState } from "react";
import { SiGooglehome } from "react-icons/si";
import { GiHamburgerMenu, GiLog } from "react-icons/gi";

import { RoleProvide } from "../ContextShare/ContextRole";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { pink, purple } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  loginHostApi,
  loginUserApi,
  registerUserAPi,
} from "../Service/commonApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { json, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const color = pink[500];
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const theme = createTheme({
  palette: {
    primary: pink,
    secondary: purple,
  },
});
function Header({ home }) {
  const [menu, setMenu] = useState("");
  const { logine, setUserRole, userRole, setLogine } = useContext(RoleProvide);
  const [register, setRegister] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = useState("");
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/");
  };
  const handleMenu = () => {
    setMenu(!menu);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReg = (item) => {
    if (item === "Login") {
      setOpen(true);
      setRegister(false);
      setUserInput({
        username: "",
        email: "",
        password: "",
      });
    } else if (item === "sign-up") {
      setRegister(true);
      setOpen(true);
    }
  };

  const handleRedie = () => {
    if (register) {
      setRegister(false); // Set register state to true
      setOpen(true); // Open the modal
    } else {
      setRegister(true);
      setOpen(true);
    }
  };
  // register
  const handleRegisterUser = async () => {
    const { username, email, password } = userInput;
    // api call to the /user/regoster
    if (!username || !email || !password) {
      toast.warning("please fill the form");
    } else {
      const response = await registerUserAPi(userInput);
      if (response.status == 200) {
        alert(response.data.message);
        setUserInput({
          username: "",
          email: response.data.email,
          password: "",
        });
        setRegister(false);
        setOpen(true); // Open the modal
      } else {
        alert(response.response.data.message);
      }
    }
  };
  // login
  const login = async () => {
    const { email, password } = userInput;
    if (!email || !password) {
      alert("please fill the form");
    } else {
      const response = await loginUserApi({ email, password });
      if (response.status === 200) {
        toast.success(`Welcome ${response.data.existingUser.username}`);
        sessionStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "ExistingUser",
          JSON.stringify(response.data.existingUser)
        );
        // localStorage.setItem("role",JSON.stringify(response.data.existingUser.role))
        const roles = response.data.existingUser.role;
        const updatedUserRole = roles.includes("admin")
          ? "admin"
          : roles.includes("host")
          ? "user"
          : roles.includes("user")
          ? "user"
          : "user";

        localStorage.setItem("role", JSON.stringify(roles));
        setUserInput({
          username: "",
          email: "",
          password: "",
        });
        setUserRole(updatedUserRole);
        handleClose();
        handleMenu();
        setLogine(true);
      } else {
        toast.warning(response.response.data.message);
      }
    }
  };
  // console.log(userRole.length);
  //logout
  const Logout = async (item) => {
    if (item === "Logout") {
      navigate("/");
      setLogine(false);
      setUserRole("user");
      localStorage.removeItem("ExistingUser");
      sessionStorage.removeItem("token");
      handleClose();
      setMenu(!menu);
    } 
    else if (item === "Switch to Hosting") {
      const response = await loginHostApi({
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      });

      if (response.status === 200 || response.status === 201) {
        console.log(response);
        toast.success(response.data.message);
        const roles = response.data.role;
        localStorage.setItem("role", JSON.stringify(response.data.role[1]));
        const updatedUserRole = roles.includes("host") ? "host" : "user";

        localStorage.setItem("id", JSON.stringify(response.data._id));
        setUserRole(updatedUserRole);
        // console.log(role);

        item.replace("Switch to Hosting", "");
        setMenu(!menu);
      } else {
        toast.warning("please try after sometime..!");
      }
    } 
    else if (item === "Wishlist") {
      navigate("/property/wishlist");
      setMenu(!menu);
    } 
    else if (item === "Account") {
      navigate("/account");
      setMenu(!menu);
    }
    else if(item === "Switch to Travelling"){
      localStorage.setItem("role","user")
      setUserRole("user")
      setMenu(!menu)
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("ExistingUser") &&
      sessionStorage.getItem("token")
    ) {
      setUsername(JSON.parse(localStorage.getItem("ExistingUser")).username);
      setLogine(true);
    }
  }, [logine]);

  return (
    <>
      <div className="w-screen border-t-2 border-b-2 py-6  bg-slate-200 fixed  z-20">
        <div className="grid grid-cols-3 mx-12 h-full lg:gap-8   ">
          <div className="inline-flex">
            <SiGooglehome className="text-4xl me-4 text-customPink" />

            <motion.h3
              animate={{ x: [50, 100, 50], opacity: 1, scale: 2 }}
              transition={{
                duration: 3,
                delay: 0.5,
                ease: [0.5, 0.62, 1, 1.5],
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.2 }}
              className="font-extralight  text-customPink mt-3"
              onClick={handleRedirect}
            >
              STAYSCAPE
            </motion.h3>
          </div>
          <div></div>

          <div className=" flex flex-col items-center relative">
            <div className="border rounded-3xl px-3 py-2 inline-flex  border-customPink shadow-md">
              <GiHamburgerMenu
                className="text-black text-2xl me-2 mt-1 cursor-pointer "
                onClick={handleMenu}
              />
              <span className="border bg-black rounded-full text-white w-8 h-8 flex flex-col items-center justify-center">
                {logine && username.slice(0, 1)}
              </span>
            </div>
          </div>
        </div>
        
          {menu && (
            <div className="w-44 flex flex-col items-center justify-center border border-slate-600 py-5 bg-white mt-3 absolute xl:right-52 rounded-lg shadow-lg lg:right-40 md:right-20 sm:right-10 right-5"
            
            >
              <ul className="w-full">
                {!logine
                  ? ["Login", "sign-up"].map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="hover:bg-slate-300 me-1 ms-2 border-b-2 cursor-pointer"
                          onClick={() => handleReg(item)}
                        >
                          {item}
                        </li>
                      );
                    })
                  : [
                      `Welcome ${username}`,
                      `${
                        userRole == "host" || userRole == "user"
                          ? "Wishlist"
                          : ""
                      }`,
                      `${
                        userRole == "host" 
                          ? "Switch to Travelling"
                          : "Switch to Hosting"
                          
                      }`,
                      "Account",
                      "Logout",
                    ]
                      .filter((item) => item !== "")
                      .map((item, index) => {
                        if (item === "Switch to Hosting" && userRole == "host") {
                          return null;
                        }

                        return (
                          <>
                            <li
                              key={index}
                              onClick={() => {
                                Logout(item);
                              }}
                              className={`hover:bg-slate-300 me-1 ms-2 py-2 cursor-pointer ${
                                item === `Welcome ${username}`
                                  ? " font-bold font-customheading text-xl "
                                  : ""
                              }`}
                            >
                              {item}
                            </li>
                          </>
                        );
                      })}
              </ul>
            </div>
          )}
      </div>
      <>
        <ThemeProvider theme={theme}>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle
              sx={{
                m: 0,
                p: 2,
                fontFamily: "Noto Serif Vithkuqi, serif",
                fontWeight: "800",
              }}
              id="customized-dialog-title"
            >
              {!register ? "Login" : "Sign-up"}
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: theme.palette.primary.dark,
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              {register && (
                <TextField
                  sx={{ mt: 2, maxWidth: 520, minWidth: 250 }}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="username"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={userInput.username}
                  onChange={(e) => {
                    setUserInput({ ...userInput, username: e.target.value });
                  }}
                />
              )}
              <TextField
                sx={{ mt: 2, maxWidth: 520, minWidth: 250 }}
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                value={userInput.email}
                onChange={(e) => {
                  setUserInput({ ...userInput, email: e.target.value });
                }}
              />
              <TextField
                sx={{ mt: 2, maxWidth: 520, minWidth: 250 }}
                autoFocus
                margin="dense"
                id="name"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
                value={userInput.password}
                onChange={(e) => {
                  setUserInput({ ...userInput, password: e.target.value });
                }}
              />
            </DialogContent>
            <DialogActions>
              {register ? (
                <Button
                  autoFocus
                  onClick={handleRegisterUser}
                  variant="contained"
                  sx={{
                    backgroundColor: color,
                    marginRight: "10px",
                    "&:hover": {
                      backgroundColor: pink[700],
                    },
                  }}
                >
                  Sign-up
                </Button>
              ) : (
                <Button
                  autoFocus
                  onClick={login}
                  variant="contained"
                  sx={{
                    backgroundColor: color,
                    marginRight: "10px",
                    "&:hover": {
                      backgroundColor: pink[700],
                    },
                  }}
                >
                  Login
                </Button>
              )}

              <button
                className=" underline text-customPink "
                autoFocus
                onClick={handleRedie}
              >
                {register
                  ? "Already have an account?Login"
                  : "New User?Sign-up"}
              </button>
            </DialogActions>
          </BootstrapDialog>
        </ThemeProvider>
      </>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default Header;
