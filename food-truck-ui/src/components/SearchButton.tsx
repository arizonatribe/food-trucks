import React from 'react';
import './SearchButton.css';

interface Props {
    isLoading?: boolean
    onClick(e: any): void
}

export function SearchButton(props: Props) {
    const { isLoading, onClick } = props

    return (
        <button onClick={onClick} className="SearchBoxButton SearchButton">
            {isLoading ? <span className="ButtonLoading" /> : "🔍"}
        </button>
    )
}
