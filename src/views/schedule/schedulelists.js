import React,{useState,useRef,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable from "material-table";
import {MdOutlineFreeCancellation} from "react-icons/md"
import {tableIcons} from '../Table/Tableicon'
import { assignBus, getActiveBus, getAllDepPlace, getSchedule,getAllCity } from '../../store/scheduleHttp';
import { useSelector,useDispatch } from 'react-redux';
import { scheduleActions } from '../../store/schedule-slice';
import {role} from "../../role"
import { SaveSuccessfull } from '../../Components/saveSuccess';
import { errorActions } from '../../store/error-slice';
import CancelForm from "./cancelshcedule"

export default function ScheduleList() {
  const tabledata=useSelector(state=>state.schedule.tableData)
  const busdata=useSelector(state=>state.schedule.busData)
  const depdata=useSelector(state=>state.schedule.depData)
  const citydata=useSelector(state=>state.schedule.cityData)
  const cityData=citydata?.map(o => ({ ...o }));
  const data=tabledata?.map(o => ({ ...o }));
  const activebus=busdata?.map(o => ({ ...o }));
  const depData=depdata?.map(o => ({ ...o }));
  const fetched=useSelector(state=>state.schedule.updated)
  const profile=useSelector(state=>state.userinfo)
  let actions=[]
  if(profile.role===role.SUPERADMIN||profile.role===role.ADMIN)
  {
   actions= [
      (rowData)=>({
        icon:() => <MdOutlineFreeCancellation style={{color:"red"}} size={25}/>,
        tooltip: 'cancel schedule',
        position:'row',
        disabled:rowData.status!=="Not Departed",
        onClick: (evt, Data) => {
          dispatch(scheduleActions.setModalData({id:Data._id}))
          dispatch(scheduleActions.setModal(true))
        }
      }),
    ]
  }
  const [cityLooks,setCityLooks] =useState({})
  const [depLooks,setDepLooks] =useState({})
  const [busyLooks,setBusLooks] =useState({})

  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getSchedule())
    dispatch(getActiveBus())
    dispatch(getAllDepPlace())
    dispatch(getAllCity())
    return ()=>{
      dispatch(errorActions.Message(''))
    }
      },[fetched])
      useEffect(()=>{
        if(depData.length>0)
        {
          const res=depData?.map(e=>e.departurePlace).flat()
          console.log(res)
          const deplooks = res?.reduce(function(acc, cur, i) {
            acc[cur] = cur;
            return acc;
            }, {});
            setDepLooks(deplooks)
            const citylooks = cityData?.reduce(function(acc, cur, i) {
              acc[cur.cityName] = cur.cityName;
              return acc;
              }, {}); 
             setCityLooks(citylooks)
            }
     
     if(busdata.length>0)
     {
      const buslooks = activebus?.reduce(function(acc, cur, i) {
        acc[cur._id] = cur.busSideNo;
        return acc;
        }, {});
        setBusLooks(buslooks)
     }
      },[busdata,depdata])
      const message=useSelector(state=>state.message.errMessage)
      useEffect(()=>{
   message==="schedule canceled"&&setSaveStatus(true)
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
      <CancelForm/>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Manage Scedule</Card.Title>
                        </Card.Header>
                        <Card.Body>
                        <MaterialTable
                         components={{
                          Container: props => <div {...props} elevation={0}/>,
                     }}
      responsive
      title="Schedule"
      columns={[
        {title: "id", field: "_id",hidden:true},
        { title: 'Source', field: 'source',lookup:cityLooks,editable:'never'},
        { title: 'Destination', field: 'destination',lookup:cityLooks,editable:'never'},
        { title: 'Total Sit Reserved', field: 'reservedSit',editable:'never'},
        { title: 'Status', field: 'status',editable:'never',lookup:{"Departed":"Departed","Not Departed":"Not Departed","Canceled":"Canceled"}},
        { title: 'Tarif In Birr', field: 'tarif',editable:'never'},
        { title: 'Ass.Bus', field: 'bus',lookup:busyLooks,editable: ( _ ,rowData ) => rowData && rowData.status === 'Not Departed'},
        { title: 'Departure Place', field: 'departurePlace',lookup:depLooks,editable: ( _ ,rowData ) => rowData && rowData.status === 'Not Departed'},
        { title: 'Departure Date', field: 'departureDateAndTime',type:"date",editable: ( _ ,rowData ) => rowData && rowData.status === 'Not Departed'},
        { title: 'Departure Time', field: 'departureDateAndTime',type:"time",editable: ( _ ,rowData ) => rowData && rowData.status === 'Not Departed'},

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
          editTooltip: 'Assign Bus',
          deleteTooltip: 'Delete Route',
       }
}}
actions={actions}
      editable={{
        isEditable: rowData => rowData.status === 'Not Departed',
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
              dispatch(assignBus(oldData._id,newData,resolve))
          }),
      }}
    />
  </Card.Body>
        </Card>
        </Col>
         </Row>
         <SaveSuccessfull open={saveStatus} handleClose={handleSaveStatusClose} message = 'Schedule Canceled' />
        </React.Fragment>
  )
}

