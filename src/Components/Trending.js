import { useFilter } from "../hooks/UseFilter"
import {icons} from '../assets/icons/index'
import TrendingStyle from '../ComponentStyles/TrendingStyle.css'
import { motion , useAnimation} from "framer-motion"
import { useEffect,useRef, useState} from 'react'
 
//filter callback for getting trending movie
const isTrending= (movie)=> {
    return movie.isTrending
}





export const Trending = ({data})=> {
    const filteresData =useFilter(data, null, isTrending)
    let scrollRef=useRef() //a ref for each of the trending movie list f
    const [refWidth, setRefWidth]=useState(100)   
    //the refWidth holds the value with which the trending  movie container item will scroll
    //by default it is 100

    const controls=useAnimation()
    
    //framer-motion animation variants 
    const variants= {
        visible:  {
             translateX:-refWidth,
             transition:{delay:2 , repeat:Infinity, repeatType:'mirror', duration:20},             
        },

        initial: {
            translateX:0,
            transition:{delay:0 , repeat:Infinity, repeatType:'mirror', duration:0}
        }
    }

    //set the refWidth state when value of scrollRef.current,offSetWidth changes 
    useEffect(()=> {
        setRefWidth(scrollRef.current.offsetWidth * (filteresData.length)/2)
        controls.start('visible')
    },[refWidth])

    const setBookMarkIcon = (isBookmarked)=>{
        const bookmarkIcon=
        isBookmarked ?  {background:`#10141E url(${icons.bookmarkFull}) no-repeat center`} : {background:`#10141E url(${icons.bookmarkEmpty}) no-repeat center`}
        return bookmarkIcon
    }

  

    
    const setMovieCategoryIcon = (category)=>{
       switch(category) {
           case 'Movie':
               return {background:`url(${icons.categoryMovie}) no-repeat`}
            case 'TV Series':
               return {background:`url(${icons.categoryTv}) no-repeat`}
            default :
               return {background:`url(${icons.categoryMovie}) no-repeat`}
       }
    }

    //handler for stoping scrolling when mouse is over on the trending lists or when touched (mobile)
    const onMouseOverHandler = ()=> {     
        controls.stop()        
        controls.start('initial') //scroll  back to the initial position
         
    }

    //handler for starting  scrolling when mouse is released  on the trending lists or when untouched (mobile)
    const onMouseOutHandler = ()=> {
        controls.stop()
        controls.start('visible')              
    }  
    
    /*const onScrollHandler =()=> {
        setRefWidth(refWidth-window.scrollX)
        alert(refWidth)
    }
    */
   
    return (
        <div id="trending-movie-container">
            {filteresData.map((movie,index)=> {
                return <motion.li  ref={scrollRef} animate={controls} variants={variants}  className='movie-list' key={movie.title} style={{background:`url(${ movie.thumbnail.regular.large}) no-repeat`}} onTouchMove={onMouseOverHandler} onTouchEnd={onMouseOutHandler} onMouseOver={onMouseOverHandler} onMouseOut={onMouseOutHandler} >                           
                            <div className='bookmark-option-icon' style={setBookMarkIcon(movie.isBookmarked)}></div>
                        
                            <div className='play-movie-container'>
                                <a className='play-btn' style={{background:`url(${icons.play}) no-repeat`}}></a>
                                <p>Play</p>
                            </div>
                            <div className='movie-details-container'>
                                <div className='movie-meta-details'>
                                    <span className='movie-year'>{movie.year} .</span>
                                    <span className='category'><span id="category-icon"  style={setMovieCategoryIcon(movie.category)}/> <span id="category-name"/>{movie.category} .</span>
                                    <span className='movie-rate'>{movie.rating}</span>
                                </div>
                                <p id="movie-title">{movie.title}</p>
                            </div>
                    </motion.li>                
            })} 

        </div>
    )
}

