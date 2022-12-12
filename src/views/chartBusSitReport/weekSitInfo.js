import React,{useEffect,useState} from 'react';
import NVD3Chart from 'react-nvd3';
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
const WeekSitInfo = ({Data}) => {
   
    console.log(Data)
       let {sitInfoInRoute}=Data
       const weeks=["sun/ዕሁድ","mon/ሰኞ","tue/ማክስ","wen/ዕሮብ",
       "thur/ሃሙስ","fri/አርብ","sat/ቅዳሜ"]
       const [freeSits,setfreeSit]=useState(initial)
       const [reservedSits,setreservedSit]=useState(initial)
       const datum = [
        {
          key: 'Reserved Sit',
          color: 'rgb(154 178 210)',
          values: reservedSits    
       },
       {
           key: 'Free Sit',
           color: '#1F77B4',
           values: freeSits
       },
    ]
          useEffect(()=>{
           if(sitInfoInRoute?.length>0)
           {
            let sit_info=sitInfoInRoute
            console.log(sit_info)
            const free=[...initial]
            const reserved=[...initial]
            console.log(initial)
            console.log(freeSits)
            console.log(reservedSits)
            sit_info.map(e=>{
              let opensit=Number(e?.avgOpenSit)
              let openPercent=(opensit/(Number(e?.avgReservedSit)+opensit))*100
              free[e?.label-1]={label:weeks[e?.label-1],value:openPercent}
              return
            })
            // sit_info.map(e=>{
            //   let reservedsit=Number(e?.avgReservedSit)
            //   let reservedPercent=(reservedsit/(Number(e?.avgOpenSit)+reservedsit))*100
            //   reserved[e?.label-1]={label:weeks[e?.label-1],value:Math.round(reservedPercent)}
            //   return
            // })
            console.log(free)
            console.log(reserved)
               setfreeSit(free)
               setreservedSit(reserved)
           }
       },[sitInfoInRoute])
   console.log(datum)

    return <NVD3Chart tooltip={{ enabled: true}} type="multiBarChart"
     datum={datum} x="label" y="value" height={300} groupSpacing={0.1} showValues />;
};

export default WeekSitInfo;
