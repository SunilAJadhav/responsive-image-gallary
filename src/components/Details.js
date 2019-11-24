import React, { Component } from 'react';
import axios from 'axios';
import './../App.css';

class Details extends Component {

  constructor(props) {
      super(props);

      this.state = {
        list :'',
          isloaded: false,
          isError: false
      }
  }

  componentDidMount() {
      if(!this.props.location.list){
          this.fetchDetails();
          this.setState({isloaded: false});
       }else{
          this.setState({
            list: this.props.location.list
          });
           this.setState({isloaded: true});
       }
  }

  getRouteIndex (){
    const str = window.location.href;
    const index = str.lastIndexOf("/");
    return str.substr(index + 1, str.length);
 }

 fetchDetails () {
     const apiURI = 'http://localhost:3000/all';

     axios.get(apiURI).then(response => {
       const data = response.data.find(element => element.name === this.getRouteIndex());

         this.setState({
          list: data
         },() => {
             this.setState({isloaded: true});
         });
       })
       .catch((err) => {
         this.setState({isloaded: true});
         })
   };

  render() {
    const list = this.state.list;
    if(!this.state.isloaded) return (<div>Loading...</div>);

    return(
      <div className="container">
      <div className="image-item">
        {list && list.image && <img src={list.image} alt={list.image}/> }
        <h3>{list.name}</h3>
        <div>
          <span className="details-like">
            <span className="heart icon"></span>
            <span className="like-count">{list.like_count}</span>
            </span>
        </div>
        <h4 className="discription">{list.description}</h4>
        <div className="details-price">$ {list.price} <span className="shipping-fee">{list.shipping_fee}</span></div>
      </div>
    </div>
 )
}

}

export default Details;