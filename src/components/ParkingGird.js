import SpotCard from "./SpotCard";
import "./ParkingGrid.scss";
import ParkingInfo from "./ParkingInfo";
import { fetchParkingSpots } from "../api/parkingAPI";
import { useState, useEffect, useRef } from "react";

// 드래그 최소 거리
const SWIPE_THRESHOLD = 50;

const ParkingGird = () => {
  // 주차 자리 데이터
  const [parkingData, setParkingData] = useState([]);
  // 스크롤 처리
  const [open, setOpen] = useState(false);

  const startY = useRef(0);
  const isMouseDown = useRef(false);

  // 주차 데이터 불러오기
  useEffect(() => {
    fetchParkingSpots().then(setParkingData).catch(console.error);
  }, []);

  const grid = parkingData.filter((s) => s.zone === "APT");
  const shop = parkingData.filter((s) => s.zone === "STORE");

  // 드래그 시작
  const handleStart = (y) => {
    startY.current = y;
    isMouseDown.current = true;
  };

  // 드래그 종료
  const handleEnd = (y) => {
    if (!isMouseDown.current) return;

    const diff = startY.current - y;
    isMouseDown.current = false;

    if (Math.abs(diff) < SWIPE_THRESHOLD) return;
    setOpen(diff > 0);
  };
  // pc에서도 드래그 처리
  useEffect(() => {
    const onMouseUp = (e) => handleEnd(e.clientY);

    document.addEventListener("mouseup", onMouseUp);
    return () => document.removeEventListener("mouseup", onMouseUp);
  }, []);

  return (
    <div
      className={`parking ${open ? "open" : ""}`}
      onMouseDown={(e) => handleStart(e.clientY)}
      onTouchStart={(e) => handleStart(e.touches[0].clientY)}
      onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientY)}
    >
      <div className="handle" />
      <div className="info_box">
        <ParkingInfo />
      </div>
      <div className="all_box">
        <div className="R_box">
          {grid.map((item) => (
            <SpotCard key={item.spot_id} data={item} />
          ))}
        </div>
        <div className="S_box">
          {shop.map((item) => (
            <SpotCard key={item.spot_id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParkingGird;
