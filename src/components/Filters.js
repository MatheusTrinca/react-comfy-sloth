import React from 'react';
import styled from 'styled-components';
import { useFilterContext } from '../context/filter_context';
import { getUniqueValues, formatPrice } from '../utils/helpers';
import { FaCheck } from 'react-icons/fa';

const Filters = () => {
  const {
    filters: {
      text,
      category,
      company,
      color,
      minPrice,
      maxPrice,
      price,
      shipping,
    },
    updateFilters,
    clearFilters,
    allProducts,
  } = useFilterContext();

  const categories = getUniqueValues(allProducts, 'category');
  const companies = getUniqueValues(allProducts, 'company');
  const colors = getUniqueValues(allProducts, 'colors');

  console.log(colors);

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={e => e.preventDefault()}>
          {/* Search Input (text) */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              className="search-input"
              placeholder="search"
              value={text}
              onChange={updateFilters}
            />
          </div>
          {/* End of Search Input */}
          {/* Categories (button -> textContent) */}
          <div className="form-control">
            <h5>Category</h5>
            <div>
              {categories.map((cat, index) => (
                <button
                  key={index}
                  onClick={updateFilters}
                  type="button"
                  name="category"
                  className={`${
                    cat.toLowerCase() === category ? 'active' : null
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          {/* End of Categories */}
          {/* Companies */}
          <div className="form-control">
            <h5>Company</h5>
            <select
              name="company"
              onChange={updateFilters}
              className="company"
              value={company}
            >
              {companies.map((comp, index) => (
                <option key={index} value={comp}>
                  {comp}
                </option>
              ))}
            </select>
          </div>
          {/* End of Companies */}
          {/* Colors -> data-set */}
          <div className="form-control">
            <h5>Color</h5>
            <div className="colors">
              {colors.map((col, index) => {
                if (col === 'all') {
                  return (
                    <button
                      name="color"
                      onClick={updateFilters}
                      data-color="all"
                      className={`all-btn ${color === 'all' && 'active'}`}
                    >
                      all
                    </button>
                  );
                }
                return (
                  <button
                    onClick={updateFilters}
                    key={index}
                    className={`color-btn ${color === col && 'active'}`}
                    name="color"
                    style={{ backgroundColor: col }}
                    data-color={col}
                  >
                    {color === col && <FaCheck />}
                  </button>
                );
              })}
            </div>
          </div>
          {/* End of Colors */}
          {/* Price -> input range -> transformar em Number */}
          <div className="form-control">
            <h5>Price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              onChange={updateFilters}
              value={price}
              min={minPrice}
              max={maxPrice}
            />
          </div>
          {/* End of Price */}
          {/* Shipping -> e.target.checked */}
          <div className="form-control shipping">
            <label htmlFor="shipping">free shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              onChange={updateFilters}
              checked={shipping}
            />
          </div>
          {/* End of Shipping */}
        </form>
        <button type="button" className="clear-btn" onClick={clearFilters}>
          clear filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
