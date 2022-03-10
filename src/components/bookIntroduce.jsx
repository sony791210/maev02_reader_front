import React from 'react';
import {Layout, Spin, Button, Tag, message, Modal} from 'antd';
import { Link } from 'react-router-dom';
import template from './template';
import styles from '../styles/bookIntroduce.module.less';
import randomcolor from 'randomcolor';

import {HomeOutlined,ArrowLeftOutlined} from '@ant-design/icons';

import  errorLoading from '../images/error.jpg'

const { Header, Content } = Layout

class BookIntroduce extends React.Component{
  constructor(props) {
    super(props);
    this.data = {};
    this.share = '';
    this.state = {
      loading: true,
      save: false
    };
    message.config({
      top: 500,
      duration: 2
    });

    this.flag = false; //是否进入阅读模式
    this.props.getBookItem(this.props.match.params.id);
    this.addBook = () => {
      this.props.addBook(this.data);
      message.info(`《${this.data.title}》加入书架`);
    }

    this.deleteBook = () => {
      this.props.deleteBook(this.data);
      message.info(`《${this.data.title}》从书架移除`);
    }

    this.beiginRead = () => {
      this.addBook();
      this.flag = true;
    }

    this.shareSuccess =  () => {
      Modal.success({
        title: '链接已复制到你的剪贴板',
        content: this.share
      });
    }
  }



  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    this.data = nextProps.fetchBookItem;
    this.share = `test`;
    this.setState({loading: false, save: nextProps.bookList.id.has(nextProps.fetchBookItem.novel_name_id)});
    if (this.flag) {
      let list = nextProps.bookList.list
      for (let index in list) {
        if (list[index].novel_name_id === nextProps.fetchBookItem.novel_name_id) {
          let index = nextProps.bookList.list.length;
          this.props.history.push({pathname: `/read/${this.props.match.params.id}/${index}`});
          this.flag = false;
          break;
        }
      }
    }
  }

  handleImageErrored(e){
    e.target.src = errorLoading;
  }


  render() {
    return (
      <div>
        <Layout >
          <Header className={styles.header}>
            <span className={styles.home}>
              <Link to="/">
                <HomeOutlined />
              </Link>
            </span>

            <span className={styles.home}>
              <Link to="/search">
                <ArrowLeftOutlined />
              </Link>
            </span>
            
            <span className={styles.title}>書籍資訊</span>

          </Header>
          <Spin className='loading' spinning={this.state.loading} tip='书籍详情加载中...'>
          <Content className={styles.content}>
            {
              this.state.loading ? '':
                (
                  <div>
                    <div className={styles.box}>
                    <img src={`data:image/jpeg;base64, `+this.data.title_photo_url} onError={this.handleImageErrored}/>
                      <p>
                        <span className={styles.bookName}>{this.data.title}</span><br/>
                        <span className={styles.bookMsg}><em>{this.data.author}</em> </span>
                        <span className={styles.updated}>{this.data.updated}前更新</span>
                      </p>
                    </div>
                    <div className={styles.control}>
                      {
                        this.state.save ?
                        (<Button  size='large' className={styles.cancel} onClick={this.deleteBook}>不追了</Button>) :
                        (<Button  size='large' onClick={this.addBook}>追更新</Button>)
                      }
                      <Button  size='large' onClick={this.beiginRead}>開始閱讀</Button>
                    </div>
                    {/* <div className={styles.number}>
                      <p><span>追书人数</span><br/>{this.data.latelyFollower}</p>
                      <p><span>读者留存率</span><br/>{this.data.retentionRatio}%</p>
                      <p><span>日更新字数</span><br/>{this.data.serializeWordCount}</p>
                    </div> */}
                    {/* <div className={styles.tags}>
                      {
                        this.data.tags.map((item, index) =>
                          <Tag className={styles.tag} color={randomcolor({luminosity: 'dark'})} key={index}>{item}</Tag>
                        )
                      }
                    </div> */}
                    <div className={styles.introduce}>
                      <div>{this.data.long_info}</div>
                    </div>
                  </div>
                )
            }
          </Content>
          </Spin>
        </Layout>
      </div>
    )
  }
}

export default template(BookIntroduce);