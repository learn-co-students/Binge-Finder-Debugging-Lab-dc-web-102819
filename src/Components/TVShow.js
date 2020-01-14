import React from 'react';

const TVShow = (props) => {
  // debugger
  return (
    <div id={"show-" + props.show.id}>
      <br/>
      {!!props.show.image ? <img src={props.show.image.medium} onClick={(e) => props.selectShow(props.show)} alt=""/> : <div onClick={(e) => props.selectShow(props.show)}>No Image</div>}
    </div>
  );
}

export default TVShow;
