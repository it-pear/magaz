
export const state = () => ({
  products: []
})

export const getters = {
  productsList: (state) => {
    return Object.values(state.products)
  },
  productsQty: (state) => {
    let qty = 0
    for (const product of Object.values(state.products)) {
      qty += product.qty
    }
    return qty
  },
  totalPrice: (state) => {
    let price = 0
    for (const product of Object.values(state.products)) {
      price += product.price * product.qty
    }
    return price
  }
}

export const mutations = {
  addProduct (state, {product}) {
    let index = state.products.findIndex(e => e._id == product._id)
    if (index == -1) {
      state.products.push(product)
      let index1 = state.products.findIndex(e => e._id == product._id)
      state.products[index1].count = 1
    } else {
      let index1 = state.products.findIndex(e => e._id == product._id)
      state.products[index1].count += 1
    }
  },
  changeProductQty (state, { productKey, step }) {
    if (step < 0 && state.products[productKey].qty < 2) { // qty can't be less than 1
      return false
    }
    Vue.set(state.products[productKey], 'qty', state.products[productKey].qty + step)
  },
  removeProduct (state, { productKey }) {
    Vue.delete(state.products, productKey)
  },
  clear (state) {
    Vue.set(state, 'products', {})
  }
}

export const actions = {
  // addProduct({commit}, product) {
  //   commit('SET_CART', product)
  // },
  async submit ({ commit, getters }, { fullName, email }) {
    const productIds = []
    let description = ''
    for (const cartProduct of getters.productsList) {
      productIds.push(cartProduct.product.id)
      description += `${cartProduct.product.title}`
      if (cartProduct.product.variants && cartProduct.product.variants.length > 0) {
        description += ` (color: ${cartProduct.color}, size: ${cartProduct.size})`
      }
      const piece = cartProduct.qty > 1 ? 'pieces' : 'piece'
      description += ` - ${cartProduct.qty} ${piece} <br>`
    }
    const success = await Order.create(productIds, description, fullName, email)
    if (success) {
      commit('clear')
    }
    return success
  }
}
