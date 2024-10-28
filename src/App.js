import './App.css';
import Myheader from './components/Myheader';
import Nav from './components/Nav';
import Article from './components/Article';
import CreateArticle from './components/createArticle';
import UpdateArticle from './components/UpdateArticle';
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


class App extends Component {
  constructor(props) {
    super(props);
    this.max_menu_id = 3;
    this.state = { // 초기값을 만드는 위치
      mode:'welcome', // 열자마자 모드는 웰컴
      selected_id: 0,
      
      subject:{title :'React',desc:'Single page Application'},
      welcome:{title :'Welcome',desc:'Welcome to React'},
      menus:[
        {id:1, title:'HTML', desc:'Hypertext Markup Language'},
        {id:2, title:'CSS', desc:'CSS for design'},
        {id:3, title:'Javascript', desc:'Javascript for interaction'},
        {id:3, title:'React', desc:'Single Page Application'}
      ]
    };
  }

  getReadArticle(){

    const idx = this.state.menus.findIndex(item => item.id === this.state.selected_id);
    let data = this.state.menus[idx];
    return data;

  }

  // render 안에 있던 코드를 getArticles 함수 안에 넣음
  getArticles(){
    let _article = null; // 기본값은 없다~
    if(this.state.mode === 'welcome'){
      let _data = this.state.welcome;
      _article = <Article data={_data} mode={this.state.mode}></Article>;
    } else if(this.state.mode === 'read'){

      let _data = this.getReadArticle();

      _article = <Article data={_data} onChangePage={(_mode)=>{
        this.setState({
          mode:_mode
        })
      }}></Article>;
    } else if(this.state.mode === 'create'){
      // submit 이벤트가 일어나면 제목을 변수 _title로 내용을 변수 _desc로 받는다
      _article = <CreateArticle onsubmit={(_title, _desc)=>{
         // this.max_menu_id = this.max_menu_id + 1; 아래처럼 줄여 쓰기 가능
        this.max_menu_id += 1; // 메뉴리스트를 추가할 때 meun에 1을 더한다
        /*
        this.state.menus.push(
          {id:this.max_menu_id, title:_title, desc: _desc} 값을 추가하고
        )

        let _menus = this.state.menus.concat({
          id:this.max_menu_id,
          title:_title, desc: _desc
        });

        let _menus = Array.from(this.state.menus); 복사본을 만들고
        
        _menus.push(
          {id:this.max_menu_id, title:_title, desc: _desc}
        )
        */

        let _menus =[...this.state.menus, {id:this.max_menu_id, title:_title, desc:_desc}];

        this.setState({
          menus:_menus,
          mode:'read'
        });
      }}></CreateArticle>;
    } else if(this.state.mode === 'modify'){
      
      let _data = this.getReadArticle();
         
      _article = <UpdateArticle data={_data} onsubmit={(_title, _desc)=>{

        let _menus = [...this.state.menus];
        const idx = this.state.menus.findIndex(item => item.id === this.state.selected_id);
        _menus[idx] = {id:this.state.selected_id, title:_title, desc:_desc} // 해당 번째 값 수정
        this.setState({
          menus:_menus,
          mode:'read'
        })

      }}></UpdateArticle>;
    } else if(this.state.mode === 'delete'){

      if(window.confirm('정말 삭제할까요?')){
        /*
        기존 메뉴를 복사해서 복사본 _menus를 생성하고
        삭제하고자 하는 번호 번째 값을 제거
        제거된 메뉴를 menus에 할당
        selected_id는 0으로 변경하고, mode는 welcome으로 변경
        */
        let _menus = [...this.state.menus];
        let id = this.state.menus.findIndex(item => item.id === this.state.selected_id);
        _menus.splice(id, 1)
  
        this.setState({
          menus:_menus,
          mode:'welcome',
          selected_id:0
        })
        alert('삭제했습니다.')
      }else{
        alert('취소했습니다.')
        this.setState({
          mode:'welcome',
          selected_id:0
        })
      }


    }
    return _article; // _article이 뭔지 알려 줘야 실행 됨
  }

  render() { // render 안에만 순수 자바 스크립트 사용 가능
    console.log('APP render');     

    return (
      
        <div className="App">
          <Myheader 
            title={this.state.subject.title} 
            desc={this.state.subject.desc}
            // onChangePage라는 함수를 만들어서 실행하라고 던져 줌
            onChangePage={()=>{
              this.setState({
                mode:'welcome'
              })
            }}
          ></Myheader>
          {/* <header>
            <h1 className="logo" onClick={()=>{
              this.setState({
                mode:'welcome'
              }) // 밖에서 지정했던 함수를 내부로 가지고 들어오는 함수 bind
            }}>{this.state.subject.title}</h1>
            <p>{this.state.subject.desc}</p>
          </header> */}
          <Nav 
            data={this.state.menus} // 출력할 데이터, 목록 Nav에서 넘겨옴
            // onChangePage라는 함수를 만들어서 실행하라고 던져 줌
            // 목록을 클릭했을 때 작동할 함수 Nav에서 넘겨옴
            onChangePage={(id)=>{ // 매개 변수가 들어와야만 일을 하는 함수 id를 넣어 줌
              this.setState({
                mode:'read',
                selected_id:id
              })
            }}
          ></Nav>
          {this.getArticles()}
          <div className="d-flex justify-content-end">
            <Button variant="primary" onClick={()=>{
              this.setState({
                mode:'create'
              })
            }}>Create</Button>
          </div>
        </div>
    
    )
  }
}

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
       <h1>안녕</h1>
      </header>
    </div>
  );
}
*/
export default App;
