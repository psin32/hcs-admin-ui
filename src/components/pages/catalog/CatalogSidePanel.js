import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Loader from '../common/Loader.js'
import axios from 'axios';

class CatalogSidePanel extends Component {

	constructor() {
		super();
		this.state = {
		    categoryData : ""
		};
	}
	
	getCategoryByIdentifier(categoryIdentifier) {
		var categories = this.props.data;
		const category = categories.filter(record =>
	    {
	        return record.identifier === categoryIdentifier;
	    });
		return category;
	}
		
	getChildData(childcategories, id) {
  	  let subdata = childcategories.map((child, i) => {
		  let category = this.getCategoryByIdentifier(child.identifier)[0];
		  let childExists = category.childcategories && category.childcategories.length>0;
		  
    	  let classname = "list-group-item";
    	  let link = '#';
    	  let subcomponent = null;
    	  if(childExists) {
    		  classname = "list-group-item collapsed";
    		  link = '#'+category.identifier;
    		  
    		  let subchild = category.childcategories.map((subchild, index) => {
    			  
    			  let subcategory = this.getCategoryByIdentifier(subchild.identifier)[0];
    			  let subchildExists = subcategory.childcategories && category.childcategories.length>0;
    			  
    	    	  let subclassname = "list-group-item";
    	    	  let sublink = '#';
    	    	  if(subchildExists) {
    	    		  subclassname = "list-group-item collapsed";
    	    		  sublink = '#'+category.identifier;
    	    	  }
    	    	  if(subchildExists) {
	    			  return (
	    					<a key={index} href={sublink} className={subclassname} data-toggle="collapse" data-parent={category.identifier} aria-expanded="false">
	    						<span onClick={this.props.onClick} title={subchild.identifier}>{subchild.name}</span>
	    					</a>
	    			  );
    	    	  } else {
	    			  return (
	    					<a key={index} href={sublink} className={subclassname} data-toggle="collapse" data-parent={category.identifier}>
	    						<span onClick={this.props.onClick} title={subchild.identifier}>{subchild.name}</span>
	    					</a>
	    			  );
    	    	  }
    		  });
    		  subcomponent = (
                  <div className="collapse" id={ category.identifier }>
                  	{subchild}
	              </div>
    		  );
    	  }
		  
    	  if(childExists) {
			  return (
				  <div className="catalog" key={i}>
					  <a href={link} className={classname} data-toggle="collapse" data-parent={id} aria-expanded="false">
					  	<span onClick={this.props.onClick} title={child.identifier}>{child.name}</span>
					  </a>
					  {subcomponent}
				  </div>
			  );
    	  } else {
    		  return (
				  <div className="catalog" key={i}>
					  <a href={link} className={classname} data-toggle="collapse" data-parent={id}>
					  	<span onClick={this.props.onClick} title={child.identifier}>{child.name}</span>
					  </a>
					  {subcomponent}
				  </div>
			  );    		  
    	  }
	  });
  	  return subdata;
	}
	
	render() {
	    const subcategories = this.props.data.map((alldata, index) => {
	    	
	    	  let childExists = alldata.childcategories && alldata.childcategories.length>0;
	    	  let topCategory = alldata.topCategory;
	    	  
	    	  let childData = null;
	    	  if(childExists) {
	    		  let subdata = this.getChildData(alldata.childcategories, alldata.identifier);
		    	  childData = (
                      <div className="collapse" id={ alldata.identifier.replace("&", "") }>
                          {subdata}
                      </div>
	    		  );
	    	  }
	    	  
	    	  let classname = "list-group-item";
	    	  let link = '#';
	    	  if(childExists) {
	    		  classname = "list-group-item collapsed";
	    		  link = '#'+alldata.identifier.replace("&", "");
	    	  }
	    	  
	    	  if(topCategory) {
			      return (
			    	  <div key={index} className="catalog">
	                      <a href={link} className={classname} data-toggle="collapse" data-parent="#sidebar" aria-expanded="false">
	                      	<span className="hidden-sm-down">
	                      		<span onClick={this.props.onClick} title={alldata.identifier}>{ alldata.description.name }</span>
	                      	</span>
	                      </a>
	                      {childData}
	                  </div>
			      );
	    	  }
		});

	    return (
	        <div className="simple-list">
	        	<div className="left-navigation">
	        		<nav role="navigation">
	        			<ul>
				          <div className="container">
				          	<div className="row">
				              <div className="col-md-12 col-xs-1 p-l-0 p-r-0" id="sidebar">
				              	<div className="list-group panel">
				              		{subcategories}
				              	</div>
				              </div>
					        </div>
					      </div>		    		  
	            		</ul>
	            	</nav>
	            </div>
			</div>	        
	    );
	}
}

export default withRouter(CatalogSidePanel);