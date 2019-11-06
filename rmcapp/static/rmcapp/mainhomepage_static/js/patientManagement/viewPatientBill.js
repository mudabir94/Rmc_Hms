var prescription_id;
var patRoomBillView_dict={};
var patWardBillView_dict={};
var surgBillRecordView_dict={};
var procBillRecordView_dict={};
var patPresRecordView_dict={};
var DespBillView_dict={};
var netTotal;
var totalSurgBill;
var totalProcBill;

$(document).ready(function() {
});

function viewPatientBill(){
    $('#main_page_content').empty()
    var container= $('#main_page_content').append('<div class="container-fluid" id="container_view_pat_bill"></div>');
    $("#container_view_pat_bill").append("<h2 class ='text-center'>View Patient Bill</h2>");
    $("#container_view_pat_bill").append("<hr class='custom_hr'>");

    var main_row_div= $("<div class='row is-flex'></div>");

    $(container).append(main_row_div);
    var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");
       
        $(main_row_div).append(main_col_div);

            var row_div_one=$("<div class='row' id='search_row_div'></div>");
                var col_one__row_div_one=$("<div class='col-md-4'></div>");
                row__col_one__row_div_one=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-4'></div>")
                    colmd2=$("<div class='col-md-6'></div>")
                    colmd3=$("<div class='col-md-2'></div>")

                    pres_id_label=$("<label class='custom_label_css'>Prescription id</label>");
                    colmd1.append(pres_id_label)

                    pres_id_input=$("<input class='form-control custom_input_css' id='pres_id_input' >")
                    colmd2.append(pres_id_input);

                    var search_button=$('<button class="btn btn-light font-weight-bold" onclick="retrieveInvoiceBillRecordForView()">Search Bill</button>');
                    colmd3.append(search_button);

                row__col_one__row_div_one.append(colmd1);
                row__col_one__row_div_one.append(colmd2);
                row__col_one__row_div_one.append(colmd3);

                col_one__row_div_one.append(row__col_one__row_div_one);
            row_div_one.append(col_one__row_div_one);
        $(main_col_div).append(row_div_one);
}

function retrieveInvoiceBillRecordForView(){
    $("#pat_details_div").remove();
    $("#row_pres_bill").remove();
    $("#row_disp_bill").remove();
    $("#row_surgery_bill").remove();
    $("#row_procedure_bill").remove();
    $("#row_room_bill").remove();
    $("#row_ward_bill").remove();
    $("#total_amount_div").remove();

    var pres_id=$("#pres_id_input").val()
    prescription_id=pres_id
    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
            "id":prescription_id,
        },
        url: '/retrieve_invoice_bill_record_for_view',
        success: function(data){
            patRoomBillView_dict={};
            patWardBillView_dict={};
            surgBillRecordView_dict={};
            procBillRecordView_dict={};
            patPresRecordView_dict={};
            DespBillView_dict={};
            totalSurgBill;
            totalProcBill;
            patRoomBillView_dict=JSON.parse(data["patRoomBillView_dict"])
            patWardBillView_dict=JSON.parse(data["patWardBillView_dict"])
            surgBillRecordView_dict=JSON.parse(data["surgBillRecordView_dict"])
            procBillRecordView_dict=JSON.parse(data["procBillRecordView_dict"])
            patPresRecordView_dict=JSON.parse(data["patPresRecordView_dict"])
            DespBillView_dict=JSON.parse(data["DespBillView_dict"])
            totalSurgBill=JSON.parse(data["totalSurgBill"])
            totalProcBill=JSON.parse(data["totalProcBill"])
            console.log("totalSurgBill", totalSurgBill)
            console.log("totalProcBill",totalProcBill)

            var dt= new Date(patPresRecordView_dict['date_visited']);
            var newdate=dt.toISOString().split('T')[0];


            var row_div_mid=$("<div class='row' id='pat_details_div'></div>");
                var main_subcol=$("<div class='col-md-12'></div>");

                var subrow=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                    var col_one__subrow=$("<div class='col-md-4'></div>");
                        row__col_one__subrow=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-4'></div>")
                            var colmd2=$("<div class='col-md-4'></div>")
                                var pat_name_label=$("<label for='pat_name_tag' class='custom_label_css'>Patient Name</label>");
                                var pat_name_input=$("<label id='pat_name_input' class='form-control-static'>"+patPresRecordView_dict['pat_name']+"</label>")
                            colmd1.append(pat_name_label)
                            colmd2.append(pat_name_input)
                        row__col_one__subrow.append(colmd1);
                        row__col_one__subrow.append(colmd2);
                    col_one__subrow.append(row__col_one__subrow);

                    var col_two__subrow=$("<div class='col-md-4'></div>");
                        var row__col_two__subrow=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-4'></div>")
                            var colmd2=$("<div class='col-md-4'></div>")
                                var date_visited_label=$("<label class='custom_label_css'>Date visited</label>");
                                var date_input=$("<label id='date_input' class='form-control-static'>"+newdate+"</label>")
                            colmd1.append(date_visited_label);
                            colmd2.append(date_input);

                        row__col_two__subrow.append(colmd1)
                        row__col_two__subrow.append(colmd2)
                    col_two__subrow.append(row__col_two__subrow)

                    var col_three__subrow=$("<div class='col-md-4'></div>");
                        var row__col_three__subrow=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-4'></div>")
                            var colmd2=$("<div class='col-md-4'></div>")
                                var invoice_label=$("<label class='custom_label_css'>Invoice Number</label>");
                                var invoice_input=$("<label id='invoice_label' class='form-control-static'>"+patPresRecordView_dict['invoice_no']+"</label>")
                            colmd1.append(invoice_label);
                            colmd2.append(invoice_input);
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

            if(Object.keys(patPresRecordView_dict).length !== 0){
                console.log("ssasdasd",patPresRecordView_dict);
                viewPrescriptionBillRow();
            }
            if(Object.keys(DespBillView_dict).length !== 0){
                console.log("DespBillView_dict>>>>>>>>",DespBillView_dict);
                viewDispensoryBillRow();
            }
            if(Object.keys(surgBillRecordView_dict).length !== 0){
                console.log("surgBillRecordView_dict>>>>>>>>",surgBillRecordView_dict);
                viewSurgeryBillRow();
            }
            if(Object.keys(procBillRecordView_dict).length !== 0){
                console.log("procBillRecordView_dict>>>>>>>>",procBillRecordView_dict);
                viewProcedureBillRow();
            }
            if(Object.keys(patRoomBillView_dict).length !== 0){
                console.log("patRoomBillView_dict>>>>>>>>",patRoomBillView_dict);
                viewRoomBillRow();
            }
            if(Object.keys(patWardBillView_dict).length !== 0){
                console.log("patWardBillView_dict>>>>>>>>",patWardBillView_dict);
                viewWardBillRow();
            }
            viewNetTotalAmountRow();
        }
    }); 
        
}
function viewPrescriptionBillRow(){

    var row_div_two=$("<div class='row' id='row_pres_bill'></div>");
        var main_subcol=$("<div class='col-md-12'></div>");
            
            var subrow_one=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_one=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var amount_label=$("<label for='amount_label_tag' class='custom_label_css'>Prescription Bill</label>");
                            var amount_val=$("<label id='amount_val' class='form-control-static'>"+patPresRecordView_dict['pres_bill']+"</label>")
                        colmd1.append(amount_label)
                        colmd2.append(amount_val)
                    row__col_one__subrow_one.append(colmd1);
                    row__col_one__subrow_one.append(colmd2);
                col_one__subrow_one.append(row__col_one__subrow_one);

            subrow_one.append(col_one__subrow_one)

            var subrow_two=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_two=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_two=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var status_label=$("<label class='custom_label_css'>Status</label>");
                            var status_val=$("<label id='status_val' class='form-control-static'>"+patPresRecordView_dict['status']+"</label>")
                        colmd1.append(status_label)
                        colmd2.append(status_val);
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

function viewDispensoryBillRow(){
    var row_div_three=$("<div class='row' id='row_disp_bill'></div>");
        var main_subcol=$("<div class='col-md-12'></div>");
            
            var subrow_one=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_one=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var desp_med_label=$("<label for='desp_med_label_tag' class='custom_label_css'>Despensory Medicines Bill</label>");
                            var desp_med_bill_label=$("<label id='desp_med_bill_label' class='form-control-static'>"+DespBillView_dict['desp_bill']+"</label>")
                        colmd1.append(desp_med_label)
                        colmd2.append(desp_med_bill_label)
                    row__col_one__subrow_one.append(colmd1);
                    row__col_one__subrow_one.append(colmd2);
                col_one__subrow_one.append(row__col_one__subrow_one);

            subrow_one.append(col_one__subrow_one)

            var subrow_two=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_two=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_two=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var addit_med_label=$("<label for='addit_med_label_tag' class='custom_label_css'>Additional Medicines Bill</label>");
                            var addit_med_bill_label=$("<label id='addit_med_bill_label' class='form-control-static'>"+DespBillView_dict['add_med_bill']+"</label>")
                        colmd1.append(addit_med_label)
                        colmd2.append(addit_med_bill_label)
                    row__col_one__subrow_two.append(colmd1);
                    row__col_one__subrow_two.append(colmd2);
                col_one__subrow_two.append(row__col_one__subrow_two);

            subrow_two.append(col_one__subrow_two)

            var subrow_three=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_three=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_three=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var actual_bill_label=$("<label for='actual_bill_label_tag' class='custom_label_css' >Total Despensory Bill</label>");
                            var actual_total_bill_input=$("<label id='Desp_amount_input' class='form-control-static'>"+DespBillView_dict['total_bill']+"</label>")

                        colmd1.append(actual_bill_label)
                        colmd2.append(actual_total_bill_input)
                    row__col_one__subrow_three.append(colmd1);
                    row__col_one__subrow_three.append(colmd2);
                col_one__subrow_three.append(row__col_one__subrow_three);

            subrow_three.append(col_one__subrow_three)

            var subrow_four=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_four=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_four=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var status_label=$("<label for='status_label_tag' class='custom_label_css'>Status</label>");
                            var status_val=$("<label id='desp_status' class='form-control-static'>"+DespBillView_dict['status']+"</label>")                                   
                        colmd1.append(status_label)
                        colmd2.append(status_val)
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

function viewSurgeryBillRow(){
    var row_div_four=$("<div class='row' id='row_surgery_bill'></div>");
    var main_subcol=$("<div class='col-md-12'></div>");

    for (key in surgBillRecordView_dict){
        var row_div=$("<div id='surg_no-"+key+"'>")
            var subrow_one=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_one=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var Surg_label=$("<label for='Surg_tag' class='custom_label_css'>Surgery Name</label>");
                            var surg_name_label=$("<label id='surg_name_label-"+key+"' class='form-control-static'>"+surgBillRecordView_dict[key]['surgery_name']+"</label>")
                        colmd1.append(Surg_label)
                        colmd2.append(surg_name_label)
                    row__col_one__subrow_one.append(colmd1);
                    row__col_one__subrow_one.append(colmd2);
                col_one__subrow_one.append(row__col_one__subrow_one);

            subrow_one.append(col_one__subrow_one)

            var subrow_two=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_two=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_two=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var SF_label=$("<label class='custom_label_css'>Surgeon Fee</label>");
                            var SF_val=$("<label id='sf_input-"+key+"' class='form-control-static'>"+surgBillRecordView_dict[key]['surgeon_fee']+"</label>")

                        colmd1.append(SF_label);
                        colmd2.append(SF_val);
                    row__col_one__subrow_two.append(colmd1);
                    row__col_one__subrow_two.append(colmd2);
                col_one__subrow_two.append(row__col_one__subrow_two);

            subrow_two.append(col_one__subrow_two)

            var subrow_seven=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_seven=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_seven=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var OTF_label=$("<label class='custom_label_css'>Operation Theatre Fee</label>");
                            var OTF_val=$("<label id='otf_input-"+key+"' class='form-control-static'>"+surgBillRecordView_dict[key]['OT_fee']+"</label>")

                        colmd1.append(OTF_label);
                        colmd2.append(OTF_val);
                    row__col_one__subrow_seven.append(colmd1);
                    row__col_one__subrow_seven.append(colmd2);
                col_one__subrow_seven.append(row__col_one__subrow_seven);

            subrow_seven.append(col_one__subrow_seven)

            var subrow_three=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_three=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_three=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var AF_label=$("<label for='AF_label' class='custom_label_css'>Anesthesiologist Fee</label>");
                            var AF_val=$("<label id='af_input-"+key+"' class='form-control-static'>"+surgBillRecordView_dict[key]['anest_fee']+"</label>")
                        colmd1.append(AF_label)
                        colmd2.append(AF_val)
                    row__col_one__subrow_three.append(colmd1);
                    row__col_one__subrow_three.append(colmd2);
                col_one__subrow_three.append(row__col_one__subrow_three);

            subrow_three.append(col_one__subrow_three)

            var subrow_eight=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_eight=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_eight=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var SF_label=$("<label for='SF_label' class='custom_label_css'>Surplus Charges</label>");
                            var SF_val=$("<label id='sc_input-"+key+"' class='form-control-static'>"+surgBillRecordView_dict[key]['surplus_fee']+"</label>")

                        colmd1.append(SF_label)
                        colmd2.append(SF_val)
                    row__col_one__subrow_eight.append(colmd1);
                    row__col_one__subrow_eight.append(colmd2);
                col_one__subrow_eight.append(row__col_one__subrow_eight);

            subrow_eight.append(col_one__subrow_eight)

            var subrow_four=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_four=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_four=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var total_label=$("<label class='custom_label_css'>Surgery Total</label>");
                            var total_Input=$("<label class='custom_label_css' id='surgery_input-"+key+"'>"+surgBillRecordView_dict[key]['net_total']+"</label>")
                        colmd1.append(total_label);
                        colmd2.append(total_Input);
                    row__col_one__subrow_four.append(colmd1);
                    row__col_one__subrow_four.append(colmd2);
                col_one__subrow_four.append(row__col_one__subrow_four);

            subrow_four.append(col_one__subrow_four)

            var subrow_five=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_five=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_five=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var status_label=$("<label class='custom_label_css'>Status</label>");
                            var status_val=$("<label id='surg_status-"+key+"' class='form-control-static'>"+surgBillRecordView_dict[key]['status']+"</label>")
                        colmd1.append(status_label);
                        colmd2.append(status_val);
                    row__col_one__subrow_five.append(colmd1);
                    row__col_one__subrow_five.append(colmd2);
                col_one__subrow_five.append(row__col_one__subrow_five);

            subrow_five.append(col_one__subrow_five)
        
        row_div.append(subrow_one)
        row_div.append(subrow_two)
        row_div.append(subrow_seven)
        row_div.append(subrow_three)
        row_div.append(subrow_eight)
        row_div.append(subrow_four)
        row_div.append(subrow_five)
        var hr= $("<hr class='custom_hr' style='color:red'>")
        $(row_div).append(hr);
        main_subcol.append(row_div)
    }
    var subrow_six=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

        var col_one__subrow_six=$("<div class='col-md-5'></div>");
            row__col_one__subrow_six=$("<div class='row'></div>");
                var colmd1=$("<div class='col-md-4'></div>")
                var colmd2=$("<div class='col-md-6'></div>")
                    var surgTotal_label=$("<label class='custom_label_css'>Surgery Sub Total</label>");
                    var surgTotal_Input=$("<label class='custom_label_css' id='surg_total'>"+totalSurgBill+"</label>")
                colmd1.append(surgTotal_label);
                colmd2.append(surgTotal_Input);
            row__col_one__subrow_six.append(colmd1);
            row__col_one__subrow_six.append(colmd2);
        col_one__subrow_six.append(row__col_one__subrow_six);

    subrow_six.append(col_one__subrow_six)
    main_subcol.append(subrow_six)


    row_div_four.append(main_subcol)
    var main_col_div=$("#main_col_div");
main_col_div.append(row_div_four);
}
function viewProcedureBillRow(){
    var row_div_five=$("<div class='row' id='row_procedure_bill'></div>");
        var main_subcol=$("<div class='col-md-12'></div>");
            
        for (key in procBillRecordView_dict){
            var row_div=$("<div id='proc_no-"+key+"'>")
                var subrow_one=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")
    
                    var col_one__subrow_one=$("<div class='col-md-5'></div>");
                        row__col_one__subrow_one=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-4'></div>")
                            var colmd2=$("<div class='col-md-3'></div>")
                                var Surg_label=$("<label for='Surg_tag' class='custom_label_css'>Procedure Name</label>");
                                var surg_name_label=$("<label id='proc_name_label-"+key+"' class='form-control-static'>"+procBillRecordView_dict[key]['procedure_name']+"</label>")
                            colmd1.append(Surg_label)
                            colmd2.append(surg_name_label)
                        row__col_one__subrow_one.append(colmd1);
                        row__col_one__subrow_one.append(colmd2);
                    col_one__subrow_one.append(row__col_one__subrow_one);
    
                subrow_one.append(col_one__subrow_one)
    
                var subrow_two=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")
    
                    var col_one__subrow_two=$("<div class='col-md-5'></div>");
                        row__col_one__subrow_two=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-4'></div>")
                            var colmd2=$("<div class='col-md-3'></div>")
                                var total_label=$("<label class='custom_label_css'>Procedure Fee</label>");
                                var total_val=$("<label id='proc_input-"+key+"' class='form-control-static'>"+procBillRecordView_dict[key]['net_total']+"</label>")
                            colmd1.append(total_label);
                            colmd2.append(total_val);
                        row__col_one__subrow_two.append(colmd1);
                        row__col_one__subrow_two.append(colmd2);
                    col_one__subrow_two.append(row__col_one__subrow_two);
    
                subrow_two.append(col_one__subrow_two)
    
                var subrow_three=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")
    
                    var col_one__subrow_three=$("<div class='col-md-5'></div>");
                        row__col_one__subrow_three=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-4'></div>")
                            var colmd2=$("<div class='col-md-3'></div>")
                                var status_label=$("<label class='custom_label_css'>Status</label>");
                                var status_val=$("<label id='proc_status-"+key+"' class='form-control-static'>"+procBillRecordView_dict[key]['status']+"</label>")

                            colmd1.append(status_label);
                            colmd2.append(status_val);
                        row__col_one__subrow_three.append(colmd1);
                        row__col_one__subrow_three.append(colmd2);
                    col_one__subrow_three.append(row__col_one__subrow_three);
                subrow_three.append(col_one__subrow_three)
            
            row_div.append(subrow_one)
            row_div.append(subrow_two)
            row_div.append(subrow_three)
            var hr= $("<hr class='custom_hr' style='color:red'>")
            $(row_div).append(hr);
            main_subcol.append(row_div)
        }
        var subrow_four=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")
    
            var col_one__subrow_four=$("<div class='col-md-5'></div>");
                row__col_one__subrow_four=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-4'></div>")
                    var colmd2=$("<div class='col-md-3'></div>")
                        var procTotal_label=$("<label class='custom_label_css'>Procedure Sub Total</label>");
                        var procTotal_Input=$("<label class='form-control-static' id='proc_total'>"+totalProcBill+"</label>")
                    colmd1.append(procTotal_label);
                    colmd2.append(procTotal_Input);
                row__col_one__subrow_four.append(colmd1);
                row__col_one__subrow_four.append(colmd2);
            col_one__subrow_four.append(row__col_one__subrow_four);

        subrow_four.append(col_one__subrow_four)
        main_subcol.append(subrow_four)


        row_div_five.append(main_subcol)

    var main_col_div=$("#main_col_div");
main_col_div.append(row_div_five);

}

function viewRoomBillRow(){
    var row_div_six=$("<div class='row' id='row_room_bill'></div>");
        var main_subcol=$("<div class='col-md-12'></div>");
            
            var subrow_one=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_one=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var floor_label=$("<label for='floor_tag' class='custom_label_css'>Floor Number</label>");
                            var floor_no_label=$("<label id='floor_no_label' class='form-control-static'>"+patRoomBillView_dict['floor']+"</label>")
                        colmd1.append(floor_label)
                        colmd2.append(floor_no_label)
                    row__col_one__subrow_one.append(colmd1);
                    row__col_one__subrow_one.append(colmd2);
                col_one__subrow_one.append(row__col_one__subrow_one);

            subrow_one.append(col_one__subrow_one)

            var subrow_two=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_two=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_two=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-4'></div>")
                    var colmd2=$("<div class='col-md-3'></div>")
                        var room_label=$("<label class='custom_label_css'>Room Number</label>");
                        var room_no_input=$("<label id='room_no_input' class='form-control-static'>"+patRoomBillView_dict['room_no']+"</label>")
                    colmd1.append(room_label);
                    colmd2.append(room_no_input);

                    row__col_one__subrow_two.append(colmd1);
                    row__col_one__subrow_two.append(colmd2);
                col_one__subrow_two.append(row__col_one__subrow_two);

            subrow_two.append(col_one__subrow_two)

            var subrow_three=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_three=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_three=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var charges_label=$("<label for='charges_tag' class='custom_label_css'>Room Charges/Day</label>");
                            var charges_per_day_label=$("<label id='charges_per_day_label' class='form-control-static'>"+patRoomBillView_dict['charge_per_day']+"</label>")
                        colmd1.append(charges_label)
                        colmd2.append(charges_per_day_label)
                    row__col_one__subrow_three.append(colmd1);
                    row__col_one__subrow_three.append(colmd2);
                col_one__subrow_three.append(row__col_one__subrow_three);

            subrow_three.append(col_one__subrow_three)

            var subrow_four=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_four=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_four=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var acCharge_label=$("<label class='custom_label_css'>AC Charges/Day</label>");
                            var acCharge_Per_day_label=$("<label id='acCharge_Per_day_label' class='form-control-static'>"+patRoomBillView_dict['ac_charge_per_day']+" </label>")
                        colmd1.append(acCharge_label);
                        colmd2.append(acCharge_Per_day_label);
                    row__col_one__subrow_four.append(colmd1);
                    row__col_one__subrow_four.append(colmd2);
                col_one__subrow_four.append(row__col_one__subrow_four);

            subrow_four.append(col_one__subrow_four)

            var subrow_five=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_five=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_five=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var totalDays_label=$("<label class='custom_label_css'>Days Stayed</label>");
                            var total_days_label=$("<label id='total_days_label' class='form-control-static'>"+patRoomBillView_dict['total_days']+" </label>")
                        colmd1.append(totalDays_label);
                        colmd2.append(total_days_label);
                    row__col_one__subrow_five.append(colmd1);
                    row__col_one__subrow_five.append(colmd2);
                col_one__subrow_five.append(row__col_one__subrow_five);

            subrow_five.append(col_one__subrow_five)

            var subrow_six=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_six=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_six=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var totalAmount_label=$("<label class='custom_label_css'>Total Amount</label>");
                            var total_amount_input=$("<label id='room_amount_input' class='form-control-static'>"+patRoomBillView_dict['total_bill']+" </label>")
                        colmd1.append(totalAmount_label);
                        colmd2.append(total_amount_input);
                    row__col_one__subrow_six.append(colmd1);
                    row__col_one__subrow_six.append(colmd2);
                col_one__subrow_six.append(row__col_one__subrow_six);

            subrow_six.append(col_one__subrow_six)

            var subrow_seven=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_seven=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_seven=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var status_label=$("<label class='custom_label_css'>Status</label>");
                            var status_val=$("<label id='room_status' class='form-control-static'>"+patRoomBillView_dict['status']+" </label>")

                        colmd1.append(status_label);
                        colmd2.append(status_val);
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

function viewWardBillRow(){
    var row_div_six=$("<div class='row' id='row_ward_bill'></div>");
        var main_subcol=$("<div class='col-md-12'></div>");
                    
            var subrow_one=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_one=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var Ward_label=$("<label for='Ward_tag' class='custom_label_css'>Ward Number</label>");
                            var ward_no_label=$("<label id='ward_no_label' class='form-control-static'>"+patWardBillView_dict['ward_no']+"</label>")
                        colmd1.append(Ward_label)
                        colmd2.append(ward_no_label)
                    row__col_one__subrow_one.append(colmd1);
                    row__col_one__subrow_one.append(colmd2);
                col_one__subrow_one.append(row__col_one__subrow_one);

            subrow_one.append(col_one__subrow_one)

            var subrow_two=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_two=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_two=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var bed_label=$("<label class='custom_label_css'>Bed Number</label>");
                            var bed_no_label=$("<label id='bed_no_label' class='form-control-static'>"+patWardBillView_dict['bed_no']+"</label>")
                        colmd1.append(bed_label);
                        colmd2.append(bed_no_label);
                    row__col_one__subrow_two.append(colmd1);
                    row__col_one__subrow_two.append(colmd2);
                col_one__subrow_two.append(row__col_one__subrow_two);

            subrow_two.append(col_one__subrow_two)

            var subrow_three=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_three=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_three=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var charges_label=$("<label for='charges_tag' class='custom_label_css'>Room Charges/Day</label>");
                            var charge_label=$("<label id='charge_label' class='form-control-static'>"+patWardBillView_dict['charge_per_day']+"</label>")
                        colmd1.append(charges_label)
                        colmd2.append(charge_label)
                    row__col_one__subrow_three.append(colmd1);
                    row__col_one__subrow_three.append(colmd2);
                col_one__subrow_three.append(row__col_one__subrow_three);

            subrow_three.append(col_one__subrow_three)

            var subrow_four=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_four=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_four=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var totalDays_label=$("<label class='custom_label_css'>Days Stayed</label>");
                            var total_days_label=$("<label id='total_days_label' class='form-control-static'>"+patWardBillView_dict['total_days']+" </label>")
                        colmd1.append(totalDays_label);
                        colmd2.append(total_days_label);
                    row__col_one__subrow_four.append(colmd1);
                    row__col_one__subrow_four.append(colmd2);
                col_one__subrow_four.append(row__col_one__subrow_four);

            subrow_four.append(col_one__subrow_four)

            var subrow_five=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_five=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_five=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var totalAmount_label=$("<label class='custom_label_css'>Total Amount</label>");
                            var total_amount_label=$("<label id='ward_amount_input' class='form-control-static'>"+patWardBillView_dict['total_bill']+" </label>")
                        colmd1.append(totalAmount_label);
                        colmd2.append(total_amount_label);
                    row__col_one__subrow_five.append(colmd1);
                    row__col_one__subrow_five.append(colmd2);
                col_one__subrow_five.append(row__col_one__subrow_five);

            subrow_five.append(col_one__subrow_five)

            var subrow_six=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_six=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_six=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var status_label=$("<label class='custom_label_css'>Status</label>");
                            var ward_status=$("<label id='ward_status' class='form-control-static'>"+patWardBillView_dict['status']+" </label>") 
                        colmd1.append(status_label);
                        colmd2.append(ward_status); 
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
function viewNetTotalAmountRow(){

    var row_div_last=$("<div class='row' id='total_amount_div'></div>");
        var main_subcol=$("<div class='col-md-12'></div>");

            var subrow_one=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_one=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var total_label=$("<label for='nettotal_label' class='custom_label_css'>Sub Total</label>");
                            var totalAmount_label=$("<label id='nettotal_label' class='form-control-static'>"+patPresRecordView_dict['total_bill']+"</label>")
                        colmd1.append(total_label)
                        colmd2.append(totalAmount_label)
                    row__col_one__subrow_one.append(colmd1);
                    row__col_one__subrow_one.append(colmd2);
                col_one__subrow_one.append(row__col_one__subrow_one);

            subrow_one.append(col_one__subrow_one)

            var subrow_two=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_two=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_two=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var status_label=$("<label for='status_label' class='custom_label_css'>Status</label>");
                            var status_val=$("<label id='invoice_status' class='form-control-static'>"+patPresRecordView_dict['status']+"</label>")
                        colmd1.append(status_label)
                        colmd2.append(status_val)
                    row__col_one__subrow_two.append(colmd1);
                    row__col_one__subrow_two.append(colmd2);
                col_one__subrow_two.append(row__col_one__subrow_two);

            subrow_two.append(col_one__subrow_two)

            var subrow_three=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_three=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_three=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                            var updateBtn_label=$('<button class="btn btn-success btn-sm btn-block" id="update_bttn" onclick="PrintInvoice()">Print Bill</button>');
                        colmd1.append(updateBtn_label)
                    row__col_one__subrow_three.append(colmd1);
                col_one__subrow_three.append(row__col_one__subrow_three);

            subrow_three.append(col_one__subrow_three)

        main_subcol.append(subrow_one)
        main_subcol.append(subrow_two)
        main_subcol.append(subrow_three)

        row_div_last.append(main_subcol)
    var main_col_div=$("#main_col_div");
    main_col_div.append(row_div_last);

} 
function PrintInvoice(){
    var printcontent = $("#main_col_div").clone();
    $('#search_row_div').hide();
    $('#sidebar').hide();
    $('#update_bttn').hide();
    $('#dialog-confirm').hide();

    $('#invoice_bill_div').empty().html(printcontent);
    
    window.print();
    window.close();

    $('#invoice_bill_div').empty();
    $('#search_row_div').show();
    $('#sidebar').show();
    $('#update_bttn').show();

}