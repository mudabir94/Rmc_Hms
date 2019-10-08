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

                    rmc_tag=$("<p class='text-center font-weight-bold' style='font-size:2vw;' id='rmc_label'>RAFIQ MEDICAL CENTER</p>");
                    colmd1.append(rmc_tag)

                row__col_one__row_div_one.append(colmd1);
            col_one__row_div_one.append(row__col_one__row_div_one);

        $(row_div_one).append(col_one__row_div_one);

        var row_div_two=$("<div class='row mx-0'></div>");
            var col_one__row_div_two=$("<div class='col-md-12' style='padding-bottom: 15px;'></div>");
                row__col_one__row_div_two=$("<div class='row'></div>");

                    colmd1=$("<div class='col-md-1'></div>")
                    colmd2=$("<div class='col-md-2'></div>")
                    colmd3=$("<div class='col-md-1 offset-md-1'></div>")
                    colmd4=$("<div class='col-md-4'></div>")
                    colmd5=$("<div class='col-md-1'></div>")
                    colmd6=$("<div class='col-md-2'></div>")

                    pat_id_label=$("<label class='custom_label_css' style='font-weight: bold;'>ID</label>");
                    colmd1.append(pat_id_label)
                    pat_id=$("<input class='form-control' id='pat_id' style='background-color: white;' value='"+presData['id']+"' Disabled>")
                    colmd2.append(pat_id)
                    
                    pat_name_label=$("<label class='custom_label_css' style='font-weight: bold;'>Name</label>");
                    colmd3.append(pat_name_label)
                    pat_name=$("<input class='form-control' id='pat_name' style='background-color: white;' value='"+presData['name']+"' Disabled >")
                    colmd4.append(pat_name)

                    pat_sex_label=$("<label class='custom_label_css' id='token_id' style='font-weight: bold;' >Sex</label>");
                    colmd5.append(pat_sex_label)
                    pat_sex=$("<input class='form-control' id='token' style='background-color: white;' value='"+presData['gender']+"' Disabled >")
                    colmd6.append(pat_sex)
                    
                row__col_one__row_div_two.append(colmd1);
                row__col_one__row_div_two.append(colmd2);
                row__col_one__row_div_two.append(colmd3);
                row__col_one__row_div_two.append(colmd4);
                row__col_one__row_div_two.append(colmd5);
                row__col_one__row_div_two.append(colmd6);

            col_one__row_div_two.append(row__col_one__row_div_two);

        $(row_div_two).append(col_one__row_div_two);
        
        var row_div_three=$("<div class='row mx-0'></div>");
            var col_one__row_div_three=$("<div class='col-md-12' style='padding-bottom: 15px;'></div>");
                row__col_one__row_div_three=$("<div class='row'></div>");

                    colmd1=$("<div class='col-md-1'></div>")
                    colmd2=$("<div class='col-md-2'></div>")
                    colmd3=$("<div class='col-md-1 offset-md-1'></div>")
                    colmd4=$("<div class='col-md-4'></div>")
                    colmd5=$("<div class='col-md-1'></div>")
                    colmd6=$("<div class='col-md-2'></div>")

                    date_label=$("<label class='custom_label_css' style='font-weight: bold;'>Date</label>");
                    colmd1.append(date_label)
                    date_input=$("<input class='form-control' id='date_id' style='background-color: white;' value='"+today+"' disabled>")
                    colmd2.append(date_input)
                    
                    pat_address_label=$("<label class='custom_label_css' style='font-weight: bold;'>Address</label>");
                    colmd3.append(pat_address_label)
                    pat_address=$("<input class='form-control' id='pat_gender' style='background-color: white;' value='"+presData['address']+"' disabled>")
                    colmd4.append(pat_address)

                    pat_tele_label=$("<label class='custom_label_css' style='font-weight: bold;'>Telephone No</label>");
                    colmd5.append(pat_tele_label)
                    pat_telephone=$("<input class='form-control' id='pat_age' style='background-color: white;' value='"+presData['contact']+"' disabled>")
                    colmd6.append(pat_telephone)

                row__col_one__row_div_three.append(colmd1);
                row__col_one__row_div_three.append(colmd2);
                row__col_one__row_div_three.append(colmd3);
                row__col_one__row_div_three.append(colmd4);
                row__col_one__row_div_three.append(colmd5);
                row__col_one__row_div_three.append(colmd6);

            col_one__row_div_three.append(row__col_one__row_div_three);

        $(row_div_three).append(col_one__row_div_three);

        if(presData['pat_type']==="Outdoor"){

            var row_div_four=$("<div class='row mx-0'></div>");
                var col_one__row_div_four=$("<div class='col-md-12' style='padding-bottom: 15px;'></div>");
                    row__col_one__row_div_four=$("<div class='row'></div>");

                        colmd1=$("<div class='col-md-1 offset-md-4'></div>")
                        colmd2=$("<div class='col-md-4'></div>")
                        
                        Doctor_label=$("<label class='custom_label_css' style='font-weight: bold;'>Doctor</label>");
                        colmd1.append(Doctor_label)
                        Doctor_input=$("<input class='form-control' id='doct_id' style='background-color: white;' value='"+presData['doctor']+"' disabled>")
                        colmd2.append(Doctor_input)
                        
                    row__col_one__row_div_four.append(colmd1);
                    row__col_one__row_div_four.append(colmd2);

                col_one__row_div_four.append(row__col_one__row_div_four);

            $(row_div_four).append(col_one__row_div_four);
        }
        else if(presData['pat_type']==="Emergency"){

            var row_div_four=$("<div class='row mx-0'></div>");
                var col_one__row_div_four=$("<div class='col-md-12' style='padding-bottom: 15px;'></div>");
                    row__col_one__row_div_four=$("<div class='row'></div>");
                        colmd1=$("<div class='col-md-1 offset-md-4'></div>")
                        colmd2=$("<div class='col-md-4'></div>")
                        
                        Doctor_label=$("<label class='custom_label_css' style='font-weight: bold;'>Doctor</label>");
                        colmd1.append(Doctor_label)
                        Doctor_input=$("<input class='form-control' id='doct_id' style='background-color: white;' value='"+presData['doctor']+"' disabled>")
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
                    row__col_one__row_div_four=$("<div class='row mx-0'></div>");
                        colmd1=$("<div class='col-md-1'></div>")
                        colmd2=$("<div class='col-md-3'></div>")
                        colmd3=$("<div class='col-md-1'></div>")
                        colmd4=$("<div class='col-md-1'></div>")
                        
                        Doctor_label=$("<label class='custom_label_css' style='font-weight: bold;'>Consultant</label>");
                        colmd1.append(Doctor_label)
                        Doctor_input=$("<input class='form-control' id='doct_id' style='background-color: white;' value='"+presData['Consultant']+"' disabled>")
                        colmd2.append(Doctor_input)

                        roomNo_label=$("<label class='custom_label_css' style='font-weight: bold;'>Room Number</label>");
                        colmd3.append(roomNo_label)
                        Room_input=$("<input class='form-control' style='background-color: white;' value='"+presData['roomNo']+"' disabled>")
                        colmd4.append(Room_input)

                    row__col_one__row_div_four.append(colmd1);
                    row__col_one__row_div_four.append(colmd2);
                    row__col_one__row_div_four.append(colmd3);
                    row__col_one__row_div_four.append(colmd4);

                col_one__row_div_four.append(row__col_one__row_div_four);
            $(row_div_four).append(col_one__row_div_four);
        }
        else if(presData['ward_type']==="Ward"){

            var row_div_four=$("<div class='row mx-0'></div>");
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
                        Doctor_input=$("<input class='form-control' id='doct_id' style='background-color: white;' value='"+presData['Consultant']+"' disabled>")
                        colmd2.append(Doctor_input)

                        wardNo_label=$("<label class='custom_label_css' style='font-weight: bold;'>Ward Number</label>");
                        colmd3.append(wardNo_label)
                        wardNo_input=$("<input class='form-control' id='wardNo_input' style='background-color: white;' value='"+presData['ward']+"' disabled>")
                        colmd4.append(wardNo_input)
                        
                        bedNo_label=$("<label class='custom_label_css' style='font-weight: bold;'>Bed Number</label>");
                        colmd5.append(bedNo_label)
                        bedNo_input=$("<input class='form-control' id='bedNo_input' style='background-color: white;' value='"+presData['bed']+"' disabled>")
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
        var row_div_five=$("<div class='row mx-0'></div>");
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


        var row_div_six=$("<div class='row mx-0'></div>");
            var col_one__row_div_six=$("<div class='col-md-4 '></div>");
                var row__col_one__row_div_six=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-12 setHeight' style='background:#f7f7f7'></div>")

                    col_one_heading=$("<p class='text-center' style='font-weight: bold; padding-top:20px;text-decoration: underline;font-size: 20px;'>Provisonal Diagnosis</p>");
                    colmd1.append(col_one_heading)

                row__col_one__row_div_six.append(colmd1);

            col_one__row_div_six.append(row__col_one__row_div_six);
        $(row_div_six).append(col_one__row_div_six);

        var row_div_seven=$("<div class='row mx-0'></div>");
        var col_one__row_div_seven=$("<div class='col-md-4 '></div>");
            var row__col_one__row_div_seven=$("<div class='row'></div>");
                colmd1=$("<div class='col-md-12 setHeight' style='background:#f7f7f7'></div>")

                col_one_heading=$("<p class='text-center' style='font-weight: bold; padding-top:20px;text-decoration: underline;font-size: 20px;'>Investigation</p>");
                colmd1.append(col_one_heading)

            row__col_one__row_div_seven.append(colmd1);

        col_one__row_div_seven.append(row__col_one__row_div_seven);
    $(row_div_seven).append(col_one__row_div_seven);

    var row_div_eight=$("<div class='row mx-0'></div>");
    var col_one__row_div_eight=$("<div class='col-md-4 '></div>");
        var row__col_one__row_div_eight=$("<div class='row'></div>");
            colmd1=$("<div class='col-md-12 setHeight' style='background:#f7f7f7'></div>")

            col_one_heading=$("<p class='text-center' style='font-weight: bold; padding-top:20px;text-decoration: underline;font-size: 20px;'>Investigation</p>");
            colmd1.append(col_one_heading)

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




    window.print(patient_prescription_div);

}