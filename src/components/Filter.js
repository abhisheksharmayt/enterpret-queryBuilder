import React, { useEffect, useState } from 'react'
import Dropdown from './utils/Dropdown'
import { AiFillDelete } from 'react-icons/ai'
import { fields, criterias, conditions } from '../data'
import { useGlobalContext } from '../context/context'

// const defaultFilterValues = [
//     { type: 'field', value: '' },
//     { type: 'condition', value: '' },
//     { type: 'criteria', value: '' },
// ];

const Filter = ({ filterIndex, groupIndex, id }) => {
    const [conditionOptions, setConditionOptions] = useState([]);
    const { filterGroups, newFilterGroups } = useGlobalContext();
    // const [selected, setSelected] = useState(defaultFilterValues);
    useEffect(() => {
        let temp = [];
        for (let key of conditions.keys()) {
            temp = [...temp, key];
        }
        setConditionOptions(temp);

    }, [])
    // console.log(filterGroups, filterIndex, groupIndex);
    const deleteFilter = () => {
        const temp = filterGroups;
        const newChildrens = temp[groupIndex].children.filter((child) => child.id !== id);
        temp[groupIndex].children = newChildrens;
        newFilterGroups([...temp]);
        // console.log(temp[groupIndex].children);
    }

    const updateSelection = (fieldValue, SelectedValue) => {
        const temp = [...filterGroups];
        temp[groupIndex].children[filterIndex] = {...temp[groupIndex].children[filterIndex], [fieldValue.toLowerCase()] : SelectedValue};
        newFilterGroups(temp);
    }
    // console.log(filterGroups[groupIndex].children[filterIndex].field)

    return (
        <div className='flex justify-between items-center mt-8'>
            <div className='flex gap-4'>

                <Dropdown
                    name='Field'
                    options={fields}
                    value={filterGroups[groupIndex].children[filterIndex].field}
                    updateSelection={updateSelection}
                    index={0}
                />

                <Dropdown
                    name='Condition'
                    options={conditionOptions}
                    value={filterGroups[groupIndex].children[filterIndex].condition}
                    updateSelection={updateSelection}
                    index={1}
                />

                <Dropdown
                    name='Criteria'
                    options={criterias}
                    value={filterGroups[groupIndex].children[filterIndex].criteria}
                    updateSelection={updateSelection}
                    index={2}
                />

            </div>
            {
                (filterIndex !== 0) &&
                <div
                    className='p-3 rounded-md bg-[#ffffff0d] cursor-pointer'
                    onClick={deleteFilter}
                >
                    <AiFillDelete style={{ color: '#7E8083' }} />
                </div>
            }
        </div>
    )
}

export default Filter