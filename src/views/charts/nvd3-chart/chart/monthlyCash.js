import React,{useEffect,useState} from 'react';
import NVD3Chart from 'react-nvd3';
import { gql,useQuery } from '@apollo/client';
import {useSelector} from 'react-redux'  
            
const MultiBarChartTicket = () => {
  const initial=[{label:"1",value:0},{label:"2",value:0},{label:"3",value:0},{label:"4",value:0},{label:"5",value:0},{label:"6",value:0},{label:"7",value:0},{label:"8",value:0},{label:"9",value:0},{label:"10",value:0},{label:"11",value:0},{label:"12",value:0},{label:"13",value:0},{label:"14",value:0},{label:"15",value:0},{label:"16",value:0},{label:"17",value:0},{label:"18",value:0},{label:"19",value:0},{label:"20",value:0},{label:"21",value:0},{label:"22",value:0},{label:"23",value:0},{label:"24",value:0},{label:"25",value:0},{label:"26",value:0},{label:"27",value:0},{label:"28",value:0},{label:"29",value:0},{label:"30",value:0},{label:"31",value:0}]
    const [Sales,setSales]=useState(initial)
    const [Agent,setAgent]=useState(initial)
    const [Mobile,setMobile]=useState(initial)
    const sortState=useSelector(state=>state.dashboard.sort)
    const datum = [
        {
            key: 'Cash Sale In Birr By Sales',
            color: 'rgb(62 91 234)',
            values:Sales
        },
        {
            key: 'Cash Sale In Birr By Agent',
            color: 'rgb(189 133 182)',
            values: Agent
        },
        {
            key: 'Cash Sale In Birr By Mobile',
            color: 'rgb(62 191 234)',
            values: Mobile
      }
    ]
    const gqlship=gql`
    query($input:SaleInputFilter){
      getGroupLocalTicketInbr(input: $input){
      label
      totalPrice
    }
    getCasherTicketInbr(input: $input){
      label
      totalPrice
    } 
    getGroupAgentTicketInbr(input: $input){
      label
      totalPrice
    }
    getGroupMobileTicketInbr(input: $input){
      label
      totalPrice
    }
  
   }`
       const {loading,error,data,refetch}=useQuery(gqlship,{
        variables:{input:{filter:sortState
        }
      }})
       //will be removed
       const days=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"]
       useEffect(()=>{
        // refetch()
        if(data)
        {
          console.log(data)
          let s=data.getGroupLocalTicketInbr
          let g=data.getGroupAgentTicketInbr
          let m=data.getGroupMobileTicketInbr
            const sales=[...initial]
            const agent=[...initial]
            const mobile=[...initial]
            s.map(e=>{
              sales[e.label]={label:days[e.label-1],value:e.totalPrice,color:'rgb(62 91 234)'}
              return
            })
            g.map(e=>{
              agent[e.label]={label:days[e.label-1],value:e.totalPrice,color:'rgb(189 133 182)'}
              return
            })
            m.map(e=>{
              mobile[e.label]={label:days[e.label-1],value:e.totalPrice,color:'rgb(62 191 234'}
              return
            })
console.log(sales)
            setSales(sales)
            setAgent(agent)
            setMobile(mobile)
        }
    },[data,sortState])

    return <NVD3Chart tooltip={{ enabled: true}} type="multiBarChart" datum={datum} x="label" y="value" height={300} groupSpacing={0.1} showValues />;
};

export default MultiBarChartTicket;
