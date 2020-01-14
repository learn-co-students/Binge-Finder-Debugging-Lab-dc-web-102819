import React, { Component } from 'react';
import {Grid} from 'semantic-ui-react';
import TVShow from './TVShow'

class TVShowList extends Component {

  mapAllShows = () => {
    if (!!this.props.searchTerm){
      return this.props.shows.filter(s => s.name.toLowerCase().includes(this.props.searchTerm)).map(s => <TVShow show={s} key={s.id} selectShow={this.props.selectShow}/>)
    } else { 
      return this.props.shows.map( (s)=> <TVShow show={s} key={s.id} selectShow={this.props.selectShow}/>)
    }
  }

  render() {
    return (
      <div id="showList" className="TVShowList" >
        <Grid onScroll={this.props.handleScroll} style={{overflow: 'scroll', height: '700px'}}>
          {this.mapAllShows()}
        </Grid>
      </div>
    )
  }

}

export default TVShowList;
