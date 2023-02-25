import React, { useState } from 'react'
import Filter from './Filter';
import { useGlobalContext } from '../context/context';
import { v4 as uuidv4 } from 'uuid';

const FilterGroup = ({ index, group }) => {
    const { filterGroups, newFilterGroups, updateConjunction } = useGlobalContext();
    const [logic, setLogic] = useState(group.conjunction);
    // console.log(group.conjunction);

    const addFilter = () => {
        group.children.push({ id: uuidv4(), type: 'rule' });
        const newGroups = [...filterGroups];
        newGroups[index] = group;
        newFilterGroups(newGroups);
    }

    return (
        <div className='text-white bg-[#282B30] border-[#404348] border-[1px] w-full p-5 rounded-md'>
            <div className='bg-[#ffffff0d] rounded-md border-[#404348] border-[1px] overflow-hidden text-sm max-w-fit'>
                <button
                    className={`w-16 py-2 px-3 ${(group.conjunction === 'AND') ? 'bg-[#5C61F0]' : ''}`}
                    onClick={() => updateConjunction('AND', index)}
                >
                    AND
                </button>
                <button
                    className={`w-16 py-2 px-3 ${(group.conjunction === 'OR') ? 'bg-[#5C61F0]' : ''}`}
                    onClick={() => updateConjunction('OR', index)}
                >
                    OR
                </button>
            </div>
            {
                filterGroups[index].children.map((filter, ind) => {
                    return (
                        <Filter
                            key={filter.id}
                            filterIndex={ind}
                            groupIndex={index}
                            id={filter.id}
                        />
                    )
                })
            }
            <button
                className='mt-8 py-2 px-4 bg-[#5C61F0] rounded-md'
                onClick={addFilter}
            >
                + Add Filter
            </button>
        </div>
    )
}

export default FilterGroup

