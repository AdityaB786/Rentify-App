// src/components/Layout.js
import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout({ loggedInUser, onLogout }) {
  return (
    <div>
      <Navbar title="Rentify" loggedInUser={loggedInUser} onLogout={onLogout} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
