

function vitalsRecord(){
    createBasicSearchBar()
}
function createBasicSearchBar(){
    $('#main_page_content').empty()
    var container= $('#main_page_content').append('<div class="container-fluid" id="container_vitals_record"></div>');
    $("#container_vitals_record").append("<h2 class ='center_h_tag_forms'>Vitals Record</h2>");
    $("#container_vitals_record").append("<hr class='custom_hr'>");

    var main_row_div= $("<div class='row is-flex'></div>");

    $(container).append(main_row_div);
    var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");
       
        $(main_row_div).append(main_col_div);

            var row_div_one=$("<div class='row' id='search_row_div'></div>");
                var col_one__row_div_one=$("<div class='col-md-12'></div>");
                row__col_one__row_div_one=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-1'></div>")
                    colmd2=$("<div class='col-md-2'></div>")
                    colmd3=$("<div class='col-md-2'></div>")

                    pres_id_label=$("<label class='custom_label_css'>Prescription id</label>");
                    colmd1.append(pres_id_label)

                    pres_id_input=$("<input class='form-control custom_input_css' id='pres_id_input' >")
                    colmd2.append(pres_id_input);

                    var search_button=$('<button class="btn btn-block fa fa-search" onclick="searchPatientInVitalRecord()">  Search Patient </button>');
                    colmd3.append(search_button);

                row__col_one__row_div_one.append(colmd1);
                row__col_one__row_div_one.append(colmd2);
                row__col_one__row_div_one.append(colmd3);

                col_one__row_div_one.append(row__col_one__row_div_one);
            row_div_one.append(col_one__row_div_one);
        $(main_col_div).append(row_div_one);
}

function searchPatientInVitalRecord(){
    var pres_id=$("#pres_id_input").val();
    if (pres_id===""){
        alert("Please Insert Valid Pres id")
        return
    }
    retrievePatientInfoInVitalRecord(pres_id);
}
var patient_dict={}
function retrievePatientInfoInVitalRecord(id){
    prescription_id=id
    $.ajax({
        type: 'GET',
        dataType: "json", 
        'data': {
            "id":prescription_id,
        },
        url: '/retrieve_patient_info_in_vital_record',
        success: function(data){
            if (data['pres_id']===""){
                alert("Please Insert Valid Pres id")
                return
            }
            patient_dict={};
            patient_dict=JSON.parse(data["patient_dict"])
            createPatientDetailsHtmlInVitalRecord();
        },
    }); 
}
function createPatientDetailsHtmlInVitalRecord(){
    var row_div_two=$("<div class='row' id='patient_info_vital_record'></div>");
        var main_subcol=$("<div class='col-md-12'></div>");

            var subrow_one=$("<div class='row' style='padding-top:20px'></div>")

                var col_one__subrow_one=$("<div class='col-md-3'></div>");
                        row__col_one__subrow_one=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-5'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var pat_name_label=$("<label for='emp_name_tag' class='custom_label_css'>Patient Name</label>");
                                var pat_name_input=$("<label class='form-control-static' id='pat_name_input'>"+patient_dict['name']+"</label>")
                            colmd2.append(pat_name_input)
                            colmd1.append(pat_name_label)
                        row__col_one__subrow_one.append(colmd1);
                        row__col_one__subrow_one.append(colmd2);
                    col_one__subrow_one.append(row__col_one__subrow_one);

                var col_two__subrow_one=$("<div class='col-md-3'></div>");
                    var row__col_two__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-5'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var contact_type_label=$("<label class='custom_label_css'>Contact Number</label>");
                            var contact_type_input=$("<label class='form-control-static' id='contact_numb_input'>"+patient_dict['contact_no']+"</label>")
                        colmd1.append(contact_type_label);
                        colmd2.append(contact_type_input);
    
                    row__col_two__subrow_one.append(colmd1)
                    row__col_two__subrow_one.append(colmd2)
                col_two__subrow_one.append(row__col_two__subrow_one)

            subrow_one.append(col_one__subrow_one)
            subrow_one.append(col_two__subrow_one)

        // var subrow_two=$("<div class='row'></div>")
        //     var col_one_subrow_two=$("<div class='col-md-6'></div>");
        //         var row__col_one_subrow_two=$("<div class='row'></div>");
        //             colmd1=$("<div class='col-md-2'></div>")
        //             colmd2=$("<div class='col-md-3'></div>")
        //             colmd3=$("<div class='col-md-2'></div>")
        //             colmd4=$("<div class='col-md-3'></div>")
        
        //                 var pat_name_label=$("<label class='custom_label_css'>Gender</label>");
        //                 var pat_name_input=$("<input class='form-control' id='gender_select' class='custom_input_css' value='"+patient_dict[patient_id_selected]['gender']+"' disabled>")
        //             // DOB
        //                 var dob_label=$("<label class='custom_label_css'>DOB</label>");
        //                 var dob_input=$("<input class='form-control' id='dob_input' class='custom_input_css' value='"+patient_dict[patient_id_selected]['dob']+"' ></input>")
        //             colmd1.append(pat_name_label)
        //             colmd2.append(pat_name_input)
        //             colmd3.append(dob_label);
        //             colmd4.append(dob_input);
        
        //         row__col_one_subrow_two.append(colmd1);
        //         row__col_one_subrow_two.append(colmd2);
        //         row__col_one_subrow_two.append(colmd3);
        //         row__col_one_subrow_two.append(colmd4);
        
        //     col_one_subrow_two.append(row__col_one_subrow_two);
        
        //                 // CNIC
        //     var col_two_subrow_two=$("<div class='col-md-6'></div>");//
        //         var row__col_two_subrow_two=$("<div class='row'></div>");
        //             var colmd1=$("<div class='col-md-4'></div>")
        //             var colmd2=$("<div class='col-md-6'></div>")
        //                 var cnic_label=$("<label class='custom_label_css'>CNIC/Guardian CNIC</label>");
        //                 var cnic_input=$("<input class='form-control' id='cnic_input' class='custom_input_css' placeholder='xxxxx-xxxxxxx-x' value='"+patient_dict[patient_id_selected]['cnic']+"'></input>")
        //             colmd1.append(cnic_label);
        //             colmd2.append(cnic_input);

        //         row__col_two_subrow_two.append(colmd1)
        //         row__col_two_subrow_two.append(colmd2)
        //     col_two_subrow_two.append(row__col_two_subrow_two)

        // subrow_two.append(col_one_subrow_two)
        // subrow_two.append(col_two_subrow_two)

        // var subrow_three=$("<div class='row'></div>")
        //     var col_one__subrow_three=$("<div class='col-md-6'></div>");
        //         var row__col_one__subrow_three=$("<div class='row'></div>");
        //             var colmd1=$("<div class='col-md-4'></div>")
        //             var colmd2=$("<div class='col-md-6'></div>")
        //             var guradian_name=patient_dict[patient_id_selected]['guardian']
        //             console.log("selected guardian",guradian_name)

        //                 var guardian_name_label=$("<label  class='custom_label_css'>Guardian Name</label>");
        //                 var guardian_name_input=$("<input class='form-control' id='guardian_input' class='custom_input_css' value='"+guradian_name+"' ></input>")
        //             colmd1.append(guardian_name_label)
        //             colmd2.append(guardian_name_input);
            
        //             row__col_one__subrow_three.append(colmd1);
        //             row__col_one__subrow_three.append(colmd2);
        //     col_one__subrow_three.append(row__col_one__subrow_three);

        //     var col_two__subrow_three=$("<div class='col-md-6'></div>");
        //         var row__col_two__subrow_three=$("<div class='row'></div>");
        //             var colmd1=$("<div class='col-md-4'></div>")
        //             var colmd2=$("<div class='col-md-6'></div>")
        //                 var address_label=$("<label for='pat_address_tag' class='custom_label_css'>Address</label>");
        //                 var pat_address_input=$("<input class='form-control' id='pat_address_input' class='custom_input_css' value='"+patient_dict[patient_id_selected]['address']+"'>")
        //             colmd1.append(address_label)
        //             colmd2.append(pat_address_input)

        //         row__col_two__subrow_three.append(colmd1);
        //         row__col_two__subrow_three.append(colmd2);
        //     col_two__subrow_three.append(row__col_two__subrow_three);

        // subrow_three.append(col_one__subrow_three)
        // subrow_three.append(col_two__subrow_three)

        // var subrow_four=$("<div class='row'></div>")
        // // Blood group
        //     var col_one__subrow_four=$("<div class='col-md-6'></div>");
        //         var row__col_one__subrow_four=$("<div class='row'></div>");
        //             var colmd1=$("<div class='col-md-4'></div>")
        //             var colmd2=$("<div class='col-md-6'></div>")

        //                 blood_group_label=$("<label for='blood_group_tag' class='custom_label_css'>Blood group</label>");
        //                 bloodgroup_input=$("<input class='form-control' id='blood_group_input' class='custom_input_css' value='"+patient_dict[patient_id_selected]['bloodgroup']+"'>")
        //             colmd1.append(blood_group_label)
        //             colmd2.append(bloodgroup_input) 

        //         row__col_one__subrow_four.append(colmd1);
        //         row__col_one__subrow_four.append(colmd2);
        //     col_one__subrow_four.append(row__col_one__subrow_four);
        //     var col_two__subrow_four=$("<div class='col-md-6'></div>");
        //         var row__col_two__subrow_four=$("<div class='row'></div>");
        //             var colmd1=$("<div class='col-md-4'></div>")
        //             var colmd2=$("<div class='col-md-6'></div>")

        //                 var email_id_label=$("<label class='custom_label_css'>Email Address</label>");
        //                 var email_id_input=$("<input class='form-control' id='email_id_input' class='custom_input_css' value='"+patient_dict[patient_id_selected]['email']+"'></input>")
        //             colmd1.append(email_id_label);
        //             colmd2.append(email_id_input);

        //         row__col_two__subrow_four.append(colmd1)
        //         row__col_two__subrow_four.append(colmd2)
        //     col_two__subrow_four.append(row__col_two__subrow_four)

        // subrow_four.append(col_one__subrow_four);
        // subrow_four.append(col_two__subrow_four);

        
        main_subcol.append(subrow_one)
        // main_subcol.append(subrow_two)
        // main_subcol.append(subrow_three)
        // main_subcol.append(subrow_four)


    row_div_two.append(main_subcol)
    var main_col_div=$("#main_col_div");
main_col_div.append(row_div_two);


}
