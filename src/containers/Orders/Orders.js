import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{

    state= {
        orders: [],
        loading: true
    }

    componentDidMount(){
        axios.get('/orders.json')
        .then((res) => {
            this.setState((prevState) => {
                const fetchedOrders = [];
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                return {orders: fetchedOrders, loading: false};
            });
        }).catch((err) => {
            this.setState((prevState) => {
                return {loading: false};
            });
        });
    }

    render(){
        return(
            <div>
                {this.state.orders.map((singleItem) =>{
                    return <Order key={singleItem.id} ingredients={singleItem.ingredients} price={singleItem.price} />;
                })}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);