var datatable_list=[]
var wardBill_dict={};
var roomBill_dict={};
var prescription_id;
var roomBill_list=[]
var wardBill_list=[]
var total_no_of_days;


$(document).ready(function() {
});
function createRoomWardBill(){
    $('#main_page_content').empty()
    var container_room_ward_bill_prescription= $('#main_page_content').append('<div class="container-fluid" id="container-room-ward-bill"></div>');
    $("#container-room-ward-bill").append("<h1 class ='center_h_tag_forms'>Room/Ward Bill</h1>");
    $("#container-room-ward-bill").append("<hr class='custom_hr'>");

    var main_row_div= $("<div class='row is-flex'></div>");
    $(container_room_ward_bill_prescription).append(main_row_div);
    var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");
    $(main_row_div).append(main_col_div);

        var row_div_one=$("<div class='row' id='row_div_one' style='padding-bottom: 30px'></div>");
            var col_one__row_div_one=$("<div class='col-md-12'></div>");
            row__col_one__row_div_one=$("<div class='row'></div>");
                colmd1=$("<div class='col-md-2 text-center'></div>")
                colmd2=$("<div class='col-md-2'></div>")
                colmd3=$("<div class='col-md-3'></div>")

                pres_id_label=$("<label for='pres_id_tag' class='custom_label_css'>Prescription id</label>");
                colmd1.append(pres_id_label)

                pres_id_input=$("<input id='search_pres_id' class='form-control custom_input_css'>")
                colmd2.append(pres_id_input);

                var search_button=$('<button class= "search_patientpres_btn fa fa-search" onclick="searchPatientInRoomWardBill()">  Search</button>');
                colmd3.append(search_button);

            row__col_one__row_div_one.append(colmd1);
            row__col_one__row_div_one.append(colmd2);
            row__col_one__row_div_one.append(colmd3);

            col_one__row_div_one.append(row__col_one__row_div_one);
        row_div_one.append(col_one__row_div_one);
    $(main_col_div).append(row_div_one);

}
function searchPatientInRoomWardBill(){
    var pres_id=$("#search_pres_id").val();
    if (pres_id===""){
        alert("Please Insert Valid Pres id")
        return
    }
    $(".div_for_print_page").remove();
    retrieveRoomWardBill(pres_id)
    // $("#row_div_two").remove()
    // $("#row_div_three").remove()

}
function retrieveRoomWardBill(pres_id){
    prescription_id=pres_id;
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
            "id":prescription_id,
        },
        url: '/retrieve_room_ward_bill',
        success: function(data){
            billstatus= data['billstatus']

            if (data['pres_id']===""){
                alert("Please Insert Valid Pres id");
                $('.modal-loading').hide();

                return
            }
            if (data['data']=='InValid'){
                alert("Input Not Valid")

                $('.modal-loading').hide();

                return;
            }
           
            roomBill_dict={}
            wardBill_dict={}
            roomBill_dict=JSON.parse(data["roomBill_dict"])
            wardBill_dict=JSON.parse(data["wardBill_dict"])

            console.log("roomBill_dict1111",roomBill_dict)
            console.log("wardBill_dict2222",wardBill_dict)
            console.log("Object.keys(roomBill_dict).length", Object.keys(roomBill_dict).length)
            
            var subrow_one=$("<div class='row div_for_print_page' style='padding-top: 5px;padding-bottom: 5px; '></div>")

                var col_one__subrow_one=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-6 offset-md-5'></div>")
                            var rmc_label=$("<label id='rmcHeading' class='custom_label_css' style='display:none;'><h2>Rafiq Medical Center<h2></label>");
                        colmd1.append(rmc_label)
                    row__col_one__subrow_one.append(colmd1);
                col_one__subrow_one.append(row__col_one__subrow_one);

            subrow_one.append(col_one__subrow_one)

            var subrow_two=$("<div class='row div_for_print_page' style='padding-top: 5px;padding-bottom: 5px; '></div>")

                var col_one__subrow_two=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_two=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-6 offset-md-1'></div>")
                            var patientBill_label=$("<label id='heading2' class='custom_label_css' style='display:none;'><h3>Patient Bill Details<h2></label>");
                        colmd1.append(patientBill_label)
                    row__col_one__subrow_two.append(colmd1);
                col_one__subrow_two.append(row__col_one__subrow_two);

            subrow_two.append(col_one__subrow_two)

            var main_col_div=$("#main_col_div");
            main_col_div.append(subrow_one);
            main_col_div.append(subrow_two);

            if(Object.keys(roomBill_dict).length !== 0){
                for (roombill in roomBill_dict){
                    templist=[]
                    console.log("roombill",roombill);
                    templist.push(roombill)
                    templist.push(roomBill_dict[roombill]['pat_name'])
                    templist.push(roomBill_dict[roombill]['floor'])
                    templist.push(roomBill_dict[roombill]['room_no'])
                    templist.push(roomBill_dict[roombill]['charge_per_day'])
                    templist.push(roomBill_dict[roombill]['ac_charge_per_day'])
                    templist.push(roomBill_dict[roombill]['checkin'])
                    templist.push(roomBill_dict[roombill]['id'])
                    roomBill_list.push(templist)
                   
                }
                console.log("roomBill_dict>>>>>>",roomBill_dict);
                console.log(roomBill_list);
               
                createBillDetailsRoomBill(billstatus);

            }
            else{
                for (wardbill in wardBill_dict){
                    templist=[]
                    console.log("wardbill",wardbill);
                    templist.push(wardbill)
                    templist.push(wardBill_dict[wardbill]['patient_name'])
                    templist.push(wardBill_dict[wardbill]['ward_no'])
                    templist.push(wardBill_dict[wardbill]['bed_no'])
                    templist.push(wardBill_dict[wardbill]['charge_per_day'])
                    templist.push(wardBill_dict[wardbill]['checkin'])
                    
                    templist.push(wardBill_dict[wardbill]['id'])
                    wardBill_list.push(templist)
                    
                }
                console.log("wardBill_dic>>>>>>>>",wardBill_dict);
                console.log(wardBill_list);
                createBillDetailsWardBill(billstatus);
            }
            var subrow_three=$("<div class='row div_for_print_page' style='padding-top: 5px;padding-bottom: 5px; '></div>")

                var col_one__subrow_three=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_three=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-6 offset-md-5'></div>")
                            var foot_label=$("<label id='foot_label' class='custom_label_css' style='display:none;'><h3>Thank You<h2></label>");
                        colmd1.append(foot_label)
                    row__col_one__subrow_three.append(colmd1);
                col_one__subrow_three.append(row__col_one__subrow_three);

            subrow_three.append(col_one__subrow_three)
            var hr= $("<hr class='custom_hr' style='color:red'>")
            $(subrow_three).append(hr);

            var subrow_four=$("<div class='row div_for_print_page' style='padding-top: 5px;padding-bottom: 5px; '></div>")

                var col_one__subrow_four=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_four=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-4'></div>")
                        var colmd3=$("<div class='col-md-4'></div>")

                            var detail1_label=$("<label id='detail1_label' class='custom_label_css' style='display:none;'>detail 1</label>");
                            var detail2_label=$("<label id='detail2_label' class='custom_label_css' style='display:none;'>detail 2</label>");
                            var detail3_label=$("<label id='detail3_label' class='custom_label_css' style='display:none;'>detail 3</label>");

                        colmd1.append(detail1_label)
                        colmd2.append(detail2_label)
                        colmd3.append(detail3_label)

                    row__col_one__subrow_four.append(colmd1);
                    row__col_one__subrow_four.append(colmd2);
                    row__col_one__subrow_four.append(colmd3);

                col_one__subrow_four.append(row__col_one__subrow_four);

            subrow_four.append(col_one__subrow_four)


        main_col_div.append(subrow_three);
        main_col_div.append(subrow_four);
        $('.modal-loading').hide();

        }
    }); 
}
function createBillDetailsRoomBill(billstatus){
    $("#row_div_two").remove()
    $("#row_div_three").remove()

        var row_div_two=$("<div class='row removerowmargins_div genformdiv1' id='row_div_two'></div>");
            var main_subcol=$("<div class='col-md-12'></div>");
                
                var subrow_one=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                    var col_one__subrow_one=$("<div class='col-md-5'></div>");
                        row__col_one__subrow_one=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-5'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var pat_name_label=$("<label for='pat_name_tag' class='custom_label_css'>Patient Name</label>");
                                var pat_name_input=$("<label id='pat_name_input' class='roomwardforminputlabels'>"+roomBill_dict['pat_name'].toUpperCase()+"</label>")
                            colmd1.append(pat_name_label)
                            colmd2.append(pat_name_input)
                        row__col_one__subrow_one.append(colmd1);
                        row__col_one__subrow_one.append(colmd2);
                    col_one__subrow_one.append(row__col_one__subrow_one);

                    var col_two__subrow_one=$("<div class='col-md-5'></div>");
                        var row__col_two__subrow_one=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-5'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var pres_label=$("<label class='custom_label_css'>Prescription ID</label>");
                                var pres_input=$("<label id='prescription_input' class='roomwardforminputlabels'>"+prescription_id+"</label>")
                            colmd1.append(pres_label);
                            colmd2.append(pres_input);
        
                        row__col_two__subrow_one.append(colmd1)
                        row__col_two__subrow_one.append(colmd2)
                    col_two__subrow_one.append(row__col_two__subrow_one)

                subrow_one.append(col_one__subrow_one)
                subrow_one.append(col_two__subrow_one)

                var subrow_two=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                    var col_one__subrow_two=$("<div class='col-md-5'></div>");
                        row__col_one__subrow_two=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-5'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var floor_label=$("<label for='floor_tag' class='custom_label_css'>Floor Number</label>");
                                var floor_input=$("<label id='floor_input' class='roomwardforminputlabels'>"+roomBill_dict['floor']+"</label>")
                            colmd1.append(floor_label)
                            colmd2.append(floor_input)
                        row__col_one__subrow_two.append(colmd1);
                        row__col_one__subrow_two.append(colmd2);
                    col_one__subrow_two.append(row__col_one__subrow_two);

                    var col_two__subrow_two=$("<div class='col-md-5'></div>");
                        var row__col_two__subrow_two=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-5'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var room_label=$("<label class='custom_label_css'>Room Number</label>");
                                var room_input=$("<label id='room_input' class='roomwardforminputlabels'>"+roomBill_dict['room_no']+"</label>")
                            colmd1.append(room_label);
                            colmd2.append(room_input);
        
                        row__col_two__subrow_two.append(colmd1)
                        row__col_two__subrow_two.append(colmd2)
                    col_two__subrow_two.append(row__col_two__subrow_two)

                subrow_two.append(col_one__subrow_two)
                subrow_two.append(col_two__subrow_two)

                var subrow_three=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                    var col_one__subrow_three=$("<div class='col-md-5'></div>");
                        row__col_one__subrow_three=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-5'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var charges_label=$("<label for='charges_tag' class='custom_label_css'>Room Charges/Day</label>");
                                var charges_input=$("<label id='charges_input' class='roomwardforminputlabels'>"+roomBill_dict['charge_per_day']+"</label>")
                            colmd1.append(charges_label)
                            colmd2.append(charges_input)
                        row__col_one__subrow_three.append(colmd1);
                        row__col_one__subrow_three.append(colmd2);
                    col_one__subrow_three.append(row__col_one__subrow_three);

                    var col_two__subrow_three=$("<div class='col-md-5'></div>");
                        var row__col_two__subrow_three=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-5'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var acCharge_label=$("<label class='custom_label_css'>AC Charges/Day</label>");
                                var acCharge_input=$("<label id='acCharge_input' class='roomwardforminputlabels'>"+roomBill_dict['ac_charge_per_day']+" </label>")
                            colmd1.append(acCharge_label);
                            colmd2.append(acCharge_input);
        
                        row__col_two__subrow_three.append(colmd1)
                        row__col_two__subrow_three.append(colmd2)
                    col_two__subrow_three.append(row__col_two__subrow_three)

                subrow_three.append(col_one__subrow_three)
                subrow_three.append(col_two__subrow_three)

                var subrow_four=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                    var col_one__subrow_four=$("<div class='col-md-5'></div>");
                        row__col_one__subrow_four=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-5'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var checkin_label=$("<label for='checkin_tag' class='custom_label_css'>Admission Date</label>");
                                var checkin_input=$("<label id='checkin_input' class='roomwardforminputlabels'> "+roomBill_dict['checkin']+"</label>")
                            colmd1.append(checkin_label)
                            colmd2.append(checkin_input)
                        row__col_one__subrow_four.append(colmd1);
                        row__col_one__subrow_four.append(colmd2);
                    col_one__subrow_four.append(row__col_one__subrow_four);
                    if (billstatus!=="done"){
                        var col_two__subrow_four=$("<div class='col-md-5'></div>");
                        var row__col_two__subrow_four=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-5'></div>")
                            var colmd2=$("<div class='col-md-5' ></div>")
                                var checkout_label=$("<label class='custom_label_css'>Discharge Date</label>");
                                var checkout_input=$("<input id='checkout_input'  autocomplete='off' style='background: transparent;border: none;border-bottom: 1px solid #000000;-webkit-box-shadow: none;box-shadow: none;border-radius: 0;'></input>")
                            colmd1.append(checkout_label);
                            colmd2.append(checkout_input);
        
                        row__col_two__subrow_four.append(colmd1)
                        row__col_two__subrow_four.append(colmd2)
                    col_two__subrow_four.append(row__col_two__subrow_four)
                    }
                    else{
                        var col_two__subrow_four=$("<div class='col-md-5'></div>");
                        var row__col_two__subrow_four=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-5'></div>")
                            var colmd2=$("<div class='col-md-5' ></div>")
                                var checkout_label=$("<label class='custom_label_css'>Discharge Date</label>");
                                var checkout_input=$("<input id='checkout_input' value='"+roomBill_dict['checkout']+"' autocomplete='off' style='background: transparent;border: none;border-bottom: 1px solid #000000;-webkit-box-shadow: none;box-shadow: none;border-radius: 0;' disable></input>")
                            colmd1.append(checkout_label);
                            colmd2.append(checkout_input);
        
                        row__col_two__subrow_four.append(colmd1)
                        row__col_two__subrow_four.append(colmd2)
                    col_two__subrow_four.append(row__col_two__subrow_four)
                    }
                    

                subrow_four.append(col_one__subrow_four)
                subrow_four.append(col_two__subrow_four)
                // subrow_four.append(col_three__subrow_four)
                main_subcol.append(subrow_one)
                main_subcol.append(subrow_two)
                main_subcol.append(subrow_three)
                main_subcol.append(subrow_four)
                    if (billstatus!=="done"){

                            var subrow_six=$("<div class='row ' id='subrow_six'></div>");
                                var colmd1=$("<div class='col-md-12'></div>")
                                    var Calculate_bttn=$('<button class="calbtn fa fa-calculator"  id="calc_bttn" onclick="calculateRoomBill()">  Calculate Room Bill</button>')
                                colmd1.append(Calculate_bttn)
                            subrow_six.append(colmd1);

                            var subrow_five=$("<div class='row' id='subrow_five'></div>");
                            var subrow_seven=$("<div class='row' id='subrow_seven'></div>");
                        main_subcol.append(subrow_six);
                        main_subcol.append(subrow_five)
                        main_subcol.append(subrow_seven)
                    }
                    else{
                        
                            $("#subrow_five").remove();
                            var subrow_five=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;' id='subrow_five'></div>");
            
                            var col_one__subrow_five=$("<div class='col-md-5'></div>");
                                row__col_one__subrow_five=$("<div class='row'></div>");
                                    var colmd1=$("<div class='col-md-5'></div>")
                                    var colmd2=$("<div class='col-md-6'></div>")
                                        var totaldays_label=$("<label for='total_tag' class='custom_label_css'>Days Stayed</label>")
                                        var totaldays_input=$("<label id='total_days' class='roomwardforminputlabels'>"+roomBill_dict['total_days']+"</label>")
                                    colmd1.append(totaldays_label)
                                    colmd2.append(totaldays_input)
                                row__col_one__subrow_five.append(colmd1);
                                row__col_one__subrow_five.append(colmd2);
                            col_one__subrow_five.append(row__col_one__subrow_five);
            
                            var col_two__subrow_five=$("<div class='col-md-5'></div>");
                                var row__col_two__subrow_five=$("<div class='row'></div>");
                                var colmd1=$("<div class='col-md-5'></div>")
                                var colmd2=$("<div class='col-md-6'></div>")
                                    var totalAmount_label=$("<label for='total_tag' class='custom_label_css'>Total Charges</label>")
                                    var totalAmount_input=$("<label id='net_total' class='roomwardforminputlabels'>"+roomBill_dict['net_total']+"</label>")
                                colmd1.append(totalAmount_label)
                                colmd2.append(totalAmount_input)
                
                                row__col_two__subrow_five.append(colmd1)
                                row__col_two__subrow_five.append(colmd2)
                            col_two__subrow_five.append(row__col_two__subrow_five)
            
                          
            
                            var col_four__subrow_five=$("<div class='col-md-2'></div>");
                                var row__col_four__subrow_five=$("<div class='row'></div>");
                                    var colmd1=$("<div class='col-md-12'></div>")
                                        var print_bttn=$('<button class="add_btn fa fa-print" id="print_btn" onclick="printRoomBill()">  Print Bill</button>')
                                    colmd1.append(print_bttn)
                                row__col_four__subrow_five.append(colmd1)
                            col_four__subrow_five.append(row__col_four__subrow_five)
            
                        subrow_five.append(col_one__subrow_five)
                        subrow_five.append(col_two__subrow_five)
                        subrow_five.append(col_four__subrow_five)
            
                        main_subcol.append(subrow_five)
                        }
            
                    
           
           

            row_div_two.append(main_subcol)
        var main_col_div=$("#main_col_div");
    main_col_div.append(row_div_two);

    // $( "#checkout_input" ).datepicker({
    //     changeMonth: true,
    //     changeYear: true,
    //     dateFormat: "yy-mm-dd",
    //     showButtonPanel:true,
    // });
    $('#checkout_input').datepicker({
        uiLibrary: 'bootstrap4',
        changeMonth: true,
        changeYear: true,
        format: "yyyy-mm-dd",
        icons: {
            rightIcon: false,
        }
    });
}
function createBillDetailsWardBill(billstatus){
    $("#row_div_two").remove()
    $("#row_div_three").remove()
        var row_div_two=$("<div class='row genformdiv1' id='row_div_two'></div>");
            var main_subcol=$("<div class='col-md-12'></div>");
                
                var subrow_one=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;' ></div>")

                    var col_one__subrow_one=$("<div class='col-md-5'></div>");
                        row__col_one__subrow_one=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-5'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var pat_name_label=$("<label for='pat_name_tag' class='custom_label_css'>Patient Name</label>");
                                var pat_name_input=$("<label id='pat_name_input' class='roomwardforminputlabels'>"+wardBill_dict['patient_name'].toUpperCase()+"</label>")
                            colmd1.append(pat_name_label)
                            colmd2.append(pat_name_input)
                        row__col_one__subrow_one.append(colmd1);
                        row__col_one__subrow_one.append(colmd2);
                    col_one__subrow_one.append(row__col_one__subrow_one);

                    var col_two__subrow_one=$("<div class='col-md-5'></div>");
                        var row__col_two__subrow_one=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-5'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var pres_label=$("<label class='custom_label_css'>Prescription ID</label>");
                                var pres_input=$("<label id='prescription_input' class='roomwardforminputlabels'>"+prescription_id+"</label>")
                            colmd1.append(pres_label);
                            colmd2.append(pres_input);
        
                        row__col_two__subrow_one.append(colmd1)
                        row__col_two__subrow_one.append(colmd2)
                    col_two__subrow_one.append(row__col_two__subrow_one)

                subrow_one.append(col_one__subrow_one)
                subrow_one.append(col_two__subrow_one)

                var subrow_two=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                    var col_one__subrow_two=$("<div class='col-md-5'></div>");
                        row__col_one__subrow_two=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-5'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var ward_label=$("<label for='floor_tag' class='custom_label_css'>Ward Number</label>");
                                var ward_input=$("<label id='ward_label' class='roomwardforminputlabels'>"+wardBill_dict['ward_no']+"</label>")
                            colmd1.append(ward_label)
                            colmd2.append(ward_input)
                        row__col_one__subrow_two.append(colmd1);
                        row__col_one__subrow_two.append(colmd2);
                    col_one__subrow_two.append(row__col_one__subrow_two);

                    var col_two__subrow_two=$("<div class='col-md-5'></div>");
                        var row__col_two__subrow_two=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-5'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var bed_label=$("<label class='custom_label_css'>Bed Number</label>");
                                var bed_input=$("<label id='bedno_label' class='roomwardforminputlabels'>"+wardBill_dict['bed_no']+"</label>")
                            colmd1.append(bed_label);
                            colmd2.append(bed_input);
                        row__col_two__subrow_two.append(colmd1)
                        row__col_two__subrow_two.append(colmd2)
                    col_two__subrow_two.append(row__col_two__subrow_two)

                subrow_two.append(col_one__subrow_two)
                subrow_two.append(col_two__subrow_two)

                var subrow_three=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                    var col_one__subrow_three=$("<div class='col-md-5'></div>");
                        row__col_one__subrow_three=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-5'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var charges_label=$("<label for='charges_tag' class='custom_label_css'>Bed Charges/Day</label>");
                                var charges_input=$("<label id='charges_input' class='roomwardforminputlabels'>"+wardBill_dict['charge_per_day']+"</label>")
                            colmd1.append(charges_label)
                            colmd2.append(charges_input)
                        row__col_one__subrow_three.append(colmd1);
                        row__col_one__subrow_three.append(colmd2);
                    col_one__subrow_three.append(row__col_one__subrow_three);

                subrow_three.append(col_one__subrow_three)

                var subrow_four=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                    var col_one__subrow_four=$("<div class='col-md-5'></div>");
                        row__col_one__subrow_four=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-5'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var checkin_label=$("<label for='checkin_tag' class='custom_label_css'>Admission Date</label>");
                                var checkin_input=$("<label id='checkin_input' class='roomwardforminputlabels'>"+wardBill_dict['checkin']+"</label>")
                            colmd1.append(checkin_label)
                            colmd2.append(checkin_input)
                        row__col_one__subrow_four.append(colmd1);
                        row__col_one__subrow_four.append(colmd2);
                    col_one__subrow_four.append(row__col_one__subrow_four);
                if (billstatus!=="done"){

                    var col_two__subrow_four=$("<div class='col-md-5'></div>");
                        var row__col_two__subrow_four=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-5'></div>")
                            var colmd2=$("<div class='col-md-4'></div>")
                                var checkout_label=$("<label class='custom_label_css'>Discharge Date</label>");
                                var checkout_input=$("<input id='checkout_input' style='background: transparent;border: none;border-bottom: 1px solid #000000;-webkit-box-shadow: none;box-shadow: none;border-radius: 0;'></input>")
                            colmd1.append(checkout_label);
                            colmd2.append(checkout_input);
        
                        row__col_two__subrow_four.append(colmd1)
                        row__col_two__subrow_four.append(colmd2)
                    col_two__subrow_four.append(row__col_two__subrow_four)
                }
                else{
                    var col_two__subrow_four=$("<div class='col-md-5'></div>");
                        var row__col_two__subrow_four=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-5'></div>")
                            var colmd2=$("<div class='col-md-4'></div>")
                                var checkout_label=$("<label class='custom_label_css'>Discharge Date</label>");
                                var checkout_input=$("<input id='checkout_input' value='"+wardBill_dict['checkout']+"' style='background: transparent;border: none;border-bottom: 1px solid #000000;-webkit-box-shadow: none;box-shadow: none;border-radius: 0;' disabled></input>")
                            colmd1.append(checkout_label);
                            colmd2.append(checkout_input);
        
                        row__col_two__subrow_four.append(colmd1)
                        row__col_two__subrow_four.append(colmd2)
                    col_two__subrow_four.append(row__col_two__subrow_four)
                }


            main_subcol.append(subrow_one)
            main_subcol.append(subrow_two)
            main_subcol.append(subrow_three)
            main_subcol.append(subrow_four)
            
                if (billstatus!=="done"){

                    var col_three__subrow_four=$("<div class='col-md-2'></div>");
                        var row__col_three__subrow_four=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-12'></div>")
                                var Calculate_bttn=$('<button class="calbtn fa fa-calculator" id="calc_bttn" onclick="calculateWardBill()">  Calculate Ward Bill</button>')
                            colmd1.append(Calculate_bttn)
                        row__col_three__subrow_four.append(colmd1)
                    col_three__subrow_four.append(row__col_three__subrow_four)

                subrow_four.append(col_one__subrow_four)
                subrow_four.append(col_two__subrow_four)
                subrow_four.append(col_three__subrow_four)

                var subrow_five=$("<div class='row' id='subrow_five'></div>");
                main_subcol.append(subrow_five)

            }
            else{
                subrow_four.append(col_one__subrow_four)
                subrow_four.append(col_two__subrow_four)
                $("#subrow_five").remove();
                var subrow_five=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;' id='subrow_five'></div>");

                var col_one__subrow_five=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_five=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-5'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var totaldays_label=$("<label for='total_tag' class='custom_label_css'>Days Stayed</label>")
                            var totaldays_input=$("<label id='total_days' class='roomwardforminputlabels'>"+wardBill_dict['total_days']+"</label>")
                        colmd1.append(totaldays_label)
                        colmd2.append(totaldays_input)
                    row__col_one__subrow_five.append(colmd1);
                    row__col_one__subrow_five.append(colmd2);
                col_one__subrow_five.append(row__col_one__subrow_five);

                var col_two__subrow_five=$("<div class='col-md-5'></div>");
                    var row__col_two__subrow_five=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-5'></div>")
                    var colmd2=$("<div class='col-md-6'></div>")
                        var totalAmount_label=$("<label for='total_tag' class='custom_label_css'>Total Charges</label>")
                        var totalAmount_input=$("<label id='net_total' class='roomwardforminputlabels'>"+wardBill_dict['net_total']+"</label>")
                    colmd1.append(totalAmount_label)
                    colmd2.append(totalAmount_input)
    
                    row__col_two__subrow_five.append(colmd1)
                    row__col_two__subrow_five.append(colmd2)
                col_two__subrow_five.append(row__col_two__subrow_five)

              

                var col_four__subrow_five=$("<div class='col-md-2'></div>");
                    var row__col_four__subrow_five=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-12'></div>")
                            var print_bttn=$('<button class="add_btn fa fa-print" id="print_btn" onclick="printWardBill()">  Print Bill</button>')
                        colmd1.append(print_bttn)
                    row__col_four__subrow_five.append(colmd1)
                col_four__subrow_five.append(row__col_four__subrow_five)

            subrow_five.append(col_one__subrow_five)
            subrow_five.append(col_two__subrow_five)
            subrow_five.append(col_four__subrow_five)

            main_subcol.append(subrow_five)
                // calculateWardBill()
            }


            row_div_two.append(main_subcol)
        var main_col_div=$("#main_col_div");
    main_col_div.append(row_div_two);

    // $( "#checkout_input" ).datepicker({
    //     changeMonth: true,
    //     changeYear: true,
    //     dateFormat: "yy-mm-dd",

    // });
    $('#checkout_input').datepicker({
        uiLibrary: 'bootstrap4',
        changeMonth: true,
        changeYear: true,
        format: "yyyy-mm-dd",
        icons: {
            rightIcon: false,
        }
    });
}
function calculateRoomBill(){
    $("#subrow_five").empty();
    var checkInDate = $("#checkin_input").text();
    var checkOutDate = $("#checkout_input").val();
    checkInDate= new Date(checkInDate);
    checkOutDate= new Date(checkOutDate);
    console.log("checkInDate",checkInDate)
    console.log("checkOutDate",checkOutDate)

    if( $("#checkout_input").val()==""){
        alert("Please Select Discharge Date first")
    }
    else if(checkInDate > checkOutDate){
        alert("Date cannot be less than the checkin Date")
    }
    else{
        var date1 = new Date(checkInDate); 
        var date2 = new Date(checkOutDate); 

        var roomPerDay= $("#charges_input").text()
        var acPerDay = $("#acCharge_input").text()
        // To calculate the no. of days between two dates 
        var Difference_In_Time = date2.getTime() - date1.getTime(); 
        var total_no_of_days = Math.round(Difference_In_Time / (1000 * 3600 * 24)); 
        var totalCharges= (total_no_of_days*roomPerDay)+(total_no_of_days*acPerDay);

        console.log("total_no_of_days", total_no_of_days)
        console.log("totalCharges", totalCharges)
        
        var main_subcol=$("<div class='col-md-12'></div>");
                var subrow_one=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                    var col_one__subrow_one=$("<div class='col-md-5'></div>");
                        row__col_one__subrow_one=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-5'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var totaldays_label=$("<label for='total_tag' class='custom_label_css'>Days Stayed</label>")
                                var totaldays_input=$("<label id='total_days' class='roomwardforminputlabels'>"+total_no_of_days+"</label>")
                            colmd1.append(totaldays_label)
                            colmd2.append(totaldays_input)
                        row__col_one__subrow_one.append(colmd1);
                        row__col_one__subrow_one.append(colmd2);
                    col_one__subrow_one.append(row__col_one__subrow_one);

                    var col_two__subrow_one=$("<div class='col-md-5'></div>");
                        var row__col_two__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-5'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var totalAmount_label=$("<label for='total_tag' class='custom_label_css'>Total Charges</label>")
                            var totalAmount_input=$("<label id='net_total' class='roomwardforminputlabels'>"+totalCharges+"</label>")
                        colmd1.append(totalAmount_label)
                        colmd2.append(totalAmount_input)
        
                        row__col_two__subrow_one.append(colmd1)
                        row__col_two__subrow_one.append(colmd2)
                    col_two__subrow_one.append(row__col_two__subrow_one)

                  


                subrow_one.append(col_one__subrow_one)
                subrow_one.append(col_two__subrow_one)



            main_subcol.append(subrow_one)

            
        var subrow_five=$("#subrow_five");
        subrow_five.append(main_subcol);
        var subrow_seven=$("#subrow_seven");
        var col_print=$("<div class='col-md-6'></div>"); 
            var print_bttn=$('<button class="add_btn fa fa-print" id="print_btn" onclick="printRoomBill()">  Print Bill</button>')
        col_print.append(print_bttn)
        var col_save=$("<div class='col-md-6'></div>");
                        
            var save_bttn=$('<button class="add_btn fa fa-save" id="save_btn" onclick="saveRoomBill()">  Save</button>')
        col_save.append(save_bttn)
                      
        subrow_seven.append(col_save)
        subrow_seven.append(col_print)

    }
}
function calculateWardBill(){
    $("#subrow_five").empty()
    var checkInDate = $("#checkin_input").text()
    var checkOutDate = $("#checkout_input").val()
    if($("#checkout_input").val()==""){
        alert("Please Select Discharge Date first")
    }
    else if(checkInDate>checkOutDate){
        alert("Date cannot be less than the checkin Date")
    }

    else{

        var date1 = new Date(checkInDate); 
        var date2 = new Date(checkOutDate); 
        console.log("date1", date1)
        console.log("date2", date2)


        var bedPerDay= $("#charges_input").text()
        // To calculate the no. of days between two dates 
        var Difference_In_Time = date2.getTime() - date1.getTime(); 
        var total_no_of_days = Math.round(Difference_In_Time / (1000 * 3600 * 24)); 

        var totalCharges= (total_no_of_days*bedPerDay);

        console.log("total_no_of_days", total_no_of_days)
        console.log("totalCharges", totalCharges)

            var main_subcol=$("<div class='col-md-12'></div>");
                var subrow_one=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                    var col_one__subrow_one=$("<div class='col-md-5'></div>");
                        row__col_one__subrow_one=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-5'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var totaldays_label=$("<label for='total_tag' class='custom_label_css'>Days Stayed</label>")
                                var totaldays_input=$("<label id='total_days' class='roomwardforminputlabels'>"+total_no_of_days+"</label>")
                            colmd1.append(totaldays_label)
                            colmd2.append(totaldays_input)
                        row__col_one__subrow_one.append(colmd1);
                        row__col_one__subrow_one.append(colmd2);
                    col_one__subrow_one.append(row__col_one__subrow_one);

                    var col_two__subrow_one=$("<div class='col-md-5'></div>");
                        var row__col_two__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-5'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var totalAmount_label=$("<label for='total_tag' class='custom_label_css'>Total Charges</label>")
                            var totalAmount_input=$("<label id='net_total' class='roomwardforminputlabels'>"+totalCharges+"</label>")
                        colmd1.append(totalAmount_label)
                        colmd2.append(totalAmount_input)
        
                        row__col_two__subrow_one.append(colmd1)
                        row__col_two__subrow_one.append(colmd2)
                    col_two__subrow_one.append(row__col_two__subrow_one)

                    var col_three__subrow_one=$("<div class='col-md-1'></div>");
                        var row__col_three__subrow_one=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-12'></div>")
                                var save_bttn=$('<button class="add_btn fa fa-save" id="save_btn" onclick="saveWardBill()">  Save</button>')
                            colmd1.append(save_bttn)
                        row__col_three__subrow_one.append(colmd1)
                    col_three__subrow_one.append(row__col_three__subrow_one)

                    var col_four__subrow_one=$("<div class='col-md-1'></div>");
                        var row__col_four__subrow_one=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-12'></div>")
                                var print_bttn=$('<button class="add_btn fa fa-print" id="print_btn" onclick="printWardBill()">  Print Bill</button>')
                            colmd1.append(print_bttn)
                        row__col_four__subrow_one.append(colmd1)
                    col_four__subrow_one.append(row__col_four__subrow_one)

                subrow_one.append(col_one__subrow_one)
                subrow_one.append(col_two__subrow_one)
                subrow_one.append(col_three__subrow_one)
                subrow_one.append(col_four__subrow_one)

            main_subcol.append(subrow_one)
            
        var subrow_five=$("#subrow_five");
        subrow_five.append(main_subcol);
    }
}
function saveRoomBill(){
    
    var pres_id=$("#prescription_input").text();
    console.log("pres_id", pres_id);

    var checkout=$("#checkout_input").val();

    var net_total=$("#net_total").text();
    console.log("net_total", net_total);

    var total_no_of_days=$("#total_days").text();
    console.log("total_no_of_days", total_no_of_days);
    $('.modal-loading').show();

    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            "pres":JSON.stringify(pres_id),
            "checkout":JSON.stringify(checkout),
            "net_total":JSON.stringify(net_total),
            "total_no_of_days":JSON.stringify(total_no_of_days),

        },
        url: '/save_room_bill',
        success: function(data){
            room_bill_status=data['room_bill_status']
            if (room_bill_status==="Room Bill Already Created"){
                alert("Bill Has Already Been Generated, New Changes Are Not Saved")
                $('.modal-loading').hide();

                return;
            }
            alert('Saved')
            $('.modal-loading').hide();
            $("#row_div_two").remove();

        },
    });
}
function saveWardBill(){

    var pres_id=$("#prescription_input").text();
    console.log("pres_id", pres_id);

    var checkout=$("#checkout_input").val();
    $("#checkout_input").val(checkout)

    var net_total=$("#net_total").text();
    console.log("net_total", net_total);

    var total_no_of_days=$("#total_days").text();
    console.log("total_days11111", total_no_of_days);
    
    var ward_no=$("#ward_label").text();
    var bed_no=$("#bedno_label").text();
    $('.modal-loading').show();

    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            "pres":JSON.stringify(pres_id),
            "checkout":JSON.stringify(checkout),
            "net_total":JSON.stringify(net_total),
            "total_no_of_days":JSON.stringify(total_no_of_days),
            "ward_no":JSON.stringify(ward_no),
            "bed_no":JSON.stringify(bed_no),

            
        },
        url: '/save_ward_bill',
        success: function(data){
            console.log(data['Success']);
            alert("Saved")
            $('.modal-loading').hide();
            $("#row_div_two").remove();

        },
    });
}
function printRoomBill(){

    

    var printcontent = $("#main_col_div").clone();
    $('#container-room-ward-bill').hide();
    $('#row_div_one').hide();
    $('#sidebar').hide();
    $('#calc_bttn').hide();
    $('#print_btn').hide();
    $('#save_btn').hide();
    $('#detail1_label').show();
    $('#detail2_label').show();
    $('#detail3_label').show();



    $('#dialog-confirm').hide();
    $('#rmcHeading').show();
    $('#heading2').show();
    $('#foot_label').show();

    $('#roomWard_bill_div').empty().html(printcontent);
    
    window.print();
    window.close();

    $('#rmcHeading').hide();
    $('#heading2').hide();
    $('#foot_label').hide();
    $('#detail1_label').hide();
    $('#detail2_label').hide();
    $('#detail3_label').hide();

    $('#roomWard_bill_div').empty();
    $('#container-room-ward-bill').show();
    $('#row_div_one').show();
    $('#sidebar').show();
    $('#calc_bttn').show();
    $('#print_btn').show();
    $('#save_btn').show();
    
    // saveRoomBill();

    // var pres_id=$("#prescription_input").text();
    // console.log("pres_id", pres_id);

    // var checkout=$("#checkout_input").val();
    // $("#checkout_input").val("")

    // var net_total=$("#net_total").text();
    // console.log("net_total", net_total);

    // var total_no_of_days=$('#total_days').text();

    // $.ajax({
    //     type: 'POST',
    //     dataType: "json",
    //     'data': {
    //         "pres":JSON.stringify(pres_id),
    //         "checkout":JSON.stringify(checkout),
    //         "net_total":JSON.stringify(net_total),
    //         "total_no_of_days":JSON.stringify(total_no_of_days),

    //     },
    //     url: '/print_room_bill',
    //     success: function(data){
    //         console.log(data['Success']);
    //         $("#subrow_five").remove()

    //     },
    // });
}
function printWardBill(){

    var printcontent = $("#main_col_div").clone();
    $('#container-room-ward-bill').hide();
    $('#row_div_one').hide();
    $('#sidebar').hide();
    $('#calc_bttn').hide();
    $('#print_btn').hide();
    $('#save_btn').hide();
    $('#detail1_label').show();
    $('#detail2_label').show();
    $('#detail3_label').show();



    $('#dialog-confirm').hide();
    $('#rmcHeading').show();
    $('#heading2').show();
    $('#foot_label').show();

    $('#roomWard_bill_div').empty().html(printcontent);
    
    window.print();
    window.close();

    $('#rmcHeading').hide();
    $('#heading2').hide();
    $('#foot_label').hide();
    $('#detail1_label').hide();
    $('#detail2_label').hide();
    $('#detail3_label').hide();

    $('#roomWard_bill_div').empty();
    $('#container-room-ward-bill').show();
    $('#row_div_one').show();
    $('#sidebar').show();
    $('#calc_bttn').show();
    $('#print_btn').show();
    $('#save_btn').show();
    // saveWardBill();
    // var pres_id=$("#prescription_input").text();
    // console.log("pres_id", pres_id);

    // var checkout=$("#checkout_input").val();
    // $("#checkout_input").val(checkout)

    // var net_total=$("#net_total").text();
    // console.log("net_total", net_total);

    // var total_no_of_days=$('#total_days').text();


    
    // $.ajax({
    //     type: 'POST',
    //     dataType: "json",
    //     'data': {
    //         "pres":JSON.stringify(pres_id),
    //         "checkout":JSON.stringify(checkout),
    //         "net_total":JSON.stringify(net_total),
    //         "total_no_of_days":JSON.stringify(total_no_of_days),

    //     },
    //     url: '/print_ward_bill',
    //     success: function(data){
    //         console.log(data['Success']);
    //     },
    // });
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