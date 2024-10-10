import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaLock, FaEnvelope, FaPhone } from 'react-icons/fa';
import './Register.css';  

const Login = () => {
    const [action, setAction] = useState('login');
    const navigate = useNavigate();

    const handleLinkClick = (action) => {
        setAction(action);
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState(""); 
    const [mobileNumber, setMobileNumber] = useState("");

    async function handleLogin(event) {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/login',  {
                email: email,
                password: password,
            });

            if (res.data === "Email not exists") {
                alert("Email does not exist");
            } else if (res.data === "Login Success") {
                navigate('/home');
                
            } else {
                alert("Incorrect Password");
            }
        } catch (err) {
            alert(err);
        }
    }

    async function handleRegister(event) {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/register', {
                name: userName, 
                email: email,
                password: password,
                mobileNumber: mobileNumber,
            });
            alert ("Registration success");
                setAction('login'); 
             
        } catch (err) {
            alert("Error: " + err.message);
        }
    }

    return (
        <div className={`Wrapper ${action === 'register' ? 'active' : ''}`}>
            <div className={`form-box ${action === 'login' ? 'login' : 'register'}`}>
                {action === 'login' ? (
                    <form onSubmit={handleLogin}>
                        <h1>Login</h1>
                        <div className="input-box">
                            <input
                                type="text"
                                placeholder='  eg:example@gmail.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <FaUser className='icon' />
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                placeholder='   password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <FaLock className='icon' />
                        </div>
                        <div className='forgot'>
                            <a href="#">Forgot password</a>
                        </div>
                        <button type='submit'>Login</button>
                        <div className="register-link">
                            <p>Don't have an account?
                                <a href="#" onClick={() => handleLinkClick('register')}>Register</a>
                            </p>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleRegister}>
                        <h1>Registration</h1>
                        <div className="input-box">
                            <input
                                type="text"
                                placeholder='  Enter Name'
                                value={userName} // Using userName
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                            <FaUser className='icon' />
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                placeholder='  Enter your email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <FaEnvelope className='icon' />
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                placeholder='  password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <FaLock className='icon' />
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                placeholder='  Mobile number'
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                required
                            />
                            <FaPhone className='icon' />
                        </div>
                        <div className='forgot'>
                            <label><input type="checkbox" /> I agree to the terms & conditions </label>
                        </div>
                        <button type='submit'>Register</button>
                        <div className="register-link">
                            <p>Already have an account?
                                <a href="#" onClick={() => handleLinkClick('login')}>Login</a>
                            </p>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;
