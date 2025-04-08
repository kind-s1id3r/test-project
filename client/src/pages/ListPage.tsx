import React, { useEffect, useMemo, useState } from 'react';
import { ListItem } from './components';
import useData from './useData';
import useSort from './useSort';
import { Item } from '../types';

interface SubTitleProps {
    children: React.ReactNode;
  }

const SubTitle: React.FC<SubTitleProps> = ({children}) => (
    <h2 className={'list-subtitle'}>Active Item ID: {children}</h2>
)

function ListPage() {
    const items = useData();
    const [sortedItems, sortBy, handleSortClick] = useSort(items);
    
    const [activeItemId,  setActiveItemId] = useState<number | null>(null);
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);
    const [query, setQuery] = useState<string>('');
    
    const activeItemText = useMemo(() => activeItemId !== null ? activeItemId : 'Empty', [activeItemId]);
    
  const handleItemClick = (id: number) => {
    setActiveItemId(id);
  };
  
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
  }
    
    useEffect(() => {
        const filtered = sortedItems.filter(item => `${item.id}`.includes(query))
        setFilteredItems(filtered);
    }, [sortedItems, query]);

  return (
    <div className={'list-wrapper'}>
        <div className="list-header">
            <h1 className={'list-title'}>Items List</h1>
            <SubTitle>{activeItemText}</SubTitle>
            <button onClick={handleSortClick}>Sort ({sortBy === 'ASC' ? 'ASC' : 'DESC'})</button>
            <input type="text" placeholder={'Filter by ID'} value={query} onChange={handleQueryChange} />
        </div>
        <div className="list-container">
            <div className="list">
                {filteredItems.length === 0 && <span>Loading...</span>}
                {filteredItems.map((item) => (
                    <ListItem
                        key={item.id}
                        isActive={activeItemId===item.id}
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        onClick={handleItemClick}
                    />
                ))}
            </div>
        </div>
    </div>
  );
}

export default ListPage;
