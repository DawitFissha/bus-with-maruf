import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import {FormWrapper} from '../../../Components/formWrapper'
import {useUpdateOrganizationMutation,useGetLoggedInOrganizationQuery} from '../../../store/bus_api'
import { useFormik } from 'formik';
import Button from '@mui/material/Button'
import useError from '../../../utils/hooks/useError'
import Alert from '@mui/material/Alert'
import {SavingProgress} from '../../../Components/common-registration-form/savingProgress'
type ORGN =  {
    OrganizationName:string;
    OrganizationNameAmharic:string;
    TinNumber:string;
    motto?:string
}
const validate = (values:ORGN) => {
    const errors:Partial<ORGN> = {}
    if (!values.OrganizationName) {
      errors.OrganizationName = 'This field is required';
    } 
     if(!values.OrganizationNameAmharic){
      errors.OrganizationNameAmharic = 'This field is required';
    }
    if(!values.TinNumber){
      errors.TinNumber = 'This field is required';
    }

    return errors;
  };
const GeneralOrgnInfo = (props:{organizationInfo:any})=>{
const {organizationInfo} = props;
// from redux
const {data}=useGetLoggedInOrganizationQuery()
const loggedInOrganizationId = data?._id
const organizationLogo = data?._logo
const [updateOrganizationInfo,{isLoading:isUpdating}]=useUpdateOrganizationMutation()
//local states
const [image,setImage] = React.useState<File|Blob>()
const [url,setUrl] = React.useState('')
const [UpdatingErrorOccured,updatingErrorMessage,setUpdatingErrorOccured,setUpdatingErrorMessage] = useError()
//formik
const formik = useFormik({
    initialValues:{
        OrganizationName:organizationInfo?.organizationName,
        OrganizationNameAmharic:organizationInfo?.organizationNameAmharic,
        TinNumber:organizationInfo?.tin,
        motto:'',
    },
    validate,
    onSubmit:async (values,{resetForm})=>{
        console.log('submited')
        if(Boolean(image)){
            const data = new FormData()
            data.append("file", image as Blob)
            data.append("upload_preset", "jmtirbf1")
            data.append("cloud_name","diz9yj1qj")
            fetch("  https://api.cloudinary.com/v1_1/diz9yj1qj/image/upload",
            {method:"post",body: data})
            .then(resp => resp.json())
            .then(data => {setUrl(data.url)})
            .catch(err => console.log(err))
        }
        try {
            await updateOrganizationInfo({
              loggedInOrganizationId,
              organizationName:values.OrganizationName,
              organizationNameAmharic:values.OrganizationNameAmharic,
              tin:values.TinNumber,
              logo:Boolean(url)?url:organizationLogo,
              
            }).unwrap()
            resetForm({values:{
              OrganizationName: "",
              OrganizationNameAmharic:"",
              TinNumber:"",

            }})
            setUpdatingErrorOccured(false)
          }
          
          catch(err:any) {
            setUpdatingErrorOccured(true)
            setUpdatingErrorMessage(`Failed to Update Organization , ${err?.data?.message}`)

          }
        

    }
})


    return (
   <>
   <SavingProgress loading={isUpdating}/>
   
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
            id="OrganizationName"
            name="OrganizationName"
            label="Organization Name"
            value={formik.values.OrganizationName}
            onChange={formik.handleChange}
      />
            </FormWrapper>
            <FormWrapper>
            <TextField
        
        id="OrganizationNameAmharic"
        name="OrganizationNameAmharic"
        label="የ ድርጅት ስም"
        value={formik.values.OrganizationNameAmharic}
        onChange={formik.handleChange}
      />
            </FormWrapper>
            <FormWrapper>
            <TextField
                id="TinNumber"
                name="TinNumber"
                label="Tin Number"
                value={formik.values.TinNumber}
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
                            <input
                            onChange={
                                (e:any)=>{
                                    setImage(e.target?.files[0])
                                }
                            }
                            type={'file'}
                            style={{marginLeft:10}}
                            />
                            </Box>
                    </FormWrapper>
                <FormWrapper>
                    <Button type="submit">
                        Save
                    </Button>
                </FormWrapper>
            </form>
            {
      UpdatingErrorOccured && (<FormWrapper>
            <Alert severity="error">
            <strong>{updatingErrorMessage}</strong>
            </Alert>
            </FormWrapper>)
            }
        </Box> 
        </>
    )
}
export default GeneralOrgnInfo