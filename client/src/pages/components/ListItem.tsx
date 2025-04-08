import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { Item } from '../../types';

type ListItemProps = Item & {
  onClick: (id: number) => void;
  isActive: boolean;
}

const ListItem: React.FC<ListItemProps> = ({ id, name, description, onClick, isActive }) => {
  return (
    <li className={isActive ? 'list-item active' : 'list-item'}>
        <Link to={`/${id}`}>
            <div className={'list-item-actions'}>
                <div>ID: <b>{id}</b></div>
                <Button onClick={onClick} id={id} disabled={isActive}>
                    {isActive ? 'Active' : 'Set Active'}
                </Button>
            </div>
            <div>{name}</div>
            <div className={'list-item__description'}>{description}</div>
        </Link>
    </li>
  );
};


export default ListItem;
