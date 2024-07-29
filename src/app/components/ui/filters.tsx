'use client'
import closeIcon from '@/app/assets/close (1).svg';
import React, { useState, useEffect } from 'react';
import { Drawer, DrawerContent } from '@/app/components/ui/drawer';
import Image from 'next/image';

interface FilterDrawerProps {
    isFilterOpen: boolean;
    toggleFilterSidebar: () => void;
    setFilters: (filters: { [key: string]: any[] }) => void;
    filterOptions: { [key: string]: (string | number | null)[] };
}

interface Filter {
    label: string;
    key: string;
}

const filters: Filter[] = [
    { label: 'End Year', key: 'end_year' },
    { label: 'Topic', key: 'topic' },
    { label: 'Sector', key: 'sector' },
    { label: 'Region', key: 'region' },
    { label: 'PEST', key: 'pestle' },
    { label: 'Source', key: 'source' },
    { label: 'SWOT', key: 'impact' },
];

const FilterDrawer: React.FC<FilterDrawerProps> = ({ isFilterOpen, toggleFilterSidebar, setFilters, filterOptions }) => {
    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: any[] }>({});

    const handleFilterChange = (key: string, value: any) => {
        setSelectedFilters(prevFilters => {
            const values = prevFilters[key] || [];
            if (values.includes(value)) {
                return { ...prevFilters, [key]: values.filter(v => v !== value) };
            } else {
                return { ...prevFilters, [key]: [...values, value] };
            }
        });
    };

    const applyFilters = () => {
        setFilters(selectedFilters);
        toggleFilterSidebar();
    };

    return (
        <Drawer open={isFilterOpen} onClose={toggleFilterSidebar}>
            <DrawerContent className="h-auto p-0 top-0 right-0 left-auto mt-0 w-[400px] rounded-none bg-white flex flex-col justify-between">
                <div className="flex-grow overflow-y-scroll">
                    <div className="w-full h-fit relative flex justify-between items-center border-b border-gray-300 py-3 px-6">
                        <div className="text-black text-3xl font-light">Add Filters</div>
                        <button onClick={toggleFilterSidebar} className="text-black text-lg">
                            <Image src={closeIcon} alt="close" className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-4 flex flex-col space-y-4">
                        {filters.map(filter => (
                            <CheckboxGroup
                                key={filter.key}
                                label={filter.label}
                                items={filterOptions[filter.key]}
                                selectedItems={selectedFilters[filter.key] || []}
                                handleSelect={(value: any) => handleFilterChange(filter.key, value)}
                            />
                        ))}
                    </div>
                </div>

                <button onClick={applyFilters} className="w-full py-4 bg-blue-500 text-white rounded-none hover:bg-blue-600">
                    Apply Filters
                </button>
            </DrawerContent>
        </Drawer>
    );
};

interface CheckboxGroupProps {
    label: string;
    items: (string | number | null)[];
    selectedItems: (string | number | null)[];
    handleSelect: (value: string | number | null) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ label, items, selectedItems, handleSelect }) => (
    <div className="flex flex-col">
        <label className="block text-black text-lg font-medium mb-2">{label}</label>
        <div className="flex flex-wrap gap-2">
            {items.map(item => (
                <label key={item === null ? 'null' : item} className="cursor-pointer flex items-center space-x-2">
                    <input
                        type="checkbox"
                        value={item === null ? 'null' : item}
                        checked={selectedItems.includes(item)}
                        onChange={() => handleSelect(item)}
                        className="cursor-pointer"
                    />
                    <span className="text-black">
                        {item === null ? 'Null' : item}
                    </span>
                </label>
            ))}
        </div>
    </div>
);

export default FilterDrawer;
