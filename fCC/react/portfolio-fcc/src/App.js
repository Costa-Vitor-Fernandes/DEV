import Photo from './public/10-01-01.jpeg'
import './App.css';

function App() {
  document.title = "Vitor Costa | Web Designer"
  return (
    <div>
   <NavBar />
   <WelcomeSection />
    </div>
  );
  function NavBar () {

    return ( <header className="header">
    <a id="logo" href="#">Logo</a>
    <nav id="navbar">
        <ul className="menu">

        <li><a href="#about">About</a></li>

        <li><a href="#projects">Projects</a></li>

        <li><a href="contact">Contact</a></li>
        </ul>
    </nav>
</header>
)
  }
  function WelcomeSection() {
return(
  <section id="section">
    <h1>Hi,<br></br> I'm Vitor Costa, <br></br> web designer</h1>
    <h3>descriptions</h3>
    <img id="photo" src={Photo}></img>
  </section>
)
  }
}

export default App;
