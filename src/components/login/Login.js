import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate, Link} from 'react-router-dom';
import ActionButton from '../button/ActionButton';
import InputField from '../inputField/InputField';

function Login() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        login_id: true,
        password: true
    });

    const [loginValues, setLoginValues] = useState({
        login_id: '',
        password: ''
    });
    const [isValidCred, setIsValidCred] = useState(true);

    const { login_id, password } = errors;

    const changeHandler = e => {
        setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
    }

    const validateFields = (obj) => {
        Object.keys(obj).forEach((key) => {
            if (loginValues[key]) {
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
    }

    const userLogin = () => {
        fetch('https://lobster-app-ddwng.ondigitalocean.app/user/login', {
            method: 'POST',
            body: JSON.stringify(loginValues),
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
        localStorage.setItem("isLoggedIn", data.status);
        if (data.status === true) {
            setIsValidCred(true);
            localStorage.setItem("userData", JSON.stringify(data.message));
            navigate("/userDetails");
        } else {
            setIsValidCred(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let isEmpty = Object.values(loginValues).some((value) => value === "");
        if (isEmpty) {
            console.log("coming to if")
            validateFields(errors)
        } else {
            setErrors({
                login_id: true,
                password: true
            });
            userLogin();
            // navigate("/userDetails");
        }
    }

    const loginForm = (
        <>
            <div className='page-intro'>
                <h1>Login</h1>
                <p>Enter your account login details</p>
            </div>
            <div className='form-block login'>
                {!isValidCred ? <p className='red'>Invalid Login Credentials.</p> : null}
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <InputField type="email" id="email" name="login_id" isValid={login_id} onChangeEvent={changeHandler} placeholder="User name or Email" mbSize="4" />
                    <InputField type="password" id="password" name="password" isValid={password} onChangeEvent={changeHandler} placeholder="Password" mbSize="4" />
                    <ActionButton title="Sign in" type="submit" />
                    <p className='login_here'><Link to={'/register'}>Create new account</Link></p>
                </Form>
            </div>
        </>
    );

    return (
        <div className='login-form'>
            <div>
                {loginForm}
            </div>
        </div>
    );
}

export default Login;