var prescription_id;
var patRoomBill_dict={};
var patWardBill_dict={};
var surgBillRecord_dict={};
var procBillRecord_dict={};
var patPresRecord_dict={};
var DespBill_dict={};
var patRoomBill_list=[];
var patWardBill_list=[];
var surgBillRecord_list=[];
var procBillRecord_list=[];
var patPresRecord_list=[];
var despBill_list=[];


$(document).ready(function() {
});

function updatePatientBill(){

    $('#main_page_content').empty()
    var container= $('#main_page_content').append('<div class="container-fluid" id="container_pat_surg_proc_bill"></div>');
    $("#container_pat_surg_proc_bill").append("<h2 class ='text-center'>Update Patient Bill</h2>");
    $("#container_pat_surg_proc_bill").append("<hr class='custom_hr'>");

    var main_row_div= $("<div class='row is-flex'></div>");

    $(container).append(main_row_div);
    var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");
       
        $(main_row_div).append(main_col_div);

            var row_div_one=$("<div class='row'></div>");
                var col_one__row_div_one=$("<div class='col-md-4'></div>");
                row__col_one__row_div_one=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-4'></div>")
                    colmd2=$("<div class='col-md-6'></div>")
                    colmd3=$("<div class='col-md-2'></div>")

                    pres_id_label=$("<label class='custom_label_css'>Prescription id</label>");
                    colmd1.append(pres_id_label)

                    pres_id_input=$("<input class='form-control' id='pres_id_input' class='custom_input_css'>")
                    colmd2.append(pres_id_input);

                    var search_button=$('<button class="btn btn-light font-weight-bold" onclick="retrieveInvoiceBillRecord()">Search Bill</button>');
                    colmd3.append(search_button);

                row__col_one__row_div_one.append(colmd1);
                row__col_one__row_div_one.append(colmd2);
                row__col_one__row_div_one.append(colmd3);

                col_one__row_div_one.append(row__col_one__row_div_one);
            row_div_one.append(col_one__row_div_one);
        $(main_col_div).append(row_div_one);

}

function retrieveInvoiceBillRecord(){
    var pres_id=$("#pres_id_input").val()

    prescription_id=pres_id
    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
            "id":prescription_id,
        },
        url: '/retrieve_invoice_bill_record',
        success: function(data){
            patRoomBill_dict={};
            patWardBill_dict={};
            surgBillRecord_dict={};
            procBillRecord_dict={};
            patPresRecord_dict={};
            DespBill_dict={};
            roomBill_dict=JSON.parse(data["roomBill_dict"])
            wardBill_dict=JSON.parse(data["wardBill_dict"])

            console.log("roomBill_dict1111",roomBill_dict)
            console.log("wardBill_dict2222",wardBill_dict)
            console.log("Object.keys(roomBill_dict).length", Object.keys(roomBill_dict).length)
        //     if(Object.keys(roomBill_dict).length !== 0){
        //         for (roombill in roomBill_dict){
        //             templist=[]
        //             console.log("roombill",roombill);
        //             templist.push(roombill)
        //             templist.push(roomBill_dict[roombill]['pat_name'])
        //             templist.push(roomBill_dict[roombill]['floor'])
        //             templist.push(roomBill_dict[roombill]['room_no'])
        //             templist.push(roomBill_dict[roombill]['charge_per_day'])
        //             templist.push(roomBill_dict[roombill]['ac_charge_per_day'])
        //             templist.push(roomBill_dict[roombill]['checkin'])
        //             templist.push(roomBill_dict[roombill]['id'])
        //             roomBill_list.push(templist)
        //         }
        //         console.log("roomBill_dict>>>>>>",roomBill_dict);
        //         console.log(roomBill_list);
        //         createBillDetailsRoomBill();

        //     }
        //     else{
        //         for (wardbill in wardBill_dict){
        //             templist=[]
        //             console.log("wardbill",wardbill);
        //             templist.push(wardbill)
        //             templist.push(wardBill_dict[wardbill]['patient_name'])
        //             templist.push(wardBill_dict[wardbill]['ward_no'])
        //             templist.push(wardBill_dict[wardbill]['bed_no'])
        //             templist.push(wardBill_dict[wardbill]['charge_per_day'])
        //             templist.push(wardBill_dict[wardbill]['checkin'])
        //             templist.push(wardBill_dict[wardbill]['id'])
        //             wardBill_list.push(templist)
        //         }
        //         console.log("wardBill_dic>>>>>>>>",wardBill_dict);
        //         console.log(wardBill_list);
        //         createBillDetailsWardBill();
        //     }

           
        }
    }); 
        
    var row_div_mid=$("<div class='row' id='pat_details'></div>");
        var main_subcol=$("<div class='col-md-12'></div>");

        var subrow=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

            var col_one__subrow=$("<div class='col-md-5'></div>");
                row__col_one__subrow=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-4'></div>")
                    var colmd2=$("<div class='col-md-6'></div>")
                        var pat_name_label=$("<label for='pat_name_tag' class='custom_label_css'>Patient Name</label>");
                        // var checkin_input=$("<label id='checkin_input' class='form-control-static'>"+wardBill_dict['checkin']+"</label>")
                    colmd1.append(pat_name_label)
                    // colmd2.append(checkin_input)
                row__col_one__subrow.append(colmd1);
                row__col_one__subrow.append(colmd2);
            col_one__subrow.append(row__col_one__subrow);

            var col_two__subrow=$("<div class='col-md-5'></div>");
                var row__col_two__subrow=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-4'></div>")
                    var colmd2=$("<div class='col-md-4'></div>")
                        var date_visited_label=$("<label class='custom_label_css'>Date visited</label>");
                        // var checkout_input=$("<input id='checkout_input' style='background: transparent;border: none;border-bottom: 1px solid #000000;-webkit-box-shadow: none;box-shadow: none;border-radius: 0;'></input>")
                    colmd1.append(date_visited_label);
                    // colmd2.append(checkout_input);

                row__col_two__subrow.append(colmd1)
                row__col_two__subrow.append(colmd2)
            col_two__subrow.append(row__col_two__subrow)

            var col_three__subrow=$("<div class='col-md-2'></div>");
                var row__col_three__subrow=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-12'></div>")
                    var colmd2=$("<div class='col-md-4'></div>")
                        var invoice_label=$("<label class='custom_label_css'>Invoice Number</label>");
                        // var invoice_input=$("<input id='checkout_input' style='background: transparent;border: none;border-bottom: 1px solid #000000;-webkit-box-shadow: none;box-shadow: none;border-radius: 0;'></input>")
                    colmd1.append(invoice_label);
                    // colmd2.append(checkout_input);
                row__col_three__subrow.append(colmd1)
                row__col_three__subrow.append(colmd2)
            col_three__subrow.append(row__col_three__subrow)

        subrow.append(col_one__subrow)
        subrow.append(col_two__subrow)
        subrow.append(col_three__subrow)

        main_subcol.append(subrow)

        row_div_mid.append(main_subcol)
    var main_col_div=$("#main_col_div");
    main_col_div.append(row_div_mid);

    createPrescriptionBillRow();
    createDispensoryBillRow();
    createRoomBillRow();
    createWardBillRow();
    netTotalAmountRow();
}

function createPrescriptionBillRow(){

    var row_div_two=$("<div class='row' id='row_pres_bill'></div>");
        var main_subcol=$("<div class='col-md-12'></div>");
            
            var subrow_one=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_one=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var amount_label=$("<label for='amount_label_tag' class='custom_label_css'>Amount Paid</label>");
                            // var pat_name_input=$("<label id='pat_name_input' class='form-control-static'>"+roomBill_dict['pat_name']+"</label>")
                        colmd1.append(amount_label)
                        // colmd2.append(pat_name_input)
                    row__col_one__subrow_one.append(colmd1);
                    row__col_one__subrow_one.append(colmd2);
                col_one__subrow_one.append(row__col_one__subrow_one);

            subrow_one.append(col_one__subrow_one)

            var subrow_two=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_two=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_two=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var status_label=$("<label class='custom_label_css'>Status</label>");
                            // var pres_input=$("<label id='status_label' class='form-control-static'>"+prescription_id+"</label>")
                        colmd1.append(status_label);
                        // colmd2.append(pres_input);
                    row__col_one__subrow_two.append(colmd1);
                    row__col_one__subrow_two.append(colmd2);
                col_one__subrow_two.append(row__col_one__subrow_two);

            subrow_two.append(col_one__subrow_two)
           
        main_subcol.append(subrow_one)
        main_subcol.append(subrow_two)

        row_div_two.append(main_subcol)
    var main_col_div=$("#main_col_div");
main_col_div.append(row_div_two);

}
function createDispensoryBillRow(){
    var row_div_three=$("<div class='row' id='row_disp_bill'></div>");
        var main_subcol=$("<div class='col-md-12'></div>");
            
            var subrow_one=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_one=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var desp_med_label=$("<label for='desp_med_label_tag' class='custom_label_css'>Despensory Medicines Bill</label>");
                            // var pat_name_input=$("<label id='pat_name_input' class='form-control-static'>"+roomBill_dict['pat_name']+"</label>")
                        colmd1.append(desp_med_label)
                        // colmd2.append(pat_name_input)
                    row__col_one__subrow_one.append(colmd1);
                    row__col_one__subrow_one.append(colmd2);
                col_one__subrow_one.append(row__col_one__subrow_one);

            subrow_one.append(col_one__subrow_one)

            var subrow_two=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_two=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_two=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var addit_med_label=$("<label for='addit_med_label_tag' class='custom_label_css'>Additional Medicines Bill</label>");
                            // var floor_input=$("<label id='floor_input' class='form-control-static'>"+roomBill_dict['floor']+"</label>")
                        colmd1.append(addit_med_label)
                        // colmd2.append(floor_input)
                    row__col_one__subrow_two.append(colmd1);
                    row__col_one__subrow_two.append(colmd2);
                col_one__subrow_two.append(row__col_one__subrow_two);

            subrow_two.append(col_one__subrow_two)

            var subrow_three=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_three=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_three=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var actual_bill_label=$("<label for='actual_bill_label_tag' class='custom_label_css'>Total Bill</label>");
                            // var charges_input=$("<label id='charges_input' class='form-control-static'>"+roomBill_dict['charge_per_day']+"</label>")
                        colmd1.append(actual_bill_label)
                        // colmd2.append(charges_input)
                    row__col_one__subrow_three.append(colmd1);
                    row__col_one__subrow_three.append(colmd2);
                col_one__subrow_three.append(row__col_one__subrow_three);

            subrow_three.append(col_one__subrow_three)

            var subrow_four=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_four=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_four=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var status_label=$("<label for='status_label_tag' class='custom_label_css'>Status</label>");
                            // var checkin_input=$("<label id='checkin_input' class='form-control-static'> "+roomBill_dict['checkin']+"</label>")
                        colmd1.append(status_label)
                        // colmd2.append(checkin_input)
                    row__col_one__subrow_four.append(colmd1);
                    row__col_one__subrow_four.append(colmd2);
                col_one__subrow_four.append(row__col_one__subrow_four);

            subrow_four.append(col_one__subrow_four)
           
        main_subcol.append(subrow_one)
        main_subcol.append(subrow_two)
        main_subcol.append(subrow_three)
        main_subcol.append(subrow_four)

        row_div_three.append(main_subcol)
    var main_col_div=$("#main_col_div");
main_col_div.append(row_div_three);
}
function createSurgeryBillRow(){

    var row_div_four=$("<div class='row' id='row_surgery_bill'></div>");
        var main_subcol=$("<div class='col-md-12'></div>");
            
            var subrow_one=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_one=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var pat_name_label=$("<label for='pat_name_tag' class='custom_label_css'>Patient Name</label>");
                            // var pat_name_input=$("<label id='pat_name_input' class='form-control-static'>"+roomBill_dict['pat_name']+"</label>")
                        colmd1.append(pat_name_label)
                        // colmd2.append(pat_name_input)
                    row__col_one__subrow_one.append(colmd1);
                    row__col_one__subrow_one.append(colmd2);
                col_one__subrow_one.append(row__col_one__subrow_one);

                var col_two__subrow_one=$("<div class='col-md-5'></div>");
                    var row__col_two__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var pres_label=$("<label class='custom_label_css'>prescription ID</label>");
                            // var pres_input=$("<label id='prescription_input' class='form-control-static'>"+prescription_id+"</label>")
                        colmd1.append(pres_label);
                        // colmd2.append(pres_input);
    
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
                            // var floor_input=$("<label id='floor_input' class='form-control-static'>"+roomBill_dict['floor']+"</label>")
                        colmd1.append(floor_label)
                        // colmd2.append(floor_input)
                    row__col_one__subrow_two.append(colmd1);
                    row__col_one__subrow_two.append(colmd2);
                col_one__subrow_two.append(row__col_one__subrow_two);

                var col_two__subrow_two=$("<div class='col-md-5'></div>");
                    var row__col_two__subrow_two=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var room_label=$("<label class='custom_label_css'>Room Number</label>");
                            // var room_input=$("<label id='room_input' class='form-control-static'>"+roomBill_dict['room_no']+"</label>")
                        colmd1.append(room_label);
                        // colmd2.append(room_input);
    
                    row__col_two__subrow_two.append(colmd1)
                    row__col_two__subrow_two.append(colmd2)
                col_two__subrow_two.append(row__col_two__subrow_two)

            subrow_two.append(col_one__subrow_two)
            subrow_two.append(col_two__subrow_two)

           
        main_subcol.append(subrow_one)
        main_subcol.append(subrow_two)

    row_div_four.append(main_subcol)
    var main_col_div=$("#main_col_div");
main_col_div.append(row_div_four);
}
function createProcedureBillRow(){
    var row_div_five=$("<div class='row' id='row_procedure_bill'></div>");
        var main_subcol=$("<div class='col-md-12'></div>");
            
            var subrow_one=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_one=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var pat_name_label=$("<label for='pat_name_tag' class='custom_label_css'>Patient Name</label>");
                            // var pat_name_input=$("<label id='pat_name_input' class='form-control-static'>"+roomBill_dict['pat_name']+"</label>")
                        colmd1.append(pat_name_label)
                        // colmd2.append(pat_name_input)
                    row__col_one__subrow_one.append(colmd1);
                    row__col_one__subrow_one.append(colmd2);
                col_one__subrow_one.append(row__col_one__subrow_one);

                var col_two__subrow_one=$("<div class='col-md-5'></div>");
                    var row__col_two__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var pres_label=$("<label class='custom_label_css'>prescription ID</label>");
                            // var pres_input=$("<label id='prescription_input' class='form-control-static'>"+prescription_id+"</label>")
                        colmd1.append(pres_label);
                        // colmd2.append(pres_input);
    
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
                            // var floor_input=$("<label id='floor_input' class='form-control-static'>"+roomBill_dict['floor']+"</label>")
                        colmd1.append(floor_label)
                        // colmd2.append(floor_input)
                    row__col_one__subrow_two.append(colmd1);
                    row__col_one__subrow_two.append(colmd2);
                col_one__subrow_two.append(row__col_one__subrow_two);

                var col_two__subrow_two=$("<div class='col-md-5'></div>");
                    var row__col_two__subrow_two=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var room_label=$("<label class='custom_label_css'>Room Number</label>");
                            // var room_input=$("<label id='room_input' class='form-control-static'>"+roomBill_dict['room_no']+"</label>")
                        colmd1.append(room_label);
                        // colmd2.append(room_input);
    
                    row__col_two__subrow_two.append(colmd1)
                    row__col_two__subrow_two.append(colmd2)
                col_two__subrow_two.append(row__col_two__subrow_two)

            subrow_two.append(col_one__subrow_two)
            subrow_two.append(col_two__subrow_two)

           
        main_subcol.append(subrow_one)
        main_subcol.append(subrow_two)

        row_div_five.append(main_subcol)
    var main_col_div=$("#main_col_div");
main_col_div.append(row_div_five);

}
function createRoomBillRow(){
    var row_div_six=$("<div class='row' id='row_room_bill'></div>");
        var main_subcol=$("<div class='col-md-12'></div>");
            
            var subrow_one=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_one=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var floor_label=$("<label for='floor_tag' class='custom_label_css'>Floor Number</label>");
                            // var floor_input=$("<label id='floor_input' class='form-control-static'>"+roomBill_dict['floor']+"</label>")
                        colmd1.append(floor_label)
                        // colmd2.append(floor_input)
                    row__col_one__subrow_one.append(colmd1);
                    row__col_one__subrow_one.append(colmd2);
                col_one__subrow_one.append(row__col_one__subrow_one);

            subrow_one.append(col_one__subrow_one)

            var subrow_two=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_two=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_two=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-4'></div>")
                    var colmd2=$("<div class='col-md-6'></div>")
                        var room_label=$("<label class='custom_label_css'>Room Number</label>");
                        // var room_input=$("<label id='room_input' class='form-control-static'>"+roomBill_dict['room_no']+"</label>")
                    colmd1.append(room_label);
                    // colmd2.append(room_input);

                    row__col_one__subrow_two.append(colmd1);
                    row__col_one__subrow_two.append(colmd2);
                col_one__subrow_two.append(row__col_one__subrow_two);

            subrow_two.append(col_one__subrow_two)

            var subrow_three=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_three=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_three=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var charges_label=$("<label for='charges_tag' class='custom_label_css'>Room Charges/Day</label>");
                            // var charges_input=$("<label id='charges_input' class='form-control-static'>"+roomBill_dict['charge_per_day']+"</label>")
                        colmd1.append(charges_label)
                        // colmd2.append(charges_input)
                    row__col_one__subrow_three.append(colmd1);
                    row__col_one__subrow_three.append(colmd2);
                col_one__subrow_three.append(row__col_one__subrow_three);

            subrow_three.append(col_one__subrow_three)

            var subrow_four=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_four=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_four=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var acCharge_label=$("<label class='custom_label_css'>AC Charges/Day</label>");
                            // var acCharge_input=$("<label id='acCharge_input' class='form-control-static'>"+roomBill_dict['ac_charge_per_day']+" </label>")
                        colmd1.append(acCharge_label);
                        // colmd2.append(acCharge_input);
                    row__col_one__subrow_four.append(colmd1);
                    row__col_one__subrow_four.append(colmd2);
                col_one__subrow_four.append(row__col_one__subrow_four);

            subrow_four.append(col_one__subrow_four)

            var subrow_five=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_five=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_five=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var totalDays_label=$("<label class='custom_label_css'>Days Stayed</label>");
                            // var acCharge_input=$("<label id='acCharge_input' class='form-control-static'>"+roomBill_dict['ac_charge_per_day']+" </label>")
                        colmd1.append(totalDays_label);
                        // colmd2.append(acCharge_input);
                    row__col_one__subrow_five.append(colmd1);
                    row__col_one__subrow_five.append(colmd2);
                col_one__subrow_five.append(row__col_one__subrow_five);

            subrow_five.append(col_one__subrow_five)

            var subrow_six=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_six=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_six=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var totalAmount_label=$("<label class='custom_label_css'>Total Amount</label>");
                            // var acCharge_input=$("<label id='acCharge_input' class='form-control-static'>"+roomBill_dict['ac_charge_per_day']+" </label>")
                        colmd1.append(totalAmount_label);
                        // colmd2.append(acCharge_input);
                    row__col_one__subrow_six.append(colmd1);
                    row__col_one__subrow_six.append(colmd2);
                col_one__subrow_six.append(row__col_one__subrow_six);

            subrow_six.append(col_one__subrow_six)

            var subrow_seven=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_seven=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_seven=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var status_label=$("<label class='custom_label_css'>Status</label>");
                            // var acCharge_input=$("<label id='acCharge_input' class='form-control-static'>"+roomBill_dict['ac_charge_per_day']+" </label>")
                        colmd1.append(status_label);
                        // colmd2.append(acCharge_input);
                    row__col_one__subrow_seven.append(colmd1);
                    row__col_one__subrow_seven.append(colmd2);
                col_one__subrow_seven.append(row__col_one__subrow_seven);

            subrow_seven.append(col_one__subrow_seven)
           
        main_subcol.append(subrow_one)
        main_subcol.append(subrow_two)
        main_subcol.append(subrow_three)
        main_subcol.append(subrow_four)
        main_subcol.append(subrow_five)
        main_subcol.append(subrow_six)
        main_subcol.append(subrow_seven)

        row_div_six.append(main_subcol)
    var main_col_div=$("#main_col_div");
main_col_div.append(row_div_six);
}
function createWardBillRow(){
    var row_div_six=$("<div class='row' id='row_ward_bill'></div>");
        var main_subcol=$("<div class='col-md-12'></div>");
                    
            var subrow_one=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_one=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var Ward_label=$("<label for='Ward_tag' class='custom_label_css'>Ward Number</label>");
                            // var floor_input=$("<label id='floor_input' class='form-control-static'>"+roomBill_dict['floor']+"</label>")
                        colmd1.append(Ward_label)
                        // colmd2.append(floor_input)
                    row__col_one__subrow_one.append(colmd1);
                    row__col_one__subrow_one.append(colmd2);
                col_one__subrow_one.append(row__col_one__subrow_one);

            subrow_one.append(col_one__subrow_one)

            var subrow_two=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_two=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_two=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-4'></div>")
                    var colmd2=$("<div class='col-md-6'></div>")
                        var bed_label=$("<label class='custom_label_css'>Bed Number</label>");
                        // var room_input=$("<label id='room_input' class='form-control-static'>"+roomBill_dict['room_no']+"</label>")
                    colmd1.append(bed_label);
                    // colmd2.append(room_input);

                    row__col_one__subrow_two.append(colmd1);
                    row__col_one__subrow_two.append(colmd2);
                col_one__subrow_two.append(row__col_one__subrow_two);

            subrow_two.append(col_one__subrow_two)

            var subrow_three=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_three=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_three=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var charges_label=$("<label for='charges_tag' class='custom_label_css'>Room Charges/Day</label>");
                            // var charges_input=$("<label id='charges_input' class='form-control-static'>"+roomBill_dict['charge_per_day']+"</label>")
                        colmd1.append(charges_label)
                        // colmd2.append(charges_input)
                    row__col_one__subrow_three.append(colmd1);
                    row__col_one__subrow_three.append(colmd2);
                col_one__subrow_three.append(row__col_one__subrow_three);

            subrow_three.append(col_one__subrow_three)

            var subrow_four=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_four=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_four=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var totalDays_label=$("<label class='custom_label_css'>Days Stayed</label>");
                            // var acCharge_input=$("<label id='acCharge_input' class='form-control-static'>"+roomBill_dict['ac_charge_per_day']+" </label>")
                        colmd1.append(totalDays_label);
                        // colmd2.append(acCharge_input);
                    row__col_one__subrow_four.append(colmd1);
                    row__col_one__subrow_four.append(colmd2);
                col_one__subrow_four.append(row__col_one__subrow_four);

            subrow_four.append(col_one__subrow_four)

            var subrow_five=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_five=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_five=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var totalAmount_label=$("<label class='custom_label_css'>Total Amount</label>");
                            // var acCharge_input=$("<label id='acCharge_input' class='form-control-static'>"+roomBill_dict['ac_charge_per_day']+" </label>")
                        colmd1.append(totalAmount_label);
                        // colmd2.append(acCharge_input);
                    row__col_one__subrow_five.append(colmd1);
                    row__col_one__subrow_five.append(colmd2);
                col_one__subrow_five.append(row__col_one__subrow_five);

            subrow_five.append(col_one__subrow_five)

            var subrow_six=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_six=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_six=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var status_label=$("<label class='custom_label_css'>Status</label>");
                            // var acCharge_input=$("<label id='acCharge_input' class='form-control-static'>"+roomBill_dict['ac_charge_per_day']+" </label>")
                        colmd1.append(status_label);
                        // colmd2.append(acCharge_input);
                    row__col_one__subrow_six.append(colmd1);
                    row__col_one__subrow_six.append(colmd2);
                col_one__subrow_six.append(row__col_one__subrow_six);

            subrow_six.append(col_one__subrow_six)
        
        main_subcol.append(subrow_one)
        main_subcol.append(subrow_two)
        main_subcol.append(subrow_three)
        main_subcol.append(subrow_four)
        main_subcol.append(subrow_five)
        main_subcol.append(subrow_six)

        row_div_six.append(main_subcol)
        var main_col_div=$("#main_col_div");
    main_col_div.append(row_div_six);
}
function netTotalAmountRow(){
    var row_div_last=$("<div class='row' id='pat_details'></div>");
        var main_subcol=$("<div class='col-md-12'></div>");

            var subrow_one=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_one=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var total_label=$("<label for='total_label_tag' class='custom_label_css'>Sub Total</label>");
                            // var checkin_input=$("<label id='checkin_input' class='form-control-static'>"+wardBill_dict['checkin']+"</label>")
                        colmd1.append(total_label)
                        // colmd2.append(checkin_input)
                    row__col_one__subrow_one.append(colmd1);
                    row__col_one__subrow_one.append(colmd2);
                col_one__subrow_one.append(row__col_one__subrow_one);

            subrow_one.append(col_one__subrow_one)

            var subrow_two=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_two=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_two=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var Discount_label=$("<label for='Discount_label_tag' class='custom_label_css'>Discount</label>");
                            // var checkin_input=$("<label id='checkin_input' class='form-control-static'>"+wardBill_dict['checkin']+"</label>")
                        colmd1.append(Discount_label)
                        // colmd2.append(checkin_input)
                    row__col_one__subrow_two.append(colmd1);
                    row__col_one__subrow_two.append(colmd2);
                col_one__subrow_two.append(row__col_one__subrow_two);

            subrow_two.append(col_one__subrow_two)

            var subrow_three=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_three=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_three=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var Net_total_label=$("<label for='net_total_tag' class='custom_label_css'>Net Total</label>");
                            // var checkin_input=$("<label id='checkin_input' class='form-control-static'>"+wardBill_dict['checkin']+"</label>")
                        colmd1.append(Net_total_label)
                        // colmd2.append(checkin_input)
                    row__col_one__subrow_three.append(colmd1);
                    row__col_one__subrow_three.append(colmd2);
                col_one__subrow_three.append(row__col_one__subrow_three);

            subrow_three.append(col_one__subrow_three)

            var subrow_four=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_four=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_four=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                            var updateBtn_label=$('<button class="btn btn-success btn-sm btn-block" id="update_bttn" onclick="updateBill()">Update Bill</button>');
                        colmd1.append(updateBtn_label)
                    row__col_one__subrow_four.append(colmd1);
                col_one__subrow_four.append(row__col_one__subrow_four);

            subrow_four.append(col_one__subrow_four)

        main_subcol.append(subrow_one)
        main_subcol.append(subrow_two)
        main_subcol.append(subrow_three)
        main_subcol.append(subrow_four)



        row_div_last.append(main_subcol)
    var main_col_div=$("#main_col_div");
    main_col_div.append(row_div_last);

} 