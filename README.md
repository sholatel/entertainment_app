
# About the project
    Entertainment web app is a web software for video streaming services. It contains different movie collections from  tv series to ordinary movies and so on. The site has categories of movies which include: Trending movies, bookmarked movies, tv series, and ordinary movies. The project is just a demo to show my proficiency in working with react, react hooks, react router, react state management, react component, animation , styling , api connection and so on. It should be noted that no real communication with an api endpoint in this project but rather, the data are being fetched from a fake data.json file located in the public url of this project. And also, the videos are displayed as thumbnails in PNG format i.e no real video would be available or rendered.

# List of Library, package, framework, or language used
 * React
 * Javascript
 * vanilla CSS
 * HTMl 
 * Framer-motion (Animation library for react)
 * axios
 * react-router-dom

# Technical description
 ### Routes
    Four main routes were used in this project. The routes include:
     1. the home route ('/')
     2. the movie route ('/movie')
     3. the tv series route ('/tv-series')
     4. the bookmark movie route ('/bookmark')

    The home route navigates to the home page where all movies in the data json or api are displayed without any filtering, the movie route navigates to ordinary movies (non tv series), the tv series route navigates to the movies that categorized under TV series, while bookmark route navigates to bookmarked movies only
    
 ### test
    In this project, TDD approach was used in order to acheive quality software development. Individual component were tested and also interactions between component were tested too using react testing library supported with jest.

 ### Hooks
  In this project, I have created three custom react hooks for flexibilbity and efficiency of the app. The hooks are:
   * useFetch
   * useFilter
   * useSearch

   #### useFetch 
     useFetch  helps to fetch data from api endpoint with the help of axios library. It has its own state for managing data fetched from the server.It helps eliminate the headache of writing the logic for fetching api from the server everytime there is need to fetch data from the server, instead the useFetch hook is used. 

   #### useFilter
     useFilter hook helps to filter the data passed to it based on the filter test. It is intended to filter the movie api based on the category or filter test callBack passed to it. for example:
    
```javascript
const filteredData= useFilter(data, 'movie')
/*the filteredData will be a new version of data  list reduced based on objects that their category properties are movies */ 
      
```   

   #### useSearch
    useSearch performs search functionality by filtering the component state based on the query param entered by the user. The query param would be retrieved from the search input element and would be compared to the movie objects in the data list and return movies that have their titles matched with the search query param string to be equal.    


 # Developer contact
   [Email] <yusuforiade1616@gmail.com>\
   [twitter] <https://twitter.com/oye_sholatel>\
   [linkedin] <https://www.linkedin.com/in/yusuf-sholadoye-7468081a3/>   


