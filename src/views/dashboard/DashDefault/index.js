import React,{useState,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MultiBarCashYear from '../../charts/nvd3-chart/chart/yearlyCash';
import MultiBarCashMonth from '../../charts/nvd3-chart/chart/monthlyCash';
import MultiBarCashWeek from '../../charts/nvd3-chart/chart/weekCash';
import MultiBarCashDay from '../../charts/nvd3-chart/chart/dayilyCash';
import PieDonutChart from '../../charts/nvd3-chart/chart/PieDonutChart';
import LineChart from '../../charts/nvd3-chart/chart/salesMap';
import Counter from '../../../Components/Reusable/counter';
import { useDispatch,useSelector } from 'react-redux';
import { SortBy } from '../../../Components/styled/main.styled';
import  {MdPlayArrow} from 'react-icons/md'
import { gql,useQuery } from '@apollo/client';
import { dashboardActions } from '../../../store/dashboard-slice';

const DashDefault = () => {
    const dispatch=useDispatch()
    const sortState=useSelector(state=>state.dashboard.sort)
    const gqlship=gql`
    query($input:SaleInputFilter){       
          getLocalTotalSale(input: $input) {
            totalTicket
          }
          getAgentTotalSale(input: $input) {
            totalTicket
          }
          getMobileTotalSale(input: $input) {
            totalTicket
          }
   }`
   const {loading,error,data,refetch}=useQuery(gqlship,{
    variables:{input:{filter:sortState
    }
  }})
    const [active ,setActive]=useState(1)
    const [localSale ,setLocalSale]=useState(1)
    const [agentSale,setAgentSale]=useState(1)
    const [mobileSale,setMobileSale]=useState(1)
    const [totalSale,setTotalSale]=useState(1)

useEffect(()=>{
    refetch()
    if(data){
        console.log(data)
    setLocalSale(data.getLocalTotalSale?.totalTicket?parseInt(data.getLocalTotalSale?.totalTicket):0)
    setAgentSale(data.getAgentTotalSale?.totalTicket?parseInt(data.getAgentTotalSale?.totalTicket):0)
    setMobileSale(data.getMobileTotalSale?.totalTicket?parseInt(data.getMobileTotalSale?.totalTicket):0)
    setTotalSale(data.getLocalTotalSale?.totalTicket?parseInt(data.getLocalTotalSale?.totalTicket):0+data.getAgentTotalSale?.totalTicket?parseInt(data.getAgentTotalSale?.totalTicket):0+data.getMobileTotalSale?.totalTicket?parseInt(data.getMobileTotalSale?.totalTicket):0)
    }
},[data,sortState])
    const countLocal={from:0,to:localSale}
    const countAgent={from:0,to:agentSale}
    const countMobile={from:0,to:mobileSale}
    const countTotal={from:0,to:totalSale}


    return (
        <React.Fragment>
            <Row style={{justifyContent:'end',marginBottom:'4px'}}>
             <Row style={{paddingRight:"20px"}}><SortBy filter>Filter<MdPlayArrow size={20}/></SortBy>
              <SortBy active={active===1?true:false} onClick={()=>{setActive(1) 
                dispatch(dashboardActions.setFiltering("day"))}}>Today</SortBy> 
              <SortBy active={active===2?true:false} onClick={()=>{setActive(2)
            dispatch(dashboardActions.setFiltering("week"))}}>This Week</SortBy>
              <SortBy active={active===3?true:false} onClick={()=>{setActive(3)
            dispatch(dashboardActions.setFiltering("month"))}}>This Month</SortBy>
              <SortBy active={active===4?true:false} onClick={()=>{setActive(4)
            dispatch(dashboardActions.setFiltering("year"))}}>This Year</SortBy></Row>
             </Row>
            <Row>
                <Col md={6} xl={3}>
                    <Card>
                    <Card.Body>
                            <h6 className="mb-4">Total Ticket</h6>
                            <div className="row d-flex align-items-center">
                            <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                        <i className="feather icon-arrow-up text-c-green f-30 m-r-5" /> 
                                        <Counter count={countTotal}/>
                                    </h3>
                                </div>
                            </div>
                            
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={3}>
                    <Card>
                    <Card.Body>
                            <h6 className="mb-4">Total Ticket By Sales</h6>
                            <div className="row d-flex align-items-center">
                            <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                        <i className="feather icon-arrow-up text-c-green f-30 m-r-5" /> 
                                        <Counter count={countLocal}/>
                                    </h3>
                                </div>
                            </div>
                            
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={3}>
                    <Card>
                    <Card.Body>
                            <h6 className="mb-4">Total Ticket By Agent</h6>
                            <div className="row d-flex align-items-center">
                            <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                        <i className="feather icon-arrow-up text-c-green f-30 m-r-5" /> 
                                        <Counter count={countAgent}/>
                                    </h3>
                                </div>
                            </div>
                            
                        </Card.Body>
             </Card>
                </Col>
                <Col md={6} xl={3}>
                    <Card>
                    <Card.Body>
                            <h6 className="mb-4">Total Ticket By Mobile</h6>
                            <div className="row d-flex align-items-center">
                            <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                        <i className="feather icon-arrow-up text-c-green f-30 m-r-5" /> 
                                        <Counter count={countMobile}/>
                                    </h3>
                                </div>
                            </div>
                            
                        </Card.Body>
                </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Header>
                        { sortState==="year" && <Card.Title as="h5">This Year Sales Map In Birr</Card.Title>}
                        { sortState==="month" && <Card.Title as="h5">This Month Sales Map In Birr</Card.Title>}
                        { sortState==="week" && <Card.Title as="h5">This Week Sales Map In Birr</Card.Title>}
                        { sortState==="day" && <Card.Title as="h5">Today Sales Map In Birr</Card.Title>}
                        </Card.Header>
                        <Card.Body>
                            <LineChart />
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col md={6}>
                    <Card>
                        <Card.Header>
                        { sortState==="year" && <Card.Title as="h5">This Year Agents Ticket Sale  </Card.Title>}
                        { sortState==="month" && <Card.Title as="h5">This Month Agents Ticket Sale </Card.Title>}
                        { sortState==="week" && <Card.Title as="h5">This Week Agents Ticket Sale </Card.Title>}
                        { sortState==="day" && <Card.Title as="h5">Today Agents Ticket Sale </Card.Title>}
                        </Card.Header>
                        <Card.Body className="text-center">
                            <PieDonutChart />
                        </Card.Body>
                    </Card>
                </Col>
             
               <Col md={12}>
                    <Card>
                        <Card.Header>
                        { sortState==="year" && <Card.Title as="h5">Ticket Sale This Year </Card.Title>}
                        { sortState==="month" && <Card.Title as="h5">Ticket Sale This Month </Card.Title>}
                        { sortState==="week" && <Card.Title as="h5">Ticket Sale This Week</Card.Title>}
                        { sortState==="day" && <Card.Title as="h5">Ticket Sale Today</Card.Title>}
                        </Card.Header>
                        <Card.Body>
                         { sortState==="year" && <MultiBarCashYear />}
                         { sortState==="month" && <MultiBarCashMonth />}
                         { sortState==="week" && <MultiBarCashWeek />}
                         { sortState==="day" && <MultiBarCashDay />}

                        </Card.Body>
                    </Card>
                </Col>
            
            </Row>
        </React.Fragment>
    );
};

export default DashDefault;
