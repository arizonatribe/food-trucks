import React from "react"

import "./Report.css"
import { useReportTrucksByTypeQuery, useReportTrucksByStatusQuery } from "./api"

function Report() {
  const reportByType = useReportTrucksByTypeQuery()
  const reportByStatus = useReportTrucksByStatusQuery()

  return (
    <div className="Report">
      <h4>Type</h4>
      <ul>
        {Object.entries(reportByType.data || {}).map(([k, v]) => (
          <li key={k}>
            {" "}
            {k.toLowerCase()}: {v}
          </li>
        ))}
      </ul>
      <h4>Permit Status</h4>
      <ul>
        {Object.entries(reportByStatus.data || {}).map(([k, v]) => (
          <li key={k}>
            {" "}
            {k.toLowerCase()}: {v}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Report
