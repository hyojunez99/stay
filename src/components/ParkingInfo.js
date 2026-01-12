// 주차 현황 js
const ParkingInfo = ({data}) => {
  //총 주차대수
  return (
    <div className="info-p">
      <p>총 주차면수 : {data.total}</p>
      <p>│</p>
      <p>현재 주차 : {data.occupied} </p>
      <p>│</p>
      <p>잔여석 : {data.empty}</p>
    </div>
  );
};

export default ParkingInfo;
