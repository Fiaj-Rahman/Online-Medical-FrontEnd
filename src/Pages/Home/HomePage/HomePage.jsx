import React from "react";
import Banner from "../HomeComponents/Banner";
import ServiceOffers from "../HomeComponents/ServiceOffers";
import LatestBlog from "../HomeComponents/LatestBlog";
import Testimonials from "../HomeComponents/Testimonials";
import HealthResource from "../HomeComponents/HealthResource";
import FAQ from "../HomeComponents/FAQ";
import FAQTitle from "../HomeComponents/FAQTitle";
import ChooseUs from "../HomeComponents/ChooseUs";
import TopRatedDoctor from "../HomeComponents/TopRatedDoctor";

const HomePage = () => {
    return(
        <div className="bg-gray-100">
            <Banner></Banner>
            <ServiceOffers></ServiceOffers>
            <HealthResource></HealthResource>
            <ChooseUs></ChooseUs>
            <LatestBlog></LatestBlog>
            <Testimonials></Testimonials>
            <FAQTitle></FAQTitle>
            <FAQ></FAQ>
            <TopRatedDoctor></TopRatedDoctor>
            
        </div>
    )

}
export default HomePage;