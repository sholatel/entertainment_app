import React, {useState, useContext, useEffect} from 'react'
import { DataContext } from '../App'
import { SearchBar } from './SearchBar'
import { useFilter } from '../hooks/UseFilter'
import { Collection } from './Collection'
import BookmarkStyle from '../ComponentStyles/BookmarkStyle.css' 
import { motion } from 'framer-motion'


//filter callback for getting bookmarked movie
const isBookmarked = (movie)=> {
    return movie.isBookmarked
}



export const Bookmark = ({variants})=> {
    const [state, setState]=  useState([]) 
    const [queryString, setQueryString] = useState('')
    const data =useFilter(useContext(DataContext), null, isBookmarked)
    const isFilter=data.length!=state.length //saves true if  length of data is not equal to length of state
    useEffect(()=> {
        setState(data)
   },[
])
    
    useEffect(()=> {
       //do nothing **NB: in order to re render when state changes wihtout based on query string search filter**
       //if this useEffect is not used, the first used effect(above) will set state to original data overriding 
       //the filtered data from searchBar 
   },[state
])
  
    return (
        <motion.div id='bookmark-container' variants={variants} exit='exit' initial='hidden' animate='visible'>
           <SearchBar state={state} setState={setState} queryString={queryString} setQueryString={setQueryString} searchHint="Search for bookmarked shows" dataContext={data}/>  
            <Collection isFilter={isFilter} queryString={queryString} collectionTitle='Bookmarked Movies' categoryState={state} /> 
        </motion.div>
    )
}
