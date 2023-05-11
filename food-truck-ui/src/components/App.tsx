import React, { useState } from "react"

import "./App.css"
import Map from "./Map"
import Report from "./Report"
import SearchBox from "./SearchBox"
import TruckMarker from "./TruckMarker"
import { SearchType, toggleSearchType, useSearch } from "./api"

function App() {
  const [searchText, setSearchText] = useState<string>("")
  const [searchType, setSearchType] = useState<SearchType>("name")
  const { data: trucks = [] } = useSearch(searchType, searchText);

  return (
    <div className="App">
      <header className="Header">
        <SearchBox
          text={searchText}
          searchType={searchType}
          toggleSearchType={() => setSearchType(toggleSearchType(searchType))}
          handleSearch={setSearchText}
        />
        <p>Toggle the search by name, type, permit status or items served by food trucks</p>
        <Report />
      </header>
      <Map>
        {trucks.map((t) => (
          <TruckMarker key={t.proprietor?.id} schedule={t.schedule} truck={t.proprietor} loc={t.location} />
        ))}
      </Map>
    </div>
  )
}

export default App
