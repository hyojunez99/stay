// 주차 현황 js
import { fetchParkingStatusSummary } from "../api/parkingAPI";
import { useState, useEffect } from "react";

const ParkingInfo = () => {
  const [totalparking, setTotalParking] = useState([]);
  const [spotsparking, setspotsParking] = useState([]);
  const [emptyparking, setemptyParking] = useState([]);

  useEffect(() => {
    const loadsummarydata = async () => {
      try {
        const { total, occupied, empty } = await fetchParkingStatusSummary();
        setTotalParking(total);
        setspotsParking(occupied);
        setemptyParking(empty);
      } catch (e) {
        console.error(e);
      }
    };
    loadsummarydata();
  }, []);

  //총 주차대수
  return (
    <>
    <div className="info-p">
      <p>총 주차면수 : {totalparking}</p>
      <p>│</p>
      <p>현재 주차 : {spotsparking} </p>
      <p>│</p>
      <p>잔여석 : {emptyparking}</p>
    </div>
    <div className="color-box">
      <div className="regident-box">
    <div className="R"></div>
    <p>아파트 주차 구역</p>
    <div className="R-P"></div>
    <p>주차 중</p>
    <div className="R-S"></div>
    <p>사업자 주차 중</p>
    </div>
    <div className="shop-box">
    <div className="S"></div>
    <p>상가 주차 구역</p>
    <div className="S-P"></div>
    <p>주차 중</p>
    </div>
    </div>
    </>
  );
};

export default ParkingInfo;
