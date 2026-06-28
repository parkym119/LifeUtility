const birthDateInput = document.getElementById("birthDate");
const calculateBtn = document.getElementById("calculateBtn");
const resultBox = document.getElementById("resultBox");
const menuButtons = document.querySelectorAll(".menu-btn");
const panels = document.querySelectorAll(".panel");
const generateLottoBtn = document.getElementById("generateLottoBtn");
const lottoResult = document.getElementById("lottoResult");
const recentHistory = document.getElementById("recentHistory");
const historyAnalysis = document.getElementById("historyAnalysis");
const bmiHeightInput = document.getElementById("bmiHeight");
const bmiWeightInput = document.getElementById("bmiWeight");
const calculateBmiBtn = document.getElementById("calculateBmiBtn");
const bmiResult = document.getElementById("bmiResult");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const calculateDateBtn = document.getElementById("calculateDateBtn");
const dateResult = document.getElementById("dateResult");
const tipAmountInput = document.getElementById("tipAmount");
const tipPercentInput = document.getElementById("tipPercent");
const peopleCountInput = document.getElementById("peopleCount");
const calculateTipBtn = document.getElementById("calculateTipBtn");
const tipResult = document.getElementById("tipResult");

function calculateKoreanAge(birthDateValue) {
  if (!birthDateValue) {
    return null;
  }

  const birthDate = new Date(birthDateValue + "T00:00:00");
  const today = new Date();
  const thisYearBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

  return today.getFullYear() - birthDate.getFullYear() - (today < thisYearBirthday ? 1 : 0);
}

function renderResult() {
  const value = birthDateInput.value;
  if (!value) {
    resultBox.innerHTML = '<div>생년월일을 입력해 주세요.</div>';
    return;
  }

  const age = calculateKoreanAge(value);
  if (age === null || age < 0) {
    resultBox.innerHTML = '<div>올바른 날짜를 입력해 주세요.</div>';
    return;
  }

  const formattedDate = new Date(value + "T00:00:00").toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const eligibility = [
    { label: "투표권", ageLimit: 18, available: age >= 18 },
    { label: "음주", ageLimit: 19, available: age >= 19 },
    { label: "담배", ageLimit: 19, available: age >= 19 },
    { label: "운전면허", ageLimit: 18, available: age >= 18 },
    { label: "원동기면허", ageLimit: 16, available: age >= 16 }
  ];

  const statusItems = eligibility
    .map(
      (item) => `
        <div class="status-item">
          <strong>${item.label}</strong>: ${item.available ? "가능" : "불가"} (${item.ageLimit}세 이상)
        </div>
      `
    )
    .join("");

  resultBox.innerHTML = `
    <strong>${age}세</strong>
    <div class="small">입력하신 생년월일: ${formattedDate}</div>
    <div class="small">현재 기준 만나이입니다.</div>
    <div class="status-list">${statusItems}</div>
  `;
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function generateSingleSet() {
  const numbers = shuffle(Array.from({ length: 45 }, (_, index) => index + 1));
  const selected = [];

  for (const number of numbers) {
    if (selected.length === 6) {
      break;
    }

    const lastNumber = selected[selected.length - 1];
    if (lastNumber && Math.abs(lastNumber - number) === 1) {
      continue;
    }

    selected.push(number);
  }

  if (selected.length < 6) {
    return generateSingleSet();
  }

  const mainNumbers = selected.sort((a, b) => a - b);

  return { mainNumbers };
}

function generateRecentDraws(count = 10) {
  const draws = [];

  for (let index = 0; index < count; index += 1) {
    const draw = generateSingleSet();
    draws.push({
      round: 1100 + index,
      mainNumbers: draw.mainNumbers
    });
  }

  return draws;
}

function renderRecentHistory(draws) {
  recentHistory.innerHTML = draws
    .map((draw, index) => `
      <div class="history-item">
        <div class="history-head">
          <span class="history-round">${draw.round}회</span>
          <span class="history-badge">${index === 0 ? "최근" : "분석"}</span>
        </div>
        <div class="lotto-numbers">
          ${draw.mainNumbers.map((number) => `<span class="lotto-number">${number}</span>`).join("")}
        </div>
      </div>
    `)
    .join("");
}

function renderHistoryAnalysis(draws) {
  const allNumbers = draws.flatMap((draw) => draw.mainNumbers);
  const frequency = allNumbers.reduce((acc, number) => {
    acc[number] = (acc[number] || 0) + 1;
    return acc;
  }, {});

  const topNumbers = Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([number]) => number);

  const oddCount = allNumbers.filter((number) => number % 2 === 1).length;
  const evenCount = allNumbers.filter((number) => number % 2 === 0).length;

  historyAnalysis.innerHTML = `
    <div class="analysis-chip">자주 나온 번호: ${topNumbers.join(", ")}</div>
    <div class="analysis-chip">홀수 ${oddCount}개 / 짝수 ${evenCount}개</div>
    <div class="analysis-chip">최근 흐름: 번호 분산형</div>
    <div class="analysis-chip">추천 포인트: 연속 번호 제외</div>
  `;
}

function generateLottoSets() {
  const recentDraws = generateRecentDraws();
  renderRecentHistory(recentDraws);
  renderHistoryAnalysis(recentDraws);

  const sets = Array.from({ length: 5 }, () => generateSingleSet());
  lottoResult.innerHTML = sets
    .map(
      (set, index) => `
        <div class="lotto-ticket">
          <strong>추천 ${index + 1}</strong>
          <div class="lotto-numbers">
            ${set.mainNumbers.map((number) => `<span class="lotto-number">${number}</span>`).join("")}
          </div>
        </div>
      `
    )
    .join("");
}

function renderBmiResult() {
  const height = Number(bmiHeightInput.value);
  const weight = Number(bmiWeightInput.value);

  if (!height || !weight || height <= 0 || weight <= 0) {
    bmiResult.innerHTML = '<div>키와 몸무게를 올바르게 입력해 주세요.</div>';
    return;
  }

  const bmi = weight / ((height / 100) ** 2);
  let category = "정상";

  if (bmi < 18.5) {
    category = "저체중";
  } else if (bmi < 23) {
    category = "정상";
  } else if (bmi < 25) {
    category = "과체중";
  } else if (bmi < 30) {
    category = "비만";
  } else {
    category = "고도비만";
  }

  bmiResult.innerHTML = `
    <strong>BMI ${bmi.toFixed(1)}</strong>
    <div class="small">분류: ${category}</div>
    <div class="small">표준 범위는 보통 18.5~22.9입니다.</div>
  `;
}

function renderDateDifference() {
  const startDate = startDateInput.value;
  const endDate = endDateInput.value;

  if (!startDate || !endDate) {
    dateResult.innerHTML = '<div>두 날짜를 모두 선택해 주세요.</div>';
    return;
  }

  const start = new Date(startDate + "T00:00:00");
  const end = new Date(endDate + "T00:00:00");
  const diffDays = Math.abs(Math.round((end - start) / (1000 * 60 * 60 * 24)));
  const weeks = Math.floor(diffDays / 7);

  dateResult.innerHTML = `
    <strong>${diffDays}일 차이</strong>
    <div class="small">약 ${weeks}주 차이입니다.</div>
  `;
}

function renderTipResult() {
  const amount = Number(tipAmountInput.value);
  const percent = Number(tipPercentInput.value);
  const people = Number(peopleCountInput.value);

  if (!amount || amount < 0 || !percent || percent < 0 || !people || people <= 0) {
    tipResult.innerHTML = '<div>금액, 팁 비율, 인원 수를 올바르게 입력해 주세요.</div>';
    return;
  }

  const tipAmount = amount * (percent / 100);
  const totalAmount = amount + tipAmount;
  const perPerson = totalAmount / people;

  tipResult.innerHTML = `
    <strong>1인당 ${perPerson.toLocaleString()}원</strong>
    <div class="small">팁: ${tipAmount.toLocaleString()}원</div>
    <div class="small">총 결제 금액: ${totalAmount.toLocaleString()}원</div>
  `;
}

menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    menuButtons.forEach((item) => item.classList.remove("active"));
    panels.forEach((panel) => panel.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(`${button.dataset.target}-panel`).classList.add("active");
  });
});

calculateBtn.addEventListener("click", renderResult);
birthDateInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    renderResult();
  }
});
birthDateInput.addEventListener("change", renderResult);
generateLottoBtn.addEventListener("click", generateLottoSets);
calculateBmiBtn.addEventListener("click", renderBmiResult);
bmiHeightInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    renderBmiResult();
  }
});
bmiWeightInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    renderBmiResult();
  }
});
calculateDateBtn.addEventListener("click", renderDateDifference);
startDateInput.addEventListener("change", renderDateDifference);
endDateInput.addEventListener("change", renderDateDifference);
calculateTipBtn.addEventListener("click", renderTipResult);
tipAmountInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    renderTipResult();
  }
});
tipPercentInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    renderTipResult();
  }
});
peopleCountInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    renderTipResult();
  }
});

renderResult();
generateLottoSets();
renderBmiResult();
renderDateDifference();
renderTipResult();
