import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import './imageSlider.css';

export default function ImageSlider() {
  const slides = [
    {
      subtitle: 'AI-Powered Collaboration',
      title: 'Multi-Agent Framework',
      description: 'A system of AI agents, each responsible for a unique task, collaborates to perform recruitment actions autonomously.',
      buttonText: 'Explore Agents',
    },
    {
      subtitle: 'Precision Matching',
      title: 'Intelligent JD-CV Matching',
      description: 'LLM-based matcher deeply understands job descriptions and resumes for precise, unbiased shortlisting.',
      buttonText: 'See Matching',
    },
    {
      subtitle: 'Smart Communication',
      title: 'Personalized Outreach',
      description: 'Auto-generate interview emails tailored to each candidate via our communication agent.',
      buttonText: 'Send Smarter Emails',
    },
    {
      subtitle: 'Insightful Dashboards',
      title: 'Centralized Analytics',
      description: 'Track match scores, interview stages, and more from a single dashboard.',
      buttonText: 'View Analytics',
    },
    {
      subtitle: 'Streamlined Hiring',
      title: 'Faster Hiring',
      description: 'Reduce time-to-hire, costs, and increase recruitment quality using automation.',
      buttonText: 'Speed Up Hiring',
    },
  ];

  return (
    <div className="slider-container">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination, EffectCoverflow]}
        className="slider-wrapper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="slide">
            <div className="slide-content">
              <div className="slide-subtitle">{slide.subtitle}</div>
              <div className="slide-title">{slide.title}</div>
              <div className="slide-description">{slide.description}</div>
              <button className="slide-button">
                <span>{slide.buttonText}</span>
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
