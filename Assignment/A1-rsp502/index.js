function fileUpload(){
    var x = document.getElementById("uploadFile");
    var txt = "";
    if ('files' in x) {
        if (x.files.length == 0) {
            txt = "Select one or more files.";
        } else {
            for (var i = 0; i < x.files.length; i++) {
                if (i == 0) {
                    txt += "<strong>" + (i + 1) + ". file</strong><br>";
                    var file = x.files[i];
                    if ('name' in file) {
                        txt += "name: " + file.name + "<br>";
                    }
                    if ('size' in file) {
                        txt += "size: " + file.size + " bytes <br>";
                    }
                }
                else {
                    txt += "<br><strong>" + (i + 1) + ". file</strong><br>";
                    var file = x.files[i];
                    if ('name' in file) {
                        txt += "name: " + file.name + "<br>";
                    }
                    if ('size' in file) {
                        txt += "size: " + file.size + " bytes <br>";
                    }
                }
            }
        }
    } 
    else {
      if (x.value == "") {
        txt += "Select one or more files.";
      } else {
        txt += "The files property is not supported by your browser!";
        txt  += "<br>The path of the selected file: " + x.value;
      }
    }
    document.getElementById("text").innerHTML = txt;
  }

  function submitFiles() {
    document.getElementById("submitFiles").innerHTML = "Your files have been uploaded sucessfully!";
  }