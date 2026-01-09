import SpotCard from "./SpotCard";
import "./ParkingGrid.scss";
import ParkingInfo from "./ParkingInfo";
import { fetchParkingSpots } from "../api/parkingAPI";
import { useState, useEffect, useRef } from "react";

const ParkingGird = () => {
  const [parkingData, setParkingData] = useState([]);
  const [open, setOpen] = useState(false);

  const startY = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    const loadParkingData = async () => {
      try {
        const data = await fetchParkingSpots();
        setParkingData(data);
      } catch (e) {
        console.error(e);
      }
    };
    loadParkingData();
  }, []);

  const grid = parkingData.filter((s) => s.zone === "APT");
  const shop = parkingData.filter((s) => s.zone === "STORE");

  // 모바일 터치 이벤트
  const onTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e) => {
    const endY = e.changedTouches[0].clientY;
    const diff = startY.current - endY;
    if (diff > 50) setOpen(true);
    if (diff < -50) setOpen(false);
  };

  // PC 마우스 이벤트 (document에 등록)
  const onMouseDown = (e) => {
    isDragging.current = true;
    startY.current = e.clientY;
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      // 드래그 중 추가 기능 가능
    };

    const handleMouseUp = (e) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      const endY = e.clientY;
      const diff = startY.current - endY;
      if (diff > 50) setOpen(true);
      if (diff < -50) setOpen(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      className={`parking ${open ? "open" : ""}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
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
