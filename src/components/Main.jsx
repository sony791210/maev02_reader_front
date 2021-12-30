import React from 'react'
import {Layout, Menu, Dropdown, Spin,Row,Col,Button,Modal} from 'antd'
import {SearchOutlined,QuestionCircleOutlined,HomeOutlined,MoreOutlined,DownloadOutlined,DeleteOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom'
import BookItem from './bookItem'
import styles from '../styles/main.module.less'
import template from './template'
import 'whatwg-fetch'

import  menuPng from '../images/menu.png';
import  morePng from '../images/more.png';

const { Header, Content,Footer } = Layout


const AppComponent =(props)=> {


  const [isShowFooter,setIsShowFooter]=React.useState(false);

  const [footerData,setFooterData]=React.useState({});

  const [isModalVisible, setIsModalVisible] = React.useState(false);


  const Menubar=(props)=>{
    return(
      <Menu>
        <Menu.Item key="0">
          <a href="#">哦豁阅读器</a>
        </Menu.Item>
        <Menu.Item key="1">
          <Link to="/about">
            <QuestionCircleOutlined />关于
          </Link>
        </Menu.Item>
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

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const deleteBook=()=>{
    props.deleteBook(footerData)
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
                  <Col xs={20} sm={20} md={20} lg={22} xl={22}>
                    <Link to={`/read/${item.novel_name_id}/1`} key={index}>
                      <BookItem data={item} deleteBook={props.deleteBook} key={index} />
                    </Link>
                  </Col>
                  <Col xs={4} sm={4} md={4} lg={2} xl={2}>
                    <MoreOutlined  className={styles.more} rotate={90} onClick={()=>{showFooter(item)}}/>
                  </Col>
                </Row>
                )
            

          }
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
                  
                  <Link to={`/bookIntroduce/${footerData.novel_name_id}`}>
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
