import React, { useContext }  from 'react'
import {Layout, Menu, Dropdown, Spin,Row,Col,Button,Modal,Switch} from 'antd'
import {SearchOutlined,QuestionCircleOutlined,HomeOutlined,MoreOutlined,DownloadOutlined,DeleteOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom'
import BookItem from './share/bookItem'
import styles from '../styles/main.module.less'
import template from './template'
import 'whatwg-fetch'

import {introduce} from "../method/tool"

import  menuPng from '../images/menu.png';
import  morePng from '../images/more.png';
import storejs from "store";

import TopContext from "../context/TopContext";

const { Header, Content,Footer } = Layout


const AppComponent =(props)=> {


  //使否開啟menu bar
  const { loginInfo, setLoginInfo } = useContext(TopContext);

  const [isShowFooter,setIsShowFooter]=React.useState(false);

  const [footerData,setFooterData]=React.useState({});

  const [isModalVisible, setIsModalVisible] = React.useState(false);


  const [isCheckeds,setIsCheckeds]= React.useState(props.bookList.list.map((e)=>e?.ManualPage));

  //登入才能匯入資訊
  const Menubar=(props)=>{
    return(
      <Menu>
          {loginInfo.isLogin
              ?
              (
                  <Menu.Item key="1">
                    <Link to="/importdata">
                      匯入資訊
                    </Link>
                  </Menu.Item>
              )
              :
              (
                  <Menu.Item key="0">
                    <Link to="/login">
                      登入
                    </Link>
                  </Menu.Item>
              )
          }
      </Menu>
    )
  }

  const showFooter=(item)=>{
    console.log(item)
    if(item){
      //show底層
      setIsShowFooter(true);
      setFooterData(item);

      setIsModalVisible(true);
    }
    
  }

  const clickContent=()=>{
    console.log('QQQQ')
  }


  const onChangePage=(item,index)=>{
    let bookList = storejs.get('bookList');
    bookList[index]["ManualPage"]=!(bookList[index]["ManualPage"]);
    storejs.set('bookList', bookList);

    //改變ui狀態用
    let tmp=[...isCheckeds];
    tmp[index]=!(tmp[index]);
    setIsCheckeds(tmp)
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const deleteBook=()=>{

    switch(footerData.content_type){
      case "text":
        props.deleteBook(footerData);
        break;
      case "png":
        props.deleteComic(footerData);
    }
    
    setIsShowFooter(false);

  }

  
  return (
    <div className="page" >
      <Layout>
        <Header className={styles.header}>
          <span className={styles.home}>
            <Link to="/">
              <HomeOutlined />
            </Link>
          </span>

          <span className={styles.title}>
            <Link to="/bookshop">
              閱讀神器
            </Link>
          </span>
          <Dropdown
            overlay={Menubar}
            placement="bottomRight"
            trigger={['click']}
            >
            <img src={menuPng} className={styles.dropdown}/>
          </Dropdown>
          <Link to="/search">
            <SearchOutlined className={styles.search}/>
          </Link>
        </Header>
        
        <Content className={styles.content} >
          <>
            <Row  key="navel" justify="center" align="middle" className={styles.rowNavel}>
                  小說
            </Row> 
          
          {
            
            props?.bookList?.list?.length === 0 ?
            (
              <div className={styles.null}>
                書架空空的！快去添加書籍吧！
              </div>
            )
            : props?.bookList?.list?.map(
                (item, index) => 
                <Row  key={index} align="middle" className={styles.row}>
                  <Col xs={16} sm={16} md={16} lg={20} xl={20}>
                    <Link to={  ()=>{ return(isCheckeds[index])?`/readbypage/${item.novel_name_id}/${item.page}`:`/read/${item.novel_name_id}/${item.page}`  }  } key={index}>
                      <BookItem data={item} deleteBook={props.deleteBook} key={index} />
                    </Link>
                  </Col>
                  <Col xs={4} sm={4} md={4} lg={2} xl={2}>
                    <Switch checkedChildren="手動翻頁" unCheckedChildren="自動翻頁" checked={isCheckeds[index]}  onChange={ ()=>{onChangePage(item,index)} } />


                  </Col>
                  <Col xs={4} sm={4} md={4} lg={2} xl={2}>
                    <MoreOutlined  className={styles.more} rotate={90} onClick={()=>{showFooter(item)}}/>
                  </Col>
                </Row>
                )
            

          }


            <Row  key="comic" justify="center" align="middle" className={styles.rowComic}>
                  漫畫
            </Row> 

            {
            
              props?.comicList?.list?.length === 0 ?
              (
                <div className={styles.null}>
                  漫畫架空空的！快去添加漫畫書籍吧！
                </div>
              )
              : props?.comicList?.list?.map(
                  (item, index) => 
                  <Row  key={index} align="middle" className={styles.row}>
                    <Col xs={20} sm={20} md={20} lg={22} xl={22}>
                      <Link to={`/comicRead/${item.comic_name_id}/${ (item.page)??1 }`} key={index}>
                        <BookItem data={item} deleteBook={props.deleteBook} key={index} />
                      </Link>
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={2} xl={2}>
                      <MoreOutlined  className={styles.more} rotate={90} onClick={()=>{showFooter(item)}}/>
                    </Col>
                  </Row>
                  )
            

          }



            <Row  key="video" justify="center" align="middle" className={styles.rowVideo}>
                  影片
            </Row> 
          </>
        </Content>

        {
          isShowFooter 
          ? 
          
            <Modal  footer={null} visible={isModalVisible} width="100%"  style={{ top:"calc(100% - 180px) " }} onCancel={handleCancel} >
              <Row justify="space-between"  align="middle">
                <Col span={3} xs={4} md={4}>
                  <img src={footerData.cover || `data:image/jpeg;base64, `+footerData.title_photo_url} className={styles.img} />
                </Col>
                <Col span={16} xs={12} md={16} className={styles.text} >
                  <span>{footerData.title}</span>
                  <br></br>
                  <small>{footerData.author}</small>
                </Col>
                <Col span={5} xs={8} md={4}>
                  
                  <Link to={ introduce(footerData)}>
                    <Button>
                      詳情
                    </Button>
                  </Link>

                </Col>

              </Row>

              <Row justify="space-between"  align="middle"  style={{marginTop:30}}>

                <Col span={12} style={{textAlign:"center"}}>
                  <DownloadOutlined style={{fontSize:25}}/>
                  <br></br>                  
                  下載

                </Col>
                <Col span={12} style={{textAlign:"center"}}>
                  <DeleteOutlined style={{fontSize:25}} onClick={deleteBook}/>
                  <br></br>                  
                  刪除
                </Col>

              </Row>
              
            </Modal>
          :
            <></>

            

        }
      </Layout>
    </div>
  )
  
}

export default template(AppComponent)
