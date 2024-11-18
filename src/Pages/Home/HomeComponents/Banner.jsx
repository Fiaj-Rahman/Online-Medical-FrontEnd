import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Banner = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 2000, once: false });
  }, []);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  const handleSlideChange = () => {
    AOS.refresh();
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background and Overlay */}
      <div className="absolute inset-0 bg-cover h-full bg-center bg-fixed" style={{ backgroundImage: 'url(./slider01.jpg)' }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50" />

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        onSlideChange={handleSlideChange}
        className="mySwiper h-full"
      >
        {/* Slide 1 */}
        <SwiperSlide className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center justify-center h-full text-center p-6 rounded-lg shadow-lg">
            <h2 data-aos="fade-up" data-aos-delay="200" className="text-white text-5xl font-semibold mb-2">Expert Medical Care</h2>
            <p data-aos="fade-up" data-aos-delay="400" className="text-white text-lg mb-4 max-w-md">
              Receive personalized treatment plans from top specialists, focused on your health needs.
            </p>
            <div className="mt-4 flex space-x-4">
              <a data-aos="fade-up" data-aos-delay="600" href="/Find_a_Doctor" className="bg-blue-600 text-white py-2 px-6 rounded-full shadow hover:bg-blue-700 transition">Find Doctor</a>
              <a data-aos="fade-up" data-aos-delay="800" href="/appointment" className="bg-green-600 text-white py-2 px-6 rounded-full shadow hover:bg-green-700 transition">Appointment</a>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center justify-center h-full text-center p-6 rounded-lg shadow-lg">
            <h2 data-aos="fade-up" data-aos-delay="200" className="text-white text-5xl font-semibold mb-2">Comprehensive Health Services</h2>
            <p data-aos="fade-up" data-aos-delay="400" className="text-white text-lg mb-4 max-w-md">
              From routine check-ups to specialized consultations, our team is dedicated to your well-being.
            </p>
            <div className="mt-4 flex space-x-4">
              <a data-aos="fade-up" data-aos-delay="600" href="/Find_a_Doctor" className="bg-blue-600 text-white py-2 px-6 rounded-full shadow hover:bg-blue-700 transition">Find Doctor</a>
              <a data-aos="fade-up" data-aos-delay="800" href="/appointment" className="bg-green-600 text-white py-2 px-6 rounded-full shadow hover:bg-green-700 transition">Appointment</a>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center justify-center h-full text-center p-6 rounded-lg shadow-lg">
            <h2 data-aos="fade-up" data-aos-delay="200" className="text-white text-5xl font-semibold mb-2">24/7 Emergency Services</h2>
            <p data-aos="fade-up" data-aos-delay="400" className="text-white text-lg mb-4 max-w-md">
              Our emergency care team is available 24/7, ensuring timely help whenever you need it.
            </p>
            <div className="mt-4 flex space-x-4">
              <a data-aos="fade-up" data-aos-delay="600" href="/Find_a_Doctor" className="bg-blue-600 text-white py-2 px-6 rounded-full shadow hover:bg-blue-700 transition">Find Doctor</a>
              <a data-aos="fade-up" data-aos-delay="800" href="/appointment" className="bg-green-600 text-white py-2 px-6 rounded-full shadow hover:bg-green-700 transition">Appointment</a>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Progress Indicator */}
      <div className="autoplay-progress absolute bottom-4 right-4 flex items-center justify-center">
        <svg viewBox="0 0 48 48" ref={progressCircle} className="w-12 h-12 text-white">
          <circle cx="24" cy="24" r="20" className="stroke-current text-blue-500 opacity-60"></circle>
        </svg>
        <span ref={progressContent} className="absolute text-white text-sm font-semibold"></span>
      </div>
    </div>
  );
};

export default Banner;
