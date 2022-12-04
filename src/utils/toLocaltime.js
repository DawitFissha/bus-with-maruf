
const toLocalTime=(hour,remark)=>{
let localTime=hour>6?hour-6:hour+6
let tag
if((hour>=1&&hour<6&&remark.toLowerCase()=='am'))
{
tag="ለሊት"
return ({localHour:localTime,localTag:tag})
}
else if(hour>=6&&hour<12&&remark.toLowerCase()=='am')
{
tag="ጧት"
return ({localHour:localTime,localTag:tag})
}
else if(hour>=1&&hour<6&&remark.toLowerCase()=='pm'||
hour==12&&remark.toLowerCase()=='am')
{
tag="ቀን"
return ({localHour:localTime,localTag:tag})
}
else if(hour>=6&&hour<=12&&remark.toLowerCase()=='pm')
{
tag="ማታ"
return ({localHour:localTime,localTag:tag})
}
}
const toTewelvHourAndLocal=(date)=>{
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    const {localHour,localTag}=toLocalTime(hours,ampm)
    var strTime = localHour + ':' + minutes + ' ' + localTag;
    return strTime;
}
export{
    toLocalTime,
    toTewelvHourAndLocal
}