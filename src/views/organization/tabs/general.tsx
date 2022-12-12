import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import {FormWrapper} from '../../../Components/formWrapper'
import {Button } from '@mui/material'

import { useFormik } from 'formik';
type ORGN =  {
    name:string;
    nameInAmharic:string;
    Tin:string;
    motto?:string
}
const validate = (values:ORGN) => {
    const errors:Partial<ORGN> = {}
    if (!values.name) {
      errors.name = 'This field is required';
    } 
     if(!values.nameInAmharic){
      errors.nameInAmharic = 'This field is required';
    }
    if(!values.Tin){
      errors.Tin = 'This field is required';
    }

    return errors;
  };
const GeneralOrgnInfo = (props:{organizationInfo:any})=>{
const {organizationInfo} = props;
//formik
const formik = useFormik({
    initialValues:{
        name:organizationInfo?.organizationName,
        nameInAmharic:organizationInfo?.organizationNameAmharic,
        Tin:organizationInfo?.tin,
        motto:'',
    },
    validate,
    onSubmit:()=>{
        console.log('submited')
    }
})
    return (
   
             <Box
        sx={{
            display:'flex',
            flexDirection:'column',
            ml:1,mr:1
        }}
        >
        
            <form>
            <FormWrapper>
            <TextField
            id="OrganizationName"
            name="OrganizationName"
            label="Organization Name"
            value={formik.values.name}
            onChange={formik.handleChange}
      />
            </FormWrapper>
            <FormWrapper>
            <TextField
        
        id="OrganizationNameAmharic"
        name="OrganizationNameAmharic"
        label="የ ድርጅት ስም"
        value={formik.values.nameInAmharic}
        onChange={formik.handleChange}
      />
            </FormWrapper>
            <FormWrapper>
            <TextField
                id="TinNumber"
                name="TinNumber"
                label="Tin Number"
                value={formik.values.Tin}
                onChange={formik.handleChange}
      />
            </FormWrapper>
            <FormWrapper>
            <TextField
                placeholder='መልካም ጉዞ'
                id="Motto"
                name="Motto"
                label="Motto"
                value={formik.values.motto}
                onChange={formik.handleChange}
            />
                    </FormWrapper>
                    <FormWrapper>
                        <Box sx={{display:'flex',alignItems:'center',gap:'5px'}}>
                            <p>Attach Company Logo</p>
                            <Button
                            sx={{fontSize:'14px',width:'100px',borderRadius:0}}
                            >Browse</Button>
                            </Box>
                    </FormWrapper>

            </form>
        </Box> 
    )
}
export default GeneralOrgnInfo