import React, { useState, useEffect } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import EmployeeRepository from "../../repositories/EmployeeRepository";
import useResourceResolver from "../../hooks/resource/useResourceResolver";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import person from "./person.png"
import "./Employee.css"
import LocationRepository from "../../repositories/LocationRepository";
import AnimalRepository from "../../repositories/AnimalRepository";


export default ({ employee, renderFunc }) => {
    const [animalCount, setCount] = useState(0)
    const [location, markLocation] = useState({ name: "" })
    const [classes, defineClasses] = useState("card employee")
    const { employeeId } = useParams()
    const { getCurrentUser } = useSimpleAuth()
    const { resolveResource, resource } = useResourceResolver()
    const history = useHistory()

    useEffect(() => {
        if (employeeId) {
            defineClasses("card employee--single")
        }
        resolveResource(employee, employeeId, EmployeeRepository.get)
    }, [])

    useEffect(() => {
        if (resource?.employeeLocations?.length > 0) {
            markLocation(resource.employeeLocations[0])
        }
    }, [resource])

    const fireEmployee = (id) => {

        EmployeeRepository.delete(id)
            .then(
                renderFunc()
            )
    }

    useEffect(() => {
        LocationRepository.getAll()
            .then(locationOBJ => markLocation(locationOBJ))
    }, []
    )

    useEffect(() => {
        AnimalRepository.getAll()
            .then(setCount(animalCount.userId))
    }, []
    )

    return (
        <article className={classes}>
            <section className="card-body">
                <img alt="Kennel employee icon" src={person} className="icon--person" />
                <h5 className="card-title">
                    {
                        employeeId
                            ? resource.name
                            : <Link className="card-link"
                                to={{
                                    pathname: `/employees/${resource.id}`,
                                    state: { employee: resource }
                                }}>
                                {resource.name}
                            </Link>
                    }
                </h5>
                <section>
                    Caring for {setCount.length} animals
                </section>
                {
                    employeeId
                        ? <>
                            <section>

                                Working at {resource?.locations?.map((empLocations) => {

                                    return empLocations.location.name
                                })} location
                            </section>
                        </>
                        : ""
                }




                {
                    getCurrentUser().employee
                        ? <button className="btn--fireEmployee" id={resource.id} onClick={(event) => {
                            fireEmployee(resource.id)

                        }}>Fire</button>
                        : ""
                }

            </section>

        </article>
    )
}
