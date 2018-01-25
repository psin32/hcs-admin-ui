import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Navbar from '../common/Navbar.js'
import Topbar from '../common/Topbar.js'

class AccessDenied extends Component {

  render() {
    return (
		<div>
		  <Topbar />
		  <Navbar />
	      <section>
	        <div className="container">
	          <header className="mb-5">
	            <h2 className="heading-line">You don't have access on this page.</h2>
	          </header>
	        </div>
	      </section>	  
	    </div>
    );
  }
}

export default withRouter(AccessDenied);