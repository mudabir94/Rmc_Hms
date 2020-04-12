// Functions for populating html to employee page content.
var employee_type_list=[]
var available_tags=[];
var employee_info_dict={};
var emp_datatable;
var emp_id_selected=0;
var employee_dict={};
var all_employee_dict={};
var emp_datatable_list=[];
var allEmployee_list=[];
var employee_id_selected=0;
var allEmp_datatable;
var all_employee_dict={}
var all_employee_info_dict={};


$( document ).ready(function() {
    retrieveEmployeeType();
    $("#dialog-confirm").hide()
    // retrieveEmployeeInfo();

});
function contactNumPatInfoOnInput(ele){
   
    var input = document.getElementById('contact_numb_input');

    input.onkeydown = function() {
        var key = event.keyCode || event.charCode;

        if( key == 8 || key == 46 ){
            
        }
        else{
            value=ele.val();
            if (value.length===4){
                value=value+"-";
                $("#contact_numb_input").val(value);
            } 
        }
            
    };
}
function cnicNumPatInfoOnInput(ele){
   
    var input = document.getElementById('cnic_input');

    input.onkeydown = function() {
        var key = event.keyCode || event.charCode;

        if( key == 8 || key == 46 ){
            
        
        }
        else{
            value=ele.val();
            if (value.length===5){
                value=value+"-";
                $("#cnic_input").val(value);
            } 
            else if (value.length===13){
                value=value+"-";
                $("#cnic_input").val(value);
            } 
        }
            
    };

}
function contactNumPatInfoOnEdit(ele){
    var input = document.getElementById('contact_numb_edit');

    input.onkeydown = function() {
        var key = event.keyCode || event.charCode;

        if( key == 8 || key == 46 ){
            
        
        }
        else{
            value=ele.val();
            if (value.length===4){
                value=value+"-";
                $("#contact_numb_edit").val(value);
            } 
        }
            
};
   
}
function cnicNumPatInfoOnEdit(ele){
    var input = document.getElementById('cnic_edit');

    input.onkeydown = function() {
        var key = event.keyCode || event.charCode;

        if( key == 8 || key == 46 ){
            console.log("Backspace")
        
        }
        else{
            value=ele.val();
            if (value.length===5){
                value=value+"-";
                $("#cnic_edit").val(value);
            } 
            else if (value.length===13){
                value=value+"-";
                $("#cnic_edit").val(value);
            } 
        }
    };
}
function searchContactNumPatInfoOnEdit(ele){
    var input = document.getElementById('search_contact_numb_input');

    input.onkeydown = function() {
        var key = event.keyCode || event.charCode;

        if( key == 8 || key == 46 ){
            
        
        }
        else{
            value=ele.val();
            if (value.length===4){
                value=value+"-";
                $("#search_contact_numb_input").val(value);
            } 
        }
            
};
}
function addEmployee(){
    $('#main_page_content').empty()
    var container_empl_dashboard= $('#main_page_content').append('<div class="container-fluid" id="container-empl-dashboard"></div>');
    $("#container-empl-dashboard").append("<h1 class ='heading-div'> Add Employee Information</h2>");
    // $("#container-empl-dashboard").append("<h5>Please fill in the form below</h5>");
    var main_row_div= $("<div class='row removerowmargins_div '></div>");

    $(container_empl_dashboard).append(main_row_div);
    var main_col_div=$("<div class='col-md-12 genformdiv1' id='main_col_div'></div>");
    //var main_col_div1=$("<div class='col-md-6'></div>");
       
    $(main_row_div).append(main_col_div);
    //$(main_row_div).append(main_col_div1);
    var row_div_one=$("<div class='row' style='padding-top:10px;'></div>");
            // Employee Name
            var col_one__row_div_one=$("<div class='col-md-6'></div>");
                row__col_one__row_div_one=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-4'></div>")
                    colmd2=$("<div class='col-md-6' id='emp_name_input_div'></div>")

                    emp_name_label=$("<label for='emp_name_tag' class='custom_label_css'>Employee Name</label>");
                    colmd1.append(emp_name_label)
                    emp_name_input=$("<input class='form-control-custom' id='emp_name_input' class='custom_input_css'>")
                    colmd2.append(emp_name_input)

                row__col_one__row_div_one.append(colmd1);
                row__col_one__row_div_one.append(colmd2);
            col_one__row_div_one.append(row__col_one__row_div_one);


            // Contact Number

            var col_two__row_div_one=$("<div class='col-md-6'></div>");
                var row__col_two__row_div_one=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-4'></div>")
                    colmd2=$("<div class='col-md-6' id='contact_numb_input_div'></div>")

                    contact_type_label=$("<label class='custom_label_css'>Contact Number</label>");
                    colmd1.append(contact_type_label);
                    contact_type_input=$("<input class='form-control-custom' autocomplete='off' id='contact_numb_input' maxlength='12' oninput='contactNumPatInfoOnInput($(this))' class='custom_input_css' placeholder='xxxx-xxxxxxx'></input>")
                    colmd2.append(contact_type_input);

                row__col_two__row_div_one.append(colmd1)
                row__col_two__row_div_one.append(colmd2)
            col_two__row_div_one.append(row__col_two__row_div_one)


            $(row_div_one).append(col_one__row_div_one);
            $(row_div_one).append(col_two__row_div_one);

        var row_div_two=$("<div class='row' style='padding-top: 15px; padding-bottom: 15px;'></div>");
                // Gender
                    var col_one__row_div_two=$("<div class='col-md-6'></div>");
                        var row__col_one__row_div_two=$("<div class='row'></div>");
                            colmd1=$("<div class='col-md-4'></div>")
                            colmd2=$("<div class='col-md-2' id='gender_input_div'></div>")
                            colmd3=$("<div class='col-md-1'></div>")
                            colmd4=$("<div class='col-md-3' id='dob_input_div'></div>")

                            emp_name_label=$("<label class='custom_label_css'>Gender</label>");
                            colmd1.append(emp_name_label)
                            emp_name_input=$("<input class='form-control-custom' autocomplete='off' id='gender_input'  class='custom_input_css' onfocusout='onfocusOutGenderInput($(this))'>")
                            colmd2.append(emp_name_input)
                // DOB
                            contact_type_label=$("<label class='custom_label_css'>DOB</label>");
                            colmd3.append(contact_type_label);
                            contact_type_input=$("<input class='form-control-custom' autocomplete='off' id='dob_input' class='custom_input_css' ></input>")
                            colmd4.append(contact_type_input);

                        row__col_one__row_div_two.append(colmd1);
                        row__col_one__row_div_two.append(colmd2);
                        row__col_one__row_div_two.append(colmd3);
                        row__col_one__row_div_two.append(colmd4);

                    col_one__row_div_two.append(row__col_one__row_div_two);

                // CNIC
                var col_three__row_div_two=$("<div class='col-md-6'></div>");//
                    var row__col_three__row_div_two=$("<div class='row'></div>");
                        colmd1=$("<div class='col-md-4'></div>")
                        colmd2=$("<div class='col-md-6' id='cnic_input_div'></div>")

                        contact_type_label=$("<label class='custom_label_css'>CNIC</label>");
                        colmd1.append(contact_type_label);
                        contact_type_input=$("<input class='form-control-custom' autocomplete='off' id='cnic_input' oninput='cnicNumPatInfoOnInput($(this))' maxlength='15'  class='custom_input_css' placeholder='xxxxx-xxxxxxx-x' ></input>")
                        colmd2.append(contact_type_input);

                    row__col_three__row_div_two.append(colmd1)
                    row__col_three__row_div_two.append(colmd2)
                col_three__row_div_two.append(row__col_three__row_div_two)

            $(row_div_two).append(col_one__row_div_two);
            //  $(row_div_two).append(col_two__row_div_two);
            $(row_div_two).append(col_three__row_div_two);


        var row_div_three=$("<div class='row' style='padding-bottom: 15px;''></div>");
                // Employee Type
                var col_one__row_div_three=$("<div class='col-md-6'></div>");
                    row__col_one__row_div_three=$("<div class='row'></div>");
                        colmd1=$("<div class='col-md-4'></div>")
                        colmd2=$("<div class='col-md-6'></div>")
    
                        emp_type_label=$("<label for='emp_name_tag' class='custom_label_css'>Employee Type</label>");
                        colmd1.append(emp_type_label)


                            var select=$("<select id='select_emp_type' class='form-control-custom'></select>");
                                var option=$("<option selected='selected' id="+employee_type_list[0]+"-opt value='"+employee_type_list[0]+"'>"+employee_type_list[0]+"</option>");
                            $(select).append(option);
                            for (var i=1;i<=employee_type_list.length;i++){
                                if (employee_type_list[i]!==undefined){
                                    var option=$("<option id="+employee_type_list[i]+"-opt value='"+employee_type_list[i]+"'>"+employee_type_list[i]+"</option>");
                                    $(select).append(option);
                                }
                             } 
                        colmd2.append(select) 
                    row__col_one__row_div_three.append(colmd1);
                    row__col_one__row_div_three.append(colmd2);
                 col_one__row_div_three.append(row__col_one__row_div_three);
            
                // Address
                var col_two__row_div_three=$("<div class='col-md-6'></div>");
                 row__col_two__row_div_three=$("<div class='row'></div>");
                        colmd1=$("<div class='col-md-4'></div>")
                        colmd2=$("<div class='col-md-6' id='emp_address_input_div'></div>")
    
                        address_label=$("<label for='emp_address_tag' class='custom_label_css'>Address</label>");
                        colmd1.append(address_label)
                        emp_address_input=$("<input class='form-control-custom' autocomplete='off' id='emp_address_input' class='custom_input_css'>")
                        colmd2.append(emp_address_input)
    
                        row__col_two__row_div_three.append(colmd1);
                        row__col_two__row_div_three.append(colmd2);
                    col_two__row_div_three.append(row__col_two__row_div_three);
            
            
             $(row_div_three).append(col_one__row_div_three);
             $(row_div_three).append(col_two__row_div_three);

                         
        var row_div_four=$("<div class='row'></div>");
                    // Qualification
                    var col_one__row_div_four=$("<div class='col-md-6'></div>");
                        row__col_one__row_div_four=$("<div class='row'></div>");
                            colmd1=$("<div class='col-md-4'></div>")
                            colmd2=$("<div class='col-md-6' id='emp_qualif_input_div'></div>")
        
                            emp_qualif_label=$("<label for='emp_qualif_tag' class='custom_label_css'>Qualification</label>");
                            colmd1.append(emp_qualif_label)
                            emp_qualif_input=$("<input class='form-control-custom custom_input_css' id='emp_qualif_input' type='text' />")
                            colmd2.append(emp_qualif_input)
        
                        row__col_one__row_div_four.append(colmd1);
                        row__col_one__row_div_four.append(colmd2);
                    col_one__row_div_four.append(row__col_one__row_div_four);
        
        
                    // email ID
        
                    var col_two__row_div_four=$("<div class='col-md-6'></div>");
                        var row__col_two__row_div_four=$("<div class='row'></div>");
                            colmd1=$("<div class='col-md-4'></div>")
                            colmd2=$("<div class='col-md-6' id='email_id_input_div'></div>")
        
                            email_id_label=$("<label class='custom_label_css'>Email Address</label>");
                            colmd1.append(email_id_label);
                            email_id_input=$("<input class='form-control-custom' id='email_id_input' class='custom_input_css'></input>")
                            colmd2.append(email_id_input);
        
                        row__col_two__row_div_four.append(colmd1)
                        row__col_two__row_div_four.append(colmd2)
                    col_two__row_div_four.append(row__col_two__row_div_four)

                $(row_div_four).append(col_one__row_div_four);
                $(row_div_four).append(col_two__row_div_four);
    
        var row_div_five=$("<div class='row' style='padding-top: 15px;'></div>");

                var col_two__row_div_five=$("<div class='col-md-12'></div>");
                            var row__col_two__row_div_five=$("<div class='row'></div>");
                                colmd1=$("<div class='col-md-8 offset-2'></div>")

                                    saveEmployeedataForm_button=$('<button class="save_btn fas fa-save" onclick="saveEmployeeData()">  Save</button>')
                                colmd1.append(saveEmployeedataForm_button)

                            row__col_two__row_div_five.append(colmd1)
                        col_two__row_div_five.append(row__col_two__row_div_five)
                    $(row_div_five).append(col_two__row_div_five);
                
                
$(main_col_div).append(row_div_one);
$(main_col_div).append(row_div_two);
$(main_col_div).append(row_div_three);
$(main_col_div).append(row_div_four);
$(main_col_div).append(row_div_five);



        // $( "#dob_input" ).datepicker({
        //     changeMonth: true,
        //     changeYear: true,
        //     dateFormat: "yy-mm-dd",

        //     });
        $('#dob_input').datepicker({
            uiLibrary: 'bootstrap4',
            // dateFormat: "yy-mm-dd",
            format: 'yyyy-mm-dd',
            modal: true,
            close: function (e) {
                console.log("e",e["target"]['value'])
                value=e["target"]['value']
                console.log("Value")
            }

        });
        
            available_tags = [
                "Male",
                "Female",
                "Other"
              ];
              $( "#gender_input" ).autocomplete({
                source: available_tags
              });

}
function   retrieveEmployeeType(){
    console.log("m",employee_type_list)
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
        },
        url: '/retrieve_employee_type',
        success: function(data){
            console.log(data['employee_type_list'])
           
            employee_type_list=data["employee_type_list"];
            $('.modal-loading').hide();

            console.log("employee_type_list",employee_type_list);
        },
      
    });
   
}
function editEmployee(){
    $('#main_page_content').empty()
    var container_empl_dashboard= $('#main_page_content').append('<div class="container-fluid" id="container-empl-dashboard"></div>');
    $("#container-empl-dashboard").append("<h1 class ='heading-div'>Edit Employee Information</h1>");
    $("#container-empl-dashboard").append("<hr class='custom_hr'>");
    var main_row_div= $("<div class='row is-flex'></div>");

    $(container_empl_dashboard).append(main_row_div);
    var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");

       
        $(main_row_div).append(main_col_div);
            var row_div_one=$("<div class='row' style='padding-bottom:20px'></div>");
                // Patient Name
                var col_one__row_div_one=$("<div class='col-md-4'></div>");
                    row__col_one__row_div_one=$("<div class='row'></div>");
                        colmd1=$("<div class='col-md-4'></div>")
                        colmd2=$("<div class='col-md-6'></div>")
                            pat_name_label=$("<label for='emp_name_tag' class='custom_label_css'>Emplyee Name</label>");
                        colmd1.append(pat_name_label)
                            pat_name_input=$("<input class='form-control-custom' id='search_emp_name_input' class='custom_input_css'>")
                        colmd2.append(pat_name_input)
                    row__col_one__row_div_one.append(colmd1);
                    row__col_one__row_div_one.append(colmd2);
                col_one__row_div_one.append(row__col_one__row_div_one);
                // Contact Number
                var col_two__row_div_one=$("<div class='col-md-4'></div>");
                    var row__col_two__row_div_one=$("<div class='row'></div>");
                        colmd1=$("<div class='col-md-4'></div>")
                        colmd2=$("<div class='col-md-6'></div>")
                            contact_type_label=$("<label class='custom_label_css'>Contact Number</label>");
                        colmd1.append(contact_type_label);
                            contact_type_input=$("<input class='form-control-custom custom_input_css' id='search_contact_numb_input'   maxlength='12'  oninput='searchContactNumPatInfoOnEdit($(this))' placeholder='xxxx-xxxxxxx'></input>")
                        colmd2.append(contact_type_input);
                    row__col_two__row_div_one.append(colmd1)
                    row__col_two__row_div_one.append(colmd2)
                col_two__row_div_one.append(row__col_two__row_div_one)

                var col_three__row_div_one=$("<div class='col-md-4'></div>");
                    var row__col_three__row_div_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-6'></div>")
                            var search_button=$('<button class="search_employee_btn fas fa-search" onclick="searchEmployee()">Search Employee</button>')
                        colmd1.append(search_button)
                    row__col_three__row_div_one.append(colmd1)
                col_three__row_div_one.append(row__col_three__row_div_one)


                $(row_div_one).append(col_one__row_div_one);
                $(row_div_one).append(col_two__row_div_one);
                $(row_div_one).append(col_three__row_div_one);

    
    $(main_col_div).append(row_div_one);
}


function searchEmployee(){

    $("#edit-emplyee-info-form").remove();
    $("#row_div_five").remove();
    employee_dict={}
    emp_datatable_list=[]
   
    editEmployeeRowDivFiveCreation();
    var emp_name=$("#search_emp_name_input").val();
    emp_name=emp_name.toLowerCase();
    console.log("emp_name",emp_name)



    
    var contact_no=$("#search_contact_numb_input").val();
    if (emp_datatable!==undefined){
        emp_datatable.destroy();
    }
    retrieveEmployeeInfo(emp_name,contact_no)
  



}
function editEmployeeRowDivFiveCreation(){
    var main_col_div=$("#main_col_div");
    var row_div_five=$("<div class='row removerowmargins_div' id='row_div_five'></div>");
    // Datatable Name
        var col_one__row_div_five=$("<div class='col-md-12 genformdiv1'></div>");
            var row__col_one__row_div_five=$("<div class='row'></div>");
                var colmd1=$("<div class='col-md-12'></div>")
                    var table=$('<table id="employee_table" class="datatable_staff" width="100%"></table>')
                colmd1.append(table)
            row__col_one__row_div_five.append(colmd1);
        col_one__row_div_five.append(row__col_one__row_div_five);
    $(row_div_five).append(col_one__row_div_five);
    main_col_div.append(row_div_five)
}

function retrieveEmployeeInfo(emp_name,contact_no){
    emp_datatable_list=[];
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
          "emp_name":emp_name,
          "contact_no":contact_no,

        },
        url: '/retrieve_employee_info',
        success: function(data){
            console.log("employee_dict",data["employee_dict"])
            employee_dict={}
            employee_dict=JSON.parse(data["employee_dict"])
            emp_datatable_list=[]
            for (emp in employee_dict){
                templist=[]
                console.log("pat",emp);
                templist.push(emp)
                templist.push(employee_dict[emp]['name'])
                templist.push(employee_dict[emp]['phone'])
                templist.push(employee_dict[emp]['gender'])
                templist.push(employee_dict[emp]['dob'])
                templist.push(employee_dict[emp]['cnic'])
                templist.push(employee_dict[emp]['qualification'])
                templist.push(employee_dict[emp]['address'])
                templist.push(employee_dict[emp]['employee_type'])
                templist.push(employee_dict[emp]['email']);
                emp_datatable_list.push(templist)
            }
            createEmployeetDataTable();
            $('.modal-loading').hide();

            console.log("employee_dict",employee_dict);
            console.log(emp_datatable_list)
        },
    }); 

}
function createEmployeetDataTable(){
    console.log("emp_datatable_list",emp_datatable_list)
    $(function(){
        emp_datatable=$("#employee_table").DataTable({
            data:emp_datatable_list,
            columns: [
                { title: "Id" },
                { title: "Employee Name" },
                { title: "Phone No" },
                { title: 'Gender' },
                { title: "DOB" },
                { title: "CNIC" },
                { title: "Qualification" },
                { title: "Address" },
                { title: "Employee Type" },
                { title: "Email" },

                ],
                paging: true,
                pageLenght:10,
                scrollY: 300,
                scrollX: true,
                ordering: true,
                info:false,
                searching:true,
                dom: 'Bfrtip',
                buttons: [
                    {
                    extend: 'print',
                    text: ' PRINT',
                    title: 'Print Employee Details',
                    className: 'datatable_button printbtn fas fa-print',
                    },
                    {
                        extend: 'excel',
                        text: ' EXCEL',
                        title: 'Print Employee Details',
                        className: 'datatable_button excelbtn fas fa-file-excel',
                    },
                    {
                        extend: 'pdf',
                        text: ' PDF',
                        title: 'Print Employee Details',
                        className: 'datatable_button pdfbtn fas fa-file-pdf',
                    }
                ],
    
            });
            $('#employee_table tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    alert("clicked same entry")
                }
                else{
                    emp_id_selected=$(this).find('td').eq(0).text()
                    $('#edit-emplyee-info-form').remove();
                    emp_datatable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    var form_row=$("<div class='row' id='edit-emplyee-info-form'><h5> Employee Details</h5></div>")
                    var form_col=$("<div class='col-md-12 genformdiv2'></div>");
                    form_row.append(form_col)
                    var row_div_one=$("<div class='row' id='row_div_three_editpat'></div>");
                            // Employee Name
                        var col_one__row_div_one=$("<div class='col-md-6'></div>");
                            row__col_one__row_div_one=$("<div class='row'></div>");
                                colmd1=$("<div class='col-md-4'></div>")
                                colmd2=$("<div class='col-md-6' id='emp_name_input_div'></div>")
            
                                emp_name_label=$("<label for='emp_name_tag' class='custom_label_css'>Employee Name</label>");
                                colmd1.append(emp_name_label)
                                emp_name_input=$("<input class='form-control-custom' id='emp_name_input' class='custom_input_css' value="+employee_dict[emp_id_selected]['name']+" disabled></input>")
                                colmd2.append(emp_name_input)
            
                            row__col_one__row_div_one.append(colmd1);
                            row__col_one__row_div_one.append(colmd2);
                        col_one__row_div_one.append(row__col_one__row_div_one);
                        // Contact Number
                        var col_two__row_div_one=$("<div class='col-md-6'></div>");
                            var row__col_two__row_div_one=$("<div class='row'></div>");
                                colmd1=$("<div class='col-md-4'></div>")
                                colmd2=$("<div class='col-md-6' id='contact_numb_input_div'></div>")
            
                                contact_type_label=$("<label class='custom_label_css'>Contact Number</label>");
                                colmd1.append(contact_type_label);
                                contact_type_input=$("<input class='form-control-custom' id='contact_numb_edit'  maxlength='12'  oninput='contactNumPatInfoOnEdit($(this))' class='custom_input_css' value="+employee_dict[emp_id_selected]['phone']+"></input>")
                                colmd2.append(contact_type_input);
            
                            row__col_two__row_div_one.append(colmd1)
                            row__col_two__row_div_one.append(colmd2)
                        col_two__row_div_one.append(row__col_two__row_div_one)
            
            
                        $(row_div_one).append(col_one__row_div_one);
                        $(row_div_one).append(col_two__row_div_one);
                
                        var row_div_two=$("<div class='row' id='row_div_four_editpat' style='padding-top: 15px; padding-bottom: 15px;'></div>");
                                // Gender
                                var col_one__row_div_two=$("<div class='col-md-6'></div>");
                                    var row__col_one__row_div_two=$("<div class='row'></div>");
                                        colmd1=$("<div class='col-md-2'></div>")
                                        colmd2=$("<div class='col-md-4' id='gender_input_div'></div>")
                                        colmd3=$("<div class='col-md-2'></div>")
                                        colmd4=$("<div class='col-md-4' id='dob_input_div'></div>")
            
                                        emp_name_label=$("<label class='custom_label_css'>Gender</label>");
                                        colmd1.append(emp_name_label)
                                        emp_name_input=$("<input class='form-control-custom' id='gender_input'  class='custom_input_css' value='"+employee_dict[emp_id_selected]['gender']+"'>")
                                        colmd2.append(emp_name_input)
                            // DOB
                                        contact_type_label=$("<label class='custom_label_css'>DOB</label>");
                                        colmd3.append(contact_type_label);
                                        contact_type_input=$("<input class='form-control-custom' id='dob_input' class='custom_input_css' value='"+employee_dict[emp_id_selected]['dob']+"'></input>")
                                        colmd4.append(contact_type_input);
            
                                    row__col_one__row_div_two.append(colmd1);
                                    row__col_one__row_div_two.append(colmd2);
                                    row__col_one__row_div_two.append(colmd3);
                                    row__col_one__row_div_two.append(colmd4);
            
                                col_one__row_div_two.append(row__col_one__row_div_two);
            
                            // CNIC
                            var col_three__row_div_two=$("<div class='col-md-6'></div>");//
                                var row__col_three__row_div_two=$("<div class='row'></div>");
                                    colmd1=$("<div class='col-md-4'></div>")
                                    colmd2=$("<div class='col-md-6' id='cnic_input_div'></div>")
            
                                    contact_type_label=$("<label class='custom_label_css'>CNIC</label>");
                                    colmd1.append(contact_type_label);
                                    contact_type_input=$("<input class='form-control-custom' id='cnic_edit'  oninput='cnicNumPatInfoOnEdit($(this))' maxlength='15' maxlength='15' class='custom_input_css' value='"+employee_dict[emp_id_selected]['cnic']+"' ></input>")
                                    colmd2.append(contact_type_input);
            
                                row__col_three__row_div_two.append(colmd1)
                                row__col_three__row_div_two.append(colmd2)
                            col_three__row_div_two.append(row__col_three__row_div_two)
            
                        $(row_div_two).append(col_one__row_div_two);
                            //  $(row_div_two).append(col_two__row_div_two);
                            $(row_div_two).append(col_three__row_div_two);
                
                
                        var row_div_three=$("<div class='row' id='row_div_five_editpat' style='padding-bottom: 15px;''></div>");
                                // Employee Type
                            var col_one__row_div_three=$("<div class='col-md-6'></div>");
                                row__col_one__row_div_three=$("<div class='row'></div>");
                                    colmd1=$("<div class='col-md-4'></div>")
                                    colmd2=$("<div class='col-md-6'></div>")
                
                                    emp_type_label=$("<label for='emp_name_tag' class='custom_label_css'>Employee Type</label>");
                                    colmd1.append(emp_type_label)
            
            
                                    var select=$("<select id='select_emp_type' class='form-control-custom'></select>");
                                    Employee_type_input=$("<input class='form-control-custom' id='employee_type_input' value='"+employee_dict[emp_id_selected]['employee_type']+"' disabled>")
                                            
                                    colmd2.append(Employee_type_input) 
                                row__col_one__row_div_three.append(colmd1);
                                row__col_one__row_div_three.append(colmd2);
                            col_one__row_div_three.append(row__col_one__row_div_three);
                    
                        // Address
                            var col_two__row_div_three=$("<div class='col-md-6'></div>");
                                row__col_two__row_div_three=$("<div class='row'></div>");
                                    colmd1=$("<div class='col-md-4'></div>")
                                    colmd2=$("<div class='col-md-6' id='emp_address_input_div'></div>")
                                        address_label=$("<label for='emp_address_tag' class='custom_label_css'>Address</label>");
                                    colmd1.append(address_label)
                                        emp_address_input=$("<input class='form-control-custom' id='emp_address_input' value='"+employee_dict[emp_id_selected]['address']+"' class='custom_input_css'>")
                                    colmd2.append(emp_address_input)
                                row__col_two__row_div_three.append(colmd1);
                                row__col_two__row_div_three.append(colmd2);
                            col_two__row_div_three.append(row__col_two__row_div_three);
                        $(row_div_three).append(col_one__row_div_three);
                        $(row_div_three).append(col_two__row_div_three);  

                        var row_div_four=$("<div class='row' id='row_div_six_editpat'></div>");
                             // Qualification
                            var col_one__row_div_four=$("<div class='col-md-6'></div>");
                                row__col_one__row_div_four=$("<div class='row'></div>");
                                    colmd1=$("<div class='col-md-4'></div>")
                                    colmd2=$("<div class='col-md-6' id='emp_qualif_input_div'></div>")
                                        emp_qualif_label=$("<label for='emp_qualif_tag' class='custom_label_css'>Qualification</label>");
                                    colmd1.append(emp_qualif_label)
                                        emp_qualif_input=$("<input class='form-control-custom custom_input_css' id='emp_qualif_input' value='"+employee_dict[emp_id_selected]['qualification']+"' type='text'>")
                                    colmd2.append(emp_qualif_input)
                                row__col_one__row_div_four.append(colmd1);
                                row__col_one__row_div_four.append(colmd2);
                            col_one__row_div_four.append(row__col_one__row_div_four);
                            // email ID
                            var col_two__row_div_four=$("<div class='col-md-6'></div>");
                                var row__col_two__row_div_four=$("<div class='row'></div>");
                                    colmd1=$("<div class='col-md-4'></div>")
                                    colmd2=$("<div class='col-md-6' id='email_id_input_div'></div>")
                                        email_id_label=$("<label class='custom_label_css'>Email Address</label>");
                                    colmd1.append(email_id_label);
                                        email_id_input=$("<input class='form-control-custom' id='email_id_input' class='custom_input_css' value='"+employee_dict[emp_id_selected]['email']+"'></input>")
                                    colmd2.append(email_id_input);
                                row__col_two__row_div_four.append(colmd1)
                                row__col_two__row_div_four.append(colmd2)
                            col_two__row_div_four.append(row__col_two__row_div_four)
        
                        $(row_div_four).append(col_one__row_div_four);
                        $(row_div_four).append(col_two__row_div_four);
                        var row_div_five=$("<div class='row' id='row_div_seven_editpat'style='padding-top: 15px;'></div>");
                            //update button
                            var col_two__row_div_five=$("<div class='col-md-12'></div>");
                                var row__col_two__row_div_five=$("<div class='row'></div>");
                                    colmd1=$("<div class='col-md-8 offset-md-2'></div>")  
                                        saveEmployeedataForm_button=$('<button class="btn save_btn fas fa-save" onclick="updateEmployeeData()">  Update</button>')
                                    colmd1.append(saveEmployeedataForm_button)
                                    row__col_two__row_div_five.append(colmd1)
                            col_two__row_div_five.append(row__col_two__row_div_five)
                        $(row_div_five).append(col_two__row_div_five);
              
                var main_col_div=$("#main_col_div")
                form_col.append(row_div_one);
                form_col.append(row_div_two);
                form_col.append(row_div_three);
                form_col.append(row_div_four);
                form_col.append(row_div_five);
                main_col_div.append(form_row)
                
                
                // $( "#dob_input" ).datepicker({
                //     changeMonth: true,
                //     changeYear: true,
                //     dateFormat: "yy-mm-dd",
                
                //     });
                $('#dob_input').datepicker({
                    uiLibrary: 'bootstrap4',
                    // dateFormat: "yy-mm-dd",
                    format: 'yyyy-mm-dd',
                    modal: true,
                    close: function (e) {
                        console.log("e",e["target"]['value'])
                        value=e["target"]['value']
                        console.log("Value")
                    }
        
                });
                
                    available_tags = [
                        "Male",
                        "Female",
                        "Other"
                      ];
                      $( "#gender_input" ).autocomplete({
                        source: available_tags
                    });
                    // Scroll to bill div
                    $('html,body').animate({
                        scrollTop: $("#row_div_three_editpat").offset().top},
                        'slow');
                     
                }

    
            });
            $('.dataTables_filter  input[type="search"]').
            attr('placeholder','Search employee ....').
            css({'width':'200px','display':'inline-block'});
            $('.dataTables_filter input').addClass('form-control-custom');
        });
}
function saveEmployeeData(){
    var employee_name=$("#emp_name_input").val();
    employee_name=employee_name.toLowerCase();
    var inputs = $("#main_col_div").find($("input") );
    totalinputs=inputs.length;
    console.log(inputs.length);
    var count=0
    isValid=true
    $("#main_col_div input").each(function() {
        var element = $(this);
        if (element.val() == "") {
            addValidation=true
            var parent_id=$(element).parent().attr("id");
            if (parent_id ==="emp_address_input_div" ){
                totalinputs=totalinputs-1
            }
            else if (parent_id ==="email_id_input_div" ){
                totalinputs=totalinputs-1

            }else if (parent_id ==="emp_qualif_input_div" ){
                totalinputs=totalinputs-1

            }
            else{
                if (parent_id!==undefined){
                console.log("parent----",parent_id)
                $("#empty_name_check_div_"+$(this).attr('id')).remove();
                var div=$("<div class='empty_name_check_div' id='empty_name_check_div_"+ $(this).attr('id')+"'><span  class='glyphicon custom_glyphicon' style='color:red;'>&#x2a;Required</span></div>")
                $("#"+parent_id).append(div)
                isValid = false;
                }

            }
            
        }
        else if (element.val() !== "") {
            count=count+1;
            var parent_id=$(element).parent().attr("id");
            if($("#"+parent_id+" .empty_name_check_div").length > 0){
                $(".empty_name_check_div").remove();
            }

        }
       
     });
     if (isValid===false){
         return
     }
     if($("#select_emp_type").val()===""){
         alert("Enter Emp Type")
         return
     }
    //  if (count!=totalinputs){
    //     alert("Please fill the required Fields")
    //     return;

    // }
    // if (employee_name===""){
    //     var div=$("<div id='empty_name_check_div'><span  class='glyphicon' style='color:red'>&#x2a;Required</span></div>")
    //     $("#emp_name_input_div").append(div)
    //     alert("employee name empty")
    //     return;
    // }
        var contact_number=$("#contact_numb_input").val();
        var gender=$("#gender_input").val();
        console.log("gender", gender);
        var dob=$("#dob_input").val();
        var cnic=$("#cnic_input").val();
        var employee_type=$("#select_emp_type").val();
        console.log("employee_type", employee_type)
        var qualification=$("#emp_qualif_input").val();
        var emial_id=$("#email_id_input").val();
        if( !validateEmail(emial_id)) { 
            alert("Invalid Email")
            return;
        }

        var address=$("#emp_address_input").val();
        console.log("emial_id",emial_id);
        $('.modal-loading').show();

        $.ajax({
            type: 'POST',
            dataType: "json",
            'data': {
                "name":JSON.stringify(employee_name),
                "dob":JSON.stringify(dob),
                "gender":JSON.stringify(gender),
                "employee_type":JSON.stringify(employee_type),
                "phone_number":JSON.stringify(contact_number),
                "address":JSON.stringify(address),
                "qualification":JSON.stringify(qualification),

                'email_address':JSON.stringify(emial_id),
                "cnic":JSON.stringify(cnic),
            },
            url: '/save_employee_data',
            success: function(data){
                console.log(data['status_info']);
                status_info=data['status_info'];
                if (status_info=="New Person"){
                    alert("Employee Registered!")
                    $("#emp_name_input").val("")
                    $("#contact_numb_input").val("");
                    $("#gender_input").val("");
                    $("#dob_input").val("");
                    $("#cnic_input").val("");
                    // $("#emp_address_input").val("");
                    $("#select_emp_type").val("");
                    $("#emp_qualif_input").val("");
                    $("#email_id_input").val("");
                    $('.modal-loading').hide();

                }
                else{
                    alert("This Employee already exsists")

                    $('.modal-loading').hide();


                }

                
            },
        
        });

}
function updateEmployeeData(){
    var employee_id=emp_id_selected;
    var emplyee_name=$("#emp_name_input").val();
    var contact_number=$("#contact_numb_edit").val();
    var gender=$("#gender_input").val();
    var dob=$("#dob_input").val();
    var cnic=$("#cnic_edit").val();
    var employee_type=$("#employee_type_input").val();
    var address=$("#emp_address_input").val();
    var qualification=$("#emp_qualif_input").val();
    var emial_id=$("#email_id_input").val();
    $('.modal-loading').show();

    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            "employee_id":JSON.stringify(employee_id),
            "employee_name":JSON.stringify(emplyee_name),
            "dob":JSON.stringify(dob),
            "gender":JSON.stringify(gender),
            "employee_type":JSON.stringify(employee_type),
            "phone_number":JSON.stringify(contact_number),
            "address":JSON.stringify(address),
            "qualification":JSON.stringify(qualification),
            'email_address':JSON.stringify(emial_id),
            "cnic":JSON.stringify(cnic),
        },
        url: '/update_employee_data',
        success: function(data){
            $("#edit-emplyee-info-form").remove();
            $("#row_div_five").remove();
            employee_dict={}
            emp_datatable_list=[]
            alert("Updated")
            $('.modal-loading').hide();

        },
    });


    
}
function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( $email );
  }
function onfocusOutGenderInput(element){
    var gender=$(element).val();
    if (available_tags.includes(gender)){
        console.log("ok no problem")
    }
     else{
        console.log("Please enter a valid Medicine Name")
        $("#gender_input").focus()
    }

}

function viewAllEmployee(){
    $('#main_page_content').empty()
    var container_view_all_employee_dashboard= $('#main_page_content').append('<div class="container-fluid" id="container-view-all-employee-dashboard"></div>');
    $("#container-view-all-employee-dashboard").append("<h2 class ='heading-div'>Employee List</h2>");
    $("#container-view-all-employee-dashboard").append("<hr class='custom_hr'>");
    var main_row_div= $("<div class='row '></div>");

        $(container_view_all_employee_dashboard).append(main_row_div);
        var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");
            var row_div_one=$("<div class='row' id='row_div_one'></div>");
                var col_one__row_div_one=$("<div class='col-md-12'></div>");
                    var row__col_one__row_div_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-12'></div>")
                            var all_employee_table=$('<table id="all_employee_table" class="datatable_staff" width="100%"></table>')
                        colmd1.append(all_employee_table)
                    row__col_one__row_div_one.append(colmd1);
                col_one__row_div_one.append(row__col_one__row_div_one);
            $(row_div_one).append(col_one__row_div_one);
        main_col_div.append(row_div_one)
       
    $(main_row_div).append(main_col_div);
    retrieve_all_employee_info();
}

function retrieve_all_employee_info(){
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
        },
        url: '/retrieve_all_employee_info',
        success: function(data){
            console.log("all_employee_dict",data["all_employee_dict"])
            all_employee_dict={}
            emp_datatable_list=[];

            all_employee_dict=JSON.parse(data["all_employee_dict"])
            for (emp in all_employee_dict){
                templist=[]
                console.log("pat",emp);
                templist.push(emp)
                templist.push(all_employee_dict[emp]['name'])
                templist.push(all_employee_dict[emp]['phone'])
                templist.push(all_employee_dict[emp]['gender'])
                templist.push(all_employee_dict[emp]['dob'])
                templist.push(all_employee_dict[emp]['cnic'])
                templist.push(all_employee_dict[emp]['qualification'])
                templist.push(all_employee_dict[emp]['address'])
                templist.push(all_employee_dict[emp]['employee_type'])
                templist.push(all_employee_dict[emp]['email']);
                emp_datatable_list.push(templist)
            }
            createAllEmployeeDataTable();
            $('.modal-loading').hide();

            console.log("all_employee_dict",all_employee_dict);
            console.log("emp_datatable_list",emp_datatable_list)
        },
    }); 

}

function createAllEmployeeDataTable(){
    
    $(function(){
        allEmp_datatable=$("#all_employee_table").DataTable({
            data:emp_datatable_list,
            columns: [
                { title: "Id" },
                { title: "Employee Name" },
                { title: "Phone No" },
                { title: 'Gender' },
                { title: "DOB" },
                { title: "CNIC" },
                { title: "Qualification" },
                { title: "Address" },
                { title: "Employee Type" },
                { title: "Email" },
                ],

                paging: true,
                scrollY: false,
                scrollX: true,
                ordering: true,
                info:false,
                searching:true,
                dom: 'Bfrtip',
                buttons: [
                    {
                    extend: 'print',
                    text: ' Print',
                    title: 'Print Employee Details',
                    className: 'datatable_button printbtn fas fa-print',
                    },
                    {
                        extend: 'excel',
                        text: ' EXCEL',
                        title: 'Print Employee Details',
                        className: 'datatable_button excelbtn fas fa-file-excel',
                    },
                    {
                        extend: 'pdf',
                        text: ' PDF',
                        title: 'Print Employee Details',
                        className: 'datatable_button pdfbtn fas fa-file-pdf',
                    }
                ],
            });
            $('#all_employee_table tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    alert("clicked same entry")
                }
                else{
                    employee_id_selected=$(this).find('td').eq(0).text()

                    $("#row_div_two").remove();
                  
                    
                    allEmp_datatable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    console.log("Patient dict on click",employee_dict);
                    var row_div_two=$("<div class='row removerowmargins_div' id='row_div_two' style='transform: rotate(270deg) ;transform-origin:50% 100%;transform:scaleX(1);'></div>");
                        var main_subcol=$("<div class='col-md-12 genformdiv2' id='print_employee_info'></div>");

                            var subrow_eight=$("<div class='row' id='rmc_logo_div' style='padding-bottom:10px; padding-top:20px; display:none;'></div>")
                                var col_one__subrow_eight=$("<div class='col-md-12'></div>");
                                    row__col_one__subrow_eight=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-12 text-center'></div>")
                                            var rmc_label=$("<label for='rmc_tag' class='custom_label_css'><h2>Rafiq Medical Center</h2></label>");
                                        colmd1.append(rmc_label)
                                    row__col_one__subrow_eight.append(colmd1);
                                col_one__subrow_eight.append(row__col_one__subrow_eight);  
                            subrow_eight.append(col_one__subrow_eight)

                            var subrow_zero=$("<div class='row' style='padding-bottom:10px'></div>")
                                var col_one__subrow_zero=$("<div class='col-md-5 offset-md-1'></div>");
                                    row__col_one__subrow_zero=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-12'></div>")
                                            var head_label=$("<label for='head_tag' class='custom_label_css'><h4>Employee Details</h4></label>");
                                        colmd1.append(head_label)
                                    row__col_one__subrow_zero.append(colmd1);
                                col_one__subrow_zero.append(row__col_one__subrow_zero);                 
                            subrow_zero.append(col_one__subrow_zero)

                            var subrow_one=$("<div class='row' style='padding-bottom:10px'></div>")

                                var col_one__subrow_one=$("<div class='col-md-6'></div>");
                                    row__col_one__subrow_one=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-4 text-right'></div>")
                                        var colmd2=$("<div class='col-md-4'></div>")
                                            var emp_name_label=$("<label for='emp_name_tag' class='custom_label_css font-weight-bold'>Employee Name</label>");
                                            var emp_name_input=$("<label id='emp_name_input'class='custom_label_css' >"+all_employee_dict[employee_id_selected]['name']+"</label>")
                                        colmd1.append(emp_name_label)
                                        colmd2.append(emp_name_input)
                                    row__col_one__subrow_one.append(colmd1);
                                    row__col_one__subrow_one.append(colmd2);
                                col_one__subrow_one.append(row__col_one__subrow_one);     

                                var col_two__subrow_one=$("<div class='col-md-6'></div>");
                                    var row__col_two__subrow_one=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-4 text-right'></div>")
                                        var colmd2=$("<div class='col-md-4'></div>")
                                            var empID_label=$("<label class='custom_label_css font-weight-bold'>Employee ID</label>");
                                            var empID_input=$("<label class='custom_label_css'>"+employee_id_selected+"</label>")
                                        colmd1.append(empID_label);
                                        colmd2.append(empID_input);
                                    row__col_two__subrow_one.append(colmd1);
                                    row__col_two__subrow_one.append(colmd2);
                                col_two__subrow_one.append(row__col_two__subrow_one);  

                            subrow_one.append(col_one__subrow_one)
                            subrow_one.append(col_two__subrow_one)


                            var subrow_two=$("<div class='row' style='padding-bottom:10px'></div>")

                                var col_one__subrow_two=$("<div class='col-md-6'></div>");
                                    var row__col_one__subrow_two=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-4 text-right'></div>")
                                        var colmd2=$("<div class='col-md-4'></div>")
                                            var emp_gender_label=$("<label class='custom_label_css font-weight-bold'>Gender</label>");
                                        colmd1.append(emp_gender_label)
                                            var emp_gender_input=$("<label class='custom_label_css'>"+all_employee_dict[employee_id_selected]['gender']+"</label>")
                                        colmd2.append(emp_gender_input) 
                                    row__col_one__subrow_two.append(colmd1);
                                    row__col_one__subrow_two.append(colmd2);
                                col_one__subrow_two.append(row__col_one__subrow_two); 
                                
                                var col_two__subrow_two=$("<div class='col-md-6'></div>");
                                    var row__col_two__subrow_two=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-4 text-right'></div>")
                                        var colmd2=$("<div class='col-md-4'></div>")
                                            var dob_label=$("<label class='custom_label_css font-weight-bold'>DOB</label>");
                                        colmd1.append(dob_label);
                                            var dob_input=$("<label class='custom_label_css' id='dob_input'>"+all_employee_dict[employee_id_selected]['dob']+"</label>")
                                        colmd2.append(dob_input);
                                    row__col_two__subrow_two.append(colmd1);
                                    row__col_two__subrow_two.append(colmd2);
                                col_two__subrow_two.append(row__col_two__subrow_two); 

                            subrow_two.append(col_one__subrow_two)
                            subrow_two.append(col_two__subrow_two)


                            var subrow_three=$("<div class='row' style='padding-bottom:10px'></div>")
                                var col_one__subrow_three=$("<div class='col-md-6'></div>");
                                    var row__col_one__subrow_three=$("<div class='row'></div>");
                                        colmd1=$("<div class='col-md-4 text-right'></div>")
                                        colmd2=$("<div class='col-md-4'></div>")
                                            var guardian_label=$("<label  class='custom_label_css font-weight-bold'>CNIC</label>");
                                            var guardian_input=$("<label class='custom_label_css' id='guardian_input'>"+all_employee_dict[employee_id_selected]['cnic']+"</label>")
                                        colmd1.append(guardian_label);
                                        colmd2.append(guardian_input);
                                    row__col_one__subrow_three.append(colmd1);
                                    row__col_one__subrow_three.append(colmd2);
                                col_one__subrow_three.append(row__col_one__subrow_three);

                                var col_two__subrow_three=$("<div class='col-md-6'></div>");
                                    var row__col_two__subrow_three=$("<div class='row'></div>");
                                        colmd1=$("<div class='col-md-4 text-right'></div>")
                                        colmd2=$("<div class='col-md-4'></div>")
                                            var address_label=$("<label for='pat_address_tag' class='custom_label_css font-weight-bold'>Address</label>");
                                            var pat_address_input=$("<label class='custom_label_css'' id='pat_address_input'>"+all_employee_dict[employee_id_selected]['address']+"</label>")
                                        colmd1.append(address_label)
                                        colmd2.append(pat_address_input)
                                    row__col_two__subrow_three.append(colmd1);
                                    row__col_two__subrow_three.append(colmd2);
                                col_two__subrow_three.append(row__col_two__subrow_three);
                            subrow_three.append(col_one__subrow_three)
                            subrow_three.append(col_two__subrow_three)


                            var subrow_four=$("<div class='row' style='padding-bottom:10px'></div>")
                                var col_one__subrow_four=$("<div class='col-md-6'></div>");
                                    var row__col_one__subrow_four=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-4 text-right'></div>")
                                        var colmd2=$("<div class='col-md-4'></div>")
                                            phone_label=$("<label for='phone_label' class='custom_label_css font-weight-bold'>Contact Number</label>");
                                            phone_input=$("<label class='custom_label_css' id='phone_input'>"+all_employee_dict[employee_id_selected]['phone']+"</label>")
                                        colmd1.append(phone_label)
                                        colmd2.append(phone_input) 
                                    row__col_one__subrow_four.append(colmd1)
                                    row__col_one__subrow_four.append(colmd2)
                                col_one__subrow_four.append(row__col_one__subrow_four);

                                var col_two__subrow_four=$("<div class='col-md-6'></div>");
                                    var row__col_two__subrow_four=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-4 text-right'></div>")
                                        var colmd2=$("<div class='col-md-4'></div>")
                                            var email_id_label=$("<label class='custom_label_css font-weight-bold'>Email Address</label>");
                                            var email_id_input=$("<label class='custom_label_css' id='email_id_input'>"+all_employee_dict[employee_id_selected]['email']+"</label>")
                                        colmd1.append(email_id_label);
                                        colmd2.append(email_id_input);
                                    row__col_two__subrow_four.append(colmd1)
                                    row__col_two__subrow_four.append(colmd2)
                                col_two__subrow_four.append(row__col_two__subrow_four);
                            subrow_four.append(col_one__subrow_four);
                            subrow_four.append(col_two__subrow_four);


                            var subrow_five=$("<div class='row' style='padding-bottom:10px'>")
                                var col_one__subrow_five=$("<div class='col-md-6'></div>");
                                    var row__col_one__subrow_five=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-4 text-right'></div>")
                                        var colmd2=$("<div class='col-md-4'></div>")
                                            var qualification_label=$("<label class='custom_label_css font-weight-bold'>Qualification</label>");
                                            var qualification_input=$("<label class='custom_label_css' id='contact_input'>"+all_employee_dict[employee_id_selected]['qualification']+"</label>")
                                        colmd1.append(qualification_label);
                                        colmd2.append(qualification_input);
                                    row__col_one__subrow_five.append(colmd1)
                                    row__col_one__subrow_five.append(colmd2)
                                col_one__subrow_five.append(row__col_one__subrow_five)

                                var col_two__subrow_five=$("<div class='col-md-6'></div>");
                                    var row__col_two__subrow_five=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-4 text-right'></div>")
                                        var colmd2=$("<div class='col-md-4'></div>")
                                            var empType_label=$("<label class='custom_label_css font-weight-bold'>Employee Type</label>");
                                            var empType_input=$("<label class='custom_label_css' id='empType_input'>"+all_employee_dict[employee_id_selected]['employee_type']+"</label>")
                                        colmd1.append(empType_label);
                                        colmd2.append(empType_input);
                                    row__col_two__subrow_five.append(colmd1)
                                    row__col_two__subrow_five.append(colmd2)
                                col_two__subrow_five.append(row__col_two__subrow_five)
                            subrow_five.append(col_one__subrow_five);
                            subrow_five.append(col_two__subrow_five);

                            var subrow_six=$("<div class='row' id='foot_details' style='padding-bottom:10px; display:none'>")
                                var col_one__subrow_six=$("<div class='col-md-12'></div>");
                                    var row__col_one__subrow_six=$("<div class='row' ></div>");
                                        var colmd1=$("<div class='col-md-4 text-center'></div>")
                                        var colmd2=$("<div class='col-md-4 text-center'></div>")
                                        var colmd3=$("<div class='col-md-4 text-center'></div>")

                                            var c1_label=$("<label for='contact1_tag' id='details_foot1' class='custom_label_css'>Contact Details</label>");
                                            var c2_label=$("<label for='contact2_tag' id='details_foot2' class='custom_label_css'>Contact Details</label>");
                                            var c3_label=$("<label for='contact3_tag' id='details_foot3' class='custom_label_css'>Contact Details</label>");
                                        colmd1.append(c1_label)
                                        colmd2.append(c2_label)
                                        colmd3.append(c3_label)
                                    row__col_one__subrow_six.append(colmd1)
                                    row__col_one__subrow_six.append(colmd2)
                                    row__col_one__subrow_six.append(colmd3)

                                col_one__subrow_six.append(row__col_one__subrow_six)
                            subrow_six.append(col_one__subrow_six);

                            var subrow_seven=$("<div class='row' style='padding-bottom:10px'>")
                                var col_one__subrow_seven=$("<div class='col-md-12'></div>");
                                    var row__col_one__subrow_seven=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-6 offset-md-2'></div>")
                                            var print_button=$('<button class="btn btn-success btn-block fa fa-print" id="printEmployee" onclick="printAllEmployeeData()">Print</button>')
                                        colmd1.append(print_button)
                                    row__col_one__subrow_seven.append(colmd1)
                                col_one__subrow_seven.append(row__col_one__subrow_seven)
                            subrow_seven.append(col_one__subrow_seven);

                    main_subcol.append(subrow_eight)
                    main_subcol.append(subrow_zero)
                    var hr= $("<hr class='custom_hr' style='background-color: rgba(0,0,0,.1);'>")
                    $(main_subcol).append(hr);
                    main_subcol.append(subrow_one)
                    main_subcol.append(subrow_two)
                    main_subcol.append(subrow_three)
                    main_subcol.append(subrow_four)
                    main_subcol.append(subrow_five)
                    var hr= $("<hr class='custom_hr' style='background-color: rgba(0,0,0,.1);'>")
                    $(main_subcol).append(hr);
                    main_subcol.append(subrow_six)
                    main_subcol.append(subrow_seven)

                row_div_two.append(main_subcol)
            var main_col_div=$("#main_col_div");
            main_col_div.append(row_div_two)
                  // Scroll to bill div
            $('html,body').animate({
                scrollTop: $("#print_employee_info").offset().top},
                'slow');
            }

        });
        $('.dataTables_filter  input[type="search"]').
        attr('placeholder','Search employee ....').
        css({'width':'200px','display':'inline-block'});
        $('.dataTables_filter input').addClass('form-control-custom');
    });
}

function printAllEmployeeData(){
    // var restorepage = $('body').html();
    // var printcontent = $('#row_div_two').clone();
    // $('body').empty().html(printcontent);
    // window.print();
    // window.close();
    // $('body').html(restorepage);

    var printcontent = $("#main_col_div").clone();
    $('#container-view-all-employee-dashboard').hide();
    $('#printEmployee').hide();
    $('#row_div_one').hide();
    $('#sidebar').hide();
    $('#dialog-confirm').hide();
    $('#rmc_logo_div').show();
    $('#rmc_contact_div').show();
    $('#foot_details').show();

    $('#emp_details_div').empty().html(printcontent);
    
    window.print();
    window.close();

    $('#emp_details_div').empty();
    $('#container-view-all-employee-dashboard').show();
    $('#rmc_logo_div').hide();
    $('#rmc_contact_div').hide()
    $('#row_div_one').show();
    $('#foot_details').hide();
    $('#sidebar').show();
    $('#printEmployee').show();
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
