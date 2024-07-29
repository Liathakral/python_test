'use client'
import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import FilterDrawer from './ui/filters';
import down from '@/app/assets/chevron_right.svg'
import Image from 'next/image';
type DataItem = {
    end_year: string;
    intensity: number;
    sector: string;
    topic: string;
    insight: string;
    url: string;
    region: string;
    start_year: string;
    impact: string;
    added: string;
    published: string;
    country: string;
    relevance: number;
    pestle: string;
    source: string;
    title: string;
    likelihood: number;
};

const BarChart: React.FC = () => {
    const [data, setData] = useState<DataItem[]>([]);
    const [filteredData, setFilteredData] = useState<DataItem[]>([]);
    const [filters, setFilters] = useState<{ [key: string]: any[] }>({});
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/get_data')
            .then(response => response.json())
            .then(data => {
                setData(data);
                setFilteredData(data);
            });
    }, []);

    const toggleFilterSidebar = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const applyFilters = (filters: { [key: string]: any[] }) => {
        setFilters(filters);
    };

    useEffect(() => {
        let filtered = data;

        Object.keys(filters).forEach(key => {
            if (filters[key].length > 0) {
                filtered = filtered.filter(item => filters[key].includes(item[key as keyof DataItem]));
            }
        });

        setFilteredData(filtered);
        console.log('Filtered Data:', filtered);
    }, [filters, data]);

    const getUniqueValues = (key: keyof DataItem): (string | number | null)[] => {
        const uniqueValues = new Set<string | number | null>();
        data.forEach(item => uniqueValues.add(item[key]));
        return Array.from(uniqueValues);
    };

    const filterOptions = {
        end_year: getUniqueValues('end_year'),
        topic: getUniqueValues('topic'),
        sector: getUniqueValues('sector'),
        region: getUniqueValues('region'),
        pestle: getUniqueValues('pestle'),
        source: getUniqueValues('source'),
        impact: getUniqueValues('impact'),
    };
    const getOption = (): echarts.EChartsOption => {
        return {
            title: {
                text: 'Data Insights',
            },
            tooltip: {},
            xAxis: {
                type: 'category',
                name: 'Topic', // X-Axis Label
                data: Array.from(new Set(filteredData.map(item => item.topic))),
            },
            yAxis: {
                type: 'value',
                name: 'Intensity', // Y-Axis Label
            },
            series: [
                {
                    data: filteredData.map(item => item.intensity),
                    type: 'bar',

                },
            ],
        };
    };

    return (
        <div className="container mx-auto p-4">
            <button onClick={toggleFilterSidebar} className="mb-4 py-2 px-4 flex items-center gap-4 font-thin border border-[#1e4580] rounded-lg text-black">
                Filter
                <Image src={down} alt='' />
            </button>
            <FilterDrawer
                isFilterOpen={isFilterOpen}
                toggleFilterSidebar={toggleFilterSidebar}
                setFilters={applyFilters}
                filterOptions={filterOptions}
            />
            <ReactECharts option={getOption()} style={{ height: '400px' }} />
        </div>
    );
};

export default BarChart;
