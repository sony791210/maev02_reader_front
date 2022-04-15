import React from 'react'
import {Layout, Menu, Dropdown, Spin,Row,Col,notification} from 'antd'
import {SearchOutlined,DownSquareOutlined,HomeOutlined} from '@ant-design/icons';
import { Link,useParams,useLocation } from 'react-router-dom'
import BookItem from './bookItem'
import styles from '../styles/main.module.less'
import template from './template'
import 'whatwg-fetch'
import {introduce} from "../method/tool"

import {http} from "../util/apiHelper";
import  menuPng from '../images/menu.png';


import zhszs from "../images/zhsxs.png";
import sto from "../images/sto.gif";
import _ from "lodash";


const { Header, Content,Footer } = Layout


const AppComponent =(props)=> {


  const [bookSearch,setBookSearch]=React.useState([]);
  const [isLoading,setLsLoading]=React.useState(true);

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



  const download=async (item)=>{

    let data={
      "website":props.match.params.website,
      "navelId":item.navel_name_id
    };
    await http.easyPost("/apiflask/v1/navel/download",data);
    notification["success"]({
      message: `下載中 ${item.title}` ,
      description:
          '已為您下載書籍，請稍後',
    });
  }


  React.useEffect( async ()=>{
    let website = props.match.params.website;
    let keyword = query.get("key");

    let {data}=await  http.easyGet(`/apiflask/v1/navel/search?website=${website}&keyword=${keyword}`)
    setBookSearch(data)
    setLsLoading(false)
  },[])





  
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
          {
            isLoading ? <Spin size="large"/> :

                  bookSearch.length === 0 ?
                      (
                          <div className={styles.null}>
                            查無此書籍，請上一頁重新查詢
                          </div>
                      )
                      : bookSearch.map(
                          (item, index) =>
                              <Row key={index} align="middle" className={styles.row}>
                                <Col xs={20} sm={20} md={20} lg={22} xl={22}>
                                  <div className={styles.box}>
                                    <p>
                                      <span>{item.title}</span><br/>
                                    </p>
                                  </div>
                                </Col>
                                <Col xs={4} sm={4} md={4} lg={2} xl={2}>
                                  <DownSquareOutlined onClick={() => {
                                    download(item)
                                  }} className={styles.download}/>
                                </Col>
                              </Row>
                      )

          }
          </>
        </Content>

        
      </Layout>
    </div>
  )
  
}

export default template(AppComponent)
