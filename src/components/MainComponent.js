import React, {Component} from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch,Route,Redirect} from 'react-router-dom';

class Main extends Component { 
	constructor(props){
		super(props);
		this.state = {
	      dishes: DISHES,
	      comments: COMMENTS,
	      promotions: PROMOTIONS,
	      leaders: LEADERS
	    };
	}

	

	render(){
		const HomePage=(dishes,promotions,leaders)=>{
			return (
				<Home 
	              dish={dishes.filter(dish => dish.featured)[0]}
	              promotion={promotions.filter(promo => promo.featured)[0]}
	              leader={leaders.filter(leader=> leader.featured)[0]}
	          />
			);
		}
		const AboutUs=()=>{
			return (
				<div className="container">
					<h2> About Us </h2>
				</div>
			);
		}
		const DishWithId = ({match}) => {
	      return(
	          <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
	            comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
	      );
	    };

		return (
			<div className="App">
			  <Header />
				  <Switch>
				  	<Route path="/home" component={()=>HomePage(this.state.dishes,this.state.promotions,this.state.leaders)} />
				  	<Route exact path="/menu" component={()=><Menu dishes={this.state.dishes} />} />
				  	<Route path='/menu/:dishId' component={DishWithId} />
				  	<Route path="/contactus" component={Contact} />
				  	<Route path="/aboutus" component={AboutUs} />
				  	<Redirect to="home" />
				  </Switch>
			  <Footer />
			</div>
		); 
	}	
}
export default Main;
