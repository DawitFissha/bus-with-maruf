import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell ,{tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import{styled} from '@mui/material/styles'
import DialogRenderer from '../../../../Components/dialog/dialogRenderer'
import Checkbox from '@mui/material/Checkbox';
import {AddNewStation} from './addStationForm'
// import {useGetUserByIdQuery} from '../../../api/apiSlice'
// import UserService from '../../../../services/user.service'
interface stationHeaderProps {
  dialogClose?:()=>void
}

// const stationList= [
//         {id:"0",description: 'Garment Station', location: 'Haile Garment A.A', responsiblePerson: 'Dawit Fissha',isActive:true,contactNumber:'0922435678'},
//         {id:"1",description: 'Shola Staion', location: 'Shola A.A', responsiblePerson: 'Maruf Belete',isActive:false,contactNumber:'0922435678'},
//         {id:"2",description: 'Fitche Branch', location: 'kebele-05 Fitche', responsiblePerson: 'Melaku Ayalew',isActive:true,contactNumber:'0922435678'},
//       ]

      const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: 'black',
          color: theme.palette.common.white,
          fontSize: 16,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
export default function StationList(props:{stationList:any[]}) {
  const {stationList} = props
  const [openEditDialog,setOpenEditDialog] = React.useState(false)
  const [branchSelected,setBranchSelected] = React.useState(false)
  const [userName,setUserName] = React.useState()
  // const [userId,setUserId] = React.useState("")
  // const getResponsiblePersonUserName = async (id:string)=>{
  // const user = await  UserService.getUsersById(id)
  // return  await user.data[0].firstName
  // }
  const closeEditDialog = () => {
    setOpenEditDialog(false)
  }

  const [stationId,setStationId] = React.useState<string|null>(null)
  const handleStationEdit = (id:string)=>{
    setOpenEditDialog(true)
    setStationId(id)
  }
  const handleBranchSelectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   setBranchSelected(event.target.checked,)
  };
  const stationToEdit = stationList?.find(station=>station.id===stationId)
  // React.useEffect(()=>{
  //   const {data:user=[]} = useGetUserByIdQuery(userId)
  //   setUserName(`${user[0]?.firstName} ${user[0]?.lastName}`)
  // },[])
  // console.log(getResponsiblePersonUserName('6210dbdba4368b3c88da8419'))
return (
  <>
      {
        <div>

        {
          
          stationList?.length>0?(
            <Paper sx={{overflow:'hidden',width:'100%'}}>
                 <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
          <StyledTableCell></StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>Location</StyledTableCell>
            <StyledTableCell >Responsible Person</StyledTableCell>
            <StyledTableCell >Contact Number</StyledTableCell>
            <StyledTableCell >Is Active</StyledTableCell>
            {/* <StyledTableCell >Actions</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {stationList?.map((station:any) => (
           
            <StyledTableRow
            key={station.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            onDoubleClick={()=>handleStationEdit(station.id)}
          >
               <StyledTableCell component="th" scope="row">
              {/* <FormGroup> */}
                <Checkbox checked={branchSelected} onChange={handleBranchSelectionChange}/>
              {/* </FormGroup> */}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
              {station?.description}
            </StyledTableCell>
            <StyledTableCell>{station?.location}</StyledTableCell>
            <StyledTableCell>
              {station?.responsiblePerson}
              {/* {getResponsiblePersonUserName('6210dbdba4368b3c88da8419')} */}
            </StyledTableCell>
            <StyledTableCell>{station?.contactInfo}</StyledTableCell>
            <StyledTableCell>
              <Checkbox disabled defaultChecked = {station.isActive}/>
            </StyledTableCell>

          </StyledTableRow>
           
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </Paper>
          ):<h3>No registered stations yet</h3>
        }
      </div>

      }
           <DialogRenderer open = {openEditDialog} handleClose = {closeEditDialog} title="Edit Station">
            <AddNewStation 
            providedDescription={stationToEdit?.description}
            providedLocation = {stationToEdit?.location}
            providedResponsiblePerson={stationToEdit?.responsiblePerson}
            providedisActive = {stationToEdit?.isActive}
            providedContactNubmer = {stationToEdit?.contactNumber}
            isEdit={openEditDialog}
            closeOnSave={closeEditDialog}
            />
          </DialogRenderer>
  </>
  );
  
  }
