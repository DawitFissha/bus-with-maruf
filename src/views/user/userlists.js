import React,{useState,useRef,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable,{ MTableAction} from "material-table";
import {tableIcons} from '../Table/Tableicon'
import { getUser, updateUser} from '../../store/userHttp';
import { useSelector,useDispatch } from 'react-redux';
import {RiLockUnlockLine} from "react-icons/ri";
import {role} from "../../role"
import { userActions } from '../../store/user-slice';
import { errorActions } from '../../store/error-slice';
import { SaveSuccessfull } from '../../Components/saveSuccess';

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
let cols
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
                         components={{
                          Container: props => <div {...props} elevation={0}/>,
                          Action: props => {
                            //If isn't the add action
                            if (typeof props.action === typeof Function || props.action.tooltip !== 'Add') {
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
      { title: 'First Name', field: 'firstName',editable:"never"},
      { title: 'Last Name', field: 'lastName',editable:"never"},
      { title: 'Phone', field: 'phoneNumber',editable:"never"},
      { title: 'User Role', field: 'userRole',lookup:lookups,editable:"never"},
      { title: 'Gender', field: 'gender',lookup: { "male": 'Male', "female": 'Female'},editable:"never"},
      { title: 'Status', field: 'isActive',lookup: { true: 'Active', false: 'Not Active'}}]}
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

