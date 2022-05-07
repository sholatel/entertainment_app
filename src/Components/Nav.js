import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import navStyle from '../ComponentStyles/NavStyle.css'
import {icons} from '../assets/icons/index'
import {logo} from '../assets/icons/index'
import image from '../assets/images/image-avatar.png'


//the nav bar component
export const Nav =() => {
    const navigate=useNavigate()
    const navLinkStyles= {all:{backgroundImage:`url(${icons.navHome})`}, 
      movie:{backgroundImage:`url(${icons.navMovie})`},
      tvSeries: {backgroundImage:`url(${icons.navTvseries})`},   
      bookMark: {backgroundImage:`url(${icons.navBookmark})`}
    }
   
    const logoStyle= {backgroundImage:`url(${logo})`}
    const imageStyle= {backgroundImage:`url(${image})`}
    return (
        <nav>
            <div id='logo' style={logoStyle} onClick={()=> {navigate('/')}}/>
            <div id='movie-category-opt'>
                <NavLink id='acategoryll-' to='/' style={navLinkStyles.all}/>
                <NavLink id='movie' to='movie'  style={navLinkStyles.movie}/>
                <NavLink id='tv-series' to='tv-series' style={navLinkStyles.tvSeries}/>
                <NavLink id='bookmark' to='bookmark'  style={navLinkStyles.bookMark}/>
            </div>
            <div id='profile-img' style={imageStyle}/>
        </nav>
    )
}