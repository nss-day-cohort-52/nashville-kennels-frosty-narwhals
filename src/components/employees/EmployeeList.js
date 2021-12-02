import React, { useState, useEffect } from "react"
import Employee from "./Employee"
import EmployeeRepository from "../../repositories/EmployeeRepository"
import "./EmployeeList.css"
import { useHistory } from "react-router-dom";


export default () => {
    const [emps, setEmployees] = useState([])
    const history = useHistory()
    useEffect(
        () => {
            render()
        }, []
    )

    const render = () => {
        EmployeeRepository.getAll()
            .then(
                (em) => {
                    setEmployees(em)
                }
            )

    }

    return (
        <>
            <div className="employees">
                {
                    emps.map(a => <Employee key={a.id} employee={a} renderFunc={render}  /> ) 
                }
            </div>
            <div>
                <button className="btn--employeeLocale" onClick={() => {
                    history.push("/employees/create")
                }}>Set Employee Location</button>
            </div>
        </>
    )
}
