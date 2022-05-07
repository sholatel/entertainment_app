import React, {useState, useContext, useEffect} from 'react'
import { DataContext } from '../App'
import { SearchBar } from './SearchBar'
import { Trending } from './Trending'
import HomeStyle from '../ComponentStyles/Home.css'
import {Collection} from './Collection'
import { motion } from 'framer-motion'


//home route


export const Home = ({variants})=> {
    const [state, setState]=  useState([]) 
    const [queryString, setQueryString] = useState('')
    const data =useContext(DataContext)
    const isFilter=data.length!=state.length //saves true if  length of data is not equal to length of state
    //use effect hooks for setting the value of the component state once when component is being mounted 
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
        <motion.div id='home-container' variants={variants} exit='exit' initial='hidden' animate='visible'>
           <SearchBar state={state} setState={setState} queryString={queryString} setQueryString={setQueryString} searchHint="Search for movies or TV series" dataContext={data}/>           
           
           {
                !isFilter && <div id='trending-movie'>
                    <h1>Trending</h1>
                    <Trending data={data}/>
                </div>  
            } 

            <Collection  isFilter={isFilter} queryString={queryString} collectionTitle='Recommended for you' categoryState={state} />          
        </motion.div>
    )
}

