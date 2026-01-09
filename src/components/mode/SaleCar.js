// --- 주차 할인권 발급 ---

import { useState } from "react";
import "./Car.scss";
import "react-datepicker/dist/react-datepicker.css";
import { issueDiscount } from "../../api/userApi";

const SaleCar = ({ profile }) => {
  const [carNumber, setCarNumber] = useState(""); // 차량번호
  const [carSale, setCarSale] = useState(""); // 할인권 선택

  // 새로고침 방지
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!carNumber || !carSale) {
      alert("차량번호와 할인권 시간을 선택해주세요.");
      return;
    }
    try {
      await issueDiscount({
        storeProfileId: profile.id,
        minutes: parseInt(carSale, 10),
      });
      alert(`차량 ${carNumber} 할인권 ${carSale}분 발급 완료!`);
      setCarNumber("");
      setCarSale("");
    } catch (err) {
      console.log("할인권 발급 실패", err);
      alert("발급 실패");
    }
  };

  return (
    <form className="sale-form" onSubmit={handleSubmit}>
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
        <label>할인권 선택</label>
        <select
          value={carSale}
          placeholder="할인권 시간을 선택해주세요"
          onChange={(e) => setCarSale(e.target.value)}
        >
          <option value="">할인권 시간을 선택해주세요</option>
          <option value="30">1시간</option>
          <option value="60">1시간 30분</option>
          <option value="120">2시간</option>
        </select>
      </div>

      <div className="car-btn">
        <button>차량 등록</button>
      </div>
    </form>
  );
};

export default SaleCar;
