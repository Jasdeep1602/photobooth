'use client';

/* eslint-disable prefer-destructuring */

/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/media-has-caption */

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const frameImage = '/frame.png'; // Path to your frame image

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      const desiredWidth = 400; // Adjust width based on your requirements
      const desiredHeight = 660; // Adjust height based on your requirements

      if (context) {
        // Clear the canvas before drawing
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Set the canvas size to the desired dimensions
        canvas.width = desiredWidth;
        canvas.height = desiredHeight;

        // First, draw the video feed, scaled to fit the desired dimensions
        context.drawImage(videoRef.current, 0, 0, desiredWidth, desiredHeight);

        // Create a new HTMLImageElement for the frame
        const frame = new window.Image(); // Native Image constructor
        frame.src = frameImage;

        frame.onload = () => {
          // Draw the frame on top of the video, scaled to fit the desired dimensions
          context.drawImage(frame, 0, 0, desiredWidth + 20, desiredHeight + 20);

          // Capture the combined image as a data URL
          const imageData = canvas.toDataURL('image/png');
          setCapturedImage(imageData);
        };
      }
    }
  };

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startWebcam();
  };

  const saveImage = () => {
    if (capturedImage) {
      const a = document.createElement('a');
      a.href = capturedImage;
      a.download = 'captured-image.png';
      a.click();
    }
  };

  useEffect(() => {
    startWebcam();
    return () => {
      stopWebcam();
    };
  }, []);

  return (
    <div
      className="relative h-[115vh] bg-cover flex items-center justify-center"
      style={{
        backgroundImage: `url('/bg.jpg')`,
      }}
    >
      {/* Middle Frame */}
      <div className="flex items-center w-full">
        <div className="flex flex-col gap-7 w-full ml-44 relative">
          <div className="flex flex-col w-full group">
            <button
              type="button"
              className="bg-pink-50 mr-10 hover:bg-white text-pink-500 font-bold py-2 px-6 rounded-tl-2xl rounded-br-2xl w-[13%]"
              onClick={captureImage}
            >
              CAPTURE
            </button>
            <div className="flex bg-pink-50 group-hover:bg-white w-full p-[0.4px]" />
          </div>

          <div className="flex flex-col w-full group">
            <button
              type="button"
              className="bg-pink-50 mr-10 hover:bg-white text-pink-500 font-bold py-2 px-6 rounded-tl-2xl rounded-br-2xl w-[13%]"
              onClick={handleRetake}
            >
              RETAKE
            </button>
            <div className="flex bg-pink-50 group-hover:bg-white w-full p-[0.4px]" />
          </div>

          <div className="flex flex-col w-full group">
            <button
              type="button"
              className="bg-pink-50 mr-10 hover:bg-white text-pink-500 font-bold py-2 px-6 rounded-tl-2xl rounded-br-2xl w-[13%]"
              onClick={saveImage}
            >
              SAVE
            </button>
            <div className="flex bg-pink-50 group-hover:bg-white w-full p-[0.4px]" />
          </div>
        </div>

        {/* Container for the Frame and Video */}
        <div className="relative left-[-45%] z-10 max-w-xs w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          {/* Frame Image */}

          {/* Webcam Video */}
          {!capturedImage && (
            <>
              {' '}
              <Image
                src={frameImage}
                alt="Frame"
                width={500}
                height={500}
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
              />
              <video
                ref={videoRef}
                autoPlay
                className="absolute inset-0 w-full h-full object-cover z-10 p-2.5"
                style={{ objectFit: 'cover' }}
              />
            </>
          )}

          {/* Captured Image */}
          {capturedImage && (
            <Image
              src={capturedImage}
              alt="Captured"
              width={400}
              height={700}
              className="absolute inset-0 w-full h-full object-cover z-10"
              unoptimized
            />
          )}

          {/* Hidden Canvas for Capturing */}
          <canvas ref={canvasRef} width={640} height={480}></canvas>
        </div>
      </div>

      {/* Right Image (Girl) */}
      <div className="absolute right-0 top-0 md:block">
        <Image width={500} height={500} src="/right-img.png" alt="Girl Image" />
      </div>
    </div>
  );
}
