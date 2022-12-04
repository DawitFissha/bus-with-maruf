import React,{useState,useRef,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable,{ MTableAction} from "material-table";
import {tableIcons} from '../Table/Tableicon'
import {useGetAgentCashTransactionQuery} from '../../store/bus_api';
import {toEthiopianDateString} from 'gc-to-ethiopian-calendar'
import { useSelector } from 'react-redux';
export default function CashAgentTransaction() {
  const {data,isSuccess}=useGetAgentCashTransactionQuery()
  const userinfo=useSelector(state=>state.userinfo)

  return (
    <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Manage Cash</Card.Title>
                            <Row style={{float:'right'}}>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                        <MaterialTable
                        style={{zIndex:0,fontSize:'14px'}}
                         components={{
                          Container: props => <div {...props} elevation={0}/>,
                     }}
                         responsive
      title="Cash Transaction"
      columns={userinfo.calender=="ec"?[
        {title: "id", field: "_id", hidden: true},
        { title: 'Agent Name', field: 'agentName'},
        { title: 'Phone Number', field: 'phoneNumber'},
        { title: 'Amount', field: 'amount'},
        { title: 'Collected By', field: 'collectedBy'},
        { title: 'Collecter Phone', field: 'collectorPhone'},
        { title: 'Collected At', field: 'updatedAt',type:'date',
        render:rowData=>toEthiopianDateString(rowData?.updatedAt)},
       ]:[
        {title: "id", field: "_id", hidden: true},
        { title: 'Agent Name', field: 'agentName'},
        { title: 'Phone Number', field: 'phoneNumber'},
        { title: 'Amount', field: 'amount'},
        { title: 'Collected By', field: 'collectedBy'},
        { title: 'Collecter Phone', field: 'collectorPhone'},
        { title: 'Collected At', field: 'updatedAt',type:'date'},
      ]}
      data={data?.map(e=>({...e}))}
      icons={tableIcons}
      options={{
        search:false,
        exportAllData:true,
        grouping:true,
        maxBodyHeight: '550px',
        rowStyle:  (rowData, i) => {
          if (i % 2) {
              return {backgroundColor: "#f2f2f2"}
          }
      },
      headerStyle: {
        zIndex: "1",backgroundColor:"#6B7AE0",color:"white",
        fontSize:"16px",margin:'0px',padding:'10px 2px'
      },
        actionsColumnIndex: -1,
        exportButton:true,
        exportDelimiter:true,
        pageSize:10,
        columnsButton:true,
        filtering:true,
      }}

    />
  </Card.Body>
        </Card>
        </Col>
         </Row>
  
        </React.Fragment>
  )
}





