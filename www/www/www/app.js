"use strict";

const output = document.getElementById("output");

function show(title, html) {
  output.innerHTML = `
    <h3>${title}</h3>
    <br>
    ${html}
  `;
}

function calculator() {
  show("🧮 Calculator", `
    <input id="calc" type="text" placeholder="Contoh: 25*4+10">
    <br><br>
    <button onclick="calculate()">Calculate</button>
    <div id="result"></div>
  `);
}

function calculate() {
  const value = document.getElementById("calc").value;

  if (!/^[0-9+\\-*/().%\\s]+$/.test(value)) {
    document.getElementById("result").innerText =
      "Invalid calculation.";
    return;
  }

  try {
    const result = Function(
      '"use strict"; return (' + value + ')'
    )();

    document.getElementById("result").innerText =
      "Result: " + result;
  } catch {
    document.getElementById("result").innerText =
      "Unable to calculate.";
  }
}

function percentage() {
  show("％ Percentage", `
    <input id="percent" type="number" placeholder="Percentage">
    <br><br>
    <input id="number" type="number" placeholder="Number">
    <br><br>
    <button onclick="calculatePercentage()">Calculate</button>
    <div id="result"></div>
  `);
}

function calculatePercentage() {
  const p = Number(document.getElementById("percent").value);
  const n = Number(document.getElementById("number").value);

  if (!Number.isFinite(p) || !Number.isFinite(n)) {
    document.getElementById("result").innerText =
      "Please enter valid numbers.";
    return;
  }

  document.getElementById("result").innerText =
    `${p}% of ${n} = ${(p * n / 100).toFixed(2)}`;
}

function textCounter() {
  show("📝 Text Counter", `
    <textarea id="text"
      placeholder="Type or paste your text here..."
      rows="7"></textarea>
    <br><br>
    <button onclick="countText()">Analyse</button>
    <div id="result"></div>
  `);
}

function countText() {
  const text = document.getElementById("text").value;

  const words = text.trim()
    ? text.trim().split(/\\s+/).length
    : 0;

  document.getElementById("result").innerText = `
Words: ${words}
Characters: ${text.length}
Without spaces: ${text.replace(/\\s/g, "").length}
Lines: ${text ? text.split("\\n").length : 0}
  `;
}

function passwordGenerator() {
  show("🔐 Password Generator", `
    <input id="length"
      type="number"
      value="16"
      min="8"
      max="64">
    <br><br>
    <button onclick="generatePassword()">
      Generate Password
    </button>

    <div id="result"></div>
  `);
}

function generatePassword() {
  const length = Math.min(
    64,
    Math.max(
      8,
      Number(document.getElementById("length").value) || 16
    )
  );

  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZ" +
    "abcdefghijkmnopqrstuvwxyz" +
    "23456789!@#$%^&*";

  const values = new Uint32Array(length);

  crypto.getRandomValues(values);

  let password = "";

  for (let i = 0; i < length; i++) {
    password += chars[values[i] % chars.length];
  }

  document.getElementById("result").innerText =
    password;
}

function qrGenerator() {
  show("▣ QR Generator", `
    <textarea id="qrText"
      placeholder="Enter text or URL..."
      rows="5"></textarea>

    <br><br>

    <button onclick="generateQR()">
      Generate QR
    </button>

    <div id="result"></div>
  `);
}

function generateQR() {
  const text = document.getElementById("qrText").value.trim();

  if (!text) {
    document.getElementById("result").innerText =
      "Enter some text or URL.";
    return;
  }

  document.getElementById("result").innerText =
    "QR generator akan diaktifkan selepas library QR offline dimasukkan.";
}
