import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Navbar from '../common/Navbar.js'
import Topbar from '../common/Topbar.js'

class Welcome extends Component {
	
	componentWillMount() {
		document.title = "Welcome";
	}

	render() {
	    return (
			<div>
			  <Topbar />
		      <Navbar />
		      <section>
		        <div className="container">
		          <header className="mb-5">
		            <h2 className="heading-line">Welcome Page</h2>
		          </header>
		        </div>
		      </section>
		    </div>
	    );
  	}
}

export default withRouter(Welcome);