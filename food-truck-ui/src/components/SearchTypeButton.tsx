import React from "react";

import "./SearchTypeButton.css";

interface Props {
    children: React.ReactNode
    onClick(e: any): void
}

export function SearchTypeButton(props: Props) {
    const { children, onClick } = props;

    return (
        <button onClick={onClick} className="SearchTypeButton">
            {children}
        </button>
    );
}
