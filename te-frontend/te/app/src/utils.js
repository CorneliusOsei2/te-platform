export const getNestedPropertyValue = (obj, path) => {
    const properties = path.split('.');
    return properties.reduce((value, property) => value && value[property], obj);
}

export const setNestedPropertyValue = (obj, path, value) => {
    const properties = path.split('.');
    const lastProperty = properties.pop();

    const nestedObject = properties.reduce((nested, property) => {
        if (!nested[property]) {
            nested[property] = {};
        }
        return nested[property];
    }, obj);

    nestedObject[lastProperty] = value;
    return obj;
};


export const sortByField = (list, field, order = 'asc') => {
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

export const copyTextToClipboard = async (text) => {
    await navigator.clipboard.writeText(text)
}
