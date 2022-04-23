import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import AlertMessage from './components/AlertMessage';
import Nav from "./components/Nav";
import Blog from './views/Blog';
import CreatePost from './views/CreatePost';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import SinglePost from './views/SinglePost';



export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            count: 0,
            name: null,
            message: null,
            category: null,
            loggedIn: localStorage.getItem('token') ? true : false
        }
    }


    handleButtonClick = (step) => {
        let newCount = this.state.count + step;
        this.setState({
            count: newCount
        })
    }

    handleNameChange = (name) => {
        this.setState({name})
    }

    flashMessage = (message, category) => {
        this.setState({message,category})
    }

    login = () => {
        this.setState({loggedIn: true})
    }

    logout = () => {
        localStorage.removeItem('token');
        this.flashMessage('You have successfully logged out', 'secondary');
        this.setState({
            loggedIn: false
        })
    }

    render(){

        return (
            <>
                <Nav loggedIn={this.state.loggedIn} logUserOut={this.logout} />
                {this.state.message ? <AlertMessage category={this.state.category} message={this.state.message} flashMessage={this.flashMessage}/> : null}
                <div className='container'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='register' element={<Register flashMessage={this.flashMessage} />} />
                        <Route path='login' element={<Login flashMessage={this.flashMessage} login={this.login}/>} />
                        <Route path='create-post' element={<CreatePost flashMessage={this.flashMessage} loggedIn={this.state.loggedIn}/>} />
                        <Route path='blog' element={<Blog loggedIn={this.state.loggedIn} />} />
                        <Route path='blog/:postId' element={<SinglePost flashMessage={this.flashMessage} loggedIn={this.state.loggedIn}/>} />
                    </Routes>
                </div>
            </>
        )
    }
}