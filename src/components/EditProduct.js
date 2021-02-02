import React, { Component } from "react";
// import API from "../axios/Api";
import {connect} from 'react-redux'
import axios from "axios";
import {editProduct, getProductById} from '../publics/actions/products'
// import {getProductById} from '../publics/'

export class EditProduct extends Component {
  state = {
    // products: [],
    product_name: "",
    description: "",
    image: "",
    id_category: "",
    quantity: "",
    date_added: ""
  };

  async componentDidMount() {
    console.log(this.props)
    const id = this.props.match.params.id;
    await this.props.dispatch(getProductById(id))
    this.setState({
      product_name: this.props.products.productList.data.data[0].product_name,
      description: this.props.products.productList.data.data[0].description,
      image: this.props.products.productList.data.data[0].image,
      id_category: this.props.products.productList.data.data[0].id_category,
      quantity: this.props.products.productList.data.data[0].quantity,
      date_added: this.props.products.productList.data.data[0].date_added
    })
    // await axios.get("/products/" + id).then(res =>
    //   this.setState({
    //     name: res.data.data[0]["name"],
    //     description: res.data.data[0]["description"],
    //     image: res.data.data[0]["image"],
    //     id_category: res.data.data[0]["id_category"],
    //     quantity: res.data.data[0]["quantity"],
    //     date_added: res.data.data[0]["date_added"]
    //   })
    // );
    // console.log(this.state.products[0]);
    // console.log(this.props.products.productList.data.data[0])
    // console.log(this.state.products.name)
  }

  handlerChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlerSubmit = async () => {
    // var JWTToken = localStorage.getItem("auth");
    const id = this.props.match.params.id;
    window.event.preventDefault();
    await this.props.dispatch(editProduct(id, this.state))
    window.location.replace('/products')
    // await axios.put("/products/users/" + id, this.state, {
    //   headers: { auth: `${JWTToken}` }
    // });
    // this.props.history.push("/products");
  };

  render() {
    return (
      <div className="container">
        <br />
        <h2>Edit Product</h2>
      <br />
        <form onSubmit={this.handlerSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  <input
                    type="text"
                    name="product_name"
                    value={this.state.product_name}
                    className="form-control"
                    onChange={this.handlerChange}
                  />
                </td>
              </tr>
              <br/>
              <tr>
                <td>Description</td>
                <td>
                  <input
                    id="list"
                    name="description"
                    value={this.state.description}
                    className="form-control"
                    onChange={this.handlerChange}
                  />
                    {/* <option value="">Description</option>
                    <option value="Registered">Registered</option>
                    <option value="Unregistered">Unregistered</option>
                    <option value="In Process">In Process</option>
                  </select> */}
                </td>
              </tr>
              <br/>
              <tr>
                <td>Image</td>
                <td>
                  <input
                    type="text"
                    name="image"
                    value={this.state.image}
                    className="form-control"
                    onChange={this.handlerChange}
                  />
                </td>
              </tr>
              <br/>
              <tr>
                <td>Category</td>
                <td>
                  <select
                    id="list"
                    name="id_category"
                    value={this.state.id_category}
                    className="form-control"
                    onChange={this.handlerChange}
                  >
                    <option value="">Category</option>
                    <option value="1">Cloth</option>
                    <option value="2">Shoes</option>
                    <option value="3">Watches</option>
                  </select>
                </td>
              </tr>
              <br/>
              <tr>
                <td>Quantity</td>
                <td>
                  <input
                    type="text"
                    name="quantity"
                    value={this.state.quantity}
                    className="form-control"
                    onChange={this.handlerChange}
                  />
                </td>
              </tr>
              <br/>
              <tr>
                <td>Date Added</td>
                <td>
                  <input
                    type="text"
                    name="date_added"
                    value={this.state.date_added}
                    className="form-control"
                    onChange={this.handlerChange}
                  />
                </td>
              </tr>
              <br/>
              <tr>
                <td></td>
                <td>
                  <input
                    type="submit"
                    value="Edit"
                    className="btn btn-primary"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    products: state.products
  }
}

export default connect (mapStateToProps)(EditProduct);
