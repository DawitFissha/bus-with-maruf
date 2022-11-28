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
       useEffect(()=>{
        refetch()
        if(data)
        {
          let s=data.getCasherTicketInbr
            const sales=[...initial]
            s.map(e=>{
              sales[0]={label: "today/ዛሬ",value:e.totalPrice,color:'rgb(62 91 234)'}
              return
            })
            setSales(sales)
        }
    },[data,sortState])

    return <NVD3Chart tooltip={{ enabled: true}} type="multiBarChart" datum={datum} x="label" y="value" height={300} groupSpacing={0.1} showValues />;
};

export default MultiBarChartTicket;
