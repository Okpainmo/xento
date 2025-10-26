'use client';

import React from 'react';
import { FaTwitter, FaDiscord, FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <footer className='px-6 sm:px-16 pt-[200px] pb-10 bg-transparent text-gray-600'>
      <div className='max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-8'>
        {/* Brand / Logo */}
        <div className='text-center sm:text-left'>
          <h1 className='text-xl font-semibold text-gray-600 tracking-wide'>
            Xento
          </h1>
          <p className='text-sm text-gray-500 mt-1'>
            The Decentralized Exchange platform that grows with you.
          </p>
        </div>
      </div>

      <div className='flex justify-between max-w-6xl mx-auto mt-6'>
        {/* Navigation */}
        <nav className='flex flex-wrap justify-center gap-6 text-sm'>
          <a href='#' className='hover:text-white transition'>
            About
          </a>
          <a href='#' className='hover:text-white transition'>
            Docs
          </a>
          <a href='#' className='hover:text-white transition'>
            Support
          </a>
          <a href='#' className='hover:text-white transition'>
            Terms
          </a>
        </nav>

        {/* Socials */}
        <div className='flex gap-5 text-lg'>
          <a href='#' className='hover:text-white transition'>
            <FaTwitter />
          </a>
          <a href='#' className='hover:text-white transition'>
            <FaDiscord />
          </a>
          <a href='#' className='hover:text-white transition'>
            <FaGithub />
          </a>
        </div>
      </div>

      <div className='max-w-6xl mx-auto mt-10 border-t border-gray-600 pt-6 text-center text-xs text-gray-600'>
        © {new Date().getFullYear()} Xento. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
