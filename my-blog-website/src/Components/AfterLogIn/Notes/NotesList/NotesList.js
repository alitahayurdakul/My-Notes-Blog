import React, { Component } from 'react';
import Navbar from '../../Navbar/Navbar';
import DatatableListBody from '../../Datatable/DatatableListBody';
import { Link } from 'react-router-dom';
import DatatableListHeader from '../../Datatable/DatatableListHeader';
import axios from 'axios';
import { API } from '../../../../API/Api';

class NotesList extends Component {
    state = {
        "notesList": [],
        "responseMessage": "",
        "responseMessageClass": ""
    }
    componentDidMount = async () => {
        await axios.get(API + "/notes/list")
            .then(response => this.setState({
                notesList: response.data
            }))
            .catch(error => console.log(error))
    }

    onClickDelete = async (noteId) => {
        await axios.delete(API + `/notes/delete/${noteId}`)
            .then(response => this.setState({
                responseMessage: response.data.responseSuccessMessage,
                responseMessageClass: "alert alert-success",
                notesList: this.state.notesList.filter(note => note._id !== noteId)
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
    }

    render() {
        const { responseMessage, responseMessageClass } = this.state;
        const data = {
            columns: [
                {
                    label: 'Notun Adı',
                    field: 'headerName',
                    sort: 'asc',
                },
                {
                    label: 'Notun Tarihi',
                    field: 'noteDate',
                    sort: 'asc',
                },
                {
                    label: 'Üst Başlık',
                    field: 'noteParent',
                    sort: 'asc',
                },
                {
                    label: 'Kısa Özet',
                    field: 'noteShortExplaining',
                    sort: 'asc',
                },
                {
                    label: 'İşlemler',
                    field: 'operation',
                    sort: 'asc',
                }
            ],
            rows: this.state.notesList.map(note => {
                return {
                    headerName: note.headerName,
                    noteDate: note.date.split("-").reverse().join("-"),
                    noteParent: note.parentHeader,
                    noteShortExplaining: note.shortExplaining,
                    operation: <>

                        <button className='btn delete-button me-2' onClick={this.onClickDelete.bind(this, note._id)}>
                            Notu Sil
                        </button>

                        <Link to={"/notes/update/" + note._id} className='btn update-button'>
                            Notu Güncelle
                        </Link>

                    </>
                }
            })
        }
        return (
            <>
                <Navbar />
                <div className='datatable-page'>
                    <Link to="/notes/add" className='btn add-button'>
                        Yeni Not Ekle
                    </Link>
                    <div className='notes-list'>
                        <DatatableListHeader header="Not Listesi" />
                        {
                            responseMessage ? <div className={responseMessageClass + " p-2 mt-2"} role="alert">
                                {responseMessage}
                            </div> : null
                        } <DatatableListBody data={data} />
                    </div>
                </div>
            </>
        )
    }

}
export default NotesList