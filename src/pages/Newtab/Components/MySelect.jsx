import React, { useEffect, useState } from 'react';
import chroma from 'chroma-js';

import Select from 'react-select';
import { CryptoState } from '../CryptoContext';

export const colourOptions = [
  { value: 'USD', label: 'USD', color: '#00B8D9' },
  { value: 'GBP', label: 'GBP', color: '#9c27b0' },
];

const dot = (color = 'transparent') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: '#091019',
    fontSize: '12px',
    outline: 'none',
    border: 'none',
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      outline: 'none',
      border: 'none',

      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, '#091019') > 2
          ? 'white'
          : 'whitesmoke'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  input: (styles) => ({
    ...styles,
    maxWidth: '100px',
    color: 'whitesmoke',
    border: 'none',
    outline: 'none',
    ...dot(),
  }),
  placeholder: (styles) => ({ ...styles, color: 'whitesmoke', ...dot('#ccc') }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: 'whitesmoke',
    backgroundColor: '#091019',

    ...dot(data.color),
  }),
};

const MySelect = () => {
  const [selectedOption, setSelectedOption] = useState(colourOptions[0]);

  const { setCurrency } = CryptoState();

  useEffect(() => {
    selectedOption && setCurrency(selectedOption?.value);
  }, [selectedOption, setCurrency]);
  return (
    <Select
      defaultValue={colourOptions[0]}
      options={colourOptions}
      styles={colourStyles}
      value={selectedOption}
      onChange={setSelectedOption}
    />
  );
};
export default MySelect;
