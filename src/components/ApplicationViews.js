import React from "react"
import { Route } from "react-router-dom"

import AnimalRoutes from "./AnimalRoutes"
import EmployeeRoutes from "./EmployeeRoutes"
import EmployeeList from "./employees/EmployeeList"
import LocationRoutes from "./LocationRoutes"
import SearchResults from "./search/SearchResults"


export default () => {
    return (
        <>
            <LocationRoutes />
            <AnimalRoutes />
            <EmployeeRoutes />

            <Route path="/search">
                <SearchResults />
            </Route>
        </>
    )
}
