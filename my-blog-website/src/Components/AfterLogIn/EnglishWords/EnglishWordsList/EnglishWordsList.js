import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { API } from '../../../../API/Api';
import DatatableListBody from '../../Datatable/DatatableListBody';
import DatatableListHeader from '../../Datatable/DatatableListHeader';
import Navbar from '../../Navbar/Navbar';

class EnglishWordsList extends Component {
  state = {
    "wordList": [],
    "responseMessage": "",
    "responseMessageClass": ""
  };

  componentDidMount = async () => {
    await axios.get(API + "/english-test/list")
      .then(response => this.setState({
        wordList: response.data
      }))
      .catch(error => console.log(error))
  };

  onClickDelete = async (wordId) => {
    await axios.delete(API + `/english-test/delete/${wordId}`)
      .then(response => this.setState({
        responseMessage: response.data.responseSuccessMessage,
        responseMessageClass: "alert alert-success",
        wordList: this.state.wordList.filter(word => word._id !== wordId)
      }))
      .catch((error) => {
        if (error.response) {
          if (error.response.data.responseErrorMessage)
            this.setState({
              responseMessage: error.response.data.responseErrorMessage,
              responseMessageClass: "alert alert-danger"
            })
        }
      })
  };

  render() {
    const {responseMessage, responseMessageClass} = this.state;
    const data = {
      columns: [
        {
          label: 'Adı',
          field: 'word',
          sort: 'asc',
        },
        {
          label: 'Örnek Cümle',
          field: 'exampleCentence',
          sort: 'asc',
        },
        {
          label: 'A şıkkı',
          field: 'optionA',
          sort: 'asc',
        },
        {
          label: 'B şıkkı',
          field: 'optionB',
          sort: 'asc',
        },
        {
          label: 'C şıkkı',
          field: 'optionC',
          sort: 'asc',
        },
        {
          label: 'Doğru Cevap',
          field: 'correctAnswer',
          sort: 'asc',
        },
        {
          label: 'İşlemler',
          field: 'operation',
          sort: 'asc',
        }
      ],
      rows: this.state.wordList.map(word => {
        return {
          word: word.word,
          exampleCentence: word.exampleCentence,
          optionA: word.optionA,
          optionB: word.optionB,
          optionC: word.optionC,
          correctAnswer: word.correctAnswer,
          operation: <>

            <button className='btn delete-button me-2' onClick={this.onClickDelete.bind(this, word._id)}>
              Soru Sil
            </button>

            <Link to={"/english-test/word/update/" + word._id} className='btn update-button'>
              Soruyu Güncelle
            </Link>

          </>
        }
      })
    }
    return (
      <>
        <Navbar />
        <div className='datatable-page'>
          <Link to="/english-test/add" className='btn add-button'>
            Yeni İngilizce Kelime Ekle
          </Link>
          <div className='english-test-list'>
            <DatatableListHeader header="İngilizce Kelime Listesi" />
            {
                responseMessage ? <div className={responseMessageClass + " p-2 mt-2"} role="alert">
                  {responseMessage}
                </div> : null
              }
           <DatatableListBody data={data} />
          </div>
        </div>
      </>
    )
  }
}
export default EnglishWordsList;