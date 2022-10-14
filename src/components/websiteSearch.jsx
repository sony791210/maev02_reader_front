import React from 'react'
import {Layout, Menu, Dropdown, Spin,Row,Col,notification,Image} from 'antd'
import {SearchOutlined,DownSquareOutlined,HomeOutlined} from '@ant-design/icons';
import { Link,useParams,useLocation } from 'react-router-dom'

import styles from '../styles/main.module.less'
import template from './template'
import 'whatwg-fetch'

import {http} from "../util/apiHelper";
import  menuPng from '../images/menu.png';



import errorLoading from "../images/error.jpg";


const { Header, Content,Footer } = Layout


const AppComponent =(props)=> {


  const [bookSearch,setBookSearch]=React.useState([]);
  const [isLoading,setLsLoading]=React.useState(true);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();

  const handleImageErrored=(e)=> {
    e.target.src = errorLoading;
  }


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
    let type   = props.match.params.type
    let data={
      "website":props.match.params.website,
      "id":item.navel_name_id
    };
    await http.easyPost(`/apiflask/v1/${type}/download`,data);
    notification["success"]({
      message: `下載中 ${item.title}` ,
      description:
          '已為您下載書籍，請稍後',
    });
  }


  React.useEffect( async ()=>{
    let website = props.match.params.website;
    let type   = props.match.params.type
    let keyword = query.get("key");

    let {data}=await  http.easyGet(`/apiflask/v1/${type}/search?website=${website}&keyword=${keyword}`)
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
                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                  <Image
                                      width={50}
                                      height={50}
                                      src={item.img }
                                      fallback={handleImageErrored}
                                  />
                                  {/*<img src={item.img } onError={handleImageErrored} />*/}
                                </Col>
                                <Col xs={16} sm={16} md={16} lg={18} xl={18}>
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
