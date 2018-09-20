import React, { Component } from "react";

class SPSHeader extends Component {
  render() {
    return (
      <div className="sps-navbar-container">
        <nav className="sps-navbar sps-navbar--expand-lg">
          <a className="sps-navbar__brand" href="#navbar">
            <img
              className="sps-navbar__brand-logo"
              src="/static/br.png"
              aria-hidden="true"
              alt="Fulfillment Logo"
            />
            <span className="sps-navbar__brand-name">
              Bob Ross Paint Zone Online
            </span>
          </a>
          <span className="sps-vertical-rule" />
          <ul className="sps-navbar__nav">
            <li>
              <a className="sps-nav__item sps-nav__link active" href="#navbar">
                Home
                <span className="sr-only">(current)</span>
              </a>
            </li>
            <li>
              <a
                className="sps-nav__item sps-nav__link"
                target="_blank"
                href="https://www.bobross.com/aboutus.asp"
              >
                About Bob
              </a>
            </li>
          </ul>
          <div className="sps-navbar__dropdown-nav" aria-hidden="true">
            <div className="sps-dropdown">
              <button
                type="button"
                className="sps-navbar__dropdown-nav-button"
                aria-label="Navigation"
                id="dropdown-nav-1"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i
                  className="sps-icon sps-icon-ellipses"
                  aria-hidden="true"
                  title="Open Nav"
                />
              </button>
              <ul
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdown-nav-1"
              >
                <li>
                  <a
                    className="sps-nav__item sps-nav__link active"
                    href="#navbar"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a className="sps-nav__item sps-nav__link" href="#navbar">
                    Features
                  </a>
                </li>
                <li>
                  <a className="sps-nav__item sps-nav__link" href="#navbar">
                    Pricing
                  </a>
                </li>
                <li>
                  <a className="sps-nav__item sps-nav__link" href="#navbar">
                    Preferences
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default SPSHeader;
