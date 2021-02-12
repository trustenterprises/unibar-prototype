import React from "react";

const cssState = {
  selected: 'lg:my-0 rounded text-base text-gray-800 px-4 py-2 bg-gray-200',
  default: 'cursor-pointer text-base text-gray-600  px-4 '
}

function Index({
  selectNavigationSection = () => false,
  selectedNav = '',
  sections = [],
}) {
  const getDisplayState = (candidate) => {
    return candidate === selectedNav ? cssState.selected : cssState.default
  }

  return (
    <div className="w-full h-auto lg:h-20 mb-6 rounded shadow bg-white py-2 px-4 ">
      <ul className="lg:flex flex-row items-center h-full">
        {sections.map(section =>
          <li className={getDisplayState(section.key)} onClick={selectNavigationSection} data-id={section.key}>{section.title}</li>
        )}
      </ul>
    </div>
  );
}

export default Index;
