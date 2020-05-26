import React, {Component} from 'react';
import Menu from './MenuComponent'
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent'
import  {DISHES} from '../shared/dishes';
import Footer from './FooterComponent'
class Main extends Component {

    constructor(props){
    super(props);
        this.state={
        dishes: DISHES,
        selectedDish: null
        }
    }

    onDishSelect(dishId){
        this.setState({selectedDish: dishId});
    }

    render(){
        return (
        <div>
            <Header/>
            <div className="container">
                <Menu dishes={this.state.dishes} onClick={(dishId)=>this.onDishSelect(dishId)} />
                <DishDetail dishDetail={this.state.dishes.find(dish => dish.id===this.state.selectedDish)} />
            </div>
            <Footer/>
        </div>
        );
    }
}
export default Main;
