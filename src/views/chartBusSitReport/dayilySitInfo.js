import React,{useEffect,useState} from 'react';
import NVD3Chart from 'react-nvd3';
  
const initial=[
  {
      label: "today/ዛሬ",
      value: 0,
  },
]            
const DailySitInfo = ({Data}) => {
  let {sitInfoInRoute}=Data
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
              free[0]={label: "today/ዛሬ",value:Math.round(openPercent),
              color:'rgb(62 91 234)'}
              return
            })
            sit_info.map(e=>{
              let reservedsit=Number(e?.avgReservedSit)
              let reservedPercent=(reservedsit/(Number(e?.avgOpenSit)+reservedsit))*100
              reserved[0]={label: "today/ዛሬ",value:Math.round(reservedPercent),
              color:'rgb(189 133 182)'}
              return
            })
            
            setfreeSit(free)
            setreservedSit(reserved)
        }
    },[sitInfoInRoute])

    return <NVD3Chart tooltip={{ enabled: true}} type="multiBarChart" 
    datum={datum} x="label" y="value" height={300} groupSpacing={0.1} showValues />;
};

export default DailySitInfo;
