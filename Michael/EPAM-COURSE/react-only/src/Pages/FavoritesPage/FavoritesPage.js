import React from 'react';
import {FooterComp} from './../../Components/FooterComp/FooterComp';
import {FilmListComp} from './../../Components/FilmListComp/FilmListComp'
import {getFilmList} from './../../lib';

import './FavoritesPage.scss';

export class FavoritesPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      favoritesList: [],
    }
  }

  getFavoritesArray=()=>{
    let favString = localStorage.getItem('favoritesArray');
    let favArr=[];
    if (favString) {
      favArr = favString.split(',');
    }   
    return favArr.map((item)=>+item)
  }

  loadFilmById=(idArray)=>{
    getFilmList({
      searchArray: idArray, 
      byID: true,
    }).then((result)=>{
      this.setState({
        favoritesList : result,
      })
    })
  }

  refreshFilms=()=>{
    this.loadFilmById(this.getFavoritesArray());
  }

  componentDidMount(){
    this.loadFilmById(this.getFavoritesArray());
  }

  handleGoToSerach(){
    window.location.assign('/search');
  }

  
  render(){

    return(
      <React.Fragment>
        <div className='favorites-page-header'>
          <div className='favorites-page-outer-container'>
            <div className='favorites-page-inner-container'>
              <div className='favorites-page-container'>
                <div className='favorites-page-caption'>
                  YOUR FAVORITES FILMS
                </div>
                <div>
                  <input 
                    type='button' 
                    className='favorites-page-button'
                    onClick={this.handleGoToSerach}
                    value='go to SEARCH' />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='favorites-page-film-list'>
          {this.state.favoritesList.length === 0 ? 
            (
              <div className='favorites-page-empty-result'>No films added to favorites</div>
            )
          : 
            (<FilmListComp 
              filmList={this.state.favoritesList}
              flagRemoveFromFavorites={true}
              refreshFilms={this.refreshFilms}
            />)
          }
        </div>

        <div className='favorites-page-fotter'>
          <FooterComp/>
        </div>
      </React.Fragment>
    )
  }
}