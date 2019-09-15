// Functions for populating html to employee page content.
var blood_group_list=['A+ve','A-ve', 'B+ve','B-ve','O+ve','O-ve','AB+ve','AB-ve'];
var patient_info_dict={}
var pat_datatable;
var patient_id_selected=0;
var date_selected=''
var patient_dict={};
var datelist=[]
var pat_med_history_dict={}
var prescription_datatable;
var datatable_list=[]

$( document ).ready(function() {
});


function addPatient(){
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
            // Patient Name
            var col_one__row_div_one=$("<div class='col-md-6'></div>");
                row__col_one__row_div_one=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-4'></div>")
                    colmd2=$("<div class='col-md-6'></div>")

                    pat_name_label=$("<label for='emp_name_tag' class='custom_label_css'>Patient Name</label>");
                    colmd1.append(pat_name_label)
                    pat_name_input=$("<input class='form-control' id='pat_name_input' class='custom_input_css'>")
                    colmd2.append(pat_name_input)

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
                    contact_type_input=$("<input class='form-control' id='contact_numb_input' class='custom_input_css' placeholder='0312-3456789'></input>")
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
                            colmd1=$("<div class='col-md-2'></div>")
                            colmd2=$("<div class='col-md-3'></div>")
                            colmd3=$("<div class='col-md-2'></div>")
                            colmd4=$("<div class='col-md-3'></div>")

                            pat_name_label=$("<label class='custom_label_css'>Gender</label>");
                            colmd1.append(pat_name_label)
                            pat_name_input=$("<input class='form-control' id='gender_select' class='custom_input_css'>")
                            colmd2.append(pat_name_input)
                // DOB
                            dob_label=$("<label class='custom_label_css'>DOB</label>");
                            colmd3.append(dob_label);
                            dob_input=$("<input class='form-control' id='dob_input' class='custom_input_css' ></input>")
                            colmd4.append(dob_input);

                        row__col_one__row_div_two.append(colmd1);
                        row__col_one__row_div_two.append(colmd2);
                        row__col_one__row_div_two.append(colmd3);
                        row__col_one__row_div_two.append(colmd4);

                    col_one__row_div_two.append(row__col_one__row_div_two);

                // CNIC
                var col_two__row_div_two=$("<div class='col-md-6'></div>");//
                    var row__col_two__row_div_two=$("<div class='row'></div>");
                        colmd1=$("<div class='col-md-4'></div>")
                        colmd2=$("<div class='col-md-6'></div>")

                        cnic_label=$("<label class='custom_label_css'>CNIC/Guardian CNIC</label>");
                        colmd1.append(cnic_label);
                        cnic_input=$("<input class='form-control' id='cnic_input' class='custom_input_css' placeholder='xxxxx-xxxxxxx-x' ></input>")
                        colmd2.append(cnic_input);

                    row__col_two__row_div_two.append(colmd1)
                    row__col_two__row_div_two.append(colmd2)
                col_two__row_div_two.append(row__col_two__row_div_two)

            $(row_div_two).append(col_one__row_div_two);
            $(row_div_two).append(col_two__row_div_two);


        var row_div_three=$("<div class='row' style='padding-bottom: 15px;''></div>");
                // Guardian
                var col_one__row_div_three=$("<div class='col-md-6'></div>");
                    row__col_one__row_div_three=$("<div class='row'></div>");
                        colmd1=$("<div class='col-md-4'></div>")
                        colmd2=$("<div class='col-md-6'></div>")
    
                        guardian_name_label=$("<label for='emp_name_tag' class='custom_label_css'>Guardian Name</label>");
                        colmd1.append(guardian_name_label)
                        guardian_name_input=$("<input class='form-control' id='guardian_input' class='custom_input_css' ></input>")
                        colmd2.append(guardian_name_input);

                    row__col_one__row_div_three.append(colmd1);
                    row__col_one__row_div_three.append(colmd2);
                 col_one__row_div_three.append(row__col_one__row_div_three);
            
                // Address
                var col_two__row_div_three=$("<div class='col-md-6'></div>");
                 row__col_two__row_div_three=$("<div class='row'></div>");
                        colmd1=$("<div class='col-md-4'></div>")
                        colmd2=$("<div class='col-md-6'></div>")
    
                        address_label=$("<label for='pat_address_tag' class='custom_label_css'>Address</label>");
                        colmd1.append(address_label)
                        pat_address_input=$("<input class='form-control' id='pat_address_input' class='custom_input_css'>")
                        colmd2.append(pat_address_input)
    
                        row__col_two__row_div_three.append(colmd1);
                        row__col_two__row_div_three.append(colmd2);
                    col_two__row_div_three.append(row__col_two__row_div_three);
            
            
             $(row_div_three).append(col_one__row_div_three);
             $(row_div_three).append(col_two__row_div_three);

                         
        var row_div_four=$("<div class='row'></div>");
                    // Blood group
                    var col_one__row_div_four=$("<div class='col-md-6'></div>");
                        row__col_one__row_div_four=$("<div class='row'></div>");
                            colmd1=$("<div class='col-md-4'></div>")
                            colmd2=$("<div class='col-md-6'></div>")
        
                            blood_group_label=$("<label for='blood_group_tag' class='custom_label_css'>Blood group</label>");
                            colmd1.append(blood_group_label)
                            
                            var select=$("<select id='blood_group_input' class='form-control'></select>");
                                var option=$("<option selected='selected' id="+blood_group_list[0]+"-opt value="+blood_group_list[0]+">"+blood_group_list[0]+"</option>");
                            $(select).append(option);
                            for (var i=1;i<=blood_group_list.length;i++){
                                if (blood_group_list[i]!==undefined){
                                    var option=$("<option id="+blood_group_list[i]+"-opt value="+blood_group_list[i]+">"+blood_group_list[i]+"</option>");
                                    $(select).append(option);
                                }
                             } 
                            colmd2.append(select) 
        
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
    
        var row_div_five=$("<div class='row' style='padding-top: 15px;'></div>");
                    //save button
                var col_two__row_div_five=$("<div class='col-md-12'></div>");
                            var row__col_two__row_div_five=$("<div class='row'></div>");
                                colmd1=$("<div class='col-md-2'></div>")
                                colmd2=$("<div class='col-md-8'></div>")
                                colmd3=$("<div class='col-md-2'></div>")

                                savePatientdataForm_button=$('<button class="btn btn-success btn-sm btn-block" onclick="savePatientData()">Save</button>')
                                colmd2.append(savePatientdataForm_button)
                                
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
        
            var availableTags = [
                "Male",
                "Female",
                "Other"
              ];
              $( "#gender_select" ).autocomplete({
                source: availableTags
              });

}
function EditPatient(){
    $('#main_page_content').empty()
    var container_patient_dashboard= $('#main_page_content').append('<div class="container-fluid" id="container-patient-dashboard"></div>');
    $("#container-patient-dashboard").append("<h2 class ='text-center'>Edit Patient Information</h2>");
    $("#container-patient-dashboard").append("<hr class='custom_hr'>");
    var main_row_div= $("<div class='row is-flex'></div>");

    $(container_patient_dashboard).append(main_row_div);
    var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");
       
    $(main_row_div).append(main_col_div);

    var row_div_one=$("<div class='row'></div>");
            // Patient Name
            var col_one__row_div_one=$("<div class='col-md-4'></div>");
                row__col_one__row_div_one=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-4'></div>")
                    colmd2=$("<div class='col-md-6'></div>")

                    pat_name_label=$("<label for='emp_name_tag' class='custom_label_css'>Patient Name</label>");
                    colmd1.append(pat_name_label)

                    pat_name_input=$("<input class='form-control' id='search_pat_name_input' class='custom_input_css'>")

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
                        var search_button=$('<button onclick="searchPatient()">Search Patient</button>')
                    colmd1.append(search_button)
                row__col_three__row_div_two.append(colmd1);
            col_three__row_div_two.append(row__col_three__row_div_two)

        row_div_two.append(col_one__row_div_two)
        row_div_two.append(col_two__row_div_two)
        row_div_two.append(col_three__row_div_two)

   



    $(main_col_div).append(row_div_one);
    $(main_col_div).append(row_div_two);

  
}
function editPatientRowDivThreeCreation(){
    var main_col_div=$("#main_col_div");
    var row_div_three=$("<div class='row' id='row_div_three'></div>");
    // Datatable Name
        var col_one__row_div_three=$("<div class='col-md-12'></div>");
            var row__col_one__row_div_three=$("<div class='row'></div>");
                var colmd1=$("<div class='col-md-12'></div>")
                    var table=$('<table id="patient_table" class="display" width="100%"></table>')
                colmd1.append(table)
            row__col_one__row_div_three.append(colmd1);
        col_one__row_div_three.append(row__col_one__row_div_three);
    $(row_div_three).append(col_one__row_div_three);
    main_col_div.append(row_div_three)
}
function searchPatient(){
    $("#row_div_four").remove();
    $("#row_div_three").remove();
    patient_dict={}
    datatable_list=[]
    editPatientRowDivThreeCreation();

    var pat_name=$("#search_pat_name_input").val();
    var contact_no=$("#search_contact_numb_input").val();
    var cnic_no=$("#search_cnic_numb_input").val();
    if (pat_datatable!==undefined){
        pat_datatable.destroy();
    }
    retrievePatientInfo(pat_name,contact_no,cnic_no)
    // list= [["1","Ali","03009420002","35202-0000122-1","Lahore"],["2","Ahmad","03119420002","35202-7268122-1","Lahore"]] 

    

}
function createPatientDataTable(){
    console.log("datatable_list",datatable_list)
    $(function(){
        pat_datatable=$("#patient_table").DataTable({
            data:datatable_list,
            columns: [
                { title: "Id" },
                { title: "Patient Name" },
                { title: "Contact" },
                { title: 'gender' },
                { title: "dob" },
                { title: "cnic" },
                { title: "guardian" },
                { title: "Address" },
                { title: "bloodgroup" },
                { title: "email" },
               


                ],
                paging: false,
                scrollY: 200,
                scrollX: true,
                ordering: true,
                info:false,
    
            });
            $('#patient_table tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    alert("clicked same entry")
                }
                else{
                    patient_id_selected=$(this).find('td').eq(0).text()

                    $("#row_div_four").remove();
                    pat_datatable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    console.log("PAtient dict on click",patient_dict);
                    var row_div_four=$("<div class='row' id='row_div_four'></div>");
                        var main_subcol=$("<div class='col-md-12'></div>");

                            var subrow_one=$("<div class='row'></div>")


                                    var col_one__subrow_one=$("<div class='col-md-6'></div>");
                                            row__col_one__subrow_one=$("<div class='row'></div>");
                                                var colmd1=$("<div class='col-md-4'></div>")
                                                var colmd2=$("<div class='col-md-6'></div>")
                                                    var pat_name_label=$("<label for='emp_name_tag' class='custom_label_css'>Patient Name</label>");
                                                    var pat_name_input=$("<input class='form-control' id='pat_name_input' class='custom_input_css' value='"+patient_dict[patient_id_selected]['name']+"' disabled>")
                                                colmd2.append(pat_name_input)
                                                colmd1.append(pat_name_label)
                                            row__col_one__subrow_one.append(colmd1);
                                            row__col_one__subrow_one.append(colmd2);
                                        col_one__subrow_one.append(row__col_one__subrow_one);


                                    var col_two__subrow_one=$("<div class='col-md-6'></div>");
                                        var row__col_two__subrow_one=$("<div class='row'></div>");
                                            var colmd1=$("<div class='col-md-4'></div>")
                                            var colmd2=$("<div class='col-md-6'></div>")
                                                var contact_type_label=$("<label class='custom_label_css'>Contact Number</label>");
                                                var contact_type_input=$("<input class='form-control' id='contact_numb_input' class='custom_input_css' placeholder='0312-3456789' value='"+patient_dict[patient_id_selected]['contact_no']+"'></input>")
                                            colmd1.append(contact_type_label);
                                            colmd2.append(contact_type_input);
                        
                                        row__col_two__subrow_one.append(colmd1)
                                        row__col_two__subrow_one.append(colmd2)
                                    col_two__subrow_one.append(row__col_two__subrow_one)


                             

                            subrow_one.append(col_one__subrow_one)
                            subrow_one.append(col_two__subrow_one)


                        var subrow_two=$("<div class='row'></div>")
                            var col_one_subrow_two=$("<div class='col-md-6'></div>");
                                var row__col_one_subrow_two=$("<div class='row'></div>");
                                    colmd1=$("<div class='col-md-2'></div>")
                                    colmd2=$("<div class='col-md-3'></div>")
                                    colmd3=$("<div class='col-md-2'></div>")
                                    colmd4=$("<div class='col-md-3'></div>")
                        
                                        var pat_name_label=$("<label class='custom_label_css'>Gender</label>");
                                        var pat_name_input=$("<input class='form-control' id='gender_select' class='custom_input_css' value='"+patient_dict[patient_id_selected]['gender']+"' disabled>")
                                    // DOB
                                        var dob_label=$("<label class='custom_label_css'>DOB</label>");
                                        var dob_input=$("<input class='form-control' id='dob_input' class='custom_input_css' value='"+patient_dict[patient_id_selected]['dob']+"' ></input>")
                                    colmd1.append(pat_name_label)
                                    colmd2.append(pat_name_input)
                                    colmd3.append(dob_label);
                                    colmd4.append(dob_input);
                        
                                row__col_one_subrow_two.append(colmd1);
                                row__col_one_subrow_two.append(colmd2);
                                row__col_one_subrow_two.append(colmd3);
                                row__col_one_subrow_two.append(colmd4);
                        
                            col_one_subrow_two.append(row__col_one_subrow_two);
                        
                                        // CNIC
                            var col_two_subrow_two=$("<div class='col-md-6'></div>");//
                                var row__col_two_subrow_two=$("<div class='row'></div>");
                                    var colmd1=$("<div class='col-md-4'></div>")
                                    var colmd2=$("<div class='col-md-6'></div>")
                                        var cnic_label=$("<label class='custom_label_css'>CNIC/Guardian CNIC</label>");
                                        var cnic_input=$("<input class='form-control' id='cnic_input' class='custom_input_css' placeholder='xxxxx-xxxxxxx-x' value='"+patient_dict[patient_id_selected]['cnic']+"'></input>")
                                    colmd1.append(cnic_label);
                                    colmd2.append(cnic_input);
            
                                row__col_two_subrow_two.append(colmd1)
                                row__col_two_subrow_two.append(colmd2)
                            col_two_subrow_two.append(row__col_two_subrow_two)

                        subrow_two.append(col_one_subrow_two)
                        subrow_two.append(col_two_subrow_two)

                        var subrow_three=$("<div class='row'></div>")
                            var col_one__subrow_three=$("<div class='col-md-6'></div>");
                                var row__col_one__subrow_three=$("<div class='row'></div>");
                                    var colmd1=$("<div class='col-md-4'></div>")
                                    var colmd2=$("<div class='col-md-6'></div>")
                                    var guradian_name=patient_dict[patient_id_selected]['guardian']
                                    console.log("selected guardian",guradian_name)

                                        var guardian_name_label=$("<label  class='custom_label_css'>Guardian Name</label>");
                                        var guardian_name_input=$("<input class='form-control' id='guardian_input' class='custom_input_css' value='"+guradian_name+"' ></input>")
                                    colmd1.append(guardian_name_label)
                                    colmd2.append(guardian_name_input);
                            
                                    row__col_one__subrow_three.append(colmd1);
                                    row__col_one__subrow_three.append(colmd2);
                            col_one__subrow_three.append(row__col_one__subrow_three);

                            var col_two__subrow_three=$("<div class='col-md-6'></div>");
                                var row__col_two__subrow_three=$("<div class='row'></div>");
                                    var colmd1=$("<div class='col-md-4'></div>")
                                    var colmd2=$("<div class='col-md-6'></div>")
                                        var address_label=$("<label for='pat_address_tag' class='custom_label_css'>Address</label>");
                                        var pat_address_input=$("<input class='form-control' id='pat_address_input' class='custom_input_css' value='"+patient_dict[patient_id_selected]['address']+"'>")
                                    colmd1.append(address_label)
                                    colmd2.append(pat_address_input)
                    
                                row__col_two__subrow_three.append(colmd1);
                                row__col_two__subrow_three.append(colmd2);
                            col_two__subrow_three.append(row__col_two__subrow_three);

                        subrow_three.append(col_one__subrow_three)
                        subrow_three.append(col_two__subrow_three)

                        var subrow_four=$("<div class='row'></div>")
                        // Blood group
                            var col_one__subrow_four=$("<div class='col-md-6'></div>");
                                var row__col_one__subrow_four=$("<div class='row'></div>");
                                    var colmd1=$("<div class='col-md-4'></div>")
                                    var colmd2=$("<div class='col-md-6'></div>")
            
                                        blood_group_label=$("<label for='blood_group_tag' class='custom_label_css'>Blood group</label>");
                                        bloodgroup_input=$("<input class='form-control' id='blood_group_input' class='custom_input_css' value='"+patient_dict[patient_id_selected]['bloodgroup']+"'>")
                                    colmd1.append(blood_group_label)
                                    colmd2.append(bloodgroup_input) 
            
                                row__col_one__subrow_four.append(colmd1);
                                row__col_one__subrow_four.append(colmd2);
                            col_one__subrow_four.append(row__col_one__subrow_four);
                            var col_two__subrow_four=$("<div class='col-md-6'></div>");
                                var row__col_two__subrow_four=$("<div class='row'></div>");
                                    var colmd1=$("<div class='col-md-4'></div>")
                                    var colmd2=$("<div class='col-md-6'></div>")
                
                                        var email_id_label=$("<label class='custom_label_css'>Email Address</label>");
                                        var email_id_input=$("<input class='form-control' id='email_id_input' class='custom_input_css' value='"+patient_dict[patient_id_selected]['email']+"'></input>")
                                    colmd1.append(email_id_label);
                                    colmd2.append(email_id_input);
                
                                row__col_two__subrow_four.append(colmd1)
                                row__col_two__subrow_four.append(colmd2)
                            col_two__subrow_four.append(row__col_two__subrow_four)

                        subrow_four.append(col_one__subrow_four);
                        subrow_four.append(col_two__subrow_four);

                        var subrow_five=$("<div class='row'>")
                            var col_one__subrow_five=$("<div class='col-md-12'></div>");
                                var row__col_one__subrow_five=$("<div class='row'></div>");
                                    var colmd1=$("<div class='col-md-2'></div>")
                                    var colmd2=$("<div class='col-md-8'></div>")
                                    var colmd3=$("<div class='col-md-2'></div>")

                                        var updatePatientdataForm_button=$('<button class="btn btn-success btn-sm btn-block" onclick="updatePatientData()">Update</button>')
                                    colmd2.append(updatePatientdataForm_button)
                                    
                                row__col_one__subrow_five.append(colmd1)
                                row__col_one__subrow_five.append(colmd2)
                                row__col_one__subrow_five.append(colmd3)
                            col_one__subrow_five.append(row__col_one__subrow_five)
                        subrow_five.append(col_one__subrow_five);

                        
                    main_subcol.append(subrow_one)
                    main_subcol.append(subrow_two)
                    main_subcol.append(subrow_three)
                    main_subcol.append(subrow_four)
                    main_subcol.append(subrow_five)



                row_div_four.append(main_subcol)
        var main_col_div=$("#main_col_div");
        main_col_div.append(row_div_four)
                  
                }
    
            });
        });
}
function savePatientData(){
    var patient_name=$("#pat_name_input").val();
    console.log("patient_name", patient_name);
    $("#pat_name_input").val("");

    var contact_number=$("#contact_numb_input").val();
    $("#contact_numb_input").val("")
    var gender=$("#gender_select").val();
    $("#gender_select").val("")
    console.log("gender", gender);
    var dob=$("#dob_input").val();
    $("#dob_input").val("");
    var cnic=$("#cnic_input").val();
    $("#cnic_input").val("");
    var guardian=$("#guardian_input").val();
    console.log("guardian", guardian)
    $("#guardian_input").val("");
    var blood_group=$("#blood_group_input").val();
    $("#blood_group_input").val("");
    var emial_id=$("#email_id_input").val();
    $("#email_id_input").val("");
    var address=$("#pat_address_input").val();
    $("#pat_address_input").val("");

    console.log("emial_id",emial_id);

    alert("sss")
    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            "name":JSON.stringify(patient_name),
            "dob":JSON.stringify(dob),
            "gender":JSON.stringify(gender),
            "guardian":JSON.stringify(guardian),
            "phone_number":JSON.stringify(contact_number),
            "address":JSON.stringify(address),
            "blood_group":JSON.stringify(blood_group),
            'email_address':JSON.stringify(emial_id),
            "cnic":JSON.stringify(cnic),
        },
        url: '/save_patient_data',
        success: function(data){
            console.log(data['Success']);
        },
    });
}
function updatePatientData(){
    var patient_id=patient_id_selected;
    var patient_name=$("#pat_name_input").val();
    var contact_number=$("#contact_numb_input").val();
    var gender=$("#gender_select").val();
    var dob=$("#dob_input").val();
    var cnic=$("#cnic_input").val();
    var guardian=$("#guardian_input").val();
    var address=$("#pat_address_input").val();
    var blood_group=$("#blood_group_input").val();
    var emial_id=$("#email_id_input").val();
    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            "patient_id":JSON.stringify(patient_id),
            "patient_name":JSON.stringify(patient_name),
            "dob":JSON.stringify(dob),
            "gender":JSON.stringify(gender),
            "guardian":JSON.stringify(guardian),
            "phone_number":JSON.stringify(contact_number),
            "address":JSON.stringify(address),
            "blood_group":JSON.stringify(blood_group),
            'email_address':JSON.stringify(emial_id),
            "cnic":JSON.stringify(cnic),
        },
        url: '/update_patient_data',
        success: function(data){
            $("#row_div_four").remove();
            $("#row_div_three").remove();
            patient_dict={}
            datatable_list=[]
            console.log("After Update",patient_dict);
            console.log(data['Success']);
        },
    });


    
}
   
function retrievePatientInfo(pat_name,contact_no,cnic_no){
    datatable_lst=[];

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
          "pat_name":pat_name,
        },
        url: '/retireve_patient_info',
        success: function(data){
            console.log("patient_dict",data["patient_dict"])
            patient_dict={}
            patient_dict=JSON.parse(data["patient_dict"])
            for (pat in patient_dict){
                templist=[]
                console.log("pat",pat);
                templist.push(pat)
                templist.push(patient_dict[pat]['name'])
                templist.push(patient_dict[pat]['contact_no'])
                templist.push(patient_dict[pat]['gender'])
                templist.push(patient_dict[pat]['dob'])
                templist.push(patient_dict[pat]['cnic'])
                templist.push(patient_dict[pat]['guardian'])
                templist.push(patient_dict[pat]['address'])
                templist.push(patient_dict[pat]['bloodgroup'])
                templist.push(patient_dict[pat]['email']);
                datatable_list.push(templist)
            }
            createPatientDataTable()

            console.log("patient_dict",patient_dict);
            console.log(datatable_list)
        },
    }); 

}

function viewPatientHistory(){
    $('#main_page_content').empty()
    var container_patient_dashboard= $('#main_page_content').append('<div class="container-fluid" id="container-patient-dashboard"></div>');
    $("#container-patient-dashboard").append("<h2 class ='text-center'>Patient Medical History</h2>");
    $("#container-patient-dashboard").append("<hr class='custom_hr'>");
    var main_row_div= $("<div class='row is-flex'></div>");
    $(container_patient_dashboard).append(main_row_div);

    var main_col_div=$("<div class='col-md-12' id=''></div>");
       
    $(main_row_div).append(main_col_div);
    var row_div=$("<div class='row' id='row_div'></div>");
        var col=$("<div class='col-md-12'></div>");
            var sub_row_div=$("<div class='row' id='sub_row_div_spat'></div>");
                var subcol1=$("<div class='col-md-4'></div>");
                    var rw=$("<div class='row'></div>");
                        var c1=$("<div class='col-md-4'></div>");
                            var label=$("<label>Patient id</label>")
                        var c2=$("<div class='col-md-4'></div>");
                            var input=$("<input id='searchpat_id_input'></input>");
                        c1.append(label);
                        c2.append(input);
                    rw.append(c1);
                    rw.append(c2);
                subcol1.append(rw);
                var subcol2=$("<div class='col-md-4'></div>");
                    var rw=$("<div class='row'></div>");
                        var c1=$("<div class='col-md-4'></div>");
                            var search_button=$("<button onclick='searchPatientMedHistory()'>Search Patient</button>")
                        c1.append(search_button);
                    rw.append(c1);
                subcol2.append(rw)
                
            sub_row_div.append(subcol1);
            sub_row_div.append(subcol2);

        col.append(sub_row_div)
    row_div.append(col)

    var row_div_one=$("<div class='row' id='row_div_one'></div>");


        




            

$(main_col_div).append(row_div);
$(main_col_div).append(row_div_one);

}
function patientHistory(element){
    console.log($(element).attr('value'))
    date_selected=$(element).attr('value')
    
    createPatientHistoryForm();
}
function createPatientHistory_DateList(){
    
    row_div_one=$("#row_div_one");
        var sub_col_one=$("<div class='col-md-4'></div>");
            var row_one__sub_col_one=$("<div class='row'></div>");
                var col__row_one__sub_col_one=$("<div class='col-md-12'></div>");
                    var label=$("<label>Dates Visited</label>");
                col__row_one__sub_col_one.append(label);
            row_one__sub_col_one.append(col__row_one__sub_col_one);

            var row_two__sub_col_one=$("<div class='row'></div>");
                var col__row_two__sub_col_one=$("<div class='col-md-12'></div>");
                    var list_div=$("<div></div>")
                        var ul=$("<ul></ul>")
                        for (date in datelist){
                            var li=$("<li id="+datelist[date]+" onclick='patientHistory($(this))' value="+datelist[date]+">"+datelist[date]+"</li>")
                            ul.append(li);
                        }
                        list_div.append(ul);
                col__row_two__sub_col_one.append(list_div);
            row_two__sub_col_one.append(col__row_two__sub_col_one);

        sub_col_one.append(row_one__sub_col_one);
        sub_col_one.append(row_two__sub_col_one);


        


    
    
    row_div_one.append(sub_col_one);


}
function createPatientHistoryForm(){
    $("#sub_col_two").remove();
    var row_div_one=$("#row_div_one");
    var sub_col_two=$("#sub_col_two");
    var sub_col_two=$("<div class='col-md-8' id='sub_col_two'></div>");
            var row_one__sub_col_two=$("<div class='row'></div>");
                var col__row_one__sub_col_two=$("<div class='col-md-12'></div>");
                    var row_one__col__row_one__sub_col_two=$("<div class='row'></div>");
                        var col_one__row_one__col__row_one__sub_col_two=$("<div class='col-md-2'>")
                        var col_two__row_one__col__row_one__sub_col_two=$("<div class='col-md-3'>")
                            var label=$("<label>Dates Visited</label>");
                            var input=$("<input id='pat_hist_date_vis_inp'value='"+date_selected+"' ></input>");
                        col_one__row_one__col__row_one__sub_col_two.append(label);
                        col_two__row_one__col__row_one__sub_col_two.append(input);
                    row_one__col__row_one__sub_col_two.append(col_one__row_one__col__row_one__sub_col_two)
                    row_one__col__row_one__sub_col_two.append(col_two__row_one__col__row_one__sub_col_two)
                col__row_one__sub_col_two.append(row_one__col__row_one__sub_col_two);
            row_one__sub_col_two.append(col__row_one__sub_col_two);

            var row_two__sub_col_two=$("<div class='row'></div>");
                var col__row_two__sub_col_two=$("<div class='col-md-12'></div>");
                    var row_one__col__row_two__sub_col_two=$("<div class='row'></div>");
                        var col_one__row_one__col__row_two__sub_col_two=$("<div class='col-md-2'>")
                        var col_two__row_one__col__row_two__sub_col_two=$("<div class='col-md-3'>")
                            var label=$("<label>B.P</label>");
                            var input=$("<input id='pat_hist_bp_inp'  value='"+pat_med_history_dict[date_selected]['blood_pressure']+"'></input>");
                        col_one__row_one__col__row_two__sub_col_two.append(label);
                        col_two__row_one__col__row_two__sub_col_two.append(input);
                    row_one__col__row_two__sub_col_two.append(col_one__row_one__col__row_two__sub_col_two)
                    row_one__col__row_two__sub_col_two.append(col_two__row_one__col__row_two__sub_col_two)
                col__row_two__sub_col_two.append(row_one__col__row_two__sub_col_two);
            row_two__sub_col_two.append(col__row_two__sub_col_two);
            var row_three_sub_col_three=$("<div class='row'></div>");
                var col__row_three_sub_col_three=$("<div class='col-md-12'></div>");
                    var row_one__col__row_three_sub_col_three=$("<div class='row'></div>");
                        var col_one__row_one__col__row_three_sub_col_three=$("<div class='col-md-12'>")
                            var table=$('<table id="prescription_table" class="display" width="100%"></table>');
                        col_one__row_one__col__row_three_sub_col_three.append(table);
                    row_one__col__row_three_sub_col_three.append(col_one__row_one__col__row_three_sub_col_three);
                col__row_three_sub_col_three.append(row_one__col__row_three_sub_col_three);
            row_three_sub_col_three.append(col__row_three_sub_col_three);




        sub_col_two.append(row_one__sub_col_two);                 
        sub_col_two.append(row_two__sub_col_two);  
        sub_col_two.append(row_three_sub_col_three);  


    row_div_one.append(sub_col_two);

    $(function(){
        prescription_datatable=$("#prescription_table").DataTable({
            data:pat_med_history_dict[date_selected]['prescription'],
            columns: [
                
                { title: "Medicine Name" },
                { title: "Weight(mg)" },
             
               


                ],
                paging: false,
                scrollY: 200,
                scrollX: true,
                ordering: true,
                info:false,
    
            });    
        });         

}
function searchPatientMedHistory(){
    var patient_id=$("#searchpat_id_input").val();
    console.log("patient_id",patient_id)
    if ($("#row_div_one")!==undefined){
        $("#row_div_one").empty();
        if (prescription_datatable!==undefined){
            prescription_datatable.destroy();
        }
    }
    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
          "patient_id":patient_id,
        },
        url: '/retireve_patient_med_history',
        success: function(data){
            datelist=data['datelist'];
            pat_med_history_dict=data['pat_med_history_dict']
            console.log("pat_med_history_dict",pat_med_history_dict)
            createPatientHistory_DateList()
        }
    });
}
function printPatientPrescription(){
    $('#main_page_content').empty()
    var container_patient_prescription= $('#main_page_content').append('<div class="container-fluid" id="container-patient-prescription"></div>');
    $("#container-patient-prescription").append("<h2 class ='text-center'>R M C</h2>");
    $("#container-patient-prescription").append("<hr class='custom_hr'>");

    var main_row_div= $("<div class='row is-flex'></div>");

    $(container_patient_prescription).append(main_row_div);
    var main_col_div=$("<div class='col-md-12' id=''></div>");
       
    $(main_row_div).append(main_col_div);

    var row_div_one=$("<div class='row'></div>");
            // Print button
            var col_one__row_div_one=$("<div class='col-md-6'></div>");
                row__col_one__row_div_one=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-4'></div>")
                    colmd2=$("<div class='col-md-4'></div>")
                    colmd3=$("<div class='col-md-4'></div>")


                    print_patient_pres_a=$("<a>print</a>")
                    print_patient_pres_a.attr('href','/print_patient_prescription')
                    colmd2.append(print_patient_pres_a)

                row__col_one__row_div_one.append(colmd2);
            col_one__row_div_one.append(row__col_one__row_div_one);

    $(row_div_one).append(col_one__row_div_one);

$(main_col_div).append(row_div_one);

}

function printPatientPres(){
    
    

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


