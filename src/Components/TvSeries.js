import React, {useState, useContext, useEffect} from 'react'
import { DataContext } from '../App'
import { SearchBar } from './SearchBar'
import { useFilter } from '../hooks/UseFilter'
import { Collection } from './Collection'
import TvSeriesStyle from '../ComponentStyles/TVSeriesStyle.css'
import { motion } from 'framer-motion'



//TV series route

export const TvSeries = ({variants})=> {
    const [state, setState]=  useState([]) 
    const [queryString, setQueryString] = useState('')
    const data =useFilter(useContext(DataContext),'TV Series')
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
        <motion.div id='tvSeries-container' variants={variants} exit='exit' initial='hidden' animate='visible'>
            <SearchBar state={state} setState={setState} queryString={queryString} setQueryString={setQueryString} searchHint="Search for TV series" dataContext={data}/>
            <Collection isFilter={isFilter} queryString={queryString} collectionTitle='TV series' categoryState={state} /> 
        </motion.div>
    )
}
