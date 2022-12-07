import {LoginNavbar} from "./LoginNavbar";
import {GuestNavbar} from "./GuestNavbar";
import {getToken} from "../modules";



export function Navbar() {
    const access_token = getToken()

    if (access_token === "") {
        return <GuestNavbar/>;
    }  else {
        return <LoginNavbar/>;
    }
}