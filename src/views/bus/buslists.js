import React,{useState,useRef,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable,{ MTableAction} from "material-table";
import {tableIcons} from '../Table/Tableicon'
import { getBus,updateBus,deleteBus,getUserByRole} from '../../store/busHttp';
import { useSelector,useDispatch } from 'react-redux';
import { busActions } from './busSlice';
import { errorActions } from '../../store/error-slice';
export default function BusList() {
  const tabledata=useSelector(state=>state.bus.tableData)
  const data=tabledata.map(o => ({ ...o }));
  const driverdata=useSelector(state=>state.bus.driverData)
  const driverData=driverdata.map(o => ({ ...o }));
  const redatdata=useSelector(state=>state.bus.redatData)
  const redatData=redatdata.map(o => ({ ...o }));
  const fetched=useSelector(state=>state.bus.updated)
  const dispatch=useDispatch()

useEffect(()=>{
dispatch(getBus())
dispatch(getUserByRole("driver"))
dispatch(getUserByRole("redat"))
return ()=>{
  dispatch(errorActions.Message(''))
}
  },[fetched])
  const [columns, setColumns] = useState([
    {title: "id", field: "_id",hidden:true},
    { title: 'Plate No', field: 'busPlateNo',editable:'never'},
    { title: 'Driver Name', field: 'driverId',lookup:{}},
    { title: 'Driver Phone', field: 'drverPhone',editable:'never'},
    { title: 'Redat Name', field: 'redatId',lookup:{}},
    { title: 'Redat Phone', field: 'redatPhone',editable:'never'},
    { title: 'On Duty', field: 'onDuty',lookup: { true: 'Yes', false: 'No'},editable:'never'},
    { title: 'Total Sit', field: 'totalNoOfSit'},
    { title: 'Bus State', field: 'busState',lookup:{"Active":"Active","Inactive":"Inactive","On-Repair":"On-Repair","Damaged":"Damaged"}},
    { title: 'Service Year', field: 'serviceYear'},

  ]);
  
  useEffect(()=>{
   
    let driverlooks = driverData?.reduce(function(acc, cur, i) {
      acc[cur._id] = `${cur.firstName} ${cur.lastName}`;
      return acc;
      }, {});
      console.log(driverlooks)
      let redatlooks = redatData?.reduce(function(acc, cur, i) {
        acc[cur._id] = `${cur.firstName} ${cur.lastName}`;
        return acc;
        }, {});

        setColumns([
          {title: "id", field: "_id",hidden:true},
    { title: 'Plate No', field: 'busPlateNo',editable:'never'},
    { title: 'Driver Name', field: 'driverId',lookup:driverlooks},
    { title: 'Driver Phone', field: 'drverPhone',editable:'never'},
    { title: 'Redat Name', field: 'redatId',lookup:redatlooks},
    { title: 'Redat Phone', field: 'redatPhone',editable:'never'},
    { title: 'On Duty', field: 'onDuty',lookup: { true: 'Yes', false: 'No'},editable:'never'},
    { title: 'Total Sit', field: 'totalNoOfSit'},
    { title: 'Bus State', field: 'busState',lookup:{"Active":"Active","Inactive":"Inactive","On-Repair":"On-Repair","Damaged":"Damaged"}},
    { title: 'Service Year', field: 'serviceYear'},
        ])

  },[driverdata,redatdata])

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
        rowStyle:  (rowData, i) => {
          if (i % 2) {
              return {backgroundColor: "#f2f2f2"}
          }
      },
      headerStyle: {
        zIndex: 0,backgroundColor:"blue",color:"white",fontSize:"16px"
      },
        actionsColumnIndex: -1,
        exportButton:true,
        filtering:true,
        pageSize:10,
        columnsButton:true
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
        // onRowDelete: oldData =>
        //   new Promise((resolve, reject) => {
        //       dispatch(deleteBus(oldData._id,resolve))
        //   }),
      }}
    />
  </Card.Body>
        </Card>
        </Col>
         </Row>
        </React.Fragment>
  )
}

