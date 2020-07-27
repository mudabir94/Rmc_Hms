// Functions for populating html to employee page content.
var blood_group_list=["---",'A+ve','A-ve', 'B+ve','B-ve','O+ve','O-ve','AB+ve','AB-ve'];
var patient_info_dict={}

var patient_id_selected=0;
var date_selected=''
var patient_dict={};
var datelist=[]
var pat_med_history_dict={}

var datatable_list=[]
var allPatient_list=[]
var pat_type_list=['Outdoor','Emergency','Indoor'];
var ward_type_list=['Room','Ward'];
var datatable_desp_med_list=[];
var datatable_patient_billlist=[];
var despid='';

var ward_dict;
var ward_id_selected=0;
var ward_list=[];

var room_dict;
var room_id_selected=0;
var room_list=[]
var dspstck_dict={}
var presData={}
var token_Number;
var optionSelected;
var procedure_data=[];
var pbr_dict={}

var prescription_datatable;
var pat_datatable;
var allPat_datatable;
var room_datatable;
var bill_datatable;
var despmed_datatable;
var ward_datatable;
var view_pres_datatable;

$(document).ready(function() {
    $("#reset-token-dialog").hide();
    retrieveProcedureDetails();
    
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
function retrieveProcedureDetails(){
    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {},
        url: '/retrieve_procedure_details',
        success: function(data){
            procedure_data =data['procedure_list']
            for (var i in procedure_data){
                console.log("procedure_list",procedure_data[i])
            
            }
            
        }
    });
   
}
function addPatient(){
    $("#reset-token-dialog").hide()
    $('#main_page_content').empty()
    var container_patient_dashboard= $('#main_page_content').append('<div class="container-fluid" id="container-patient-dashboard"></div>');
    $("#container-patient-dashboard").append("<h2 class ='center_h_tag_forms'>Patient Information</h2>");
    $("#container-patient-dashboard").append("<hr class='custom_hr'>");
    // $("#container-patient-dashboard").append("<h5>Please fill in the form below</h5>");
    var main_row_div= $("<div class='row is-flex'></div>");

    $(container_patient_dashboard).append(main_row_div);
    var main_col_div=$("<div class='col-md-10' id='add_patient_form_div'></div>");
       
    $(main_row_div).append(main_col_div);

    var row_div_one=$("<div class='row' style='padding-top:10px;'></div>");
            // Patient Name
            var col_one__row_div_one=$("<div class='col-md-6'></div>");
                row__col_one__row_div_one=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-4'></div>")
                    colmd2=$("<div class='col-md-6'></div>")

                    pat_name_label=$("<label for='emp_name_tag' class='custom_label_css font-weight-bold'>Patient Name</label>");
                    colmd1.append(pat_name_label)
                    pat_name_input=$("<input class='form-control-custom' id='pat_name_input' class='custom_input_css'>")
                    colmd2.append(pat_name_input)

                row__col_one__row_div_one.append(colmd1);
                row__col_one__row_div_one.append(colmd2);
            col_one__row_div_one.append(row__col_one__row_div_one);

            // Contact Number

            var col_two__row_div_one=$("<div class='col-md-6'></div>");
                var row__col_two__row_div_one=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-4'></div>")
                    colmd2=$("<div class='col-md-6'></div>")

                    contact_type_label=$("<label class='custom_label_css font-weight-bold'>Contact Number</label>");
                    colmd1.append(contact_type_label);
                    contact_type_input=$("<input class='form-control-custom' autocomplete='off' id='contact_numb_input'  maxlength='12' oninput='contactNumPatInfoOnInput($(this))'  placeholder='xxxx-xxxxxxx'></input>")
                    colmd2.append(contact_type_input);

                row__col_two__row_div_one.append(colmd1)
                row__col_two__row_div_one.append(colmd2)
            col_two__row_div_one.append(row__col_two__row_div_one)

            $(row_div_one).append(col_one__row_div_one);
            $(row_div_one).append(col_two__row_div_one);

        var row_div_two=$("<div class='row' style='padding-top: 15px; padding-bottom: 15px;'></div>");
            // Gender
            var col_one__row_div_two=$("<div class='col-md-12'></div>");
                var row__col_one__row_div_two=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-2'></div>")
                    colmd2=$("<div class='col-md-2'></div>")
                    colmd3=$("<div class='col-md-1'></div>")
                    colmd4=$("<div class='col-md-3'  id='datetimepicker1'></div>")
                    colmd5=$("<div class='col-md-1'></div>")
                    colmd6=$("<div class='col-md-2'></div>")

                    gender_label=$("<label class='custom_label_css font-weight-bold'>Gender</label>");
                    colmd1.append(gender_label)
                    gender_input=$("<input class='form-control-custom' id='gender_select'  autocomplete='off' class='custom_input_css'>")
                    colmd2.append(gender_input)
            // DOB
                    dob_label=$("<label class='custom_label_css font-weight-bold'>DOB </label>");
                    colmd3.append(dob_label);
                    dob_input=$("<input class='form-control-custom custom_input_css'   autocomplete='off' id='dob_input'></input>")
                    colmd4.append(dob_input);
                    
            // Age
                    age_label=$("<label class='custom_label_css font-weight-bold'>AGE </label>");
                    colmd5.append(age_label);
                    age_input=$("<input class='form-control-custom custom_input_css' type='number' min='1' id='age_input'></input>")
                    colmd6.append(age_input)







                

                row__col_one__row_div_two.append(colmd1);
                row__col_one__row_div_two.append(colmd2);
                row__col_one__row_div_two.append(colmd3);
                row__col_one__row_div_two.append(colmd4);
                row__col_one__row_div_two.append(colmd5);
                row__col_one__row_div_two.append(colmd6);

            col_one__row_div_two.append(row__col_one__row_div_two);
        row_div_two.append(col_one__row_div_two);
        
    // CNIC
        row_div_six=$("<div class='row' style='padding-bottom: 15px;'></div>");
            var col_one__row_div_six=$("<div class='col-md-6'></div>");
                    var row__col_one__row_div_six=$("<div class='row'></div>");
                        colmd1=$("<div class='col-md-4'></div>")
                        colmd2=$("<div class='col-md-6'></div>")

                        cnic_label=$("<label class='custom_label_css  autocomplete='off' font-weight-bold'>CNIC/Guardian CNIC</label>");
                        colmd1.append(cnic_label);
                        cnic_input=$("<input class='form-control-custom' id='cnic_input' oninput='cnicNumPatInfoOnInput($(this))' maxlength='15' class='custom_input_css' placeholder='xxxxx-xxxxxxx-x' ></input>")
                        colmd2.append(cnic_input);

                    row__col_one__row_div_six.append(colmd1)
                    row__col_one__row_div_six.append(colmd2)
                col_one__row_div_six.append(row__col_one__row_div_six)

        row_div_six.append(col_one__row_div_six);


        var row_div_three=$("<div class='row' style='padding-bottom: 15px;''></div>");
                // Guardian
            var col_one__row_div_three=$("<div class='col-md-6'></div>");
                row__col_one__row_div_three=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-4'></div>")
                    colmd2=$("<div class='col-md-6'></div>")

                    guardian_name_label=$("<label for='emp_name_tag' class='custom_label_css font-weight-bold'>Guardian Name</label>");
                    colmd1.append(guardian_name_label)
                    guardian_name_input=$("<input class='form-control-custom' id='guardian_input' class='custom_input_css' ></input>")
                    colmd2.append(guardian_name_input);

                row__col_one__row_div_three.append(colmd1);
                row__col_one__row_div_three.append(colmd2);
                col_one__row_div_three.append(row__col_one__row_div_three);
        
            // Address
            var col_two__row_div_three=$("<div class='col-md-6'></div>");
                row__col_two__row_div_three=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-4'></div>")
                    colmd2=$("<div class='col-md-6'></div>")

                        address_label=$("<label for='pat_address_tag' class='custom_label_css font-weight-bold'>Address</label>");
                    colmd1.append(address_label)
                        pat_address_input=$("<input class='form-control-custom' id='pat_address_input' class='custom_input_css'>")
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
        
                            blood_group_label=$("<label for='blood_group_tag' class='custom_label_css font-weight-bold'>Blood group</label>");
                            colmd1.append(blood_group_label)
                            
                            var select=$("<select id='blood_group_input' class='form-control-custom'></select>");
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
        
                            email_id_label=$("<label class='custom_label_css font-weight-bold'>Email Address</label>");
                            colmd1.append(email_id_label);
                            email_id_input=$("<input class='form-control-custom' id='email_id_input' class='custom_input_css'></input>")
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
                    colmd2=$("<div class='col-md-4 offset-md-2'></div>")
                    colmd3=$("<div class='col-md-2'></div>")

                        savePatientdataForm_button=$('<button class="save_btn fa fa-save  " onclick="savePatientData()"> Save</button>')
                    colmd2.append(savePatientdataForm_button)
                    
                    row__col_two__row_div_five.append(colmd1)
                    row__col_two__row_div_five.append(colmd2)
                    row__col_two__row_div_five.append(colmd3)
            col_two__row_div_five.append(row__col_two__row_div_five)

        $(row_div_five).append(col_two__row_div_five);

    $(main_col_div).append(row_div_one);
    $(main_col_div).append(row_div_two);
    $(main_col_div).append(row_div_six);

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
                ageFocusIn(value)
            }

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

function ageFocusIn(val){
    dob=val
    $("#age_input").focus();
    dob=dob.split('-')
    console.log("DOB",dob)
    today_date = new Date();
    today_year = today_date.getFullYear();
    today_month = today_date.getMonth();
    today_day = today_date.getDate();
    birth_year=parseInt(dob[0]);
    birth_month=parseInt(dob[1]);
    birth_day=parseInt(dob[2]);

    age = today_year - birth_year;
    if ( today_month < (birth_month - 1))
    {
        age--;
    }
    if (((birth_month - 1) == today_month) && (today_day < birth_day))
    {
        age--;
    }
    $("#age_input").val(age)
}

function EditPatient(){
    $('#main_page_content').empty()
    var container_patient_dashboard= $('#main_page_content').append('<div class="container-fluid" id="container-patient-dashboard"></div>');
    $("#container-patient-dashboard").append("<h2 class ='center_h_tag_forms'>Edit Patient Information</h2>");
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

                    pat_name_label=$("<label for='emp_name_tag' class='custom_label_css float-right'>Patient Name</label>");
                    colmd1.append(pat_name_label)

                    pat_name_input=$("<input class='form-control-custom' id='search_pat_name_input' class='custom_input_css'>")

                    colmd2.append(pat_name_input)

                row__col_one__row_div_one.append(colmd1);
                row__col_one__row_div_one.append(colmd2);
            col_one__row_div_one.append(row__col_one__row_div_one);


            // Contact Number

            var col_two__row_div_one=$("<div class='col-md-4'></div>");
                var row__col_two__row_div_one=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-5'></div>")
                    colmd2=$("<div class='col-md-6'></div>")

                    contact_type_label=$("<label class='custom_label_css float-right'>Contact Number</label>");
                    colmd1.append(contact_type_label);
                    contact_type_input=$("<input class='form-control-custom custom_input_css' id='search_contact_numb_input' maxlength='12'  oninput='searchContactNumPatInfoOnEdit($(this))' placeholder='xxxx-xxxxxxx'></input>")
                    colmd2.append(contact_type_input);

                row__col_two__row_div_one.append(colmd1)
                row__col_two__row_div_one.append(colmd2)
            col_two__row_div_one.append(row__col_two__row_div_one)

            var col_three__row_div_one=$("<div class='col-md-4'></div>");
                var row__col_three__row_div_one=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-7'></div>")
                        var search_button=$('<button class="search_patient_btn fa fa-search" onclick="searchPatient()">Search Patient</button>')
                    colmd1.append(search_button)

                row__col_three__row_div_one.append(colmd1)
            col_three__row_div_one.append(row__col_three__row_div_one)

        $(row_div_one).append(col_one__row_div_one);
        $(row_div_one).append(col_two__row_div_one);
        $(row_div_one).append(col_three__row_div_one);

    $(main_col_div).append(row_div_one);

  
}

function editPatientRowDivThreeCreation(){
    var main_col_div=$("#main_col_div");
    var row_div_three=$("<div class=' show_patients_table_genpres_form' id='row_div_three'></div>");
    // Datatable Name
        var col_one__row_div_three=$("<div class='col-md-12'></div>");
            var row__col_one__row_div_three=$("<div class='row'></div>");
                var colmd1=$("<div class='col-md-12'></div>")
                    var table=$('<table id="patient_table" class="datatable_pat" width="100%"></table>')
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

    var pat_name=$("#search_pat_name_input").val().toLowerCase();
    var contact_no=$("#search_contact_numb_input").val();
    if (pat_datatable!==undefined){
        pat_datatable.destroy();
    }
    id="1"
    retrievePatientInfo(pat_name,contact_no,id)

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
                { title: 'Gender' },
                { title: "DOB" },
                { title: "AGE" },

                { title: "CNIC" },
                { title: "Guardian" },
                { title: "Address" },
                { title: "BloodGroup" },
                { title: "Email" },

                ],
                columnDefs: [
                    { width: '2%', targets: 0 },
                    // { "width": "98%", "targets": "_all" },

                    // { "width": "2%", "targets": 0 },
                    // { "width": "18.5%", "targets": 1 },
                    // { "width": "7.5%", "targets": 2 },
                    // { "width": "1%", "targets": 3 },
                    // { "width": "7%", "targets": 4 },
                    // { "width": "7%", "targets": 5 },

                    // { "width": "11.5%", "targets": 6 },
                    // { "width": "14%", "targets": 7 },
                    // { "width": "21.5%", "targets": 8 },
                    // { "width": "1%", "targets": 9 },
                    // { "width": "15%", "targets": 19 },
                   ],
                paging: true,
                pageLength: 10,
                scrollY: 200,
                scrollX: true,
                ordering: true,
                info:false,
                searching:true,
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'print',
                        text: ' PRINT',
                        title: 'Patient Data',
                        className: 'datatable_button printbtn fas fa-print',
                    },
                     {
                        extend: 'excel',
                        text: ' EXCEL',
                        title: 'Patient Data',
                        className: 'datatable_button excelbtn  fas fa-file-excel',

                    },
                     {
                        extend: 'csv',
                        text: ' CSV',
                        title: 'Patient Data',
                        className: 'datatable_button csvbtn fas fa-file',

                    },
                    {
                        extend: 'pdf',
                        text: ' PDF',
                        title: 'Patient Data',
                        className: 'datatable_button pdfbtn fas fa-file-pdf',

                    },
                 
                ],
    
            });
            $('#patient_table tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                }
                else{
                    patient_id_selected=$(this).find('td').eq(0).text()

                    $("#row_div_four").remove();
                  
                    
                    pat_datatable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    console.log("Patient dict on click",patient_dict);
                    var row_div_four=$("<div class='edit_patient_form_div' id='row_div_four' style='transform: rotate(270deg) ;transform-origin:50% 100%;transform:scaleX(1);'></div>");
                        var main_subcol=$("<div class='col-md-12'></div>");

                            var subrow_one=$("<div class='row' style='padding-top: 10px; padding-bottom: 10px;'></div>")

                                    var col_one__subrow_one=$("<div class='col-md-6'></div>");
                                            row__col_one__subrow_one=$("<div class='row'></div>");
                                                var colmd1=$("<div class='col-md-4'></div>")
                                                var colmd2=$("<div class='col-md-6'></div>")
                                                    var pat_name_label=$("<label for='emp_name_tag' class='custom_label_css'>Patient Name</label>");
                                                    var pat_name_input=$("<input class='form-control-custom' id='pat_name_input' class='custom_input_css' value='"+patient_dict[patient_id_selected]['name'].toUpperCase()+"' >")
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
                                                var contact_type_input=$("<input class='form-control-custom' id='contact_numb_edit' maxlength='12'  oninput='contactNumPatInfoOnEdit($(this))' class='custom_input_css' placeholder='xxxx-xxxxxxx' value='"+patient_dict[patient_id_selected]['contact_no']+"'></input>")
                                            colmd1.append(contact_type_label);
                                            colmd2.append(contact_type_input);
                        
                                        row__col_two__subrow_one.append(colmd1)
                                        row__col_two__subrow_one.append(colmd2)
                                    col_two__subrow_one.append(row__col_two__subrow_one)                   

                            subrow_one.append(col_one__subrow_one)
                            subrow_one.append(col_two__subrow_one)


                        var subrow_two=$("<div class='row' style='padding-top: 10px; padding-bottom: 10px;'></div>")
                            var col_one_subrow_two=$("<div class='col-md-12'></div>");
                                var row__col_one_subrow_two=$("<div class='row'></div>");
                                    colmd1=$("<div class='col-md-2'></div>")
                                    colmd2=$("<div class='col-md-2'></div>")
                                    colmd3=$("<div class='col-md-1'></div>")
                                    colmd4=$("<div class='col-md-3'  id='datetimepicker2'></div>")
                                    colmd5=$("<div class='col-md-1'></div>")
                                    colmd6=$("<div class='col-md-3'></div>")


                                        var pat_gender_label=$("<label class='custom_label_css'>Gender</label>");
                                        var pat_gender_input=$("<input class='form-control-custom' id='gender_edit' class='custom_input_css' value='"+patient_dict[patient_id_selected]['gender'].toUpperCase()+"' >")
                                    colmd1.append(pat_gender_label)
                                    colmd2.append(pat_gender_input)
                                   
                                        var dob_label=$("<label class='custom_label_css'>DOB</label>");
                                        var dob_input=$("<input class='form-control-custom' id='dob_edit' class='custom_input_css' value='"+patient_dict[patient_id_selected]['dob']+"' ></input>")
                                    colmd3.append(dob_label);
                                    colmd4.append(dob_input);

                                        var age_label=$("<label class='custom_label_css'>AGE</label>");
                                        var age_input=$("<input class='form-control-custom' type='number' id='age_edit' class='custom_input_css' value='"+patient_dict[patient_id_selected]['age']+"' ></input>")
                                    colmd5.append(age_label);
                                    colmd6.append(age_input);


                        
                                row__col_one_subrow_two.append(colmd1);
                                row__col_one_subrow_two.append(colmd2);
                                row__col_one_subrow_two.append(colmd3);
                                row__col_one_subrow_two.append(colmd4);
                                row__col_one_subrow_two.append(colmd5);
                                row__col_one_subrow_two.append(colmd6);
                        
                            col_one_subrow_two.append(row__col_one_subrow_two);
                        subrow_two.append(col_one_subrow_two)

                        var subrow_six=$("<div class='row' style='padding-top: 10px; padding-bottom: 10px;'></div>");    
                            var col_one_subrow_six=$("<div class='col-md-6'></div>");
                                var row__col_one_subrow_six=$("<div class='row'></div>");
                                    var colmd1=$("<div class='col-md-4'></div>")
                                    var colmd2=$("<div class='col-md-6'></div>")
                                        var cnic_label=$("<label class='custom_label_css'>CNIC/Guardian CNIC</label>");
                                        var cnic_input=$("<input class='form-control-custom' id='cnic_edit' oninput='cnicNumPatInfoOnEdit($(this))' maxlength='15' class='custom_input_css' placeholder='xxxxx-xxxxxxx-x' value='"+patient_dict[patient_id_selected]['cnic']+"'></input>")
                                    colmd1.append(cnic_label);
                                    colmd2.append(cnic_input);
            
                                row__col_one_subrow_six.append(colmd1)
                                row__col_one_subrow_six.append(colmd2)
                            col_one_subrow_six.append(row__col_one_subrow_six)

                        subrow_six.append(col_one_subrow_six)

                        var subrow_three=$("<div class='row' style='padding-top: 10px; padding-bottom: 10px;'></div>")
                            var col_one__subrow_three=$("<div class='col-md-6'></div>");
                                var row__col_one__subrow_three=$("<div class='row'></div>");
                                    var colmd1=$("<div class='col-md-4'></div>")
                                    var colmd2=$("<div class='col-md-6'></div>")
                                    var guradian_name=patient_dict[patient_id_selected]['guardian']
                                    console.log("selected guardian",guradian_name)

                                        var guardian_name_label=$("<label  class='custom_label_css'>Guardian Name</label>");
                                        var guardian_name_input=$("<input  class='form-control-custom' id='guardian_edit' class='custom_input_css' value='"+guradian_name.toUpperCase()+"' ></input>")
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
                                        var pat_address_input=$("<input class='form-control-custom' id='pat_address_edit' class='custom_input_css' value='"+patient_dict[patient_id_selected]['address'].toUpperCase()+"'>")
                                    colmd1.append(address_label)
                                    colmd2.append(pat_address_input)
                    
                                row__col_two__subrow_three.append(colmd1);
                                row__col_two__subrow_three.append(colmd2);
                            col_two__subrow_three.append(row__col_two__subrow_three);

                        subrow_three.append(col_one__subrow_three)
                        subrow_three.append(col_two__subrow_three)

                        var subrow_four=$("<div class='row' style='padding-top: 10px; padding-bottom: 10px;'></div>")
                            var col_one__subrow_four=$("<div class='col-md-6'></div>");
                                var row__col_one__subrow_four=$("<div class='row'></div>");
                                    var colmd1=$("<div class='col-md-4'></div>")
                                    var colmd2=$("<div class='col-md-6'></div>")
            
                                        blood_group_label=$("<label for='blood_group_tag' class='custom_label_css'>Blood group</label>");
                                        bloodgroup_input=$("<input class='form-control-custom' id='blood_group_edit' class='custom_input_css' value='"+patient_dict[patient_id_selected]['bloodgroup'].toUpperCase()+"'>")
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
                                        var email_id_input=$("<input class='form-control-custom' id='email_id_edit' class='custom_input_css' value='"+patient_dict[patient_id_selected]['email']+"'></input>")
                                    colmd1.append(email_id_label);
                                    colmd2.append(email_id_input);
                
                                row__col_two__subrow_four.append(colmd1)
                                row__col_two__subrow_four.append(colmd2)
                            col_two__subrow_four.append(row__col_two__subrow_four)

                        subrow_four.append(col_one__subrow_four);
                        subrow_four.append(col_two__subrow_four);

                        var subrow_five=$("<div class='row' style='padding-top: 10px; padding-bottom: 10px;'>")
                            var col_one__subrow_five=$("<div class='col-md-12'></div>");
                                var row__col_one__subrow_five=$("<div class='row'></div>");
                                    var colmd1=$("<div class='col-md-2'></div>")
                                    var colmd2=$("<div class='col-md-4 offset-md-2'></div>")
                                        var updatePatientdataForm_button=$('<button class="update_patient_info_btn" onclick="updatePatientData()">Update</button>')
                                    colmd2.append(updatePatientdataForm_button)
                                row__col_one__subrow_five.append(colmd1)
                                row__col_one__subrow_five.append(colmd2)
                            col_one__subrow_five.append(row__col_one__subrow_five)
                        subrow_five.append(col_one__subrow_five);

                        
                    main_subcol.append(subrow_one)
                    main_subcol.append(subrow_two)
                    main_subcol.append(subrow_six)
                    main_subcol.append(subrow_three)
                    main_subcol.append(subrow_four)
                    main_subcol.append(subrow_five)



                row_div_four.append(main_subcol)
        var main_col_div=$("#main_col_div");
        main_col_div.append(row_div_four)
                 
            $('#dob_edit').datepicker({
                uiLibrary: 'bootstrap4',
                // dateFormat: "yy-mm-dd",
                format: 'yyyy-mm-dd',
                modal: true,
                close: function (e) {
                    value=e["target"]['value']
                    ageEditFocusIn(value)
                },
                // icons: {
                //     rightIcon: '<span class="glyphicon glyphicon-th"></span>'
                // },

            });
    
            }
            // Scroll to bill div
            $('html,body').animate({
                scrollTop: $(".edit_patient_form_div").offset().top},
                'slow');
            
        });
    });
}
function ageEditFocusIn(val){
    dob=val
    $("#age_edit").focus();
    dob=dob.split('-')
    console.log("DOB",dob)
    today_date = new Date();
    today_year = today_date.getFullYear();
    today_month = today_date.getMonth();
    today_day = today_date.getDate();
    birth_year=parseInt(dob[0]);
    birth_month=parseInt(dob[1]);
    birth_day=parseInt(dob[2]);

    age = today_year - birth_year;
    if ( today_month < (birth_month - 1))
    {
        age--;
    }
    if (((birth_month - 1) == today_month) && (today_day < birth_day))
    {
        age--;
    }
    $("#age_edit").val(parseInt(age))
}

function savePatientData(){
    var patient_name=$("#pat_name_input").val();
    console.log("patient_name", patient_name);
    patient_name=patient_name.toLowerCase();

    var contact_number=$("#contact_numb_input").val();
    if (patient_name===""){
        alert("Please Enter Patient Name")
        return;
    }
    if ( contact_number===""){
        alert("Please Enter Contact Number")
        return;
    }

    
    var gender=$("#gender_select").val();
    gender=gender.toLowerCase();
    console.log("gender", gender);
    var dob=$("#dob_input").val();

    // if ( dob===""){
    //     alert("Please Enter Date of Birth ")
    //     return;
    // }
    var cnic=$("#cnic_input").val();
    var guardian=$("#guardian_input").val();
    console.log("guardian", guardian)
    guardian=guardian.toLowerCase();
    var blood_group=$("#blood_group_input").val();
    if (blood_group!=="---" || blood_group!=="" ) {
        blood_group=blood_group.toLowerCase();
    }
    
    var emial_id=$("#email_id_input").val();
    var address=$("#pat_address_input").val();
    address=address.toLowerCase();
    age=$("#age_input").val();
    console.log("emial_id",emial_id);

    $('.modal-loading').show();

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
            "age":age,
        },
        url: '/save_patient_data',
        success: function(data){
            if (data['data']==="InValid"){
                alert("Please Remove Special Characters")
                $('.modal-loading').hide();
                return
            }
            if (data['cnpn_data']==="InValid"){
                alert("Please Remove Space Or Special Characters")
                $('.modal-loading').hide();
                return
            }
            console.log(data['Success']);
            alert("Patient Successfully Added")
            $("#pat_name_input").val("");
            $("#contact_numb_input").val("")
            $("#age_input").val("");
            $("#pat_address_input").val("");
            $("#blood_group_input").val("---");
            $("#guardian_input").val("");
            $("#cnic_input").val("");
            $("#gender_select").val("");
            $("#dob_input").val("");
            $('.modal-loading').hide();







        },
    });
}
function viewAllPatients(){
    $('#main_page_content').empty()
    var container_view_all_pateints_dashboard= $('#main_page_content').append('<div class="container-fluid" id="container-view-all-patient-dashboard"></div>');
    $("#container-view-all-patient-dashboard").append("<h2 class ='center_h_tag_forms'>Patients List</h2>");
    $("#container-view-all-patient-dashboard").append("<hr class='custom_hr'>");
    var main_row_div= $("<div class='row is-flex'></div>");

        $(container_view_all_pateints_dashboard).append(main_row_div);
        var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");
            var row_div_one=$("<div class='row' id='row_div_one'></div>");
                var col_one__row_div_one=$("<div class='col-md-12'></div>");
                    var row__col_one__row_div_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-12'></div>")
                            var all_patient_table=$('<table id="all_patient_table" class="datatable_pat" width="100%"></table>')
                        colmd1.append(all_patient_table)
                    row__col_one__row_div_one.append(colmd1);
                col_one__row_div_one.append(row__col_one__row_div_one);
            $(row_div_one).append(col_one__row_div_one);
        main_col_div.append(row_div_one)
       
    $(main_row_div).append(main_col_div);
    retrieveAllPatientInfo();
}
function retrieveAllPatientInfo(){
    allPatient_list=[];
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
        },
        url: '/retrieve_all_patient_info',
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
                allPatient_list.push(templist)
            }
            createAllPatientDataTable()
            console.log("patient_dict",patient_dict);
            console.log(allPatient_list)
            $('.modal-loading').hide();

        },
    }); 
}

function createAllPatientDataTable(){
    console.log("allPatient_list",allPatient_list)
    $(function(){
        allPat_datatable=$("#all_patient_table").DataTable({
            data:allPatient_list,
            columns: [
                { title: "Id" },
                { title: "Patient Name" },
                { title: "Contact" },
                { title: 'Gender' },
                { title: "DOB" },
                { title: "CNIC" },
                { title: "Guardian" },
                { title: "Address" },
                { title: "Blood Group" },
                { title: "Email" },
                ],
                paging: true,
                // lengthMenu: [ 10, 25, 50, 'Show all'],
                // length:5,
                scrollY: false,
                scrollX: true,
                ordering: true,
                info:false,
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'print',
                        text: ' Print',
                        title: 'Patient Data',
                        className: 'datatable_button printbtn fas fa-print',

                    },
                     {
                        extend: 'excel',
                        text: ' EXCEL',
                        title: 'Patient Data',
                        className: 'datatable_button excelbtn fas fa-file-excel',

                    },
                     {
                        extend: 'csv',
                        text: ' CSV',
                        title: 'Patient Data',
                        className: 'datatable_button csvbtn fas fa-file',

                    },
                    {
                        extend: 'pdf',
                        text: ' PDF',
                        title: 'Patient Data',
                        className: 'datatable_button pdfbtn fas fa-file-pdf',

                    },
                  
                ],
    
            });
            $('#all_patient_table tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    alert("clicked same entry")
                }
                else{
                    patient_id_selected=$(this).find('td').eq(0).text()

                    $("#row_div_two").remove();
                    
                    allPat_datatable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    console.log("Patient dict on click",patient_dict);
                    var row_div_two=$("<div class='edit_patient_form_div' id='row_div_two'></div>");
                        var main_subcol=$("<div class='col-md-12'></div>");

                            var subrow_six=$("<div class='row' id='rmc_logo_div' style='padding-bottom:10px; padding-top:20px; display:none;'></div>")
                                var col_one__subrow_six=$("<div class='col-md-12'></div>");
                                    row__col_one__subrow_six=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-12 text-center'></div>")
                                            var rmc_label=$("<label for='rmc_tag' class='custom_label_css'><h2>Rafiq Medical Center</h2></label>");
                                        colmd1.append(rmc_label)
                                    row__col_one__subrow_six.append(colmd1);
                                col_one__subrow_six.append(row__col_one__subrow_six);  
                            subrow_six.append(col_one__subrow_six)

                            var subrow_zero=$("<div class='row' style='padding-bottom:10px'></div>")
                                var col_one__subrow_zero=$("<div class='col-md-5 offset-md-1'></div>");
                                    row__col_one__subrow_zero=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-12'></div>")
                                            var head_label=$("<label for='head_tag' class='custom_label_css'><h3>Patient Details</h3></label>");
                                        colmd1.append(head_label)
                                    row__col_one__subrow_zero.append(colmd1);
                                col_one__subrow_zero.append(row__col_one__subrow_zero);                 
                            subrow_zero.append(col_one__subrow_zero)

                            var subrow_one=$("<div class='row' style='padding-bottom:10px'></div>")

                                var col_one__subrow_one=$("<div class='col-md-6'></div>");
                                    row__col_one__subrow_one=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-4 text-right'></div>")
                                        var colmd2=$("<div class='col-md-4'></div>")
                                            var pat_name_label=$("<label for='pat_name_tag' class='custom_label_css font-weight-bold'>Patient Name</label>");
                                            var pat_name_input=$("<label id='pat_name_input'class='custom_label_css' >"+patient_dict[patient_id_selected]['name']+"</label>")
                                        colmd2.append(pat_name_input)
                                        colmd1.append(pat_name_label)
                                    row__col_one__subrow_one.append(colmd1);
                                    row__col_one__subrow_one.append(colmd2);
                                col_one__subrow_one.append(row__col_one__subrow_one);                 

                                var col_two__subrow_one=$("<div class='col-md-6'></div>");
                                    row__col_two__subrow_one=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-4 text-right'></div>")
                                        var colmd2=$("<div class='col-md-4'></div>")
                                            var patID_label=$("<label class='custom_label_css font-weight-bold'>Patient ID</label>");
                                            var patID_input=$("<label class='custom_label_css'>"+patient_id_selected+"</label>")
                                        colmd1.append(patID_label);
                                        colmd2.append(patID_input);
                                    row__col_two__subrow_one.append(colmd1);
                                    row__col_two__subrow_one.append(colmd2);
                                col_two__subrow_one.append(row__col_two__subrow_one);
                                
                            subrow_one.append(col_one__subrow_one)
                            subrow_one.append(col_two__subrow_one)

                            var subrow_two=$("<div class='row' style='padding-bottom:10px'></div>")
                                
                                var col_one__subrow_two=$("<div class='col-md-6'></div>");
                                    var row__col_one__subrow_two=$("<div class='row'></div>");
                                        colmd1=$("<div class='col-md-4 text-right'></div>")
                                        colmd2=$("<div class='col-md-4'></div>")
                            
                                            var pat_gender_label=$("<label class='custom_label_css font-weight-bold'>Gender</label>");
                                        colmd1.append(pat_gender_label)
                                            var pat_gender_input=$("<label class='custom_label_css'>"+patient_dict[patient_id_selected]['gender']+"</label>")
                                        colmd2.append(pat_gender_input)                                        
                                            
                                    row__col_one__subrow_two.append(colmd1);
                                    row__col_one__subrow_two.append(colmd2);
                                col_one__subrow_two.append(row__col_one__subrow_two);
                                
                                var col_two__subrow_two=$("<div class='col-md-6'></div>");
                                    var row__col_two__subrow_two=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-4 text-right'></div>")
                                        var colmd2=$("<div class='col-md-4'></div>")
                                            var dob_label=$("<label class='custom_label_css font-weight-bold'>Date of Birth</label>");
                                            var dob_input=$("<label class='custom_label_css' id='dob_input'>"+patient_dict[patient_id_selected]['dob']+"</label>")
                                        colmd1.append(dob_label);
                                        colmd2.append(dob_input);                              
                                    row__col_two__subrow_two.append(colmd1);
                                    row__col_two__subrow_two.append(colmd2);
                                col_two__subrow_two.append(row__col_two__subrow_two);

                            subrow_two.append(col_one__subrow_two)
                            subrow_two.append(col_two__subrow_two)

                            var subrow_three=$("<div class='row' style='padding-bottom:10px'></div>")
                                
                                var col_one__subrow_three=$("<div class='col-md-6'></div>");
                                    var row__col_one__subrow_three=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-4 text-right'></div>")
                                        var colmd2=$("<div class='col-md-4'></div>")
                                            var cnic_label=$("<label  class='custom_label_css font-weight-bold'>CNIC</label>");
                                            var cnic_input=$("<label class='custom_label_css' id='guardian_input'>"+patient_dict[patient_id_selected]['cnic']+"</label>")
                                        colmd1.append(cnic_label)
                                        colmd2.append(cnic_input);
                                    row__col_one__subrow_three.append(colmd1)
                                    row__col_one__subrow_three.append(colmd2)
                                col_one__subrow_three.append(row__col_one__subrow_three);

                                var col_two__subrow_three=$("<div class='col-md-6'></div>");
                                    var row__col_two__subrow_three=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-4 text-right'></div>")
                                        var colmd2=$("<div class='col-md-6'></div>")
                                            var address_label=$("<label for='pat_address_tag' class='custom_label_css font-weight-bold'>Address</label>");
                                            var pat_address_input=$("<label class='custom_label_css'' id='pat_address_input'>"+patient_dict[patient_id_selected]['address']+"</label>")
                                        colmd1.append(address_label)
                                        colmd2.append(pat_address_input)
                                    row__col_two__subrow_three.append(colmd1)
                                    row__col_two__subrow_three.append(colmd2)
                                col_two__subrow_three.append(row__col_two__subrow_three);
                                
                            subrow_three.append(col_one__subrow_three);
                            subrow_three.append(col_two__subrow_three);

                            var subrow_four=$("<div class='row' style='padding-bottom:10px'>")
                                
                                var col_one__subrow_four=$("<div class='col-md-6'></div>");
                                    var row__col_one__subrow_four=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-4 text-right'></div>")
                                        var colmd2=$("<div class='col-md-4'></div>")
                                            blood_group_label=$("<label for='blood_group_tag' class='custom_label_css font-weight-bold'>Blood group</label>");
                                            bloodgroup_input=$("<label class='custom_label_css' id='blood_group_input'>"+patient_dict[patient_id_selected]['bloodgroup']+"</label>")
                                        colmd1.append(blood_group_label)
                                        colmd2.append(bloodgroup_input) 
                                    row__col_one__subrow_four.append(colmd1)
                                    row__col_one__subrow_four.append(colmd2)
                                col_one__subrow_four.append(row__col_one__subrow_four)

                                var col_two__subrow_four=$("<div class='col-md-6'></div>");
                                    var row__col_two__subrow_four=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-4 text-right'></div>")
                                        var colmd2=$("<div class='col-md-6'></div>")
                    
                                            var email_id_label=$("<label class='custom_label_css font-weight-bold'>Email Address</label>");
                                            var email_id_input=$("<label class='custom_label_css' id='email_id_input'>"+patient_dict[patient_id_selected]['email']+"</label>")
                                        colmd1.append(email_id_label);
                                        colmd2.append(email_id_input);
                                    row__col_two__subrow_four.append(colmd1)
                                    row__col_two__subrow_four.append(colmd2)
                                col_two__subrow_four.append(row__col_two__subrow_four)

                            subrow_four.append(col_one__subrow_four);
                            subrow_four.append(col_two__subrow_four);

                            var subrow_seven=$("<div class='row' id='rmc_contact_div' style='padding-bottom:10px; padding-top:20px; display:none;'></div>")
                                var col_one__subrow_seven=$("<div class='col-md-12'></div>");
                                    row__col_one__subrow_seven=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-4 text-center'></div>")
                                        var colmd2=$("<div class='col-md-4 text-center'></div>")
                                        var colmd3=$("<div class='col-md-4 text-center'></div>")

                                            var c1_label=$("<label for='contact1_tag' class='custom_label_css'>Contact Details</label>");
                                            var c2_label=$("<label for='contact2_tag' class='custom_label_css'>Contact Details</label>");
                                            var c3_label=$("<label for='contact3_tag' class='custom_label_css'>Contact Details</label>");
                                        colmd1.append(c1_label)
                                        colmd2.append(c2_label)
                                        colmd3.append(c3_label)

                                    row__col_one__subrow_seven.append(colmd1);
                                    row__col_one__subrow_seven.append(colmd2);
                                    row__col_one__subrow_seven.append(colmd3);

                                col_one__subrow_seven.append(row__col_one__subrow_seven);  
                            subrow_seven.append(col_one__subrow_seven)

                            var subrow_five=$("<div class='row' style='padding-bottom:10px'>")
                                var col_one__subrow_five=$("<div class='col-md-12'></div>");
                                    var row__col_one__subrow_five=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-6 offset-md-2'></div>")
                                            var print_button=$('<button class="print_patient_info_btn" id="printPatientDetail" onclick="printAllPatientData()"><span class="fa">&#xf02f;</span> Print Patient Details</button>')
                                        colmd1.append(print_button)
                                    row__col_one__subrow_five.append(colmd1)
                                col_one__subrow_five.append(row__col_one__subrow_five)
                            subrow_five.append(col_one__subrow_five);

                        main_subcol.append(subrow_six)
                        main_subcol.append(subrow_zero)
                        var hr= $("<hr class='custom_hr' style='color:red'>")
                        $(main_subcol).append(hr);
                        main_subcol.append(subrow_one)
                        main_subcol.append(subrow_two)
                        main_subcol.append(subrow_three)
                        main_subcol.append(subrow_four)
                        var hr= $("<hr class='custom_hr' style='color:red'>")
                        $(main_subcol).append(hr);
                        main_subcol.append(subrow_seven)
                        main_subcol.append(subrow_five)
                        // main_subcol.append(subrow_eight)
                        // main_subcol.append(subrow_nine)

                    row_div_two.append(main_subcol)
                var main_col_div=$("#main_col_div");
                main_col_div.append(row_div_two);
                // Scroll to bill div
                $('html,body').animate({
                    scrollTop: $(".edit_patient_form_div").offset().top},
                    'slow');
                edit_patient_form_div
                  
            }

        });
        $('.dataTables_filter  input[type="search"]').
        attr('placeholder','Search patient ....').
        css({'width':'200px','display':'inline-block'});
        $('.dataTables_filter input').addClass('form-control-custom');
    });
}
function printAllPatientData(){
    var printcontent = $("#main_col_div").clone();
    $('#row_div_one').hide();
    $('#container-view-all-patient-dashboard').hide();
    $('#printPatientDetail').hide();
    $('#sidebar').hide();
    $('#reset-token-dialog').hide();
    $('#rmc_logo_div').show();
    $('#rmc_contact_div').show();

    $('#pat_details_div').empty().html(printcontent);
    
    window.print();
    window.close();

    $('#pat_details_div').empty();
    $('#rmc_logo_div').hide();
    $('#rmc_contact_div').hide();
    $('#row_div_one').show();

    $('#sidebar').show();
    $('#printPatientDetail').show();
}

function updatePatientData(){
    var patient_id=patient_id_selected;
    var patient_name=$("#pat_name_input").val();
    patient_name=patient_name.toLowerCase();
    var contact_number=$("#contact_numb_edit").val();
    var gender=$("#gender_edit").val();
    gender=gender.toLowerCase();

    var dob=$("#dob_edit").val();
    var age=$("#age_edit").val();
    var cnic=$("#cnic_edit").val();
    var guardian=$("#guardian_edit").val();
    guardian=guardian.toLowerCase();

    var address=$("#pat_address_edit").val();
    address=address.toLowerCase();

    var blood_group=$("#blood_group_edit").val();
    blood_group=blood_group.toLowerCase();

    var emial_id=$("#email_id_edit").val();
    $('.modal-loading').show();

    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            "patient_id":JSON.stringify(patient_id),
            "patient_name":JSON.stringify(patient_name),
            "dob":JSON.stringify(dob),
            "age":JSON.stringify(age),
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
            alert("Info Updated")
            $('.modal-loading').hide();

        },
    });
}
   
function retrievePatientInfo(pat_name,contact_no,id){
    datatable_lst=[];
    pat_name=pat_name.toLowerCase();
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
          "pat_name":pat_name,
          "contactno":contact_no,
          'id':id,
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
                templist.push(patient_dict[pat]['name'].toUpperCase())
                templist.push(patient_dict[pat]['contact_no'])
                templist.push(patient_dict[pat]['gender'].toUpperCase())
                templist.push(patient_dict[pat]['dob'])
                templist.push(patient_dict[pat]['age'])

                templist.push(patient_dict[pat]['cnic'])
                templist.push(patient_dict[pat]['guardian'].toUpperCase())
                templist.push(patient_dict[pat]['address'].toUpperCase())
                templist.push(patient_dict[pat]['bloodgroup'].toUpperCase())
                templist.push(patient_dict[pat]['email']);
                datatable_list.push(templist)
            }
            createPatientDataTable()
            console.log("patient_dict",patient_dict);
            console.log(datatable_list)
            $('.modal-loading').hide();

        },
    }); 
}
function viewPatientHistory(){
    $('#main_page_content').empty()
    var container_patient_dashboard= $('#main_page_content').append('<div class="container-fluid" id="container-patient-dashboard"></div>');
    $("#container-patient-dashboard").append("<h2 class ='center_h_tag_forms'>Patient Medical History</h2>");
    $("#container-patient-dashboard").append("<hr class='custom_hr'>");
    var main_row_div= $("<div class='row is-flex'></div>");
    $(container_patient_dashboard).append(main_row_div);

    var main_col_div=$("<div class='col-md-12' id=''></div>");
       
        $(main_row_div).append(main_col_div);
            var row_div=$("<div class='row removerowmargins_div' id='row_div'></div>");
                var col=$("<div class='col-md-12'></div>");
                    var sub_row_div=$("<div class='row' id='sub_row_div_spat'></div>");
                        var subcol1=$("<div class='col-md-12'></div>");
                            var rw=$("<div class='row'></div>");
                                var c1=$("<div class='col-md-1'></div>");
                                    var label=$("<label class='custom_label_css'>Patient ID</label>")
                                var c2=$("<div class='col-md-2'></div>");
                                    var pat_id=$("<input class='form-control-custom' id='searchpat_id_input'></input>");
                                var c3=$("<div class='col-md-1'></div>");
                                    var pat_name_label=$("<label class='custom_label_css'>Patient Name</label>")
                                var c4=$("<div class='col-md-2'></div>");
                                    var pat_name=$("<input class='form-control-custom' id='searchpat_name_input'></input>");
                                var c5=$("<div class='col-md-2'></div>");
                                    var search_button=$("<button class='search_patient_btn fa fa-search' onclick='searchPatientMedHistory()'>Search Patient</button>")
                                c1.append(label);
                                c2.append(pat_id);
                                c3.append(pat_name_label);
                                c4.append(pat_name);
                                c5.append(search_button);
                            rw.append(c1);
                            rw.append(c2);
                            rw.append(c3);
                            rw.append(c4);
                            rw.append(c5);
                        subcol1.append(rw);
                    sub_row_div.append(subcol1);
                    var search_pat_datatable_row=$("<div class='row' id='search_pat_datatable_row'></div>");
                        var colmd1=$("<div class='col-md-6 genformdiv1'>")
                            var search_pat_datatable_div=$("<div id='search_pat_datatable_div'></div>");
                                    var search_datatable_table=$("<table id='search_pat_datatable_table' class='datatable_pat'></table>");
                                search_pat_datatable_div.append(search_datatable_table);
                    
                        colmd1.append(search_pat_datatable_div)
                        var colmd3=$("<div class='col-md-1' >")

                        var colmd2=$("<div class='col-md-5 genformdiv2'>")

                            var row_one__sub_col_one=$("<div class='row' id=''></div>");
                                var col__row_one__sub_col_one=$("<div class='col-md-12'></div>");
                                    var label=$("<label class='custom_label_css'>Dates Visited</label>");
                                col__row_one__sub_col_one.append(label);
                            row_one__sub_col_one.append(col__row_one__sub_col_one);

                            var row_two__sub_col_one=$("<div class='row'></div>");
                                var col__row_two__sub_col_one=$("<div class='col-md-12'></div>");
                                    var list_div=$("<div></div>")
                                        var ul=$("<ul id='pat-date-visited-ul'></ul>")
                                            // for (date in date_visited_dict){
                                            //     var li=$("<li id='"+date_visited_dict[date]+"_pres' onclick='patientHistory($(this))' value='"+date_visited_dict[date]+"'>"+date+"</li>")
                                            //     ul.append(li);
                                            // }
                                        list_div.append(ul);
                                col__row_two__sub_col_one.append(list_div);
                            row_two__sub_col_one.append(col__row_two__sub_col_one);

                        colmd2.append(row_one__sub_col_one);
                        colmd2.append(row_two__sub_col_one);

                    search_pat_datatable_row.append(colmd1);
                    search_pat_datatable_row.append(colmd3);

                    search_pat_datatable_row.append(colmd2);


                col.append(sub_row_div);
                col.append(search_pat_datatable_row);

            row_div.append(col);

        var row_div_one=$("<div class='row removerowmargins_div' id='row_div_one'></div>");   

    $(main_col_div).append(row_div);
    $(main_col_div).append(row_div_one);
}
var pres_selected=0;
function patientHistory(element){
    console.log($(element).attr('value'))
    pres_selected=$(element).attr('value')
    
    createPatientHistoryForm();
}
function createPatientHistory_DateList(){

    ul=$("#pat-date-visited-ul")
    ul.empty();
    for (date in date_visited_dict){
        var li=$("<li id='"+date_visited_dict[date]+"_pres' onclick='patientHistory($(this))' value='"+date_visited_dict[date]+"'>"+date+"</li>")
        ul.append(li);
    }
    // row_div_one=$("#row_div_one");
        // var sub_col_one=$("<div class='col-md-2' ></div>");
        //     var row_one__sub_col_one=$("<div class='row'></div>");
        //         var col__row_one__sub_col_one=$("<div class='col-md-12'></div>");
        //             var label=$("<label>Dates Visited</label>");
        //         col__row_one__sub_col_one.append(label);
        //     row_one__sub_col_one.append(col__row_one__sub_col_one);

        //     var row_two__sub_col_one=$("<div class='row'></div>");
        //         var col__row_two__sub_col_one=$("<div class='col-md-12'></div>");
        //             var list_div=$("<div></div>")
        //                 var ul=$("<ul></ul>")
        //                     for (date in date_visited_dict){
        //                         var li=$("<li id='"+date_visited_dict[date]+"_pres' onclick='patientHistory($(this))' value='"+date_visited_dict[date]+"'>"+date+"</li>")
        //                         ul.append(li);
        //                     }
        //                 list_div.append(ul);
        //         col__row_two__sub_col_one.append(list_div);
        //     row_two__sub_col_one.append(col__row_two__sub_col_one);

        // sub_col_one.append(row_one__sub_col_one);
        // sub_col_one.append(row_two__sub_col_one);

    // row_div_one.append(sub_col_one);
}
function createPatientHistoryForm(){ ///details in right col
    $("#view_pat_med_hist_div").remove();
    var row_div_one=$("#row_div_one");
    var sub_col_two=$("#sub_col_two");
    var sub_col_two=$("<div class='col-md-12' class='sub_col_two' id='view_pat_med_hist_div' ></div>");

        var row_one__sub_col_two=$("<div class='row'></div>");
            var col__row_one__sub_col_two=$("<div class='col-md-12'></div>");
                var row_one__col__row_one__sub_col_two=$("<div class='row genformdiv1'></div>");
                    var colmd1=$("<div class='col-md-1'>")
                    var colmd2=$("<div class='col-md-4'>")
                        var label=$("<label class='custom_label_css'>Patient Type</label>");
                        var input=$("<input id='pat_hist_pattype_inp_"+pres_selected+"' class='form-control-custom' value='"+pat_med_history_dict[pres_selected]['patienttype']+"' style='background:white' disabled></input>");
                    colmd1.append(label);
                    colmd2.append(input);
                row_one__col__row_one__sub_col_two.append(colmd1)
                row_one__col__row_one__sub_col_two.append(colmd2)
            col__row_one__sub_col_two.append(row_one__col__row_one__sub_col_two);
        row_one__sub_col_two.append(col__row_one__sub_col_two);

     
        if (pat_med_history_dict[pres_selected]['patienttype']==="Indoor"){
            var row_nine__sub_col_two=$("<div class='row genformdiv1' ></div>");
                var col__row_nine__sub_col_two=$("<div class='col-md-12'></div>");
                    var row_one__col__row_nine__sub_col_two=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-2'>")
                        var colmd2=$("<div class='col-md-3'>")
                            var label=$("<label class='custom_label_css'>Admission Reason</label>");
                            var input=$("<label id='pat_hist_vitals_inp_"+pres_selected+"' class='custom_label_css'>"+pat_med_history_dict[pres_selected]['admit_reason']+"</label>");
                        colmd1.append(label);
                        colmd2.append(input);
                    row_one__col__row_nine__sub_col_two.append(colmd1)
                    row_one__col__row_nine__sub_col_two.append(colmd2)
                col__row_nine__sub_col_two.append(row_one__col__row_nine__sub_col_two);
            row_nine__sub_col_two.append(col__row_nine__sub_col_two);

            if (pat_med_history_dict[pres_selected]['surgery_names'].lenght!==0){

                var row_ten__sub_col_two=$("<div class='row genformdiv1'></div>");
                    var surg_list=pat_med_history_dict[pres_selected]['surgery_names']
                    var col__row_ten__sub_col_two=$("<div class='col-md-12'></div>");
                        var div=$("<div>")
                            var surg_table=$("<table></table>");
                                var thead=$("<thead></thead>");
                                    var tr=$("<tr style='border-bottom:1px solid black'  >");
                                        var th1=$("<th>")
                                        th1.append("SrNo.")
                                        var th2=$("<th>")
                                        th2.append("Surgery Name")
                                    tr.append(th1);
                                    tr.append(th2);
                                thead.append(tr);
                            $(surg_table).append(thead);
    
                                var tbody=$("<tbody></tbody>");
                            $(surg_table).append(tbody);
                                for (index in surg_list){
                                    console.log("index",index)
                                    console.log("med_list--index",surg_list[index])
                                    onesurg_list=surg_list[index]
                                    var tr=$("<tr style='border-bottom:1px solid black'>");
                                        var td=$("<td>");
                                        var count=parseInt(index)+1;
                                        td.append(count)
                                        var td2=$("<td>");
                                        td2.append(surg_list[index])
                                    tr.append(td);
                                    tr.append(td2)
                                    tbody.append(tr);

                                }
                        div.append(surg_table)               
                    col__row_ten__sub_col_two.append(div);
                row_ten__sub_col_two.append(col__row_ten__sub_col_two);
            }
        } 

        
        // if (pat_med_history_dict[pres_selected]['med_list']!==undefined){
            // if (pat_med_history_dict[pres_selected]['med_list'].length!==0 ){
            if (pat_med_history_dict[pres_selected]['med_info_rec']!==undefined){
                if (pat_med_history_dict[pres_selected]['med_info_rec'].length!==0 ){
                var row_fifteen__sub_col_two=$("<div class='row genformdiv1' ></div>");
                    var col__row_fifteen__sub_col_two=$("<div class='col-md-12'></div>");
                        var row_one__col__row_fifteen__sub_col_two=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-12'>")
                                var med_info_rec_table=$('<table id="med_info_rec_table" class="datatable_pat" width="100%"></table>')
                            colmd1.append(med_info_rec_table);
                        row_one__col__row_fifteen__sub_col_two.append(colmd1)
                    col__row_fifteen__sub_col_two.append(row_one__col__row_fifteen__sub_col_two);
                row_fifteen__sub_col_two.append(col__row_fifteen__sub_col_two);

            }
        }

        if (pat_med_history_dict[pres_selected]['procedure_names']!==undefined){
            if (pat_med_history_dict[pres_selected]['procedure_names'].length!==0){
                var row_twelve__sub_col_two=$("<div class='row  genformdiv1'></div>");
                    var col__row_twelve__sub_col_two=$("<div class='col-md-12'></div>");
                        var row_one__col__row_twelve__sub_col_two=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-12'>")
                                var proc_rec_table=$('<table id="proc_rec_table" class="datatable_pat" width="100%"></table>')
                            colmd1.append(proc_rec_table);
                        row_one__col__row_twelve__sub_col_two.append(colmd1)
                    col__row_twelve__sub_col_two.append(row_one__col__row_twelve__sub_col_two);
                row_twelve__sub_col_two.append(col__row_twelve__sub_col_two);
                
            }
        }

        var row_fourteen__sub_col_two=$("<div class='row genformdiv1' ></div>");
            var col__row_fourteen__sub_col_two=$("<div class='col-md-12'></div>");
                var row_one__col__row_fourteen__sub_col_two=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-12'>")
                        var pres_rec_table=$('<table id="pres_rec_table" class="datatable_pat" width="100%"></table>')
                    colmd1.append(pres_rec_table);
                row_one__col__row_fourteen__sub_col_two.append(colmd1)
            col__row_fourteen__sub_col_two.append(row_one__col__row_fourteen__sub_col_two);
        row_fourteen__sub_col_two.append(col__row_fourteen__sub_col_two);

        var row_sixteen__sub_col_two=$("<div class='row genformdiv1'></div>");
            var col__row_sixteen__sub_col_two=$("<div class='col-md-12'></div>");
                var row_one__col__row_sixteen__sub_col_two=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-12'>")
                    var view_pres_rec_files_table=$('<table id="view_pres_rec_files_table" class="datatable_uploadfile" width="100%"></table>')
                        var thead=$(' <thead>\
                            <tr>\
                            <th>Cover</th>\
                            <th>File Name</th>\
                            <th>Size</th>\
                            </tr>\
                        </thead>')
                    view_pres_rec_files_table.append(thead)
                    var tbody=$("<tbody>");
                    var filelist=pat_med_history_dict[pres_selected]['filelist']
                        for (key in filelist){
                            console.log(filelist[key])
                            var tr=$("<tr>")
                                var td1=$("<td>");
                                var  a1=$("<a href="+filelist[key]['url']+" target='_blank'></a>")
                                var img=$('<img  src='+filelist[key]["url"]+' height="42" width="42">')
                                    a1.append(img)
                                td1.append(a1)
                                var td2=$("<td>");
                                    var  a=$("<a href="+filelist[key]['url']+" target='_blank'>"+filelist[key]['title']+"</a>")
                                td2.append(a)

                               
                                var td4=$("<td>");
                                td4.append("Size: "+filelist[key]['size']+" KB ")
                               
                            tr.append(td1)
                            tr.append(td2)
                          
                            tr.append(td4)
                            
                            tbody.append(tr);
                        }
                    view_pres_rec_files_table.append(tbody)
                    $(view_pres_rec_files_table).append('<caption class="custom_label_css"  style="font-weight: bold; ;caption-side: top;">Files</caption>');

                    
                    
                    colmd1.append(view_pres_rec_files_table);
                row_one__col__row_sixteen__sub_col_two.append(colmd1)
            col__row_sixteen__sub_col_two.append(row_one__col__row_sixteen__sub_col_two);
        row_sixteen__sub_col_two.append(col__row_sixteen__sub_col_two);


        var row_thirteen__sub_col_two=$("<div class='row genformdiv1'></div>");
            var col__row_thirteen__sub_col_two=$("<div class='col-md-12'></div>");
                var row_one__col__row_thirteen__sub_col_two=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-6 offset-md-3'></div>")
                        // var printBtn_label=$('<button class="save_btn fa fa-print" id="print_bttn" onclick="PrintPatVisitInfo()">Print Patient Visit Information</button>');
                    // colmd1.append(printBtn_label)
                row_one__col__row_thirteen__sub_col_two.append(colmd1)
            col__row_thirteen__sub_col_two.append(row_one__col__row_thirteen__sub_col_two);
        row_thirteen__sub_col_two.append(col__row_thirteen__sub_col_two);

    sub_col_two.append(row_one__sub_col_two);                 
    // sub_col_two.append(row_two__sub_col_two);  
    // sub_col_two.append(row_three__sub_col_two);
    // sub_col_two.append(row_four__sub_col_two);
    // sub_col_two.append(row_five__sub_col_two);
    // sub_col_two.append(row_six__sub_col_two);
    // sub_col_two.append(row_seven__sub_col_two);
    // sub_col_two.append(row_eight__sub_col_two); 
    sub_col_two.append(row_fourteen__sub_col_two); 
    sub_col_two.append(row_fifteen__sub_col_two); 

    sub_col_two.append(row_nine__sub_col_two);
    sub_col_two.append(row_ten__sub_col_two);
    // sub_col_two.append(row_eleven__sub_col_two);  
    sub_col_two.append(row_twelve__sub_col_two);
    sub_col_two.append(row_sixteen__sub_col_two);

    sub_col_two.append(row_thirteen__sub_col_two);

row_div_one.append(sub_col_two);
createPresRecHistDatatable()
if (pat_med_history_dict[pres_selected]['med_info_rec']!==undefined  ){
    medinforec_len=pat_med_history_dict[pres_selected]['med_info_rec']
    if (medinforec_len!==0){
        createMedInfoRecDatatable()
    }

}
if (pat_med_history_dict[pres_selected]['procedure_names']!==undefined){
    proc_name_len=pat_med_history_dict[pres_selected]['procedure_names'].length
    if (proc_name_len!==0){
        createProcRecsDatatable()
    }

}
// Scroll to bill div
$('html,body').animate({
    scrollTop: $("#view_pat_med_hist_div").offset().top},
    'slow');


}
function createPresRecHistDatatable(){
    pres_hist_datatable=undefined
    if (pres_hist_datatable!==undefined){
        pres_hist_datatable.destroy()
    }
    $(function(){
        $('#pres_rec_table').append('<caption class="custom_label_css" style="font-weight: bold;caption-side: top;">Prescription Records</caption>');

        pres_hist_datatable=$("#pres_rec_table").DataTable({
            data:pres_records_dict[pres_selected],
            columns: [
                { title: "Date Visited" },
                { title: "Doctor Name" },
                { title: "Sign Symptoms" },
                { title: 'P. Diagnosis' },
                { title: "Investigation" },
                { title: "diagnosis" },
                { title: "vitals" },
                { title: "rx" },
            ],
            dom: 'Bfrtip',
            buttons: [
                {
                extend: 'print',
                text: ' PRINT',
                title: 'Patient Visit History',
                className: 'datatable_button printbtn fa fa-print',
                },
                {
                    extend: 'excel',
                    text: ' Excel',
                    title: 'Patient Visit History',
                    className: 'datatable_button excelbtn fa fa-file-excel',
                    }
            ],
            paging: false,
            // scrollY: 100,
            scrollX: true,
            ordering: true,
            info:false,   
            searching:false, 
    
            });
            $('#pres_rec_table tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    alert("clicked same entry")
                }
                else{
                  
                }
            });
        });

}
function createMedInfoRecDatatable(){
    $(function(){
        $('#med_info_rec_table').append('<caption class="custom_label_css"  style="font-weight: bold; ;caption-side: top;">Medicine Records</caption>');

        med_info_rec_datatable=$("#med_info_rec_table").DataTable({
            data:pat_med_history_dict[pres_selected]['med_info_rec'],
            columns: [
                { title: "SrNo" },
                { title: "Date" },
                { title: "Medicine Name" },
                { title: 'Type' },
                { title: "Medicine Detials" },
                { title: "Weight" },
                { title: "Timing" },
            ],
            dom: 'Bfrtip',
            buttons: [
                {
                extend: 'print',
                text: ' PRINT',
                title: 'Medicine Record',
                className: 'datatable_button  printbtn fa fa-print',
                },
                {
                    extend: 'excel',
                    text: ' EXCEL',
                    title: 'Medicine Record',
                    className: 'datatable_button excelbtn fa fa-file-excel',
                    }
            ],
            paging: false,
            // scrollY: 100,
            scrollX: true,
            ordering: true,
            info:false,   
            searching:false, 
    
            });
            $('#med_info_rec_table tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    alert("clicked same entry")
                }
                else{
                  
                }
            });
        });

}
function createProcRecsDatatable(){
    
    $(function(){
        $('#proc_rec_table').append('<caption class="custom_label_css" style="font-weight: bold; ;caption-side: top;">Procedure Records</caption>');

        proc_rec_datatable=$("#proc_rec_table").DataTable({
            data:pat_med_history_dict[pres_selected]['procedure_names'],
            columns: [
                { title: "SrNo" },
                { title: "Procedure Name" },
                { title: "Date" },
               
            ],
            dom: 'Bfrtip',
            buttons: [
                {
                extend: 'print',
                text: ' PRINT',
                title: 'Medicine Record',
                className: 'datatable_button printbtn fa fa-print',
                },
                {
                    extend: 'excel',
                    text: ' EXCEL',
                    title: 'Medicine Record',
                    className: 'datatable_button excelbtn fa fa-file-excel',
                    }
            ],
            paging: false,
            // scrollY: 100,
            scrollX: true,
            ordering: true,
            info:false,   
            searching:false, 
    
            });
            $('#proc_rec_table tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    alert("clicked same entry")
                }
                else{
                  
                }
            });
        });
}
var date_visited_dict={}
function searchPatientMedHistory(){
    var patient_id=$("#searchpat_id_input").val();
    var pat_name=$("#searchpat_name_input").val();
    pat_datatable_view_mh=[];
    console.log("patient_id---",patient_id)
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
          "pat_id":patient_id,
          "pat_name":pat_name,
        },
        url:'/retrieve_patient_info_id_name',
        success: function(data){
            if (data['data']=="InValid"){
                alert("InValid Id or Name")
                $('.modal-loading').hide();
                return
            }
            console.log("patient_dict",data["patient_dict"])
            patient_info_dict={};
            patient_info_dict=JSON.parse(data["patient_dict"])
         
            for (pat in patient_info_dict){
                templist=[]
                console.log("pat",pat);
                templist.push(pat)
                templist.push(patient_info_dict[pat]['name'])
                templist.push(patient_info_dict[pat]['contact_no'])
                templist.push(patient_info_dict[pat]['gender'])
                templist.push(patient_info_dict[pat]['dob'])
                templist.push(patient_info_dict[pat]['cnic'])
                templist.push(patient_info_dict[pat]['guardian'])
                templist.push(patient_info_dict[pat]['address'])
                templist.push(patient_info_dict[pat]['bloodgroup'])
                templist.push(patient_info_dict[pat]['email']);
                pat_datatable_view_mh.push(templist)
            }
            if (pat_dt_mh!==undefined){
                pat_dt_mh.destroy();
            }
            createPatientDataTableViewMedHist();
            $('.modal-loading').hide();

           
        }
    });
}
var pat_dt_mh;
var pat_datatable_view_mh=[];
var pat_datatable_update_mh=[];
var pres_records_dict={}
var pres_hist_datatable;
var med_info_rec_datatable;
var proc_rec_datatable;
function createPatientDataTableViewMedHist(){
    $(function(){
        pat_dt_mh=$("#search_pat_datatable_table").DataTable({
            data:pat_datatable_view_mh,
            columns: [
                { title: "Id" },
                { title: "Patient Name" },
                { title: "Contact" },
                { title: 'gender' },
                { title: "dob" },
                { title: "cnic" },
                { title: "guardian" },
                { title: "Address" },
            ],
            paging: false,
            scrollY: 200,
            scrollX: true,
            ordering: true,
            info:false,   
            searching:false, 
            dom: 'Bfrtip',
            buttons: [
                {
                extend: 'print',
                text: ' PRINT',
                title: 'Patient List',
                className: 'datatable_button printbtn fa fa-print',
                },
                {
                    extend: 'excel',
                    text: '  EXCEL',
                    title: 'Patient List',
                    className: 'datatable_button excelbtn fa fa-file-excel',
                    }
            ],
    
            });
            $('#search_pat_datatable_table tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    alert("clicked same entry")
                }
                else{
                    patid=$(this).find('td').eq(0).text()

                    $("#row_div_one").empty();
                    pat_dt_mh.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    $('.modal-loading').show();

                    $.ajax({
                        type: 'POST',
                        dataType: "json",
                        'data': {
                          "patient_id":patid,
                         
                        },
                        url: '/retireve_patient_med_history',
                        success: function(data){
                            console.log("JSON.parse(data['pat_med_history_dict']);",JSON.parse(data['pat_med_history_dict']))
                            pat_med_history_dict=JSON.parse(data['pat_med_history_dict']);
                            date_visited_dict=JSON.parse(data['date_visited_dict']);
                            pres_records_dict=JSON.parse(data['pres_records_dict'])
                            createPatientHistory_DateList();
                            $('.modal-loading').hide();

                        }
                    });
                }
            });
    });
}
function PrintPatVisitInfo(){
    var content = $("#sub_col_two").clone();
    var mywindow = window.open('', 'Print', 'height=600,width=800');

    mywindow.document.close();
    mywindow.focus()
    mywindow.print();
    mywindow.close();
    return true;

    // var printcontent = $(".main_col_div").clone();
    // $('#row_div').hide();
    // $('#sidebar').hide();
    // $('#print_bttn').hide();
    // $('#reset-token-dialog').hide();
    // $('#col1').hide();
    // // $('#rmcHeading').show();
    // // $('#heading2').show();


    // $('#patVisit_bill_div').empty().html(printcontent);
    
    // window.print();
    // window.close();

    // // $('#rmcHeading').hide();
    // // $('#heading2').hide();

    // $('#row_div').show();
    // $('#col1').show();
    // $('#sidebar').show();
    // $('#sidebar').show();
    // $('#print_bttn').show();
}

function updatePatientHistory(){
    $('#main_page_content').empty()
    var container_patient_dashboard= $('#main_page_content').append('<div class="container-fluid" id="container-patient-dashboard"></div>');
    $("#container-patient-dashboard").append("<h2 class ='center_h_tag_forms'>Update Patient Medical History</h2>");
    $("#container-patient-dashboard").append("<hr class='custom_hr'>");
    var main_row_div= $("<div class='row is-flex'></div>");
    $(container_patient_dashboard).append(main_row_div);

    var main_col_div=$("<div class='col-md-12' id=''></div>");
       
        $(main_row_div).append(main_col_div);
            var row_div=$("<div class='row' id='row_div'></div>");
                var col=$("<div class='col-md-12'></div>");
                    var sub_row_div=$("<div class='row' id='sub_row_div_spat'></div>");
                        var subcol1=$("<div class='col-md-12'></div>");
                            var rw=$("<div class='row'></div>");
                            var c1=$("<div class='col-md-1'></div>");
                                var label=$("<label>Patient id</label>")
                            var c2=$("<div class='col-md-2'></div>");
                                var pat_id=$("<input class='form-control-custom' id='searchpat_id_input'></input>");
                            var c3=$("<div class='col-md-1'></div>");
                                var pat_name_label=$("<label>Patient Name</label>")
                            var c4=$("<div class='col-md-2'></div>");
                                var pat_name=$("<input class='form-control-custom' id='searchpat_name_input'></input>");
                            var c5=$("<div class='col-md-2'></div>");
                                var search_button=$("<button class='btn btn-block fa fa-search' onclick='searchUpdatePatientMedHistory()'>Search Patient</button>")
                            c1.append(label);
                            c2.append(pat_id);
                            c3.append(pat_name_label);
                            c4.append(pat_name);
                            c5.append(search_button);
                        rw.append(c1);
                        rw.append(c2);
                        rw.append(c3);
                        rw.append(c4);
                        rw.append(c5);
                        subcol1.append(rw);
                    sub_row_div.append(subcol1);
                    var search_pat_datatable_row=$("<div class='row' id='search_pat_datatable_row'></div>");
                        var search_pat_datatable_div=$("<div id='search_pat_datatable_div'></div>");
                            var search_datatable_table=$("<table id='search_pat_datatable_table'  width='100%' class='datatable_pat'></table>");

                        search_pat_datatable_div.append(search_datatable_table);
                    search_pat_datatable_row.append(search_pat_datatable_div);
                col.append(sub_row_div);
                col.append(search_pat_datatable_row);
            row_div.append(col);

        var row_div_one=$("<div class='row' id='row_div_one'></div>");   

    $(main_col_div).append(row_div);
    $(main_col_div).append(row_div_one);
}

var date_visited_dict={}
function searchUpdatePatientMedHistory(){
    var patient_id=$("#searchpat_id_input").val();
    var pat_name=$("#searchpat_name_input").val();
    console.log("patient_id",patient_id);
    pat_datatable_update_mh=[]
    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
          "pat_id":patient_id,
          "pat_name":pat_name,
        },
        url:'/retrieve_patient_info_id_name',
        success: function(data){

            console.log("patient_dict",data["patient_dict"])
            patient_info_dict={};
            patient_info_dict=JSON.parse(data["patient_dict"])
         
            for (pat in patient_info_dict){
                templist=[]
                console.log("pat",pat);
                templist.push(pat)
                templist.push(patient_info_dict[pat]['name'])
                templist.push(patient_info_dict[pat]['contact_no'])
                templist.push(patient_info_dict[pat]['gender'])
                templist.push(patient_info_dict[pat]['dob'])
                templist.push(patient_info_dict[pat]['cnic'])
                templist.push(patient_info_dict[pat]['guardian'])
                templist.push(patient_info_dict[pat]['address'])
                templist.push(patient_info_dict[pat]['bloodgroup'])
                templist.push(patient_info_dict[pat]['email']);
                pat_datatable_update_mh.push(templist)
            }
            if (pat_dt_mh!==undefined){
                pat_dt_mh.destroy();
            }
            createPatientDataTableUpdateMedHist();

        }
    });


    
}
function createPatientDataTableUpdateMedHist(){
    $(function(){
        pat_dt_mh=$("#search_pat_datatable_table").DataTable({
            data:pat_datatable_update_mh,
            columns: [
                { title: "Id" },
                { title: "Patient Name" },
                { title: "Contact" },
                { title: 'gender' },
                { title: "dob" },
                { title: "cnic" },
                { title: "guardian" },
                { title: "Address" },
            ],
            columnDefs: [
            { width: '100%', targets: '_all' }
            ],

            paging: false,
            scrollY: 200,
            scrollX: true,
            ordering: true,
            info:false,   
            searching:false, 
    
            });
            $('#search_pat_datatable_table tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    alert("clicked same entry")
                }
                else{
                    pat_dt_mh.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');

                    $("#row_div_one").empty();
                    
                    patid=$(this).find('td').eq(0).text()
                    
                    $("#row_div_one").empty();
                  
                    $.ajax({
                        type: 'POST',
                        dataType: "json",
                        'data': {
                          "patient_id":patid,
                         
                        },
                        url: '/retireve_patient_med_history',
                        success: function(data){
                            console.log("JSON.parse(data['pat_med_history_dict']);",JSON.parse(data['pat_med_history_dict']))
                            pat_med_history_dict=JSON.parse(data['pat_med_history_dict']);
                            date_visited_dict=JSON.parse(data['date_visited_dict']);
                           
                            createUpdatePatientHistory_DateList()
                        }
                    });
                }
            });
    });

}
function createUpdatePatientHistory_DateList(){
    
    row_div_one=$("#row_div_one");
        var sub_col_one=$("<div class='col-md-2'></div>");
            var row_one__sub_col_one=$("<div class='row'></div>");
                var col__row_one__sub_col_one=$("<div class='col-md-12'></div>");
                    var label=$("<label>Dates Visited</label>");
                col__row_one__sub_col_one.append(label);
            row_one__sub_col_one.append(col__row_one__sub_col_one);

            var row_two__sub_col_one=$("<div class='row'></div>");
                var col__row_two__sub_col_one=$("<div class='col-md-12'></div>");
                    var list_div=$("<div></div>")
                        var ul=$("<ul></ul>")
                            for (date in date_visited_dict){
                                var li=$("<li id='"+date_visited_dict[date]+"_pres' onclick='updatePatientHistory_form($(this))' value='"+date_visited_dict[date]+"'>"+date+"</li>")
                                ul.append(li);
                            }
                        list_div.append(ul);
                col__row_two__sub_col_one.append(list_div);
            row_two__sub_col_one.append(col__row_two__sub_col_one);

        sub_col_one.append(row_one__sub_col_one);
        sub_col_one.append(row_two__sub_col_one);

    row_div_one.append(sub_col_one);
}

function updatePatientHistory_form(element){
    console.log($(element).attr('value'))
    pres_selected=$(element).attr('value')
    
    createUpdatePatientHistoryForm();
}

function createUpdatePatientHistoryForm(){ ///details in right col
    $("#sub_col_two").remove();
    var row_div_one=$("#row_div_one");
    var sub_col_two=$("#sub_col_two");
    var sub_col_two=$("<div class='col-md-10' class='sub_col_two' id='sub_col_two'></div>");

        var row_one__sub_col_two=$("<div class='row' style='padding-top:10px'></div>");
            var col__row_one__sub_col_two=$("<div class='col-md-12'></div>");
                var row_one__col__row_one__sub_col_two=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-3'>")
                    var colmd2=$("<div class='col-md-3'>")
                        var label=$("<label>Patient Type</label>");
                        var input=$("<input id='pat_hist_pattype_inp_"+pres_selected+"' class='form-control-custom' value='"+pat_med_history_dict[pres_selected]['patienttype']+"' style='background:white' disabled></input>");
                    colmd1.append(label);
                    colmd2.append(input);
                row_one__col__row_one__sub_col_two.append(colmd1)
                row_one__col__row_one__sub_col_two.append(colmd2)
            col__row_one__sub_col_two.append(row_one__col__row_one__sub_col_two);
        row_one__sub_col_two.append(col__row_one__sub_col_two);

        var row_two__sub_col_two=$("<div class='row' style='padding-top:10px'></div>");
            var col__row_two__sub_col_two=$("<div class='col-md-12'></div>");
                var row_one__col__row_two__sub_col_two=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-3'>")
                    var colmd2=$("<div class='col-md-3'>")
                        var label=$("<label>Doctor Visited</label>");
                        var input=$("<input id='pat_hist_doconduty_inp_"+pres_selected+"' class='form-control-custom' value='"+pat_med_history_dict[pres_selected]['doc_on_duty']+"' style='background:white' disabled></input>");
                    colmd1.append(label);
                    colmd2.append(input);
                row_one__col__row_two__sub_col_two.append(colmd1)
                row_one__col__row_two__sub_col_two.append(colmd2)
            col__row_two__sub_col_two.append(row_one__col__row_two__sub_col_two);
        row_two__sub_col_two.append(col__row_two__sub_col_two);
        
        var row_three__sub_col_two=$("<div class='row' style='padding-top:10px'></div>");
            var col__row_three__sub_col_two=$("<div class='col-md-12'></div>");
                var row_one__col__row_three__sub_col_two=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-3'>")
                    var colmd2=$("<div class='col-md-3'>")
                        var label=$("<label>Vitals</label>");
                        var input=$("<textarea id='pat_hist_vitals_inp_"+pres_selected+"' class='form-control-custom' value='"+pat_med_history_dict[pres_selected]['vitals']+"'> "+pat_med_history_dict[pres_selected]['vitals']+"</textarea>");
                    colmd1.append(label);
                    colmd2.append(input);
                row_one__col__row_three__sub_col_two.append(colmd1)
                row_one__col__row_three__sub_col_two.append(colmd2)
            col__row_three__sub_col_two.append(row_one__col__row_three__sub_col_two);
        row_three__sub_col_two.append(col__row_three__sub_col_two);

        var row_four__sub_col_two=$("<div class='row' style='padding-top:10px'></div>");
            var col__row_four__sub_col_two=$("<div class='col-md-12'></div>");
                var row_one__col__row_four__sub_col_two=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-3'>")
                    var colmd2=$("<div class='col-md-3'>")
                        var label=$("<label>Sign Symptoms</label>");
                        var input=$("<textarea id='pat_hist_ss_inp_"+pres_selected+"' class='form-control-custom' value='"+pat_med_history_dict[pres_selected]['sign_symptom']+"'>"+pat_med_history_dict[pres_selected]['sign_symptom']+"</textarea>");
                    colmd1.append(label);
                    colmd2.append(input);
                row_one__col__row_four__sub_col_two.append(colmd1)
                row_one__col__row_four__sub_col_two.append(colmd2)
            col__row_four__sub_col_two.append(row_one__col__row_four__sub_col_two);
        row_four__sub_col_two.append(col__row_four__sub_col_two);

        var row_five__sub_col_two=$("<div class='row' style='padding-top:10px'></div>");
            var col__row_five__sub_col_two=$("<div class='col-md-12'></div>");
                var row_one__col__row_five__sub_col_two=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-3'>")
                    var colmd2=$("<div class='col-md-3'>")
                        var label=$("<label>Provisional Diagnosis</label>");
                        var input=$("<textarea id='pat_hist_pd_inp_"+pres_selected+"' class='form-control-custom' value='"+pat_med_history_dict[pres_selected]['provisional_diagnosis']+"'>"+pat_med_history_dict[pres_selected]['provisional_diagnosis']+"</textarea>");
                    colmd1.append(label);
                    colmd2.append(input);
                row_one__col__row_five__sub_col_two.append(colmd1)
                row_one__col__row_five__sub_col_two.append(colmd2)
            col__row_five__sub_col_two.append(row_one__col__row_five__sub_col_two);
        row_five__sub_col_two.append(col__row_five__sub_col_two);

        var row_six__sub_col_two=$("<div class='row' style='padding-top:10px'></div>");
            var col__row_six__sub_col_two=$("<div class='col-md-12'></div>");
                var row_one__col__row_six__sub_col_two=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-3'>")
                    var colmd2=$("<div class='col-md-3'>")
                        var label=$("<label>Investigation</label>");
                        var input=$("<textarea id='pat_hist_investigation_inp_"+pres_selected+"' class='form-control-custom' value='"+pat_med_history_dict[pres_selected]['investigation']+"'>"+pat_med_history_dict[pres_selected]['investigation']+"</textarea>");
                    colmd1.append(label);
                    colmd2.append(input);
                row_one__col__row_six__sub_col_two.append(colmd1)
                row_one__col__row_six__sub_col_two.append(colmd2)
            col__row_six__sub_col_two.append(row_one__col__row_six__sub_col_two);
        row_six__sub_col_two.append(col__row_six__sub_col_two);

        var row_seven__sub_col_two=$("<div class='row' style='padding-top:10px'></div>");
            var col__row_seven__sub_col_two=$("<div class='col-md-12'></div>");
                var row_one__col__row_seven__sub_col_two=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-3'>")
                    var colmd2=$("<div class='col-md-3'>")
                        var label=$("<label>Diagnosis</label>");
                        var input=$("<textarea id='pat_hist_diagnosis_inp_"+pres_selected+"' class='form-control-custom' value='"+pat_med_history_dict[pres_selected]['diagnosis']+"'>"+pat_med_history_dict[pres_selected]['diagnosis']+"</textarea>");
                    colmd1.append(label);
                    colmd2.append(input);
                row_one__col__row_seven__sub_col_two.append(colmd1)
                row_one__col__row_seven__sub_col_two.append(colmd2)
            col__row_seven__sub_col_two.append(row_one__col__row_seven__sub_col_two);
        row_seven__sub_col_two.append(col__row_seven__sub_col_two);

        var row_eight__sub_col_two=$("<div class='row' style='padding-top:10px'></div>");
            var col__row_eight__sub_col_two=$("<div class='col-md-12'></div>");
                var row_one__col__row_eight__sub_col_two=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-3'>")
                    var colmd2=$("<div class='col-md-3'>")
                        var label=$("<label>RX</label>");
                        var input=$("<textarea id='pat_hist_rx_inp_"+pres_selected+"' class='form-control-custom' value='"+pat_med_history_dict[pres_selected]['rx']+"'>"+pat_med_history_dict[pres_selected]['rx']+"</textarea>");
                    colmd1.append(label);
                    colmd2.append(input);
                row_one__col__row_eight__sub_col_two.append(colmd1)
                row_one__col__row_eight__sub_col_two.append(colmd2)
            col__row_eight__sub_col_two.append(row_one__col__row_eight__sub_col_two);
        row_eight__sub_col_two.append(col__row_eight__sub_col_two);

        if (pat_med_history_dict[pres_selected]['patienttype']==="Indoor"){
            var row_nine__sub_col_two=$("<div class='row' style='padding-top:10px'></div>");
                var col__row_nine__sub_col_two=$("<div class='col-md-12'></div>");
                    var row_one__col__row_nine__sub_col_two=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-2'>")
                        var colmd2=$("<div class='col-md-3'>")
                            var label=$("<label>Admission Reason</label>");
                            var input=$("<textarea id='pat_hist_admitreason_inp_"+pres_selected+"' class='form-control-custom' value='"+pat_med_history_dict[pres_selected]['admit_reason']+"'>"+pat_med_history_dict[pres_selected]['admit_reason']+"</textarea>");
                        colmd1.append(label);
                        colmd2.append(input);
                    row_one__col__row_nine__sub_col_two.append(colmd1)
                    row_one__col__row_nine__sub_col_two.append(colmd2)
                col__row_nine__sub_col_two.append(row_one__col__row_nine__sub_col_two);
            row_nine__sub_col_two.append(col__row_nine__sub_col_two);

            if (pat_med_history_dict[pres_selected]['surgery_names'].length!==0){

                var row_ten__sub_col_two=$("<div class='row'></div>");
                    var surg_list=pat_med_history_dict[pres_selected]['surgery_names']
                    var col__row_ten__sub_col_two=$("<div class='col-md-12'></div>");
                        var div=$("<div>")
                            var surg_table=$("<table></table>");
                                var thead=$("<thead></thead>");
                                    var tr=$("<tr style='border-bottom:1px solid black'  >");
                                        var th1=$("<th>")
                                        th1.append("SrNo.")
                                        var th2=$("<th>")
                                        th2.append("Surgery Name")
                                    tr.append(th1);
                                    tr.append(th2);
                                thead.append(tr);
                            $(surg_table).append(thead);
    
                                var tbody=$("<tbody></tbody>");
                            $(surg_table).append(tbody);
                                for (index in surg_list){
                                    console.log("index",index)
                                    console.log("med_list--index",surg_list[index])
                                    onesurg_list=surg_list[index]
                                    var tr=$("<tr style='border-bottom:1px solid black'>");
                                        var td=$("<td>");
                                        var count=parseInt(index)+1;
                                        td.append(count)
                                        var td2=$("<td>");
                                        td2.append(surg_list[index])
                                    tr.append(td);
                                    tr.append(td2)
                                    tbody.append(tr);

                                }
                        div.append(surg_table)               
                    col__row_ten__sub_col_two.append(div);
                row_ten__sub_col_two.append(col__row_ten__sub_col_two);
            }
        } 

        
        if (pat_med_history_dict[pres_selected]['med_list']!==undefined){
            if (pat_med_history_dict[pres_selected]['med_list'].length!==0){
                var med_list=pat_med_history_dict[pres_selected]['med_list']
                var row_eleven__sub_col_two=$("<div class='row' style='padding-top:10px'></div>");
                    var col__row_eleven__sub_col_two=$("<div class='col-md-12'></div>");
                        var div=$("<div>")
                            var med_table=$("<table></table>");
                                var thead=$("<thead></thead>");
                                    var tr=$("<tr style='border-bottom:1px solid black'  >");
                                        var th1=$("<th>")
                                        th1.append("SrNo.")
                                        var th2=$("<th>")
                                        th2.append("Medicine Name")
                                        var th3=$("<th>")
                                        th3.append("Type")
                                        var th4=$("<th>")
                                        th4.append("Details")
                                        var th5=$("<th>")
                                        th5.append("Weight(mg)")
                                        
                                    tr.append(th1);
                                    tr.append(th2);
                                    tr.append(th3);
                                    tr.append(th4);
                                    tr.append(th5);
                                thead.append(tr);
                            $(med_table).append(thead);

                                var tbody=$("<tbody></tbody>");
                            $(med_table).append(tbody);
                                    for (index in med_list){
                                        console.log("index",index)
                                        console.log("med_list--index",med_list[index])
                                        onemed_list=med_list[index]
                                        var tr=$("<tr style='border-bottom:1px solid black'>");
                                        var td=$("<td>");
                                        var count=parseInt(index)+1;
                                        td.append(count)
                                        tr.append(td)
                                        for (var i in onemed_list){
                                                    var td=$("<td>");
                                                    td.append(onemed_list[i])
                                                tr.append(td)
                                        }
                                        tbody.append(tr);
                                    }
                        div.append(med_table)                        
                    col__row_eleven__sub_col_two.append(div);
                row_eleven__sub_col_two.append(col__row_eleven__sub_col_two);
            }
        }

        
        if (pat_med_history_dict[pres_selected]['procedure_names'].length!==0){

            var row_twelve__sub_col_two=$("<div class='row' style='padding-top:10px'></div>");
                var proc_list=pat_med_history_dict[pres_selected]['procedure_names']
                var col__row_twelve__sub_col_two=$("<div class='col-md-12'></div>");
                    var div=$("<div>")
                        var proc_table=$("<table></table>");
                            var thead=$("<thead></thead>");
                                var tr=$("<tr style='border-bottom:1px solid black'  >");
                                    var th1=$("<th>")
                                    th1.append("SrNo.")
                                    var th2=$("<th>")
                                    th2.append("Procedure Name")
                                tr.append(th1);
                                tr.append(th2);
                            thead.append(tr);
                        $(proc_table).append(thead);

                            var tbody=$("<tbody></tbody>");
                        $(proc_table).append(tbody);
                            for (index in proc_list){
                                console.log("index",index)
                                console.log("proc_list--index",proc_list[index])
                                oneproc_list=proc_list[index]
                                var tr=$("<tr style='border-bottom:1px solid black'>");
                                    var td=$("<td>");
                                    var count=parseInt(index)+1;
                                    td.append(count)
                                    var td2=$("<td>");
                                    td2.append(proc_list[index])
                                tr.append(td);
                                tr.append(td2)
                                tbody.append(tr);
                            }
                    div.append(proc_table)               
                col__row_twelve__sub_col_two.append(div);
            row_twelve__sub_col_two.append(col__row_twelve__sub_col_two);
        }

        var row_thirteen__sub_col_two=$("<div class='row' style='padding-top:10px'></div>");
            var col__row_thirteen__sub_col_two=$("<div class='col-md-12'></div>");
                var row_one__col__row_thirteen__sub_col_two=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-6 offset-md-3'></div>")
                        var printBtn_label=$('<button class="btn btn-block fa fa-print" id="update_pat_med_hist_btn" onclick="UpdatePMedHist()">Update Patient Visit Information</button>');
                    colmd1.append(printBtn_label)
                row_one__col__row_thirteen__sub_col_two.append(colmd1)
            col__row_thirteen__sub_col_two.append(row_one__col__row_thirteen__sub_col_two);
        row_thirteen__sub_col_two.append(col__row_thirteen__sub_col_two);

    sub_col_two.append(row_one__sub_col_two);                 
    sub_col_two.append(row_two__sub_col_two);  
    sub_col_two.append(row_three__sub_col_two);
    sub_col_two.append(row_four__sub_col_two);
    sub_col_two.append(row_five__sub_col_two);
    sub_col_two.append(row_six__sub_col_two);
    sub_col_two.append(row_seven__sub_col_two);
    sub_col_two.append(row_eight__sub_col_two); 
    sub_col_two.append(row_nine__sub_col_two);
    sub_col_two.append(row_ten__sub_col_two);
    sub_col_two.append(row_eleven__sub_col_two);  
    sub_col_two.append(row_twelve__sub_col_two);
    sub_col_two.append(row_thirteen__sub_col_two);

row_div_one.append(sub_col_two);
}

function UpdatePMedHist(){
    pat_med_history_dict[pres_selected]['vitals']=$("#pat_hist_vitals_inp_"+pres_selected).val()
    pat_med_history_dict[pres_selected]['sign_symptom']=$("#pat_hist_ss_inp_"+pres_selected).val()
    pat_med_history_dict[pres_selected]['provisional_diagnosis']=$("#pat_hist_pd_inp_"+pres_selected).val()
    pat_med_history_dict[pres_selected]['investigation']=$("#pat_hist_investigation_inp_"+pres_selected).val()
    pat_med_history_dict[pres_selected]['diagnosis']=$("#pat_hist_diagnosis_inp_"+pres_selected).val()
    pat_med_history_dict[pres_selected]['rx']=$("#pat_hist_rx_inp_"+pres_selected).val()
    if($("#pat_hist_admitreason_inp_"+pres_selected).length!==0){
        pat_med_history_dict[pres_selected]['admit_reason']=$("#pat_hist_admitreason_inp_"+pres_selected).val()
    }
    console.log("pat_med_history_dict--",pat_med_history_dict);
    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            "presid":pres_selected,
            "pat_med_history_dict":JSON.stringify(pat_med_history_dict),
        },
        url: '/update_pat_medical_hist',
        success: function(data){
          
                alert("Updated")     
          
        },
    }); 


    
}
function createPatientDataTableInGenPres(){
    console.log("datatable_list",datatable_list)
    $(function(){
        pat_datatable=$("#patient_table").DataTable({
            data:datatable_list,
            columns: [
                { title: "Id" },
                { title: "Patient Name" },
                { title: "Contact" },
                { title: 'Gender' },
                { title: "DOB" },
                { title: "CNIC" },
                { title: "Guardian" },
                { title: "Address" },
            ],
            paging: false,
            pageLength:50,
            scrollY: 250,
            scrollX: true,
            ordering: true,
            info:false,   
            searching:true, 
    
            });
            $('#patient_table tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    alert("clicked same entry")
                }
                else{
                    patient_id_selected=$(this).find('td').eq(0).text();

                    $('#select_pres_type_div').remove();
                    $("#gen_pres_form_div").remove();

                    $('#row_div_six').remove();
                    $('#row_div_seven').remove();
                    $("#genpres_room_datatablediv").remove();
                    $("#genpres_ward_datatablediv").remove();




                    pat_datatable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    console.log("Patient dict on click",patient_dict);
                    var row_div_four=$("<div class='' id='select_pres_type_div'></div>");
                        var main_subcol=$("<div class='col-md-12'></div>");

                            var subrow_one=$("<div class='row'></div>")

                                    var col_one__subrow_one=$("<div class='col-md-12' style='padding-top:30px; padding-bottom:10px;'></div>");
                                            row__col_one__subrow_one=$("<div class='row'></div>");
                                                var colmd1=$("<div class='col-md-2'></div>")
                                                var colmd2=$("<div class='col-md-2'></div>")
                                                var colmd3=$("<div class='col-md-2' style='margin-left: auto;'></div>")
                                                var colmd4=$("<div class='col-md-1'></div>")

                                                var pat_type_label=$("<label for='emp_name_tag' class='custom_label_css'>Patient Type</label>");
                                                    colmd1.append(pat_type_label)

                                                var select=$("<select id='pat_type_input' class='form-control-custom' onchange='pat_type_OnSelect($(this))'></select>");
                                                    var option=$("<option selected='selected' value='--'>--</option>");
                                                    var option1=$("<option id="+pat_type_list[0]+"-opt value="+pat_type_list[0]+">"+pat_type_list[0]+"</option>");

                                                    $(select).append(option);
                                                    $(select).append(option1);

                                                for (var i=1;i<=pat_type_list.length;i++){
                                                    if (pat_type_list[i]!==undefined){
                                                        var option=$("<option id="+pat_type_list[i]+"-opt value="+pat_type_list[i]+">"+pat_type_list[i]+"</option>");
                                                        $(select).append(option);
                                                    }
                                                } 
                                                colmd2.append(select) 
                                                
                                            row__col_one__subrow_one.append(colmd1);
                                            row__col_one__subrow_one.append(colmd2);
                                            row__col_one__subrow_one.append(colmd3);
                                        col_one__subrow_one.append(row__col_one__subrow_one);

                            subrow_one.append(col_one__subrow_one)
                        main_subcol.append(subrow_one)

                    row_div_four.append(main_subcol)
                var main_col_div=$("#main_col_div");
                main_col_div.append(row_div_four);
                // Scroll to bill div
                $('html,body').animate({
                    scrollTop: $("#select_pres_type_div").offset().top},
                    'slow');                
                
                }
            });
        });
}
function retrieveRoomInfoInRoomWard(){
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {

        },
        url: '/retireve_room_info_in_room_ward',
        success: function(data){
            console.log("room_dict",data["room_dict"]);
            room_dict={};
            room_list=[]
            room_dict=JSON.parse(data["room_dict"])
            for (room in room_dict){
                templist=[];
                console.log("room",room);
                templist.push(room)
                templist.push(room_dict[room]['floor_no'])
                templist.push(room_dict[room]['room_no'])
                templist.push(room_dict[room]['charge_per_day'])
                templist.push(room_dict[room]['ac_charge_per_day'])
                room_list.push(templist)
            }
            console.log("room_dict",room_dict);
            console.log(room_list)

            createRoomDataTable()
            $('.modal-loading').hide();

        },
    }); 
}
function retrieveWardInfoInRoomWard(){
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {

        },
        url: '/retireve_ward_info_in_room_ward',
        success: function(data){
            console.log("ward_dict",data["ward_dict"]);
            ward_dict={};
            ward_list=[]
            ward_dict=JSON.parse(data["ward_dict"])
            for (ward in ward_dict){
                templist=[];
                console.log("ward",ward);
                templist.push(ward)
                templist.push(ward_dict[ward]['ward_no'])
                templist.push(ward_dict[ward]['bed_no'])
                templist.push(ward_dict[ward]['charge_per_day'])
                ward_list.push(templist)
            }
            console.log("ward_dict",ward_dict);
            console.log(ward_list)
            $('#available_ward_table').show()

            createWardDataTable()
            $('.modal-loading').hide();

        },
    }); 

}
function InDoorTotalAmountFocousOutGenPres(ele){
    value=ele.val();
    $("#amountdue_input").val(value);
    $("#discountamount_input").val("0");
    $("#discountpercent_input").val("0");
}
function OutDoorTotalAmountFocousOutGenPres(ele){
    value=ele.val();
    $("#amountdue_input").val(value);

    $("#discountamount_input").val("0");
    $("#discountpercent_input").val("0");
}

function EmergencyTotalAmountFocousOutGenPres(ele){
    value=ele.val();
    $("#amountdue_input").val(value);

    $("#discountamount_input").val("0");
    $("#discountpercent_input").val("0");
}
function createOutDoorPresFormDiv(){
    var main_col_div=$('#main_col_div')
    var row_div_five=$("<div class='' id='gen_pres_form_div'></div>");

        var main_col__row_five=$("<div class='col-md-12'></div>");

            var row_one=$("<div class='row' style=' padding-bottom:10px;'></div>")

                var col_one__row_one=$("<div class='col-md-12'></div>");
                        row__col_one__row_one=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-2'></div>")
                            var colmd2=$("<div class='col-md-2'></div>")
                            
                                var outdooramount_label=$("<label for='outdoorAmount_tag' class='custom_label_css'>Outdoor Fee</label>");
                                colmd1.append(outdooramount_label)

                                totalamount_input=$("<input class='form-control-custom' onfocusout='OutDoorTotalAmountFocousOutGenPres($(this))' id='totalamount_input' class='custom_input_css'>")
                                colmd2.append(totalamount_input)

                        row__col_one__row_one.append(colmd1);
                        row__col_one__row_one.append(colmd2);

                    col_one__row_one.append(row__col_one__row_one);

            row_one.append(col_one__row_one)
            var row_two=$("<div class='row' style=' padding-bottom:10px;'></div>")

                var col_one__row_two=$("<div class='col-md-12'></div>");
                        row__col_one__row_two=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-2'></div>")
                            var colmd2=$("<div class='col-md-2'></div>")
                            var colmd3=$("<div class='col-md-2'></div>")
                            var colmd4=$("<div class='col-md-2'></div>")
                            var colmd5=$("<div class='col-md-2'></div>")
                            var colmd6=$("<div class='col-md-2'></div>")
                           
                            var discountamount_label=$("<label for='outdoorAmount_tag' class='custom_label_css'>Discount Amount</label>");
                            colmd1.append(discountamount_label)

                            discountamount_input=$("<input class='form-control-custom' id='discountamount_input' onfocusout='discountAmountFocousOutPres($(this))' class='custom_input_css'>")
                            colmd2.append(discountamount_input)

                            var discountPercernt_label=$("<label for='discountpercernt_label' class='custom_label_css float-right'>Discount Percent</label>");
                            colmd3.append(discountPercernt_label)

                            discountpercent_input=$("<input class='form-control-custom' id='discountpercent_input' class='custom_input_css'>")
                            colmd4.append(discountpercent_input)

                            var amountDue_label=$("<label for='amountDue_label' class='custom_label_css float-right'>Net Total</label>");
                            colmd5.append(amountDue_label)

                            amountdue_input=$("<input class='form-control-custom' onfocusin='netTotalFocusInPres()' id='amountdue_input'>")
                            colmd6.append(amountdue_input)

                        row__col_one__row_two.append(colmd1);
                        row__col_one__row_two.append(colmd2);
                        row__col_one__row_two.append(colmd3);
                        row__col_one__row_two.append(colmd4);
                        row__col_one__row_two.append(colmd5);
                        row__col_one__row_two.append(colmd6);

                    col_one__row_two.append(row__col_one__row_two);

            row_two.append(col_one__row_two)

            var row_six=$("<div class='row' style=' padding-bottom:10px;'></div>")

                var col_one__row_six=$("<div class='col-md-6'></div>");
                    row__col_one__row_six=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var amount_recieved_label=$("<label for='reason_label' class='custom_label_css'>Amount Recieved</label>");
                        colmd1.append(amount_recieved_label)
                            amount_recieved_input=$("<input class='form-control-custom' id='amount_recieved_input'  onfocusout='calculateChangeAmount($(this))'   class='custom_input_css'>")
                        colmd2.append(amount_recieved_input)
                    row__col_one__row_six.append(colmd1);
                    row__col_one__row_six.append(colmd2);
                col_one__row_six.append(row__col_one__row_six);

                var col_two__row_six=$("<div class='col-md-4'></div>");
                    row__col_two__row_six=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-3'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                        var colmd3=$("<div class='col-md-3'></div>")

                            var change_amount_label=$("<label for='reason_label' class='custom_label_css float-right'>Change Amount</label>");
                        colmd1.append(change_amount_label)
                            change_amount_input=$("<input class='form-control-custom' id='change_amount_input' class='custom_input_css'>")
                        colmd2.append(change_amount_input)
                         
                    row__col_two__row_six.append(colmd1);
                    row__col_two__row_six.append(colmd2);
                    row__col_two__row_six.append(colmd3);
                col_two__row_six.append(row__col_two__row_six);
            
            row_six.append(col_one__row_six)
            row_six.append(col_two__row_six)





            var row_three=$("<div class='row' style=' padding-bottom:10px;'></div>")

                var col_one__row_three=$("<div class='col-md-8'></div>");
                    row__col_one__row_three=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-3'></div>")
                        var colmd2=$("<div class='col-md-9'></div>")
                            var reason_label=$("<label for='reason_label' class='custom_label_css'>Discount Reason</label>");
                        colmd1.append(reason_label)
                            discount_reason_input=$("<input class='form-control-custom' id='discount_reason_input' class='custom_input_css'>")
                        colmd2.append(discount_reason_input)
                    row__col_one__row_three.append(colmd1);
                    row__col_one__row_three.append(colmd2);
                col_one__row_three.append(row__col_one__row_three);

                var col_two__row_three=$("<div class='col-md-4'></div>");
                    row__col_two__row_three=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-6'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                        var colmd3=$("<div class='col-md-3'></div>")

                            var bill_status_label=$("<label for='reason_label' class='custom_label_css float-right'>Add Bill Status</label>");
                        colmd1.append(bill_status_label)
                            var option1_input=$("<input  type='radio' name='Paid_NotPaid' value='Paid' checked>Paid</input>");
                        colmd2.append(option1_input)
                            var option2_input=$("<input  type='radio' name='Paid_NotPaid' value='NotPaid'>Not Paid</input>");  
                        colmd3.append(option2_input)
                    row__col_two__row_three.append(colmd1);
                    row__col_two__row_three.append(colmd2);
                    row__col_two__row_three.append(colmd3);
                col_two__row_three.append(row__col_two__row_three);

            row_three.append(col_one__row_three)
            row_three.append(col_two__row_three)


            var row_four=$("<div class='row' style=' padding-bottom:10px;'></div>")

                var col_one__row_four=$("<div class='col-md-12'></div>");
                            row__col_one__row_four=$("<div class='row'></div>");
                                var colmd1=$("<div class='col-md-2'></div>")
                                var colmd2=$("<div class='col-md-2'></div>")
                                
                                    var doctor=$("<label for='doctor_label' class='custom_label_css'>Doctor</label>");
                                    colmd1.append(doctor)

                                    var select=$("<select id='selecteddoctor' class='form-control-custom'></select>");
                                        var option=$("<option selected='selected' value='--'>--</option>");
                                    $(select).append(option);

                                    for (var key in empdict){
                                        var option=$("<option id='"+key+"_doc-opt' value='"+key+"'>"+empdict[key]+"</option>");
                                        $(select).append(option);
                                    } 
                                    colmd2.append(select)

                            row__col_one__row_four.append(colmd1);
                            row__col_one__row_four.append(colmd2);

                        col_one__row_four.append(row__col_one__row_four);

            row_four.append(col_one__row_four)

            var row_five=$("<div class='row' style=' padding-bottom:10px;'></div>")

                var col_one__row_five=$("<div class='col-md-12'></div>");
                        row__col_one__row_five=$("<div class='row'></div>");
                            colmd1=$("<div class='col-md-3'></div>")
                            colmd2=$("<div class='col-md-6'></div>")
                            colmd3=$("<div class='col-md-3'></div>")

                            GenPres_button=$('<button class="save_btn fa fa-print" onclick="printPrescriptionForm()"> Print Prescription</button>')
                            colmd2.append(GenPres_button)
                            
                        row__col_one__row_five.append(colmd1);
                        row__col_one__row_five.append(colmd2);
                        row__col_one__row_five.append(colmd3);

                    col_one__row_five.append(row__col_one__row_five);

            row_five.append(col_one__row_five)

        main_col__row_five.append(row_one)
        main_col__row_five.append(row_two)
        main_col__row_five.append(row_three)
        main_col__row_five.append(row_six)

        main_col__row_five.append(row_four)
        main_col__row_five.append(row_five)

    row_div_five.append(main_col__row_five)
main_col_div.append(row_div_five)
}
function createEmergencyPresFormDiv(){
    var main_col_div=$('#main_col_div')
        var row_div_five=$("<div class='' id='gen_pres_form_div'></div>");

            var main_col__row_five=$("<div class='col-md-12'></div>");

                var row_one=$("<div class='row' style='padding-bottom:10px;'></div>")

                    var col_one__row_one=$("<div class='col-md-12'></div>");
                            row__col_one__row_one=$("<div class='row'></div>");
                                var colmd1=$("<div class='col-md-2'></div>")
                                var colmd2=$("<div class='col-md-2'></div>")
                                
                                    var emergencyamount_label=$("<label  class='custom_label_css'>Emergency Fee</label>");
                                    colmd1.append(emergencyamount_label)

                                    emergencyamount_input=$("<input class='form-control-custom' onfocusout='EmergencyTotalAmountFocousOutGenPres($(this))' id='totalamount_input'  class='custom_input_css'>")
                                    colmd2.append(emergencyamount_input)

                            row__col_one__row_one.append(colmd1);
                            row__col_one__row_one.append(colmd2);

                        col_one__row_one.append(row__col_one__row_one);

                row_one.append(col_one__row_one)
                var row_two=$("<div class='row' style='padding-bottom:10px;'></div>")

                    var col_one__row_two=$("<div class='col-md-12'></div>");
                            row__col_one__row_two=$("<div class='row'></div>");
                                var colmd1=$("<div class='col-md-2'></div>")
                                var colmd2=$("<div class='col-md-2'></div>")
                                var colmd3=$("<div class='col-md-2'></div>")
                                var colmd4=$("<div class='col-md-2'></div>")
                                var colmd5=$("<div class='col-md-2'></div>")
                                var colmd6=$("<div class='col-md-2'></div>")

                                var discountamount_label=$("<label for='outdoorAmount_tag' class='custom_label_css'>Discount Amount</label>");
                                colmd1.append(discountamount_label)

                                discountamount_input=$("<input class='form-control-custom' id='discountamount_input' onfocusout='discountAmountFocousOutPres($(this))' class='custom_input_css'>")
                                colmd2.append(discountamount_input)

                                var discountPercernt_label=$("<label for='discountPercernt_label' class='custom_label_css float-right'>Discount Percent</label>");
                                colmd3.append(discountPercernt_label)

                                discountpercent_input=$("<input class='form-control-custom' id='discountpercent_input' class='custom_input_css'>")
                                colmd4.append(discountpercent_input)

                                var amountDue_label=$("<label for='amountdue_label' class='custom_label_css float-right'>Net Total</label>");
                                colmd5.append(amountDue_label)

                                amountdue_input=$("<input class='form-control-custom' onfocusin='netTotalFocusInPres()' id='amountdue_input'>")
                                colmd6.append(amountdue_input)

                            row__col_one__row_two.append(colmd1);
                            row__col_one__row_two.append(colmd2);
                            row__col_one__row_two.append(colmd3);
                            row__col_one__row_two.append(colmd4);
                            row__col_one__row_two.append(colmd5);
                            row__col_one__row_two.append(colmd6);

                        col_one__row_two.append(row__col_one__row_two);

                row_two.append(col_one__row_two)

                var row_three=$("<div class='row' style='padding-bottom:10px;'></div>")

                    var col_one__row_three=$("<div class='col-md-8'></div>");
                            row__col_one__row_three=$("<div class='row'></div>");
                                var colmd1=$("<div class='col-md-3'></div>")
                                var colmd2=$("<div class='col-md-9'></div>")
                                    var reason_label=$("<label for='reason_label' class='custom_label_css'>Discount Reason</label>");
                                colmd1.append(reason_label)
                                    discount_reason_input=$("<input class='form-control-custom' id='discount_reason_input' class='custom_input_css'>")
                                colmd2.append(discount_reason_input)
                            row__col_one__row_three.append(colmd1);
                            row__col_one__row_three.append(colmd2);
                        col_one__row_three.append(row__col_one__row_three);

                    var col_two__row_three=$("<div class='col-md-4'></div>");
                        row__col_two__row_three=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-6'></div>")
                            var colmd2=$("<div class='col-md-3'></div>")
                            var colmd3=$("<div class='col-md-3'></div>")
    
                                var bill_status_label=$("<label for='reason_label' class='custom_label_css float-right'>Add Bill Status</label>");
                            colmd1.append(bill_status_label)
                                var option1_input=$("<input  type='radio' name='Paid_NotPaid' value='Paid' checked>Paid</input>");
                            colmd2.append(option1_input)
                                var option2_input=$("<input  type='radio' name='Paid_NotPaid' value='NotPaid'>Not Paid</input>");  
                            colmd3.append(option2_input)
                        row__col_two__row_three.append(colmd1);
                        row__col_two__row_three.append(colmd2);
                        row__col_two__row_three.append(colmd3);
                    col_two__row_three.append(row__col_two__row_three);
    
                row_three.append(col_one__row_three)
                row_three.append(col_two__row_three)

                var row_four=$("<div class='row' style='padding-bottom:10px;'></div>")

                    var col_one__row_four=$("<div class='col-md-12'></div>");
                            row__col_one__row_four=$("<div class='row'></div>");
                                var colmd1=$("<div class='col-md-2'></div>")
                                var colmd2=$("<div class='col-md-2'></div>")
                                
                                    var doctor=$("<label for='doctor_label' class='custom_label_css'>Doctor</label>");
                                    colmd1.append(doctor)

                                    var select=$("<select id='selecteddoctor' class='form-control-custom'></select>");
                                        var option=$("<option selected='selected' value='--'>--</option>");
                                    $(select).append(option);

                                    for (var key in empdict){
                                        var option=$("<option id='"+key+"_doc-opt' value='"+key+"'>"+empdict[key]+"</option>");
                                        $(select).append(option);
                                    } 
                                    colmd2.append(select)

                            row__col_one__row_four.append(colmd1);
                            row__col_one__row_four.append(colmd2);

                        col_one__row_four.append(row__col_one__row_four);

                row_four.append(col_one__row_four)
                

                var row_six=$("<div class='row' style=' padding-bottom:10px;'></div>")

                    var col_one__row_six=$("<div class='col-md-6'></div>");
                        row__col_one__row_six=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-4'></div>")
                            var colmd2=$("<div class='col-md-3'></div>")
                                var amount_recieved_label=$("<label for='reason_label' class='custom_label_css'>Amount Recieved</label>");
                            colmd1.append(amount_recieved_label)
                                amount_recieved_input=$("<input class='form-control-custom' id='amount_recieved_input'  onfocusout='calculateChangeAmount($(this))'   class='custom_input_css'>")
                            colmd2.append(amount_recieved_input)
                        row__col_one__row_six.append(colmd1);
                        row__col_one__row_six.append(colmd2);
                    col_one__row_six.append(row__col_one__row_six);

                    var col_two__row_six=$("<div class='col-md-4'></div>");
                        row__col_two__row_six=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-3'></div>")
                            var colmd2=$("<div class='col-md-3'></div>")
                            var colmd3=$("<div class='col-md-3'></div>")

                                var change_amount_label=$("<label for='reason_label' class='custom_label_css float-right'>Change Amount</label>");
                            colmd1.append(change_amount_label)
                                change_amount_input=$("<input class='form-control-custom' id='change_amount_input' class='custom_input_css'>")
                            colmd2.append(change_amount_input)
                            
                        row__col_two__row_six.append(colmd1);
                        row__col_two__row_six.append(colmd2);
                        row__col_two__row_six.append(colmd3);
                    col_two__row_six.append(row__col_two__row_six);
            
            row_six.append(col_one__row_six)
            row_six.append(col_two__row_six)





                var row_five=$("<div class='row' style='padding-bottom:10px;'></div>")

                    var col_one__row_five=$("<div class='col-md-12'></div>");
                            row__col_one__row_five=$("<div class='row'></div>");
                                colmd1=$("<div class='col-md-3'></div>")
                                colmd2=$("<div class='col-md-6'></div>")
                                colmd3=$("<div class='col-md-3'></div>")

                                GenPres_button=$('<button class="save_btn fa fa-print" onclick="printPrescriptionForm()"> Print Prescription</button>')
                                colmd2.append(GenPres_button)
                                
                            row__col_one__row_five.append(colmd1);
                            row__col_one__row_five.append(colmd2);
                            row__col_one__row_five.append(colmd3);

                        col_one__row_five.append(row__col_one__row_five);

                row_five.append(col_one__row_five)

            main_col__row_five.append(row_one)
            main_col__row_five.append(row_two)
            main_col__row_five.append(row_three)
            main_col__row_five.append(row_six)

            main_col__row_five.append(row_four)
            main_col__row_five.append(row_five)

        row_div_five.append(main_col__row_five)
    main_col_div.append(row_div_five)

}

function calculateChangeAmount(ele){
    var amount_recieved_input=$("#amount_recieved_input").val();
    var amountdue_input=$("#amountdue_input").val();
    var change_amount_input=$("#change_amount_input").val();
    var change=amount_recieved_input-amountdue_input;
    if (change>=0){
        $("#change_amount_input").val(change);
    }
    
}
function calculateChangeAmountDesp(ele){
    var amount_recieved_input=$("#amount_recieved_input").val();
    var amountdue_input=$("#nettotal_input").val();
    var change_amount_input=$("#change_amount_input").val();
    var change=amount_recieved_input-amountdue_input;
    if (change>=0){
        $("#change_amount_input").val(change);
    }
    
}
function pat_type_OnSelect(element){
    
     optionSelected = $(element).val()
   
    console.log("optionSelected",optionSelected)

    if (optionSelected==='Outdoor'){
        $('#gen_pres_form_div').remove();
       
        if (room_datatable!==undefined){
            room_datatable.destroy();
            room_datatable =undefined;

            $("#genpres_room_datatablediv").remove();
            $("#row_div_seven").remove();

        }
        else if (ward_datatable!==undefined){

            ward_datatable.destroy();
            ward_datatable =undefined;

            $("#genpres_ward_datatablediv").remove();
            $("#row_div_seven").remove();

        }
        createOutDoorPresFormDiv();
        retrievePatTypeFee();
        $("#totalamount_input").focus();

}
    else if (optionSelected==='Emergency'){
        $('#gen_pres_form_div').remove();
       
        if (room_datatable!==undefined){
            room_datatable.destroy();
            room_datatable =undefined;

            $("#genpres_room_datatablediv").remove();
            $("#row_div_seven").remove();

        }
        else if (ward_datatable!==undefined){

            ward_datatable.destroy();
            ward_datatable =undefined;

            $("#genpres_ward_datatablediv").remove();
            $("#row_div_seven").remove();

        }

        $('#tokenNumber_label').show();
        $('#tokenNumber_disp').show();
        createEmergencyPresFormDiv();
        retrievePatTypeFee()
        $("#totalamount_input").focus();

    
    }
    else if (optionSelected==='Indoor'){
        $('#gen_pres_form_div').remove();


        var main_col_div=$('#main_col_div')
        var row_div_five=$("<div class='' id='gen_pres_form_div'></div>");

            var main_col__row_five=$("<div class='col-md-12'></div>");
                var row_one=$("<div class='row'></div>")
                    var col_one__row_one=$("<div class='col-md-12'></div>");
                            row__col_one__row_one=$("<div class='row'></div>");
                                var colmd1=$("<div class='col-md-2'></div>")
                                var colmd2=$("<div class='col-md-2'></div>")
                                
                                var ward_type_label=$("<label for='ward_type_tag' class='custom_label_css'>Ward/Room</label>");
                                colmd1.append(ward_type_label)

                                var select=$("<select id='ward_type_input' class='form-control-custom' onchange='onSelectWardRoom($(this))'></select>");
                                    var option=$("<option selected='selected' value='--'>--</option>");
                                    var option1=$("<option id="+ward_type_list[0]+"-opt value="+ward_type_list[0]+">"+ward_type_list[0]+"</option>");
                                $(select).append(option);
                                $(select).append(option1);

                                for (var i=1;i<=ward_type_list.length;i++){
                                    if (ward_type_list[i]!==undefined){
                                        var option=$("<option id="+ward_type_list[i]+"-opt value="+ward_type_list[i]+">"+ward_type_list[i]+"</option>");
                                        $(select).append(option);
                                    }
                                } 
                                colmd2.append(select) 

                            row__col_one__row_one.append(colmd1);
                            row__col_one__row_one.append(colmd2);

                    col_one__row_one.append(row__col_one__row_one);
                row_one.append(col_one__row_one)
            main_col__row_five.append(row_one)

        row_div_five.append(main_col__row_five)
        
    main_col_div.append(row_div_five)

    }
    else{
        $('#row_div_five').remove();
        if (room_datatable!==undefined){
            room_datatable.destroy();
            room_datatable =undefined;

            $("#genpres_room_datatablediv").remove();
            $("#row_div_seven").remove();
        }
        else if (ward_datatable!==undefined){
            ward_datatable.destroy();
            ward_datatable =undefined;

            $("#genpres_ward_datatablediv").remove();
            $("#row_div_seven").remove();
        }

    }
}
function retrievePatTypeFee(){
    $.ajax({
        type: 'GET',
        dataType: "json",

        url: '/retrieve_pat_type_fee',
        'data': {
            'optionSelected':optionSelected,
        },
        success: function(data){
            charges=data['charges']
            console.log('charges', charges)
            $("#totalamount_input").val(charges)
        },
    })
}
function printPrescriptionForm(){
    var pat_type= $("#pat_type_input").val();
    var ward_type= $("#ward_type_input").val();

    var patient_name=patient_dict[patient_id_selected]['name'];
    patient_name=patient_name.toUpperCase();
    console.log("patient_name", patient_name);

    var pat_id= patient_id_selected;
    console.log("patient id", pat_id);

    var patient_gender=patient_dict[patient_id_selected]['gender'];
    patient_gender=patient_gender.toUpperCase();
    console.log("patient_gender", patient_gender);

    var today = new Date();
    var DOB = patient_dict[patient_id_selected]['dob']
    var DOB = new Date(DOB);
    var totalMonths = (today.getFullYear() - DOB.getFullYear()) * 12 + today.getMonth() - DOB.getMonth();
    totalMonths += today.getDay() < DOB.getDay() ? -1 : 0;
    var years = today.getFullYear() - DOB.getFullYear();
    if (DOB.getMonth() > today.getMonth())
        years = years - 1;
    else if (DOB.getMonth() === today.getMonth())
        if (DOB.getDate() > today.getDate())
            years = years - 1;

    var days;
    var months;

    if (DOB.getDate() > today.getDate()) {
        months = (totalMonths % 12);
        if (months == 0)
            months = 11;
        var x = today.getMonth();
        switch (x) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12: {
                var a = DOB.getDate() - today.getDate();
                days = 31 - a;
                break;
            }
            default: {
                var a = DOB.getDate() - today.getDate();
                days = 30 - a;
                break;
            }
        }
    }
    else {
        days = today.getDate() - DOB.getDate();
        if (DOB.getMonth() === today.getMonth())
            months = (totalMonths % 12);
        else
            months = (totalMonths % 12) + 1;
    }
    console.log("AGE IN YEARS",years);
    if(years>1){
        var age = years;
        console.log("YEARS GREATETER THAN 1",age)

    }

    var patient_type = $("#pat_type_input").val()
    $("#pat_type_input").val();
    var discountamount=$("#discountamount_input").val();
    if (discountamount===""){discountamount=0}
    $("#discountamount_input").val("");
    var discountPercent=$("#discountpercent_input").val();
    if (discountPercent===""){discountPercent=0}
    $("#discountpercent_input").val("");
    var discount_reason=$("#discount_reason_input").val();
    $("#discount_reason_input").val("");
    var doctor = $("#selecteddoctor").val();
    var doctor_name = $("#selecteddoctor option:selected").text();
    $("#selecteddoctor").val("--");
    var bill_status=$("input[name='Paid_NotPaid']:checked").val();
    var amountdue_input=$("#amountdue_input").val()
    var totalamount_input=$("#totalamount_input").val();
    
    var amount_recieved_input=$("#amount_recieved_input").val();
    var change_amount_input=$("#change_amount_input").val();
    
    var pat_contact_no=patient_dict[patient_id_selected]['contact_no'];
    var pat_address=patient_dict[patient_id_selected]['address'];
    var bloodgroup=patient_dict[patient_id_selected]['bloodgroup'];
    bloodgroup=bloodgroup.toUpperCase();
    var presData={};
    required_fields_left=false
    if (amountdue_input===""){
        $("#empty_name_check_div_amountdue_input").remove();

        var div=$("<div class='empty_name_check_div' id='empty_name_check_div_"+ $("#amountdue_input").attr('id')+"'><span  class='glyphicon' style='font-size:1rem;color:red'>&#x2a;Required</span></div>")
        $("#amountdue_input").parent().append(div);
        required_fields_left=true

    }else{
        if($("#amountdue_input").parent().find(".empty_name_check_div").length > 0){
            $("#empty_name_check_div_amountdue_input").remove();
        }
    }
    if (doctor==="--"){
        $("#empty_name_check_div_selecteddoctor").remove();
        var div=$("<div class='empty_name_check_div' id='empty_name_check_div_"+ $("#selecteddoctor").attr('id')+"'><span  class='glyphicon' style='font-size:1rem;color:red'>&#x2a;Required</span></div>")
        $("#selecteddoctor").parent().append(div);
        required_fields_left=true;
    }else{
        if($("#selecteddoctor").parent().find(".empty_name_check_div").length > 0){
            $("#empty_name_check_div_selecteddoctor").remove();
        }
    }
    if (totalamount_input=="" || totalamount_input==0){
        $("#empty_name_check_div_totalamount_input").remove();
        var div=$("<div class='empty_name_check_div' id='empty_name_check_div_"+ $("#totalamount_input").attr('id')+"'><span  class='glyphicon' style='font-size:1rem;color:red'>&#x2a;Required</span></div>")
        $("#totalamount_input").parent().append(div);
        required_fields_left=true;
    }
    else{
        if($("#totalamount_input").parent().find(".empty_name_check_div").length > 0){
            $("#empty_name_check_div_totalamount_input").remove();
        }
    }
    if (amount_recieved_input===""){
        $("#empty_name_check_div_selecteddoctor").remove();
        var div=$("<div class='empty_name_check_div' id='empty_name_check_div_"+ $("#amount_recieved_input").attr('id')+"'><span  class='glyphicon' style='font-size:1rem;color:red'>&#x2a;Required</span></div>")
        $("#amount_recieved_input").parent().append(div);
        required_fields_left=true;
    }else{
        if($("#amount_recieved_input").parent().find(".empty_name_check_div").length > 0){
            $("#empty_name_check_div_amount_recieved_input").remove();
        }
    }
    if (required_fields_left==true){
        return;
    }
    if (pat_type==='Outdoor'){
        console.log("Out Patient")
    }
    else if (pat_type==='Emergency'){
        console.log("Emergency Patient")
    }
    else{     
        if (ward_type==='Ward'){

            var wardNumber=ward_dict[ward_id_selected]['ward_no']
            var bedNumber=ward_dict[ward_id_selected]['bed_no']
            
            var admitreason=$("#admit_reason_input").val();
            $("#admit_reason_input").val("");
            var consultant=$("#selectedconsultant").val();
            var consultant_name=$("#selectedconsultant option:selected").text();

            $("#selectedconsultant").val("--");
            var patient_type = $("#pat_type_input").val()
            $("#pat_type_input").val();
            var ward_type = $("#ward_type_input").val()
            $("#ward_type_input").val()

           
            presData['ward_id']=ward_id_selected;
            presData["ward"]= wardNumber;
            presData["bed"]= bedNumber;
            presData["consultant"]= consultant;
            presData["consultant_name"]= consultant_name;

            presData["admitreason"]= admitreason;
            presData["bed_type"]=ward_type;

            console.log("In Patient-- Ward")

        }
        else if (ward_type==='Room'){

            var roomNumber=room_dict[room_id_selected]['room_no']
            
            var admitreason=$("#admit_reason_input").val();
            $("#admit_reason_input").val("")
            var consultant=$("#selectedconsultant").val();
            var consultant_name=$("#selectedconsultant option:selected").text();

            $("#selectedconsultant").val("--");
            var patient_type = $("#pat_type_input").val()
            $("#pat_type_input").val("--");
            var ward_type = $("#ward_type_input").val()
            console.log("ward_type", ward_type);
            $("#ward_type_input").val();

            presData['room_id']=room_id_selected;
            presData["roomNo"]= roomNumber;
            presData["consultant"]= consultant;
            presData["consultant_name"]= consultant_name;

            presData["admitreason"]= admitreason;
            presData["bed_type"]=ward_type;
            

            console.log("In Patient-- Room")

         
        }
    }
    presData["name"]= patient_name;
    presData["gender"]= patient_gender;
    presData['contact_no']=pat_contact_no
    presData['address']=pat_address;
    presData['bloodgroup']=bloodgroup

    
    presData["pat_id"]= pat_id;
    presData["pat_type"]= patient_type;

    presData["discount"]= discountamount;
    presData["discount_percent"]= discountPercent;
    presData["discount_reason"]= discount_reason;
    presData["doctor"]= doctor;
    presData["doctor_name"]= doctor_name;


    presData["fee_amount"]= totalamount_input;
    presData['net_total']=amountdue_input;
    presData["amount_recieved"]=amount_recieved_input
    presData["change_amount"]=change_amount_input

    presData['status']=bill_status;
    console.log("presData--",presData)
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': { 
            'presData':JSON.stringify(presData),
        },
        url: '/generate_prescription',
        success: function(data){
            console.log(data['Success']);
            $('.modal-loading').hide();
            window.location.replace("/print_patient_prescription")
            


        },
    });
}
function createWardDataTable(){
    console.log("ward_list",ward_list)
    $(function(){
        ward_datatable=$("#available_ward_table").DataTable({
            data:ward_list,
            columns: [
                { title: "Id" },
                { title: "Ward No" },
                { title: "Bed Number" },
                { title: 'Charge Per Day' },

                ],
                paging: false,
                scrollY: 130,
                scrollX: true,
                ordering: true,
                info:false,
                searching:false,
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'print',
                        text: 'PRINT',
                        title: 'Ward Info',
                        className: 'datatable_button printbtn fas fa-print',

                    },
                     {
                        extend: 'excel',
                        text: ' EXCEL',
                        title:'Ward Info',
                        className: 'datatable_button  excelbtn fas fa-file-excel',

                    },
                     {
                        extend: 'csv',
                        text: ' CSV',
                        title: 'Ward Info',
                        className: 'datatable_button csvbtn fas fa-file',

                    },
                    {
                        extend: 'pdf',
                        text: ' PDF',
                        title: 'Ward Info',
                        className: 'datatable_button pdfbtn fas fa-file-pdf',

                    },
                    
                ],
    
            });
            $('#available_ward_table tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    alert("clicked same entry")
                }
                else{
                    ward_id_selected=$(this).find('td').eq(0).text()

                    ward_datatable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    console.log("ward dict on click",ward_dict);
                    $("#row_div_seven").remove();
                    var row_div_seven=$("<div class=' room_ward_calculation_genpres_form' id='row_div_seven'></div>");
                        var main_subcol=$("<div class='col-md-12'></div>");

                            var subrow_one=$("<div class='row' style='padding-top:30px;'></div>")

                                var col_one__subrow_one=$("<div class='col-md-12'></div>");
                                    row__col_one__subrow_one=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-2'></div>")
                                        var colmd2=$("<div class='col-md-1'></div>")
                                        var colmd3=$("<div class='col-md-2 offset-md-1'></div>")
                                        var colmd4=$("<div class='col-md-1'></div>")

                                            var wardNo_label=$("<label for='wardno_label' class='custom_label_css'>Ward No</label>");
                                            var wardNo_input=$("<input  id='wardno_input' class='custom_input_css form-control-custom' style='background: white;' value='"+ward_dict[ward_id_selected]['ward_no']+"' disabled>")

                                            var bedNo_label=$("<label for='bedno_label' class='custom_label_css float-right'>Bed No</label>");
                                            var BedNo_input=$("<input  id='bedno_input' class='custom_input_css form-control-custom' style='background: white;' value='"+ward_dict[ward_id_selected]['bed_no']+"' disabled>")
                                            
                                        colmd1.append(wardNo_label)
                                        colmd2.append(wardNo_input)
                                        colmd3.append(bedNo_label)
                                        colmd4.append(BedNo_input)

                                    row__col_one__subrow_one.append(colmd1);
                                    row__col_one__subrow_one.append(colmd2);
                                    row__col_one__subrow_one.append(colmd3);
                                    row__col_one__subrow_one.append(colmd4);                                            

                                col_one__subrow_one.append(row__col_one__subrow_one);

                            subrow_one.append(col_one__subrow_one)

                            var subrow_two=$("<div class='row' style='padding-top:10px;padding-bottom:10px;'></div>")
                                var col_one_subrow_two=$("<div class='col-md-8'></div>");
                                    var row__col_one_subrow_two=$("<div class='row'></div>");
                                        colmd1=$("<div class='col-md-3'></div>")
                                        colmd2=$("<div class='col-md-9'></div>")

                                            var admit_reason_label=$("<label class='custom_label_css' >Admit reason</label>");
                                            var admit_reason_input=$("<textarea class='form-control-custom' type='text' id='admit_reason_input'  style='width:inherit;'></textarea>")

                                        colmd1.append(admit_reason_label)
                                        colmd2.append(admit_reason_input)
                            
                                    row__col_one_subrow_two.append(colmd1);
                                    row__col_one_subrow_two.append(colmd2);
                            
                                col_one_subrow_two.append(row__col_one_subrow_two);
                            subrow_two.append(col_one_subrow_two)

                            var subrow_three=$("<div class='row' style='padding-bottom:10px;'></div>")
                                var col_one__subrow_three=$("<div class='col-md-4'></div>");
                                    var row__col_one__subrow_three=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-6'></div>")
                                        var colmd2=$("<div class='col-md-6'></div>")
                                        
                                            var doconduty_label=$("<label  class='custom_label_css'>Doctor on Duty</label>");
                                            var select=$("<select id='selecteddoctor' class='form-control-custom'></select>");
                                                var option=$("<option selected='selected' value='--'>--</option>");
                                            $(select).append(option);

                                                    for (var key in empdict){
                                                        var option=$("<option id='"+key+"_doc-opt' value='"+key+"'>"+empdict[key]+"</option>");
                                                        $(select).append(option);

                                                    }
                                        colmd1.append(doconduty_label)
                                        colmd2.append(select);
                                
                                        row__col_one__subrow_three.append(colmd1);
                                        row__col_one__subrow_three.append(colmd2);
                                col_one__subrow_three.append(row__col_one__subrow_three);

                                var col_two__subrow_three=$("<div class='col-md-4'></div>");
                                    var row__col_two__subrow_three=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-6'></div>")
                                        var colmd2=$("<div class='col-md-6'></div>")
                                            var consultant_label=$("<label for='Consultant_label' class='custom_label_css float-right'>Consultant</label>");
                                            var select=$("<select id='selectedconsultant' class='form-control-custom'></select>");
                                                var option=$("<option selected='selected' value='--'>--</option>");
                                            $(select).append(option);

                                                for (var key in empdict){
                                                    var option=$("<option id='"+key+"_doc-opt' value='"+key+"'>"+empdict[key]+"</option>");
                                                    $(select).append(option);

                                                }
                                        colmd1.append(consultant_label);
                                        colmd2.append(select);
                        
                                    row__col_two__subrow_three.append(colmd1);
                                    row__col_two__subrow_three.append(colmd2);
                                col_two__subrow_three.append(row__col_two__subrow_three);

                            subrow_three.append(col_one__subrow_three)
                            subrow_three.append(col_two__subrow_three)

                            
                            var subrow_five=$("<div class='row' style='padding-bottom:10px;'></div>")

                            var col_one__subrow_five=$("<div class='col-md-12'></div>");
                                row__col_one__subrow_five=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-2'></div>")
                                        var colmd2=$("<div class='col-md-2'></div>")
                                        
                                            var indoor_admit_fee_label=$("<label for='indoor_fee_tag' class='custom_label_css'>Admission Fee</label>");
                                            indoor_admit_fee_input=$("<input class='form-control-custom' onfocusout='InDoorTotalAmountFocousOutGenPres($(this))' id='totalamount_input'  class='custom_input_css'>")

                                        colmd1.append(indoor_admit_fee_label)
                                        colmd2.append(indoor_admit_fee_input)

                                    row__col_one__subrow_five.append(colmd1);
                                    row__col_one__subrow_five.append(colmd2);

                                col_one__subrow_five.append(row__col_one__subrow_five);

                            subrow_five.append(col_one__subrow_five)
                            
                            var subrow_six=$("<div class='row' style='padding-bottom:10px;'></div>")

                                var col_one__subrow_six=$("<div class='col-md-12'></div>");
                                    row__col_one__subrow_six=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-2'></div>")
                                        var colmd2=$("<div class='col-md-2'></div>")
                                        var colmd3=$("<div class='col-md-2'></div>")
                                        var colmd4=$("<div class='col-md-2'></div>")
                                        var colmd5=$("<div class='col-md-2'></div>")
                                        var colmd6=$("<div class='col-md-2'></div>")

                                            var discountamount_label=$("<label for='indoor_disc_tag' class='custom_label_css'>Discount Amount</label>");
                                            var discountamount_input=$("<input class='form-control-custom' id='discountamount_input' onfocusout='discountAmountFocousOutPres($(this))' class='custom_input_css'>")
                                            var discountPercernt_label=$("<label for='discountPercernt_label' class='custom_label_css float-right'>Discount Percent</label>");
                                            var discountpercent_input=$("<input class='form-control-custom' id='discountpercent_input' class='custom_input_css'>")
                                            var amountDue_label=$("<label for='amountDue_label' class='custom_label_css float-right'>Net Total</label>");
                                            var amountdue_input=$("<input class='form-control-custom' onfocusin='netTotalFocusInPres()' id='amountdue_input'>")

                                        colmd1.append(discountamount_label)
                                        colmd2.append(discountamount_input)
                                        colmd3.append(discountPercernt_label)
                                        colmd4.append(discountpercent_input)
                                        colmd5.append(amountDue_label)
                                        colmd6.append(amountdue_input)

                                    row__col_one__subrow_six.append(colmd1);
                                    row__col_one__subrow_six.append(colmd2);
                                    row__col_one__subrow_six.append(colmd3);
                                    row__col_one__subrow_six.append(colmd4);
                                    row__col_one__subrow_six.append(colmd5);
                                    row__col_one__subrow_six.append(colmd6);

                                col_one__subrow_six.append(row__col_one__subrow_six);

                            subrow_six.append(col_one__subrow_six)

                            var subrow_seven=$("<div class='row' style='padding-bottom:10px;'></div>")

                                var col_one__subrow_seven=$("<div class='col-md-8'></div>");
                                    row__col_one__subrow_seven=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-3'></div>")
                                        var colmd2=$("<div class='col-md-9'></div>")
                                            var reason_label=$("<label for='discount_reason_label' class='custom_label_css'>Discount Reason</label>");
                                            reason_input=$("<input class='form-control-custom' id='discount_reason_input' class='custom_input_css'>")
                                        colmd1.append(reason_label)
                                        colmd2.append(reason_input)
                                    row__col_one__subrow_seven.append(colmd1);
                                    row__col_one__subrow_seven.append(colmd2);
                                col_one__subrow_seven.append(row__col_one__subrow_seven);

                                var col_two__subrow_seven=$("<div class='col-md-4'></div>");
                                    row__col_two__subrow_seven=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-6'></div>")
                                        var colmd2=$("<div class='col-md-3'></div>")
                                        var colmd3=$("<div class='col-md-3'></div>")
                                            
                                            var bill_status_label=$("<label for='reason_label' class='custom_label_css float-right'>Add Bill Status</label>");
                                        colmd1.append(bill_status_label)
                                            var option1_input=$("<input  type='radio' name='Paid_NotPaid' value='Paid' checked>Paid</input>");
                                        colmd2.append(option1_input)
                                            var option2_input=$("<input  type='radio' name='Paid_NotPaid' value='NotPaid'>Not Paid</input>");  
                                        colmd3.append(option2_input)

                                    row__col_two__subrow_seven.append(colmd1);
                                    row__col_two__subrow_seven.append(colmd2);
                                    row__col_two__subrow_seven.append(colmd3);

                                col_two__subrow_seven.append(row__col_two__subrow_seven);
                            
                            subrow_seven.append(col_one__subrow_seven)
                            subrow_seven.append(col_two__subrow_seven)

                            var subrow_nine=$("<div class='row' style=' padding-bottom:10px;'></div>")

                                var col_one__subrow_nine=$("<div class='col-md-6'></div>");
                                    row__col_one__subrow_nine=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-4'></div>")
                                        var colmd2=$("<div class='col-md-3'></div>")
                                            var amount_recieved_label=$("<label for='reason_label' class='custom_label_css'>Amount Recieved</label>");
                                        colmd1.append(amount_recieved_label)
                                            amount_recieved_input=$("<input class='form-control-custom' id='amount_recieved_input'  onfocusout='calculateChangeAmount($(this))'   class='custom_input_css'>")
                                        colmd2.append(amount_recieved_input)
                                    row__col_one__subrow_nine.append(colmd1);
                                    row__col_one__subrow_nine.append(colmd2);
                                col_one__subrow_nine.append(row__col_one__subrow_nine);
            
                                var col_two__subrow_nine=$("<div class='col-md-4'></div>");
                                    row__col_two__subrow_nine=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-3'></div>")
                                        var colmd2=$("<div class='col-md-3'></div>")
                                        var colmd3=$("<div class='col-md-3'></div>")
            
                                            var change_amount_label=$("<label for='reason_label' class='custom_label_css float-right'>Change Amount</label>");
                                        colmd1.append(change_amount_label)
                                            change_amount_input=$("<input class='form-control-custom' id='change_amount_input' class='custom_input_css'>")
                                        colmd2.append(change_amount_input)
                                        
                                        row__col_two__subrow_nine.append(colmd1);
                                    row__col_two__subrow_nine.append(colmd2);
                                    row__col_two__subrow_nine.append(colmd3);
                                col_two__subrow_nine.append(row__col_two__subrow_nine);
                    
                            subrow_nine.append(col_one__subrow_nine)
                            subrow_nine.append(col_two__subrow_nine)



                    
                            var subrow_eight=$("<div class='row' style='padding-bottom:10px;'></div>")

                                var col_one__subrow_eight=$("<div class='col-md-12'></div>");
                                        row__col_one__subrow_eight=$("<div class='row'></div>");
                                            colmd1=$("<div class='col-md-3'></div>")
                                            colmd2=$("<div class='col-md-6'></div>")
                                            colmd3=$("<div class='col-md-3'></div>")

                                            GenPres_button=$('<button class="save_btn fa fa-print" onclick="printPrescriptionForm()">Print Prescription</button>')
                                            colmd2.append(GenPres_button)
                                            
                                            row__col_one__subrow_eight.append(colmd1);
                                        row__col_one__subrow_eight.append(colmd2);
                                        row__col_one__subrow_eight.append(colmd3);

                                    col_one__subrow_eight.append(row__col_one__subrow_eight);

                            subrow_eight.append(col_one__subrow_eight)
                        
                    main_subcol.append(subrow_one)
                    main_subcol.append(subrow_two)
                    main_subcol.append(subrow_three)
                    main_subcol.append(subrow_five)
                    main_subcol.append(subrow_six)
                    main_subcol.append(subrow_seven)
                    main_subcol.append(subrow_nine)

                    main_subcol.append(subrow_eight);

                row_div_seven.append(main_subcol)
            var main_col_div=$("#main_col_div");
            main_col_div.append(row_div_seven)
            // Scroll to bill div
            $('html,body').animate({
                scrollTop: $(".room_ward_calculation_genpres_form").offset().top},
                'slow');
            $("#admit_reason_input").focus();
            
                }
            });
        });
}
function availableRoomRowDivSixCreation(){
    var main_col_div=$("#main_col_div");
    var row_div_six=$("<div class='' id='genpres_room_datatablediv'></div>");
        var col_one__row_div_six=$("<div class='col-md-12'></div>");
            var row__col_one__row_div_six=$("<div class='row'></div>");
                var colmd1=$("<div class='col-md-12 available_room_table_div'></div>")
                    var available_room_table=$('<table id="available_room_table" class="datatable_pat" width="100%"></table>')
                colmd1.append(available_room_table)

            row__col_one__row_div_six.append(colmd1);
        col_one__row_div_six.append(row__col_one__row_div_six);
    $(row_div_six).append(col_one__row_div_six);
    main_col_div.append(row_div_six)
}
function availableWardRowDivSixCreation(){
    var main_col_div=$("#main_col_div");
    var row_div_six=$("<div class='' id='genpres_ward_datatablediv'></div>");
        var col_one__row_div_six=$("<div class='col-md-12'></div>");
            var row__col_one__row_div_six=$("<div class='row'></div>");
                var colmd1=$("<div class='col-md-12 available_ward_table_div'></div>")
                    var available_room_table=$('<table id="available_ward_table" class="datatable_pat" width="100%"></table>')
                colmd1.append(available_room_table)

            row__col_one__row_div_six.append(colmd1);
        col_one__row_div_six.append(row__col_one__row_div_six);
    $(row_div_six).append(col_one__row_div_six);
    main_col_div.append(row_div_six)
}
function onSelectWardRoom(element){
    var Room_WardSelected = $(element).val()
   
    console.log("Room_WardSelected",Room_WardSelected)
    if (Room_WardSelected==='Room'){

        $("#row_div_seven").remove();
       
        console.log("room_datatable",room_datatable)
        console.log("ward_datatable",ward_datatable)

        if (room_datatable!==undefined){
            room_datatable.destroy();
            room_datatable =undefined;
            $("#available_room_table").empty();

            $("#genpres_room_datatablediv").remove();

            
            availableRoomRowDivSixCreation()
            retrieveRoomInfoInRoomWard()

        }
         else if (ward_datatable!==undefined){


            ward_datatable.destroy();
            ward_datatable =undefined;

            $("#available_ward_table").empty();

            $("#genpres_ward_datatablediv").remove();


            availableRoomRowDivSixCreation()
            retrieveRoomInfoInRoomWard()

        }
        else{
            availableRoomRowDivSixCreation()
            retrieveRoomInfoInRoomWard()
        }
        
    }
    else if (Room_WardSelected==='Ward'){
        $("#row_div_seven").remove();
     


        if (room_datatable!==undefined){


            room_datatable.destroy();

            room_datatable =undefined;

            $("#available_room_table").remove();

            $("#genpres_room_datatablediv").remove();


            availableWardRowDivSixCreation()
            retrieveWardInfoInRoomWard()
            return

        }
        else if (ward_datatable!==undefined){


            ward_datatable.destroy();
            ward_datatable =undefined;

            $("#available_ward_table").empty();

            $("#genpres_ward_datatablediv").remove();


            availableWardRowDivSixCreation()
            retrieveWardInfoInRoomWard()
            return


        }
       else{

            availableWardRowDivSixCreation()
            retrieveWardInfoInRoomWard()
        }

    }
    // else{
    //     $("#row_div_seven").remove();
    //     if (room_datatable!==undefined){
    //         room_datatable.destroy();
    //         $("#available_room_table").empty();

    //         $("#genpres_room_datatablediv").remove();

         
    //     }
    //     else if (ward_datatable!==undefined){

    //         ward_datatable.destroy();
    //         $("#available_ward_table").empty();

    //         $("#genpres_ward_datatablediv").remove();
    //     }

    // }

}
var empdict={}
function retrievePatientInfoInGenPres(pat_name,contact_no){
    datatable_lst=[];
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
          "pat_name":pat_name,
          "contact_no":contact_no,
        },
        url: '/retireve_patient_info_in_pres_form',
        success: function(data){
            console.log("patient_dict",data["patient_dict"]);
            patient_dict={};
            patient_dict=JSON.parse(data["patient_dict"])
            empdict=JSON.parse(data["empdict"])
            console.log("empdict",empdict)
            for (pat in patient_dict){
                templist=[];
                console.log("pat",pat);
                templist.push(pat)
                templist.push(patient_dict[pat]['name'])
                templist.push(patient_dict[pat]['contact_no'])
                templist.push(patient_dict[pat]['gender'])
                templist.push(patient_dict[pat]['dob'])
                templist.push(patient_dict[pat]['cnic'])
                templist.push(patient_dict[pat]['guardian'])
                templist.push(patient_dict[pat]['address'])
                datatable_list.push(templist)
            }
            createPatientDataTableInGenPres()
            console.log("patient_dict",patient_dict);
            console.log(datatable_list)
            $('.modal-loading').hide();

        },
    }); 

}
function rowDivThreeInGenPres(){
    var main_col_div=$("#main_col_div");
    var row_div_three=$("<div class=' show_patients_table_genpres_form' id='row_div_three' ></div>");
    // Datatable Name
        var col_one__row_div_three=$("<div class='col-md-12'></div>");
            var row__col_one__row_div_three=$("<div class='row'></div>");
                var colmd1=$("<div class='col-md-12'></div>")
                    var table=$('<table id="patient_table" class="datatable_pat" width="100%"></table>')
                colmd1.append(table)
            row__col_one__row_div_three.append(colmd1);
        col_one__row_div_three.append(row__col_one__row_div_three);
    $(row_div_three).append(col_one__row_div_three);
    main_col_div.append(row_div_three)
}

function searchPatientInGenPres(){

    $("#row_div_four").remove();
    $("#row_div_three").remove();
    $('#row_div_five').remove();

    $("#genpres_room_datatablediv").remove();
    $("#genpres_ward_datatablediv").remove();

    $("#row_div_seven").remove();
    room_datatable =undefined;
    ward_datatable =undefined;



    patient_dict={}
    datatable_list=[]
    rowDivThreeInGenPres();

    var pat_name=$("#search_pat_name_input").val();
    pat_name=pat_name.toLowerCase();
    var contact_no=$("#search_contact_numb_input").val();
    if (pat_datatable!==undefined){
        pat_datatable.destroy();
    }
    retrievePatientInfoInGenPres(pat_name,contact_no);
}

function generatePrescription(){
    $('#reset-token-dialog').hide()
    $('#main_page_content').empty()
    var generate_prescription_div=$("#main_page_content").append('<div class="container-fluid" id="container-generate-prescription"></div>');
    $("#main_page_content").append("<h3 class ='center_h_tag_forms'>Generate Prescription</h3>");
    $("#main_page_content").append("<hr class='custom_hr'>");
    var main_row_div= $("<div class='row is-flex'></div>");
    $(generate_prescription_div).append(main_row_div);

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

                    pat_name_input=$("<input class='form-control-custom' id='search_pat_name_input' class='custom_input_css'>")

                    colmd2.append(pat_name_input)

                row__col_one__row_div_one.append(colmd1);
                row__col_one__row_div_one.append(colmd2);
            col_one__row_div_one.append(row__col_one__row_div_one);

            // Contact Number
            var col_two__row_div_one=$("<div class='col-md-4'></div>");
                var row__col_two__row_div_one=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-5'></div>")
                    colmd2=$("<div class='col-md-6'></div>")

                    contact_type_label=$("<label class='custom_label_css'>Contact Number</label>");
                    colmd1.append(contact_type_label);
                    contact_type_input=$("<input class='form-control-custom custom_input_css' id='search_contact_numb_input' maxlength='12'  oninput='searchContactNumPatInfoOnEdit($(this))' maxlength='12' oninput='contactNumPatInfoOnInput($(this))'  placeholder='xxxx-xxxxxxx'></input>")
                    colmd2.append(contact_type_input);

                row__col_two__row_div_one.append(colmd1)
                row__col_two__row_div_one.append(colmd2)
            col_two__row_div_one.append(row__col_two__row_div_one)

            var col_three__row_div_one=$("<div class='col-md-4'></div>");
                var row__col_three__row_div_one=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-7'></div>")
                        var search_button=$('<button class="search_patient_btn fa fa-search" onclick="searchPatientInGenPres()">  Search Patient</button>')
                    colmd1.append(search_button)
                row__col_three__row_div_one.append(colmd1)
            col_three__row_div_one.append(row__col_three__row_div_one)

            $(row_div_one).append(col_one__row_div_one);
            $(row_div_one).append(col_two__row_div_one);
            $(row_div_one).append(col_three__row_div_one);
        
    $(main_col_div).append(row_div_one);
}
function createRoomDataTable(){
    console.log("room_list----------",room_list)
    $(function(){
        room_datatable=$("#available_room_table").DataTable({
            data:room_list,
            columns: [
                { title: "Id" },
                { title: "Floor" },
                { title: "Room Number" },
                { title: 'Charge Per Day' },
                { title: "AC Charge Per Day" },

                ],
                paging: false,
                scrollY: 130,
                scrollX: true,
                ordering: true,
                info:false,
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'print',
                        text: 'PRINT',
                        title: 'Room Info',
                        className: 'datatable_button printbtn fas fa-print',

                    },
                     {
                        extend: 'excel',
                        text: ' EXCEL',
                        title: 'Room Info',
                        className: 'datatable_button excelbtn fas fa-file-excel',

                    },
                     {
                        extend: 'csv',
                        text: ' CSV',
                        title:'Room Info',
                        className: 'datatable_button csvbtn fas fa-file',

                    },
                    {
                        extend: 'pdf',
                        text: ' PDF',
                        title: 'Room Info',
                        className: 'datatable_button pdfbtn fas fa-file-pdf',

                    },
                 
                ],

            });
            $('#available_room_table tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    alert("clicked same entry")
                }
                else{
                    room_id_selected=$(this).find('td').eq(0).text()
                    console.log("room_id_selected",room_id_selected)
                    room_datatable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    console.log("room dict on click",room_dict);
                    $("#row_div_seven").remove();

                    var row_div_seven=$("<div class=' room_ward_calculation_genpres_form' id='row_div_seven' ></div>");
                        var main_subcol=$("<div class='col-md-12'></div>");

                            var subrow_one=$("<div class='row' style='padding-bottom:10px;'></div>")

                                    var col_one__subrow_one=$("<div class='col-md-6'></div>");
                                            row__col_one__subrow_one=$("<div class='row'></div>");
                                                var colmd1=$("<div class='col-md-4'></div>")
                                                var colmd2=$("<div class='col-md-2'></div>")
                                                    var roomNo_label=$("<label for='roomNo_label' class='custom_label_css'>Room Number</label>");
                                                    var roomNo_input=$("<input id='roomNo_input' class='custom_input_css form-control-custom' style='background: white;' value='"+room_dict[room_id_selected]['room_no']+"' disabled>")

                                                    colmd1.append(roomNo_label)
                                                colmd2.append(roomNo_input)
                                            row__col_one__subrow_one.append(colmd1);
                                            row__col_one__subrow_one.append(colmd2);
                                        col_one__subrow_one.append(row__col_one__subrow_one);

                            subrow_one.append(col_one__subrow_one)

                        var subrow_two=$("<div class='row' style='padding-bottom:10px;'></div>")
                            var col_one_subrow_two=$("<div class='col-md-8'></div>");
                                var row__col_one_subrow_two=$("<div class='row'></div>");
                                    colmd1=$("<div class='col-md-3'></div>")
                                    colmd2=$("<div class='col-md-9'></div>")

                                        var admit_reason_label=$("<label class='custom_label_css'>Admit Reason</label>");
                                        var admit_reason_input=$("<textarea type='text'  id='admit_reason_input' class='form-control-custom custom_input_css' style='width:inherit;'>")

                                    colmd1.append(admit_reason_label)
                                    colmd2.append(admit_reason_input)
                        
                                row__col_one_subrow_two.append(colmd1);
                                row__col_one_subrow_two.append(colmd2);
                        
                            col_one_subrow_two.append(row__col_one_subrow_two);
                        subrow_two.append(col_one_subrow_two)

                        var subrow_three=$("<div class='row' style='padding-bottom:10px;'></div>")
                            var col_one__subrow_three=$("<div class='col-md-4'></div>");
                                var row__col_one__subrow_three=$("<div class='row'></div>");
                                    var colmd1=$("<div class='col-md-6'></div>")
                                    var colmd2=$("<div class='col-md-6'></div>")
                                    
                                        var doconduty_label=$("<label  class='custom_label_css'>Doctor on Duty</label>");
                                        var select=$("<select id='selecteddoctor' class='form-control-custom'></select>");
                                            var option=$("<option selected='selected' value='--'>--</option>");
                                        $(select).append(option);

                                                for (var key in empdict){
                                                    var option=$("<option id='"+key+"_doc-opt' value='"+key+"'>"+empdict[key]+"</option>");
                                                    $(select).append(option);

                                                }
                                    colmd1.append(doconduty_label)
                                    colmd2.append(select);
                            
                                    row__col_one__subrow_three.append(colmd1);
                                    row__col_one__subrow_three.append(colmd2);
                            col_one__subrow_three.append(row__col_one__subrow_three);

                            var col_two__subrow_three=$("<div class='col-md-4'></div>");
                                var row__col_two__subrow_three=$("<div class='row'></div>");
                                    var colmd1=$("<div class='col-md-6'></div>")
                                    var colmd2=$("<div class='col-md-6'></div>")
                                        var consultant_label=$("<label for='Consultant_label' class='custom_label_css float-right'>Consultant</label>");
                                        var select=$("<select id='selectedconsultant' class='form-control-custom'></select>");
                                            var option=$("<option selected='selected' value='--'>--</option>");
                                        $(select).append(option);

                                            for (var key in empdict){
                                                var option=$("<option id="+key+"_doc-opt value="+key+">"+empdict[key]+"</option>");
                                                $(select).append(option);

                                            }
                                    colmd1.append(consultant_label);
                                    colmd2.append(select);
                    
                                row__col_two__subrow_three.append(colmd1);
                                row__col_two__subrow_three.append(colmd2);
                            col_two__subrow_three.append(row__col_two__subrow_three);

                        subrow_three.append(col_one__subrow_three)
                        subrow_three.append(col_two__subrow_three)

                        
                        var subrow_four=$("<div class='row' style='padding-bottom:10px;'></div>")

                            var col_one__subrow_four=$("<div class='col-md-12'></div>");
                                    row__col_one__subrow_four=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-2'></div>")
                                        var colmd2=$("<div class='col-md-2'></div>")
                                        
                                            var indoor_admit_fee_label=$("<label for='indoor_fee_tag' class='custom_label_css'>Admission Fee</label>");
                                            colmd1.append(indoor_admit_fee_label)

                                            indoor_admit_fee_input=$("<input class='form-control-custom' id='totalamount_input'  onfocusout='InDoorTotalAmountFocousOutGenPres($(this))' class='custom_input_css'>")
                                            colmd2.append(indoor_admit_fee_input)

                                    row__col_one__subrow_four.append(colmd1);
                                    row__col_one__subrow_four.append(colmd2);

                                col_one__subrow_four.append(row__col_one__subrow_four);
                            subrow_four.append(col_one__subrow_four)
                        
                        var subrow_five=$("<div class='row' style='padding-bottom:10px;'></div>")

                            var col_one__subrow_five=$("<div class='col-md-12'></div>");
                                row__col_one__subrow_five=$("<div class='row'></div>");
                                    var colmd1=$("<div class='col-md-2'></div>")
                                    var colmd2=$("<div class='col-md-2'></div>")
                                    var colmd3=$("<div class='col-md-2'></div>")
                                    var colmd4=$("<div class='col-md-2'></div>")
                                    var colmd5=$("<div class='col-md-2'></div>")
                                    var colmd6=$("<div class='col-md-2'></div>")
                                        var discountamount_label=$("<label for='indoor_disc_tag' class='custom_label_css'>Discount Amount</label>");
                                    colmd1.append(discountamount_label)
                                        discountamount_input=$("<input class='form-control-custom' id='discountamount_input' onfocusout='discountAmountFocousOutPres($(this))' class='custom_input_css'>")
                                    colmd2.append(discountamount_input)
                                        var discountPercernt_label=$("<label for='discountPercernt_label' class='custom_label_css float-right'>Discount Percent</label>");
                                    colmd3.append(discountPercernt_label)
                                        discountpercent_input=$("<input class='form-control-custom' id='discountpercent_input' class='custom_input_css'>")
                                    colmd4.append(discountpercent_input)
                                        var amountDue_label=$("<label for='amountDue_label' class='custom_label_css float-right'>Net Total</label>");
                                    colmd5.append(amountDue_label)
                                        amountdue_input=$("<input class='form-control-custom' onfocusin='netTotalFocusInPres()' id='amountdue_input'>")
                                    colmd6.append(amountdue_input)
                                row__col_one__subrow_five.append(colmd1);
                                row__col_one__subrow_five.append(colmd2);
                                row__col_one__subrow_five.append(colmd3);
                                row__col_one__subrow_five.append(colmd4);
                                row__col_one__subrow_five.append(colmd5);
                                row__col_one__subrow_five.append(colmd6);
                            col_one__subrow_five.append(row__col_one__subrow_five);
                        subrow_five.append(col_one__subrow_five)

                        var subrow_six=$("<div class='row' style='padding-bottom:10px;'></div>")
                            var col_one__subrow_six=$("<div class='col-md-8'></div>");
                                row__col_one__subrow_six=$("<div class='row'></div>");
                                    var colmd1=$("<div class='col-md-3'></div>")
                                    var colmd2=$("<div class='col-md-9'></div>")
                                        var reason_label=$("<label for='discount_reason_label' class='custom_label_css'>Discount Reason</label>");
                                    colmd1.append(reason_label)
                                        reason_input=$("<input class='form-control-custom' id='discount_reason_input' class='custom_input_css'>")
                                    colmd2.append(reason_input)
                                row__col_one__subrow_six.append(colmd1);
                                row__col_one__subrow_six.append(colmd2);
                            col_one__subrow_six.append(row__col_one__subrow_six);

                            var col_two__subrow_six=$("<div class='col-md-4'></div>");
                                row__col_two__subrow_six=$("<div class='row'></div>");
                                    var colmd1=$("<div class='col-md-6'></div>")
                                    var colmd2=$("<div class='col-md-3'></div>")
                                    var colmd3=$("<div class='col-md-3'></div>")
                                        
                                        var bill_status_label=$("<label for='reason_label' class='custom_label_css float-right'>Add Bill Status</label>");
                                    colmd1.append(bill_status_label)
                                        var option1_input=$("<input  type='radio' name='Paid_NotPaid' value='Paid' checked>Paid</input>");
                                    colmd2.append(option1_input)
                                        var option2_input=$("<input  type='radio' name='Paid_NotPaid' value='NotPaid'>Not Paid</input>");  
                                    colmd3.append(option2_input)

                                row__col_two__subrow_six.append(colmd1);
                                row__col_two__subrow_six.append(colmd2);
                                row__col_two__subrow_six.append(colmd3);

                            col_two__subrow_six.append(row__col_two__subrow_six);
                    
                        subrow_six.append(col_one__subrow_six)
                        subrow_six.append(col_two__subrow_six)
                                        
                        
                        var subrow_nine=$("<div class='row' style=' padding-bottom:10px;'></div>")

                            var col_one__subrow_nine=$("<div class='col-md-6'></div>");
                                row__col_one__subrow_nine=$("<div class='row'></div>");
                                    var colmd1=$("<div class='col-md-4'></div>")
                                    var colmd2=$("<div class='col-md-3'></div>")
                                        var amount_recieved_label=$("<label for='reason_label' class='custom_label_css'>Amount Recieved</label>");
                                    colmd1.append(amount_recieved_label)
                                        amount_recieved_input=$("<input class='form-control-custom' id='amount_recieved_input'  onfocusout='calculateChangeAmount($(this))'   class='custom_input_css'>")
                                    colmd2.append(amount_recieved_input)
                                row__col_one__subrow_nine.append(colmd1);
                                row__col_one__subrow_nine.append(colmd2);
                            col_one__subrow_nine.append(row__col_one__subrow_nine);
        
                            var col_two__subrow_nine=$("<div class='col-md-4'></div>");
                                row__col_two__subrow_nine=$("<div class='row'></div>");
                                    var colmd1=$("<div class='col-md-3'></div>")
                                    var colmd2=$("<div class='col-md-3'></div>")
                                    var colmd3=$("<div class='col-md-3'></div>")
        
                                        var change_amount_label=$("<label for='reason_label' class='custom_label_css float-right'>Change Amount</label>");
                                    colmd1.append(change_amount_label)
                                        change_amount_input=$("<input class='form-control-custom' id='change_amount_input' class='custom_input_css'>")
                                    colmd2.append(change_amount_input)
                                    
                                    row__col_two__subrow_nine.append(colmd1);
                                row__col_two__subrow_nine.append(colmd2);
                                row__col_two__subrow_nine.append(colmd3);
                            col_two__subrow_nine.append(row__col_two__subrow_nine);
            
                        subrow_nine.append(col_one__subrow_nine)
                        subrow_nine.append(col_two__subrow_nine)
           




                        var subrow_seven=$("<div class='row' style='padding-bottom:10px;'></div>")

                            var col_one__subrow_seven=$("<div class='col-md-12'></div>");
                                row__col_one__subrow_seven=$("<div class='row'></div>");
                                    colmd1=$("<div class='col-md-3'></div>")
                                    colmd2=$("<div class='col-md-6'></div>")
                                    colmd3=$("<div class='col-md-3'></div>")

                                        GenPres_button=$('<button class="save_btn fa fa-print" onclick="printPrescriptionForm()">  Print Prescription</button>')
                                    colmd2.append(GenPres_button)
                                    
                                row__col_one__subrow_seven.append(colmd1);
                                row__col_one__subrow_seven.append(colmd2);
                                row__col_one__subrow_seven.append(colmd3);

                            col_one__subrow_seven.append(row__col_one__subrow_seven);

                        subrow_seven.append(col_one__subrow_seven)

                    main_subcol.append(subrow_one)
                    main_subcol.append(subrow_two)
                    main_subcol.append(subrow_three)
                    main_subcol.append(subrow_four)
                    main_subcol.append(subrow_five)
                    main_subcol.append(subrow_six)
                    main_subcol.append(subrow_nine)

                    main_subcol.append(subrow_seven)

                row_div_seven.append(main_subcol)
            var main_col_div=$("#main_col_div");
        main_col_div.append(row_div_seven)
        $('html,body').animate({
            scrollTop: $(".room_ward_calculation_genpres_form").offset().top},
            'slow');
        
        $("#admit_reason_input").focus();

                }
            });
        });
}

function createPatientBill(){
        $('#main_page_content').empty()
        var container_patient_prescription= $('#main_page_content').append('<div class="container-fluid" id="container-patient-bill"></div>');
        $("#container-patient-bill").append("<h2 class ='center_h_tag_forms'>Pateint Bill</h2>");
        $("#container-patient-bill").append("<hr class='custom_hr'>");
    
        var main_row_div= $("<div class='row is-flex'></div>");
    
        $(container_patient_prescription).append(main_row_div);
        var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");
           
        $(main_row_div).append(main_col_div);
    
        var row_div_one=$("<div class='row'></div>");
            // Patient Name
            var col_one__row_div_one=$("<div class='col-md-12'></div>");
            row__col_one__row_div_one=$("<div class='row'></div>");
                colmd1=$("<div class='col-md-2'></div>")
                colmd2=$("<div class='col-md-2'></div>")                
                colmd3=$("<div class='col-md-2'></div>")

                    pres_id_label=$("<label class='custom_label_css'>Prescription id</label>");
                colmd1.append(pres_id_label)
                    pres_id_input=$("<input class='form-control-custom' id='search_patient_id' class='custom_input_css'>")
                colmd2.append(pres_id_input);
                    var search_button=$('<button class="search_patient_btn fa fa-search" onclick="searchPatientInCreateBill(event)">Search</button>');
                colmd3.append(search_button);
    
            row__col_one__row_div_one.append(colmd1);
            row__col_one__row_div_one.append(colmd2);
            row__col_one__row_div_one.append(colmd3);
    
            col_one__row_div_one.append(row__col_one__row_div_one);
        row_div_one.append(col_one__row_div_one);
    $(main_col_div).append(row_div_one);

}
    
function searchPatientInCreateBill(e){
    
    var pres_id=$("#search_patient_id").val()
    if (pres_id===""){
        alert("Please Insert Valid Pres id")

        return
    }   
    $("#row_div_two").remove();
    $("#row_div_three").remove();
    $("#row_div_four").remove();
    $("#procdiv_despbill").remove();
    $("#calculate_despbill_div").remove();
    $("#totaldespbilldiv").remove();
    

    retrievePatientInfoInCreateBill("","","",pres_id)    
}
function searchPatientInAddChargeExisPres(e){
    e.preventDefault()
    var pres_id=$("#search_patient_id").val()
    if (pres_id===""){
        alert("Please Insert Valid Pres id")
        return
    }
        retrievePatientInfoInAddChargeExisPres("","","",pres_id)    
}
var patientid=0
var prescription_id=0;

function retrievePatientInfoInCreateBill(pat_name,contact_no,cnic_no,id){
    datatable_lst=[];
    patientid=id;
    prescription_id=id
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
            "id":prescription_id,
        },
        url: '/retrieve_patient_info_in_createbill',
        success: function(data){
            if (data['pres_id']===""){
                alert("Please Insert Valid Pres id")
                $('.modal-loading').hide();

                return
            }
            if (data['data']!=='Valid'){
                alert("Input Not Valid")

                $('.modal-loading').hide();

                return;
            }
            console.log("patient_dict",data["patient_dict"])
            patient_dict={};
            patient_dict=JSON.parse(data["patient_dict"])
            patient_id_selected=JSON.parse(data["id"])
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
            empdict=JSON.parse(data['empdict']);
            createPatientDetailsHtmlInCreateBill();
            $('.modal-loading').hide();

        },
    }); 
}
function retrievePatientInfoInAddChargeExisPres(pat_name,contact_no,cnic_no,id){
    datatable_lst=[];
    patientid=id;
    prescription_id=id;
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
            "id":prescription_id,
        },
        url: '/retrieve_patient_info_in_createbill',
        success: function(data){
            if (data['pres_id']===""){
                alert("Please Insert Valid Pres id")
                $('.modal-loading').hide();

                return
            }
            if (data['data']!=='Valid'){
                alert("Input Not Valid")

                $('.modal-loading').hide();

                return;
            }
            console.log("patient_dict",data["patient_dict"])
            patient_dict={};
            patient_dict=JSON.parse(data["patient_dict"])
            patient_id_selected=JSON.parse(data["id"])
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
            empdict=JSON.parse(data['empdict']);
            createPatientDetailsHtmlInAddChargeExisPres();
            $('.modal-loading').hide();

        },
    }); 
}
function createPatientDetailsHtmlInCreateBill(){
    var row_div_two=$("<div class='' id='row_div_two'></div>");
        var main_subcol=$("<div class='genformdiv2 col-md-12'></div>");

            var subrow_one=$("<div class='row' style='padding-top:20px'></div>")

                var col_one__subrow_one=$("<div class='col-md-3'></div>");
                        row__col_one__subrow_one=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-6'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var pat_name_label=$("<label for='emp_name_tag' class='custom_label_css'>Patient Name</label>");
                                var pat_name_input=$("<label class='custom_label_css' id='pat_name_input'>"+patient_dict[patient_id_selected]['name']+"</label>")
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
                            var contact_type_input=$("<label class='custom_label_css' id='contact_numb_input'>"+patient_dict[patient_id_selected]['contact_no']+"</label>")
                        colmd1.append(contact_type_label);
                        colmd2.append(contact_type_input);
    
                    row__col_two__subrow_one.append(colmd1)
                    row__col_two__subrow_one.append(colmd2)
                col_two__subrow_one.append(row__col_two__subrow_one)

            subrow_one.append(col_one__subrow_one)
            subrow_one.append(col_two__subrow_one)

      
        // CNIC
        //     var col_two_subrow_two=$("<div class='col-md-6'></div>");//
        //         var row__col_two_subrow_two=$("<div class='row'></div>");
        //             var colmd1=$("<div class='col-md-4'></div>")
        //             var colmd2=$("<div class='col-md-6'></div>")
        //                 var cnic_label=$("<label class='custom_label_css'>CNIC/Guardian CNIC</label>");
        //                 var cnic_input=$("<input class='form-control-custom' id='cnic_input' class='custom_input_css' placeholder='xxxxx-xxxxxxx-x' value='"+patient_dict[patient_id_selected]['cnic']+"'></input>")
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
        //                 var guardian_name_input=$("<input class='form-control-custom' id='guardian_input' class='custom_input_css' value='"+guradian_name+"' ></input>")
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
        //                 var pat_address_input=$("<input class='form-control-custom' id='pat_address_input' class='custom_input_css' value='"+patient_dict[patient_id_selected]['address']+"'>")
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
        //                 bloodgroup_input=$("<input class='form-control-custom' id='blood_group_input' class='custom_input_css' value='"+patient_dict[patient_id_selected]['bloodgroup']+"'>")
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
        //                 var email_id_input=$("<input class='form-control-custom' id='email_id_input' class='custom_input_css' value='"+patient_dict[patient_id_selected]['email']+"'></input>")
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
    retrieveDespMedicine();

}
function createPatientDetailsHtmlInAddChargeExisPres(){
    var row_div_two=$("<div class='row revisitexsistpres_div' id='row_div_two'></div>");
        var main_subcol=$("<div class='col-md-12'></div>");

            var subrow_one=$("<div class='row' style='padding-top:20px'></div>")

                var col_one__subrow_one=$("<div class='col-md-3'></div>");
                        row__col_one__subrow_one=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-5'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var pat_name_label=$("<label for='emp_name_tag' class='custom_label_css'>Patient Name</label>");
                                var pat_name_input=$("<label class='custom_label_css' id='pat_name_input'>"+patient_dict[patient_id_selected]['name']+"</label>")
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
                            var contact_type_input=$("<label class='custom_label_css' id='contact_numb_input'>"+patient_dict[patient_id_selected]['contact_no']+"</label>")
                        colmd1.append(contact_type_label);
                        colmd2.append(contact_type_input);
    
                    row__col_two__subrow_one.append(colmd1)
                    row__col_two__subrow_one.append(colmd2)
                col_two__subrow_one.append(row__col_two__subrow_one)

            subrow_one.append(col_one__subrow_one)
            subrow_one.append(col_two__subrow_one);
        
        main_subcol.append(subrow_one)
   

    row_div_two.append(main_subcol)
    var main_col_div=$("#main_col_div");
    main_col_div.append(row_div_two);
    createAddChargeExistPresForm()
}
function createAddChargeExistPresForm(){
    var main_col_div=$('#main_col_div')
    var row_div_five=$("<div class='row' id='createOutDoorPresFormDiv'></div>");

        var main_col__row_five=$("<div class='col-md-12'></div>");

           

            
            var row_one=$("<div class='row' style=' padding-bottom:10px;'></div>")

                var col_one__row_one=$("<div class='col-md-12'></div>");
                        row__col_one__row_one=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-2'></div>")
                            var colmd2=$("<div class='col-md-8'></div>")
                            
                                var doctor=$("<label for='doctor_label' class='custom_label_css'>Doctor</label>");
                                colmd1.append(doctor)

                                var select=$("<select id='selecteddoctor' class='form-control-custom'></select>");
                                        var option=$("<option selected='selected' value='--'>--</option>");
                                    $(select).append(option);

                                    for (var key in empdict){
                                        var option=$("<option id='"+key+"_doc-opt' value='"+key+"'>"+empdict[key]+"</option>");
                                        $(select).append(option);
                                    } 
                                colmd2.append(select)

                        row__col_one__row_one.append(colmd1);
                        row__col_one__row_one.append(colmd2);

                    col_one__row_one.append(row__col_one__row_one);

            row_one.append(col_one__row_one)

            var row_two=$("<div class='row' style=' padding-bottom:10px;'></div>")

                var col_one__row_two=$("<div class='col-md-12'></div>");
                        row__col_one__row_two=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-2'></div>")
                            var colmd2=$("<div class='col-md-8'></div>")
                            
                                var ss_label=$("<label  class='custom_label_css'>Sign/Symptoms</label>");
                                colmd1.append(ss_label)

                                var ss_text=$("<textarea   class='form-control-custom' id='ss_textarea'></textarea>")
                                colmd2.append(ss_text)

                        row__col_one__row_two.append(colmd1);
                        row__col_one__row_two.append(colmd2);

                col_one__row_two.append(row__col_one__row_two);

            row_two.append(col_one__row_two)

            var row_three=$("<div class='row' style=' padding-bottom:10px;'></div>")

                var col_one__row_three=$("<div class='col-md-12'></div>");
                    row__col_one__row_three=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-2'></div>")
                        var colmd2=$("<div class='col-md-8'></div>")
                        
                            var pd_label=$("<label  class='custom_label_css'>Provisional Diagnosis</label>");
                            colmd1.append(pd_label)

                            var pd_text=$("<textarea class='form-control-custom' id='pd_textarea'></textarea>")
                            colmd2.append(pd_text)

                    row__col_one__row_three.append(colmd1);
                    row__col_one__row_three.append(colmd2);

                col_one__row_three.append(row__col_one__row_three);

            row_three.append(col_one__row_three)


            var row_four=$("<div class='row' style=' padding-bottom:10px;'></div>")

                var col_one__row_four=$("<div class='col-md-12'></div>");
                        row__col_one__row_four=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-2'></div>")
                            var colmd2=$("<div class='col-md-8'></div>")
                            
                                var inv_label=$("<label  class='custom_label_css'>Investigation</label>");
                                colmd1.append(inv_label)

                                var inv_text=$("<textarea class='form-control-custom' id='inv_textarea'></textarea>")
                                colmd2.append(inv_text)

                        row__col_one__row_four.append(colmd1);
                        row__col_one__row_four.append(colmd2);

                col_one__row_four.append(row__col_one__row_four);

            row_four.append(col_one__row_four)


            var row_five=$("<div class='row' style=' padding-bottom:10px;'></div>")

                var col_one__row_five=$("<div class='col-md-12'></div>");
                        row__col_one__row_five=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-2'></div>")
                            var colmd2=$("<div class='col-md-8'></div>")
                            
                                var diagnosis_label=$("<label  class='custom_label_css'>Diagnosis</label>");
                                colmd1.append(diagnosis_label)

                                var diagnosis_text=$("<textarea class='form-control-custom' id='diagnosis_textarea'></textarea>")
                                colmd2.append(diagnosis_text)

                        row__col_one__row_five.append(colmd1);
                        row__col_one__row_five.append(colmd2);

                col_one__row_five.append(row__col_one__row_five);

            row_five.append(col_one__row_five)


            var row_six=$("<div class='row' style=' padding-bottom:10px;'></div>")

                var col_one__row_six=$("<div class='col-md-12'></div>");
                        row__col_one__row_six=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-2'></div>")
                            var colmd2=$("<div class='col-md-8'></div>")
                            
                                var vital_label=$("<label  class='custom_label_css'>Vitals</label>");
                                colmd1.append(vital_label)

                                var vital_text=$("<textarea class='form-control-custom' id='vital_textarea'></textarea>")
                                colmd2.append(vital_text)

                        row__col_one__row_six.append(colmd1);
                        row__col_one__row_six.append(colmd2);

                col_one__row_six.append(row__col_one__row_six);

            row_six.append(col_one__row_six)

            var row_seven=$("<div class='row' style=' padding-bottom:10px;'></div>")

                var col_one__row_seven=$("<div class='col-md-12'></div>");
                        row__col_one__row_seven=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-2'></div>")
                            var colmd2=$("<div class='col-md-8'></div>")
                            
                                var rx_label=$("<label  class='custom_label_css'>RX</label>");
                                colmd1.append(rx_label)

                                var rx_text=$("<textarea class='form-control-custom' id='rx_textarea'></textarea>")
                                colmd2.append(rx_text)

                        row__col_one__row_seven.append(colmd1);
                        row__col_one__row_seven.append(colmd2);

                col_one__row_seven.append(row__col_one__row_seven);

            row_seven.append(col_one__row_seven)


            var row_eight=$("<div class='row' style=' padding-bottom:10px;'></div>")

                var col_one__row_eight=$("<div class='col-md-12'></div>");
                        row__col_one__row_eight=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-2'></div>")
                            var colmd2=$("<div class='col-md-8'></div>")
                            
                                var outdooramount_label=$("<label for='outdoorAmount_tag' class='custom_label_css'>Fee</label>");
                                colmd1.append(outdooramount_label)

                                addcharge_exsist_pres=$("<input class='form-control-custom'  id='addcharge_exsist_pres' class='custom_input_css'>")
                                colmd2.append(addcharge_exsist_pres)

                        row__col_one__row_eight.append(colmd1);
                        row__col_one__row_eight.append(colmd2);

                col_one__row_eight.append(row__col_one__row_eight);

            row_eight.append(col_one__row_eight)

           

            var row_nine=$("<div class='row' style=' padding-bottom:10px;'></div>")

                var col_one__row_nine=$("<div class='col-md-12'></div>");
                        row__col_one__row_nine=$("<div class='row'></div>");
                            colmd1=$("<div class='col-md-3'></div>")
                            colmd2=$("<div class='col-md-6'></div>")
                            colmd3=$("<div class='col-md-3'></div>")

                            GenPres_button=$('<button class="save_btn fa fa-save" onclick="saveAddChargeExisPres()">Save</button>')
                            colmd2.append(GenPres_button)
                            
                        row__col_one__row_nine.append(colmd1);
                        row__col_one__row_nine.append(colmd2);
                        row__col_one__row_nine.append(colmd3);

                    col_one__row_nine.append(row__col_one__row_nine);

            row_nine.append(col_one__row_nine)

        main_col__row_five.append(row_one)
        main_col__row_five.append(row_two)
        main_col__row_five.append(row_three)
        main_col__row_five.append(row_four)
        main_col__row_five.append(row_five)
        main_col__row_five.append(row_six)
        main_col__row_five.append(row_seven)
        main_col__row_five.append(row_eight)
        main_col__row_five.append(row_nine)

    row_div_five.append(main_col__row_five)
 main_col_div.append(row_div_five)
}
function saveAddChargeExisPres(){
    presid=$("#search_patient_id").val();
    doc=$("#selecteddoctor").val();
    ss_textarea=$("#ss_textarea").val();
    pd_textarea=$("#pd_textarea").val();
    inv_textarea=$("#inv_textarea").val();
    diagnosis_textarea=$("#diagnosis_textarea").val();
    vital_textarea=$("#vital_textarea").val();
    rx_textarea=$("#rx_textarea").val();

    addcharge_exsist_pres=$("#addcharge_exsist_pres").val();
    $('.modal-loading').show();
    
    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            'presid':presid,
            "doc":doc,
            "ss_textarea":ss_textarea,
            "pd_textarea":pd_textarea,
            "inv_textarea":inv_textarea,
            "diagnosis_textarea":diagnosis_textarea,
            "vital_textarea":vital_textarea,
            "rx_textarea":rx_textarea,
            "addcharge_exsist_pres":addcharge_exsist_pres,
        },
        url: '/save_add_charge_exist_pres',
        success: function(data){
            $('.modal-loading').hide();

          
        }
    });
}
function retrieveDespMedicine(){
    datatable_desp_med_list=[];
    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
        },
        url: '/retireve_all_desp_med',
        success: function(data){
            createDespensoryMedTable();
            dspstck_dict={}
            dspstck_dict=JSON.parse(data["dspstck_dict"])
            for (dspstck in dspstck_dict){
                templist=[]
                console.log("dspstck",dspstck);
                templist.push(dspstck);
                templist.push(dspstck_dict[dspstck]['name']);
                templist.push(dspstck_dict[dspstck]['boxes_stored']);
                templist.push(dspstck_dict[dspstck]['strip_stored']);
                templist.push(dspstck_dict[dspstck]['piece_stored']);
                templist.push(dspstck_dict[dspstck]['piece_price_unit']);               
                datatable_desp_med_list.push(templist);
            }
            createDespDataTable();
            createRowDivFourBill();
            createRowDivSixDespBill();
            createRowDivFiveBill();
            console.log("datatable_desp_med_list",datatable_desp_med_list);
        }
    });
}
function createDespDataTable(){
    $(function(){
        despmed_datatable=$("#desp-med-table").DataTable({
            data:datatable_desp_med_list,
            columns: [
                { title: "Id" },
                { title: "Medicine Name" },
                { title: "Box Stored" },
                { title: 'Strips Stored' },
                { title: "Pieces Stored" },
                { title: "piece_price_unit" },
            

                ],
                paging: false,
                scrollY: 150,
                scrollX: true,
                ordering: true,
                info:false,
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'print',
                        text: 'PRINT',
                        title: 'Despensory Data',
                        className: 'datatable_button printbtn fa fa-print',

                    },
                     {
                        extend: 'excel',
                        text: ' EXCEL',
                        title: 'Despensory Data',
                        className: 'datatable_button excelbtn fas fa-file-excel',

                    },
                     {
                        extend: 'csv',
                        text: ' CSV',
                        title: 'Despensory Data',
                        className: 'datatable_button csvbtn fa fa-file',

                    },
                    {
                        extend: 'pdf',
                        text: ' PDF',
                        title: 'Despensory Data',
                        className: 'datatable_button pdfbtn fas fa-file-pdf',

                    },
                
                ],
    
            });
            $('#desp-med-table tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                }
                else{
                    despid=$(this).find('td').eq(0).text()
                    despmed_datatable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    createMedQtyForm(despid);
                    // Scroll to bill div
                    $('html,body').animate({
                    scrollTop: $("#desp-med-qty-form").offset().top},
                    'slow');
                    
                }
            });
        $('.dataTables_filter  input[type="search"]').
        attr('placeholder','Search Medicine ....').
        css({'width':'200px','display':'inline-block'});
        $('.dataTables_filter input').addClass('form-control-custom');
    });
}
function billDataTable(){
    $(function(){
        bill_datatable=$("#bill_table").DataTable({
            data:datatable_patient_billlist,
            columns: [
                { title: "Id" },
                { title:"Desp Id"},
                { title:"Patient Id"},
                { title: "Item Name" },
                { title: "Boxes" },
                { title: 'Strips' },
                { title: "Pieces" },
                {title:"Price Per Piece"},
                { title: "Price" },
                { title: "Amount" },
                ],
                paging: false,
                scrollY: 200,
                scrollX: true,
                ordering: true,
                info:false,
                searching:false,
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'print',
                        text: 'PRINT',
                        title: 'Patient Bill',
                        className: 'datatable_button printbtn fa fa-print',

                    },
                     {
                        extend: 'excel',
                        text: ' EXCEL',
                        title:'Patient Bill',
                        className: 'datatable_button excelbtn  fas fa-file-excel',

                    },
                     {
                        extend: 'csv',
                        text: ' CSV',
                        title: 'Patient Bill',
                        className: 'datatable_button csvbtn fa fa-file',

                    },
                    {
                        extend: 'pdf',
                        text: ' PDF',
                        title: 'Patient Bill',
                        className: 'datatable_button pdfbtn fas fa-file-pdf',

                    },
                 
                ],
                
            });
            $('#bill_table tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    billdata=bill_datatable.rows(this).data()[0];

                    dspstck_dict={}
                    despmed_datatable.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
                        var data = this.data();
                        console.log("data",data);
                        var meddatadict={}
                        var medname=data[1];
                        var billmedname=billdata[3];
                        if (medname===billmedname){
                            delete pbr_dict[billdata[1]]
                            console.log("pbr_dict-- after delete",pbr_dict)
                            meddatadict['boxes_stored']=parseInt(data[2])+parseInt(billdata[4]);
                            strips_stored=data[3]
                            if (data[3]!=="N/A"){
                            strips_stored=parseInt(data[3])+parseInt(billdata[5])
                            }
                            meddatadict['strip_stored']=strips_stored;
                            meddatadict['piece_stored']=parseInt(data[4])+parseInt(billdata[6]);
                        }
                        else{
                            console.log("pbr_dict--",pbr_dict)
                            meddatadict['boxes_stored']=data[2]
                           
                            strips_stored=data[3]
                            
                            meddatadict['strip_stored']=strips_stored;
                            meddatadict['piece_stored']=data[4];
                            console.log("In else")

                        }
                        meddatadict['name']=medname;
                        meddatadict['price_unit']=data[5];            
                        dspstck_dict[parseInt(data[0])]=meddatadict
                    } );
                    despmed_datatable.clear().draw();
                    console.log("DespStock_Dict>>",dspstck_dict)
                    count=0;
                    for (dspstck in dspstck_dict){
                        if (count===0){
                            despmed_datatable.clear().draw();
                        }
                        templist=[];
                        templist.push(dspstck);
                        templist.push(dspstck_dict[dspstck]['name']);
                        templist.push(dspstck_dict[dspstck]['boxes_stored']);
                        templist.push(dspstck_dict[dspstck]['strip_stored']);
                        templist.push(dspstck_dict[dspstck]['piece_stored']);
                        templist.push(dspstck_dict[dspstck]['price_unit']);               
                        despmed_datatable.row.add( templist ).draw();
                        count++;
                    } 
                    bill_datatable.rows(this).remove()
                    $(this).remove();
                    // delete pbr_dict[billdata[1]];
                    // console.log("pbr_dict>>",pbr_dict)


                   

                }
                else{
                    rowid=$(this).find('td').eq(0).text()
                    bill_datatable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    
                }
            });
    });
}
function createDespensoryMedTable(){
    var row_div_three=$("<div class='' id='row_div_three' style='padding-bottom:18px'></div>");
        var col_one__row_div_three=$("<div class='col-md-12 genformdiv1'></div>");
            row__col_one__row_div_three=$("<div class='row'></div>");
                colmd1=$("<div class='col-md-12'></div>")
                var table=$('<table id="desp-med-table" class="datatable_pat" width="100%"></table>')
                colmd1.append(table);
            row__col_one__row_div_three.append(colmd1);
        col_one__row_div_three.append(row__col_one__row_div_three);
    row_div_three.append(col_one__row_div_three);
    $(main_col_div).append(row_div_three);
}
function createRowDivFourBill(){
    var main_col_div=$("#main_col_div");
    var row_div_four=$("<div class='row' id='row_div_four'style='padding-bottom:18px'></div>");
        var col_one__row_div_four=$("<div class='col-md-12'></div>");
            row__col_one__row_div_four=$("<div class=''></div>");
                colmd1=$("<div class='col-md-12'></div>");
                    var row=$("<div class='row'></div>");
                        var col1=$("<div class='col-md-4' id='desp-med-qty-form'>");
                        var col2=$("<div class='col-md-8 genformdiv1' id='medicine-addedto-form'>");
                            table=$('<table id="bill_table" class="datatable_pat" width="100%"></table>');
                        col2.append(table)
                    row.append(col1);
                    row.append(col2);
                colmd1.append(row);
            
            row__col_one__row_div_four.append(colmd1);
        col_one__row_div_four.append(row__col_one__row_div_four);
    row_div_four.append(col_one__row_div_four);
main_col_div.append(row_div_four);
billDataTable()

}
function createMedQtyForm(despid){
$("#desp-med-qty-form").empty();
var col1=$("#desp-med-qty-form")
    var sub_row=$("<div class=''></div>");
        var sub_col=$("<div class='col-md-12 desp-med-qty-form_class'></div>")
            var sub_sub_row1=$("<div class='row' style='padding-top:10px; padding-bottom:10px'></div>");
                var col1_sub_sub_row1=$("<div class='col-md-4'></div>");
                    var label=$("<label class='custom_label_css'>Medicine Name</label>")
                col1_sub_sub_row1.append(label);
                var col2_sub_sub_row1=$("<div class='col-md-6'></div>");
                    var input=$("<input id='desp-med-name' class='form-control-custom' value='"+dspstck_dict[despid]['name']+"'></input>")
                col2_sub_sub_row1.append(input);
            sub_sub_row1.append(col1_sub_sub_row1);
            sub_sub_row1.append(col2_sub_sub_row1);

            var sub_sub_row2=$("<div class='row' style='padding-bottom:10px'></div>");
                var col1_sub_sub_row2=$("<div class='col-md-4'></div>");
                    var label=$("<label class='custom_label_css'>Boxes</label>")
                col1_sub_sub_row2.append(label);
                var col2_sub_sub_row2=$("<div class='col-md-6'></div>");
                    var input=$("<input class='form-control-custom' type='number' id='boxes_stored'></input>")
                col2_sub_sub_row2.append(input);
            sub_sub_row2.append(col1_sub_sub_row2);
            sub_sub_row2.append(col2_sub_sub_row2);
            // var strip_unit=""
            var strip_stored=""

            // if(dspstck_dict[despid]['strip_unit']){
            //     strip_unit=dspstck_dict[despid]['strip_unit'];
            // }
            if(dspstck_dict[despid]['strip_stored']){
                strip_stored=dspstck_dict[despid]['strip_stored'];
                

            }
            if (strip_stored!=="N/A"  ){
           
            var sub_sub_row3=$("<div class='row' style='padding-bottom:10px'></div>");
                var col1_sub_sub_row3=$("<div class='col-md-4'></div>");
                    var label=$("<label class='custom_label_css'>Total Strips</label>")
                col1_sub_sub_row3.append(label);
                var col2_sub_sub_row3=$("<div class='col-md-6'></div>");
                    var input=$("<input class='form-control-custom' type='number' id='strips_stored'></input>")
                col2_sub_sub_row3.append(input);
            sub_sub_row3.append(col1_sub_sub_row3);
            sub_sub_row3.append(col2_sub_sub_row3);
            }
            var sub_sub_row4=$("<div class='row' style='padding-bottom:10px'></div>");
                var col1_sub_sub_row4=$("<div class='col-md-4'></div>");
                    var label=$("<label class='custom_label_css'>Total Pieces</label>")
                col1_sub_sub_row4.append(label);
                var col2_sub_sub_row4=$("<div class='col-md-6'></div>");
                    var input=$("<input class='form-control-custom' type='number' id='pieces_stored' ></input>")
                col2_sub_sub_row4.append(input);
            sub_sub_row4.append(col1_sub_sub_row4);
            sub_sub_row4.append(col2_sub_sub_row4);
            var sub_sub_row6=$("<div class='row'></div>");
                var col1_sub_sub_row6=$("<div class='col-md-4 custom_label_css'>Medicine Timing</div>");
                var col2_sub_sub_row6=$("<div class='col-md-6'></div>");
                    var text=$("<textarea class='form-control-custom' id='med_timing_text'></textarea>")
                col2_sub_sub_row6.append(text);

            sub_sub_row6.append(col1_sub_sub_row6);
            sub_sub_row6.append(col2_sub_sub_row6);
            var sub_sub_row5=$("<div class='row'></div>");
                var col1_sub_sub_row5=$("<div class='col-md-4'></div>");
                var col2_sub_sub_row5=$("<div class='col-md-6'></div>");
                    var button=$("<button class='add_btn fa fa-plus-circle' id='add_med_desp' onclick='addMedicineToPatientBill()' style='width:inherit'>  Add Medicine to Bill</button>")
                col2_sub_sub_row5.append(button);

            sub_sub_row5.append(col1_sub_sub_row5);
            sub_sub_row5.append(col2_sub_sub_row5);
        sub_col.append(sub_sub_row1);
        sub_col.append(sub_sub_row2);

        if ( strip_stored!=="N/A"   ){
            sub_col.append(sub_sub_row3);
        }

        sub_col.append(sub_sub_row4);
        sub_col.append(sub_sub_row6);
        sub_col.append(sub_sub_row5);
        



    sub_row.append(sub_col);
col1.append(sub_row);
}
var med_time_dict={}
function addMedicineToPatientBill(){
    no_strips="false"

    var box_wanted=$("#boxes_stored").val();
    console.log("Boxes wanted ",box_wanted)
    if (box_wanted===''){
        box_wanted=0
    }
    $("#boxes_stored").val("");
    console.log("Boxes wanted-- ",box_wanted)

    var pieces_wanted=$("#pieces_stored").val();
    if (pieces_wanted===''){
        pieces_wanted="0"
    }
    $("#pieces_stored").val("");
    var strips_wanted=$("#strips_stored").val();
    console.log("STRIPS",strips_wanted)
    if (strips_wanted==='' ){
        strips_wanted="0"
    }
    var desp_med_name=$("#desp-med-name").val()
    var med_timing_text=$("#med_timing_text").val();
    med_time_dict[desp_med_name]=med_timing_text
    console.log("med_time_dict--add",med_time_dict)
    $("#strips_stored").val("");
    if (strips_wanted=="0" && pieces_wanted=="0" && box_wanted=="0"){
        alert("ss")
        return;
    }
    dspstck_dict={}
    despmed_datatable.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
        var data = this.data();
        var meddatadict={};
        strips_stored=data[3];
        meddatadict['name']=data[1];
        meddatadict['boxes_stored']=data[2];
        // if (data[3]=="N/A"){
        //     strips_stored="-";
        // }
        meddatadict['strip_stored']=strips_stored;
        meddatadict['piece_stored']=data[4];
        meddatadict['price_unit']=data[5];

        dspstck_dict[parseInt(data[0])]=meddatadict;
    } );
    console.log("dspstck_dict",dspstck_dict)
    pbr_dict={}
    bill_datatable.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
        var data = this.data();
        console.log("Bill DATA",data)
        var tempdict={}
        // tempdict['despid']=data[1]
        tempdict['medname']=data[3]

        tempdict['patientid']=data[2]
        tempdict['boxes']=data[4];
       
        strips_stored=data[5]
        
        tempdict['strips']=strips_stored;

        tempdict['pieces']=data[6];
        tempdict['priceperpiece']=data[7];

        tempdict['price']=data[8];
        tempdict['amount']=data[9];


        // pbr_dict[data[3]]=tempdict
        pbr_dict[data[1]]=tempdict

    } );
    console.log("pbr_dict",pbr_dict);
    console.log("Patient Id", patientid);
    if (strips_wanted===undefined){
        no_strips="true";
        strips_wanted="0";

    }
    console.log("okokok",strips_wanted)
    console.log("asdasdmkamdkasmd",strips_wanted)
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
            'despid':despid,
            'patientid':parseInt(patientid),
            "pieces_wanted":pieces_wanted,
            'boxes_wanted':box_wanted,
            "no_strips":no_strips,
            "strips_wanted":strips_wanted,
            "despStckDict":JSON.stringify(dspstck_dict),
            "pbr_dict":JSON.stringify(pbr_dict),
        },
        url: '/retrieve_medicine_from_desp',
        success: function(data){
            if(data['errorflag']==="false"){

                dspstck_dict={};
                datatable_desp_med_list=[];
                datatable_pbr_list=[];
                dspstck_dict=JSON.parse(data["despStckDict"]);
                despmed_datatable.clear();

                for (dspstck in dspstck_dict){
                    templist=[];
                    templist.push(dspstck);
                    templist.push(dspstck_dict[dspstck]['name']);
                    templist.push(dspstck_dict[dspstck]['boxes_stored']);
                    templist.push(dspstck_dict[dspstck]['strip_stored']);
                    templist.push(dspstck_dict[dspstck]['piece_stored']);
                    templist.push(dspstck_dict[dspstck]['price_unit']);               
                    datatable_desp_med_list.push(templist);
                    despmed_datatable.row.add( templist ).draw();

                } 
                console.log("datatable_desp_med_list",datatable_desp_med_list)
                pbr_dict=JSON.parse(data['pbr_dict'])
                count=1;
                bill_datatable.clear();
                for (med in pbr_dict){
                    templist=[];
                    templist.push(count);
                    templist.push(med);

                    // templist.push(pbr_dict[med]['despid']);
                    templist.push(pbr_dict[med]['patientid']);
                    templist.push(pbr_dict[med]['medname']);

                    // templist.push(med);

                    templist.push(pbr_dict[med]['boxes']);
                    templist.push(pbr_dict[med]['strips']);

                    templist.push(pbr_dict[med]['pieces']);
                    templist.push(pbr_dict[med]['priceperpiece']);

                    templist.push(pbr_dict[med]['price']);

                    templist.push(pbr_dict[med]['amount']);
                    datatable_pbr_list.push(templist);
                    bill_datatable.row.add( templist ).draw();
                    count++;
                }
                console.log("datatable_pbr_list",datatable_pbr_list)
            }
            else{
                alert("Sorry This entry is not possible")
            }
            $('.modal-loading').hide();

          
        }
    });
}

function SaveAndPrintBill(){
    totalamount_input=$("#totalamount_input").val();
    if (totalamount_input!==""){

    dspstck_dict={}
    despmed_datatable.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
        var data = this.data();
        var meddatadict={}
        meddatadict['name']=data[1];
        meddatadict['boxes_stored']=data[2];
        strips_stored=data[3]

        if (data[3]=="N/A"){
            strips_stored=0
        }
        meddatadict['strip_stored']=strips_stored;
        meddatadict['piece_stored']=data[4]
        meddatadict['price_unit']=data[5];

        dspstck_dict[parseInt(data[0])]=meddatadict
    } );
    console.log("dspstck_dict",dspstck_dict);
    pbr_dict={};
    bill_datatable.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
        var data = this.data();
        console.log("Bill DATA",data)
        var tempdict={}
        // tempdict['despid']=data[1];
        tempdict['medname']=data[3];
        tempdict['patientid']=data[2];

        tempdict['boxes']=data[4];
        strips_stored=data[5];
        // if (data[5]==null){
        //     strips_stored=0
        // }
        tempdict['strips']=strips_stored;
        tempdict['pieces']=data[6];
        tempdict['priceperpiece']=data[7];

        tempdict['price']=data[8];
        tempdict['amount']=data[9];


        // pbr_dict[data[3]]=tempdict
        pbr_dict[data[1]]=tempdict
    } );
    console.log("pbr_dict",pbr_dict)
    var rmc="RMC HOSPITAL";
    var patient_name=$("#pat_name_input").text();
    var phoneno=$("#contact_numb_input").text();
    var proceduredata_dict={};
    var nettotal_input=$('#nettotal_input').val();
    var totalamount_input=$('#totalamount_input').val();
    var discountamount_input=$('#discountamount_input').val();
    var bill_status=$("input[name='Paid_NotPaid']:checked").val();
    var amount_recieved_input=$("#amount_recieved_input").val()
    var change_amount_input=$("#change_amount_input").val()
    $("#invoice-POS").empty();
    var invoice_pos=$("#invoice-POS");
    
        // var center=$("<center id='top'></center>")
        var center=$("<div id='top'></div>")

            var div_logo=$("<div class='logo'></div>");
                // var img_scr=$("<img style='width: 160px;' src='/static/rmcapp/mainhomepage_static/img/rmc.png'><br>")

            div_logo.append(logoImg);
            var div_info=$("<div class='info'></div>");
                var h2=$("<h2></h2>");
                    h2.append(rmc);
            div_info.append(h2);
        center.append(div_logo);
        center.append(div_info);
        invoice_pos.append(center);   


        var mid_div=$("<div id='mid'></div>");
            var div_info=$("<div class='info'></div>");
                    var p=$("<p> Name   :  "+patient_name.toUpperCase()+" </br> Phone   :  "+phoneno+"</br></p>")
            div_info.append(p);
        mid_div.append(div_info);

            var bot_div=$("<div id='bot'></div>");
                var div_table=$("<div id='table'></div>");
                    var table=$("<table>")
                        var tr=$('<tr class="tabletitle"></tr>')
                            var td1=$('<td class="item"><p style="font-size:20px">Medicine Name</p></td>')
                            var td2=$('<td class="item"><p style="font-size:20px"> (Timings) </p></td>')

                        tr.append(td1);
                        tr.append(td2);

                    table.append(tr);
                    for (var key in pbr_dict){
                        // item=key;
                        time_text=med_time_dict[pbr_dict[key]['medname']]
                        item=pbr_dict[key]['medname']
                       
                        var tr=$('<tr class="service"></tr>')
                            var td1=$('<td class="tableitem"><p>'+item+'</p></td>')
                            var td2=$('<td class="tableitem"><p>'+time_text+'</p></td>')
                           
                        tr.append(td1);
                        tr.append(td2);
                    table.append(tr);
    
                    }
                
                procedure_bill_table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
                    var data = this.data();
                    item=data[0];
                    qty='-'
                    subtotal=data[1]

                    proceduredata_dict[item]=subtotal

                    var tr=$('<tr class="service"></tr>')
                        var td1=$('<td class="tableitem"><p>'+item+'</p></td>')
                        var td2=$('<td class="tableitem"><p>'+qty+'</p></td>')
                        var td3=$('<td class="tableitem"><p>'+subtotal+'</p></td>')
                    tr.append(td1);
                    tr.append(td2);
                    tr.append(td3);
                table.append(tr);
                } );
                if (Object.keys(proceduredata_dict).length !== 0){
                    var tr=$('<tr class="tabletitle"></tr>')
                    var td1=$('<td></td>')
                    var td2=$('<td class="Rate"><h2>Total Amount</h2></td>')
                    var td3=$('<td class="payment"><h2>'+totalamount_input+'</h2></td>')
                        tr.append(td1);
                        tr.append(td2);
                        tr.append(td3);
                    table.append(tr);
                    var tr=$('<tr class="tabletitle"></tr>')
                        var td1=$('<td></td>')
                        var td2=$('<td class="Rate"><h2>Discount</h2></td>')
                        var td3=$('<td class="payment"><h2>'+discountamount_input+'</h2></td>')
                    tr.append(td1);
                    tr.append(td2);
                    tr.append(td3);
                    table.append(tr);
                    var tr=$('<tr class="tabletitle"></tr>')
                            var td1=$('<td></td>')
                            var td2=$('<td class="Rate"><h2>Net Total</h2></td>')
                            var td3=$('<td class="payment"><h2>'+nettotal_input+'</h2></td>')
                        tr.append(td1);
                        tr.append(td2);
                        tr.append(td3);
                    table.append(tr);
                }
            div_table.append(table);

            var legalcopy=$("<div id='legalcopy'>");
                if (Object.keys(proceduredata_dict).length !== 0){
                        var p3=$('<p class="legal"><strong>Amount Recieved : '+amount_recieved_input+'</strong>  </p>')
                        var p4=$('<p class="legal"><strong>Change : '+change_amount_input+'</strong>  </p>')
                    legalcopy.append(p3);
                    legalcopy.append(p4);
                }
                var p=$('<p class="legal"><strong>Thank you for visiting RMC!</strong>  </p>')
                var p1=$('<p class="legal"><strong>CONTACT NO : 0321-2312313</strong>  </p>')
                var p2=$('<p class="legal"><strong>Address  : Badami Bagh, Lahore</strong>  </p>')
            legalcopy.append(p);
            legalcopy.append(p1);
            legalcopy.append(p2);
        bot_div.append(div_table);
        bot_div.append(legalcopy);


    invoice_pos.append(mid_div);    
    invoice_pos.append(bot_div);    
    

    // // // var restorepage = $('#patient_dash_first_div').html();
    $('#patient_dash_first_div').hide();
    var printcontent = $(invoice_pos).clone();
    // // // $('#recipet_div').empty().html(printcontent);
  
    window.print();
    $('#patient_dash_first_div').show();
    $('#invoice-POS').empty();
   
    // //despmed_datatable.destroy();
    // // procedure_bill_table.destroy();
    // // bill_datatable.destroy();

    // $.ajax({
    //     type: 'POST',
    //     dataType: "json",
    //     'data': {
    //         'prescription_id':prescription_id,
    //         'proceduredata_dict':JSON.stringify(proceduredata_dict),
    //         "despStckDict":JSON.stringify(dspstck_dict),
    //         "pbr_dict":JSON.stringify(pbr_dict),
    //         'despmedbillamount':despmedbillamount,
    //         "totalamount":totalamount_input,
    //         "addchargeamount":addchargeamount,
    //         'discountamount':discountamount_input,
    //         'procedure_total':procedure_total,
    //         'net_total':nettotal_input,
    //         'status':bill_status,
    //     },
    //     url: '/save_patient_bill',
    //     success: function(data){
       
    //       $("#row_div_two").remove();
    //       $("#procdiv_despbill").remove();
    //     //   $("#row_div_six").empty();
    //     //   $("#row_div_six").remove();
    //       $("#calculate_despbill_div").remove();      
    //       $("#row_div_three").remove();
    //       $("#row_div_four").remove();
    //       $("#totaldespbilldiv").remove();
          
    //       $("#search_patient_id").val("")
    //     }
    // });
    }
    else{
        alert("Please Calculate before Printing");
    }
}
function SaveDespBill(){
    totalamount_input=$("#totalamount_input").val();
    if (totalamount_input!==""){

    dspstck_dict={}
    despmed_datatable.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
        var data = this.data();
        var meddatadict={}
        meddatadict['name']=data[1];
        meddatadict['boxes_stored']=data[2];
        strips_stored=data[3]

        if (data[3]=="N/A"){
            strips_stored=0
        }
        meddatadict['strip_stored']=strips_stored;
        meddatadict['piece_stored']=data[4]
        meddatadict['price_unit']=data[5];

        dspstck_dict[parseInt(data[0])]=meddatadict
    } );
    console.log("dspstck_dict",dspstck_dict);
    pbr_dict={};
    var proceduredata_list=[];

    bill_datatable.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
        var data = this.data();
        console.log("Bill DATA",data)
        var tempdict={}
        // tempdict['despid']=data[1];
        tempdict['medname']=data[3];
        tempdict['patientid']=data[2];

        tempdict['boxes']=data[4];
        strips_stored=data[5];
        // if (data[5]==null){
        //     strips_stored=0
        // }
        tempdict['strips']=strips_stored;
        tempdict['pieces']=data[6];
        tempdict['priceperpiece']=data[7];

        tempdict['price']=data[8];
        tempdict['amount']=data[9];


        // pbr_dict[data[3]]=tempdict
        pbr_dict[data[1]]=tempdict
    } );
    console.log("pbr_dict",pbr_dict)
    var rmc="RMC HOSPITAL";
    var patient_name=$("#pat_name_input").text();
    var phoneno=$("#contact_numb_input").text();
    procedure_bill_table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
        var data = this.data();
        item=data[0];
        qty='-'
        subtotal=data[1]
        proceduredata_list.push([item,subtotal])

    } );
    var nettotal_input=$('#nettotal_input').val();
    var totalamount_input=$('#totalamount_input').val();
    var discountamount_input=$('#discountamount_input').val();
    var bill_status=$("input[name='Paid_NotPaid']:checked").val();
    console.log("bill status", bill_status)

    

    
    console.log("despmedbillamount--",despmedbillamount)
    console.log("proceduredata_list---Deso",proceduredata_list);
    $('.modal-loading').show();

    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            'prescription_id':prescription_id,
            'proceduredata_list':JSON.stringify(proceduredata_list),
            "despStckDict":JSON.stringify(dspstck_dict),
            "pbr_dict":JSON.stringify(pbr_dict),
            "med_time_dict":JSON.stringify(med_time_dict),
            'despmedbillamount':despmedbillamount,
            "totalamount":totalamount_input,
            "addchargeamount":addchargeamount,
            'discountamount':discountamount_input,
            'procedure_total':procedure_total,
            'net_total':nettotal_input,
            'status':bill_status,
        },
        url: '/save_patient_bill',
        success: function(data){
       
          $("#row_div_two").remove();
          $("#procdiv_despbill").remove();
        //   $("#row_div_six").empty();
        //   $("#row_div_six").remove();
          $("#calculate_despbill_div").remove();      
          $("#row_div_three").remove();
          $("#row_div_four").remove();
          $("#totaldespbilldiv").remove();
          
          $("#search_patient_id").val("")
          alert("Saved")
          $('.modal-loading').hide();

        }
    });
    }
    else{
        alert("Please Calculate before Printing");
    }
}
function createRowDivFiveBill(){ ///Last Discount and total Bill row with Button
    var main_col_div=$("#main_col_div");
    var row_div_five=$("<div class='row' id='calculate_despbill_div' style='padding-top:15px;padding-bottom:15px'></div>");
        var col_one__row_div_five=$("<div class='col-md-4'></div>");
        var col_two__row_div_five=$("<div class='col-md-4'></div>");
        var col_three__row_div_five=$("<div class='col-md-4'></div>");

            var button=$("<button class='calbtn fas fa-lg fa-calculator' onclick='calculateDespProcBill()'> Calculate Total Bill</button>")
        col_two__row_div_five.append(button);
                    
    row_div_five.append(col_one__row_div_five);
    row_div_five.append(col_two__row_div_five);
    row_div_five.append(col_three__row_div_five);


    var row_div_six=$("<div class='' id='totaldespbilldiv'></div>");
    var col_one__row_div_five=$("<div class='col-md-12'></div>");
        var row__col_one__row_div_five=$("<div class='row'></div>");
            var  colmd1=$("<div class='col-md-12'></div>");
                var row=$("<div class='row'></div>");
                    // var calculate_col1=$("<div class='col-md-4'></div>");
                    // var button=$("<button onclick='calculateDespProcBill()'> Calculate </button>")
                    // calculate_col1.append(button);

                    var calculate_col2=$("<div class='col-md-12' ></div>");
                        row1__calculate_col2=$("<div class='row' style='padding-bottom:10px; padding-top:10px'></div>");
                            var subcol1=$("<div class='col-md-2'></div>")
                            var subcol2=$("<div class='col-md-2'></div>")
                            
                                var outdooramount_label=$("<label class='custom_label_css'>Total Amount</label>");
                                subcol1.append(outdooramount_label)

                                var totalamount_input=$("<input class='form-control-custom' id='totalamount_input' onfocusout='totalAmountDespFocusOut($(this))' class='custom_input_css' disabled>")
                                subcol2.append(totalamount_input)

                        row1__calculate_col2.append(subcol1);
                        row1__calculate_col2.append(subcol2);
                        
                        row2__calculate_col2=$("<div class='row' style='padding-bottom:10px;'></div>");
                            var subcol1=$("<div class='col-md-12'></div>")
                                row1__subcol1=$("<div class='row'></div>");
                                    var c1=$("<div class='col-md-2'></div>")
                                    var c2=$("<div class='col-md-2'></div>")
                                    var c3=$("<div class='col-md-2'></div>")
                                    var c4=$("<div class='col-md-2'></div>")
                                    var c5=$("<div class='col-md-2'></div>")
                                    var c6=$("<div class='col-md-2'></div>")

                                    var discountamount_label=$("<label for='outdoorAmount_tag' class='custom_label_css'>Discount Amount</label>");
                                    c1.append(discountamount_label)

                                    discountamount_input=$("<input class='form-control-custom' id='discountamount_input' onfocusout='discountAmountFocousOut($(this))' class='custom_input_css'>")
                                    c2.append(discountamount_input)

                                    var discountPercernt_label=$("<label for='discountPercernt_label' class='custom_label_css float-right' >Discount Percent %</label>");
                                    c3.append(discountPercernt_label)

                                    discountpercent_input=$("<input class='form-control-custom' id='discountpercent_input' class='custom_input_css' >")
                                    c4.append(discountpercent_input);

                                    var nettotal_label=$("<label for='nettotal_label' class='custom_label_css float-right'>Net Total</label>");
                                    c5.append(nettotal_label)

                                    nettotal_input=$("<input class='form-control-custom custom_input_css'onfocusin='netTotalFocusIn()'  id='nettotal_input'>")
                                    c6.append(nettotal_input)

                                    row1__subcol1.append(c1);
                                    row1__subcol1.append(c2);
                                    row1__subcol1.append(c3);
                                    row1__subcol1.append(c4);
                                    row1__subcol1.append(c5);
                                    row1__subcol1.append(c6);

                                    
                                subcol1.append(row1__subcol1)
                            row2__calculate_col2.append(subcol1);
                        var row3__calculate_col2=$("<div class='row' style='padding-bottom:10px;'></div>");
                            var subcol1=$("<div class='col-md-8'></div>")
                                var row1__subcol1=$("<div class='row'></div>");
                                    var c1=$("<div class='col-md-3'></div>")
                                    var c2=$("<div class='col-md-9'></div>")
                                    
                                        var reason_label=$("<label for='reason_label' class='custom_label_css'>Discount Reason</label>");
                                        c1.append(reason_label)
    
                                        var discount_reason_input=$("<input class='form-control-custom' id='discount_reason_input' class='custom_input_css'>")
                                        c2.append(discount_reason_input)
    
                                    row1__subcol1.append(c1);
                                    row1__subcol1.append(c2);
    
                                // row1__subcol1.append(row1__subcol1);
                            subcol1.append(row1__subcol1);
                            var subcol2=$("<div class='col-md-4'></div>")
                                var row1__subcol2=$("<div class='row'></div>");
                                    var c1=$("<div class='col-md-4'></div>")
                                    var c2=$("<div class='col-md-4'></div>")
                                    var c3=$("<div class='col-md-4'></div>")
                                        var bill_status_label=$("<label for='reason_label' class='custom_label_css float-right'>Add Bill Status</label>");
                                    c1.append(bill_status_label)
                                        var option1_input=$("<input  type='radio' name='Paid_NotPaid' value='Paid' >PAID</input>");
                                    c2.append(option1_input)
                                        var label=$("<label class='custom_label_css> PAID </label>")
                                    c2.append(label)
                                        var option2_input=$("<input  type='radio' name='Paid_NotPaid' value='NotPaid' checked>NOT PAID</input>");
                                    c3.append(option2_input);
                                    var label=$("<label class='custom_label_css> NOT PAID </label>")

                                    c3.append(label)

                                row1__subcol2.append(c1);
                                row1__subcol2.append(c2);
                                row1__subcol2.append(c3);
                            subcol2.append(row1__subcol2);

                        row3__calculate_col2.append(subcol1);
                        row3__calculate_col2.append(subcol2);
                        
                        var row5__calculate_col2=$("<div class='row' style='padding-bottom:10px;'></div>");
                            var subcol1=$("<div class='col-md-6'></div>")
                                    var row1__subcol1=$("<div class='row'></div>");
                                        var c1=$("<div class='col-md-4'></div>")
                                        var c2=$("<div class='col-md-6'></div>")
                                        
                                            var amount_rec_label=$("<label  class='custom_label_css'>Amount Recieved</label>");
                                            c1.append(amount_rec_label)
        
                                            var amount_rec_input=$("<input class='form-control-custom' id='amount_recieved_input'  onfocusout='calculateChangeAmountDesp($(this))' class='custom_input_css'>")
                                            c2.append(amount_rec_input)
        
                                        row1__subcol1.append(c1);
                                        row1__subcol1.append(c2);
        
                            subcol1.append(row1__subcol1);
                            var subcol2=$("<div class='col-md-6'></div>")
                                var row1__subcol2=$("<div class='row'></div>");
                                    var c1=$("<div class='col-md-2'></div>")
                                    var c2=$("<div class='col-md-6'></div>")
                                    
                                        var change_label=$("<label  class='custom_label_css'>Change</label>");
                                        c1.append(change_label)

                                        var change_input=$("<input class='form-control-custom' id='change_amount_input' class='custom_input_css'>")
                                        c2.append(change_input)

                                    row1__subcol2.append(c1);
                                    row1__subcol2.append(c2);

                            subcol2.append(row1__subcol2);
                        row5__calculate_col2.append(subcol1);
                        row5__calculate_col2.append(subcol2);

                        var row4__calculate_col2=$("<div class='row'></div>");
                            var subcol1=$("<div class='col-md-12'></div>")
                                var row1__subcol1=$("<div class='row'></div>");
                                var c2=$("<div class='col-md-6'></div>")
                                        var save_button=$("<button class='save_btn' fas fa fa-save' id='save_desp_bill' onclick='SaveDespBill()'>Save </button>")
                                    c2.append(save_button)
                                    var c1=$("<div class='col-md-6'></div>")
                                        var print_button=$("<button class='gen_printbtn fas  fa fa-print' id='save_print_bill' onclick='SaveAndPrintBill()'>Print</button>")
                                    c1.append(print_button)
                                row1__subcol1.append(c1);
                                row1__subcol1.append(c2);

                            subcol1.append(row1__subcol1);
                        row4__calculate_col2.append(subcol1);
                    
                    calculate_col2.append(row1__calculate_col2);
                    calculate_col2.append(row2__calculate_col2);
                    calculate_col2.append(row3__calculate_col2);
                    calculate_col2.append(row5__calculate_col2);
                    calculate_col2.append(row4__calculate_col2);
               
                // row.append(calculate_col1);
                row.append(calculate_col2);

            colmd1.append(row);
        row__col_one__row_div_five.append(colmd1);
    col_one__row_div_five.append(row__col_one__row_div_five);
row_div_six.append(col_one__row_div_five);
main_col_div.append(row_div_five);
main_col_div.append(row_div_six);

}
function createRowDivSixDespBill(){
    var main_col_div=$("#main_col_div");
        var row_div_six=$("<div class='' id='procdiv_despbill' style='padding-top:18px'></div>");
            var col_one__row_div_six=$("<div class=''></div>");
                var row__col_one__row_div_six=$("<div class=''></div>");
                    var  colmd1=$("<div class='col-md-12'></div>");
                        var row=$("<div class='row' ></div>");
                            var procedure_col1=$("<div class='col-md-4' id=''></div>");
                                var cl=$("<div class='col-md-12' id='procedure_col1'></div>");

                                var sub_row1=$("<div class='row' style='padding-bottom:10px'></div>");
                                    var subcol1_subrow1=$("<div class='col-md-4'></div>");
                                        var label=$("<label class= 'custom_label_css'>Procedures</label>");
                                    subcol1_subrow1.append(label)

                                    var subcol2_subrow1=$("<div class='col-md-6'></div>");
                                        var select=$("<select id='procedure_select' class='form-control-custom' onchange='getProcedureCharge($(this))'></select>");
                                            var option=$("<option selected='selected' value='--'>--</option>");
                                        $(select).append(option);
                                            for (var i in procedure_data){
                                                
                                                    var option=$("<option id="+procedure_data[i][0]+"-opt value='"+i+"'>"+procedure_data[i][0]+"</option>");
                                                    $(select).append(option);
                                        
                                            } 
                                    subcol2_subrow1.append(select)
                                        
                                sub_row1.append(subcol1_subrow1);
                                sub_row1.append(subcol2_subrow1);

                                var sub_row2=$("<div class='row' style='padding-bottom:10px'></div>");
                                    var subcol1_subrow2=$("<div class='col-md-4'></div>");
                                        var label=$("<label class= 'custom_label_css'>Charges</label>");
                                    subcol1_subrow2.append(label)

                                    var subcol2_subrow2=$("<div class='col-md-6'></div>");
                                        var input=$("<input class='form-control-custom' type='number' id='procedure_charge_input' value=''></input>");
                                    subcol2_subrow2.append(input)

                                sub_row2.append(subcol1_subrow2);
                                sub_row2.append(subcol2_subrow2);

                                var sub_row3=$("<div class='row'></div>");                                        
                                    var subcol1_subrow3=$("<div class='col-md-6 offset-md-4'></div>");
                                        var button=$("<button class='btn btn-block fa fa-plus-circle' onclick='addProcedureToDespBill()'>  Add Procedure to Bill</button>");
                                    subcol1_subrow3.append(button)
                                sub_row3.append(subcol1_subrow3);
                            
                            cl.append(sub_row1)
                            cl.append(sub_row2)
                            cl.append(sub_row3)

                            procedure_col1.append(cl);
                            

                            var procedure_col2=$("<div class='col-md-8' id='procedure_col2'></div>");
                                var procedure_bill_table=$('<table id="procedure_bill_table" class="datatable_pat"></table>');
                                procedure_col2.append(procedure_bill_table)
                        row.append(procedure_col1)
                        row.append(procedure_col2)

                    colmd1.append(row);
                row__col_one__row_div_six.append(colmd1);
            col_one__row_div_six.append(row__col_one__row_div_six);
        row_div_six.append(col_one__row_div_six);
    main_col_div.append(row_div_six);
    procedureBillDespDataTable();
}
var procedure_bill_table;
function procedureBillDespDataTable(){
    $(function(){
        procedure_bill_table=$("#procedure_bill_table").DataTable({
            data:datatable_patient_billlist,
            columns: [
               
                { title:"Procedure Name"},
                { title:"Amount"},
             
                ],
                paging: false,
                scrollY: 100,
                scrollX: true,
                ordering: true,
                info:false,
                searching:false,
                columnDefs: [
                    { width: '100%', targets: '_all' }
                ],
            });
            $('#procedure_bill_table tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    procedure_bill_table.rows(this).remove()
                    $(this).remove();
                   
                }
                else{
                    rowid=$(this).find('td').eq(0).text()
                    procedure_bill_table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    
                }
            });
        });

}
function addProcedureToDespBill(){
    var procedure_select=$("#procedure_select").val();
    procedure_select=procedure_data[procedure_select][0]
    var procedure_charge_input=$("#procedure_charge_input").val();
    templist=[];
    templist.push(procedure_select);
    templist.push(procedure_charge_input);
    procedure_bill_table.row.add( templist ).draw();
    $("#procedure_select").val("--");
    $("#procedure_charge_input").val("")

}
function getProcedureCharge(element){
    i=$(element).val()
    charge=procedure_data[i][1];
    $('#procedure_charge_input').val(charge);
}
var despmedbillamount=0;
var addchargeamount=0;
var procedure_total=0
function calculateDespProcBill(){
    var totalamount=0
    despmedbillamount=0
    if (pbr_dict!==undefined){
        for (var index in pbr_dict){
            totalamount=pbr_dict[index].amount+totalamount;
            console.log("pbr_dict.amount",pbr_dict[index].amount)
            if (pbr_dict[index].amount === 0){
                despmedbillamount=pbr_dict[index].price+despmedbillamount
            }
            
        }
    }
    console.log("despmedbillamount",despmedbillamount)
    addchargeamount=totalamount;
    
    console.log("totalamount",totalamount);

    procedure_bill_data=procedure_bill_table.rows(this).data()[0];
    procedure_bill_table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
        var data = this.data();
        charges=parseInt(data[1])
        procedure_total=procedure_total+charges;
        totalamount=charges+totalamount;

    });
  
    $("#totalamount_input").val(totalamount);
    
    $("#discountamount_input").val(0);
    $("#discountpercent_input").val(0);
   
    $("#nettotal_input").val(totalamount);
    // Scroll to bill div
    $('html,body').animate({
    scrollTop: $("#totaldespbilldiv ").offset().top},
    'slow');
    

}
function discountAmountFocousOut(element){
    if (totalamount_input!==0){

    
    var discountamount_input=$("#discountamount_input").val();
    if (discountamount_input==""){
        discountamount_input=0
        $("#discountamount_input").val('0');
    }
    var discount_percentage=(discountamount_input/$("#totalamount_input").val())*100;
    if (discount_percentage !== discount_percentage){
        discount_percentage=0
    } //true

    $("#discountpercent_input").val(discount_percentage);   
    }
    else{
        $("#discountamount_input").val('0');
        alert("You can't add discount.")
    }
    
} 

function netTotalFocusIn(){
    var totalamount_input=parseFloat($("#totalamount_input").val());
    var discountamount_input=parseFloat($("#discountamount_input").val());
    console.log("discountamount_input",discountamount_input);
    if(discountamount_input!==""){
        var nettotal=totalamount_input-discountamount_input
    }
    else{
        var nettotal=totalamount_input;
    }
    $("#nettotal_input").val(nettotal);
}
function discountAmountFocousOutPres(element){
    var discountamount_input=parseFloat($("#discountamount_input").val());
    var totalamount=parseFloat($("#totalamount_input").val())
   

    if ($("#totalamount_input").val()==""){
        totalamount=0;
    }

    if (discountamount_input>totalamount){
        alert("Discount price can't be greater than Actual Price")
        $("#discountamount_input").val("0")
        $("#discountpercent_input").val("0");

        $("#amountdue_input").val("0");
        $("#amountdue_input").val(totalamount);
        return
    }
    
    var discount_percentage=(discountamount_input/totalamount)*100;
    $("#discountpercent_input").val(discount_percentage);
    
    netTotalFocusInPres()
    

}   
function netTotalFocusInPres(){
    var totalamount_input=$("#totalamount_input").val();
    var discountamount_input=$("#discountamount_input").val();
    console.log("discountamount_input",discountamount_input);
    if(discountamount_input!==""){

        var nettotal=totalamount_input-discountamount_input
        
    }
    else{
        var nettotal=totalamount_input;
    }
    $("#amountdue_input").val(nettotal);
}

function updatePrescriptionRecord(){
        $('#main_page_content').empty()
        var container_update_prescription= $('#main_page_content').append('<div class="container-fluid" id="container-update-prescription"></div>');
        $("#container-update-prescription").append("<h2 class ='center_h_tag_forms'>Update Prescription Records</h2>");
        $("#container-update-prescription").append("<hr class='custom_hr'>");
    
        var main_row_div= $("<div class='row is-flex'></div>");
    
        $(container_update_prescription).append(main_row_div);
        var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");
           
        $(main_row_div).append(main_col_div);
    
        var row_div_one=$("<div class='row' style='padding-right: 30px;'></div>");
                var col_one__row_div_one=$("<div class='col-md-12'></div>");
                    row__col_one__row_div_one=$("<div class='row'></div>");
                        colmd1=$("<div class='col-md-2 text-center'></div>")
                        colmd2=$("<div class='col-md-3'></div>")
                        colmd3=$("<div class='col-md-4'></div>")
    
                        presc_id_label=$("<label class='custom_label_css'>Prescription Id</label>");
                        colmd1.append(presc_id_label)
    
                        presc_input=$("<input id='presc_input_id' class='form-control-custom'>")
                        colmd2.append(presc_input)

                        var search_button=$("<button  class='search_patientpres_btn' onclick='searchPatPresc()'>Search</button>")
                        colmd3.append(search_button);
    
                    row__col_one__row_div_one.append(colmd1);
                    row__col_one__row_div_one.append(colmd2);
                    row__col_one__row_div_one.append(colmd3);

                col_one__row_div_one.append(row__col_one__row_div_one);
    
        $(row_div_one).append(col_one__row_div_one);
    
    $(main_col_div).append(row_div_one);
}
var pres_records_dict_for_update={}
var pres_record_datatable_update;
var pres_id_date_dict={}
function searchPatPresc(){
    $("#row_div_two").remove();
    $("#row_div_three").remove();
    $("#row_div_four").remove();
    $("#row_div_upload_presfiles").remove();
    $("#row_div_pres_record_table_update").remove()

    $("#row_div_two_pres_detail_update").remove();
    if(pres_record_datatable_update!==undefined){
        pres_record_datatable_update.destroy();

        pres_record_datatable_update=undefined
    }
    presid=$("#presc_input_id").val()
    if (presid===""){
        alert("Please insert Valid Pres id")
        return
    }
    if (presid===""){

    }
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
           "presid":presid
        },
        url: '/update_prescription_record',
        success: function(data){
            if (data['data']!=='Valid'){
                $("#row_div_pres_record_table_update").empty();

               $("#row_div_pres_record_table_update").remove()
                alert("Input Not Valid")

                $('.modal-loading').hide();

                return
            }
    pres_data_dict=JSON.parse(data['pres_data_dict']);
    pres_records_dict_for_update=JSON.parse(data['pres_records_dict']);
    med_info_list=data['med_info_list'];
    pres_records_list_for_update=data['pres_records_list'];
    med_info_rec_list=data['med_info_rec_list']
    filelist=data['filelist']


    var row_div_two=$("<div class='' id='row_div_two_pres_detail_update' style='padding-bottom:10px;'></div>");
        
    var row_div_five=$("<div class='' id='row_div_pres_record_table_update' style='padding-top:10px;'></div>");
        var main_col=$("<div class='col-md-12 update_pres_tables'></div>");
            // var subrow_one=$("<div class='row'></div>")
                // var col_one__subrow_one=$("<div class='col-md-12'></div>");
                    // row__col_one__subrow_one=$("<div class='row'></div>");
                    //     var colmd1=$("<div class='col-md-12'></div>")
                        var pres_record_table_update=$("<table id='pres_record_table_update' class='datatable_pat' width='100%' ></table>");

                        // colmd1.append(pres_record_table_update)
                    // row__col_one__subrow_one.append(colmd1);
                // col_one__subrow_one.append(row__col_one__subrow_one);
            // subrow_one.append(col_one__subrow_one)
        main_col.append(pres_record_table_update);
        row_div_five.append(main_col)
    var row_div_six=$("<div class='' id='row_div_upload_presfiles' style='padding-top:10px;'></div>");
    var main_col=$("<div class='col-md-12 update_pres_tables'></div>");

            var pres_upload_button=$('<button type="button" class="btn btn-success js-upload-photos" onclick="uploadFileFunc()"> Upload Files</button>')
                var span=$('<span class="glyphicon glyphicon-cloud-upload"></span>');
            pres_upload_button.append(span)
            var input=$('<input id="fileupload" type="file" name="file" multiple style="display: none;">')
                input.append('data-form-data="{"csrfmiddlewaretoken": "{{ csrf_token }}"} ')
                
            var pres_record_table_update=$("<table id='pres_upload_table' class='datatable_uploadfile' width='100%' ></table>");
                var thead=$(' <thead>\
                    <tr>\
                    <th>File Name</th>\
                    <th>Size</th>\
                    <th>Action</th>\
                    </tr>\
                </thead>')
            pres_record_table_update.append(thead)
                var tbody=$("<tbody>");
                    for (key in filelist){
                        console.log(key)
                        console.log(filelist[key])
                        var tr=$("<tr>")
                            var td1=$("<td>");
                                var  a=$("<a href="+filelist[key]['url']+" target='_blank'>"+filelist[key]['title']+"</a>")
                            td1.append(a)
                            var td2=$("<td>");
                            td2.append("Size: "+filelist[key]['size']+" KB ")
                            var td3=$("<td>")
                                var button=$("<button id='"+filelist[key]['title']+":"+presid+"' class='btn btn-danger delete'\
                                 onclick='deletePresUploadFile($(this))'>Delete </button>");
                            td3.append(button);
                        tr.append(td1)
                        tr.append(td2)
                        tr.append(td3)
                        tbody.append(tr);
                    }
            pres_record_table_update.append(tbody)

    main_col.append(pres_upload_button)   
    main_col.append(input)
    main_col.append(pres_record_table_update)         
    row_div_six.append(main_col)


    var row_div_four=$("<div class='row genformdiv2' id='row_div_four' style='padding-top:10px;'></div>");
        var main_col=$("<div class='col-md-12'></div>");
            var subrow_one=$("<div class='row'></div>")
                var col_one__subrow_one=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-8 offset-md-2'></div>")
                            var search_button=$("<button  class='update_patient_info_btn fa fa-save' onclick='UpdatePrescription()'>  Update Prescription Record</button>")
                        colmd1.append(search_button)
                    row__col_one__subrow_one.append(colmd1);
                col_one__subrow_one.append(row__col_one__subrow_one);
            subrow_one.append(col_one__subrow_one)
        main_col.append(subrow_one)
    row_div_four.append(main_col)

    var main_col_div=$("#main_col_div");
    main_col_div.append(row_div_five);
    main_col_div.append(row_div_two);

    createPresMedDataTableRow();
    createPresMedDataTable(med_info_rec_list);
    createPresRecDatatableForUpdate(pres_records_list_for_update);
    main_col_div.append(row_div_six);
    main_col_div.append(row_div_four);

    /* 2. INITIALIZE THE FILE UPLOAD COMPONENT */
    $("#fileupload").fileupload({
        dataType: 'json',
        autoUpload: false,
        formData:{presid:presid},
        url:"/pres_upload_files",
        add: function (e, data) {            
        console.log("data",data)
        $("#pres_upload_table tbody").prepend(
            "<tr>\
            <td><a href='/uploadedfiles/prescription_records/"+data.files[0]['name']+"' target='_blank'>" + data.files[0]['name'] + "</a></td>\
            <td><p>Size : "+data.files[0]['size']/1000+" KB</p>\
            </td>\
            <td><button id='pres_upload_btn' class='btn btn-primary'>Upload</button></td>\
            </tr>"
        )
        $("#pres_upload_btn").on('click', function () {
            
            console.log("DATA--",data)
            data.submit();
            console.log("DATA>>",data)

            presUploadBtnPressed=$(this)
            
            });
        },
        // progress:function (e, data) { 
        //     console.log("progress",data)
        //     var progress = parseInt(data.loaded / data.total * 100, 10);
        //     var strProgress = progress + "%";
        //     $("#progress-bar"+data.originalFiles.name).css({"width": strProgress});
        //     $("#progress-bar"+data.originalFiles.name).text(strProgress);
        //  },

        done: function (e, data) {  /* 3. PROCESS THE RESPONSE FROM THE SERVER */
        console.log("dattaa",data)
        filename=data.result.name
        size=data.originalFiles.size
        parent=$(presUploadBtnPressed).parent();
        $(parent).append("<button id='"+filename+":"+presid+"' class='btn btn-danger delete'  onclick='deletePresUploadFile($(this))'>Delete</button>")
        $(presUploadBtnPressed).remove();     
        
        // if (data.result.is_valid) {
        //     $("#gallery tbody").prepend(
        //       "<tr><td><a href='" + data.result.url + "'>" + data.result.name + "</a><button >Delete</button> <input type='checkbox'></td></tr>"
        //     )
        //   }
        },
        
        });
        $('.modal-loading').hide();

    }
});
    

}



var presUploadBtnPressed;
    function uploadFileFunc(){
        

        $("#fileupload").click();
       
    }
    
      
    function deletePresUploadFile(ele) {
        id=$(ele).attr('id');
        arr=id.split(":");
        name=arr[0];
        presid=arr[1]
        
        console.log("DeLeTEING",name)
        console.log("presid",presid)
        $.ajax({
            type: 'POST',
            dataType: "json",
            'data': {
                'filename':name,
                'presid':presid,
            },
            url: '/pres_rec_deletefiles',
            success: function(data){
                $(ele).parent().parent().remove();
    
            }
        });
    }





function createPresMedDataTableRow(){
    var row_div_three=$("<div class=' update_pres_tables' id='row_div_three'></div>");
        var col_one__row_div_three=$("<div class='col-md-12'></div>");
            row__col_one__row_div_three=$("<div class='row'></div>");
                colmd1=$("<div class='col-md-12'></div>")
                    var table=$('<table id="pres-med-table" class="datatable_pat" width="100%"></table>')
                colmd1.append(table);
            row__col_one__row_div_three.append(colmd1);
        col_one__row_div_three.append(row__col_one__row_div_three);
    row_div_three.append(col_one__row_div_three);
    
var main_col_div=$("#main_col_div");
main_col_div.append(row_div_three)
}

function createPresMedDataTable(med_info_list){
    
    $(function(){
        $('#pres-med-table').append('<caption class="custom_label_css" style="font-weight: bold; ;caption-side: top;">Medicine Records</caption>');

        pat_pres_datatable=$("#pres-med-table").DataTable({
            data:med_info_list,
            columns: [
                { title: "SrNo" },
                { title: "Date" },
                { title: "Medicine Name" },
                { title: 'Type' },
                { title: "Medicine Detial" },
                { title: "Weight" },
                { title: 'Timing' },
            ],
            dom: 'Bfrtip',
            buttons: [
                {
                extend: 'print',
                text: ' PRINT',
                title: 'Medicine Records',
                className: 'datatable_button  printbtn fas fa-print',
                },
                {
                    extend: 'excel',
                    text: ' EXCEL',
                    title: 'Medicine Records',
                    className: 'datatable_button excelbtn fas fa-print',
                    }
            ],
            paging: true,
            scrollY: 200,
            scrollX: 100,
            ordering: true,
            info:false,     
            searching:false,

        });
    });
}

function createPresRecDatatableForUpdate(pres_records_list_for_update){
    pres_record_datatable_update=undefined
    if (pres_record_datatable_update!==undefined){
        pres_record_datatable_update.destroy()
    }
    $(function(){
        $('#pres_record_table_update').append('<caption class="custom_label_css" style="font-weight: bold; ;caption-side: top;">Prescription Records</caption>');

        pres_record_datatable_update=$("#pres_record_table_update").DataTable({
            data:pres_records_list_for_update,
            columns: [
                { title: "No"},
                { title: "Date" },
                { title: "Visiting" },
                { title: "Doc Name" },
                { title: 'Sign Symptoms' },
                { title: "Provisional Diagnosis" },
                { title: "Investigation" },
                { title: 'Diagnosis' },
                { title: 'Vitals' },
                { title: 'RX' },
            ],
            dom: 'Bfrtip',
            buttons: [
                {
                extend: 'print',
                text: ' PRINT',
                title: 'Prescription Records',
                className: 'datatable_button printbtn fas fa-print',
                },
                {
                    extend: 'excel',
                    text: ' EXCEL',
                    title: 'Prescription Records',
                    className: 'datatable_button excelbtn fas fa-print',
                    }
            ],
            paging: true,
            scrollY: 200,
            scrollX: 200,
            ordering: true,
            info:false,     
            searching:false,

        });
        $('#pres_record_table_update tbody').on( 'click', 'tr', function () {
            if ( $(this).hasClass('selected') ) {
                alert("clicked same entry")
            }
            else{
                pres_date_selected=$(this).find('td').eq(1).text()

               
                pres_record_datatable_update.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                createPresByDateForUpdateForm(pres_date_selected)

            }
        });
    });
}
function createPresByDateForUpdateForm(pres_date_selected){
        var row_div_two_pres_detail_update=$("#row_div_two_pres_detail_update");
        row_div_two_pres_detail_update.empty();

        var main_subcol=$("<div class='col-md-12 update_pres_form_div'></div>");

            
            var subrow_one=$("<div class='row'></div>")
                var col_one__subrow_one=$("<div class='col-md-6'></div>");
                    row__col_one__subrow_one=$("<div class='row'></div>");
                        
                        var colmd1=$("<div class='col-md-4 text-center'></div>")
                        var colmd2=$("<div class='col-md-8' style='padding-bottom:10px;'></div>")
                            var ss_label=$("<label for='ss_tag' class='custom_label_css'>Signs/Symptoms</label>");
                            var ss_input=$("<textarea id='sign_symptoms____"+pres_date_selected+"' onfocusout='updatePresDataFocusOut($(this))' class='form-control-custom custom_input_css' style='height: 140px;' value='"+pres_records_dict_for_update[pres_date_selected]['sign_symptoms']+"'>"+pres_records_dict_for_update[pres_date_selected]['sign_symptoms']+"</textarea>")
                        colmd1.append(ss_label)
                        colmd2.append(ss_input)
                    
                    row__col_one__subrow_one.append(colmd1);
                    row__col_one__subrow_one.append(colmd2);
                col_one__subrow_one.append(row__col_one__subrow_one);

                var col_two__subrow_one=$("<div class='col-md-6'></div>");
                    var row__col_two__subrow_one=$("<div class='row'></div>");
                        
                        var colmd1=$("<div class='col-md-4 text-center'></div>")
                        var colmd2=$("<div class='col-md-8' style='padding-bottom:10px;'></div>")
                            var pd_label=$("<label class='custom_label_css'>Provisonal Diagnosis</label>");
                            var pd_input=$("<textarea id='provisional_diagnosis____"+pres_date_selected+"' onfocusout='updatePresDataFocusOut($(this))' class='form-control-custom custom_input_css' style='height: 140px;'  value='"+pres_records_dict_for_update[pres_date_selected]['provisional_diagnosis']+"'>"+pres_records_dict_for_update[pres_date_selected]['provisional_diagnosis']+"</textarea>")
                        colmd1.append(pd_label);
                        colmd2.append(pd_input);

                    row__col_two__subrow_one.append(colmd1)
                    row__col_two__subrow_one.append(colmd2)
                col_two__subrow_one.append(row__col_two__subrow_one)

            subrow_one.append(col_one__subrow_one)
            subrow_one.append(col_two__subrow_one)

            var subrow_two=$("<div class='row'></div>")

                var col_one__subrow_two=$("<div class='col-md-6'></div>");
                    row__col_one__subrow_two=$("<div class='row'></div>");
                        
                        var colmd1=$("<div class='col-md-4 text-center'></div>")
                        var colmd2=$("<div class='col-md-8' style='padding-bottom:10px;'></div>")
                            var investigation_label=$("<label for='ss_tag' class='custom_label_css'>Investigation</label>");
                            var investigation_input=$("<textarea id='investigation____"+pres_date_selected+"' onfocusout='updatePresDataFocusOut($(this))' class='form-control-custom custom_input_css' style='height: 140px;'  value='"+pres_records_dict_for_update[pres_date_selected]['investigation']+"'>"+pres_records_dict_for_update[pres_date_selected]['investigation']+"</textarea>")
                        colmd1.append(investigation_label)
                        colmd2.append(investigation_input)

                    row__col_one__subrow_two.append(colmd1);
                    row__col_one__subrow_two.append(colmd2);
                col_one__subrow_two.append(row__col_one__subrow_two);

                var col_two__subrow_two=$("<div class='col-md-6'></div>");
                    var row__col_two__subrow_two=$("<div class='row'></div>");
                        
                        var colmd1=$("<div class='col-md-4 text-center'></div>")
                        var colmd2=$("<div class='col-md-8' style='padding-bottom:10px;'></div>")
                            var pd_label=$("<label class='custom_label_css'>Diagnosis</label>");
                            var pd_input=$("<textarea id='diagnosis____"+pres_date_selected+"' onfocusout='updatePresDataFocusOut($(this))' class='form-control-custom custom_input_css' style='height: 140px;'  value='"+pres_records_dict_for_update[pres_date_selected]['diagnosis']+"'>"+pres_records_dict_for_update[pres_date_selected]['diagnosis']+"</textarea>")
                        colmd1.append(pd_label);
                        colmd2.append(pd_input);

                    row__col_two__subrow_two.append(colmd1)
                    row__col_two__subrow_two.append(colmd2)
                col_two__subrow_two.append(row__col_two__subrow_two)

            subrow_two.append(col_one__subrow_two)
            subrow_two.append(col_two__subrow_two)

            var subrow_three=$("<div class='row'></div>")

                var col_one__subrow_three=$("<div class='col-md-6'></div>");
                    row__col_one__subrow_three=$("<div class='row'></div>");
                        
                        var colmd1=$("<div class='col-md-4 text-center'></div>")
                        var colmd2=$("<div class='col-md-8' style='padding-bottom:10px;'></div>")
                            var vitals_label=$("<label for='v_tag' class='custom_label_css'>Vitals</label>");
                            var vitals_input=$("<textarea id='vitals____"+pres_date_selected+"' onfocusout='updatePresDataFocusOut($(this))' class='form-control-custom custom_input_css' style='height: 140px;'  value='"+pres_records_dict_for_update[pres_date_selected]['vitals']+"'>"+pres_records_dict_for_update[pres_date_selected]['vitals']+"</textarea>")
                        colmd1.append(vitals_label)
                        colmd2.append(vitals_input)

                    row__col_one__subrow_three.append(colmd1);
                    row__col_one__subrow_three.append(colmd2);
                col_one__subrow_three.append(row__col_one__subrow_three);

                var col_two__subrow_three=$("<div class='col-md-6'></div>");
                    row__col_two__subrow_three=$("<div class='row'></div>");
                        
                        var colmd1=$("<div class='col-md-4 text-center'></div>")
                        var colmd2=$("<div class='col-md-8' style='padding-bottom:10px;'></div>")
                            var rx_label=$("<label for='rx_tag' class='custom_label_css'>RX</label>");
                            var rx_input=$("<textarea id='rx____"+pres_date_selected+"' onfocusout='updatePresDataFocusOut($(this))' class='form-control-custom custom_input_css' style='height: 140px;' value='"+pres_records_dict_for_update[pres_date_selected]['rx']+"'>"+pres_records_dict_for_update[pres_date_selected]['rx']+"</textarea>")
                        colmd1.append(rx_label)
                        colmd2.append(rx_input)

                    row__col_two__subrow_three.append(colmd1);
                    row__col_two__subrow_three.append(colmd2);
                col_two__subrow_three.append(row__col_two__subrow_three);

            subrow_three.append(col_one__subrow_three)
            subrow_three.append(col_two__subrow_three)

        main_subcol.append(subrow_one)
        main_subcol.append(subrow_two)
        main_subcol.append(subrow_three)
    row_div_two_pres_detail_update.append(main_subcol)
    // Scroll to bill div
    $('html,body').animate({
        scrollTop: $(row_div_two_pres_detail_update).offset().top},
        'slow');
}
function UpdatePrescription(){
    presid=$("#presc_input_id").val()

    // ss_input=$("#ss_input").val()
    // pd_input=$("#pd_input").val()
    // investigation_input=$("#investigation_input").val()
    // diagnosis_input=$("#diagnosis_input").val()
    // vitals_input=$("#vitals_input").val()
    // rx_input=$("#rx_input").val()
    // pres_data_dict={}

    // pres_data_dict['ss']=ss_input;
    // pres_data_dict['pd']=pd_input;
    // pres_data_dict['investigation']=investigation_input;
    // pres_data_dict['diagnosis']=diagnosis_input;
    // pres_data_dict['vitals']=vitals_input;
    // pres_data_dict['rx']=rx_input;

    $('.modal-loading').show();

    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            "presid":presid,
            "pres_data_dict":JSON.stringify(pres_data_dict),
            "pres_id_date_dict":JSON.stringify(pres_id_date_dict),
            "pres_records_dict_for_update":JSON.stringify(pres_records_dict_for_update),
        },
        url: '/update_prescription_record',
        success: function(data){
            $('.modal-loading').hide();

            alert("Updated")

            // $("#row_div_two").remove();
            // $("#row_div_three").remove();
            // $("#row_div_four").remove();
            // $("#presc_input_id").val("")

        }
    });




    
}
function updatePresDataFocusOut(ele){
    id=$(ele).attr('id')
    arr=id.split("____")
    pres_date_selected=arr[1];
    field=arr[0]
    console.log("pres_date_selected",pres_date_selected)
    console.log("field",field)
    console.log("pres_records_dict_for_update-==-",pres_records_dict_for_update)

    pres_records_dict_for_update[pres_date_selected][field]=$(ele).val()
    console.log("pres_records_dict_for_update--",pres_records_dict_for_update)
    
}
function ViewPrescriptionList(){
    $('#main_page_content').empty()
    var container_update_prescription= $('#main_page_content').append('<div class="container-fluid" id="container-view-prescription"></div>');
    $("#container-view-prescription").append("<h2 class ='center_h_tag_forms'>Prescription List</h2>");
    $("#container-view-prescription").append("<hr class='custom_hr'>");

    var main_row_div= $("<div class='row is-flex'></div>");

    $(container_update_prescription).append(main_row_div);
    var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");
       
    $(main_row_div).append(main_col_div);

    var row_div_one=$("<div class='row' style='padding-right: 30px;'></div>");
        var preslist_div=$("<div id='preslist_div' style='width:-webkit-fill-available;'></div>");
            var preslist_table=$("<table id='preslist_table'  class='datatable_pat' width='100%' ></table>");
        preslist_div.append(preslist_table);
        row_div_one.append(preslist_div);
    $(main_col_div).append(row_div_one);
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
           
        },
        url: '/view_prescription_list',
        success: function(data){
            prescription_list=data['pres_info_list'];
            console.log("prescription_list--",prescription_list)
            createDataTableViewPresList(prescription_list);
            $('.modal-loading').hide();

        }
    });
           
}
function createDataTableViewPresList(prescription_list){
  
    $(function(){
        view_pres_datatable=$("#preslist_table").DataTable({
            data:prescription_list,
            columns: [
                { title: "Id" },
                { title: "Patient Name" },
                { title: "Patient Type" },
                { title: 'Doctor' },
                ],
                paging: true,
                pageLength:50,
                scrollY: 500,
                scrollX: true,
                info:false,
                ordering: true,
                searching:true,
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'print',
                        text: 'PRINT',
                        title: 'Prescription List',
                        className: 'datatable_button printbtn fas fa-print',

                    },
                     {
                        extend: 'excel',
                        text: ' EXCEL',
                        title: 'Prescription List',
                        className: 'datatable_button excelbtn fas fa-file-excel',

                    },
                     {
                        extend: 'csv',
                        text: ' CSV',
                        title: 'Prescription List',
                        className: 'datatable_button csvbtn fas fa-file',

                    },
                    {
                        extend: 'pdf',
                        text: ' PDF',
                        title: 'Prescription List',
                        className: 'datatable_button pdfbtn fas fa-file-pdf',

                    },
                   
                ],
    
            });
            $('.dataTables_filter  input[type="search"]').
            attr('placeholder','Search Prescriptions...').
            css({'width':'200px','display':'inline-block'});
            $('.dataTables_filter input').addClass('form-control-custom');
            $('#preslist_table tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                }
                else{
                    view_pres_datatable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });
        });
}

function viewTokenRecords(){
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
           
        },
        url: '/view_token_records',
        success: function(data){
            tokenrecordlist=data["tokenrecordlist"]
            console.log("tokenrecordlist",tokenrecordlist)
            $('#main_page_content').empty()
            var container_view_token_records= $('#main_page_content').append('<div class="container-fluid" id="container-view-token-records"></div>');
            $("#container-view-token-records").append("<u><h2 class ='center_h_tag_forms'>Token Record List</h2></u>");
            $("#container-view-token-records").append("<hr class='custom_hr'>");
        
            var main_row_div= $("<div class='row is-flex'></div>");
        
            $(container_view_token_records).append(main_row_div);
            var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");
               
            $(main_row_div).append(main_col_div);
        
            var row_div_one=$("<div class='row' style='padding-bottom: 10px;'></div>");
                var token_record_list_div=$("<div id='token_record_list_div' style='width:-webkit-fill-available;'></div>");
                    var tokenrecord_table=$("<table id='tokenrecord_table'  class='datatable_pat' width='100%' ></table>");
                token_record_list_div.append(tokenrecord_table);
                row_div_one.append(token_record_list_div);
            $(main_col_div).append(row_div_one);
            $(function(){
                tokenrecord_datatable=$("#tokenrecord_table").DataTable({
                    data:tokenrecordlist,
                    columns: [
                        { title: 'Token No' },
                        { title: "Prescription No" },  
                        { title: "Patient Name" },
                       
                        ],
                        paging: true,
                        pageLength: 50,
                        scrollY: 500,
                        scrollX: true,

                        ordering: true,
                        searching:true,
                        dom: 'Bfrtip',
                        buttons: [
                            {
                                extend: 'print',
                                text: ' PRINT',
                                title: 'Token Record List',
                                className: 'datatable_button printbtn fa fa-print',
        
                            },
                             {
                                extend: 'excel',
                                text: ' Excel',
                                title: 'Token Record List',
                                className: 'datatable_button excelbtn fas fa-file-excel',
        
                            },
                        ]
                    });
                    $('#tokenrecord_table tbody').on( 'click', 'tr', function () {
                        if ( $(this).hasClass('selected') ) {
                        }
                        else{
                            tokenrecord_datatable.$('tr.selected').removeClass('selected');
                            $(this).addClass('selected');
                        }
                    });
                });
                $('.modal-loading').hide();

        }
    });
}


function viewTokenGeneratorTable(){
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
           
        },
        url: '/view_token_generator_table',
        success: function(data){
            tokengeneratorlist=data['tokengeneratorlist']
            $('#main_page_content').empty()
            var container_view_token_generator= $('#main_page_content').append('<div class="container-fluid" id="container-view-token-generator"></div>');
            $("#container-view-token-generator").append("<u><h2 class ='center_h_tag_forms'>Token Generator List</h2></u>");
            $("#container-view-token-generator").append("<hr class='custom_hr'>");
        
            var main_row_div= $("<div class='row is-flex'></div>");
        
            $(container_view_token_generator).append(main_row_div);
            var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");
               
            $(main_row_div).append(main_col_div);
        
            var row_div_one=$("<div class='row' style='padding-bottom: 10px;'></div>");
                var token_generator_list_div=$("<div id='token_generator_list_div' style='width:-webkit-fill-available;'></div>");
                    var token_generator_table=$("<table id='token_generator_table'  class='datatable_pat' width='100%' ></table>");
                token_generator_list_div.append(token_generator_table);
                row_div_one.append(token_generator_list_div);
            $(main_col_div).append(row_div_one);

            $(function(){
                tokengenerator_datatable=$("#token_generator_table").DataTable({
                    data:tokengeneratorlist,
                    columns: [
                        { title: "Id" },
                        { title: 'Token No' },
                        ],
                        paging: true,
                        scrollY: 200,
                        scrollX: true,
                        ordering: true,
                        searching:true,
                        dom: 'Bfrtip',
                        buttons: [
                            {
                                extend: 'print',
                                text: 'PRINT',
                                title: 'Token Generator List',
                                className: 'datatable_button printbtn fa fa-print',
        
                            },
                             {
                                extend: 'excel',
                                text: ' Excel',
                                title: 'Token Generator List',
                                className: 'datatable_button excelbtn  fas fa-file-excel',
        
                            },
                        ]
                    });
                    $('#tokenrecord_table tbody').on( 'click', 'tr', function () {
                        if ( $(this).hasClass('selected') ) {
                        }
                        else{
                            tokengenerator_datatable.$('tr.selected').removeClass('selected');
                            $(this).addClass('selected');
                        }
                    });
                });
        $('.modal-loading').hide();

        }
    });
}

function resetTokenRequest(){
    $('.modal-loading').show();
        $.ajax({
            type: 'GET',
            dataType: "json",
            'data': {
            
            },
            url: '/reset_tokens',
            success: function(data){
                status=data['status']
                if (status==="Resetted"){
                    reset_dialog.close();
                    alert("Tokens Are Resset To Zero")
                }
                $('.modal-loading').hide();

            }
            });
    }
var reset_dialog;
function resetTokens(){
    
    $( function() {
            $( "#reset-token-dialog" ).show()
            reset_dialog=$( "#reset-token-dialog" ).dialog({
            uiLibrary: 'bootstrap',

            resizable: true,
            height: "auto",
            width: 500,
            modal: true,                  
              
            });
            $('#reset_token_dialog_btn').on('click', resetTokenRequest);

        } );
   
}
function  addChargeExsistingPres(){
    $('#main_page_content').empty()
    var container_addchargeexisting_pres= $('#main_page_content').append('<div class="container-fluid" id="container-addcharge-existing-pres"></div>');
    $("#container-addcharge-existing-pres").append("<h2 class ='center_h_tag_forms'>Revisiting On Same Prescription</h2>");
    $("#container-addcharge-existing-pres").append("<hr class='custom_hr'>");

    var main_row_div= $("<div class='row is-flex'></div>");

    $(container_addchargeexisting_pres).append(main_row_div);
    var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");
       
    $(main_row_div).append(main_col_div);

    var row_div_one=$("<div class='row'></div>");
        // Patient Name
        var col_one__row_div_one=$("<div class='col-md-12'></div>");
        row__col_one__row_div_one=$("<div class='row'></div>");
            colmd1=$("<div class='col-md-2'></div>")
            colmd2=$("<div class='col-md-2'></div>")                
            colmd3=$("<div class='col-md-2'></div>")

                pres_id_label=$("<label class='custom_label_css'>Prescription id</label>");
            colmd1.append(pres_id_label)
                pres_id_input=$("<input class='form-control-custom' id='search_patient_id' class='custom_input_css'>")
            colmd2.append(pres_id_input);
                var search_button=$('<button class="search_patient_btn fa fa-search" onclick="searchPatientInAddChargeExisPres(event)">Search</button>');
            colmd3.append(search_button);

        row__col_one__row_div_one.append(colmd1);
        row__col_one__row_div_one.append(colmd2);
        row__col_one__row_div_one.append(colmd3);

        col_one__row_div_one.append(row__col_one__row_div_one);
    row_div_one.append(col_one__row_div_one);
$(main_col_div).append(row_div_one);
}
function consultationSlip(){
    $('#main_page_content').empty()
    var container_addchargeexisting_pres= $('#main_page_content').append('<div class="container-fluid" id="container-addcharge-existing-pres"></div>');
    $("#container-addcharge-existing-pres").append("<h2 class ='center_h_tag_forms'>Consulation Slip</h2>");
    $("#container-addcharge-existing-pres").append("<hr class='custom_hr'>");

    var main_row_div= $("<div class='row is-flex'></div>");

    $(container_addchargeexisting_pres).append(main_row_div);
    var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");
       
    $(main_row_div).append(main_col_div);

    var row_div_one=$("<div class='row'></div>");
        // Patient Name
        var col_one__row_div_one=$("<div class='col-md-12'></div>");
        row__col_one__row_div_one=$("<div class='row'></div>");
            colmd1=$("<div class='col-md-2'></div>")
            colmd2=$("<div class='col-md-2'></div>")                
            colmd3=$("<div class='col-md-2'></div>")

                pres_id_label=$("<label class='custom_label_css'>Prescription id</label>");
            colmd1.append(pres_id_label)
                pres_id_input=$("<input class='form-control-custom' id='search_patient_id' class='custom_input_css'>")
            colmd2.append(pres_id_input);
                var search_button=$('<button class="search_patient_btn fa fa-search" onclick="searchPatientInConsultationSlip()">Search</button>');
            colmd3.append(search_button);

        row__col_one__row_div_one.append(colmd1);
        row__col_one__row_div_one.append(colmd2);
        row__col_one__row_div_one.append(colmd3);

        col_one__row_div_one.append(row__col_one__row_div_one);
    row_div_one.append(col_one__row_div_one);
$(main_col_div).append(row_div_one);
}



function searchPatientInConsultationSlip(){
    
    var pres_id=$("#search_patient_id").val()
    $("#row_div_two").remove();
    $("#createConsultaionFormDiv").remove();
    consultationSlip();
    if (pres_id===""){
        alert("Please Insert Valid Pres id")
        return
    }

    retrievePatientInfoInConsultationSlip("","","",pres_id)    

}
function retrievePatientInfoInConsultationSlip(pat_name,contact_no,cnic_no,id){
    datatable_lst=[];
    patientid=id;
    prescription_id=id;
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
            "id":prescription_id,
        },
        url: '/retrieve_patient_info_createconsultationdata',
        success: function(data){
            pres_id=data['pres_id']
            if (data['pres_id']===""){
                alert("Please Insert Valid Pres id")
                $('.modal-loading').hide();

                return
            }
            if (data['message']==="Exsists"){
                alert("Already Exsists")
                $('.modal-loading').hide();

                return;
            }
            if (data['data']!=='Valid'){
                alert("Input Not Valid")

                $('.modal-loading').hide();

                return;
            }
           
            
            console.log("patient_dict",data["patient_dict"])
            patient_dict={};
            patient_dict=JSON.parse(data["patient_dict"])
            patient_id_selected=JSON.parse(data["id"])
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
            empdict=JSON.parse(data['empdict']);
            createPatientDetailsHtmlInConsultationSlip(pres_id);
            $('.modal-loading').hide();


        },
    }); 
}
function createPatientDetailsHtmlInConsultationSlip(pres_id){
    var row_div_two=$("<div class='' id='row_div_two'></div>");
        var main_subcol=$("<div class='col-md-12 genformdiv2'></div>");

            var subrow_one=$("<div class='row' style='padding-top:20px'></div>")

                var col_one__subrow_one=$("<div class='col-md-3'></div>");
                        row__col_one__subrow_one=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-5'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var pat_name_label=$("<label for='emp_name_tag' class='custom_label_css'>Patient Name</label>");
                                var pat_name_input=$("<label class='custom_label_css' id='pat_name_input'>"+patient_dict[patient_id_selected]['name']+"</label>")
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
                            var contact_type_input=$("<label class='custom_label_css' id='contact_numb_input'>"+patient_dict[patient_id_selected]['contact_no']+"</label>")
                        colmd1.append(contact_type_label);
                        colmd2.append(contact_type_input);
    
                    row__col_two__subrow_one.append(colmd1)
                    row__col_two__subrow_one.append(colmd2)
                col_two__subrow_one.append(row__col_two__subrow_one)
                var col_three__subrow_one=$("<div class='col-md-3'></div>");
                    var row__col_three__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-5'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var pres_id_label=$("<label class='custom_label_css'>Prescription No</label>");
                            var pres_id_input=$("<label class='custom_label_css' id='consult_pres_id'>"+pres_id+"</label>")
                        colmd1.append(pres_id_label);
                        colmd2.append(pres_id_input);
    
                    row__col_three__subrow_one.append(colmd1)
                    row__col_three__subrow_one.append(colmd2)
                col_three__subrow_one.append(row__col_three__subrow_one)

            subrow_one.append(col_one__subrow_one)
            subrow_one.append(col_two__subrow_one)
            subrow_one.append(col_three__subrow_one)


        
        
        
        main_subcol.append(subrow_one)


    row_div_two.append(main_subcol)
    var main_col_div=$("#main_col_div");
    main_col_div.append(row_div_two);
    createConsultationSlipForm()
}
function createConsultationSlipForm(){
    var main_col_div=$('#main_col_div')
    var row_div_five=$("<div class='' id='createConsultaionFormDiv'></div>");

        var main_col__row_five=$("<div class='col-md-12 genformdiv1'></div>");

           

            
            var row_one=$("<div class='row' style=' padding-bottom:10px;'></div>")

                var col_one__row_one=$("<div class='col-md-12'></div>");
                        row__col_one__row_one=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-2'></div>")
                            var colmd2=$("<div class='col-md-2'></div>")
                            
                                var doctor=$("<label for='doctor_label' class='custom_label_css'>Doctor</label>");
                                colmd1.append(doctor)

                                var select=$("<select id='selecteddoctor' class='form-control-custom'></select>");
                                        var option=$("<option selected='selected' value='--'>--</option>");
                                    $(select).append(option);

                                    for (var key in empdict){
                                        var option=$("<option id='"+key+"_doc-opt' value='"+key+"'>"+empdict[key]+"</option>");
                                        $(select).append(option);
                                    } 
                                colmd2.append(select)

                        row__col_one__row_one.append(colmd1);
                        row__col_one__row_one.append(colmd2);

                    col_one__row_one.append(row__col_one__row_one);

            row_one.append(col_one__row_one)

            var row_two=$("<div class='row' style=' padding-bottom:10px;'></div>")

                var col_one__row_two=$("<div class='col-md-12'></div>");
                        row__col_one__row_two=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-2'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                            
                                var ss_label=$("<label  class='custom_label_css'>Medicines</label>");
                                colmd1.append(ss_label)

                                var ss_text=$("<textarea  class='form-control-custom'style='height:150px;' id='med_consult_textarea'></textarea>")
                                colmd2.append(ss_text)

                        row__col_one__row_two.append(colmd1);
                        row__col_one__row_two.append(colmd2);

                col_one__row_two.append(row__col_one__row_two);

            row_two.append(col_one__row_two)

            

            var row_nine=$("<div class='row' style='padding-bottom:10px;'></div>")

                var col_one__row_nine=$("<div class='col-md-12'></div>");
                        row__col_one__row_nine=$("<div class='row'></div>");
                            colmd1=$("<div class='col-md-3'></div>")
                                print_consult_button=$('<button class="save_btn fa fa-print" onclick="printConsultationSlip()">Print</button>')
                                colmd1.append(print_consult_button)
                            colmd2=$("<div class='col-md-6'></div>")
                            colmd3=$("<div class='col-md-3'></div>")

                            GenPres_button=$('<button class="save_btn fa fa-save" onclick="saveConsultationData()" >Save</button>')
                            colmd2.append(GenPres_button)
                            
                        row__col_one__row_nine.append(colmd1);
                        row__col_one__row_nine.append(colmd2);
                        row__col_one__row_nine.append(colmd3);

                    col_one__row_nine.append(row__col_one__row_nine);

            row_nine.append(col_one__row_nine)

        main_col__row_five.append(row_one)
        main_col__row_five.append(row_two)
        main_col__row_five.append(row_nine)

    row_div_five.append(main_col__row_five)
 main_col_div.append(row_div_five)
}
function printConsultationSlip(){
    var rmc="RMC HOSPITAL";
    var patient_name=$("#pat_name_input").text();
    var phoneno=$("#contact_numb_input").text();
    var selecteddoctor=$("#selecteddoctor").val()
    $("#invoice-POS").empty();
    var invoice_pos=$("#invoice-POS");
    
        var center=$("<div id='top'></div>")

            var div_logo=$("<div class='logo'></div>");
                // var img_scr=$("<img style='width: 100px;' src='/static/rmcapp/mainhomepage_static/img/rmc.png'><br>")

            div_logo.append(logoImg);
            var div_info=$("<div class='info'></div>");
                var h2=$("<h2></h2>");
                h2.append(rmc);
            div_info.append(h2);
        center.append(div_logo);
        center.append(div_info);
        invoice_pos.append(center);   


        var mid_div=$("<div id='mid'></div>");
            var div_info=$("<div class='info'></div>");
                var p1=$("<p> Name   :  "+patient_name.toUpperCase()+" </br> Phone   :  "+phoneno+"</br></p>")
                var p=$("<p> Doctor : "+empdict[selecteddoctor]+"<p>")
            div_info.append(p);
            div_info.append(p1);

         
        mid_div.append(div_info);

   
        var bot_div=$("<div id='bot'></div>");
        var div_table=$("<div id='table'></div>");
            var table=$("<table>")
                var tr=$('<tr class="tabletitle"></tr>')
                    var td1=$('<td class="item"><p style="font-size:20px">Description</p></td>')
                    // var td2=$('<td class="item"><p style="font-size:20px"> (Timings) </p></td>')

                tr.append(td1);
                // tr.append(td2);

            table.append(tr);
        div_table.append(table);

                    
            
             

            var legalcopy=$("<div id='legalcopy'>");
                var p4=$('<p class="consult_text"><strong>'+$("#med_consult_textarea").val()+'</strong>  </p>')
                var p=$('<p class="legal"><strong>Thank you for visiting RMC!</strong>  </p>')
                var p1=$('<p class="legal"><strong>CONTACT NO : 0321-2312313</strong>  </p>')
                var p2=$('<p class="legal"><strong>Address  : Badami Bagh, Lahore</strong>  </p>')
            
            legalcopy.append(p4);
            legalcopy.append(p);
            legalcopy.append(p1);
            legalcopy.append(p2);
        bot_div.append(div_table);
        bot_div.append(legalcopy);


    invoice_pos.append(mid_div);    
    invoice_pos.append(bot_div);    
    

    $('#patient_dash_first_div').hide();
    var printcontent = $(invoice_pos).clone();
  
    window.print();
    $('#patient_dash_first_div').show();
    $('#invoice-POS').empty();
}
function saveConsultationData(){
    presid=$("#consult_pres_id").text();
    console.log("presid--",presid)
    selecteddoctor=$("#selecteddoctor").val();
    medicine_details=$("#med_consult_textarea").val();
    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            "presid":presid,
            "medicine_details":medicine_details,
            "doc":selecteddoctor,
        },
        url: '/consulatation_records',
        success: function(data){
            if (data['message']==="consultation exsists"){
                alert("Already Exsists")
            }
            else{
                alert("Saved")
            }
        }
        });

           
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function searchPatientInUpdateConsultationSlip(){
       
    var pres_id=$("#search_patient_id").val()
    $("#row_div_two").remove();
    $("#createConsultaionFormDiv").remove();
    updateConsultationSlip();
    if (pres_id===""){
        alert("Please Insert Valid Pres id")
        return
    }

    retrievePatientInfoInUpdateConsultationSlip("","","",pres_id)    

}
var consulatation_data={}
function retrievePatientInfoInUpdateConsultationSlip(pat_name,contact_no,cnic_no,id){
    datatable_lst=[];
    patientid=id;
    prescription_id=id;
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
            "id":prescription_id,
        },
        url: '/retrieve_patient_info_and_consultationdata',
        success: function(data){
            pres_id=data['pres_id']
            if (data['pres_id']===""){
                alert("Please Insert Valid Pres id")
                $('.modal-loading').hide();

                return
            }
            if (data['data']!=='Valid'){
                alert("Input Not Valid")

                $('.modal-loading').hide();

                return;
            }
           
           
            
            console.log("patient_dict",data["patient_dict"])
            patient_dict={};
            patient_dict=JSON.parse(data["patient_dict"])
            patient_id_selected=JSON.parse(data["id"])
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
            empdict=JSON.parse(data['empdict']);

            consulatation_data=JSON.parse(data['consulatation_data'])
            console.log("consulatation_data",consulatation_data)
            if (consulatation_data['message']==="false"){
                alert("No Record Present")
                $('.modal-loading').hide();

                return
            }

            updatePatientDetailsHtmlInConsultationSlip(pres_id);
            $('.modal-loading').hide();

        },
    }); 
}
function updatePatientDetailsHtmlInConsultationSlip(pres_id){
    var row_div_two=$("<div class='' id='row_div_two'></div>");
        var main_subcol=$("<div class='col-md-12 genformdiv2'></div>");

            var subrow_one=$("<div class='row' style='padding-top:20px'></div>")

                var col_one__subrow_one=$("<div class='col-md-3'></div>");
                        row__col_one__subrow_one=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-5'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var pat_name_label=$("<label for='emp_name_tag' class='custom_label_css'>Patient Name</label>");
                                var pat_name_input=$("<label class='custom_label_css' id='pat_name_input'>"+patient_dict[patient_id_selected]['name']+"</label>")
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
                            var contact_type_input=$("<label class='custom_label_css' id='contact_numb_input'>"+patient_dict[patient_id_selected]['contact_no']+"</label>")
                        colmd1.append(contact_type_label);
                        colmd2.append(contact_type_input);
    
                    row__col_two__subrow_one.append(colmd1)
                    row__col_two__subrow_one.append(colmd2)
                col_two__subrow_one.append(row__col_two__subrow_one)
                var col_three__subrow_one=$("<div class='col-md-3'></div>");
                    var row__col_three__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-5'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var pres_id_label=$("<label class='custom_label_css'>Prescription No</label>");
                            var pres_id_input=$("<label class='custom_label_css' id='consult_pres_id'>"+pres_id+"</label>")
                        colmd1.append(pres_id_label);
                        colmd2.append(pres_id_input);
    
                    row__col_three__subrow_one.append(colmd1)
                    row__col_three__subrow_one.append(colmd2)
                col_three__subrow_one.append(row__col_three__subrow_one)
                var col_four__subrow_one=$("<div class='col-md-3'></div>");
                    var row__col_four__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-5'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var datevisited_label=$("<label class='custom_label_css'>Date Visited</label>");
                            var datevisited_input=$("<label class='custom_label_css' >"+consulatation_data['date_visited']+"</label>")
                        colmd1.append(datevisited_label);
                        colmd2.append(datevisited_input);
    
                    row__col_four__subrow_one.append(colmd1)
                    row__col_four__subrow_one.append(colmd2)
                col_four__subrow_one.append(row__col_four__subrow_one)

            subrow_one.append(col_one__subrow_one)
            subrow_one.append(col_two__subrow_one)
            subrow_one.append(col_three__subrow_one)
            subrow_one.append(col_four__subrow_one)



        
        
        
        main_subcol.append(subrow_one)


    row_div_two.append(main_subcol)
    var main_col_div=$("#main_col_div");
    main_col_div.append(row_div_two);
    updateConsultationSlipForm()
}
function updateConsultationSlipForm(){
    var main_col_div=$('#main_col_div')
    var row_div_five=$("<div class='' id='createConsultaionFormDiv'></div>");

        var main_col__row_five=$("<div class='col-md-12 genformdiv1'></div>");

            var row_one=$("<div class='row' style=' padding-bottom:10px;'></div>")

                var col_one__row_one=$("<div class='col-md-12'></div>");
                        row__col_one__row_one=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-2'></div>")
                            var colmd2=$("<div class='col-md-2'></div>")
                            
                                var doctor=$("<label class='custom_label_css'>Doctor</label>");
                                colmd1.append(doctor)

                                var doctor_name=$("<label class='custom_label_css'>"+consulatation_data['doc_name']+"</label>")
                                colmd2.append(doctor_name)

                        row__col_one__row_one.append(colmd1);
                        row__col_one__row_one.append(colmd2);

                    col_one__row_one.append(row__col_one__row_one);

            row_one.append(col_one__row_one)

            var row_two=$("<div class='row' style=' padding-bottom:10px;'></div>")

                var col_one__row_two=$("<div class='col-md-12'></div>");
                        row__col_one__row_two=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-2'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                            
                                var ss_label=$("<label  class='custom_label_css'>Medicines</label>");
                                colmd1.append(ss_label)

                                var ss_text=$("<textarea  class='form-control-custom'style='height:150px;'value='"+consulatation_data['medicine_details']+"' id='med_consult_textarea'>"+consulatation_data['medicine_details']+"</textarea>")
                                colmd2.append(ss_text)

                        row__col_one__row_two.append(colmd1);
                        row__col_one__row_two.append(colmd2);

                col_one__row_two.append(row__col_one__row_two);

            row_two.append(col_one__row_two)

            

            var row_nine=$("<div class='row' style='padding-bottom:10px;'></div>")

                var col_one__row_nine=$("<div class='col-md-12'></div>");
                        row__col_one__row_nine=$("<div class='row'></div>");
                            colmd1=$("<div class='col-md-3'></div>")
                                print_consult_button=$('<button class="save_btn fa fa-print" onclick="printUpdateConsultationSlip()">Print Slip</button>')
                                colmd1.append(print_consult_button)
                            colmd2=$("<div class='col-md-6'></div>")
                            colmd3=$("<div class='col-md-3'></div>")

                            GenPres_button=$('<button class="save_btn fa fa-save" onclick="updateConsultationData()" >Update</button>')
                            colmd2.append(GenPres_button)
                            
                        row__col_one__row_nine.append(colmd1);
                        row__col_one__row_nine.append(colmd2);
                        row__col_one__row_nine.append(colmd3);

                    col_one__row_nine.append(row__col_one__row_nine);

            row_nine.append(col_one__row_nine)

        main_col__row_five.append(row_one)
        main_col__row_five.append(row_two)
        main_col__row_five.append(row_nine)

    row_div_five.append(main_col__row_five)
 main_col_div.append(row_div_five)
}
function printUpdateConsultationSlip(){
    var rmc="RMC HOSPITAL";
    var patient_name=$("#pat_name_input").text();
    var phoneno=$("#contact_numb_input").text();
    var selecteddoctor=$("#selecteddoctor").val()
    $("#invoice-POS").empty();
    var invoice_pos=$("#invoice-POS");
    
        var center=$("<div id='top'></div>")

            var div_logo=$("<div class='logo'></div>");
                // var img_scr=$("<img style='width: 100px;' src='/static/rmcapp/mainhomepage_static/img/rmc.png'><br>")

            div_logo.append(logoImg);
            var div_info=$("<div class='info'></div>");
                var h2=$("<h2></h2>");
                h2.append(rmc);
            div_info.append(h2);
        center.append(div_logo);
        center.append(div_info);
        invoice_pos.append(center);   


        var mid_div=$("<div id='mid'></div>");
            var div_info=$("<div class='info'></div>");
                var p1=$("<p> Name   :  "+patient_name.toUpperCase()+" </br> Phone   :  "+phoneno+"</br></p>")
                var p=$("<p> Doctor : "+consulatation_data['doc_name']+"<p>")
            div_info.append(p);
            div_info.append(p1);

         
        mid_div.append(div_info);

   
        var bot_div=$("<div id='bot'></div>");
        var div_table=$("<div id='table'></div>");
            var table=$("<table>")
                var tr=$('<tr class="tabletitle"></tr>')
                    var td1=$('<td class="item"><p style="font-size:20px">Description</p></td>')
                    // var td2=$('<td class="item"><p style="font-size:20px"> (Timings) </p></td>')

                tr.append(td1);
                // tr.append(td2);

            table.append(tr);
        div_table.append(table);

                    
            
             

            var legalcopy=$("<div id='legalcopy'>");
                var p4=$('<p class="consult_text"><strong>'+$("#med_consult_textarea").val()+'</strong>  </p>')
                var p=$('<p class="legal"><strong>Thank you for visiting RMC!</strong>  </p>')
                var p1=$('<p class="legal"><strong>CONTACT NO : 0321-2312313</strong>  </p>')
                var p2=$('<p class="legal"><strong>Address  : Badami Bagh, Lahore</strong>  </p>')
            
            legalcopy.append(p4);
            legalcopy.append(p);
            legalcopy.append(p1);
            legalcopy.append(p2);
        bot_div.append(div_table);
        bot_div.append(legalcopy);


    invoice_pos.append(mid_div);    
    invoice_pos.append(bot_div);    
    

    $('#patient_dash_first_div').hide();
    var printcontent = $(invoice_pos).clone();
  
    window.print();
    $('#patient_dash_first_div').show();
    $('#invoice-POS').empty();
}
function  updateConsultationSlip(){
    $('#main_page_content').empty()
    var container_update_consultation= $('#main_page_content').append('<div class="container-fluid" id="container-update-consultation"></div>');
    $("#container-update-consultation").append("<h2 class ='center_h_tag_forms'>Update Consulation Slip</h2>");
    $("#container-update-consultation").append("<hr class='custom_hr'>");

    var main_row_div= $("<div class='row is-flex'></div>");

    $(container_update_consultation).append(main_row_div);
    var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");
       
    $(main_row_div).append(main_col_div);

        var row_div_one=$("<div class='row'></div>");
            // Patient Name
            var col_one__row_div_one=$("<div class='col-md-12'></div>");
            row__col_one__row_div_one=$("<div class='row'></div>");
                colmd1=$("<div class='col-md-2'></div>")
                colmd2=$("<div class='col-md-2'></div>")                
                colmd3=$("<div class='col-md-2'></div>")

                    pres_id_label=$("<label class='custom_label_css'>Prescription id</label>");
                colmd1.append(pres_id_label)
                    pres_id_input=$("<input class='form-control-custom' id='search_patient_id' class='custom_input_css'>")
                colmd2.append(pres_id_input);
                    var search_button=$('<button class="search_patient_btn fa fa-search" onclick="searchPatientInUpdateConsultationSlip()">Search</button>');
                colmd3.append(search_button);

            row__col_one__row_div_one.append(colmd1);
            row__col_one__row_div_one.append(colmd2);
            row__col_one__row_div_one.append(colmd3);

            col_one__row_div_one.append(row__col_one__row_div_one);
        row_div_one.append(col_one__row_div_one);
    $(main_col_div).append(row_div_one);
}
function updateConsultationData(){
    presid=$("#consult_pres_id").text();
    console.log("presid--",presid)
    medicine_details=$("#med_consult_textarea").val();
    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            "presid":presid,
            "medicine_details":medicine_details,
        },
        url: '/update_consulatation_records',
        success: function(data){
            if (data['message']==="RecordFound"){
                alert("Updated")
            }
        
        }
        });
      
}
function ViewConsultationSlips(){
    $('#main_page_content').empty()
    var container_view_consultation_slips= $('#main_page_content').append('<div class="container-fluid" id="container-view-consultation-slips"></div>');
    $("#container-view-consultation-slips").append("<h2 class ='center_h_tag_forms'>Consultation Slip Records List</h2>");
    $("#container-view-consultation-slips").append("<hr class='custom_hr'>");

    var main_row_div= $("<div class='row is-flex'></div>");

    $(container_view_consultation_slips).append(main_row_div);
    var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");
       
    $(main_row_div).append(main_col_div);

    var row_div_one=$("<div class='row' style='padding-right: 30px;'></div>");
        var consultationlist_table_div=$("<div id='consultationlist_table_div' style='width:-webkit-fill-available;'></div>");
            var consultationlist_table=$("<table id='consultationlist_table'  class='datatable_pat' width='100%' ></table>");
        consultationlist_table_div.append(consultationlist_table);
        row_div_one.append(consultationlist_table_div);
    $(main_col_div).append(row_div_one);
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
           
        },
        url: '/view_consultation_slip_records',
        
        success: function(data){
            consultation_list=data['consultation_list'];
            createDataTableViewConsultatoinList(consultation_list);
            $('.modal-loading').hide();

        }
    });
           
}
var view_consultation_datatable;
function createDataTableViewConsultatoinList(consultation_list){
  
    $(function(){
        view_consultation_datatable=$("#consultationlist_table").DataTable({
            data:consultation_list,
            columns: [
                { title: "No" },
                { title: "Patient Name" },
                { title: "Prescription No" },
                { title: 'Doctor' },
                { title: "Medicine Details" },
                { title: "Date Visited" },

                ],
                paging: true,
                pageLength:50,
                scrollY: 500,
                scrollX: true,
                ordering: true,
                info:false,
                searching:true,
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'print',
                        text: 'PRINT',
                        title: 'Prescription List',
                        className: 'datatable_button printbtn fas fa-print',

                    },
                     {
                        extend: 'excel',
                        text: ' EXCEL',
                        title: 'Prescription List',
                        className: 'datatable_button excelbtn fas fa-file-excel',

                    },
                     {
                        extend: 'csv',
                        text: ' CSV',
                        title: 'Prescription List',
                        className: 'datatable_button csvbtn fas fa-file',

                    },
                    {
                        extend: 'pdf',
                        text: ' PDF',
                        title: 'Prescription List',
                        className: 'datatable_button pdfbtn fas fa-file-pdf',

                    },
                   
                ],
    
            });
            $('.dataTables_filter  input[type="search"]').
            attr('placeholder','Search Records...').
            css({'width':'200px','display':'inline-block'});
            $('.dataTables_filter input').addClass('form-control-custom');
            $('#consultationlist_table tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                }
                else{
                    view_consultation_datatable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });
        });
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

