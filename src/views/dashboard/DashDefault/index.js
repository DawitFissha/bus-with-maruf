import React,{useState,useEffect} from 'react';
import { Row, Col, Card} from 'react-bootstrap';
import MultiBarCashYear from '../../charts/nvd3-chart/chart/yearlyCash';
import CasherMultiBarCashYear from '../../casher_report/yearlyCash';
import MultiBarCashMonth from '../../charts/nvd3-chart/chart/monthlyCash';
//bus info
import DailySitInfo from '../../chartBusSitReport/dayilySitInfo'
import WeekSitInfo from '../../chartBusSitReport/weekSitInfo'
import MonthlySitInfo from '../../chartBusSitReport/monthlySitInfo'
import YearlySitInfo from '../../chartBusSitReport/yearlySitInfo'

import CasherMultiBarCashMonth from '../../casher_report/monthlyCash';
import MultiBarCashWeek from '../../charts/nvd3-chart/chart/weekCash';
import CasherMultiBarCashWeek from '../../casher_report/weekCash';
import MultiBarCashDay from '../../charts/nvd3-chart/chart/dayilyCash';
import CasherMultiBarCashDay from '../../casher_report/dayilyCash';
import PieDonutChart from '../../charts/nvd3-chart/chart/PieDonutChart';
import PieDonnutAllBusSit from '../../charts/nvd3-chart/chart/PieDonutAllBus'
import LineChart from '../../charts/nvd3-chart/chart/salesMap';
import Counter from '../../../Components/Reusable/counter';
import { useDispatch,useSelector } from 'react-redux';
import { SortBy } from '../../../Components/styled/main.styled';
import  {MdPlayArrow} from 'react-icons/md'
import { gql,useQuery } from '@apollo/client';
import { dashboardActions } from '../../../store/dashboard-slice';
import { role } from '../../../role';
const DashDefault = () => {
    const dispatch=useDispatch()
    const profile=useSelector(state=>state.userinfo)
    const sortState=useSelector(state=>state.dashboard.sort)
    const active=useSelector(state=>state.dashboard.active)
    
    const gqlship=gql`
    query($input:SaleInputFilter){       
          getLocalTotalSale(input: $input) {
            totalTicket
          }
          getUserSpecificTotalSale(input: $input) {
            totalTicket
          }
          getUserSpecificCanceledSale(input: $input) {
            totalTicket
          }
          getGroupUserSpecfcificTicketInbr(input: $input) {
            totalPrice
          }
          getGroupUserSpecfcificCanceledTicketInbr(input: $input) {
            totalPrice
          }
          getAgentTotalSale(input: $input) {
            totalTicket
          }
          getMobileTotalSale(input: $input) {
            totalTicket
          }
          getTotalSale(input: $input) {
            totalTicket
          }
          getAgenTotalTicket(input: $input) {
            totalTicket
          }
          getAgentTicketInbr(input: $input) {
            totalPrice
          }
          getAgentCanceledTicket(input: $input) {
            totalTicket
          }
          getAgentCanceledTicketBirr(input: $input) {
            totalPrice
          }
         
   }`
   const {data,refetch}=useQuery(gqlship,{
    variables:{input:{filter:sortState
    }
  }})

  const gqlshipSit=gql`
  query($input:SaleInputFilter){
    getRouteAggregateSitReserve(input: $input) {
      avgOpenSit
      avgReservedSit
      source
      destination
      label
    }
  }
  `
     const {data:dataSit,refetch:refetchSit}=useQuery(gqlshipSit,{
      variables:{input:{filter:sortState
      }
    }})
    // let sitInfoInRoute = []

    // const [active ,setActive]=useState(1)
    const [localSale ,setLocalSale]=useState(0)
    const [agentSale,setAgentSale]=useState(0)
    const [mobileSale,setMobileSale]=useState(0)
    const [totalSale,setTotalSale]=useState(0)
    const [localSpecificSale,setLocalSpecificSale]=useState(0)
    const [localSpecificCanceledSale,setLocalSpecificCanceledSale]=useState(0)
    const [localSpecificSaleInBirr,setLocalSpecificSaleInBirr]=useState(0)
    const [localSpecificRefundInBirr,setLocalSpecificRefunInBirr]=useState(0)
    const [agentTotalTicket,setAgentTotalTicket]=useState(0)
    const [agentTotalTicketBirr,setAgentTotalTicketBirr]=useState(0)
    const [agentTotalCanceledTicket,setAgentTotalCanceledTicket]=useState(0)
    const [agentTotalCanceledTicketBirr,setAgentTotalCanceledTicketBirr]=useState(0)
    const [sitInfoInRoute,setSitInfoInRoute]=useState([])

useEffect(()=>{
    refetch()
    refetchSit()
    console.log(data)
    setSitInfoInRoute([])
    if(dataSit?.getRouteAggregateSitReserve?.length>0){
        const sitInfoData= dataSit?.getRouteAggregateSitReserve?.reduce((agg,curr) => {
            console.log(agg)
            console.log(curr)
            let found = agg.find((x) => x.source === curr.source&&x.destination === curr.destination);
            console.log(found)
            if(found){
              found.sitInfo.push(curr);
            }
            else{
                console.log("false")
               agg.push({
                   route:`from ${curr.source} to ${curr.destination}`,
                   source:curr.source,
                   destination:curr.destination,
                   sitInfo:[curr]
               });
            }
            return agg;
            },[]);
            console.log(sitInfoData)
            setSitInfoInRoute(sitInfoData)
    }

    if(data){
    setLocalSale(data?.getLocalTotalSale?.totalTicket?parseInt(data?.getLocalTotalSale?.totalTicket):0)
    setLocalSpecificSale(data?.getUserSpecificTotalSale?.totalTicket?parseInt(data?.getUserSpecificTotalSale?.totalTicket):0)
    setLocalSpecificCanceledSale(data?.getUserSpecificCanceledSale?.totalTicket?parseInt(data?.getUserSpecificCanceledSale?.totalTicket):0)
    setAgentSale(data?.getAgentTotalSale?.totalTicket?parseInt(data?.getAgentTotalSale?.totalTicket):0)
    setMobileSale(data?.getMobileTotalSale?.totalTicket?parseInt(data?.getMobileTotalSale?.totalTicket):0)
    setTotalSale(data?.getTotalSale?.totalTicket?parseInt(data?.getTotalSale?.totalTicket):0)
    setLocalSpecificSaleInBirr(data?.getGroupUserSpecfcificTicketInbr[0]?.totalPrice?parseInt(data?.getGroupUserSpecfcificTicketInbr[0]?.totalPrice):0)
    setLocalSpecificRefunInBirr(data?.getGroupUserSpecfcificCanceledTicketInbr[0]?.totalPrice?parseInt(data?.getGroupUserSpecfcificCanceledTicketInbr[0]?.totalPrice):0)
    setAgentTotalTicket(data?.getAgenTotalTicket?.totalTicket?parseInt(data?.getAgenTotalTicket?.totalTicket):0)
    setAgentTotalTicketBirr(data?.getAgentTicketInbr[0]?.totalPrice?parseInt(data?.getAgentTicketInbr[0]?.totalPrice):0)
    setAgentTotalCanceledTicket(data?.getAgentCanceledTicket[0]?.totalTicket?parseInt(data?.getAgentCanceledTicket[0]?.totalTicket):0)
    setAgentTotalCanceledTicketBirr(data?.getAgentCanceledTicketBirr[0]?.totalPrice?parseInt(data?.getAgentCanceledTicketBirr[0]?.totalPrice):0)


    }
},[data,sortState])
    const countLocal={from:0,to:localSale}
    const countSpecificLocal={from:0,to:localSpecificSale}
    const countSpecificCanceledLocal={from:0,to:localSpecificCanceledSale}
    const countSpecificLocalInBirr={from:0,to:localSpecificSaleInBirr}
    const countSpecificLocalRefundBirr={from:0,to:localSpecificRefundInBirr}
    const countAgent={from:0,to:agentSale}
    const countMobile={from:0,to:mobileSale}
    const countTotal={from:0,to:totalSale}
    const countAgentTotalTicket={from:0,to:agentTotalTicket}
    const countAgentTotalTicketBirr={from:0,to:agentTotalTicketBirr}
    const countAgentTotalCanceledTicket={from:0,to:agentTotalCanceledTicket}
    const countAgentTotalCanceledTicketBitrr={from:0,to:agentTotalCanceledTicketBirr}

    return (
        <React.Fragment>
            <Row style={{justifyContent:'end',marginBottom:'4px'}}>
             <Row style={{paddingRight:"20px"}}><SortBy filter>Filter<MdPlayArrow size={20}/></SortBy>
              <SortBy active={active===1?true:false} onClick={()=>{dispatch(dashboardActions.setActive(1)) 
                dispatch(dashboardActions.setFiltering("day"))}}>Today</SortBy> 

              <SortBy active={active===2?true:false} onClick={()=>{dispatch(dashboardActions.setActive(2))
            dispatch(dashboardActions.setFiltering("week"))}}>This Week</SortBy>
            
              <SortBy active={active===3?true:false} onClick={()=>{dispatch(dashboardActions.setActive(3))
            dispatch(dashboardActions.setFiltering("month"))}}>This Month</SortBy>

              <SortBy active={active===4?true:false} onClick={()=>{dispatch(dashboardActions.setActive(4))
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
                                        {profile.role===role.CASHER&&<Counter count={countSpecificLocal||0}/>}
                                        {profile.role===role.SUPERADMIN&&<Counter count={countTotal||0}/>}
                                        {profile.role===role.ADMIN&&<Counter count={countTotal||0}/>}
                                        {profile.role===role.SUPERAGENT&&<Counter count={countAgentTotalTicket||0}/>}
                                        {profile.role===role.CASHERAGENT&&<Counter count={countSpecificLocal||0}/>}
                                    </h3>
                                </div>
                            </div>
                            
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={3}>
                    <Card>
                    <Card.Body>
                    {profile.role===role.CASHER&&<h6 className="mb-4">Total Sales in Birr</h6>}
                    {profile.role===role.ADMIN&&<h6 className="mb-4">Total Ticket By Sales</h6>}
                    {profile.role===role.SUPERADMIN&&<h6 className="mb-4">Total Ticket By Sales</h6>}
                    {profile.role===role.SUPERAGENT&&<h6 className="mb-4">Total Sales in Birr</h6>}
                    {profile.role===role.CASHERAGENT&&<h6 className="mb-4">Total Sales in Birr</h6>}


                            {/* <h6 className="mb-4">Total Ticket By Sales</h6> */}
                            <div className="row d-flex align-items-center">
                            <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                        <i className="feather icon-arrow-up text-c-green f-30 m-r-5" /> 
                                        {profile.role===role.CASHER&&<Counter count={countSpecificLocalInBirr||0}/>}
                                        {profile.role===role.SUPERADMIN&&<Counter count={countLocal||0}/>}
                                        {profile.role===role.ADMIN&&<Counter count={countLocal||0}/>}
                                        {profile.role===role.SUPERAGENT&&<Counter count={countAgentTotalTicketBirr||0}/>}
                                        {profile.role===role.CASHERAGENT&&<Counter count={countSpecificLocalInBirr||0}/>}
                                    </h3>
                                </div>
                            </div>
                            
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={3}>
                    <Card>
                    <Card.Body>
                    {profile.role===role.CASHER&&<h6 className="mb-4">Total Canceled Ticket</h6>}
                    {profile.role===role.ADMIN&&<h6 className="mb-4">Total Ticket By Agent</h6>}
                    {profile.role===role.SUPERADMIN&&<h6 className="mb-4">Total Ticket By Agent</h6>}
                    {profile.role===role.SUPERAGENT&&<h6 className="mb-4">Total Canceled Ticket</h6>}
                    {profile.role===role.CASHERAGENT&&<h6 className="mb-4">Total Canceled Ticket</h6>}
                            <div className="row d-flex align-items-center">
                            <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                        <i className="feather icon-arrow-up text-c-green f-30 m-r-5" /> 
                                        {profile.role===role.CASHER&&<Counter count={countSpecificCanceledLocal||0}/>}
                                        {profile.role===role.SUPERADMIN&&<Counter count={countAgent||0}/>}
                                        {profile.role===role.ADMIN&&<Counter count={countAgent||0}/>}
                                        {profile.role===role.SUPERAGENT&&<Counter count={countAgentTotalCanceledTicket||0}/>}
                                        {profile.role===role.CASHERAGENT&&<Counter count={countSpecificCanceledLocal||0}/>}
                                    </h3>
                                </div>
                            </div>
                            
                        </Card.Body>
             </Card>
                </Col>
                <Col md={6} xl={3}>
                    <Card>
                    <Card.Body>
                    {profile.role===role.CASHER&&<h6 className="mb-4">Total Refund In Birr</h6>}
                    {profile.role===role.ADMIN&&<h6 className="mb-4">Total Ticket By Mobile</h6>}
                    {profile.role===role.SUPERADMIN&&<h6 className="mb-4">Total Ticket By Mobile</h6>}
                    {profile.role===role.SUPERAGENT&&<h6 className="mb-4">Total Refund In Birr</h6>}
                    {profile.role===role.CASHERAGENT&&<h6 className="mb-4">Total Refund In Birr</h6>}
                            <div className="row d-flex align-items-center">
                            <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                        <i className="feather icon-arrow-up text-c-green f-30 m-r-5" /> 
                                        {profile.role===role.CASHER&&<Counter count={countSpecificLocalRefundBirr||0}/>}
                                        {profile.role===role.SUPERADMIN&&<Counter count={countMobile||0}/>}
                                        {profile.role===role.ADMIN&&<Counter count={countMobile||0}/>}
                                        {profile.role===role.SUPERAGENT&&<Counter count={countAgentTotalCanceledTicketBitrr||0}/>}
                                        {profile.role===role.CASHERAGENT&&<Counter count={countSpecificLocalRefundBirr||0}/>}
                                    </h3>
                                </div>
                            </div>
                            
                        </Card.Body>
                </Card>
                </Col>
                                        {profile.role===role.SUPERADMIN&&
                                       <Col md={6}>
                                       <Card>
                                           <Card.Header>
                                           { sortState==="year" && <Card.Title color='cornflowerblue' as="h5">This Year Sales Map In Birr</Card.Title>}
                                           { sortState==="month" && <Card.Title color='cornflowerblue' as="h5">This Month Sales Map In Birr</Card.Title>}
                                           { sortState==="week" && <Card.Title color='cornflowerblue' as="h5">This Week Sales Map In Birr</Card.Title>}
                                           { sortState==="day" && <Card.Title color='cornflowerblue' as="h5">Today Sales Map In Birr</Card.Title>}
                                           </Card.Header>
                                           <Card.Body>
                                               <LineChart />
                                           </Card.Body>
                                       </Card>
                                   </Col> }
                                        {profile.role===role.ADMIN&&<Col md={6}>
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
                </Col>}
                
                {profile.role===role.SUPERADMIN&&  <Col md={6}>
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
                </Col>}
                {profile.role===role.ADMIN&&<Col md={6}>
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
                </Col>}
                {/* sit avg ration */}
                {(profile.role===role.ADMIN||profile.role===role.SUPERADMIN) && <Col md={6}>
                    <Card>
                        <Card.Header>
                        { sortState==="year" && <Card.Title as="h5">Reserved Sit Ratio On This Year  </Card.Title>}
                        { sortState==="month" && <Card.Title as="h5">Reserved Sit Ratio On This Month </Card.Title>}
                        { sortState==="week" && <Card.Title as="h5">Reserved Sit Ratio On This week </Card.Title>}
                        { sortState==="day" && <Card.Title as="h5">Reserved Sit Ratio Bus Departed Today</Card.Title>}
                        </Card.Header>
                        <Card.Body className="text-center">
                            <PieDonnutAllBusSit />
                        </Card.Body>
                    </Card>
                </Col>}
                {profile.role===role.SUPERAGENT&&  <Col md={6}>
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
                </Col>}
                {profile.role===role.ADMIN&&
               <Col md={6}>
                    <Card>
                        <Card.Header>
                        { sortState==="year" && <Card.Title as="h5">This Year Cash Sale In Birr</Card.Title>}
                        { sortState==="month" && <Card.Title as="h5">This Month Cash Sale In Birr </Card.Title>}
                        { sortState==="week" && <Card.Title as="h5">This Week Cash Sale In Birr</Card.Title>}
                        { sortState==="day" && <Card.Title as="h5">Today Cash Sale In Birr</Card.Title>}
                        </Card.Header>
                        <Card.Body>
                         { sortState==="year" && <MultiBarCashYear />}
                         { sortState==="month" && <MultiBarCashMonth />}
                         { sortState==="week" && <MultiBarCashWeek />}
                         { sortState==="day" && <MultiBarCashDay />}

                        </Card.Body>
                    </Card>
                </Col>}
                {profile.role===role.SUPERADMIN&&
               <Col md={6}>
                    <Card>
                        <Card.Header>
                        { sortState==="year" && <Card.Title as="h5">This Year Cash Sale In Birr</Card.Title>}
                        { sortState==="month" && <Card.Title as="h5">This Month Cash Sale In Birr </Card.Title>}
                        { sortState==="week" && <Card.Title as="h5">This Week Cash Sale In Birr</Card.Title>}
                        { sortState==="day" && <Card.Title as="h5">Today Cash Sale In Birr</Card.Title>}
                        </Card.Header>
                        <Card.Body>
                         { sortState==="year" && <MultiBarCashYear />}
                         { sortState==="month" && <MultiBarCashMonth />}
                         { sortState==="week" && <MultiBarCashWeek />}
                         { sortState==="day" && <MultiBarCashDay />}

                        </Card.Body>
                    </Card>
                </Col>}
                {/* bus info multibar bar*/}
       
                {profile.role===role.SUPERADMIN&&sitInfoInRoute?.length>0&&
               <Col md={12}>
                    {sitInfoInRoute?.length>0&&sitInfoInRoute?.map((e,i)=><Card key={i}>
                        <Card.Header>
                        { sortState==="year" &&sitInfoInRoute?.length>0&&<Card.Title as="h5">
                            <div>This Year Sit Reservation Ratio</div><div style={{color:'blue'}}>{e?.route}</div>
                            </Card.Title>} 
                        { sortState==="month" &&sitInfoInRoute?.length>0&&<Card.Title as="h5">
                            <div>This Month Sit Reservation Ratio</div><div style={{color:'blue'}}>{e?.route}</div>
                            </Card.Title>}
                        { sortState==="week" &&sitInfoInRoute?.length>0&&<Card.Title as="h5">
                            <div>This Week Cash Sale In Birr</div><div style={{color:'blue'}}>{e?.route}</div>
                            </Card.Title>}
                        { sortState==="day" &&sitInfoInRoute?.length>0&& <Card.Title as="h5">
                            <div>Today Sit Reservation Ratio</div><div style={{color:'blue'}}>{e?.route}</div>
                            </Card.Title>}
                        </Card.Header>
                        <Card.Body>
                         { sortState==="year" && sitInfoInRoute?.length>0&&<YearlySitInfo Data={{sitInfoInRoute:e?.sitInfo}}/>}
                         { sortState==="month" && sitInfoInRoute?.length>0&&<MonthlySitInfo Data={{sitInfoInRoute:e?.sitInfo}}/>}
                         { sortState==="week" && sitInfoInRoute?.length>0&& <WeekSitInfo Data={{sitInfoInRoute:e?.sitInfo}} />}
                         { sortState==="day" && sitInfoInRoute?.length>0 && <DailySitInfo Data={{sitInfoInRoute:e?.sitInfo}} />}
                        </Card.Body>
                    </Card>)}
                </Col>}
                {(profile.role===role.CASHER||profile.role===role.CASHERAGENT)&&
               <Col md={12}>
                    <Card>
                        <Card.Header>
                        { sortState==="year" && <Card.Title as="h5">This Year My Cash Sale In Birr</Card.Title>}
                        { sortState==="month" && <Card.Title as="h5">This Month My Cash Sale In Birr </Card.Title>}
                        { sortState==="week" && <Card.Title as="h5">This Week My Cash Sale In Birr</Card.Title>}
                        { sortState==="day" && <Card.Title as="h5">Today My Cash Sale In Birr</Card.Title>}
                        </Card.Header>
                        <Card.Body>
                         { sortState==="year" && <CasherMultiBarCashYear />}
                         { sortState==="month" && <CasherMultiBarCashMonth />}
                         { sortState==="week" && <CasherMultiBarCashWeek />}
                         { sortState==="day" && <CasherMultiBarCashDay />}

                        </Card.Body>
                    </Card>
                </Col>}

                {/* {profile.role===role.SUPERAGENT&&
               <Col md={6}>
                    <Card>
                        <Card.Header>
                        { sortState==="year" && <Card.Title as="h5">This Year Cash Sale In Birr</Card.Title>}
                        { sortState==="month" && <Card.Title as="h5">This Month Cash Sale In Birr </Card.Title>}
                        { sortState==="week" && <Card.Title as="h5">This Week Cash Sale In Birr</Card.Title>}
                        { sortState==="day" && <Card.Title as="h5">Today Cash Sale In Birr</Card.Title>}
                        </Card.Header>
                        <Card.Body>
                         { sortState==="year" && <MultiBarCashYear />}
                         { sortState==="month" && <MultiBarCashMonth />}
                         { sortState==="week" && <MultiBarCashWeek />}
                         { sortState==="day" && <MultiBarCashDay />}

                        </Card.Body>
                    </Card>
                </Col>} */}
            
            </Row>
        </React.Fragment>
    );
};

export default DashDefault;
