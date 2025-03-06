let tickets = [];

document.getElementById("ticketForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const user = document.getElementById("user").value;
    const issue = document.getElementById("issue").value;
    const newTicket = { id: Date.now(), user, issue, assignedTo: "", status: "Åpen", timestamp: new Date().toLocaleString() };
    tickets.push(newTicket);
    document.getElementById("ticketForm").reset();
    renderTickets();
});

function renderTickets() {
    const ticketList = document.getElementById("ticketList");
    ticketList.innerHTML = "";
    tickets.forEach(ticket => {
        const div = document.createElement("div");
        div.className = "ticket" + (ticket.status === "Løst" ? " resolved" : "");
        div.innerHTML = `
                    <p><strong>ID:</strong> ${ticket.id}</p>
                    <p><strong>Bruker:</strong> ${ticket.user}</p>
                    <p><strong>Problem:</strong> ${ticket.issue}</p>
                    <p><strong>Tid:</strong> ${ticket.timestamp}</p>
                    <p><strong>Status:</strong> ${ticket.status}</p>
                    <p><strong>Tilordnet:</strong> ${ticket.assignedTo || "Ingen"}</p>
                    <div class="btn-group">
                        <button onclick="assign(${ticket.id})">Tilordne</button>
                        <button onclick="resolve(${ticket.id})">Løs</button>
                    </div>
                `;
        ticketList.appendChild(div);
    });
}

function assign(id) {
    const name = prompt("Tilordne til (navn på ansatt):");
    if (name) {
        tickets = tickets.map(ticket => ticket.id === id ? { ...ticket, assignedTo: name } : ticket);
        renderTickets();
    }
}

function resolve(id) {
    tickets = tickets.map(ticket => ticket.id === id ? { ...ticket, status: "Løst" } : ticket);
    renderTickets();
}