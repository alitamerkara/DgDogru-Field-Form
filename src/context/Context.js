import React, { createContext, useContext } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const report= [];

    return (
        <MyContext.Provider value={report}>
            {children}
        </MyContext.Provider>
    );
};

export const useMyContext = () => {
    return useContext(MyContext);
};