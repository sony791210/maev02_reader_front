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
import { useHistory } from 'react-router-dom';
const { Header, Content } = Layout

const { Meta } = Card;
const BookShop =(props)=> {


    const history = useHistory();
    function onChange(a, b, c) {
        console.log(a, b, c);
    }
      
      const contentStyle = {
        height: '100px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
      };


      const test=()=>{
          console.log('test');
      }

      const [navelData,setNavelData]=React.useState([])
      const [comicData,setComicData]=React.useState([])
      const [lastData,setLastData]=React.useState([])

      const getPlatFormInfo=(types,action)=>{
          fetch(`/api/v1/platform/introduce/${types}`)
              .then(res => res.json())
              .then( data => {
                  console.log(data)
                  action(data.data)
              })
              .catch( error => console.log(error));
      }

      const getPlatFormLast=(action)=>{
          fetch(`/api/v1/platform/lastinfo`)
              .then(res => res.json())
              .then( data => {
                  console.log(data)
                  action(data.data)
              })
              .catch( error => console.log(error));
      }


      const goTo=(to,data)=>{

          let newid=data[{
              "navel":"novel_name_id",
              "comic":"comic_name_id"
          }[to]]
          let urlPath={
              "navel":"bookIntroduce",
              "comic":"comicIntroduce"
          }[to]

          history.push(`/${urlPath}/${newid}`);
      }

      React.useEffect(()=>{
          getPlatFormInfo("navel",setNavelData)
          getPlatFormInfo("comic",setComicData)
          getPlatFormLast(setLastData)
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
                
                <Link to="/search">
                    <SearchOutlined className={styles.search}/>
                </Link>
            </Header>

            
            
            <Content className={styles.content}>
            
            <Carousel  afterChange={onChange}>
                {
                    lastData.map((data,index)=>{
                        return(

                            <div key={"carousel"+index} >

                                <div className={styles.carousel}>
                                    {/*<Image  preview={false}  height={100}  src={ (data.title_photo_url && `data:image/jpeg;base64, `+data.title_photo_url) || "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" } ></Image>*/}



                                    <div >
                                        <div className={styles.boxxs}>
                                            <p className={styles.boxxstitle}  >{data.title}</p>
                                            <p className={styles.boxxscontent}> {data.long_info}</p>
                                        </div>
                                    </div>

                                    <div>

                                    </div>

                                    <div className="book-container">
                                        <div className="book">
                                            <img alt="test"
                                                 src={ (data.title_photo_url && `data:image/jpeg;base64, `+data.title_photo_url) || "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" }/>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        )
                    })
                }


            </Carousel>

            <Divider/>




            <Card style={{"textAlign":"left"}}  title="小說精選">
                <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 },{ xs: 8, sm: 16, md: 24, lg: 32 }]}>

                    {
                        navelData.map((data,index)=>{
                            return (
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}  key={"navel"+index}>
                                    <Card onClick={   ()=>{goTo('navel',data)}  }  style={{display:"flex",alignItems: "center"}} hoverable cover={
                                        <Image  preview={false}  width={80}    src={ (data.title_photo_url && `data:image/jpeg;base64, `+data.title_photo_url) || "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" } />} bordered={true}>
                                        <Meta title={data.title}  description={data.long_info}/>
                                    </Card>
                                </Col>
                            )

                        })
                    }





                </Row>
            </Card>



            <Divider/>


            <Card style={{"textAlign":"left"}}  title="漫畫精選">
                <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 },{ xs: 8, sm: 16, md: 24, lg: 32 }]}>

                    {
                        comicData.map((data,index)=>{
                            return (
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}  key={"comic"+index}>
                                    <Card onClick={()=>{goTo('comic',data)}  }  style={{display:"flex",alignItems: "center"}} hoverable cover={
                                        <Image  preview={false}  width={80}    src={ (data.title_photo_url && `data:image/jpeg;base64, `+data.title_photo_url) || "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" } />} bordered={true}>
                                        <Meta title={data.title}  description={data.long_info}/>
                                    </Card>
                                </Col>
                            )

                        })
                    }





                </Row>
            </Card>



            </Content>

            </Layout>
        </div>
    )

}

export default template(BookShop)
