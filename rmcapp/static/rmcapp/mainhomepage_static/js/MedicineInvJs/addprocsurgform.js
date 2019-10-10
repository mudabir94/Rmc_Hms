$( document ).ready(function() {
    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': { 

        },
        url: '/add_proc_surg_form',
        success: function(data){            
            addProcSurgForm();
        },
    });
});

function addProcSurgForm(){
    $('#main_page_content').empty()
    var container_patient_dashboard= $('#main_page_content').append('<div class="container-fluid" id="container-patient-dashboard"></div>');
    $("#container-patient-dashboard").append("<h2 class ='text-center'>Patient Information</h2>");
    $("#container-patient-dashboard").append("<hr class='custom_hr'>");
    $("#container-patient-dashboard").append("<h5>Please fill in the form below</h5>");
    var main_row_div= $("<div class='row is-flex'></div>");

    $(container_patient_dashboard).append(main_row_div);
    var main_col_div=$("<div class='col-md-12' id=''></div>");
       
    $(main_row_div).append(main_col_div);

        var row_div_one=$("<div class='row'></div>");
            var col_one__row_div_one=$("<div class='col-md-6'></div>");
                row__col_one__row_div_one=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-4'></div>")
                    colmd2=$("<div class='col-md-6'></div>")

                    procedure_label=$("<label for='procedure_tag' class='custom_label_css'>Procedure/Surgery</label>");
                    colmd1.append(procedure_label)
                    procedure_input=$("<input id='procedure_input' class='custom_input_css form-control'>")
                    colmd2.append(procedure_input)

                row__col_one__row_div_one.append(colmd1);
                row__col_one__row_div_one.append(colmd2);
            col_one__row_div_one.append(row__col_one__row_div_one);

        $(row_div_one).append(col_one__row_div_one);

        var row_div_two=$("<div class='row'></div>");
            var col_one__row_div_two=$("<div class='col-md-6'></div>");
                row__col_one__row_div_two=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-4'></div>")
                    colmd2=$("<div class='col-md-6'></div>")

                    price_label=$("<label for='procedure_tag' class='custom_label_css'>Treatment Cost</label>");
                    colmd1.append(price_label)
                    price_input=$("<input id='price_input' class='custom_input_css form-control'>")
                    colmd2.append(price_input)

                row__col_one__row_div_two.append(colmd1);
                row__col_one__row_div_two.append(colmd2);
            col_one__row_div_two.append(row__col_one__row_div_two);

        $(row_div_two).append(col_one__row_div_two);
    
        var row_div_three=$("<div class='row' style='padding-top: 15px;'></div>");
                    //save button
            var col_two__row_div_three=$("<div class='col-md-6'></div>");
                var row__col_two__row_div_three=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-4 offset-md-5'></div>")


                    savePatientdataForm_button=$('<button class="btn btn-success btn-sm btn-block" onclick="saveProcedure()">Save</button>')
                    colmd1.append(savePatientdataForm_button)
                    
                    row__col_two__row_div_three.append(colmd1)

            col_two__row_div_three.append(row__col_two__row_div_three)

        $(row_div_three).append(col_two__row_div_three);

    $(main_col_div).append(row_div_one);
    $(main_col_div).append(row_div_two);
    $(main_col_div).append(row_div_three);
}

function saveProcedure(){

    var procedure_name=$("#procedure_input").val();
    console.log("procedure_name", procedure_name);
    $("#procedure_input").val("");

    var procedure_price=$("#price_input").val();
    console.log("procedure_price", procedure_price);
    $("#price_input").val("")

    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            "procedure":JSON.stringify(procedure_name),
            "price":JSON.stringify(procedure_price),
            
        },
        url: '/add_proc_surg_form',
        success: function(data){
            console.log(data['Success']);
        },
    });
}
}