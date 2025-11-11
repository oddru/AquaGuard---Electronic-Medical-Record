// Initial mock EMR data with Caraga cities
let patients = [
  { name: "John Doe", age: 34, city: "Butuan City", diagnosis: "Cholera", visitDate: "2025-11-01" },
  { name: "Jane Smith", age: 28, city: "Surigao City", diagnosis: "Typhoid", visitDate: "2025-11-02" },
  { name: "Alice Brown", age: 40, city: "Tandag City", diagnosis: "Dengue", visitDate: "2025-11-03" },
  { name: "Bob Johnson", age: 22, city: "Butuan City", diagnosis: "Cholera", visitDate: "2025-11-03" },
  { name: "Maria Garcia", age: 31, city: "Bayugan City", diagnosis: "Hepatitis A", visitDate: "2025-11-04" },
  { name: "Paul Lee", age: 27, city: "Surigao City", diagnosis: "Typhoid", visitDate: "2025-11-04" },
  { name: "Nina Patel", age: 35, city: "Tandag City", diagnosis: "Cholera", visitDate: "2025-11-05" },
  { name: "Tom Hanks", age: 50, city: "Bislig City", diagnosis: "Dengue", visitDate: "2025-11-05" },
  { name: "Emma Wilson", age: 19, city: "Butuan City", diagnosis: "Typhoid", visitDate: "2025-11-06" },
  { name: "Liam Kim", age: 45, city: "Surigao City", diagnosis: "Hepatitis A", visitDate: "2025-11-06" },
  { name: "Sophia Reyes", age: 29, city: "Cabadbaran City", diagnosis: "Cholera", visitDate: "2025-11-07" },
  { name: "Daniel Cruz", age: 38, city: "Butuan City", diagnosis: "Dengue", visitDate: "2025-11-07" },
  { name: "Olivia Santos", age: 33, city: "Bayugan City", diagnosis: "Typhoid", visitDate: "2025-11-08" },
  { name: "Ethan Lim", age: 41, city: "Tandag City", diagnosis: "Hepatitis A", visitDate: "2025-11-08" },
  { name: "Mia Gonzales", age: 25, city: "Bislig City", diagnosis: "Cholera", visitDate: "2025-11-09" },
  { name: "Lucas Tan", age: 36, city: "Surigao City", diagnosis: "Dengue", visitDate: "2025-11-09" },
  { name: "Isabella Cruz", age: 30, city: "Cabadbaran City", diagnosis: "Typhoid", visitDate: "2025-11-10" },
  { name: "Henry Morales", age: 47, city: "Butuan City", diagnosis: "Cholera", visitDate: "2025-11-10" },
  { name: "Chloe Rivera", age: 22, city: "Bayugan City", diagnosis: "Dengue", visitDate: "2025-11-11" },
  { name: "Mason Castillo", age: 39, city: "Tandag City", diagnosis: "Typhoid", visitDate: "2025-11-11" },
  { name: "Ava Navarro", age: 26, city: "Bislig City", diagnosis: "Hepatitis A", visitDate: "2025-11-12" },
  { name: "Noah Santos", age: 34, city: "Cabadbaran City", diagnosis: "Cholera", visitDate: "2025-11-12" },
  { name: "Lily Dela Cruz", age: 31, city: "Butuan City", diagnosis: "Typhoid", visitDate: "2025-11-13" },
  { name: "James Perez", age: 43, city: "Surigao City", diagnosis: "Dengue", visitDate: "2025-11-13" },
  { name: "Ella Tan", age: 28, city: "Bayugan City", diagnosis: "Hepatitis A", visitDate: "2025-11-14" }
];


// Chart instances
let barChart, pieChart, lineChart;

// Filtered patients
function getFilteredPatients() {
  const city = document.getElementById('filterCity').value;
  const disease = document.getElementById('filterDisease').value;
  const startDate = document.getElementById('filterStart').value;
  const endDate = document.getElementById('filterEnd').value;

  return patients.filter(p => {
    let match = true;
    if (city !== "All") match = match && p.city === city;
    if (disease !== "All") match = match && p.diagnosis === disease;
    if (startDate) match = match && p.visitDate >= startDate;
    if (endDate) match = match && p.visitDate <= endDate;
    return match;
  });
}

// Update charts
function updateCharts() {
  const filteredPatients = getFilteredPatients();
  const diagnoses = [...new Set(filteredPatients.map(p => p.diagnosis))];
  const cities = [...new Set(filteredPatients.map(p => p.city))];
  const dates = [...new Set(filteredPatients.map(p => p.visitDate))].sort();

  const barData = diagnoses.map(d => filteredPatients.filter(p => p.diagnosis === d).length);
  const pieData = cities.map(c => filteredPatients.filter(p => p.city === c).length);
  const lineData = dates.map(d => filteredPatients.filter(p => p.visitDate === d).length);

  const barColors = ['#2E7D32','#388E3C','#4CAF50','#81C784'];
  const pieColors = ['#66BB6A','#388E3C','#A5D6A7','#C8E6C9','#A7D6C0','#4CAF50'];

  if (barChart) barChart.destroy();
  if (pieChart) pieChart.destroy();
  if (lineChart) lineChart.destroy();

  // Bar chart
  const ctxBar = document.getElementById('barChart').getContext('2d');
  barChart = new Chart(ctxBar, {
    type: 'bar',
    data: { labels: diagnoses, datasets: [{ label: 'Active Cases', data: barData, backgroundColor: barColors }] },
    options: { responsive: true, plugins: { legend: { display: false } } }
  });

  // Pie chart with drill-down
  const ctxPie = document.getElementById('pieChart').getContext('2d');
  pieChart = new Chart(ctxPie, {
    type: 'pie',
    data: { labels: cities, datasets: [{ label: 'Cases by City', data: pieData, backgroundColor: pieColors }] },
    options: {
      responsive: true,
      onClick: (e, elements) => {
        if (elements.length > 0) {
          const idx = elements[0].index;
          const cityClicked = cities[idx];
          showPatientsModal(filteredPatients.filter(p => p.city === cityClicked));
        }
      }
    }
  });

  // from chart.js
  const ctxLine = document.getElementById('lineChart').getContext('2d');
  lineChart = new Chart(ctxLine, {
    type: 'line',
    data: { labels: dates, datasets: [{ label: 'Daily Cases', data: lineData, fill: false, borderColor: '#2E7D32', tension: 0.3 }] },
    options: { responsive: true }
  });
}

// show patient
function showPatientsModal(patientList) {
  let content = 'Patients:\n\n';
  patientList.forEach(p => {
    content += `${p.name} | ${p.age} | ${p.city} | ${p.diagnosis} | ${p.visitDate}\n`;
  });
  alert(content);
}

// Handle Add Patient form
document.getElementById('patientForm').addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('name').value;
  const age = parseInt(document.getElementById('age').value);
  const city = document.getElementById('city').value;
  const diagnosis = document.getElementById('diagnosis').value;
  const visitDate = document.getElementById('visitDate').value;

  patients.push({ name, age, city, diagnosis, visitDate });

  this.reset();
  updateCharts();
});

// Apply filters
document.getElementById('applyFilters').addEventListener('click', updateCharts);

// Initial render
updateCharts();
