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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // start cam
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

  // stop cam

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageDataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageDataUrl);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startWebcam();
  };

  const handleSave = () => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.href = capturedImage;
      link.download = 'captured_image.jpg';
      link.click();
    }
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
            handleOnClick={handleCapture}
            className="btnstyle"
            lineClass="linestyle"
          />
          <CustomButton
            text="RETAKE"
            handleOnClick={handleRetake}
            className="btnstyle"
            lineClass="linestyle"
          />
          <CustomButton
            text="SAVE"
            handleOnClick={handleSave}
            className="btnstyle"
            lineClass="linestyle"
          />
        </div>
        <div className="fullframe ">
          <div className="cameraclass ">
            {capturedImage ? (
              <Image
                width={500}
                height={500}
                src={capturedImage}
                alt="Captured"
                className="capturedimg"
              />
            ) : (
              <video ref={videoRef} autoPlay playsInline />
            )}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>
          <Image width={500} alt="frame" height={500} src={frame} className="frame" />
        </div>
      </div>
      <div className="right-container"></div>
    </div>
  );
}
