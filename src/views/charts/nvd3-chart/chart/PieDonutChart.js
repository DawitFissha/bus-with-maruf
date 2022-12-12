import {useEffect, useState} from 'react';
import NVD3Chart from 'react-nvd3';
import { gql,useQuery } from '@apollo/client';
import {useSelector} from 'react-redux'
import { role } from '../../../../role';
// let datum=[]
const PieDonutChart = () => {
    const profile=useSelector(state=>state.userinfo)
    const sortState=useSelector(state=>state.dashboard.sort)
    const [datum,setDatum]=useState([])
    const gqlship=gql`
    query($input:SaleInputFilter){    
        getEachAgentSale(input: $input) {
            totalTicket
            agentName
           }
           getOneAgentSale(input: $input) {
            totalTicket
            agentName
           }
       }`
       const {loading,error,data,refetch}=useQuery(gqlship,{
        variables:{input:{filter:sortState
        }
      }})
      useEffect(()=>{
        refetch()
        if(data&&(profile.role===role.ADMIN||profile.role===role.SUPERADMIN))
        {
            console.log(data)
        let result=data?.getEachAgentSale?.map(e=>({key:e.agentName,y:e.totalTicket}))
        setDatum([...result])
        }
        if(data&&profile.role===role.SUPERAGENT)
        {
        let result=data?.getOneAgentSale?.map(e=>({key:e.agentName,y:e.totalTicket}))
        setDatum([...result])
        }
    },[data,sortState])
    return <NVD3Chart id="chart" height={300} type="pieChart" datum={datum} 
    x="key" y="y" donut labelType="percent" />;
};

export default PieDonutChart;
