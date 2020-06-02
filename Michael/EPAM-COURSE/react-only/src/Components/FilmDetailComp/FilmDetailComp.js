import React from 'react';
import './FilmDetailComp.scss';

export function FilmDetailComp(props) {
  
  function goToSerachPage(){
    window.location.href=`/search/${props.director}?searchByTitle=`;
  }

  function goToFavorites(){
    window.location.assign('/favorites')
  }
  return (
    <div className='film-detail-comp-outer-container'>
      <div className='film-detail-comp-inner-container'>

        <div className='film-detail-comp__first-line'>
          <div className='film-detail-comp__first-line-caption'>netflixroulette</div>
          <div>
            <input className='film-detail-comp__first-line-button' type='button' value='Go to SEARCH' onClick={goToSerachPage}/>
            <input className='film-detail-comp__first-line-button' type='button' value='Go to FAVORITES' onClick={goToFavorites}/>
          </div>
        </div>

        <div className='film-detail-comp__totall-details-container'>
          <div className='film-detail-comp__poster'>
            <img className='film-detail-comp__poster-img' src={props.posterUrl} alt='POSTER IMAGE'/>
          </div>
          <div className='film-detail-comp__details'>
            <div className='film-detail-comp__title'>
              {props.title}
            </div>
            <div className='film-detail-comp__year'>
              {props.year} {props.runtime} min
            </div>
            <div className='film-detail-comp__plot'>
              {props.plot}
            </div>
            <div className='film-detail-comp__director'>
              Director: {props.director}
            </div>
            <div className='film-detail-comp__actors'>
              Cast: {props.actors}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}