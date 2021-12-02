import React, { useEffect, useState } from "react"
import EmployeeRepository from "../../repositories/EmployeeRepository";
import LocationRepository from "../../repositories/LocationRepository";
import "./EmployeeForm.css"


export default (props) => {
    const [employees, updateEmployees] = useState([])
    const [locations, defineLocations] = useState([])
    const [empLocation, setEmpLocation] = useState({
        userId: 0,
        locationId: 0
    })

    useEffect(() => {
        EmployeeRepository.getAll()
            .then(
                (em) => {
                    updateEmployees(em)
                }
            )
        LocationRepository.getAll()
            .then((loc) => {
                defineLocations(loc)
            })
    }, [])

    const constructNewEmployeeLocation = () => {
        EmployeeRepository.assignEmployee({
            userId: empLocation.userId,
            locationId: empLocation.locationId
        })
    }

    const handleUserInput = (event) => {
        const copy = { ...empLocation }
        copy[event.target.id] = parseInt(event.target.value)
        setEmpLocation(copy)
    }

    const handleUserLocation = (event) => {
        const copy = { ...locations }
        copy[event.target.id] = event.target.value
        defineLocations(copy)
    }


    return (
        <>
            <form className="employeeForm">
                <h2 className="employeeForm__title">New Employee</h2>
                <div className="form-group">
                    <label htmlFor="employeeName">Employee name</label>
                    <select onChange={handleUserInput}
                        id="userId"
                        defaultValue=""
                        name="employee"
                        className="form-control"
                    >
                        <option value="0">Select an employee</option>
                        {employees.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="location">Assign to location</label>
                    <select onChange={handleUserInput}
                        id="locationId"
                        defaultValue=""
                        name="location"
                        className="form-control"
                    >
                        <option value="0">Select a location</option>
                        {locations.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit"
                    onClick={
                        evt => {
                            evt.preventDefault()
                            constructNewEmployeeLocation()
                        }
                    }
                    className="btn btn-primary"> Save Employee </button>
            </form>
        </>
    )
}
