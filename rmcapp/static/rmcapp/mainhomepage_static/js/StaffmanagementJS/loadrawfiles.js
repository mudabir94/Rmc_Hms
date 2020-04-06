var rawAttFileUploadBtn;
$(function () {
    $(".js-upload-photos").click(function () {
        $("#fileupload_rawatt").click();
      });
    $("#fileupload_rawatt").fileupload({
        dataType: 'json',
        autoUpload: false,
        formData:{presid:"presid"},
        url:"/load_attendance_sheet",
        add: function (e, data) {            
        console.log("data",data)
        $("#raw_attfiles_upload_table tbody").prepend(
            "<tr id='row_parent'>\
            <td class='filename_class'><a href='/uploadedfiles/attendancesheets/rawfiles/"+data.files[0]['name']+"' target='_blank'>" + data.files[0]['name'] + "</a></td>\
            <td><p> "+data.files[0]['size']/1000+" KB</p>\
            </td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td><button id='rawatt_upload_btn' class='btn btn-primary'>Upload</button></td>\
            </tr>"
        )
        $("#rawatt_upload_btn").on('click', function () {
            
            // console.log("DATA--",data)
            data.submit();
            // console.log("DATA>>",data)

            rawAttFileUploadBtn=$(this)
            
            });
        },
        // progress:function (e, data) { 
        //     console.log("progress",data)
        //     var progress = parseInt(data.loaded / data.total * 100, 10);
        //     var strProgress = progress + "%";
        //     console.log(data["originalFiles"][0]['name'])
        //     $("#progress-bar:"+data["originalFiles"][0]['name']).css({"width": strProgress});
        //     $("#progress-bar:"+data["originalFiles"][0]['name']).text(strProgress);
        // },

        done: function (e, data) {  /* 3. PROCESS THE RESPONSE FROM THE SERVER */
        console.log("dattaa",data)
        filename=data.result.name
        size=data.originalFiles.size
        parent=$(rawAttFileUploadBtn).parent();
        tr_parent=$(rawAttFileUploadBtn).parent().parent();
        $(parent).append("<button id='"+filename+"' class='btn btn-danger delete'  onclick='deleteRawAttFiles($(this))'>Delete</button>")
        
        $(rawAttFileUploadBtn).remove(); 
        td=$(tr_parent).children('td:first')
        $(td).empty();
        $(td).append("<a href='/uploadedfiles/attendancesheets/rawfiles/"+filename+"' target='_blank'>" + filename+ "</a>")
        },
        
        });
    });


function deleteRawAttFiles(ele){
    name=$(ele).attr('id')
    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            'filename':name,
        },
        url: '/delete_raw_attendance_sheet',
        success: function(data){
            $(ele).parent().parent().remove();

        }
    });
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Check if this cookie string begin with the name we want
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
             }
         }
    }
    return cookieValue;
}
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
        }
    }
});