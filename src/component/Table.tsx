import React from 'react';
import { IData } from '../data'
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from "react-bootstrap-table2-paginator";


const Table: React.FC<{ tableData: IData[] }> = ({ tableData })  => {
    const columns = [
        { dataField: 'Date', text: 'Date', sort: true },
        { dataField: 'Amount', text: 'Amount', sort : true},
        {dataField: 'Entity', text: 'Entity', sort: true},
        { dataField: 'Supplier', text: 'Supplier', sort: true },
        {dataField: 'Department Family', text: 'Department Family'},
        {dataField: 'Expense Area', text: 'Expense Area'},
        {dataField: 'Expense Type', text: 'Expense Type'},
        {dataField: 'Invoice Currency Unit', text: 'Invoice Currency Unit'},
        {dataField: 'Transaction Number', text: 'Transaction Number'}
    ]

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 10,
        lastPageText: ">>",
        firstPageText: "<<",
        nextPageText: ">",
        prePageText: "<",
        showTotal: true,
        alwaysShowAllBtns: true
        
    })
    return (
        <div className='bootstrap'>
            <BootstrapTable
            bootstrap4
            keyField='date'
            columns={columns}
            data={tableData}
            pagination={pagination}
        />
        </div>
        
    )
        
}

export default Table