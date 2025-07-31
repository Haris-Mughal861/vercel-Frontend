import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import './layout.css';

const Layout = () => {
  return (
    <div className="layout_wrapper">
      <Header />
      <main className="layout_content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
