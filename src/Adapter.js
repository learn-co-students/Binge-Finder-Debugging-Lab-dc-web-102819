class Adapter {
  static getShows (iterant){
    return fetch("http://api.tvmaze.com/shows?page=" + iterant)
    .then(res => res.json())
  }

  static getShowEpisodes (showID){
    return fetch(`http://api.tvmaze.com/shows/${showID}/episodes`)
    .then(res => res.json())
  }
}

export default Adapter
