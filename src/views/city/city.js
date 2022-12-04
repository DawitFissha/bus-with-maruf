import React,{useState,useRef,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable,{ MTableAction} from "material-table";
import {tableIcons} from '../Table/Tableicon'
import { useSelector,useDispatch } from 'react-redux';
import {cityActions} from '../../store/city-slice'
import {MdAddLocationAlt,} from 'react-icons/md'
import {FaEdit} from "react-icons/fa";
import CityForm from "./cityform"
// import { getCity } from '../../store/cityHttp';
// import { errorActions } from '../../store/error-slice';
import { useGetCityQuery} from '../../store/bus_api';
export default function Location() {
  // const tabledata=useSelector(state=>state.city.tableData)
  // const message=useSelector(state=>state.message.errMessage)
  // const data=tabledata.map(o => ({ ...o }));
  const [update,setUpdate]=useState(false)
  // const fetched=useSelector(state=>state.city.updated)

  const {data,isError,isSuccess}=useGetCityQuery()

  const dispatch=useDispatch()
  // useEffect(()=>{
  // dispatch(getCity())
  // return ()=>{
  //   dispatch(errorActions.Message(''))
  // }
  // },[fetched])
  // useEffect(()=>{
  //   message==='city'&&setSaveStatus(true)
  //   return ()=>{
  //       message==='city'&&dispatch(errorActions.Message(''))
  //   }
  //   },[message])


  return (
    <React.Fragment>
      <CityForm update={update}/>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Manage City And Departure Place</Card.Title>
                            <Row style={{float:'right'}}>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                        <MaterialTable
                        style={{zIndex:0,fontSize:'14px'}}
                         components={{
                          Container: props => <div {...props} elevation={0}/>,
                     }}
                         responsive
      title="Manage City & departure Place"
      columns={[
        {title: "id", field: "_id", hidden: true},
        { title: 'City', field: 'cityName'},
        { title: 'Departure Plcae', field: 'departurePlace',
        render:Data=>Data?.departurePlace?.join()},
        { title: 'Status', field: 'isActive',lookup: { true: 'Active', 
        false: 'Not Active'}},
      ]}
      data={data&&data.map(o=>({...o}))}
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
        exportDelimiter:true,
        pageSize:10,
        columnsButton:true,
        filtering:true,
      }}
      actions={[
        {
          icon:() => <MdAddLocationAlt size={35}/>,
          tooltip: 'Add new city',
          position:'toolbar',
          onClick: (evt, Data) => {
            setUpdate(false)
            dispatch(cityActions.setModal(true))

          }
        },
        {
          icon:() => <FaEdit style={{color:"blue"}} size={24}/>,
          tooltip: 'update info',
          position:'row',
          onClick: (evt, Data) => {
            setUpdate(true)
            dispatch(cityActions.setUpdateData(Data))
            dispatch(cityActions.setModal(true))

          }
        },
      ]}

    />
  </Card.Body>
        </Card>
        </Col>
         </Row>
  
        </React.Fragment>
  )
}





