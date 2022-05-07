//a hook for filtering the movie json data based on the movie 
//category by default i.e if the callback is null
//but the filtering can be done based on the callback argument 
//passed to the hook

//takes two argument (the original data array and the category of the movie)
export const useFilter = (data,category=' ', callback=null)=> {
    if (callback ===null) {
        return data.filter((movie)=> {
            return (movie.category===category) 
        })
    }
    
    else {
        return data.filter(callback)
    }
}