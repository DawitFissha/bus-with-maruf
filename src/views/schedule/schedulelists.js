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

  const dispatch=useDispatch()
  const [columns, setColumns] = useState([
    {title: "id", field: "_id",hidden:true},
    { title: 'Source', field: 'source',lookup:{},editable:'never'},
    { title: 'Destination', field: 'destination',lookup:{},editable:'never'},
    { title: 'Total Sit Reserved', field: 'reservedSit',editable:'never'},
    { title: 'Status', field: 'status',editable:'never',lookup:{"Departed":"Departed","Not Departed":"Not Departed","Canceled":"Canceled"}},
    { title: 'Tarif In Birr', field: 'tarif',editable:'never'},
    { title: 'Ass.Bus', field: 'bus',lookup:{},editable: ( _ ,rowData ) => rowData && rowData.status === 'Not Departed'},
    { title: 'Departure Place', field: 'departurePlace',lookup:{},editable: ( _ ,rowData ) => rowData && rowData.status === 'Not Departed'},
    { title: 'Departure Date', field: 'departureDateAndTime',type:"date",editable: ( _ ,rowData ) => rowData && rowData.status === 'Not Departed'},
    { title: 'Departure Date', field: 'departureDateAndTime',type:"time",editable: ( _ ,rowData ) => rowData && rowData.status === 'Not Departed'},

  ]);
  useEffect(()=>{
    dispatch(getSchedule())
    dispatch(getActiveBus())
    dispatch(getAllDepPlace())
    dispatch(getAllCity())
      },[fetched])
      let buslooks
      let deplooks
      let citylooks
      useEffect(()=>{
        if(depData.length>0)
        {
          const res=depData?.map(e=>e.departurePlace).flat()
          console.log(res)
          deplooks = res?.reduce(function(acc, cur, i) {
            acc[cur] = cur;
            return acc;
            }, {});
            citylooks = cityData?.reduce(function(acc, cur, i) {
              acc[cur.cityName] = cur.cityName;
              return acc;
              }, {});        }
     
     if(busdata.length>0)
     {
      buslooks = activebus?.reduce(function(acc, cur, i) {
        acc[cur._id] = cur.busSideNo;
        return acc;
        }, {});
      setColumns([
        {title: "id", field: "_id",hidden:true},
        { title: 'Source', field: 'source',lookup:citylooks,editable:'never'},
        { title: 'Destination', field: 'destination',lookup:citylooks,editable:'never'},
        { title: 'Total Sit Reserved', field: 'reservedSit',editable:'never'},
        { title: 'Status', field: 'status',editable:'never',lookup:{"Departed":"Departed","Not Departed":"Not Departed","Canceled":"Canceled"}},
        { title: 'Tarif In Birr', field: 'tarif',editable:'never'},
        { title: 'Ass.Bus', field: 'bus',lookup:buslooks,editable: ( _ ,rowData ) => rowData && rowData.status === 'Not Departed'},
        { title: 'Departure Place', field: 'departurePlace',lookup:deplooks,editable: ( _ ,rowData ) => rowData && rowData.status === 'Not Departed'},
        { title: 'Departure Date', field: 'departureDateAndTime',type:"date",editable: ( _ ,rowData ) => rowData && rowData.status === 'Not Departed'},
        { title: 'Departure Time', field: 'departureDateAndTime',type:"time",editable: ( _ ,rowData ) => rowData && rowData.status === 'Not Departed'},

      ])
     }
      },[busdata,depdata])
      const message=useSelector(state=>state.message.errMessage)
      useEffect(()=>{
   message==="schedule canceled"&&setSaveStatus(true)
return ()=>{
    message==='city'&&dispatch(errorActions.Message(''))
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
                            <Card.Title as="h5">Manage Route</Card.Title>
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
          editTooltip: 'Assign Bus',
          deleteTooltip: 'Delete Route',
       }
}}
actions={actions}
      editable={{
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

