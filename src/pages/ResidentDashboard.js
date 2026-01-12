import SystemController from "../components/SystemController";
import BannerSection from "./BannerSection";
import { useNavigate } from "react-router-dom";
import Weather from "../components/Weather";
import topImg from "../assets/images/Top/Intersect_PR.png";
import "./ResidentDashboard.scss";
import ParkingGird from "../components/ParkingGird";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext"; // UserContext import

const ResidentDashboard = () => {
  const navigate = useNavigate();
  const { profile, header, fetchHeader } = useUser();
  const [headerInfo, setHeaderInfo] = useState(null);

  // 사용자 정보가 변경되면 최신 정보를 가져옵니다.
  useEffect(() => {
    if (profile?.id) {
      fetchHeader(); // 사용자 정보를 가져옵니다.
    }
  }, [profile, fetchHeader]);

  useEffect(() => {
    if (header) {
      // header 정보가 있으면 업데이트
      setHeaderInfo(header);
    }
  }, [header]);

  return (
    <section id="resident">
      <div className="resident-top">
        <img src={topImg} alt="상단 이미지" />
        <div className="resident-txt">
          <h2>좋은 하루 보내삼</h2>
          {headerInfo ? (
            <>
              <p>{headerInfo.user_name} 님</p>
              <p>{headerInfo.dong_ho}</p>
            </>
          ) : (
            <p>사용자 정보를 불러오는 중...</p>
          )}
          <Weather />
        </div>
      </div>

      <SystemController role="resident" />
      <BannerSection />

      <div className="favorite">
        <button
          onClick={() => {
            navigate("/app/resident/favorite");
          }}
        >
          즐겨 찾는 차량
        </button>
      </div>
      <ParkingGird />
    </section>
  );
};

export default ResidentDashboard;
