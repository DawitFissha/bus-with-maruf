
import * as React from 'react'
import {FormWrapper} from '../../Components/formWrapper'
import { RegistrationHeader } from '../../Components/common-registration-form/registrationHeader'
// import OrgnLogo from './orgnLogo.jfif'
import Box from "@mui/material/Box"
const OrganizationHeader = (props:{showLogo:boolean})=>{
    return (
        <div
        style={{
            marginLeft:'auto',
            marginRight:'auto',
        }}
        >
                   <Box
                    sx={{
                        display:'flex',
                        flexDirection:'column',
                        // ml:1,mr:1
                    }}
                    >
                    <FormWrapper>
                        <RegistrationHeader description = 'Organization Information' />
                    </FormWrapper>
                   
                    {
                        props.showLogo?
                        <img
                        alt="company logo" 
                        width = '300px'
                        height= '300px'
                        style = {{marginLeft:'auto',marginRight:'auto'}}
                    /> 
                    :
                    null
                    }
            
                   
            </Box>
        </div>
    )
}
export default OrganizationHeader