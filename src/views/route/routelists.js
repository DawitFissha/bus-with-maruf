import React,{useState,useRef,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable,{ MTableAction,MTableEditField} from "material-table";
import {tableIcons} from '../Table/Tableicon'
import { getRoute,updateRoute,deleteRoute, getActiveBus} from '../../store/routeHttp';
import { useSelector,useDispatch } from 'react-redux';
import {role} from "../../role"
import { getAllCity } from '../../store/scheduleHttp';
import { errorActions } from '../../store/error-slice';
import { routeActions } from '../../store/route-slice';
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
  const [cityLooks,setCityLooks] =useState({})
  const dispatch=useDispatch()
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
      setCityLooks(citylooks)
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
      columns={[
        {title: "id", field: "_id",hidden:true},
        { title: 'Source', field: 'source',lookup:cityLooks,editable:"never"},
        { title: 'Destination', field: 'destination',lookup:cityLooks,editable:"never"},
        { title: 'Tarif In Birr', field: 'tarif'},
        { title: 'Estimated Hour', field: 'estimatedHour'},
        { title: 'Distance', field: 'distance'},
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

