import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeData } from '../actions'

class Test extends Component {


changeState = (data) => {
  this.setState({data})
  this.props.changeData(data)
}
render(){
    return(
      <div>
        <button onClick={()=> this.changeState(50)}> Add to count</button>
        <button onClick={()=> console.log(this.state)}> state check 2 </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.data
})

const mapDispatchToProps = dispatch => ({
  changeData: data => dispatch(changeData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Test)