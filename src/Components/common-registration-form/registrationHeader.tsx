import React from 'react'
export function RegistrationHeader({description}:{description:string}){
return(
    // <h2 style={{textAlign:"center"}}>{description}</h2>
    <h1 
    style = {{
      textAlign:'center',
        fontFamily: "PlusJakartaSans-ExtraBold, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
        fontSize: '2.25rem',
        lineHeight: 1.22222,
        letterSpacing: '0.2px',
        fontWeight: 800,
        // scroll-margin-top: calc(var(--MuiDocs-header-height) + 32px);
        // margin: 10px 0px;
        color: "#0A1929",
      
      }}>
    {description}
  </h1>
)
}