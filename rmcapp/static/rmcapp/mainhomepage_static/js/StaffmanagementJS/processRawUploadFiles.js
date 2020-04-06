var view_raw_att_files_datatable;
var raw_file_dict={}
$(function(){
    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': { },
        url: '/ajax_get_process_attendance_sheet',
        success: function(data){
            raw_list=data['raw_list']
            raw_file_dict=JSON.parse(data['raw_file_dict'])
            console.log("raw_list",raw_list)

            $(function(){
                createDataTableViewRawAttFiles(raw_list)
            });

            }   
        });
    
    
});

function createDataTableViewRawAttFiles(raw_files_list){
    view_raw_att_files_datatable=$("#raw_attfiles_view_table").DataTable({
        data:raw_files_list,
        columns: [
            { title: "No" },
            { title: "File Name" },
            { title: "Size" },

            ],
            paging: true,
            pageLength:10,
            scrollY: 100,
            scrollX: true,
            ordering: true,
            info:false,
            searching:false,
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'print',
                    text: 'Print',
                    title: 'Prescription List',
                    className: 'datatable_button fa fa-print',

                },
                 {
                    extend: 'excel',
                    text: 'Export Data in Excel',
                    title: 'Prescription List',
                    className: 'datatable_button fas fa-file-excel',

                },
                 {
                    extend: 'csv',
                    text: 'Export Data in CSV',
                    title: 'Prescription List',
                    className: 'datatable_button fa fa-file',

                },
                {
                    extend: 'pdf',
                    text: 'Export Data in PDF',
                    title: 'Prescription List',
                    className: 'datatable_button fas fa-file-pdf',

                },
               
            ],

        });
        $('#raw_attfiles_view_table tbody').on( 'click', 'tr', function () {
            if ( $(this).hasClass('selected') ) {
                view_raw_att_files_datatable.$('tr.selected').removeClass('selected')
            }
            else{
                view_raw_att_files_datatable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                id=$(this).find('td').eq(0).text()
                $("#processfile_div").remove();
                var row=$("<div class='row' id='processfile_div'style='padding-top:10px;'>")
                    var col=$("<div class='col-md-12'>");
                        var div=$("<div id='raw_file_process_div'></div>");
                            button=$("<button id='file-"+id+"' onclick='ProcessFile($(this))'> Process File</button>")
                        div.append(button)
                    col.append(div)
                row.append(col)
                $("#raw_file_view_maindiv").append(row);
                    
              

            }
        });
}
function ProcessFile(ele){
    id=$(ele).attr('id');
    arr=id.split("-");
    id=arr[1];
    console.log(raw_file_dict[id]['file_name']);
    file_name=raw_file_dict[id]['file_name']
    file_url=raw_file_dict[id]['file_url']
    $('.modal-loading').show();

    $.ajax({
        async: true,
        type: 'POST',
        dataType: "json",
        'data': { 
          
            "file_url":file_url,
            "file_name":file_name,
        },
        url: '/process_attendance_sheet',
     
        success: function(data){
                alert("Process Complete")
                $('.modal-loading').hide();
            },
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