import React from 'react';
import {Layout, Input, Spin, Tag,Button,notification} from 'antd';
import { Link } from 'react-router-dom';
import ResultBookItem from '../share/resultBookItem';
import styles from '../../styles/search.module.less';
import template from '../template';
import storejs from 'store/dist/store.legacy';
import randomcolor from 'randomcolor';
import {HomeOutlined,SearchOutlined,CloseCircleOutlined,DeleteOutlined} from '@ant-design/icons';

const { Header, Content } = Layout


const SearchComponent =(props)=> {

  const search = React.createRef();


  let isflag=props.fetchBookList.name.length ? false : true; 

  let state = {
    searchValue: props.fetchBookList.name,
    bookList: props.fetchBookList.books,
    loading: false,
    searchHistory: storejs.get('searchHistory') || []
  };




  
  
  const [tagColorArr,setTagColorArr]=React.useState(state.searchHistory.map(item => randomcolor({luminosity: 'dark'})));

  const [loading,setLoading]=React.useState(false);
  const [searchHistory,setSearchHistory]=React.useState(state.searchHistory);
  const [flag,setFlag]=React.useState(isflag);

  const [value,setValue]=React.useState(null);

  React.useEffect(() => {
      setLoading(false);
  }, [props]);



  const searchBook=(e)=>{
    
    let value=search.current.input.value
    console.log(value)
    
    // this.flag = false;

    if (new Set(value).has(' ') || value === '') {
      notification["error"]({
        message: "錯誤",
        description: "請填入文字",
    });
      return;
    };
    //更新搜索历史
    let newSearchHistory = new Set(searchHistory);
    if (!newSearchHistory.has(value)) {
      newSearchHistory = searchHistory;
      newSearchHistory.unshift(value);
      setSearchHistory(newSearchHistory);
      storejs.set('searchHistory', newSearchHistory);
    }
    
    setFlag(false);

    tagColorArr.push(randomcolor({luminosity: 'dark'}))
    setTagColorArr(tagColorArr);
    setLoading(true);

    props.getBookList(value);
  }
  

  const wordSearch = (e) => {
    let word = e.target.textContent;
    search.current.input.value=word
    setValue(word);
    searchBook();
  }


  const clearInput=()=>{
    search.current.input.value=null;
  }

  const clearHistory = () => {
    setSearchHistory([]);
    storejs.set('searchHistory', searchHistory);
  }

  const handleChange=(e)=>{
    setValue(e.target.value);
    if(!e.target.value ){
      setFlag(true);
    }
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
          
          <Input
            ref={search}
            placeholder="請輸入搜尋書名"
            className={styles.searchInput}
            value={value}
            onChange={handleChange}
            onPressEnter={ searchBook}
            allowClear
            
          />
          <SearchOutlined className={styles.search} onClick={searchBook}/>
        </Header>

        <Spin className='loading' spinning={loading} tip="書籍搜索中...">
        
          <Content className={styles.content}>
            {

              flag?
              <div className={styles.tagBox}>
                <h1>最近搜索历史</h1>
                  <div className={styles.tags}>
                    {
                      searchHistory.map((item, index) =>
                        <Tag onClick={wordSearch} className={styles.tag} color={tagColorArr[index]} key={index}>{item}</Tag>
                      )
                    }
                  </div>
                <div className={styles.clear} onClick={clearHistory}><DeleteOutlined />清空搜索历史</div>
              </div>
              :
              (
                  props.fetchBookList.books.length !== 0 ?
                  props.fetchBookList.books.map((item, index) => <ResultBookItem data={item} key={index}/>)
                  : (<div className={styles.noResult}>没有找到搜索结果</div>)
              )
              

            }

          </Content>
        </Spin>
      </Layout>
    </div>
  )
  
}

export default template(SearchComponent)
