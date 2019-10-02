var presData={}

$( document ).ready(function() {
    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': { 

        },
        url: '/print_patient_prescription',
        success: function(data){
            console.log("presData----",JSON.parse(data['presData']));
            presData= JSON.parse(data['presData'])
            console.log("iddd", presData['id'])
            loadPresForm();

        },
    });
});
function loadPresForm(){
    var patient_prescription_div=$("#patient_prescription_div").append('<div class="container-fluid" id="container-print-patient-prescription"></div>');
    var main_row_div= $("<div class='row is-flex'></div>");
    $(patient_prescription_div).append(main_row_div);
    var main_col_div=$("<div class='col-md-12' id=''></div>");
       
    $(main_row_div).append(main_col_div);

        var row_div_one=$("<div class='row'></div>");
            var col_one__row_div_one=$("<div class='col-md-12'></div>");
                row__col_one__row_div_one=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-12'></div>")

                    rmc_tag=$("<p class='text-center font-weight-bold' style='font-size:2vw;'>RAFIQ MEDICAL CENTER</p>");
                    colmd1.append(rmc_tag)

                row__col_one__row_div_one.append(colmd1);
            col_one__row_div_one.append(row__col_one__row_div_one);

        $(row_div_one).append(col_one__row_div_one);

        var row_div_two=$("<div class='row'></div>");
            var col_one__row_div_two=$("<div class='col-md-12' style='padding-bottom: 15px;'></div>");
                row__col_one__row_div_two=$("<div class='row'></div>");

                    colmd1=$("<div class='col-md-1'></div>")
                    colmd2=$("<div class='col-md-2'></div>")
                    colmd3=$("<div class='col-md-1 offset-md-1'></div>")
                    colmd4=$("<div class='col-md-4'></div>")
                    colmd5=$("<div class='col-md-1 offset-md-1'></div>")
                    colmd6=$("<div class='col-md-1'></div>")

                    pat_id_label=$("<label class='custom_label_css' style='font-weight: bold;'>ID</label>");
                    colmd1.append(pat_id_label)
                    pat_id=$("<input class='form-control' id='pat_id' style='background-color: white;' value='"+presData['id']+"' Disabled>")
                    colmd2.append(pat_id)
                    
                    pat_name_label=$("<label class='custom_label_css' style='font-weight: bold;'>Name</label>");
                    colmd3.append(pat_name_label)
                    pat_name=$("<input class='form-control' id='pat_name' style='background-color: white;' value='"+presData['name']+"' Disabled >")
                    colmd4.append(pat_name)

                    pat_token_label=$("<label class='custom_label_css' id='token_id' style='font-weight: bold;' >Token No</label>");
                    colmd5.append(pat_token_label)
                    token_number=$("<input class='form-control' id='token' style='background-color: white;' value='"+presData['token']+"' Disabled >")
                    colmd6.append(token_number)
                    
                row__col_one__row_div_two.append(colmd1);
                row__col_one__row_div_two.append(colmd2);
                row__col_one__row_div_two.append(colmd3);
                row__col_one__row_div_two.append(colmd4);
                row__col_one__row_div_two.append(colmd5);
                row__col_one__row_div_two.append(colmd6);

            col_one__row_div_two.append(row__col_one__row_div_two);

        $(row_div_two).append(col_one__row_div_two);
        
        var row_div_three=$("<div class='row'></div>");
            var col_one__row_div_three=$("<div class='col-md-12' style='padding-bottom: 15px;'></div>");
                row__col_one__row_div_three=$("<div class='row'></div>");

                    colmd1=$("<div class='col-md-1'></div>")
                    colmd2=$("<div class='col-md-2'></div>")
                    colmd3=$("<div class='col-md-1 offset-md-1'></div>")
                    colmd4=$("<div class='col-md-2'></div>")
                    colmd5=$("<div class='col-md-1'></div>")
                    colmd6=$("<div class='col-md-1'></div>")

                    pat_bp_label=$("<label class='custom_label_css' style='font-weight: bold;'>BP</label>");
                    colmd1.append(pat_bp_label)
                    pat_bp=$("<input class='form-control' id='pat_bp' style='background-color: white;' value='10'>")
                    colmd2.append(pat_bp)
                    
                    pat_gender_label=$("<label class='custom_label_css' style='font-weight: bold;'>Gender</label>");
                    colmd3.append(pat_gender_label)
                    pat_gender=$("<input class='form-control' id='pat_gender' style='background-color: white;' value='"+presData['gender']+"'>")
                    colmd4.append(pat_gender)

                    pat_age_label=$("<label class='custom_label_css' style='font-weight: bold;'>Age</label>");
                    colmd5.append(pat_age_label)
                    Pat_age=$("<input class='form-control' id='pat_age' style='background-color: white;' value='"+presData['age']+"' >")
                    colmd6.append(Pat_age)

                row__col_one__row_div_three.append(colmd1);
                row__col_one__row_div_three.append(colmd2);
                row__col_one__row_div_three.append(colmd3);
                row__col_one__row_div_three.append(colmd4);
                row__col_one__row_div_three.append(colmd5);
                row__col_one__row_div_three.append(colmd6);

            col_one__row_div_three.append(row__col_one__row_div_three);

        $(row_div_three).append(col_one__row_div_three);

        if(presData['pat_type']==="Outdoor"){

            var row_div_four=$("<div class='row'></div>");
                var col_one__row_div_four=$("<div class='col-md-12' style='padding-bottom: 15px;'></div>");
                    row__col_one__row_div_four=$("<div class='row'></div>");

                        colmd1=$("<div class='col-md-1 offset-md-4'></div>")
                        colmd2=$("<div class='col-md-4'></div>")
                        
                        Doctor_label=$("<label class='custom_label_css' style='font-weight: bold;'>Doctor</label>");
                        colmd1.append(Doctor_label)
                        Doctor_input=$("<input class='form-control' id='doct_id' style='background-color: white;' value='"+presData['doctor']+"'>")
                        colmd2.append(Doctor_input)
                        
                    row__col_one__row_div_four.append(colmd1);
                    row__col_one__row_div_four.append(colmd2);

                col_one__row_div_four.append(row__col_one__row_div_four);

            $(row_div_four).append(col_one__row_div_four);
        }
        else if(presData['pat_type']==="Emergency"){

            var row_div_four=$("<div class='row'></div>");
                var col_one__row_div_four=$("<div class='col-md-12' style='padding-bottom: 15px;'></div>");
                    row__col_one__row_div_four=$("<div class='row'></div>");
                        colmd1=$("<div class='col-md-1 offset-md-4'></div>")
                        colmd2=$("<div class='col-md-4'></div>")
                        
                        Doctor_label=$("<label class='custom_label_css' style='font-weight: bold;'>Doctor</label>");
                        colmd1.append(Doctor_label)
                        Doctor_input=$("<input class='form-control' id='doct_id' style='background-color: white;' value='"+presData['doctor']+"'>")
                        colmd2.append(Doctor_input)
                        
                    row__col_one__row_div_four.append(colmd1);
                    row__col_one__row_div_four.append(colmd2);

                col_one__row_div_four.append(row__col_one__row_div_four);
            $(row_div_four).append(col_one__row_div_four);

        }
        else if(presData['pat_type']==="Indoor"){

            if(presData['ward_type']==="Room"){

            var row_div_four=$("<div class='row'></div>");
                var col_one__row_div_four=$("<div class='col-md-12' style='padding-bottom: 15px;'></div>");
                    row__col_one__row_div_four=$("<div class='row'></div>");
                        colmd1=$("<div class='col-md-1'></div>")
                        colmd2=$("<div class='col-md-3'></div>")
                        colmd3=$("<div class='col-md-1'></div>")
                        colmd4=$("<div class='col-md-1'></div>")
                        
                        Doctor_label=$("<label class='custom_label_css' style='font-weight: bold;'>Consultant</label>");
                        colmd1.append(Doctor_label)
                        Doctor_input=$("<input class='form-control' id='doct_id' style='background-color: white;' value='"+presData['Consultant']+"'>")
                        colmd2.append(Doctor_input)

                        roomNo_label=$("<label class='custom_label_css' style='font-weight: bold;'>Room Number</label>");
                        colmd3.append(roomNo_label)
                        Room_input=$("<input class='form-control' style='background-color: white;' value='"+presData['roomNo']+"'>")
                        colmd4.append(Room_input)

                    row__col_one__row_div_four.append(colmd1);
                    row__col_one__row_div_four.append(colmd2);
                    row__col_one__row_div_four.append(colmd3);
                    row__col_one__row_div_four.append(colmd4);

                col_one__row_div_four.append(row__col_one__row_div_four);
            $(row_div_four).append(col_one__row_div_four);
        }
        else if(presData['ward_type']==="Ward"){

            var row_div_four=$("<div class='row'></div>");
                var col_one__row_div_four=$("<div class='col-md-12' style='padding-bottom: 15px;'></div>");
                    row__col_one__row_div_four=$("<div class='row'></div>");

                        colmd1=$("<div class='col-md-1'></div>")
                        colmd2=$("<div class='col-md-3'></div>")
                        colmd3=$("<div class='col-md-1'></div>")
                        colmd4=$("<div class='col-md-1'></div>")
                        colmd5=$("<div class='col-md-1 offset-md-1'></div>")
                        colmd6=$("<div class='col-md-1'></div>")

                        Doctor_label=$("<label class='custom_label_css' style='font-weight: bold;'>Consultant</label>");
                        colmd1.append(Doctor_label)
                        Doctor_input=$("<input class='form-control' id='doct_id' style='background-color: white;' value='"+presData['Consultant']+"'>")
                        colmd2.append(Doctor_input)

                        wardNo_label=$("<label class='custom_label_css' style='font-weight: bold;'>Ward Number</label>");
                        colmd3.append(wardNo_label)
                        wardNo_input=$("<input class='form-control' id='wardNo_input' style='background-color: white;' value='"+presData['ward']+"'>")
                        colmd4.append(wardNo_input)
                        
                        bedNo_label=$("<label class='custom_label_css' style='font-weight: bold;'>Bed Number</label>");
                        colmd5.append(bedNo_label)
                        bedNo_input=$("<input class='form-control' id='bedNo_input' style='background-color: white;' value='"+presData['bed']+"'>")
                        colmd6.append(bedNo_input)
                                                        
                    row__col_one__row_div_four.append(colmd1);
                    row__col_one__row_div_four.append(colmd2);
                    row__col_one__row_div_four.append(colmd3);
                    row__col_one__row_div_four.append(colmd4);
                    row__col_one__row_div_four.append(colmd5);
                    row__col_one__row_div_four.append(colmd6);

                col_one__row_div_four.append(row__col_one__row_div_four);
            $(row_div_four).append(col_one__row_div_four);
        }
    }
        // 3 columns
        var row_div_five=$("<div class='row'></div>");
            var col_one__row_div_five=$("<div class='col-md-12 '></div>");
                var row__col_one__row_div_five=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-3 setInvestigationColHeight' style='background:#f7f7f7'></div>")
                    colmd2=$("<div class='col-md-6 setPrescriptionColHeight'></div>")
                    colmd3=$("<div class='col-md-3 setInvestigationColHeight' style='background:#f7f7f7'></div>")

                    col_one_heading=$("<p class='text-center'>INVESTIGATION</p>");
                    colmd1.append(col_one_heading)

                    col_two_heading=$("<p class='text-center'>PRESCRIPTION</p>");
                    colmd2.append(col_two_heading)

                    col_three_heading=$("<p class='text-center'>TESTS</p>");
                    colmd3.append(col_three_heading)

                row__col_one__row_div_five.append(colmd1);
                row__col_one__row_div_five.append(colmd2);
                row__col_one__row_div_five.append(colmd3);

            col_one__row_div_five.append(row__col_one__row_div_five);
        $(row_div_five).append(col_one__row_div_five);

    $(main_col_div).append(row_div_one);
    $(main_col_div).append(row_div_two);
    $(main_col_div).append(row_div_three);
    $(main_col_div).append(row_div_four);
    $(main_col_div).append(row_div_five);


}