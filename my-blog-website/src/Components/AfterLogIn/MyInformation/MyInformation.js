import React, { Component } from 'react'
import FormPageButton from '../FormPageCommon/FormPageButton';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { API } from '../../../API/Api';

class MyInformation extends Component {

  state = {
    "userName": "",
    "name": "",
    "surname": "",
    "email": "",
    "responseMessage": "",
    "responseMessageClass": "",
    "userId": "",
  }

  componentDidMount = async () => {
    await axios.get(API + "/authentication/loggedIn")
      .then(async (response) => {
        await axios.get(API + `/user/detail/${response.data.user.id}`)
          .then(responseUser => this.setState({
            name: responseUser.data.name,
            surname: responseUser.data.surname,
            userName: responseUser.data.userName,
            email: responseUser.data.email,
            userId: response.data.user.id
          }))
      })
  }

  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
      responseMessage: ""
    });
  };

  onClickUpdate = async (e) => {
    e.preventDefault();
    const { name, surname, email, userId } = this.state;

    await axios.put(API + `/user/update/${userId}`, {
      name,
      surname,
      email,
    }).then((res) => {
      this.setState({
        responseMessage: res.data.responseSuccessMessage,
        responseMessageClass: "alert alert-success"
      });
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
      })
  };

  render() {
    const { name, surname, email, userName, responseMessage, responseMessageClass } = this.state;
    return (
      <>
        <Navbar />
        <div className="formPage">

          <form onSubmit={this.onClickUpdate}>
            <div className="header-part">
              <h1>Kişisel Bilgilerim</h1>
            </div>
            <p>
              <br />
              Aşağıda size ait bilgiler bulunmaktadır. Lütfen değişiklik yapmak isterseniz, * ile belirtilmiş bilgileri eksiksiz bir şekilde doldurunuz ve "Bilgilerimi Güncelle" butonuna basınız.
              Teşekkürler!</p>
            <hr />

            <fieldset>
              <legend >Kişisel Bilgilerim</legend>

              {
                responseMessage ? <div className={responseMessageClass + " p-2 mt-2"} role="alert">
                  {responseMessage}
                </div> : null
              }

              <div className="item">
                <label htmlFor="name">Adınız ve Soyadınız <span>*</span></label>
                <div className="name-item">
                  <input id="name" type="text" name="name" placeholder="Adınız" value={name}
                    onChange={this.onChangeInput} required />
                  <input id="name" type="text" name="surname" placeholder="Soyadınız" value={surname}
                    onChange={this.onChangeInput} required />
                </div>
              </div>

              <div className="item">
                <label htmlFor="userName">Kullanıcı Adınız</label>
                <input id="userName" type="text" name="userName" value={userName}
                  disabled required />
              </div>

              <div className="item">
                <label htmlFor="eMail">Email</label>
                <input id="eMail" type="text" name="eMail" value={email}
                  onChange={this.onChangeInput} required />
              </div>

            </fieldset>
            <FormPageButton buttonName="BİLGİLERİMİ GÜNCELLE" />
          </form>
        </div>
      </>
    )
  }
}
export default MyInformation;