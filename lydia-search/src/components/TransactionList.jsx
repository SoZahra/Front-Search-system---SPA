import TransactionCard from './TransactionCard';

const TransactionList = ({ transactions, isSearching }) => {
  if (isSearching) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Aucune transaction trouvée
        </h3>
        <p className="text-gray-500">
          Essayez avec un autre terme de recherche
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
      {transactions.map((transaction) => (
        <TransactionCard key={transaction.paymentId} transaction={transaction} />
      ))}
    </div>
  );
};

export default TransactionList;