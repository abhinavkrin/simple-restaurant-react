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
import {addComment,fetchDishes,fetchComments,fetchPromos} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => {dispatch(fetchDishes())},
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
    fetchComments: ()=> {dispatch(fetchComments())},
    fetchPromos: ()=> {dispatch(fetchPromos())}
});

class Main extends Component {

    componentDidMount(){
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
    }
    render(){
        const HomePage = () => {
            return <Home dish={this.props.dishes.dishes.find(dish => dish.featured)}     
            dishesLoading={this.props.dishes.isLoading}  
            dishesErrMess={this.props.dishes.errMess} 
            promosLoading={this.props.promotions.isLoading}
            promosErrMess={this.props.promotions.errMess} 
            promotion={this.props.promotions.promotions.find(promo => promo.featured)}
            leader={this.props.leaders.find(leader => leader.featured)}
            />;
        };

        const DishWithID = ({match}) =>{
            return (
                <DishDetail 
                dish={this.props.dishes.dishes.find(dish => dish.id===parseInt(match.params.dishId,10))}

                comments={this.props.comments.comments.filter(comment => comment.dishId === parseInt(match.params.dishId,10))}
                commentsErrMess={this.props.comments.errMess}
                addComment={this.props.addComment}

                dishesLoading={this.props.dishes.isLoading}

                dishesErrMess={this.props.dishes.errMess} 

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
                <Route exact path="/contactus" component={()=>  <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>} /> 
                <Route exact path="/aboutus" component={()=><About leaders={this.props.leaders}/>} /> 
                <Redirect to="/"/>
            </Switch>
            <Footer/>
        </div>
        );
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
