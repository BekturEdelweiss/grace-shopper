import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, fetchDeleteProduct} from '../store/products'
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {Link} from 'react-router-dom'
import {AddShoppingCart, ViewCarousel, Delete} from '@material-ui/icons/'

const useStyles = makeStyles({
  root: {
    maxWidth: 150
  },
  media: {
    height: 100
  }
})

/**
 * COMPONENT
 */
export class AllProducts extends React.Component {
  constructor() {
    super()
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentDidMount() {
    this.props.loadProducts()
  }

  handleDelete(productToDelete) {
    this.props.loadDeleteProduct(productToDelete)
    console.log('DELETED')
  }

  render() {
    const classes = useStyles
    const user = this.props.user
    // console.log('USER', this.props.user)
    return (
      <div>
        <h2>All Art</h2>
        <div className="allViewContainer">
          {this.props.products.map(product => (
            <div className="allView" key={product.id}>
              <Card style={{maxWidth: '300px'}} className={classes.root}>
                <CardActionArea id="artImgContainer">
                  <CardMedia
                    className={classes.media}
                    // component="img"
                    image={product.imageUrl}
                    title={product.title}
                    style={{height: 1, width: '300px', paddingTop: '55%'}}
                  />

                  <CardContent>
                    <Typography variant="h6" component="h3">
                      {product.title}
                    </Typography>
                    {product.Artist ? (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {`By ${product.Artist.name} (${product.year})`}
                      </Typography>
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {`By unknown artist (${product.year})`}
                      </Typography>
                    )}
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {`$${(product.price / 100).toLocaleString('en-US')}`}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    component={Link}
                    to={`/products/${product.id}`}
                    startIcon={<ViewCarousel />}
                  >
                    View
                  </Button>
                  <Button startIcon={<AddShoppingCart />}>Buy</Button>
                  {user.isAdmin ? (
                    <Button
                      startIcon={<Delete />}
                      onClick={() => this.handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  ) : (
                    ''
                  )}
                </CardActions>
              </Card>
            </div>
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
    products: state.products,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadProducts: () => dispatch(fetchProducts()),
    loadDeleteProduct: productId => dispatch(fetchDeleteProduct(productId))
  }
}

const AllProductsConnected = connect(mapState, mapDispatch)(AllProducts)
export default AllProductsConnected
