import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import {FormWrapper} from '../../../../Components/formWrapper'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import {useFormik} from 'formik'
import Select, {SelectChangeEvent} from '@mui/material/Select'
import StationList from './stationList'
import Checkbox from '@mui/material/Checkbox';
import { ListItemText } from '@mui/material'
// import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import {useGetUsersByRoleQuery,useUpdateOrganizationMutation,
  useGetLoggedInOrganizationQuery} from '../../../../store/bus_api'
import { LoadingButton } from '@mui/lab'
interface SalesStationProps {
  providedDescription?:string
  providedLocation?:string
  providedResponsiblePerson?:string
  providedisActive?:boolean
  providedContactNubmer?:string;
  closeOnSave:()=>void
  isEdit?:boolean;
  
}
interface stationFormType{
  description:string;
  location:string;
  contactNumber:string;
}
const validate = (values:stationFormType) => {
  const errors:Partial<stationFormType> = {}
  if (!values.description) {
    errors.description = 'This filed is required';
  } 
 
   if(!values.location){
    errors.location =  'This filed is required';
  }
  if(!values.contactNumber){
    errors.contactNumber =  'This filed is required';
  }
  return errors;
};
export const AddNewStation = (props:SalesStationProps)=>{
const {  providedDescription,
         providedLocation,
         providedResponsiblePerson,
         providedContactNubmer,
         providedisActive,
         isEdit,
         closeOnSave,
} = props
//

//redux
const {data:users,isLoading:usersLoading} = useGetUsersByRoleQuery('admin')
const [addBranch,{isLoading:isAdding}]=useUpdateOrganizationMutation()
const {data}=useGetLoggedInOrganizationQuery()
const loggedInOrganizationId = data?._id
//local states
    const [responsiblePerson, setResponsiblePerson] = React.useState(providedResponsiblePerson?providedResponsiblePerson:'');
    const [active,setActive] = React.useState<boolean>(typeof providedisActive==='boolean'?providedisActive:true)
    const handleActiveChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
      setActive(event.target.checked);
    };
  
    const handleResponsiblePersonChange = (event: SelectChangeEvent) => {
      setResponsiblePerson(event.target.value);
    };

  const formik = useFormik({
    initialValues:{
      description:providedDescription?providedDescription:'',
      location:providedLocation?providedLocation:'',
      contactNumber:providedContactNubmer?providedContactNubmer:'',
    },
    validate,
    onSubmit:async (values,{resetForm})=>{
      try {
        await addBranch({
          loggedInOrganizationId,
          branch:{
            
            description:values.description,
            location:values.location,
            responsiblePerson:responsiblePerson,
            contactInfo:values.contactNumber,
          }
        }).unwrap()
        resetForm({values:{
          description: "",
          location:"",
          contactNumber:"",
        }})
      }
      
      catch {
          console.log('some error occured')
      }
      closeOnSave()
      console.log('submited')
      resetForm({values:{
            description: "",
             location:"",
             contactNumber:"",
           }})
    }
  })
  console.log(responsiblePerson)
    return (
   
        <Box
   sx={{
       display:'flex',
       flexDirection:'column',
       ml:1,mr:1
   }}
   >
   
       <form onSubmit={formik.handleSubmit}>
       <FormWrapper>
       <TextField
       id="description"
       name="description"
       label="Description"
       value={formik.values.description}
       onChange = {formik.handleChange}
       error={formik.touched.description && Boolean(formik.errors.description)}
       helperText={formik.touched.description && formik.errors.description}

 />
       </FormWrapper>

       <FormWrapper>
       <TextField
   
   id="location"
   name="location"
   label="Location"
   value={formik.values.location}
   onChange = {formik.handleChange}
   error={formik.touched.location && Boolean(formik.errors.location)}
   helperText={formik.touched.location && formik.errors.location}
/>
       </FormWrapper>
            <FormWrapper>
                <FormControl sx={{width: "100%" }}>
          <InputLabel >Responsible Person</InputLabel>
      <Select
        name="responsiblePerson"
        label="Responsible Person"
        value = {responsiblePerson}
        onChange={handleResponsiblePersonChange}
      >
        <MenuItem value="">
        <em>None</em>
        </MenuItem>
        {
        users?
        users.map((user:any)=>(
          <MenuItem divider = {true} key = {user._id} value={user._id}>
            <ListItemText primary = {`${user.firstName} ${user.lastName}`}/>
          </MenuItem>
        ))
        :null
        }
        
      </Select>
      {/* {redatError && (<FormHelperText sx={{color:'red'}}>{redatErrorMessage}</FormHelperText>)} */}
      </FormControl>
      </FormWrapper>
      <FormWrapper>
          <TextField
      
          id="contactNumber"
          name="contactNumber"
          label="Contact Number"
          value={formik.values.contactNumber}
          onChange = {formik.handleChange}
          error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
          helperText={formik.touched.contactNumber && formik.errors.contactNumber}
    />
      </FormWrapper>
            
            <FormWrapper>
              <p style={{display:'inline'}}>is Active</p>
              <Checkbox
              onChange={handleActiveChecked}
              checked={active}
              />
            </FormWrapper>
          <FormWrapper>
            <LoadingButton
            fullWidth
            loading={isAdding}
            type="submit"
            >
              {
                isEdit?'Update':'Save'
              }
            </LoadingButton>
          </FormWrapper>
       </form>
   </Box> 
)
}
