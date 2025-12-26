import { useState } from 'react';
import SearchBar from './components/SearchBar';
import TransactionList from './components/TransactionList';
import TransactionModal from './components/TransactionModal';
import { useTransactionSearch } from './hooks/useTransactionSearch';
import transactionsData from './data/transactions.json';

function App() {
  const { searchTerm, setSearchTerm, filteredTransactions, isSearching } =
    useTransactionSearch(transactionsData);
  
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleCardClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Transactions
          </h1>
          <p className="text-gray-600 mt-1">
            Recherchez vos transactions facilement
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          resultsCount={filteredTransactions.length}
          totalCount={transactionsData.length}
        />
        <TransactionList
          transactions={filteredTransactions}
          isSearching={isSearching}
          onCardClick={handleCardClick}
        />
      </main>

      {/* Modal */}
      {selectedTransaction && (
        <TransactionModal
          transaction={selectedTransaction}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;
