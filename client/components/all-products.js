import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'

/**
 * COMPONENT
 */
export class AllProducts extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.loadProducts()
  }

  render() {
    const firstProd = this.props.products[1] || {}
    return (
      <div>
        <h2>All Art</h2>
        <div>
          {this.props.products.map(product => (
            <h4 key={product.id}>{product.title}</h4>
          ))}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    loadProducts: () => dispatch(fetchProducts())
  }
}

const AllProductsConnected = connect(mapState, mapDispatch)(AllProducts)
export default AllProductsConnected
