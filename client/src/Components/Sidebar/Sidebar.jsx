import React from 'react'
import { Link } from 'react-router-dom'
import AppLogo from '../AppLogo/AppLogo'
export default function Sidebar() {
  return (
    <>
        <div>
                    <div className="p-0 min-vh-100 side-bar-bg-color">
                        <ul className="text-light list-unstyled">

                            <li className="p-3 pe-lg-5 d-lg-flex d-none  ">
                            <AppLogo/>
                            </li>
                            
                            <li className="p-3 pe-lg-5 sidebar-element">
                                <Link to="/home" className="nav-link px-0 px-lg-2"> <i className="bi-house"/><span className="px-lg-2 ms-1 d-none d-lg-inline">Home</span> </Link>
                            </li>
                            <li className="p-3 pe-lg-5 sidebar-element">
                                <Link to="/addBook" className="nav-link px-0 px-lg-2"> <i className="bi bi-cloud-plus"/><span className="px-lg-2 ms-1 d-none d-lg-inline">Create</span> </Link>
                            </li>
                            <li className="p-3 pe-lg-5 sidebar-element">
                                <Link to="/profile" className="nav-link px-0 px-lg-2"> <i className="bi bi-person-circle"></i><span className="px-lg-2 ms-1 d-none d-lg-inline">Profile</span> </Link>
                            </li>
                            <li className="p-3 pe-lg-5 sidebar-element">
                                <Link to="/login" className="nav-link px-0 px-lg-2"> <i className="bi bi-box-arrow-left"></i><span className="px-lg-2 ms-1 d-none d-lg-inline">Logout</span> </Link>
                            </li>

                        </ul>
                    </div>
            </div>
    </>
  )
}
