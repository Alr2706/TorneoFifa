let jugadores = [];
let ronda = 1;

function iniciarTorneo() {
  const input = document.getElementById("nombres").value.trim();
  if (!input) return alert("Introduce al menos dos nombres.");

  jugadores = input.split("\n").map(n => n.trim()).filter(n => n !== "");
  if (jugadores.length < 2) return alert("Se necesitan al menos 2 jugadores.");

  document.getElementById("campeon").textContent = "";
  ronda = 1;
  siguienteRonda(jugadores);
}

function siguienteRonda(lista) {
  lista = mezclar(lista);  // Aleatorizar los jugadores

  document.getElementById("ronda").textContent = "🌀 Ronda " + ronda;
  document.getElementById("torneo").innerHTML = "";

  if (lista.length === 1) {
    document.getElementById("ronda").textContent = "";
    document.getElementById("campeon").textContent = "🎉 Campeón: " + lista[0];
    return;
  }

  if (lista.length % 2 !== 0) {
    lista.push("🏅 Pasa directo");
  }

  for (let i = 0; i < lista.length; i += 2) {
    const contenedor = document.createElement("div");
    contenedor.className = "duelo";

    const j1 = document.createElement("div");
    j1.className = "jugador";
    j1.textContent = lista[i];
    j1.onclick = () => seleccionarGanador(lista[i]);

    const j2 = document.createElement("div");
    j2.className = "jugador";
    j2.textContent = lista[i + 1];
    j2.onclick = () => seleccionarGanador(lista[i + 1]);

    contenedor.appendChild(j1);
    contenedor.appendChild(j2);
    document.getElementById("torneo").appendChild(contenedor);
  }

  jugadores = [];
}

function seleccionarGanador(nombre) {
  jugadores.push(nombre);
  const duelos = document.querySelectorAll(".duelo");
  const total = duelos.length;

  if (jugadores.length === total) {
    ronda++;
    setTimeout(() => siguienteRonda(jugadores), 500);
  }
}

function mezclar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}