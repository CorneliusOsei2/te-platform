import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';


const Typeahead = ({ name, value, data, handler }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);

    const getSuggestions = (inputValue) => {

        const inputValueLowerCase = inputValue.trim().toLowerCase();
        return data.filter((entry) =>
            entry.toLowerCase().includes(inputValueLowerCase)
        );
    };

    const getSuggestionValue = (suggestion) => suggestion;

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const onKeyDown = (event) => {
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                navigateSuggestions(1);
                break;
            case 'ArrowUp':
                event.preventDefault();
                navigateSuggestions(-1);
                break;
            default:
                break;
        }
    };

    const navigateSuggestions = (step) => {
        const currentIndex = suggestions.indexOf(selectedSuggestion);
        const newIndex = currentIndex + step;

        if (newIndex >= 0 && newIndex < suggestions.length) {
            setSelectedSuggestion(suggestions[newIndex]);
        }
    };

    const renderSuggestion = (suggestion) => {
        const isSelected = suggestion === selectedSuggestion;
        return (
            <div className={`pl-2 ml  -2 z-10 relative group text-gray-500 ${isSelected ? ' text-blue-400 bg-blue-100' : 'bg-white'}`}>
                <hr />
                <li
                    className={`py-2 cursor-pointer ${isSelected ? 'font-weight-700' : ''}`}
                    onMouseEnter={() => setSelectedSuggestion(suggestion)}
                >
                    {suggestion}
                </li>
            </div>
        );
    };

    const inputProps = {
        name: name,
        value: value,
        onChange: (_, { newValue }) => { handler({ "name": name, "value": newValue }) },
        className: "peer block w-full border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6",
        onKeyDown
    };

    return (
        <>
            <div>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
            </div>
        </>

    );
};

export default Typeahead;
