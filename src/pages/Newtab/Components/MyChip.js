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
          fontSize:
            value?.toString()?.length > 10
              ? value?.toString()?.length > 13
                ? 12
                : 14
              : 16,
        }}
      >
        {value}
      </span>
    </div>
  );
};

export default MyChip;
