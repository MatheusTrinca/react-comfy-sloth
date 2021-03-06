import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      const prices = action.payload.map(p => p.price);
      const maxPrice = Math.max(...prices);
      return {
        ...state,
        filteredProducts: [...action.payload],
        allProducts: [...action.payload],
        filters: {
          ...state.filters,
          maxPrice: maxPrice,
          price: maxPrice,
        },
      };
    case SET_GRIDVIEW:
      return {
        ...state,
        gridView: true,
      };
    case SET_LISTVIEW:
      return {
        ...state,
        gridView: false,
      };
    case UPDATE_SORT:
      return {
        ...state,
        sort: action.payload,
      };
    case SORT_PRODUCTS:
      const { filteredProducts, sort } = state;
      let tempProds = [...filteredProducts];
      switch (sort) {
        case 'price-lowest':
          tempProds = tempProds.sort((a, b) => a.price - b.price);
          break;
        case 'price-highest':
          tempProds = tempProds.sort((a, b) => b.price - a.price);
          break;
        case 'name-a':
          tempProds = tempProds.sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
          break;
        case 'name-z':
          tempProds = tempProds.sort((a, b) => {
            return b.name.localeCompare(a.name);
          });
          break;
        default:
          return state;
      }
      return { ...state, filteredProducts: tempProds };
    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };
    case FILTER_PRODUCTS:
      const { allProducts } = state;
      let tempProducts = [...allProducts];

      const { text, company, category, color, price, shipping } = state.filters;

      if (text) {
        tempProducts = tempProducts.filter(product =>
          product.name.startsWith(text)
        );
      }

      if (category !== 'all') {
        tempProducts = tempProducts.filter(
          product => product.category === category
        );
      }

      if (company !== 'all') {
        tempProducts = tempProducts.filter(
          product => product.company === company
        );
      }

      if (color !== 'all') {
        tempProducts = tempProducts.filter(product =>
          product.colors.find(c => c === color)
        );
      }

      //price
      tempProducts = tempProducts.filter(product => product.price <= price);

      if (shipping) {
        tempProducts = tempProducts.filter(product => product.shipping);
      }

      return { ...state, filteredProducts: tempProducts };

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          price: state.filters.maxPrice,
          shipping: false,
        },
      };

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
