
function App() {
  const [grilles, setGrilles] = React.useState([]);
  const [surlignes, setSurlignes] = React.useState([]);
  const [history, setHistory] = React.useState([]);

  const addGrille = () => {
    const emptyGrille = Array(3).fill(null).map(() => Array(8).fill(""));
    setGrilles([...grilles, emptyGrille]);
  };

  const updateCase = (gi, ri, ci, value) => {
    const newGrilles = grilles.map((g, i) =>
      i === gi
        ? g.map((row, r) =>
            r === ri ? row.map((v, c) => (c === ci ? value : v)) : row
          )
        : g
    );
    setGrilles(newGrilles);
  };

  const handleValider = () => {
    const val = document.getElementById("numberInput").value.trim();
    if (!val) return;
    setSurlignes([...surlignes, val]);
    setHistory([...history, val]);
    document.getElementById("numberInput").value = "";
  };

  const handleRetour = () => {
    const last = history.pop();
    setHistory([...history]);
    setSurlignes(surlignes.filter(n => n !== last));
  };

  const handleReset = () => {
    setSurlignes([]);
    setHistory([]);
  };

  const isGagnee = (grille) => {
    const flat = grille.flat().filter(n => n && surlignes.includes(n));
    return flat.length === 15;
  };

  window.addGrille = addGrille;
  window.handleValider = handleValider;
  window.handleRetour = handleRetour;
  window.handleReset = handleReset;

  return (
    <div className="grilles">
      {grilles.map((grille, gi) => (
        <div key={gi} className="grille">
          {isGagnee(grille) && <div className="gagne">GAGNÉ</div>}
          {grille.map((row, ri) => (
            <div key={ri} className="ligne">
              {row.map((val, ci) => (
                <div key={ci} className={"case" + (surlignes.includes(val) ? " surligne" : "")}>
                  <input
                    value={val}
                    onChange={e => updateCase(gi, ri, ci, e.target.value.trim())}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
