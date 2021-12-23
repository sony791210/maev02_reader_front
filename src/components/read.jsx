import React from 'react';
import { Link } from 'react-router-dom'
import {Layout, Spin, message, Modal} from 'antd';
import styles from '../styles/read.module.less';
import template from './template';
import 'whatwg-fetch';
import storejs from 'store/dist/store.legacy';

import _ from "lodash";


const { Header, Footer } = Layout;

class Read extends React.Component{
  constructor(props) {
    super(props);
    console.log(props)
    this.flag = true; //标记第一次进入， 判断是否读取上一次阅读的scrollTop
    this.pos = this.props.match.params.id; //书籍在列表的序号
    this.index = storejs.get('bookList')[this.pos].readIndex || 0; //章节号
    this.chapterList = storejs.get('bookList')[this.pos].list.chapters;
    this.readSetting = {fontSize: 50, backgroundColor: 'rgb(196, 196 ,196)'};
    this.state = {
      loading: true,
      chapter: '',
      show: false,
      readSetting: this.readSetting,
      chapterListShow: false,
      readSettingShow: false
    }
    this.getChapter = (index) => {
      if (index < 0) {
        message.info('已经是第一章了！');
        this.index = 0;
        return;
      }
      else if(index >= this.chapterList.length) {
        message.info('已经是最新的一章了！');
        this.index = this.chapterList.length - 1;
        index = this.index;
      }

      
      this.setState({loading: true});
      let chapters = storejs.get('bookList')[this.pos].list.chapters;
      if (_.has(chapters[index], 'chapter')) {
        this.setState({loading: false, chapter: chapters[index].chapter}, () => {
          this.refs.box.scrollTop = 0;
        });
        let bookList = storejs.get('bookList');
        bookList[this.pos].readIndex = index;
        storejs.set('bookList', bookList);
        return;
      }

      console.log(`/chapter/${this.chapterList[index].link}?k=2124b73d7e2e1945&t=1468223717`)
      fetch(`/chapter/${encodeURIComponent(this.chapterList[index].link)}?k=2124b73d7e2e1945&t=1468223717`)
      .then(res => res.json())
      .then( data => {

        if (!data.ok) {
          message.info('章节内容丢失！');
          return this.setState({loading: false});
        }
        // data={
        //   "chapter":{
        //     "cpContent":'sadfdsaasdjflndslafnldsanlk'
        //   }
        // }
        // let content = _.has(data.chapter, 'cpContent') ?  data.chapter.cpContent :  data.chapter.body;
        let content=`
        
\n                        星門 第1章 巡檢司\n銀城。\n巡檢司。\n年輕的李皓，身材稍顯瘦削，眼圈有些發黑，好像昨晚熬夜未眠。\n穿著巡檢司三級巡檢制服，李皓邁步跨入了巡檢司辦公區。\n作為一名加入巡檢司才一年的半新人，李皓在巡檢司資歷不深，平時都會稍微來早一點，簡單打掃一下辦公區的衛生，再燒壺水，等待其他同事到來。\n不過今天的李皓，來的比平時稍微遲一點，此刻辦公區已經有不少人已經到了。\n看到李皓進門，門口辦公桌，一位同樣身穿制服的中年大媽，一臉熱情，帶著一些調侃意味，打趣道：“小皓，今天來晚了，黑眼圈都出來了，昨晚是不是去瀟灑了？”\n李皓露出了純凈的笑容，好像很單純質樸，連忙擺手：“俞姐，可別亂說，我還沒找女朋友呢，傳出去了，以后沒人嫁我了！”\n“哈哈哈，你這孩子，都在巡檢司待了一年了，這點話都接不住。”\n中年婦人好像很喜歡打趣李皓。\n看李皓的眼神，也帶著一些與眾不同，爽朗笑了一陣，忽然舊話重提道：“小皓，平時一個人沒時間做飯，外面吃的不干凈，回頭去我家吃。”\n李皓再次露出笑容，不過還是拒絕了，“俞姐，就不給你添麻煩了。”\n俞姐還沒開口，不遠處，一位中年大漢嗤笑一聲，插話道：“小皓，你俞姐是喊你去吃飯嗎？是喊你上門當女婿呢，你這小子，怎么一點不上道呢！”\n“哈哈哈！”\n辦公區瞬間響起一陣哄笑聲。\n俞姐被拆穿目的，也不尷尬，瞪大了眼睛，潑辣罵道：“老娘樂意！小皓多好，人品好，腦子好，相貌也好，真給我當女婿，我做夢都能笑醒！”\n這話一出，眾人笑歸笑，還是不少人點點頭表示贊同。\n李皓這小伙子，不少人還是很看好的。\n之前接話的中年大漢，被罵了也不在意，反倒有些遺憾道：“小皓是不錯，就是有些可惜了！”\n可惜什么？\n這話一出，其他人都露出一些遺憾的表情。\n倒是李皓本人不太在意，笑容燦爛，“周哥，我自己選的，有什么可遺憾的？”\n周姓大漢還是有些可惜，嘆道：“不能這么說，小皓，巡檢司是不錯，你半年轉正，現在是三級巡檢，對別人來說也不錯了。可你要是不從銀城古院退學，等到從銀城古院畢業，你要是還選擇進巡檢司，那進了巡檢司就是一級巡檢，這是最低的！”\n此話一出，眾人也被引起了發言的欲望。\n李皓身后，剛進門的年輕辣妹陳娜迅速接話道：“就是，李皓，你好端端的提前退學做什么？你看我們，想考銀城古院都沒機會，就差兩年就能畢業了，咱們這些人從三級巡檢熬到一級，哪怕順利，沒有五年以上都沒機會，不順利的話，一輩子到頭，能熬個一級巡檢就不錯了！”\n話語中帶著一些羨慕，羨慕的是銀城古院的畢業生。\n也有些遺憾，遺憾的是李皓還差兩年畢業，忽然提前退學了，選擇了加入巡檢司。\n李皓加入巡檢司，連銀城巡檢司的司長都來過問過，甚至還勸李皓回去繼續學習，真想來，等畢業了再報考巡檢司。\n可惜，李皓雖然好說話，年輕，懂禮貌，可就在這事上軸得很。\n向來聽話的他，卻是沒有答應回去繼續學習。\n陳娜甚至知道，李皓在銀城古院的導師，都曾勸過李皓不要退學，他還是很有前途的。\n聽著眾人討論自己的事，李皓依舊笑容滿面。\n走到角落，開始燒水，一邊忙碌著，一邊笑著回應道：“從三級巡檢開始做起，不也挺好的？再說了，真要從銀城古院畢業再進來，那豈不是少兩年時間認識各位大哥大姐？那也太遺憾了。”\n“哈哈哈，說的對！”\n眾人頓時大笑，這話聽的舒服。\n李皓嘴巴很甜，年紀又小，今年剛滿二十，在銀城巡檢司算是最小的一位，又是高材生，聽他奉承的話，大家聽的都很舒服。\n一大早的，巡檢司辦公區充滿了歡聲笑語。\n對于李皓從銀城古院退學，大家也沒繼續多說，也就李皓不太在意，否則大家都不會提及，畢竟從古院退學，的確是人生中一大遺憾。\n對于當時李皓如何考慮，為何這么選擇，大家也不好多問。\n按照李皓自己的話說，是為了提前拿工資，古院學費太高，花費太大，他沒錢了。\n可是，作為古院的學員，學費不夠，真的是原因嗎？\n歡笑聲，隨著幾位巡檢司領導到來，漸漸停歇。\n銀城巡檢司，是銀城的執法機構總部。\n除了總部，巡檢司在銀城還有四處分部。\n而總部也有多個部門，李皓所在的機要室，主要負責案件檔案歸檔、舊案重啟、懸案重審、會議紀要……\n機要室并非一線機構，很少參與對外執法。\n當然，若是其他部門人手不夠用了，也會臨時借調李皓他們過去幫忙，總體來說還是文職工作。\n隨著幾位領導抵達，眾人又開始了一天的忙碌工作。\n李皓沒有單獨的辦公室，一位入職一年的三級巡檢，也沒資格擁有，之前的俞姐、周哥幾位都是二級巡檢，他們也沒資格。\n李皓的辦公桌在辦公區靠近衛生間的方位，并沒有太多異味，只是人來人往，顯得有些吵鬧，辦公區的老人們都不會喜歡這邊。\n李皓辦公桌和對面的陳娜靠在一起，兩人面對面辦公。\n陳娜也只比李皓早來半年，也算是新人，兩人資歷都不深。\n不過很快巡檢司就會招新，接下來兩人就可以擺脫新人的名號了。\n李皓正低頭查閱一些文件檔案，對面傳來一陣桌子的輕響聲，李皓抬頭看去，就見陳娜趴在桌子上，輕輕敲著桌子，見李皓看來，笑容燦爛，低聲道：“李皓，接下來巡檢司有個外出任務，可以出去一個月，要不要申請？咱們一起，出去玩一個月，任務很輕松。”\n李皓微微一怔，回想了一下，很快搖頭道：“不去，出去也沒什么好的，而且……也不一定安全。”\n“很安全的！”\n陳娜有些郁悶，“就是陪銀城古院……”\n說到這，她微微一怔，想到了什么，再看李皓，有些明悟，有些歉意道：“哦，差點忘了這事了！你是不想見昔日的同學和導師是嗎？這次帶隊去考察的好像就是袁碩教授……”\n她暗罵一聲，自己居然忘了這事。\n袁碩，不就是李皓之前在古院的導師嗎？\n聽說這位導師很看重李皓，因為李皓不聽勸，非要退學，據說還一度要揍李皓，在銀城古院鬧出了不小的風波，也讓不少古院的學員罵李皓不識抬舉。\n袁碩是誰？\n那可是古院幾位頂級大佬之一，多少學員渴望著拜師袁碩，結果人家根本看不上。\n李皓笑了笑，也沒反駁。\n不想見嗎？\n那倒不至于。\n外界傳的厲害，實際上沒那么夸張，袁老師只是對自己的選擇感到遺憾罷了，前些天李皓還去老師家拜訪過，一起吃了晚飯，哪有外人說的見面就打自己那么夸張。\n當然，有些事也沒必要去解釋，外界怎么傳，那隨他們的心意就好，越解釋越麻煩。\n“袁老師帶隊……”\n心中默念一聲，袁老師是古院的幾位頂級教授之一，帶隊出去的話，安保應該不會太差，巡檢司也好，還是其他部門，都會做好防范。\n自己倒也不用擔心什么，何況，巡檢司參與其中，大概率也就是打個醬油，真正負責袁老師安保的，恐怕不是巡檢司這些小蝦米，而是自己一年來隱約有所耳聞的巡夜人。\n巡夜人，類似巡檢司這樣的執法機構。\n不過……和巡檢司負責明面上的案件不同，這個機構好像只負責一些疑案懸案，巡檢司這邊一些無法處理，或者說干脆沒有任何頭緒的案件，都會交出去。\n外人不了解，甚至巡檢司機構，大部分人也不清楚。\n不過李皓身在機要室，主要就是負責案件歸檔，疑案懸案追蹤，倒是隱約知曉一二。\n“巡夜人！”\n李皓心中默念一句，他選擇退學，來到巡檢司當一個三級巡檢，和巡夜人關系很大，或者說，大半的目的就是沖著那邊去的。\n當然，這事從未告訴過任何人。\n這個機構太神秘了，李皓在進入巡檢司之前其實從未聽說過，但是他從袁碩導師那邊知曉一二，知道有這樣一個執法機構存在，尋常人根本不會知曉。\n不過退學之前，李皓知道一點，巡檢司其實是巡夜人的垂直下屬機構，外人不知，李皓倒是聽袁老提過一句，巡檢司中的一些好苗子，可能會被輸送過去。\n“一年了，我現在也算是根正苗紅，巡檢司出身，不知有沒有機會接觸到巡夜人。”\n李皓心中想著，帶著一些迫切，卻是強壓下去，面色如常，絲毫不顯。\n應該快了！\n他感覺最近銀城可能要出問題，巡檢司卻是沒有絲毫察覺，恐怕只能讓巡夜人來處理了。\n此刻，還差一個契機！\n                    "          
  
        
        `

        data.chapter.cpContent =  '   ' + content.replace(/\n/g, "\n   ");

        let bookList = storejs.get('bookList');
        bookList[this.pos].readIndex = index;
        storejs.set('bookList', bookList);

        this.setState({loading: false, chapter: data.chapter})
      })
      .catch(error => message.info(error))
    }

    this.nextChapter = (e) => {
      e.stopPropagation();
      this.getChapter(++this.index);
    }
    this.preChapter = (e) => {
      e.stopPropagation();
      this.getChapter(--this.index);
    }

    this.targetChapter = (e) => {
      e.stopPropagation();
      this.index = e.target.id
      this.getChapter(this.index);
      this.setState({chapterListShow: false});
    }

    this.shwoSetting = () => {
      this.setState({show: !this.state.show});
    }

    this.fontUp = () => {
      console.log(this.readSetting.fontSize)
      let newFontSize= {...this.readSetting,fontSize:this.readSetting.fontSize+1}
      console.log(newFontSize)

      this.setState({readSetting: newFontSize});
      console.log(this.state)
      storejs.set('readSetting', newFontSize);
    }

    this.fontDown = () => {
      if (this.readSetting.fontSize <=12) {
        return;
      }
      this.readSetting.fontSize--
      this.setState({readSetting: this.readSetting});
      storejs.set('readSetting', this.readSetting);
    }

    this.changeBackgroudnColor = (e) => {
      this.readSetting.backgroundColor = e.target.style.backgroundColor;
      this.setState({readSetting: this.readSetting});
      storejs.set('readSetting', this.readSetting);
    }

    this.readScroll = () => {
      let bookList = storejs.get('bookList');
      bookList[this.pos].readScroll = this.refs.box.scrollTop;
      storejs.set('bookList', bookList);
    }

    this.showChapterList = (chapterListShow) => {
      this.setState({ chapterListShow });
    }

    this.downladBook = () => {
      let pos = this.pos;
      Modal.confirm({
        title: '缓存',
        content: (
          <div>
            <p>是否缓存后100章节？</p>
          </div>
        ),
        onOk() {
          let bookList = storejs.get('bookList');
          let chapters = bookList[pos].list.chapters;
          let download = (start, end) => {
            if (start > end || start >= chapters.length) {
              message.info('缓存完成');
              return;
            }
            if(_.has(chapters[start], 'chapter')) {
              download(++start, end);
              return;
            }
            fetch(`/chapter/${encodeURIComponent(chapters[start].link)}?k=2124b73d7e2e1945&t=1468223717`)
            .then(res => res.json())
            .then( data => {
              let content = _.has(data.chapter, 'cpContent') ?  data.chapter.cpContent :  data.chapter.body;
              data.chapter.cpContent =  '   ' + content.replace(/\n/g, "\n   ");
              chapters[start].chapter = data.chapter; 
              bookList[pos].list.chapters = chapters;
              storejs.set('bookList', bookList);
              download(++start, end);
            })
            .catch(error => message.info(error))
          }

          for(let i = 0; i < bookList[pos].readIndex; i++) {
            delete chapters[i].chapter;
          }

          download(bookList[pos].readIndex, bookList[pos].readIndex + 100);
        },
        onCancel() {
        },
      });
    }

    this.readSettingShowControl = (e) => {
      e.stopPropagation();
      let value = !this.state.readSettingShow;
      this.setState({readSettingShow: value});
    }
  }


  handleMapMove = (e) => {
    console.log(e)
      if(e.touches.length == 2){
        console.log("yay, two finger press")
      }
  };


  componentWillMount() {
    this.getChapter(this.index);

    // 刷新最近阅读的书籍列表顺序
    let bookList = storejs.get('bookList');
    bookList.unshift(bookList.splice(this.pos, 1)[0]);
    storejs.set('bookList', bookList);
    this.pos = 0;
  }


  componentDidUpdate(prevProps, prevState) {
    if (this.flag) { //加载上次阅读进度
      let bookList = storejs.get('bookList');
      this.refs.box.scrollTop = _.has(bookList[this.pos], 'readScroll') ? bookList[this.pos].readScroll : 0;
      this.flag = false;
    }
    else if(prevState.loading !== this.state.loading){
      this.refs.box.scrollTop = 0;
    }
    let list =  document.querySelector('.chapterList .ant-modal-body');
    if (list !== null) {
      list.scrollTop = 45 * (this.index - 3);
    }
  
  }


  render() {
    history.pushState(null, null, document.URL);

    window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL);
    });

    return (
      <Spin className='loading' spinning={this.state.loading} tip="章节内容加载中">
        <Layout >
          <Modal
            className="chapterList"
            title="Vertically centered modal dialog"
            visible={this.state.chapterListShow}
            onOk={() => this.showChapterList(false)}
            onCancel={() => this.showChapterList(false)}
          >
            {
              this.chapterList.map((item,index) => (<p id={index} className={parseInt(this.index, 10) == index ?  'choosed' : ''} onClick={this.targetChapter} key={index}>{item.title}</p>))
            }
          </Modal>
          {
            this.state.show ? (() => {
              return (
                <Header className={styles.header}>
                  <Link to="/">
                  
                  </Link>
                  <Link to={`/changeOrigin/${this.pos}`}><span className={styles.origin}>换源</span></Link>
                </Header>
              )
            })() : ''
          }
          <div ref='box' className={styles.box} style={this.state.readSetting} onClick={this.shwoSetting} onScroll={this.readScroll}>
          {this.state.loading ? '' : (()=>{
            return (
              <div>
                <h1>{this.state.chapter.title}</h1>
                <pre className={styles.pre } style={this.state.readSetting}>{this.state.chapter.cpContent}</pre>
                <h1 className={styles.control}>
                  <span onClick={this.preChapter}>上一章</span>
                  <span onClick={this.nextChapter}>下一章</span>
                </h1>
              </div>
            )
          })()}
          </div>
          {
            this.state.show ?  (() => {
              return (
                <Footer className={styles.footer}>
                  <div 
                    className={styles.setting} 
                    tabIndex="100" 
                    onClick={this.readSettingShowControl} 
                    onBlur={this.readSettingShowControl}>
                    <br/>设置
                    {
                      this.state.readSettingShow ?
                      (
                        <div onClick={(e) => e.stopPropagation()}>
                          <div className={styles.font}>
                            <span onClick={this.fontDown}>Aa -</span>
                            <span onClick={this.fontUp}>Aa +</span>
                          </div>
                          <div className={styles.color}>
                            <i onClick={this.changeBackgroudnColor} style={{backgroundColor: 'rgb(196, 196 ,196)'}}></i>
                            <i onClick={this.changeBackgroudnColor} style={{backgroundColor: 'rgb(162, 157, 137)'}}></i>
                            <i onClick={this.changeBackgroudnColor} style={{backgroundColor: 'rgb(173, 200, 169)'}}></i>
                          </div>
                        </div>
                      ) : ''
                    }
                  </div>
                  <div><br/>上一頁</div>
                  <div><br/>下</div>
                  <div><br/>下载</div>
                  <div onClick={() => this.showChapterList(true)}><br/>目录</div>
                </Footer>
              )
            })() : ''
          }
          
        </Layout>
      </Spin>
    )
  }
}



const Read2=(props)=>{

  const [content,setContent]=React.useState(null);
  const [title,  setTitle  ]=React.useState(null);
  const [loading,setLoading]=React.useState(false);

  const  getChapter = (id,page) => {
    // if (page < 0) {
    //   message.info('已经是第一章了！');
    //   return;
    // }
    // else if(index >= this.chapterList.length) {
    //   message.info('已经是最新的一章了！');
    //   this.index = this.chapterList.length - 1;
    //   index = this.index;
    // }

    setLoading(true);
    
    let chapters = storejs.get('bookList')[id]?.list?.chapters;
    console.log(chapters);
console.log('QQQQ123')

    if (_.has(chapters?.page, 'chapter')) {
      
      setLoading(false);

      let bookList = storejs.get('bookList');
      bookList[id].readIndex = page;
      storejs.set('bookList', bookList);
      return;
    }

    fetch(`/chapter/http%3A%2F%2Fwww.honeypot.com%2Fxiaoshuo%2F410%2F402169%2F1.html?k=2124b73d7e2e1945&t=1468223717`)
    .then(res => res.json())
    .then( data => {

      if (!data.ok) {
        message.info('章节内容丢失！');
        setLoading(false);
        return ;
      }
      
      let tmpContent=`
      
\n                        星門 第1章 巡檢司\n銀城。\n巡檢司。\n年輕的李皓，身材稍顯瘦削，眼圈有些發黑，好像昨晚熬夜未眠。\n穿著巡檢司三級巡檢制服，李皓邁步跨入了巡檢司辦公區。\n作為一名加入巡檢司才一年的半新人，李皓在巡檢司資歷不深，平時都會稍微來早一點，簡單打掃一下辦公區的衛生，再燒壺水，等待其他同事到來。\n不過今天的李皓，來的比平時稍微遲一點，此刻辦公區已經有不少人已經到了。\n看到李皓進門，門口辦公桌，一位同樣身穿制服的中年大媽，一臉熱情，帶著一些調侃意味，打趣道：“小皓，今天來晚了，黑眼圈都出來了，昨晚是不是去瀟灑了？”\n李皓露出了純凈的笑容，好像很單純質樸，連忙擺手：“俞姐，可別亂說，我還沒找女朋友呢，傳出去了，以后沒人嫁我了！”\n“哈哈哈，你這孩子，都在巡檢司待了一年了，這點話都接不住。”\n中年婦人好像很喜歡打趣李皓。\n看李皓的眼神，也帶著一些與眾不同，爽朗笑了一陣，忽然舊話重提道：“小皓，平時一個人沒時間做飯，外面吃的不干凈，回頭去我家吃。”\n李皓再次露出笑容，不過還是拒絕了，“俞姐，就不給你添麻煩了。”\n俞姐還沒開口，不遠處，一位中年大漢嗤笑一聲，插話道：“小皓，你俞姐是喊你去吃飯嗎？是喊你上門當女婿呢，你這小子，怎么一點不上道呢！”\n“哈哈哈！”\n辦公區瞬間響起一陣哄笑聲。\n俞姐被拆穿目的，也不尷尬，瞪大了眼睛，潑辣罵道：“老娘樂意！小皓多好，人品好，腦子好，相貌也好，真給我當女婿，我做夢都能笑醒！”\n這話一出，眾人笑歸笑，還是不少人點點頭表示贊同。\n李皓這小伙子，不少人還是很看好的。\n之前接話的中年大漢，被罵了也不在意，反倒有些遺憾道：“小皓是不錯，就是有些可惜了！”\n可惜什么？\n這話一出，其他人都露出一些遺憾的表情。\n倒是李皓本人不太在意，笑容燦爛，“周哥，我自己選的，有什么可遺憾的？”\n周姓大漢還是有些可惜，嘆道：“不能這么說，小皓，巡檢司是不錯，你半年轉正，現在是三級巡檢，對別人來說也不錯了。可你要是不從銀城古院退學，等到從銀城古院畢業，你要是還選擇進巡檢司，那進了巡檢司就是一級巡檢，這是最低的！”\n此話一出，眾人也被引起了發言的欲望。\n李皓身后，剛進門的年輕辣妹陳娜迅速接話道：“就是，李皓，你好端端的提前退學做什么？你看我們，想考銀城古院都沒機會，就差兩年就能畢業了，咱們這些人從三級巡檢熬到一級，哪怕順利，沒有五年以上都沒機會，不順利的話，一輩子到頭，能熬個一級巡檢就不錯了！”\n話語中帶著一些羨慕，羨慕的是銀城古院的畢業生。\n也有些遺憾，遺憾的是李皓還差兩年畢業，忽然提前退學了，選擇了加入巡檢司。\n李皓加入巡檢司，連銀城巡檢司的司長都來過問過，甚至還勸李皓回去繼續學習，真想來，等畢業了再報考巡檢司。\n可惜，李皓雖然好說話，年輕，懂禮貌，可就在這事上軸得很。\n向來聽話的他，卻是沒有答應回去繼續學習。\n陳娜甚至知道，李皓在銀城古院的導師，都曾勸過李皓不要退學，他還是很有前途的。\n聽著眾人討論自己的事，李皓依舊笑容滿面。\n走到角落，開始燒水，一邊忙碌著，一邊笑著回應道：“從三級巡檢開始做起，不也挺好的？再說了，真要從銀城古院畢業再進來，那豈不是少兩年時間認識各位大哥大姐？那也太遺憾了。”\n“哈哈哈，說的對！”\n眾人頓時大笑，這話聽的舒服。\n李皓嘴巴很甜，年紀又小，今年剛滿二十，在銀城巡檢司算是最小的一位，又是高材生，聽他奉承的話，大家聽的都很舒服。\n一大早的，巡檢司辦公區充滿了歡聲笑語。\n對于李皓從銀城古院退學，大家也沒繼續多說，也就李皓不太在意，否則大家都不會提及，畢竟從古院退學，的確是人生中一大遺憾。\n對于當時李皓如何考慮，為何這么選擇，大家也不好多問。\n按照李皓自己的話說，是為了提前拿工資，古院學費太高，花費太大，他沒錢了。\n可是，作為古院的學員，學費不夠，真的是原因嗎？\n歡笑聲，隨著幾位巡檢司領導到來，漸漸停歇。\n銀城巡檢司，是銀城的執法機構總部。\n除了總部，巡檢司在銀城還有四處分部。\n而總部也有多個部門，李皓所在的機要室，主要負責案件檔案歸檔、舊案重啟、懸案重審、會議紀要……\n機要室并非一線機構，很少參與對外執法。\n當然，若是其他部門人手不夠用了，也會臨時借調李皓他們過去幫忙，總體來說還是文職工作。\n隨著幾位領導抵達，眾人又開始了一天的忙碌工作。\n李皓沒有單獨的辦公室，一位入職一年的三級巡檢，也沒資格擁有，之前的俞姐、周哥幾位都是二級巡檢，他們也沒資格。\n李皓的辦公桌在辦公區靠近衛生間的方位，并沒有太多異味，只是人來人往，顯得有些吵鬧，辦公區的老人們都不會喜歡這邊。\n李皓辦公桌和對面的陳娜靠在一起，兩人面對面辦公。\n陳娜也只比李皓早來半年，也算是新人，兩人資歷都不深。\n不過很快巡檢司就會招新，接下來兩人就可以擺脫新人的名號了。\n李皓正低頭查閱一些文件檔案，對面傳來一陣桌子的輕響聲，李皓抬頭看去，就見陳娜趴在桌子上，輕輕敲著桌子，見李皓看來，笑容燦爛，低聲道：“李皓，接下來巡檢司有個外出任務，可以出去一個月，要不要申請？咱們一起，出去玩一個月，任務很輕松。”\n李皓微微一怔，回想了一下，很快搖頭道：“不去，出去也沒什么好的，而且……也不一定安全。”\n“很安全的！”\n陳娜有些郁悶，“就是陪銀城古院……”\n說到這，她微微一怔，想到了什么，再看李皓，有些明悟，有些歉意道：“哦，差點忘了這事了！你是不想見昔日的同學和導師是嗎？這次帶隊去考察的好像就是袁碩教授……”\n她暗罵一聲，自己居然忘了這事。\n袁碩，不就是李皓之前在古院的導師嗎？\n聽說這位導師很看重李皓，因為李皓不聽勸，非要退學，據說還一度要揍李皓，在銀城古院鬧出了不小的風波，也讓不少古院的學員罵李皓不識抬舉。\n袁碩是誰？\n那可是古院幾位頂級大佬之一，多少學員渴望著拜師袁碩，結果人家根本看不上。\n李皓笑了笑，也沒反駁。\n不想見嗎？\n那倒不至于。\n外界傳的厲害，實際上沒那么夸張，袁老師只是對自己的選擇感到遺憾罷了，前些天李皓還去老師家拜訪過，一起吃了晚飯，哪有外人說的見面就打自己那么夸張。\n當然，有些事也沒必要去解釋，外界怎么傳，那隨他們的心意就好，越解釋越麻煩。\n“袁老師帶隊……”\n心中默念一聲，袁老師是古院的幾位頂級教授之一，帶隊出去的話，安保應該不會太差，巡檢司也好，還是其他部門，都會做好防范。\n自己倒也不用擔心什么，何況，巡檢司參與其中，大概率也就是打個醬油，真正負責袁老師安保的，恐怕不是巡檢司這些小蝦米，而是自己一年來隱約有所耳聞的巡夜人。\n巡夜人，類似巡檢司這樣的執法機構。\n不過……和巡檢司負責明面上的案件不同，這個機構好像只負責一些疑案懸案，巡檢司這邊一些無法處理，或者說干脆沒有任何頭緒的案件，都會交出去。\n外人不了解，甚至巡檢司機構，大部分人也不清楚。\n不過李皓身在機要室，主要就是負責案件歸檔，疑案懸案追蹤，倒是隱約知曉一二。\n“巡夜人！”\n李皓心中默念一句，他選擇退學，來到巡檢司當一個三級巡檢，和巡夜人關系很大，或者說，大半的目的就是沖著那邊去的。\n當然，這事從未告訴過任何人。\n這個機構太神秘了，李皓在進入巡檢司之前其實從未聽說過，但是他從袁碩導師那邊知曉一二，知道有這樣一個執法機構存在，尋常人根本不會知曉。\n不過退學之前，李皓知道一點，巡檢司其實是巡夜人的垂直下屬機構，外人不知，李皓倒是聽袁老提過一句，巡檢司中的一些好苗子，可能會被輸送過去。\n“一年了，我現在也算是根正苗紅，巡檢司出身，不知有沒有機會接觸到巡夜人。”\n李皓心中想著，帶著一些迫切，卻是強壓下去，面色如常，絲毫不顯。\n應該快了！\n他感覺最近銀城可能要出問題，巡檢司卻是沒有絲毫察覺，恐怕只能讓巡夜人來處理了。\n此刻，還差一個契機！\n                    "          
      `

      let tmpTitle="星門"


      let bookList = storejs.get('bookList');
      

      bookList[id].readIndex = page;

      console.log(bookList)
      storejs.set('bookList', bookList);

      setTitle(tmpTitle);
      setLoading(false);
      setContent( '   ' + tmpContent.replace(/\n/g, "\n   ") );
      
    })
    .catch(error => message.info(error))
  }


  // this.flag = true; //标记第一次进入， 判断是否读取上一次阅读的scrollTop
  // this.pos = this.props.match.params.id; //书籍在列表的序号
  // this.index = storejs.get('bookList')[this.pos].readIndex || 0; //章节号
  // this.chapterList = storejs.get('bookList')[this.pos].list.chapters;
  // this.readSetting = {fontSize: 50, backgroundColor: 'rgb(196, 196 ,196)'};
  // this.state = {
  //   loading: true,
  //   chapter: '',
  //   show: false,
  //   readSetting: this.readSetting,
  //   chapterListShow: false,
  //   readSettingShow: false
  // }


  React.useEffect(() => {
    let id=props.match.params.id;
    let query = new URLSearchParams(props.location.search);
    let page = query.get('page') || 1;
    getChapter(id,page);
  }, [props]);  

  return(
    <>

    {
      (loading) ? "" :<div>123</div>
    }

    </>
    
  )
}

export default template(Read);


{/* <div>
      <h1>{title}</h1>
      <pre className={styles.pre } style={this.state.readSetting}>{content}</pre>
      <h1 className={styles.control}>
        <span onClick={this.preChapter}>上一章</span>
        <span onClick={this.nextChapter}>下一章</span>
      </h1>
    </div>  */}