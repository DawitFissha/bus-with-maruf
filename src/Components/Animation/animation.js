export const animatinoA={
    from:{opacity:1,color:'blue',x:4,y:2},
    to:{transition:
    { delay:1,duration:1
    },when:"beforeChildren",staggerChildren:0.4},
   
    exit:{}
}//yoyo 10 mins 10 key frame  from to to hover we can use yoyo:Infinity
//exit will excute on dom element exit
export const loaderA={
to:{
    x:-60,
    y:[-10,10],
transition:{
    // x:{duration:1,repeat:Infinity},
    y:{duration:1,repeat:Infinity},
}}
}
export const loaderB={
to:{
    x:-20,
    y:[-10,10],
transition:{
    // x:{duration:1,repeat:Infinity},
    y:{duration:2,repeat:Infinity,ease:'easeInOut'},
}}
}
export const loaderC={
to:{
    x:20,
    y:[-10,10],
transition:{
    // x:{duration:1,repeat:Infinity},
    y:{duration:1,repeat:Infinity},
}}
}