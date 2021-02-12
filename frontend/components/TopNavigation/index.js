import React, { useState } from "react";
import navigation from "frontend/constants/navigation";

const cssState = {
  selected: 'py-6 border-b border-white pb-4 cursor-pointer font-bold xl:flex items-center text-sm text-white tracking-normal  mr-10 ',
  default: 'py-6 cursor-pointer font-bold xl:flex items-center text-sm text-gray-300 mr-10 tracking-normal'
}

const sections = navigation.sections

function Index({
  selectNavigationSection = () => false,
  selectedNav = sections.assets.key,
}) {

  const getDisplayState = (candidate) => {
    return candidate === selectedNav ? cssState.selected : cssState.default
  }

  return (
    <ul className="flex items-start justify-center h-full">
      <li data-id={sections.assets.key}
          onClick={selectNavigationSection}
          className={getDisplayState(sections.assets.key)}>
        <a>{sections.assets.title}</a>
      </li>
      <li data-id={sections.pool.key}
          onClick={selectNavigationSection}
          className={getDisplayState(sections.pool.key)}>
        <a>{sections.pool.title}</a>
      </li>
      <li className="mr-8 cursor-pointer h-full flex items-center">
        <svg aria-label="Home" id="logo" enableBackground="new 0 0 300 300" height={44} viewBox="0 0 300 300" width={44} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"/>
        <img src="https://landen.imgix.net/avz5ymmxk75u/assets/rueradx7.svg?w=104" alt='logo'/>
      </li>
      <li data-id={sections.trade.key}
          onClick={selectNavigationSection}
          className={getDisplayState(sections.trade.key)}>
        <a>{sections.trade.title}</a>
      </li>
      <li data-id={sections.bridge.key}
          onClick={selectNavigationSection}
          className={getDisplayState(sections.bridge.key)}>
        <a>{sections.bridge.title}</a>
      </li>
    </ul>
  );
}

export default Index;
