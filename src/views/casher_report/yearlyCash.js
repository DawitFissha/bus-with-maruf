import React,{useEffect,useState} from 'react';
import NVD3Chart from 'react-nvd3';
import { gql,useQuery } from '@apollo/client';
import {useSelector} from 'react-redux'   
const initial=[
  {
      label: "jan/ጥር",
      value: 0,
  },
  {
      label: "feb/የካቲ",
      value: 0,
  },
  {
      label: "mar/መጋቢ",
      value: 0,
  },
  {
      label: "apr/ሚያዝ",
      value: 0,
  },
  {
      label: "may/ግንቦ",
      value: 0,
  },
  {
      label: "jun/ሰኔ",
      value: 0,
  },
  {
      label: "july/ሃምሌ",
      value: 0,
  },
  {
      label: "aug/ነሃሴ",
      value: 0,
  },
  {
      label: "sep/መስክ",
      value: 0,
  },
  {
      label: "oct/ጥቅም",
      value: 0,
  },
  {
      label: "nov/ህዳር",
      value: 0,
  },
  {
      label: "dec/ታህሳ",
      value: 0,
  }
]            
const MultiBarChartTicket = () => {
    const [Sales,setSales]=useState(initial)

    const sortState=useSelector(state=>state.dashboard.sort)
    const datum = [
        {
            key: 'Cash Sale In Birr By Sales',
            color: 'rgb(62 91 234)',
            values:Sales
        },
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
       const months=["jan/ጥር","feb/የካቲ","mar/መጋቢ","apr/ሚያዝ","may/ግንቦ","jun/ሰኔ","july/ሃምሌ","aug/ነሃሴ","sep/መስክ","oct/ጥቅም","nov/ህዳር","dec/ታህሳ"]
       useEffect(()=>{
        refetch()
        if(data)
        {
        let s=data?.getCasherTicketInbr
        const sales=[...initial]
            s.map(e=>{
              sales[e?.label-1]={label:months[e?.label-1],value:e?.totalPrice,color:'rgb(62 91 234)'}
              return
            })
            setSales(sales)
        }
    },[data,sortState])

    return <NVD3Chart tooltip={{ enabled: true}} type="multiBarChart" datum={datum} x="label" y="value" height={300} groupSpacing={0.1} showValues />;
};

export default MultiBarChartTicket;
