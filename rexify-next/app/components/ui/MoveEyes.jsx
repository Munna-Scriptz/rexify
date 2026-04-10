import React, { useState, useEffect, useRef } from 'react';

const MoveEyes = () => {
  const [leftPupilPos, setLeftPupilPos] = useState({ x: 40, y: 50 });
  const [rightPupilPos, setRightPupilPos] = useState({ x: 110, y: 50 });
  const svgRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!svgRef.current) return;

      const svg = svgRef.current;
      const pt = svg.createSVGPoint();
      pt.x = event.clientX;
      pt.y = event.clientY;
      const svgPt = pt.matrixTransform(svg.getScreenCTM().inverse());

      // Left eye center at (40, 50), radius 20 for movement constraint
      const leftCenter = { x: 40, y: 50 };
      const leftDx = svgPt.x - leftCenter.x;
      const leftDy = svgPt.y - leftCenter.y;
      const leftDist = Math.sqrt(leftDx * leftDx + leftDy * leftDy);
      const leftMaxDist = 20; // Max movement distance
      const leftAngle = Math.atan2(leftDy, leftDx);
      const leftMoveDist = Math.min(leftDist, leftMaxDist);
      const newLeftX = leftCenter.x + leftMoveDist * Math.cos(leftAngle) / 2; // Divide by 2 for smoother movement
      const newLeftY = leftCenter.y + leftMoveDist * Math.sin(leftAngle) / 2;
      setLeftPupilPos({ x: newLeftX, y: newLeftY });

      // Right eye center at (110, 50), radius 20
      const rightCenter = { x: 110, y: 50 };
      const rightDx = svgPt.x - rightCenter.x;
      const rightDy = svgPt.y - rightCenter.y;
      const rightDist = Math.sqrt(rightDx * rightDx + rightDy * rightDy);
      const rightAngle = Math.atan2(rightDy, rightDx);
      const rightMoveDist = Math.min(rightDist, leftMaxDist);
      const newRightX = rightCenter.x + rightMoveDist * Math.cos(rightAngle) / 2;
      const newRightY = rightCenter.y + rightMoveDist * Math.sin(rightAngle) / 2;
      setRightPupilPos({ x: newRightX, y: newRightY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      width="90"
      height="60"
      viewBox="0 0 150 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left eye outline */}
      <ellipse
        cx="40"
        cy="50"
        rx="35"
        ry="45"
        stroke="#155dfc"
        strokeWidth="5"
        fill="none"
      />
      {/* Left pupil */}
      <circle
        cx={leftPupilPos.x}
        cy={leftPupilPos.y}
        r="14"
        fill="#155dfc"
      />

      {/* Right eye outline */}
      <ellipse
        cx="110"
        cy="50"
        rx="35"
        ry="45"
        stroke="#155dfc"
        strokeWidth="5"
        fill="none"
      />
      {/* Right pupil */}
      <circle
        cx={rightPupilPos.x}
        cy={rightPupilPos.y}
        r="14"
        fill="#155dfc"
      />
    </svg>
  );
};

export default MoveEyes;