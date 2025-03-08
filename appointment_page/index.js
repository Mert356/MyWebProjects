/*Fake Datalar*/
let departments = [
    {
        id: 1,
        isim: 'Oral Diagnoz ve Radyolojisi',
        doctors: [
            { id: 1, isim: 'Prof. Dr. Ayşe Yılmaz', hours: ['08:00', '09:00', '10:00'] },
            { id: 2, isim: 'Doç. Dr. Mehmet Kaya', hours: ['11:00', '12:00', '13:00'] }
        ]
    },
    {
        id: 2,
        isim: 'Restoratif Diş Tedavisi',
        doctors: [
            { id: 3, isim: 'Prof. Dr. Zeynep Demir', hours: ['09:30', '10:30', '11:30'] },
            { id: 4, isim: 'Doç. Dr. Ahmet Güneş', hours: ['14:00', '15:00', '16:00'] }
        ]
    },
    {
        id: 3,
        isim: 'Ağız, Diş ve Çene Cerrahisi',
        doctors: [
            { id: 5, isim: 'Prof. Dr. Mert Çelik', hours: ['08:30', '09:30', '10:30'] },
            { id: 6, isim: 'Prof. Dr. Onur ÇELİK', hours: ['13:00', '14:00', '15:00'] }
        ]
    },
    {
        id: 4,
        isim: 'Endodonti',
        doctors: [
            { id: 7, isim: 'Prof. Dr. Hasan Yıldız', hours: ['09:00', '10:00', '11:00'] },
            { id: 8, isim: 'Doç. Dr. Duygu Koç', hours: ['12:30', '13:30', '14:30'] }
        ]
    },
    {
        id: 5,
        isim: 'Pedodonti Kanal',
        doctors: [
            { id: 9, isim: 'Doç. Dr. Cem Şahin', hours: ['08:00', '09:00', '10:00'] },
            { id: 10, isim: 'Dr. Öğr. Üyesi Nuran Aksoy', hours: ['11:00', '12:00', '13:00'] }
        ]
    },
    {
        id: 6,
        isim: 'Pedodonti',
        doctors: [
            { id: 11, isim: 'Prof. Dr. Fatma Öztürk', hours: ['09:30', '10:30', '11:30'] },
            { id: 12, isim: 'Doç. Dr. Özgür Yılmaz', hours: ['14:00', '15:00', '16:00'] }
        ]
    },
    {
        id: 7,
        isim: 'Periodontoloji',
        doctors: [
            { id: 13, isim: 'Prof. Dr. Hülya Korkmaz', hours: ['08:30', '09:30', '10:30'] },
            { id: 14, isim: 'Doç. Dr. Ali Güven', hours: ['13:00', '14:00', '15:00'] }
        ]
    },
    {
        id: 8,
        isim: 'Ortodonti',
        doctors: [
            { id: 15, isim: 'Prof. Dr. Melike Eren', hours: ['09:00', '10:00', '11:00'] },
            { id: 16, isim: 'Doç. Dr. Serkan Yıldız', hours: ['12:30', '13:30', '14:30'] }
        ]
    }
];
const days = getWeekDays(13);
let dailyAppointments = {};
let appointmentDates = [];
let appointmentId = 1;

for (let i = 0; i < 13; i++) {
    appointmentDates.push(days[i].date);
}
/*Toggle drawer kısmı */
const sideBarButton = document.getElementById("sideBarButton");
const drawer = document.getElementById("drawer");

sideBarButton.addEventListener("click", () => {
    drawer.classList.toggle("open");
});

document.addEventListener("click", (event) => {
    if (!drawer.contains(event.target) && event.target !== sideBarButton) {
        drawer.classList.remove("open");
    }
});
//------------------------------------------------------------------------------------
appointmentDates.forEach(date => {
    dailyAppointments[date] = [];
    let usedDoctors = new Set();

    while (dailyAppointments[date].length < 10) {
        let department = departments[Math.floor(Math.random() * departments.length)];
        let doctor = department.doctors[Math.floor(Math.random() * department.doctors.length)];

        if (usedDoctors.has(doctor.isim)) continue;
        usedDoctors.add(doctor.isim);

        let time = doctor.hours[Math.floor(Math.random() * doctor.hours.length)];

        dailyAppointments[date].push({
            id: appointmentId++,
            klinik: department.isim,
            doktor: doctor.isim,
            tarih: date,
            saat: time
        });
    }
});

/*Hafta İçi Günlerini Alma*/
function getWeekDays(count) {
    let weekdays = [];
    const today = new Date();

    while (weekdays.length < count) {
        if (today.getDay() >= 1 && today.getDay() <= 5) {
            weekdays.push({
                name: today.toLocaleString("tr", { weekday: "long" }),
                date: today.toLocaleDateString()
            });
        }
        today.setDate(today.getDate() + 1);
    }

    return weekdays;
}

/*Günleri Listeleme*/
let count = 0;
const daysContainer = document.getElementById("days");
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");

function updateButtons() {
    daysContainer.innerHTML = '';

    for (let i = count; i < count + 5 && i < days.length; i++) {
        const dayButton = document.createElement("button");
        dayButton.classList.add("day");
        dayButton.value = days[i].date;
        dayButton.innerHTML = `<p>${days[i].name}</p><p>${days[i].date}</p>`;

        dayButton.addEventListener("click", () => {
            document.querySelectorAll(".day").forEach(btn => btn.classList.remove("selected"));
            dayButton.classList.add("selected");
            filterAppointments();
        });

        daysContainer.appendChild(dayButton);
    }
}

leftButton.addEventListener('click', () => {
    if (count > 0) {
        count -= 5;
        updateButtons();
    }
});

rightButton.addEventListener('click', () => {
    if (count + 5 < days.length) {
        count += 5;
        updateButtons();
    }
});

updateButtons();

/*Filtreleme*/
const departmentSelectContainer = document.getElementById("departments");
const doctorSelectContainer = document.getElementById("doctors");
const hourSelectContainer = document.getElementById("hours");

departments.forEach((department) => {
    const departmentOption = document.createElement("option");
    departmentOption.textContent = department.isim;
    departmentOption.value = department.id;
    departmentSelectContainer.appendChild(departmentOption);
});

departmentSelectContainer.addEventListener("change", (event) => {
    doctorSelectContainer.innerHTML = '<option value="">Doktor Seçin</option>';
    hourSelectContainer.innerHTML = '<option value="">Saat Seçin</option>';

    const selectedDepartmentId = event.target.value;
    if (selectedDepartmentId) {
        const doctors = departments.find(dep => dep.id == selectedDepartmentId)?.doctors || [];
        doctors.forEach((doctor) => {
            const doctorOption = document.createElement("option");
            doctorOption.textContent = doctor.isim;
            doctorOption.value = doctor.id;
            doctorSelectContainer.appendChild(doctorOption);
        });
    }

    filterAppointments();
});

doctorSelectContainer.addEventListener("change", (event) => {
    hourSelectContainer.innerHTML = '<option value="">Saat Seçin</option>';

    const selectedDepartmentId = departmentSelectContainer.value;
    const selectedDoctorId = event.target.value;

    if (selectedDepartmentId && selectedDoctorId) {
        const doctors = departments.find(dep => dep.id == selectedDepartmentId)?.doctors || [];
        const selectedDoctor = doctors.find(doc => doc.id == selectedDoctorId);
        selectedDoctor?.hours.forEach((hour) => {
            const hourOption = document.createElement("option");
            hourOption.textContent = hour;
            hourOption.value = hour;
            hourSelectContainer.appendChild(hourOption);
        });
    }

    filterAppointments();
});

hourSelectContainer.addEventListener("change", filterAppointments);

/*Filtreleme Fonksiyonu*/
function filterAppointments() {
    const selectedDate = document.querySelector(".day.selected")?.value;
    console.log("Seçili Tarih:", selectedDate);

    if (!selectedDate) selectedDate = days[0].date;

    let filteredAppointments = dailyAppointments[selectedDate] || [];
    console.log("Seçili Güne Ait Randevular:", filteredAppointments);

    const selectedDepartmentId = departmentSelectContainer.value;
    const selectedDoctorId = doctorSelectContainer.value;
    const selectedHour = hourSelectContainer.value;

    console.log("Seçili Departman ID:", selectedDepartmentId);
    console.log("Seçili Doktor ID:", selectedDoctorId);
    console.log("Seçili Saat:", selectedHour);

    //filtre yoksa tüm randevuları göster
    if (selectedDepartmentId=="0" && selectedDoctorId=="0" && selectedHour=="0") {
        displayAppointments(filteredAppointments);
        return;
    }
    console.log("Filtrelenmis Randevular:", filteredAppointments);
    //Departman filtresi
    if (selectedDepartmentId) {
        filteredAppointments = filteredAppointments.filter(a =>
            departments.some(d => d.id === parseInt(selectedDepartmentId) && d.isim === a.klinik)
        );
    }
    console.log(filteredAppointments)
    //Doktor filtresi
    if (selectedDoctorId) {
        filteredAppointments = filteredAppointments.filter(a =>
            departments.some(d =>
                d.doctors.some(doc => doc.id === parseInt(selectedDoctorId) && doc.isim === a.doktor)
            )
        );
    }

    //Saat filtresi
    if (selectedHour) {
        filteredAppointments = filteredAppointments.filter(a => a.saat === selectedHour);
    }

    console.log("Filtrelenmiş Randevular:", filteredAppointments);
    displayAppointments(filteredAppointments);
}

/*Randevuları Listeleme*/
function displayAppointments(appointments) {
    const appointmentsContainer = document.getElementById("appointments");
    appointmentsContainer.innerHTML = '';

    if (appointments.length === 0) {
        appointmentsContainer.innerHTML = "<p>Randevu Bulunamadı</p>";
        return;
    }

    appointments.forEach((appointment) => {
        const appointmentCard = document.createElement("div");
        appointmentCard.classList.add("appointmentCard");
        appointmentCard.innerHTML = 
            `<img src="./images/doctor.png" alt="doctor" id="doctorImage">
            <div id="informations">
                <p id="department">Klinik: ${appointment.klinik}</p>
                <p id="doctorName">Doktor: ${appointment.doktor}</p>
                <p id="date">Tarih: ${appointment.tarih}</p>
                <p id="hour">Saat: ${appointment.saat}</p>
            </div>
            <button type="submit" id="appointmentButton" value=${appointment.id}>Randevu Al</button>
        `;
        appointmentsContainer.appendChild(appointmentCard);
    });
}

