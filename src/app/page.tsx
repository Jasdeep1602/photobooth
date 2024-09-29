'use client';

/* eslint-disable @next/next/no-img-element */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/media-has-caption */

import CustomButton from '@/components/button';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { HomeIcon } from '@heroicons/react/24/solid';

export default function Home() {
  const frameImage = '/frame.png';

  // local states

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [uicapture, setUiCapture] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // start cam
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      toast.error('Webcam failed to load');
    }
  };

  // stop cam

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      const desiredWidth = 450;
      const desiredHeight = 530;

      if (context) {
        // Clear the canvas before drawing
        context.clearRect(0, 0, canvas.width, canvas.height);

        // for showing in ui

        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context?.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        setUiCapture(imageDataUrl);

        // download one

        // Set the canvas size to the desired dimensions
        canvas.width = desiredWidth;
        canvas.height = desiredHeight;

        // Save the context state
        context.save();

        // setting scal in frame x-axis 8, and making desired w and h less

        context.drawImage(videoRef.current, 8, 0, 430, 518);

        // Restore the context to its original state
        context.restore();

        //  new HTMLImageElement for the frame
        const frame = new window.Image();
        frame.src = frameImage;

        frame.onload = () => {
          // frame on top of the video, scaled to fit
          context.drawImage(frame, 0, 0, desiredWidth, desiredHeight);

          const imageData = canvas.toDataURL('image/png');
          setCapturedImage(imageData);
        };
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setUiCapture(null);
    startWebcam();
  };

  const handleSave = () => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.href = capturedImage;
      link.download = 'captured_image.jpg';
      link.click();
    }
    toast.success('Downloading image');
  };

  useEffect(() => {
    startWebcam();
    return () => {
      stopWebcam();
    };
  }, []);

  return (
    <div className="maincontainer">
      <div className="left-container">
        <div className="buttoncontainer">
          <CustomButton
            text="CAPTURE"
            handleOnClick={captureImage}
            className={!capturedImage ? 'btnstyle' : 'btnstyle-inactive'}
            lineClass="linestyle"
          />
          <CustomButton
            text="RETAKE"
            handleOnClick={handleRetake}
            className={capturedImage ? 'btnstyle' : 'btnstyle-inactive'}
            lineClass="linestyle"
          />
          <CustomButton
            text="SAVE"
            handleOnClick={handleSave}
            className={capturedImage ? 'btnstyle' : 'btnstyle-inactive'}
            lineClass="linestyle"
          />
        </div>
        <div className="homebutton">
          <HomeIcon className="w-3 h-3  " />
          Home
        </div>
        <div className="fullframe ">
          <div className="cameraclass ">
            {uicapture ? (
              <Image
                width={500}
                height={500}
                src={uicapture}
                alt="Captured"
                className="capturedimg"
              />
            ) : (
              <video ref={videoRef} autoPlay playsInline />
            )}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>
          <Image width={500} height={500} alt="frame" src={frameImage} className="frame" />
        </div>
      </div>
      <div className="right-container"></div>
    </div>
  );
}
