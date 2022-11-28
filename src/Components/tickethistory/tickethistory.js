import React,{useState,useRef,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable from "material-table";
import { tableIcons } from '../../views/Table/Tableicon';
// import { getOneSchedule, getSalesSchedule, updatePassInfo} from '../../store/scheduleHttp';
import { useSelector,useDispatch } from 'react-redux';
import { scheduleActions } from '../../store/schedule-slice';
import { Autocomplete, FormControl, InputAdornment} from '@mui/material';
import TextField from '@mui/material/TextField'
// import MenuItem from "@mui/material/MenuItem";
// import {MdToday} from "react-icons/md"
import {FiPrinter} from "react-icons/fi"
import {BsCashCoin} from "react-icons/bs"
import { errorActions } from '../../store/error-slice';
import RefundForm from "./refundpop"
// import { SaveSuccessfull } from '../common-registration-form/saveSuccess';
import {useLazyGetOneScheduleQuery,useGetSalesScheduleQuery,useUpdatePassInfoMutation } from '../../store/bus_api';
export default function ScheduleList() {
  // const tabledata=useSelector(state=>state.schedule.historyData)
  // const scheduledata=useSelector(state=>state.schedule.scheduleData)
  // const data=tabledata?.map(o => ({ ...o }));
  // const filterData=scheduledata?.map(o => ({ ...o }));
  // const fetched=useSelector(state=>state.schedule.updated)
  // const [schedulesOpen,se,tSchedulesOpen] = React.useState(false)  
  // const profile=useSelector(state=>state.userinfo)
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
const dispatch=useDispatch()
const [updatePassInfo]=useUpdatePassInfoMutation()
const {data:salesSchedule}=useGetSalesScheduleQuery()
const [trigger,{data:oneSchedule}]=useLazyGetOneScheduleQuery()
const filterData=salesSchedule?.map(o => ({ ...o }));

// useEffect(()=>{
//   // let isComponentMounted = true;
//   // if(isComponentMounted){
//   //   dispatch(getSalesSchedule())
//     if(schedule?.id)
//     {
//       dispatch(getOneSchedule(schedule?.id))
//     }
//   // }
// // return ()=>{
// //   dispatch(errorActions.Message(''))
//   // isComponentMounted = false;
// // }
// },[schedule])

useEffect(()=>{
  if(schedule?.id)
  {
    trigger(schedule?.id)
  }
},[schedule])

// const message=useSelector(state=>state.message.errMessage)
console.log(filterData)
const options=filterData?.map(e=>({id:e._id,label:e?.scheduleId||'',desc:`From ${e?.source} 
To ${e?.destination} @ ${e?.departureDateAndTime.split("T")[0]}`}))||[]
  // `From ${e?.source} To ${e?.destination} @ ${e?.departureDateAndTime.split("T")[0]}`}))||[]

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
                                variant="outlined"
                                value={schedule}
                                onChange={(event, newValue) => {
                                  newValue !== null&&setSchedule(newValue);
                                }}
                                options={options}
                                sx={{ width: 400 }}
                                renderInput={(params) => <TextField {...params} label="Select Schedule" />}
                              />
                            </Row>
                        </Card.Header>
                        <Card.Body>
                        <MaterialTable
                        style={{zIndex:0,fontSize:'15px'}}
                         components={{
                          Container: props => <div {...props} elevation={0}/>,
                     }}
      responsive
      title={"Booked Ticket :"+" "+(schedule.desc||'')}
      columns={[
        {title: "id", field: "_id",hidden:true},
        { title: 'Passanger ID', field: 'passangerId',editable:'never'},
        { title: 'Passanger Name', field: 'passangerName',editable: ( _ ,rowData ) => rowData && rowData.status === 'To Be Departed'},
        { title: 'Phone Number', field: 'phoneNumber',editable: ( _ ,rowData ) => rowData && rowData.status === 'To Be Departed'},
        { title: 'Sit', field: 'sit',editable:'never'},
        { title: 'Booked At', field: 'bookedAt',editable:'never',type:"date"},
        { title: 'Status', field: 'status',editable:'never',lookup:{"Departed":"Departed","To Be Departed":"To Be Departed","Refunded":"Refunded","Canceled Trip":"Canceled Trip","Canceled Sit":"Canceled Sit"}},
        { title: 'Tarif In Birr', field: 'tarif',editable:'never'},
      ]}
      data={oneSchedule?.map(o=>({...o}))}
      icons={tableIcons}
      options={{
        search:false,
        maxBodyHeight: '550px',
        rowStyle:  (rowData, i) => {
          if(i % 2&&rowData.status=='Refunded')
          {
            return {color: "orange",backgroundColor: "#f2f2f2"}
          }
          if(rowData.status=='Refunded')
          {
            return {color: "orange"}
          }
          if(i % 2&&rowData.status=='Canceled Trip')
          {
            return {color: "red",backgroundColor: "#f2f2f2"}
          }
          if(rowData.status=='Canceled Trip')
          {
            return {color: "red"}
          }
          if(i % 2&&rowData.status=='Departed')
          {
            return {color: "blue",backgroundColor: "#f2f2f2"}
          }
          if(rowData.status=='Departed')
          {
            return {color: "blue"}
          }
          if (i % 2) {
              return {backgroundColor: "#f2f2f2"}
          }
      },
      headerStyle: {
        zIndex: "1",backgroundColor:"#FE7C7C",color:"white",fontSize:"16px",margin:'0px',padding:'10px 2px'
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
            updatePassInfo({id:oldData._id,...newData})
            setTimeout(()=>{resolve()},600)
              // dispatch(updatePassInfo(oldData._id,newData,resolve))
          }),
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

