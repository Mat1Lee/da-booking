import React from 'react';

import { Divider } from 'antd';

import './index.css';
const BaseBorderBox = ({
  children,
  title,
  style={},
}) => {

  return (
    <div
      style={style}
      className='base-border-box'
    >
      <Divider
        className='base-border-box__divider'
        orientation="left"
      >
        <h6>{title}</h6>
      </Divider>
      <div
        className='base-border-box__content'
      >
        {children}
      </div>
    </div>
  )
}

export default BaseBorderBox;
