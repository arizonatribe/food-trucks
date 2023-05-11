/* Based on a prior work, for a coding assessment from last year https://github.com/arizonatribe/cartoon-catalog/blob/main/src/features/catalog/SearchWithAutoComplete.tsx */
import React, { useState } from "react";

import { SearchTypeButton } from "./SearchTypeButton";
import { SearchButton } from "./SearchButton";
import './SearchBox.css';

enum KeyCodes {
    enter = 13,
    escape = 27,
    backspace = 8
}

interface Props {
    text: string
    searchType: string
    toggleSearchType(): void
    isLoading?: boolean
    handleSearch(search: string): void
}

function SearchBox(props: Props) {
    const { searchType, toggleSearchType, isLoading, text, handleSearch } = props;

    const [inputText, setInputText] = useState<string>(text);

    function handleChange(e: any) {
        const textVal = e.target.value;
        setInputText(textVal);
    }

    function handleSubmit(textVal: string) {
        setInputText(textVal);
        if (textVal !== text) {
            handleSearch(textVal);
        }
    }

    function handleKeyDown(e: any) {
        const currentTextInput = e.target.value;
        const keycode = e.keyCode;

        switch (keycode) {
            case KeyCodes.escape: {
                handleSubmit("");
                break;
            }
            case KeyCodes.enter: {
                handleSubmit(currentTextInput);
                break;
            }
            default: {
                setInputText(currentTextInput);
                break;
            }
        }
    }

    return (
        <div className="SearchWrapper">
            <div className="SearchWithButton">
                <SearchTypeButton onClick={toggleSearchType}>
                    {searchType}
                </SearchTypeButton>
                <input
                    type="text"
                    value={inputText}
                    onFocus={() => {
                        setInputText("");
                    }}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className="SearchTextbox"
                />
                <SearchButton isLoading={isLoading} onClick={() => handleSubmit(inputText)} />
            </div>
        </div>
    );
}

export default SearchBox;
