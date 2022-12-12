import React,{useState} from 'react';
import { useFormik } from 'formik';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
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
import Alert from '@mui/material/Alert'
import useError from '../../utils/hooks/useError'
import {ValidateTextFields} from '../../utils/regex-validators'
import RegistrationParent from '../../Components/common-registration-form/registrationParent'
// import DisplayFormError from '../../Components/common-registration-form/formError'
import {useAddNewUserMutation,useGetLoggedInOrganizationQuery,
  useGetAgentsWithNoAccountQuery} from '../../store/bus_api'
import Grid from '@mui/material/Grid'
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import ListItemText from '@mui/material/ListItemText'
interface USER_TYPE {
  firstName:string
  lastName:string,
  phoneNumber:string,
  password:string,
  confirmPassword:string,
}

//validator function for formik fields
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
// states from redux
const {data:agents,isLoading:agentsLoading}= useGetAgentsWithNoAccountQuery()
const [addNewUser,{error}] = useAddNewUserMutation()
const {data:Orgn={},isLoading:branchesLoading}= useGetLoggedInOrganizationQuery()
const branches = Orgn?.branch
//local states
const [open,setOpen] = useState(false)
const [gender,setGender] = useState('')
const providedRoleDescription  = roles.find((role)=>role.id===providedRole)?.description 
const [role,setRole] = useState(providedRole?providedRoleDescription:'')
const [genderError,genderErrorText,setGenderError,setGenderErrorText] = useError()
const [branchError,branchErrorText,setBranchError,setBranchErrorText] = useError()
const [roleError,roleErrorText,setRoleError,setRoleErrorText] = useError()
const [userServerErrorOccured,userServerErrorMessage,setUserServerErrorOccured,setUserServerErrorMessage] = useError()
const [branchOrAgent,setBranchOrAgent] = React.useState('')
const [loading, setLoading] = React.useState(false);

// const [adduserError,setAddUserError] = useState('')

const [adduserErrorOccured,addUserErrorMessage,setAddUserErrorOccured,setAddUserErrorMessage] = useError()
//Handler Functions
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
  setRole(e.target.value)
  setRoleErrorText('')
  setRoleError(false)
}
const handleBranchChange = (event: SelectChangeEvent) => {
  setBranchOrAgent(event.target.value);
  setBranchErrorText('')
  setBranchError(false)
};

// formik stuff
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
            else if(role === ''){
              setRoleError(true)
              setRoleErrorText('Please Choose A Role')

            }
            else if(branchOrAgent === ''){
              setBranchError(true)
              setBranchErrorText(role==='superagent'?'Please Select Agent':'Please Select A Branch')

            }
            else {

              setLoading(true)
              
            try {
              await addNewUser(
                {
                  firstname:values.firstName,
                  lastname:values.lastName,
                  gender,
                  phonenumber:values.phoneNumber,
                  userrole:providedRole?providedRole:role,  
                  password:values.password,
                  confirmpassword:values.confirmPassword,
                  [role==='superagent'?'agentId':'branch']:branchOrAgent
                }
              ).unwrap()
              
              resetForm({values:{
                firstName: '',
                lastName: '',
                phoneNumber:'',
                password:'',
                confirmPassword:''
              }})
              setAddUserErrorOccured(false)
              setGender('')
              setRole('')
              setOpen(true)
              setBranchOrAgent('')
            if(DialogClose){
                DialogClose()
              }
          
            }
            catch (err:any) {
                setAddUserErrorOccured(true)
                setAddUserErrorMessage(`Failed to register user , ${err.data.message}`)
                 }
            finally {
              setLoading(false)
            }
            }
            
          }
         
        
    },
  });
console.log(role)
  return (
 <RegistrationParent customeCondition = {Boolean(providedRole)}>
    <SavingProgress loading={loading}/>
        <Box sx={{
           display:'flex',
           flexDirection:'column',
            ml: 1,
            mr: 1
       }}>
           <FormWrapper>
           {providedRole?null:<RegistrationHeader description = 'Register Users' />}
           </FormWrapper>
      <form onSubmit={formik.handleSubmit}>
           <Grid container>
            <Grid item xs={12}>
    <Grid display='flex' container spacing={2}  columnSpacing={5}> 
            <Grid item md={6} xs={12}>
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
            </Grid>
            
            <Grid item md={6} xs={12}>
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
            </Grid>
            
           </Grid>
           <Grid display='flex' container spacing={2}  columnSpacing={5} sx={{marginTop:2}}> 
                <Grid item md={6} xs={12}>
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
                </Grid>
                
                <Grid item md={6} xs={12}>
                <FormControl variant="standard" error = {genderError} >
            <FormLabel id="gender-label">Gender</FormLabel>
            <RadioGroup
                   value ={gender}
                   onChange = {handleGenderChange}
                   row
                   aria-labelledby="gender-radio-buttons-group-label"
                   name="gender-radio-buttons-group"
      >
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
        <FormHelperText >
            {genderErrorText}
        </FormHelperText>
            </FormControl>
            </Grid>
            </Grid>
            <Grid container spacing={2} columnSpacing={5} sx={{marginTop:2}}>
                <Grid item md={6} xs={12}>
              
            <FormControl
              error={branchError}
              sx={{width: '100%' }}
            >
            <InputLabel id="branch-select-helper-label">
            {role==='superagent'?'Agents':"Branch/Station"}
              </InputLabel>
            <Select
        name="branchOrAgent"
        label={role==='superagent'?'Agents':"Branch/Station"}
        value = {branchOrAgent}
        onChange={handleBranchChange}
        startAdornment = {
          <InputAdornment position="start">
          <CorporateFareIcon color="primary" fontSize='large'/>
          </InputAdornment>
          }
      >
        <MenuItem value="">
        <em>None</em>
        </MenuItem>
        {
        role==='superagent'?
        agents?
        agents.map((agent:any)=>(
          <MenuItem /*divider = {true} */ key = {agent._id} value={agent._id}>
            <ListItemText primary = {`${agent.agentName}`}/>
          </MenuItem>
        ))
        :null
        :
        branches?
        branches.map((branch:any)=>(
          <MenuItem /*divider = {true} */ key = {branch._id} value={branch._id}>
            <ListItemText primary = {`${branch.description}`}/>
          </MenuItem>
        ))
        :null
        }
        
      </Select>
      <FormHelperText >
            {branchErrorText}
        </FormHelperText>
            </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                <FormControl
                 error={roleError}
                  sx={{width: '100%' }}>
            <InputLabel id="role-select-helper-label">Role</InputLabel>
        <Select
          disabled = {Boolean(providedRole)}
          labelId="role-select-helper-label"
          id="role-select-helper"
          value={role}
          label="Role"
          onChange={handleRoleChange}
          startAdornment = {<WorkspacesIcon color="primary" fontSize="large"/>}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
          
          roles.map((role)=>(
            <MenuItem  key = {role.id} value={role.id}>{role.description}</MenuItem>
          ))
          }
        </Select>
        <FormHelperText >
            {roleErrorText}
            </FormHelperText>
        </FormControl>
                </Grid>
           </Grid>
           <Grid display='flex' container spacing={2} columnSpacing={5} sx={{marginTop:2}}>
                <Grid item md={6} xs={12}>
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
                </Grid>
            <Grid item md={6} xs={12}>
            <TextField
            // sx={{marginTop:'10px'}}
            fullWidth
            type ='password'
            id = "confirmPassword"
            name = "confirmPassword"
            label = "Confirm Password"
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
            </Grid>
           </Grid>
           </Grid>
           </Grid>
           <Button  
            type="submit"
            disabled = {loading}
            sx={{marginTop:4}}
            color="primary" variant="contained" >
          Save
        </Button>
            <SaveSuccessfull open={open} handleClose={handleClose} message = 'User Successfully Registered' />
            {/* {
          userServerErrorOccured && (<DisplayFormError errMess={userServerErrorMessage}/>)
        } */}
      </form>
      {
      adduserErrorOccured && (<FormWrapper>
            <Alert severity="error">
            <strong>{addUserErrorMessage}</strong>
            </Alert>
            </FormWrapper>)
            }
      </Box>
      </RegistrationParent>
  );
};


