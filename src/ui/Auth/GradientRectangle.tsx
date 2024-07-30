import React from 'react';

const GradientRectangle: React.FC = () => {
  const rectangleStyle: React.CSSProperties = {

    height: '200px',
    background: 'linear-gradient(135deg, hsla(38, 99%, 67%, 1) 10%, hsla(225, 5%, 54%, 1) 62%, hsla(222, 9%, 35%, 1) 97%)',
    filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#FEC258", endColorstr="#83868F", GradientType=1)',
    borderRadius: '15px'
  };

  return <div style={rectangleStyle}></div>;
};

export default GradientRectangle;
