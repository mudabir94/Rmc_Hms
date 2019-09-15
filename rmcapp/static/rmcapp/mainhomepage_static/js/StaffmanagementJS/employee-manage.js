// Functions for populating html to employee page content.
var employee_type_list=[]
var available_tags=[];
var employee_info_dict={};
var emp_datatable;
var emp_id_selected=0;
var employee_dict={};
var datatable_list=[]

$( document ).ready(function() {
    retrieveEmployeeType();
    // retrieveEmployeeInfo();

});


function addEmployee(){
    $('#main_page_content').empty()
    var container_empl_dashboard= $('#main_page_content').append('<div class="container-fluid" id="container-empl-dashboard"></div>');
    $("#container-empl-dashboard").append("<h2 class ='text-center'>Employee Information</h2>");
    $("#container-empl-dashboard").append("<hr class='custom_hr'>");
    $("#container-empl-dashboard").append("<h5>Please fill in the form below</h5>");
    var main_row_div= $("<div class='row is-flex'></div>");

    $(container_empl_dashboard).append(main_row_div);
    var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");
    //var main_col_div1=$("<div class='col-md-6'></div>");
       
    $(main_row_div).append(main_col_div);
    //$(main_row_div).append(main_col_div1);
    var row_div_one=$("<div class='row'></div>");
            // Employee Name
            var col_one__row_div_one=$("<div class='col-md-6'></div>");
                row__col_one__row_div_one=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-4'></div>")
                    colmd2=$("<div class='col-md-6' id='emp_name_input_div'></div>")

                    emp_name_label=$("<label for='emp_name_tag' class='custom_label_css'>Employee Name</label>");
                    colmd1.append(emp_name_label)
                    emp_name_input=$("<input class='form-control' id='emp_name_input' class='custom_input_css'>")
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
                    contact_type_input=$("<input class='form-control' id='contact_numb_input' class='custom_input_css' placeholder='0312-3456789'></input>")
                    colmd2.append(contact_type_input);

                row__col_two__row_div_one.append(colmd1)
                row__col_two__row_div_one.append(colmd2)
            col_two__row_div_one.append(row__col_two__row_div_one)


            $(row_div_one).append(col_one__row_div_one);
            $(row_div_one).append(col_two__row_div_one);

        var row_div_two=$("<div class='row' style='padding-top: 15px; padding-bottom: 15px;'></div>");
                // Gender
                // Gender
                    var col_one__row_div_two=$("<div class='col-md-6'></div>");
                        var row__col_one__row_div_two=$("<div class='row'></div>");
                            colmd1=$("<div class='col-md-2'></div>")
                            colmd2=$("<div class='col-md-3' id='gender_input_div'></div>")
                            colmd3=$("<div class='col-md-2'></div>")
                            colmd4=$("<div class='col-md-3' id='dob_input_div'></div>")

                            emp_name_label=$("<label class='custom_label_css'>Gender</label>");
                            colmd1.append(emp_name_label)
                            emp_name_input=$("<input class='form-control' id='gender_input'  class='custom_input_css' onfocusout='onfocusOutGenderInput($(this))'>")
                            colmd2.append(emp_name_input)
                // DOB
                            contact_type_label=$("<label class='custom_label_css'>DOB</label>");
                            colmd3.append(contact_type_label);
                            contact_type_input=$("<input class='form-control' id='dob_input' class='custom_input_css' ></input>")
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
                        contact_type_input=$("<input class='form-control' id='cnic_input' maxlength='15' class='custom_input_css' placeholder='xxxxx-xxxxxxx-x' ></input>")
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


                            var select=$("<select id='select_emp_type' class='form-control'></select>");
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
                        emp_address_input=$("<input class='form-control' id='emp_address_input' class='custom_input_css'>")
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
                            emp_qualif_input=$("<input class='form-control custom_input_css' id='emp_qualif_input' type='text' />")
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
                            email_id_input=$("<input class='form-control' id='email_id_input' class='custom_input_css'></input>")
                            colmd2.append(email_id_input);
        
                        row__col_two__row_div_four.append(colmd1)
                        row__col_two__row_div_four.append(colmd2)
                    col_two__row_div_four.append(row__col_two__row_div_four)

                $(row_div_four).append(col_one__row_div_four);
                $(row_div_four).append(col_two__row_div_four);
    
        var row_div_five=$("<div class='row' style='padding-top: 15px;'></div>");

                var col_two__row_div_five=$("<div class='col-md-12'></div>");
                            var row__col_two__row_div_five=$("<div class='row'></div>");
                                colmd1=$("<div class='col-md-2'></div>")
                                colmd2=$("<div class='col-md-8'></div>")
                                colmd3=$("<div class='col-md-2'></div>")

                                saveEmployeedataForm_button=$('<button class="btn btn-success btn-sm btn-block" onclick="saveEmployeeData()">Save</button>')
                                colmd2.append(saveEmployeedataForm_button)



                                
                                row__col_two__row_div_five.append(colmd1)
                                row__col_two__row_div_five.append(colmd2)
                                row__col_two__row_div_five.append(colmd3)
                        col_two__row_div_five.append(row__col_two__row_div_five)

                    $(row_div_five).append(col_two__row_div_five);
                
                
$(main_col_div).append(row_div_one);
$(main_col_div).append(row_div_two);
$(main_col_div).append(row_div_three);
$(main_col_div).append(row_div_four);
$(main_col_div).append(row_div_five);



        $( "#dob_input" ).datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "yy-mm-dd",

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
    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
        },
        url: '/retrieve_employee_type',
        success: function(data){
            console.log(data['employee_type_list'])
           
            employee_type_list=data["employee_type_list"];
            console.log("employee_type_list",employee_type_list);
        },
      
    });
   
}
function editEmployee(){
    $('#main_page_content').empty()
    var container_empl_dashboard=$('<div class="container" id="container-empl-dashboard"></div>')
    $('#main_page_content').append(container_empl_dashboard);
    $(container_empl_dashboard).append("<h2 class ='text-center'>Edit Employee Information</h2>");
    $(container_empl_dashboard).append("<hr class='custom_hr'>");
    var main_row_div= $("<div class='row is-flex'></div>");

    $(container_empl_dashboard).append(main_row_div);
    var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");
    //var main_col_div1=$("<div class='col-md-6'></div>");
       
    $(main_row_div).append(main_col_div);
    //$(main_row_div).append(main_col_div1);
    var row_div_one=$("<div class='row'></div>");
            // Patient Name
            var col_one__row_div_one=$("<div class='col-md-4'></div>");
                row__col_one__row_div_one=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-4'></div>")
                    colmd2=$("<div class='col-md-6'></div>")

                    pat_name_label=$("<label for='emp_name_tag' class='custom_label_css'>Emplyee Name</label>");
                    colmd1.append(pat_name_label)

                    pat_name_input=$("<input class='form-control' id='search_emp_name_input' class='custom_input_css'>")

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
                    contact_type_input=$("<input class='form-control custom_input_css' id='search_contact_numb_input'  placeholder='0312-3456789'></input>")
                    colmd2.append(contact_type_input);

                row__col_two__row_div_one.append(colmd1)
                row__col_two__row_div_one.append(colmd2)
            col_two__row_div_one.append(row__col_two__row_div_one)

            var col_three__row_div_one=$("<div class='col-md-4'></div>");
                var row__col_three__row_div_one=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-4'></div>")
                    var colmd2=$("<div class='col-md-6'></div>")
                        var cnic_label=$("<label class='custom_label_css'>CNIC</label>");
                       
                        var cnic_input=$("<input class='form-control custom_input_css' id='search_cnic_numb_input'></input>")
                        colmd1.append(cnic_label);
                        colmd2.append(cnic_input);

                row__col_three__row_div_one.append(colmd1)
                row__col_three__row_div_one.append(colmd2)
            col_three__row_div_one.append(row__col_three__row_div_one)


            $(row_div_one).append(col_one__row_div_one);
            $(row_div_one).append(col_two__row_div_one);
            $(row_div_one).append(col_three__row_div_one);

        var row_div_two=$("<div class='row'></div>");
            var col_one__row_div_two=$("<div class='col-md-4'></div>");
            var col_two__row_div_two=$("<div class='col-md-4'></div>");
            var col_three__row_div_two=$("<div class='col-md-4'></div>");
                var row__col_three__row_div_two=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-12'></div>")
                        var search_button=$('<button onclick="searchEmployee()">Search Emplyee</button>')
                    colmd1.append(search_button)
                row__col_three__row_div_two.append(colmd1);
            col_three__row_div_two.append(row__col_three__row_div_two)

        row_div_two.append(col_one__row_div_two)
        row_div_two.append(col_two__row_div_two)
        row_div_two.append(col_three__row_div_two)

   



    $(main_col_div).append(row_div_one);
    $(main_col_div).append(row_div_two);


  

}


function searchEmployee(){

    $("#form-row").remove();
    $("#row_div_five").remove();
    employee_dict={}
    datatable_list=[]
   
    editEmployeeRowDivFiveCreation();
    var emp_name=$("#search_emp_name_input").val();
    var contact_no=$("#search_contact_numb_input").val();
    var cnic_no=$("#search_cnic_numb_input").val();
    if (emp_datatable!==undefined){
        emp_datatable.destroy();
    }
    retrieveEmployeeInfo(emp_name,contact_no,cnic_no)
  



}
function editEmployeeRowDivFiveCreation(){
    var main_col_div=$("#main_col_div");
    var row_div_five=$("<div class='row' id='row_div_five'></div>");
    // Datatable Name
        var col_one__row_div_five=$("<div class='col-md-12'></div>");
            var row__col_one__row_div_five=$("<div class='row'></div>");
                var colmd1=$("<div class='col-md-12'></div>")
                    var table=$('<table id="employee_table" class="display" width="100%"></table>')
                colmd1.append(table)
            row__col_one__row_div_five.append(colmd1);
        col_one__row_div_five.append(row__col_one__row_div_five);
    $(row_div_five).append(col_one__row_div_five);
    main_col_div.append(row_div_five)
}

function retrieveEmployeeInfo(emp_name,contact_no,cnic_no){
    datatable_lst=[];

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
          "emp_name":emp_name,
        //   "contact_no":contact_no,
        //   "cnic_no":cnic_no,

        },
        url: '/retrieve_employee_info',
        success: function(data){
            console.log("employee_dict",data["employee_dict"])
            employee_dict={}
            employee_dict=JSON.parse(data["employee_dict"])
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
                datatable_list.push(templist)
            }
            createEmployeetDataTable();

            console.log("employee_dict",employee_dict);
            console.log(datatable_list)
        },
    }); 

}
function createEmployeetDataTable(){
    console.log("datatable_list",datatable_list)
    $(function(){
        emp_datatable=$("#employee_table").DataTable({
            data:datatable_list,
            columns: [
                { title: "Id" },
                { title: "Employee_Name" },
                { title: "Phone_no" },
                { title: 'gender' },
                { title: "dob" },
                { title: "cnic" },
                { title: "qualification" },
                { title: "Address" },
                { title: "employee_type" },
                { title: "email" },
               


                ],
                paging: false,
                scrollY: 200,
                scrollX: true,
                ordering: true,
                info:false,
    
            });
            $('#employee_table tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    alert("clicked same entry")
                }
                else{
                    emp_id_selected=$(this).find('td').eq(0).text()
                    $('#form-row').remove();
                    emp_datatable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    var form_row=$("<div class='row' id='form-row'></div>")
                    var form_col=$("<div class='col-md-12'></div>");
                    form_row.append(form_col)
                    var row_div_one=$("<div class='row' id='row_div_three_editpat'></div>");
                            // Employee Name
                            var col_one__row_div_one=$("<div class='col-md-6'></div>");
                                row__col_one__row_div_one=$("<div class='row'></div>");
                                    colmd1=$("<div class='col-md-4'></div>")
                                    colmd2=$("<div class='col-md-6' id='emp_name_input_div'></div>")
                
                                    emp_name_label=$("<label for='emp_name_tag' class='custom_label_css'>Employee Name</label>");
                                    colmd1.append(emp_name_label)
                                    emp_name_input=$("<input class='form-control' id='emp_name_input' class='custom_input_css' value="+employee_dict[emp_id_selected]['name']+" disabled></input>")
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
                                    contact_type_input=$("<input class='form-control' id='contact_numb_input' class='custom_input_css' value="+employee_dict[emp_id_selected]['phone']+"></input>")
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
                                            colmd2=$("<div class='col-md-3' id='gender_input_div'></div>")
                                            colmd3=$("<div class='col-md-2'></div>")
                                            colmd4=$("<div class='col-md-3' id='dob_input_div'></div>")
                
                                            emp_name_label=$("<label class='custom_label_css'>Gender</label>");
                                            colmd1.append(emp_name_label)
                                            emp_name_input=$("<input class='form-control' id='gender_input'  class='custom_input_css' value='"+employee_dict[emp_id_selected]['gender']+"' disabled>")
                                            colmd2.append(emp_name_input)
                                // DOB
                                            contact_type_label=$("<label class='custom_label_css'>DOB</label>");
                                            colmd3.append(contact_type_label);
                                            contact_type_input=$("<input class='form-control' id='dob_input' class='custom_input_css' value='"+employee_dict[emp_id_selected]['dob']+"' disabled></input>")
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
                                        contact_type_input=$("<input class='form-control' id='cnic_input' maxlength='15' class='custom_input_css' value='"+employee_dict[emp_id_selected]['cnic']+"' ></input>")
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
                
                
                                        var select=$("<select id='select_emp_type' class='form-control'></select>");
                                        Employee_type_input=$("<input class='form-control' id='employee_type_input' value='"+employee_dict[emp_id_selected]['employee_type']+"' disabled>")
                                                
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
                                        emp_address_input=$("<input class='form-control' id='emp_address_input' value='"+employee_dict[emp_id_selected]['address']+"' class='custom_input_css'>")
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
                                            emp_qualif_input=$("<input class='form-control custom_input_css' id='emp_qualif_input' value='"+employee_dict[emp_id_selected]['qualification']+"' type='text'>")
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
                                            email_id_input=$("<input class='form-control' id='email_id_input' class='custom_input_css' value='"+employee_dict[emp_id_selected]['email']+"'></input>")
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
                                                colmd1=$("<div class='col-md-2'></div>")
                                                colmd2=$("<div class='col-md-8'></div>")
                                                colmd3=$("<div class='col-md-2'></div>")
                
                                                saveEmployeedataForm_button=$('<button class="btn btn-success btn-sm btn-block" onclick="updateEmployeeData()">Update</button>')
                                                colmd2.append(saveEmployeedataForm_button)
                                                
                                                row__col_two__row_div_five.append(colmd1)
                                                row__col_two__row_div_five.append(colmd2)
                                                row__col_two__row_div_five.append(colmd3)
                                        col_two__row_div_five.append(row__col_two__row_div_five)
                
                        $(row_div_five).append(col_two__row_div_five);
                                    
                
                
                var main_col_div=$("#main_col_div")
                form_col.append(row_div_one);
                form_col.append(row_div_two);
                form_col.append(row_div_three);
                form_col.append(row_div_four);
                form_col.append(row_div_five);
                main_col_div.append(form_row)
                
                
                $( "#dob_input" ).datepicker({
                    changeMonth: true,
                    changeYear: true,
                    dateFormat: "yy-mm-dd",
                
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
    
            });
        });
}
function saveEmployeeData(){
    var employee_name=$("#emp_name_input").val();
    var inputs = $("#main_col_div").find($("input") );
    totalinputs=inputs.length;
    console.log(inputs.length);
    var count=0
    $("#main_col_div input").each(function() {
        var element = $(this);
        if (element.val() == "") {
            var parent_id=$(element).parent().attr("id");
            $("#empty_name_check_div_"+$(this).attr('id')).remove();
            var div=$("<div class='empty_name_check_div' id='empty_name_check_div_"+ $(this).attr('id')+"'><span  class='glyphicon' style='color:red'>&#x2a;Required</span></div>")
            $("#"+parent_id).append(div)

            // alert("element--")
            isValid = false;
        }
        else if (element.val() !== "") {
            count=count+1;
            var parent_id=$(element).parent().attr("id");
            if($("#"+parent_id+" .empty_name_check_div").length > 0){
                $(".empty_name_check_div").remove();
            }

        }
       
     });
     if (count!=totalinputs){
        alert("ppp")
        return;

    }
    // if (employee_name===""){
    //     var div=$("<div id='empty_name_check_div'><span  class='glyphicon' style='color:red'>&#x2a;Required</span></div>")
    //     $("#emp_name_input_div").append(div)
    //     alert("employee name empty")
    //     return;
    // }
    console.log("employee_name", employee_name);

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
            console.log(data['Success']);
            $("#emp_name_input").val("")
            $("#contact_numb_input").val("");
            $("#gender_input").val("");
            $("#dob_input").val("");
            $("#cnic_input").val("");
            $("#emp_address_input").val("");
            $("#select_emp_type").val("");
            $("#emp_qualif_input").val("");
            $("#email_id_input").val("");
        },
    
    });

}
function updateEmployeeData(){
    var employee_id=emp_id_selected;
    var emplyee_name=$("#emp_name_input").val();
    var contact_number=$("#contact_numb_input").val();
    var gender=$("#gender_input").val();
    var dob=$("#dob_input").val();
    var cnic=$("#cnic_input").val();
    var employee_type=$("#employee_type_input").val();
    var address=$("#emp_address_input").val();
    var qualification=$("#emp_qualif_input").val();
    var emial_id=$("#email_id_input").val();
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
            $("#form-row").remove();
            $("#row_div_five").remove();
            employee_dict={}
            datatable_list=[]
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
