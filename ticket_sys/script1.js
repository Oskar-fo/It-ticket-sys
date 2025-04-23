let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

document.getElementById("ticketForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const user = document.getElementById("user").value;
    const emne = document.getElementById("emne").value;
    const issue = document.getElementById("issue").value;
    const newTicket = { id: Date.now(), user, emne, issue, assignedTo: "", status: "Åpen", timestamp: new Date().toLocaleString() };
    tickets.push(newTicket);
    localStorage.setItem("tickets", JSON.stringify(tickets));
    document.getElementById("ticketForm").reset();
    renderTickets();
});
/*Denne er lagd for å slippe å bruke get element by id under */
function renderTickets() {
    const ticketList = document.getElementById("ticketList");
    ticketList.innerHTML = "";
    tickets.forEach(ticket => {
        const div = document.createElement("div");
        div.className = "ticket" + (ticket.status === "Løst" ? " resolved" : "");
        div.innerHTML = `
            <p><strong>ID:</strong> ${ticket.id}</p>
            <p><strong>Bruker:</strong> ${ticket.user}</p>
            <p><strong>Problem Type:</strong> ${ticket.emne}</p>
            <p><strong>Problem:</strong> ${ticket.issue}</p>
            <p><strong>Tid:</strong> ${ticket.timestamp}</p>
            <p><strong>Status:</strong> ${ticket.status}</p>
            <p><strong>Tilordnet:</strong> ${ticket.assignedTo || "Ingen"}</p>
            <div class="btn-group">
                <button onclick="tildel(${ticket.id})">Tilordne</button>
                <button onclick="løs(${ticket.id})">Løs</button>
                <button onclick="deleteTicket(${ticket.id})">Slett</button>
            </div>
        `;
        ticketList.appendChild(div);
    });
}

function tildel(id) {
    const name = prompt("Tilordne til (navn på ansatt):");
    if (name) {
        tickets = tickets.map(ticket => ticket.id === id ? { ...ticket, assignedTo: name } : ticket);
        localStorage.setItem("tickets", JSON.stringify(tickets));
        renderTickets();
    }
}

function løs(id) {
    tickets = tickets.map(ticket => ticket.id === id ? { ...ticket, status: "Løst" } : ticket);
    localStorage.setItem("tickets", JSON.stringify(tickets));
    renderTickets();
}
function deleteTicket(id) {
    const confirmDelete = confirm("Er du sikker på at du vil slette denne ticketen?");
    if (confirmDelete) {
        // Filtrer ut ticketen med riktig ID
        tickets = tickets.filter(ticket => ticket.id !== id);
        localStorage.setItem("tickets", JSON.stringify(tickets)); // Oppdater localStorage
        renderTickets(); // Oppdater visningen
        alert("Ticket ble slettet.");
    }
}

/*Rendrer ticketsa når nettsiden starter*/
renderTickets();
