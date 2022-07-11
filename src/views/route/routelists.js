import React,{useState,useRef,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable,{ MTableAction,MTableEditField} from "material-table";
import {tableIcons} from '../Table/Tableicon'
import { getRoute,updateRoute,deleteRoute, getActiveBus} from '../../store/routeHttp';
import { useSelector,useDispatch } from 'react-redux';
import {role} from "../../role"
export default function RouteList() {
  const tabledata=useSelector(state=>state.route.tableData)
  const busdata=useSelector(state=>state.route.busData)
  const data=tabledata?.map(o => ({ ...o }));
  const activebus=busdata?.map(o => ({ ...o }));
  const fetched=useSelector(state=>state.route.updated)
  const dispatch=useDispatch()
  const addActionRef = React.useRef();

  const [columns, setColumns] = useState([
    {title: "id", field: "_id",hidden:true},
    { title: 'Source', field: 'source'},
    { title: 'Destination', field: 'destination'},
    { title: 'Tarif', field: 'tarif'},
    { title: 'Estimated Hour', field: 'estimatedHour'},
    { title: 'Distance', field: 'distance'},
    { title: 'Departure Place', field: 'departurePlace',editable:'never',lookup:{}},
  ]);
  useEffect(()=>{
    dispatch(getRoute())
    dispatch(getActiveBus())
      },[fetched])
      let looks
      useEffect(()=>{
     if(busdata.length>0)
     {
      looks = activebus?.reduce(function(acc, cur, i) {
        acc[cur._id] = cur.busPlateNo;
        return acc;
        }, {});
      setColumns([
        {title: "id", field: "_id",hidden:true},
        { title: 'Source', field: 'source'},
        { title: 'Destination', field: 'destination'},
        { title: 'Tarif', field: 'tarif'},
        { title: 'Estimated Hour', field: 'estimatedHour'},
        { title: 'Distance', field: 'distance'},
      ])
     }
      },[busdata])
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
                          Action: props => {
                            //If isn't the add action
                            console.log(props)
                            if (typeof props.action === typeof Function || props.action.tooltip !== 'Add') {
                              console.log("not done")
                                  return <MTableAction {...props} />
                            } 
                            else {
                              console.log("done")
                                  return <div ref={addActionRef} onClick={props.action.onClick}/>;
                            }
                          }
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

