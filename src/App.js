import './App.css';
import {Nav} from './Components/Nav'
import {Routes, Route,useLocation} from 'react-router-dom'
import {useFetch} from './hooks/UseFetch';
import { createContext} from 'react';
import { Home } from './Components/Home';
import { Movie } from './Components/Movie';
import { TvSeries } from './Components/TvSeries';
import { Bookmark } from './Components/Bookmark';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';


export const DataContext =createContext(null)

//routes transition animation variants
const variants= {
  hidden: {
      opacity:0,
      x:'100vw'
  },
  visible: {
      opacity:1,
      x:0,
      transition: {
          duration:0.7,
          delay:0.1,
          delayChildren:0.1,
          
      }
  },
  exit:{
      x:'-100vw',
      transition: {
          ease:'easeInOut'
      }
  }
}


function App() {
  const data=useFetch('data.json')
  const location=useLocation()

  
 
 
  return (
    <div className="App">
      <Nav/>
      { !(data.length==0)? <DataContext.Provider value={data}>
        
      <section>
        <AnimatePresence exitBeforeEnter >
        <Routes location={location} key={location.pathname} >  
          <Route path='/' element={<Home variants={variants}/>}></Route>
          <Route path='movie' element={<Movie variants={variants} />}></Route>
          <Route path='tv-series' element={<TvSeries variants={variants} />}></Route>
          <Route path='bookmark' element={<Bookmark  variants={variants}/>}></Route>
        </Routes>
        </AnimatePresence>
      </section>
      </DataContext.Provider>: null }
    </div>
  );
}
export default App;
