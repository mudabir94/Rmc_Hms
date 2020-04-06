var view_att_databymonth_datatable;
var monthlist=['Jan','Feb','March',"April","May","June","July"];
$(function(){
    row_view_att_by_month__table_div=$("#row_view_att_by_month__table_div");
        var table=$("<table id='view_att_bymonth_table'  width='100%' >")
    row_view_att_by_month__table_div.append(table)

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': { },
        url: '/ajax_get_all_attendance_data',
        success: function(data){
            employeelist=data['employeelist']
            console.log("employeelist",employeelist)
            $(function(){
                list=[]
                createDataTableViewAttendanceData(list)
            });


            var select=$("<select id='months-selector' class='form-control-custom'></select>");
            var option=$("<option selected='selected' id='"+monthlist[0]+"-opt' value='1'>"+monthlist[0]+"</option>");
            $(select).append(option);
                for (var i=1;i<=monthlist.length;i++){
                    if (monthlist[i]!==undefined){
                        var option=$("<option id='"+monthlist[i]+"-opt' value='"+i+"'>"+monthlist[i]+"</option>");
                        $(select).append(option);
                    }
                } 
            $("#month-div").append(select)

            var select=$("<select id='year-selector' class='form-control-custom'></select>");
            // var option=$("<option selected='selected' id="+monthlist[0]+"-opt value="+monthlist[0]+">"+monthlist[0]+"</option>");
            // $(select).append(option);
                var i=0;
                for(i=2018;i<=2050;i++){
                        var option=$("<option value='"+i+"'>"+i+"</option>");
                        $(select).append(option);
                } 
            $("#year-div").append(select);

            var select=$("<select id='empname-selector' class='form-control-custom'></select>");
            var option=$("<option selected='selected' id='"+employeelist[0]+"-opt' value='"+employeelist[0]+"'>"+employeelist[0]+"</option>");
            $(select).append(option);
                var i=0;
                for(i=1;i<employeelist.length;i++){
                        var option=$("<option id='"+employeelist[i]+"' value='"+employeelist[i]+"'>"+employeelist[i]+"</option>");
                        $(select).append(option);
                } 
            $("#emp-div").append(select)
            }   
    });
    
    


  
    
    
});
function createDataTableViewAttendanceData(list){
    view_att_databymonth_datatable=$("#view_att_bymonth_table").DataTable({
        data:list,
        columns: [
            { title: "Id" },
            { title: "Employee Name" },
            { title: "Date" },
            { title: "CheckIn" },
            { title: "CheckOut" },
            { title: "Hours Worked" },
            { title: "Minutes Worked" },
            { title: "Status" },


            ],
            paging: true,
            pageLength:31,
            scrollY: 500,
            scrollX: true,
            ordering: true,
            info:false,
            searching:false,
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'print',
                    text: 'Print',
                    title: 'Attendance By Month',
                    className: 'datatable_button fa fa-print',

                },
                 {
                    extend: 'excel',
                    text: 'Export Data in Excel',
                    title: 'Attendance By Month',
                    className: 'datatable_button fas fa-file-excel',

                },
                 {
                    extend: 'csv',
                    text: 'Export Data in CSV',
                    title: 'Attendance By Month',
                    className: 'datatable_button fa fa-file',

                },
                {
                    extend: 'pdf',
                    text: 'Export Data in PDF',
                    title: 'Attendance By Month',
                    className: 'datatable_button fas fa-file-pdf',

                },
               
            ],

        });
        $('#view_att_bymonth_table tbody').on( 'click', 'tr', function () {
            if ( $(this).hasClass('selected') ) {
                view_att_databymonth_datatable.$('tr.selected').removeClass('selected')
            }
            else{
                view_att_databymonth_datatable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
               
                    
              

            }
        });
}

function SendQuery(){
    month=$("#months-selector").val();
    year=$("#year-selector").val();
    emp=$("#empname-selector").val();
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
            "month":month,
            "year":year,
            "emp":emp,
         },
        url: '/ajax_specific_attendance_bymonth_data',
        success: function(data){

            attendance_list=data['attendance_list']
            if (attendance_list.length===0){
                alert("No Record Found")
                $('.modal-loading').hide();

                return
            }
            console.log("attendance_list",attendance_list)
            view_att_databymonth_datatable.clear();
            for (attlist in attendance_list ){
                view_att_databymonth_datatable.row.add( attendance_list[attlist] ).draw();

            }
            $('.modal-loading').hide();

                

            }
        });

}