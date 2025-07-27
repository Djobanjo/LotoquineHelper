function App() {
  const [grilles, setGrilles] = React.useState([]);
  const [surlignes, setSurlignes] = React.useState([]);
  const [history, setHistory] = React.useState([]);
  const [ids, setIds] = React.useState([]);

  const addGrille = () => {
    const emptyGrille = Array(3).fill(null).map(() => Array(9).fill(""));
    setGrilles([...grilles, emptyGrille]);
    setIds([...ids, ""]);
  };

  const updateCase = (gi, ri, ci, value) => {
    const newGrilles = grilles.map((g, i) =>
      i === gi
        ? g.map((row, r) =>
            r === ri
              ? row.map((v, c) => (c === ci ? value : v))
              : row
          )
        : g
    );
    setGrilles(newGrilles);
  };

  const handleIdChange = (gi, value) => {
    const newIds = [...ids];
    newIds[gi] = value.replace(/\D/g, "").slice(0, 5);
    setIds(newIds);
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

  const isGagnee = grille => {
    const flat = grille.flat().filter(n => n && surlignes.includes(n));
    return flat.length === 15;
  };

  window.addGrille = addGrille;
  window.handleValider = handleValider;
  window.handleRetour = handleRetour;
  window.handleReset = handleReset;

  return /*#__PURE__*/React.createElement("div", {
    className: "grilles"
  }, grilles.map((grille, gi) => /*#__PURE__*/React.createElement("div", {
    key: gi,
    className: "grille"
  },
    isGagnee(grille) && React.createElement("div", { className: "gagne" }, "GAGNÉ"),
    grille.map((row, ri) => React.createElement("div", {
      key: ri,
      className: "ligne"
    }, row.map((val, ci) => React.createElement("div", {
      key: ci,
      className: "case" + (surlignes.includes(val) ? " surligne" : "")
    }, React.createElement("input", {
      value: val,
      onChange: e => updateCase(gi, ri, ci, e.target.value.trim())
    }))))),
    React.createElement("div", {
      className: "id-block"
    },
      React.createElement("label", {
        htmlFor: `id-input-${gi}`
      }, "ID :"),
      React.createElement("input", {
        id: `id-input-${gi}`,
        type: "text",
        value: ids[gi] || "",
        onChange: e => handleIdChange(gi, e.target.value),
        maxLength: 5,
        placeholder: "5 chiffres"
      })
    ),
    React.createElement("button", {
      onClick: () => {
        setGrilles(grilles.filter((_, i) => i !== gi));
        setIds(ids.filter((_, i) => i !== gi));
      },
      style: { marginTop: "12px", display: "block", marginLeft: "auto", marginRight: "auto", background: "#ffdddd", color: "#900", border: "1px solid #900", borderRadius: "4px", fontWeight: "bold" }
    }, "Supprimer la grille")
  )));  

}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(/*#__PURE__*/React.createElement(App, null));
document.getElementById("numberInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") window.handleValider();
});