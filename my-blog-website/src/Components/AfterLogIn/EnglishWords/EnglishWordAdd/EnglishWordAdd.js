import axios from 'axios';
import React, { Component } from 'react'
import { API } from '../../../../API/Api';
import FormPageButton from '../../FormPageCommon/FormPageButton';
import Navbar from '../../Navbar/Navbar';

class EnglishWordAdd extends Component {
    state = {
        "word": "",
        "exampleCentence": "",
        "optionA": "",
        "optionB": "",
        "optionC": "",
        "correctAnswer": "",
        "responseMessage": "",
        "responseMessageClass": ""
    }

    onChangeInput = e => {
        this.setState({
            [e.target.name]: e.target.value,
            responseMessage: ""
        });
    };

    onClickSave = async (e) => {
        e.preventDefault();
        const { word, exampleCentence, optionA, optionB, optionC, correctAnswer } = this.state;
        this.setState({
            responseMessage: "Lütfen bekleyiniz",
            responseMessageClass: "alert alert-warning"
        })
        await axios.post(API + "/english-test/add", {
            word,
            correctAnswer,
            exampleCentence,
            optionA,
            optionB,
            optionC
        })
            .then(response => {
                this.setState({
                    responseMessage: response.data.responseSuccessMessage,
                    responseMessageClass: "alert alert-success",
                    word:"",
                    correctAnswer:"",
                    exampleCentence:"",
                    optionA:"",
                    optionB:"",
                    optionC:""
                })
            })
            .catch((err) => {
                if (err.response) {
                    if (err.response.data.responseErrorMessage) {
                        this.setState({
                            responseMessage: err.response.data.responseErrorMessage,
                            responseMessageClass: "alert alert-danger"
                        })
                    }
                }
            });
    };

    render() {
        const { word, exampleCentence, optionA, optionB, optionC, correctAnswer, responseMessage, responseMessageClass } = this.state;
        return (
            <>
                <Navbar />
                <div className="formPage">

                    <form onSubmit={this.onClickSave}>
                        <div className="header-part">
                            <h1>YENİ KELİME VE SORU EKLE</h1>
                        </div>
                        <p>
                            <br />
                            Aşağıda size ait bilgiler bulunmaktadır. Lütfen * ile belirtilmiş bilgileri eksiksiz bir şekilde doldurunuz ve "SORU EKLE" butonuna basınız.
                            Teşekkürler!</p>
                        <hr />

                        <fieldset>
                            <legend >YENİ KELİME VE SORU EKLE</legend>

                            {
                                responseMessage ? <div className={responseMessageClass + " p-2"} role="alert">
                                    {responseMessage}
                                </div> : null
                            }

                            <div className="item">
                                <label htmlFor="word">Kelime</label>
                                <input id="word" type="text" name="word" value={word}
                                    onChange={this.onChangeInput} required />
                            </div>

                            <div className="item">
                                <label htmlFor="optionA">Seçenekler <span>*</span></label>
                                <div className="name-item">
                                    <input id="optionA" type="text" name="optionA" placeholder="A şıkkı" value={optionA}
                                        onChange={this.onChangeInput} required />
                                    <input id="optionB" type="text" name="optionB" placeholder="B şıkkı" value={optionB}
                                        onChange={this.onChangeInput} required />
                                    <input className='mt-2' id="optionC" type="text" name="optionC" placeholder="C şıkkı" value={optionC}
                                        onChange={this.onChangeInput} required />
                                </div>
                            </div>

                            <div className="item">
                                <label htmlFor="correctAnswer">Doğru Cevap</label>
                                <input id="correctAnswer" type="text" name="correctAnswer" value={correctAnswer} placeholder="Doğru Cevap"
                                    onChange={this.onChangeInput} required />
                            </div>

                            <div className="item">
                                <label htmlFor="exampleCentence">Örnek Cümle</label>
                                <input id="exampleCentence" type="text" name="exampleCentence" value={exampleCentence} placeholder="Örnek Cümle"
                                    onChange={this.onChangeInput} required />
                            </div>

                        </fieldset>
                        <FormPageButton buttonName="SORU EKLE" />
                    </form>
                </div>

            </>
        )
    }
}
export default EnglishWordAdd;