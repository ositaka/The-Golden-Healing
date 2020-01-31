import React from 'react'

import './Footer.css'

export default ({ globalSettings, socialSettings, navLinks }) => (
  <footer className="Footer">
    <div className="container taCenter">
      <span>
        © {new Date().getFullYear()} All rights reserved.
        <br />
        Crafted by{' '}
        <a href="https://mediacreators.studio" title="Media Creators Studio">
          mediacreators.studio
        </a>
      </span>
    </div>
  </footer>
)
