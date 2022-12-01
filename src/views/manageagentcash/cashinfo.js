import React,{useState,useRef,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable,{ MTableAction} from "material-table";
import {tableIcons} from '../Table/Tableicon'
import { useSelector,useDispatch } from 'react-redux';
import {modalActions} from '../../store/modal-slice'
import {FcCollect} from "react-icons/fc"
import CashAgentForms from './cashForm';
import { useGetAgentCashInfoQuery} from '../../store/bus_api';

export default function CashAgentInfo() {
  const [id,setId]=useState(false)
  const {data,isError}=useGetAgentCashInfoQuery()
  const dispatch=useDispatch()

  const actions= [
    (rowData)=>({
      icon:() =><FcCollect style={{color:"blue"}} size={25}/>,
      tooltip:"collect cash",
      onClick: (evt, Data) => {
        setId(rowData._id)
        dispatch(modalActions.setCashModal(true))
      }
    })
  ]
  return (
    <React.Fragment>
      <CashAgentForms data={{id:id}}/>
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
                        style={{zIndex:0,fontSize:'15px'}}
                         components={{
                          Container: props => <div {...props} elevation={0}/>,
                     }}
                         responsive
      title="Manage Cash"
      columns={[
        {title: "id", field: "_id", hidden: true},
        { title: 'Agent Name', field: 'agentName'},
        { title: 'Phone Number', field: 'phoneNumber'},
        { title: 'Cash In Hand Br', field: 'cashInHand'},
        { title: 'Last Updated.By', field: 'lastUpdatedBy'},
        { title: 'Last Updated At', field: 'updatedAt',type:'date'},
        { title: 'Total Ticket Refunded', field: 'totalRefundedTicket'},
        { title: 'Total Refund Br', field: 'totalRefundedAmount'},
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
        zIndex: "1",backgroundColor:"#FE7C7C",color:"white",fontSize:"16px",margin:'0px',padding:'10px 2px'
      },
        actionsColumnIndex: -1,
        exportButton:true,
        exportDelimiter:true,
        pageSize:10,
        columnsButton:true,
        filtering:true,
      }}
      actions={actions}

    />
  </Card.Body>
        </Card>
        </Col>
         </Row>
  
        </React.Fragment>
  )
}





