import React , {useEffect, useState,} from 'react'
import axios from 'axios'


//hooks for fetching data from api endpoint 
export const useFetch =   (url)=> {      
    const [json_data, setJsonData] =useState([]) //state for holding the json data  fetched  
  
    useEffect(()=> {
        axios.get(url).then(res=> {
            setJsonData  (res.data)
         }).catch (err=> {
             alert(err)
         })        
    },[])

    return json_data
}