import React,{useState,useRef,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable from "material-table";
import { tableIcons } from '../../views/Table/Tableicon';
import { getOneSchedule, getSalesSchedule, updatePassInfo} from '../../store/scheduleHttp';
import { useSelector,useDispatch } from 'react-redux';
import { scheduleActions } from '../../store/schedule-slice';
import Select from "@material-ui/core/Select";
import { Autocomplete, FormControl, InputAdornment} from '@mui/material';
import TextField from '@mui/material/TextField'
import MenuItem from "@material-ui/core/MenuItem";
import {MdToday} from "react-icons/md"
import {FiPrinter} from "react-icons/fi"
import {BsCashCoin} from "react-icons/bs"
import { errorActions } from '../../store/error-slice';
import RefundForm from "./refundpop"
import { SaveSuccessfull } from '../saveSuccess';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function ScheduleList() {
  const tabledata=useSelector(state=>state.schedule.tableData)
  const scheduledata=useSelector(state=>state.schedule.scheduleData)
  const data=tabledata?.map(o => ({ ...o }));
  const filterData=scheduledata?.map(o => ({ ...o }));
  const fetched=useSelector(state=>state.schedule.updated)
  const [schedulesOpen,setSchedulesOpen] = React.useState(false)  
  const profile=useSelector(state=>state.userinfo)
  const [schedule,setSchedule]=useState([])
  let actions=[]
//   if(profile.role===role.SUPERADMIN||profile.role===role.ADMIN)
//   {
   actions= [
      (rowData)=>({
        icon:() => <BsCashCoin style={{color:"brown"}} size={25}/>,
        tooltip: 'create refund',
        position:'row',
        disabled:rowData.status==="Refunded",
        onClick: (evt, Data) => {
          console.log({id:Data._id,uniqueid:Data.passangerId,passsit:Data.sit})
          dispatch(scheduleActions.setModalData({id:Data._id,uniqueid:Data.passangerId,passsit:Data.sit}))
          dispatch(scheduleActions.setModal(true))
         
        }
      }),
      (rowData)=>({
        icon:() => <FiPrinter style={{color:"Salmon"}} size={25}/>,
        tooltip: 'Print Ticket',
        position:'row',
        disabled:rowData.status!=="To Be Departed",
        onClick: (evt, Data) => {
          // dispatch(scheduleActions.setModalData({id:Data._id}))
          // dispatch(scheduleActions.setModal(true))
        }
      }),
    ]
//   }

const dispatch=useDispatch()
useEffect(()=>{
  let isComponentMounted = true;
  if(isComponentMounted){
    dispatch(getSalesSchedule())
  }
return ()=>{
  dispatch(errorActions.Message(''))
  isComponentMounted = false;

}
},[fetched])
useEffect(()=>{
  let isComponentMounted = true;
  if(isComponentMounted){
    console.log(schedule)
    dispatch(getOneSchedule(schedule.id))
  }
return ()=>{
  dispatch(errorActions.Message(''))
  isComponentMounted = false;

}
},[schedule])

const message=useSelector(state=>state.message.errMessage)
const options=filterData?.map(e=>({id:e._id,label:`from ${e?.source} to ${e?.destination} @ ${e?.departureDateAndTime.split("T")[0]}`}))
console.log(options)
useEffect(()=>{
message==="ticket canceled"&&setSaveStatus(true)
return ()=>{
dispatch(errorActions.Message(''))
}
},[message])
const [saveStatus,setSaveStatus] =useState(false)
const handleSaveStatusClose = (event, reason) => {
if (reason === 'clickaway') {
return;
}
setSaveStatus(false);
};
  return (
    <React.Fragment>
      <RefundForm/>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Manage Ticket</Card.Title>
                            <Row style={{justifyContent:"end",marginBottom:"0px"}}>
                            <Autocomplete
                                disablePortal
                                id="select-schedule"
                                value={schedule}
                                onChange={(event, newValue) => {
                                  newValue !== null&&setSchedule(newValue);
                                }}
                                options={options}
                                sx={{ width: 450 }}
                                renderInput={(params) => <TextField {...params} label="Select Schedule" />}
                              />
                            </Row>
                            {/* <Row style={{justifyContent:"end",marginRight:"20px",fontSize:"20px",color:"blue",fontFamily:"Times New Roman"}}><MdToday size={30}/> Select Schedule</Row> */}
                        </Card.Header>
                        <Card.Body>
                        <MaterialTable
                         components={{
                          Container: props => <div {...props} elevation={0}/>,
                     }}
      responsive
      title="Booked Ticket"
      columns={[
        {title: "id", field: "_id",hidden:true},
        { title: 'Passanger ID', field: 'passangerId',editable:'never'},
        { title: 'Passanger Name', field: 'passangerName',editable: ( _ ,rowData ) => rowData && rowData.status === 'To Be Departed'},
        { title: 'Phone Number', field: 'phoneNumber',editable: ( _ ,rowData ) => rowData && rowData.status === 'To Be Departed'},
        { title: 'Sit', field: 'sit',editable:'never'},
        { title: 'Booked At', field: 'bookedAt',editable:'never',type:"date"},
        { title: 'Status', field: 'status',editable:'never',lookup:{"Departed":"Departed","To Be Departed":"To Be Departed","Refunded":"Refunded"}},
        { title: 'Tarif In Birr', field: 'tarif',editable:'never'},
      ]}
      data={data}
      icons={tableIcons}
      options={{
        rowStyle:  (rowData, i) => {
          if (i % 2) {
              return {backgroundColor: "#f2f2f2"}
          }
      },
      headerStyle: {
        zIndex: 0,backgroundColor:"#FE7C7C",color:"white",fontSize:"16px"
      },
        actionsColumnIndex: -1,
        exportButton:true,
        filtering:true,
        pageSize:10,
        columnsButton:true
      }}
      localization={{
        body: {
          editTooltip: 'Edit Passanger info',
       }
}}
      editable={{
        isEditable: rowData => rowData.status === 'To Be Departed',
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
              dispatch(updatePassInfo(oldData._id,newData,resolve))
          }),
      }}
      actions={actions}

    />
  </Card.Body>
        </Card>
        </Col>
         </Row>
         <SaveSuccessfull open={saveStatus} handleClose={handleSaveStatusClose} message = 'Ticket Refunded Successfully' />

        </React.Fragment>
  )
}

