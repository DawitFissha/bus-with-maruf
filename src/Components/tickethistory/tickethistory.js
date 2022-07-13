import React,{useState,useRef,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable from "material-table";
import {MdOutlineFreeCancellation} from "react-icons/md"
import { tableIcons } from '../../views/Table/Tableicon';
import { getOneSchedule, getSalesSchedule, updatePassInfo} from '../../store/scheduleHttp';
import { useSelector,useDispatch } from 'react-redux';
import { scheduleActions } from '../../store/schedule-slice';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {MdToday} from "react-icons/md"
import {FiPrinter} from "react-icons/fi"
import {BsCashCoin} from "react-icons/bs"
import { errorActions } from '../../store/error-slice';
import RefundForm from "./refundpop"

export default function ScheduleList() {
  const tabledata=useSelector(state=>state.schedule.tableData)
  const scheduledata=useSelector(state=>state.schedule.scheduleData)
  const depdata=useSelector(state=>state.schedule.depData)
  const data=tabledata?.map(o => ({ ...o }));
  const filterData=scheduledata?.map(o => ({ ...o }));
  const fetched=useSelector(state=>state.schedule.updated)
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
        disabled:rowData.status!=="Not Departed",
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
        disabled:rowData.status!=="Not Departed",
        onClick: (evt, Data) => {
          // dispatch(scheduleActions.setModalData({id:Data._id}))
          // dispatch(scheduleActions.setModal(true))
        }
      }),
    ]
//   }
const handleChange=()=>{

}
  const dispatch=useDispatch()
  const [columns, setColumns] = useState([
    {title: "id", field: "_id",hidden:true},
    { title: 'Passanger ID', field: 'passangerId',editable:'never'},
    { title: 'Passanger Name', field: 'passangerName'},
    { title: 'Phone Number', field: 'phoneNumber'},
    { title: 'Sit', field: 'sit',editable:'never'},
    { title: 'Booked At', field: 'bookedAt',editable:'never',type:"date"},
    { title: 'Status', field: 'status',editable:'never',lookup:{"Departed":"Departed","To Be Departed":"To Be Departed","Refunded":"Refunded"}},
    { title: 'Tarif In Birr', field: 'tarif',editable:'never'},
    // { title: 'Ass.Bus', field: 'bus',lookup:{},editable: ( _ ,rowData ) => rowData && rowData.status === 'Not Departed'},
    // { title: 'Departure Place', field: 'departurePlace',lookup:{},editable: ( _ ,rowData ) => rowData && rowData.status === 'Not Departed'},
    // { title: 'Departure Date', field: 'departureDateAndTime',type:"date",editable: ( _ ,rowData ) => rowData && rowData.status === 'Not Departed'},
  ]);
useEffect(()=>{
   dispatch(getSalesSchedule())
//    schedule&&dispatch(getOneSchedule(schedule))
},[fetched])

const ScheduleHandler=(e)=>{
    setSchedule(e.target.value)
    dispatch(getOneSchedule(e.target.value))
}
  return (
    <React.Fragment>
      <RefundForm/>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Manage Route</Card.Title>
                            <Row style={{justifyContent:"center",marginBottom:"10px"}}>
                            <Select
                                value={schedule}
                                label="Schedule"
                                variant='outlined'
                                style={{width:"250px"}}
                                onChange={ScheduleHandler}
                            >
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                {filterData?.map(e=><MenuItem key={e._id} value={e?._id}>
                                   {`from ${e?.source} to ${e?.destination} @ ${e?.departureDateAndTime.split("T")[0]}`}
                                    </MenuItem>)} 
                            </Select>
                          
                            </Row>
                            <Row style={{justifyContent:"center",fontSize:"20px",color:"blue",fontFamily:"Times New Roman"}}><MdToday size={30}/> Select Schedule</Row>
                        </Card.Header>
                        <Card.Body>
                        <MaterialTable
                         components={{
                          Container: props => <div {...props} elevation={0}/>,
                     }}
      responsive
      title="Route List"
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
        zIndex: 0,backgroundColor:"blue",color:"white",fontSize:"18px"
      },
        actionsColumnIndex: -1,
        exportButton:true,
        filtering:true,
        columnsButton:true
      }}
      localization={{
        body: {
          editTooltip: 'Edit Passanger info',
       }
}}
      editable={{
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
        </React.Fragment>
  )
}

