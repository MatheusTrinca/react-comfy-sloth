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
      return {
        ...state,
        filteredProducts: [...action.payload],
        allProducts: [...action.payload],
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
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
