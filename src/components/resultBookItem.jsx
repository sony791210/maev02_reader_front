import React from 'react';
import styles from '../styles/resultBookItem.module.less';
import { Link } from 'react-router-dom';

import  errorLoading from '../images/error.jpg'

class ResultBookItem extends React.Component{

  
  handleImageErrored(e){
    e.target.src = errorLoading;
  }

  render() {
    return (
      <Link to={`/bookIntroduce/${this.props.data.novel_name_id}`}>
      <div className={styles.box}>
        <img src={`data:image/jpeg;base64, `+this.props.data.title_photo_url} onError={this.handleImageErrored}/>
        <p>
          <span>{this.props.data.title}</span><br/>
          <span>{this.props.data.author}著作 | {this.props.data.cat} | {this.props.data.contentType}</span>
        </p>
      </div>
      </Link>
    )
  }
}

export default ResultBookItem;