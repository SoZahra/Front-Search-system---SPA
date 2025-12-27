import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { fixEncoding, formatDate } from '../utils/formatUtils';

const TransactionCard = ({ transaction, onCardClick }) => {
  // Nettoyer et formater le montant
  const cleanLabel = fixEncoding(transaction.label);
  const cleanAmount = fixEncoding(transaction.amount);

  // Déterminer le statut avec icone et couleur
  const getStatusConfig = (status) => {
    switch (status) {
      case 'completed':
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          text: 'Complété',
          color: 'text-green-600 bg-green-50',
        };
      case 'pending':
        return {
          icon: <Clock className="w-4 h-4" />,
          text: 'En attente',
          color: 'text-orange-600 bg-orange-50',
        };
      default:
        return {
          icon: <AlertCircle className="w-4 h-4" />,
          text: 'Erreur',
          color: 'text-red-600 bg-red-50',
        };
    }
  };

  const statusConfig = getStatusConfig(transaction.status);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200 cursor-pointer hover:scale-[1.02] transition-transform"
        onClick={() => onCardClick(transaction)}
        >
        {/* Header avec label et montant */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0 pr-4">
            <h3 className="font-semibold text-gray-900 text-lg mb-1 truncate">
              {cleanLabel}
            </h3>
            <p className="text-sm text-gray-500">
              {formatDate(transaction.date)}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xl font-bold text-gray-900 whitespace-nowrap">{cleanAmount}</p>
          </div>
        </div>

        {/* Informations émetteur/destinataire */}
        <div className="flex items-center gap-3 mb-3 text-sm">
          <div className="flex items-center gap-1.5 text-gray-600 min-w-0 flex-1">
            <ArrowUpRight className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span className="truncate">
              {transaction.firstname} {transaction.lastname}
            </span>
          </div>
          <span className="text-gray-300">→</span>
          <div className="flex items-center gap-1.5 text-gray-600 min-w-0 flex-1">
            <ArrowDownLeft className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span className="truncate">
              {transaction.receiverFirstname} {transaction.receiverLastname}
            </span>
          </div>
        </div>

        {/* Statut */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}
          >
            {statusConfig.icon}
            {statusConfig.text}
          </span>
          <span className="text-xs text-gray-400 font-mono truncate ml-2">
            ID: {transaction.paymentId.slice(0, 8)}...
          </span>
        </div>
        </div>
  );
};

export default TransactionCard;
