import React, {useState, useContext, useEffect} from 'react';
import { conditions, conjuction } from '../data';

const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const defaultRuleGroup = {
        id: 'f9f14e43-3029-4f4f-a991-25165c47f024',
        children: [{ id: 'fc8e8a9f-e980-4f27-b9a7-867a81ffaf92', type: "rule" }],
        conjunction: "AND",
        not: false,
        type: "rule_group"
    }
    const [filterGroups, setFilterGroups] = useState([defaultRuleGroup]);
    const [query, setQuery] = useState([]);

    useEffect(()=>{
        let newQuery = [];
        for(let group of filterGroups){
            let tempQuery = '';
            for(let child of group.children){
                // console.log(child);
                if(child.field && child.criteria && child.condition){
                    if(tempQuery !== '') tempQuery += ` ${conjuction.get(group.conjunction)} `;
                    tempQuery += `"field.${child.field.toLowerCase()} ${conditions.get(child.condition)} \\"${child.criteria}"\\"`;
                }
            }
            if(tempQuery !== '')
                newQuery.push(tempQuery);
        }
        setQuery(newQuery);
    },[filterGroups])

    const newFilterGroups = (groups)=>{
        setFilterGroups(groups);
    }

    const updateConjunction = (value, index)=>{
        const temp = filterGroups.slice();
        temp[index].conjunction = value;
        setFilterGroups(temp);
    }

    return (
        <AppContext.Provider
            value={{
                defaultRuleGroup,
                filterGroups,
                newFilterGroups,
                updateConjunction,
                query
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export const useGlobalContext = ()=>{
    return useContext(AppContext);
}

export {AppContext, AppProvider};