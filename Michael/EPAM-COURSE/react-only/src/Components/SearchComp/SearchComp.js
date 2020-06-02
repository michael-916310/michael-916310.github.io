import React from 'react';
import './SearchComp.scss';
import {ModalComp} from './../ModalComp/ModalComp';


export class SearchComp extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      showModalEmptySearch:false,
    }
  }

  handleSubmit =(e) => {
    e.preventDefault();
    let el = document.querySelector(".search-comp__search-string");
    if (el) {
      if (el.value) {
        this.props.onSubmit();
        return;
      }
    }
    this.setState({
      showModalEmptySearch:true,
    });
  }

  handleByTitleClick =()=>{
    this.props.onSearchByChange(true);
  }

  handleByDirectorClick = ()=>{
    this.props.onSearchByChange(false);
  }
  
  handleCloseModal= ()=> {
    this.setState({
      showModalEmptySearch:false,
    });
  }

  handleGoToFavorites=()=>{
    window.location.assign('/favorites')
  }

  render(){

    let byTitleClassName="search-comp__search-by-title";
    let byDirectorClassName="search-comp__search-by-director";
    if (this.props.searchByTitle) {
      byTitleClassName = byTitleClassName + " search-comp__search-by_selected"
    } else {
      byDirectorClassName = byDirectorClassName + " search-comp__search-by_selected"
    }

    return (
      <div className="search-comp-outer-container">
        <div className="search-comp-inner-container">

          <div className="search-comp__caption1">
            netflixroulette
            <input 
              type='button' 
              className="search-comp__button" 
              onClick={this.handleGoToFavorites}
              value='Go to FAVORITES'/>
          </div>
          <div className="search-comp__caption2">FIND YOUR MOVIE</div>

          <form onSubmit={this.handleSubmit} >

            <input type="text"
              className="search-comp__search-string"
              onChange={this.props.onSearchStringChange}
              value={this.props.searchString}
            />
          
            <div className="search-comp__buttom-line">
              <div>
                <span className="search-comp__search-by-caption">SEARCH BY</span>
                <input className={byTitleClassName} type="button" onClick={this.handleByTitleClick} value=" TITLE "/>
                <input className={byDirectorClassName} type="button" onClick={this.handleByDirectorClick} value="DIRECTOR"/>
              </div>

              <div>
                <input className="search-comp__button" type="submit" value="  SEARCH  "/>
              </div>
            </div>  

          </form>

          {this.state.showModalEmptySearch && (
          <ModalComp>
            <div className='search-comp__modal-nothing-to-search-background'>
              <div className='search-comp__modal-nothing-to-search-outer-container'>
                There is nothing to search. Please enter non empty string to search.
                <div className='search-comp__modal-nothing-to-search-button-container'>
                  <input 
                    className='search-comp__modal-nothing-to-search-button' 
                    type='button' value='CLOSE' onClick={this.handleCloseModal}/>
                </div>
              </div>
            </div>
          </ModalComp> )}

        </div>
      </div>
    );
  }
}
