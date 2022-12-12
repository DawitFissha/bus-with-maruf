import React,{useEffect,useState} from 'react';
import NVD3Chart from 'react-nvd3';
  
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
const YearlySitInfo = ({Data}) => {  
  let {sitInfoInRoute}=Data 
       const months=["jan/ጥር","feb/የካቲ","mar/መጋቢ","apr/ሚያዝ","may/ግንቦ","jun/ሰኔ",
       "july/ሃምሌ","aug/ነሃሴ","sep/መስክ","oct/ጥቅም","nov/ህዳር","dec/ታህሳ"]
       const [freeSit,setfreeSit]=useState(initial)
       const [reservedSit,setreservedSit]=useState(initial)
       const datum = [
        {
          key: 'Reserved Sit',
          color: 'rgb(154 178 210)',
          values: reservedSit    
       },
       {
           key: 'Free Sit',
           color: '#1F77B4',
           values: freeSit
       },
    ]
          useEffect(()=>{
           if(sitInfoInRoute?.length>0)
           {
            let sit_info=sitInfoInRoute
            const free=[...initial]
            const reserved=[...initial]
            sit_info.map(e=>{
              let opensit=Number(e?.avgOpenSit)
              let openPercent=(opensit/(Number(e?.avgReservedSit)+opensit))*100
              free[e?.label-1]={label:months[e?.label-1],value:Math.round(openPercent)}
              return
            })
            sit_info.map(e=>{
              let reservedsit=Number(e?.avgReservedSit)
              let reservedPercent=(reservedsit/(Number(e?.avgOpenSit)+reservedsit))*100
              reserved[e?.label-1]={label:months[e?.label-1],value:Math.round(reservedPercent)}
              return
            })
               
               setfreeSit(free)
               setreservedSit(reserved)
           }
       },[sitInfoInRoute])

    return <NVD3Chart tooltip={{ enabled: true}} type="multiBarChart" 
    datum={datum} x="label" y="value" labelType="percent" 
    height={300} groupSpacing={0.1} showValues />;
};

export default YearlySitInfo;
