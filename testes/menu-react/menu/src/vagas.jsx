import LinkBar from "./mini-components/LinkBar";

export default function Vagas() {
    return (
      <div className="design-div">

      <main className="main-section" >
        <h1>Vagas</h1>
        <LinkBar />
        <LinkBar />
        <LinkBar />
        <LinkBar />
        <LinkBar />
        <LinkBar />
        <LinkBar />
      </main>
      </div>
    );
  }
  
  //Todo :
  //filter menu
  //component que busca vagas filtradas no banco
  //quando clicar em algum desses componentes abre a pagina de vaga
  //  -- entao so vou declarar essa pagina qnd eu estiver nesse momento
  //carregar varios desses componentes