import React , { Component } from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'

import LogoBlack from '../img/logoBlack.svg'
import LogoYellow from '../img/LogoYellow.svg'

import userConfig from '../../config'

class Navbar extends Component {
  
  constructor() {
    super();
    this.state = {
      childVisible: false
    }
  }


  render() {      
          return (
            <nav className="is-transparent has-text-centered">
                <div className="container">
	                <div className="navbar-brand level-item has-text-centered">
	                  <a onClick={() => this.onClick()} className="logo"><img src={LogoBlack} alt="X Trademark logo" /></a>
	                  <div className="navbar-burger burger" data-target="navMenu">
	                    <span />
	                    <span />
	                    <span />
	                  </div>
	                </div>
	                <div id="navMenu" className="level-item">
	                  {this.state.childVisible ?
	                  <div className="level-item has-text-centered">
	                      <Link
	                        className="navbar-item"
	                        to="/"
	                      >
	                        Home
	                      </Link>
	                      <Link
	                        className="navbar-item"
	                        to="work"
	                      >
	                        Work
	                      </Link>
	                      
	                      <Link
	                        className="navbar-item"
	                        to="about"
	                      >
	                        About
	                      </Link>
	                      
	                      <Link
	                        className="navbar-item"
	                        to="contact"
	                      >
	                        Contact
	                      </Link>
	                      
	                      <Link
	                        className="navbar-item"
	                        to="blog"
	                      >
	                        Blog
	                      </Link>
	                  </div>
	                  : null }
	              </div>
              </div>
            </nav>
    );
  }
  onClick() {
    this.setState({childVisible: !this.state.childVisible});
  }
};

export default Navbar;