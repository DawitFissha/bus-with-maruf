import React,{useState,useRef,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable,{ MTableAction,MTableEditField} from "material-table";
import {tableIcons} from '../Table/Tableicon'
import { useDispatch } from 'react-redux';
import {RiBusWifiFill} from "react-icons/ri"
import { modalActions } from '../../store/modal-slice';
import AssignBus from "./assignbus"
import { useGetRouteQuery,useUpdateRouteMutation,useGetActiveBusQuery,useGetAllCityQuery} from '../../store/bus_api';
export default function RouteList() {
  const [cityLooks,setCityLooks] =useState({})
  const [info,setInfo]=useState({})
  const [isClicked,setIsClicked]=useState(false)
  const {data,error,isLoading,isFetching,isSuccess,refetch}=useGetRouteQuery()
  const {data:cityData,isSuccess:isSuccessc}=useGetAllCityQuery()
  const [updateRoute,{data:userData,isLoading:isLoadingu,isError,error:erroru,isSuccess:isSuccessu}]=useUpdateRouteMutation()

  const dispatch=useDispatch()
  useEffect(()=>{
    if(isSuccessc){
    const citylooks = cityData?.reduce(function(acc, cur, i) {
      acc[cur.cityName] = cur.cityName;
      return acc;
      }, {});
      setCityLooks(citylooks)
    }
      },[isSuccessc])
   console.log(cityLooks)
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
                        style={{zIndex:0,fontSize:'14px'}}
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
        exportAllData:true,
        grouping:true,
        search:false,
        maxBodyHeight: '550px',
        rowStyle:  (rowData, i) => {
          if (i % 2) {
              return {backgroundColor: "#F5F5F5"}
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
      dispatch(modalActions.setRouteModal(true))

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

