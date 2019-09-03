var employee_type_list=[]

$( document ).ready(function() {
    retrieveEmployeeType();
});


function addEmployee(){
    $('#main_page_content').empty()
    var container_empl_dashboard= $('#main_page_content').append('<div class="container-fluid" id="container-empl-dashboard"></div>');
    $("#container-empl-dashboard").append("<h2 class ='text-center'>Employee Information</h2>");
    $("#container-empl-dashboard").append("<hr class='custom_hr'>");
    $("#container-empl-dashboard").append("<h4>Please fill out the information</h4>");
    var main_row_div= $("<div class='row is-flex'></div>");

    $(container_empl_dashboard).append(main_row_div);
    var main_col_div=$("<div class='col-md-12' id=''></div>");
    //var main_col_div1=$("<div class='col-md-6'></div>");
       
    $(main_row_div).append(main_col_div);
    //$(main_row_div).append(main_col_div1);

    var row_div_one=$("<div class='row'></div>");
            // Employee Name
            var col_one__row_div_one=$("<div class='col-md-6'></div>");
                row__col_one__row_div_one=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-4'></div>")
                    colmd2=$("<div class='col-md-6'></div>")

                    emp_name_label=$("<label for='emp_name_tag' class='custom_label_css'>Employee Name</label>");
                    colmd1.append(emp_name_label)
                    emp_name_input=$("<input class='form-control' id='emp_name_tag' class='custom_input_css'>")
                    colmd2.append(emp_name_input)

                row__col_one__row_div_one.append(colmd1);
                row__col_one__row_div_one.append(colmd2);
            col_one__row_div_one.append(row__col_one__row_div_one);


            // Contact Number

            var col_two__row_div_one=$("<div class='col-md-6'></div>");
                var row__col_two__row_div_one=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-4'></div>")
                    colmd2=$("<div class='col-md-6'></div>")

                    contact_type_label=$("<label class='custom_label_css'>Contact Number</label>");
                    colmd1.append(contact_type_label);
                    contact_type_input=$("<input class='form-control' id='contact_type_input' class='custom_input_css' placeholder='0312-3456789'></input>")
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
                            colmd2=$("<div class='col-md-3'></div>")
                            colmd3=$("<div class='col-md-2'></div>")
                            colmd4=$("<div class='col-md-3'></div>")

                            emp_name_label=$("<label class='custom_label_css'>Gender</label>");
                            colmd1.append(emp_name_label)
                            emp_name_input=$("<input class='form-control' id='gender_select' class='custom_input_css'>")
                            colmd2.append(emp_name_input)
                // DOB
                            contact_type_label=$("<label class='custom_label_css'>DOB</label>");
                            colmd3.append(contact_type_label);
                            contact_type_input=$("<input class='form-control' id='DOB_input' class='custom_input_css' ></input>")
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
                        colmd2=$("<div class='col-md-6'></div>")

                        contact_type_label=$("<label class='custom_label_css'>CNIC</label>");
                        colmd1.append(contact_type_label);
                        contact_type_input=$("<input class='form-control' id='contact_type_input' class='custom_input_css' placeholder='xxxxx-xxxxxxx-x' ></input>")
                        colmd2.append(contact_type_input);

                    row__col_three__row_div_two.append(colmd1)
                    row__col_three__row_div_two.append(colmd2)
                col_three__row_div_two.append(row__col_three__row_div_two)

            $(row_div_two).append(col_one__row_div_two);
            //  $(row_div_two).append(col_two__row_div_two);
            $(row_div_two).append(col_three__row_div_two);


        var row_div_three=$("<div class='row' style='padding-bottom: 15px;''></div>");
                // Employee Type
                var col_one__row_div_three=$("<div class='col-md-12'></div>");
                    row__col_one__row_div_three=$("<div class='row'></div>");
                        colmd1=$("<div class='col-md-2'></div>")
                        colmd2=$("<div class='col-md-3'></div>")
    
                        emp_type_label=$("<label for='emp_name_tag' class='custom_label_css'>Employee Type</label>");
                        colmd1.append(emp_type_label)
                        row__col_one__row_div_three.append(colmd1);


                            var select=$("<select id='select_emp_type' class='form-control'></select>");
                                var option=$("<option selected='selected' id="+employee_type_list[0]+"-opt value="+employee_type_list[0]+">"+employee_type_list[0]+"</option>");
                            $(select).append(option);
                            for (var i=1;i<=employee_type_list.length;i++){
                                if (employee_type_list[i]!==undefined){
                                    var option=$("<option id="+employee_type_list[i]+"-opt value="+employee_type_list[i]+">"+employee_type_list[i]+"</option>");
                                    $(select).append(option);
                                }
                             } 
                        colmd2.append(select) 
                    row__col_one__row_div_three.append(colmd1);
                    row__col_one__row_div_three.append(colmd2);
                 col_one__row_div_three.append(row__col_one__row_div_three);
            $(row_div_three).append(col_one__row_div_three);
            
                         
        var row_div_four=$("<div class='row'></div>");
                    // Qualification
                    var col_one__row_div_four=$("<div class='col-md-6'></div>");
                        row__col_one__row_div_four=$("<div class='row'></div>");
                            colmd1=$("<div class='col-md-4'></div>")
                            colmd2=$("<div class='col-md-6'></div>")
        
                            emp_qualif_label=$("<label for='emp_qualif_tag' class='custom_label_css'>Qualification</label>");
                            colmd1.append(emp_qualif_label)
                            emp_qualif_input=$("<input class='form-control' id='emp_qualif_input' class='custom_input_css'>")
                            colmd2.append(emp_qualif_input)
        
                        row__col_one__row_div_four.append(colmd1);
                        row__col_one__row_div_four.append(colmd2);
                    col_one__row_div_four.append(row__col_one__row_div_four);
        
        
                    // email ID
        
                    var col_two__row_div_four=$("<div class='col-md-6'></div>");
                        var row__col_two__row_div_four=$("<div class='row'></div>");
                            colmd1=$("<div class='col-md-4'></div>")
                            colmd2=$("<div class='col-md-6'></div>")
        
                            email_id_label=$("<label class='custom_label_css'>Email Address</label>");
                            colmd1.append(email_id_label);
                            email_id_input=$("<input class='form-control' id='email_id_input' class='custom_input_css'></input>")
                            colmd2.append(email_id_input);
        
                        row__col_two__row_div_four.append(colmd1)
                        row__col_two__row_div_four.append(colmd2)
                    col_two__row_div_four.append(row__col_two__row_div_four)

                $(row_div_four).append(col_one__row_div_four);
                $(row_div_four).append(col_two__row_div_four);
    


$(main_col_div).append(row_div_one);
$(main_col_div).append(row_div_two);
$(main_col_div).append(row_div_three);
$(main_col_div).append(row_div_four);


        $( "#DOB_input" ).datepicker({
            changeMonth: true,
            changeYear: true
            });
        
            var availableTags = [
                "Male",
                "Female",
                "Other"
              ];
              $( "#gender_select" ).autocomplete({
                source: availableTags
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