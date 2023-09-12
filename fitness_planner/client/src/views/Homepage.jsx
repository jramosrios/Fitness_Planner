import React from "react";
import axios from 'axios';
import RoutineForm from "../components/RoutineForm";
import DisplayRoutines from "../components/DisplayRoutines";
import { useState } from "react";
const Homepage = ({ routines, setRoutines }) => {

    return (
        <div className="wrapper">
            <DisplayRoutines routines={routines} setRoutines={setRoutines} />
        </div>
    )
}
export default Homepage