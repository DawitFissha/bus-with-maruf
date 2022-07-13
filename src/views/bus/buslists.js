import React,{useState,useRef,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable,{ MTableAction} from "material-table";
import {tableIcons} from '../Table/Tableicon'
import { getBus,updateBus,deleteBus} from '../../store/busHttp';
import { useSelector,useDispatch } from 'react-redux';
import { getActiveBus } from '../../store/routeHttp';
export default function BusList() {
  const tabledata=useSelector(state=>state.bus.tableData)
  console.log(tabledata)
  const data=tabledata.map(o => ({ ...o }));
  const fetched=useSelector(state=>state.bus.updated)
  const dispatch=useDispatch()
  const addActionRef = React.useRef();

useEffect(()=>{
dispatch(getBus())
  },[fetched])
  const [columns, setColumns] = useState([
    {title: "id", field: "_id",hidden:true},
    { title: 'Plate No', field: 'busPlateNo',editable:'never'},
    { title: 'Driver Name', field: 'driverName',editable:'never'},
    { title: 'Driver Phone', field: 'drverPhone',editable:'never'},
    { title: 'Redat Phone', field: 'redatPhone',editable:'never'},
    { title: 'On Duty', field: 'onDuty',lookup: { true: 'Yes', false: 'No'},editable:'never'},
    { title: 'Total Sit', field: 'totalNoOfSit'},
    { title: 'Bus State', field: 'busState',lookup:{"Active":"Active","Inactive":"Inactive","On-Repair":"On-Repair","Damaged":"Damaged"}},
    { title: 'Service Year', field: 'serviceYear'},

  ]);
  
  return (
    <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Manage Buses</Card.Title>
                        </Card.Header>
                        <Card.Body>
                        <MaterialTable
                         components={{
                          Container: props => <div {...props} elevation={0}/>,
                          
                     }}
                         responsive
      title="Buses List"
      columns={columns}
      data={data}
      icons={tableIcons}
      options={{
        actionsColumnIndex: -1,
        exportButton:true,
        filtering:true,
        columnsButton:true,
        headerStyle: {
          zIndex: 0
        }
      }}
      localization={{
        body: {
          editTooltip: 'Edit Bus Info',
          deleteTooltip: 'Delete Bus',
       }
}}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
              dispatch(updateBus(oldData._id,newData,resolve))
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
              dispatch(deleteBus(oldData._id,resolve))
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

