const projects = [
    { title: "GTA VI", type: "Игра", releaseDate: "2025-04-01", poster: "gta.jpg" },
    { title: "Мстители: Династия Канга", type: "Фильм", releaseDate: "2026-05-01", poster: "avengers.jpg" },
    { title: "Ведьмак 4", type: "Игра", releaseDate: "2026-12-01", poster: "witcher.jpg" },
    { title: "Супермен: Наследие", type: "Фильм", releaseDate: "2025-07-11", poster: "superman.jpg" }
];

const projectContainer = document.getElementById("projects");

function calculateTimeLeft(date) {
    const release = new Date(date);
    const now = new Date();
    const diff = release - now;

    if (diff < 0) return "Уже вышло!";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days} дней`;
}

function renderProjects(filter = "Все") {
    projectContainer.innerHTML = "";
    projects
        .filter(p => filter === "Все" || p.type === filter)
        .forEach(project => {
            const element = document.createElement("div");
            element.classList.add("project");
            element.innerHTML = `<img src="${project.poster}" alt="${project.title}">
                                 <div><h2>${project.title}</h2>
                                 <p>${project.type}</p>
                                 <p>Выход через: <strong>${calculateTimeLeft(project.releaseDate)}</strong></p></div>`;
            element.onclick = () => openModal(project);
            projectContainer.appendChild(element);
        });
}

document.querySelectorAll(".filter-btn").forEach(btn => 
    btn.addEventListener("click", () => renderProjects(btn.dataset.filter))
);

document.querySelector(".menu-btn").addEventListener("click", () => {
    document.querySelector(".sidebar").classList.add("open");
});

document.querySelector(".close-btn").addEventListener("click", () => {
    document.querySelector(".sidebar").classList.remove("open");
});

function openModal(project) {
    document.querySelector(".modal").style.display = "flex";
    document.getElementById("modal-title").innerText = project.title;
    document.getElementById("modal-date").innerText = `Дата выхода: ${project.releaseDate}`;
}

document.querySelector(".close-modal").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "none";
});

renderProjects();
