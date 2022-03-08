export default function Login () {
    document.title = "Login"
    return  (
    <div class="main-section">
           <h1>Login</h1>
           <div><input type="radio" />Contratante<input type="radio" />Frela</div>
           
            <div>
                <h4>Username<input type="text" /></h4>
            </div>

           <div class="password">
               <h4>Password<input type="text" /></h4>
           </div>

           <button>Submit</button>
        <>
        <div>
            <p>lembrar-me</p>
            <input type="checkbox" />
        </div>
        </>
           <a href="/cadastro">Cadastrar</a>
           <div>
           <a>Recuperar minha senha</a>
           </div>
    </div>

    )
}