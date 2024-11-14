import React from "react"
import BecomeDoctorBanner from "../BecomeDoctorComponent/BecomeDoctorBanner";
import BecomeDoctorTabs from "../BecomeDoctorComponent/BecomeDoctorTabs";
import BecomeDoctorForm from "../BecomeDoctorComponent/BecomeDoctorForm";

const BecomeDoctorPage = () =>{
    return(
        <div>
            <BecomeDoctorBanner></BecomeDoctorBanner>
            <BecomeDoctorTabs></BecomeDoctorTabs>
            <BecomeDoctorForm></BecomeDoctorForm>
        </div>
    )
}

export default BecomeDoctorPage;