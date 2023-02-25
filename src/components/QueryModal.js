import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineCopy } from 'react-icons/ai'
import FilterGroup from './FilterGroup';
import { useGlobalContext } from '../context/context';
import { v4 as uuidv4 } from 'uuid';


const QueryModal = () => {
    const { filterGroups, newFilterGroups, defaultRuleGroup, query } = useGlobalContext();

    const addFilterGroup = () => {
        const temp = [...filterGroups, { ...defaultRuleGroup, id: uuidv4() }];
        newFilterGroups(temp);
    }

    const copyToClipBoard = (text) => {
        const cb = navigator.clipboard;
        cb.writeText(text).then(() => alert('Text copied to clipboard'));
    }

    return (
        <div className='absolute z-10 w-full h-full'>
            <div className='my-[100px] mx-auto h-[600px] w-[960px] bg-[#1D2025] rounded-md md-[500px]'>
                <div className='relative w-full bg-[#5C61F0] h-[100px] p-5 text-white rounded-t-md'>
                    <div className='flex justify-between'>
                        {
                            (query.length === 0) ? (
                                <h2 className='text-lg'>Create tag and query</h2>
                            ) : (
                                <h2 className='text-lg'>Build your query</h2>
                            )
                        }
                    <button className='absolute right-2 top-2 p-1 bg-[#4338CA] rounded-md'>
                        <AiOutlineClose color='white' />
                    </button>
                    </div>
                    <div className='overflow-scroll py-1'>
                        {
                            (query.length) ? (
                                query.map((currQuery, index) => {
                                    return (
                                        <div key={index} className='w-full flex gap-3 items-center mb-3'>
                                            <div className='bg-[#4338CA] w-[80%] py-1 px-2 rounded-md flex justify-between items-center'>
                                                <p>
                                                    <span className='font-bold'>Query: </span>
                                                    {currQuery}
                                                </p>
                                                <AiOutlineCopy
                                                    className='cursor-pointer'
                                                    onClick={() => {
                                                        copyToClipBoard(currQuery)
                                                    }}
                                                />
                                            </div>
                                            <div className='cursor-pointer'>more...</div>
                                        </div>
                                    )
                                })
                            ) : (
                                <p className='opacity-50 text-sm'>The query you build will be saved in your active view</p>
                            )
                        }
                    </div>
                </div>
                <div className='h-[500px] flex p-5 z-30 rounded-b-md  overflow-scroll'>
                    <div className='w-full h-fit relative max-h-fit'>
                        {
                            filterGroups.map((group, index) => {
                                const { id } = group;
                                return (
                                    <FilterGroup key={id} index={index} group={group} />
                                )
                            })
                        }
                        <div className=' text-white mb-10'>
                            <div className='h-10 w-[1px] bg-[#5C61F0] ml-10'></div>
                            <button
                                className='py-2 px-4 bg-[#5C61F0] rounded-md'
                                onClick={addFilterGroup}
                            >
                                + Add New Group Filter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default QueryModal