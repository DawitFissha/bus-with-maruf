import {useEffect} from 'react';
import NVD3Chart from 'react-nvd3';
import { gql,useQuery } from '@apollo/client';
import {useSelector} from 'react-redux'
let datum=[]
const PieDonutAllSitRatio = () => {
    const profile=useSelector(state=>state.userinfo)
    const sortState=useSelector(state=>state.dashboard.sort)
    const gqlship=gql`
    query($input:SaleInputFilter){    
           getAggregateSitReserve(input: $input)
           {
             avgOpenSit
             avgReservedSit
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
        datum=[{key:"Average Free Sit",y:data?.getAggregateSitReserve?.avgOpenSit},
        {key:"Average Reserved Sit",y:data?.getAggregateSitReserve?.avgReservedSit}]
        // data?.getAggregateSitReserve?.map(e=>({key:e.avgSit,y:e.avgReservedSit}))
        }
    },[data,sortState])
    console.log(data)

    return <NVD3Chart id="chart" height={300} type="pieChart" datum={datum} 
    x="key" y="y" donut labelType="percent" />;
};

export default PieDonutAllSitRatio;
