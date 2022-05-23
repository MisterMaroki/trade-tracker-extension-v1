import React from 'react';

const MyChip = ({ label, value }) => {
  return (
    <div className="flex col darkbg">
      <span
        style={{
          fontSize: 12,
          textTransform: 'uppercase',
          color: 'darkgrey',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: value.length > 10 ? (value.length > 13 ? 12 : 15) : 18,
        }}
      >
        {value}
      </span>
    </div>
  );
};

export default MyChip;
