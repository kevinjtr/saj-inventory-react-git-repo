import React from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { connect } from 'redux-bundler-react';

const Login = ({ handleChange, doLogin, userIsLoggedIn, history }) => {

    const paperStyle = { padding: 20, height: '73vh', width: 300, margin: "0 auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }
    const initialValues = {
        username: '',
        password: '',
        remember: false
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().email('please enter valid email').required("Required"),
        password: Yup.string().required("Required")
    })
    // const onSubmit = async (values, props) => {
    //     //console.log(values)
    //     await doLogin()
    //     setTimeout(() => {
    //         //props.resetForm()
    //         if(userIsLoggedIn)
    //         history.push('/dashboard')
    //         props.setSubmitting(false)
    //     }, 1000)
    // }

    const onSubmit = (values, props) => {
        //console.log(values)
        doLogin().then(()=>{

            setTimeout(() => {
                //props.resetForm()
                if(userIsLoggedIn)
                    history.push('/dashboard')
    
                props.setSubmitting(false)
            }, 2000)
        }).error(()=>{
            props.setSubmitting(false)
        })
    }

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {(props) => (
                        <Form>
                            {/* <Field as={TextField} label='Username' name="username"
                                placeholder='Enter username' fullWidth required
                                helperText={<ErrorMessage name="username" />}
                            />
                            <Field as={TextField} label='Password' name="password"
                                placeholder='Enter password' type='password' fullWidth required
                                helperText={<ErrorMessage name="password" />} />
                            <Field as={FormControlLabel}
                                name='remember'
                                control={
                                    <Checkbox
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            /> */}
                            <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                                style={btnstyle} fullWidth>{props.isSubmitting ? "Loading" : "CAC Sign in"}</Button>

                        </Form>
                    )}
                </Formik>
                {/* <Typography >
                    <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account ?
                     <Link href="#" onClick={() => handleChange("event", 1)} >
                        Sign Up
                </Link>
                </Typography> */}
            </Paper>
        </Grid>
    )
}

 export default connect(
    'selectUserIsLoggedIn',
    'doLogin',
	Login);