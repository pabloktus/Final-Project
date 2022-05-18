import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Link } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import {useFormik} from 'formik'
import * as yup from 'yup';
import {postRegisterUser} from '../../redux/actions'
import { useDispatch } from 'react-redux';
const validationSchema = yup.object({
  userName: yup.string() 
  .min(2, "Too Short!")
  .max(50, "Too Long!")
  .required("Firstname is required"),

  firstName: yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Firstname is required"),

  lastName: yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Lastname is required"),

  phone: yup.string()
    .required("Phone number is required")
  .matches(
/^([0]{1}|\+?[234]{3})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g,
      "Invalid phone number"
    ) ,

  email: yup.string().email().required("Email is required"),

  password: yup.string()
    .required("Password is required")
    .min(6, "Password is too short - should be 6 chars minimum"),
});


export const CreateAccount = () => {
  const dispatch  = useDispatch();
  const [errorValidate, setErrorValidate]  = useState (null)
  const formik = useFormik({
    initialValues: {
      userName: '',
      firstName: '', 
      lastName: '',
      phone: '',
      email: '',
      password: '',

    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const result =  await dispatch(postRegisterUser(values))
      console.log("COMO LO TRAIGO",result)
      if (result?.data?.error ){
        setErrorValidate(true)
        console.log("entre al validate error")
      }
      else {
        setErrorValidate(null)
        console.log("entreeee nulll")
      }
    },
  });


  return (
   /*  <Container
      component="main"
      maxWidth="xs"
      sx={{ textAlign: "center", mb: "6.5%" }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: 'center',
        }}
      > */
      <>
        <Avatar sx={{  m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
        <form onSubmit={formik.handleSubmit} >
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="userName"
            label="Username"
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />

          <TextField
            margin="normal"
            type="number"
            required
            fullWidth
            id="phone"
            label="Phone Number"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />


          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {errorValidate && <p> {"ERROR"}</p>}
          </form>
     
    </>
  );
};
