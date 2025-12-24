import { useState, useEffect, useMemo, useTransition } from 'react';
import { filterTransactionsByLabel } from '../utils/searchUtils';


/**
 * Hook custom pour gérer la recherche de transactions avec debouncing
 * @param {Array} transactions - Liste complète des transactions
 * @param {number} debounceDelay - Délai de debounce en ms (défaut: 300ms)
 * @returns {Object} - { searchTerm, setSearchTerm, filteredTransactions, isSearching }
 */

export const useTransactionSearch = (transactions, debounceDelay = 300) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, debounceDelay );

        return () => clearTimeout(timer);
    }, [searchTerm, debounceDelay]);

    const filteredTransactions = useMemo(() => {
		return filterTransactionsByLabel(transactions, debouncedSearchTerm);
    }, [transactions, debouncedSearchTerm]);

	const isSearching = searchTerm !== debouncedSearchTerm;

	return {
		searchTerm,
		setSearchTerm,
		filteredTransactions,
		isSearching,
	};
}
