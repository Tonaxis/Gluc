import React from 'react';
import './Loader.scss';

function Loader({ state, page, children }) {
  if (state) {
    return (
      <div className={`loader ${page ? 'page-loader' : ''}`}>
        <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="10" fill="#eee" /></svg>
        <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="10" fill="#eee" /></svg>
        <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="10" fill="#eee" /></svg>
      </div>
    );
  }

  return children;
}

export default Loader;
