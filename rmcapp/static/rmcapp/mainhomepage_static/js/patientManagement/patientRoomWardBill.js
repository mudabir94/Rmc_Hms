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
    $("#container-room-ward-bill").append("<h1 class ='text-center'>Room/Ward Bill</h1>");
    $("#container-ward-bill").append("<hr class='custom_hr'>");

    var main_row_div= $("<div class='row is-flex'></div>");
    $(container_room_ward_bill_prescription).append(main_row_div);
    var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");
    $(main_row_div).append(main_col_div);

        var row_div_one=$("<div class='row' id='row_div_one' style='padding-bottom: 30px'></div>");
            var col_one__row_div_one=$("<div class='col-md-8'></div>");
            row__col_one__row_div_one=$("<div class='row'></div>");
                colmd1=$("<div class='col-md-3 text-center'></div>")
                colmd2=$("<div class='col-md-3'></div>")
                colmd3=$("<div class='col-md-2'></div>")

                pres_id_label=$("<label for='pres_id_tag' class='custom_label_css'>Prescription id</label>");
                colmd1.append(pres_id_label)

                pres_id_input=$("<input id='search_pres_id' class='form-control custom_input_css'>")
                colmd2.append(pres_id_input);

                var search_button=$('<button class= "btn btn-light" type= "Button" onclick="searchPatientInRoomWardBill()" style="font-size: large; font-weight:600">Search</button>');
                colmd3.append(search_button);

            row__col_one__row_div_one.append(colmd1);
            row__col_one__row_div_one.append(colmd2);
            row__col_one__row_div_one.append(colmd3);

            col_one__row_div_one.append(row__col_one__row_div_one);
        row_div_one.append(col_one__row_div_one);
    $(main_col_div).append(row_div_one);

}
function searchPatientInRoomWardBill(){
    var pres_id=$("#search_pres_id").val()
  
    retrieveRoomWardBill(pres_id)
    // $("#row_div_two").remove()
    // $("#row_div_three").remove()

}
function retrieveRoomWardBill(pres_id){
    prescription_id=pres_id
    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
            "id":prescription_id,
        },
        url: '/retrieve_room_ward_bill',
        success: function(data){
            roomBill_dict={}
            wardBill_dict={}
            roomBill_dict=JSON.parse(data["roomBill_dict"])
            wardBill_dict=JSON.parse(data["wardBill_dict"])

            console.log("roomBill_dict1111",roomBill_dict)
            console.log("wardBill_dict2222",wardBill_dict)
            console.log("Object.keys(roomBill_dict).length", Object.keys(roomBill_dict).length)
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
                createBillDetailsRoomBill();

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
                createBillDetailsWardBill();
            }

           
        }
    }); 
}
function createBillDetailsRoomBill(){
    $("#row_div_two").remove()
        var row_div_two=$("<div class='row' id='row_div_two'></div>");
            var main_subcol=$("<div class='col-md-12'></div>");
                
                var subrow_one=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                    var col_one__subrow_one=$("<div class='col-md-5'></div>");
                        row__col_one__subrow_one=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-4'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var pat_name_label=$("<label for='pat_name_tag' class='custom_label_css'>Patient Name</label>");
                                var pat_name_input=$("<label id='pat_name_input' class='form-control-static'>"+roomBill_dict['pat_name']+"</label>")
                            colmd1.append(pat_name_label)
                            colmd2.append(pat_name_input)
                        row__col_one__subrow_one.append(colmd1);
                        row__col_one__subrow_one.append(colmd2);
                    col_one__subrow_one.append(row__col_one__subrow_one);

                    var col_two__subrow_one=$("<div class='col-md-5'></div>");
                        var row__col_two__subrow_one=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-4'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var pres_label=$("<label class='custom_label_css'>prescription ID</label>");
                                var pres_input=$("<label id='prescription_input' class='form-control-static'>"+prescription_id+"</label>")
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
                            var colmd1=$("<div class='col-md-4'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var floor_label=$("<label for='floor_tag' class='custom_label_css'>Floor Number</label>");
                                var floor_input=$("<label id='floor_input' class='form-control-static'>"+roomBill_dict['floor']+"</label>")
                            colmd1.append(floor_label)
                            colmd2.append(floor_input)
                        row__col_one__subrow_two.append(colmd1);
                        row__col_one__subrow_two.append(colmd2);
                    col_one__subrow_two.append(row__col_one__subrow_two);

                    var col_two__subrow_two=$("<div class='col-md-5'></div>");
                        var row__col_two__subrow_two=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-4'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var room_label=$("<label class='custom_label_css'>Room Number</label>");
                                var room_input=$("<label id='room_input' class='form-control-static'>"+roomBill_dict['room_no']+"</label>")
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
                            var colmd1=$("<div class='col-md-4'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var charges_label=$("<label for='charges_tag' class='custom_label_css'>Room Charges/Day</label>");
                                var charges_input=$("<label id='charges_input' class='form-control-static'>"+roomBill_dict['charge_per_day']+"</label>")
                            colmd1.append(charges_label)
                            colmd2.append(charges_input)
                        row__col_one__subrow_three.append(colmd1);
                        row__col_one__subrow_three.append(colmd2);
                    col_one__subrow_three.append(row__col_one__subrow_three);

                    var col_two__subrow_three=$("<div class='col-md-5'></div>");
                        var row__col_two__subrow_three=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-4'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var acCharge_label=$("<label class='custom_label_css'>AC Charges/Day</label>");
                                var acCharge_input=$("<label id='acCharge_input' class='form-control-static'>"+roomBill_dict['ac_charge_per_day']+" </label>")
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
                            var colmd1=$("<div class='col-md-4'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var checkin_label=$("<label for='checkin_tag' class='custom_label_css'>Admission Date</label>");
                                var checkin_input=$("<label id='checkin_input' class='form-control-static'> "+roomBill_dict['checkin']+"</label>")
                            colmd1.append(checkin_label)
                            colmd2.append(checkin_input)
                        row__col_one__subrow_four.append(colmd1);
                        row__col_one__subrow_four.append(colmd2);
                    col_one__subrow_four.append(row__col_one__subrow_four);

                    var col_two__subrow_four=$("<div class='col-md-5'></div>");
                        var row__col_two__subrow_four=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-4'></div>")
                            var colmd2=$("<div class='col-md-4' ></div>")
                                var checkout_label=$("<label class='custom_label_css'>Select Discharge Date</label>");
                                var checkout_input=$("<input id='checkout_input' style='background: transparent;border: none;border-bottom: 1px solid #000000;-webkit-box-shadow: none;box-shadow: none;border-radius: 0;'></input>")
                            colmd1.append(checkout_label);
                            colmd2.append(checkout_input);
        
                        row__col_two__subrow_four.append(colmd1)
                        row__col_two__subrow_four.append(colmd2)
                    col_two__subrow_four.append(row__col_two__subrow_four)

                    var col_three__subrow_four=$("<div class='col-md-2'></div>");
                        var row__col_three__subrow_four=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-12'></div>")
                                var Calculate_bttn=$('<button class="btn btn-success btn-sm btn-block"  id="calc_bttn" onclick="calculateRoomBill()">Calculate Room Bill</button>')
                            colmd1.append(Calculate_bttn)
                        row__col_three__subrow_four.append(colmd1)
                    col_three__subrow_four.append(row__col_three__subrow_four)

                subrow_four.append(col_one__subrow_four)
                subrow_four.append(col_two__subrow_four)
                subrow_four.append(col_three__subrow_four)

                var subrow_five=$("<div class='row' id='subrow_five'></div>");

            main_subcol.append(subrow_one)
            main_subcol.append(subrow_two)
            main_subcol.append(subrow_three)
            main_subcol.append(subrow_four)
            main_subcol.append(subrow_five)

            row_div_two.append(main_subcol)
        var main_col_div=$("#main_col_div");
    main_col_div.append(row_div_two);

    $( "#checkout_input" ).datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "yy-mm-dd",
    });
}
function createBillDetailsWardBill(){
    $("#row_div_two").remove()
    $("#row_div_three").remove()
        var row_div_two=$("<div class='row' id='row_div_two'></div>");
            var main_subcol=$("<div class='col-md-12'></div>");
                
                var subrow_one=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;' ></div>")

                    var col_one__subrow_one=$("<div class='col-md-5'></div>");
                        row__col_one__subrow_one=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-4'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var pat_name_label=$("<label for='pat_name_tag' class='custom_label_css'>Patient Name</label>");
                                var pat_name_input=$("<label id='pat_name_input' class='form-control-static'>"+wardBill_dict['patient_name']+"</label>")
                            colmd1.append(pat_name_label)
                            colmd2.append(pat_name_input)
                        row__col_one__subrow_one.append(colmd1);
                        row__col_one__subrow_one.append(colmd2);
                    col_one__subrow_one.append(row__col_one__subrow_one);

                    var col_two__subrow_one=$("<div class='col-md-5'></div>");
                        var row__col_two__subrow_one=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-4'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var pres_label=$("<label class='custom_label_css'>prescription ID</label>");
                                var pres_input=$("<label id='prescription_input' class='form-control-static'>"+prescription_id+"</label>")
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
                            var colmd1=$("<div class='col-md-4'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var ward_label=$("<label for='floor_tag' class='custom_label_css'>Ward Number</label>");
                                var ward_input=$("<label id='ward_input' class='form-control-static'>"+wardBill_dict['ward_no']+"</label>")
                            colmd1.append(ward_label)
                            colmd2.append(ward_input)
                        row__col_one__subrow_two.append(colmd1);
                        row__col_one__subrow_two.append(colmd2);
                    col_one__subrow_two.append(row__col_one__subrow_two);

                    var col_two__subrow_two=$("<div class='col-md-5'></div>");
                        var row__col_two__subrow_two=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-4'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var bed_label=$("<label class='custom_label_css'>Bed Number</label>");
                                var bed_input=$("<label id='room_input' class='form-control-static'>"+wardBill_dict['bed_no']+"</label>")
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
                            var colmd1=$("<div class='col-md-4'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var charges_label=$("<label for='charges_tag' class='custom_label_css'>Bed Charges/Day</label>");
                                var charges_input=$("<label id='charges_input' class='form-control-static'>"+wardBill_dict['charge_per_day']+"</label>")
                            colmd1.append(charges_label)
                            colmd2.append(charges_input)
                        row__col_one__subrow_three.append(colmd1);
                        row__col_one__subrow_three.append(colmd2);
                    col_one__subrow_three.append(row__col_one__subrow_three);

                subrow_three.append(col_one__subrow_three)

                var subrow_four=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                    var col_one__subrow_four=$("<div class='col-md-5'></div>");
                        row__col_one__subrow_four=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-4'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var checkin_label=$("<label for='checkin_tag' class='custom_label_css'>Admission Date</label>");
                                var checkin_input=$("<label id='checkin_input' class='form-control-static'>"+wardBill_dict['checkin']+"</label>")
                            colmd1.append(checkin_label)
                            colmd2.append(checkin_input)
                        row__col_one__subrow_four.append(colmd1);
                        row__col_one__subrow_four.append(colmd2);
                    col_one__subrow_four.append(row__col_one__subrow_four);

                    var col_two__subrow_four=$("<div class='col-md-5'></div>");
                        var row__col_two__subrow_four=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-4'></div>")
                            var colmd2=$("<div class='col-md-4'></div>")
                                var checkout_label=$("<label class='custom_label_css'>Select Discharge Date</label>");
                                var checkout_input=$("<input id='checkout_input' style='background: transparent;border: none;border-bottom: 1px solid #000000;-webkit-box-shadow: none;box-shadow: none;border-radius: 0;'></input>")
                            colmd1.append(checkout_label);
                            colmd2.append(checkout_input);
        
                        row__col_two__subrow_four.append(colmd1)
                        row__col_two__subrow_four.append(colmd2)
                    col_two__subrow_four.append(row__col_two__subrow_four)

                    var col_three__subrow_four=$("<div class='col-md-2'></div>");
                        var row__col_three__subrow_four=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-12'></div>")
                                var Calculate_bttn=$('<button class="btn btn-success btn-sm btn-block" id="calc_bttn" onclick="calculateWardBill()">Calculate Ward Bill</button>')
                            colmd1.append(Calculate_bttn)
                        row__col_three__subrow_four.append(colmd1)
                    col_three__subrow_four.append(row__col_three__subrow_four)

                subrow_four.append(col_one__subrow_four)
                subrow_four.append(col_two__subrow_four)
                subrow_four.append(col_three__subrow_four)

                var subrow_five=$("<div class='row' id='subrow_five'></div>");


            main_subcol.append(subrow_one)
            main_subcol.append(subrow_two)
            main_subcol.append(subrow_three)
            main_subcol.append(subrow_four)
            main_subcol.append(subrow_five)


            row_div_two.append(main_subcol)
        var main_col_div=$("#main_col_div");
    main_col_div.append(row_div_two);

    $( "#checkout_input" ).datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "yy-mm-dd",

    });
}
function calculateRoomBill(){
    $("#subrow_five").empty()
    var checkInDate = $("#checkin_input").text()
    var checkOutDate = $("#checkout_input").val()
    if($("#checkout_input").val()==""){
        alert("Please Select Discharge Date first")
    }
    else if(checkInDate>checkOutDate){
        alert("Date cannot be less than the Admision Date")
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
                            var colmd1=$("<div class='col-md-4'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var totaldays_label=$("<label for='total_tag' class='custom_label_css'>Days Stayed</label>")
                                var totaldays_input=$("<label id='total_days' class='form-control-static'>"+total_no_of_days+"</label>")
                            colmd1.append(totaldays_label)
                            colmd2.append(totaldays_input)
                        row__col_one__subrow_one.append(colmd1);
                        row__col_one__subrow_one.append(colmd2);
                    col_one__subrow_one.append(row__col_one__subrow_one);

                    var col_two__subrow_one=$("<div class='col-md-5'></div>");
                        var row__col_two__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var totalAmount_label=$("<label for='total_tag' class='custom_label_css'>Total Charges</label>")
                            var totalAmount_input=$("<label id='net_total' class='form-control-static'>"+totalCharges+"</label>")
                        colmd1.append(totalAmount_label)
                        colmd2.append(totalAmount_input)
        
                        row__col_two__subrow_one.append(colmd1)
                        row__col_two__subrow_one.append(colmd2)
                    col_two__subrow_one.append(row__col_two__subrow_one)

                    var col_three__subrow_one=$("<div class='col-md-1'></div>");
                        var row__col_three__subrow_one=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-12'></div>")
                                var save_bttn=$('<button class="btn btn-success btn-sm btn-block" id="save_btn" onclick="saveRoomBill()">Save</button>')
                            colmd1.append(save_bttn)
                        row__col_three__subrow_one.append(colmd1)
                    col_three__subrow_one.append(row__col_three__subrow_one)

                    var col_four__subrow_one=$("<div class='col-md-1'></div>");
                        var row__col_four__subrow_one=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-12'></div>")
                                var print_bttn=$('<button class="btn btn-success btn-sm btn-block" id="print_btn" onclick="printRoomBill()">Print Bill</button>')
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
                            var colmd1=$("<div class='col-md-4'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var totaldays_label=$("<label for='total_tag' class='custom_label_css'>Days Stayed</label>")
                                var totaldays_input=$("<label id='total_days' class='form-control-static'>"+total_no_of_days+"</label>")
                            colmd1.append(totaldays_label)
                            colmd2.append(totaldays_input)
                        row__col_one__subrow_one.append(colmd1);
                        row__col_one__subrow_one.append(colmd2);
                    col_one__subrow_one.append(row__col_one__subrow_one);

                    var col_two__subrow_one=$("<div class='col-md-5'></div>");
                        var row__col_two__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var totalAmount_label=$("<label for='total_tag' class='custom_label_css'>Total Charges</label>")
                            var totalAmount_input=$("<label id='net_total' class='form-control-static'>"+totalCharges+"</label>")
                        colmd1.append(totalAmount_label)
                        colmd2.append(totalAmount_input)
        
                        row__col_two__subrow_one.append(colmd1)
                        row__col_two__subrow_one.append(colmd2)
                    col_two__subrow_one.append(row__col_two__subrow_one)

                    var col_three__subrow_one=$("<div class='col-md-1'></div>");
                        var row__col_three__subrow_one=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-12'></div>")
                                var save_bttn=$('<button class="btn btn-success btn-sm btn-block" id="save_btn" onclick="saveWardBill()">Save</button>')
                            colmd1.append(save_bttn)
                        row__col_three__subrow_one.append(colmd1)
                    col_three__subrow_one.append(row__col_three__subrow_one)

                    var col_four__subrow_one=$("<div class='col-md-1'></div>");
                        var row__col_four__subrow_one=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-12'></div>")
                                var print_bttn=$('<button class="btn btn-success btn-sm btn-block" id="print_btn" onclick="printWardBill()">Print Bill</button>')
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
    $("#checkout_input").val("")

    var net_total=$("#net_total").text();
    console.log("net_total", net_total);

    var total_no_of_days=$("#total_days").text();
    console.log("total_no_of_days", total_no_of_days);
    
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
            console.log(data['Success']);
        },
    });
}
function saveWardBill(){
alert("")
    var pres_id=$("#prescription_input").text();
    console.log("pres_id", pres_id);

    var checkout=$("#checkout_input").val();
    $("#checkout_input").val(checkout)

    var net_total=$("#net_total").text();
    console.log("net_total", net_total);

    var total_no_of_days=$("#total_days").text();
    console.log("total_days11111", total_no_of_days);
    
    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            "pres":JSON.stringify(pres_id),
            "checkout":JSON.stringify(checkout),
            "net_total":JSON.stringify(net_total),
            "total_no_of_days":JSON.stringify(total_no_of_days),
    
        },
        // url: '/save_ward_bill',
        success: function(data){
            console.log(data['Success']);
        },
    });
}
function printRoomBill(){

    var pres_id=$("#prescription_input").text();
    console.log("pres_id", pres_id);

    var checkout=$("#checkout_input").val();
    $("#checkout_input").val("")

    var net_total=$("#net_total").text();
    console.log("net_total", net_total);

    var total_no_of_days=$('#total_days').text();


    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            "pres":JSON.stringify(pres_id),
            "checkout":JSON.stringify(checkout),
            "net_total":JSON.stringify(net_total),
            "total_no_of_days":JSON.stringify(total_no_of_days),

        },
        url: '/print_room_bill',
        success: function(data){
            console.log(data['Success']);
        },
    });

    var rmc="RMC HOSPITAL";
    var heading_mid= "Room Bill Details";
    var patient_name=roomBill_dict['pat_name']
    var room_no=roomBill_dict['room_no'];
    var floor_no=roomBill_dict['floor'];
    var charge_per_Day=roomBill_dict['charge_per_day']
    var ac_charge_per_Day=roomBill_dict['ac_charge_per_day']
    var checkin=$("#checkin_input").text();



    var room_print=$("<div id='room_print'></div>");

        var header=$("<center id='top'></center>")
            var div_logo=$("<div class='col-md-12'></div>");
            var div_info=$("<div class='info'></div>");
                var h1=$("<h1></h1>");
                    h1.append(rmc);
                div_info.append(h1);
        header.append(div_logo);
        header.append(div_info);

        var mid_div=$("<div id='mid'></div>");
            var div_info=$("<div class='heading_mid'></div>");
                var h2=$("<h2></h2>");
                    h2.append(heading_mid);
                    
                div_info.append(h2);
        mid_div.append(div_info);

        var bot_div=$("<div id='bot'></div>");
            var div_table=$("<div id='table'></div>");
                var table=$("<table>")
            
                    var tr=$('<tr class="tabletitle"></tr>')
                            var td1=$('<td class="table_row t1 label_text">Patient Name</td>')
                            var td2=$('<td class="table_row t1">'+patient_name+'</td>')
                            var td3=$('<td class="table_row t1 label_text">Prescription ID</td>')
                            var td4=$('<td class="table_row t1">'+pres_id+'</td>')

                        tr.append(td1);
                        tr.append(td2);
                        tr.append(td3);
                        tr.append(td4);

                    table.append(tr);
                    var tr=$('<tr class="tabletitle"></tr>')
                            var td1=$('<td class="table_row label_text">Floor Number</td>')
                            var td2=$('<td class="table_row">'+floor_no+'</td>')
                            var td3=$('<td class="table_row label_text">Room Number</td>')
                            var td4=$('<td class="table_row">'+room_no+'</td>')

                        tr.append(td1);
                        tr.append(td2);
                        tr.append(td3);
                        tr.append(td4);

                    table.append(tr);
                    var tr=$('<tr class="tabletitle"></tr>')
                            var td1=$('<td class="table_row label_text">Room Charges/Day</td>')
                            var td2=$('<td class="table_row">'+charge_per_Day+'</td>')
                            var td3=$('<td class="table_row label_text">AC Charges/Day</td>')
                            var td4=$('<td class="table_row">'+ac_charge_per_Day+'</td>')

                        tr.append(td1);
                        tr.append(td2);
                        tr.append(td3);
                        tr.append(td4);

                    table.append(tr);
                    var tr=$('<tr class="tabletitle"></tr>')
                            var td1=$('<td class="table_row label_text">CheckIn</td>')
                            var td2=$('<td class="table_row">'+checkin+'</td>')
                            var td3=$('<td class="table_row label_text">CheckOut</td>')
                            var td4=$('<td class="table_row">'+checkout+'</td>')

                        tr.append(td1);
                        tr.append(td2);
                        tr.append(td3);
                        tr.append(td4);

                    table.append(tr);
                    var tr=$('<tr class="tabletitle"></tr>')
                            var td1=$('<td class="table_row label_text">Days Stayed</td>')
                            var td2=$('<td class="table_row">'+total_no_of_days+'</td>')
                            var td3=$('<td class="table_row label_text">Charges</td>')
                            var td4=$('<td class="table_row">'+net_total+'</td>')

                        tr.append(td1);
                        tr.append(td2);
                        tr.append(td3);
                        tr.append(td4);

                    table.append(tr);
                    var tr=$('<tr class="tabletitle"></tr>')
                            var td1=$('<td class="table_row"></td>')
                            var td2=$('<td class="table_row"></td>')
                            var td3=$('<td class="table_row t1 label_text">Net Total</td>')
                            var td4=$('<td class="table_row t1">'+net_total+'</td>')
                        tr.append(td1);
                        tr.append(td2);
                        tr.append(td3);
                        tr.append(td4);

                    table.append(tr);

                div_table.append(table);

            var legalcopy=$("<div id='legalcopy'>");
                var p=$('<p class="legal" style="text-align:center"><h2><center>Thank you for visiting!<h2></center></p>')
            legalcopy.append(p)
        bot_div.append(div_table);
        bot_div.append(legalcopy);
        
    room_print.append(header);  
    room_print.append(mid_div);  
    room_print.append(bot_div);      

    var printcontent = $(room_print).clone();
    $('body').empty().html(printcontent);
  
    window.print();
    w.close();
    // $('#recipet_div').empty();

    // var restorepage = $('body').html();
    // var printcontent = $('#row_div_two').clone();
    // $('body').empty().html(printcontent);
    // window.print();
    // window.close();
    // $('body').html(restorepage);

    // mywindow.document.write('<html><head><title>' +'RAFIQ MEDICAL CENTER'+ '</title>');
    // mywindow.document.write('</head><body >');
    // mywindow.document.write('<h1>' + 'RAFIQ MEDICAL CENTER'  + '</h1>');
    // mywindow.document.write('</body></html>');
}
function printWardBill(){

    var pres_id=$("#prescription_input").text();
    console.log("pres_id", pres_id);

    var checkout=$("#checkout_input").val();
    $("#checkout_input").val(checkout)

    var net_total=$("#net_total").text();
    console.log("net_total", net_total);

    var total_no_of_days=$('#total_days').text();


    
    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            "pres":JSON.stringify(pres_id),
            "checkout":JSON.stringify(checkout),
            "net_total":JSON.stringify(net_total),
            "total_no_of_days":JSON.stringify(total_no_of_days),

        },
        url: '/print_ward_bill',
        success: function(data){
            console.log(data['Success']);
        },
    });

    var rmc="RMC HOSPITAL";
    var heading_mid= "Ward Bill Details";
    var patient_name=wardBill_dict['patient_name']
    var ward_no=wardBill_dict['ward_no'];
    var bed_no=wardBill_dict['bed_no'];
    var charge_per_Day=wardBill_dict['charge_per_day']
    var checkin=$("#checkin_input").text();

    var ward_print=$("<div id='ward_print'></div>");

        var header=$("<center id='top'></center>")
            var div_logo=$("<div class='col-md-12'></div>");
            var div_info=$("<div class='info'></div>");
                var h1=$("<h1></h1>");
                    h1.append(rmc);
                div_info.append(h1);
        header.append(div_logo);
        header.append(div_info);

        var mid_div=$("<div id='mid'></div>");
            var div_info=$("<div class='heading_mid'></div>");
                var h2=$("<p></p>");
                    h2.append(heading_mid);
                    
                div_info.append(h2);
        mid_div.append(div_info);

        var bot_div=$("<div id='bot'></div>");
            var div_table=$("<div id='table'></div>");
                var table=$("<table>")
            
                    var tr=$('<tr class="tabletitle"></tr>')
                            var td1=$('<td class="table_row t1 label_text">Patient Name</td>')
                            var td2=$('<td class="table_row t1">'+patient_name+'</td>')
                            var td3=$('<td class="table_row t1 label_text">Prescription ID</td>')
                            var td4=$('<td class="table_row t1">'+pres_id+'</td>')

                        tr.append(td1);
                        tr.append(td2);
                        tr.append(td3);
                        tr.append(td4);

                    table.append(tr);
                    var tr=$('<tr class="tabletitle"></tr>')
                            var td1=$('<td class="table_row label_text">Ward Number</td>')
                            var td2=$('<td class="table_row">'+ward_no+'</td>')
                            var td3=$('<td class="table_row label_text">Bed Number</td>')
                            var td4=$('<td class="table_row">'+bed_no+'</td>')

                        tr.append(td1);
                        tr.append(td2);
                        tr.append(td3);
                        tr.append(td4);

                    table.append(tr);
                    var tr=$('<tr class="tabletitle"></tr>')
                            var td1=$('<td class="table_row label_text">Bed Charges/Day</td>')
                            var td2=$('<td class="table_row">'+charge_per_Day+'</td>')

                        tr.append(td1);
                        tr.append(td2);

                    table.append(tr);
                    var tr=$('<tr class="tabletitle"></tr>')
                            var td1=$('<td class="table_row label_text">CheckIn</td>')
                            var td2=$('<td class="table_row">'+checkin+'</td>')
                            var td3=$('<td class="table_row label_text">CheckOut</td>')
                            var td4=$('<td class="table_row">'+checkout+'</td>')

                        tr.append(td1);
                        tr.append(td2);
                        tr.append(td3);
                        tr.append(td4);

                    table.append(tr);
                    var tr=$('<tr class="tabletitle"></tr>')
                            var td1=$('<td class="table_row label_text">Days Stayed</td>')
                            var td2=$('<td class="table_row">'+total_no_of_days+'</td>')
                            var td3=$('<td class="table_row label_text">Charges</td>')
                            var td4=$('<td class="table_row">'+net_total+'</td>')

                        tr.append(td1);
                        tr.append(td2);
                        tr.append(td3);
                        tr.append(td4);

                    table.append(tr);
                    var tr=$('<tr class="tabletitle"></tr>')
                            var td1=$('<td class="table_row"></td>')
                            var td2=$('<td class="table_row"></td>')
                            var td3=$('<td class="table_row t1 label_text">Net Total</td>')
                            var td4=$('<td class="table_row t1">'+net_total+'</td>')
                        tr.append(td1);
                        tr.append(td2);
                        tr.append(td3);
                        tr.append(td4);

                    table.append(tr);

                div_table.append(table);

            var legalcopy=$("<div id='legalcopy'>");
                var p=$('<p class="legal" style="text-align:center"><h2><center>Thank you for visiting!<h2></center></p>')
            legalcopy.append(p)
        bot_div.append(div_table);
        bot_div.append(legalcopy);
        
    ward_print.append(header);  
    ward_print.append(mid_div);  
    ward_print.append(bot_div);      

    var printcontent = $(ward_print).clone();
    $('body').empty().html(printcontent);
  
    window.print();
    window.close();

    // var restorepage = $('body').html();
    // var printcontent = $('#row_div_two').clone();
    // $('body').empty().html(printcontent);
    // window.print();
    // window.close();
    // $('body').html(restorepage);
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