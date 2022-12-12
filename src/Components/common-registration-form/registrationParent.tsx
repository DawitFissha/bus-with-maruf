import React from 'react'
import useSmallScreen from '../../utils/hooks/useSmallScreen';
export default function RegistrationParent(props:{children:React.ReactNode,customeCondition?:boolean}) {
    const smallScreen = useSmallScreen()
    return (
        <div
        style={{
            width: smallScreen || props?.customeCondition ? "100%" : "750px",
            marginLeft: smallScreen ? "" : 'auto',
            marginRight: smallScreen ? "" : 'auto',
            height:'auto',
            background:'#FFFF',
            marginBottom:'5px',
          }}
        >
            {props.children}
        </div>
    )
}