import React, { useState, useEffect } from "react"
import Employee from "./Employee"
import EmployeeRepository from "../../repositories/EmployeeRepository"
import "./EmployeeList.css"


export default () => {
    const [emps, setEmployees] = useState([])

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
                    emps.map(a => <Employee key={a.id} employee={a} renderFunc={render}/>)
                }
            </div>
        </>
    )
}
