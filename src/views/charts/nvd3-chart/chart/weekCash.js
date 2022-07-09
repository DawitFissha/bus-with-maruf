import React,{useEffect,useState} from 'react';
import NVD3Chart from 'react-nvd3';
import { gql,useQuery } from '@apollo/client';
import {useSelector} from 'react-redux'   
const initial=[
    {
        label: "sun/ዕሁድ",
        value: 0,
    },
    {
        label: "mon/ሰኞ",
        value: 0,
    },
    {
        label: "tue/ማክስ",
        value: 0,
    },
    {
        label: "wen/ዕሮብ",
        value: 0,
    },
    {
        label: "thur/ሃሙስ",
        value: 0,
    },
    {
        label: "fri/አርብ",
        value: 0,
    },
    {
        label: "sat/ቅዳሜ",
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
            key: 'Cash By Sales',
            color: 'rgb(62 91 234)',
            values:Sales
        },
        {
            key: 'Cash By Agent',
            color: 'rgb(189 133 182)',
            values: Agent
        },
        {
          key: 'Cash By Mobile',
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
       const weeks=["sun/ዕሁድ","mon/ሰኞ","tue/ማክስ","wen/ዕሮብ","thur/ሃሙስ","fri/አርብ","sat/ቅዳሜ"]
       useEffect(()=>{
        refetch()
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
              sales[e.label-1]={label:weeks[e.label-1],value:e.totalPrice,color:'rgb(62 91 234)'}
              return
            })
            g.map(e=>{
              agent[e.label-1]={label:weeks[e.label-1],value:e.totalPrice,color:'rgb(189 133 182)'}
              return
            })
            m.map(e=>{
              mobile[e.label-1]={label:weeks[e.label-1],value:e.totalPrice,color:'rgb(62 191 234'}
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
