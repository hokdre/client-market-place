import React, { useState, useEffect, useCallback, useRef } from 'react';


const Slider = props => {
   

    let { autoPlay, time, width, children, indicator } = props

    const [auto, setAuto] = useState(null)
    const [x, setX] = useState(0) 
    const [index, setIndex ] = useState(0)
    const asyncIndex = useRef(0)

    useEffect(() => {
        return () => {
            if(auto) clearInterval(auto)
        }
    },[auto])

    useEffect(() => {
        asyncIndex.current = index
    })

    function resetInterval(){
        stopInterval()
        startInterval()
    }
    function stopInterval(){
        clearInterval(auto)
    }
    function startInterval(){
        let interval = setInterval(()=>{
           goNext("fromAuto")
        }, time ? time : 3000)
        setAuto(interval)
    }
    //trigger autoPlay
    useEffect(() => {
        if(autoPlay){
           startInterval()
        }
    },[])
    
    function goNext(callFrom) {
        if (!callFrom){
            resetInterval()
        }

        if(asyncIndex.current < children.length-1){
            setIndex(asyncIndex.current + 1)
            setX(x => x-100)
            asyncIndex.current = asyncIndex.current + 1
        }else{
            setIndex(0)
            setX(0)
            asyncIndex.current = 0
        }

    }
    
    function goPrev(callFrom) {
        if(!callFrom){
            resetInterval()
        }
        if(asyncIndex.current > 0 ) {
            setIndex(asyncIndex.current - 1)
            setX(x => x + 100)
            asyncIndex.current = asyncIndex.current - 1
        }else{
            let lastIndex = children.length-1
            setIndex(lastIndex)
            setX(lastIndex * -100)
            asyncIndex.current = lastIndex
        }
        
    }


    function goJump(target){
        let direction = "NEXT"
        let distance = 0
        if (target > asyncIndex.current) {
            distance =  target - asyncIndex.current
        }
        if (target < asyncIndex.current ) {
            distance = asyncIndex.current - target
            direction = "PREV"
        }

        resetInterval()
        if(direction === "PREV") {
            setIndex(asyncIndex.current - distance)
            asyncIndex.current = asyncIndex.current - distance
            setX(x => x+ (distance * 100))
        }
        if(direction === "NEXT") {
            setIndex(asyncIndex.current + distance)
            asyncIndex.current = asyncIndex.current + distance
            setX(x => x + (distance * -100))
        }
    }

    let transform =  `translateX(${x}%)`
    if (!width) {
        width = 1
    }

    let dots = null 
    if (indicator){
     dots = (
     <div className="slider__dots">
        {
            children.map((_, i) =>(
            <span 
                key={i} 
                onClick={()=>goJump(i)} 
                className={i === asyncIndex.current ? "slider__dot slider__dot--active" : "slider__dot"}>
            </span>)
        )}
      </div>)
    }

    return (
        <div className="slider">  
            {React.Children.map(children, child => {
                return React.cloneElement(child, {
                    style  : {
                        ...child.props.style,
                        flexShrink: 0,
                         width : `${(100 / width)}%`,
                         height : '100%',
                         transform : transform,
                         transition: '350ms',
                         transitionProperty: 'transform',transitionTimingfunction: 'ease-in'
                    }
                })
            })}
            <div onClick={goPrev} className="slider__button slider__button--prev"></div>
            <div onClick={goNext} className="slider__button slider__button--next"></div>
           {dots}
        </div>
    )
}

export default Slider;