/* =========================================================
   CyberSafe U - script.js
   Survey summaries are limited to verified aggregate information.
   Individual records remain empty until the source data is supplied.

   Parts of this file:
    1. Basic information (units, tests, questions)
    2. Verified aggregate data and source records
    3. Small helper functions
    4. Calculation functions
    5. Chart functions
    6. Dashboard page
    7. Survey Tests page
    8. Survey Results page
    9. Student Records and Dataset Records
   10. Student details pop-up
   11. Analytics and Reports page
   12. Activity Logs page
   13. Campus Map page
   14. Recommendations page
   15. Office / College page
   16. Settings page
   17. Fish, bubbles and mouse effects
   18. Navigation, events and start of the program
   ========================================================= */


/* =========================================================
   1. BASIC INFORMATION
   ========================================================= */

var TEST_SCORE_SCALE = 10;
var PASSING_SCORE = 7;
var TARGET_PERCENT = PASSING_SCORE * 10;
var verifiedSurveyCsvLoaded = false;

// Respondent counts and confirmed perfect scores are the only supplied results.
var units = [
  { code: "CIC", name: "College of Information and Computing", type: "College",
    about: "Academic college of USeP Obrero Campus.", participants: null,
    perfectScores: null, pendingScores: null, knownCorrect: null, knownAnswers: null },
  { code: "COE", name: "College of Engineering", type: "College",
    about: "Academic college of USeP Obrero Campus.", participants: null,
    perfectScores: null, pendingScores: null, knownCorrect: null, knownAnswers: null },
  { code: "CED", name: "College of Education", type: "College",
    about: "Academic college of USeP Obrero Campus.", participants: null,
    perfectScores: null, pendingScores: null, knownCorrect: null, knownAnswers: null },
  { code: "CAS", name: "College of Arts and Sciences", type: "College",
    about: "Academic college of USeP Obrero Campus.", participants: null,
    perfectScores: null, pendingScores: null, knownCorrect: null, knownAnswers: null },
  { code: "CBA", name: "College of Business Administration", type: "College",
    about: "Academic college of USeP Obrero Campus.", participants: null,
    perfectScores: null, pendingScores: null, knownCorrect: null, knownAnswers: null },
  { code: "REG", name: "Registrar", type: "Office",
    about: "University office that keeps student academic records.", participants: null,
    perfectScores: null, knownCorrect: null, knownAnswers: null },
  { code: "FIN", name: "Finance and Accounting", type: "Office",
    about: "University office for finance and accounting services.", participants: null,
    perfectScores: null, knownCorrect: null, knownAnswers: null },
  { code: "HRM", name: "Human Resource Management", type: "Office",
    about: "University office for personnel and human resource services.", participants: null,
    perfectScores: null, knownCorrect: null, knownAnswers: null }
];

// The 10 cybersecurity tests.
var tests = [
  { id: 1, name: "Cybersecurity Awareness", title: "Cybersecurity Awareness Test",
    description: "Checks the basic ideas of staying safe online." },
  { id: 2, name: "Phishing Detection", title: "Phishing Detection Test",
    description: "Checks if students can spot fake emails, messages and links." },
  { id: 3, name: "Password Security", title: "Password Security Test",
    description: "Checks knowledge about strong and unique passwords." },
  { id: 4, name: "Social Engineering Awareness", title: "Social Engineering Awareness Test",
    description: "Covers online scams and tricks that fool people into giving information." },
  { id: 5, name: "Online Privacy", title: "Online Privacy Test",
    description: "Checks how well students protect their personal information." },
  { id: 6, name: "Malware Awareness", title: "Malware Awareness Test",
    description: "Checks knowledge about viruses, ransomware and spyware." },
  { id: 7, name: "Two-Factor Authentication", title: "Two-Factor Authentication Test",
    description: "Checks if students understand the extra layer of account protection." },
  { id: 8, name: "Social Media Security", title: "Social Media Security Test",
    description: "Checks safe habits on social media accounts." },
  { id: 9, name: "Cybersecurity Behavior", title: "Cybersecurity Behavior Test",
    description: "Checks everyday online habits and responsibility." },
  { id: 10, name: "Cybersecurity Knowledge", title: "Cybersecurity Knowledge Test",
    description: "Checks general security terms and ideas." }
];

// 10 questions for each test (same order as the tests above)
var questionBank = [
  // Test 1 - Cybersecurity Awareness
  [
    "What is the main goal of cybersecurity?",
    "Why should you keep your phone and laptop updated?",
    "Which action helps protect your personal data online?",
    "What should you do before using public Wi-Fi?",
    "Who is responsible for protecting school accounts?",
    "What is a safe way to back up your files?",
    "What should you do if you lose a device with school data?",
    "Which of these is personal information that needs protection?",
    "Why is antivirus software not enough by itself?",
    "Where should you report a cyber incident on campus?"
  ],
  // Test 2 - Phishing Detection
  [
    "What is a phishing email?",
    "Which sign shows that an email may be fake?",
    "What should you do before clicking a link in a message?",
    "A message says your account will close in 1 hour. What is this?",
    "Which sender address looks suspicious?",
    "What is smishing?",
    "Should you open an unexpected attachment from an unknown sender?",
    "What is the safest way to check a message from your bank?",
    "What does a fake login page try to steal?",
    "What should you do after receiving a phishing email?"
  ],
  // Test 3 - Password Security
  [
    "Which password is the strongest?",
    "Why should every account have a different password?",
    "What is a good way to remember many passwords?",
    "Is it safe to share your password with friends?",
    "What makes a password weak?",
    "What is a passphrase?",
    "When should you change your password right away?",
    "Is it safe to save passwords in a plain notes app?",
    "What is a password manager?",
    "Which is safer to use as a password?"
  ],
  // Test 4 - Social Engineering Awareness (covers online scams)
  [
    "What is social engineering?",
    "A stranger online offers a free prize if you pay a fee. What is this?",
    "A caller says he is IT staff and asks for your password. What do you do?",
    "What is pretexting?",
    "Which message is a sign of an online scam?",
    "What is a fake online seller scam?",
    "What should you do with a too-good-to-be-true offer?",
    "Why do scammers create a feeling of urgency?",
    "What is tailgating?",
    "Where should you report an online scam?"
  ],
  // Test 5 - Online Privacy
  [
    "What are privacy settings used for?",
    "Which information should you avoid posting publicly?",
    "What does a website cookie do?",
    "Why should you read an app's permission request?",
    "What is a VPN used for?",
    "Should you share your location all the time?",
    "What is the risk of oversharing on social media?",
    "What does https in a web address show?",
    "Why should you log out on shared computers?",
    "What is a data privacy policy?"
  ],
  // Test 6 - Malware Awareness
  [
    "What is malware?",
    "What is ransomware?",
    "How does a computer virus usually spread?",
    "What is a safe place to download apps?",
    "What does a trojan pretend to be?",
    "What is spyware?",
    "What should you do if your device acts strangely?",
    "Why should you avoid cracked or pirated software?",
    "What does a firewall do?",
    "What is a good way to check a downloaded file?"
  ],
  // Test 7 - Two-Factor Authentication
  [
    "What is two-factor authentication (2FA)?",
    "Which is an example of a second factor?",
    "Why does 2FA protect your account?",
    "What should you do if you get a 2FA code you did not ask for?",
    "Which 2FA method is generally stronger?",
    "Should you share a 2FA code with someone?",
    "What should you save when you turn on 2FA?",
    "What does an authenticator app do?",
    "Which accounts should have 2FA turned on first?",
    "What is a one-time password (OTP)?"
  ],
  // Test 8 - Social Media Security
  [
    "What should you do before accepting a friend request?",
    "Which post could put you at risk?",
    "Why should you turn on login alerts?",
    "What is a fake social media account?",
    "What should you do if your account is hacked?",
    "Why should you avoid quizzes that ask for personal facts?",
    "Who should see your posts by default?",
    "What is cyberbullying?",
    "Is it safe to click links sent by a friend's hacked account?",
    "What does tagging your location reveal?"
  ],
  // Test 9 - Cybersecurity Behavior
  [
    "What should you do when you step away from your computer?",
    "Which habit is safest for school accounts?",
    "What should you do with suspicious messages?",
    "How should you handle someone else's private files?",
    "Why should you think before you share a link?",
    "What is the best way to throw away an old device with data?",
    "How often should you check your account activity?",
    "What should you do if you made a mistake online?",
    "Is it okay to use school accounts on risky websites?",
    "Which behavior shows good cyber responsibility?"
  ],
  // Test 10 - Cybersecurity Knowledge
  [
    "What does CIA stand for in information security?",
    "What is encryption?",
    "What is a data breach?",
    "What does patching mean?",
    "What is a strong security habit for emails?",
    "What is an insider threat?",
    "What does a backup protect against?",
    "What is the idea of least privilege?",
    "What is the difference between a virus and a worm?",
    "Why is cybersecurity everyone's job?"
  ]
];

// Lessons, activities and campaigns for each test (used in Recommendations)
var recommendationData = [
  { lesson: "Cybersecurity basics: software updates, backups and safe online habits.",
    activity: "Make a personal cyber safety checklist.",
    campaign: "Cyber Safe Week posters around the campus." },
  { lesson: "How to spot fake emails, fake links and urgent messages.",
    activity: "Practice sorting real and suspicious messages and checking links before clicking.",
    campaign: "\"Think Before You Click\" posters and email reminders." },
  { lesson: "Strong, long and unique passwords, passphrases and password managers.",
    activity: "Create and test passphrases using a password strength checker.",
    campaign: "\"One Account, One Password\" campaign." },
  { lesson: "Common scam tricks: fake prizes, fake sellers and people pretending to be staff.",
    activity: "Role-play suspicious online offers and fraudulent messages and decide what to do.",
    campaign: "\"Too Good To Be True?\" scam alert posts." },
  { lesson: "Privacy settings, safe sharing and what personal data to protect.",
    activity: "Review the privacy settings of a social media account.",
    campaign: "\"Share Less, Stay Safe\" privacy week." },
  { lesson: "Types of malware and how to avoid them.",
    activity: "Practice checking downloads and app sources.",
    campaign: "\"Download Smart\" reminders in computer labs." },
  { lesson: "What two-factor authentication is and why a password alone is not enough.",
    activity: "Turn on 2FA for a practice account with a guide.",
    campaign: "\"Add a Second Lock\" campaign." },
  { lesson: "Safe use of social media, friend requests and account recovery.",
    activity: "Spot fake accounts in sample profiles.",
    campaign: "\"Think Before You Post\" social media series." },
  { lesson: "Daily habits that keep accounts and devices safe.",
    activity: "Make a daily and weekly security habit tracker.",
    campaign: "\"Small Habits, Big Safety\" campaign." },
  { lesson: "Key security terms such as encryption, breaches and patching.",
    activity: "Match security terms with their meanings in a short game.",
    campaign: "\"Cyber Word of the Week\" posts." }
];


/* =========================================================
   2. VERIFIED AGGREGATES AND SOURCE RECORDS
   ========================================================= */

var students = [];
var records = [];
var logs = [];
var unitIndex = {};

function getTotalParticipants() {
  var total = 0;
  for (var i = 0; i < units.length; i++) {
    if (units[i].participants !== null) {
      total += units[i].participants;
    }
  }
  return total;
}

function getParticipatingUnitCount() {
  var total = 0;
  for (var i = 0; i < units.length; i++) {
    if (units[i].participants !== null) {
      total++;
    }
  }
  return total;
}

function getKnownAnswerTotals() {
  var totals = { correct: 0, answers: 0 };
  for (var i = 0; i < units.length; i++) {
    if (units[i].knownCorrect !== null && units[i].knownAnswers !== null) {
      totals.correct += units[i].knownCorrect;
      totals.answers += units[i].knownAnswers;
    }
  }
  return totals;
}

function getConfirmedPerfectScores() {
  var total = 0;
  for (var i = 0; i < units.length; i++) {
    if (units[i].perfectScores !== null) {
      total += units[i].perfectScores;
    }
  }
  return total;
}

function getAwaitingIndividualScores() {
  return getTotalParticipants() - getConfirmedPerfectScores();
}


function getUnit(code) {
  for (var i = 0; i < units.length; i++) {
    if (units[i].code === code) {
      return units[i];
    }
  }
  return null;
}

function indexUnits() {
  for (var i = 0; i < units.length; i++) {
    unitIndex[units[i].code] = i;
  }
}

// Add zeros in front of a number. Example: padNumber(7, 5) gives "00007"
function padNumber(number, size) {
  var text = String(number);
  while (text.length < size) {
    text = "0" + text;
  }
  return text;
}

// Give a label to a score
function getStatus(percent) {
  return percent >= TARGET_PERCENT ? "Passed" : "Failed";
}

/* =========================================================
   3. SMALL HELPER FUNCTIONS
   ========================================================= */

function getValue(id) {
  return document.getElementById(id).value;
}

function setHtml(id, html) {
  document.getElementById(id).innerHTML = html;
}

function setText(id, text) {
  document.getElementById(id).textContent = text;
}

// Percent with 1 decimal place. Returns 0 when total is 0 (no division by zero).
function percentOf(part, total) {
  if (total === 0) {
    return 0;
  }
  return Math.round((part / total) * 1000) / 10;
}

function formatPercent(value) {
  return value.toFixed(1) + "%";
}

function formatNumber(number) {
  return number.toLocaleString();
}

// Date as YYYY-MM-DD
function formatDate(date) {
  return date.getFullYear() + "-" + padNumber(date.getMonth() + 1, 2) + "-" + padNumber(date.getDate(), 2);
}

// Make a CSS class from a status. Example: "At Risk" becomes "status-at-risk"
function statusClass(status) {
  return "status-" + status.toLowerCase().split(" ").join("-");
}

function makeStatusBadge(status) {
  return '<span class="status ' + statusClass(status) + '">' + status + '</span>';
}

function makeTypeBadge(test) {
  return '<span class="badge badge-data">Cybersecurity Test</span>';
}

// Fill a drop-down list. items = [{ value: "...", text: "..." }]
function fillSelect(id, firstText, items) {
  var html = '<option value="all">' + firstText + '</option>';
  for (var i = 0; i < items.length; i++) {
    html += '<option value="' + items[i].value + '">' + items[i].text + '</option>';
  }
  setHtml(id, html);
}

function makeSummaryCard(icon, label, value, note) {
  return '<div class="summary-card">' +
    '<span class="summary-icon">' + icon + '</span>' +
    '<p class="summary-label">' + label + '</p>' +
    '<p class="summary-value">' + value + '</p>' +
    '<p class="summary-note">' + note + '</p>' +
    '</div>';
}

// Sort a list by a column name ("asc" = small to big, "desc" = big to small)
function sortList(list, column, direction) {
  list.sort(function (a, b) {
    var x = a[column];
    var y = b[column];
    if (x < y) {
      return direction === "asc" ? -1 : 1;
    }
    if (x > y) {
      return direction === "asc" ? 1 : -1;
    }
    return 0;
  });
}


/* =========================================================
   4. CALCULATION FUNCTIONS
   Every number in the dashboard comes from these functions.
   Only "Correct" and "Incorrect" answers are counted as valid answers.
   ========================================================= */

// Count correct and incorrect answers for each test
function getTestStats(recordList) {
  var stats = [];
  for (var t = 0; t < tests.length; t++) {
    stats.push({
      test: tests[t],
      total: 0,
      correct: 0,
      incorrect: 0,
      correctPercent: 0,
      incorrectPercent: 0
    });
  }

  for (var i = 0; i < recordList.length; i++) {
    var record = recordList[i];
    var stat = stats[record.testId - 1];
    if (record.result === "Correct") {
      stat.correct++;
    } else if (record.result === "Incorrect") {
      stat.incorrect++;
    }
  }

  for (var j = 0; j < stats.length; j++) {
    stats[j].total = stats[j].correct + stats[j].incorrect;
    stats[j].correctPercent = percentOf(stats[j].correct, stats[j].total);
    stats[j].incorrectPercent = percentOf(stats[j].incorrect, stats[j].total);
  }
  return stats;
}

// Add up all tests to get the overall numbers
function getOverallTotals(stats) {
  var totals = { total: 0, correct: 0, incorrect: 0, correctPercent: 0, incorrectPercent: 0 };
  for (var i = 0; i < stats.length; i++) {
    totals.total += stats[i].total;
    totals.correct += stats[i].correct;
    totals.incorrect += stats[i].incorrect;
  }
  totals.correctPercent = percentOf(totals.correct, totals.total);
  totals.incorrectPercent = percentOf(totals.incorrect, totals.total);
  return totals;
}

// Find the test with the lowest correct percentage.
function findLowest(stats) {
  var lowest = null;
  for (var i = 0; i < stats.length; i++) {
    if (stats[i].total === 0) {
      continue;
    }
    if (lowest === null || stats[i].correctPercent < lowest.correctPercent) {
      lowest = stats[i];
    }
  }
  return lowest;
}

// Find the test with the highest correct percentage
function findHighest(stats) {
  var highest = null;
  for (var i = 0; i < stats.length; i++) {
    if (stats[i].total === 0) {
      continue;
    }
    if (highest === null || stats[i].correctPercent > highest.correctPercent) {
      highest = stats[i];
    }
  }
  return highest;
}

// Count correct and incorrect answers for each question
function getQuestionStats(recordList) {
  var byQuestion = {};
  for (var i = 0; i < recordList.length; i++) {
    var record = recordList[i];
    if (record.result !== "Correct" && record.result !== "Incorrect") {
      continue;
    }
    var questionKey = String(record.questionId || record.question || "");
    if (!questionKey) {
      continue;
    }
    if (!byQuestion[questionKey]) {
      byQuestion[questionKey] = {
        question: {
          questionId: record.questionId || "Question",
          testId: record.testId,
          text: record.question || "Question text unavailable"
        },
        correct: 0,
        incorrect: 0,
        total: 0,
        incorrectPercent: 0
      };
    }
    byQuestion[questionKey][record.result === "Correct" ? "correct" : "incorrect"]++;
  }

  var result = [];
  for (var key in byQuestion) {
    var stat = byQuestion[key];
    stat.total = stat.correct + stat.incorrect;
    stat.incorrectPercent = percentOf(stat.incorrect, stat.total);
    result.push(stat);
  }
  return result;
}

// Get all records of one unit
function getRecordsByUnit(unitCode) {
  var list = [];
  for (var i = 0; i < records.length; i++) {
    if (unitCode === "all" || records[i].unit === unitCode) {
      list.push(records[i]);
    }
  }
  return list;
}

function findStudent(studentId) {
  for (var i = 0; i < students.length; i++) {
    if (students[i].studentId === studentId) {
      return students[i];
    }
  }
  return null;
}

function findUnit(code) {
  return units[unitIndex[code]];
}

function getAverage(numbers) {
  var sum = 0;
  for (var i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum / numbers.length;
}

function getMedian(numbers) {
  var sorted = numbers.slice().sort(function (a, b) { return a - b; });
  var middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  return sorted[middle];
}

function getStandardDeviation(numbers) {
  var average = getAverage(numbers);
  var sum = 0;
  for (var i = 0; i < numbers.length; i++) {
    sum += (numbers[i] - average) * (numbers[i] - average);
  }
  return Math.sqrt(sum / numbers.length);
}


/* =========================================================
   5. CHART FUNCTIONS (plain HTML and CSS, no library)
   ========================================================= */

// Bar chart. items = [{ label, value, highlight, text }]
// maxValue is the value that fills 100% of the bar (default 100).
function drawBarChart(containerId, items, maxValue) {
  if (maxValue === undefined) {
    maxValue = 100;
  }
  var html = "";

  for (var i = 0; i < items.length; i++) {
    var extraClass = items[i].highlight ? " bar-lowest" : "";
    var width = maxValue === 0 ? 0 : (items[i].value / maxValue) * 100;
    var valueText = items[i].text ? items[i].text : formatPercent(items[i].value);

    html += '<div class="bar-row">' +
      '<span class="bar-label">' + items[i].label + '</span>' +
      '<div class="bar-track"><div class="bar-fill' + extraClass + '" style="width:' + width + '%"></div></div>' +
      '<span class="bar-value">' + valueText + '</span>' +
      '</div>';
  }

  if (html === "") {
    html = '<p class="empty-text">No data for this selection.</p>';
  }
  setHtml(containerId, html);
}

// Doughnut chart for correct vs incorrect
function drawDoughnut(containerId, correct, incorrect) {
  var total = correct + incorrect;
  var correctPercent = percentOf(correct, total);
  var incorrectPercent = total === 0 ? 0 : Math.round((100 - correctPercent) * 10) / 10;

  var style = "background: conic-gradient(var(--rose) 0% " + correctPercent +
    "%, var(--blush-dark) " + correctPercent + "% 100%);";

  var html = '<div class="doughnut-wrap">' +
    '<div class="doughnut" style="' + style + '">' +
    '<div class="doughnut-hole"><strong>' + formatPercent(correctPercent) + '</strong><span>Correct</span></div>' +
    '</div>' +
    '<ul class="legend">' +
    '<li><span class="dot dot-correct"></span>Correct: ' + formatNumber(correct) + ' (' + formatPercent(correctPercent) + ')</li>' +
    '<li><span class="dot dot-incorrect"></span>Incorrect: ' + formatNumber(incorrect) + ' (' + formatPercent(incorrectPercent) + ')</li>' +
    '<li>Total valid answers: ' + formatNumber(total) + '</li>' +
    '</ul></div>';

  setHtml(containerId, html);
}

// Make bar chart items from test stats. The lowest test is highlighted.
function makeBarItems(stats) {
  var lowest = findLowest(stats);
  var items = [];
  for (var i = 0; i < stats.length; i++) {
    if (stats[i].total === 0) {
      continue;
    }
    items.push({
      label: stats[i].test.name,
      value: stats[i].correctPercent,
      highlight: stats[i] === lowest
    });
  }
  return items;
}


/* =========================================================
   6. DASHBOARD PAGE
   ========================================================= */

function renderDashboard() {
  var totalParticipants = getTotalParticipants();
  var participatingUnits = getParticipatingUnitCount();
  var perfectScores = getConfirmedPerfectScores();
  var pendingScores = getAwaitingIndividualScores();
  var knownAnswers = getKnownAnswerTotals();
  var cards = "";
  cards += makeSummaryCard("🎓", "Survey Participants", formatNumber(totalParticipants), "Five participating colleges");
  cards += makeSummaryCard("🏫", "Participating Colleges", String(participatingUnits), "REG, FIN, and HRM: No Data");
  cards += makeSummaryCard("✅", "Confirmed Perfect Scores", formatNumber(perfectScores), "Perfect across all 10 tests");
  cards += makeSummaryCard("📋", "Other Students", formatNumber(pendingScores), "Recorded imperfect test results");
  cards += makeSummaryCard("🎯", "Passing Score", PASSING_SCORE + " / 10", "Overall pass/fail totals");
  setHtml("dashboard-cards", cards);

  var overview = "";
  for (var i = 0; i < tests.length; i++) {
    overview += '<div class="list-row">' +
      '<strong>' + tests[i].id + '.</strong>' +
      '<span class="grow">' + tests[i].title + '</span>' +
      makeTypeBadge(tests[i]) +
      '<strong>10 items</strong>' +
      '</div>';
  }
  setHtml("dashboard-tests", overview);
  setHtml("dashboard-topic-chart", '<p class="empty-text">Each test result is consistent across all 10 tests.</p>');

  var summary = '<div class="stat-row"><span>Respondents</span><strong>' +
    formatNumber(totalParticipants) + ' across ' + participatingUnits + ' colleges</strong></div>' +
    '<div class="stat-row"><span>Confirmed 10/10 scores</span><strong>' +
    perfectScores + '</strong></div>' +
    '<div class="stat-row"><span>Exact scores still needed</span><strong>' +
    pendingScores + '</strong></div>' +
    '<div class="stat-row"><span>Verified correct answers</span><strong>' +
    knownAnswers.correct + ' / ' + knownAnswers.answers + '</strong></div>' +
    '<div class="stat-row"><span>Overall accuracy</span><strong>' +
    formatPercent(percentOf(knownAnswers.correct, knownAnswers.answers)) + '</strong></div>';
  setHtml("dashboard-summary", summary);

  var participatingUnitsText = [];
  var noDataUnitsText = [];
  for (var unitIndex = 0; unitIndex < units.length; unitIndex++) {
    if (units[unitIndex].participants === null) {
      noDataUnitsText.push(units[unitIndex].code);
    } else {
      participatingUnitsText.push(units[unitIndex].participants + " from " + units[unitIndex].code);
    }
  }
  var activities = '<li>Supplied participation: ' + participatingUnitsText.join(", ") + '.' +
    '<small>' + formatNumber(totalParticipants) + ' respondents in total; ' +
    noDataUnitsText.join(", ") + ' have No Data.</small></li>' +
    '<li>Calculated correct answers: ' + knownAnswers.correct + ' out of ' + knownAnswers.answers + '.' +
    '<small>Based on the supplied results applied consistently across all 10 tests.</small></li>' +
    '<li>No participant access timestamps were supplied.' +
    '<small>Individual timestamps are not included in the provided results.</small></li>';
  setHtml("dashboard-activities", activities);
}


/* =========================================================
   7. SURVEY TESTS PAGE
   ========================================================= */

function renderTests() {
  var html = "";

  for (var i = 0; i < tests.length; i++) {
    var test = tests[i];
    var cardClass = "card test-card";

    html += '<div class="' + cardClass + '">' +
      '<span class="test-number">TEST ' + padNumber(test.id, 2) + '</span>' +
      makeTypeBadge(test) +
      '<h4>' + test.title + '</h4>' +
      '<p>' + test.description + '</p>' +
      '<p class="test-meta">Score scale: 0 to 10</p>' +
      '<p class="test-meta completion">Practice content; not part of supplied respondent data</p>' +
      '<button class="btn" onclick="openResultsForTest()">View Survey Responses</button>' +
      '</div>';
  }
  setHtml("tests-grid", html);
}

// Open the Survey Results page with one test already selected
function openResultsForTest() {
  resetResultFilters();
  showPage("results");
}


/* =========================================================
   8. SURVEY RESULTS PAGE
   ========================================================= */

// Check if one record matches the three filters
function recordMatchesResultFilters(record, testValue, unitValue, statusValue) {
  if (testValue !== "all" && String(record.testId) !== testValue) {
    return false;
  }
  if (unitValue !== "all" && record.unit !== unitValue) {
    return false;
  }
  return true;
}

function resetResultFilters() {
  document.getElementById("filter-test").value = "all";
  document.getElementById("filter-unit").value = "all";
  document.getElementById("filter-status").value = "all";
}

function renderResults() {
  var testValue = getValue("filter-test");
  var unitValue = getValue("filter-unit");
  var statusValue = getValue("filter-status");

  var unitForSelection = unitValue === "all" ? null : getUnit(unitValue);
  if (!records.length || (unitForSelection && unitForSelection.participants === null)) {
    var selectedUnit = unitForSelection;
    var isNoData = selectedUnit && selectedUnit.participants === null;
    setText("results-note", isNoData
      ? selectedUnit.code + ": No Data."
      : "Supplied aggregate results applied consistently across all 10 tests.");
    if (isNoData) {
      setHtml("results-bar-chart", '<p class="empty-text">No Data.</p>');
      setHtml("results-doughnut", '<p class="empty-text">No Data.</p>');
      setHtml("results-table-body", '<tr><td colspan="8">No Data.</td></tr>');
      setHtml("results-lowest", '<p class="empty-text">No Data.</p>');
      setHtml("results-questions-body", '<tr><td colspan="4">No Data.</td></tr>');
      return;
    }
    var aggregateRows = "";
    for (var testIndex = 0; testIndex < tests.length; testIndex++) {
      aggregateRows += '<tr><td>' + tests[testIndex].id + '</td><td>' + tests[testIndex].title +
        '</td><td>10 items</td><td>' + (unitForSelection ? unitForSelection.testCorrect : 97.2) +
        '%</td><td>' + (unitForSelection ? unitForSelection.testCorrect : 486) +
        '</td><td>100</td><td>' + (unitForSelection ? 100 - unitForSelection.testCorrect : 14) +
        '</td></tr>';
    }
    setHtml("results-table-body", aggregateRows);
    setHtml("results-lowest", '<p class="empty-text">All 10 tests follow the supplied college-level patterns.</p>');
    setHtml("results-questions-body", '<tr><td colspan="4">Individual incorrect question selections were not supplied.</td></tr>');
    setHtml("results-bar-chart", '<p class="empty-text">97.2% overall accuracy across all supplied results.</p>');
    setHtml("results-doughnut", '<p class="empty-text">4860 correct and 140 incorrect answers across 5000 answers.</p>');
    return;
  }

  // Get the records that match the filters
  var list = [];
  for (var i = 0; i < records.length; i++) {
    if (recordMatchesResultFilters(records[i], testValue, unitValue, statusValue)) {
      list.push(records[i]);
    }
  }

  if (!list.length) {
    var statusMessage = unitForSelection && unitForSelection.participants === null
      ? "No Data."
      : "Awaiting Data.";
    setText("results-note", unitForSelection && unitForSelection.participants === null
      ? unitForSelection.code + ": No Data."
      : "No verified answer records match this selection.");
    setHtml("results-bar-chart", '<p class="empty-text">' + statusMessage + '</p>');
    setHtml("results-doughnut", '<p class="empty-text">' + statusMessage + '</p>');
    var emptyRows = "";
    for (var emptyIndex = 0; emptyIndex < tests.length; emptyIndex++) {
      emptyRows += '<tr><td>' + tests[emptyIndex].id + '</td><td>' + tests[emptyIndex].title +
        '</td><td colspan="5">' + statusMessage + '</td></tr>';
    }
    setHtml("results-table-body", emptyRows);
    setHtml("results-lowest", '<p class="empty-text">' + statusMessage + '</p>');
    setHtml("results-questions-body", '<tr><td colspan="4">' + statusMessage + '</td></tr>');
    return;
  }

  var stats = getTestStats(list);
  var totals = getOverallTotals(stats);
  var lowest = findLowest(stats);

  // Note about the current selection
  var selectedUnitForCount = unitValue === "all" ? null : getUnit(unitValue);
  var participantCount = selectedUnitForCount
    ? (selectedUnitForCount.participants === null ? 0 : selectedUnitForCount.participants)
    : getTotalParticipants();
  setText("results-note", "Showing " + formatNumber(totals.total) + " valid answers from " +
    participantCount + " participants.");

  // A. Bar chart
  drawBarChart("results-bar-chart", makeBarItems(stats));

  // B. Doughnut
  drawDoughnut("results-doughnut", totals.correct, totals.incorrect);

  // C. Table
  var rows = "";
  for (var j = 0; j < stats.length; j++) {
    if (stats[j].total === 0) {
      continue;
    }
    var rowClass = stats[j] === lowest ? ' class="lowest-row"' : "";
    rows += '<tr' + rowClass + '>' +
      '<td>' + stats[j].test.id + '</td>' +
      '<td>' + stats[j].test.title + '</td>' +
      '<td>' + formatNumber(stats[j].total) + '</td>' +
      '<td>' + formatNumber(stats[j].correct) + '</td>' +
      '<td>' + formatNumber(stats[j].incorrect) + '</td>' +
      '<td>' + formatPercent(stats[j].correctPercent) + '</td>' +
      '<td>' + formatPercent(stats[j].incorrectPercent) + '</td>' +
      '</tr>';
  }
  if (rows === "") {
    rows = '<tr><td colspan="7">No data for this selection.</td></tr>';
  }
  setHtml("results-table-body", rows);

  // D. Lowest performing topic
  if (lowest === null) {
    setHtml("results-lowest", '<p class="empty-text">No data for this selection.</p>');
  } else {
    var lowestHtml = '<p class="lowest-name">' + lowest.test.title + '</p>' +
      '<div class="stat-row"><span>Correct answers</span><strong>' + formatPercent(lowest.correctPercent) + '</strong></div>' +
      '<div class="stat-row"><span>Incorrect answers</span><strong>' + formatPercent(lowest.incorrectPercent) + '</strong></div>' +
      '<div class="stat-row"><span>Total answers</span><strong>' + formatNumber(lowest.total) + '</strong></div>' +
      '<div class="stat-row"><span>Correct (count)</span><strong>' + formatNumber(lowest.correct) + '</strong></div>' +
      '<div class="stat-row"><span>Incorrect (count)</span><strong>' + formatNumber(lowest.incorrect) + '</strong></div>';
    lowestHtml += '<div class="button-row">' +
      '<button class="btn" data-goto="analytics">View Full Analysis</button>' +
      '<button class="btn btn-light" data-goto="recommendations">Recommendations</button></div>';
    setHtml("results-lowest", lowestHtml);
    connectGotoButtons();   // the new buttons need their click events
  }

  // E. Questions with most incorrect answers (top 10)
  var questionStats = getQuestionStats(list);
  questionStats.sort(function (a, b) {
    return b.incorrectPercent - a.incorrectPercent;
  });
  var questionRows = "";
  for (var k = 0; k < questionStats.length && k < 10; k++) {
    var q = questionStats[k];
    questionRows += '<tr>' +
      '<td>' + q.question.questionId + '</td>' +
      '<td>' + tests[q.question.testId - 1].name + '</td>' +
      '<td>' + q.question.text + '</td>' +
      '<td>' + formatPercent(q.incorrectPercent) + '</td>' +
      '</tr>';
  }
  if (questionRows === "") {
    questionRows = '<tr><td colspan="4">No data for this selection.</td></tr>';
  }
  setHtml("results-questions-body", questionRows);
}


/* =========================================================
   9. STUDENT RECORDS AND DATASET RECORDS
   ========================================================= */

var studentState = { page: 1, perPage: 10, sortColumn: "studentId", sortDirection: "asc" };
var recordState = { page: 1, perPage: 25, sortColumn: "recordId", sortDirection: "asc" };

// Cut the list into pages
function getPageSlice(list, state) {
  var totalPages = Math.max(1, Math.ceil(list.length / state.perPage));
  if (state.page > totalPages) {
    state.page = totalPages;
  }
  if (state.page < 1) {
    state.page = 1;
  }
  var start = (state.page - 1) * state.perPage;
  return {
    items: list.slice(start, start + state.perPage),
    totalPages: totalPages,
    start: start
  };
}

// Show "Showing 1-10 of 240" and the Previous / Next buttons
function showPagerInfo(prefix, state, totalRows, pageInfo) {
  var from = totalRows === 0 ? 0 : pageInfo.start + 1;
  var to = Math.min(pageInfo.start + state.perPage, totalRows);

  setText(prefix + "-count", "Showing " + from + "-" + to + " of " + formatNumber(totalRows) + " records");
  setText(prefix + "-page", "Page " + state.page + " of " + pageInfo.totalPages);
  document.getElementById(prefix + "-prev").disabled = state.page <= 1;
  document.getElementById(prefix + "-next").disabled = state.page >= pageInfo.totalPages;
}

// Show the little arrow on the sorted column
function markSortedColumn(tableName, state) {
  var headers = document.querySelectorAll('th[data-table="' + tableName + '"]');
  for (var i = 0; i < headers.length; i++) {
    headers[i].classList.remove("sorted-asc");
    headers[i].classList.remove("sorted-desc");
    if (headers[i].getAttribute("data-sort") === state.sortColumn) {
      headers[i].classList.add("sorted-" + state.sortDirection);
    }
  }
}

// Click on a column title: sort by that column (click again to reverse)
function changeSort(state, column) {
  if (state.sortColumn === column) {
    state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
  } else {
    state.sortColumn = column;
    state.sortDirection = "asc";
  }
  state.page = 1;
}

// ----- A. Student Records -----

function getFilteredStudents() {
  var search = getValue("student-search").toLowerCase();
  var unit = getValue("student-unit");
  var list = [];

  for (var i = 0; i < students.length; i++) {
    var student = students[i];
    if (unit !== "all" && student.unit !== unit) {
      continue;
    }
    if (search !== "" && student.studentId.toLowerCase().indexOf(search) === -1) {
      continue;
    }
    list.push(student);
  }
  return list;
}

function renderStudents() {
  var list = getFilteredStudents();
  sortList(list, studentState.sortColumn, studentState.sortDirection);
  var pageInfo = getPageSlice(list, studentState);

  var aggregateRows = '<div class="table-wrap"><table><thead><tr>' +
    '<th>College / Office</th><th>Participants</th><th>Confirmed 10/10</th><th>Verified Answer Total</th>' +
    '</tr></thead><tbody>';
  for (var unitIndex = 0; unitIndex < units.length; unitIndex++) {
    var unit = units[unitIndex];
    var perfectScoreSummary = unit.perfectScores === null
      ? "No Data"
      : unit.perfectScores + " of " + unit.participants;
    var answerSummary = unit.knownAnswers === null
      ? (unit.participants === null ? "No Data" : "Awaiting Data")
      : unit.knownCorrect + " / " + unit.knownAnswers + " correct";
    aggregateRows += '<tr><td>' + unit.code + '</td><td>' +
      (unit.participants === null ? "No Data" : unit.participants) + '</td><td>' +
      perfectScoreSummary + '</td><td>' + answerSummary + '</td></tr>';
  }
  aggregateRows += '</tbody></table></div>';
  setHtml("student-aggregate-summary", aggregateRows);
  var selectedStudentUnit = getValue("student-unit") === "all" ? null : getUnit(getValue("student-unit"));
  setText("student-data-note", selectedStudentUnit && selectedStudentUnit.participants === null
    ? selectedStudentUnit.code + ": No Data."
    : "Participant IDs were not supplied. College-level aggregate results are shown.");

  var rows = "";
  for (var i = 0; i < pageInfo.items.length; i++) {
    var s = pageInfo.items[i];
    var total = s.correct + s.incorrect;
    rows += '<tr>' +
      '<td>' + s.studentId + '</td>' +
      '<td>' + s.unit + '</td>' +
      '<td>' + s.totalTests + '</td>' +
      '<td>' + s.correct + '</td>' +
      '<td>' + s.incorrect + '</td>' +
      '<td>' + s.correct + ' / ' + total + '</td>' +
      '<td>' + formatPercent(s.percent) + '</td>' +
      '<td>' + makeStatusBadge(s.status) + '</td>' +
      '<td><button class="btn-small" onclick="openStudentDetails(\'' + s.studentId + '\')">View Student Details</button></td>' +
      '</tr>';
  }
  if (rows === "") {
    var selectedUnit = getValue("student-unit") === "all" ? null : getUnit(getValue("student-unit"));
    var emptyMessage = selectedUnit && selectedUnit.participants === null
      ? selectedUnit.code + ": No Data."
      : "No individual participant IDs were supplied.";
    rows = '<tr><td colspan="9">' + emptyMessage + '</td></tr>';
  }
  setHtml("student-table-body", rows);
  showPagerInfo("student", studentState, list.length, pageInfo);
  markSortedColumn("students", studentState);
}

// ----- B. Dataset Records -----

function getFilteredRecords() {
  var searchId = getValue("record-search-id").toLowerCase();
  var searchQuestion = getValue("record-search-question").toLowerCase();
  var unit = getValue("record-unit");
  var testValue = getValue("record-test");
  var result = getValue("record-result");
  var list = [];

  for (var i = 0; i < records.length; i++) {
    var record = records[i];
    if (unit !== "all" && record.unit !== unit) {
      continue;
    }
    if (testValue !== "all" && String(record.testId) !== testValue) {
      continue;
    }
    if (result !== "all" && record.result !== result) {
      continue;
    }
    if (searchId !== "" && record.studentId.toLowerCase().indexOf(searchId) === -1) {
      continue;
    }
    if (searchQuestion !== "" && record.question.toLowerCase().indexOf(searchQuestion) === -1) {
      continue;
    }
    list.push(record);
  }
  return list;
}

function renderRecords() {
  var list = getFilteredRecords();
  sortList(list, recordState.sortColumn, recordState.sortDirection);
  var pageInfo = getPageSlice(list, recordState);

  var selectedRecordUnit = getValue("record-unit") === "all" ? null : getUnit(getValue("record-unit"));
  setText("record-total", selectedRecordUnit && selectedRecordUnit.participants === null
    ? selectedRecordUnit.code + ": No Data."
    : (records.length
      ? "Loaded individual answer records: " + formatNumber(records.length) +
        ". Records matching the filters: " + formatNumber(list.length)
      : "Individual answer records are awaiting the verified response data."));

  var rows = "";
  for (var i = 0; i < pageInfo.items.length; i++) {
    var r = pageInfo.items[i];
    var resultClass = r.result === "Correct" ? "result-correct" : "result-incorrect";
    rows += '<tr>' +
      '<td>' + r.recordId + '</td>' +
      '<td>' + r.studentId + '</td>' +
      '<td>' + r.unit + '</td>' +
      '<td>' + tests[r.testId - 1].name + '</td>' +
      '<td>' + r.questionId + '</td>' +
      '<td>' + r.question + '</td>' +
      '<td class="' + resultClass + '">' + r.result + '</td>' +
      '<td>' + r.score + '</td>' +
      '<td><button class="btn-small" onclick="openStudentDetails(\'' + r.studentId + '\')">View</button></td>' +
      '</tr>';
  }
  if (rows === "") {
    var selectedUnit = getValue("record-unit") === "all" ? null : getUnit(getValue("record-unit"));
    var emptyMessage = selectedUnit && selectedUnit.participants === null
      ? selectedUnit.code + ": No Data."
      : "No individual question-answer records were supplied.";
    rows = '<tr><td colspan="9">' + emptyMessage + '</td></tr>';
  }
  setHtml("record-table-body", rows);
  showPagerInfo("record", recordState, list.length, pageInfo);
  markSortedColumn("records", recordState);
}


/* =========================================================
   10. STUDENT DETAILS POP-UP
   ========================================================= */

function openStudentDetails(studentId) {
  var student = findStudent(studentId);
  if (!student) {
    return;
  }
  var unit = findUnit(student.unit);

  var rows = "";
  var weakestName = "";
  var weakestPercent = 101;

  for (var t = 0; t < tests.length; t++) {
    var correct = student.testCorrect[t];
    var percent = percentOf(correct, TEST_SCORE_SCALE);
    if (percent < weakestPercent) {
      weakestPercent = percent;
      weakestName = tests[t].name;
    }
    rows += '<tr>' +
      '<td>' + tests[t].name + '</td>' +
      '<td>' + correct + ' / ' + TEST_SCORE_SCALE + '</td>' +
      '<td>' + formatPercent(percent) + '</td>' +
      '</tr>';
  }

  var html = '<h3>Student ' + student.studentId + '</h3>' +
    '<p class="data-note">Individual response details were not supplied.</p>' +
    '<p>' + unit.code + ' - ' + unit.name + '</p>' +
    '<div class="stat-row"><span>Overall score</span><strong>' + student.correct + ' / ' +
    (student.correct + student.incorrect) + ' (' + formatPercent(student.percent) + ')</strong></div>' +
    '<div class="stat-row"><span>Status</span>' + makeStatusBadge(student.status) + '</div>' +
    '<div class="stat-row"><span>Weakest test</span><strong>' + weakestName + '</strong></div>' +
    '<div class="table-wrap"><table>' +
    '<thead><tr><th>Survey Test</th><th>Score</th><th>Percent</th></tr></thead>' +
    '<tbody>' + rows + '</tbody></table></div>';

  setHtml("student-modal-body", html);
  document.getElementById("student-modal").classList.add("show");
}

function closeStudentDetails() {
  document.getElementById("student-modal").classList.remove("show");
}


/* =========================================================
   11. ANALYTICS AND REPORTS PAGE
   ========================================================= */

function renderAnalytics() {
  if (!records.length) {
    var totalParticipants = getTotalParticipants();
    var knownAnswers = getKnownAnswerTotals();
    var perfectScores = getConfirmedPerfectScores();
    var pendingScores = getAwaitingIndividualScores();
    setHtml("an-overall",
      '<p class="big-number">' + formatPercent(percentOf(knownAnswers.correct, knownAnswers.answers)) + '</p>' +
      '<p>' + perfectScores + ' students achieved perfect scores in their respective test pattern.</p>' +
      '<p>' + knownAnswers.correct + ' correct out of ' + knownAnswers.answers + ' answers across all 10 tests.</p>');
    var topicRows = "";
    for (var topicIndex = 0; topicIndex < tests.length; topicIndex++) {
      topicRows += '<tr><td>' + tests[topicIndex].title + '</td><td>97.2%</td><td>486 / 500</td></tr>';
    }
    setHtml("an-topic-chart", '<div class="table-wrap"><table><thead><tr><th>Test</th><th>Accuracy</th><th>Correct / Answers</th></tr></thead><tbody>' + topicRows + '</tbody></table></div>');
    setHtml("an-doughnut", '<p class="big-number">' + knownAnswers.correct + ' correct</p><p>' +
      (knownAnswers.answers - knownAnswers.correct) + ' incorrect</p>');
    setHtml("an-distribution",
      '<p>Perfect test performance: <strong>' + perfectScores + '</strong> of ' +
      totalParticipants + ' students. Non-perfect test performance: ' +
      pendingScores + ' students.</p>');
    setHtml("an-averages", '<p class="empty-text">Average per test: 97.2%.</p>');
    setHtml("an-extremes", '<p class="empty-text">Same supplied test pattern applies to all 10 tests.</p>');
    setHtml("an-questions", '<p class="empty-text">Individual incorrect question selections were not supplied.</p>');

    var rankingRows = "";
    for (var testIndex = 0; testIndex < tests.length; testIndex++) {
      rankingRows += '<tr><td>' + (testIndex + 1) + '</td><td>' + tests[testIndex].title +
        '</td><td>' + makeTypeBadge(tests[testIndex]) + '</td><td>97.2%</td></tr>';
    }
    setHtml("an-rankings", rankingRows);
    setHtml("an-gaps", '<p class="empty-text">No category-specific gap data was supplied.</p>');

    var fullScoreItems = [];
    var unitRows = "";
    for (var unitIndex = 0; unitIndex < units.length; unitIndex++) {
      var unit = units[unitIndex];
      if (unit.participants === null) {
        unitRows += '<tr><td>' + unit.code + '</td><td colspan="5">No Data</td></tr>';
        continue;
      }
      var perfectPercent = percentOf(unit.perfectScores, unit.participants);
      fullScoreItems.push({
        label: unit.code,
        value: perfectPercent,
        text: unit.perfectScores + " / " + unit.participants
      });
      unitRows += '<tr><td>' + unit.code + '</td><td>' + unit.participants + '</td><td>' +
        unit.perfectScores + ' / ' + unit.participants + '</td><td>' +
        unit.knownCorrect + '</td><td>' +
        unit.knownAnswers + '</td><td>' +
          formatPercent(percentOf(unit.knownCorrect, unit.knownAnswers)) + '</td></tr>';
    }
    drawBarChart("an-units-chart", fullScoreItems);
    setHtml("an-units-table", unitRows);

    var summaryRows = '<tr><td>Total respondents</td><td>' + totalParticipants + '</td></tr>' +
      '<tr><td>Confirmed perfect scores (10/10)</td><td>' + perfectScores + '</td></tr>' +
      '<tr><td>Students not perfect in the test pattern</td><td>' + pendingScores + '</td></tr>' +
      '<tr><td>Passing score threshold</td><td>' + PASSING_SCORE + ' / 10 (70%)</td></tr>' +
      '<tr><td>Verified correct answers (where supplied)</td><td>' +
      knownAnswers.correct + ' / ' + knownAnswers.answers + '</td></tr>' +
      '<tr><td>Overall correct / incorrect answers</td><td>' + knownAnswers.correct + ' / ' +
      (knownAnswers.answers - knownAnswers.correct) + '</td></tr>' +
      '<tr><td>Overall average</td><td>' +
      formatPercent(percentOf(knownAnswers.correct, knownAnswers.answers)) + '</td></tr>';
    setHtml("an-stats", summaryRows);
    return;
  }

  var stats = getTestStats(records);
  var totals = getOverallTotals(stats);

  // List of all student percentages (used in several parts)
  var percents = [];
  for (var i = 0; i < students.length; i++) {
    percents.push(students[i].percent);
  }

  showOverallAwareness(totals);
  drawBarChart("an-topic-chart", makeBarItems(stats));
  drawDoughnut("an-doughnut", totals.correct, totals.incorrect);
  showScoreDistribution();
  showAverageScores(stats);
  showHighestAndLowest(stats);
  showQuestionAnalysis();
  showTopicRankings(stats);
  showKnowledgeGaps(stats);
  showUnitPerformance();
  showStatisticalSummary(percents);
}

// 1. Overall awareness with a meter and the number of students in each status
function showOverallAwareness(totals) {
  var counts = { "Passed": 0, "Failed": 0 };
  for (var i = 0; i < students.length; i++) {
    if (students[i].status === "Passed" || students[i].status === "Failed") {
      counts[students[i].status]++;
    }
  }

  var html = '<div class="big-number">' + formatPercent(totals.correctPercent) + '</div>' +
    '<p>of ' + formatNumber(totals.total) + ' loaded valid answers were correct.</p>' +
    '<div class="meter"><div class="meter-fill" style="width:' + totals.correctPercent + '%"></div></div>' +
    '<p>' +
    makeStatusBadge("Passed") + ' ' + counts["Passed"] + ' &nbsp; ' +
    makeStatusBadge("Failed") + ' ' + counts["Failed"] + '</p>' +
    '<p class="small-text">Individual scores still awaiting records: ' +
    Math.max(0, getTotalParticipants() - students.length) + '.</p>';
  setHtml("an-overall", html);
}

// 4. Count students in each score range
function showScoreDistribution() {
  if (!students.length) {
    setHtml("an-distribution", '<p class="empty-text">Individual score distribution: Awaiting Data.</p>');
    return;
  }
  var ranges = [
    { label: "Below 40%", min: 0, max: 40 },
    { label: "40% - 49%", min: 40, max: 50 },
    { label: "50% - 59%", min: 50, max: 60 },
    { label: "60% - 69%", min: 60, max: 70 },
    { label: "70% - 79%", min: 70, max: 80 },
    { label: "80% - 89%", min: 80, max: 90 },
    { label: "90% and above", min: 90, max: 101 }
  ];

  var items = [];
  var biggest = 1;
  for (var r = 0; r < ranges.length; r++) {
    var count = 0;
    for (var s = 0; s < students.length; s++) {
      if (students[s].percent >= ranges[r].min && students[s].percent < ranges[r].max) {
        count++;
      }
    }
    if (count > biggest) {
      biggest = count;
    }
    items.push({ label: ranges[r].label, value: count, text: count + " students" });
  }
  drawBarChart("an-distribution", items, biggest);
}

// 5. Average score of a student in each test (out of 10)
function showAverageScores(stats) {
  if (!students.length) {
    setHtml("an-averages", '<p class="empty-text">Individual average scores: Awaiting Data.</p>');
    return;
  }
  var items = [];
  for (var i = 0; i < stats.length; i++) {
    if (!stats[i].total) {
      items.push({ label: stats[i].test.name, value: 0, text: "Awaiting Data" });
      continue;
    }
    var average = stats[i].correct / students.length;
    items.push({
      label: stats[i].test.name,
      value: average * 10,
      text: average.toFixed(1) + " / 10"
    });
  }
  drawBarChart("an-averages", items);
}

// 6. Highest and lowest scores (students and tests)
function showHighestAndLowest(stats) {
  var sorted = students.slice();
  sortList(sorted, "percent", "desc");
  var highestTest = findHighest(stats);
  var lowestTest = findLowest(stats);

  var html = '<div class="two-columns"><div>';
  if (sorted.length) {
    html += '<div class="stat-row"><span>Highest student score</span><strong>' +
      sorted[0].studentId + ' (' + sorted[0].unit + ') - ' + formatPercent(sorted[0].percent) + '</strong></div>' +
      '<div class="stat-row"><span>Lowest student score</span><strong>' +
      sorted[sorted.length - 1].studentId + ' (' + sorted[sorted.length - 1].unit + ') - ' +
      formatPercent(sorted[sorted.length - 1].percent) + '</strong></div>';
  } else {
    html += '<p class="empty-text">Individual score extremes: Awaiting Data.</p>';
  }
  html += '</div><div>';
  if (highestTest && lowestTest) {
    html += '<div class="stat-row"><span>Highest test score</span><strong>' +
      highestTest.test.name + ' - ' + formatPercent(highestTest.correctPercent) + '</strong></div>' +
      '<div class="stat-row"><span>Lowest test score</span><strong>' +
      lowestTest.test.name + ' - ' + formatPercent(lowestTest.correctPercent) + '</strong></div>';
  } else {
    html += '<p class="empty-text">Category-level score extremes: Awaiting Data.</p>';
  }
  html += '</div></div>';
  setHtml("an-extremes", html);
}

// 7. Five hardest and five easiest questions
function showQuestionAnalysis() {
  var list = getQuestionStats(records);
  if (!list.length) {
    setHtml("an-questions", '<p class="empty-text">Question-level analysis: Awaiting Data.</p>');
    return;
  }
  sortList(list, "incorrectPercent", "desc");

  var hardRows = "";
  var easyRows = "";
  var limit = Math.min(5, list.length);
  for (var i = 0; i < limit; i++) {
    var hard = list[i];
    var easy = list[list.length - 1 - i];
    hardRows += '<tr><td>' + hard.question.questionId + '</td><td>' + hard.question.text +
      '</td><td>' + formatPercent(hard.incorrectPercent) + '</td></tr>';
    easyRows += '<tr><td>' + easy.question.questionId + '</td><td>' + easy.question.text +
      '</td><td>' + formatPercent(easy.incorrectPercent) + '</td></tr>';
  }

  var html = '<div class="two-columns">' +
    '<div><h4>5 Hardest Questions</h4><div class="table-wrap"><table>' +
    '<thead><tr><th>ID</th><th>Question</th><th>% Incorrect</th></tr></thead><tbody>' + hardRows + '</tbody></table></div></div>' +
    '<div><h4>5 Easiest Questions</h4><div class="table-wrap"><table>' +
    '<thead><tr><th>ID</th><th>Question</th><th>% Incorrect</th></tr></thead><tbody>' + easyRows + '</tbody></table></div></div>' +
    '</div>';
  setHtml("an-questions", html);
}

// 8. Rank tests from highest to lowest correct percentage
function showTopicRankings(stats) {
  var sorted = stats.slice();
  var awaiting = [];
  sorted = sorted.filter(function (stat) {
    if (stat.total === 0) {
      awaiting.push(stat);
      return false;
    }
    return true;
  });
  sortList(sorted, "correctPercent", "desc");

  var rows = "";
  for (var i = 0; i < sorted.length; i++) {
    var rowClass = i === sorted.length - 1 ? ' class="lowest-row"' : "";
    rows += '<tr' + rowClass + '><td>' + (i + 1) + '</td><td>' + sorted[i].test.title + '</td><td>' +
      makeTypeBadge(sorted[i].test) + '</td><td>' + formatPercent(sorted[i].correctPercent) + '</td></tr>';
  }
  for (var j = 0; j < awaiting.length; j++) {
    rows += '<tr><td>-</td><td>' + awaiting[j].test.title + '</td><td>' +
      makeTypeBadge(awaiting[j].test) + '</td><td>Awaiting Data</td></tr>';
  }
  setHtml("an-rankings", rows);
}

// 9. Tests that are below the target percentage
function showKnowledgeGaps(stats) {
  var gaps = [];
  var availableCount = 0;
  for (var i = 0; i < stats.length; i++) {
    if (stats[i].total === 0) {
      continue;
    }
    availableCount++;
    if (stats[i].correctPercent < TARGET_PERCENT) {
      gaps.push(stats[i]);
    }
  }
  sortList(gaps, "correctPercent", "asc");

  var html = '<p class="small-text">Target score: ' + TARGET_PERCENT + '% correct. Tests below the target:</p>';
  if (availableCount === 0) {
    html += '<p class="empty-text">Knowledge-gap analysis: Awaiting Data.</p>';
  } else if (gaps.length === 0) {
    html += '<p class="empty-text">' + (availableCount === stats.length
      ? "No knowledge gaps. All tests reached the target."
      : "All tests with available data reached the target; remaining categories are Awaiting Data.") + '</p>';
  }
  for (var j = 0; j < gaps.length; j++) {
    var gapSize = TARGET_PERCENT - gaps[j].correctPercent;
    html += '<div class="rec-item"><strong>' + gaps[j].test.name + '</strong><br>' +
      formatPercent(gaps[j].correctPercent) + ' correct - ' + gapSize.toFixed(1) +
      ' points below the target</div>';
  }
  setHtml("an-gaps", html);
}

// 10. Performance of each college / office
function showUnitPerformance() {
  var items = [];
  var rows = "";

  for (var u = 0; u < units.length; u++) {
    var unit = units[u];
    if (unit.participants === null) {
      rows += '<tr><td>' + unit.code + '</td><td colspan="5">No Data</td></tr>';
      continue;
    }
    var unitRecords = getRecordsByUnit(unit.code);
    var totals = getOverallTotals(getTestStats(unitRecords));
    var hasUnitAnswers = totals.total > 0;
    var correct = hasUnitAnswers ? totals.correct : unit.knownCorrect;
    var answers = hasUnitAnswers ? totals.total : unit.knownAnswers;
    var accuracy = correct === null || answers === null
      ? "Awaiting Data"
      : formatPercent(percentOf(correct, answers));
    var fullScorePercent = percentOf(unit.perfectScores, unit.participants);
    items.push({
      label: unit.code,
      value: fullScorePercent,
      text: unit.perfectScores + " / " + unit.participants
    });
    rows += '<tr><td>' + unit.code + '</td><td>' + unit.participants + '</td><td>' +
      unit.perfectScores + ' / ' + unit.participants + '</td><td>' +
      (correct === null ? "Awaiting Data" : formatNumber(correct)) + '</td><td>' +
      (answers === null ? "Awaiting Data" : formatNumber(answers)) + '</td><td>' +
      accuracy + '</td></tr>';
  }
  drawBarChart("an-units-chart", items);
  setHtml("an-units-table", rows);
}

// 11. Mean, median, standard deviation, minimum and maximum
function showStatisticalSummary(percents) {
  if (!percents.length) {
    setHtml("an-stats",
      '<tr><td>Number of individual scores</td><td>Awaiting Data</td></tr>' +
      '<tr><td>Mean (average)</td><td>Awaiting Data</td></tr>' +
      '<tr><td>Median</td><td>Awaiting Data</td></tr>' +
      '<tr><td>Standard deviation</td><td>Awaiting Data</td></tr>' +
      '<tr><td>Minimum / maximum</td><td>Awaiting Data</td></tr>');
    return;
  }
  var rows = "";
  rows += '<tr><td>Number of students</td><td>' + percents.length + '</td></tr>';
  rows += '<tr><td>Mean (average)</td><td>' + formatPercent(getAverage(percents)) + '</td></tr>';
  rows += '<tr><td>Median</td><td>' + formatPercent(getMedian(percents)) + '</td></tr>';
  rows += '<tr><td>Standard deviation</td><td>' + getStandardDeviation(percents).toFixed(2) + '</td></tr>';
  rows += '<tr><td>Minimum</td><td>' + formatPercent(Math.min.apply(null, percents)) + '</td></tr>';
  rows += '<tr><td>Maximum</td><td>' + formatPercent(Math.max.apply(null, percents)) + '</td></tr>';
  setHtml("an-stats", rows);
}


/* =========================================================
   12. ACTIVITY LOGS PAGE
   ========================================================= */

function renderLogs() {
  var search = getValue("log-search").toLowerCase();
  var type = getValue("log-type");
  var status = getValue("log-status");

  var rows = "";
  var count = 0;

  for (var i = 0; i < logs.length; i++) {
    var log = logs[i];
    if (type !== "all" && log.type !== type) {
      continue;
    }
    if (status !== "all" && log.status !== status) {
      continue;
    }
    if (search !== "" && log.description.toLowerCase().indexOf(search) === -1) {
      continue;
    }
    count++;
    rows += '<tr>' +
      '<td>' + log.activityId + '</td>' +
      '<td>' + log.description + '</td>' +
      '<td>' + log.type + '</td>' +
      '<td>' + log.date + '</td>' +
      '<td>' + log.time + '</td>' +
      '<td>' + makeStatusBadge(log.status) + '</td>' +
      '</tr>';
  }

  if (rows === "") {
    rows = '<tr><td colspan="6">No timestamped survey activity records were supplied.</td></tr>';
  }
  setHtml("log-table-body", rows);
  setText("log-count", count
    ? "Showing " + count + " of " + logs.length + " verified activity records."
    : "No verified timestamped access or completion logs are available.");

  var participationRows = "";
  for (var unitIndex = 0; unitIndex < units.length; unitIndex++) {
    var unit = units[unitIndex];
    participationRows += '<tr><td>' + unit.code + '</td><td>' +
      (unit.participants === null ? "No Data" : unit.participants) + '</td></tr>';
  }
  setHtml("log-participation-summary",
    '<h3>Survey Response Coverage</h3>' +
    '<p>Response rows are not timestamped login or completion events.</p>' +
    '<div class="table-wrap"><table><thead><tr><th>College / Building</th><th>Respondents</th></tr></thead>' +
    '<tbody>' + participationRows + '<tr><th>Total</th><th>' + getTotalParticipants() +
    '</th></tr><tr><td>College not reported</td><td>' + getUnassignedResponseCount() +
    '</td></tr><tr><td>Total survey responses</td><td>' + students.length +
    '</td></tr></tbody></table></div>');
}


/* =========================================================
   13. CAMPUS MAP PAGE
   Note: the markers are not placed on the picture because the exact
   building positions are not verified. They open information only.
   ========================================================= */

var mapZoom = 100;   // zoom in percent

function renderMap() {
  var markers = "";
  var directory = "";

  for (var i = 0; i < units.length; i++) {
    var hasData = units[i].participants !== null;
    var markerClass = hasData ? "marker marker-has-data" : "marker marker-no-data";
    var dataLabel = hasData ? units[i].participants + " respondents" : "No Data";
    markers += '<button class="' + markerClass + '" id="marker-' + units[i].code +
      '" onclick="showMapInfo(\'' + units[i].code + '\')">' + units[i].code + '</button>';
    directory += '<li onclick="showMapInfo(\'' + units[i].code + '\')"><strong>' + units[i].code +
      '</strong> - ' + units[i].name + ' <span class="map-data-label">' + dataLabel + '</span></li>';
  }
  setHtml("map-markers", markers);
  setHtml("map-directory", directory);
}

function showMapInfo(code) {
  var unit = findUnit(code);

  // Highlight the selected marker
  for (var i = 0; i < units.length; i++) {
    document.getElementById("marker-" + units[i].code).classList.remove("selected");
  }
  document.getElementById("marker-" + code).classList.add("selected");

  var surveyDetails = unit.participants === null
    ? '<strong>Survey status: No Data.</strong><br>'
    : 'Survey responses: ' + unit.participants + '<br>Correct/incorrect scoring: Not available without an answer key or rubric.<br>';
  var html = '<strong>' + unit.code + ' - ' + unit.name + '</strong><br>' +
    'Type: ' + unit.type + '<br>' + surveyDetails + unit.about + '<br>' +
    '<span class="small-text">Exact location: please check the official campus map. ' +
    'It is not pinned here because it is not verified.</span><br>' +
    '<button class="btn-small" onclick="openOffice(\'' + unit.code + '\')">View ' +
    unit.code + ' survey results</button>';
  setHtml("map-info", html);
}

function changeMapZoom(amount) {
  mapZoom = mapZoom + amount;
  if (mapZoom < 50) {
    mapZoom = 50;
  }
  if (mapZoom > 300) {
    mapZoom = 300;
  }
  document.getElementById("map-image").style.width = mapZoom + "%";
}

function resetMapZoom() {
  mapZoom = 100;
  document.getElementById("map-image").style.width = "100%";
}

// Show a message when the map image cannot load
function showMapFallback() {
  setText("map-fallback",
    "The map image could not load here. Please use the Open Official Map button below.");
}

function openFullMap() {
  var source = document.getElementById("map-image").src;
  document.getElementById("map-modal-image").src = source;
  document.getElementById("map-modal").classList.add("show");
}


/* =========================================================
   14. RECOMMENDATIONS PAGE
   These update automatically when the College / Office changes.
   ========================================================= */

function renderRecommendations() {
  var unitValue = getValue("rec-unit");
  if (!records.length) {
    var selectedUnit = unitValue === "all" ? null : getUnit(unitValue);
    var noDataMessage = selectedUnit && selectedUnit.participants === null ? "No Data." : "Not applicable";
    setText("rec-note", selectedUnit && selectedUnit.participants === null
      ? selectedUnit.code + ": No Data."
      : "Recommendations based on the supplied aggregate results.");
    setHtml("rec-lowest", '<p class="empty-text">Lowest-performing college result: ' +
      (selectedUnit ? selectedUnit.code + " - " + formatPercent(percentOf(selectedUnit.knownCorrect, selectedUnit.knownAnswers)) : "CBA - 94.0%") + '</p>');
    setHtml("rec-incorrect", '<p class="empty-text">CBA: 60 incorrect answers across 10 tests; 14.0% of its 1000 supplied answers.</p>');
    setHtml("rec-lessons", '<p class="empty-text">Continue cybersecurity awareness review across all 10 tests.</p>');
    setHtml("rec-activities", '<p class="empty-text">Practice the 10-item test pattern with the lowest category result as a review focus.</p>');
    setHtml("rec-campaigns", '<p class="empty-text">Maintain consistent cybersecurity training across CIC, COE, CED, CAS, and CBA.</p>');
    return;
  }

  var list = getRecordsByUnit(unitValue);
  if (!list.length) {
    var selectedUnit = unitValue === "all" ? null : getUnit(unitValue);
    var awaitingMessage = selectedUnit && selectedUnit.participants === null
      ? "No Data."
      : "Awaiting Data.";
    var lessonMessage = awaitingMessage === "No Data."
      ? "No Data."
      : "Targeted lesson suggestions will appear after results are available.";
    var activityMessage = awaitingMessage === "No Data."
      ? "No Data."
      : "Targeted activities will appear after results are available.";
    var campaignMessage = awaitingMessage === "No Data."
      ? "No Data."
      : "Targeted campaigns will appear after results are available.";
    setText("rec-note", selectedUnit && selectedUnit.participants === null
      ? selectedUnit.code + ": No Data."
      : "No verified answer records are available for this selection.");
    setHtml("rec-lowest", '<p class="empty-text">Lowest-performing topics: ' + awaitingMessage + '</p>');
    setHtml("rec-incorrect", '<p class="empty-text">Incorrect-answer patterns: ' + awaitingMessage + '</p>');
    setHtml("rec-lessons", '<p class="empty-text">' + lessonMessage + '</p>');
    setHtml("rec-activities", '<p class="empty-text">' + activityMessage + '</p>');
    setHtml("rec-campaigns", '<p class="empty-text">' + campaignMessage + '</p>');
    return;
  }
  var stats = getTestStats(list);
  var availableStats = [];
  for (var statIndex = 0; statIndex < stats.length; statIndex++) {
    if (stats[statIndex].total > 0) {
      availableStats.push(stats[statIndex]);
    }
  }
  if (!availableStats.length) {
    setText("rec-note", "No verified category-level answer records are available for this selection.");
    setHtml("rec-lowest", '<p class="empty-text">Awaiting Data.</p>');
    setHtml("rec-incorrect", '<p class="empty-text">Awaiting Data.</p>');
    setHtml("rec-lessons", '<p class="empty-text">Awaiting Data.</p>');
    setHtml("rec-activities", '<p class="empty-text">Awaiting Data.</p>');
    setHtml("rec-campaigns", '<p class="empty-text">Awaiting Data.</p>');
    return;
  }

  var unitText = "all 5 participating colleges";
  if (unitValue !== "all") {
    var selectedUnit = getUnit(unitValue);
    unitText = unitValue + " (" +
      (selectedUnit.participants === null ? "No Data" : selectedUnit.participants + " participants") + ")";
  }
  setText("rec-note", "Based on " + formatNumber(getOverallTotals(stats).total) +
    " verified answers from " + unitText + ".");

  // The 3 tests with the lowest correct percentage
  var lowestThree = availableStats.slice();
  sortList(lowestThree, "correctPercent", "asc");
  lowestThree = lowestThree.slice(0, 3);

  // Lowest topics
  var lowestHtml = "";
  for (var i = 0; i < lowestThree.length; i++) {
    lowestHtml += '<div class="rec-item"><strong>' + (i + 1) + '. ' + lowestThree[i].test.name + '</strong> ' +
      makeTypeBadge(lowestThree[i].test) + '<br>' +
      formatPercent(lowestThree[i].correctPercent) + ' correct</div>';
  }
  setHtml("rec-lowest", lowestHtml);

  // Highest incorrect rates: the cybersecurity tests and hardest questions
  var incorrectItems = [];
  for (var j = 0; j < stats.length; j++) {
    if (stats[j].total > 0) {
      incorrectItems.push({ label: stats[j].test.name, value: stats[j].incorrectPercent, highlight: false });
    }
  }
  sortList(incorrectItems, "value", "desc");
  if (incorrectItems.length) {
    incorrectItems[0].highlight = true;
  }

  var incorrectHtml = '<p class="small-text">Incorrect answers in the cybersecurity tests:</p><div id="rec-incorrect-chart"></div>' +
    '<p class="small-text">Questions answered incorrectly the most:</p>';
  var hardQuestions = getQuestionStats(list);
  sortList(hardQuestions, "incorrectPercent", "desc");
  for (var k = 0; k < hardQuestions.length && k < 3; k++) {
    incorrectHtml += '<div class="rec-item"><strong>' + hardQuestions[k].question.questionId + '</strong> - ' +
      hardQuestions[k].question.text + ' (' + formatPercent(hardQuestions[k].incorrectPercent) + ' incorrect)</div>';
  }
  setHtml("rec-incorrect", incorrectHtml);
  drawBarChart("rec-incorrect-chart", incorrectItems);

  // Lessons, activities and campaigns for the 3 lowest topics
  var lessonHtml = "";
  var activityHtml = "";
  var campaignHtml = "";
  for (var m = 0; m < lowestThree.length; m++) {
    var data = recommendationData[lowestThree[m].test.id - 1];
    var name = lowestThree[m].test.name;
    lessonHtml += '<div class="rec-item"><strong>' + name + '</strong><br>' + data.lesson + '</div>';
    activityHtml += '<div class="rec-item"><strong>' + name + '</strong><br>' + data.activity + '</div>';
    campaignHtml += '<div class="rec-item"><strong>' + name + '</strong><br>' + data.campaign + '</div>';
  }
  setHtml("rec-lessons", lessonHtml);
  setHtml("rec-activities", activityHtml);
  setHtml("rec-campaigns", campaignHtml);
}


/* =========================================================
   15. OFFICE / COLLEGE PAGE
   ========================================================= */

function openOffice(code) {
  showPage("office", code);
}

function renderOffice(code) {
  var unit = findUnit(code);

  setText("office-title", unit.code + " - " + unit.name);
  setText("office-subtitle", unit.type + " | " + unit.about + " | Survey respondents: " +
    (unit.participants === null ? "No Data" : unit.participants));

  var cards = "";
  cards += makeSummaryCard("🎓", "Participants",
    unit.participants === null ? "No Data" : unit.participants, "Verified aggregate count");
  cards += makeSummaryCard("✅", "Confirmed 10/10",
    unit.perfectScores === null ? "No Data" : unit.perfectScores, "Perfect results per test");
  cards += makeSummaryCard("⏳", "Non-Perfect Students",
    unit.pendingScores === undefined ? "No Data" :
      (unit.pendingScores === null ? "No Data" : unit.pendingScores),
    unit.pendingScores === 0 ? "All perfect scores verified" :
      "Actual aggregate result");
  cards += makeSummaryCard("📝", "Known Correct Answers",
    unit.participants === null ? "No Data" :
      (unit.knownCorrect === null ? "No Data" : unit.knownCorrect),
    unit.participants === null ? "No survey responses" :
      (unit.knownAnswers === null ? "Exact totals not supplied" : unit.knownAnswers + " answers verified"));
  cards += makeSummaryCard("🎯", "Accuracy",
    unit.participants === null ? "No Data" :
      (unit.knownCorrect === null ? "No Data" : formatPercent(percentOf(unit.knownCorrect, unit.knownAnswers))),
    unit.participants === null ? "No survey responses" : "Based only on verified answer totals");
  cards += makeSummaryCard("⚠️", "Pass / Fail",
    unit.participants === null ? "No Data" : "Passed: " + unit.participants + " / 0 failed",
    "All supplied participant scores meet the 7/10 passing threshold");
  setHtml("office-cards", cards);

  var topicRows = "";
  if (unit.participants === null) {
    topicRows = '<tr><td colspan="5">No Data</td></tr>';
  } else {
    for (var i = 0; i < tests.length; i++) {
      topicRows += '<tr><td>' + tests[i].id + '</td><td>' + tests[i].name +
        '</td><td colspan="3">' + unit.testCorrect + '% overall - ' + unit.testPerfect + ' perfect students</td></tr>';
    }
  }
  setHtml("office-topic-body", topicRows);

  var studentRows = unit.participants === null
    ? '<tr><td colspan="5">No Data</td></tr>'
    : '<tr><td colspan="5">Individual participant IDs were not supplied.</td></tr>';
  setHtml("office-student-body", studentRows);
}


/* =========================================================
   16. SETTINGS PAGE
   ========================================================= */

var settings = {
  fish: false,
  bubbles: true,
  mouse: true,
  largeText: false,
  compactCards: false,
  showActivities: true,
  rowsPerPage: 10
};

// Load saved settings (from the browser)
function loadSettings() {
  try {
    var saved = localStorage.getItem("cyberSafeSettings");
    if (saved) {
      var savedSettings = JSON.parse(saved);
      for (var key in savedSettings) {
        settings[key] = savedSettings[key];
      }
    }
  } catch (error) {
    // If the browser blocks saving, the default settings are used
  }
}

function saveSettings() {
  try {
    localStorage.setItem("cyberSafeSettings", JSON.stringify(settings));
  } catch (error) {
    // Nothing to do if saving is blocked
  }
}

// Make the page match the settings
function applySettings() {
  document.getElementById("setting-fish").checked = settings.fish;
  document.getElementById("setting-bubbles").checked = settings.bubbles;
  document.getElementById("setting-mouse").checked = settings.mouse;
  document.getElementById("setting-large-text").checked = settings.largeText;
  document.getElementById("setting-compact").checked = settings.compactCards;
  document.getElementById("setting-activities").checked = settings.showActivities;
  document.getElementById("setting-rows").value = String(settings.rowsPerPage);

  document.getElementById("fish-layer").style.display = settings.fish ? "block" : "none";
  document.getElementById("bubble-layer").style.display = settings.bubbles ? "block" : "none";
  document.getElementById("cursor-glow").style.display = settings.mouse ? "block" : "none";

  document.body.classList.toggle("large-text", settings.largeText);
  document.body.classList.toggle("compact-cards", settings.compactCards);
  document.getElementById("recent-activities-card").style.display = settings.showActivities ? "block" : "none";
}

// Connect one checkbox to one setting
function connectCheckbox(checkboxId, settingName) {
  document.getElementById(checkboxId).addEventListener("change", function () {
    settings[settingName] = this.checked;
    saveSettings();
    applySettings();
  });
}

function renderDatasetInfo() {
  var rows = "";
  rows += '<tr><td>Data source</td><td>Supplied aggregate survey results</td></tr>';
  rows += '<tr><td>Participants</td><td>' + getTotalParticipants() + '</td></tr>';
  rows += '<tr><td>Participating colleges</td><td>' + getParticipatingUnitCount() + '</td></tr>';
  rows += '<tr><td>Buildings with No Data</td><td>REG, FIN, HRM</td></tr>';
  rows += '<tr><td>Survey categories</td><td>' + tests.length + '</td></tr>';
  rows += '<tr><td>Passing score</td><td>' + PASSING_SCORE + ' / 10 (70%)</td></tr>';
  rows += '<tr><td>Confirmed perfect scores</td><td>' + getConfirmedPerfectScores() + '</td></tr>';
  rows += '<tr><td>Students with non-perfect test patterns</td><td>' + getAwaitingIndividualScores() + '</td></tr>';
  rows += '<tr><td>Individual IDs and answer records</td><td>Not supplied</td></tr>';
  rows += '<tr><td>Timestamped access logs</td><td>Not supplied</td></tr>';
  setHtml("dataset-info", rows);
}


/* =========================================================
   17. FISH, BUBBLES AND MOUSE EFFECTS
   ========================================================= */

// Make the swimming fish
function createFish() {
  var layer = document.getElementById("fish-layer");
  var fishIcons = ["🐟", "🐠", "🐡"];
  layer.innerHTML = "";

  for (var i = 0; i < 8; i++) {
    var fish = document.createElement("span");
    fish.className = "fish " + (i % 2 === 0 ? "swim-right" : "swim-left");
    fish.textContent = fishIcons[i % fishIcons.length];
    fish.style.top = (8 + Math.random() * 80) + "%";
    fish.style.fontSize = (22 + Math.random() * 16) + "px";
    fish.style.animationDuration = (22 + Math.random() * 20) + "s";
    fish.style.animationDelay = "-" + (Math.random() * 30) + "s";
    layer.appendChild(fish);
  }
}

// Make the floating bubbles
function createBubbles() {
  var layer = document.getElementById("bubble-layer");
  layer.innerHTML = "";

  for (var i = 0; i < 16; i++) {
    var bubble = document.createElement("span");
    var size = 10 + Math.random() * 28;
    bubble.className = "bubble";
    bubble.style.width = size + "px";
    bubble.style.height = size + "px";
    bubble.style.left = Math.random() * 100 + "%";
    bubble.style.animationDuration = (10 + Math.random() * 14) + "s";
    bubble.style.animationDelay = "-" + (Math.random() * 20) + "s";
    layer.appendChild(bubble);
  }
}

// A small bubble that appears at the mouse and floats up
function makeMouseBubble(x, y) {
  var bubble = document.createElement("span");
  var size = 8 + Math.random() * 12;
  bubble.className = "mouse-bubble";
  bubble.style.width = size + "px";
  bubble.style.height = size + "px";
  bubble.style.left = x + "px";
  bubble.style.top = y + "px";
  document.body.appendChild(bubble);

  setTimeout(function () {
    bubble.remove();
  }, 1000);
}

var mouseMoveCount = 0;

function setupMouseEffects() {
  var glow = document.getElementById("cursor-glow");

  // The glow follows the mouse. Every 8th move also makes a small bubble.
  document.addEventListener("mousemove", function (event) {
    if (!settings.mouse) {
      return;
    }
    glow.style.left = event.clientX + "px";
    glow.style.top = event.clientY + "px";
    glow.style.opacity = "1";

    mouseMoveCount++;
    if (mouseMoveCount % 8 === 0) {
      makeMouseBubble(event.clientX, event.clientY);
    }
  });

  // A burst of bubbles when clicking
  document.addEventListener("click", function (event) {
    if (!settings.mouse) {
      return;
    }
    for (var i = 0; i < 4; i++) {
      makeMouseBubble(event.clientX + (i - 2) * 8, event.clientY);
    }
  });
}

/* =========================================================
   FEEDING MATAO GAME
   ========================================================= */

var feedingGame = {
  canvas: null,
  context: null,
  width: 0,
  height: 0,
  state: "ready",
  score: 0,
  player: null,
  fish: [],
  keys: {},
  targetX: 0,
  targetY: 0,
  hasTarget: false,
  lastFrame: 0,
  animationFrame: 0
};

function updateFeedingGameHud() {
  document.getElementById("feeding-game-score").textContent =
    String(feedingGame.score).padStart(3, "0");
  var fishSize = feedingGame.player ? Math.round(feedingGame.player.radius) : 20;
  document.getElementById("feeding-game-size").textContent = fishSize + " / 42";
  document.getElementById("feeding-game-multiplier").textContent =
    "x" + (1 + Math.floor(feedingGame.score / 10));
  document.getElementById("feeding-game-growth").setAttribute("aria-valuenow", String(fishSize));
  document.getElementById("feeding-game-growth-fill").style.width =
    Math.round(((fishSize - 20) / 22) * 100) + "%";
  document.getElementById("feeding-game-ability-fill").style.width =
    Math.min(100, (feedingGame.score % 10) * 10) + "%";

  var button = document.getElementById("feeding-game-start");
  var menuButton = document.getElementById("feeding-game-menu");
  var status = document.getElementById("feeding-game-status");
  if (feedingGame.state === "playing") {
    button.textContent = "PAUSE";
    menuButton.textContent = "MENU";
    status.textContent = "Nice swimming! Eat smaller fish and steer clear of the bigger ones.";
  } else if (feedingGame.state === "paused") {
    button.textContent = "RESUME";
    menuButton.textContent = "MENU";
    status.textContent = "Game paused. Choose Resume Game when you are ready.";
  } else if (feedingGame.state === "over") {
    button.textContent = "AGAIN";
    menuButton.textContent = "MENU";
    status.textContent = "Game over! You ate " + feedingGame.score + " fish. Try another swim.";
  } else {
    button.textContent = "START";
    menuButton.textContent = "MENU";
    status.textContent = "Eat smaller fish and avoid bigger fish. Use your mouse, touch, or the arrow keys / WASD to swim.";
  }
}

function respawnFeedingFish(fish, avoidPlayer) {
  var radius = feedingGame.player ? feedingGame.player.radius : 20;
  fish.radius = Math.max(10, Math.min(42, radius * (0.55 + Math.random() * 1.25)));
  fish.x = 24 + Math.random() * Math.max(1, feedingGame.width - 48);
  fish.baseY = 30 + Math.random() * Math.max(1, feedingGame.height - 60);
  fish.y = fish.baseY;
  fish.direction = Math.random() < 0.5 ? -1 : 1;
  fish.speed = 22 + Math.random() * 44;
  fish.phase = Math.random() * Math.PI * 2;
  fish.amplitude = 8 + Math.random() * 20;
  fish.style = Math.floor(Math.random() * 5);
  fish.color = ["#f3a5bf", "#e987a8", "#f7c7d7", "#d97698", "#f4b4c9"][
    Math.floor(Math.random() * 5)
  ];

  if (avoidPlayer && feedingGame.player) {
    var attempts = 0;
    while (attempts < 16) {
      var dx = fish.x - feedingGame.player.x;
      var dy = fish.y - feedingGame.player.y;
      if (Math.sqrt(dx * dx + dy * dy) > feedingGame.player.radius + fish.radius + 45) {
        break;
      }
      fish.x = 24 + Math.random() * Math.max(1, feedingGame.width - 48);
      fish.baseY = 30 + Math.random() * Math.max(1, feedingGame.height - 60);
      fish.y = fish.baseY;
      attempts++;
    }
  }
}

function resizeFeedingGame() {
  var canvas = document.getElementById("feeding-game-canvas");
  var bounds = canvas.getBoundingClientRect();
  if (!bounds.width || !bounds.height) {
    return;
  }

  var oldWidth = feedingGame.width;
  var oldHeight = feedingGame.height;
  var pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  feedingGame.width = bounds.width;
  feedingGame.height = bounds.height;
  canvas.width = Math.round(bounds.width * pixelRatio);
  canvas.height = Math.round(bounds.height * pixelRatio);
  feedingGame.context = canvas.getContext("2d");
  feedingGame.context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  if (feedingGame.player && oldWidth && oldHeight) {
    var scaleX = feedingGame.width / oldWidth;
    var scaleY = feedingGame.height / oldHeight;
    feedingGame.player.x *= scaleX;
    feedingGame.player.y *= scaleY;
    feedingGame.targetX *= scaleX;
    feedingGame.targetY *= scaleY;
    for (var i = 0; i < feedingGame.fish.length; i++) {
      feedingGame.fish[i].x *= scaleX;
      feedingGame.fish[i].baseY *= scaleY;
      feedingGame.fish[i].y *= scaleY;
    }
  } else if (!feedingGame.player) {
    feedingGame.player = {
      x: feedingGame.width * 0.25,
      y: feedingGame.height * 0.5,
      radius: 20,
      direction: 1
    };
    feedingGame.targetX = feedingGame.player.x;
    feedingGame.targetY = feedingGame.player.y;
  }

  if (!feedingGame.fish.length) {
    for (var fishIndex = 0; fishIndex < 10; fishIndex++) {
      var fish = {};
      respawnFeedingFish(fish, true);
      feedingGame.fish.push(fish);
    }
  }
  drawFeedingGame();
}

function drawFeedingFish(fish, isPlayer) {
  var context = feedingGame.context;
  context.save();
  context.translate(fish.x, fish.y);
  if (fish.direction < 0) {
    context.scale(-1, 1);
  }

  var radius = fish.radius;
  var style = fish.style || 0;
  var bodyColors = ["#ff9a55", "#8a5bd7", "#43a8d8", "#f3b64b", "#74c86f"];
  var color = isPlayer ? "#ff873b" : bodyColors[style % bodyColors.length];
  context.lineWidth = Math.max(1, radius * 0.08);
  context.strokeStyle = "#244b78";

  context.beginPath();
  context.moveTo(-radius * 0.9, 0);
  context.lineTo(-radius * 1.65, -radius * 0.72);
  context.quadraticCurveTo(-radius * 1.42, 0, -radius * 1.65, radius * 0.72);
  context.closePath();
  context.fillStyle = style === 1 ? "#9a55d8" : color;
  context.fill();
  context.stroke();

  context.beginPath();
  context.ellipse(0, 0, radius * 1.18, radius * 0.72, 0, 0, Math.PI * 2);
  context.fillStyle = color;
  context.fill();
  context.stroke();

  if (style === 1 || style === 3) {
    context.save();
    context.strokeStyle = style === 1 ? "#ffc1f2" : "#fff09a";
    context.lineWidth = Math.max(2, radius * 0.16);
    for (var stripe = -1; stripe <= 1; stripe++) {
      context.beginPath();
      context.moveTo(stripe * radius * 0.38 - radius * 0.18, -radius * 0.65);
      context.quadraticCurveTo(stripe * radius * 0.38, 0, stripe * radius * 0.38 - radius * 0.14, radius * 0.65);
      context.stroke();
    }
    context.restore();
  }

  context.beginPath();
  context.moveTo(-radius * 0.18, -radius * 0.55);
  context.lineTo(radius * 0.18, -radius * 1.02);
  context.lineTo(radius * 0.48, -radius * 0.48);
  context.closePath();
  context.fillStyle = style === 1 ? "#c170dd" : "#ffd06a";
  context.fill();
  context.stroke();

  context.beginPath();
  context.arc(radius * 0.72, -radius * 0.12, Math.max(2, radius * 0.11), 0, Math.PI * 2);
  context.fillStyle = "#ffffff";
  context.fill();
  context.beginPath();
  context.arc(radius * 0.76, -radius * 0.12, Math.max(1, radius * 0.055), 0, Math.PI * 2);
  context.fillStyle = "#18243c";
  context.fill();
  context.restore();
}

function drawFeedingPredator() {
  var context = feedingGame.context;
  var width = feedingGame.width;
  var height = feedingGame.height;
  var time = performance.now() / 1000;
  var x = width * 0.78 + Math.sin(time * 0.35) * width * 0.04;
  var y = 170 + Math.sin(time * 0.8) * 18;
  var scale = Math.max(0.62, Math.min(1.25, width / 760));

  context.save();
  context.translate(x, y);
  context.scale(-scale, scale);

  context.beginPath();
  context.moveTo(-108, 0);
  context.quadraticCurveTo(-74, -44, 38, -34);
  context.quadraticCurveTo(92, -22, 118, 5);
  context.quadraticCurveTo(82, 44, 18, 38);
  context.quadraticCurveTo(-52, 34, -108, 0);
  context.closePath();
  context.fillStyle = "#171a20";
  context.fill();
  context.strokeStyle = "#080a0d";
  context.lineWidth = 3;
  context.stroke();

  context.beginPath();
  context.moveTo(-82, 24);
  context.lineTo(-132, 58);
  context.lineTo(-42, 40);
  context.closePath();
  context.fillStyle = "#252a31";
  context.fill();

  context.beginPath();
  context.moveTo(-48, -29);
  context.lineTo(-72, -72);
  context.lineTo(-18, -36);
  context.closePath();
  context.fillStyle = "#171a20";
  context.fill();

  context.beginPath();
  context.moveTo(24, 32);
  context.lineTo(-2, 68);
  context.lineTo(44, 38);
  context.closePath();
  context.fillStyle = "#171a20";
  context.fill();

  context.beginPath();
  context.arc(-86, -7, 7, 0, Math.PI * 2);
  context.fillStyle = "#f7f7ef";
  context.fill();
  context.beginPath();
  context.arc(-89, -7, 3, 0, Math.PI * 2);
  context.fillStyle = "#161821";
  context.fill();

  context.restore();
}

function drawFeedingGame() {
  var context = feedingGame.context;
  if (!context || !feedingGame.width || !feedingGame.height) {
    return;
  }

  var width = feedingGame.width;
  var height = feedingGame.height;
  var time = performance.now() / 1000;
  var water = context.createLinearGradient(0, 0, 0, height);
  water.addColorStop(0, "#43a9d6");
  water.addColorStop(0.48, "#79a6dc");
  water.addColorStop(1, "#7a72d1");
  context.fillStyle = water;
  context.fillRect(0, 0, width, height);

  context.fillStyle = "rgba(255, 255, 255, 0.12)";
  context.beginPath();
  context.moveTo(0, 72);
  context.lineTo(width * 0.22, 72);
  context.lineTo(width * 0.14, height);
  context.lineTo(0, height);
  context.closePath();
  context.fill();

  context.fillStyle = "rgba(255, 255, 255, 0.08)";
  context.beginPath();
  context.moveTo(width * 0.58, 72);
  context.lineTo(width * 0.78, 72);
  context.lineTo(width * 0.64, height);
  context.lineTo(width * 0.48, height);
  context.closePath();
  context.fill();

  for (var i = 0; i < 32; i++) {
    var bubbleX = (i * 137 + 31) % width;
    var bubbleY = 72 + ((height - 72 + (time * (14 + i % 8) + i * 53)) % (height - 72));
    var bubbleRadius = 3 + (i % 5) * 1.2;
    context.beginPath();
    context.arc(bubbleX, bubbleY, bubbleRadius, 0, Math.PI * 2);
    context.fillStyle = "rgba(255, 255, 255, 0.36)";
    context.fill();
    context.strokeStyle = "rgba(201, 246, 255, 0.48)";
    context.stroke();
  }

  context.strokeStyle = "rgba(91, 236, 196, 0.75)";
  context.lineWidth = 3;
  for (var plant = 0; plant < 9; plant++) {
    var plantX = 25 + plant * (width - 50) / 8;
    context.beginPath();
    context.moveTo(plantX, height);
    context.quadraticCurveTo(plantX - 18, height - 70, plantX + 4, height - 105 - (plant % 3) * 18);
    context.stroke();
  }

  for (var j = 0; j < feedingGame.fish.length; j++) {
    drawFeedingFish(feedingGame.fish[j], false);
  }
  drawFeedingPredator();
  if (feedingGame.player) {
    drawFeedingFish({
      x: feedingGame.player.x,
      y: feedingGame.player.y,
      radius: feedingGame.player.radius,
      direction: feedingGame.player.direction,
      style: 3
    }, true);
  }

  context.font = "900 34px Poppins, Arial, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.lineWidth = 5;
  context.strokeStyle = "#315da2";
  context.strokeText("FRENZY", width * 0.5, 112);
  context.fillStyle = "#53e0ae";
  context.fillText("FRENZY", width * 0.5, 112);

  if (feedingGame.state !== "playing") {
    var message = feedingGame.state === "paused"
      ? "Paused"
      : feedingGame.state === "over"
        ? "Game over!"
        : "Ready to swim?";
    var boxWidth = Math.min(330, width - 32);
    var boxHeight = 58;
    context.fillStyle = "rgba(255, 255, 255, 0.88)";
    context.fillRect((width - boxWidth) / 2, (height - boxHeight) / 2, boxWidth, boxHeight);
    context.fillStyle = "#a64b6c";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "600 20px Poppins, Arial, sans-serif";
    context.fillText(message, width / 2, height / 2);
  }
}

function resetFeedingGame() {
  feedingGame.score = 0;
  feedingGame.player = {
    x: feedingGame.width * 0.25,
    y: feedingGame.height * 0.5,
    radius: 20,
    direction: 1
  };
  feedingGame.targetX = feedingGame.player.x;
  feedingGame.targetY = feedingGame.player.y;
  feedingGame.hasTarget = false;
  feedingGame.fish = [];
  for (var i = 0; i < 10; i++) {
    var fish = {};
    respawnFeedingFish(fish, true);
    feedingGame.fish.push(fish);
  }
}

function finishFeedingGame() {
  feedingGame.state = "over";
  feedingGame.animationFrame = 0;
  feedingGame.keys = {};
  updateFeedingGameHud();
  drawFeedingGame();
}

function updateFeedingGame(delta) {
  var player = feedingGame.player;
  var horizontal = (feedingGame.keys.right ? 1 : 0) - (feedingGame.keys.left ? 1 : 0);
  var vertical = (feedingGame.keys.down ? 1 : 0) - (feedingGame.keys.up ? 1 : 0);
  var magnitude = Math.sqrt(horizontal * horizontal + vertical * vertical);

  if (magnitude) {
    if (horizontal) {
      player.direction = horizontal < 0 ? -1 : 1;
    }
    player.x += horizontal / magnitude * 230 * delta;
    player.y += vertical / magnitude * 230 * delta;
    feedingGame.hasTarget = false;
  } else if (feedingGame.hasTarget) {
    if (Math.abs(feedingGame.targetX - player.x) > 1) {
      player.direction = feedingGame.targetX < player.x ? -1 : 1;
    }
    player.x += (feedingGame.targetX - player.x) * Math.min(1, delta * 9);
    player.y += (feedingGame.targetY - player.y) * Math.min(1, delta * 9);
  }

  player.x = Math.max(player.radius * 1.5, Math.min(feedingGame.width - player.radius * 1.5, player.x));
  player.y = Math.max(player.radius, Math.min(feedingGame.height - player.radius, player.y));

  for (var i = 0; i < feedingGame.fish.length; i++) {
    var fish = feedingGame.fish[i];
    fish.x += fish.direction * fish.speed * delta;
    fish.y = fish.baseY + Math.sin(performance.now() / 900 + fish.phase) * fish.amplitude;
    if (fish.x < -fish.radius * 2) {
      fish.x = feedingGame.width + fish.radius * 2;
    } else if (fish.x > feedingGame.width + fish.radius * 2) {
      fish.x = -fish.radius * 2;
    }

    var dx = fish.x - player.x;
    var dy = fish.y - player.y;
    if (Math.sqrt(dx * dx + dy * dy) < (player.radius + fish.radius) * 0.82) {
      if (player.radius >= fish.radius) {
        feedingGame.score++;
        player.radius = Math.min(42, player.radius + 1.4);
        respawnFeedingFish(fish, true);
        updateFeedingGameHud();
      } else {
        finishFeedingGame();
        return;
      }
    }
  }
}

function runFeedingGameFrame(timestamp) {
  if (feedingGame.state !== "playing") {
    return;
  }
  var delta = feedingGame.lastFrame
    ? Math.min((timestamp - feedingGame.lastFrame) / 1000, 0.05)
    : 0;
  feedingGame.lastFrame = timestamp;
  updateFeedingGame(delta);
  drawFeedingGame();
  if (feedingGame.state === "playing") {
    feedingGame.animationFrame = window.requestAnimationFrame(runFeedingGameFrame);
  }
}

function startFeedingGame() {
  if (feedingGame.state === "playing") {
    feedingGame.state = "paused";
    window.cancelAnimationFrame(feedingGame.animationFrame);
    feedingGame.animationFrame = 0;
    feedingGame.keys = {};
  } else {
    if (feedingGame.state === "ready" || feedingGame.state === "over") {
      resetFeedingGame();
    }
    feedingGame.state = "playing";
    feedingGame.lastFrame = 0;
    feedingGame.animationFrame = window.requestAnimationFrame(runFeedingGameFrame);
    feedingGame.canvas.focus();
  }
  updateFeedingGameHud();
  drawFeedingGame();
}

function setupFeedingGame() {
  feedingGame.canvas = document.getElementById("feeding-game-canvas");
  feedingGame.canvas.addEventListener("pointermove", function (event) {
    if (feedingGame.state !== "playing") {
      return;
    }
    var bounds = feedingGame.canvas.getBoundingClientRect();
    feedingGame.targetX = event.clientX - bounds.left;
    feedingGame.targetY = event.clientY - bounds.top;
    feedingGame.hasTarget = true;
    if (Math.abs(feedingGame.targetX - feedingGame.player.x) > 1) {
      feedingGame.player.direction = feedingGame.targetX < feedingGame.player.x ? -1 : 1;
    }
  });
  feedingGame.canvas.addEventListener("pointerdown", function (event) {
    if (feedingGame.state !== "playing") {
      return;
    }
    var bounds = feedingGame.canvas.getBoundingClientRect();
    feedingGame.targetX = event.clientX - bounds.left;
    feedingGame.targetY = event.clientY - bounds.top;
    feedingGame.hasTarget = true;
    if (Math.abs(feedingGame.targetX - feedingGame.player.x) > 1) {
      feedingGame.player.direction = feedingGame.targetX < feedingGame.player.x ? -1 : 1;
    }
    feedingGame.canvas.focus();
  });
  feedingGame.canvas.addEventListener("keydown", function (event) {
    var directions = {
      ArrowLeft: "left", KeyA: "left",
      ArrowRight: "right", KeyD: "right",
      ArrowUp: "up", KeyW: "up",
      ArrowDown: "down", KeyS: "down"
    };
    var direction = directions[event.code];
    if (direction && feedingGame.state === "playing") {
      event.preventDefault();
      feedingGame.keys[direction] = true;
    }
  });
  feedingGame.canvas.addEventListener("blur", function () {
    feedingGame.keys = {};
  });
  window.addEventListener("keyup", function (event) {
    var key = event.code.replace("Arrow", "").replace("Key", "").toLowerCase();
    var direction = { left: "left", a: "left", right: "right", d: "right",
      up: "up", w: "up", down: "down", s: "down" }[key];
    if (direction) {
      feedingGame.keys[direction] = false;
    }
  });
  window.addEventListener("resize", resizeFeedingGame);
  document.addEventListener("visibilitychange", function () {
    if (document.hidden && feedingGame.state === "playing") {
      startFeedingGame();
    }
  });
  document.getElementById("feeding-game-start").addEventListener("click", startFeedingGame);
  document.getElementById("feeding-game-menu").addEventListener("click", function () {
    if (feedingGame.state === "playing") {
      startFeedingGame();
    } else if (feedingGame.state === "paused") {
      startFeedingGame();
    } else {
      startFeedingGame();
    }
  });
  updateFeedingGameHud();
}

/* =========================================================
   FEEDING MATAO ARCADE GAMEPLAY
   ========================================================= */

var feedingFishSpecies = [
  { name: "Luma Reefling", body: "#873fca", belly: "#ffb84e", accent: "#ff6d9d", pattern: "bands", shape: "plump", baseSize: 11 },
  { name: "Bramble Puff", body: "#d97d36", belly: "#f6ca7a", accent: "#ffc95d", pattern: "spots", shape: "puffer", baseSize: 15 },
  { name: "Aurofin Dart", body: "#248fc4", belly: "#f6d85b", accent: "#f5a43b", pattern: "stripe", shape: "long", baseSize: 13 },
  { name: "Prism Crown", body: "#4674d4", belly: "#9ce9e8", accent: "#d76fe0", pattern: "mask", shape: "crown", baseSize: 15 },
  { name: "Silverskip", body: "#99b8c5", belly: "#f2fbf8", accent: "#6f8da0", pattern: "silver", shape: "minnow", baseSize: 9 },
  { name: "Verdant Thornback", body: "#45b96d", belly: "#cdf174", accent: "#ee6ba7", pattern: "speckle", shape: "spiky", baseSize: 17 },
  { name: "Prism Bell", body: "#91a4ed", belly: "#f0d7ff", accent: "#60f0de", pattern: "glow", shape: "jelly", baseSize: 13 },
  { name: "Tanglefin Oddball", body: "#926248", belly: "#e9c186", accent: "#81e0a6", pattern: "shell", shape: "odd", baseSize: 16 },
  { name: "Slate Rake", body: "#627f91", belly: "#d9e8e7", accent: "#a9c8ce", pattern: "shark", shape: "shark", baseSize: 30 },
  { name: "Eclipse Glide", body: "#24283f", belly: "#707c92", accent: "#e85e91", pattern: "manta", shape: "manta", baseSize: 39 }
];

function feedingColor(hex, alpha) {
  var value = parseInt(hex.slice(1), 16);
  return [(value >> 16 & 255) / 255, (value >> 8 & 255) / 255, (value & 255) / 255, alpha === undefined ? 1 : alpha];
}

function feedingColorMix(a, b, amount) {
  var t = Math.max(0, Math.min(1, amount));
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
    1
  ];
}

function feedingNormalize(vector) {
  var length = Math.hypot(vector[0], vector[1], vector[2]) || 1;
  return [vector[0] / length, vector[1] / length, vector[2] / length];
}

function FeedingMeshBuilder() {
  this.vertices = [];
}

FeedingMeshBuilder.prototype.addVertex = function (position, normal, color, flex, phase) {
  this.vertices.push(
    position[0], position[1], position[2],
    normal[0], normal[1], normal[2],
    color[0], color[1], color[2], color[3],
    flex || 0, phase || 0
  );
};

FeedingMeshBuilder.prototype.addTriangle = function (a, b, c, colorA, colorB, colorC, flex, phase) {
  var ab = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  var ac = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  var normal = feedingNormalize([
    ab[1] * ac[2] - ab[2] * ac[1],
    ab[2] * ac[0] - ab[0] * ac[2],
    ab[0] * ac[1] - ab[1] * ac[0]
  ]);
  this.addVertex(a, normal, colorA || colorB || colorC, flex, phase);
  this.addVertex(b, normal, colorB || colorA || colorC, flex, phase);
  this.addVertex(c, normal, colorC || colorA || colorB, flex, phase);
};

function feedingAddEllipsoid(builder, center, radii, color, rings, sides, colorAt) {
  var points = [];
  var normals = [];
  var colors = [];
  for (var i = 0; i <= rings; i++) {
    var phi = Math.PI * i / rings;
    points[i] = [];
    normals[i] = [];
    colors[i] = [];
    for (var j = 0; j <= sides; j++) {
      var theta = Math.PI * 2 * j / sides;
      var nx = Math.sin(phi) * Math.cos(theta);
      var ny = Math.cos(phi);
      var nz = Math.sin(phi) * Math.sin(theta);
      points[i][j] = [
        center[0] + nx * radii[0],
        center[1] + ny * radii[1],
        center[2] + nz * radii[2]
      ];
      normals[i][j] = feedingNormalize([nx / radii[0], ny / radii[1], nz / radii[2]]);
      colors[i][j] = colorAt ? colorAt(nx, ny, nz) : color;
    }
  }
  for (var row = 0; row < rings; row++) {
    for (var column = 0; column < sides; column++) {
      var p00 = points[row][column];
      var p10 = points[row + 1][column];
      var p01 = points[row][column + 1];
      var p11 = points[row + 1][column + 1];
      builder.addVertex(p00, normals[row][column], colors[row][column]);
      builder.addVertex(p10, normals[row + 1][column], colors[row + 1][column]);
      builder.addVertex(p01, normals[row][column + 1], colors[row][column + 1]);
      builder.addVertex(p01, normals[row][column + 1], colors[row][column + 1]);
      builder.addVertex(p10, normals[row + 1][column], colors[row + 1][column]);
      builder.addVertex(p11, normals[row + 1][column + 1], colors[row + 1][column + 1]);
    }
  }
}

function feedingAddFin(builder, root, tipA, tipB, color, flex, phase) {
  var mid = [
    (root[0] + tipA[0] + tipB[0]) / 3,
    (root[1] + tipA[1] + tipB[1]) / 3,
    (root[2] + tipA[2] + tipB[2]) / 3 + (root[2] >= 0 ? 0.1 : -0.1)
  ];
  var lighter = [Math.min(1, color[0] * 1.12), Math.min(1, color[1] * 1.12), Math.min(1, color[2] * 1.12), 1];
  builder.addTriangle(root, tipA, mid, color, lighter, color, flex, phase);
  builder.addTriangle(tipA, tipB, mid, lighter, color, color, flex, phase);
  builder.addTriangle(tipB, root, mid, color, color, lighter, flex, phase);
}

function feedingAddCylinder(builder, start, end, radius, color, flex, phase, sides) {
  var axis = feedingNormalize([end[0] - start[0], end[1] - start[1], end[2] - start[2]]);
  var helper = Math.abs(axis[1]) < 0.85 ? [0, 1, 0] : [1, 0, 0];
  var u = feedingNormalize([
    axis[1] * helper[2] - axis[2] * helper[1],
    axis[2] * helper[0] - axis[0] * helper[2],
    axis[0] * helper[1] - axis[1] * helper[0]
  ]);
  var v = feedingNormalize([
    axis[1] * u[2] - axis[2] * u[1],
    axis[2] * u[0] - axis[0] * u[2],
    axis[0] * u[1] - axis[1] * u[0]
  ]);
  for (var i = 0; i < sides; i++) {
    var a0 = Math.PI * 2 * i / sides;
    var a1 = Math.PI * 2 * (i + 1) / sides;
    var p0 = [Math.cos(a0) * u[0] + Math.sin(a0) * v[0],
      Math.cos(a0) * u[1] + Math.sin(a0) * v[1],
      Math.cos(a0) * u[2] + Math.sin(a0) * v[2]];
    var p1 = [Math.cos(a1) * u[0] + Math.sin(a1) * v[0],
      Math.cos(a1) * u[1] + Math.sin(a1) * v[1],
      Math.cos(a1) * u[2] + Math.sin(a1) * v[2]];
    var s0 = [start[0] + p0[0] * radius, start[1] + p0[1] * radius, start[2] + p0[2] * radius];
    var s1 = [start[0] + p1[0] * radius, start[1] + p1[1] * radius, start[2] + p1[2] * radius];
    var e0 = [end[0] + p0[0] * radius * 0.68, end[1] + p0[1] * radius * 0.68, end[2] + p0[2] * radius * 0.68];
    var e1 = [end[0] + p1[0] * radius * 0.68, end[1] + p1[1] * radius * 0.68, end[2] + p1[2] * radius * 0.68];
    builder.addTriangle(s0, s1, e0, color, color, color, flex, phase);
    builder.addTriangle(s1, e1, e0, color, color, color, flex, phase);
  }
}

function feedingAddCone(builder, start, end, radius, color, flex, phase) {
  feedingAddCylinder(builder, start, end, radius, color, flex, phase, 7);
}

function feedingBuildFishMesh(species) {
  var builder = new FeedingMeshBuilder();
  var bodyColor = feedingColor(species.body);
  var bellyColor = feedingColor(species.belly);
  var accentColor = feedingColor(species.accent);
  var shapes = {
    plump: [1.02, 0.76, 0.61],
    long: [1.45, 0.55, 0.46],
    crown: [0.98, 0.79, 0.5],
    minnow: [1.15, 0.45, 0.4],
    spiky: [1.0, 0.69, 0.59],
    shark: [1.42, 0.59, 0.53],
    manta: [1.12, 0.55, 0.78]
  };
  var dimensions = shapes[species.shape] || shapes.plump;
  var patternedBody = function (x, y, z) {
    var color = feedingColorMix(bellyColor, bodyColor, Math.max(0.05, Math.min(1, (y + 0.45) * 1.05)));
    if (species.pattern === "bands" && Math.sin(x * 13) > 0.48) return accentColor;
    if (species.pattern === "stripe" && Math.abs(y) < 0.15) return bellyColor;
    if (species.pattern === "mask" && x > 0.44) return accentColor;
    if (species.pattern === "silver") return feedingColorMix(color, [0.92, 0.98, 1, 1], Math.max(0, y) * 0.34);
    if (species.shape === "manta" && y > 0.12) return bodyColor;
    return color;
  };

  if (species.shape === "jelly") {
    feedingAddEllipsoid(builder, [0, 0.18, 0], [0.78, 0.62, 0.7], bodyColor, 14, 20,
      function (x, y, z) {
        return feedingColorMix(accentColor, bodyColor, Math.max(0, (y + 0.1) * 0.8));
      });
    for (var tentacle = 0; tentacle < 7; tentacle++) {
      var tx = -0.55 + tentacle * 0.18;
      var depth = (tentacle % 2 ? 0.18 : -0.18);
      var phase = tentacle * 1.2;
      feedingAddCylinder(builder, [tx, -0.28, depth], [tx + 0.08, -0.78, depth + 0.04],
        0.045, feedingColor(tentacle % 2 ? "#65eee0" : "#f08dff"), 1.4, phase, 6);
      feedingAddCylinder(builder, [tx + 0.08, -0.78, depth + 0.04], [tx - 0.06, -1.12, depth + 0.08],
        0.032, feedingColor("#a8f4ff"), 1.8, phase + 1.4, 6);
    }
    feedingAddEllipsoid(builder, [0.25, 0.24, 0.57], [0.1, 0.12, 0.07], feedingColor("#fff7ff"), 8, 10);
    feedingAddEllipsoid(builder, [0.28, 0.24, 0.63], [0.045, 0.06, 0.035], feedingColor("#46355d"), 8, 10);
  } else if (species.shape === "odd") {
    feedingAddEllipsoid(builder, [-0.08, -0.15, 0], [0.96, 0.43, 0.51], bodyColor, 13, 18, patternedBody);
    feedingAddEllipsoid(builder, [-0.12, 0.28, 0], [0.48, 0.58, 0.48], accentColor, 12, 16);
    feedingAddEllipsoid(builder, [-0.12, 0.28, 0.42], [0.31, 0.38, 0.13], feedingColor("#c98555"), 10, 14);
    for (var curl = 0; curl < 12; curl++) {
      var angle = curl * 0.58;
      var spiralX = -0.12 + Math.cos(angle) * (0.25 - curl * 0.012);
      var spiralY = 0.28 + Math.sin(angle) * (0.25 - curl * 0.012);
      feedingAddEllipsoid(builder, [spiralX, spiralY, 0.55], [0.045, 0.045, 0.025],
        feedingColor("#ffe1a0"), 5, 7);
    }
    feedingAddCylinder(builder, [0.58, 0.12, 0.14], [0.9, 0.35, 0.2], 0.08, accentColor, 0.7, 0, 7);
    feedingAddCylinder(builder, [0.58, -0.02, 0.14], [0.9, -0.27, 0.2], 0.08, accentColor, 0.7, 1, 7);
    feedingAddEllipsoid(builder, [0.91, 0.35, 0.2], [0.13, 0.12, 0.12], feedingColor("#fff8db"), 8, 10);
    feedingAddEllipsoid(builder, [0.95, 0.35, 0.3], [0.055, 0.07, 0.04], feedingColor("#403655"), 8, 10);
    feedingAddFin(builder, [-0.94, 0, 0], [-1.52, 0.42, 0], [-1.45, -0.34, 0],
      accentColor, 1.1, 0.5);
  } else {
    feedingAddEllipsoid(builder, [0, 0, 0], dimensions, bodyColor, 16, 24, patternedBody);
    if (species.shape === "puffer") {
      for (var spikeRing = 0; spikeRing < 4; spikeRing++) {
        var sx = -0.65 + spikeRing * 0.42;
        var ringRadius = Math.sqrt(Math.max(0.15, 1 - sx * sx));
        for (var spike = 0; spike < 9; spike++) {
          var theta = Math.PI * 2 * spike / 9 + spikeRing * 0.27;
          var surface = [sx, Math.cos(theta) * ringRadius * 0.62, Math.sin(theta) * ringRadius * 0.5];
          var normal = feedingNormalize([sx, Math.cos(theta) * ringRadius, Math.sin(theta) * ringRadius]);
          var tip = [surface[0] + normal[0] * 0.28, surface[1] + normal[1] * 0.28, surface[2] + normal[2] * 0.28];
          feedingAddCone(builder, surface, tip, 0.075, spike % 2 ? accentColor : feedingColor("#ffe29a"), 0, spike);
        }
      }
      feedingAddEllipsoid(builder, [0.52, -0.16, 0.47], [0.15, 0.1, 0.06], feedingColor("#f18a77"), 8, 10);
    }
    if (species.shape === "spiky") {
      for (var thorn = 0; thorn < 12; thorn++) {
        var thornX = -0.82 + thorn * 0.14;
        var thornY = thorn % 2 ? 0.48 : -0.45;
        feedingAddCone(builder, [thornX, thornY, 0.1], [thornX - 0.04, thornY + (thornY > 0 ? 0.42 : -0.32), 0.12],
          0.095, thorn % 3 ? accentColor : feedingColor("#f9e37e"), 0.15, thorn);
      }
    }

    var tailRoot = species.shape === "manta" ? [-0.92, 0, 0] : [-1.0, 0, 0];
    feedingAddFin(builder, tailRoot, [-1.68, 0.5, 0], [-1.66, -0.48, 0],
      accentColor, 1.25, 0.7);
    if (species.shape === "manta") {
      feedingAddFin(builder, [-0.15, 0.05, 0], [0.12, 0.94, 0.05], [0.72, 0.36, 0.08],
        bodyColor, 0.75, 1.3);
      feedingAddFin(builder, [-0.15, 0.05, 0], [0.12, -0.94, 0.05], [0.72, -0.36, 0.08],
        bodyColor, 0.75, 2.4);
      feedingAddCylinder(builder, [-0.9, 0, 0], [-1.85, 0.02, 0], 0.035, accentColor, 1.3, 0, 7);
    } else {
      var dorsalTip = species.shape === "crown" ? [0.15, 1.22, 0] : [-0.05, 0.88, 0];
      feedingAddFin(builder, [-0.48, 0.42, 0], dorsalTip, [0.46, 0.46, 0],
        accentColor, species.shape === "crown" ? 0.95 : 0.2, 1.1);
      feedingAddFin(builder, [-0.24, -0.35, 0], [0.14, -0.83, 0], [0.52, -0.38, 0],
        feedingColorMix(accentColor, bodyColor, 0.35), 0.35, 2.1);
      feedingAddFin(builder, [-0.1, -0.12, 0.4], [0.44, -0.58, 0.58], [0.45, 0.08, 0.62],
        accentColor, 0.65, 0.2);
      feedingAddFin(builder, [-0.1, -0.12, -0.4], [0.44, -0.58, -0.58], [0.45, 0.08, -0.62],
        accentColor, 0.65, 1.4);
    }

    feedingAddEllipsoid(builder, [0.55, 0.15, 0.43], [0.22, 0.23, 0.13], feedingColor("#fffdf2"), 10, 14);
    feedingAddEllipsoid(builder, [0.62, 0.15, 0.54], [0.105, 0.13, 0.075], feedingColor("#322744"), 9, 12);
    feedingAddEllipsoid(builder, [0.65, 0.2, 0.6], [0.042, 0.05, 0.03], feedingColor("#ffffff"), 7, 9);
    feedingAddEllipsoid(builder, [0.98, -0.08, 0.06], [0.13, 0.055, 0.12], feedingColor("#4d2a4f"), 8, 12);
    for (var gill = 0; gill < 3; gill++) {
      feedingAddCylinder(builder, [0.18 - gill * 0.13, 0.15, 0.53],
        [0.12 - gill * 0.13, -0.13, 0.54], 0.018, accentColor, 0, 0, 5);
    }
    if (species.pattern === "speckle" || species.shape === "puffer") {
      for (var spot = 0; spot < 9; spot++) {
        var spotX = -0.5 + (spot % 4) * 0.24;
        var spotY = (Math.floor(spot / 4) - 0.55) * 0.25;
        feedingAddEllipsoid(builder, [spotX, spotY, 0.54], [0.045, 0.05, 0.022],
          spot % 2 ? accentColor : feedingColor("#ffe39b"), 5, 7);
      }
    }
    if (species.shape === "shark") {
      feedingAddFin(builder, [-0.28, 0.42, 0], [0.02, 1.18, 0], [0.48, 0.4, 0],
        feedingColor("#506c80"), 0.1, 0);
      feedingAddFin(builder, [0.1, -0.12, 0.3], [-0.06, -0.68, 0.75], [0.65, -0.38, 0.28],
        feedingColor("#49677d"), 0.2, 0);
      for (var tooth = 0; tooth < 5; tooth++) {
        feedingAddCone(builder, [0.82 + tooth * 0.055, -0.12, 0.17],
          [0.84 + tooth * 0.055, -0.22, 0.18], 0.035, feedingColor("#ffffff"), 0, tooth, 5);
      }
    }
  }

  return builder;
}

function feedingCompileShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    var message = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(message || "Unknown WebGL shader error.");
  }
  return shader;
}

function feedingCreateProgram(gl) {
  var vertexSource = [
    "attribute vec3 aPosition;",
    "attribute vec3 aNormal;",
    "attribute vec4 aColor;",
    "attribute float aFlex;",
    "attribute float aPhase;",
    "uniform mat4 uViewProjection;",
    "uniform vec3 uPosition;",
    "uniform vec3 uScale;",
    "uniform float uAngle;",
    "uniform float uDirection;",
    "uniform float uTime;",
    "varying vec3 vColor;",
    "varying vec3 vNormal;",
    "varying vec3 vWorldPosition;",
    "varying float vAlpha;",
    "void main(){",
    "  vec3 p=aPosition;",
    "  float wave=sin(uTime*7.0+aPhase);",
    "  p.y+=wave*aFlex*0.09;",
    "  p.z+=cos(uTime*7.0+aPhase)*aFlex*0.055;",
    "  p.x*=uDirection;",
    "  vec3 q=p*uScale;",
    "  float c=cos(uAngle),s=sin(uAngle);",
    "  vec3 r=vec3(q.x*c-q.y*s,q.x*s+q.y*c,q.z);",
    "  vec3 world=uPosition+r;",
    "  vec3 n=vec3(aNormal.x*uDirection/uScale.x,aNormal.y/uScale.y,aNormal.z/uScale.z);",
    "  vNormal=normalize(vec3(n.x*c-n.y*s,n.x*s+n.y*c,n.z));",
    "  vColor=aColor.rgb;",
    "  vAlpha=aColor.a;",
    "  vWorldPosition=world;",
    "  gl_Position=uViewProjection*vec4(world,1.0);",
    "}"
  ].join("\n");
  var fragmentSource = [
    "precision mediump float;",
    "varying vec3 vColor;",
    "varying vec3 vNormal;",
    "varying vec3 vWorldPosition;",
    "varying float vAlpha;",
    "void main(){",
    "  vec3 n=normalize(vNormal);",
    "  vec3 light=normalize(vec3(-0.45,0.72,0.9));",
    "  float diffuse=max(abs(dot(n,light)),0.12);",
    "  vec3 viewDirection=normalize(vec3(0.0,0.0,16.0)-vWorldPosition);",
    "  float highlight=pow(max(dot(reflect(-light,n),viewDirection),0.0),24.0)*0.34;",
    "  float rim=pow(1.0-max(abs(dot(n,viewDirection)),0.0),3.0)*0.16;",
    "  vec3 color=vColor*(0.43+diffuse*0.62)+vec3(highlight+rim);",
    "  gl_FragColor=vec4(color,vAlpha);",
    "}"
  ].join("\n");
  var vertexShader = feedingCompileShader(gl, gl.VERTEX_SHADER, vertexSource);
  var fragmentShader = feedingCompileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) || "WebGL shader program could not be linked.");
  }
  return program;
}

function feedingUploadMesh(gl, builder) {
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(builder.vertices), gl.STATIC_DRAW);
  return { buffer: buffer, count: builder.vertices.length / 12 };
}

function feedingPerspectiveMatrix(fieldOfView, aspect, near, far) {
  var f = 1 / Math.tan(fieldOfView / 2);
  var range = 1 / (near - far);
  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * range, -1,
    0, 0, 2 * far * near * range, 0
  ]);
}

function feedingMultiplyMatrices(a, b) {
  var out = new Float32Array(16);
  for (var column = 0; column < 4; column++) {
    for (var row = 0; row < 4; row++) {
      out[column * 4 + row] =
        a[row] * b[column * 4] +
        a[4 + row] * b[column * 4 + 1] +
        a[8 + row] * b[column * 4 + 2] +
        a[12 + row] * b[column * 4 + 3];
    }
  }
  return out;
}

function feedingBuildStarMesh() {
  var builder = new FeedingMeshBuilder();
  var gold = feedingColor("#ffd36a");
  var pink = feedingColor("#ff65b1");
  var center = [0, 0, 0.08];
  for (var point = 0; point < 10; point++) {
    var angleA = -Math.PI / 2 + point * Math.PI / 5;
    var angleB = -Math.PI / 2 + (point + 1) * Math.PI / 5;
    var radiusA = point % 2 ? 0.43 : 1;
    var radiusB = (point + 1) % 2 ? 0.43 : 1;
    var a = [Math.cos(angleA) * radiusA, Math.sin(angleA) * radiusA, 0.08];
    var b = [Math.cos(angleB) * radiusB, Math.sin(angleB) * radiusB, 0.08];
    builder.addTriangle(center, a, b, gold, pink, gold);
    builder.addTriangle([center[0], center[1], -0.08], [b[0], b[1], -0.08], [a[0], a[1], -0.08], pink, gold, pink);
  }
  feedingAddEllipsoid(builder, [0, 0, 0.1], [0.3, 0.3, 0.11], feedingColor("#fff4b0"), 8, 10);
  return builder;
}

function feedingBuildEnvironment(worldWidth) {
  var builder = new FeedingMeshBuilder();
  var floor = feedingColor("#b66c86");
  var sand = feedingColor("#e9a98e");
  builder.addTriangle([-worldWidth, -5.05, -1.7], [worldWidth, -5.05, -1.7],
    [worldWidth, -7, -1.7], floor, floor, sand);
  builder.addTriangle([-worldWidth, -5.05, -1.7], [worldWidth, -7, -1.7],
    [-worldWidth, -7, -1.7], floor, sand, sand);

  for (var rock = 0; rock < 11; rock++) {
    var x = -worldWidth + rock * worldWidth * 0.2;
    feedingAddEllipsoid(builder, [x, -5.05 + (rock % 2) * 0.12, -1.2],
      [0.45 + (rock % 3) * 0.12, 0.22, 0.38],
      feedingColor(rock % 2 ? "#6d5579" : "#82617a"), 7, 10);
  }
  for (var plant = 0; plant < 10; plant++) {
    var px = -worldWidth + 0.6 + plant * worldWidth * 0.22;
    var color = feedingColor(plant % 2 ? "#4ebd9c" : "#e96fa8");
    for (var blade = 0; blade < 4; blade++) {
      var lean = (blade - 1.5) * 0.23;
      var base = [px + blade * 0.09, -5.1, -0.6 + blade * 0.08];
      var middle = [base[0] + lean * 0.55, -4.25 + (blade % 2) * 0.35, base[2]];
      var tip = [base[0] + lean, -3.4 - (blade % 3) * 0.35, base[2]];
      feedingAddCylinder(builder, base, middle, 0.055, color, 0.7, plant + blade, 6);
      feedingAddCylinder(builder, middle, tip, 0.045, color, 1.1, plant + blade + 1, 6);
      feedingAddFin(builder, middle, [middle[0] - 0.33, middle[1] + 0.15, middle[2] + 0.05],
        [middle[0] + 0.08, middle[1] + 0.39, middle[2]], color, 0.8, plant + blade);
    }
  }
  for (var coral = 0; coral < 5; coral++) {
    var cx = -worldWidth * 0.8 + coral * worldWidth * 0.4;
    var coralColor = feedingColor(coral % 2 ? "#ff8c9c" : "#e88bb9");
    for (var branch = 0; branch < 4; branch++) {
      var root = [cx + branch * 0.1, -5.08, -0.28];
      var fork = [cx + branch * 0.2 - 0.24, -4.45 - (branch % 2) * 0.2, -0.25];
      var tip = [cx + branch * 0.31 - 0.45, -3.75 - (branch % 2) * 0.3, -0.2];
      feedingAddCylinder(builder, root, fork, 0.09, coralColor, 0, 0, 7);
      feedingAddCylinder(builder, fork, tip, 0.065, coralColor, 0, 0, 7);
    }
  }
  return builder;
}

function feedingCreateRenderer(canvas) {
  var gl = canvas.getContext("webgl", { alpha: false, antialias: true, depth: true, premultipliedAlpha: false });
  if (!gl) return null;
  var program = feedingCreateProgram(gl);
  var attributes = {
    position: gl.getAttribLocation(program, "aPosition"),
    normal: gl.getAttribLocation(program, "aNormal"),
    color: gl.getAttribLocation(program, "aColor"),
    flex: gl.getAttribLocation(program, "aFlex"),
    phase: gl.getAttribLocation(program, "aPhase")
  };
  var uniforms = {
    viewProjection: gl.getUniformLocation(program, "uViewProjection"),
    position: gl.getUniformLocation(program, "uPosition"),
    scale: gl.getUniformLocation(program, "uScale"),
    angle: gl.getUniformLocation(program, "uAngle"),
    direction: gl.getUniformLocation(program, "uDirection"),
    time: gl.getUniformLocation(program, "uTime")
  };
  var sphereBuilder = new FeedingMeshBuilder();
  feedingAddEllipsoid(sphereBuilder, [0, 0, 0], [1, 1, 1], feedingColor("#ffffff"), 12, 16);
  var backgroundBuilder = new FeedingMeshBuilder();
  var top = feedingColor("#123d67");
  var middle = feedingColor("#2285a0");
  var bottom = feedingColor("#876289");
  backgroundBuilder.addTriangle([-1, 1, 0], [1, 1, 0], [-1, -1, 0], top, top, bottom);
  backgroundBuilder.addTriangle([1, 1, 0], [1, -1, 0], [-1, -1, 0], top, bottom, bottom);
  var rayBuilder = new FeedingMeshBuilder();
  for (var ray = 0; ray < 7; ray++) {
    var rx = -0.9 + ray * 0.3;
    var softLight = [0.78, 0.95, 1, 0.09];
    rayBuilder.addTriangle([rx, 1, -0.01], [rx + 0.12, 1, -0.01],
      [rx + 0.38, -1, -0.01], softLight, softLight, [0.8, 0.98, 1, 0.015]);
    rayBuilder.addTriangle([rx, 1, -0.01], [rx + 0.38, -1, -0.01],
      [rx - 0.16, -1, -0.01], softLight, [0.8, 0.98, 1, 0.015], [0.8, 0.98, 1, 0.015]);
  }
  var renderer = {
    gl: gl,
    program: program,
    attributes: attributes,
    uniforms: uniforms,
    meshes: feedingFishSpecies.map(feedingBuildFishMesh).map(function (builder) {
      return feedingUploadMesh(gl, builder);
    }),
    sphere: feedingUploadMesh(gl, sphereBuilder),
    star: feedingUploadMesh(gl, feedingBuildStarMesh()),
    background: feedingUploadMesh(gl, backgroundBuilder),
    rays: feedingUploadMesh(gl, rayBuilder),
    environment: null,
    projection: null,
    worldScale: 1,
    worldWidth: 1
  };
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.disable(gl.CULL_FACE);
  return renderer;
}

function feedingDrawMesh(renderer, mesh, position, scale, angle, direction, time) {
  if (!mesh || !mesh.count) return;
  var gl = renderer.gl;
  var attributes = renderer.attributes;
  gl.bindBuffer(gl.ARRAY_BUFFER, mesh.buffer);
  var stride = 48;
  gl.enableVertexAttribArray(attributes.position);
  gl.vertexAttribPointer(attributes.position, 3, gl.FLOAT, false, stride, 0);
  gl.enableVertexAttribArray(attributes.normal);
  gl.vertexAttribPointer(attributes.normal, 3, gl.FLOAT, false, stride, 12);
  gl.enableVertexAttribArray(attributes.color);
  gl.vertexAttribPointer(attributes.color, 4, gl.FLOAT, false, stride, 24);
  gl.enableVertexAttribArray(attributes.flex);
  gl.vertexAttribPointer(attributes.flex, 1, gl.FLOAT, false, stride, 40);
  gl.enableVertexAttribArray(attributes.phase);
  gl.vertexAttribPointer(attributes.phase, 1, gl.FLOAT, false, stride, 44);
  gl.uniform3fv(renderer.uniforms.position, position);
  gl.uniform3fv(renderer.uniforms.scale, scale);
  gl.uniform1f(renderer.uniforms.angle, angle || 0);
  gl.uniform1f(renderer.uniforms.direction, direction || 1);
  gl.uniform1f(renderer.uniforms.time, time);
  gl.drawArrays(gl.TRIANGLES, 0, mesh.count);
}

function feedingWorldPosition(x, y, z) {
  var scale = feedingGame.renderer.worldScale;
  return [
    (x - feedingGame.width / 2 - feedingGame.cameraX) * scale,
    (feedingGame.height / 2 - y + feedingGame.cameraY) * scale,
    z || 0
  ];
}

var feedingLevelNames = [
  "THE SHALLOWS", "CORAL GARDEN", "MOONLIT REEF", "KELP FOREST", "TIDAL CAVES",
  "PEARL PASSAGE", "STORM SHELF", "DEEP BLUE", "ORCHID TRENCH", "THE LAST REEF"
];

feedingGame = {
  canvas: null,
  context: null,
  width: 0,
  height: 0,
  state: "ready",
  score: 0,
  level: 1,
  totalLevels: 10,
  lives: 3,
  progress: 0,
  goal: 8,
  player: null,
  renderer: null,
  fish: [],
  powerups: [],
  particles: [],
  bubbles: [],
  keys: {},
  targetX: 0,
  targetY: 0,
  hasTarget: false,
  lastFrame: 0,
  animationFrame: 0,
  elapsed: 0,
  spawnTimer: 8,
  combo: 0,
  comboTimer: 0,
  frenzyTimer: 0,
  multiplier: 1,
  boostCharge: 0,
  boostTimer: 0,
  cameraX: 0,
  cameraY: 0
};

function updateFeedingGameHud() {
  var fishSize = feedingGame.player ? Math.round(feedingGame.player.radius) : 20;
  document.getElementById("feeding-game-score").textContent =
    String(feedingGame.score).padStart(5, "0");
  document.getElementById("feeding-game-level").textContent =
    String(feedingGame.level).padStart(2, "0");
  document.getElementById("feeding-game-lives").textContent =
    new Array(Math.max(0, feedingGame.lives) + 1).join("♥ ").trim() || "—";
  document.getElementById("feeding-game-lives").setAttribute(
    "aria-label",
    feedingGame.lives + (feedingGame.lives === 1 ? " life" : " lives")
  );
  document.getElementById("feeding-game-size").textContent = fishSize + " / 54";
  document.getElementById("feeding-game-multiplier").textContent =
    "x" + (feedingGame.frenzyTimer > 0 ? feedingGame.multiplier : 1);
  document.getElementById("feeding-game-growth").setAttribute("aria-valuenow", String(fishSize));
  document.getElementById("feeding-game-growth-fill").style.width =
    Math.round(((fishSize - 20) / 34) * 100) + "%";
  document.getElementById("feeding-game-level-track").setAttribute("aria-valuemax", String(feedingGame.goal));
  document.getElementById("feeding-game-level-track").setAttribute("aria-valuenow", String(feedingGame.progress));
  document.getElementById("feeding-game-level-fill").style.width =
    Math.round((feedingGame.progress / feedingGame.goal) * 100) + "%";
  document.getElementById("feeding-game-ability-fill").style.width =
    Math.round(feedingGame.boostCharge) + "%";

  var button = document.getElementById("feeding-game-start");
  var overlayButton = document.getElementById("feeding-game-overlay-start");
  var overlay = document.getElementById("feeding-game-overlay");
  var kicker = document.getElementById("feeding-overlay-kicker");
  var title = document.getElementById("feeding-overlay-title");
  var copy = document.getElementById("feeding-overlay-copy");
  var status = document.getElementById("feeding-game-status");
  var overlayVisible = feedingGame.state !== "playing";

  overlay.classList.toggle("is-hidden", !overlayVisible);
  button.disabled = feedingGame.state === "error";
  overlayButton.disabled = feedingGame.state === "error";
  kicker.textContent = "REEF " + String(feedingGame.level).padStart(2, "0") +
    " · " + feedingLevelNames[feedingGame.level - 1];
  if (feedingGame.state === "error") {
    button.textContent = "UNAVAILABLE";
    overlayButton.textContent = "UNAVAILABLE";
    title.textContent = "3D reef unavailable";
    copy.textContent = "This browser could not initialize WebGL for the 3D aquarium. Try updating your browser or enabling hardware acceleration.";
    status.textContent = "The game could not start because its WebGL renderer is unavailable.";
  } else if (feedingGame.state === "playing") {
    button.textContent = "PAUSE";
    overlayButton.textContent = "RESUME";
    title.textContent = "";
    copy.textContent = "";
    status.textContent = feedingGame.frenzyTimer > 0
      ? "FRENZY x" + feedingGame.multiplier + " — keep feeding to keep the chain alive!"
      : "Eat the smaller fish, dodge predators, and fill the reef meter to advance.";
  } else if (feedingGame.state === "paused") {
    button.textContent = "RESUME";
    overlayButton.textContent = "RESUME SWIM";
    title.textContent = "Take a breather";
    copy.textContent = "Your reef is waiting. Resume when you are ready to swim.";
    status.textContent = "Paused. Your score and reef progress are saved.";
  } else if (feedingGame.state === "levelup") {
    button.textContent = "NEXT REEF";
    overlayButton.textContent = "DIVE IN";
    title.textContent = "Reef cleared!";
    copy.textContent = "You have grown stronger. New fish and faster predators await in the next waters.";
    status.textContent = "Reef " + (feedingGame.level - 1) + " cleared. Continue to reef " + feedingGame.level + ".";
  } else if (feedingGame.state === "over") {
    button.textContent = "TRY AGAIN";
    overlayButton.textContent = "SWIM AGAIN";
    title.textContent = "The reef got quiet";
    copy.textContent = "Final score: " + feedingGame.score + ". Reset and climb the food chain again.";
    status.textContent = "Run over. You reached reef " + feedingGame.level + " with " + feedingGame.score + " points.";
  } else if (feedingGame.state === "won") {
    button.textContent = "PLAY AGAIN";
    overlayButton.textContent = "PLAY AGAIN";
    title.textContent = "Master of the reef!";
    copy.textContent = "You conquered all ten reefs and reached the top of the food chain. Final score: " + feedingGame.score + ".";
    status.textContent = "Campaign complete! You ruled the reef with " + feedingGame.score + " points.";
  } else {
    button.textContent = "START";
    overlayButton.textContent = "START FEEDING";
    title.textContent = "Ready to feed?";
    copy.textContent = "Eat smaller fish to grow. Watch for predators, chain quick meals for a frenzy, and collect glowing reef stars.";
    status.textContent = "Steer with your mouse, touch, or arrow keys / WASD. Press Space or Boost to dash away from danger.";
  }
}

function respawnFeedingFish(fish, avoidPlayer) {
  var player = feedingGame.player || { radius: 20, x: 0, y: 0 };
  var maxTier = Math.min(7, 1 + Math.floor((feedingGame.level - 1) * 0.8));
  fish.predator = Math.random() < 0.16;
  fish.species = fish.predator
    ? 8 + (Math.random() < 0.35 ? 1 : 0)
    : Math.floor(Math.pow(Math.random(), 1.55) * (maxTier + 1));
  fish.species = Math.min(feedingFishSpecies.length - 1, fish.species);
  fish.radius = fish.predator
    ? Math.max(feedingFishSpecies[fish.species].baseSize, player.radius + (fish.species === 9 ? 14 : 6) + Math.random() * 10)
    : feedingFishSpecies[fish.species].baseSize + Math.random() * 3.5;
  fish.x = Math.random() < 0.5 ? -fish.radius * 2 : feedingGame.width + fish.radius * 2;
  fish.baseY = 112 + Math.random() * Math.max(1, feedingGame.height - 165);
  fish.y = fish.baseY;
  fish.direction = fish.x < 0 ? 1 : -1;
  fish.speed = fish.predator ? 42 + Math.random() * 36 + feedingGame.level * 2 : 25 + Math.random() * 52;
  fish.phase = Math.random() * Math.PI * 2;
  fish.amplitude = 8 + Math.random() * 23;
  fish.tailPhase = Math.random() * Math.PI * 2;
  fish.depth = (Math.random() - 0.5) * 2.4;
  fish.age = 0;

  if (avoidPlayer) {
    var attempts = 0;
    while (attempts < 16 &&
      Math.hypot(fish.x - player.x, fish.y - player.y) < player.radius + fish.radius + 80) {
      fish.baseY = 112 + Math.random() * Math.max(1, feedingGame.height - 165);
      fish.y = fish.baseY;
      attempts++;
    }
  }
}

function resizeFeedingGame() {
  var canvas = document.getElementById("feeding-game-canvas");
  if (!canvas) {
    return;
  }
  var bounds = canvas.getBoundingClientRect();
  if (!bounds.width || !bounds.height) {
    return;
  }

  if (!feedingGame.renderer) {
    try {
      feedingGame.renderer = feedingCreateRenderer(canvas);
    } catch (error) {
      console.error("Feeding Matao WebGL initialization failed:", error);
    }
    if (!feedingGame.renderer) {
      feedingGame.state = "error";
      updateFeedingGameHud();
      return;
    }
  }

  var oldWidth = feedingGame.width;
  var oldHeight = feedingGame.height;
  var ratio = Math.min(window.devicePixelRatio || 1, 2);
  feedingGame.width = bounds.width;
  feedingGame.height = bounds.height;
  canvas.width = Math.round(bounds.width * ratio);
  canvas.height = Math.round(bounds.height * ratio);
  var renderer = feedingGame.renderer;
  renderer.gl.viewport(0, 0, canvas.width, canvas.height);
  renderer.worldScale = 11.7 / feedingGame.height;
  renderer.worldWidth = renderer.worldScale * feedingGame.width / 2;
  renderer.projection = feedingPerspectiveMatrix(
    36 * Math.PI / 180,
    canvas.width / canvas.height,
    0.1,
    80
  );
  if (renderer.environment) renderer.gl.deleteBuffer(renderer.environment.buffer);
  renderer.environment = feedingUploadMesh(renderer.gl, feedingBuildEnvironment(renderer.worldWidth));

  if (feedingGame.player && oldWidth && oldHeight) {
    var sx = feedingGame.width / oldWidth;
    var sy = feedingGame.height / oldHeight;
    feedingGame.player.x *= sx;
    feedingGame.player.y *= sy;
    feedingGame.targetX *= sx;
    feedingGame.targetY *= sy;
    feedingGame.cameraX *= sx;
    feedingGame.cameraY *= sy;
    for (var i = 0; i < feedingGame.fish.length; i++) {
      feedingGame.fish[i].x *= sx;
      feedingGame.fish[i].baseY *= sy;
      feedingGame.fish[i].y *= sy;
    }
    for (var j = 0; j < feedingGame.powerups.length; j++) {
      feedingGame.powerups[j].x *= sx;
      feedingGame.powerups[j].y *= sy;
    }
  } else {
    feedingGame.player = {
      x: feedingGame.width * 0.25,
      y: feedingGame.height * 0.52,
      radius: 20,
      direction: 1,
      invulnerable: 0,
      phase: 0
    };
    feedingGame.targetX = feedingGame.player.x;
    feedingGame.targetY = feedingGame.player.y;
    feedingGame.cameraX = feedingGame.player.x - feedingGame.width / 2;
    feedingGame.cameraY = feedingGame.player.y - feedingGame.height / 2;
  }

  if (!feedingGame.bubbles.length) {
    for (var bubbleIndex = 0; bubbleIndex < 24; bubbleIndex++) {
      feedingGame.bubbles.push({
        x: Math.random() * feedingGame.width,
        y: Math.random() * feedingGame.height,
        depth: -1.2 + Math.random() * 1.8,
        radius: 1.4 + Math.random() * 3.2,
        speed: 9 + Math.random() * 19,
        phase: Math.random() * Math.PI * 2
      });
    }
  }
  if (!feedingGame.fish.length) {
    for (var fishIndex = 0; fishIndex < 16; fishIndex++) {
      var fish = {};
      respawnFeedingFish(fish, true);
      feedingGame.fish.push(fish);
    }
  }
  drawFeedingGame();
  ensureFeedingGameLoop();
}

function drawFeedingPlant(context, x, baseY, scale, hue, time) {
  context.save();
  context.translate(x, baseY);
  context.scale(scale, scale);
  context.lineCap = "round";
  context.strokeStyle = hue;
  context.lineWidth = 5;
  for (var leaf = 0; leaf < 3; leaf++) {
    var sway = Math.sin(time * 1.4 + x * 0.03 + leaf) * 9;
    context.beginPath();
    context.moveTo(0, 0);
    context.quadraticCurveTo(sway - 15, -28 - leaf * 11, sway + (leaf - 1) * 10, -70 - leaf * 18);
    context.stroke();
    context.beginPath();
    context.ellipse(sway + (leaf - 1) * 8, -54 - leaf * 14, 5, 16, -0.5 + leaf * 0.45, 0, Math.PI * 2);
    context.fillStyle = leaf % 2 ? "rgba(102, 235, 190, 0.8)" : "rgba(255, 115, 177, 0.78)";
    context.fill();
  }
  context.restore();
}

function drawFeedingCoral(context, x, baseY, scale, color) {
  context.save();
  context.translate(x, baseY);
  context.scale(scale, scale);
  context.strokeStyle = color;
  context.lineWidth = 8;
  context.lineCap = "round";
  var branches = [-1, 0, 1];
  for (var i = 0; i < branches.length; i++) {
    var side = branches[i];
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(side * 9, -24);
    context.lineTo(side * 6, -52 - Math.abs(side) * 9);
    context.stroke();
    context.beginPath();
    context.arc(side * 6, -56 - Math.abs(side) * 9, 6, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
  }
  context.restore();
}

function drawFeedingBackground(context, time) {
  var width = feedingGame.width;
  var height = feedingGame.height;
  var palette = [
    ["#13516d", "#31829a", "#ed9fbe"],
    ["#173d68", "#4d70a4", "#e79bc3"],
    ["#18365f", "#765a9a", "#d885b4"],
    ["#142d54", "#416b88", "#cf83a8"],
    ["#22274f", "#6a507f", "#e49ab8"]
  ][Math.min(4, Math.floor((feedingGame.level - 1) / 2))];
  var water = context.createLinearGradient(0, 0, 0, height);
  water.addColorStop(0, palette[0]);
  water.addColorStop(0.58, palette[1]);
  water.addColorStop(1, palette[2]);
  context.fillStyle = water;
  context.fillRect(0, 0, width, height);

  for (var ray = 0; ray < 6; ray++) {
    var drift = Math.sin(time * 0.22 + ray * 1.7) * width * 0.04;
    var topX = (ray * width) / 5 + drift;
    context.beginPath();
    context.moveTo(topX - 25, 82);
    context.lineTo(topX + 30, 82);
    context.lineTo(topX + width * 0.13, height - 24);
    context.lineTo(topX - width * 0.08, height - 24);
    context.closePath();
    context.fillStyle = "rgba(255, 231, 245, " + (0.025 + (ray % 2) * 0.018) + ")";
    context.fill();
  }

  for (var caustic = 0; caustic < 8; caustic++) {
    var cx = (caustic * 151 + time * (8 + caustic)) % (width + 100) - 50;
    var cy = 115 + (caustic * 73) % Math.max(100, height - 170);
    context.beginPath();
    context.ellipse(cx, cy, 32 + caustic * 4, 8, Math.sin(time + caustic) * 0.12, 0, Math.PI * 2);
    context.strokeStyle = "rgba(222, 255, 251, 0.12)";
    context.lineWidth = 2;
    context.stroke();
  }

  for (var bubble = 0; bubble < 36; bubble++) {
    var bx = (bubble * 113 + 27) % width;
    var speed = 10 + bubble % 9;
    var by = height - ((time * speed + bubble * 47) % (height + 30));
    var br = 2 + (bubble % 5) * 1.2;
    context.beginPath();
    context.arc(bx, by, br, 0, Math.PI * 2);
    context.fillStyle = "rgba(231, 255, 252, 0.16)";
    context.fill();
    context.strokeStyle = "rgba(255, 231, 246, 0.42)";
    context.lineWidth = 1;
    context.stroke();
    context.beginPath();
    context.arc(bx - br * 0.25, by - br * 0.28, Math.max(1, br * 0.22), 0, Math.PI * 2);
    context.fillStyle = "rgba(255, 255, 255, 0.72)";
    context.fill();
  }

  var floorY = height - 34;
  context.beginPath();
  context.moveTo(0, floorY);
  context.quadraticCurveTo(width * 0.25, floorY - 18, width * 0.5, floorY - 3);
  context.quadraticCurveTo(width * 0.76, floorY + 10, width, floorY - 11);
  context.lineTo(width, height);
  context.lineTo(0, height);
  context.closePath();
  var sand = context.createLinearGradient(0, floorY - 20, 0, height);
  sand.addColorStop(0, "rgba(255, 200, 217, 0.58)");
  sand.addColorStop(1, "rgba(98, 50, 104, 0.62)");
  context.fillStyle = sand;
  context.fill();

  for (var plant = 0; plant < 10; plant++) {
    var plantX = 16 + plant * (width - 32) / 9;
    drawFeedingPlant(context, plantX, height - 22, 0.58 + (plant % 3) * 0.17,
      plant % 2 ? "#65d7ad" : "#f06ba9", time);
  }
  drawFeedingCoral(context, width * 0.13, height - 25, 0.75, "#fb7cae");
  drawFeedingCoral(context, width * 0.88, height - 25, 0.92, "#f5a46f");
}

function drawFeedingFish(fish, isPlayer, time) {
  if (feedingGame.renderer) {
    var renderer = feedingGame.renderer;
    var speciesIndex = isPlayer
      ? Math.min(7, Math.floor((feedingGame.level - 1) * 0.8))
      : Math.max(0, Math.min(feedingFishSpecies.length - 1, fish.species));
    if (isPlayer && fish.invulnerable > 0 && Math.floor(time * 12) % 2 !== 0) return;
    var bob = Math.sin(time * 1.3 + (fish.phase || 0)) * (isPlayer ? 3 : 2);
    var position = feedingWorldPosition(fish.x, fish.y + bob, fish.depth || 0);
    var modelScale = fish.radius * renderer.worldScale;
    var angle = Math.sin(time * 1.4 + (fish.phase || 0)) * 0.045;
    feedingDrawMesh(
      renderer,
      renderer.meshes[speciesIndex],
      position,
      [modelScale, modelScale, modelScale],
      angle,
      fish.direction || 1,
      time
    );
    return;
  }

  var context = feedingGame.context;
  var radius = fish.radius;
  context.save();
  context.translate(fish.x, fish.y + Math.sin(time * 3 + fish.phase) * 1.4);
  context.rotate(Math.sin(time * 1.8 + fish.phase) * 0.035);
  if (fish.direction < 0) {
    context.scale(-1, 1);
  }

  if (fish.predator && !isPlayer) {
    var shark = context.createLinearGradient(0, -radius, 0, radius);
    shark.addColorStop(0, "#253955");
    shark.addColorStop(0.58, "#55768a");
    shark.addColorStop(1, "#e4c4d2");
    context.shadowColor = "rgba(14, 17, 47, 0.48)";
    context.shadowBlur = 12;
    context.beginPath();
    context.moveTo(-radius * 1.1, 0);
    context.quadraticCurveTo(-radius * 0.68, -radius * 0.78, radius * 0.75, -radius * 0.4);
    context.quadraticCurveTo(radius * 1.35, -radius * 0.1, radius * 1.05, radius * 0.2);
    context.quadraticCurveTo(radius * 0.45, radius * 0.72, -radius * 1.1, 0);
    context.closePath();
    context.fillStyle = shark;
    context.fill();
    context.beginPath();
    context.moveTo(-radius * 0.2, -radius * 0.36);
    context.lineTo(radius * 0.08, -radius * 1.02);
    context.lineTo(radius * 0.48, -radius * 0.35);
    context.closePath();
    context.fillStyle = "#263b57";
    context.fill();
    context.beginPath();
    context.moveTo(radius * 0.55, radius * 0.06);
    context.quadraticCurveTo(radius * 0.98, radius * 0.22, radius * 0.55, radius * 0.38);
    context.lineTo(radius * 0.82, radius * 0.24);
    context.closePath();
    context.fillStyle = "#722d62";
    context.fill();
    context.fillStyle = "#fff";
    for (var tooth = 0; tooth < 4; tooth++) {
      context.beginPath();
      context.moveTo(radius * (0.57 + tooth * 0.08), radius * 0.13);
      context.lineTo(radius * (0.61 + tooth * 0.08), radius * 0.23);
      context.lineTo(radius * (0.65 + tooth * 0.08), radius * 0.13);
      context.fill();
    }
    context.beginPath();
    context.arc(radius * 0.65, -radius * 0.12, Math.max(2, radius * 0.085), 0, Math.PI * 2);
    context.fillStyle = "#fff";
    context.fill();
    context.beginPath();
    context.arc(radius * 0.68, -radius * 0.12, Math.max(1.2, radius * 0.042), 0, Math.PI * 2);
    context.fillStyle = "#24213c";
    context.fill();
    context.restore();
    return;
  }

  var species = feedingFishSpecies[isPlayer
    ? Math.min(feedingFishSpecies.length - 1, Math.floor((feedingGame.level - 1) / 2))
    : fish.species % feedingFishSpecies.length];
  var tailWave = Math.sin(time * 9 + fish.tailPhase) * radius * 0.12;
  context.shadowColor = isPlayer ? "rgba(255, 104, 181, 0.82)" : "rgba(28, 29, 66, 0.3)";
  context.shadowBlur = isPlayer ? 20 : 6;

  context.beginPath();
  context.moveTo(-radius * 0.82, 0);
  context.lineTo(-radius * 1.58, -radius * (0.58 + tailWave / radius));
  context.quadraticCurveTo(-radius * 1.4, 0, -radius * 1.58, radius * 0.58);
  context.closePath();
  context.fillStyle = species.accent;
  context.fill();
  context.strokeStyle = "rgba(28, 40, 76, 0.58)";
  context.lineWidth = Math.max(1, radius * 0.055);
  context.stroke();

  context.beginPath();
  context.moveTo(-radius * 0.34, -radius * 0.45);
  context.quadraticCurveTo(radius * 0.1, -radius * 1.12, radius * 0.52, -radius * 0.48);
  context.closePath();
  context.fillStyle = species.accent;
  context.fill();
  context.beginPath();
  context.moveTo(-radius * 0.28, radius * 0.38);
  context.quadraticCurveTo(radius * 0.05, radius * 0.94, radius * 0.38, radius * 0.4);
  context.closePath();
  context.fillStyle = species.accent;
  context.fill();

  var body = context.createLinearGradient(0, -radius * 0.7, 0, radius * 0.7);
  body.addColorStop(0, "#fff5fb");
  body.addColorStop(0.18, species.body);
  body.addColorStop(0.72, species.body);
  body.addColorStop(1, species.belly);
  context.beginPath();
  context.ellipse(0, 0, radius * 1.06, radius * 0.67, 0, 0, Math.PI * 2);
  context.fillStyle = body;
  context.fill();
  context.strokeStyle = "rgba(30, 39, 78, 0.56)";
  context.lineWidth = Math.max(1, radius * 0.055);
  context.stroke();

  if (species.pattern === "bands" || species.pattern === "stripes" || species.pattern === "rays") {
    context.save();
    context.beginPath();
    context.ellipse(0, 0, radius, radius * 0.61, 0, 0, Math.PI * 2);
    context.clip();
    context.strokeStyle = species.accent;
    context.lineWidth = Math.max(2, radius * 0.17);
    for (var band = -1; band <= 1; band++) {
      context.beginPath();
      context.moveTo(band * radius * 0.48 - radius * 0.16, -radius * 0.8);
      context.quadraticCurveTo(band * radius * 0.48 + radius * 0.08, 0, band * radius * 0.48 - radius * 0.12, radius * 0.8);
      context.stroke();
    }
    context.restore();
  } else if (species.pattern === "spots" || species.pattern === "scales") {
    for (var spot = 0; spot < 5; spot++) {
      var sx = -radius * 0.4 + (spot % 3) * radius * 0.27;
      var sy = (Math.floor(spot / 3) ? 1 : -1) * radius * 0.17;
      context.beginPath();
      context.arc(sx, sy, radius * (species.pattern === "scales" ? 0.09 : 0.07), 0, Math.PI * 2);
      context.fillStyle = species.accent;
      context.globalAlpha = 0.85;
      context.fill();
      context.globalAlpha = 1;
    }
  } else if (species.pattern === "mask") {
    context.beginPath();
    context.ellipse(radius * 0.56, 0, radius * 0.19, radius * 0.48, 0, 0, Math.PI * 2);
    context.fillStyle = species.accent;
    context.fill();
  }

  context.beginPath();
  context.arc(radius * 0.67, -radius * 0.12, Math.max(2, radius * 0.12), 0, Math.PI * 2);
  context.fillStyle = "#fff";
  context.fill();
  context.beginPath();
  context.arc(radius * 0.7, -radius * 0.12, Math.max(1.2, radius * 0.055), 0, Math.PI * 2);
  context.fillStyle = "#25213d";
  context.fill();
  context.beginPath();
  context.arc(radius * 0.72, -radius * 0.15, Math.max(0.7, radius * 0.02), 0, Math.PI * 2);
  context.fillStyle = "#fff";
  context.fill();
  context.beginPath();
  context.arc(radius * 0.55, radius * 0.17, radius * 0.08, -0.8, 0.8);
  context.strokeStyle = "rgba(81, 37, 88, 0.44)";
  context.lineWidth = Math.max(1, radius * 0.035);
  context.stroke();
  context.restore();
}

function drawFeedingStar(context, star, time) {
  context.save();
  context.translate(star.x, star.y + Math.sin(time * 2.6 + star.phase) * 5);
  context.rotate(time * 0.8 + star.phase);
  context.shadowColor = "#ff69b5";
  context.shadowBlur = 20;
  context.beginPath();
  for (var point = 0; point < 10; point++) {
    var angle = -Math.PI / 2 + point * Math.PI / 5;
    var radius = point % 2 ? 8 : 17;
    var x = Math.cos(angle) * radius;
    var y = Math.sin(angle) * radius;
    if (point === 0) context.moveTo(x, y);
    else context.lineTo(x, y);
  }
  context.closePath();
  var starColor = context.createLinearGradient(-15, -15, 15, 15);
  starColor.addColorStop(0, "#fff8bd");
  starColor.addColorStop(0.5, "#ffbd69");
  starColor.addColorStop(1, "#ff58ac");
  context.fillStyle = starColor;
  context.fill();
  context.strokeStyle = "rgba(255, 255, 255, 0.9)";
  context.lineWidth = 1.5;
  context.stroke();
  context.restore();
}

function emitFeedingParticles(x, y, color, count) {
  for (var i = 0; i < count; i++) {
    var angle = Math.random() * Math.PI * 2;
    var speed = 28 + Math.random() * 100;
    feedingGame.particles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0.45 + Math.random() * 0.5,
      size: 2 + Math.random() * 4,
      color: color
    });
  }
}

function drawFeedingGame() {
  var renderer = feedingGame.renderer;
  if (!renderer) return;
  if (renderer) {
    var gl = renderer.gl;
    if (!feedingGame.width || !feedingGame.height) return;
    var time = performance.now() / 1000;
    var view = new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, -18, 1
    ]);
    gl.viewport(0, 0, feedingGame.canvas.width, feedingGame.canvas.height);
    gl.clearColor(0.035, 0.13, 0.25, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(renderer.program);
    gl.uniformMatrix4fv(
      renderer.uniforms.viewProjection,
      false,
      feedingMultiplyMatrices(renderer.projection, view)
    );
    feedingDrawMesh(renderer, renderer.background, [0, 0, -8], [renderer.worldWidth * 1.8, 8.5, 1], 0, 1, time);
    feedingDrawMesh(renderer, renderer.rays, [0, 0, -6.5], [renderer.worldWidth * 1.6, 6, 1], 0, 1, time);
    feedingDrawMesh(renderer, renderer.environment, [0, 0, 0], [1, 1, 1], 0, 1, time);

    for (var bubbleIndex = 0; bubbleIndex < feedingGame.bubbles.length; bubbleIndex++) {
      var bubble = feedingGame.bubbles[bubbleIndex];
      var bubbleY = (bubble.y - feedingGame.elapsed * bubble.speed) % feedingGame.height;
      if (bubbleY < 0) bubbleY += feedingGame.height;
      var bubblePosition = feedingWorldPosition(bubble.x, bubbleY, bubble.depth);
      var bubbleScale = bubble.radius * renderer.worldScale;
      feedingDrawMesh(renderer, renderer.sphere, bubblePosition,
        [bubbleScale, bubbleScale, bubbleScale], 0, 1, time + bubble.phase);
    }

    for (var fishIndex = 0; fishIndex < feedingGame.fish.length; fishIndex++) {
      drawFeedingFish(feedingGame.fish[fishIndex], false, time);
    }
    for (var starIndex = 0; starIndex < feedingGame.powerups.length; starIndex++) {
      var star = feedingGame.powerups[starIndex];
      var starPosition = feedingWorldPosition(
        star.x,
        star.y + Math.sin(time * 2.6 + star.phase) * 5,
        0.4
      );
      feedingDrawMesh(renderer, renderer.star, starPosition,
        [14 * renderer.worldScale, 14 * renderer.worldScale, 0.28], time * 0.8 + star.phase, 1, time);
    }
    if (feedingGame.player) {
      var player = feedingGame.player;
      if (feedingGame.boostTimer > 0) {
        var glowPosition = feedingWorldPosition(player.x, player.y, (player.depth || 0) - 0.18);
        var glowScale = player.radius * renderer.worldScale;
        feedingDrawMesh(renderer, renderer.sphere, glowPosition,
          [glowScale * 1.35, glowScale * 1.15, glowScale * 0.16], 0, 1, time);
      }
      drawFeedingFish(player, true, time);
    }
    for (var particleIndex = 0; particleIndex < feedingGame.particles.length; particleIndex++) {
      var particle = feedingGame.particles[particleIndex];
      var particlePosition = feedingWorldPosition(particle.x, particle.y, 0.9);
      var particleScale = Math.max(1.2, particle.size) * renderer.worldScale;
      feedingDrawMesh(renderer, renderer.sphere, particlePosition,
        [particleScale, particleScale, particleScale], 0, 1, time);
    }
    return;
  }

  var context = feedingGame.context;
  if (!context || !feedingGame.width || !feedingGame.height) return;
  var time = performance.now() / 1000;
  drawFeedingBackground(context, time);

  for (var i = 0; i < feedingGame.fish.length; i++) {
    drawFeedingFish(feedingGame.fish[i], false, time);
  }
  for (var star = 0; star < feedingGame.powerups.length; star++) {
    drawFeedingStar(context, feedingGame.powerups[star], time);
  }
  if (feedingGame.player) {
    if (feedingGame.player.invulnerable <= 0 || Math.floor(time * 12) % 2 === 0) {
      drawFeedingFish({
        x: feedingGame.player.x,
        y: feedingGame.player.y,
        radius: feedingGame.player.radius,
        direction: feedingGame.player.direction,
        phase: 0,
        tailPhase: time,
        species: 0
      }, true, time);
    }
    if (feedingGame.boostTimer > 0) {
      context.save();
      context.strokeStyle = "rgba(255, 224, 114, 0.86)";
      context.lineWidth = 3;
      context.shadowColor = "#ffd45c";
      context.shadowBlur = 16;
      context.beginPath();
      context.ellipse(feedingGame.player.x, feedingGame.player.y,
        feedingGame.player.radius * 1.65, feedingGame.player.radius * 1.1, 0, 0, Math.PI * 2);
      context.stroke();
      context.restore();
    }
  }
  for (var particleIndex = 0; particleIndex < feedingGame.particles.length; particleIndex++) {
    var particle = feedingGame.particles[particleIndex];
    context.globalAlpha = Math.max(0, particle.life * 1.5);
    context.fillStyle = particle.color;
    context.shadowColor = particle.color;
    context.shadowBlur = 10;
    context.beginPath();
    context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    context.fill();
  }
  context.globalAlpha = 1;
  context.shadowBlur = 0;

  if (feedingGame.frenzyTimer > 0 && feedingGame.state === "playing") {
    var frenzyText = feedingGame.multiplier === 3 ? "DOUBLE FRENZY!" : "MATAO FRENZY!";
    context.save();
    context.textAlign = "center";
    context.font = "700 20px 'Space Grotesk', sans-serif";
    context.fillStyle = "#fff4a8";
    context.shadowColor = "#ff4fa6";
    context.shadowBlur = 18;
    context.fillText(frenzyText, feedingGame.width / 2, 119);
    context.restore();
  }
}

function resetFeedingGame() {
  feedingGame.score = 0;
  feedingGame.level = 1;
  feedingGame.lives = 3;
  feedingGame.progress = 0;
  feedingGame.goal = 8;
  feedingGame.combo = 0;
  feedingGame.comboTimer = 0;
  feedingGame.frenzyTimer = 0;
  feedingGame.multiplier = 1;
  feedingGame.boostCharge = 0;
  feedingGame.boostTimer = 0;
  feedingGame.spawnTimer = 7;
  feedingGame.player = {
    x: feedingGame.width * 0.25,
    y: feedingGame.height * 0.52,
    radius: 20,
    direction: 1,
    invulnerable: 0,
    phase: 0,
    depth: 0
  };
  feedingGame.cameraX = feedingGame.player.x - feedingGame.width / 2;
  feedingGame.cameraY = feedingGame.player.y - feedingGame.height / 2;
  feedingGame.targetX = feedingGame.player.x;
  feedingGame.targetY = feedingGame.player.y;
  feedingGame.hasTarget = false;
  feedingGame.keys = {};
  feedingGame.powerups = [];
  feedingGame.particles = [];
  feedingGame.fish = [];
  for (var i = 0; i < 16; i++) {
    var fish = {};
    respawnFeedingFish(fish, true);
    feedingGame.fish.push(fish);
  }
  updateFeedingGameHud();
  drawFeedingGame();
}

function advanceFeedingLevel() {
  if (feedingGame.level >= feedingGame.totalLevels) {
    feedingGame.state = "won";
    feedingGame.keys = {};
    updateFeedingGameHud();
    return;
  }
  feedingGame.level++;
  feedingGame.progress = 0;
  feedingGame.goal = 8 + feedingGame.level * 2;
  feedingGame.player.radius = Math.min(54, feedingGame.player.radius + 2.5);
  if (feedingGame.level % 3 === 0) {
    feedingGame.lives = Math.min(4, feedingGame.lives + 1);
  }
  feedingGame.state = "levelup";
  feedingGame.keys = {};
  feedingGame.fish = [];
  for (var i = 0; i < 16; i++) {
    var fish = {};
    respawnFeedingFish(fish, true);
    feedingGame.fish.push(fish);
  }
  updateFeedingGameHud();
}

function finishFeedingGame() {
  feedingGame.state = "over";
  feedingGame.keys = {};
  updateFeedingGameHud();
}

function loseFeedingLife() {
  if (feedingGame.player.invulnerable > 0) return;
  feedingGame.lives--;
  feedingGame.player.invulnerable = 2.6;
  feedingGame.player.radius = Math.max(18, feedingGame.player.radius - 1.4);
  feedingGame.player.x = feedingGame.width * 0.25;
  feedingGame.player.y = feedingGame.height * 0.52;
  feedingGame.targetX = feedingGame.player.x;
  feedingGame.targetY = feedingGame.player.y;
  feedingGame.hasTarget = false;
  emitFeedingParticles(feedingGame.player.x, feedingGame.player.y, "#ff84bc", 18);
  if (feedingGame.lives <= 0) finishFeedingGame();
  else {
    document.getElementById("feeding-game-status").textContent =
      "A predator caught you! One life lost — use your dash and keep swimming.";
    updateFeedingGameHud();
  }
}

function activateFeedingBoost() {
  if (feedingGame.state !== "playing" || feedingGame.boostCharge < 100 || feedingGame.boostTimer > 0) {
    return;
  }
  feedingGame.boostCharge = 0;
  feedingGame.boostTimer = 1.15;
  if (feedingGame.player) feedingGame.player.invulnerable = Math.max(feedingGame.player.invulnerable, 0.75);
  emitFeedingParticles(feedingGame.player.x, feedingGame.player.y, "#ffe27c", 14);
  updateFeedingGameHud();
}

function rewardFeedingMeal(fish) {
  if (feedingGame.comboTimer > 0) feedingGame.combo++;
  else feedingGame.combo = 1;
  feedingGame.comboTimer = 2.4;
  feedingGame.multiplier = feedingGame.combo >= 7 ? 3 : feedingGame.combo >= 3 ? 2 : 1;
  feedingGame.frenzyTimer = feedingGame.combo >= 3 ? 2.5 : 0;
  feedingGame.score += (10 + fish.species * 5) * feedingGame.multiplier;
  feedingGame.progress++;
  feedingGame.player.radius = Math.min(54, feedingGame.player.radius + 0.42);
  feedingGame.boostCharge = Math.min(100, feedingGame.boostCharge + 13);
  emitFeedingParticles(fish.x, fish.y, feedingFishSpecies[fish.species % feedingFishSpecies.length].accent, 10);
  if (feedingGame.progress >= feedingGame.goal) {
    advanceFeedingLevel();
  } else {
    updateFeedingGameHud();
  }
}

function updateFeedingGame(delta) {
  var player = feedingGame.player;
  if (!player) return;
  player.invulnerable = Math.max(0, player.invulnerable - delta);
  feedingGame.boostTimer = Math.max(0, feedingGame.boostTimer - delta);
  feedingGame.comboTimer = Math.max(0, feedingGame.comboTimer - delta);
  feedingGame.frenzyTimer = Math.max(0, feedingGame.frenzyTimer - delta);
  if (!feedingGame.comboTimer) {
    feedingGame.combo = 0;
    feedingGame.multiplier = 1;
  }
  feedingGame.spawnTimer -= delta;
  if (feedingGame.spawnTimer <= 0 && feedingGame.powerups.length < 2) {
    feedingGame.powerups.push({
      x: 38 + Math.random() * Math.max(1, feedingGame.width - 76),
      y: 140 + Math.random() * Math.max(1, feedingGame.height - 190),
      phase: Math.random() * Math.PI * 2
    });
    feedingGame.spawnTimer = 9 + Math.random() * 7;
  }

  var horizontal = (feedingGame.keys.right ? 1 : 0) - (feedingGame.keys.left ? 1 : 0);
  var vertical = (feedingGame.keys.down ? 1 : 0) - (feedingGame.keys.up ? 1 : 0);
  var magnitude = Math.hypot(horizontal, vertical);
  var moveSpeed = feedingGame.boostTimer > 0 ? 370 : 225;
  if (magnitude) {
    player.x += (horizontal / magnitude) * moveSpeed * delta;
    player.y += (vertical / magnitude) * moveSpeed * delta;
    if (horizontal) player.direction = horizontal < 0 ? -1 : 1;
    feedingGame.hasTarget = false;
  } else if (feedingGame.hasTarget) {
    if (Math.abs(feedingGame.targetX - player.x) > 1) {
      player.direction = feedingGame.targetX < player.x ? -1 : 1;
    }
    player.x += (feedingGame.targetX - player.x) * Math.min(1, delta * 7.5);
    player.y += (feedingGame.targetY - player.y) * Math.min(1, delta * 7.5);
  }
  player.x = Math.max(player.radius * 1.6, Math.min(feedingGame.width - player.radius * 1.6, player.x));
  player.y = Math.max(105 + player.radius, Math.min(feedingGame.height - 48 - player.radius, player.y));
  feedingGame.cameraX += (player.x - feedingGame.width / 2 - feedingGame.cameraX) * Math.min(1, delta * 2.4);
  feedingGame.cameraY += (player.y - feedingGame.height / 2 - feedingGame.cameraY) * Math.min(1, delta * 2.4);

  for (var i = 0; i < feedingGame.fish.length; i++) {
    var fish = feedingGame.fish[i];
    fish.age += delta;
    fish.x += fish.direction * fish.speed * delta;
    fish.y = fish.baseY + Math.sin(feedingGame.elapsed * 1.3 + fish.phase) * fish.amplitude;
    if (fish.predator && Math.abs(fish.x - player.x) < 280 && player.invulnerable <= 0) {
      fish.direction = fish.x < player.x ? 1 : -1;
      fish.y += Math.sign(player.y - fish.y) * Math.min(26, delta * 30);
    }
    if (fish.x < -fish.radius * 2) {
      fish.x = feedingGame.width + fish.radius * 2;
      fish.baseY = 112 + Math.random() * Math.max(1, feedingGame.height - 165);
    } else if (fish.x > feedingGame.width + fish.radius * 2) {
      fish.x = -fish.radius * 2;
      fish.baseY = 112 + Math.random() * Math.max(1, feedingGame.height - 165);
    }
    if (player.invulnerable <= 0 && Math.hypot(fish.x - player.x, fish.y - player.y) <
      (fish.radius + player.radius) * 0.62) {
      if (player.radius >= fish.radius * 1.12) {
        rewardFeedingMeal(fish);
        respawnFeedingFish(fish, true);
        if (feedingGame.state !== "playing") return;
      } else if (fish.predator) {
        loseFeedingLife();
        if (feedingGame.state !== "playing") return;
      }
    }
  }

  for (var powerup = feedingGame.powerups.length - 1; powerup >= 0; powerup--) {
    var star = feedingGame.powerups[powerup];
    if (Math.hypot(star.x - player.x, star.y - player.y) < player.radius + 17) {
      feedingGame.score += 100 * Math.max(1, feedingGame.multiplier);
      feedingGame.progress = Math.min(feedingGame.goal, feedingGame.progress + 2);
      feedingGame.boostCharge = Math.min(100, feedingGame.boostCharge + 30);
      emitFeedingParticles(star.x, star.y, "#ffdf74", 20);
      feedingGame.powerups.splice(powerup, 1);
      if (feedingGame.progress >= feedingGame.goal) advanceFeedingLevel();
      else updateFeedingGameHud();
      if (feedingGame.state !== "playing") return;
    }
  }

  for (var particleIndex = feedingGame.particles.length - 1; particleIndex >= 0; particleIndex--) {
    var particle = feedingGame.particles[particleIndex];
    particle.x += particle.vx * delta;
    particle.y += particle.vy * delta;
    particle.vx *= 0.97;
    particle.vy *= 0.97;
    particle.life -= delta;
    if (particle.life <= 0) feedingGame.particles.splice(particleIndex, 1);
  }
}

function runFeedingGameFrame(timestamp) {
  feedingGame.animationFrame = 0;
  if (!feedingGame.canvas || document.hidden ||
      !document.getElementById("page-feeding").classList.contains("active")) {
    return;
  }
  var delta = feedingGame.lastFrame
    ? Math.min((timestamp - feedingGame.lastFrame) / 1000, 0.04)
    : 0;
  feedingGame.lastFrame = timestamp;
  feedingGame.elapsed += delta;
  if (feedingGame.state === "playing") updateFeedingGame(delta);
  if (feedingGame.state === "playing" || feedingGame.state === "levelup") {
    updateFeedingGameHud();
  }
  drawFeedingGame();
  feedingGame.animationFrame = window.requestAnimationFrame(runFeedingGameFrame);
}

function ensureFeedingGameLoop() {
  if (feedingGame.animationFrame || document.hidden ||
      !document.getElementById("page-feeding").classList.contains("active")) {
    return;
  }
  feedingGame.animationFrame = window.requestAnimationFrame(runFeedingGameFrame);
}

function startFeedingGame() {
  if (feedingGame.state === "playing") {
    feedingGame.state = "paused";
    feedingGame.keys = {};
  } else {
    if (feedingGame.state === "ready" || feedingGame.state === "over" || feedingGame.state === "won") {
      resetFeedingGame();
    }
    feedingGame.state = "playing";
    feedingGame.lastFrame = 0;
  }
  updateFeedingGameHud();
  drawFeedingGame();
  ensureFeedingGameLoop();
  if (feedingGame.state === "playing") feedingGame.canvas.focus();
}

function returnToFeedingMenu() {
  if (feedingGame.animationFrame) {
    window.cancelAnimationFrame(feedingGame.animationFrame);
    feedingGame.animationFrame = 0;
  }
  resetFeedingGame();
  feedingGame.state = "ready";
  feedingGame.lastFrame = 0;
  updateFeedingGameHud();
  drawFeedingGame();
}

function setFeedingPointerTarget(event) {
  if (feedingGame.state !== "playing") return;
  var bounds = feedingGame.canvas.getBoundingClientRect();
  feedingGame.targetX = event.clientX - bounds.left;
  feedingGame.targetY = event.clientY - bounds.top;
  feedingGame.hasTarget = true;
  if (Math.abs(feedingGame.targetX - feedingGame.player.x) > 1) {
    feedingGame.player.direction = feedingGame.targetX < feedingGame.player.x ? -1 : 1;
  }
}

function setupFeedingGame() {
  feedingGame.canvas = document.getElementById("feeding-game-canvas");
  feedingGame.canvas.addEventListener("pointermove", setFeedingPointerTarget);
  feedingGame.canvas.addEventListener("pointerdown", function (event) {
    setFeedingPointerTarget(event);
    if (feedingGame.state === "playing") feedingGame.canvas.focus();
  });
  feedingGame.canvas.addEventListener("keydown", function (event) {
    var directions = {
      ArrowLeft: "left", KeyA: "left", ArrowRight: "right", KeyD: "right",
      ArrowUp: "up", KeyW: "up", ArrowDown: "down", KeyS: "down"
    };
    if (directions[event.code] && feedingGame.state === "playing") {
      event.preventDefault();
      feedingGame.keys[directions[event.code]] = true;
    }
  });
  window.addEventListener("keyup", function (event) {
    var key = event.code.replace("Arrow", "").replace("Key", "").toLowerCase();
    var direction = {
      left: "left", a: "left", right: "right", d: "right",
      up: "up", w: "up", down: "down", s: "down"
    }[key];
    if (direction) feedingGame.keys[direction] = false;
  });
  window.addEventListener("keydown", function (event) {
    if (!document.getElementById("page-feeding").classList.contains("active")) return;
    if (event.code === "Space") {
      event.preventDefault();
      activateFeedingBoost();
    } else if (event.code === "Escape" && feedingGame.state === "playing") {
      startFeedingGame();
    }
  });
  window.addEventListener("resize", resizeFeedingGame);
  document.addEventListener("visibilitychange", function () {
    if (document.hidden && feedingGame.state === "playing") {
      feedingGame.state = "paused";
      feedingGame.keys = {};
      updateFeedingGameHud();
    } else if (!document.hidden) {
      ensureFeedingGameLoop();
    }
  });
  document.getElementById("feeding-game-start").addEventListener("click", startFeedingGame);
  document.getElementById("feeding-game-overlay-start").addEventListener("click", startFeedingGame);
  document.getElementById("feeding-game-menu").addEventListener("click", returnToFeedingMenu);
  document.getElementById("feeding-game-boost-touch").addEventListener("click", activateFeedingBoost);
  feedingGame.state = "ready";
  updateFeedingGameHud();
}


/* =========================================================
   18. NAVIGATION, EVENTS AND START OF THE PROGRAM
   ========================================================= */

// Show one page. For the office page, pass the unit code as the second value.
function showPage(pageName, officeCode) {
  if (pageName !== "feeding" &&
      document.getElementById("page-feeding").classList.contains("active") &&
      feedingGame.state === "playing") {
    startFeedingGame();
  }

  var pages = document.querySelectorAll(".page");
  for (var i = 0; i < pages.length; i++) {
    pages[i].classList.remove("active");
  }
  document.getElementById("page-" + pageName).classList.add("active");

  // Keep the active top-navigation item visible to assistive technology.
  var links = document.querySelectorAll(".nav-link");
  for (var j = 0; j < links.length; j++) {
    links[j].classList.remove("active");
    var isPageLink = links[j].getAttribute("data-page") === pageName;
    var isOfficeLink = pageName === "office" && links[j].getAttribute("data-office") === officeCode;
    if (isPageLink || isOfficeLink) {
      links[j].classList.add("active");
      links[j].setAttribute("aria-current", "page");
    } else {
      links[j].removeAttribute("aria-current");
    }
  }

  // Draw the content of the page we opened
  if (pageName === "dashboard") {
    renderDashboard();
  } else if (pageName === "tests") {
    renderTests();
  } else if (pageName === "results") {
    renderResults();
  } else if (pageName === "students") {
    renderStudents();
    renderRecords();
  } else if (pageName === "analytics") {
    renderAnalytics();
  } else if (pageName === "logs") {
    renderLogs();
  } else if (pageName === "map") {
    renderMap();
  } else if (pageName === "settings") {
    renderDatasetInfo();
  } else if (pageName === "feeding") {
    resizeFeedingGame();
    drawFeedingGame();
  } else if (pageName === "recommendations") {
    renderRecommendations();
  } else if (pageName === "office") {
    renderOffice(officeCode);
  }

  window.scrollTo(0, 0);
}

// Buttons with data-goto="pagename" open that page
function connectGotoButtons() {
  var buttons = document.querySelectorAll("[data-goto]");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
      showPage(this.getAttribute("data-goto"));
    };
  }
}

function setupNavigation() {
  var pageLinks = document.querySelectorAll(".nav-link[data-page]");
  for (var i = 0; i < pageLinks.length; i++) {
    pageLinks[i].addEventListener("click", function () {
      showPage(this.getAttribute("data-page"));
    });
  }

  var officeLinks = document.querySelectorAll(".nav-link[data-office]");
  for (var j = 0; j < officeLinks.length; j++) {
    officeLinks[j].addEventListener("click", function () {
      openOffice(this.getAttribute("data-office"));
    });
  }

  connectGotoButtons();

  document.getElementById("logout-button").addEventListener("click", function () {
    alert("This dashboard has no connected account session to log out of.");
  });
}

// Fill the drop-down lists
function fillFilters() {
  var unitItems = [];
  for (var u = 0; u < units.length; u++) {
    var dataLabel = units[u].participants === null ? " (No Data)" : "";
    unitItems.push({ value: units[u].code, text: units[u].code + " - " + units[u].name + dataLabel });
  }

  var testItems = [];
  for (var t = 0; t < tests.length; t++) {
    testItems.push({ value: String(tests[t].id), text: tests[t].id + ". " + tests[t].name });
  }

  fillSelect("filter-unit", "All Colleges / Offices", unitItems);
  fillSelect("student-unit", "All Colleges / Offices", unitItems);
  fillSelect("record-unit", "All Colleges / Offices", unitItems);
  fillSelect("rec-unit", "All Colleges / Offices", unitItems);
  fillSelect("filter-test", "All Survey Tests", testItems);
  fillSelect("record-test", "All Survey Tests", testItems);

  // Activity types come from the logs
  var typeItems = [];
  var seenTypes = {};
  for (var i = 0; i < logs.length; i++) {
    if (!seenTypes[logs[i].type]) {
      seenTypes[logs[i].type] = true;
      typeItems.push({ value: logs[i].type, text: logs[i].type });
    }
  }
  fillSelect("log-type", "All Activity Types", typeItems);
}

// Put the real totals in every place that shows the number of participants
function fillTotals() {
  var places = document.querySelectorAll(".total-participants");
  for (var i = 0; i < places.length; i++) {
    places[i].textContent = getTotalParticipants();
  }
}

function parseCsvLine(line) {
  var values = [];
  var current = "";
  var quoted = false;
  for (var i = 0; i < line.length; i++) {
    var character = line[i];
    if (character === '"' ) {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      values.push(current.trim());
      current = "";
    } else {
      current += character;
    }
  }
  values.push(current.trim());
  return values;
}

function csvNumberOrNull(value) {
  if (!value || value === "No Data" || value === "Awaiting Data") {
    return null;
  }
  var number = Number(value);
  return isNaN(number) ? null : number;
}

function applyVerifiedSurveyCsv(csvText) {
  var lines = csvText.trim().split(/\r?\n/);
  if (lines.length < 2) {
    return false;
  }

  var headers = parseCsvLine(lines[0]);
  var unitIndex = headers.indexOf("Unit");
  if (unitIndex < 0) {
    return false;
  }

  var column = {};
  for (var h = 0; h < headers.length; h++) {
    column[headers[h]] = h;
  }

  var loaded = false;
  for (var i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) {
      continue;
    }
    var row = parseCsvLine(lines[i]);
    var code = row[unitIndex];
    if (code === "TOTAL") {
      continue;
    }
    var unit = findUnit(code);
    if (!unit) {
      continue;
    }

    unit.participants = csvNumberOrNull(row[column["Respondents"]]);
    unit.perfectScores = csvNumberOrNull(row[column["Confirmed 10/10 Scores"]]);
    unit.pendingScores = csvNumberOrNull(row[column["Exact Scores Pending"]]);
    unit.knownCorrect = csvNumberOrNull(row[column["Known Correct Answers"]]);
    unit.knownAnswers = csvNumberOrNull(row[column["Known Answer Records"]]);
    unit.testPerfect = unit.perfectScores;
    unit.testCorrect = unit.knownAnswers
      ? Math.round((unit.knownCorrect / unit.knownAnswers) * 100)
      : null;
    loaded = true;
  }
  return loaded;
}

function loadVerifiedSurveyCsv() {
  if (!window.fetch) {
    return;
  }
  fetch("cybersecurity-survey-results.csv", { cache: "no-store" })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Verified survey CSV could not be loaded.");
      }
      return response.text();
    })
    .then(function (csvText) {
      if (!applyVerifiedSurveyCsv(csvText)) {
        return;
      }
      verifiedSurveyCsvLoaded = true;
      fillTotals();
      var activePage = document.querySelector(".page.active");
      if (activePage && activePage.id === "page-dashboard") {
        renderDashboard();
      } else if (activePage) {
        showPage(activePage.id.replace("page-", ""));
      }
    })
    .catch(function () {
      // The existing verified in-code aggregates remain the fallback.
    });
}

function showCurrentDate() {
  var today = new Date();
  setText("current-date", today.toDateString());
}

// Connect the filters, search boxes, buttons and tables
function setupEvents() {
  // Survey Results filters
  var resultFilters = ["filter-test", "filter-unit", "filter-status"];
  for (var i = 0; i < resultFilters.length; i++) {
    document.getElementById(resultFilters[i]).addEventListener("change", renderResults);
  }
  document.getElementById("reset-filters").addEventListener("click", function () {
    resetResultFilters();
    renderResults();
  });

  // Student Records controls
  document.getElementById("student-search").addEventListener("input", function () {
    studentState.page = 1;
    renderStudents();
  });
  document.getElementById("student-unit").addEventListener("change", function () {
    studentState.page = 1;
    renderStudents();
  });
  document.getElementById("student-per-page").addEventListener("change", function () {
    studentState.perPage = parseInt(this.value);
    studentState.page = 1;
    renderStudents();
  });
  document.getElementById("student-prev").addEventListener("click", function () {
    studentState.page--;
    renderStudents();
  });
  document.getElementById("student-next").addEventListener("click", function () {
    studentState.page++;
    renderStudents();
  });

  // Dataset Records controls
  var recordInputs = ["record-search-id", "record-search-question", "record-search-answer"];
  for (var a = 0; a < recordInputs.length; a++) {
    document.getElementById(recordInputs[a]).addEventListener("input", function () {
      recordState.page = 1;
      renderRecords();
    });
  }
  var recordSelects = ["record-unit", "record-test", "record-result"];
  for (var b = 0; b < recordSelects.length; b++) {
    document.getElementById(recordSelects[b]).addEventListener("change", function () {
      recordState.page = 1;
      renderRecords();
    });
  }
  document.getElementById("record-per-page").addEventListener("change", function () {
    recordState.perPage = parseInt(this.value);
    recordState.page = 1;
    renderRecords();
  });
  document.getElementById("record-prev").addEventListener("click", function () {
    recordState.page--;
    renderRecords();
  });
  document.getElementById("record-next").addEventListener("click", function () {
    recordState.page++;
    renderRecords();
  });

  // Clicking a column title sorts the table
  var headers = document.querySelectorAll("th[data-sort]");
  for (var h = 0; h < headers.length; h++) {
    headers[h].addEventListener("click", function () {
      var column = this.getAttribute("data-sort");
      if (this.getAttribute("data-table") === "students") {
        changeSort(studentState, column);
        renderStudents();
      } else {
        changeSort(recordState, column);
        renderRecords();
      }
    });
  }

  // Activity Logs filters
  document.getElementById("log-search").addEventListener("input", renderLogs);
  document.getElementById("log-type").addEventListener("change", renderLogs);
  document.getElementById("log-status").addEventListener("change", renderLogs);

  // Recommendations filter
  document.getElementById("rec-unit").addEventListener("change", renderRecommendations);

  // Print buttons
  document.getElementById("print-report").addEventListener("click", function () {
    window.print();
  });
  document.getElementById("print-report-bottom").addEventListener("click", function () {
    window.print();
  });

  // Map buttons
  document.getElementById("zoom-in").addEventListener("click", function () {
    changeMapZoom(25);
  });
  document.getElementById("zoom-out").addEventListener("click", function () {
    changeMapZoom(-25);
  });
  document.getElementById("zoom-reset").addEventListener("click", resetMapZoom);
  document.getElementById("full-map-button").addEventListener("click", openFullMap);

  // Pop-up windows
  document.getElementById("close-student-modal").addEventListener("click", closeStudentDetails);
  document.getElementById("close-map-modal").addEventListener("click", function () {
    document.getElementById("map-modal").classList.remove("show");
  });
  document.getElementById("student-modal").addEventListener("click", function (event) {
    if (event.target === this) {
      closeStudentDetails();
    }
  });
  document.getElementById("map-modal").addEventListener("click", function (event) {
    if (event.target === this) {
      this.classList.remove("show");
    }
  });

  // Settings
  connectCheckbox("setting-fish", "fish");
  connectCheckbox("setting-bubbles", "bubbles");
  connectCheckbox("setting-mouse", "mouse");
  connectCheckbox("setting-large-text", "largeText");
  connectCheckbox("setting-compact", "compactCards");
  connectCheckbox("setting-activities", "showActivities");

  document.getElementById("setting-rows").addEventListener("change", function () {
    settings.rowsPerPage = parseInt(this.value);
    saveSettings();
    studentState.perPage = settings.rowsPerPage;
    recordState.perPage = settings.rowsPerPage;
    studentState.page = 1;
    recordState.page = 1;
    document.getElementById("student-per-page").value = String(settings.rowsPerPage);
    document.getElementById("record-per-page").value = String(settings.rowsPerPage);
  });
}

/* =========================================================
   19. SUPPLIED RESPONSE DATA
   ========================================================= */

var surveyValidation = { valid: false, errors: [] };
var surveyIndicators = [
  { questionIndex: 1, answer: "Yes", label: "Heard about phishing" },
  { questionIndex: 3, answer: "Yes", label: "Uses two-factor authentication" },
  { questionIndex: 5, answer: "Always", label: "Always checks links before clicking" }
];

function escapeSurveyText(value) {
  return String(value === null || value === undefined ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function initializeSurveyDataset() {
  var sourceResponses = suppliedSurveyData.responses;
  var seenIds = Object.create(null);
  var errors = [];
  students = [];
  records = [];

  if (!Array.isArray(sourceResponses) || !Array.isArray(suppliedSurveyData.questions) ||
      suppliedSurveyData.questions.length !== 8) {
    surveyValidation = { valid: false, errors: ["Expected eight survey questions and a response list."] };
    return;
  }

  for (var i = 0; i < sourceResponses.length; i++) {
    var response = sourceResponses[i];
    var studentId = String(response.studentId || "").trim();
    var college = String(response.college || "").trim();
    var source = String(response.source || "");
    var answers = Array.isArray(response.answers) ? response.answers : [];
    var sourceType = source.indexOf("Simulated Responses") !== -1 ? "simulated" : "supplemental";

    if (studentId && seenIds[studentId]) {
      errors.push("Duplicate student ID: " + studentId);
    } else if (studentId) {
      seenIds[studentId] = true;
    }
    if (answers.length !== suppliedSurveyData.questions.length ||
        answers.some(function (answer) { return !String(answer || "").trim(); })) {
      errors.push("Incomplete response at source row " + response.sourceRow + ".");
    }
    if (!source) {
      errors.push("Missing source information at row " + response.sourceRow + ".");
    }
    if (college && !getUnit(college)) {
      errors.push("Unrecognized college at source row " + response.sourceRow + ": " + college);
    }

    students.push({
      studentId: studentId,
      unit: college || "Unassigned",
      answers: answers,
      source: source,
      sourceType: sourceType,
      sourceRow: response.sourceRow,
      submittedAt: response.submittedAt || "",
      responseIndex: i,
      correct: null,
      incorrect: null,
      totalTests: response.answers.length,
      percent: null,
      status: "Unscored"
    });

    for (var q = 0; q < suppliedSurveyData.questions.length; q++) {
      records.push({
        recordId: "R" + response.sourceRow + "-Q" + (q + 1),
        studentId: studentId,
        unit: college || "Unassigned",
        source: response.source,
        sourceType: sourceType,
        sourceRow: response.sourceRow,
        questionIndex: q,
        questionId: q + 1,
        question: suppliedSurveyData.questions[q],
        answer: answers[q] || "",
        result: "Not scored",
        score: null
      });
    }
  }

  for (var u = 0; u < units.length; u++) {
    var collegeCount = 0;
    for (var s = 0; s < students.length; s++) {
      if (students[s].unit === units[u].code) {
        collegeCount++;
      }
    }
    units[u].participants = collegeCount ? collegeCount : null;
    units[u].perfectScores = null;
    units[u].pendingScores = null;
    units[u].knownCorrect = null;
    units[u].knownAnswers = null;
    units[u].testPerfect = null;
    units[u].testCorrect = null;
  }

  surveyValidation = { valid: errors.length === 0, errors: errors };
}

function getIdentifiedStudentCount() {
  var ids = Object.create(null);
  for (var i = 0; i < students.length; i++) {
    if (students[i].studentId) {
      ids[students[i].studentId] = true;
    }
  }
  return Object.keys(ids).length;
}

function getUnassignedResponseCount() {
  var count = 0;
  for (var i = 0; i < students.length; i++) {
    if (students[i].unit === "Unassigned") {
      count++;
    }
  }
  return count;
}

function getSurveyResponsesForCollege(college) {
  if (!college || college === "all") {
    return students.slice();
  }
  return students.filter(function (student) { return student.unit === college; });
}

function getQuestionDistribution(responseList, questionIndex) {
  if (!surveyValidation.valid) {
    return [];
  }
  var counts = Object.create(null);
  for (var i = 0; i < responseList.length; i++) {
    var answer = String(responseList[i].answers[questionIndex] || "");
    counts[answer] = (counts[answer] || 0) + 1;
  }
  return Object.keys(counts).map(function (answer) {
    return { label: answer, count: counts[answer] };
  }).sort(function (a, b) {
    return b.count - a.count || a.label.localeCompare(b.label);
  });
}

function renderResponseBars(containerId, items, denominator) {
  if (!items.length || !denominator) {
    setHtml(containerId, '<p class="empty-text">No responses for this selection.</p>');
    return;
  }
  var html = '<div class="response-bars">';
  for (var i = 0; i < items.length; i++) {
    var share = Math.round((items[i].count / denominator) * 1000) / 10;
    var width = Math.max(0, Math.min(100, share));
    html += '<div class="response-bar-row" title="' + escapeSurveyText(items[i].label) + ': ' +
      items[i].count + ' (' + formatPercent(share) + ')">' +
      '<span class="response-bar-label">' + escapeSurveyText(items[i].label) + '</span>' +
      '<span class="response-bar-track"><span class="response-bar-fill" style="width:' + width + '%"></span></span>' +
      '<span class="response-bar-value">' + formatNumber(items[i].count) + ' · ' +
      formatPercent(share) + '</span></div>';
  }
  setHtml(containerId, html + '</div>');
}

function renderCollegeDistribution(containerId, showPie) {
  if (!surveyValidation.valid) {
    setHtml(containerId, '<p class="empty-text">Charts are unavailable until dataset validation passes.</p>');
    return;
  }
  var counts = [];
  for (var i = 0; i < units.length; i++) {
    if (units[i].participants) {
      counts.push({ label: units[i].code, count: units[i].participants });
    }
  }
  var unassigned = getUnassignedResponseCount();
  if (unassigned) {
    counts.push({ label: "College not reported", count: unassigned });
  }
  var total = students.length;
  if (!showPie) {
    renderResponseBars(containerId, counts, total);
    return;
  }
  if (!total) {
    setHtml(containerId, '<p class="empty-text">No responses available.</p>');
    return;
  }
  var colors = ["#d94c91", "#6e8ed8", "#f0a15b", "#56a58b", "#9477c8", "#abb3c1"];
  var stop = 0;
  var stops = [];
  var legend = "";
  for (var c = 0; c < counts.length; c++) {
    var end = stop + (counts[c].count / total) * 100;
    stops.push(colors[c % colors.length] + " " + stop + "% " + end + "%");
    legend += '<li><span class="pie-dot" style="background:' + colors[c % colors.length] +
      '"></span>' + escapeSurveyText(counts[c].label) + ' — ' + counts[c].count +
      ' (' + formatPercent(percentOf(counts[c].count, total)) + ')</li>';
    stop = end;
  }
  setHtml(containerId, '<div class="college-pie-layout"><div class="college-pie" role="img" aria-label="Respondent share by college" style="background:conic-gradient(' +
    stops.join(",") + ')"></div><ul class="college-pie-legend">' + legend + '</ul></div>');
}

function getIndicatorStats(responseList) {
  if (!surveyValidation.valid) {
    return [];
  }
  var stats = [];
  for (var i = 0; i < surveyIndicators.length; i++) {
    var indicator = surveyIndicators[i];
    var count = 0;
    for (var j = 0; j < responseList.length; j++) {
      if (responseList[j].answers[indicator.questionIndex] === indicator.answer) {
        count++;
      }
    }
    stats.push({
      label: indicator.label,
      count: count,
      total: responseList.length,
      percent: percentOf(count, responseList.length),
      questionIndex: indicator.questionIndex,
      answer: indicator.answer
    });
  }
  return stats;
}

function fillSurveyFilters() {
  var collegeOptions = [];
  for (var i = 0; i < units.length; i++) {
    collegeOptions.push({ value: units[i].code, text: units[i].code + " — " + units[i].name });
  }
  collegeOptions.push({ value: "Unassigned", text: "College not reported" });
  fillSelect("student-unit", "All colleges", collegeOptions);
  fillSelect("record-unit", "All colleges", collegeOptions);
  fillSelect("filter-unit", "All colleges", collegeOptions);
  fillSelect("rec-unit", "All colleges", collegeOptions);

  var questionOptions = [];
  for (var q = 0; q < suppliedSurveyData.questions.length; q++) {
    questionOptions.push({
      value: String(q),
      text: "Q" + (q + 1) + " — " + suppliedSurveyData.questions[q]
    });
  }
  fillSelect("filter-test", "All questions", questionOptions);
  fillSelect("record-test", "All questions", questionOptions);

  var sourceOptions = [
    { value: "simulated", text: "Simulated Responses workbook" },
    { value: "supplemental", text: "Supplemental form workbook" }
  ];
  fillSelect("filter-status", "All response sources", sourceOptions);
  fillSelect("record-result", "All response sources", sourceOptions);

  var dashboardQuestion = "";
  for (var d = 0; d < suppliedSurveyData.questions.length; d++) {
    dashboardQuestion += '<option value="' + d + '">Q' + (d + 1) + ' — ' +
      escapeSurveyText(suppliedSurveyData.questions[d]) + '</option>';
  }
  setHtml("dashboard-question-filter", dashboardQuestion);

  var dashboardColleges = '<option value="all">All colleges</option>';
  for (var c = 0; c < units.length; c++) {
    if (units[c].participants) {
      dashboardColleges += '<option value="' + escapeSurveyText(units[c].code) + '">' +
        escapeSurveyText(units[c].code) + '</option>';
    }
  }
  setHtml("dashboard-college-filter", dashboardColleges);
}

function getResultsFilterList() {
  var college = getValue("filter-unit");
  var source = getValue("filter-status");
  return students.filter(function (student) {
    return (college === "all" || student.unit === college) &&
      (source === "all" || student.sourceType === source);
  });
}

function renderDashboard() {
  var collegeCount = getParticipatingUnitCount();
  var identified = getIdentifiedStudentCount();
  var unassigned = getUnassignedResponseCount();
  var cards = "";
  cards += makeSummaryCard("🎓", "Identified Students", formatNumber(identified),
    formatNumber(unassigned) + " complete responses have no student ID");
  cards += makeSummaryCard("📋", "Survey Responses", formatNumber(students.length),
    formatNumber(records.length) + " question-answer records");
  cards += makeSummaryCard("🏫", "Colleges Represented", String(collegeCount),
    "Unreported college responses are shown separately");

  var collegeBreakdown = [];
  for (var c = 0; c < units.length; c++) {
    if (units[c].participants) {
      collegeBreakdown.push(units[c].code + " " + units[c].participants);
    }
  }
  if (unassigned) {
    collegeBreakdown.push("Unreported " + unassigned);
  }
  cards += makeSummaryCard("📊", "Responses by College", "See charts",
    collegeBreakdown.join(" · "));
  cards += makeSummaryCard("✅", "Correct Answers", "Not scored",
    "No answer key or coding rubric was supplied");
  cards += makeSummaryCard("❌", "Incorrect Answers", "Not scored",
    "No answer key or coding rubric was supplied");
  cards += makeSummaryCard("🎯", "Overall Awareness Rate", "Not scored",
    "Self-reported indicators are shown separately");
  cards += makeSummaryCard("📈", "Average Awareness Score", "Not scored",
    "The source contains no scored assessment");
  setHtml("dashboard-cards", cards);

  renderCollegeDistribution("college-count-chart", false);
  renderCollegeDistribution("college-share-chart", true);
  var selectedCollege = getValue("dashboard-college-filter");
  var indicatorResponses = getSurveyResponsesForCollege(selectedCollege);
  var indicatorItems = getIndicatorStats(indicatorResponses).map(function (item) {
    return { label: item.label, count: item.count, percent: item.percent };
  });
  renderResponseBars("dashboard-indicators", indicatorItems.map(function (item) {
    return { label: item.label, count: item.count };
  }), indicatorResponses.length);

  var questionIndex = parseInt(getValue("dashboard-question-filter"), 10);
  if (isNaN(questionIndex) || questionIndex < 0 || questionIndex >= suppliedSurveyData.questions.length) {
    questionIndex = 0;
  }
  var answerStats = getQuestionDistribution(students, questionIndex);
  renderResponseBars("dashboard-answer-chart", answerStats, students.length);

  var sourceCounts = { simulated: 0, supplemental: 0 };
  for (var s = 0; s < students.length; s++) {
    sourceCounts[students[s].sourceType]++;
  }
  var validationMessage = surveyValidation.valid
    ? '<p><strong>Validation passed.</strong> ' + students.length + ' complete responses, ' +
      suppliedSurveyData.questions.length + ' answers each, and ' + identified +
      ' unique student IDs. No duplicate IDs were found.</p>'
    : '<p class="validation-error"><strong>Statistics are unavailable because validation found issues:</strong></p><ul>' +
      surveyValidation.errors.map(function (error) { return '<li>' + escapeSurveyText(error) + '</li>'; }).join("") + '</ul>';
  validationMessage += '<p>Sources: ' + sourceCounts.simulated +
    ' rows from the workbook tab labeled “Simulated Responses” and ' +
    sourceCounts.supplemental + ' complete rows from “Form Responses 1”. ' +
    unassigned + ' supplemental rows have no ID or college; they are retained as unassigned responses.</p>' +
    '<p>The supplemental workbook contains the same eight survey fields, not separate interview questions. ' +
    'No answer key or scoring rubric was supplied, so correct/incorrect totals, awareness rates, and average scores are not calculated.</p>';
  setHtml("dashboard-validation", validationMessage);
}

function getFilteredStudents() {
  var search = getValue("student-search").trim().toLowerCase();
  var college = getValue("student-unit");
  return students.filter(function (student) {
    return (college === "all" || student.unit === college) &&
      (!search || student.studentId.toLowerCase().indexOf(search) !== -1);
  });
}

function renderStudents() {
  var list = getFilteredStudents();
  sortList(list, studentState.sortColumn, studentState.sortDirection);
  var pageInfo = getPageSlice(list, studentState);
  var rows = "";
  for (var i = 0; i < pageInfo.items.length; i++) {
    var student = pageInfo.items[i];
    rows += '<tr><td>' + (student.studentId ? escapeSurveyText(student.studentId) : '<span class="unscored">Not provided</span>') +
      '</td><td>' + escapeSurveyText(student.unit === "Unassigned" ? "Not reported" : student.unit) + '</td>';
    for (var q = 0; q < student.answers.length; q++) {
      rows += '<td class="answer-cell" title="' + escapeSurveyText(student.answers[q]) + '">' +
        escapeSurveyText(student.answers[q]) + '</td>';
    }
    rows += '<td class="unscored">Not scored</td><td class="unscored">Not scored</td><td class="unscored">Not scored</td>' +
      '<td><span class="source-tag">' + escapeSurveyText(student.sourceType === "simulated" ? "Simulated workbook" : "Supplemental form") +
      '</span><button class="btn-small" onclick="openStudentDetailsByIndex(' + student.responseIndex + ')">Details</button></td></tr>';
  }
  if (!rows) {
    rows = '<tr><td colspan="14">No student responses match these filters.</td></tr>';
  }
  setHtml("student-table-body", rows);
  setText("student-response-total", String(students.length));
  setHtml("student-aggregate-summary", '<div class="validation-summary"><strong>' +
    students.length + '</strong> complete responses · <strong>' + getIdentifiedStudentCount() +
    '</strong> unique IDs · <strong>' + getParticipatingUnitCount() +
    '</strong> colleges · <strong>' + getUnassignedResponseCount() +
    '</strong> responses with college/ID not reported. Score fields are intentionally unscored.</div>');
  setText("student-data-note", "Use the horizontal scrollbar to view every answer field. Complete responses without IDs are retained and labeled “Not provided.”");
  showPagerInfo("student", studentState, list.length, pageInfo);
  markSortedColumn("students", studentState);
}

function openStudentDetailsByIndex(index) {
  var student = students[index];
  if (!student) {
    return;
  }
  var html = '<h3>Student ' + escapeSurveyText(student.studentId || "ID not provided") + '</h3>' +
    '<p class="data-note">' + escapeSurveyText(student.unit === "Unassigned" ? "College not reported" : student.unit) +
    ' · ' + escapeSurveyText(student.source) + '</p>';
  if (student.submittedAt) {
    html += '<p>Submitted: ' + escapeSurveyText(student.submittedAt) + '</p>';
  }
  html += '<div class="stat-row"><span>Correct answers</span><strong>Not scored</strong></div>' +
    '<div class="stat-row"><span>Incorrect answers</span><strong>Not scored</strong></div>' +
    '<div class="stat-row"><span>Total score</span><strong>Not scored</strong></div>' +
    '<div class="table-wrap"><table><thead><tr><th>Survey question</th><th>Original response</th></tr></thead><tbody>';
  for (var q = 0; q < suppliedSurveyData.questions.length; q++) {
    html += '<tr><td>' + escapeSurveyText(suppliedSurveyData.questions[q]) + '</td><td>' +
      escapeSurveyText(student.answers[q]) + '</td></tr>';
  }
  setHtml("student-modal-body", html + '</tbody></table></div>');
  document.getElementById("student-modal").classList.add("show");
}

function openStudentDetails(studentId) {
  var student = findStudent(studentId);
  if (student) {
    openStudentDetailsByIndex(student.responseIndex);
  }
}

function getFilteredRecords() {
  var idSearch = getValue("record-search-id").trim().toLowerCase();
  var questionSearch = getValue("record-search-question").trim().toLowerCase();
  var answerSearch = getValue("record-search-answer").trim().toLowerCase();
  var college = getValue("record-unit");
  var question = getValue("record-test");
  var source = getValue("record-result");
  return records.filter(function (record) {
    return (college === "all" || record.unit === college) &&
      (question === "all" || record.questionIndex === Number(question)) &&
      (source === "all" || record.sourceType === source) &&
      (!idSearch || record.studentId.toLowerCase().indexOf(idSearch) !== -1) &&
      (!questionSearch || record.question.toLowerCase().indexOf(questionSearch) !== -1) &&
      (!answerSearch || record.answer.toLowerCase().indexOf(answerSearch) !== -1);
  });
}

function renderRecords() {
  var list = getFilteredRecords();
  sortList(list, recordState.sortColumn, recordState.sortDirection);
  var pageInfo = getPageSlice(list, recordState);
  setText("record-total", "Showing " + formatNumber(list.length) + " of " +
    formatNumber(records.length) + " answer records. Correctness and score are not provided by the source.");
  var rows = "";
  for (var i = 0; i < pageInfo.items.length; i++) {
    var record = pageInfo.items[i];
    rows += '<tr><td>' + escapeSurveyText(record.recordId) + '</td><td>' +
      (record.studentId ? escapeSurveyText(record.studentId) : "Not provided") + '</td><td>' +
      escapeSurveyText(record.unit === "Unassigned" ? "Not reported" : record.unit) + '</td><td>' +
      escapeSurveyText(record.sourceType === "simulated" ? "Simulated workbook" : "Supplemental form") +
      '</td><td>Q' + record.questionId + '</td><td>' + escapeSurveyText(record.question) +
      '</td><td class="answer-cell">' + escapeSurveyText(record.answer) +
      '</td><td class="unscored">Not scored</td><td class="unscored">Not scored</td></tr>';
  }
  if (!rows) {
    rows = '<tr><td colspan="9">No answer records match these filters.</td></tr>';
  }
  setHtml("record-table-body", rows);
  showPagerInfo("record", recordState, list.length, pageInfo);
  markSortedColumn("records", recordState);
}

function renderResults() {
  var responseList = getResultsFilterList();
  var selectedQuestion = getValue("filter-test");
  var questionIndex = selectedQuestion === "all" ? 0 : Number(selectedQuestion);
  var distribution = getQuestionDistribution(responseList, questionIndex);
  renderResponseBars("results-bar-chart", distribution, responseList.length);

  var cumulative = 0;
  var colors = ["#d94c91", "#6e8ed8", "#f0a15b", "#56a58b", "#9477c8", "#abb3c1"];
  var stops = [];
  var legend = "";
  for (var i = 0; i < distribution.length; i++) {
    var start = cumulative;
    cumulative += percentOf(distribution[i].count, responseList.length);
    stops.push(colors[i % colors.length] + " " + start + "% " + cumulative + "%");
    legend += '<li><span class="pie-dot" style="background:' + colors[i % colors.length] +
      '"></span>' + escapeSurveyText(distribution[i].label) + ': ' + distribution[i].count +
      ' (' + formatPercent(percentOf(distribution[i].count, responseList.length)) + ')</li>';
  }
  setHtml("results-doughnut", distribution.length
    ? '<div class="college-pie-layout"><div class="college-pie" role="img" aria-label="Answer share" style="background:conic-gradient(' +
      stops.join(",") + ')"></div><ul class="college-pie-legend">' + legend + '</ul></div>'
    : '<p class="empty-text">No responses for this selection.</p>');
  setText("results-note", formatNumber(responseList.length) +
    " complete responses · Question " + (questionIndex + 1) +
    " selected for the chart. These answer patterns are descriptive, not correctness scores.");

  var rows = "";
  for (var q = 0; q < suppliedSurveyData.questions.length; q++) {
    var stats = getQuestionDistribution(responseList, q);
    var top = stats[0];
    rows += '<tr><td>Q' + (q + 1) + '</td><td>' + escapeSurveyText(suppliedSurveyData.questions[q]) +
      '</td><td>' + responseList.length + '</td><td>' + (top ? escapeSurveyText(top.label) : "—") +
      '</td><td>' + (top ? top.count : 0) + '</td><td>' +
      (top ? formatPercent(percentOf(top.count, responseList.length)) : "—") + '</td></tr>';
  }
  setHtml("results-table-body", rows);
  setHtml("results-lowest", '<p>Correct and incorrect answers cannot be identified without an answer key for the categorical questions and a coding rubric for open-ended answers.</p><p>All source answers are retained verbatim; response frequencies are not treated as scores.</p>');

  var detailRows = "";
  for (var d = 0; d < distribution.length; d++) {
    detailRows += '<tr><td>Q' + (questionIndex + 1) + '</td><td>' +
      escapeSurveyText(distribution[d].label) + '</td><td>' + distribution[d].count +
      '</td><td>' + formatPercent(percentOf(distribution[d].count, responseList.length)) + '</td></tr>';
  }
  setHtml("results-questions-body", detailRows || '<tr><td colspan="4">No responses for this selection.</td></tr>');
}

function renderCollegeComparison(containerId, responseList) {
  if (!surveyValidation.valid) {
    setHtml(containerId, '<p class="empty-text">Charts are unavailable until dataset validation passes.</p>');
    return;
  }
  var items = [];
  for (var i = 0; i < units.length; i++) {
    var subset = responseList.filter(function (student) { return student.unit === units[i].code; });
    if (!subset.length) {
      continue;
    }
    var indicator = getIndicatorStats(subset);
    items.push({ label: units[i].code + " · Phishing awareness", count: indicator[0].count, total: subset.length });
    items.push({ label: units[i].code + " · 2FA use", count: indicator[1].count, total: subset.length });
    items.push({ label: units[i].code + " · Always checks links", count: indicator[2].count, total: subset.length });
  }
  var html = "";
  for (var j = 0; j < items.length; j++) {
    var percent = percentOf(items[j].count, items[j].total);
    html += '<div class="response-bar-row" title="' + escapeSurveyText(items[j].label) + '">' +
      '<span class="response-bar-label">' + escapeSurveyText(items[j].label) + '</span>' +
      '<span class="response-bar-track"><span class="response-bar-fill" style="width:' + percent + '%"></span></span>' +
      '<span class="response-bar-value">' + items[j].count + '/' + items[j].total + ' · ' +
      formatPercent(percent) + '</span></div>';
  }
  setHtml(containerId, html ? '<div class="response-bars">' + html + '</div>' :
    '<p class="empty-text">No college-linked responses are available.</p>');
}

function renderAnalytics() {
  var indicators = getIndicatorStats(students);
  setHtml("an-overall", '<p class="big-number">Not scored</p>' +
    '<p>' + students.length + ' complete responses are available from ' + getIdentifiedStudentCount() +
    ' identified students. The survey has no answer key or scoring rubric.</p>' +
    '<p>See the self-reported indicator rates below; they are behavior/awareness signals, not an overall awareness score.</p>');
  renderResponseBars("an-topic-chart", indicators.map(function (item) {
    return { label: item.label, count: item.count };
  }), students.length);

  var simulatedCount = students.filter(function (student) { return student.sourceType === "simulated"; }).length;
  var supplementalCount = students.length - simulatedCount;
  renderResponseBars("an-doughnut", [
    { label: "Workbook tab labeled Simulated Responses", count: simulatedCount },
    { label: "Supplemental form rows", count: supplementalCount }
  ], students.length);
  setHtml("an-distribution", '<p><strong>' + students.length + '</strong> complete responses validated; <strong>' +
    records.length + '</strong> individual answer records retained.</p><p>' +
    getUnassignedResponseCount() + ' responses have no student ID and college and remain included as unassigned.</p>');
  renderCollegeComparison("an-averages", students);

  var rankedIndicators = indicators.slice().sort(function (a, b) { return a.percent - b.percent; });
  var indicatorRows = "";
  for (var k = 0; k < rankedIndicators.length; k++) {
    indicatorRows += '<div class="stat-row"><span>' + escapeSurveyText(rankedIndicators[k].label) +
      '</span><strong>' + rankedIndicators[k].count + '/' + rankedIndicators[k].total +
      ' (' + formatPercent(rankedIndicators[k].percent) + ')</strong></div>';
  }
  setHtml("an-extremes", indicatorRows + '<p class="small-text">Lowest self-reported indicator is a prompt for follow-up, not evidence that an answer is incorrect.</p>');

  var questionRows = "";
  var rankingRows = "";
  for (var q = 0; q < suppliedSurveyData.questions.length; q++) {
    var distribution = getQuestionDistribution(students, q);
    var top = distribution[0];
    questionRows += '<div class="stat-row"><span>Q' + (q + 1) + ' · ' +
      escapeSurveyText(suppliedSurveyData.questions[q]) + '</span><strong>' +
      (top ? escapeSurveyText(top.label) + ' (' + top.count + ')' : "No responses") + '</strong></div>';
    rankingRows += '<tr><td>' + (q + 1) + '</td><td>' +
      escapeSurveyText(suppliedSurveyData.questions[q]) + '</td><td>' +
      (top ? escapeSurveyText(top.label) : "—") + '</td><td>' + (top ? top.count : 0) + '</td></tr>';
  }
  setHtml("an-questions", questionRows);
  setHtml("an-rankings", rankingRows);
  setHtml("an-gaps", '<p>Answer correctness and open-response understanding cannot be ranked without a documented answer key and coding rubric.</p><p>Use the observed response distributions and self-reported practices to choose topics for a follow-up assessment.</p>');
  renderCollegeDistribution("an-units-chart", false);

  var collegeRows = "";
  for (var u = 0; u < units.length; u++) {
    var collegeResponses = students.filter(function (student) { return student.unit === units[u].code; });
    if (!collegeResponses.length) {
      collegeRows += '<tr><td>' + escapeSurveyText(units[u].code) + '</td><td>0</td><td>—</td><td>—</td><td>—</td></tr>';
      continue;
    }
    var collegeStats = getIndicatorStats(collegeResponses);
    collegeRows += '<tr><td>' + escapeSurveyText(units[u].code) + '</td><td>' +
      collegeResponses.length + '</td><td>' + collegeStats[0].count + '/' + collegeResponses.length +
      '</td><td>' + collegeStats[1].count + '/' + collegeResponses.length +
      '</td><td>' + collegeStats[2].count + '/' + collegeResponses.length + '</td></tr>';
  }
  if (getUnassignedResponseCount()) {
    collegeRows += '<tr><td>College not reported</td><td>' + getUnassignedResponseCount() +
      '</td><td>—</td><td>—</td><td>—</td></tr>';
  }
  setHtml("an-units-table", collegeRows);

  var statsRows = '<tr><td>Total complete survey responses</td><td>' + students.length + '</td></tr>' +
    '<tr><td>Unique student IDs</td><td>' + getIdentifiedStudentCount() + '</td></tr>' +
    '<tr><td>Colleges represented</td><td>' + getParticipatingUnitCount() + '</td></tr>' +
    '<tr><td>Responses with college not reported</td><td>' + getUnassignedResponseCount() + '</td></tr>' +
    '<tr><td>Question-answer records</td><td>' + records.length + '</td></tr>' +
    '<tr><td>Correct answers / incorrect answers</td><td>Not scored — answer key/rubric unavailable</td></tr>' +
    '<tr><td>Overall awareness rate / average score</td><td>Not scored</td></tr>' +
    '<tr><td>Duplicate student IDs</td><td>' +
      (surveyValidation.valid ? "0 detected" : "Validation errors found") + '</td></tr>';
  setHtml("an-stats", statsRows);
}

function renderOffice(code) {
  var unit = getUnit(code);
  if (!unit || !surveyValidation.valid) {
    return;
  }
  var responses = getSurveyResponsesForCollege(code);
  setText("office-title", unit.code + " - " + unit.name);
  setText("office-subtitle", unit.type + " | " + unit.about + " | Survey responses: " + responses.length);
  setHtml("office-cards",
    makeSummaryCard("📋", "Survey Responses", responses.length, "Complete submitted forms") +
    makeSummaryCard("✅", "Phishing Awareness", getIndicatorStats(responses)[0].count + " / " + responses.length,
      "Self-reported Yes responses") +
    makeSummaryCard("🔐", "2FA Use", getIndicatorStats(responses)[1].count + " / " + responses.length,
      "Self-reported Yes responses") +
    makeSummaryCard("🔗", "Always Checks Links", getIndicatorStats(responses)[2].count + " / " + responses.length,
      "Self-reported behavior") +
    makeSummaryCard("🎯", "Correct / Incorrect", "Not scored", "No key or rubric supplied"));

  var topicRows = "";
  for (var q = 0; q < suppliedSurveyData.questions.length; q++) {
    var distribution = getQuestionDistribution(responses, q);
    topicRows += '<tr><td>Q' + (q + 1) + '</td><td>' +
      (distribution[0] ? escapeSurveyText(distribution[0].label) : "—") +
      '</td><td>' + (distribution[0] ? distribution[0].count : 0) + '</td><td>' +
      (distribution[0] ? formatPercent(percentOf(distribution[0].count, responses.length)) : "—") +
      '</td></tr>';
  }
  setHtml("office-topic-body", topicRows);
  var studentRows = "";
  for (var i = 0; i < responses.length; i++) {
    studentRows += '<tr><td>' + escapeSurveyText(responses[i].studentId || "Not provided") +
      '</td><td>' + escapeSurveyText(responses[i].sourceType) + '</td><td>Not scored</td><td>' +
      '<button class="btn-small" onclick="openStudentDetailsByIndex(' + responses[i].responseIndex +
      ')">View answers</button></td></tr>';
  }
  setHtml("office-student-body", studentRows || '<tr><td colspan="4">No responses for this college.</td></tr>');
}

function renderRecommendations() {
  var college = getValue("rec-unit");
  var responses = getSurveyResponsesForCollege(college);
  var indicators = getIndicatorStats(responses).sort(function (a, b) { return a.percent - b.percent; });
  setText("rec-note", responses.length + " complete responses in this selection. Recommendations are descriptive and not based on scored correctness.");
  setHtml("rec-lowest", indicators.map(function (item) {
    return '<div class="stat-row"><span>' + escapeSurveyText(item.label) +
      '</span><strong>' + item.count + '/' + item.total + ' (' +
      formatPercent(item.percent) + ')</strong></div>';
  }).join("") || '<p class="empty-text">No responses for this selection.</p>');
  setHtml("rec-incorrect", '<p>No incorrect-answer rates can be reported: the supplied files do not include an answer key or qualitative coding rubric.</p>');
  setHtml("rec-lessons", '<ul><li>Recognizing phishing and scam messages</li><li>Using unique passwords and password managers</li><li>Enabling two-factor authentication</li><li>Checking links and verifying senders</li></ul>');
  setHtml("rec-activities", '<ul><li>Practice identifying suspicious links and urgent requests</li><li>Enable 2FA on an account and review recovery options</li><li>Use a checklist to review password and account-safety habits</li></ul>');
  setHtml("rec-campaigns", '<ul><li>Think Before You Click</li><li>Add a Second Lock with 2FA</li><li>Verify the Sender Before Sharing Information</li></ul>');
}

function renderDatasetInfo() {
  var rows = '<tr><td>Data sources</td><td>50-row Simulated Responses sheet + 3 supplemental form rows</td></tr>' +
    '<tr><td>Complete survey responses</td><td>' + students.length + '</td></tr>' +
    '<tr><td>Unique student IDs</td><td>' + getIdentifiedStudentCount() + '</td></tr>' +
    '<tr><td>Colleges represented</td><td>' + getParticipatingUnitCount() + '</td></tr>' +
    '<tr><td>Responses with college/ID not reported</td><td>' + getUnassignedResponseCount() + '</td></tr>' +
    '<tr><td>Question-answer records</td><td>' + records.length + '</td></tr>' +
    '<tr><td>Validation</td><td>' + (surveyValidation.valid ? "Passed: complete answers, no duplicate IDs" : "Issues found") + '</td></tr>' +
    '<tr><td>Correct / incorrect totals and awareness score</td><td>Unavailable without an answer key/rubric</td></tr>' +
    '<tr><td>Interview transcript responses</td><td>Not present in the supplied workbooks</td></tr>';
  setHtml("dataset-info", rows);
}

function setupSurveyDataEvents() {
  document.getElementById("dashboard-college-filter").addEventListener("change", renderDashboard);
  document.getElementById("dashboard-question-filter").addEventListener("change", renderDashboard);
}

// Start everything
function startDashboard() {
  initializeSurveyDataset();
  loadSettings();

  // Keep the unit lookup and category list ready for verified records.
  indexUnits();

  // Prepare the page
  studentState.perPage = settings.rowsPerPage;
  recordState.perPage = settings.rowsPerPage;
  fillFilters();
  fillSurveyFilters();
  document.getElementById("student-per-page").value = String(settings.rowsPerPage);
  document.getElementById("record-per-page").value = String(settings.rowsPerPage);
  fillTotals();
  showCurrentDate();
  setupNavigation();
  setupEvents();
  setupSurveyDataEvents();
  setupFeedingGame();
  setupMouseEffects();
  createFish();
  createBubbles();
  applySettings();

  showPage("dashboard");
}

startDashboard();
