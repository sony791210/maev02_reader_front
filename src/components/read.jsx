import React from 'react';
import { Link,useHistory } from 'react-router-dom'
import {Layout, Spin, message, Modal,Row,Col} from 'antd';
import {LeftOutlined,RightOutlined,CloudDownloadOutlined,MenuOutlined,SettingOutlined,PlusOutlined,MinusOutlined,HomeOutlined} from '@ant-design/icons';
import Menu from './menu'

import styles from '../styles/read.module.less';

import template from './template';
import 'whatwg-fetch';
import storejs from 'store/dist/store.legacy';

import _ from "lodash";


const { Header, Footer } = Layout;





const Read2=(props)=>{

  const reactHistory = useHistory();

  const [content,setContent]=React.useState(null);
  const [title,  setTitle  ]=React.useState(null);
  const [loading,setLoading]=React.useState(false);
  const [chapterListShow,setChapterListShow]=React.useState(false);

  
  
  let readSettingStore = storejs.get('readSetting') || {fontSize: 50, backgroundColor: 'rgb(196, 196 ,196)'};
  const [readSetting,seteadSetting]=React.useState(readSettingStore);
  const [show,setShow]=React.useState(false);
  const [showSetting,setShowSetting]=React.useState(false);

  const  boxRef= React.createRef();

  const [bookMenuList,setBookMenuList]=React.useState([]);

  const [isFirstRender,setIsFirstRender]=React.useState(true);
  const [novelId,setNovelId]=React.useState(props.match.params.id);
  const [novelPage,setNovelPage]=React.useState(props.match.params.page);


  const  getChapter = async(id,page) => {
    

    setLoading(true);
    
    var pos=_.findIndex(storejs.get('bookList'),{novel_name_id:parseInt(id)})

    let chapters = storejs.get('bookList')[pos]?.list;
    

    if ( _.find(chapters, {page:parseInt(page)}) ) {
      
      let tmpData=_.get(chapters,page)
      let bookList = storejs.get('bookList');



      bookList[pos].readIndex = page;
      bookList[pos].page = page;
      setTitle(tmpData.title);
      setContent( '   ' + tmpData.content.replace(/\n/g, "\n   ") );
      console.log(bookList)
      storejs.set('bookList', bookList);

      setLoading(false);
      setBookMenuList(bookList[pos]?.list)
      return;
    }

    //抓資料
    let data=await getFetch(id,page);
    //存擋及show資料

    let bookList = storejs.get('bookList');
    bookList[pos].readIndex = page;
    bookList[pos].page = page;
    
    _.set(bookList,[pos,'list',page],data)
    storejs.set('bookList', bookList);

    setTitle(data.title);
    setContent( '   ' + data.content.replace(/\n/g, "\n   ") );
    setLoading(false);
    setBookMenuList(bookList[pos]?.list)

    
      
  }



  const getFetch=(id,page)=>{
    //抓取新文章
    return fetch(`/api/v1/book/${id}/${page}`)
    .then(res => res.json())
    .then( res => {
      if (!res?.data?.content) {
        message.info('沒有此章節了');
        setLoading(false);
        return ;
      }
      
      return res?.data;
      
    })
    .catch(error => message.info(error))
  }


  const shwoSetting=()=>{
    setShow(!show);
  }
  

  //改變位置
  const setReadScroll=()=>{
    let bookList = storejs.get('bookList');
    let pos=_.findIndex(bookList,{novel_name_id:parseInt(novelId)})
    bookList[pos].readScroll = boxRef.current.scrollTop;
    storejs.set('bookList', bookList);
  }


  //修改背景
  const changeBackgroudnColor=(e)=>{
    seteadSetting({...readSetting,backgroundColor: e.target.style.backgroundColor})
    storejs.set('readSetting', {...readSetting,backgroundColor: e.target.style.backgroundColor});
  }


  //字體變大
  const fontUp = () => {
    seteadSetting({...readSetting,fontSize: readSetting.fontSize+1})
    storejs.set('readSetting', {...readSetting,fontSize: readSetting.fontSize+1});

  }
  //字體變小  
  const fontDown = () => {
    if (readSetting.fontSize <=12) {
      return;
    }
    seteadSetting({...readSetting,fontSize: readSetting.fontSize-1})
    storejs.set('readSetting', {...readSetting,fontSize: readSetting.fontSize-1});

  }


    //換頁
  React.useEffect(()=>{
    //  設定第二次再渲染
    if(isFirstRender)return;

    setShow(false);
    let bookList = storejs.get('bookList');
    let pos=_.findIndex(bookList,{novel_name_id:parseInt(novelId)})
    bookList[pos].readScroll = 0;
    bookList[pos].page = props.match.params.page;
    
    storejs.set('bookList', bookList);

    getChapter(novelId,novelPage);
    
    

  },[novelPage]);


  //第一次登入
  React.useEffect(() => {
    let id=props.match.params.id;
    let page = props.match.params.page || 1;
    getChapter(id,page);
    //取消是否第一次渲染
    setIsFirstRender(false);
  }, []);
  
  
  //改變內容
  React.useEffect(() => {
    let bookList = storejs.get('bookList');
    console.log()
    let pos=_.findIndex(bookList,{novel_name_id:parseInt(novelId)})

    boxRef.current.scrollTop = _.has(bookList[pos], 'readScroll') ? bookList[pos].readScroll : 0;
    
    
  }, [content]);




  //上一頁
  const preChapter = (e) => {
    setNovelPage(parseInt(novelPage)  -1)
    reactHistory.push(`${ parseInt(novelPage)  -1}`)
  }
  //下一頁
  const nextChapter =(e) =>{
    setNovelPage(parseInt(novelPage)  +1)
    reactHistory.push(`${ parseInt(novelPage) +1}`)
  }
  
  history.pushState(null, null, document.URL);

  window.addEventListener('popstate', function (e) {
      history.pushState(null, null, document.URL);
  },false);


  
  return(
    <>
    <Spin className='loading' spinning={loading} tip="章节内容加载中">
    <Layout >
      <Modal
        bodyStyle={{ overflowY: 'scroll' }}
        className="chapterList"
        title="Vertically centered modal dialog"
        visible={chapterListShow} 
        onOk={() => setChapterListShow(false)}
        onCancel={() => setChapterListShow(false)}

      >
        {
          <Menu novelId={novelId} novelPage={novelPage}  bookMenuList={bookMenuList} setNovelPage={setNovelPage} setChapterListShow={setChapterListShow}/>
        }
      </Modal>
      {
        show ? 
            <Header className={styles.header}>
              <Row justify="space-between" align="middle">
                <Col flex="0 1 auto" span={4}>
                  <a href='/'>
                    <HomeOutlined  style={{ color:"#FFF",fontSize:"20px"}}/>
                  </a>
                </Col>
                <Col flex="0 1 auto" span={18}>

                  <h1 style={{fontSize:"20px",color:"#FFF"}}>{title}</h1>
                </Col>
                <Col flex="0 1 auto" span={2}>

                </Col>

              </Row>
            </Header>
        : ''
      }
      <div  ref={boxRef} className={styles.box} style={readSetting} onClick={shwoSetting} onScroll={setReadScroll}>
      {
        loading ? '' : 
          <div>
              <h1>{title}</h1>
              <pre className={styles.pre } style={readSetting}>{content}</pre>
              <h1 className={styles.control}>
                <span onClick={preChapter}><LeftOutlined style={{color:"#FFF",fontSize:25}}/></span>
                <span onClick={nextChapter}><RightOutlined style={{color:"#FFF",fontSize:25}}/></span>
              </h1>
              <br></br>
            </div> 
        
      }
      </div>
      {
        show ?  
            <Footer className={styles.footer}>
              <div 
                className={styles.setting} 
                tabIndex="100" 
                
                >
                <SettingOutlined  onClick={()=>{setShowSetting(!showSetting)} } style={{fontSize:25}}/>
                <br/>設置
                {
                  showSetting ?
                  
                    <div onClick={(e) => e.stopPropagation()}>
                      <div className={styles.font}>
                        <span onClick={fontDown}>Aa <MinusOutlined /></span>
                        <span  onClick={fontUp}>Aa <PlusOutlined /></span>

                        

                      </div>
                      <div className={styles.color}>
                        <i onClick={changeBackgroudnColor}  style={{backgroundColor: 'rgb(196, 196 ,196)'}}></i>
                        <i onClick={changeBackgroudnColor}  style={{backgroundColor: 'rgb(162, 157, 137)'}}></i>
                        <i onClick={changeBackgroudnColor}  style={{backgroundColor: 'rgb(173, 200, 169)'}}></i>
                      </div>
                    </div>
                  : ''
                }
              </div>
              <div><LeftOutlined onClick={preChapter}  style={{fontSize:25}}/><br/>上一頁</div>
              <div><RightOutlined onClick={nextChapter} style={{fontSize:25}}/><br/>下一頁</div>
              <div><CloudDownloadOutlined style={{fontSize:25}}/><br/>下載</div>
              <div onClick={() => setChapterListShow(true)}><MenuOutlined  style={{fontSize:25}}/><br/>目錄</div>
            </Footer>
        : ''
      }
      
    </Layout>
    </Spin>
    </>
    
  )


}

export default template(Read2);