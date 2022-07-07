import React,{useEffect,useState} from 'react';
import NVD3Chart from 'react-nvd3';
import { gql,useQuery } from '@apollo/client';
import {useSelector} from 'react-redux'   
const initial=[
  {
      label: "today/ዛሬ",
      value: 0,
  },
]            
const MultiBarChartTicket = () => {
    const [Sales,setSales]=useState(initial)
    const [Agent,setAgent]=useState(initial)
    const [Mobile,setMobile]=useState(initial)

    const sortState=useSelector(state=>state.dashboard.sort)
    const datum = [
        {
            key: 'Sales',
            color: 'rgb(62 91 234)',
            values:Sales
        },
        {
            key: 'Agent',
            color: 'rgb(189 133 182)',
            values: Agent
        },
        {
          key: 'Mobile',
          color: 'rgb(62 191 234)',
          values: Mobile
      }
    ]
    const gqlship=gql`
    query{
        getGroupMonthLocalTicketInbr{
        totalTicket
        month
      }
      getGroupMonthAgentTicketInbr{
        totalTicket
        month
      }
      getGroupMonthMobileTicketInbr{
        totalTicket
        month
      }
      
   }`
       const {loading,error,data,refetch}=useQuery(gqlship)
       const months=["jan/ጥር","feb/የካቲ","mar/መጋቢ","apr/ሚያዝ","may/ግንቦ","jun/ሰኔ","july/ሃምሌ","aug/ነሃሴ","sep/መስክ","oct/ጥቅም","nov/ህዳር","dec/ታህሳ"]
       useEffect(()=>{
        refetch()
        if(data)
        {

          let s=[{totalTicket:20,month:3,color:'rgb(62 91 234)'},{totalTicket:40,month:2,color:'rgb(62 91 234)'}]
          let g=[{totalTicket:40,month:3,color:'rgb(189 133 182)'},{totalTicket:30,month:2,color:'rgb(189 133 182)'}]
          let m=[{totalTicket:20,month:3,color:'rgb(29 233 182)'},{totalTicket:10,month:2,color:'rgb(62 191 234)'}]
            const sales=[...initial]
            const agent=[...initial]
            const mobile=[...initial]
            s.map(e=>{
              sales[e.month+1]={label:months[e.month+1],value:e.totalTicket,color:'rgb(62 91 234)'}
              return
            })
            g.map(e=>{
              agent[e.month+1]={label:months[e.month+1],value:e.totalTicket,color:'rgb(189 133 182)'}
              return
            })
            m.map(e=>{
              mobile[e.month+1]={label:months[e.month+1],value:e.totalTicket,color:'rgb(62 191 234'}
              return
            })

            setSales(sales)
            setAgent(agent)
            setMobile(mobile)
        }
    },[data,sortState])

    return <NVD3Chart tooltip={{ enabled: true}} type="multiBarChart" datum={datum} x="label" y="value" height={300} groupSpacing={0.1} showValues />;
};

export default MultiBarChartTicket;
