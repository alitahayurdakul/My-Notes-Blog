import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { API } from '../../../../API/Api';

function ForgetPassword() {
    let userName = useRef();
    const [responseMessage, setResponseMessage] = useState("");
    const [responseMessageClass, setResponseMessageClass] = useState("");



    const onSendNewPassword = async (e) => {
        e.preventDefault();

        let userData = {
            userName: userName.current.value
        }

        setResponseMessage("Lütfen Bekleyiniz")
        setResponseMessageClass("alert-warning")

        await axios.put(API + "/user/password-remember", userData)
            .then(response => {
                setResponseMessage(response.data.responseSuccessMessage)
                setResponseMessageClass("alert-success")
            })
            .catch(error => {
                if (error.response.data.responseErrorMessage) {
                    setResponseMessage(error.response.data.responseErrorMessage)
                    setResponseMessageClass("alert-danger")
                }
            })
    };

    return (
        <div className='login'>
            <form onSubmit={onSendNewPassword}>
                <h3 className='text-center'>
                    Şifremi Unuttum
                </h3>
                <input type="text" ref={userName} placeholder='Lütfen Kullanıcı Adınızı Giriniz.' required />
                <button type='submit' className='btn btn-danger'>
                    Yeni Şifremi Gönder
                </button>
                {
                    responseMessage ?
                        <div className={'alert ' + responseMessageClass} >
                            {responseMessage}
                        </div>
                        :
                        null
                }
                <br />
                <Link to="/sign-in" className='text-white mt-1'>Giriş Yap</Link>
            </form>
        </div>
    )
}
export default ForgetPassword;