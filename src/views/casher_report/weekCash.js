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

    const sortState=useSelector(state=>state.dashboard.sort)
    const datum = [
        {
            key: 'Cash Sale In Birr By Sales',
            color: 'rgb(62 91 234)',
            values:Sales
        }
    ]
    const gqlship=gql`
    query($input:SaleInputFilter){
      getCasherTicketInbr(input: $input){
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
          let s=data.getCasherTicketInbr
            const sales=[...initial]

            s.map(e=>{
              sales[e.label-1]={label:weeks[e.label-1],value:e.totalPrice,color:'rgb(62 91 234)'}
              return
            })
            setSales(sales)
        }
    },[data,sortState])

    return <NVD3Chart tooltip={{ enabled: true}} type="multiBarChart" datum={datum} x="label" y="value" height={300} groupSpacing={0.1} showValues />;
};

export default MultiBarChartTicket;
