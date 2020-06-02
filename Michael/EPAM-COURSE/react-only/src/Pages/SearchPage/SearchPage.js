/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react'

import {SearchComp} from '../../Components/SearchComp/SearchComp';
import {FilmListComp as FilmList} from '../../Components/FilmListComp/FilmListComp';
import {FooterComp as Footer} from '../../Components/FooterComp/FooterComp';
import {SpinnerComp} from './../../Components/SpinnerComp/SpinnerComp';

import {getFilmList} from '../../lib';
import './SearchPage.scss';

export class SearchPage extends React.Component {
  constructor(props){
    super(props);

    this.URLFilm = props.match.params.filmName;
    
    let url = new URL(window.location.href);
    if (!url.searchParams.has('searchByTitle')) {
      this.URLSearchByTitle = true;
      console.log('has',!url.searchParams.has('searchByTitle'))
    }else {
      this.URLSearchByTitle = Boolean(url.searchParams.get('searchByTitle'));
      console.log('get', Boolean(url.searchParams.get('searchByTitle')));
    }

    console.log(`URLSearchByTitle:${this.URLSearchByTitle}`);


    this.state = {
      searchString: this.URLFilm,
      searchByTitle: this.URLSearchByTitle,
      filmList: [],
      isLoading: false,
    };

    this.handleSearchStringChange = this.handleSearchStringChange.bind(this);
    this.handleSearchByChange = this.handleSearchByChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSortByRuntime = this.handleSortByRuntime.bind(this);
    this.handleSortByDate = this.handleSortByDate.bind(this);
  }

  handleSearchStringChange(e){
    this.setState({
      searchString: e.target.value,
    });
  }

  handleSearchByChange(isbyTitle){
    this.setState({
      searchByTitle: isbyTitle
    });
  }
  
  loadFilmListToState(){
    this.setState({
      isLoading:true,
    })
    getFilmList({
      searchString:this.state.searchString,
      byTitle:this.state.searchByTitle,
      byDirector: !this.state.searchByTitle,
    })
    .then(result=>{
      this.setState({
        filmList:result,
        isLoading:false,
      });
    });
  }

  handleSearch(){
    // Если в URL что-то не соотвествует тому что в state - редиректим как в state
    if  ((this.URLFilm !== this.state.searchString) || 
        (this.URLSearchByTitle !== this.state.searchByTitle)) {

      let url= new URL(`/search/${this.state.searchString}`, window.location.origin);
      url.searchParams.set('searchByTitle', this.state.searchByTitle ? 1 :'');
      window.location.assign(url);
    }
  }

  sortFilms(byDate){
    let compare;

    if (byDate) {
      compare = (item1, item2)=>{
        return (+item1.year > +item2.year) ? -1 : 1;
      }
    } else {
      compare = (item1, item2)=>{
        return (+item1.runtime > +item2.runtime) ? -1 : 1;
      }
    }

    let newList = this.state.filmList.sort(compare);
    this.setState({filmList:newList})
  }

  handleSortByRuntime(e){
    e.preventDefault();
    this.sortFilms(false);
  }

  handleSortByDate(e){
    e.preventDefault()
    this.sortFilms(true);
  }  

  /* рендер-пропс для компонента FilmList */
  renderFistLine(){
    let result;

    if (this.state.filmList.length) {

     result = (
        /* сформируем строку вверху */
        <Fragment>
          <div className="film-list-comp__top-line">
            <div>
              {this.state.filmList.length} movies found
            </div>
            <div>
              SORT BY
              <a 
                className="film-list-comp__sort-by-release-date" 
                href="#" 
                onClick={this.handleSortByDate}
              >release date</a>
              <a 
                className="film-list-comp__sort-by-runtime" 
                href="#"
                onClick={this.handleSortByRuntime}
                >runtime</a>
            </div>
          </div>
        </Fragment>
      )
    } 

    return result;
  }

  componentDidMount(){
    if (this.state.searchString) {
      this.loadFilmListToState();
    }

  }

  render(){
    return (
      <React.Fragment>

        <div className='search-page-header'>
          <SearchComp 
            searchString={this.state.searchString}
            searchByTitle={this.state.searchByTitle}

            onSearchStringChange={this.handleSearchStringChange} 
            onSubmit={this.handleSearch}
            onSearchByChange = {this.handleSearchByChange}/>
        </div>

        <div className='search-page-result'>
          {(this.state.filmList.length) ? 
            (
            <FilmList 
              renderFirstLine={this.renderFistLine()} 
              filmList={this.state.filmList}
              flagAddToFavorites={true}
            />) : 
            (
              <div className='search-page-empty-result'>No films found</div>
            )
          }

        </div>

        <div className='search-page-footer'>
          <Footer/>
        </div>

        <SpinnerComp isLoading={this.state.isLoading}/>
      </React.Fragment>
      )
    }
} 