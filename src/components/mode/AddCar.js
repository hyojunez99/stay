// --- 추가 차량 등록 ---
import { useState } from "react";
import "./Car.scss";
import { updateAddCar } from "../../api/userApi";

const AddCar = ({ profile }) => {
  const [carNumber, setCarNumber] = useState(""); // 차량번호
  const [carName, setCarName] = useState(""); // 차량 명의자

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!carNumber || !carName) {
      alert("차량번호와 명의자를 모두 입력해주세요.");
      return;
    }

    try {
      await updateAddCar({ profileId: profile.id, addCarNum: carNumber });
      alert("추가 차량 등록 성공!");
      setCarNumber("");
      setCarName("");
    } catch (err) {
      console.log("추가 차량 등록 실패:", err);
      alert("등록 실패");
    }
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
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
        <label>차량 명의자</label>
        <input
          type="text"
          value={carName}
          placeholder="차량 명의자를 입력해주세요"
          onChange={(e) => setCarName(e.target.value)}
        />
      </div>
      <div className="car-btn">
        <button type="submit">차량 등록</button>
      </div>
    </form>
  );
};

export default AddCar;
