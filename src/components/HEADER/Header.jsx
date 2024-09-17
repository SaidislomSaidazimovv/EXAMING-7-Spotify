import React from "react";
import { Back, Forward } from "../../assets/Icons/NecessaryIcons";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleNavigation = (direction) => {
    navigate(direction);
  };

  return (
    <header className="sticky top-0 w-full px-10 py-5 backdrop-blur z-30 shadow-xl flex items-center">
      <div className="flex items-center gap-6">
        <button
          onClick={() => handleNavigation(-1)}
          className="p-2 rounded"
          aria-label="Back"
        >
          <Back />
        </button>
        <button
          onClick={() => handleNavigation(1)}
          className="p-2 rounded"
          aria-label="Forward"
        >
          <Forward />
        </button>
      </div>
    </header>
  );
}

export default Header;
