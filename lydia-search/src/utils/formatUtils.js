
// correction des problemes d'encodage

export const removeAccents = (str) => {
  if(!str)
    return str;

  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export const fixEncoding = (text) => {
    if(!text)
        return text;

    const replacements = {
    'Ã©': 'é',
    'Ã¨': 'è',
    'Ãª': 'ê',
    'Ã§': 'ç',
    'Ã ': 'à',
    'Ã´': 'ô',
    'Ã®': 'î',
    'Ã¯': 'ï',
    'Ã¹': 'ù',
    'Ã»': 'û',
    'Ã¢': 'â',
    'Ã«': 'ë',
    'â‚¬': '€',
    'Ã‰': 'É',
    'Ãˆ': 'È',
    'ÃŠ': 'Ê',
    'Ã‡': 'Ç',
    'Ã€': 'À',
  };

    let fixedText = text;
    for (const [bad, good] of Object.entries(replacements)){
        fixedText = fixedText.replaceAll(bad, good);
    }

    return fixedText;
};

export const formatAmount = (amount) => {
  return fixEncoding(amount);
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};