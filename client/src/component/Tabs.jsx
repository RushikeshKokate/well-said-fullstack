import React from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

const Tabs = ({ tabs, children }) => {
  return (
    <TabGroup>
      <TabList className="flex gap-4">
        {tabs.map(({ title }) => (
          <Tab
            key={title}
            className={({ selected }) =>
              `rounded-full py-1 px-3 text-sm font-semibold text-black focus:outline-none ${
                selected ? 'bg-gray-200' : 'hover:bg-gray-100'
              }`
            }
          >
            {title}
          </Tab>
        ))}
      </TabList>
      <TabPanels className="mt-3">
        {React.Children.map(children, (child, index) => (
          <TabPanel key={index} className="p-4 bg-gray-50 rounded-lg shadow">
            {child}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default Tabs;
