import React,{useState,useRef,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable,{ MTableAction,MTableEditField} from "material-table";
import {tableIcons} from '../Table/Tableicon'
import { getRoute,deleteRoute, getActiveBus} from '../../store/routeHttp';
import { useSelector,useDispatch } from 'react-redux';
import {role} from "../../role"
import { getAllCity } from '../../store/scheduleHttp';
import { errorActions } from '../../store/error-slice';
import {RiBusWifiFill} from "react-icons/ri"
import { routeActions } from '../../store/route-slice';
import { SaveSuccessfull } from '../../Components/common-registration-form/saveSuccess';
import AssignBus from "./assignbus"
import { useGetRouteQuery,useUpdateRouteMutation,useGetActiveBusQuery,useGetAllCityQuery} from '../../store/bus_api';
export default function RouteList() {
  // const tabledata=useSelector(state=>state.route.tableData)
  const busdata=useSelector(state=>state.route.busData)
  const citydata=useSelector(state=>state.schedule.cityData)
  // const data=tabledata?.map(o => ({ ...o }));
  // const activebus=busdata?.map(o => ({ ...o }));
  // const cityData=citydata?.map(o => ({ ...o }));
  // const fetched=useSelector(state=>state.route.updated)
  const [cityLooks,setCityLooks] =useState({})
  const [info,setInfo]=useState({})
  const [isClicked,setIsClicked]=useState(false)
  // const message=useSelector(state=>state.message.errMessage)

  const {data,error,isLoading,isFetching,isSuccess,refetch}=useGetRouteQuery()
  const {data:cityData}=useGetAllCityQuery()
  const [updateRoute,{data:userData,isLoading:isLoadingu,isError,error:erroru,isSuccess:isSuccessu}]=useUpdateRouteMutation()

  const dispatch=useDispatch()
  // useEffect(()=>{
  //   // dispatch(getRoute())
  //   // dispatch(getActiveBus())
  //   // dispatch(getAllCity())
  //   return ()=>{
  //     dispatch(errorActions.Message(''))
  //   }
  //     },[fetched])
      useEffect(()=>{
     
    const citylooks = cityData?.reduce(function(acc, cur, i) {
      acc[cur.cityName] = cur.cityName;
      return acc;
      }, {});
      setCityLooks(citylooks)
      },[citydata])
      // useEffect(()=>{
      //   message==='route-bus-place'&&setSaveStatus(true)
      //   return ()=>{
      //   dispatch(errorActions.Message(''))
      //   }
      // },[message])
   
  return (
    <React.Fragment>
     {isClicked&& <AssignBus info={info}/>}
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Manage Route</Card.Title>
                        </Card.Header>
                        <Card.Body>
                        <MaterialTable
                        style={{zIndex:0,fontSize:'15px'}}
                         components={{
                          Container: props => <div {...props} elevation={0}/>,
                        
                     }}
      responsive
      title="Route List"
      columns={[
        {title: "id", field: "_id",hidden:true},
        { title: 'Source', field: 'source',lookup:cityLooks,editable:"never"},
        { title: 'Destination', field: 'destination',lookup:cityLooks,editable:"never"},
        { title: 'Assigned Bus', field: 'bus',render:(Data)=>Data.bus&&Data.busName?.map(e=>e.busPlateNo)?.join(),editable:'never'},
        { title: 'Dep.Place', field: 'departurePlace',render:(Data)=>Data.departurePlace&&Data.departurePlace?.join(),editable:'never'},
        { title: 'Tarif In Birr', field: 'tarif'},
        { title: 'Estimated Hour', field: 'estimatedHour'},
        { title: 'Distance', field: 'distance'},
        { title: 'Status', field: 'isActive',lookup: { true: 'Active', false: 'Not Active'}},

      ]}
      data={data?.map(o => ({ ...o }))}
      icons={tableIcons}
      options={{
        search:false,
        maxBodyHeight: '550px',
        rowStyle:  (rowData, i) => {
          if (i % 2) {
              return {backgroundColor: "#F5F5F5"}
          }
      },
      headerStyle: {
        zIndex: "1",backgroundColor:"#FE7C7C",color:"white",fontSize:"16px",margin:'0px',padding:'10px 2px'
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
       }
}}
actions={[
  {
    icon:() => <RiBusWifiFill color="brown"/>,
    tooltip: 'Update Bus Info',
    position:'row',
    onClick: (evt, Data) => {
      setInfo(Data)
      setIsClicked(true)
      dispatch(errorActions.Message(''))
      dispatch(routeActions.setModal(true))

    }
  }]}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            updateRoute({id:oldData._id,...newData})
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

