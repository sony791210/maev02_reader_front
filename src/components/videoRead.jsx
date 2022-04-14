import React, { Component } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { Layout, Spin, message, Modal, Row, Col,Select,Image } from 'antd';
import { LeftOutlined, RightOutlined, CloudDownloadOutlined, MenuOutlined, SettingOutlined, PlusOutlined, MinusOutlined, HomeOutlined } from '@ant-design/icons';
import Menu from './menu'

import styles from '../styles/read.module.less';

import template from './template';
import 'whatwg-fetch';
import storejs from 'store/dist/store.legacy';

import _ from "lodash";


import { Player } from "video-react";
import "video-react/dist/video-react.css"; // import css
const { Header, Footer } = Layout;


const { Option } = Select;


const Read2 = (props) => {

  const reactHistory = useHistory();

  const [content, setContent] = React.useState(null);


  const [imgContent, setImgContent] = React.useState([]);


  const [videoContent, setVideoContent] = React.useState("");


  const [title, setTitle] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [chapterListShow, setChapterListShow] = React.useState(false);



  let readSettingStore = storejs.get('readSetting') || { fontSize: 50, backgroundColor: 'rgb(196, 196 ,196)' };
  const [readSetting, seteadSetting] = React.useState(readSettingStore);
  const [show, setShow] = React.useState(false);
  const [showSetting, setShowSetting] = React.useState(false);

  const boxRef = React.createRef();

  const [bookMenuList, setBookMenuList] = React.useState([]);

  const [isFirstRender, setIsFirstRender] = React.useState(true);
  const [novelId, setNovelId] = React.useState(props.match.params.id);
  const [novelPage, setNovelPage] = React.useState(props.match.params.page);


  const getChapter = async (id, page) => {


    setLoading(true);

    // var pos = _.findIndex(storejs.get('comicList'), { comic_name_id: id })
    // console.log(pos)

    // console.log(storejs.get('comicList'))
    // let chapters = storejs.get('comicList')[pos]?.list;

    // console.log(chapters)
    

    // //抓資料
    // let data = await getFetch(id, page);
    // //存擋及show資料

    // let comicList = storejs.get('comicList');
    // comicList[pos].readIndex =parseInt(page) ;
    // comicList[pos].page = parseInt(page);

    // _.set(comicList, [pos, 'list', page], data)
    // storejs.set('comicList', comicList);

    // setTitle(data.title);
    // setImgContent(data.filePath)
    // setLoading(false);
    



  }



  const getFetch = (id, page) => {
    //抓取新文章
    return fetch(`/api/v1/comic/${id}/${page}`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        if (!res?.data) {
          message.info('沒有此章節了');
          setLoading(false);
          return;
        }

        return res?.data;

      })
      .catch(error => message.info(error))
  }


  const shwoSetting = () => {
    setShow(!show);
  }


  //改變位置
  const setReadScroll = () => {
    let comicList = storejs.get('comicList');
    let pos = _.findIndex(comicList, { comic_name_id: parseInt(novelId) })
    comicList[pos].readScroll = boxRef.current.scrollTop;
    storejs.set('comicList', comicList);
  }


  



  //換頁
  React.useEffect(() => {

    // console.log(isFirstRender)
    // //  設定第二次再渲染
    // if (isFirstRender) return;

    // setShow(false);
    // let comicList = storejs.get('comicList');
    // let pos = _.findIndex(comicList, { comic_name_id: parseInt(novelId) })
    // comicList[pos].readScroll = 0;
    // comicList[pos].page = props.match.params.page;

    // storejs.set('comicList', comicList);
    // getChapter(novelId, novelPage);



  }, [novelPage]);


  //第一次登入
  React.useEffect(() => {
    let id = props.match.params.id;
    let page = props.match.params.page || 1;
    setVideoContent('/static/uiu-1.mp4')
    // getChapter(id, page);
    // //取消是否第一次渲染
    // setIsFirstRender(false);
  }, []);


  //改變內容
  React.useEffect(() => {
    // let comicList = storejs.get('comicList');
    // console.log()
    // let pos = _.findIndex(comicList, { comic_name_id: parseInt(novelId) })

    // boxRef.current.scrollTop = _.has(comicList[pos], 'readScroll') ? comicList[pos].readScroll : 0;


  }, [content]);




  //上一頁
  const preChapter = (e) => {
    setNovelPage(parseInt(novelPage) - 1)
    reactHistory.push(`${parseInt(novelPage) - 1}`)
  }
  //下一頁
  const nextChapter = (e) => {
    setNovelPage(parseInt(novelPage) + 1)
    reactHistory.push(`${parseInt(novelPage) + 1}`)
  }

  // history.pushState(null, null, document.URL);

  // window.addEventListener('popstate', function (e) {
  //   history.pushState(null, null, document.URL);
  // }, false);




  const videoShow=()=>{
   
    return <Player>
            <source  src={videoContent}  />
          </Player>
    

  }



return (
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
            // <Menu novelId={novelId} novelPage={novelPage} bookMenuList={bookMenuList} setNovelPage={setNovelPage} setChapterListShow={setChapterListShow} />
          }
        </Modal>
        {
          show ?
            <Header className={styles.header}>
              <Row justify="space-between" align="middle">
                <Col flex="0 1 auto" span={4}>
                  <a href='/'>
                    <HomeOutlined style={{ color: "#FFF", fontSize: "20px" }} />
                  </a>
                </Col>
                <Col flex="0 1 auto" span={18}>

                  <h1 className={styles.title} style={{ fontSize: "20px", color: "#FFF" }}>{title}</h1>
                </Col>
                <Col flex="0 1 auto" span={2}>

                </Col>

              </Row>
            </Header>
            : ''
        }
        <div ref={boxRef} className={styles.boxComic} style={readSetting} onClick={shwoSetting} onScroll={setReadScroll}>
          {
            loading ? '' :
              <div>


                {videoShow()}
                
               




                
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
                <SettingOutlined onClick={() => { setShowSetting(!showSetting) }} style={{ fontSize: 25 }} />
                <br />設置
                {
                  showSetting ?

                    <div onClick={(e) => e.stopPropagation()}>
                      
                      
                    </div>
                    : ''
                }
              </div>
              <div><LeftOutlined onClick={preChapter} style={{ fontSize: 25 }} /><br />上一頁</div>
              <div><RightOutlined onClick={nextChapter} style={{ fontSize: 25 }} /><br />下一頁</div>
              <div><CloudDownloadOutlined style={{ fontSize: 25 }} /><br />下載</div>
              <div onClick={() => setChapterListShow(true)}><MenuOutlined style={{ fontSize: 25 }} /><br />目錄</div>
            </Footer>
            : ''
        }

      </Layout>
    </Spin>



    


  </>

)


}

export default template(Read2);