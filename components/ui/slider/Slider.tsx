import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import cn from 'classnames';
import 'keen-slider/keen-slider.min.css';
import s from './slider.module.css';

interface Props {
  classname?: string;
  height: string;
}

const Slider: React.FC<Props> = ({ classname, height }) => {
  const [ref] = useKeenSlider<HTMLDivElement>({ loop: true });

  return (
    <div
      ref={ref}
      className={cn(classname, 'keen-slider', {
        'md:h-88 h-72': height === 'small',
        'md:h-96 h-80': height === 'large',
      })}>
      <div className="keen-slider__slide img-slide1"></div>
      <div className="keen-slider__slide img-slide2"></div>
      <div className="keen-slider__slide img-slide3"></div>
    </div>
  );
};

export default Slider;
