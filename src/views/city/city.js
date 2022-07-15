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
import { SaveSuccessfull } from '../../Components/saveSuccess';
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
  const [columns, setColumns] = useState([
    {title: "id", field: "_id", hidden: true},
    { title: 'City', field: 'cityName'},
    { title: 'Departure Plcae', field: 'departurePlace',render:Data=>Data?.departurePlace?.join()},
  ]);

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
                         components={{
                          Container: props => <div {...props} elevation={0}/>,
                     }}
                         responsive
      title="Manage City & departure Place"
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
        exportDelimiter:true,
        pageSize:10,
        columnsButton:true,
        filtering:true,
      }}
      actions={[
        {
          icon:() => <MdAddLocationAlt size={25}/>,
          tooltip: 'Add new city',
          position:'toolbar',
          onClick: (evt, Data) => {
            console.log("clicked")
            setUpdate(false)
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
         {update&&<SaveSuccessfull open={saveStatus} handleClose={handleSaveStatusClose} message = 'City Info Changed' />}
        </React.Fragment>
  )
}





