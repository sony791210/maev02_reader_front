import React from 'react';
import styles from '../styles/bookItem.module.less';
import Tappable from 'react-tappable/lib/Tappable';
import {Modal} from 'antd';

const confirm = Modal.confirm;

import  errorLoading from '../images/error.jpg'




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
  return (
    <Tappable
      onPress ={showConfirm}
    >
      <div className={styles.box}>
        <img src={props.data.cover} onError={handleImageErrored} />
        <p>
          <span>{props.data.title}</span><br/>
          <span>{props.data.lastChapter}</span>
        </p>
      </div>
    </Tappable>
  )
}

export default BookItem;