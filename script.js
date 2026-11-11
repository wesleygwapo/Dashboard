/* =========================================================
   CyberSafe U - script.js
   All data in this file is SIMULATED (made up by the program).

   Parts of this file:
    1. Basic information (units, tests, questions)
    2. Making the simulated dataset
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

var PARTICIPANTS_PER_UNIT = 30;   // participants in every unit
var QUESTIONS_PER_TEST = 10;      // questions in every test
var TARGET_PERCENT = 70;          // goal score used for "knowledge gaps"

// The 8 offices and colleges
var units = [
  { code: "CIC", name: "College of Information and Computing", type: "College",
    about: "Academic college of USeP Obrero Campus." },
  { code: "COE", name: "College of Engineering", type: "College",
    about: "Academic college of USeP Obrero Campus." },
  { code: "CED", name: "College of Education", type: "College",
    about: "Academic college of USeP Obrero Campus." },
  { code: "CAS", name: "College of Arts and Sciences", type: "College",
    about: "Academic college of USeP Obrero Campus." },
  { code: "CBA", name: "College of Business Administration", type: "College",
    about: "Academic college of USeP Obrero Campus." },
  { code: "REG", name: "Registrar", type: "Office",
    about: "University office that keeps student academic records." },
  { code: "FIN", name: "Finance and Accounting", type: "Office",
    about: "University office for finance and accounting services." },
  { code: "HRM", name: "Human Resource Management", type: "Office",
    about: "University office for personnel and human resource services." }
];

// The 10 survey tests.
// "chance" is the simulated chance (0 to 1) that a participant answers correctly.
// "proposal: true" means it is one of the four original proposal topics.
var tests = [
  { id: 1, name: "Cybersecurity Awareness", title: "Cybersecurity Awareness Test",
    proposal: false, chance: 0.72,
    description: "Checks the basic ideas of staying safe online." },
  { id: 2, name: "Phishing Detection", title: "Phishing Detection Test",
    proposal: true, chance: 0.61,
    description: "Checks if students can spot fake emails, messages and links." },
  { id: 3, name: "Password Security", title: "Password Security Test",
    proposal: true, chance: 0.68,
    description: "Checks knowledge about strong and unique passwords." },
  { id: 4, name: "Social Engineering Awareness", title: "Social Engineering Awareness Test",
    proposal: true, chance: 0.52,
    description: "Covers online scams and tricks that fool people into giving information." },
  { id: 5, name: "Online Privacy", title: "Online Privacy Test",
    proposal: false, chance: 0.70,
    description: "Checks how well students protect their personal information." },
  { id: 6, name: "Malware Awareness", title: "Malware Awareness Test",
    proposal: false, chance: 0.66,
    description: "Checks knowledge about viruses, ransomware and spyware." },
  { id: 7, name: "Two-Factor Authentication", title: "Two-Factor Authentication Test",
    proposal: true, chance: 0.64,
    description: "Checks if students understand the extra layer of account protection." },
  { id: 8, name: "Social Media Security", title: "Social Media Security Test",
    proposal: false, chance: 0.71,
    description: "Checks safe habits on social media accounts." },
  { id: 9, name: "Cybersecurity Behavior", title: "Cybersecurity Behavior Test",
    proposal: false, chance: 0.75,
    description: "Checks everyday online habits and responsibility." },
  { id: 10, name: "Cybersecurity Knowledge", title: "Cybersecurity Knowledge Test",
    proposal: false, chance: 0.69,
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

// Small change in the chance for each question number (some questions are harder)
var questionShift = [0.08, -0.06, 0.04, -0.12, 0.10, -0.03, 0.12, -0.09, 0.0, 0.05];

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
   2. MAKING THE SIMULATED DATASET
   ========================================================= */

var students = [];       // 240 participants
var allQuestions = [];   // 100 questions (10 tests x 10 questions)
var records = [];        // up to 24,000 answer records
var logs = [];           // simulated activity logs
var unitIndex = {};      // example: unitIndex["CIC"] = 0

// A fixed starting number (seed) so the random numbers are the same every time.
// This keeps all pages consistent after every refresh.
var seed = 2026;

function getRandomNumber() {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;   // a number from 0 up to (but not including) 1
}

// Add zeros in front of a number. Example: padNumber(7, 5) gives "00007"
function padNumber(number, size) {
  var text = String(number);
  while (text.length < size) {
    text = "0" + text;
  }
  return text;
}

// Make 240 participants: 30 for each unit, each with a unique ID like 2026-01245
function createStudents() {
  var usedIds = {};

  for (var u = 0; u < units.length; u++) {
    unitIndex[units[u].code] = u;

    for (var i = 0; i < PARTICIPANTS_PER_UNIT; i++) {
      // Keep making a new number until we find one that was not used yet
      var newId = "";
      while (newId === "" || usedIds[newId]) {
        var number = 1 + Math.floor(getRandomNumber() * 4999);
        newId = "2026-" + padNumber(number, 5);
      }
      usedIds[newId] = true;

      var student = {
        studentId: newId,
        unit: units[u].code,
        ability: (getRandomNumber() - 0.5) * 0.3,  // some students know more than others
        totalTests: tests.length,
        correct: 0,
        incorrect: 0,
        percent: 0,
        status: "",
        testCorrect: []   // number of correct answers in each test
      };
      for (var t = 0; t < tests.length; t++) {
        student.testCorrect.push(0);
      }
      students.push(student);
    }
  }
}

// Put all 100 questions in one list
function createQuestions() {
  for (var t = 0; t < tests.length; t++) {
    for (var q = 0; q < QUESTIONS_PER_TEST; q++) {
      allQuestions.push({
        questionId: "T" + padNumber(t + 1, 2) + "-Q" + padNumber(q + 1, 2),
        testId: t + 1,
        text: questionBank[t][q]
      });
    }
  }
}

// Give a label to a score
function getStatus(percent) {
  if (percent >= 80) {
    return "Excellent";
  }
  if (percent >= 65) {
    return "Good";
  }
  if (percent >= 50) {
    return "Needs Improvement";
  }
  return "At Risk";
}

// Make one answer record for every student, test and question
function createRecords() {
  var recordNumber = 0;

  for (var s = 0; s < students.length; s++) {
    var student = students[s];

    for (var t = 0; t < tests.length; t++) {
      for (var q = 0; q < QUESTIONS_PER_TEST; q++) {
        recordNumber++;

        // Chance of a correct answer: test chance + question shift + student ability
        var chance = tests[t].chance + questionShift[q] + student.ability;
        if (chance > 0.97) {
          chance = 0.97;
        }
        if (chance < 0.05) {
          chance = 0.05;
        }

        var isCorrect = getRandomNumber() < chance;
        var question = allQuestions[t * QUESTIONS_PER_TEST + q];

        records.push({
          recordId: "REC-" + padNumber(recordNumber, 5),
          studentId: student.studentId,
          unit: student.unit,
          testId: t + 1,
          questionIndex: t * QUESTIONS_PER_TEST + q,
          questionId: question.questionId,
          question: question.text,
          result: isCorrect ? "Correct" : "Incorrect",
          score: isCorrect ? 1 : 0
        });

        if (isCorrect) {
          student.correct++;
          student.testCorrect[t]++;
        } else {
          student.incorrect++;
        }
      }
    }
  }

  // Now calculate each student's percentage and status
  for (var i = 0; i < students.length; i++) {
    var total = students[i].correct + students[i].incorrect;
    students[i].percent = percentOf(students[i].correct, total);
    students[i].status = getStatus(students[i].percent);
  }
}

// Make simulated activity logs (newest first)
function createLogs() {
  var templates = [
    { text: "Survey results viewed", type: "Survey" },
    { text: "Student records accessed", type: "Records" },
    { text: "Analytics report generated", type: "Report" },
    { text: "Dataset records updated", type: "Dataset" },
    { text: "Survey test results reviewed", type: "Survey" },
    { text: "Recommendations reviewed", type: "Recommendation" },
    { text: "Campus map opened", type: "Map" },
    { text: "Settings updated", type: "Settings" }
  ];

  for (var i = 0; i < 40; i++) {
    var template = templates[i % templates.length];

    // Add a test name or unit code to the description
    var extra = "";
    if (i % 2 === 0) {
      extra = tests[i % tests.length].name;
    } else {
      extra = units[i % units.length].code;
    }

    var date = new Date();
    date.setDate(date.getDate() - Math.floor(i / 4));

    var status = "Completed";
    if (i % 5 === 3) {
      status = "In Review";
    }

    logs.push({
      activityId: "ACT-" + padNumber(i + 1, 3),
      description: template.text + " (" + extra + ")",
      type: template.type,
      date: formatDate(date),
      time: padNumber(8 + ((i * 3) % 10), 2) + ":" + padNumber((i * 17) % 60, 2),
      status: status
    });
  }
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
  if (test.proposal) {
    return '<span class="badge badge-proposal">Proposal Topic</span>';
  }
  return '<span class="badge badge-supplementary">Supplementary</span>';
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
// If onlyProposal is true, only the four proposal topics are checked.
function findLowest(stats, onlyProposal) {
  var lowest = null;
  for (var i = 0; i < stats.length; i++) {
    if (stats[i].total === 0) {
      continue;
    }
    if (onlyProposal && !stats[i].test.proposal) {
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
  var list = [];
  for (var q = 0; q < allQuestions.length; q++) {
    list.push({
      question: allQuestions[q],
      correct: 0,
      incorrect: 0,
      total: 0,
      incorrectPercent: 0
    });
  }

  for (var i = 0; i < recordList.length; i++) {
    var stat = list[recordList[i].questionIndex];
    if (recordList[i].result === "Correct") {
      stat.correct++;
    } else if (recordList[i].result === "Incorrect") {
      stat.incorrect++;
    }
  }

  var result = [];
  for (var j = 0; j < list.length; j++) {
    list[j].total = list[j].correct + list[j].incorrect;
    list[j].incorrectPercent = percentOf(list[j].incorrect, list[j].total);
    if (list[j].total > 0) {
      result.push(list[j]);
    }
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
  var lowest = findLowest(stats, false);
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
  var stats = getTestStats(records);
  var totals = getOverallTotals(stats);
  var lowestProposal = findLowest(stats, true);
  var lowestAll = findLowest(stats, false);
  var highestAll = findHighest(stats);

  // Summary cards
  var cards = "";
  cards += makeSummaryCard("🎓", "Total Students", formatNumber(students.length), "Simulated participants");
  cards += makeSummaryCard("📝", "Total Survey Tests", tests.length, "4 proposal + 6 supplementary");
  cards += makeSummaryCard("✅", "Total Questions Answered", formatNumber(totals.total), "Valid answers only");
  cards += makeSummaryCard("🎯", "Overall Correct Rate", formatPercent(totals.correctPercent), "All 10 tests");
  cards += makeSummaryCard("⚠️", "Lowest Performing Topic", lowestProposal.test.name,
    formatPercent(lowestProposal.correctPercent) + " correct (proposal topics)");
  setHtml("dashboard-cards", cards);

  // Survey tests overview
  var overview = "";
  for (var i = 0; i < stats.length; i++) {
    overview += '<div class="list-row">' +
      '<strong>' + stats[i].test.id + '.</strong>' +
      '<span class="grow">' + stats[i].test.title + '</span>' +
      makeTypeBadge(stats[i].test) +
      '<strong>' + formatPercent(stats[i].correctPercent) + '</strong>' +
      '</div>';
  }
  setHtml("dashboard-tests", overview);

  // Topic comparison (four proposal topics only)
  var topicItems = [];
  for (var j = 0; j < stats.length; j++) {
    if (stats[j].test.proposal) {
      topicItems.push({
        label: stats[j].test.name,
        value: stats[j].correctPercent,
        highlight: stats[j] === lowestProposal
      });
    }
  }
  drawBarChart("dashboard-topic-chart", topicItems);

  // Performance summary
  var needAttention = 0;
  var percents = [];
  for (var k = 0; k < students.length; k++) {
    percents.push(students[k].percent);
    if (students[k].status === "At Risk" || students[k].status === "Needs Improvement") {
      needAttention++;
    }
  }
  var summary = "";
  summary += '<div class="stat-row"><span>Best performing test</span><strong>' +
    highestAll.test.name + ' (' + formatPercent(highestAll.correctPercent) + ')</strong></div>';
  summary += '<div class="stat-row"><span>Lowest test (all 10)</span><strong>' +
    lowestAll.test.name + ' (' + formatPercent(lowestAll.correctPercent) + ')</strong></div>';
  summary += '<div class="stat-row"><span>Average student score</span><strong>' +
    formatPercent(getAverage(percents)) + '</strong></div>';
  summary += '<div class="stat-row"><span>Students who need attention</span><strong>' +
    needAttention + ' of ' + students.length + '</strong></div>';
  summary += '<div class="stat-row"><span>Correct / Incorrect answers</span><strong>' +
    formatNumber(totals.correct) + ' / ' + formatNumber(totals.incorrect) + '</strong></div>';
  setHtml("dashboard-summary", summary);

  // Recent activities (first 5 logs)
  var activities = "";
  for (var a = 0; a < 5; a++) {
    activities += '<li>' + logs[a].description +
      '<small>' + logs[a].date + ' ' + logs[a].time + ' - ' + logs[a].status + '</small></li>';
  }
  setHtml("dashboard-activities", activities);
}


/* =========================================================
   7. SURVEY TESTS PAGE
   ========================================================= */

function renderTests() {
  var stats = getTestStats(records);
  var html = "";

  for (var i = 0; i < tests.length; i++) {
    var test = tests[i];
    var cardClass = test.proposal ? "card test-card is-proposal" : "card test-card";

    html += '<div class="' + cardClass + '">' +
      '<span class="test-number">TEST ' + padNumber(test.id, 2) + '</span>' +
      makeTypeBadge(test) +
      '<h4>' + test.title + '</h4>' +
      '<p>' + test.description + '</p>' +
      '<p class="test-meta">' + QUESTIONS_PER_TEST + ' questions</p>' +
      '<p class="test-meta completion">Completed by ' + students.length + ' of ' + students.length +
      ' students (' + formatPercent(stats[i].correctPercent) + ' correct)</p>' +
      '<button class="btn" onclick="openResultsForTest(' + test.id + ')">View Results</button>' +
      '</div>';
  }
  setHtml("tests-grid", html);
}

// Open the Survey Results page with one test already selected
function openResultsForTest(testId) {
  resetResultFilters();
  document.getElementById("filter-test").value = String(testId);
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
  var isProposal = tests[record.testId - 1].proposal;
  if (statusValue === "proposal" && !isProposal) {
    return false;
  }
  if (statusValue === "supplementary" && isProposal) {
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

  // Get the records that match the filters
  var list = [];
  for (var i = 0; i < records.length; i++) {
    if (recordMatchesResultFilters(records[i], testValue, unitValue, statusValue)) {
      list.push(records[i]);
    }
  }

  var stats = getTestStats(list);
  var totals = getOverallTotals(stats);
  var lowest = findLowest(stats, false);

  // Note about the current selection
  var participantCount = unitValue === "all" ? students.length : PARTICIPANTS_PER_UNIT;
  setText("results-note", "Showing " + formatNumber(totals.total) + " valid answers from " +
    participantCount + " participants. SIMULATED DATA.");

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
    var lowestProposal = findLowest(stats, true);
    var lowestHtml = '<p class="lowest-name">' + lowest.test.title + '</p>' +
      '<div class="stat-row"><span>Correct answers</span><strong>' + formatPercent(lowest.correctPercent) + '</strong></div>' +
      '<div class="stat-row"><span>Incorrect answers</span><strong>' + formatPercent(lowest.incorrectPercent) + '</strong></div>' +
      '<div class="stat-row"><span>Total answers</span><strong>' + formatNumber(lowest.total) + '</strong></div>' +
      '<div class="stat-row"><span>Correct (count)</span><strong>' + formatNumber(lowest.correct) + '</strong></div>' +
      '<div class="stat-row"><span>Incorrect (count)</span><strong>' + formatNumber(lowest.incorrect) + '</strong></div>';
    if (lowestProposal !== null) {
      lowestHtml += '<p class="small-text">Lowest among the 4 proposal topics: ' +
        lowestProposal.test.name + ' (' + formatPercent(lowestProposal.correctPercent) + ')</p>';
    }
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
    rows = '<tr><td colspan="9">No students found.</td></tr>';
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

  setText("record-total", "Total dataset records: " + formatNumber(records.length) +
    " (SIMULATED). Records matching the filters: " + formatNumber(list.length));

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
    rows = '<tr><td colspan="9">No records found.</td></tr>';
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
  var unit = findUnit(student.unit);

  var rows = "";
  var weakestName = "";
  var weakestPercent = 101;

  for (var t = 0; t < tests.length; t++) {
    var correct = student.testCorrect[t];
    var percent = percentOf(correct, QUESTIONS_PER_TEST);
    if (percent < weakestPercent) {
      weakestPercent = percent;
      weakestName = tests[t].name;
    }
    rows += '<tr>' +
      '<td>' + tests[t].name + '</td>' +
      '<td>' + correct + ' / ' + QUESTIONS_PER_TEST + '</td>' +
      '<td>' + formatPercent(percent) + '</td>' +
      '</tr>';
  }

  var html = '<h3>Student ' + student.studentId + '</h3>' +
    '<p class="simulated-note">SIMULATED DATA</p>' +
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
  var counts = { "Excellent": 0, "Good": 0, "Needs Improvement": 0, "At Risk": 0 };
  for (var i = 0; i < students.length; i++) {
    counts[students[i].status]++;
  }

  var html = '<div class="big-number">' + formatPercent(totals.correctPercent) + '</div>' +
    '<p>of all valid answers from ' + students.length + ' simulated participants were correct.</p>' +
    '<div class="meter"><div class="meter-fill" style="width:' + totals.correctPercent + '%"></div></div>' +
    '<p>' +
    makeStatusBadge("Excellent") + ' ' + counts["Excellent"] + ' &nbsp; ' +
    makeStatusBadge("Good") + ' ' + counts["Good"] + ' &nbsp; ' +
    makeStatusBadge("Needs Improvement") + ' ' + counts["Needs Improvement"] + ' &nbsp; ' +
    makeStatusBadge("At Risk") + ' ' + counts["At Risk"] + '</p>';
  setHtml("an-overall", html);
}

// 4. Count students in each score range
function showScoreDistribution() {
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
  var items = [];
  for (var i = 0; i < stats.length; i++) {
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
  var best = sorted[0];
  var worst = sorted[sorted.length - 1];
  var highestTest = findHighest(stats);
  var lowestTest = findLowest(stats, false);

  var html = '<div class="two-columns">' +
    '<div>' +
    '<div class="stat-row"><span>Highest student score</span><strong>' + best.studentId + ' (' + best.unit + ') - ' + formatPercent(best.percent) + '</strong></div>' +
    '<div class="stat-row"><span>Lowest student score</span><strong>' + worst.studentId + ' (' + worst.unit + ') - ' + formatPercent(worst.percent) + '</strong></div>' +
    '</div><div>' +
    '<div class="stat-row"><span>Highest test score</span><strong>' + highestTest.test.name + ' - ' + formatPercent(highestTest.correctPercent) + '</strong></div>' +
    '<div class="stat-row"><span>Lowest test score</span><strong>' + lowestTest.test.name + ' - ' + formatPercent(lowestTest.correctPercent) + '</strong></div>' +
    '</div></div>';
  setHtml("an-extremes", html);
}

// 7. Five hardest and five easiest questions
function showQuestionAnalysis() {
  var list = getQuestionStats(records);
  sortList(list, "incorrectPercent", "desc");

  var hardRows = "";
  var easyRows = "";
  for (var i = 0; i < 5; i++) {
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
  sortList(sorted, "correctPercent", "desc");

  var rows = "";
  for (var i = 0; i < sorted.length; i++) {
    var rowClass = i === sorted.length - 1 ? ' class="lowest-row"' : "";
    rows += '<tr' + rowClass + '><td>' + (i + 1) + '</td><td>' + sorted[i].test.title + '</td><td>' +
      makeTypeBadge(sorted[i].test) + '</td><td>' + formatPercent(sorted[i].correctPercent) + '</td></tr>';
  }
  setHtml("an-rankings", rows);
}

// 9. Tests that are below the target percentage
function showKnowledgeGaps(stats) {
  var gaps = [];
  for (var i = 0; i < stats.length; i++) {
    if (stats[i].correctPercent < TARGET_PERCENT) {
      gaps.push(stats[i]);
    }
  }
  sortList(gaps, "correctPercent", "asc");

  var html = '<p class="small-text">Target score: ' + TARGET_PERCENT + '% correct. Tests below the target:</p>';
  if (gaps.length === 0) {
    html += '<p class="empty-text">No knowledge gaps. All tests reached the target.</p>';
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
    var unitRecords = getRecordsByUnit(units[u].code);
    var totals = getOverallTotals(getTestStats(unitRecords));
    items.push({ label: units[u].code, value: totals.correctPercent });
    rows += '<tr><td>' + units[u].code + '</td><td>' + PARTICIPANTS_PER_UNIT + '</td><td>' +
      formatNumber(totals.correct) + '</td><td>' + formatNumber(totals.incorrect) + '</td><td>' +
      formatPercent(totals.correctPercent) + '</td></tr>';
  }
  drawBarChart("an-units-chart", items);
  setHtml("an-units-table", rows);
}

// 11. Mean, median, standard deviation, minimum and maximum
function showStatisticalSummary(percents) {
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
    rows = '<tr><td colspan="6">No activities found.</td></tr>';
  }
  setHtml("log-table-body", rows);
  setText("log-count", "Showing " + count + " of " + logs.length + " activities (simulated)");
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
    markers += '<button class="marker" id="marker-' + units[i].code + '" onclick="showMapInfo(\'' +
      units[i].code + '\')">' + units[i].code + '</button>';
    directory += '<li onclick="showMapInfo(\'' + units[i].code + '\')"><strong>' + units[i].code +
      '</strong> - ' + units[i].name + '</li>';
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

  var html = '<strong>' + unit.code + ' - ' + unit.name + '</strong><br>' +
    'Type: ' + unit.type + '<br>' + unit.about + '<br>' +
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
  var list = getRecordsByUnit(unitValue);
  var stats = getTestStats(list);

  var unitText = "all 8 units";
  if (unitValue !== "all") {
    unitText = unitValue + " (" + PARTICIPANTS_PER_UNIT + " participants)";
  }
  setText("rec-note", "Based on " + formatNumber(getOverallTotals(stats).total) +
    " simulated answers from " + unitText + ".");

  // The 3 tests with the lowest correct percentage
  var lowestThree = stats.slice();
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

  // Highest incorrect rates: the four proposal topics and the hardest questions
  var incorrectItems = [];
  for (var j = 0; j < stats.length; j++) {
    if (stats[j].test.proposal) {
      incorrectItems.push({ label: stats[j].test.name, value: stats[j].incorrectPercent, highlight: false });
    }
  }
  sortList(incorrectItems, "value", "desc");
  incorrectItems[0].highlight = true;

  var incorrectHtml = '<p class="small-text">Incorrect answers in the 4 proposal topics:</p><div id="rec-incorrect-chart"></div>' +
    '<p class="small-text">Questions answered incorrectly the most:</p>';
  var hardQuestions = getQuestionStats(list);
  sortList(hardQuestions, "incorrectPercent", "desc");
  for (var k = 0; k < 3; k++) {
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
  var unitRecords = getRecordsByUnit(code);
  var stats = getTestStats(unitRecords);
  var totals = getOverallTotals(stats);
  var lowestProposal = findLowest(stats, true);

  setText("office-title", unit.code + " - " + unit.name);
  setText("office-subtitle", unit.type + " | " + unit.about);

  // Cards
  var cards = "";
  cards += makeSummaryCard("🎓", "Participants", PARTICIPANTS_PER_UNIT, "Simulated");
  cards += makeSummaryCard("📝", "Survey Tests", tests.length, "10 questions each");
  cards += makeSummaryCard("✅", "Answers", formatNumber(totals.total), "Valid answers");
  cards += makeSummaryCard("🎯", "Correct Rate", formatPercent(totals.correctPercent), "This unit");
  cards += makeSummaryCard("⚠️", "Lowest Proposal Topic", lowestProposal.test.name,
    formatPercent(lowestProposal.correctPercent) + " correct");
  setHtml("office-cards", cards);

  // Topic table
  var lowest = findLowest(stats, false);
  var topicRows = "";
  for (var i = 0; i < stats.length; i++) {
    var rowClass = stats[i] === lowest ? ' class="lowest-row"' : "";
    topicRows += '<tr' + rowClass + '><td>' + stats[i].test.id + '</td><td>' + stats[i].test.name +
      '</td><td>' + stats[i].correct + '</td><td>' + stats[i].incorrect + '</td><td>' +
      formatPercent(stats[i].correctPercent) + '</td></tr>';
  }
  setHtml("office-topic-body", topicRows);

  // Student table (only the 30 students of this unit)
  var studentRows = "";
  for (var j = 0; j < students.length; j++) {
    var s = students[j];
    if (s.unit !== code) {
      continue;
    }
    studentRows += '<tr><td>' + s.studentId + '</td><td>' + s.correct + ' / ' + (s.correct + s.incorrect) +
      '</td><td>' + formatPercent(s.percent) + '</td><td>' + makeStatusBadge(s.status) + '</td>' +
      '<td><button class="btn-small" onclick="openStudentDetails(\'' + s.studentId + '\')">View</button></td></tr>';
  }
  setHtml("office-student-body", studentRows);
}


/* =========================================================
   16. SETTINGS PAGE
   ========================================================= */

var settings = {
  fish: true,
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
  rows += '<tr><td>Data type</td><td>SIMULATED (not actual student responses)</td></tr>';
  rows += '<tr><td>Participants</td><td>' + students.length + '</td></tr>';
  rows += '<tr><td>Offices / colleges</td><td>' + units.length + ' (' + PARTICIPANTS_PER_UNIT + ' participants each)</td></tr>';
  rows += '<tr><td>Survey tests</td><td>' + tests.length + '</td></tr>';
  rows += '<tr><td>Questions per test</td><td>' + QUESTIONS_PER_TEST + '</td></tr>';
  rows += '<tr><td>Possible answers</td><td>' + formatNumber(students.length * tests.length * QUESTIONS_PER_TEST) + '</td></tr>';
  rows += '<tr><td>Answer records created</td><td>' + formatNumber(records.length) + '</td></tr>';
  rows += '<tr><td>Student ID format</td><td>YYYY-NNNNN (example: ' + students[0].studentId + ')</td></tr>';
  rows += '<tr><td>Unanswered questions</td><td>Not counted as valid answers</td></tr>';
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
   18. NAVIGATION, EVENTS AND START OF THE PROGRAM
   ========================================================= */

// Show one page. For the office page, pass the unit code as the second value.
function showPage(pageName, officeCode) {
  var pages = document.querySelectorAll(".page");
  for (var i = 0; i < pages.length; i++) {
    pages[i].classList.remove("active");
  }
  document.getElementById("page-" + pageName).classList.add("active");

  // Update the highlighted sidebar button
  var links = document.querySelectorAll(".nav-link");
  for (var j = 0; j < links.length; j++) {
    links[j].classList.remove("active");
    var isPageLink = links[j].getAttribute("data-page") === pageName;
    var isOfficeLink = pageName === "office" && links[j].getAttribute("data-office") === officeCode;
    if (isPageLink || isOfficeLink) {
      links[j].classList.add("active");
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
    alert("This is a simulated dashboard. You have been logged out (demo only).");
  });
}

// Fill the drop-down lists
function fillFilters() {
  var unitItems = [];
  for (var u = 0; u < units.length; u++) {
    unitItems.push({ value: units[u].code, text: units[u].code + " - " + units[u].name });
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
    places[i].textContent = students.length;
  }
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
  var recordInputs = ["record-search-id", "record-search-question"];
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

// Start everything
function startDashboard() {
  loadSettings();

  // Make the simulated dataset
  createStudents();
  createQuestions();
  createRecords();
  createLogs();

  // Prepare the page
  studentState.perPage = settings.rowsPerPage;
  recordState.perPage = settings.rowsPerPage;
  fillFilters();
  document.getElementById("student-per-page").value = String(settings.rowsPerPage);
  document.getElementById("record-per-page").value = String(settings.rowsPerPage);
  fillTotals();
  showCurrentDate();
  setupNavigation();
  setupEvents();
  setupMouseEffects();
  createFish();
  createBubbles();
  applySettings();

  showPage("dashboard");
}

startDashboard();
