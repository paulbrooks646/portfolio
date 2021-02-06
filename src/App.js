
import "./App.scss";

function App() {
  return (
    <div className="portfolio-main">
      <div className="portfolio-introduction">
        <h1 className="portfolio-title">Paul Brooks</h1>
        <h2 className="portfolio-subtitle">Web Developer</h2>
      </div>
      <div className="portfolio-projects-div">
        <h3 className="portfolio-h3">PROJECTS:</h3>

        <div className="portfolio-projects">
          <a className="simpsons" href="http://theandroidsdungeon.co">
            <h5>The Androids Dungeon: The Simpsons Fan Page</h5>
          </a>
          <a href="http://disneylandtripplanner.co" className="disneyland"><h5>Micksamize: Disneyland Trip Planning Website</h5>
          </a>
          <a href="http://csstutorials.co" className="css"><h5>Tutorial Website to Learn Basic CSS</h5></a>
          <a href="http://thecodepound.com" className="codepound"><h5>The Code Pound Social Media Site For Developers</h5></a>
        </div>
      </div>
      <div className="portfolio-contact">
        <h3 className="portfolio-h3">CONTACT INFORMATION:</h3>
        <h4 className="portfolio-h4">385-335-9797</h4>
        <h4 className="portfolio-h4">paulbrooks646@gmail.com</h4>
        <h4 className="portfolio-h4">linkedin.com/in/paulbrooks646</h4>
      </div>
    </div>
  );
}

export default App;
