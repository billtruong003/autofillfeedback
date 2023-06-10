function validateInputs() {
    // Lấy giá trị từ các trường input
    var dateValue = document.getElementById("date").value;
    var classValue = document.getElementById("class").value;
    var teacherValue = document.getElementById("teacher").value;
    var studentCountValue = document.getElementById("studentCount").value;
  
    // Kiểm tra xem tất cả các trường input đã được điền đầy đủ hay chưa
    if (dateValue && classValue && teacherValue && studentCountValue) {
      showSurvey(); // Nếu điền đầy đủ, hiển thị khảo sát
    } else {
      alert("Vui lòng điền đầy đủ thông tin về lớp khi tiếp tục đánh giá!"); // Hiển thị thông báo lỗi
    }
  }  
function showSurvey() {
    var studentCount = document.getElementById("studentCount").value;
    var surveyContainer = document.getElementById("surveyContainer");
    var studentSurveyForm = document.getElementById("studentSurveyForm");
    studentSurveyForm.innerHTML = ""; // Clear previous survey form
  
    for (var i = 1; i <= studentCount; i++) {
      var studentDiv = document.createElement("div");
      studentDiv.className = "student-div";
      studentDiv.innerHTML = "<h3>Học sinh " + i + "</h3>";

      var studentNameLabel = document.createElement("label");
      studentNameLabel.textContent = "Tên học sinh:";
      var studentName = document.createElement("input");
      studentName.id = "studentName";
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
      skill1.id = "analysisSkill";
      skill1.type = "checkbox";
      skill1.name = "student" + i + "-skill1";
      skill1.value = "Đạt";
      skill1.required = true;
      skill1Label.appendChild(skill1);
      skill1Label.appendChild(document.createTextNode("Kĩ năng phân tích đề"));
      studentDiv.appendChild(skill1Label);
  
      var skill2Label = document.createElement("label");
      var skill2 = document.createElement("input");
      skill2.id = "commandSkill";
      skill2.type = "checkbox";
      skill2.name = "student" + i + "-skill2";
      skill2.value = "Đạt";
      skill2.required = true;
      skill2Label.appendChild(skill2);
      skill2Label.appendChild(document.createTextNode("Kĩ năng sử dụng câu lệnh"));
      studentDiv.appendChild(skill2Label);
  
      var skill3Label = document.createElement("label");
      var skill3 = document.createElement("input");
      skill3.id = "debugSkill";
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
      comment.id = "personalComment"
      comment.name = "student" + i + "-comment";
      comment.placeholder = "Nhập nhận xét";
      studentDiv.appendChild(document.createElement("br"));
      studentDiv.appendChild(comment);
  
      studentSurveyForm.appendChild(studentDiv);
    }
  
    // Thêm nút "Done"
    var doneButtonDiv = document.createElement("div");
    doneButtonDiv.className = "done-button";
    var doneButton = document.createElement("button");
    doneButton.textContent = "Done";
    doneButton.type = "submit";
    doneButton.addEventListener("click", submitSurvey); // Thêm sự kiện click cho nút "Done"
    doneButtonDiv.appendChild(doneButton);
    studentSurveyForm.appendChild(doneButtonDiv);
  
    surveyContainer.classList.remove("hidden");
  }
  
  function submitSurvey() {
    const dateValue = document.getElementById("date").value;
    const classValue = document.getElementById("class").value;
    const studentName = document.getElementById("studentName").value;
    const teacherValue = document.getElementById("teacher").value;
    const analysisSkillValue = document.getElementById("analysisSkill").value;
    const commandSkillValue = document.getElementById("commandSkill").value;
    const debugSkillValue = document.getElementById("debugSkill").value;
    const personalCommentValue = document.getElementById("personalComment").value;
    const timestamp = new Date()

    const formData = {
      timestamp: timestamp,
      teacher: teacherValue,
      class: classValue,
      studentName: studentName,
      date: dateValue,
      analysisSkill: analysisSkillValue,
      commandSkill: commandSkillValue,
      debugSkill: debugSkillValue,
      personalComment: personalCommentValue
    };

    const scriptURL = 'https://script.google.com/macros/s/AKfycbzKS4CQ51bmDuDdQ9MiiZ7K8j_auDulEnblf9_0-7l8XjbnjYSIIeleiRhVXBs5a9HA/exec'
    const form = document.forms['surveyForm']

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => console.log('Success!', response))
      .catch(error => console.error('Error!', error.message))
  })
  }
  