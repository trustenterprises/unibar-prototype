import React, { useState } from "react";
import ScreenNavigation from "frontend/components/ScreenNavigation";
import navigation from "frontend/constants/navigation";
import GetPools from "./Pools";
import CreatePool from "./CreatePool";

const innerNav = navigation.poolSections
const sectionList = Object.values(innerNav)

function Pools() {

  const [selectedNav, setSelectedNav] = useState(sectionList[0].key)

  const selectNavigationSection = (event) => {
    const current = event.currentTarget.dataset.id

    setSelectedNav(current);
  }

  return (
    <div className="w-full bg-gray-100 pb-10">
      <div className="container px-10 mx-auto">
        <div className="relative z-10 w-full">
          <div className="w-full -mt-8 h-auto">
            <ScreenNavigation
              sections={sectionList}
              selectedNav={selectedNav}
              selectNavigationSection={selectNavigationSection}
            />
            {/* Remove class [ h-64 ] when adding a card block */}
            <div className="container mx-auto h-max">
              {selectedNav === innerNav.current_pools.key && <GetPools />}
              {selectedNav === innerNav.create_pool.key && <CreatePool />}


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pools;
