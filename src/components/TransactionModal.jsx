import { X, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { fixEncoding, formatDate } from '../utils/formatUtils';

const TransactionModal = ({ transaction, onClose }) => {
  if (!transaction) return null;

  const cleanLabel = fixEncoding(transaction.label);
  const cleanAmount = fixEncoding(transaction.amount);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'completed':
        return {
          icon: <CheckCircle className="w-5 h-5" />,
          text: 'Complété',
          color: 'text-green-600 bg-green-50',
        };
      case 'pending':
        return {
          icon: <Clock className="w-5 h-5" />,
          text: 'En attente',
          color: 'text-orange-600 bg-orange-50',
        };
      default:
        return {
          icon: <AlertCircle className="w-5 h-5" />,
          text: 'Erreur',
          color: 'text-red-600 bg-red-50',
        };
    }
  };

  const statusConfig = getStatusConfig(transaction.status);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-200">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Détails de la transaction
            </h2>
            <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Label et montant */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
            <p className="text-xl font-semibold text-gray-900">{cleanLabel}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Montant</h3>
            <p className="text-3xl font-bold text-gray-900">{cleanAmount}</p>
          </div>

          {/* Émetteur */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUpRight className="w-5 h-5 text-red-500" />
              <h3 className="text-sm font-medium text-gray-700">Émetteur</h3>
            </div>
            <p className="text-lg font-semibold text-gray-900">
              {transaction.firstname} {transaction.lastname}
            </p>
            <p className="text-sm text-gray-600 mt-1">ID membre: {transaction.memberId}</p>
          </div>

          {/* Destinataire */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <ArrowDownLeft className="w-5 h-5 text-green-500" />
              <h3 className="text-sm font-medium text-gray-700">Destinataire</h3>
            </div>
            <p className="text-lg font-semibold text-gray-900">
              {transaction.receiverFirstname} {transaction.receiverLastname}
            </p>
          </div>

          {/* Informations supplémentaires */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Statut</h3>
              <span
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${statusConfig.color}`}
              >
                {statusConfig.icon}
                {statusConfig.text}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Type</h3>
              <p className="text-sm text-gray-900 font-medium">
                {transaction.transactionType.replace('_', ' ')}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">ID de paiement</h3>
            <p className="text-sm text-gray-900 font-mono break-all">
              {transaction.paymentId}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;