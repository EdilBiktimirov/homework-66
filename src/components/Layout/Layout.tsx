import React from 'react';
import Navbar from "../Navbar/Navbar";

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <div className="App">
      <header>
        <Navbar/>
      </header>
      <main>
      </main>
      {children}
    </div>
  );
};

export default Layout;