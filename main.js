var currentStudentIndex = 1;
var isSending = false;
var formData = {
  timestamp: "",
  teacher: "",
  _className: "",
  date: "",
  _studentName: "",
  _analysisSkill: "",
  _commandSkill: "",
  _debugSkill: "",
  _personalComment: ""
};

function validateInputs() {
  var dateValue = document.getElementById("date").value;
  var classValue = document.getElementById("_className").value;
  var teacherValue = document.getElementById("teacher").value;
  var studentCount = document.getElementById("studentCount").value;

  if (dateValue && classValue && teacherValue && studentCount) {
    formData.timestamp = new Date();
    formData.teacher = teacherValue;
    formData._className = classValue;
    formData.date = dateValue;

    var surveyForm = document.getElementById("surveyForm");
    surveyForm.classList.add("hidden");

    var surveyContainer = document.getElementById("surveyContainer");
    surveyContainer.classList.remove("hidden");

    showSurvey();
  } else {
    alert("Vui lòng điền đầy đủ thông tin ngày học, lớp học, tên giáo viên và số lượng học sinh.");
  }
}


function showSurvey() {
  var studentCount = parseInt(document.getElementById("studentCount").value);
  var studentSurveyForm = document.getElementById("studentSurveyForm");

  studentSurveyForm.innerHTML = ""; // Xóa nội dung form trước đó

  var studentDiv = document.createElement("div");
  studentDiv.className = "student-div";
  studentDiv.innerHTML = "<h3>Học sinh " + currentStudentIndex + "</h3>";

  var studentNameLabel = document.createElement("label");
  studentNameLabel.textContent = "Tên học sinh:";
  var studentName = document.createElement("input");
  studentName.id = "studentName";
  studentName.type = "text";
  studentName.name = "student-name";
  studentName.placeholder = "Nhập tên học sinh";
  studentName.required = true;
  studentNameLabel.appendChild(studentName);
  studentDiv.appendChild(studentNameLabel);

  var skillsHeader = document.createElement("h4");
  skillsHeader.textContent = "Kĩ năng:";
  studentDiv.appendChild(skillsHeader);

  var skill1Label = document.createElement("label");
  var skill1 = document.createElement("input");
  skill1.id = "analysisSkill";
  skill1.type = "checkbox";
  skill1.name = "student-skill1";
  skill1.value = "Đạt";
  skill1.required = true;
  skill1Label.appendChild(skill1);
  skill1Label.appendChild(document.createTextNode("Kĩ năng phân tích đề"));
  studentDiv.appendChild(skill1Label);

  var skill2Label = document.createElement("label");
  var skill2 = document.createElement("input");
  skill2.id = "commandSkill";
  skill2.type = "checkbox";
  skill2.name = "student-skill2";
  skill2.value = "Đạt";
  skill2.required = true;
  skill2Label.appendChild(skill2);
  skill2Label.appendChild(document.createTextNode("Kĩ năng sử dụng câu lệnh"));
  studentDiv.appendChild(skill2Label);

  var skill3Label = document.createElement("label");
  var skill3 = document.createElement("input");
  skill3.id = "debugSkill";
  skill3.type = "checkbox";
  skill3.name = "student-skill3";
  skill3.value = "Đạt";
  skill3.required = true;
  skill3Label.appendChild(skill3);
  skill3Label.appendChild(document.createTextNode("Kĩ năng debug"));
  studentDiv.appendChild(skill3Label);

  var commentHeader = document.createElement("h4");
  commentHeader.textContent = "Nhận xét cá nhân của giáo viên:";
  studentDiv.appendChild(commentHeader);

  var comment = document.createElement("textarea");
  comment.id = "personalComment";
  comment.name = "student-comment";
  comment.placeholder = "Nhập nhận xét";
  studentDiv.appendChild(document.createElement("br"));
  studentDiv.appendChild(comment);

  studentSurveyForm.appendChild(studentDiv);

  var doneButtonDiv = document.createElement("div");
  doneButtonDiv.className = "done-button";
  var doneButton = document.createElement("button");
  doneButton.textContent = "Done";
  doneButton.type = "submit";
  doneButton.addEventListener("click", submitSurvey);
  doneButtonDiv.appendChild(doneButton);
  studentSurveyForm.appendChild(doneButtonDiv);
}


function submitSurvey() {
  if (isSending) {
    return;
  }
  isSending = true;
  var dateValue = document.getElementById("date").value;
  var classValue = document.getElementById("_className").value;
  var teacherValue = document.getElementById("teacher").value;

  if (currentStudentIndex === 1) {
    formData.timestamp = new Date();
    formData.teacher = teacherValue;
    formData._className = classValue;
    formData.date = dateValue;
  }

  var studentCount = parseInt(document.getElementById("studentCount").value);

  var studentName = document.getElementById("studentName").value;
  var analysisSkill = document.getElementById("analysisSkill").checked;
  var commandSkill = document.getElementById("commandSkill").checked;
  var debugSkill = document.getElementById("debugSkill").checked;
  var personalComment = document.getElementById("personalComment").value;


  formData._studentName = studentName;
  formData._analysisSkill = analysisSkill ? "true" : "false";
  formData._commandSkill = commandSkill ? "true" : "false";
  formData._debugSkill = debugSkill ? "true" : "false";
  formData._personalComment = personalComment;

  console.log(formData);

  const scriptURL = "https://script.google.com/macros/s/AKfycbz1QIS9lXAfreigKLXxVXIpQ_VLzih477pPgdLsnjBoDFcnhRU9q0ZuXWd5YWYWtq02/exec";

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json"
    },
    mode: "no-cors"
  })
    .then(response => {
      console.log("Success!", response);
      currentStudentIndex++;

      if (currentStudentIndex <= studentCount) {
        showSurvey(); // Hiển thị form cho học sinh tiếp theo
      } else {
        var studentSurveyForm = document.getElementById("studentSurveyForm");
        studentSurveyForm.reset();
        currentStudentIndex = 1;
        formData = {
          timestamp: "",
          teacher: "",
          _className: "",
          date: "",
          _studentName: "",
          _analysisSkill: "",
          _commandSkill: "",
          _debugSkill: "",
          _personalComment: ""
        };
        alert("Đã gửi đi tất cả dữ liệu. Vui lòng điền lại thông tin để tiếp tục đánh giá.");
        resetForm();
      }

      isSending = false;
    })
    .catch(error => {
      console.error("Error!", error.message);
      isSending = false;
    });
}

function resetForm() {
  var surveyForm = document.getElementById("surveyForm");
  var surveyContainer = document.getElementById("surveyContainer");

  // Xóa các trường input đã điền
  surveyForm.reset();

  // Ẩn phần khảo sát
  surveyContainer.classList.add("hidden");

  // Hiển thị form nhập thông tin ban đầu
  surveyForm.classList.remove("hidden");
}
