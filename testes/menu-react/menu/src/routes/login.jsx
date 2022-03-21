import React, {useState} from "react"

export default function Login () {
    document.title = "Login"
    const [values,setValues] = useState();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsername = (user) =>{
        setUsername(()=>({
          
          user: user.target.value,
        }))
        
}
    const handlePassword = (pass) =>{
        setPassword(()=>({
            password: pass.target.value
        }))
       
    }

const submitClick = () => {
    console.log("checar no banco")
    console.log(username,password) // criptografado
    setPassword(()=>({
        password: ''
    }))
    setUsername(()=>({
        user: ''
    }))
}



    return  (
    <div className="main-section">
           <h1>Login</h1>
           

           <div><input type="radio" />Contratante<input type="radio" />Frela</div>
           
            <div>
                <h4>Username<input type="text" onChange={handleUsername}/></h4>
            </div>

           <div className="password">
               <h4>Password
               <input type="password" onChange={handlePassword} />
                   </h4>
           </div>

           <input type="submit" href="#" onClick={submitClick}  />

     
          
        <>
        <div>
            <p>lembrar-me</p>
            <input type="checkbox" />
        </div>
        </>
           <a href="/cadastro">Cadastrar</a>
           <div>
           
           </div>
    </div>

    )
}
