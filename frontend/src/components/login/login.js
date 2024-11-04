import React, { useState } from 'react';
import axios from '../../axios';
// import Cookies from 'js-cookie';
import { NavLink, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../../reducer/userReducer';
// import { useAlert } from 'react-alert';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Grid,
    Stack,
    TextField,
    Typography,
    Link,
    Container,
} from '@mui/material';

const Login = () => {
    const navigate = useNavigate();
    const [userName, setuserName] = useState('');
    const [password, setPassword] = useState('');
    // const dispatch = useDispatch();
    // const alert = useAlert();

    const handleLogin = () => {

        const loginResquest = {
          userName,
          password
        }

        console.log(loginResquest);

        axios.post("/api/auth/login", loginResquest)
          .then(res => {
            if (res.status === 200) {
              const token = res.data.result.token;
              console.log(token);
              if (token != '') {
                const user = {
                  userId: res.data.userId,
                  userName: res.data.userName,
                  role: res.data.role,
                }
                localStorage.setItem('user', user);
                // Cookies.set('authToken', token, { expires: 1 });
                localStorage.setItem('authToken', token);
                // dispatch(setUser(user));
                // alert.success("Đăng nhập thành công")
                navigate('/');
              }
            }
          }).catch(e => {
            console.log(e);
            alert("Đăng nhập không thành công")
          })

      };

    return (
        <Container maxWidth="md" sx={{ mt: 10, mb: 5 }}>
        <Box sx={{ width: '100%' }}>
            <Grid
                container
                justifyContent="space-around"
                alignItems="center"
                sx={{ width: '98%', margin: 'auto', padding: 'auto' }}
            >
                {/* <Grid item xs={5}>
                    <Box
                        component="img"
                        src="login.jpg"
                        alt="login"
                        sx={{ width: '48%' }}
                    />
                </Grid> */}
                <Grid item xs={6}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        bgcolor={(theme) => theme.palette.mode === 'light' ? 'grey.50' : 'grey.800'}
                        sx={{ width: '100%', py: 3 }}
                    >
                        <Stack spacing={2} sx={{ maxWidth: 'lg', mx: 'auto', py: 2, px: 1 }}>
                            <Stack alignItems="center">
                                <Typography variant="h4">Đăng nhập vào tài khoản</Typography>
                                <NavLink to="/register" style={{ textDecoration: 'none' }}>
                                    <Typography variant="body1" color="textSecondary">
                                        Bạn chưa có tài khoản?
                                        <Link href="/register" color="primary"> Đăng ký</Link> ✌️
                                    </Typography>
                                </NavLink>
                            </Stack>
                            <Box
                                bgcolor={(theme) => theme.palette.mode === 'light' ? 'white' : 'grey.700'}
                                boxShadow={3}
                                p={2}
                                borderRadius={2}
                            >
                                <Stack spacing={2}>
                                    <FormControl fullWidth>
                                        <FormLabel htmlFor="user">Tên đăng nhập</FormLabel>
                                        <TextField
                                            id="user"
                                            type="text"
                                            placeholder="Tài khoản"
                                            onChange={(e) => setuserName(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <FormLabel htmlFor="pwd">Mật khẩu</FormLabel>
                                        <TextField
                                            id="pwd"
                                            type="password"
                                            placeholder="Nhập mật khẩu"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </FormControl>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        {/* <Checkbox label="Lưu thông tin" /> */}
                                        <Link href="#" color="primary">Bạn quên mật khẩu?</Link>
                                    </Stack>
                                    <Button
                                        onClick={handleLogin}
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                    >
                                        Đăng nhập
                                    </Button>
                                </Stack>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </Box>
</Container>
    );
}

export default Login;