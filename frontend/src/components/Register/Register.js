import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
// import { useAlert } from 'react-alert';
import axios from '../../axios';
// import Cookies from 'js-cookie';
// import { useDispatch } from 'react-redux';

// import { setUser } from '../../reducer/userReducer';

import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Grid,
    InputAdornment,
    IconButton,
    Select,
    MenuItem,
    Stack,
    TextField,
    Typography,
    Link,
} from '@mui/material';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRetype, setShowPasswordRetype] = useState(false);
    const [checkUsername, setCheckUsername] = useState(false);

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRetype, setPasswordRetype] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    // const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        phone: '',
        dob: '',
    });
    // const alert = useAlert();   
    // const dispatch = useDispatch();


    const newErrors = { username: '', email: '', password: '', phone: '', dob: '' };

    function validUserEmail(email) {
        let validText = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gm;
        if (email.match(validText)) {
            return true;
        }
        newErrors.email = 'Email không hợp lệ';
        setErrors(newErrors);
        return false
    }

    function validPassword(password, passwordRetype) {
        if (password !== '' && passwordRetype !== '') {
            if (password === passwordRetype) {
                newErrors.password = '';
                setErrors(newErrors);
                return true;
            }
        }
        newErrors.password = 'Password loi';
        setErrors(newErrors);
        return false;
    }

    function validPhone(phone) {
        let phoneValid = /^0\d{9}$/gm;
        if (phone.match(phoneValid)) {
            return true;
        }
        newErrors.phone = 'phone loi';
        setErrors(newErrors);
        return false;
    }

    function handleDobChange(dob) {
        const selectedDate = new Date(dob);
        const today = new Date();
        const ageLimitDate = new Date(today.getFullYear() - 14, today.getMonth(), today.getDate());
        // console.log(ageLimitDate);

        if (selectedDate < ageLimitDate) {
            return true
        } else {
            newErrors.dob = 'ngay sunh';
            setErrors(newErrors);
            return false
        }
    };

    function checkusername(username) {
        axios.get(`/api/user/checkusername?username=${username}`)
            .then(res => {
                setCheckUsername(true);
            })
            .catch(e => {
                console.log(e.response.data);
                newErrors.username = e.response.data.message;
                setErrors(newErrors);
                // console.log(errors);
                setCheckUsername(false);
            }
            )
        return checkUsername;
    }

    function validUser() {
        console.log(validUserEmail(email));
        console.log(validPassword(password, passwordRetype));
        console.log(validPhone(phone));
        console.log(handleDobChange(dob));
        console.log(checkusername(username));

        if (validUserEmail(email) && validPassword(password, passwordRetype) && validPhone(phone) && handleDobChange(dob) && checkusername(username)) {
            // console.log('valid');
            if (username !== '' && (gender === 'MALE' || gender === 'FEMALE') && dob !== '') {
                return true;
            }
        }
        return false;
    }

    function handleNewAccountRequest() {

        if (!validUser()) {
            console.log(errors)
            alert("Xin hãy kiểm tra lại thông tin");
            return;
        }

        let date = new Date(dob);
        let day = date.getDate();
        if (day < 10) day = `0${day}`;
        let month = date.getMonth() + 1;
        if (month < 10) month = `0${month}`;
        let year = date.getFullYear();
        let newDob = year + "-" + month + "-" + day;
        // console.log(newDob);


        const requestPayload = {
            userName: username,
            password,
            userEmail: email,
            gender,
            // userAddress: address,
            userPhone: phone,
            dob: newDob,
            role: 'USER'
        }
        console.log(requestPayload);

        axios.post('/api/user/signup', requestPayload)
            .then(res => {
                console.log('dang ky thanh cong');
                navigate('/login');
            })
            .catch(e => {
                console.log(e);
                // alert("Xin hãy kiểm tra lại thông tin");
                // console.log(e.response.data.message);
                newErrors.username = e.response.data.message;
                setErrors(newErrors);
                // console.log(errors);
            }
            )
    }


    return (
        <Box
            display="flex"
            minHeight="100vh"
            alignItems="center"
            justifyContent="center"
            bgcolor={(theme) => theme.palette.mode === 'light' ? 'grey.50' : 'grey.800'}
        >
            <Stack spacing={4} maxWidth="md" sx={{ mx: 'auto', py: 4, px: 6, width: '100%' }}>
                <Stack alignItems="center">
                    <Typography variant="h4" textAlign="center">Đăng ký</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        để nhận được những thông tin mới nhất ✌️
                    </Typography>
                </Stack>
                <Box
                    bgcolor={(theme) => theme.palette.mode === 'light' ? 'white' : 'grey.700'}
                    boxShadow={3}
                    p={4}
                    borderRadius={2}
                >
                    <Stack spacing={3}>
                        <TextField
                            required
                            label="Tài khoản"
                            placeholder="Tên tài khoản"

                            fullWidth
                            onChange={(e) => setUsername(e.target.value)}
                            error={!!errors.username}
                            helperText={errors.username}
                        />
                        <TextField
                            required
                            label="Điện thoại"
                            type="tel"
                            placeholder="Nhập số điện thoại"
                            fullWidth
                            onChange={(e) => setPhone(e.target.value)}
                            error={!!errors.phone}
                            helperText={errors.phone}
                        />
                        <TextField
                            required
                            label="Địa chỉ email"
                            type="email"

                            placeholder="Nhập địa chỉ email"
                            fullWidth
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        {/* <TextField
                            required
                            label="Địa chỉ"
                            placeholder="Nhập địa chỉ"
                            fullWidth
                            onChange={(e) => setAddress(e.target.value)}
                        /> */}
                        <TextField
                            required
                            label="Ngày sinh"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            onChange={(e) => setDob(e.target.value)}
                            error={!!errors.dob}
                            helperText={errors.dob}
                        />
                        <FormControl fullWidth required>
                            <FormLabel>Giới tính</FormLabel>
                            <Select defaultValue="" onChange={(e) => setGender(e.target.value)}>
                                <MenuItem value="" disabled>Chọn giới tính</MenuItem>
                                <MenuItem value="MALE">Nam</MenuItem>
                                <MenuItem value="FEMALE">Nữ</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            required
                            label="Mật khẩu"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Nhập vào mật khẩu"
                            fullWidth
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            required
                            label="Nhập lại mật khẩu"
                            type={showPasswordRetype ? 'text' : 'password'}
                            placeholder="Nhập lại mật khẩu"
                            fullWidth
                            onChange={(e) => setPasswordRetype(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPasswordRetype(!showPasswordRetype)}
                                            edge="end"
                                        >
                                            {showPasswordRetype ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Box sx={{ pt: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                onClick={handleNewAccountRequest}
                            >
                                Đăng ký
                            </Button>
                        </Box>
                        <Typography align="center" sx={{ pt: 2 }}>
                            Bạn đã có tài khoản?{' '}
                            <NavLink to="/login" style={{ textDecoration: 'none' }}>
                                <Link color="primary">Đăng nhập</Link>
                            </NavLink>
                        </Typography>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}

export default Register