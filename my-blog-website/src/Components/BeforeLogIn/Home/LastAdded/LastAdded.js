import axios from 'axios'
import React, { Component } from 'react'
import { API } from '../../../../API/Api'
import LastAddedPart from './LastAddedPart'

class LastAdded extends Component {

    state = {
        "notes": []
    }

    componentDidMount = async () => {
        await axios.get(API + "/notes/list")
            .then(response => {
                let lastAddedNotes = [];

                // for (let i = 0; i <= 1; i++) {//9 olacak
                //     lastAddedNotes.push(response.data[i])
                // };

                // this.setState({
                //     notes: lastAddedNotes
                // });

                this.setState({
                    notes: response.data
                });
            })
    }

    render() {
        return (
            <div className='last-added'>

                <h2>En Son Eklenenler</h2>

                <ul>
                    {
                        this.state.notes.map(note => (
                            <LastAddedPart to={"/" + note.parentHeader + "/" + note.url} header={note.headerName} body={note.shortExplaining} id={note._id} />
                        ))
                    }

                </ul>
            </div>
        )
    }
}
export default LastAdded;