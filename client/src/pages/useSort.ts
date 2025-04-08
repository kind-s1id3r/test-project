import { useMemo, useState } from 'react';

import { Item } from '../types';

type SortOrder = 'ASC' | 'DESC';

function useSort(items: Item[]): [Item[], SortOrder, () => void] {
	const [sortBy, setSortBy] = useState<SortOrder>('ASC');
	
	const sortedItems = useMemo(() => {
		const sorted = [...items];
		
		if (sortBy === 'ASC') {
			return sorted.sort((a, b) => a.id - b.id);
		} else {
			return sorted.sort((a, b) => b.id - a.id);
		}
		
	}, [items, sortBy]);
	
	const handleSortClick = () => {
		setSortBy((prevSortBy) => (prevSortBy === 'ASC' ? 'DESC' : 'ASC'));
	}
	
	return [sortedItems, sortBy, handleSortClick]
}

export default useSort;
