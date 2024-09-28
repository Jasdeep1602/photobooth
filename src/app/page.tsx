'use client';

/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/media-has-caption */

import CustomButton from '@/components/button';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const frameImage = '/frame.png';

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

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      const desiredWidth = 450;
      const desiredHeight = 530;

      // for showing in ui

      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context?.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        setUiCapture(imageDataUrl);
      }
      // download one
      if (context) {
        // Clear the canvas before drawing
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Set the canvas size to the desired dimensions
        canvas.width = desiredWidth;
        canvas.height = desiredHeight;

        // Save the context state
        context.save();

        // Flip the context horizontally
        context.scale(-1, 1);
        context.drawImage(videoRef.current, -desiredWidth, 0, desiredWidth, desiredHeight);

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
          <img alt="frame" src={frameImage} className="frame" />
        </div>
      </div>
      <div className="right-container"></div>
    </div>
  );
}

//  'use client';

//  import CustomButton from '@/components/button';
// import { useCallback, useRef, useState } from 'react';
// import Image from 'next/image';
// import Webcam from 'react-webcam';

// export default function Home() {
//   const frameImage = '/frame.png';

//   const webcamRef = useRef<Webcam>(null);
//   const [uicapture, setUiCapture] = useState<string | null>(null);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);

//   const videoConstraints = {
//     width: 450,
//     height: 530,
//     facingMode: 'user',
//   };

//   const captureImage = useCallback(() => {
//     if (webcamRef.current) {
//       const imageSrc = webcamRef.current.getScreenshot();
//       setUiCapture(imageSrc);
//       setCapturedImage(imageSrc);
//     }
//   }, [webcamRef]);

//   const handleRetake = () => {
//     setCapturedImage(null);
//     setUiCapture(null);
//   };

//   const handleSave = () => {
//     if (capturedImage) {
//       const link = document.createElement('a');
//       link.href = capturedImage;
//       link.download = 'captured_image.jpg';
//       link.click();
//     }
//   };

//   return (
//     <div className="maincontainer">
//       <div className="left-container">
//         <div className="buttoncontainer">
//           <CustomButton
//             text="CAPTURE"
//             handleOnClick={captureImage}
//             className="btnstyle"
//             lineClass="linestyle"
//           />
//           <CustomButton
//             text="RETAKE"
//             handleOnClick={handleRetake}
//             className="btnstyle"
//             lineClass="linestyle"
//           />
//           <CustomButton
//             text="SAVE"
//             handleOnClick={handleSave}
//             className="btnstyle"
//             lineClass="linestyle"
//           />
//         </div>
//         <div className="fullframe">
//           <div className="cameraclass">
//             {uicapture ? (
//               <Image
//                 width={450}
//                 height={530}
//                 src={uicapture}
//                 alt="Captured"
//                 className="capturedimg"
//               />
//             ) : (
//               <Webcam
//                 audio={false}
//                 ref={webcamRef}
//                 screenshotFormat="image/jpeg"
//                 videoConstraints={videoConstraints}
//                 mirrored
//               />
//             )}
//           </div>
//           <img alt="frame" src={frameImage} className="frame" />
//         </div>
//       </div>
//       <div className="right-container" />
//     </div>
//   );
// }

// 'use client';

// import CustomButton from '@/components/button';
// import { useCallback, useRef, useState, useEffect } from 'react';
// // import Image from 'next/image';
// import Webcam from 'react-webcam';

// export default function Home() {
//   const frameImage = '/frame.png';

//   const webcamRef = useRef<Webcam>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [uicapture, setUiCapture] = useState<string | null>(null);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);
//   const [frameLoaded, setFrameLoaded] = useState(false);

//   const videoConstraints = {
//     width: 400,
//     height: 500,
//     facingMode: 'user',
//   };

//   useEffect(() => {
//     const img = new Image();
//     img.onload = () => setFrameLoaded(true);
//     img.src = frameImage;
//   }, []);

//   const captureImage = useCallback(() => {
//     if (webcamRef.current && canvasRef.current && frameLoaded) {
//       const canvas = canvasRef.current;
//       const context = canvas.getContext('2d');
//       if (context) {
//         // Set canvas size
//         canvas.width = videoConstraints.width;
//         canvas.height = videoConstraints.height;

//         // Draw webcam image
//         const webcamImage = webcamRef.current.getScreenshot();
//         const img = new Image();
//         img.onload = () => {
//           context.drawImage(img, 0, 0, canvas.width, canvas.height);

//           // Draw frame
//           const frame = new Image();
//           frame.onload = () => {
//             context.drawImage(frame, 0, 0, canvas.width, canvas.height);

//             // Get final image data
//             const finalImage = canvas.toDataURL('image/jpeg');
//             setUiCapture(finalImage);
//             setCapturedImage(finalImage);
//           };
//           frame.src = frameImage;
//         };
//         img.src = webcamImage as string;
//       }
//     }
//   }, [frameLoaded, videoConstraints.width, videoConstraints.height]);

//   const handleRetake = () => {
//     setCapturedImage(null);
//     setUiCapture(null);
//   };

//   const handleSave = () => {
//     if (capturedImage) {
//       const link = document.createElement('a');
//       link.href = capturedImage;
//       link.download = 'captured_image_with_frame.jpg';
//       link.click();
//     }
//   };

//   return (
//     <div className="maincontainer">
//       <div className="left-container">
//         <div className="buttoncontainer">
//           <CustomButton
//             text="CAPTURE"
//             handleOnClick={captureImage}
//             className="btnstyle"
//             lineClass="linestyle"
//           />
//           <CustomButton
//             text="RETAKE"
//             handleOnClick={handleRetake}
//             className="btnstyle"
//             lineClass="linestyle"
//           />
//           <CustomButton
//             text="SAVE"
//             handleOnClick={handleSave}
//             className="btnstyle"
//             lineClass="linestyle"
//           />
//         </div>
//         <div className="fullframe">
//           <div className="cameraclass">
//             {uicapture ? (
//               <img src={uicapture} alt="Captured" className="capturedimg" />
//             ) : (
//               <Webcam
//                 audio={false}
//                 ref={webcamRef}
//                 screenshotFormat="image/jpeg"
//                 videoConstraints={videoConstraints}
//                 mirrored
//               />
//             )}
//           </div>
//           {!uicapture && (
//             <img
//               alt="frame"
//               src={frameImage}
//               className="frame"
//               style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
//             />
//           )}
//           <canvas ref={canvasRef} style={{ display: 'none' }} />
//         </div>
//       </div>
//       <div className="right-container" />
//     </div>
//   );
// }
