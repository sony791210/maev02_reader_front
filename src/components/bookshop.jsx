import React from 'react';
import {Layout, Image, Spin, Tag,Button,notification,Card, Col, Row,Divider} from 'antd';
import { Link } from 'react-router-dom';
import ResultBookItem from './resultBookItem';
import styles from '../styles/main.module.less'
import template from './template';
import storejs from 'store/dist/store.legacy';
import randomcolor from 'randomcolor';
import { Carousel } from 'antd';
import {HomeOutlined,SearchOutlined,CloseCircleOutlined,DeleteOutlined} from '@ant-design/icons';

const { Header, Content } = Layout

const { Meta } = Card;
const BookShop =(props)=> {



    function onChange(a, b, c) {
        console.log(a, b, c);
      }
      
      const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
      };


      const test=()=>{
          console.log('test');
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
                
                <Link to="/search">
                    <SearchOutlined className={styles.search}/>
                </Link>
            </Header>

            
            
            <Content className={styles.content}>
            
            <Carousel afterChange={onChange}>
                <div>
                <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                <h3 style={contentStyle}>4</h3>
                </div>
            </Carousel>

            <Divider/>



            <Card style={{"textAlign":"left"}}  title="套選" extra={<a href="#">More</a>}>
                <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 },{ xs: 8, sm: 16, md: 24, lg: 32 }]}>
                    <Col span={24}>
                        <Card onClick={test} hoverable bordered={true}>
                            <Row >
                                <Col xs={10} sm={10} md={6} lg={4} xl={4}>
                                    <Image  width={100}  preview={false}  src={"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"} />
                                </Col>
                                <Col >
    
                                    <Meta title="老心戰室"  description="This is the description"/>
                                </Col>
                     
                            </Row>
                            
                        </Card>
                    </Col>
                    
                    <Col span={8}>
                        <Card hoverable title="測試QQ" bordered={true}>
                            Card content
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card hoverable title="測試嗚嗚" bordered={false}>
                            Card content
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card hoverable title="測試高手" bordered={false}>
                            Card content
                        </Card>
                    </Col>
                </Row>
            </Card>

            <Divider/>


            <Card style={{"textAlign":"left"}}  title="套選">
                <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 },{ xs: 8, sm: 16, md: 24, lg: 32 }]}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={4}>
                        <Card  hoverable cover={<Image  preview={false}  width={100}    src={"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"} />} bordered={true}>
                            <Meta title="老心戰室"  description="This is the description"/>
                        </Card>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={4}>
                        <Card hoverable title="測試天才" bordered={true}>
                            Card content
                        </Card>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={4}>
                        <Card hoverable title="測試ABC" bordered={true}>
                            Card content
                        </Card>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={4}>
                        <Card hoverable title="測試QQ" bordered={true}>
                            Card content
                        </Card>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={4}>
                        <Card hoverable title="測試嗚嗚" bordered={false}>
                            Card content
                        </Card>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={4}>
                        <Card hoverable title="測試高手" bordered={false}>
                            Card content
                        </Card>
                    </Col>
                </Row>
            </Card>



            </Content>

            </Layout>
        </div>
    )

}

export default template(BookShop)
