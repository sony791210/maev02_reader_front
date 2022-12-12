import React from 'react';
import styles from '../../styles/bookItem.module.less';
import Tappable from 'react-tappable/lib/Tappable';
import {Modal} from 'antd';

const confirm = Modal.confirm;

import  errorLoading from '../../images/error.jpg'
import _ from "lodash";




const BookItem=(props)=>{


  const showConfirm = () => {
    confirm({
      title: '刪除書籍',
      content: `確認刪除《${props.data.title}》吗？` ,
      onOk: () => {
        props.deleteBook(props.data);
      },
      onCancel() {},
    });
  }

  const handleImageErrored=(e)=> {
    e.target.src = errorLoading;
  }

  console.log( )
  
  // _.find(props.data.list,{page:props.data.page})
  
  return (
      <>
    <Tappable
      onPress ={showConfirm}
    >
    
      <div className={styles.box}>
        <img src={props.data.cover || `data:image/jpeg;base64, `+props.data.title_photo_url} onError={handleImageErrored} />
        <p>
          <span>{props.data.title }</span><br/>
          <span>{_.find(props.data.list,{page:parseInt(props.data.page)})?.title}</span>
        </p>

      </div>

    </Tappable>

      </>
  )
}

export default BookItem;