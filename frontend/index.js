import React, { useState } from "react";
import MetamaskButton from "frontend/components/MetamaskButton"
import Recoil from "app/recoil"
import { useRecoilValue } from 'recoil';
import TopNavigation from "frontend/components/TopNavigation"
import Overview from "frontend/screens/Overview";
import navigation from "./constants/navigation";
import Pools from "./screens/Pools";

const sections = navigation.sections



function Index() {

  const [selectedNav, setSelectedNav] = useState('assets')

  const selectNavigationSection = (event) => {
    const current = event.currentTarget.dataset.id

    setSelectedNav(current);
  }

  /*
  It'll be nice to clear this up...
  */
  return (
    <div className="bg-gray-100 h-screen">
      <div className="relative">
        {/* Background image starts */}
        <img className="z-0 w-full h-full absolute inset-0 object-cover" src="/pexels-kai-pilger-1341279.jpg" alt="bg" />
        {/* Background image ends */}
        {/* Navigation starts */}
        <nav className="z-20 relative w-full mx-auto shadowpx-6 h-16 ">
            <TopNavigation
              selectNavigationSection={selectNavigationSection}
              selectedNav={selectedNav}
              />
        </nav>
        {/* Navigation ends */}
        {/* Page title starts */}

        <div className="z-10 relative pt-8 pb-16">
          <div className="container px-12 mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold leading-tight text-white">{sections[selectedNav].title}</h2>
            </div>
            <div className="mt-6 lg:mt-0">
              { /*  Probably will just change the text or something */}
              {/*{ !accountAuth.account &&  <MetamaskButton />}*/ }
              <MetamaskButton />
            </div>
          </div>
        </div>
        {/* Page title ends */}
      </div>
      { selectedNav === sections.assets.key && <Overview />}
      { selectedNav === sections.pool.key && <Pools />}

    </div>
  );
}

export default Index;
