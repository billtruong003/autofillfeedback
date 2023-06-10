function validateInputs() {
    var dateValue = document.getElementById("date").value;
    var classValue = document.getElementById("class").value;
    var teacherValue = document.getElementById("teacher").value;
    var studentCountValue = document.getElementById("studentCount").value;
  
    if (dateValue && classValue && teacherValue && studentCountValue) {
      showSurvey();
    } else {
      alert("Vui lòng điền đầy đủ thông tin về lớp khi tiếp tục đánh giá!");
    }
  }
  
  function showSurvey() {
    var studentCount = document.getElementById("studentCount").value;
    var surveyContainer = document.getElementById("surveyContainer");
    var studentSurveyForm = document.getElementById("studentSurveyForm");
    studentSurveyForm.innerHTML = "";
  
    for (var i = 1; i <= studentCount; i++) {
      var studentDiv = document.createElement("div");
      studentDiv.className = "student-div";
      studentDiv.innerHTML = "<h3>Học sinh " + i + "</h3>";
  
      var studentNameLabel = document.createElement("label");
      studentNameLabel.textContent = "Tên học sinh:";
      var studentName = document.createElement("input");
      studentName.id = "studentName" + i;
      studentName.type = "text";
      studentName.name = "student" + i + "-name";
      studentName.placeholder = "Nhập tên học sinh";
      studentName.required = true;
      studentNameLabel.appendChild(studentName);
      studentDiv.appendChild(studentNameLabel);
  
      var skillsHeader = document.createElement("h4");
      skillsHeader.textContent = "Kĩ năng:";
      studentDiv.appendChild(skillsHeader);
  
      var skill1Label = document.createElement("label");
      var skill1 = document.createElement("input");
      skill1.id = "analysisSkill" + i;
      skill1.type = "checkbox";
      skill1.name = "student" + i + "-skill1";
      skill1.value = "Đạt";
      skill1.required = true;
      skill1Label.appendChild(skill1);
      skill1Label.appendChild(document.createTextNode("Kĩ năng phân tích đề"));
      studentDiv.appendChild(skill1Label);
  
      var skill2Label = document.createElement("label");
      var skill2 = document.createElement("input");
      skill2.id = "commandSkill" + i;
      skill2.type = "checkbox";
      skill2.name = "student" + i + "-skill2";
      skill2.value = "Đạt";
      skill2.required = true;
      skill2Label.appendChild(skill2);
      skill2Label.appendChild(document.createTextNode("Kĩ năng sử dụng câu lệnh"));
      studentDiv.appendChild(skill2Label);
  
      var skill3Label = document.createElement("label");
      var skill3 = document.createElement("input");
      skill3.id = "debugSkill" + i;
      skill3.type = "checkbox";
      skill3.name = "student" + i + "-skill3";
      skill3.value = "Đạt";
      skill3.required = true;
      skill3Label.appendChild(skill3);
      skill3Label.appendChild(document.createTextNode("Kĩ năng debug"));
      studentDiv.appendChild(skill3Label);
  
      var commentHeader = document.createElement("h4");
      commentHeader.textContent = "Nhận xét cá nhân của giáo viên:";
      studentDiv.appendChild(commentHeader);
  
      var comment = document.createElement("textarea");
      comment.id = "personalComment" + i;
      comment.name = "student" + i + "-comment";
      comment.placeholder = "Nhập nhận xét";
      studentDiv.appendChild(document.createElement("br"));
      studentDiv.appendChild(comment);
  
      studentSurveyForm.appendChild(studentDiv);
    }
  
    var doneButtonDiv = document.createElement("div");
    doneButtonDiv.className = "done-button";
    var doneButton = document.createElement("button");
    doneButton.textContent = "Done";
    doneButton.type = "submit";
    doneButton.addEventListener("click", submitSurvey);
    doneButtonDiv.appendChild(doneButton);
    studentSurveyForm.appendChild(doneButtonDiv);
  
    surveyContainer.classList.remove("hidden");
  }
  
  function submitSurvey() {
    var dateValue = document.getElementById("date").value;
    var classValue = document.getElementById("class").value;
    var teacherValue = document.getElementById("teacher").value;
  
    var formData = {
      timestamp: new Date(),
      teacher: teacherValue,
      class: classValue,
      students: []
    };
  
    var studentCount = document.getElementById("studentCount").value;
    for (var i = 1; i <= studentCount; i++) {
      var studentName = document.getElementById("studentName" + i).value;
      var analysisSkill = document.getElementById("analysisSkill" + i).checked;
      var commandSkill = document.getElementById("commandSkill" + i).checked;
      var debugSkill = document.getElementById("debugSkill" + i).checked;
      var personalComment = document.getElementById("personalComment" + i).value;
  
      var studentData = {
        name: studentName,
        analysisSkill: analysisSkill,
        commandSkill: commandSkill,
        debugSkill: debugSkill,
        personalComment: personalComment
      };
  
      formData.students.push(studentData);
    }
  
    console.log(formData);
    // Gửi dữ liệu khảo sát đi ở đây...
    const scriptURL = "https://script.google.com/macros/s/AKfycbzRouLk8Krysrez5iWUH-U-5TNpuUvcQf9TShUND2J9-aiqRMKT9-R465_pQ_hh1YdI/exec";
  
    fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      },
      mode: "no-cors" // Thêm chế độ 'no-cors' vào yêu cầu fetch
    })
      .then(response => console.log("Success!", response))
      .catch(error => console.error("Error!", error.message));
  }
  