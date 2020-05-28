import React, {Component} from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Header from './HeaderComponent'
import Contact from './ContactComponent';
import {Switch, Route, Redirect,withRouter} from 'react-router-dom';
import Footer from './FooterComponent'
import DishDetail from './DishDetailComponent';
import About from './AboutComponent';
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

class Main extends Component {

    render(){
        const HomePage = () => {
            return <Home dish={this.props.dishes.find(dish => dish.featured)}        
            promotion={this.props.promotions.find(promo => promo.featured)}
            leader={this.props.leaders.find(leader => leader.featured)}
            />;
        };

        const DishWithID = ({match}) =>{
            return (
                <DishDetail dish={this.props.dishes.find(dish => dish.id===parseInt(match.params.dishId,10))}
                comments={this.props.comments.filter(comment => comment.dishId === parseInt(match.params.dishId,10))}
                />
            );
        }

        return (
        <div>
            <Header/>
            <Switch>
                <Route path="/home" component={HomePage} />
                <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>} />
                <Route path="/menu/:dishId" component={DishWithID} />
                <Route exact path="/contactus" component={Contact} /> 
                <Route exact path="/aboutus" component={()=><About leaders={this.props.leaders}/>} /> 
                <Redirect to="/"/>
            </Switch>
            <Footer/>
        </div>
        );
    }
}
export default withRouter(connect(mapStateToProps)(Main));
