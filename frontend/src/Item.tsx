import { FC } from 'react';
import { IForm } from './types';

interface IProps {
  item: IForm;
}

export const Item: FC<IProps> = ({ item }) => {
  return (
    <div className="text-white text-center mt-3">
      <p>{item.email}</p>
      <p>{item.number}</p>
    </div>
  );
};
