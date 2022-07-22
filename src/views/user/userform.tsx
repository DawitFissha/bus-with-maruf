import React,{useState} from 'react';
import { useFormik } from 'formik';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import {useAppDispatch,useAppSelector} from '../../app/hooks'
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import {roles} from '../../utils/Constants/roles'
import {RegistrationHeader} from '../../Components/common-registration-form/registrationHeader'
import {SavingProgress} from '../../Components/common-registration-form/savingProgress'
import {SaveSuccessfull} from '../../Components/common-registration-form/saveSuccess'
import {FormWrapper} from '../../Components/common-registration-form/formWrapper'
import PersonIcon from '@mui/icons-material/Person';
import InputAdornment from '@mui/material/InputAdornment';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PasswordIcon from '@mui/icons-material/Password';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import {ValidatePhoneNumber} from '../../utils/regex-validators'
import {addUsers} from './userSlice'
import Alert from '@mui/material/Alert'
import { fetchDrivers,resetDriver} from './driverSlice';
import { fetchRedats,resetRedat} from './redatSlice';
import useError from '../../utils/hooks/useError'
import {ValidateTextFields} from '../../utils/regex-validators'
import useSmallScreen from '../../utils/hooks/useSmallScreen';
import RegistrationParent from '../../Components/common-registration-form/registrationParent'
interface USER_TYPE {
  firstName:string
  lastName:string,
  phoneNumber:string,
  password:string,
  confirmPassword:string,
}
const validate = (values:USER_TYPE) => {
    const errors:Partial<USER_TYPE> = {};
    if (!values.firstName) {
      errors.firstName = 'First name is Required';
    } 
    
    if (values.firstName.length > 15) {
      errors.firstName = 'Must be 15 characters or less';
    }
     if (!ValidateTextFields(values.firstName)){
      errors.firstName = "Please Enter a valid first name"
    }

    if (!values.lastName) {
      errors.lastName = 'Required';
    }
      if (values.lastName.length > 20) {
      errors.lastName = 'Must be 20 characters or less';
    }
    if (!ValidateTextFields(values.lastName)){
      errors.lastName = "Please Enter a valid last name"
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Required';
    }
     else if (values.phoneNumber.length>10) {
      errors.phoneNumber = "Phone Number Can't Excede 10 digits";
    }
    else if(!ValidatePhoneNumber(values.phoneNumber)) {
      errors.phoneNumber = "Invalid Phone Number";
    }
    if(!values.password){
        errors.password = 'Required';
    }
    if(!values.confirmPassword){
        errors.confirmPassword = 'Required'
    }
    else if(values.confirmPassword !== values.password){
        errors.confirmPassword = 'Password do not match'
    }
  
    return errors;
  };

export default function UserRegistration({providedRole,DialogClose}:{providedRole?:string,DialogClose?:()=>void}) {

const [open,setOpen] = useState(false)
const [gender,setGender] = useState('')
const providedRoleDescription  = roles.find((role)=>role.id===providedRole)?.description 
const [roleItem,setRoleItem] = useState(providedRole?providedRoleDescription:'')
const roleId = roles.find((role)=>role.description===roleItem)?.id as string 
const [genderError,genderErrorText,setGenderError,setGenderErrorText] = useError()
const [roleError,roleErrorText,setRoleError,setRoleErrorText] = useError()
const [loading, setLoading] = React.useState(false);
const [adduserError,setAddUserError] = useState('')
const dispatch = useAppDispatch();
const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};
const handleGenderChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setGender((e.target as HTMLInputElement).value)
    setGenderErrorText('')
    setGenderError(false)
}
const handleRoleChange = (e:SelectChangeEvent)=>{
  setRoleItem(e.target.value)
  setRoleErrorText('')
  setRoleError(false)
}
const smallScreen = useSmallScreen()

React.useEffect(()=>{
    document.title +=` - User Registration`
  },[])

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber:'',
      password:'',
      confirmPassword:''
    },
    validate,
    onSubmit: async (values,{resetForm}) => {
     
        // else {
      
          if(!loading){

            if(gender==='') {
              setGenderError(true)
              setGenderErrorText('Please Select Gender')
            }
            else if(roleItem === ''){
              setRoleError(true)
              setRoleErrorText('Please Choose A Role')

            }
            else {

              setLoading(true)
              
            try {
              await dispatch(addUsers(
                {
                  firstname:values.firstName,
                  lastname:values.lastName,
                  gender,
                  phonenumber:values.phoneNumber,
                  userrole:providedRole?providedRole:roleId,  
                  password:values.password,
                  confirmpassword:values.confirmPassword,
                }
              )).unwrap()

              

              resetForm({values:{
                firstName: '',
                lastName: '',
                phoneNumber:'',
                password:'',
                confirmPassword:''
              }})
             
              setGender('')
              setRoleItem('')
              setOpen(true)
            if(providedRole){

              if(providedRole === 'driver'){
                dispatch(resetDriver())
                dispatch(fetchDrivers())
              }
              else if (providedRole === 'redat'){
                dispatch(resetRedat())
                dispatch(fetchRedats())
              }
            }
            if(DialogClose){
                DialogClose()
              }
          
            }
            catch (err:any) {
              console.log(err.message)
              const resMessage =
              (err.response &&
                err.response.data &&
                err.response.data.message) ||
                err.message ||
                err.toString();
                setAddUserError(resMessage)
            }
            finally {
              setLoading(false)
            }
            }
            
          }
         
        
    },
  });

  return (
 <RegistrationParent customeCondition = {Boolean(providedRole)}>
    <SavingProgress loading={loading}/>
        <Box sx={{
           display:'flex',
           flexDirection:'column',
            ml:providedRole? 0 : 1,
            mr:providedRole? 0 : 1
       }}>
           <FormWrapper>
           {providedRole?null:<RegistrationHeader description = 'Register Users' />}
           </FormWrapper>
      <form onSubmit={formik.handleSubmit}>
   
           <FormWrapper>

           <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="first Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          InputProps = {{
            startAdornment:(
            <InputAdornment position="start">
                <PersonIcon fontSize="large" color="primary"/>
            </InputAdornment>
            )
        }}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
           </FormWrapper>
        
            <FormWrapper>
            <TextField
            
          fullWidth
          id="lastName"
          name="lastName"
          label="last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          InputProps = {{
            startAdornment:(
            <InputAdornment position="start">
                <PersonIcon fontSize="large" color="primary"/>
            </InputAdornment>
            )
        }}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
            </FormWrapper>
            <FormWrapper>
            <FormControl variant="standard" error = {genderError}>
            <FormLabel id="gender-label">Gender</FormLabel>
            <RadioGroup
                value ={gender}
                onChange = {handleGenderChange}
                 row
                 aria-labelledby="gender-radio-buttons-group-label"
                 name="gender-radio-buttons-group"
      >
        <FormControlLabel value="male" control={<Radio />} label="Female" />
        <FormControlLabel value="female" control={<Radio />} label="Male" />
        </RadioGroup>
        <FormHelperText >{genderErrorText}</FormHelperText>
            </FormControl>
            
            </FormWrapper>
        
            <FormWrapper>
            <TextField
            fullWidth
          id="phoneNumber"
          name="phoneNumber"
          label="Phone Number"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          InputProps = {{
            startAdornment:(
            <InputAdornment position="start">
                <LocalPhoneIcon fontSize="large" color="primary"/>
            </InputAdornment>
            )
        }}
          error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
        />
            </FormWrapper>
            <FormWrapper>
            <FormControl error={roleError} sx={{width: '100%' }}>
            <InputLabel id="role-select-helper-label">Role</InputLabel>
        <Select
          disabled = {Boolean(providedRole)}
          labelId="role-select-helper-label"
          id="role-select-helper"
          value={roleItem}
          label="Role"
          onChange={handleRoleChange}
          startAdornment = {<WorkspacesIcon color="primary" fontSize="large"/>}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
          
          roles.map((role)=>(
            <MenuItem  key = {role.id} value={role.description}>{role.description}</MenuItem>
          ))
          }
        </Select>
        <FormHelperText >{roleErrorText}</FormHelperText>
        </FormControl>
            </FormWrapper>
        
        <FormWrapper>
        <TextField
          fullWidth
          id="password"
          name="password"
          label="password"
          type='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          InputProps = {{
            startAdornment:(
            <InputAdornment position="start">
                <PasswordIcon fontSize="large" color="primary"/>
            </InputAdornment>
            )
        }}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        </FormWrapper>
       
        <FormWrapper>
        <TextField
         sx={{marginTop:'10px'}}
          fullWidth
          type='password'
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          InputProps = {{
            startAdornment:(
            <InputAdornment position="start">
                <PasswordIcon fontSize="large" color="primary"/>
            </InputAdornment>
            )
        }}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />
        </FormWrapper>
            <FormWrapper>
            <Button  
            type="submit"
            disabled = {loading}
            color="primary" variant="contained" >
          Save
        </Button>
            </FormWrapper>
            <SaveSuccessfull open={open} handleClose={handleClose} message = 'User Successfully Registered' />
      </form>
      {adduserError&&(<FormWrapper>
            <Alert sx ={{width:'450px',fontSize:"medium"}} severity="error">
            <strong>{adduserError}</strong> , Please try again
            </Alert>
            </FormWrapper>)}
      </Box>
      </RegistrationParent>
  );
};


