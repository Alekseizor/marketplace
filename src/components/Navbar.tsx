import {LoginNavbar} from "./LoginNavbar";
import {GuestNavbar} from "./GuestNavbar";
import {getRole, getToken} from "../modules";
import {useState} from "react";
import {ManagerNavbar} from "./ManagerNavbar";


export function Navbar() {
    const access_token = getToken()
    const [roles, setRole] = useState()
    const role = getRole(access_token)
    role.then((result) => {
        setRole(result)
    })
    if (access_token === "") {
        return <GuestNavbar/>;
    } else if (roles === 1){
        return <ManagerNavbar/>;
    } else {
        return <LoginNavbar/>;
    }
}