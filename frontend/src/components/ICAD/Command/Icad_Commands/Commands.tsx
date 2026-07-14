import { useState } from "react";
import { draftingMenu } from "./DropdownOptions/Dropdown";

function Commands() {
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);
  const [selectedSub, setSelectedSub] = useState<number | null>(null);

  return (
    <div className="commands">

      <button className="menu-btn">
        Drafting
      </button>

      <div className="dropdown">

        {draftingMenu.map((item, index) => (
          <div key={index}>

            <button
              className="dropdown-item"
              onClick={() =>
                setSelectedMenu(
                  selectedMenu === index ? null : index
                )
              }
            >
              {item.title}
            </button>

            {selectedMenu === index &&
              item.children?.map((sub, subIndex) => (
                <div key={subIndex}>

                  <button
                    className="dropdown-sub-item"
                    onClick={() =>
                      setSelectedSub(
                        selectedSub === subIndex
                          ? null
                          : subIndex
                      )
                    }
                  >
                    {sub.title}
                  </button>

                  {selectedSub === subIndex &&
                    sub.children?.map((child, childIndex) => (
                      <button
                        key={childIndex}
                        className="dropdown-child-item"
                      >
                        {child.title}
                      </button>
                    ))}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Commands;