import React from 'react';
import {FilmListComp as FilmList} from '../../Components/FilmListComp/FilmListComp';
import {FooterComp as Footer} from '../../Components/FooterComp/FooterComp';
import {FilmDetailComp} from '../../Components/FilmDetailComp/FilmDetailComp';
import {getFilmList} from '../../lib';
import {SpinnerComp} from './../../Components/SpinnerComp/SpinnerComp';

import './FilmPage.scss'

export class FilmPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      filmTitle: props.match.params.filmName,
      filmDesc: {
        posterUrl: '',
        title: '',
        year: '',
        runtime: '',
        plot: '',
        director: '',
        actors: ''
      },
      filmList:[],
      isLoading: false,
    }
  }

  getFilmDesc(){
    if (this.state.filmTitle) {
      this.setState({
        isLoading: true,
      });
      return getFilmList({
        searchString:this.state.filmTitle, 
        byTitle:true
      }).then((result)=>{
        if (Array.isArray(result) && result.length === 1) {
          this.setState({
            filmDesc:{
              posterUrl: result[0].posterUrl,
              title: result[0].title,
              year: result[0].year,
              runtime: result[0].runtime,
              plot: result[0].plot,
              director: result[0].director,
              actors: result[0].actors
            },
            isLoading: false,
          })
        }
      })
    }
  }

  getFilmListByDirector(){
    if (this.state.filmDesc.director){
      this.setState({
        isLoading: true,
      });      
      return getFilmList({
        searchString: this.state.filmDesc.director,
        byDirector:true,
      }).then((result)=>{
        if (result.length>0){
          this.setState({
            filmList:result,
            isLoading: false,
          })
        }
      })
    }
  }

  componentDidMount(){
    this.getFilmDesc()
      .then(()=>{
        this.getFilmListByDirector();
      });
  }


  render(){

    return(
      <React.Fragment>
        
        <div className='film-page-header'>
          <FilmDetailComp
            posterUrl={this.state.filmDesc.posterUrl}
            title={this.state.filmDesc.title}
            year={this.state.filmDesc.year}
            runtime = {this.state.filmDesc.runtime}
            plot = {this.state.filmDesc.plot}
            director = {this.state.filmDesc.director}
            actors = {this.state.filmDesc.actors}
          />
        </div>

        <div className='film-page-content'>
          <FilmList 
            renderFirstLine={<div>Films by {this.state.filmDesc.director} </div>}
            filmList={this.state.filmList}
            flagAddToFavorites = {true}
            />
        </div>
        

        <div className='film-page-footer'>
          <Footer/>
        </div>

        <SpinnerComp isLoading={this.state.isLoading}/>
        
      </React.Fragment>
    )
  }
}

