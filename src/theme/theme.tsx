
import {createTheme} from '@mui/material/styles'

export const theme = createTheme({
    components:{
        MuiTextField:{
            styleOverrides:{
                // root:{
                //     minWidth:'460px',
                //     maxWidth:'600px'
                // }
            },
            defaultProps:{
                inputProps:{
                min:0,
                },
                fullWidth:true,
            }
        },
        MuiButton:{
           styleOverrides:{
               root:{
                   fontSize:16,
                   textTransform:'none',
                   backgroundColor:'#2E86C1',
                   color:'white',
                   borderColor: '#0063cc',
                   '&:hover':{
                    background:'#2E86C1',
                   },
               }
           },
           defaultProps:{
            variant:'contained',
            size:'medium',
            fullWidth:true,
        }
        },
        MuiDialogContent:{
            styleOverrides:{
                root:{
                    padding:0,
                    margin:0,
                }
            }
        },
        MuiButtonBase:{
            defaultProps:{
                disableRipple:true,
                
            }
        },
        MuiFormControl:{
            defaultProps:{
                variant:'outlined'
            }
        },
        MuiIconButton:{
            defaultProps:{
                color:'primary'
            }
        },
        MuiTab:{
            styleOverrides:{
                root:{
                    textTransform:'none'
                }
            }
        }
    }
})