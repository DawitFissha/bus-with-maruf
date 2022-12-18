import React,{useState,useRef,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable,{ MTableAction} from "material-table";
import {tableIcons} from '../Table/Tableicon'
import {useGetAllAgentsQuery,useUpdateAgentMutation} from '../../store/bus_api';
import {toEthiopianDateString} from 'gc-to-ethiopian-calendar'
import { useSelector } from 'react-redux';
export default function CashAgentTransaction() {
  const {data,isSuccess}=useGetAllAgentsQuery()
  const [updateAgent]=useUpdateAgentMutation()
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
        { title: 'Tin No', field: 'tin'},
        { title: 'Location', field: 'location'},
        { title: 'Max User', field: 'maxUser'},
        { title: 'isActive', field: 'isActive',lookup: { true: 'Active', false: 'Not Active'}},
        { title: 'Created At', field: 'createdAt',type:'date',
        render:rowData=>toEthiopianDateString(rowData?.updatedAt)},
       ]:[
        {title: "id", field: "_id", hidden: true},
        { title: 'Agent Name', field: 'agentName'},
        { title: 'Phone Number', field: 'phoneNumber'},
        { title: 'Tin No', field: 'tin'},
        { title: 'Location', field: 'location'},
        { title: 'Max User', field: 'maxUser'},
        { title: 'isActive', field: 'isActive',lookup: { true: 'Active', false: 'Not Active'}},
        { title: 'Created At', field: 'createdAt',type:'date'},
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
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            updateAgent({id:oldData._id,...newData})
            setTimeout(()=>{resolve()},600)
          }),
      }}
    />
  </Card.Body>
        </Card>
        </Col>
         </Row>
  
        </React.Fragment>
  )
}





