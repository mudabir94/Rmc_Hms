

var patient_prescription_div;

// var presData={'id': '2', 'name': 'Ali', 'token': '3', 'age': '33', 'gender': 'Male',
//  'discount': '100', 'discount_percent': '50', 'discount_reason': 'poor', 'doctor': 'd1', 
//  'pat_type': 'Outdoor'}
var presData={}
var today = new Date();
var dd = today.getDate();

var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd;
} 

if(mm<10) 
{
    mm='0'+mm;
} 
today = mm+'-'+dd+'-'+yyyy;
console.log(today);
$(document).ready(function() {
    $.ajax({
        type: 'GET',
        dataType: "json",
       
        url: '/print_patient_prescription',
        success: function(data){
            console.log("presData----",JSON.parse(data['presData']));
            presData= JSON.parse(data['presData'])
            console.log("iddd", presData['pres_id'])
            loadPresForm();

        },
    });

});
function loadPresForm(){
    patient_prescription_div=$("#patient_prescription_div").append('<div class="container-fluid" id="container-print-patient-prescription"></div>');
    var main_row_div= $("<div class='row is-flex'></div>");
    $(patient_prescription_div).append(main_row_div);
    var main_col_div=$("<div class='col-md-12' id=''></div>");
       
    $(main_row_div).append(main_col_div);

        var row_div_one=$("<div class='row'></div>");
            var col_one__row_div_one=$("<div class='col-md-12'></div>");
                row__col_one__row_div_one=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-1'></div>")
                    colmd2=$("<div class='col-md-6 offset-md-2'></div>")

                    button=$("<button class= 'btttn' onclick='PrintPres()'> Print </button>");
                    colmd1.append(button);

                    rmc_tag=$("<p class='text-center font-weight-bold' style='font-size:2vw;' id='rmc_label'>RAFIQ MEDICAL CENTER</p>");
                    colmd2.append(rmc_tag)

                row__col_one__row_div_one.append(colmd1);
                row__col_one__row_div_one.append(colmd2);

            col_one__row_div_one.append(row__col_one__row_div_one);

        $(row_div_one).append(col_one__row_div_one);

        var row_div_two=$("<div class='row  '></div>");
            var col_one__row_div_two=$("<div class='col-md-12' style='padding-bottom: 15px;'></div>");
                row__col_one__row_div_two=$("<div class='row'></div>");

                    colmd1=$("<div class='col-md-1'></div>")
                    colmd2=$("<div class='col-md-2'></div>")
                    colmd3=$("<div class='col-md-2 offset-md-2 '></div>")
                    colmd4=$("<div class='col-md-1'></div>")
                    colmd5=$("<div class='col-md-2 '></div>")
                    colmd6=$("<div class='col-md-1'></div>")                
                    
                    var pat_name_label=$("<label class='form-control-static float-right' style='font-weight: bold;'>Name</label>");
                    colmd1.append(pat_name_label)
                    var pat_name=$("<label id='pat_name' class='form-control-static'>"+presData['name']+"</label>")                    
                    colmd2.append(pat_name)

                    var pat_id_label=$("<label class='form-control-static float-right' style='font-weight: bold;'>Patient ID</label>");
                    colmd3.append(pat_id_label)
                    var pat_id=$("<label id='pat_id' class='form-control-static'>"+presData['pat_id']+"</label>")                    
                    colmd4.append(pat_id)

                    var pres_id_label=$("<label class='form-control-static float-right' style='font-weight: bold;'>Prescription Id</label>");
                    colmd5.append(pres_id_label);
                    var pres_id_input=$("<label id='pres_id' class='form-control-static'>"+presData['pres_id']+"</label>")
                    colmd6.append(pres_id_input);

                row__col_one__row_div_two.append(colmd1);
                row__col_one__row_div_two.append(colmd2);
                row__col_one__row_div_two.append(colmd3);
                row__col_one__row_div_two.append(colmd4);
                row__col_one__row_div_two.append(colmd5);
                row__col_one__row_div_two.append(colmd6);

            col_one__row_div_two.append(row__col_one__row_div_two);

        $(row_div_two).append(col_one__row_div_two);
        
        var row_div_three=$("<div class='row  '></div>");
            var col_one__row_div_three=$("<div class='col-md-12' style='padding-bottom: 15px;'></div>");
                row__col_one__row_div_three=$("<div class='row'></div>");

                    colmd1=$("<div class='col-md-1'></div>")
                    colmd2=$("<div class='col-md-1'></div>")
                    colmd3=$("<div class='col-md-2'></div>")
                    colmd4=$("<div class='col-md-1'></div>")
                    colmd5=$("<div class='col-md-2'></div>")
                    colmd6=$("<div class='col-md-2'></div>")
                    colmd7=$("<div class='col-md-1'></div>")
                    colmd8=$("<div class='col-md-2'></div>")                   
                    
                    var pat_sex_label=$("<label class='form-control-static float-right' id='token_id' style='font-weight: bold;' >Sex</label>");
                    colmd1.append(pat_sex_label)
                    var pat_sex=$("<label id='pat_sex' class='form-control-static'>"+presData['gender']+"</label>")                    
                    colmd2.append(pat_sex)

                    pat_bg_label=$("<label class='form-control-static float-right' style='font-weight: bold;'>Blood Group</label>");
                    colmd3.append(pat_bg_label)
                    var pat_bg=$("<label id='pat_bg' class='form-control-static'>"+presData['bloodgroup']+"</label>")                    
                    colmd4.append(pat_bg)

                    pat_tele_label=$("<label class='form-control-static float-right' style='font-weight: bold;'>Telephone No</label>");
                    colmd5.append(pat_tele_label)
                    var pat_telephone=$("<label id='pat_telephone' class='form-control-static'>"+presData['contact_no']+"</label>")                    
                    colmd6.append(pat_telephone)

                    date_label=$("<label class='form-control-static float-right' style='font-weight: bold;'>Date</label>");
                    colmd7.append(date_label)
                    var date_input=$("<label id='date_id' class='form-control-static'>"+today+"</label>")                    
                    colmd8.append(date_input)

                row__col_one__row_div_three.append(colmd1);
                row__col_one__row_div_three.append(colmd2);
                row__col_one__row_div_three.append(colmd3);
                row__col_one__row_div_three.append(colmd4);
                row__col_one__row_div_three.append(colmd5);
                row__col_one__row_div_three.append(colmd6);
                row__col_one__row_div_three.append(colmd7);
                row__col_one__row_div_three.append(colmd8);

            col_one__row_div_three.append(row__col_one__row_div_three);

        $(row_div_three).append(col_one__row_div_three);

        if(presData['pat_type']==="Outdoor"){

            var row_div_four=$("<div class='row  '></div>");
                var col_one__row_div_four=$("<div class='col-md-12' style='padding-bottom: 15px;'></div>");
                    row__col_one__row_div_four=$("<div class='row'></div>");

                        colmd1=$("<div class='col-md-1'></div>")
                        colmd2=$("<div class='col-md-2'></div>")
                        
                        Doctor_label=$("<label class='form-control-static float-right' style='font-weight: bold;'>Doctor</label>");
                        colmd1.append(Doctor_label)
                        var Doctor_input=$("<label id='doct_id' class='form-control-static'>"+presData['doctor_name']+"</label>")                    
                        colmd2.append(Doctor_input)
                        
                    row__col_one__row_div_four.append(colmd1);
                    row__col_one__row_div_four.append(colmd2);

                col_one__row_div_four.append(row__col_one__row_div_four);

            $(row_div_four).append(col_one__row_div_four);
        }
        else if(presData['pat_type']==="Emergency"){

            var row_div_four=$("<div class='row  '></div>");
                var col_one__row_div_four=$("<div class='col-md-12' style='padding-bottom: 15px;'></div>");
                    row__col_one__row_div_four=$("<div class='row'></div>");
                        colmd1=$("<div class='col-md-1'></div>")
                        colmd2=$("<div class='col-md-2'></div>")
                        
                        Doctor_label=$("<label class='form-control-static float-right' style='font-weight: bold;'>Doctor</label>");
                        colmd1.append(Doctor_label)
                        var Doctor_input=$("<label id='doct_id' class='form-control-static'>"+presData['doctor_name']+"</label>")                    
                        colmd2.append(Doctor_input)
                        
                    row__col_one__row_div_four.append(colmd1);
                    row__col_one__row_div_four.append(colmd2);

                col_one__row_div_four.append(row__col_one__row_div_four);
            $(row_div_four).append(col_one__row_div_four);

        }
        else if(presData['pat_type']==="Indoor"){

            if(presData['bed_type']==="Room"){

            var row_div_four=$("<div class='row'></div>");
                var col_one__row_div_four=$("<div class='col-md-12' style='padding-bottom: 15px;'></div>");
                    row__col_one__row_div_four=$("<div class='row  '></div>");
                        colmd1=$("<div class='col-md-1'></div>")
                        colmd2=$("<div class='col-md-2'></div>")
                        colmd3=$("<div class='col-md-1'></div>")
                        colmd4=$("<div class='col-md-2'></div>")
                        colmd5=$("<div class='col-md-2'></div>")
                        colmd6=$("<div class='col-md-1'></div>")
                        
                        doctor_label=$("<label class='form-control-static float-right' style='font-weight: bold;'>Doctor</label>");
                        colmd1.append(doctor_label)
                        var doct_input=$("<label id='doct_id' class='form-control-static'>"+presData['doctor_name']+"</label>")
                        colmd2.append(doct_input)

                        consultant_label=$("<label class='form-control-static float-right' style='font-weight: bold;'>Consultant</label>");
                        colmd3.append(consultant_label)
                        var consultant_input=$("<label id='cons_id' class='form-control-static'>"+presData['consultant_name']+"</label>")
                        colmd4.append(consultant_input)

                        roomNo_label=$("<label class='form-control-static float-right' style='font-weight: bold;'>Room No.</label>");
                        colmd5.append(roomNo_label)
                        var Room_input=$("<label id='Room_id' class='form-control-static'>"+presData['roomNo']+"</label>")
                        colmd6.append(Room_input)

                    row__col_one__row_div_four.append(colmd1);
                    row__col_one__row_div_four.append(colmd2);
                    row__col_one__row_div_four.append(colmd3);
                    row__col_one__row_div_four.append(colmd4);
                    row__col_one__row_div_four.append(colmd5);
                    row__col_one__row_div_four.append(colmd6);

                col_one__row_div_four.append(row__col_one__row_div_four);
            $(row_div_four).append(col_one__row_div_four);
        }
        else if(presData['bed_type']==="Ward"){

            var row_div_four=$("<div class='row  '></div>");
                var col_one__row_div_four=$("<div class='col-md-12' style='padding-bottom: 15px;'></div>");
                    row__col_one__row_div_four=$("<div class='row'></div>");

                        colmd1=$("<div class='col-md-1'></div>")
                        colmd2=$("<div class='col-md-2'></div>")
                        colmd3=$("<div class='col-md-1'></div>")
                        colmd4=$("<div class='col-md-2'></div>")
                        colmd5=$("<div class='col-md-2'></div>")
                        colmd6=$("<div class='col-md-1'></div>")
                        colmd7=$("<div class='col-md-2'></div>")
                        colmd8=$("<div class='col-md-1'></div>")

                        doctor_label=$("<label class='form-control-static float-right' style='font-weight: bold;'>Doctor</label>");
                        colmd1.append(doctor_label)
                        var doct_input=$("<label id='doct_id' class='form-control-static'>"+presData['doctor_name']+"</label>")
                        colmd2.append(doct_input)

                        consultant_label=$("<label class='form-control-static float-right' style='font-weight: bold;'>Consultant</label>");
                        colmd3.append(consultant_label)
                        var consultant_input=$("<label id='cons_id' class='form-control-static'>"+presData['consultant_name']+"</label>")
                        colmd4.append(consultant_input)

                        wardNo_label=$("<label class='form-control-static' style='font-weight: bold;'>Ward Number</label>");
                        colmd5.append(wardNo_label)
                        var wardNo_input=$("<label id='wardNo_input' class='form-control-static'>"+presData['ward']+"</label>")
                        colmd6.append(wardNo_input)
                        
                        bedNo_label=$("<label class='form-control-static' style='font-weight: bold;'>Bed Number</label>");
                        colmd7.append(bedNo_label)
                        var bedNo_input=$("<label id='bedNo_input' class='form-control-static'>"+presData['bed']+"</label>")
                        colmd8.append(bedNo_input)
                                                        
                    row__col_one__row_div_four.append(colmd1);
                    row__col_one__row_div_four.append(colmd2);
                    row__col_one__row_div_four.append(colmd3);
                    row__col_one__row_div_four.append(colmd4);
                    row__col_one__row_div_four.append(colmd5);
                    row__col_one__row_div_four.append(colmd6);
                    row__col_one__row_div_four.append(colmd7);
                    row__col_one__row_div_four.append(colmd8);

                col_one__row_div_four.append(row__col_one__row_div_four);
            $(row_div_four).append(col_one__row_div_four);
        }
    }
        // 3 columns
        var row_div_five=$("<div class='row  '></div>");
            var col_one__row_div_five=$("<div class='col-md-12 '></div>");
                var row__col_one__row_div_five=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-4 setHeight' style='background:#f7f7f7;border-color: black;border-top-style: solid;border-width: thin;'></div>")
                    colmd2=$("<div class='col-md-5' style= 'border-color: black;border-top-style: solid;border-width: thin;'></div>")
                    colmd3=$("<div class='col-md-3' style= 'border-color: black;border-top-style: solid;border-width: thin;'></div>")


                    col_one_heading=$("<p class='text-center' style='font-weight: bold; padding-top:20px;text-decoration: underline;font-size: 20px; '>SIGNS/SYMPTOMS</p>");
                    colmd1.append(col_one_heading)

                    col_two_heading=$("<p class='offset-md-2' style='margin-top:25px;'><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsybPkmCpEkmWbC3xAXE5EzJuEB9spMJVbjge0jn5X4yh2jPUK' alt='RX' width='38' height='38' style='text-decoration:underline';></p>");
                    colmd2.append(col_two_heading)

                    col_three_heading=$("<p class='text-center' style='font-weight: bold; padding-top:20px;text-decoration: underline;font-size: 20px;'>VITALS</p>");
                    colmd3.append(col_three_heading)

                row__col_one__row_div_five.append(colmd1);
                row__col_one__row_div_five.append(colmd2);
                row__col_one__row_div_five.append(colmd3);


            col_one__row_div_five.append(row__col_one__row_div_five);
        $(row_div_five).append(col_one__row_div_five);

        var row_div_six=$("<div class='row  '></div>");
            var col_one__row_div_six=$("<div class='col-md-4 '></div>");
                var row__col_one__row_div_six=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-12 setHeight' style='background:#f7f7f7'></div>")

                    pd_heading=$("<p class='text-center' style='font-weight: bold; padding-top:20px;text-decoration: underline;font-size: 20px;'>Provisonal Diagnosis</p>");
                    colmd1.append(pd_heading)

                row__col_one__row_div_six.append(colmd1);

            col_one__row_div_six.append(row__col_one__row_div_six);
        $(row_div_six).append(col_one__row_div_six);

        var row_div_seven=$("<div class='row  '></div>");
        var col_one__row_div_seven=$("<div class='col-md-4 '></div>");
            var row__col_one__row_div_seven=$("<div class='row'></div>");
                colmd1=$("<div class='col-md-12 setHeight' style='background:#f7f7f7'></div>")

                invest_heading=$("<p class='text-center' style='font-weight: bold; padding-top:20px;text-decoration: underline;font-size: 20px;'>Investigation</p>");
                colmd1.append(invest_heading)

            row__col_one__row_div_seven.append(colmd1);

        col_one__row_div_seven.append(row__col_one__row_div_seven);
    $(row_div_seven).append(col_one__row_div_seven);

    var row_div_eight=$("<div class='row  '></div>");
    var col_one__row_div_eight=$("<div class='col-md-4 '></div>");
        var row__col_one__row_div_eight=$("<div class='row'></div>");
            colmd1=$("<div class='col-md-12 setHeight' style='background:#f7f7f7'></div>")

            daig_heading=$("<p class='text-center' style='font-weight: bold; padding-top:20px;text-decoration: underline;font-size: 20px;'>Diagnosis</p>");
            colmd1.append(daig_heading)

        row__col_one__row_div_eight.append(colmd1);

    col_one__row_div_eight.append(row__col_one__row_div_eight);
$(row_div_eight).append(col_one__row_div_eight);


    $(main_col_div).append(row_div_one);
    $(main_col_div).append(row_div_two);
    $(main_col_div).append(row_div_three);
    $(main_col_div).append(row_div_four);
    $(main_col_div).append(row_div_five);
    $(main_col_div).append(row_div_six);
    $(main_col_div).append(row_div_seven);
    $(main_col_div).append(row_div_eight);

}
function PrintPres(){
    // $("#patient_prescription_div").print();
    var restorepage = $('body').html();
    var printcontent = $(patient_prescription_div).clone();
    console.log("printcontent",printcontent)
    $('body').empty().html(printcontent);
    window.print();
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