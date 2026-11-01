// ĐÃ SỬA: Thống nhất tên biến là API_KEY viết hoa để không bị lỗi undefined ở dưới
const API_KEY = "b24c1d87b2adb99a01610dd222d58275";

// ĐÃ SỬA: Đổi tên hàm thành getWeather() để khớp với nút bấm onclick trong HTML
async function getWeather() {
    const city = document.getElementById("city").value;

    if (city.trim() === "") {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=vi&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    // Kiểm tra nếu không tìm thấy thành phố (status code khác 2xx)
    if (!response.ok) {
        // ĐÃ SỬA: Đổi từ innerHTML(...) thành innerHTML = "..."
        document.getElementById("result").innerHTML = "<p class='text-danger'>City not found!</p>";
        return;
    }

    displayWeather(data);
}

// Hiển thị thông tin thời tiết
function displayWeather(data) {
    document.getElementById("city").value = data.name;

    document.getElementById("result").innerHTML = `
        <h3>${data.name}</h3>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        <h1>${Math.round(data.main.temp)}°C</h1>
        <p class="text-capitalize">${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind: ${data.wind.speed} m/s</p>
    `;

    console.log(data);
}

