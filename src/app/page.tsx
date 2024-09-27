'use client';

import CustomButton from '@/components/button';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/* eslint-disable prefer-destructuring */

/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/media-has-caption */

// import { useEffect, useRef, useState } from 'react';
// import Image from 'next/image';

export default function Home() {
  const frame = '/frame.png';
  // const videoRef = useRef<HTMLVideoElement | null>(null);
  // const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // const [capturedImage, setCapturedImage] = useState<string | null>(null);
  // const frameImage = '/frame.png'; // Path to your frame image

  // const startWebcam = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  //     if (videoRef.current) {
  //       videoRef.current.srcObject = stream;
  //     }
  //   } catch (error) {
  //     console.error('Error accessing webcam:', error);
  //   }
  // };

  // const captureImage = () => {
  //   if (videoRef.current && canvasRef.current) {
  //     const canvas = canvasRef.current;
  //     const context = canvas.getContext('2d');

  //     const desiredWidth = 400; // Adjust width based on your requirements
  //     const desiredHeight = 660; // Adjust height based on your requirements

  //     if (context) {
  //       // Clear the canvas before drawing
  //       context.clearRect(0, 0, canvas.width, canvas.height);

  //       // Set the canvas size to the desired dimensions
  //       canvas.width = desiredWidth;
  //       canvas.height = desiredHeight;

  //       // Save the context state
  //       context.save();

  //       // Flip the context horizontally
  //       context.scale(-1, 1);
  //       context.drawImage(videoRef.current, -desiredWidth, 0, desiredWidth, desiredHeight);

  //       // Restore the context to its original state
  //       context.restore();

  //       // Create a new HTMLImageElement for the frame
  //       const frame = new window.Image(); // Native Image constructor
  //       frame.src = frameImage;

  //       frame.onload = () => {
  //         // Draw the frame on top of the video, scaled to fit the desired dimensions
  //         context.drawImage(frame, 0, 0, desiredWidth + 20, desiredHeight + 20);

  //         // Capture the combined image as a data URL
  //         const imageData = canvas.toDataURL('image/png');
  //         setCapturedImage(imageData);
  //       };
  //     }
  //   }
  // };

  // const stopWebcam = () => {
  //   if (videoRef.current && videoRef.current.srcObject) {
  //     const stream = videoRef.current.srcObject as MediaStream;
  //     const tracks = stream.getTracks();
  //     tracks.forEach((track) => track.stop());
  //     videoRef.current.srcObject = null;
  //   }
  // };

  // const handleRetake = () => {
  //   setCapturedImage(null);
  //   startWebcam();
  // };

  // const saveImage = () => {
  //   if (capturedImage) {
  //     const a = document.createElement('a');
  //     a.href = capturedImage;
  //     a.download = 'captured-image.png';
  //     a.click();
  //   }
  // };

  // useEffect(() => {
  //   startWebcam();
  //   return () => {
  //     stopWebcam();
  //   };
  // }, []);

  const videoRef = useRef<HTMLVideoElement>(null);
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  // const [isCaptured, setIsCaptured] = useState(false);
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
