/**
 * Filtre les transactions basées sur le label
 * @param {Array} transactions - Liste des transactions
 * @param {string} searchTerm - Terme de recherche
 * @returns {Array} - Transactions filtrées
 */


export const filterTransactionsByLabel = (transactions, searchTerm) => {

    if(!searchTerm || searchTerm.trim() === '')
        return transactions;

    const normalizedSearch = searchTerm.toLowerCase().trim();

    return transactions.filter((transaction) => {
        const normalizedLabel = transaction.label.toLowerCase();
        return normalizedLabel.includes(normalizedSearch);
    });
}