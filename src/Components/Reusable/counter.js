
import { useEffect,useRef, useState } from 'react';
import { motion,animate} from 'framer-motion';
import { animatinoA } from '../Animation/animation';
import {CounterStyle,Plus} from '../styled/main.styled'
export default function Counter({count}) {
  const [done,setDone] =useState(false)
    const ref = useRef();
    useEffect(() => {
      const controls = animate(count.from, count.to, {
        duration: 5,
        onUpdate(value) {
          ref.current.textContent = value.toFixed(0);
        }
      });
      setTimeout(function(){setDone(true)},5000)
      return () => controls.stop()
      
    }, [count.from, count.to]);
    return(
      <>
          <div as={motion.div}
          variants={animatinoA}
          initial="from"
          animate="to"
          whileHover="hover">
              <CounterStyle ref={ref}> </CounterStyle>{done&&<Plus>+</Plus>}
      </div>
      </>
  )
   
  }