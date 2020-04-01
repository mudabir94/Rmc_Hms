// var datadict={}
// var uploadBtnPressed;
// $(function () {
//     /* 1. OPEN THE FILE EXPLORER WINDOW */
//     $(".js-upload-photos").click(function () {
//       $("#fileupload").click();
//     });
   
    
   
//     /* 2. INITIALIZE THE FILE UPLOAD COMPONENT */
//     $("#fileupload").fileupload({
//         dataType: 'json',
//         autoUpload: false,
     
//         add: function (e, data) {            
//         console.log("data",data)
//         $("#gallery tbody").prepend(
//             "<tr>\
//             <td><a href='" +data.files[0]['name'] + "'>" + data.files[0]['name'] + "</a></td>\
//             <td><p>Size : "+data.files[0]['size']/1000+" KB</p>\
//             <div class='progress'>\
//                 <div class='progress-bar' role='progressbar' style='width: 0%;'>0%</div>\
//             </div>\
//             </td>\
//             <td><button id='uploadBtn' class='btn btn-primary'>Upload</button></td>\
//             </tr>"
//         )
//         $("#uploadBtn").on('click', function () {
            
//             console.log("DATA--",data)
//             data.submit();
//             console.log("DATA>>",data)
//             datadict=data

//             console.log("datadict",datadict)
//             uploadBtnPressed=$(this)
            
//             });
//         },
//         progress:function (e, data) { 
//             var progress = parseInt(data.loaded / data.total * 100, 10);
//             var strProgress = progress + "%";
//             $(".progress-bar").css({"width": strProgress});
//             $(".progress-bar").text(strProgress);
//          },

//         done: function (e, data) {  /* 3. PROCESS THE RESPONSE FROM THE SERVER */
//         console.log("dattaa",data)
//         filename=data.result.name
//         size=data.originalFiles.size
//         parent=$(uploadBtnPressed).parent();
//         $(parent).append("<button id='"+filename+"' class='btn btn-danger delete'  onclick='deleteUploadFile($(this))'>Delete</button>")
//         $(uploadBtnPressed).remove();     

//         // if (data.result.is_valid) {
//         //     $("#gallery tbody").prepend(
//         //       "<tr><td><a href='" + data.result.url + "'>" + data.result.name + "</a><button >Delete</button> <input type='checkbox'></td></tr>"
//         //     )
//         //   }
//         }
//     });
 
  
//   });
 
  
//   function deleteUploadFile(ele) {
//       name=$(ele).attr('id');
      
//       console.log("DeLeTEING",name)
//     $.ajax({
//         type: 'POST',
//         dataType: "json",
//         'data': {
//             'filename':name,
//         },
//         url: '/delete_file',
//         success: function(data){
//             $(ele).parent().parent().remove();

//         }
//     });
//     }






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