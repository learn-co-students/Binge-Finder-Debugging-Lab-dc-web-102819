import React, { Component } from 'react';
import Adapter from '../Adapter';
import TVShowList from './TVShowList';
import Nav from './Nav';
import SelectedShowContainer from './SelectedShowContainer';
import { Grid } from 'semantic-ui-react';



class App extends Component {
  state = {
    shows: [],
    searchTerm: "",
    selectedShow: "",
    episodes: [],
    filterByRating: "",
    scrollIterant: 1,
    scrollPosition: 0,
    allowFetch: true
  }

  componentDidMount = () => {
    Adapter.getShows(0).then(shows => this.setState({shows}))
  }

  componentDidUpdate = () => {
    window.scrollTo(0, 0)
  }

  handleScroll = (e) => {
    if (e.target.scrollHeight < e.target.scrollTop + 1000) {
      if (this.state.allowFetch) {
        this.setState({allowFetch: false})
        Adapter.getShows(this.state.scrollIterant).then(newShows => {
          this.setState((prevState) => { 
            return {
              allowFetch: true,
              scrollIterant: prevState.scrollIterant + 1,
              shows: prevState.shows.concat(newShows)
            }
          })
        })
      }
    }
  }

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value.toLowerCase() })
  }

  handleFilter = (e) => {
    e.target.value === "No Filter" ? this.setState({ filterByRating: "" }) : this.setState({ filterByRating: e.target.value})
  }

  selectShow = (show) => {
    Adapter.getShowEpisodes(show.id)
    .then((episodes) => this.setState({
      selectedShow: show,
      episodes: episodes
    }))
  }

  displayShows = () => {
    if (this.state.filterByRating){
      return this.state.shows.filter((s)=> {
        return s.rating.average >= this.state.filterByRating
      })
    } else {
      return this.state.shows
    }
  }

  render (){
    return (
      <div id="hi">
        <Nav handleFilter={this.handleFilter} handleSearch={this.handleSearch} searchTerm={this.state.searchTerm}/>
        <Grid celled>
          <Grid.Column width={5}>
            {!!this.state.selectedShow ? <SelectedShowContainer selectedShow={this.state.selectedShow} episodes={this.state.episodes}/> : <div/>}
          </Grid.Column>
          <Grid.Column width={11}>
            <TVShowList shows={this.displayShows()} selectShow={this.selectShow} searchTerm={this.state.searchTerm} handleScroll={this.handleScroll} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
