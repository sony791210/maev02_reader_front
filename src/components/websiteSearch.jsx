import React from 'react'
import {Layout, Menu, Dropdown, Spin,Row,Col,Button,Modal} from 'antd'
import {SearchOutlined,QuestionCircleOutlined,HomeOutlined,MoreOutlined,DownloadOutlined,DeleteOutlined} from '@ant-design/icons';
import { Link,useParams,useLocation } from 'react-router-dom'
import BookItem from './bookItem'
import styles from '../styles/main.module.less'
import template from './template'
import 'whatwg-fetch'

import {introduce} from "../method/tool"

import  menuPng from '../images/menu.png';


import zhszs from "../images/zhsxs.png";
import sto from "../images/sto.gif";


const { Header, Content,Footer } = Layout


const AppComponent =(props)=> {


  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();



  // const [searchParams, setSearchParams] = useSearchParams();
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

  let website = props.match.params.website;
  console.log(website)
  let key = query.get("key");
  console.log(key)

  // console.log(searchParams.get("key"))





  
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
                  小說搜尋
            </Row> 
            
          


            
          </>
        </Content>

        
      </Layout>
    </div>
  )
  
}

export default template(AppComponent)
