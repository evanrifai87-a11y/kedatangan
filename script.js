// ===== LOGIN LOGIC =====
function login() {
  let user = document.getElementById("username").value.trim();
  let pass = document.getElementById("password").value.trim();
  let pesan = document.getElementById("pesan");

  if (user === "siswa" && pass === "12345") {
    localStorage.setItem("userLogin", user);
    window.location.href = "analisis.html";
  } else {
    pesan.textContent = "❌ Nama atau password salah!";
  }
}

// Jika halaman login dan sudah login → arahkan ke analisis
if (window.location.pathname.includes("index.html") && localStorage.getItem("userLogin")) {
  window.location.href = "analisis.html";
}

// ===== ANALISIS HALAMAN =====
if (window.location.pathname.includes("analisis.html")) {
  let user = localStorage.getItem("userLogin");
  if (!user) {
    window.location.href = "index.html";
  } else {
    document.getElementById("user").textContent = "Halo, " + user + " 👋";
  }
}

function logout() {
  localStorage.removeItem("userLogin");
  window.location.href = "index.html";
}

// ===== LOGIKA ANALISIS + POPUP =====
function analisisKedatangan() {
  let nama = document.getElementById("namaSiswa").value.trim();
  let kelas = document.getElementById("kelas").value.trim();
  let jamInput = document.getElementById("jamDatang").value.trim();
  let hasilEl = document.getElementById("hasil");
  let popup = document.getElementById("popup");

  if (!nama || !kelas || !jamInput) {
    hasilEl.innerHTML = "⚠️ Silakan isi semua data terlebih dahulu!";
    hasilEl.className = "text-yellow-600";
    popup.classList.remove("hidden");
    return;
  }

  let [jam, menit] = jamInput.split(".").map(Number);
  if (isNaN(jam) || isNaN(menit)) {
    hasilEl.innerHTML = "❌ Format jam salah! Gunakan titik, contoh: 06.40";
    hasilEl.className = "text-red-600";
    popup.classList.remove("hidden");
    return;
  }

  let totalMenit = jam * 60 + menit;
  let batasWaktu = 6 * 60 + 45; // 06.45 = 405 menit

  if (totalMenit <= batasWaktu) {
    hasilEl.innerHTML = `
      ✅ <span class="text-green-600">${nama}</span> dari kelas <span class="text-indigo-600">${kelas}</span>
      datang <span class="text-green-600">tepat waktu</span> pukul ${jamInput} 🎉
    `;
    hasilEl.className = "text-green-600";
  } else {
    hasilEl.innerHTML = `
      🚨 <span class="text-red-600">${nama}</span> dari kelas <span class="text-indigo-600">${kelas}</span>
      datang <span class="text-red-600">terlambat</span> pada ${jamInput} 😅
    `;
    hasilEl.className = "text-red-600";
  }

  popup.classList.remove("hidden");
}

function tutupPopup() {
  document.getElementById("popup").classList.add("hidden");
}

