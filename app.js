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
const unitValueInput = document.getElementById("unitValue");
const unitTypeSelect = document.getElementById("unitType");
const calculateUnitBtn = document.getElementById("calculateUnitBtn");
const unitResult = document.getElementById("unitResult");
const discountAmountInput = document.getElementById("discountAmount");
const discountPercentInput = document.getElementById("discountPercent");
const calculateDiscountBtn = document.getElementById("calculateDiscountBtn");
const discountResult = document.getElementById("discountResult");
const passwordLengthInput = document.getElementById("passwordLength");
const includeUppercaseInput = document.getElementById("includeUppercase");
const includeNumbersInput = document.getElementById("includeNumbers");
const includeSymbolsInput = document.getElementById("includeSymbols");
const generatePasswordBtn = document.getElementById("generatePasswordBtn");
const passwordResult = document.getElementById("passwordResult");
const clockElement = document.getElementById("clock");
const weatherGrid = document.getElementById("weatherGrid");
const weatherMap = document.getElementById("weatherMap");
const calcDisplay = document.getElementById("calcDisplay");
const calcKeypad = document.getElementById("calcKeypad");
const calculatorShell = document.querySelector(".calculator-shell");
const calcTabButtons = document.querySelectorAll(".tab-btn");
let calcMode = "standard";
let calcExpression = "";
const diceTypeSelect = document.getElementById("diceType");
const diceCountSelect = document.getElementById("diceCount");
const rollDiceBtn = document.getElementById("rollDiceBtn");
const diceResult = document.getElementById("diceResult");
const diceParticles = document.getElementById("diceParticles");
const ladderPeopleInput = document.getElementById("ladderPeopleCount");
const startLadderBtn = document.getElementById("startLadderBtn");
const ladderBoard = document.getElementById("ladderBoard");
const ladderResult = document.getElementById("ladderResult");
const dmsDegrees = document.getElementById("dmsDegrees");
const dmsMinutes = document.getElementById("dmsMinutes");
const dmsSeconds = document.getElementById("dmsSeconds");
const dmsDirection = document.getElementById("dmsDirection");
const convertDmsBtn = document.getElementById("convertDmsBtn");
const dmsResult = document.getElementById("dmsResult");
const ddValue = document.getElementById("ddValue");
const ddDirection = document.getElementById("ddDirection");
const convertDdBtn = document.getElementById("convertDdBtn");
const ddResult = document.getElementById("ddResult");
const cbcCodeInput = document.getElementById("cbcCodeInput");
const latLngInput = document.getElementById("latLngInput");
const convertCbcBtn = document.getElementById("convertCbcBtn");
const convertLatLngBtn = document.getElementById("convertLatLngBtn");
const cbcResult = document.getElementById("cbcResult");
const cbcCoordFormat = document.getElementById("cbcCoordFormat");
const cbcOutputFormat = document.getElementById("cbcOutputFormat");
const cbcBandX = { 7: "가", 8: "나", 9: "다", 10: "라", 11: "마", 12: "바", 13: "사" };
const cbcBandY = { 13: "가", 14: "나", 15: "다", 16: "라", 17: "마", 18: "바", 19: "사", 20: "아" };
const cbcGrs80Projection = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";
const cbcWgs84Projection = "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees";

async function copyTextToClipboard(text) {
  if (!text) {
    return false;
  }

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (error) {
    console.warn("Clipboard API failed", error);
  }

  const tempInput = document.createElement("input");
  tempInput.value = text;
  tempInput.setAttribute("readonly", "");
  tempInput.style.position = "fixed";
  tempInput.style.left = "-9999px";
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  return true;
}

passwordResult.addEventListener("click", async (event) => {
  const copyButton = event.target.closest("#copyPasswordBtn");
  if (!copyButton) {
    return;
  }

  const password = copyButton.dataset.password;
  const copied = await copyTextToClipboard(password);

  if (copied) {
    copyButton.textContent = "복사됨";
    copyButton.classList.add("copied");
  }
});

function updateClock() {
  if (!clockElement) {
    return;
  }

  const now = new Date();
  const dateString = now.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
  });
  const timeString = now.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  clockElement.textContent = `${dateString} ${timeString}`;
}

function safeEvalExpression(expression) {
  const normalized = expression
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/√/g, "sqrt(")
    .replace(/\^/g, "**")
    .replace(/\bln\(/g, "log(")
    .replace(/\blog\(/g, "log10(")
    .replace(/\bsin\(/g, "sin(")
    .replace(/\bcos\(/g, "cos(")
    .replace(/\btan\(/g, "tan(")
    .replace(/\bPI\b/g, "PI")
    .replace(/\bE\b/g, "E");

  try {
    return Function(
      "sin,cos,tan,log,log10,sqrt,PI,E",
      `return ${normalized}`
    )(Math.sin, Math.cos, Math.tan, Math.log, Math.log10 || ((x) => Math.log10(x)), Math.sqrt, Math.PI, Math.E);
  } catch (error) {
    return null;
  }
}

function updateCalcDisplay() {
  if (!calcDisplay) {
    return;
  }

  calcDisplay.textContent = calcExpression || "0";
}

function renderCalculatorButtons() {
  if (!calcKeypad) {
    return;
  }

  const standardButtons = [
    { label: "AC", type: "control" },
    { label: "C", type: "control" },
    { label: "(", type: "operator" },
    { label: ")", type: "operator" },
    { label: "7", type: "number" },
    { label: "8", type: "number" },
    { label: "9", type: "number" },
    { label: "÷", type: "operator" },
    { label: "4", type: "number" },
    { label: "5", type: "number" },
    { label: "6", type: "number" },
    { label: "×", type: "operator" },
    { label: "1", type: "number" },
    { label: "2", type: "number" },
    { label: "3", type: "number" },
    { label: "-", type: "operator" },
    { label: "0", type: "number", wide: true },
    { label: ".", type: "number" },
    { label: "=", type: "equal" },
    { label: "+", type: "operator" }
  ];

  const scientificButtons = [
    { label: "AC", type: "control", wide: true },
    { label: "C", type: "control", wide: true },
    { label: "sin(", type: "function" },
    { label: "cos(", type: "function" },
    { label: "tan(", type: "function" },
    { label: "log(", type: "function" },
    { label: "ln(", type: "function" },
    { label: "√", type: "function" },
    { label: "^", type: "operator" },
    { label: "(", type: "operator" },
    { label: ")", type: "operator" },
    { label: "7", type: "number" },
    { label: "8", type: "number" },
    { label: "9", type: "number" },
    { label: "÷", type: "operator" },
    { label: "4", type: "number" },
    { label: "5", type: "number" },
    { label: "6", type: "number" },
    { label: "×", type: "operator" },
    { label: "1", type: "number" },
    { label: "2", type: "number" },
    { label: "3", type: "number" },
    { label: "-", type: "operator" },
    { label: "0", type: "number", wide: true },
    { label: ".", type: "number" },
    { label: "=", type: "equal" },
    { label: "+", type: "operator" }
  ];

  const buttons = calcMode === "scientific" ? scientificButtons : standardButtons;
  if (calculatorShell) {
    calculatorShell.classList.toggle("scientific", calcMode === "scientific");
  }

  calcKeypad.innerHTML = buttons
    .map(({ label, type, wide }) => {
      const classes = ["calc-btn"];
      if (type === "operator") classes.push("operator");
      if (type === "control") classes.push("control");
      if (type === "equal") classes.push("equal");
      if (label === "0") classes.push("zero");
      if (wide) classes.push("wide");
      if (type === "function") classes.push("func");
      return `<button type="button" class="${classes.join(" ")}" data-value="${label}">${label}</button>`;
    })
    .join("");

  calcKeypad.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.value;
      handleCalcInput(value);
    });
  });
}

function handleCalcInput(value) {
  if (value === "AC") {
    calcExpression = "";
    updateCalcDisplay();
    return;
  }

  if (value === "C") {
    calcExpression = calcExpression.slice(0, -1);
    updateCalcDisplay();
    return;
  }

  if (value === "=") {
    const result = safeEvalExpression(calcExpression);
    calcExpression = result === null ? "오류" : String(result);
    updateCalcDisplay();
    return;
  }

  if (calcExpression === "오류") {
    calcExpression = "";
  }

  calcExpression += value;
  updateCalcDisplay();
}

function switchCalculatorMode(mode) {
  calcMode = mode;
  calcTabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.calcMode === mode);
  });
  calcExpression = "";
  renderCalculatorButtons();
  updateCalcDisplay();
}

calcTabButtons.forEach((button) => {
  button.addEventListener("click", () => switchCalculatorMode(button.dataset.calcMode));
});

renderCalculatorButtons();

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

function renderUnitResult() {
  const value = Number(unitValueInput.value);
  const type = unitTypeSelect.value;

  if (!value || value < 0) {
    unitResult.innerHTML = '<div>환산할 값을 올바르게 입력해 주세요.</div>';
    return;
  }

  const converted = type === "cm-to-inch" ? value / 2.54 : value * 2.20462;
  const label = type === "cm-to-inch" ? "인치" : "파운드";

  unitResult.innerHTML = `
    <strong>${converted.toFixed(2)} ${label}</strong>
    <div class="small">입력값: ${value}${type === "cm-to-inch" ? "cm" : "kg"}</div>
  `;
}

function renderDiscountResult() {
  const price = Number(discountAmountInput.value);
  const percent = Number(discountPercentInput.value);

  if (!price || price < 0 || !percent || percent < 0 || percent > 100) {
    discountResult.innerHTML = '<div>정가와 할인율을 올바르게 입력해 주세요.</div>';
    return;
  }

  const discountAmount = price * (percent / 100);
  const finalPrice = price - discountAmount;

  discountResult.innerHTML = `
    <strong>할인 금액 ${discountAmount.toLocaleString()}원</strong>
    <div class="small">최종 결제 금액: ${finalPrice.toLocaleString()}원</div>
  `;
}

function generatePassword() {
  const length = Number(passwordLengthInput.value);
  const includeUppercase = includeUppercaseInput.checked;
  const includeNumbers = includeNumbersInput.checked;
  const includeSymbols = includeSymbolsInput.checked;

  if (!length || length < 8 || length > 24) {
    passwordResult.innerHTML = '<div>비밀번호 길이는 8~24 사이로 입력해 주세요.</div>';
    return;
  }

  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()-_=+";
  const pool = [lowerChars];

  if (includeUppercase) pool.push(upperChars);
  if (includeNumbers) pool.push(numberChars);
  if (includeSymbols) pool.push(symbolChars);

  if (pool.length === 1) {
    passwordResult.innerHTML = '<div>최소한 한 가지 옵션을 선택해 주세요.</div>';
    return;
  }

  let password = "";
  while (password.length < length) {
    const group = pool[Math.floor(Math.random() * pool.length)];
    password += group[Math.floor(Math.random() * group.length)];
  }

  passwordResult.innerHTML = `
    <div class="password-display-shell">
      <strong>${password}</strong>
      <button id="copyPasswordBtn" class="password-copy-btn" type="button" data-password="${password}">복사</button>
    </div>
    <div class="small">복사해서 바로 사용해 보세요.</div>
  `;
}

function renderWeather() {
  const locations = [
    { name: "서울", temp: "23°C", condition: "맑음", humidity: "44%", level: "sunny" },
    { name: "부산", temp: "25°C", condition: "구름 많음", humidity: "58%", level: "cloudy" },
    { name: "대구", temp: "27°C", condition: "해가림", humidity: "52%", level: "sunny" },
    { name: "제주", temp: "24°C", condition: "비 조금", humidity: "70%", level: "rainy" }
  ];

  weatherGrid.innerHTML = locations
    .map(
      (location) => `
        <div class="weather-card">
          <strong>${location.name}</strong>
          <div>${location.temp}</div>
          <div class="weather-meta">${location.condition}</div>
          <div class="weather-meta">습도 ${location.humidity}</div>
        </div>
      `
    )
    .join("");
}

function createParticles() {
  diceParticles.innerHTML = "";
  Array.from({ length: 16 }, (_, index) => {
    const particle = document.createElement("span");
    particle.className = "dice-particle";
    particle.style.left = `${20 + index * 3}%`;
    particle.style.top = `${40 + (index % 4) * 8}px`;
    particle.style.setProperty("--x", `${(index % 4 - 1.5) * 40}px`);
    particle.style.setProperty("--y", `${-40 - (index % 4) * 16}px`);
    diceParticles.appendChild(particle);
    return particle;
  });
}

function playDiceSound() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(720, audioContext.currentTime + 0.12);
  gainNode.gain.setValueAtTime(0.018, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.0005, audioContext.currentTime + 0.16);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.18);
}

function rollDice() {
  const count = Number(diceCountSelect.value);
  const sides = Number(diceTypeSelect.value);
  const values = Array.from({ length: count }, () => Math.floor(Math.random() * sides) + 1);
  const total = values.reduce((sum, value) => sum + value, 0);

  createParticles();
  playDiceSound();

  diceResult.innerHTML = `
    <div class="dice-grid">
      ${values
        .map(
          (value) => `
            <div class="die rolling">
              <div class="die-face">
                <span class="die-number">${value}</span>
              </div>
            </div>
          `
        )
        .join("")}
    </div>
    <div class="dice-total">총합: ${total}</div>
    <div class="dice-hint">${sides}면체 ${count}개 결과</div>
  `;

  window.setTimeout(() => {
    const diceElements = diceResult.querySelectorAll('.die');
    diceElements.forEach((element) => element.classList.remove('rolling'));
  }, 650);
}

function renderLadderGame() {
  const count = Math.max(2, Math.min(12, Number(ladderPeopleInput.value) || 2));
  const rows = 8;
  const rowHeight = 44;
  const trackHeight = rows * rowHeight + 80;
  const laneWidth = 100 / count;
  const rungs = Array.from({ length: rows }, () =>
    Array.from({ length: count - 1 }, () => Math.random() > 0.45)
  );

  const routeColumns = Array.from({ length: count }, (_, index) => {
    let currentColumn = index;

    rungs.forEach((rowRungs) => {
      const hasRungToRight = currentColumn < count - 1 && rowRungs[currentColumn];
      const hasRungToLeft = currentColumn > 0 && rowRungs[currentColumn - 1];

      if (hasRungToRight) {
        currentColumn += 1;
      } else if (hasRungToLeft) {
        currentColumn -= 1;
      }
    });

    return currentColumn;
  });

  const participants = Array.from({ length: count }, (_, index) => `참가자 ${index + 1}`);
  const outcomes = Array.from({ length: count }, (_, index) => `결과 ${index + 1}`);
  const colors = ["#ff7a59", "#6a7cff", "#2ec4b6", "#f4b400", "#9b5de5", "#00bbf9"];

  ladderBoard.innerHTML = `
    <div class="ladder-stage">
      <div class="ladder-legend">
        <span>랜덤 사다리 판</span>
        <span>토큰이 한 칸씩 아래로 이동합니다</span>
      </div>
      <div class="ladder-track" style="height: ${trackHeight}px;">
        <div class="ladder-rails">
          ${Array.from({ length: count }, (_, index) => `<div class="ladder-rail" style="left: ${((index + 0.5) * laneWidth).toFixed(2)}%;"></div>`).join("")}
        </div>
        <div class="ladder-rows">
          ${rungs
            .map((rowRungs, rowIndex) => {
              const rowTop = 24 + rowIndex * rowHeight;
              return `
                <div class="ladder-row" style="top: ${rowTop}px;">
                  ${rowRungs
                    .map((hasRung, gapIndex) =>
                      hasRung
                        ? `<div class="ladder-rung" style="left: ${((gapIndex + 1) * laneWidth).toFixed(2)}%; width: ${(laneWidth * 1.1).toFixed(2)}%;"></div>`
                        : ""
                    )
                    .join("")}
                </div>
              `;
            })
            .join("")}
        </div>
        <div class="ladder-tokens">
          ${participants
            .map((label, index) => `
              <div class="ladder-token" style="left: ${((index + 0.5) * laneWidth).toFixed(2)}%; top: 24px; --token-color: ${colors[index % colors.length]};" data-name="${label}"></div>
            `)
            .join("")}
        </div>
      </div>
      <div class="ladder-top" style="--cols: ${count};">
        ${participants.map((label) => `<div class="ladder-player">${label}</div>`).join("")}
      </div>
      <div class="ladder-bottom" style="--cols: ${count};">
        ${outcomes.map((label) => `<div class="ladder-outcome">${label}</div>`).join("")}
      </div>
    </div>
  `;

  const tokens = ladderBoard.querySelectorAll(".ladder-token");
  tokens.forEach((token, tokenIndex) => {
    const path = [{ column: tokenIndex, row: 0 }];
    let currentColumn = tokenIndex;

    rungs.forEach((rowRungs, rowIndex) => {
      const hasRungToRight = currentColumn < count - 1 && rowRungs[currentColumn];
      const hasRungToLeft = currentColumn > 0 && rowRungs[currentColumn - 1];

      if (hasRungToRight) {
        currentColumn += 1;
      } else if (hasRungToLeft) {
        currentColumn -= 1;
      }

      path.push({ column: currentColumn, row: rowIndex + 1 });
    });

    let stepIndex = 0;
    const intervalId = window.setInterval(() => {
      if (stepIndex >= path.length) {
        window.clearInterval(intervalId);
        token.classList.remove("active");
        return;
      }

      const point = path[stepIndex];
      token.style.left = `${((point.column + 0.5) * laneWidth).toFixed(2)}%`;
      token.style.top = `${24 + point.row * rowHeight}px`;
      token.classList.add("active");
      stepIndex += 1;
    }, 260);
  });

  ladderResult.innerHTML = `
    <div class="ladder-summary">
      ${participants
        .map((participant, index) => {
          const resultIndex = routeColumns[index];
          return `
            <div class="ladder-summary-item">
              <span>${participant}</span>
              <strong>${outcomes[resultIndex]}</strong>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function convertDmsToDD() {
  const degrees = Number(dmsDegrees.value);
  const minutes = Number(dmsMinutes.value);
  const seconds = Number(dmsSeconds.value);
  const direction = dmsDirection.value;

  if (isNaN(degrees) || isNaN(minutes) || isNaN(seconds)) {
    dmsResult.innerHTML = '<div>도, 분, 초를 올바르게 입력해 주세요.</div>';
    return;
  }

  if (minutes < 0 || minutes >= 60 || seconds < 0 || seconds >= 60) {
    dmsResult.innerHTML = '<div>분과 초는 0~59 범위여야 합니다.</div>';
    return;
  }

  let dd = degrees + minutes / 60 + seconds / 3600;
  if (direction === "S" || direction === "W") {
    dd = -dd;
  }

  const directionLabel = direction === "N" ? "북위" : direction === "S" ? "남위" : direction === "E" ? "동경" : "서경";
  dmsResult.innerHTML = `
    <strong>${dd.toFixed(6)}</strong>
    <div class="small">입력: ${degrees}° ${minutes}' ${seconds}" ${directionLabel}</div>
    <div class="small">십진수 형식으로 변환되었습니다.</div>
  `;
}

function convertDdToDms() {
  const value = Number(ddValue.value);
  const direction = ddDirection.value;

  if (isNaN(value)) {
    ddResult.innerHTML = '<div>십진수 좌표를 올바르게 입력해 주세요.</div>';
    return;
  }

  const absValue = Math.abs(value);
  const degrees = Math.floor(absValue);
  const minutesDecimal = (absValue - degrees) * 60;
  const minutes = Math.floor(minutesDecimal);
  const seconds = (minutesDecimal - minutes) * 60;

  const directionLabel = direction === "N" ? "북위" : direction === "S" ? "남위" : direction === "E" ? "동경" : "서경";
  const dmsString = `${degrees}° ${minutes}' ${seconds.toFixed(2)}"`;

  ddResult.innerHTML = `
    <strong>${dmsString}</strong>
    <div class="small">입력: ${value}</div>
    <div class="small">${directionLabel} 방향으로 변환되었습니다.</div>
  `;
}

function parseCoordinateInput(text) {
  const cleaned = text.trim();
  if (!cleaned) {
    return null;
  }

  const ddMatch = cleaned.match(/^-?\d+(?:\.\d+)?\s*,\s*-?\d+(?:\.\d+)?$/);
  if (ddMatch) {
    const [latText, lngText] = cleaned.split(",").map((item) => item.trim());
    return {
      lat: Number(latText),
      lng: Number(lngText),
      format: "dd"
    };
  }

  const dmsMatch = cleaned.match(/^-?\d+°?\s*\d+'?\s*\d+(?:\.\d+)?"?\s*,\s*-?\d+°?\s*\d+'?\s*\d+(?:\.\d+)?"?$/);
  if (dmsMatch) {
    const segments = cleaned.split(",").map((item) => item.trim());
    const parseDms = (value) => {
      const match = value.match(/(-?)(\d+)°?\s*(\d+)'?\s*(\d+(?:\.\d+)?)"?/);
      if (!match) {
        return null;
      }
      const sign = match[1] === "-" ? -1 : 1;
      return sign * (Number(match[2]) + Number(match[3]) / 60 + Number(match[4]) / 3600);
    };

    const lat = parseDms(segments[0]);
    const lng = parseDms(segments[1]);
    if (lat !== null && lng !== null) {
      return { lat, lng, format: "dms" };
    }
  }

  return null;
}

function formatCoordinate(value, format) {
  if (format === "dms") {
    const absValue = Math.abs(value);
    const degrees = Math.floor(absValue);
    const minutesDecimal = (absValue - degrees) * 60;
    const minutes = Math.floor(minutesDecimal);
    const seconds = (minutesDecimal - minutes) * 60;
    const sign = value < 0 ? "-" : "";
    return `${sign}${degrees}° ${minutes}' ${seconds.toFixed(2)}"`;
  }

  return `${value.toFixed(6)}`;
}

function copyCbcCoordinate(text, button) {
  if (!text || !button) {
    return;
  }

  const resetCopyText = () => {
    button.textContent = button.dataset.originalText;
    button.disabled = false;
  };

  button.disabled = true;
  button.textContent = "복사됨";

  navigator.clipboard.writeText(text).catch(() => {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    tempInput.setAttribute("readonly", "");
    tempInput.style.position = "fixed";
    tempInput.style.left = "-9999px";
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  }).finally(() => {
    window.setTimeout(resetCopyText, 1000);
  });
}

function openMapService(lat, lng, service, label = "위치") {
  const encodedLat = Number(lat).toFixed(6);
  const encodedLng = Number(lng).toFixed(6);
  const urls = {
    kakao: `https://map.kakao.com/link/map/${encodeURIComponent(label)},${encodedLat},${encodedLng}`,
    google: `https://www.google.com/maps?q=${encodedLat},${encodedLng}`,
    naver: `https://map.naver.com/v5/search/${encodedLat},${encodedLng}`
  };

  window.open(urls[service], "_blank", "noopener,noreferrer");
}

function renderCbcResult({ code, firstNumber, secondNumber, lat, lng, outputFormat }) {
  const ddLatText = `${Number(lat).toFixed(6)}`;
  const ddLngText = `${Number(lng).toFixed(6)}`;
  const dmsLatText = formatCoordinate(lat, "dms");
  const dmsLngText = formatCoordinate(lng, "dms");
  const ddCopyText = `${ddLatText}, ${ddLngText}`;
  const dmsCopyText = `${dmsLatText}, ${dmsLngText}`;

  cbcResult.innerHTML = `
    <div class="cbc-result-content">
      <strong>십진(DD): 위도 ${ddLatText} / 경도 ${ddLngText}</strong>
      <div class="small">도분초(DMS): 위도 ${dmsLatText} / 경도 ${dmsLngText}</div>
      <div class="small">입력 코드: ${code} ${firstNumber} ${secondNumber}</div>
      <div class="cbc-actions">
        <button type="button" data-copy="${ddCopyText}" data-original-text="복사 (DD)">복사 (DD)</button>
        <button type="button" data-copy="${dmsCopyText}" data-original-text="복사 (DMS)">복사 (DMS)</button>
        <button type="button" data-map="kakao" data-lat="${lat}" data-lng="${lng}">카카오지도</button>
        <button type="button" data-map="google" data-lat="${lat}" data-lng="${lng}">구글지도</button>
        <button type="button" data-map="naver" data-lat="${lat}" data-lng="${lng}">네이버지도</button>
      </div>
    </div>
  `;

  cbcResult.querySelectorAll("button[data-copy]").forEach((button) => {
    button.addEventListener("click", () => copyCbcCoordinate(button.dataset.copy, button));
  });

  cbcResult.querySelectorAll("button[data-map]").forEach((button) => {
    button.addEventListener("click", () => openMapService(button.dataset.lat, button.dataset.lng, button.dataset.map, `국가지점번호 ${code} ${firstNumber} ${secondNumber}`));
  });
}

function convertCbcCodeToLatLng() {
  const input = cbcCodeInput.value.trim();

  if (!input) {
    cbcResult.innerHTML = '<div>국가지점번호를 입력해 주세요.</div>';
    return;
  }

  const compactInput = input.replace(/\s+/g, "");
  const compactMatch = compactInput.match(/^([가-힣]{2})(\d{4})(\d{4})$/u);
  const tokens = input.split(/\s+/).filter(Boolean);
  const [code, firstNumber, secondNumber] = compactMatch
    ? [compactMatch[1], compactMatch[2], compactMatch[3]]
    : tokens.length === 3
      ? tokens
      : [];

  if (!code || !firstNumber || !secondNumber || code.length !== 2) {
    cbcResult.innerHTML = '<div>형식이 올바르지 않습니다. 예: 가나 1234 5678</div>';
    return;
  }

  const xBand = Object.entries(cbcBandX).find(([, value]) => value === code[0])?.[0];
  const yBand = Object.entries(cbcBandY).find(([, value]) => value === code[1])?.[0];

  if (!xBand || !yBand) {
    cbcResult.innerHTML = '<div>입력한 지점코드를 해석하지 못했습니다.</div>';
    return;
  }

  if (typeof proj4 === "undefined") {
    cbcResult.innerHTML = '<div>좌표 변환 라이브러리를 불러오는 중입니다. 잠시 후 다시 시도해 주세요.</div>';
    return;
  }

  const length = firstNumber.length + 1;
  const factor = 10 ** (6 - length);
  const xOffset = Number(firstNumber) * factor + 5;
  const yOffset = Number(secondNumber) * factor + 5;
  const xGrid = Number(xBand) * 10 ** length + xOffset;
  const yGrid = Number(yBand) * 10 ** length + yOffset;

  try {
    const [lng, lat] = proj4(cbcGrs80Projection, cbcWgs84Projection, [xGrid, yGrid]);
    const outputFormat = cbcOutputFormat.value;
    renderCbcResult({ code, firstNumber, secondNumber, lat, lng, outputFormat });
  } catch (error) {
    cbcResult.innerHTML = '<div>좌표 변환 중 오류가 발생했습니다. 입력값을 다시 확인해 주세요.</div>';
  }
}

function convertLatLngToCbcCode() {
  const input = latLngInput.value.trim();

  if (!input) {
    cbcResult.innerHTML = '<div>위도와 경도를 입력해 주세요.</div>';
    return;
  }

  const coordinateInput = parseCoordinateInput(input);
  if (!coordinateInput) {
    cbcResult.innerHTML = '<div>형식이 올바르지 않습니다. 예: 37.443389, 126.987123 또는 37° 26\' 36.2", 126° 59\' 12.1"</div>';
    return;
  }

  const { lat, lng } = coordinateInput;

  if (typeof proj4 === "undefined") {
    cbcResult.innerHTML = '<div>좌표 변환 라이브러리를 불러오는 중입니다. 잠시 후 다시 시도해 주세요.</div>';
    return;
  }

  try {
    const [xGrid, yGrid] = proj4(cbcWgs84Projection, cbcGrs80Projection, [lng, lat]);
    const xBand = Math.floor(Math.floor(xGrid) / 100_000);
    const yBand = Math.floor(Math.floor(yGrid) / 100_000);
    const xCode = cbcBandX[xBand];
    const yCode = cbcBandY[yBand];

    if (!xCode || !yCode) {
      cbcResult.innerHTML = '<div>입력한 좌표는 한국 영역 범위 밖일 수 있습니다.</div>';
      return;
    }

    const xValue = Math.floor((xGrid % 100_000) / 10);
    const yValue = Math.floor((yGrid % 100_000) / 10);
    const code = `${xCode}${yCode}`;
    const firstNumber = String(xValue).padStart(4, "0");
    const secondNumber = String(yValue).padStart(4, "0");
    const inputFormat = coordinateInput.format === "dms" ? "도분초(DMS)" : "십진수(DD)";
    const latText = coordinateInput.format === "dms" ? `${lat.toFixed(6)}` : `${lat.toFixed(6)}`;
    const lngText = coordinateInput.format === "dms" ? `${lng.toFixed(6)}` : `${lng.toFixed(6)}`;

    cbcResult.innerHTML = `
      <div class="cbc-result-content">
        <strong>${code} ${firstNumber} ${secondNumber}</strong>
        <div class="small">입력 좌표: 위도 ${latText} / 경도 ${lngText} (${inputFormat})</div>
        <div class="small">국가지점번호로 변환되었습니다.</div>
      </div>
    `;
  } catch (error) {
    cbcResult.innerHTML = '<div>좌표 변환 중 오류가 발생했습니다. 입력값을 다시 확인해 주세요.</div>';
  }
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
calculateUnitBtn.addEventListener("click", renderUnitResult);
unitValueInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    renderUnitResult();
  }
});
calculateDiscountBtn.addEventListener("click", renderDiscountResult);
discountAmountInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    renderDiscountResult();
  }
});
discountPercentInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    renderDiscountResult();
  }
});
generatePasswordBtn.addEventListener("click", generatePassword);
passwordLengthInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    generatePassword();
  }
});
rollDiceBtn.addEventListener("click", rollDice);
startLadderBtn.addEventListener("click", renderLadderGame);
ladderPeopleInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    renderLadderGame();
  }
});
convertDmsBtn.addEventListener("click", convertDmsToDD);
dmsDegrees.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    convertDmsToDD();
  }
});
dmsMinutes.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    convertDmsToDD();
  }
});
dmsSeconds.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    convertDmsToDD();
  }
});
convertDdBtn.addEventListener("click", convertDdToDms);
ddValue.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    convertDdToDms();
  }
});
convertCbcBtn.addEventListener("click", convertCbcCodeToLatLng);
convertLatLngBtn.addEventListener("click", convertLatLngToCbcCode);
cbcCodeInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    convertCbcCodeToLatLng();
  }
});
latLngInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    convertLatLngToCbcCode();
  }
});

updateClock();
setInterval(updateClock, 1000);
renderResult();
generateLottoSets();
renderBmiResult();
renderDateDifference();
renderTipResult();
renderUnitResult();
renderDiscountResult();
generatePassword();
renderWeather();
rollDice();
renderLadderGame();
