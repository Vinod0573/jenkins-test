import React, { useContext,createContext } from 'react'
type Theme = 'light' | 'dark';
const ThemeContext = createContext<Theme>('dark');

const useContextComponent = () => (
  <ThemeContext.Provider value="dark">
    <MyComponent />
  </ThemeContext.Provider>
)

const MyComponent = () => {
  const theme = useContext(ThemeContext);
  return <div>The theme is {theme}</div>;
}

// useContext can infer its types based on the context object that is passed in as an argument, 
// so has no need for explicit typing.