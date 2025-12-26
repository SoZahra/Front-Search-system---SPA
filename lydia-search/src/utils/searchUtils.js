import { fixEncoding, removeAccents } from "./formatUtils";

/**
 * Filtre les transactions basées sur le label
 * @param {Array} transactions - Liste des transactions
 * @param {string} searchTerm - Terme de recherche
 * @returns {Array} - Transactions filtrées
 */

export const filterTransactionsByLabel = (transactions, searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') {
    return transactions;
  }

  const fixecSearch = fixEncoding(searchTerm); //corriger l'encodage du therme

  const normalizedSearch = removeAccents(fixecSearch.toLowerCase().trim()); // lowercase + sans accents

  return transactions.filter((transaction) => {
    const cleanedLabel = fixEncoding(transaction.label);
    const normalizedLabel = removeAccents(cleanedLabel.toLowerCase());
    return normalizedLabel.includes(normalizedSearch);
  });
};