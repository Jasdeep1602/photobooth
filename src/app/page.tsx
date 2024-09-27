'use client';

/* eslint-disable prefer-destructuring */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/media-has-caption */

import CustomButton from '@/components/button';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const frame = '/frame.png';

  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const handeClick = () => {
    console.log('hello');
  };

  useEffect(() => {
    // Only set up the video stream once
    if (!stream) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
          setStream(mediaStream);
        })
        .catch((err) => console.error('Error accessing webcam: ', err));
    }
  }, [stream]);

  return (
    <div className="maincontainer">
      <div className="left-container">
        <div className="buttoncontainer">
          <CustomButton
            text="CAPTURE"
            handleOnClick={handeClick}
            className="btnstyle"
            lineClass="linestyle"
          />
          <CustomButton
            text="RETAKE"
            handleOnClick={handeClick}
            className="btnstyle"
            lineClass="linestyle"
          />
          <CustomButton
            text="SAVE"
            handleOnClick={handeClick}
            className="btnstyle"
            lineClass="linestyle"
          />
        </div>
        <div className="fullframe ">
          <div className="cameraclass ">
            <video ref={videoRef} autoPlay playsInline />
          </div>
          <Image width={500} alt="frame" height={500} src={frame} className="frame" />
        </div>
      </div>
      <div className="right-container"></div>
    </div>
  );
}
