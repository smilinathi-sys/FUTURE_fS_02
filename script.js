const form = document.getElementById("leadForm");
const table = document.getElementById("leadTableBody");

// LOGIN
async function login() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if(username === "admin" && password === "1234"){
        alert("Login Success 🚀");
        document.querySelector(".container").style.display = "block";
    } else {
        alert("Invalid Login ❌");
    }
}

// FETCH LEADS
async function fetchLeads() {

    const res = await fetch("http://localhost:5000/leads");
    const leads = await res.json();

    table.innerHTML = "";

    leads.forEach(l => {

        table.innerHTML += `
        <tr>
            <td>${l.name}</td>
            <td>${l.email}</td>
            <td>${l.status}</td>
            <td>${l.notes || ""}</td>
            <td>
                <button onclick="updateStatus('${l._id}','Contacted')">Contacted</button>
                <button onclick="updateStatus('${l._id}','Converted')">Converted</button>
                <button onclick="addNote('${l._id}')">Note</button>
                <button onclick="deleteLead('${l._id}')">Delete</button>
            </td>
        </tr>
        `;
    });
}

// ADD LEAD
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    await fetch("http://localhost:5000/add-lead", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            name:document.getElementById("name").value,
            email:document.getElementById("email").value
        })
    });

    form.reset();
    fetchLeads();
});

// UPDATE STATUS
async function updateStatus(id, status) {

    await fetch(`http://localhost:5000/update-status/${id}`, {
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({status})
    });

    fetchLeads();
}

// ADD NOTE
async function addNote(id) {

    const note = prompt("Enter note:");

    await fetch(`http://localhost:5000/add-note/${id}`, {
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({notes:note})
    });

    fetchLeads();
}

// DELETE
async function deleteLead(id) {

    await fetch(`http://localhost:5000/delete-lead/${id}`, {
        method:"DELETE"
    });

    fetchLeads();
}

// INIT
fetchLeads();