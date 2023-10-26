const getNestedPropertyValue = (obj, path) => {
  const properties = path.split('.');
  return properties.reduce((value, property) => value && value[property], obj);
}

const sortByField = (list, field, order = 'asc') => {
    return list.slice().sort((a, b) => {
        const valueA = getNestedPropertyValue(a, field);
        const valueB = getNestedPropertyValue(b, field);

        if (order === 'asc') {
            if (valueA < valueB) return -1;
            if (valueA > valueB) return 1;
        } else if (order === 'desc') {
            if (valueA > valueB) return -1;
            if (valueA < valueB) return 1;
        }
        return 0; 
    });
}

const copyTextToClipboard = async (text) => {
    await navigator.clipboard.writeText(text)
}

module.exports =  {sortByField, copyTextToClipboard};