import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {withRouter} from 'react-router';

class ContactData extends React.Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false,
        totalPrice: null,
        ingredients: null
    };

    componentWillMount(){
        console.log(this.props.price);
        this.setState((prevState) => {
            return {totalPrice: this.props.price, ingredients: this.props.ingredients}
        });
    }

    orderHandler = (event) =>{
        event.preventDefault();

        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Max Mustermann',
                adress: {
                    street: 'Elmstreet 6',
                    zipCode: '666',
                    country: 'New York'
                },
                email: 'test@mustermann.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
        .then((response) => {
            this.setState({loading: false});
            this.props.history.push('/');
        }).catch((error) => {
            this.setState({loading: false});
        });
    }


    render(){

        let form = (
            <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={classes.Input} type="text" name="email" placeholder="Your Mail" />
                    <input className={classes.Input} type="text" name="street" placeholder="Street" />
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                    <Button type="Success" click={this.orderHandler}>Order</Button>
                </form>
        );

        if(this.state.loading){
            form = <Spinner />
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default withRouter(ContactData);