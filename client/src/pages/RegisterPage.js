import { useState } from "react";
// Imports the 'useState' hook from React to manage component state

export default function RegisterPage() {
    const [username, setUsername] = useState('')
    // Initializes a 'username' state variable with an empty string, 'setUsername' is the function used to update this value.
    const [password, setPassword] = useState('')
    async function register(ev){            //Defines an event handler for form submission.
        ev.preventDefault()
        // "ev.preventDefault()" stops the page from reloading (default form behavior).
        try {
            const response = await fetch('http://localhost:8000/register', {
            method: 'POST',
            body: JSON.stringify({username,password}),
            // "JSON.stringify({ username, password })" converts the form data into a JSON string.
            headers: {'Content-Type':'application/json'},
            credentials: 'include'
        })
        if(response.status === 200){
            alert("Registration successful")
        }
        else{
            alert("Registration failed.")
        }
        } catch (error) {
            console.error('Network error:', error); // 👈 this will tell you what exactly failed
            alert('Failed to connect to server');
        }
        
    }
    return(
        <form className="register" onSubmit={register}>
            {/* When the user submits the form, React calls your register function. */}
            <h1>Register</h1>
            <input
                type="text"
                placeholder="username"
                value={username}
                onChange={ev => setUsername(ev.target.value)}
                // When the user types, 'onChange' updates the corresponding state.
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={ev => setPassword(ev.target.value)}
                /*
                "ev => setPassword(ev.target.value)" => This is an arrow function that takes the event (ev) and calls setPassword() with the input’s current value:

                    => ev.target refers to the input element itself.
                    => ev.target.value is the new value the user just typed.
                    => setPassword(...) updates the password state variable with that value.
                */
            />
            <button>Register</button>
        </form>
    );
}