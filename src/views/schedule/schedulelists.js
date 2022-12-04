import React,{useState,useRef,useEffect} from 'react';
import { Row, Col, Card} from 'react-bootstrap';
import MaterialTable from "material-table";
import {MdOutlineFreeCancellation} from "react-icons/md"
import {AiOutlineSchedule} from "react-icons/ai"
import {tableIcons} from '../Table/Tableicon'
import {GiBus} from 'react-icons/gi'
import { useSelector,useDispatch } from 'react-redux';
import { scheduleActions } from '../../store/schedule-slice';
import {role} from "../../role"
import CancelForm from "./cancel_undo_shcedule"
import AssignBus from './assignbus';
import {toEthiopianDateString} from 'gc-to-ethiopian-calendar'
import moment from 'moment';
import {toTewelvHourAndLocal} from "../../utils/toLocaltime"
import { useGetScheduleQuery,useGetAllCityQuery,useGetAllDepPlaceQuery,useGetAllOrgBusQuery,useUpdateDepartureDateTimeMutation } from '../../store/bus_api';
export default function ScheduleList() {
  const profile=useSelector(state=>state.userinfo)
  //am for amharic
const timenow = new Date
const userinfo=useSelector(state=>state.userinfo)
const {data}=useGetScheduleQuery()
const {data:citydata}=useGetAllCityQuery()
const {data:depdata}=useGetAllDepPlaceQuery()
const {data:busdata}=useGetAllOrgBusQuery()
const [updateDepartureDateTime]=useUpdateDepartureDateTimeMutation()
  const cityData=citydata?.map(o => ({ ...o }));
  const busData=busdata?.map(o => ({ ...o }));
  const depData=depdata?.map(o => ({ ...o }));
  let actions=[]
  if(profile.role===role.SUPERADMIN||profile.role===role.ADMIN)
  {
   actions= [
      (rowData)=>({
        icon:() =>rowData.status!="Canceled"?<MdOutlineFreeCancellation style={{color:"red"}} size={25}/>:
        <AiOutlineSchedule style={{color:"blue"}} size={25}/>,
        tooltip:rowData.status!="Canceled"?'cancel schedule':
        'activate schedule',
        position:'row',
        disabled:rowData.status=="Departed"||
        (moment(rowData.departureDateAndTime).
        isBefore(timenow)&&rowData.status=="Canceled"),
        onClick: (evt, Data) => {
          dispatch(scheduleActions.setModalData({id:Data._id,status:Data.status}))
          dispatch(scheduleActions.setModal(true))
        }
      }),
      (rowData)=>({
        icon:() => <GiBus style={{color:"brown"}} size={25}/>,
        tooltip: 'Assign Bus And Departure Place',
        position:'row',
        disabled:rowData.status!=="Not Departed",
        onClick: (evt, Data) => {
          const newData=JSON.parse(JSON.stringify(Data))
          dispatch(scheduleActions.setModalData(newData))
          dispatch(scheduleActions.setBusModal(true))
        }
      }),
    ]
  }
  const [cityLooks,setCityLooks] =useState({})
  const [depLooks,setDepLooks] =useState({})
  const [busLooks,setBusLooks] =useState({})
  const dispatch=useDispatch()
      useEffect(()=>{
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
      const buslooks = busData?.reduce(function(acc, cur, i) {
        acc[cur._id] = `${cur.busPlateNo}`;
        return acc;
        }, {});
        setBusLooks(buslooks)
      },[busdata,depdata,citydata])
  return (
    <React.Fragment>
      <CancelForm/>
      <AssignBus/>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Manage Scedule</Card.Title>
                        </Card.Header>
                        <Card.Body>
                        <MaterialTable
                        style={{zIndex:0,paddingTop:'0px',fontSize:'14px'}}
                         components={{
                          Container: props => <div {...props} elevation={0}/>,
                     }}
      responsive
      title="Schedule"
      columns={userinfo.calender=="ec"?[
        {title: "id", field: "_id",hidden:true},
        { title: 'Schedule ID', field: 'scheduleId',editable:'never'},
        { title: 'Source', field: 'source',lookup:cityLooks,editable:'never'},
        { title: 'Destination', field: 'destination',lookup:cityLooks,editable:'never'},
        { title: 'Total Sit Reserved', field: 'reservedSit',editable:'never'},
        { title: 'Status', field: 'status',editable:'never',lookup:{"Departed":"Departed","Not Departed":"Not Departed","Canceled":"Canceled"}},
        { title: 'Tarif In Birr', field: 'tarif',editable:'never'},
        { title: 'Ass.Bus', field: 'bus',lookup:busLooks,editable:'never'},
        { title: 'Departure Place', field: 'departurePlace',lookup:depLooks,editable:'never'},
        { title: 'Departure Date.Time', field: 'departureDateAndTime',
        type:"datetime",render:rowData=>`${toEthiopianDateString(rowData?.departureDateAndTime)}
         ${toTewelvHourAndLocal(new Date(rowData.departureDateAndTime))}`,editable: ( _ ,rowData ) => rowData && rowData.status === 'Not Departed'},
      ]:[
        {title: "id", field: "_id",hidden:true},
        { title: 'Schedule ID', field: 'scheduleId',editable:'never'},
        { title: 'Source', field: 'source',lookup:cityLooks,editable:'never'},
        { title: 'Destination', field: 'destination',lookup:cityLooks,editable:'never'},
        { title: 'Total Sit Reserved', field: 'reservedSit',editable:'never'},
        { title: 'Status', field: 'status',editable:'never',lookup:{"Departed":"Departed","Not Departed":"Not Departed","Canceled":"Canceled"}},
        { title: 'Tarif In Birr', field: 'tarif',editable:'never'},
        { title: 'Ass.Bus', field: 'bus',lookup:busLooks,editable:'never'},
        { title: 'Departure Place', field: 'departurePlace',lookup:depLooks,editable:'never'},
        { title: 'Departure Date.Time', field: 'departureDateAndTime',type:"datetime",editable: ( _ ,rowData ) => rowData && rowData.status === 'Not Departed'},
      ]}
      data={data?.map(o => ({ ...o }))}
      icons={tableIcons}
      options={{
        search:false,
        exportAllData:true,
        grouping:true,
        maxBodyHeight: '600px',
        rowStyle:  (rowData, i) => {
          if(i % 2&&rowData.status=='Canceled')
          {
            return {color: "red",backgroundColor: "#f2f2f2"}
          }
          if(rowData.status=='Canceled')
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
          editTooltip: 'Assign Bus',
          deleteTooltip: 'Delete Route',
       }
}}
actions={actions}
      editable={{
        isEditable: rowData => rowData.status === 'Not Departed',
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
        updateDepartureDateTime({id:oldData._id,departureDateAndTime:newData.departureDateAndTime})
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

