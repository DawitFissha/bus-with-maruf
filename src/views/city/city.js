import React,{useState,useRef,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable,{ MTableAction} from "material-table";
import {tableIcons} from '../Table/Tableicon'
import { useSelector,useDispatch } from 'react-redux';
import {cityActions} from '../../store/city-slice'
import {MdAddLocationAlt,} from 'react-icons/md'
import {FaEdit} from "react-icons/fa";
import CityForm from "./cityform"
import { getCity } from '../../store/cityHttp';
import { SaveSuccessfull } from '../../Components/common-registration-form/saveSuccess';
import { errorActions } from '../../store/error-slice';

export default function Location() {
  const tabledata=useSelector(state=>state.city.tableData)
  const message=useSelector(state=>state.message.errMessage)
  const data=tabledata.map(o => ({ ...o }));
  const [update,setUpdate]=useState(false)
  console.log(data)
  const fetched=useSelector(state=>state.city.updated)
  const dispatch=useDispatch()
  useEffect(()=>{
  dispatch(getCity())
  return ()=>{
    dispatch(errorActions.Message(''))
  }
  },[fetched])
  useEffect(()=>{
    message==='city'&&setSaveStatus(true)
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
                        style={{zIndex:0,fontSize:'15px'}}
                         components={{
                          Container: props => <div {...props} elevation={0}/>,
                     }}
                         responsive
      title="Manage City & departure Place"
      columns={[
        {title: "id", field: "_id", hidden: true},
        { title: 'City', field: 'cityName'},
        { title: 'Departure Plcae', field: 'departurePlace',render:Data=>Data?.departurePlace?.join()},
      ]}
      data={data}
      icons={tableIcons}
      options={{
        search:false,
        maxBodyHeight: '550px',
        rowStyle:  (rowData, i) => {
          if (i % 2) {
              return {backgroundColor: "#f2f2f2"}
          }
      },
      headerStyle: {
        zIndex: "1",backgroundColor:"#FE7C7C",color:"white",fontSize:"16px",margin:'0px',padding:'10px 2px'
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
            dispatch(errorActions.Message(''))
            dispatch(cityActions.setModal(true))

          }
        },
        {
          icon:() => <FaEdit style={{color:"blue"}} size={24}/>,
          tooltip: 'update info',
          position:'row',
          onClick: (evt, Data) => {
            console.log(Data)
            setUpdate(true)
            dispatch(errorActions.Message(''))
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
         {!update&&<SaveSuccessfull open={saveStatus} handleClose={handleSaveStatusClose} message = 'City Added Successfully' />}
         {update&&<SaveSuccessfull open={saveStatus} handleClose={handleSaveStatusClose} message = 'City Info Updated' />}
        </React.Fragment>
  )
}





