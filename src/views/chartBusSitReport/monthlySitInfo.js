import React,{useEffect,useState} from 'react';
import NVD3Chart from 'react-nvd3';

            
const MonthSitInfo = ({Data}) => {
  let {sitInfoInRoute}=Data
  const initial=[{label:"1",value:0},{label:"2",value:0},
  {label:"3",value:0},{label:"4",value:0},{label:"5",value:0},
  {label:"6",value:0},{label:"7",value:0},{label:"8",value:0},
  {label:"9",value:0},{label:"10",value:0},{label:"11",value:0},
  {label:"12",value:0},{label:"13",value:0},{label:"14",value:0},
  {label:"15",value:0},{label:"16",value:0},{label:"17",value:0},
  {label:"18",value:0},{label:"19",value:0},{label:"20",value:0},
  {label:"21",value:0},{label:"22",value:0},{label:"23",value:0},
  {label:"24",value:0},{label:"25",value:0},{label:"26",value:0},
  {label:"27",value:0},{label:"28",value:0},{label:"29",value:0},
  {label:"30",value:0},{label:"31",value:0}]
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
         const days=["1","2","3","4","5","6","7","8","9","10","11","12",
       "13","14","15","16","17","18","19","20","21","22","23","24","25",
       "26","27","28","29","30","31"]
          useEffect(()=>{
           if(sitInfoInRoute?.length>0)
           {
            let sit_info=sitInfoInRoute
            const free=[...initial]
            const reserved=[...initial]
            sit_info.map(e=>{
              let opensit=Number(e?.avgOpenSit)
              let openPercent=(opensit/(Number(e?.avgReservedSit)+opensit))*100
              console.log(openPercent)
              free[e?.label]={label:days[e?.label-1],value:Math.round(openPercent)}
              return
            })
            sit_info.map(e=>{
              let reservedsit=Number(e?.avgReservedSit)
              let reservedPercent=(reservedsit/(Number(e?.avgOpenSit)+reservedsit))*100
              reserved[e?.label]={label:days[e?.label-1],value:Math.round(reservedPercent)}
              return
            })

               setfreeSit(free)
               setreservedSit(reserved)
           }
       },[sitInfoInRoute])       
       

    return <NVD3Chart tooltip={{ enabled: true}} type="multiBarChart" 
    datum={datum} x="label" y="value" height={300}
     groupSpacing={0.1} showValues />;
};

export default MonthSitInfo;
