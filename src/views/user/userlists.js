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
import ResetForm from './resetform'
export default function UserList() {
  const tabledata=useSelector(state=>state.userlist.tableData)
  const data=tabledata.map(o => ({ ...o }));
  const fetched=useSelector(state=>state.userlist.updated)
  const dispatch=useDispatch()
  const addActionRef = React.useRef();
  const profile=useSelector(state=>state.userinfo)
  const [id,setResetId]=useState()
console.log(profile)
let lookups
let cols
let actions
if(profile.role===role.SUPERADMIN)
{
lookups={ "admin": 'Admin', "casher": 'Casher', "agent": 'Agent', "driver": 'Driver',"redat":"Redat"}
cols=  [
{title: "id", field: "_id",hidden:true},
{ title: 'First Name', field: 'firstName'},
{ title: 'Last Name', field: 'lastName'},
{ title: 'Phone', field: 'phoneNumber',editable:"never"},
{ title: 'User Role', field: 'userRole',lookup:lookups },
{ title: 'Gender', field: 'gender',lookup: { "male": 'Male', "female": 'Female'}},
{ title: 'Status', field: 'isActive',lookup: { true: 'Active', false: 'Not Active'}},
]
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
cols=  [
  {title: "id", field: "_id",hidden:true},
  { title: 'First Name', field: 'firstName'},
  { title: 'Last Name', field: 'lastName'},
  { title: 'Phone', field: 'phoneNumber',editable:"never"},
  { title: 'User Role', field: 'userRole',lookup:lookups },
  { title: 'Gender', field: 'gender',lookup: { "male": 'Male', "female": 'Female'}},
  { title: 'Status', field: 'isActive',lookup: { true: 'Active', false: 'Not Active'}},
  ]
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
  cols=  [
    {title: "id", field: "_id",hidden:true},
    { title: 'First Name', field: 'firstName',editable:"never"},
    { title: 'Last Name', field: 'lastName',editable:"never"},
    { title: 'Phone', field: 'phoneNumber',editable:"never"},
    { title: 'User Role', field: 'userRole',lookup:lookups,editable:"never"},
    { title: 'Gender', field: 'gender',lookup: { "male": 'Male', "female": 'Female'},editable:"never"},
    { title: 'Status', field: 'isActive',lookup: { true: 'Active', false: 'Not Active'}},
    ]
    actions=[]
}
  useEffect(()=>{
dispatch(getUser())
return ()=>{
  dispatch(errorActions.Message(''))
}
  },[fetched])
  const [columns, setColumns] = useState(cols);
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
      title="User List"
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
        </React.Fragment>
  )
}

