import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';

export default class Article extends Component {
  render() {
    console.log('Article render');
    let classNames = "";
    if(this.props.mode === 'welcome'){
      classNames =" visually-hidden";
    }
    return (
      <section>
          <article>
              <h2>{this.props.data.title}</h2>
              <p>{this.props.data.desc}</p>
              {/* 클래스명이 있을 자리에 변수를 넣음 */}
              <div className={classNames}>
                <hr/>
                <div className="d-flex justify-content-end gap-3">
                  <Button variant="secondary" size="sm" onClick={(e)=>{ // a 태그를 클릭했을 때 실행
                    e.preventDefault();
                    this.props.onChangePage('modify');
                  }}>Modify</Button>
                  <Button variant="danger" size="sm" onClick={(e)=>{ // a 태그를 클릭했을 때 실행
                    e.preventDefault();
                    this.props.onChangePage('delete');
                  }}>Delete</Button>
                </div>
              </div>

          </article>
      </section> 
    )
  }
}
