var view_att_databyday_datatable;
var monthlist=['Jan','Feb','March',"April","May","June","July","August","September","October","November","December"];
$(function(){
    row_view_att_by_month__table_div=$("#row_view_att_by_month__table_div");
        var table=$("<table id='view_att_byday_table'  class='datatable_upload_att_file' width='100%' >")
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

            defaultdate_day=new Date(2019, 1, 0).getDate();
            defaultdate_daylist=Array.from({length: defaultdate_day}, (v, k) => k+1); 


            var select=$("<select id='months-selector'  onchange='monthChanged(this)' class='selector_form'></select>");
            $(select).append(option);
                for (var i=0;i<=monthlist.length;i++){
                    if (monthlist[i]!==undefined){
                        var option=$("<option id='"+monthlist[i]+"-opt' value='"+(i+1)+"'>"+monthlist[i]+"</option>");
                        $(select).append(option);
                    }
                } 
            $("#month-div").append(select)

            var select=$("<select id='year-selector' onchange='yearChanged(this)' class='selector_form'></select>");
            // var option=$("<option selected='selected' id="+monthlist[0]+"-opt value="+monthlist[0]+">"+monthlist[0]+"</option>");
            // $(select).append(option);
                var i=0;
                for(i=2019;i<=2050;i++){
                        var option=$("<option value='"+i+"'>"+i+"</option>");
                        $(select).append(option);
                } 
            $("#year-div").append(select);
            var select=$("<select id='day-selector' class='selector_form'></select>");
            
                for(i=0;i<defaultdate_daylist.length;i++){
                        var option=$("<option  value='"+defaultdate_daylist[i]+"'>"+defaultdate_daylist[i]+"</option>");
                        $(select).append(option);
                } 
            $("#day-selector-div").append(select)

            var select=$("<select id='empname-selector' class='selector_form'></select>");
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
    view_att_databyday_datatable=$("#view_att_byday_table").DataTable({
        data:list,
        columns: [
            { title: "No" },
            { title: "Employee Name" },
            { title: "Date" },
            { title: "Day" },
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
                    text: ' PRINT',
                    title: 'Attendance By Day',
                    className: 'datatable_button printbtn fas fa-print',

                },
                 {
                    extend: 'excel',
                    text: ' EXCEL',
                    title: 'Attendance By Day',
                    className: 'datatable_button excelbtn fas fa-file-excel',

                },
                 {
                    extend: 'csv',
                    text: ' CSV',
                    title: 'Attendance By Day',
                    className: 'datatable_button  csvbtn fas fa-file',

                },
                {
                    extend: 'pdf',
                    text: ' PDF',
                    title: 'Attendance By Day',
                    className: 'datatable_button pdfbtn fas fa-file-pdf',

                },
               
            ],

        });
        $('#view_att_byday_table tbody').on( 'click', 'tr', function () {
            if ( $(this).hasClass('selected') ) {
                view_att_databyday_datatable.$('tr.selected').removeClass('selected')
            }
            else{
                view_att_databyday_datatable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
               
                    
              

            }
        });
}

function SendQuery(){
    month=$("#months-selector").val();
    year=$("#year-selector").val();
    day=$("#day-selector").val();

    emp=$("#empname-selector").val();
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
            "month":month,
            "year":year,
            "day":day,
            "emp":emp,
         },
        url: '/ajax_specific_attendance_byday_data',
        success: function(data){

            attendance_list=data['attendance_list']
            if (attendance_list.length===0){
                alert("No Record Found")
                $('.modal-loading').hide();

                return
            }
            console.log("attendance_list",attendance_list)
            view_att_databyday_datatable.clear();
            for (attlist in attendance_list ){
                view_att_databyday_datatable.row.add( attendance_list[attlist] ).draw();

            }
            $('.modal-loading').hide();

                

            }
        });

}
function monthChanged(obj){
    month=obj.value
    year=$("#year-selector").val();
    console.log("YEAr",year)
    console.log("month",month)

    month=parseInt(month)
    year=parseInt(year)
    lastday=daysInMonth(month,year); // 31
   
    daylist=Array.from({length: lastday}, (v, k) => k+1); 
    console.log("DAY",lastday);
    $("#day-selector-div").empty();
    var select=$("<select id='day-selector' class='form-control-custom'></select>");
            
    for(i=0;i<daylist.length;i++){
            var option=$("<option  value='"+daylist[i]+"'>"+daylist[i]+"</option>");
            $(select).append(option);
    } 
    $("#day-selector-div").append(select)


}
function yearChanged(obj){
    month=$("#months-selector").val();
    year=obj.value;
   

    month=parseInt(month)
    year=parseInt(year)
    lastday=daysInMonth(month,year); // 31
   
    daylist=Array.from({length: lastday}, (v, k) => k+1); 
   
    $("#day-selector-div").empty();
    var select=$("<select id='day-selector' class='form-control-custom'></select>");
            
    for(i=0;i<daylist.length;i++){
            var option=$("<option  value='"+daylist[i]+"'>"+daylist[i]+"</option>");
            $(select).append(option);
    } 
    $("#day-selector-div").append(select)



}
function daysInMonth (month, year) {
    console.log(new Date(year, month, 0))
    return new Date(year, month, 0).getDate();
}