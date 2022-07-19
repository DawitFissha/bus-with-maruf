import React,{useState,useRef,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable,{ MTableAction,MTableEditField} from "material-table";
import {tableIcons} from '../Table/Tableicon'
import { getRoute,updateRoute,deleteRoute, getActiveBus} from '../../store/routeHttp';
import { useSelector,useDispatch } from 'react-redux';
import {role} from "../../role"
import { getAllCity } from '../../store/scheduleHttp';
import { errorActions } from '../../store/error-slice';
import { routeActions } from './routeSlice';
import { scheduleActions } from '../../store/schedule-slice';
export default function RouteList() {
  const tabledata=useSelector(state=>state.route.tableData)
  const busdata=useSelector(state=>state.route.busData)
  const citydata=useSelector(state=>state.schedule.cityData)
  console.log(citydata)
  const data=tabledata?.map(o => ({ ...o }));
  const activebus=busdata?.map(o => ({ ...o }));
  const cityData=citydata?.map(o => ({ ...o }));
  const fetched=useSelector(state=>state.route.updated)
  const dispatch=useDispatch()
  const [columns, setColumns] = useState([
    {title: "id", field: "_id",hidden:true},
    { title: 'Source', field: 'source',lookup:{},editable:"never",},
    { title: 'Destination', field: 'destination',lookup:{},editable:"never"},
    { title: 'Tarif', field: 'tarif'},
    { title: 'Estimated Hour', field: 'estimatedHour'},
    { title: 'Distance', field: 'distance'},
    { title: 'Departure Place', field: 'departurePlace',editable:'never',lookup:{}},
  ]);
  useEffect(()=>{
    dispatch(getRoute())
    dispatch(getActiveBus())
    dispatch(getAllCity())
    return ()=>{
      dispatch(errorActions.Message(''))
    }
      },[fetched])
      let looks
      let citylooks
      useEffect(()=>{
     if(busdata.length>0)
     {
      looks = activebus?.reduce(function(acc, cur, i) {
        acc[cur._id] = cur.busPlateNo;
        return acc;
        }, {});
    citylooks = cityData?.reduce(function(acc, cur, i) {
      acc[cur.cityName] = cur.cityName;
      return acc;
      }, {});
      setColumns([
        {title: "id", field: "_id",hidden:true},
        { title: 'Source', field: 'source',lookup:citylooks,editable:"never"},
        { title: 'Destination', field: 'destination',lookup:citylooks,editable:"never"},
        { title: 'Tarif In Birr', field: 'tarif'},
        { title: 'Estimated Hour', field: 'estimatedHour'},
        { title: 'Distance', field: 'distance'},
      ])
     }
      },[busdata,citydata])
  return (
    <React.Fragment>
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
        pageSize:10,
        columnsButton:true
      }}
      localization={{
        body: {
          editTooltip: 'Edit Route Info',
          deleteTooltip: 'Delete Route',
       }
}}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
              dispatch(updateRoute(oldData._id,newData,resolve))
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
              dispatch(deleteRoute(oldData._id,resolve))
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

