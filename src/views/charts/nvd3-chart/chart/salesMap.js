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
        getDaysAgentTicketInbr(input: $input) {
            bookedAt
            totalPrice
           }
        getDaysLocalTicketInbr(input: $input) {
            bookedAt
            totalPrice
        }
        getDaysMobileTicketInbr(input: $input) {
            bookedAt
            totalPrice
        }
        getDaysAllTicketInbr(input: $input) {
            bookedAt
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
            console.log(data)
            let sales=data.getDaysLocalTicketInbr?.map((e)=>{
                let day=new Date(e.bookedAt)
                return ({
                    x:day.getTime(),
                    y:e.totalPrice,
                })
            })
            let agent=data.getDaysAgentTicketInbr?.map((e)=>{
                let day=new Date(e.bookedAt)
                return ({
                    x:day.getTime(),
                    y:e.totalPrice,
                })
            })
            let mobile=data.getDaysMobileTicketInbr?.map((e)=>{
                let day=new Date(e.bookedAt)
                return ({
                    x:day.getTime(),
                    y:e.totalPrice,
                })
            })
            let all=data.getDaysAllTicketInbr?.map((e)=>{
                let day=new Date(e.bookedAt)
                return ({
                    x:day.getTime(),
                    y:e.totalPrice,
                })
            })
            setAll(all)
            setSales(sales)
            setAgent(agent)
            setMobile(mobile)   
        }
    },[data,sortState])
    return (
        <React.Fragment>
            {React.createElement(NVD3Chart, {
                xAxis: {
                    axisLabel:('Date'),
                    tickFormat: function(d) {
                     let D=new Date(d)
                     console.log(d)
                    return moment(D.getTime()).format("YYYY-MM-DD");
                    }
                  },
                yAxis: {
                    axisLabel: 'Sale Cash In Birr (n)',
                    tickFormat: function (d) {
                        return parseFloat(d).toFixed(2);
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
