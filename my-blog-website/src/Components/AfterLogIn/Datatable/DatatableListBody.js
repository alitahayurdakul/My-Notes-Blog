import React, { Component } from 'react'
import { MDBDataTable } from 'mdbreact';
import 'bootstrap-css-only/css/bootstrap.min.css';

class DatatableListBody extends Component {

  render() {
    return (
      <div className='part-body'>
        <MDBDataTable
          entriesOptions={[5, 10, 25]}
          hover
          striped
          bordered
          data={this.props.data}
          searchLabel='Filtrele'
          entrieslabel=' '
          infoLabel={["", "-", "sonuç", ""]}
          paginationLabel={["Geri", "İleri"]}
          noRecordsFoundLabel='Sonuç bulunamadı'
          noBottomColumns={true}
        />
      </div>
    )
  }
}

export default DatatableListBody;