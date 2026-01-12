import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Car.scss";
import { enterParking } from "../../api/parkingAPI"; // parkingAPI 불러오기

const VisitCar = ({ profile }) => {
  const [carNumber, setCarNumber] = useState("");
  const [visitDate, setVisitDate] = useState(null);
  const [reason, setReason] = useState(""); // 장기 등록에서만 사용
  const [loading, setLoading] = useState(false); // 로딩 상태 관리

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 차량 번호와 방문 날짜가 입력되지 않은 경우
    if (!carNumber || !visitDate) {
      alert("차량 번호와 방문 날짜를 입력해주세요.");
      return;
    }

    // 방문 날짜를 yyyy-dd-mm
    const dateISO = visitDate.toISOString().slice(0, 10);
    setLoading(true);

    try {
      // 주차 공간 처리 (차량 등록/출차)
      const { targetID, type } = await enterParking(carNumber); // 차량 등록 API 호출

      // 성공 시 알림
      alert(`차량 등록 성공: ${carNumber} `);

      // 초기화
      setCarNumber("");
      setVisitDate(null);
      setReason("");
    } catch (err) {
      // 오류 처리
      alert(`등록 실패: ${err.message}`);
      console.error("방문 차량 등록 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="visit-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label>차량 번호</label>
        <input
          type="text"
          value={carNumber}
          placeholder="차량번호를 입력해주세요"
          onChange={(e) => setCarNumber(e.target.value)}
        />
      </div>

      <div className="input-group">
        <p>방문 날짜</p>
        <DatePicker
          selected={visitDate}
          onChange={(date) => setVisitDate(date)}
          placeholderText="방문 날짜를 선택해주세요"
          dateFormat="yyyy.MM.dd"
        />
      </div>

      <div className="input-group">
        <label>방문 사유 (장기 방문 시)</label>
        <input
          type="text"
          value={reason}
          placeholder="장기 등록 페이지에서 사용됩니다"
          onChange={(e) => setReason(e.target.value)}
        />
      </div>

      <div className="car-btn">
        <button type="submit" disabled={loading}>
          차량 등록
        </button>
      </div>
    </form>
  );
};

export default VisitCar;
