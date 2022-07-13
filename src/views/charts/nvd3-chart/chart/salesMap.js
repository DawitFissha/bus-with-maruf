import React,{useState,useEffect} from 'react';
import NVD3Chart from 'react-nvd3';
import { gql,useQuery } from '@apollo/client';
import {useSelector} from 'react-redux'
import moment from 'moment'

const LineChart = () => {
    const [Sales,setSales]=useState([])
    const [Mobile,setMobile]=useState([])
    const [Agent,setAgent]=useState([])
    const [All,setAll]=useState([])
    const sortState=useSelector(state=>state.dashboard.sort)
    const datas= [
        {
            key: 'Sales',
            color: '#A389D4',
            values: Sales,
        },
        {
            key: 'Agent',
            color: '#04a9f5',
            values:Agent,
          
        },
        {
            key: 'Mobile',
            color: '#04a93e',
            values:Mobile, 
        },
        {
        key: 'Total Sale',
        color: '#1de9b6',
        area: true,
        values:All,
        }]

    const gqlship=gql`
    query($input:SaleInputFilter){    
        getDaysInbr(input: $input) {
            AgentTicket{
                bookedAt
                totalPrice
            }
            MobileTicket{
                bookedAt
                totalPrice
            }
            LocalTicket{
                bookedAt
                totalPrice
            }
            AllTicket{
                bookedAt
                totalPrice
            }
            
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
            let localbirr=data.getDaysInbr?.filter(e=>e.LocalTicket!==null).map(e=>e.LocalTicket)
            let agentbirr=data.getDaysInbr?.filter(e=>e.AgentTicket!==null).map(e=>e.AgentTicket)
            let mobilebirr=data.getDaysInbr?.filter(e=>e.MobileTicket!==null).map(e=>e.MobileTicket)
            let allbirr=data.getDaysInbr?.filter(e=>e.AllTicket!==null).map(e=>e.AllTicket)
            console.log(localbirr.flat())
            let sales=localbirr.flat().map((e)=>{
                let day=new Date(e?.bookedAt)
                console.log(day)
                return ({
                    x:day.getTime(),
                    y:e?.totalPrice,
                })
            })
            let agent=agentbirr?.flat().map((e)=>{
                let day=new Date(e?.bookedAt)
                return ({
                    x:day.getTime(),
                    y:e?.totalPrice,
                })
            })
            let mobile=mobilebirr?.flat().map((e)=>{
                let day=new Date(e?.bookedAt)
                return ({
                    x:day.getTime(),
                    y:e?.totalPrice,
                })
            })
            let all=allbirr?.flat().map((e)=>{
                let day=new Date(e?.bookedAt)
                return ({
                    x:day.getTime(),
                    y:e?.totalPrice,
                })
            })
           
              console.log(sales)
                setSales(sales)
                setAgent(agent)
                setMobile(mobile) 
                setAll(all)
             
        }
    },[data,sortState])
    return (
        <React.Fragment>
            {React.createElement(NVD3Chart, {
                xAxis: {
                    axisLabel:('Sale Date'),
                    tickFormat: function(d) {
                     let D=new Date(d)
                     console.log(moment(D.getTime()).format("YYYY-MM-DD"))
                    return moment(D.getTime()).format("YYYY-MM-DD");
                    }
                  },
                yAxis: {
                    axisLabel: 'Sale Cash In Birr (n)',
                    tickFormat: function (d) {
                        return d;
                    }
                },
                type: 'lineChart',
                datum: datas,
                x: 'x',
                y: 'y',
                height: 300,
                renderEnd: function () {
                }
            })}
        </React.Fragment>
    );
};
export default LineChart;
