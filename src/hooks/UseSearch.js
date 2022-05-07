import {useFetch} from './UseFetch'
import { useState , useEffect} from 'react'

//custom hooks for handling the searching and flitering of the json content


export const useSearch= (data) => {
    const [filtered_data, setFilteredData] = useState([])
   //alert(filtered_data.length)
    const  filterData = (newFilterTest)=> {
        setFilteredData(data.filter(newFilterTest))
    } 

    //the custom hooks return new filtered_data state 
    //and a function for refiltering the data 
    //alert(Object.keys(filtered_data).length)  
    return [filtered_data,filterData] 

}