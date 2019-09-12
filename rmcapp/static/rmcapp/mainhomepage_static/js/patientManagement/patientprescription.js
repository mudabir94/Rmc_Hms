$( document ).ready(function() {
    loadPresForm();
});
function loadPresForm(){
    var patient_prescription_div=$("#patient_prescription_div").append('<div class="container-fluid" id="container-print-patient-prescription"></div>');
    var main_row_div= $("<div class='row is-flex'></div>");
    $(patient_prescription_div).append(main_row_div);
    var main_col_div=$("<div class='col-md-12' id=''></div>");
       
    $(main_row_div).append(main_col_div);
// logo
    var row_div_one=$("<div class='row'></div>");
            var col_one__row_div_one=$("<div class='col-md-12'></div>");
                row__col_one__row_div_one=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-12'></div>")

                    pat_name=$("<p class='text-center font-weight-bold'>RAFIQ MEDICAL CENTER</p>");
                    colmd1.append(pat_name)

                row__col_one__row_div_one.append(colmd1);
            col_one__row_div_one.append(row__col_one__row_div_one);

        $(row_div_one).append(col_one__row_div_one);

    // Patient Detail - 1
    var row_div_two=$("<div class='row'></div>");
        var col_one__row_div_two=$("<div class='col-md-12'></div>");
            row__col_one__row_div_two=$("<div class='row'></div>");
                colmd0=$("<div class='col-md-1'></div>")
                colmd1=$("<div class='col-md-1'></div>")
                colmd2=$("<div class='col-md-2'></div>")
                colmd3=$("<div class='col-md-2'></div>")
                colmd4=$("<div class='col-md-2'></div>")
                colmd5=$("<div class='col-md-1'></div>")
                colmd6=$("<div class='col-md-2'></div>")
                colmd7=$("<div class='col-md-1'></div>")


                pat_id_label=$("<label class='custom_label_css'>ID</label>");
                colmd1.append(pat_id_label)
                pat_id=$("<input class='form-control' id='pat_id' class='custom_input_css'>")
                colmd2.append(pat_id)
                
                pat_name_label=$("<label class='custom_label_css'>Name</label>");
                colmd3.append(pat_name_label)
                pat_name=$("<input class='form-control' id='pat_name' class='custom_input_css'>")
                colmd4.append(pat_name)

                pat_age_label=$("<label class='custom_label_css'>Age</label>");
                colmd5.append(pat_age_label)
                pat_age=$("<input class='form-control' id='pat_age' class='custom_input_css'>")
                colmd6.append(pat_age)
                
            row__col_one__row_div_two.append(colmd0);
            row__col_one__row_div_two.append(colmd1);
            row__col_one__row_div_two.append(colmd2);
            row__col_one__row_div_two.append(colmd3);
            row__col_one__row_div_two.append(colmd4);
            row__col_one__row_div_two.append(colmd5);
            row__col_one__row_div_two.append(colmd6);
            row__col_one__row_div_two.append(colmd7);


        col_one__row_div_two.append(row__col_one__row_div_two);

    $(row_div_two).append(col_one__row_div_two);

    // Patient Detail - 2
    var row_div_three=$("<div class='row'></div>");
        var col_one__row_div_three=$("<div class='col-md-12'></div>");
            row__col_one__row_div_three=$("<div class='row'></div>");
                colmd0=$("<div class='col-md-1'></div>")
                colmd1=$("<div class='col-md-1'></div>")
                colmd2=$("<div class='col-md-2'></div>")
                colmd3=$("<div class='col-md-2'></div>")
                colmd4=$("<div class='col-md-2'></div>")
                colmd5=$("<div class='col-md-1'></div>")
                colmd6=$("<div class='col-md-2'></div>")
                colmd7=$("<div class='col-md-1'></div>")

                pat_bp_label=$("<label class='custom_label_css'>BP</label>");
                colmd1.append(pat_bp_label)
                pat_bp=$("<input class='form-control' id='pat_id' class='custom_input_css'>")
                colmd2.append(pat_bp)
                
                pat_gender_label=$("<label class='custom_label_css'>Gender</label>");
                colmd3.append(pat_gender_label)
                pat_gender=$("<input class='form-control' id='pat_name' class='custom_input_css'>")
                colmd4.append(pat_gender)

                pat_token_label=$("<label class='custom_label_css'>Token Number</label>");
                colmd5.append(pat_token_label)
                Pat_token=$("<input class='form-control' id='pat_age' class='custom_input_css'>")
                colmd6.append(Pat_token)
                

                row__col_one__row_div_three.append(colmd0);
                row__col_one__row_div_three.append(colmd1);
                row__col_one__row_div_three.append(colmd2);
                row__col_one__row_div_three.append(colmd3);
                row__col_one__row_div_three.append(colmd4);
                row__col_one__row_div_three.append(colmd5);
                row__col_one__row_div_three.append(colmd6);
                row__col_one__row_div_three.append(colmd7);

        col_one__row_div_three.append(row__col_one__row_div_three);

    $(row_div_three).append(col_one__row_div_three);


        // 3 columns
        var row_div_four=$("<div class='row'></div>");
        var col_one__row_div_four=$("<div class='col-md-12 '></div>");
            row__col_one__row_div_four=$("<div class='row'></div>");
                colmd1=$("<div class='col-md-3 setInvestigationColHeight vl'></div>")
                colmd2=$("<div class='col-md-6 setPrescriptionColHeight vl'></div>")
                colmd3=$("<div class='col-md-3 setTestColHeight vl'></div>")


                col_one_heading=$("<p class='text-center'>INVESTIGATION</p>");
                colmd1.append(col_one_heading)
                
                col_two_heading=$("<p class='text-center'>PRESCRIPTION</p>");
                colmd2.append(col_two_heading)
                
                col_three_heading=$("<p class='text-center'>TESTS</p>");
                colmd3.append(col_three_heading)


                
                row__col_one__row_div_four.append(colmd1);
                row__col_one__row_div_four.append(colmd2);
                row__col_one__row_div_four.append(colmd3);


            col_one__row_div_four.append(row__col_one__row_div_four);

    $(row_div_four).append(col_one__row_div_four);

$("#container-patient-dashboard").append("<hr class='hl'>");


// footer
    var row_div_five=$("<div class='row'></div>");
    var col_one__row_div_five=$("<div class='col-md-12'></div>");
    row__col_one__row_div_five=$("<div class='row'></div>");
            colmd1=$("<div class='col-md-12'></div>")

            pat_name=$("<p class='text-center font-weight-bold'>Footer details</p>");
            colmd1.append(pat_name)

            row__col_one__row_div_five.append(colmd1);
    col_one__row_div_five.append(row__col_one__row_div_five);

$(row_div_five).append(col_one__row_div_five);

      
$(main_col_div).append(row_div_one);
$(main_col_div).append(row_div_two);
$(main_col_div).append(row_div_three);
$(main_col_div).append(row_div_four);
$(main_col_div).append(row_div_five);





}