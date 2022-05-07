import { findAllByTestId, fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import {SearchBar} from './Components/SearchBar'
import { BrowserRouter } from 'react-router-dom';
import { SingleMovie } from './Components/SingleMovie';
import { Trending } from './Components/Trending';
import { Collection } from './Components/Collection';
import {Home} from './Components/Home'
import {Movie} from './Components/Movie'
import { TvSeries} from './Components/TvSeries';
import { Bookmark } from './Components/Bookmark';
import {DataContext} from './App'


//the search bar is expected to accept some props
//the props involve searchHint string which determione the value
//of the input element placeholder
const mockFunctions= {
    mockSetState:jest.fn(),
    mockSetQueryString:jest.fn(),
}

const mockPropObj= [
  {
    "title": "Beyond Earth",
    "thumbnail": {
      "trending": {
        "small": "./assets/thumbnails/beyond-earth/trending/small.jpg",
        "large": "./assets/thumbnails/beyond-earth/trending/large.jpg"
      },
      "regular": {
        "small": "./assets/thumbnails/beyond-earth/regular/small.jpg",
        "medium": "./assets/thumbnails/beyond-earth/regular/medium.jpg",
        "large": "./assets/thumbnails/beyond-earth/regular/large.jpg"
      }
    },
    "year": 2019,
    "category": "Movie",
    "rating": "PG",
    "isBookmarked": false,
    "isTrending": true
  },
  {
    "title": "Bottom Gear",
    "thumbnail": {
      "trending": {
        "small": "./assets/thumbnails/bottom-gear/trending/small.jpg",
        "large": "./assets/thumbnails/bottom-gear/trending/large.jpg"
      },
      "regular": {
        "small": "./assets/thumbnails/bottom-gear/regular/small.jpg",
        "medium": "./assets/thumbnails/bottom-gear/regular/medium.jpg",
        "large": "./assets/thumbnails/bottom-gear/regular/large.jpg"
      }
    },
    "year": 2021,
    "category": "Movie",
    "rating": "PG",
    "isBookmarked": false,
    "isTrending": true
  },
  {
    "title": "Undiscovered Cities",
    "thumbnail": {
      "trending": {
        "small": "./assets/thumbnails/undiscovered-cities/trending/small.jpg",
        "large": "./assets/thumbnails/undiscovered-cities/trending/large.jpg"
      },
      "regular": {
        "small": "./assets/thumbnails/undiscovered-cities/regular/small.jpg",
        "medium": "./assets/thumbnails/undiscovered-cities/regular/medium.jpg",
        "large": "./assets/thumbnails/undiscovered-cities/regular/large.jpg"
      }
    },
    "year": 2019,
    "category": "TV Series",
    "rating": "E",
    "isBookmarked": true,
    "isTrending": true
  }
]



describe('unit tests', ()=>{

  describe ('searchBar component test' , ()=>{
      it('Search bar input element placeholder should change on changing the searchHint props', async ()=>{
          render (<BrowserRouter>
              <SearchBar 
              state={[]}
              setState={mockFunctions.mockSetState}
              queryString=''
              setQueryString ={mockFunctions.mockSetQueryString} 
              searchHint ='Hi'
              dataContext={[]}
          />
          </BrowserRouter>)  
          const inputElement =screen.getByPlaceholderText('Hi')
          expect(inputElement).toBeTruthy()
      })
  })

  describe ("Single movie component test", ()=> {
    
      it("It should take an object prop", async ()=> {
          render(<SingleMovie movie={mockPropObj[0]}/>)
          const movieYearSpan= screen.getByText(/2019/i)
          expect(movieYearSpan.textContent).toBe("2019 .")
      })

      it("The paragraph element in singleMovie component should contain the movie title", async ()=> {
        render(<SingleMovie movie={mockPropObj[0]}/>)
        const movieTitle= screen.getByText(/Beyond/i)
        
        expect(movieTitle).toHaveTextContent(/Beyond Earth/i)
    })
  })


  describe('Trending component test', ()=> {
    it('Trending component should render number of movie lists that is equal to the  size of data array passed to it', async ()=> {
      render(<Trending  data={mockPropObj}/>)
      const movieLists= screen.getAllByRole(/list/i)
      expect(movieLists.length).toBe(3)
    })
  })

  describe('collection component test', ()=> {
    it('route-header heading element for search result should be visible if isFilter prop is true and vice-versa', async ()=> {
      render(<Collection isFilter={true} queryString={mockPropObj[0].title} collectionTitle={'Movie'} categoryState={mockPropObj}/>)
      const routeHeader=screen.getByText(/Found/i)
      expect(routeHeader).toBeInTheDocument
    })

    it('route-header heading element  for collection title should be visible if isFilter prop is false and vice-versa', async()=> {
      render(<Collection isFilter={false} queryString={mockPropObj[0].title} collectionTitle='Movie' categoryState={mockPropObj}/>)
      const routeHeader=screen.getByText('Movie')
      expect(routeHeader).toBeInTheDocument
    })

    it('route-header heading element  for collection title text content should be equal to the collectionTitle prop', async ()=> {
      render(<Collection isFilter={false} queryString={mockPropObj[0].title} collectionTitle='Movie' categoryState={mockPropObj}/>)
      const routeHeader=screen.getByText('Movie')
      expect(routeHeader.textContent).toBe('Movie') 
    })  
  })





})


describe ('Integrated tests', ()=> {
  describe ('Home page inter-component behavior test', ()=> {
    it('the number of single movie list in home page collection component should change when the search input field value of searchBar component is changed', async()=> {
      render(<BrowserRouter><DataContext.Provider value={mockPropObj}>
            <Home/> 
        </DataContext.Provider></BrowserRouter>)
        const container=document.getElementById('collection-movie')
        const searchBarInput = screen.getByPlaceholderText('Search for movies or TV series')
        const movieListsBefore=container.getElementsByClassName('single-movie-container')
        const movieListsLengthBeforeChange=movieListsBefore.length
        console.log(movieListsLengthBeforeChange)
        fireEvent.change(searchBarInput,{target:{value:mockPropObj[0].title}})
        const movieListsAfter= container.getElementsByClassName('single-movie-container')
        console.log(movieListsAfter.length)  
        expect(movieListsAfter.length).not.toBe(movieListsLengthBeforeChange)
    })

    it('the trending-container div should be gone in DOM when the searchBar input value is changed using the h1 element inside the container as a study case', async ()=> {
      render(<BrowserRouter><DataContext.Provider value={mockPropObj}>
            <Home/> 
        </DataContext.Provider></BrowserRouter>)      
        const searchBarInput = screen.getByPlaceholderText('Search for movies or TV series')       
        fireEvent.change(searchBarInput,{target:{value:mockPropObj[0].title}})
        const trendingHeader = screen.queryByText(/Trending/i, {exact:true})
        expect (trendingHeader).toBeNull()           
    })


  })

  describe ('Movie page inter-component behavior test', ()=> {
    it('the number of single movie list in movie page collection component should change when the search input field value of searchBar component is changed', async()=> {
      render(<BrowserRouter><DataContext.Provider value={mockPropObj}>
            <Movie/> 
        </DataContext.Provider></BrowserRouter>)
        const container=document.getElementById('collection-movie')
        const searchBarInput = screen.getByPlaceholderText('Search for movies')
        const movieListsBefore=container.getElementsByClassName('single-movie-container')
        const movieListsLengthBeforeChange=movieListsBefore.length
        console.log(movieListsLengthBeforeChange)
        fireEvent.change(searchBarInput,{target:{value:mockPropObj[0].title}})
        const movieListsAfter= container.getElementsByClassName('single-movie-container')
        console.log(movieListsAfter.length)  
        expect(movieListsAfter.length).not.toBe(movieListsLengthBeforeChange)
    })

  })

  describe ('TV series page inter-component behavior test', ()=> {
    it('the number of single movie list in tv series page collection component should change when the search input field value of searchBar component is changed', async()=> {
      render(<BrowserRouter><DataContext.Provider value={mockPropObj}>
            <TvSeries/> 
        </DataContext.Provider></BrowserRouter>)
        const container=document.getElementById('collection-movie')
        const searchBarInput = screen.getByPlaceholderText('Search for TV series')
        const movieListsBefore=container.getElementsByClassName('single-movie-container')
        const movieListsLengthBeforeChange=movieListsBefore.length
        console.log(movieListsLengthBeforeChange)
        fireEvent.change(searchBarInput,{target:{value:mockPropObj[0].title}})
        const movieListsAfter= container.getElementsByClassName('single-movie-container')
        console.log(movieListsAfter.length)  
        expect(movieListsAfter.length).not.toBe(movieListsLengthBeforeChange)
    })
  })

  describe ('Bookmark page inter-component behavior test', ()=> {
    it('the number of Bookmarked movie list in movie page collection component should change when the search input field value of searchBar component is changed', async()=> {
      render(<BrowserRouter><DataContext.Provider value={mockPropObj}>
            <Bookmark/> 
        </DataContext.Provider></BrowserRouter>)
        const container=document.getElementById('collection-movie')
        const searchBarInput = screen.getByPlaceholderText('Search for bookmarked shows')
        const movieListsBefore=container.getElementsByClassName('single-movie-container')
        const movieListsLengthBeforeChange=movieListsBefore.length
        console.log(movieListsLengthBeforeChange)
        fireEvent.change(searchBarInput,{target:{value:mockPropObj[0].title}})
        const movieListsAfter= container.getElementsByClassName('single-movie-container')
        console.log(movieListsAfter.length)  
        expect(movieListsAfter.length).not.toBe(movieListsLengthBeforeChange)
    })

  })

  


})

