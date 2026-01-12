import SystemController from "../components/SystemController";
import BannerSection from "./BannerSection";
import "./BusinessDashboard.scss";
import topImg from "../assets/images/Top/Intersect_OR.png";
import Weather from "../components/Weather";
import ParkingGird from "../components/ParkingGird";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext"; // UserContext import

const BusinessDashboard = () => {
  const { profile, header, fetchHeader } = useUser();
  const [headerInfo, setHeaderInfo] = useState(null);

  // 정보가 변경되면 최신 정보
  useEffect(() => {
    if (profile?.id) {
      fetchHeader();
    }
  }, [profile, fetchHeader]);

  // 상태 업데이트
  useEffect(() => {
    if (header) {
      setHeaderInfo(header);
    }
  }, [header]);

  return (
    <section id="business">
      <div className="business-top">
        <img src={topImg} alt="상단 이미지" />
        <div className="business-txt">
          <h2>많이 버세요</h2>
          {headerInfo ? (
            <>
              <p>{headerInfo.user_name}</p>
              <p>{headerInfo.dong_ho}</p>
            </>
          ) : (
            <p>사용자 정보를 불러오는 중...</p>
          )}
          <Weather />
        </div>
      </div>
      <SystemController role="business" />
      <BannerSection />
      <ParkingGird />
    </section>
  );
};

export default BusinessDashboard;
