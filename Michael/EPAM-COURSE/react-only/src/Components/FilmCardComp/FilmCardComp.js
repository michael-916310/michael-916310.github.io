import React from 'react';
import './FilmCardComp.scss';
import {ModalComp} from './../ModalComp/ModalComp';
import {Modal2ButtonsComp} from './../Modal2ButtonsComp/Modal2ButtonsComp';

export class FilmCardComp extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      showModalAddToFavorites: false,
      showModalRemoveFromFavorites: false
    }
  }

  handleOpenModalClick=()=>{
    if (this.props.flagAddToFavorites) {
      this.setState({
        showModalAddToFavorites: true,
      });
    } else if (this.props.flagRemoveFromFavorites) {
      this.setState({
        showModalRemoveFromFavorites:true, 
      })
    }
  }

  handleAddClick=()=>{
    const favString = localStorage.getItem('favoritesArray');
    if (favString) {
      let favArr = favString.split(',');
      if (!favArr.includes(""+this.props.id)) {
        localStorage.setItem('favoritesArray', [...favArr, [this.props.id]].join(','));
      }
    } else {
      localStorage.setItem('favoritesArray', [this.props.id].join(','));
    }

    this.setState({
      showModalAddToFavorites: false,
    });
  }

  handleCloseClick=()=>{
    this.setState({
      showModalAddToFavorites: false,
      showModalRemoveFromFavorites: false,
    });
  }

  handleRemoveClick=(id)=>{
    const favString = localStorage.getItem('favoritesArray');
    if (favString) {
      const favArr = favString.split(',');
      const newFav= favArr.filter((item)=>{return !( Number(item) == Number(id) )})
      localStorage.setItem('favoritesArray', newFav.join(','));
    }

    this.handleCloseClick();
    this.props.refreshFilms();
  }

  render(){
    return (
      <div className='film-card-comp-container'>
        
        <img 
          className='film-card-comp__poster' 
          src={this.props.posterUrl} alt='film poster'
          onClick={this.props.onPosterClick}
        />
        
        <div className='film-card-comp__line1'>
          <span className='film-card-comp__title'>{this.props.title}</span>
          <span className='film-card-comp__year'>{this.props.year}</span>
        </div>

        <div className='film-card-comp__line2'>
          <div>
            {this.props.genres} <br/>
            Runtime: {this.props.runtime} minute <br/>
            Director: {this.props.director}
          </div>
          <img 
            className="film-card-comp__star" 
            src='/img/favorites_star.ico' alt='star'
            onClick={this.handleOpenModalClick}/>
        </div>

        {this.state.showModalAddToFavorites && (
          <Modal2ButtonsComp
            message={`Add film "${this.props.title}" by "${this.props.director}" to favorites?`}
            actionButtonName = 'ADD'
            onActionClick={this.handleAddClick}
            onCloseClick={this.handleCloseClick}
          />
        )}

        {this.state.showModalRemoveFromFavorites && (
          <Modal2ButtonsComp
            message={`Remove film "${this.props.title}" by "${this.props.director}" from favorites?`}
            actionButtonName = 'REMOVE'
            onActionClick={()=>this.handleRemoveClick(this.props.id)}
            onCloseClick={this.handleCloseClick}
          />
        )}

    </div>
    )
  }
}