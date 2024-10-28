import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class UpdateArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title : this.props.data.title,
      desc:this.props.data.desc,
      difficulty: this.props.data.difficulty
    }
  }

  modifyValue = (e) => {
    this.setState({
      [e.target.name]:e.target.value // 사용자가 입력한 타이틀
    })
  }


  render() {
    return (
      <section>
          <article>
              <h2>Update Article</h2>
              <Form onSubmit={(e)=>{
                e.preventDefault();
                // 수정 버튼을 누르면 할 일 사용자가 입력한 타이틀(this.state.title)과 설명(this.state.desc)
                this.props.onsubmit(
                  this.state.title,
                  this.state.desc,
                  this.state.difficulty
                );
              }}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" name="title" placeholder="title" value={this.state.title} onChange={this.modifyValue} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" name="desc" rows={3} value={this.state.desc} onChange={this.modifyValue} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Difficulty</Form.Label>
                  <Form.Control type="number" name="difficulty" min="0" max="5" value={this.state.difficulty} onChange={this.modifyValue}/>
                </Form.Group>
                <Button type="submit" variant="primary">submit</Button>
              </Form>
          </article>
      </section> 
    )
  }
}
