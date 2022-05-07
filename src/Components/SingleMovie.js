import React from 'react'
import {icons} from '../assets/icons'
import SingleMovieStyle from '../ComponentStyles/SingleMovieStyle.css'
import { motion } from 'framer-motion'
//a functional component for displaying single movie details and thumbnail
export const SingleMovie= ({movie})=>{
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

    return (
        <motion.li  className='single-movie-container' key={movie.title}  whileInView={{rotateY:[180, 0]}} transition={{duration:0.7 ,delay:0.1}} >
                        
           <div className='movie-thumbnail' style={{background:`url(${ movie.thumbnail.regular.small}) no-repeat`}} >
                <div className='bookmark-option-icon' style={setBookMarkIcon(movie.isBookmarked)}></div>
                
                <div className='play-movie-container'>
                <a className='play-btn' style={{background:`url(${icons.play}) no-repeat`}}></a>
                <p>Play</p>
            </div>     
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
        )
}