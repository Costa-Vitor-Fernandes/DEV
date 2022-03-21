export default function Perfil () {
    return (
        <div className="main-section">
            <h1>Perfil</h1>
            <div className="profile-img"></div>
            <div className="profile-info">
            <input type="text" placeholder="Nome" /><input type="text" placeholder="Telefone" /><input type="text" /><input type="text" /><input type="text" /><input type="text" />
            </div>
            <input className="right-side-button" type="submit"></input>
        </div>
    )
}