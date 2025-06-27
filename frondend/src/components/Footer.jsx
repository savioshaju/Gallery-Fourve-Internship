import React from 'react'

const Footer = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full bg-transparent text-white px-6 py-4 z-10 text-center text-sm">
      <span className="ml-2 text-xs text-gray-300">
        <a
          href="https://savioshaju.github.io/personal-portfolio/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-signature hover:text-blue-300"
          >
          © {new Date().getFullYear()} My Gallery. All rights reserved.
        </a>
      </span>
    </div>
  )
}

export default Footer