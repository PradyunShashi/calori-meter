function calculate() {
  let w = +document.getElementById("weight").value;
  let h = +document.getElementById("height").value;
  let t = +document.getElementById("target").value;
  let d = +document.getElementById("days").value;

  if (!w || !h || !t || !d) {
    document.getElementById("output").innerHTML = "Please fill all fields";
    return;
  }

  // --- BMI ---
  let heightM = h / 100;
  let bmi = w / (heightM * heightM);

  let bmiStatus = "";
  if (bmi < 18.5) bmiStatus = "Underweight";
  else if (bmi < 24.9) bmiStatus = "Normal";
  else if (bmi < 29.9) bmiStatus = "Overweight";
  else bmiStatus = "Obese";

  // --- Calorie Calculation ---
  let maintenance = w * 30;
  let diff = t - w;
  let daily = (diff * 7700) / d;
  let final = maintenance + daily;

  let goal = diff > 0 ? "Calorie Surplus (Gain)" : "Calorie Deficit (Loss)";

  // --- Warnings ---
  let warning = "";

  if (bmi < 18.5) {
    warning = "&#9888 You are underweight. Avoid aggressive calorie deficit.";
  } else if (bmi > 25) {
    warning = "&#9888 You are above normal BMI. Gradual weight loss is recommended.";
  }

  if (Math.abs(daily) > 1000) {
    warning += "<br>&#9888 Extreme calorie change detected. Not recommended.";
  }

  // --- Output ---
  document.getElementById("output").innerHTML = `
    <strong>BMI:</strong> ${bmi.toFixed(1)} (${bmiStatus})<br><br>

    <strong>Maintenance Calories:</strong> ${maintenance.toFixed(0)} kcal<br>
    <strong>Daily Change:</strong> ${daily.toFixed(0)} kcal<br>
    <strong>Final Intake:</strong> ${final.toFixed(0)} kcal<br>
    <strong>Goal:</strong> ${goal}<br><br>

    <div class="warning">${warning}</div>
  `;
}
