import React from 'react';

export type OptionsItem<T> = T & { id: number, name: string };

export const renderOptions = (data: OptionsItem<unknown>[]) => {
  return data.map((item) => (
    <option
      key={item.id}
      value={item.id}
    >
      {item.name}
    </option>
  ));
};
