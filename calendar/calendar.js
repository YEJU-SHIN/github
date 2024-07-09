const currentMonthElement = document.getElementById('current-month');
const calendarBody = document.getElementById('calendar-body');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');


const now = new Date();

function todaysdate() {
    const today = {
        todayyear: now.getFullYear(),
        todaydate: now.getDate(),
        todayyear: now.toLocaleDateString('ko-KO', {year: 'numeric'}),
        todaymonth: now.toLocaleDateString('ko-KO', {month: 'short'}),
        todaydate: now.toLocaleDateString('ko-KO', {day: 'numeric'}),
        todayofweek: now.toLocaleDateString('ko-KO', {weekday: 'short'})
    }

    for (let key in today) {
        document.getElementById(key).textContent= today[key];
    }
}
todaysdate()

let currentDate = new Date();

function renderCalendar() {
    // 월의 첫날과 마지막 날 구하기
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const firstDayIndex = firstDay.getDay();
    const lastDate = lastDay.getDate();

    // 월과 연도 표시
    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    currentMonthElement.textContent = `${currentDate.getFullYear()}년 ${monthNames[currentDate.getMonth()]} `;

    // 달력 초기화
    calendarBody.innerHTML = '';

    // 날짜 추가
    let date = 1;
    for (let i = 0; i < 5; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            if (i === 0 && j < firstDayIndex) {
                cell.textContent = '';
            } else if (date > lastDate) {
                cell.textContent = '';
            } else {
                cell.textContent = date;
                date++;
            }
            row.appendChild(cell);
        }

        calendarBody.appendChild(row);
    }

            
}

prevMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

renderCalendar();