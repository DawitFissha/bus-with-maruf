import React,{useState,useRef,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable,{ MTableAction} from "material-table";
import {tableIcons} from '../Table/Tableicon'
import { getUser, updateUser} from '../../store/userHttp';
import { useSelector,useDispatch } from 'react-redux';
import {RiLockUnlockLine} from "react-icons/ri";
import {role} from "../../role"
import axios_instance from '../../services/lib-config';
import { userActions } from '../../store/user-slice';
import { errorActions } from '../../store/error-slice';
import { SaveSuccessfull } from '../../Components/common-registration-form/saveSuccess';
import ResetForm from './resetform'
export default function UserList() {
  const tabledata=useSelector(state=>state.userlist.tableData)
  const data=tabledata.map(o => ({ ...o }));
  const fetched=useSelector(state=>state.userlist.updated)
  const dispatch=useDispatch()
  const addActionRef = React.useRef();
  const profile=useSelector(state=>state.userinfo)
  const [id,setResetId]=useState()
  const [saveStatus,setSaveStatus] =useState(false)

console.log(profile)
let lookups
let actions
if(profile.role===role.SUPERADMIN)
{
lookups={ "admin": 'Admin', "casher": 'Casher', "agent": 'Agent', "driver": 'Driver',"redat":"Redat"}
actions=[
  (rowData) => ({
    icon:() => <RiLockUnlockLine />,
    tooltip: 'Reset Password',
    position:'row',
    disabled:rowData.userRole==="redat",
    onClick: (evt, Data) => {
      setResetId(Data._id)
      dispatch(userActions.setModal(true))
    }
  }),
]
}
if(profile.role===role.ADMIN)
{
  lookups={ "casher": 'Casher', "agent": 'Agent', "driver": 'Driver',"redat":"Redat"}
  actions=[
    (rowData) => ({
      icon:() => <RiLockUnlockLine />,
      tooltip: 'Reset Password',
      position:'row',
      disabled:rowData.userRole==="redat",
      onClick: (evt, Data) => {
        dispatch(userActions.setModal(true))
      }
    }),
  ]
}
if(profile.role===role.CASHER)
{
  lookups={"driver": 'Driver',"redat":"Redat"}
  actions=[]
}
  useEffect(()=>{
dispatch(getUser())
return ()=>{
  dispatch(errorActions.Message(''))
}
  },[fetched])
  const message=useSelector(state=>state.message.errMessage)
  useEffect(()=>{
    message==="password reset"&&setSaveStatus(true)
      },[message])
  const handleSaveStatusClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSaveStatus(false);
    };
  return (
    <React.Fragment>
      <ResetForm id={id}/>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Manage Users</Card.Title>
                        </Card.Header>
                        <Card.Body>
                        <MaterialTable
                          style={{zIndex:0,fontSize:'15px'}}
                         components={{
                          Container: props => <div {...props} elevation={0}/>,
                          Action: props => {
                            //If isn't the add action
                            if (typeof props.action === typeof Function || props.action.tooltip !== 'Edit') {
                                  return <MTableAction {...props} />
                            } 
                            else {
                                  return <div ref={addActionRef} onClick={props.action.onClick}/>;
                            }
                          }
                     }}
                         responsive
      title="User List"
      columns={[
      {title: "id", field: "_id",hidden:true},
      { title: 'First Name', field: 'firstName',editable:(_,rowData)=>rowData&&profile.role!==role.CASHER},
      { title: 'Last Name', field: 'lastName',editable:(_,rowData)=>rowData&&profile.role!==role.CASHER},
      { title: 'Phone', field: 'phoneNumber',editable:(_,rowData)=>rowData&&profile.role!==role.CASHER},
      { title: 'User Role', field: 'userRole',lookup:lookups,editable:(_,rowData)=>rowData&&profile.role!==role.CASHER},
      { title: 'Gender', field: 'gender',lookup: { "male": 'Male', "female": 'Female'},editable:(_,rowData)=>rowData&&profile.role!==role.CASHER},
      { title: 'Assigned', field: 'isAssigned',editable: ( _ ,rowData ) => rowData && rowData.isAssigned==="2",type:"date",lookup:{"2":"Assigned","1":"Unassigned"}},
      { title: 'Status', field: 'isActive',lookup: { true: 'Active', false: 'Not Active'}}]}
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
        filtering:true,
        pageSize:10,
        columnsButton:true,
       
      }}
      localization={{
        body: {
          editTooltip: 'Edit Bus Info',
          deleteTooltip: 'Delete Bus',
       }
}}
actions={actions}
editable={{
  onRowUpdate: (newData, oldData) =>
    new Promise((resolve, reject) => {
        dispatch(updateUser(oldData._id,newData,resolve))
    })
}}
    />
  </Card.Body>
        </Card>
        </Col>
         </Row>
         <SaveSuccessfull open={saveStatus} handleClose={handleSaveStatusClose} message = 'Password Reseted' />
        </React.Fragment>
  )
}

