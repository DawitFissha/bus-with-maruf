import { WithContext as ReactTags } from 'react-tag-input';
import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { StyledAiFillCloseCircle } from '../../Components/styled/main.styled'
import TextField from "@material-ui/core/TextField";
import Buttons from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "react-modal";
import {cityActions} from '../../store/city-slice'
import { addCity, updateCity} from '../../store/cityHttp';
import { errorActions } from '../../store/error-slice';
import { loadingActions } from '../../store/loading-slice';

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
    const loadingStatus=useSelector(state=>state.loading.status)
    const cityState=useSelector(state=>state.city.updateData)
    const message=useSelector(state=>state.message.errMessage)
    const [tags, setTags] = useState([]);
    const [city, setCity] = useState();

   useEffect(()=>{
if(update)
{
   const tg= cityState.departurePlace.map(e=>({id:e,text:e}))
   setCity(cityState.cityName)
   setTags(tg)
}
else{
    setCity()
    setTags([])  
}
   },[update,cityState])
const delimiters = [KeyCodes.comma, KeyCodes.enter];
const addCityHandler=()=>{
const cityName=city
const departurePlace=tags.map(e=>e.text)
if(cityName&&departurePlace.length>0)
{     
    dispatch(errorActions.Message(''))
    dispatch(loadingActions.status("pending"))
    if(update)
    {
        dispatch(updateCity({cityName,departurePlace,id:cityState._id}))
    }
    else{
        dispatch(addCity({cityName,departurePlace}))

    }
    
}
else
{
    dispatch(errorActions.Message('please fill all field'))
    dispatch(loadingActions.status('done'))
}
}
      console.log(tags)
      const handleDelete = (i) => {
        setTags(tags.filter((tag, index) => index !== i));
      };
    
      const handleAddition = (tag) => {
        setTags([...tags, tag]);
      };
    // const profile=useSelector(state=>state.userinfo)
    const isModalOpen=useSelector(state=>state.city.isModalOpen)
     console.log(isModalOpen)
    function toggleModal() {
        console.log("close")
        dispatch(cityActions.setModal(false))
      } 
useEffect(()=>{
    if(!update)
    {
        message==='city'&&setCity('')
        message==='city'&&setTags([]) 
    }
   
},[message])
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
                            <StyledAiFillCloseCircle onClick={()=>{dispatch(cityActions.setModal(false))}} style={{float:'right'}} fontSize={30} color='red'/>
                        </Card.Header>
                        <Card.Body style={{marginLeft:'10%'}}>
                          {update?<h5>Update City</h5>:<h5>Add New City</h5>} 
                        {message!=='city' && (
                            <Row>
                            <Col sm={12} style={{alignText:'center',justifyContent:'center'}}>
                            <small style={{alignText:'center'}} className="text-danger form-text">{message}</small>
                            </Col>
                            </Row>
                        )} 
                    
                        <Row style={{justifyContent:'start'}}>
                         <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicEmail">
                                        <TextField
                                            value={city}
                                            onChange={(e)=>setCity(e.target.value)}
                                            type='text' 
                                            variant='outlined'
                                            label="City Name"
                                            style={{width:"300px"}}
                                            required
                                        /><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'15px',
                                            color:'#038FCF'}}></div>
                                        </Form.Group>  
                                   </Row>
                                   <Row style={{justifyContent:'start'}}>
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
                                   </Row>
                             <Col style={{marginBottom:'50px',marginTop:'20px',marginLeft:"-26px"}}>
                            <Buttons 
                                onClick={addCityHandler}
                                type="submit"
                                variant="contained"
                                fullWidth
                                color="primary">
                                {!update&&(loadingStatus!=='pending'?"Add City" :<CircularProgress color='secondary'/>)}
                                {update&&(loadingStatus!=='pending'?"Update City" :<CircularProgress color='secondary'/>)}
                           </Buttons> 
                           </Col> 
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            </Modal>
        </React.Fragment>
    );
};

export default FormsCustomer;
