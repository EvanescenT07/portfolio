"use client";

import { useSwiper } from "swiper/react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { WorkSliderButtonProps } from "@/types/component-types";

const WorkSliderButton = ({
  containerStyle,
  buttonStyle,
  iconsStyle,
}: WorkSliderButtonProps) => {
  const swiper = useSwiper();
  return (
    <div className={containerStyle}>
      <button
        type="button"
        className={buttonStyle}
        title="Previous"
        onClick={() => swiper.slidePrev()}
      >
        <PiCaretLeftBold className={iconsStyle} />
      </button>
      <button
        type="button"
        className={buttonStyle}
        title="Next"
        onClick={() => swiper.slideNext()}
      >
        <PiCaretRightBold className={iconsStyle} />
      </button>
    </div>
  );
};

export default WorkSliderButton;
