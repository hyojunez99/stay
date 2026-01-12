// 주차 현황 js
const ParkingInfo = ({data}) => {
  //총 주차대수
  return (
    <>
    <div className="info-p">
      <p>총 주차면수 : {data.total}</p>
      <p>│</p>
      <p>현재 주차 : {data.occupied} </p>
      <p>│</p>
      <p>잔여석 : {data.empty}</p>
    </div>
    <div className="color-box">
      <div className="regident-box">
    <div className="R"></div>
    <p>아파트 주차 구역</p>
    <div className="R-P"></div>
    <p>아파트구역 주차중</p>
    <div className="R-S"></div>
    <p>아파트구역 사업자 주차중</p>
    </div>
    <div className="shop-box">
    <div className="S"></div>
    <p>상가 주차 구역</p>
    <div className="S-P"></div>
    <p>상가구역 주차중</p>
    </div>
    </div>
    </>
  );
};

export default ParkingInfo;
