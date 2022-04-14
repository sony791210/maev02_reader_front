import React from 'react';
import styles from '../styles/resultBookItem.module.less';
import { Link } from 'react-router-dom';

import  errorLoading from '../images/error.jpg'

import {introduce} from "../method/tool"

const ResultBookItem=(props)=>{

  const handleImageErrored=(e)=>{
    e.target.src = errorLoading;
  }


  return(
    <>
    
      <Link to={  introduce(props.data) }>
        <div className={styles.box}>
          <img src={`data:image/jpeg;base64, `+props.data.title_photo_url} onError={handleImageErrored}/>
          <p>
            <span>{props.data.title}</span><br/>
            <span>{props.data.author}著作 | {props.data.cat} | {props.data.contentType}</span>
          </p>
        </div>
      </Link>
    </>
  )
}
// class ResultBookItem extends React.Component{

  
//   handleImageErrored(e){
//     e.target.src = errorLoading;
//   }
//   render() {
//     console.log(this.props)

//     return (
      
//     )
//   }
// }

export default ResultBookItem;