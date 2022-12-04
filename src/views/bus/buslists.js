import React,{useState,useRef,useEffect} from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import MaterialTable from "material-table";
import {tableIcons} from '../Table/Tableicon'
import { useDispatch } from 'react-redux';
import { busActions } from '../../store/bus-slice';
import AssignUser from "./assignD&R"
import {BsFillPersonLinesFill} from "react-icons/bs"
import { useGetBusQuery,useUpdateBusMutation,useGetAssignedUserByRoleQuery} from '../../store/bus_api';
export default function BusList() {
  const editActionRef = React.useRef();
  const [driverLooks,setDriverLooks] =useState({})
  const [redatLooks,setRedatLooks] =useState({})
  const [CurrentInfo,setCurrentInfo]=useState({})
  const dispatch=useDispatch()
  const {data,isSuccess,error,isError}=useGetBusQuery()
  const [updateBus,{data:datau,isError:isErroru,error:erroru}]=useUpdateBusMutation()
  const {data:Driver}=useGetAssignedUserByRoleQuery("driver")
  const {data:Redat}=useGetAssignedUserByRoleQuery("redat")
  const timenow=new Date()
  useEffect(()=>{
    let driverlooks = Driver?.reduce(function(acc, cur, i) {
      acc[cur._id] = `${cur.firstName} ${cur.lastName}`;
      return acc;
      }, {});
      setDriverLooks(driverlooks)
      let redatlooks = Redat?.reduce(function(acc, cur, i) {
        acc[cur._id] = `${cur.firstName} ${cur.lastName}`;
        return acc;
        }, {});
        setRedatLooks(redatlooks)
  },[Driver,Redat])
  return (
    <React.Fragment>
      <AssignUser info={CurrentInfo}/>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Manage Buses</Card.Title>
                        </Card.Header>
                        <Card.Body>
                          <Col>
                        <MaterialTable
                        style={{zIndex:0,fontSize:'14px'}}
                         components={{
                          Container: props => <div {...props} elevation={0}/>,
                     }}
                         responsive
      title="Buses List"
      columns={[
        {title: "id", field: "_id",hidden:true},
        { title: 'Side No', field: 'busSideNo'},
        { title: 'Driver Name', field: 'driverId',lookup:driverLooks,editable:'never'},
        { title: 'Driver Phone', field: 'drverPhone',editable:'never'},
        { title: 'Redat Name', field: 'redatId',lookup:redatLooks,editable:'never'},
        { title: 'Redat Phone', field: 'redatPhone',editable:'never'},
        { title: 'Total Sit', field: 'totalNoOfSit'},
        { title: 'Bus State', field: 'busState',lookup:{"Active":"Active","Inactive":"Inactive","On-Repair":"On-Repair","Damaged":"Damaged"}},
        { title: 'Service Year', field: 'serviceYear'},
      ]}
      data={data && data.map(o => ({ ...o,serviceYear:(timenow.getFullYear()-(Number(o.serviceYear)))}))}
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
actions={[
  (rowData)=>({
    icon:() => <BsFillPersonLinesFill style={{color:"brown"}} size={25}/>,
    tooltip: 'Change Driver & Redat',
    position:'row',
    onClick: (evt, Data) => {
      setCurrentInfo(Data)
      dispatch(busActions.setModal(true))
    }
  }),
]}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => { 
            updateBus({id:oldData._id,...newData})
            setTimeout(()=>{resolve()},600)
          }),
      }}
    />
    </Col>
  </Card.Body>
        </Card>
        </Col>
         </Row>
        </React.Fragment>
  )
}

