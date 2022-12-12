import * as React from 'react'
import { FormWrapper } from '../../Components/formWrapper'
import { useFormik } from 'formik'
import { Button, Checkbox, FormControl, InputLabel, TextField } from '@mui/material'
import {useGetCityNameQuery,useAddNewAgentMutation} from '../../store/bus_api'
import Box from '@mui/material/Box'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import RegistrationParent from '../../Components/common-registration-form/registrationParent'
import { SavingProgress } from '../../Components/common-registration-form/savingProgress'
import { RegistrationHeader } from '../../Components/common-registration-form/registrationHeader'

type AGENT = {
    agentName:string;
    agentTin:string;
    contactPhone:string;
    address:string;
    maxUser:number;
}
type AgentFormErrors = {
    [property in keyof AGENT]+?:string
}
const validate = (values:AGENT)=>{
    const errors:AgentFormErrors = {}
    if (!values.agentName) {
        errors.agentName = 'Agent name is required';
      } 
      if(!values.agentTin) {
        errors.agentTin = "Tin is mandatory"
      }
       if(!values.contactPhone){
        errors.contactPhone = "phone number is required"
      }
      if(!values.address){
        errors.address = "Address of the agent is required"
      }
      if(values.maxUser<1){
        errors.maxUser = "please enter a valid number"
      }
      
     
      return errors;
}
export function AgentRegistration(){
   //global states from redu
   const {data:cityNames=[],isLoading} = useGetCityNameQuery()
   const [addAgent,{isLoading:isAddingAgent}] = useAddNewAgentMutation()
   // local states
   const [loading, setLoading] = React.useState(false);
   const [active,setActive] = React.useState(true)
   const handleActiveChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActive(event.target.checked);
  };
 
   const cityOptions =  cityNames?.map((city:any)=>(
       city.cityName
     )) as string[]
   const [location,setLocation] = React.useState('')
   const [locationValue, setLocationValue] = React.useState('');
  //  const handleLocationChange = (e:SelectChangeEvent<typeof location>)=> {
  //      setLocation(e.target.value)
  //  }
   const formik = useFormik({
       initialValues:{
           agentName:'',
           agentTin:'',
           address:"",
           contactPhone:"",
           maxUser:1,
   
       },
       validate,
       onSubmit:async (values,{resetForm})=>{
           try{
            await addAgent({
              agentName:values.agentName,
              phoneNumber:values.contactPhone,
              tin:values.agentTin,
              maxUser:values.maxUser,
              location,
              isActive:active,
            }).unwrap()
            resetForm({values:{
              agentName:'',
              agentTin:'',
              contactPhone:'',
              maxUser:1,
              address:'',
            }})
           }
           catch(err) {
            // setErrorMessage(`Failed to Register Agent , ${err.data.message}`)
           }
       }
       
   })
   return (
  <RegistrationParent>
    <SavingProgress loading={isAddingAgent}/>
    <Box sx={{
           display:'flex',
           flexDirection:'column',
           ml:1,mr:1
       }}>
           <FormWrapper>
           <RegistrationHeader description = 'Add New Agents' />
           </FormWrapper>
           <form onSubmit={formik.handleSubmit}>
                <Grid container>
                    <Grid item xs={12}>
                    <Grid display='flex' container spacing={2}  columnSpacing={5}>
                        <Grid item md={6} xs={12}>
                                <TextField
                                id="agentName"
                                name="agentName"
                                label="Agent Name"
                                value={formik.values.agentName}
                                onChange = {formik.handleChange}
                                error={formik.touched.agentName && Boolean(formik.errors.agentName)}
                                helperText={formik.touched.agentName && formik.errors.agentName}

                            />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <TextField
                            id="agentTin"
                            name="agentTin"
                            label="Agent Tin"
                            value={formik.values.agentTin}
                            onChange = {formik.handleChange}
                            error={formik.touched.agentTin && Boolean(formik.errors.agentTin)}
                            helperText={formik.touched.agentTin && formik.errors.agentTin}

                        />
                        </Grid>
                    </Grid>
                    <Grid display='flex' container spacing={2}  columnSpacing={5} sx={{marginTop:2}}>
                        <Grid item md={6} xs={12}>
                        <TextField
                            id="phoneNumber"
                            name="contactPhone"
                            label="Contact Phone Number"
                            value={formik.values.contactPhone}
                            onChange = {formik.handleChange}
                            error={formik.touched.contactPhone && Boolean(formik.errors.contactPhone)}
                            helperText={formik.touched.contactPhone && formik.errors.contactPhone}

                        />
                        </Grid>
                        <Grid item md={6} xs={12}>
                        <Autocomplete
        loading={isLoading}
        value={location}
        onChange={(event: any, newValue: string | null) => {
          setLocation(newValue as string);
        }}
        id="agent-location"
        inputValue={locationValue}
        onInputChange={(event, newInputValue) => {
          setLocationValue(newInputValue);
        }}
        options={cityOptions}
       
        renderInput={(params) => {
          return(
            <TextField 
             {...params} 
             label="Location"
             inputProps={{
              ...params.inputProps,
              endAdornment: (
                <React.Fragment>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
              ),
             }}
             />
          )
        }}
      />
        </Grid>
                    </Grid>
                    <Grid display='flex' container spacing={2}  columnSpacing={5} sx={{marginTop:2}}>
                            <Grid item md={6} xs={12}>
                            <TextField
                                id="address"
                                name="address"
                                label="Address"
                                value={formik.values.address}
                                onChange = {formik.handleChange}
                                error={formik.touched.address && Boolean(formik.errors.address)}
                                helperText={formik.touched.address && formik.errors.address}

                            />
                            </Grid>
                            <Grid item md={6} xs={12}>
                            <TextField
                                id="maxUser"
                                name="maxUser"
                                label="Max User"
                                type="number"
                                value={formik.values.maxUser}
                                onChange = {formik.handleChange}
                                error={formik.touched.maxUser && Boolean(formik.errors.maxUser)}
                                helperText={formik.touched.maxUser && formik.errors.maxUser}

                            />
                            </Grid>
                    </Grid>
                    </Grid>
                </Grid>
                <FormWrapper
                sx={{marginTop:1}}
                >
              <p style={{display:'inline'}}>is Active</p>
              <Checkbox
              onChange={handleActiveChecked}
              checked={active}
              />
            </FormWrapper>
                <Button  
            type="submit"
            sx={{marginTop:1}}
            disabled = {loading}
            color="primary" variant="contained" >
          Save
        </Button>
           </form>
           </Box>
  </RegistrationParent>
       
   )
}