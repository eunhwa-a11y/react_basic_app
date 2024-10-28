import React, { Component } from 'react'

export default class Nav extends Component {
  shouldComponentUpdate(newProps, newState){
    /*
    변경값이 없어도 기본값이 true여서 업데이트, 렌더 실행
    첫 번째 매개 변수 (newProps) - 변경된 속성값 newProps.data
    이전값 this.props.data
    */
    console.log(newProps.data, this.props.data);
    
    
    if(newProps.data === this.props.data){
      return false; // header는 바뀌는 게 없기 때문에 false로만 넣어도 됨
    } else{
      return true;
    }
    /*
    console.log(
      'shouldComponentUpdate 작동',
      newProps.data, // 변경된 값
      this.props.data // 이전값
    );
    return false;
    */
    
  }
  render() {
    console.log('Nav render');
    let list = [];
    let data = this.props.data;
    /*
    let i = 0;
    while(i<data.length){
      list.push(<li key={data[i].id}><a
      data-id={data[i].id-1}
      href=""
      onClick = {(e)=>{ // a 태그를 클릭했을 때 실행
        e.preventDefault();
        // this.props.onChangePage(e.target.getAttribute('data-id'));
        this.props.onChangePage(e.target.dataset.id);
      }}
      >{data[i].title}</a></li>);
      // i+=1;
      i++;
    }
    */
    data.forEach((item)=>{
      list.push(<li key={item.id}><a
        href=""
        onClick={(e)=>{ // a 태그를 클릭했을 때 실행
          e.preventDefault();
          this.props.onChangePage(item.id);
        }}
        >{item.title}</a></li>);
    })
      /*
      this.props.onChangePage(e.target.getAttribute('data-id'));

      onChangePage 함수를 쓸 수 있던 이유는 부모 컴퍼넌트에서 넘겨줬기 때문
      e.target.dataset.id 이거 클릭했어요~
      */
    return (
      <nav>
          <ul>
              {list}
          </ul>
      </nav>
    )
  }
}
