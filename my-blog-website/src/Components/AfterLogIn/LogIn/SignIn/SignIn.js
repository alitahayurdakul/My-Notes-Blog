import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.scss';
import { API } from '../../../../API/Api';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setIsLogin } from '../../../../Store/actions';

function SignIn(props) {
    let navigate = useNavigate();
    let userName = useRef();
    let password = useRef();
    const [responseMessage, setResponseMessage] = useState("");

    const onSignIn = async (e) => {
        e.preventDefault();

        const signInData = {
            userName: userName.current.value,
            password: password.current.value
        }

        await axios.post(API + "/authentication/sign-in", signInData)

            .then(async () => {
                await props.setIsLogin(true);
                navigate("/")

            })
            .catch(error => {
                if (error.response) {
                    if (error.response.data.responseErrorMessage) {
                        setResponseMessage(error.response.data.responseErrorMessage)
                    }
                }
            });
    }

    return (
        <div className='login'>
            <form onSubmit={onSignIn} >
                <h3 className='text-center'>
                    Giriş
                </h3>
                <input type="text" ref={userName} placeholder='Kullanıcı adı giriniz' required />
                <input type="password" ref={password} placeholder='Şifre giriniz' required />
                {
                    responseMessage ?
                        <div className='alert alert-danger'>{responseMessage}</div>
                        :
                        null
                }
                <button className='btn btn-danger'>
                    Giriş Yap
                </button>
                <br />
                <Link to="/forget-password" className='text-white mt-1'>Şifremi Unuttum</Link>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => (
    (
        bindActionCreators({
            setIsLogin
        }, dispatch)
    )
)

export default connect(null, mapDispatchToProps)(SignIn);