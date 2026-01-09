// --- 주차 할인권 발급 ---
import { useState } from "react";
import "./Car.scss";
import { useUser } from "../../contexts/UserContext";

const SaleCar = () => {
  const [carNumber, setCarNumber] = useState("");
  const [carSale, setCarSale] = useState("");

  const { issueStoreDiscount } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!carNumber || !carSale) {
      alert("차량번호와 할인권 시간을 선택해주세요.");
      return;
    }

    const res = await issueStoreDiscount({
      carNumber,
      minutes: parseInt(carSale, 10),
    });

    if (!res.ok) {
      alert(res.message || "발급 실패");
      return;
    }

    alert(`차량 ${carNumber} 할인권 ${carSale}분 발급 완료!`);
    setCarNumber("");
    setCarSale("");
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
        <select value={carSale} onChange={(e) => setCarSale(e.target.value)}>
          <option value="">할인권 시간을 선택해주세요</option>
          <option value="60">1시간</option>
          <option value="90">1시간 30분</option>
          <option value="120">2시간</option>
        </select>
      </div>

      <div className="car-btn">
        <button type="submit">할인권 발급</button>
      </div>
    </form>
  );
};

export default SaleCar;
