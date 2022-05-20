import React, { useEffect, useState } from 'react';
import chroma from 'chroma-js';

import Select, { StylesConfig } from 'react-select';
import { CryptoState } from '../CryptoContext';

export const colourOptions = [
  { value: 'USD', label: 'USD', color: '#00B8D9' },
  { value: 'GBP', label: 'GBP', color: '#5243AA' },
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
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
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
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
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
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

const MySelect = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const { currency, setCurrency } = CryptoState();

  useEffect(() => {
    selectedOption && setCurrency(selectedOption?.value);
  }, [selectedOption]);
  return (
    <Select
      defaultValue={colourOptions[2]}
      options={colourOptions}
      styles={colourStyles}
      value={selectedOption}
      onChange={setSelectedOption}
    />
  );
};
export default MySelect;
