import  'whatwg-fetch';
import {
  time2Str,
  url2Real,
  wordCount2Str
} from '../../method/index.js';
import storejs from 'store/dist/store.legacy';


export const GET_BOOK_LIST = 'GET_BOOKLIST';
export const GET_BOOK_ITEM = 'GET_BOOKITEM';
export const ADD_LIST = 'ADD_LIST';
export const REMOVE_LIST = 'REMOVE_LIST';
export const REFRESH_LIST = ' REFRESH_LIST';
export const GET_LIST = 'GET_LIST';

export const ADD_COMIC_LIST = 'ADD_COMIC_LIST';
export const REMOVE_COMIC_LIST = 'REMOVE_COMIC_LIST';

// export const GET_BOOK_SOURCE = 'GET_BOOK_SOURCE';
// export const GET_CHAPTER_CONTENT = 'GET_CHAPTER_CONTENT';
// export const GET_CHAPTER_LIST = 'GET_CHAPTER_LIST';

export const receiveBookList = (data, name) => {
  return {
    type: GET_BOOK_LIST,
    data,
    name
  }
}

//搜索书籍
export const getBookList = (name) => {
  return  dispatch => {
    fetch(`/api/v1/platform/search?query=${name}&start=0`)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        // data.data.map((item) => { item.title_photo_url = url2Real(item.cover)})
        return data;
      })
      .then(data => dispatch(receiveBookList({books:data.data}, name)))
      .catch(error => {
        console.log(error);
      })
  }
}


export const receiveBookItem = (data) => {
  return {
    type: GET_BOOK_ITEM,
    data
  }
}

//获取书籍详情
export const getBookItem = (id) => {
  return dispatch => {
    fetch(`/api/v1/book/${id}`)
      .then(res => res.json())
      .then(data => {
        // data.cover = url2Real(data.cover);
        // data.wordCount = wordCount2Str(data.wordCount);
        // data.updated = time2Str(data.updated);
        return data;
      })
      .then(data => dispatch(receiveBookItem(data.data)))
      .catch(error => {
        console.log(error);
      })
  }
}


//获取书籍详情
export const getComickItem = (id) => {
  return dispatch => {
    fetch(`/api/v1/comic/${id}`)
      .then(res => res.json())
      .then(data => {
        // data.cover = url2Real(data.cover);
        // data.wordCount = wordCount2Str(data.wordCount);
        // data.updated = time2Str(data.updated);
        return data;
      })
      .then(data => dispatch(receiveBookItem(data.data)))
      .catch(error => {
        console.log(error);
      })
  }
}



//删除书籍
export const deleteBook = (data) => {
  return {
    type: REMOVE_LIST,
    data
  }
}


//删除书籍
export const deleteComic = (data) => {
  return {
    type: REMOVE_COMIC_LIST,
    data
  }
}

//为书籍请求章节列表 - 书源信息
export const addBook = (data) => {
  let dataIntroduce = data;
  return dispatch =>{

    dispatch(addBookInfo(dataIntroduce))

  }
}
 
export const addComic = (data) => {
  let dataIntroduce = data;
  return dispatch =>{

    dispatch(addComicInfo(dataIntroduce))

  }
}





// 添加书籍
export const addBookInfo = (data) => {
  return {
    type: ADD_LIST,
    data
  }
}


// 添加漫畫
export const addComicInfo = (data) => {
  return {
    type: ADD_COMIC_LIST,
    data
  }
}


//获取书籍
export const getBook = () => {
  return {
    type: GET_LIST
  }
}


//刷新书籍列表
export const receiveReresh = (data) => {
  return {
    type :REFRESH_LIST,
    data
  }
}

//刷新书籍列表
export const refreshBook = () => {
  let localBookList =  storejs.get('bookList') || [];
  let bookIdArr = []
  let bookSourceIdArr = [];
  return dispatch => {
    for(let item of localBookList) {
      bookIdArr.push(item._id);
      bookSourceIdArr.push(item.sourceId);
    }

    let introduce = bookIdArr.map((item, index) => {
      return fetch(`/api/book/${item}`)
      .then(res => res.json())
      .then(data => {
        data.cover = url2Real(data.cover);
        data.wordCount = wordCount2Str(data.wordCount);
        data.updated = time2Str(data.updated);
        return data;
      })
      .then(data => {
        for (let indexName in data) {
          localBookList[index][indexName] = data[indexName]
        }
      })
      .catch(error => {
        console.log(error);
      })
    });

    let list = bookSourceIdArr.map((item, index) => {
      return fetch(`/api/toc/${item}?view=chapters`)
      .then(res => res.json())
      .then(data => {
        localBookList[index].list = data;
      })
      .catch(error => {
        console.log(error);
      })
    });

    Promise.all([...introduce, ...list]).then((posts) => {
      dispatch(receiveReresh(localBookList));
    })
  }
}
