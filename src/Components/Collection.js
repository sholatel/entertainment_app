import React from 'react'
import { SingleMovie} from './SingleMovie'
import CollectionStyle from '../ComponentStyles/CollectionStyle.css'



/*
-Collection is a functional component that renders 
-different movie categories based on the props passed to it
-it takes four (4) props 
    **List of props**
    -isFilter (to know of the user has searched for a particular movie)
    -queryString (input search query string)
    -collectionTitle (title of the rendered movie collection)
    -categoryState
*/

export const Collection = ({isFilter,queryString, collectionTitle, categoryState}) => {
    return (
        <>
            {isFilter? <h1 className='route-header'>Found {categoryState.length} results for '{queryString}'</h1> :<h1 className='route-header'>{collectionTitle}</h1> }   
            <ul id='collection-movie'>
                {categoryState.map( (movie, index)=>{
                    return <SingleMovie movie={movie} key={index}/>
                })}
            </ul>   
        </>
    )
}