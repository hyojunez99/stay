// --- 주차 할인권 정산 ---
import "./SaleCarIssue.scss";
import { fetchDiscountSummary } from "../../api/userApi";
import { useEffect, useState } from "react";

const UNIT_PRICE = 1000;

const SaleCarIssue = ({ storeProfileId }) => {
  const [discountSummary, setDiscountSummary] = useState({
    qty: 0,
    settlement_date: null,
    total_amount: 0,
  });

  useEffect(() => {
    const loadsummary = async () => {
      try {
        const summary = await fetchDiscountSummary(storeProfileId);
        setDiscountSummary(summary);
      } catch (err) {
        console.error("주차 할인권 정산 불러오기 실패", err);
      }
    };
    if (storeProfileId) loadsummary();
  }, [storeProfileId]);

  // 새로고침 방지
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `총 ${discountSummary.qty}장 발급, 정산 금액: ${discountSummary.total_amount}원, 정산일: ${discountSummary.settlement_date}`
    );
  };

  return (
    <form className="issue-form" onSubmit={handleSubmit}>
      <div className="issue-txt">
        <p>
          현재까지 발급된 주차할인권은 <strong>{discountSummary.qty}장</strong>{" "}
          입니다.
        </p>
        <p>
          정산일은 <strong>{discountSummary.settlement_date}</strong> 입니다.
        </p>
      </div>
      <div className="issue-btn">
        <p>정산 금액: {discountSummary.total_amount}원</p>
        <button>정산하기</button>
      </div>
    </form>
  );
};

export default SaleCarIssue;
