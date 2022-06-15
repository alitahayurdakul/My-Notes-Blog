import axios from 'axios';
import React, { Component } from 'react'
import { API } from '../../../API/Api';
import Navbar from '../Navbar/Navbar';
import OtherNotesLink from '../OtherNotesLink/OtherNotesLink';
import { createRandomNumber } from './createRandomNumber';

class EnglishTest extends Component {

    state = {
        "question": "",
        "questions": [],
        "message": "",
        "messageClass": "",
        "answer": "",
        "length": "",
        "status": false
    }

    componentDidMount = async () => {
        await axios.get(API + "/english-test/list")
            .then(response => {
                this.setState({
                    question: response.data[createRandomNumber(response.data.length)],
                    questions: response.data
                })
            })
            .catch(error => { })
    };

    onClickRadio = (e) => {
        this.setState({
            answer: e.target.value,
            message:""
        })
    }

    onClickAnswer = (correctAnswer) => {

        if (correctAnswer === this.state.answer) {
            this.setState({
                message: "Tebrikler!!!",
                messageClass: " alert-success",
                status:true
            })
        }

        else {
            this.setState({
                message: "Yanlış!!!",
                messageClass: " alert-danger"
            })
        }

    }

    onClickNext = () => {
        this.setState({
            message: "",
            status:false,
            question:this.state.questions[createRandomNumber(this.state.questions.length)]
        })
    }



    render() {

        const { onClickNext, onClickRadio, onClickAnswer } = this;
        const { question, message, messageClass, status } = this.state;

        return (
            <>
                <Navbar />
                <div className='notes-part'>

                    <div className='notes-part-body'>
                        <div className='english-tests-part-left'>
                            {
                                message ?
                                    <div className={`alert ${messageClass}`} role="alert" data-testid="message">
                                        {message}
                                    </div>
                                    :
                                    null
                            }
                            {
                                question ? <>
                                    <p>{`What is the turkish meaning of "${question.word}"?`}</p>
                                    <p>{question.exampleCentence}</p>
                                    <div className='english-test-body'>

                                        <input type="radio" id="A" name="option" value="A" onClick={onClickRadio} />
                                        <label htmlFor="A">
                                            A-) {question.optionA}
                                        </label>
                                        <br />

                                        <input type="radio" id="B" name="option" value="B" onClick={onClickRadio} data-testid="false-answer" />
                                        <label htmlFor="B">
                                            B-) {question.optionB}
                                        </label>
                                        <br />

                                        <input type="radio" id="C" name="option" value="C" onClick={onClickRadio} data-testid="true-answer" />
                                        <label htmlFor="C">
                                            C-) {question.optionC}
                                        </label>
                                        <br />

                                        {
                                            status ? <button className='btn btn-primary' onClick={onClickNext}>İleri</button> :
                                                <button className='btn btn-primary' onClick={onClickAnswer.bind(this, question.correctAnswer)}>Cevapla</button>
                                        }

                                    </div>
                                </> : null
                            }

                        </div>
                        <OtherNotesLink />
                    </div>
                </div>
            </>
        )
    }
}
export default EnglishTest;