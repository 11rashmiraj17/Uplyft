import React from "react";
import LearnerNavbar from "../component/LearnerNavbar";
import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";

const LearnerLayout=()=>{


    return (
        <div>
        <LearnerNavbar/>
        <main className="pt-0"> {/* Add padding if navbar is fixed */}
            <Outlet />
        </main>
        <Footer/>
        </div>
  );
};

export default LearnerLayout