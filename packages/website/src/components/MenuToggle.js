import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const MenuToggle = styled.div.attrs(() => ({
  children: (
    <>
      <span />
      <span />
      <span />
    </>
  ),
}))`
  input {
    display: block;
    width: 40px;
    height: 32px;
    position: absolute;
    top: -7px;
    left: -5px;

    cursor: pointer;

    opacity: 0; /* hide this */
    z-index: 2; /* and place it over the hamburger */

    -webkit-touch-callout: none;
  }
  span {
    display: block;
    width: 20px;
    height: 2px;
    margin-bottom: 5px;
    position: relative;

    background: #cdcdcd;
    border-radius: 3px;

    z-index: 1;

    transform-origin: -2px 1px;

    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
      opacity 0.55s ease;
  }

  span:nth-last-child(1) {
    transform-origin: 0% 100%;
  }

  ${props =>
    props.isOpen
      ? `
        span:nth-last-child(1) {
          transform: rotate(-45deg) translate(1px,5px);
        }
  

        span:nth-last-child(2) {
          opacity: 0;
          transform: rotate(0deg) scale(0.2, 0.2);
        }

        span {
          opacity: 1;
          transform: rotate(45deg) translate(4px,-2px);
        }      
    `
      : ``};
`

MenuToggle.propTypes = {
  isOpen: PropTypes.boolean,
}

export default MenuToggle
