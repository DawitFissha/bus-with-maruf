import {useEffect} from 'react';
import NVD3Chart from 'react-nvd3';
import { gql,useQuery } from '@apollo/client';
import {useSelector} from 'react-redux'

let datum=[]
const PieDonutChart = () => {
    const sortState=useSelector(state=>state.dashboard.sort)
    const gqlship=gql`
    query($input:SaleInputFilter){    
        getEachAgentSale(input: $input) {
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
        if(data)
        {
        console.log(data)
        datum=data?.getEachAgentSale?.map(e=>({key:e.agentName,y:e.totalTicket}))
        }
    },[data,sortState])
    return <NVD3Chart id="chart" height={300} type="pieChart" datum={datum} x="key" y="y" donut labelType="percent" />;
};

export default PieDonutChart;
