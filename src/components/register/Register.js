import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import InputField from '../inputField/InputField';
import ActionButton from '../button/ActionButton';

function Register() {

    const [errors, setErrors] = useState({
        full_name: true,
        username: true,
        mobile_number: true,
        email_id: true,
        password: true,
        country_row_id: true
    });

    const [apiErrors, setApiErrors] = useState({});
    const [isRegistered, setIsRegistered] = useState(false);
    const [isValidNum, setIsValidNum] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);

    const [userDetails, setUserDetails] = useState({
        full_name: '',
        username: '',
        country_row_id: '',
        mobile_number: '',
        email_id: '',
        password: '',
        referral_id: ''
    });

    const { full_name, username, mobile_number, email_id, password, country_row_id } = errors;

    const changeHandler = e => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    }

    const validateFields = (obj) => {
        let updatedUserDatetails = { ...userDetails };
        delete updatedUserDatetails["referral_id"]
        let isEmpty = Object.values(updatedUserDatetails).some((value) => value === "");
        // let isValidData = false;
        // if(isEmpty){
            
        // }
        Object.keys(obj).forEach((key) => {
            if (userDetails[key]) {
                setErrors((prevState) => ({
                    ...prevState,
                    [key]: true,
                }));
            } else {
                setErrors((prevState) => ({
                    ...prevState,
                    [key]: false,
                }));
            }
        });
        
        if(userDetails?.mobile_number && !isNaN(userDetails?.mobile_number) && userDetails?.mobile_number.length <= 10){
            // isValidData = true;
            setIsValidNum(true);
        } else{
            setIsValidNum(false);
            // isValidData = false;
        }
        const emailReg = /\S+@\S+\.\S+/;
        if (userDetails?.email_id && emailReg.test(userDetails?.email_id)) {
            setIsValidEmail(true);
        } else{
            setIsValidEmail(false);
        }
        console.log({isValidNum, isValidEmail});

    }
    const userRegister = () => {
        fetch('https://lobster-app-ddwng.ondigitalocean.app/user/register', {
            method: 'POST',
            body: JSON.stringify(userDetails),
            headers: {
                'api_key': 'Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => validateResponse(data))
            .catch(err => console.error(err));
    };

    const validateResponse = (data) => {
        if (data.status === false) {
            setApiErrors(data.message);
            setIsRegistered(false);
        } else {
            setIsRegistered(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // let updatedUserDatetails = { ...userDetails };
        // delete updatedUserDatetails["referral_id"]
        // let isEmpty = Object.values(updatedUserDatetails).some((value) => value === "");
        if (!isValidNum && !isValidEmail) {
            console.log("coming to if")
            validateFields(errors)
        } else {
            console.log("coming to else")
            // userRegister();
        }
    }

    const registerForm = (
        <>
            <div className='page-intro'>
                <h1>Register</h1>
                <p>Create your company accounts</p>
            </div>
            <div className='form-block register'>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <InputField type="text" id="fullName" name="full_name" isValid={full_name} onChangeEvent={changeHandler} apiError={apiErrors.full_name} placeholder="Full Name *" mbSize="3" />
                    <InputField type="text" id="userName" name="username" isValid={username} onChangeEvent={changeHandler} apiError={apiErrors.username} placeholder="User Name *" mbSize="3" />
                    <InputField type="text" id="selectCountry" name="country_row_id" isValid={country_row_id} onChangeEvent={changeHandler} apiError={apiErrors.country_row_id} placeholder="Select Country *" mbSize="3" />
                    <InputField type="text" id="mobileNumber" name="mobile_number" value={userDetails?.mobile_number} isValidData={isValidNum} isValid={mobile_number} onChangeEvent={changeHandler} apiError={apiErrors.mobile_number} placeholder="Mobile Number *" mbSize="3" />
                    <InputField type="email" id="emailId" name="email_id" value={userDetails?.email_id} isValidData={isValidEmail} isValid={email_id} onChangeEvent={changeHandler} apiError={apiErrors.email_id} placeholder="Email ID *" mbSize="3" />
                    <InputField type="password" id="password" name="password" isValid={password} onChangeEvent={changeHandler} apiError={apiErrors.password} placeholder="Password *" mbSize="3" />
                    <InputField type="text" id="referralId" name="referral_id" onChangeEvent={changeHandler} apiError={apiErrors.referral_id} placeholder="Referral ID" mbSize="3" />
                    <ActionButton title="Register" type="submit" />
                    <p className='login_here'>Have already an account ? <Link to={'/login'}>Login here</Link></p>
                </Form>
            </div>
        </>
    )
const loginModel = (
    <>
        <div className='login-modal'>
            <h1>You have registered successfully!!!</h1>
            <Link to={'/login'}>Go to Login page.</Link>
        </div>
    </>
);
    return (
        <div className='register-form'>
            <div>
                {!isRegistered ? registerForm :  loginModel}
            </div>
        </div>
    );
}

export default Register;