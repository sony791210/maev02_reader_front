import React from 'react';

import template from './template';
import { Link,useHistory } from 'react-router-dom'


import _ from "lodash";
import styles from '../styles/read.module.less';





const Menu=(props)=>{

  console.log("props.novelPage")

  console.log(props.novelPage)
  
  const reactHistory = useHistory();
  //  props.id
  //  props.page
  const [bookList,setBookList]=React.useState([]);

  
  
  const getFetch=(novelId)=>{
    //抓取新文章
    return fetch(`/api/v1/bookList/${novelId}`)
    .then(res => res.json())
    .then( res => {
      // if (!res?.data?.content) {
      //   message.info('沒有此章節了');
      //   setLoading(false);
      //   return ;
      // }
      console.log(res);
      return res?.data;
      
    })
    .catch(error => message.info(error))
  }
  
  //第一次登入
  React.useEffect(async () => {
    let novelId=props.novelId;
    let data=await getFetch(novelId);
    setBookList(data);

    //每個欄位約46.14 開頭有20的間距
    document.getElementsByClassName('ant-modal-body')[0].scrollTo({top:20+46.14*(parseInt(props.novelPage, 10)-1)})

  }, []);

  const goToPage=(newPage)=>{
    newPage=parseInt(newPage);
    props.setNovelPage(newPage);
    reactHistory.push(`${newPage }`)
    props.setChapterListShow(false);
  }



  const setStyle=(newPage)=>{
  
    if(_.find(props.bookMenuList,{page:parseInt(newPage)})){
      return ;
    }
    return {    color: 'gray',
                opacity: 0.4
            }
  }


  return(
    <>
        {
          bookList.map((item,index) => (<p id={index}  style={setStyle(index+1)} onClick={()=>{goToPage(item.page)}} className={parseInt(props.novelPage, 10) == (item.page) ?  "choosed" : ''}   key={index}  >{item.title}  </p>))
        }
    </>
    
  )


}

export default template(Menu);