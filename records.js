const patients = [
  { name: "John Doe", age: 34, city: "Butuan City", diagnosis: "Cholera", visitDate: "2025-11-01" },
  { name: "Jane Smith", age: 28, city: "Surigao City", diagnosis: "Typhoid", visitDate: "2025-11-02" },
  { name: "Alice Brown", age: 40, city: "Tandag City", diagnosis: "Dengue", visitDate: "2025-11-03" },
  { name: "Maria Garcia", age: 31, city: "Bayugan City", diagnosis: "Hepatitis A", visitDate: "2025-11-04" },
  { name: "Paul Lee", age: 27, city: "Surigao City", diagnosis: "Typhoid", visitDate: "2025-11-04" },
  { name: "Sophia Reyes", age: 29, city: "Cabadbaran City", diagnosis: "Cholera", visitDate: "2025-11-07" },
  { name: "Daniel Cruz", age: 38, city: "Butuan City", diagnosis: "Dengue", visitDate: "2025-11-07" },
  { name: "Olivia Santos", age: 33, city: "Bayugan City", diagnosis: "Typhoid", visitDate: "2025-11-08" },
  { name: "Ethan Lim", age: 41, city: "Tandag City", diagnosis: "Hepatitis A", visitDate: "2025-11-08" },
  { name: "Lucas Tan", age: 36, city: "Surigao City", diagnosis: "Dengue", visitDate: "2025-11-09" },
  { name: "Isabella Cruz", age: 30, city: "Cabadbaran City", diagnosis: "Typhoid", visitDate: "2025-11-10" },
  { name: "Henry Morales", age: 47, city: "Butuan City", diagnosis: "Cholera", visitDate: "2025-11-10" },
  { name: "Chloe Rivera", age: 22, city: "Bayugan City", diagnosis: "Dengue", visitDate: "2025-11-11" },
  { name: "Mason Castillo", age: 39, city: "Tandag City", diagnosis: "Typhoid", visitDate: "2025-11-11" },
  { name: "Ava Navarro", age: 26, city: "Bislig City", diagnosis: "Hepatitis A", visitDate: "2025-11-12" },
  { name: "Noah Santos", age: 34, city: "Cabadbaran City", diagnosis: "Cholera", visitDate: "2025-11-12" },
  { name: "Lily Dela Cruz", age: 31, city: "Butuan City", diagnosis: "Typhoid", visitDate: "2025-11-13" },
  { name: "James Perez", age: 43, city: "Surigao City", diagnosis: "Dengue", visitDate: "2025-11-13" },
  { name: "Ella Tan", age: 28, city: "Bayugan City", diagnosis: "Hepatitis A", visitDate: "2025-11-14" },
  { name: "Mia Gonzales", age: 25, city: "Bislig City", diagnosis: "Cholera", visitDate: "2025-11-15" },
  { name: "Tom Hanks", age: 50, city: "Bislig City", diagnosis: "Dengue", visitDate: "2025-11-16" },
  { name: "Emma Wilson", age: 19, city: "Butuan City", diagnosis: "Typhoid", visitDate: "2025-11-17" },
  { name: "Liam Kim", age: 45, city: "Surigao City", diagnosis: "Hepatitis A", visitDate: "2025-11-18" },
  { name: "Nina Patel", age: 35, city: "Tandag City", diagnosis: "Cholera", visitDate: "2025-11-19" },
  { name: "Bob Johnson", age: 22, city: "Butuan City", diagnosis: "Cholera", visitDate: "2025-11-20" }
];

const tableBody = document.querySelector("#recordsTable tbody");
const searchInput = document.getElementById("searchInput");

function renderTable(data) {
  tableBody.innerHTML = "";
  data.forEach(p => {
    const row = `<tr>
      <td>${p.name}</td>
      <td>${p.age}</td>
      <td>${p.city}</td>
      <td>${p.diagnosis}</td>
      <td>${p.visitDate}</td>
    </tr>`;
    tableBody.insertAdjacentHTML("beforeend", row);
  });
}

searchInput.addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(term) ||
    p.city.toLowerCase().includes(term) ||
    p.diagnosis.toLowerCase().includes(term)
  );
  renderTable(filtered);
});

// Initial render
renderTable(patients);