import { Sidebar } from "./sidebar/Sidebar";
import { Navbar } from "./navbar/Navbar";

import './Home.sass'
import { Stores } from "./stores/Stores";

export const Home = () => {
    return (
        <div className="row p-0 m-0">

            <Sidebar></Sidebar>

            <div className="col p-md-5 p-3 m-0">
                <Navbar />
                <Stores />
            </div>
        </div>
    );
}