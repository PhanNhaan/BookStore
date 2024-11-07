import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from '../axios';
// import { setToken } from "../services/localStorageService";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function Authenticate() {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    console.log(window.location.href);

    const authCodeRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(authCodeRegex);

    if (isMatch) {
      const authCode = isMatch[1];

      console.log(authCode);
      axios.post(`/api/auth/login_google?code=${authCode}`)
        .then(res => {
          if (res.status === 200) {
            const token = res.data.result.token;
            console.log(token);
            if (token != '') {
              const user = {
                userId: res.data.result.userId,
                userName: res.data.result.userName,
                // email: res.data.result.email,
                role: res.data.result.role
                // token: token
              }
              // dispatch(setUser(user));
              // alert.success('Login successful');
              // console.log(user);

              localStorage.setItem('isAuthenticated', true);
              localStorage.setItem('userProfile', JSON.stringify(user));
              localStorage.setItem('authToken', token);

              // const storedUser = localStorage.getItem("userProfile")
              //   ? JSON.parse(localStorage.getItem("userProfile"))
              //   : null;

              // console.log(storedUser);

              //   setIsAuthenticated(true);
              //   setUserProfile(user);
              console.log(res.data);
              setIsLoggedin(true);
            }
          }
        })
        .catch(err => {
          console.log(err);
          // alert.error('Login failed');
        });

      //   fetch(
      //     `http://localhost:8080/identity/auth/outbound/authentication?code=${authCode}`,
      //     {
      //       method: "POST",
      //     }
      //   )
      //     .then((response) => {
      //       return response.json();
      //     })
      //     .then((data) => {
      //       console.log(data);

      //       setToken(data.result?.token);
      // setIsLoggedin(true);
      //     });
    }
  }, []);

  useEffect(() => {
    if (isLoggedin) {
      navigate("/");
    }
  }, [isLoggedin, navigate]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress></CircularProgress>
        <Typography>Authenticating...</Typography>
      </Box>
    </>
  );
}