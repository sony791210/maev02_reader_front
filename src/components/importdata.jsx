import React from 'react'
import {Layout, Menu, Dropdown, Spin,Row,Col,Input} from 'antd'
import {SearchOutlined,QuestionCircleOutlined,HomeOutlined,MoreOutlined,DownloadOutlined,DeleteOutlined} from '@ant-design/icons';
import { Link,useHistory } from 'react-router-dom'
import BookItem from './bookItem'
import styles from '../styles/main.module.less'
import template from './template'
import 'whatwg-fetch'

import {introduce} from "../method/tool"

import  menuPng from '../images/menu.png';


import zhszs from "../images/zhsxs.png";
import sto from "../images/sto.gif";


const { Header, Content,Footer } = Layout
const { Search } = Input;

const AppComponent =(props)=> {


  const Menubar=(props)=>{
    return(
      <Menu>
        <Menu.Item key="0">
          <a href="#">哦豁阅读器</a>
        </Menu.Item>
        <Menu.Item key="1">
          <Link to="/importdata">
            匯入小說
          </Link>
        </Menu.Item>
      </Menu>
    )
  }


  const onSearch = (value,event, index) =>{
    

    console.log(value)

    window.location.href=`/importdata/${NavelList[index].webName}/search?key=${value}`;

  } 



  const NavelList=[
    {
      cover:zhszs,
      title:"宙斯小說網",
      webName:'zhszs'     
    },
    {
      cover:sto,
      title:"思兔",
      webName:"sto"
    }
  ];

  const deleteBook=()=>{

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
                  小說匯入
            </Row> 
            {
                NavelList.map(
                (item, index) => 
                <Row  key={index} align="middle" justify="center" className={styles.row}>
                  <Col xs={5} sm={8} md={10} lg={10} xl={10}>
                    <BookItem data={item} deleteBook={deleteBook} key={index} />
                  </Col>
                  <Col xs={17} sm={14} md={12} lg={12} xl={12}>
                    <Search placeholder="搜尋小說名稱" allowClear onSearch={ (event, value) => onSearch(event, value, index) } options={item.webName} />
                  </Col>
                </Row>
                )
            }
          


            <Row  key="comic" justify="center" align="middle" className={styles.rowComic}>
                  漫畫匯入
            </Row> 

            <Row  key="video" justify="center" align="middle" className={styles.rowVideo}>
                  影片匯入
            </Row> 
          </>
        </Content>

        
      </Layout>
    </div>

  )
  
}

export default template(AppComponent)
