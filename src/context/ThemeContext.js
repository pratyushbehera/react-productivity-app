import React, { useEffect, useState } from 'react';
const ThemeContext = React.createContext({
    dark: false,
    toggle: () => {}
});

export default ThemeContext;


export function ThemeProvider(props){
    const [dark,setDark] = useState(localStorage.getItem('darkTheme'));

    useEffect(()=>{
        const lastTheme = localStorage.getItem('darkTheme');
        if(lastTheme === 'true'){
            setDark(true);
        }
        if(!lastTheme || lastTheme === 'false'){
            setDark(false);
        }
    },[dark]);

    const toggle = () =>{
        setDark(!dark);
        localStorage.setItem('darkTheme', !dark);
    }

    return (
    <ThemeContext.Provider value={{dark,toggle}}>
        {props.children}
    </ThemeContext.Provider>
    );
}