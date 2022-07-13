import styled from 'styled-components'
import { AiFillCheckCircle,AiFillCloseCircle } from "react-icons/ai";
import {MdCheckCircleOutline,MdDangerous} from "react-icons/md"

export const Plus=styled.span`
font-size: large;
`

export const CounterStyle=styled.div`
display: inline-block;
`
export const SortBy=styled.div`
display:inline-block;
padding: 10px;
font-weight: ${(props)=>props.filter&&"bolder"};
color: ${(props)=>props.active&&"blue"};
font-weight: ${(props)=>props.active&&"bolder"};
&:hover{
    cursor: pointer;
}
`
export const StyledImg=styled.div`
&:hover{
    cursor: pointer;
    transform: scale(1.1);

}
`
export const StyledAiFillCloseCircle=styled(AiFillCloseCircle)`
&:hover{
    transform: scale(1.1);
    cursor: pointer;
}`
export const Cancel=styled(MdDangerous)`
color:blue;
&:hover{
    transform: scale(1.1);
    cursor: pointer;
}`
export const Proceed=styled(MdCheckCircleOutline)`
color:red;
&:hover{
    transform: scale(1.1);
    cursor: pointer;
}`