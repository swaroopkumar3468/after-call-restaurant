import {Component} from 'react'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css' // Import the styles
import './index.css'
import Header from '../Header'

import CartContext from '../../context/CartContext'

class Home extends Component {
  state = {
    loading: true,
    restaurantName: '',
    menuCategories: [],
    activeCategory: '',
    dishes: [],
    cartCount: {},
  }

  componentDidMount() {
    this.getResults()
  }

  handleCategoryClick(category) {
    this.setState({
      activeCategory: category.menu_category,
      dishes: category.category_dishes,
    })
  }

  handleAddToCart(dishId) {
    this.setState(prevState => ({
      cartCount: {
        ...prevState.cartCount,
        [dishId]: prevState.cartCount[dishId] + 1,
      },
    }))
  }

  handleRemoveFromCart(dishId) {
    this.setState(prevState => {
      const newCartCount = {
        ...prevState.cartCount,
        [dishId]: Math.max(0, prevState.cartCount[dishId] - 1),
      }

      return {
        cartCount: newCartCount,
      }
    })
  }

  getResults = async () => {
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    this.setState({
      restaurantName: data[0].restaurant_name,
      menuCategories: data[0].table_menu_list,
      activeCategory: data[0].table_menu_list[0].menu_category,
      dishes: data[0].table_menu_list[0].category_dishes,
    })

    this.setState({loading: false})
    this.initializeCart(data[0].table_menu_list)
  }

  initializeCart(categories) {
    const initialCart = {}
    categories.forEach(category => {
      category.category_dishes.forEach(dish => {
        initialCart[dish.dish_id] = 0
      })
    })
    this.setState({cartCount: {...initialCart}})
  }

  renderMenuView = () => (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value
        const {menuCategories, activeCategory, dishes, cartCount} = this.state

        const addedToCart = dish => {
          const cartItem = {
            dishId: dish.dish_id,
            dishName: dish.dish_name,
            dishImageUrl: dish.dish_image,
            dishPrice: dish.dish_price,
          }
          addCartItem({...cartItem, cartCount})
        }

        return (
          <>
            <div className="restaurant-app">
              <ul>
                {menuCategories.map(category => (
                  <button
                    type="button"
                    key={category.menu_category}
                    className={
                      category.menu_category === activeCategory ? 'active' : ''
                    }
                    onClick={() => this.handleCategoryClick(category)}
                  >
                    {category.menu_category}
                  </button>
                ))}
              </ul>

              <ul className="main">
                {dishes.map(dish => (
                  <div key={dish.dish_id} className="dish-container">
                    <div className="dish-item">
                      <h2>{dish.dish_name}</h2>
                      <p>
                        {dish.dish_currency} {dish.dish_price}
                      </p>
                      <p>{dish.dish_description}</p>
                      {dish.dish_available === false && (
                        <p className="not-available">Not available</p>
                      )}

                      {activeCategory === 'Biryani' &&
                        !dish.dish_Availability && (
                          <p className="not-available">Not available</p>
                        )}
                      {activeCategory === 'Biryani' && dish.dish_Availability && (
                        <div>
                          {cartCount[dish.dish_id] > 0 && (
                            <button
                              type="button"
                              onClick={() => addedToCart(dish)}
                            >
                              ADD TO CART
                            </button>
                          )}
                          <button
                            type="button"
                            className="button"
                            onClick={() => this.handleAddToCart(dish.dish_id)}
                          >
                            +
                          </button>
                          <p>{cartCount[dish.dish_id]}</p>
                          <button
                            type="button"
                            className="button"
                            onClick={() =>
                              this.handleRemoveFromCart(dish.dish_id)
                            }
                          >
                            -
                          </button>
                        </div>
                      )}
                      {activeCategory === 'Salads and Soup' &&
                        !dish.dish_Availability && (
                          <p className="not-available">Not available</p>
                        )}

                      {activeCategory === 'Salads and Soup' &&
                        dish.dish_Availability && (
                          <div>
                            {cartCount[dish.dish_id] > 0 && (
                              <button
                                type="button"
                                onClick={() => addedToCart(dish)}
                              >
                                ADD TO CART
                              </button>
                            )}
                            <p className="not-available">
                              Customizations available
                            </p>
                            <button
                              type="button"
                              className="button"
                              onClick={() => this.handleAddToCart(dish.dish_id)}
                            >
                              +
                            </button>
                            <p>{cartCount[dish.dish_id]}</p>
                            <button
                              type="button"
                              className="button"
                              onClick={() =>
                                this.handleRemoveFromCart(dish.dish_id)
                              }
                            >
                              -
                            </button>
                          </div>
                        )}
                      {activeCategory === 'From The Barnyard' &&
                        !dish.dish_Availability && (
                          <p className="not-available">Not available</p>
                        )}

                      {activeCategory === 'From The Barnyard' &&
                        dish.dish_Availability && (
                          <div>
                            {cartCount[dish.dish_id] > 0 && (
                              <button
                                type="button"
                                onClick={() => addedToCart(dish)}
                              >
                                ADD TO CART
                              </button>
                            )}
                            <p className="not-available">
                              Customizations available
                            </p>
                            <button
                              type="button"
                              className="button"
                              onClick={() => this.handleAddToCart(dish.dish_id)}
                            >
                              +
                            </button>
                            <p>{cartCount[dish.dish_id]}</p>
                            <button
                              type="button"
                              className="button"
                              onClick={() =>
                                this.handleRemoveFromCart(dish.dish_id)
                              }
                            >
                              -
                            </button>
                          </div>
                        )}
                      {activeCategory === 'From the Hen House' &&
                        !dish.dish_Availability && (
                          <p className="not-available">Not available</p>
                        )}
                      {activeCategory === 'From the Hen House' &&
                        dish.dish_Availability && (
                          <div>
                            {cartCount[dish.dish_id] > 0 && (
                              <button
                                type="button"
                                onClick={() => addedToCart(dish)}
                              >
                                ADD TO CART
                              </button>
                            )}
                            <p className="not-available">
                              Customizations available
                            </p>
                            <button
                              type="button"
                              className="button"
                              onClick={() => this.handleAddToCart(dish.dish_id)}
                            >
                              +
                            </button>
                            <p>{cartCount[dish.dish_id]}</p>
                            <button
                              type="button"
                              className="button"
                              onClick={() =>
                                this.handleRemoveFromCart(dish.dish_id)
                              }
                            >
                              -
                            </button>
                          </div>
                        )}
                      {activeCategory === 'Fresh From The Sea' &&
                        !dish.dish_Availability && (
                          <p className="not-available">Not available</p>
                        )}
                      {activeCategory === 'Fresh From The Sea' &&
                        dish.dish_Availability && (
                          <div>
                            {cartCount[dish.dish_id] > 0 && (
                              <button
                                type="button"
                                onClick={() => addedToCart(dish)}
                              >
                                ADD TO CART
                              </button>
                            )}
                            <p className="not-available">
                              Customizations available
                            </p>
                            <button
                              type="button"
                              className="button"
                              onClick={() => this.handleAddToCart(dish.dish_id)}
                            >
                              +
                            </button>
                            <p>{cartCount[dish.dish_id]}</p>
                            <button
                              type="button"
                              className="button"
                              onClick={() =>
                                this.handleRemoveFromCart(dish.dish_id)
                              }
                            >
                              -
                            </button>
                          </div>
                        )}
                      {activeCategory === 'Fast Food' &&
                        !dish.dish_Availability && (
                          <p className="not-available">Not available</p>
                        )}
                      {activeCategory === 'Fast Food' &&
                        dish.addonCat.length > 0 && (
                          <div>
                            {cartCount[dish.dish_id] > 0 && (
                              <button
                                type="button"
                                onClick={() => addedToCart(dish)}
                              >
                                ADD TO CART
                              </button>
                            )}
                            <p className="not-available">
                              {' '}
                              Customizations available
                            </p>
                            <button
                              key={dish.addonCat}
                              type="button"
                              className="button"
                              onClick={() => this.handleAddToCart(dish.dish_id)}
                            >
                              +
                            </button>
                            <p>{cartCount[dish.dish_id]}</p>
                            <button
                              type="button"
                              className="button"
                              onClick={() =>
                                this.handleRemoveFromCart(dish.dish_id)
                              }
                            >
                              -
                            </button>
                          </div>
                        )}
                    </div>
                    <div>
                      <p>{dish.dish_calories} Calories</p>
                    </div>
                    <div>
                      <img
                        className="image"
                        src={dish.dish_image}
                        alt={dish.dish_name}
                      />
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    const {loading, restaurantName} = this.state

    if (loading) {
      return (
        <div className="loader-container">
          <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
        </div>
      )
    }

    return (
      <>
        <Header restaurantName={restaurantName} />
        <div className="restaurant-app">{this.renderMenuView()}</div>
      </>
    )
  }
}

export default Home
