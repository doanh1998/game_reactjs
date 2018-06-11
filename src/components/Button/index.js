import React from 'react';
import './style.css';
const BtnComponent = props => {
  const { value, id, disableBtn } = props;
  return (
    <div className="btn-num"><input type="button" value={value} id={id} onClick={(e) => props.onClick(e)} disabled={disableBtn} {...props} /></div>
  )
}
export default BtnComponent;