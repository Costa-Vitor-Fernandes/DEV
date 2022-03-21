import LinkBar from "../../mini-components/LinkBar"

export default function MeusFreelas(){

    
    return (
        <div className="main-section">
            <h1>MeusFrelas</h1>
            <h5>Contratado</h5>
            <LinkBar />
            <h5>Em Aguardo</h5>
            <LinkBar />
            <LinkBar />
            <h5>Declinados</h5>
            <LinkBar />
            <LinkBar />
        </div>
    )
}