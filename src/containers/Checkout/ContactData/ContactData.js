import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {withRouter} from 'react-router';
import Input from '../../../components/UI/Input/Input';

class ContactData extends React.Component{
    state = {
        orderForm:{
            name: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation:{
                    required: true,

                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation:{
                    required: true,
                    
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 4,
                    maxLength: 7
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation:{
                    required: true,
                    
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig:{
                    type: 'email',
                    placeholder: 'E-Mail'
                },
                value: '',
                validation:{
                    required: true,
                    
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig:{
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ],
                },
                value: 'fastest',
                validation: {},
                valid: true,
            },
        },
        formIsValid: false,
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

        const formData = {};

        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            order: formData
        }

        axios.post('/orders.json', order)
        .then((response) => {
            this.setState({loading: false});
            this.props.history.push('/');
        }).catch((error) => {
            this.setState({loading: false});
        });
    }

    checkValidity = (value, rules) =>{
        let isValid = true;

        if(!rules){
            return true;
        }

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;

        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        console.log(formIsValid);
        this.setState((prevState) => {
            return {orderForm: updatedOrderForm, formIsValid: formIsValid};
        });
    }

    render(){

        let formElementsArray = [];

        for(let key in this.state.orderForm){
            formElementsArray.push({id: key, config: this.state.orderForm[key] });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                
                {
                    formElementsArray.map((singleElement) => {
                        return (<Input 
                            key={singleElement.id} 
                            elementType={singleElement.config.elementType}  
                            elementConfig={singleElement.config.elementConfig}
                            value={singleElement.config.value}
                            changed={(event) => {this.inputChangedHandler(event, singleElement.id)}}
                            shouldValidate={singleElement.config.validation}
                            touched={singleElement.config.touched}
                            invalid={!singleElement.config.valid}/>);
                    })
                }
                <Button type="Success" disabled={!this.state.formIsValid} click={this.orderHandler}>Order</Button>
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