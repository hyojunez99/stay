// 주차 지도 js

import SpotCard from "./SpotCard";
import './ParkingGrid.scss'
import ParkingInfo from "./ParkingInfo";


const ParkingGird = () => {
  const grid = [
    { spot_id: "R-1", spot_type:"R",car_num:"",apt:true,long:false },
    { spot_id: "R-2", spot_type:"R",car_num:"58가5678",apt:false,long:false },
    { spot_id: "R-3", spot_type:"R",car_num:"32가5213",apt:false,long:true }
    ];
  const shop=[
    { spot_id: "S-1", spot_type:"S",car_num:"57가9874",is_paid:true},
    { spot_id: "S-2", spot_type:"S",car_num:"34가9874",is_paid:false },
    { spot_id: "S-3", spot_type:"S",car_num:"",is_paid:false}
  ]
  return (
    <div>
      <div className="info_box">
      <ParkingInfo R={grid} S={shop}/>
      </div>
    <div className="all_box">
    <div className="R_box">
      {grid.map((item)=>{
      return <SpotCard data={item}/>
      })
    }
      </div>
    <div className="S_box">
      {
        shop.map((item)=>{
          return<SpotCard data={item} />
        })
      }
    </div>
  </div>
  </div>
  )
}

export default ParkingGird