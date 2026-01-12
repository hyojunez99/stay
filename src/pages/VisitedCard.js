import { ReactComponent as Star } from "../assets/svg/Star.svg";
import { useState, useEffect } from "react";

const VisitedCard = ({ data, first, onToggleFavorite }) => {
    const { name, car_num, type, start_date, end_date, isFavorite } = data;

    const [fav, setFav] = useState(isFavorite);

    useEffect(() => {
        setFav(isFavorite);
    }, [isFavorite]);

    const handleStar = (e) => {
        e.stopPropagation();
        setFav((v) => !v); // optimistic UI
        onToggleFavorite?.(car_num);
    };

    return (
        <div className={`visited-card ${first ? "first" : ""}`}>
            <Star
                className={`star ${fav ? "active" : ""}`}
                onClick={handleStar}
            />
            <h2 className="title">{name}</h2>
            <div className="txt">
                <p>차량번호 {car_num}</p>
                {type === "DAILY" && <p>방문일 {start_date}</p>}
                {type === "PERIOD" && <p>방문일 {end_date}</p>}
            </div>
        </div>
    );
};

export default VisitedCard;
