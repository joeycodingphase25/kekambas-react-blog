import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register(props) {
    let navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(e);

        // Confirm that the passwords are equal
        let password = e.target.password.value;
        let confirmPass = e.target.confirmPass.value;
        if (password !== confirmPass){
            props.flashMessage("Hey these passwords don't match you silly goose!", "warning")
            // navigate('/register')
        } else {
            // Set up our request to the flask api
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json")

            let data = JSON.stringify({
                username: e.target.username.value,
                email: e.target.email.value,
                password: password
            })

            fetch('https://kekambas-blog.herokuapp.com/auth/users', {
                method: 'POST',
                headers: myHeaders,
                body: data
            }).then(res => res.json())
                .then(data => {
                    if (data.error){
                        props.flashMessage(data.error, 'danger')
                    } else {
                        props.flashMessage(`${data.username} has registered.`, 'success')
                        navigate('/')
                    }
                })
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h3 className='text-center'>Register Here</h3>
            <div className='form-group'>
                <label htmlFor='username'>Username</label>
                <input type='text' name='username' className='form-control' placeholder='Username' />
                <label htmlFor='email'>Email</label>
                <input type='text' name='email' className='form-control' placeholder='Email' />
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' className='form-control' placeholder='Password' />
                <label htmlFor='confirmPass'>Confirm Password</label>
                <input type='password' name='confirmPass' className='form-control' placeholder='Confirm Password' />
                <input type='submit' className='btn btn-primary w-100' value='Register' />
            </div>
        </form>
    )
}