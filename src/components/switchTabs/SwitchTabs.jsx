import { useState } from "react";
import "./styles.scss";

const SwitchTabs = ({ data = [], onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const setTabActive = (tab, idx) => {
    setLeft(idx * 70);
    setTimeout(() => setSelectedTab(idx), 300);
    onTabChange(tab, idx);
  };

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((tab, idx) => (
          <span
            key={idx}
            className={`tabItem ${selectedTab === idx ? "active" : ""}`}
            onClick={() => setTabActive(tab, idx)}
          >
            {tab}
          </span>
        ))}
        <span className="movingBg" style={{left}}></span>
      </div>
    </div>
  );
};

export default SwitchTabs;
