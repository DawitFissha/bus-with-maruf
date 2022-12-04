import { WithContext as ReactTags } from 'react-tag-input';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { StyledAiFillCloseCircle } from '../../Components/styled/main.styled'
import {TextField} from "@mui/material";
import {Button as Buttons} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "react-modal";
import { Autocomplete} from '@mui/material';
import {cityActions} from '../../store/city-slice'
import Alert from '@mui/material/Alert';
import { SaveSuccessfull } from '../../Components/common-registration-form/saveSuccess';
import { useAddCityMutation,useUpdateCityMutation } from '../../store/bus_api';

const options=["Mekelle", "Adama","Addis Ababa","Awassa", "Bahir Dar", "Dire Dawa", "Dessie", "Jimma", "Jijiga", "Shashamane", "Bishoftu", "Sodo", "Arba Minch", "Hosaena", "Harar", "Dilla", "Nekemte", "Debre Birhan", "Asella", "Debre Mark'os", "Kombolcha", "Debre Tabor", "Adigrat", "Areka", "Weldiya", "Sebeta", "Burayu", "Shire (Inda Selassie)", "Ambo", "Arsi Negele", "Aksum", "Gambela", "Bale Robe", "Butajira", "Batu", "Boditi", "Adwa", "Yirgalem", "Waliso", "Welkite", "Gode", "Meki", "Negele Borana", "Alaba Kulito", "Alamata", "Chiro", "Tepi", "Durame", "Goba", "Assosa", "Gimbi", "Wukro", "Haramaya", "Mizan Teferi", "Sawla", "Mojo", "Dembi Dolo", "Aleta Wendo", "Metu", "Mota", "Fiche", "Finote Selam", "Bule Hora Town", "Bonga", "Kobo", "Jinka", "Dangila", "Degehabur", "Dimtu", "Agaro"].sort()
const stat_options=["Active","Not Active"]
const customStyles = {
    content: {
      top: '57%',
      left: '58%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      zIndex:'100',
      border:'none',
      boxShadow:'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      padding:'0px',
      width:'450px',
      maxHeight:'540px'
    },
  };
Modal.setAppElement("#root");
const KeyCodes = {
    comma: 188,
    enter: 13,
  };

const FormsCustomer = ({update}) => {
    const dispatch=useDispatch()
    const cityState=useSelector(state=>state.city.updateData)
    const [tags, setTags] = useState([]);
    const [city, setCity] = useState();
    const [status, setStatus] = useState();
    const [saveStatus,setSaveStatus] =useState(false)
    const [isLocalError,setIsLocalError] =useState(false)
    const [localError,setLocalError]=useState('')
    const [isNew,setIsNew] =useState(true)

const handleSaveStatusClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSaveStatus(false);
  };

const [addCity,{data,isError,error,isSuccess,isLoading}]=useAddCityMutation()
const [updateCity,{data:datau,isError:isErroru,error:erroru,isSuccess:isSuccessu,isLoading:isLoadingu}]=useUpdateCityMutation()

useEffect(()=>{
if(update)
{
   const tg= cityState?.departurePlace?.map(e=>({id:e,text:e}))
   setCity(cityState?.cityName)
   setTags(tg)
   setStatus(cityState?.isActive?"Active":"Not Active")
 
}
else{
    setCity()
    setTags([])  
}
   },[update,cityState])



const delimiters = [KeyCodes.comma, KeyCodes.enter];
const addCityHandler=()=>{
  setIsLocalError(false)
  setLocalError('')
const cityName=city
const departurePlace=tags.map(e=>e.text)
if(cityName&&departurePlace.length>0)
{     
    if(update)
    {
        updateCity({cityName,departurePlace,id:cityState._id,isActive:status=="Active"?true:false})
    }
    else{
        addCity({cityName,departurePlace})
    }
    
}
else
{
    setIsLocalError(true)
    setLocalError('please fill all field')
}
}
      const handleDelete = (i) => {
        setTags(tags.filter((tag, index) => index !== i));
      };
    
      const handleAddition = (tag) => {
        setTags([...tags, tag]);
      };
    const isModalOpen=useSelector(state=>state.city.isModalOpen)
    function toggleModal() {
      setIsNew(true)
      setIsLocalError(false)
      dispatch(cityActions.setModal(false))

      } 
useEffect(()=>{
    if(isSuccess)
    {
        setCity('')
        setTags([]) 
    }
},[isSuccess])
useEffect(()=>{
  (isError||isErroru||isLocalError)&&setIsNew(false)
    console.log("trig")

},[isError,isErroru,isLocalError])
console.log(isError,isErroru,isLocalError,isNew)
useEffect(()=>{
(isSuccess||isSuccessu)&&setSaveStatus(true)
  },[isSuccess,isSuccessu])

    return (
        <React.Fragment>
        <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        style={customStyles}>
            <Row style={{margin:'0px',padding:'0px',alignItems:'center'}}>
                <Col style={{margin:'0px',padding:'0px',width:'100%'}} xl={12} sm={12} lg={12} md={12}>
                    <Card style={{margin:'0px',padding:'0px'}}>
                        <Card.Header>
                            <Card.Title as="h5">City</Card.Title>
                            <StyledAiFillCloseCircle onClick={()=>{
                              setIsNew(true)
                              setIsLocalError(false)
                              dispatch(cityActions.setModal(false))
                              }} style={{float:'right'}} fontSize={30} color='red'/>
                        </Card.Header>
                        <Card.Body style={{marginLeft:'10%'}}>
                          {update?<h5>Update City</h5>:<h5>Add New City</h5>} 
                          {isLocalError&&!isNew&&<Alert style={{marginLeft:'-10%',marginTop:'10px',marginBottom:'10px'}} severity="error">{localError}</Alert>}          
                        {!isLocalError&&isError&&!isNew&&<Alert style={{marginLeft:'-10%',marginTop:'10px',marginBottom:'10px'}} severity="error">{error.data?.message||"connecion error"}</Alert>}  
                        {!isLocalError&&!isError&&isErroru&&!isNew&&<Alert style={{marginLeft:'-10%',marginTop:'10px',marginBottom:'10px'}} severity="error">{erroru.data?.message||"connecion error"}</Alert>}  

                        <Row style={{justifyContent:'start'}}>
                         <Form.Group style={{marginLeft:'10px',marginTop:'1px'}} >
                         <Autocomplete
                                disablePortal
                                id="select-city"
                                value={city}
                                disabled={!!update}
                                onChange={(event, newValue) => {
                                setCity(newValue);
                                }}
                                options={options}
                                variant="outlined"
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Select City" variant="standard"/>}
                              />
                                </Form.Group>  
                                   </Row>
                                   <Row style={{justifyContent:'start'}}>
                                    {update?
                                               <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicEmail">
                                               <ReactTags
                                                   inputFieldPosition="bottom"
                                                   tags={tags}
                                                   delimiters={delimiters}
                                                   handleAddition={handleAddition}
                                                   placeholder="Departure Place *"
                                                   autocomplete
                                                   editable
                                               />
                                          </Form.Group> :
                                          
                                   <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicEmail">
                                   <ReactTags
                                       inputFieldPosition="bottom"
                                       tags={tags}
                                       delimiters={delimiters}
                                       handleDelete={handleDelete}
                                       handleAddition={handleAddition}
                                       placeholder="Departure Place *"
                                       autocomplete
                                       editable
                                   />
                              </Form.Group> 
                                    }
                                   </Row>
                          {update&&<Row style={{justifyContent:'start'}}>
                         <Form.Group style={{marginLeft:'10px',marginTop:'1px'}} >
                         <Autocomplete
                                disablePortal
                                id="set-status"
                                value={status}
                                onChange={(event, newValue) => {
                                setStatus(newValue);
                                }}
                               
                                options={stat_options}
                                variant="outlined"
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Status" variant="standard"/>}
                              />
                                </Form.Group>  
                              </Row>}
                             <Col style={{marginBottom:'50px',marginTop:'20px',marginLeft:"-26px"}}>
                            <Buttons 
                                onClick={addCityHandler}
                                type="submit"
                                variant="contained"
                                fullWidth
                                color="primary">
                                {!update&&(!isLoading?"Add City" :<CircularProgress color='secondary'/>)}
                                {update&&(!isLoadingu?"Update City" :<CircularProgress color='secondary'/>)}
                           </Buttons> 
                           </Col> 
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
          </Modal>
         {!update&&<SaveSuccessfull open={saveStatus} handleClose={handleSaveStatusClose} message = 'City Added Successfully' />}
         {update&&<SaveSuccessfull open={saveStatus} handleClose={handleSaveStatusClose} message = 'City Info Updated' />}
        </React.Fragment>
    );
};

export default FormsCustomer;
