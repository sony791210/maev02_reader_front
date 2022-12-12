import React, {useContext} from 'react'
import { useHistory } from "react-router-dom";
import {Layout, Menu, Dropdown, Button, Checkbox, Form, Input, Row, Col, Card,notification} from 'antd'
import {
    SearchOutlined, QuestionCircleOutlined, HomeOutlined, MoreOutlined, DownloadOutlined, DeleteOutlined
} from '@ant-design/icons';
import {Link} from 'react-router-dom'

import styles from "../../styles/main.module.less"
import template from '../template'
import 'whatwg-fetch'


import menuPng from '../../images/menu.png';


import TopContext from "../../context/TopContext";

const {Header, Content, Footer} = Layout


const AppComponent = (props) => {

    const history = useHistory();
    //使否開啟menu bar
    const {loginInfo, setLoginInfo} = useContext(TopContext);


    //登入才能匯入資訊
    const Menubar = (props) => {
        return (<Menu>
            {loginInfo.isLogin ? (<Menu.Item key="1">
                <Link to="/importdata">
                    匯入資訊
                </Link>
            </Menu.Item>) : (<Menu.Item key="0">
                <Link to="/">
                    登入
                </Link>
            </Menu.Item>)}
        </Menu>)
    }


    const onFinish = async (values) => {
        console.log('Success:', values);
        //  打api
        let data=await fetch("/api/v1/login",
            {
                    method: "POST",
                    headers:new Headers({
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify(values),

                }
        )
            .then(response => response.json())
            .then((json)=>{return json});

        if(data.code!=200){
            notification.error({
                message:"錯誤",
                description:data.message
            })
        }else{
            // 紀錄登入資訊
            setLoginInfo({...loginInfo,isLogin:true,token:data.data})
            //紀錄到session
            localStorage.setItem('token', data.data)
            // 返回首頁
            history.push('/');

        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    React.useEffect(()=>{
        if(loginInfo.isLogin){
            // 返回首頁
            history.push('/');
        }
    },[])

    return (<div className="page">
        <Layout>
            <Header className={styles.header}>
          <span className={styles.home}>
            <Link to="/">
              <HomeOutlined/>
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


        </Layout>

        <Content className={styles.content} style={{background: '#eee'}}>

            <Row style={{marginTop: '20vh'}}>
                <Card
                    bordered={false}
                    style={{
                        width: '100%', marginLeft: '10%', marginRight: '10%'
                    }}
                >
                    <Form
                        name="basic"
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        style={{width: '100%'}}
                        size='large'
                        layout="vertical"

                    >
                        <Form.Item
                            label="帳號"
                            name="account"
                            rules={[{required: true, message: '輸入帳號'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="密碼"
                            name="password"
                            rules={[{required: true, message: '輸入密碼'}]}
                        >
                            <Input.Password/>
                        </Form.Item>



                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                送出
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Row>
        </Content>
    </div>)

}

export default template(AppComponent)
