
import React, { useState } from 'react';
import styles from './Slider.module.css';
import img1 from '../../assets/images/Slider_1.jpg';
import img2 from '../../assets/images/Slider_2.jpg'; 
import img3 from '../../assets/images/Slider_3.jpg';
import img4 from '../../assets/images/Slider_4.jpg';
import img5 from '../../assets/images/Slider_5.jpg';
import img6 from '../../assets/images/Slider_6.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';





const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = [
    {
      img: img1,
      title: (
        <> Become a <br /> Data Analyst </>
      ),
      content: 'Unlock the power of data with our comprehensive program designed to equip you with the skills needed to excel as a Data Analyst.',
    },
    {
      img: img2,
      title: (
        <> Become a <br /> Scrum Master </>
      ),
      content: 'Advance your career with our Scrum Master program, designed to empower you with the expertise needed to lead Agile teams to success.',
    },
    {
      img: img3,
      title: (
        <> Become a <br/> Product Owner </>
      ),
      content: 'Transform your career by mastering the role of a Product Owner with our specialized program. ',
    },
    {
      img: img4,
      title: (
        <> Become a <br/> Product Manager </>
      ),
      content: 'Elevate your career by becoming a Product Manager with our comprehensive program. ',
    },
    {
      img: img5,
      title: (
        <> Become an Agile <br/> Product Manager </>
      ),
      content: 'Advance your career with our Scrum Master program, designed to empower you with the expertise needed to lead Agile teams to success.',
    },
    {
      img: img6,
      title: (
        <> Become a <br /> Product Analyst </>
      ),
      content: 'Transform your career by mastering the role of a Product Owner with our specialized program.',
    },
  ];

  const changeSlide = (n) => {
    let newIndex = slideIndex + n;
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= slides.length) newIndex = slides.length - 1;
    setSlideIndex(newIndex);
  };

  return (
    <div className={styles.slideshowContainer}>
      {slides.map((slide, index) => (
        <div className={styles.slide} key={index} style={{ display: index === slideIndex ? 'flex' : 'none' }}>
          
          <div className={styles.imageContainer}>
            <img src={slide.img} alt={`Image ${index + 1}`} />
            <button className={`${styles.prev} ${slideIndex === 0 ? styles.disabled : ''}`} onClick={() => changeSlide(-1)}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <button className={`${styles.next} ${slideIndex === slides.length - 1 ? styles.disabled : ''}`} onClick={() => changeSlide(1)}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          <div className={styles.contentContainer}>
            <h2 className='font-bold text-2xl text-[#23314A] pb-3'>{slide.title}</h2>
            <p className='lg:text-[20px] text-[16px] font-[300] text-justify'>{slide.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;