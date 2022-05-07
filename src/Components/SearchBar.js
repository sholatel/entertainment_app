import {useSearch} from '../hooks/UseSearch'
import { useSearchParams } from 'react-router-dom'
import { useContext } from 'react'
import { DataContext } from '../App'
import SearchBarStyle from '../ComponentStyles/SearchBarStyle.css'


//this component  takes a prop
//the prop will contain the state and 
//setstate function of the parent component
//the state of the parent component will be
//updated depending on the search result

export const SearchBar= ({state, setState, queryString, setQueryString , searchHint, dataContext})=> {
    //context value consumption 
    const [searchQuery, setSearchQuery] =useSearchParams({'filter':''})  
    
   
    //the filter condition function for filtering
    //json data
    function filterTest (data) {  
        return  data.title.toLowerCase().includes(searchQuery.get('filter').toLowerCase())
    }

    //custom hook for filtering json data     
    const [filteredData, filterData]=useSearch(dataContext)
  
    const search = (evt)=>  {
        //if the search input field is empty, no filtering would be made. i.e set the state to the original data 
        if (evt.target.value=='') {
            setState(dataContext)
        }

        //if the search input value is not empty, further with filtering
        else {
            setSearchQuery({filter:`${evt.target.value}`}) 
            filterData(filterTest)
            setState(filteredData)
            setQueryString(searchQuery.get('filter'))
        }        
    }

    return (       
        <div className='search-bar-container'>
            <a className='search-start-icon'></a>
            <input onChange={search} type='search' placeholder={searchHint}/>
        </div>
       
    )
}