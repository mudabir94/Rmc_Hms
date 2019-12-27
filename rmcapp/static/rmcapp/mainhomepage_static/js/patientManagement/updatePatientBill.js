var prescription_id;
var patRoomBill_dict={};
var patWardBill_dict={};
var surgBillRecord_dict={};
var procBillRecord_dict={};
var patPresRecord_dict={};
var DespBill_dict={};
var netTotal;
var status_list=['Paid', 'NotPaid']

function updatePatientBill(){
    // $("#pat_details_div").remove();
    // $("#row_pres_bill").remove();
    // $("#row_disp_bill").remove();
    // $("#row_surgery_bill").remove();
    // $("#row_procedure_bill").remove();
    // $("#row_room_bill").remove();
    // $("#row_ward_bill").remove();
    // $("#total_amount_div").remove();

    $('#main_page_content').empty()
    $('#main_col_div').empty()

    var container= $('#main_page_content').append('<div class="container-fluid" id="container_pat_surg_proc_bill"></div>');
    $("#container_pat_surg_proc_bill").append("<h2 class ='text-center'>Update Patient Bill</h2>");
    $("#container_pat_surg_proc_bill").append("<hr class='custom_hr'>");

    var main_row_div= $("<div class='row is-flex'></div>");

    $(container).append(main_row_div);
    var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");
       
        $(main_row_div).append(main_col_div);

            var row_div_one=$("<div class='row'></div>");
                var col_one__row_div_one=$("<div class='col-md-12'></div>");
                row__col_one__row_div_one=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-1'></div>")
                    colmd2=$("<div class='col-md-2'></div>")
                    colmd3=$("<div class='col-md-2'></div>")

                    pres_id_label=$("<label class='custom_label_css'>Prescription id</label>");
                    colmd1.append(pres_id_label)

                    pres_id_input=$("<input class='form-control custom_input_css' id='pres_id_input' >")
                    colmd2.append(pres_id_input);

                    var search_button=$('<button class="btn btn-block fa fa-search" onclick="retrieveInvoiceBillRecord()">Search Bill</button>');
                    colmd3.append(search_button);

                row__col_one__row_div_one.append(colmd1);
                row__col_one__row_div_one.append(colmd2);
                row__col_one__row_div_one.append(colmd3);

                col_one__row_div_one.append(row__col_one__row_div_one);
            row_div_one.append(col_one__row_div_one);
        $(main_col_div).append(row_div_one);

}

function retrieveInvoiceBillRecord(){
    $("#pat_details_div").remove();
    $("#row_pres_bill").remove();
    $("#row_disp_bill").remove();
    $("#row_surgery_bill").remove();
    $("#row_procedure_bill").remove();
    $("#row_room_bill").remove();
    $("#row_ward_bill").remove();
    $("#total_amount_div").remove();
    $("#btn_div").remove();

    

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
            patRoomBill_dict=JSON.parse(data["patRoomBill_dict"])
            patWardBill_dict=JSON.parse(data["patWardBill_dict"])
            surgBillRecord_dict=JSON.parse(data["surgBillRecord_dict"])
            procBillRecord_dict=JSON.parse(data["procBillRecord_dict"])
            patPresRecord_dict=JSON.parse(data["patPresRecord_dict"])
            DespBill_dict=JSON.parse(data["DespBill_dict"])
            
            var dt= new Date(patPresRecord_dict['date_visited']);
            var newdate=dt.toISOString().split('T')[0];


            var row_div_mid=$("<div class='row' id='pat_details_div'></div>");
                var main_subcol=$("<div class='col-md-12'></div>");

                var subrow=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                    var col_one__subrow=$("<div class='col-md-4'></div>");
                        row__col_one__subrow=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-6'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var pat_name_label=$("<label for='pat_name_tag' class='custom_label_css float-right' style='text-decoration:underline;'>Patient Name:</label>");
                                var pat_name_input=$("<label id='pat_name_input' class='form-control-static'>"+patPresRecord_dict['pat_name']+"</label>")
                            colmd1.append(pat_name_label)
                            colmd2.append(pat_name_input)
                        row__col_one__subrow.append(colmd1);
                        row__col_one__subrow.append(colmd2);
                    col_one__subrow.append(row__col_one__subrow);

                    var col_two__subrow=$("<div class='col-md-4'></div>");
                        var row__col_two__subrow=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-6'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var date_visited_label=$("<label class='custom_label_css float-right' style='text-decoration:underline;'>Date visited:</label>");
                                var date_input=$("<label id='date_input' class='form-control-static'>"+newdate+"</label>")
                            colmd1.append(date_visited_label);
                            colmd2.append(date_input);

                        row__col_two__subrow.append(colmd1)
                        row__col_two__subrow.append(colmd2)
                    col_two__subrow.append(row__col_two__subrow)

                    var col_three__subrow=$("<div class='col-md-4'></div>");
                        var row__col_three__subrow=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-7'></div>")
                            var colmd2=$("<div class='col-md-5'></div>")
                                var invoice_label=$("<label class='custom_label_css float-right' style='text-decoration:underline;'>Invoice Number:</label>");
                                var invoice_input=$("<label id='invoice_label' class='form-control-static'>"+patPresRecord_dict['invoice_no']+"</label>")
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

            if(Object.keys(patPresRecord_dict).length !== 0){
                console.log("ssasdasd",patPresRecord_dict);
                createPrescriptionBillRow();
            }
            if(Object.keys(DespBill_dict).length !== 0){
                console.log("DespBill_dict>>>>>>>>",DespBill_dict);
                createDispensoryBillRow();
            }
            if(Object.keys(surgBillRecord_dict).length !== 0){
                console.log("surgBillRecord_dict>>>>>>>>",surgBillRecord_dict);
                createSurgeryBillRow();
            }
            if(Object.keys(procBillRecord_dict).length !== 0){
                console.log("procBillRecord_dict>>>>>>>>",procBillRecord_dict);
                createProcedureBillRow();
            }
            if(Object.keys(patRoomBill_dict).length !== 0){
                console.log("patRoomBill_dict>>>>>>>>",patRoomBill_dict);
                createRoomBillRow();
            }
            if(Object.keys(patWardBill_dict).length !== 0){
                console.log("patWardBill_dict>>>>>>>>",patWardBill_dict);
                createWardBillRow();
            }
            netTotalAmountRow();
            updateButtonRow();
        }
    }); 
        
}

function createPrescriptionBillRow(){

    var row_div_two=$("<div class='row' id='row_pres_bill'></div>");
        var main_subcol=$("<div class='col-md-12'></div>");
            
            var subrow_zero=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px; '></div>")

                var col_one__subrow_zero=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_zero=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-6 offset-md-1'></div>")
                            var pres_label=$("<label for='heading_tag' class='custom_label_css' style='text-decoration:underline;'>Prescription Details</label>");
                        colmd1.append(pres_label)
                    row__col_one__subrow_zero.append(colmd1);
                col_one__subrow_zero.append(row__col_one__subrow_zero);

            subrow_zero.append(col_one__subrow_zero)
        
            var subrow_one=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_one=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-3'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var amount_label=$("<label for='amount_label_tag' class='custom_label_css'>Prescription Bill</label>");
                            var amount_input=$("<input id='pres_amount_input' class='form-control custom_input_css' onfocusin='valueFocusInPres()' onfocusout='valueFocusOutPres($(this))' value="+patPresRecord_dict['pres_bill']+" >")
                        colmd1.append(amount_label)
                        colmd2.append(amount_input)
                    row__col_one__subrow_one.append(colmd1);
                    row__col_one__subrow_one.append(colmd2);
                col_one__subrow_one.append(row__col_one__subrow_one);

            subrow_one.append(col_one__subrow_one)

            var subrow_two=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_two=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_two=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-3'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var status_label=$("<label class='custom_label_css'>Status</label>");
                            var select=$("<select id='pres_status' class='form-control' style='font-size: inherit;'></select>");
                                    
                                if (patPresRecord_dict['status']==='Paid'){
                                
                                    var option=$("<option id="+status_list[0]+"-opt value='"+status_list[0]+"'>"+status_list[0]+"</option>");
                                    $(select).append(option);
                                    var option1=$("<option id="+status_list[1]+"-opt value='"+status_list[1]+"' >"+status_list[1]+"</option>");
                                    $(select).append(option1);          
                                }
                                else{
                                    var option=$("<option id="+status_list[1]+"-opt value='"+status_list[1]+"'>"+status_list[1]+"</option>");
                                    $(select).append(option);
                                    var option1=$("<option id="+status_list[0]+"-opt value='"+status_list[0]+"'>"+status_list[0]+"</option>");
                                    $(select).append(option1);          
                                }            
                        colmd1.append(status_label)
                        colmd2.append(select);
                    row__col_one__subrow_two.append(colmd1);
                    row__col_one__subrow_two.append(colmd2);
                col_one__subrow_two.append(row__col_one__subrow_two);

            subrow_two.append(col_one__subrow_two)
           
        main_subcol.append(subrow_zero)
        main_subcol.append(subrow_one)
        main_subcol.append(subrow_two)

        row_div_two.append(main_subcol)
    var main_col_div=$("#main_col_div");
main_col_div.append(row_div_two);

}
function createDispensoryBillRow(){
    var row_div_three=$("<div class='row' id='row_disp_bill'></div>");
        var main_subcol=$("<div class='col-md-12'></div>");

            var subrow_zero=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px; '></div>")

                var col_one__subrow_zero=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_zero=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-6 offset-md-1'></div>")
                            var desp_label=$("<label for='heading_tag' class='custom_label_css' style='text-decoration:underline;'>Despensory Bill Details</label>");
                        colmd1.append(desp_label)
                    row__col_one__subrow_zero.append(colmd1);
                col_one__subrow_zero.append(row__col_one__subrow_zero);

            subrow_zero.append(col_one__subrow_zero)
            
            var subrow_one=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_one=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_one=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-3'></div>")
                    var colmd2=$("<div class='col-md-3'></div>")
                            var desp_med_label=$("<label for='desp_med_label_tag' class='custom_label_css'>Despensory Medicines Bill</label>");
                            var desp_med_bill_label=$("<label id='desp_med_bill_label' class='form-control-static'>"+DespBill_dict['desp_bill']+"</label>")
                        colmd1.append(desp_med_label)
                        colmd2.append(desp_med_bill_label)
                    row__col_one__subrow_one.append(colmd1);
                    row__col_one__subrow_one.append(colmd2);
                col_one__subrow_one.append(row__col_one__subrow_one);

            subrow_one.append(col_one__subrow_one)

            var subrow_two=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_two=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_two=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-3'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var addit_med_label=$("<label for='addit_med_label_tag' class='custom_label_css'>Additional Medicines Bill</label>");
                            var addit_med_bill_label=$("<label id='addit_med_bill_label' class='form-control-static'>"+DespBill_dict['add_med_bill']+"</label>")
                        colmd1.append(addit_med_label)
                        colmd2.append(addit_med_bill_label)
                    row__col_one__subrow_two.append(colmd1);
                    row__col_one__subrow_two.append(colmd2);
                col_one__subrow_two.append(row__col_one__subrow_two);

            subrow_two.append(col_one__subrow_two)

            var subrow_three=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_three=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_three=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-3'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var actual_bill_label=$("<label for='actual_bill_label_tag' class='custom_label_css' >Total Despensory Bill</label>");
                            var actual_total_bill_input=$("<input class='form-control custom_input_css' id='Desp_amount_input' onfocusin='valueFocusInDesp()' onfocusout='valueFocusOutDesp($(this))' value="+DespBill_dict['total_bill']+">")
                        colmd1.append(actual_bill_label)
                        colmd2.append(actual_total_bill_input)
                    row__col_one__subrow_three.append(colmd1);
                    row__col_one__subrow_three.append(colmd2);
                col_one__subrow_three.append(row__col_one__subrow_three);

            subrow_three.append(col_one__subrow_three)

            var subrow_four=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_four=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_four=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-3'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var status_label=$("<label for='status_label_tag' class='custom_label_css'>Status</label>");
                            var select=$("<select id='desp_status' class='form-control' style='font-size: inherit;'></select>");
                                    
                                if (DespBill_dict['status']==='Paid'){
                                    var option=$("<option id="+status_list[0]+"-opt value='"+status_list[0]+"'>"+status_list[0]+"</option>");
                                    $(select).append(option);
                                    var option1=$("<option id="+status_list[1]+"-opt value='"+status_list[1]+"' >"+status_list[1]+"</option>");
                                    $(select).append(option1);          
                                }
                                else{
                                    var option=$("<option id="+status_list[1]+"-opt value='"+status_list[1]+"'>"+status_list[1]+"</option>");
                                    $(select).append(option);
                                    var option1=$("<option id="+status_list[0]+"-opt value='"+status_list[0]+"'>"+status_list[0]+"</option>");
                                    $(select).append(option1);          
                                }            
                        colmd1.append(status_label)
                        colmd2.append(select)
                    row__col_one__subrow_four.append(colmd1);
                    row__col_one__subrow_four.append(colmd2);
                col_one__subrow_four.append(row__col_one__subrow_four);

            subrow_four.append(col_one__subrow_four)
           
        main_subcol.append(subrow_zero)
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

        var subrow_zero=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px; '></div>")

            var col_one__subrow_zero=$("<div class='col-md-12'></div>");
                row__col_one__subrow_zero=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-6 offset-md-1'></div>")
                        var surg_label=$("<label for='heading_tag' class='custom_label_css' style='text-decoration:underline;'>Surgery Bill Details</label>");
                    colmd1.append(surg_label)
                row__col_one__subrow_zero.append(colmd1);
            col_one__subrow_zero.append(row__col_one__subrow_zero);

        subrow_zero.append(col_one__subrow_zero)
    main_subcol.append(subrow_zero)

    for (key in surgBillRecord_dict){
        var row_div=$("<div id='surg_no-"+key+"'>")
            var subrow_one=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_one=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-3'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var Surg_label=$("<label for='Surg_tag' class='custom_label_css'>Surgery Name</label>");
                            var surg_name_label=$("<label id='surg_name_label-"+key+"' class='form-control-static'>"+surgBillRecord_dict[key]['surgery_name']+"</label>")
                        colmd1.append(Surg_label)
                        colmd2.append(surg_name_label)
                    row__col_one__subrow_one.append(colmd1);
                    row__col_one__subrow_one.append(colmd2);
                col_one__subrow_one.append(row__col_one__subrow_one);

            subrow_one.append(col_one__subrow_one)

            var subrow_two=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_two=$("<div class='col-md-6'></div>");
                    row__col_one__subrow_two=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-6'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var SF_label=$("<label class='custom_label_css'>Surgeon Fee</label>");
                            var SF_input=$("<input class='form-control custom_input_css' id='sf_input-"+key+"' onfocusin='valueFocusInSF($(this))' onfocusout='valueFocusOutSF($(this))' value='"+surgBillRecord_dict[key]['surgeon_fee']+"'>")
                        colmd1.append(SF_label);
                        colmd2.append(SF_input);
                    row__col_one__subrow_two.append(colmd1);
                    row__col_one__subrow_two.append(colmd2);
                col_one__subrow_two.append(row__col_one__subrow_two);

                var col_two__subrow_two=$("<div class='col-md-6'></div>");
                    var row__col_two__subrow_two=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-6'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var OTF_label=$("<label class='custom_label_css float-right'>Operation Theatre Fee</label>");
                            var OTF_input=$("<input class='form-control custom_input_css' id='otf_input-"+key+"' onfocusin='valueFocusInOTF($(this))' onfocusout='valueFocusOutOTF($(this))' value='"+surgBillRecord_dict[key]['OT_fee']+"'>")

                        colmd1.append(OTF_label);
                        colmd2.append(OTF_input);

                    row__col_two__subrow_two.append(colmd1)
                    row__col_two__subrow_two.append(colmd2)
                col_two__subrow_two.append(row__col_two__subrow_two)

            subrow_two.append(col_one__subrow_two)
            subrow_two.append(col_two__subrow_two)

            var subrow_three=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_three=$("<div class='col-md-6'></div>");
                    row__col_one__subrow_three=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-6'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var AF_label=$("<label for='AF_label' class='custom_label_css'>Anesthesiologist Fee</label>");
                            var AF_input=$("<input class='form-control custom_input_css' id='af_input-"+key+"' onfocusin='valueFocusInAF($(this))' onfocusout='valueFocusOutAF($(this))' value='"+surgBillRecord_dict[key]['anest_fee']+"'>")
                        colmd1.append(AF_label)
                        colmd2.append(AF_input)
                    row__col_one__subrow_three.append(colmd1);
                    row__col_one__subrow_three.append(colmd2);
                col_one__subrow_three.append(row__col_one__subrow_three);

                var col_two__subrow_three=$("<div class='col-md-6'></div>");
                    row__col_two__subrow_three=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-6'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var SF_label=$("<label for='SF_label' class='custom_label_css float-right'>Surplus Charges</label>");
                            var SF_input=$("<input class='form-control custom_input_css' id='sc_input-"+key+"' onfocusin='valueFocusInSC($(this))' onfocusout='valueFocusOutSC($(this))' value='"+surgBillRecord_dict[key]['surplus_fee']+"'>")

                        colmd1.append(SF_label)
                        colmd2.append(SF_input)
                    row__col_two__subrow_three.append(colmd1);
                    row__col_two__subrow_three.append(colmd2);
                col_two__subrow_three.append(row__col_two__subrow_three);

            subrow_three.append(col_one__subrow_three)
            subrow_three.append(col_two__subrow_three)

            var subrow_four=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_four=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_four=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-3'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var total_label=$("<label class='custom_label_css'>Surgery Total</label>");
                            var total_Input=$("<label class='custom_label_css' id='surgery_input-"+key+"'>"+surgBillRecord_dict[key]['net_total']+"</label>")
                        colmd1.append(total_label);
                        colmd2.append(total_Input);
                    row__col_one__subrow_four.append(colmd1);
                    row__col_one__subrow_four.append(colmd2);
                col_one__subrow_four.append(row__col_one__subrow_four);

            subrow_four.append(col_one__subrow_four)

            var subrow_five=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_five=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_five=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-3'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var status_label=$("<label class='custom_label_css'>Status</label>");
                            var select=$("<select id='surg_status-"+key+"' class='form-control' style='font-size: inherit;'></select>");
                                    
                            if (surgBillRecord_dict[key]['status']==='Paid'){
                                var option=$("<option id="+status_list[0]+"-opt value='"+status_list[0]+"'>"+status_list[0]+"</option>");
                                $(select).append(option);
                                var option1=$("<option id="+status_list[1]+"-opt value='"+status_list[1]+"' >"+status_list[1]+"</option>");
                                $(select).append(option1);          
                            }
                            else{
                                var option=$("<option id="+status_list[1]+"-opt value='"+status_list[1]+"'>"+status_list[1]+"</option>");
                                $(select).append(option);
                                var option1=$("<option id="+status_list[0]+"-opt value='"+status_list[0]+"'>"+status_list[0]+"</option>");
                                $(select).append(option1);          
                            }                               
                        colmd1.append(status_label);
                        colmd2.append(select);
                    row__col_one__subrow_five.append(colmd1);
                    row__col_one__subrow_five.append(colmd2);
                col_one__subrow_five.append(row__col_one__subrow_five);

            subrow_five.append(col_one__subrow_five)
        
        row_div.append(subrow_one)
        row_div.append(subrow_two)
        row_div.append(subrow_three)
        row_div.append(subrow_four)
        row_div.append(subrow_five)
        var hr= $("<hr class='custom_hr' style='color:red'>")
        $(row_div).append(hr);
        main_subcol.append(row_div)
    }
    var subrow_six=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")
    
        var col_one__subrow_six=$("<div class='col-md-12'></div>");
            row__col_one__subrow_six=$("<div class='row'></div>");
                var colmd1=$("<div class='col-md-3'></div>")
                var colmd2=$("<div class='col-md-3'></div>")
                    var surgTotal_label=$("<label class='custom_label_css'>Surgery Sub Total</label>");
                    var surgTotal_Input=$("<label class='custom_label_css' id='surg_total'>"+surgBillRecord_dict[key]['all_surg_amount']+"</label>")
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
var sgt=0
function valueFocusInSF(element){
    var id=$(element).attr('id')
    var arr_id=id.split("-")
    id= arr_id[1]
    var sf= $("#sf_input-"+id+"").val();
    console.log("id", id)
    sf=parseInt(sf)
    console.log("sf", sf)

    var surg_sub_total=$("#surgery_input-"+id+"").text();
    console.log("surg_sub_total", surg_sub_total)
    surg_sub_total=parseInt(surg_sub_total)

    var net_total=$("#nettotal_label").text();
    net_total=parseInt(net_total)

    sgt= surg_sub_total-sf;
    net_total=net_total-sf;
    subTotal=net_total;

    console.log("sgt--",sgt);
}
function valueFocusOutSF(element){
    var id=$(element).attr('id')
    var arr_id=id.split("-")
    id= arr_id[1]
    var newSF=  $("#sf_input-"+id+"").val();
    newSF=parseInt(newSF)

    if (newSF===""){
        newSF=0
        sgt= sgt+newSF;
        console.log("sgt1111111111",sgt);

        $("#sf_input-"+id+"").val('0');
    }
    sgt= sgt+newSF;
    net_total=newSF+subTotal
    $("#nettotal_label").text(net_total);
    console.log("totalAmount",sgt);
    $("#surgery_input-"+id+"").text(sgt);
    $("#surg_total").text(sgt);

}
function valueFocusInOTF(element){
    var id=$(element).attr('id')
    var arr_id=id.split("-")
    id= arr_id[1]
    var otf= $("#otf_input-"+id+"").val();
    console.log("id", id)
    otf=parseInt(otf)

    var surg_sub_total=$("#surgery_input-"+id+"").text();
    console.log("surg_sub_total", surg_sub_total)
    surg_sub_total=parseInt(surg_sub_total)

    var net_total=$("#nettotal_label").text();
    net_total=parseInt(net_total)

    sgt= surg_sub_total-otf;
    net_total=net_total-otf;
    subTotal=net_total;

    console.log("sgt--",sgt);
}
function valueFocusOutOTF(element){
    var id=$(element).attr('id')
    var arr_id=id.split("-")
    id= arr_id[1]
    var newOTF=  $("#otf_input-"+id+"").val();
    newOTF=parseInt(newOTF)
    if (newOTF===""){
        newOTF=0
        sgt= sgt+newOTF;
        console.log("sgt1111111111",sgt);

        $("#otf_input-"+id+"").val('0');
    }
    sgt= sgt+newOTF;
    net_total=newOTF+subTotal
    $("#nettotal_label").text(net_total);
    console.log("totalAmount",sgt);
    $("#surgery_input-"+id+"").text(sgt);
    $("#surg_total").text(sgt);

}
function valueFocusInAF(element){
    var id=$(element).attr('id')
    var arr_id=id.split("-")
    id= arr_id[1]
    var af= $("#af_input-"+id+"").val();
    console.log("id", id)
    af=parseInt(af)

    var surg_sub_total=$("#surgery_input-"+id+"").text();
    console.log("surg_sub_total", surg_sub_total)
    surg_sub_total=parseInt(surg_sub_total)

    var net_total=$("#nettotal_label").text();
    net_total=parseInt(net_total)

    sgt= surg_sub_total-af;
    net_total=net_total-af;
    subTotal=net_total;

    console.log("sgt--",sgt);
}
function valueFocusOutAF(element){
    var id=$(element).attr('id')
    var arr_id=id.split("-")
    id= arr_id[1]
    var newAF=  $("#af_input-"+id+"").val();
    newAF=parseInt(newAF)
    if (newAF===""){
        newAF=0
        sgt= sgt+newAF;
        console.log("sgt1111111111",sgt);

        $("#af_input-"+id+"").val('0');
    }
    sgt= sgt+newAF;
    net_total=newAF+subTotal
    $("#nettotal_label").text(net_total);
    console.log("totalAmount",sgt);
    $("#surgery_input-"+id+"").text(sgt);
    $("#surg_total").text(sgt);

}
function valueFocusInSC(element){
    var id=$(element).attr('id')
    var arr_id=id.split("-")
    id= arr_id[1]
    var sc= $("#sc_input-"+id+"").val();
    console.log("id", id)
    sc=parseInt(sc)

    var surg_sub_total=$("#surgery_input-"+id+"").text();
    console.log("surg_sub_total", surg_sub_total)
    surg_sub_total=parseInt(surg_sub_total)

    var net_total=$("#nettotal_label").text();
    net_total=parseInt(net_total)

    sgt= surg_sub_total-sc;
    net_total=net_total-sc;
    subTotal=net_total;

    console.log("sgt--",sgt);
}
function valueFocusOutSC(element){
    var id=$(element).attr('id')
    var arr_id=id.split("-")
    id= arr_id[1]
    var newSC=  $("#sc_input-"+id+"").val();
    newSC=parseInt(newSC)
    if (newSC===""){
        newSC=0
        sgt= sgt+newSC;
        console.log("sgt1111111111",sgt);

        $("#sc_input-"+id+"").val('0');
    }
    sgt= sgt+newSC;
    net_total=newSC+subTotal
    $("#nettotal_label").text(net_total);

    console.log("totalAmount",sgt);
    $("#surgery_input-"+id+"").text(sgt);
    $("#surg_total").text(sgt);

}
function createProcedureBillRow(){
    var row_div_five=$("<div class='row' id='row_procedure_bill'></div>");
        var main_subcol=$("<div class='col-md-12'></div>");

        var subrow_zero=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px; '></div>")

                var col_one__subrow_zero=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_zero=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-6 offset-md-1'></div>")
                            var proc_label=$("<label for='heading_tag' class='custom_label_css' style='text-decoration:underline;'>Procedure Bill Details</label>");
                        colmd1.append(proc_label)
                    row__col_one__subrow_zero.append(colmd1);
                col_one__subrow_zero.append(row__col_one__subrow_zero);

            subrow_zero.append(col_one__subrow_zero)
        main_subcol.append(subrow_zero)
            
        for (key in procBillRecord_dict){
            var row_div=$("<div id='proc_no-"+key+"'>")
                var subrow_one=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")
    
                    var col_one__subrow_one=$("<div class='col-md-12'></div>");
                        row__col_one__subrow_one=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-3'></div>")
                            var colmd2=$("<div class='col-md-3'></div>")
                                var Surg_label=$("<label for='Surg_tag' class='custom_label_css'>Procedure Name</label>");
                                var surg_name_label=$("<label id='proc_name_label-"+key+"' class='form-control-static'>"+procBillRecord_dict[key]['procedure_name']+"</label>")
                            colmd1.append(Surg_label)
                            colmd2.append(surg_name_label)
                        row__col_one__subrow_one.append(colmd1);
                        row__col_one__subrow_one.append(colmd2);
                    col_one__subrow_one.append(row__col_one__subrow_one);
    
                subrow_one.append(col_one__subrow_one)
    
                var subrow_two=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")
    
                    var col_one__subrow_two=$("<div class='col-md-12'></div>");
                        row__col_one__subrow_two=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-3'></div>")
                            var colmd2=$("<div class='col-md-3'></div>")
                                var total_label=$("<label class='custom_label_css'>Procedure Fee</label>");
                                var total_Input=$("<input class='form-control custom_input_css' id='proc_input-"+key+"' onfocusin='valueFocusInProcFee($(this))' onfocusout='valueFocusOutProcFee($(this))' value='"+procBillRecord_dict[key]['net_total']+"'>")
                            colmd1.append(total_label);
                            colmd2.append(total_Input);
                        row__col_one__subrow_two.append(colmd1);
                        row__col_one__subrow_two.append(colmd2);
                    col_one__subrow_two.append(row__col_one__subrow_two);
    
                subrow_two.append(col_one__subrow_two)
    
                var subrow_three=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")
    
                    var col_one__subrow_three=$("<div class='col-md-12'></div>");
                        row__col_one__subrow_three=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-3'></div>")
                            var colmd2=$("<div class='col-md-3'></div>")
                                var status_label=$("<label class='custom_label_css'>Status</label>");
                                var select=$("<select id='proc_status-"+key+"' class='form-control' style='font-size: inherit;'></select>");
                                        
                                    if (procBillRecord_dict[key]['status']==='Paid'){
                                        var option=$("<option id="+status_list[0]+"-opt value='"+status_list[0]+"'>"+status_list[0]+"</option>");
                                        $(select).append(option);
                                        var option1=$("<option id="+status_list[1]+"-opt value='"+status_list[1]+"' >"+status_list[1]+"</option>");
                                        $(select).append(option1);          
                                    }
                                    else{
                                        var option=$("<option id="+status_list[1]+"-opt value='"+status_list[1]+"'>"+status_list[1]+"</option>");
                                        $(select).append(option);
                                        var option1=$("<option id="+status_list[0]+"-opt value='"+status_list[0]+"'>"+status_list[0]+"</option>");
                                        $(select).append(option1);          
                                    }                               
                            colmd1.append(status_label);
                            colmd2.append(select);
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
    
            var col_one__subrow_four=$("<div class='col-md-12'></div>");
                row__col_one__subrow_four=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-3'></div>")
                    var colmd2=$("<div class='col-md-3'></div>")
                        var procTotal_label=$("<label class='custom_label_css'>Procedure Sub Total</label>");
                        var procTotal_Input=$("<label class='form-control-static' id='proc_total'>"+procBillRecord_dict[key]['all_proc_amount']+"</label>")
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
var pgt=0
function valueFocusInProcFee(element){
    var id=$(element).attr('id')
    var arr_id=id.split("-")
    id= arr_id[1]
    var procFee= $("#proc_input-"+id+"").val();
    console.log("id", id)
    procFee=parseInt(procFee)

    var proc_sub_total=$("#proc_total").text();
    console.log("proc_sub_total", proc_sub_total)

    var net_total=$("#nettotal_label").text();
    net_total=parseInt(net_total)

    proc_sub_total=parseInt(proc_sub_total)
    pgt= proc_sub_total-procFee;
    net_total=net_total-procFee;
    subTotal=net_total;

    console.log("pgt--",pgt);
}
function valueFocusOutProcFee(element){
    var id=$(element).attr('id')
    var arr_id=id.split("-")
    id= arr_id[1]
    var newProcFee=  $("#proc_input-"+id+"").val();
    newProcFee=parseInt(newProcFee)
    var net_total=$("#nettotal_label").text();

    if (newProcFee===""){
        newProcFee=0
        pgt= pgt+newProcFee;
        console.log("pgt",pgt);

        $("#proc_input-"+id+"").val('0');
    }
    pgt= pgt+newProcFee;
    net_total=newProcFee+subTotal
    $("#nettotal_label").text(net_total);
    console.log("totalAmount",pgt);
    console.log("net_total",net_total);

    $("#proc_total").text(pgt);
}
function createRoomBillRow(){
    var row_div_six=$("<div class='row' id='row_room_bill'></div>");
        var main_subcol=$("<div class='col-md-12'></div>");

            var subrow_zero=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px; '></div>")

                var col_one__subrow_zero=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_zero=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-6 offset-md-1'></div>")
                            var roomHead_label=$("<label for='heading_tag' class='custom_label_css' style='text-decoration:underline;'>Room Bill Details</label>");
                        colmd1.append(roomHead_label)
                    row__col_one__subrow_zero.append(colmd1);
                col_one__subrow_zero.append(row__col_one__subrow_zero);

            subrow_zero.append(col_one__subrow_zero)
            
            var subrow_one=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_one=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-3'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var floor_label=$("<label for='floor_tag' class='custom_label_css'>Floor Number</label>");
                            var floor_no_label=$("<label id='floor_no_label' class='form-control-static'>"+patRoomBill_dict['floor']+"</label>")
                        colmd1.append(floor_label)
                        colmd2.append(floor_no_label)
                    row__col_one__subrow_one.append(colmd1);
                    row__col_one__subrow_one.append(colmd2);
                col_one__subrow_one.append(row__col_one__subrow_one);

            subrow_one.append(col_one__subrow_one)

            var subrow_two=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_two=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_two=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-3'></div>")
                    var colmd2=$("<div class='col-md-3'></div>")
                        var room_label=$("<label class='custom_label_css'>Room Number</label>");
                        var room_no_input=$("<label id='room_no_input' class='form-control-static'>"+patRoomBill_dict['room_no']+"</label>")
                    colmd1.append(room_label);
                    colmd2.append(room_no_input);

                    row__col_one__subrow_two.append(colmd1);
                    row__col_one__subrow_two.append(colmd2);
                col_one__subrow_two.append(row__col_one__subrow_two);

            subrow_two.append(col_one__subrow_two)

            var subrow_three=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_three=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_three=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-3'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var charges_label=$("<label for='charges_tag' class='custom_label_css'>Room Charges/Day</label>");
                            var charges_per_day_label=$("<label id='charges_per_day_label' class='form-control-static'>"+patRoomBill_dict['charge_per_day']+"</label>")
                        colmd1.append(charges_label)
                        colmd2.append(charges_per_day_label)
                    row__col_one__subrow_three.append(colmd1);
                    row__col_one__subrow_three.append(colmd2);
                col_one__subrow_three.append(row__col_one__subrow_three);

            subrow_three.append(col_one__subrow_three)

            var subrow_four=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_four=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_four=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-3'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var acCharge_label=$("<label class='custom_label_css'>AC Charges/Day</label>");
                            var acCharge_Per_day_label=$("<label id='acCharge_Per_day_label' class='form-control-static'>"+patRoomBill_dict['ac_charge_per_day']+" </label>")
                        colmd1.append(acCharge_label);
                        colmd2.append(acCharge_Per_day_label);
                    row__col_one__subrow_four.append(colmd1);
                    row__col_one__subrow_four.append(colmd2);
                col_one__subrow_four.append(row__col_one__subrow_four);

            subrow_four.append(col_one__subrow_four)

            var subrow_five=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_five=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_five=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-3'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var totalDays_label=$("<label class='custom_label_css'>Days Stayed</label>");
                            var total_days_label=$("<label id='total_days_label' class='form-control-static'>"+patRoomBill_dict['total_days']+" </label>")
                        colmd1.append(totalDays_label);
                        colmd2.append(total_days_label);
                    row__col_one__subrow_five.append(colmd1);
                    row__col_one__subrow_five.append(colmd2);
                col_one__subrow_five.append(row__col_one__subrow_five);

            subrow_five.append(col_one__subrow_five)

            var subrow_six=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_six=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_six=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-3'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var totalAmount_label=$("<label class='custom_label_css'>Total Amount</label>");
                            var total_amount_input=$("<input class='form-control custom_input_css' id='room_amount_input' onfocusin='valueFocusInRoom()' onfocusout='valueFocusOutRoom($(this))' value="+patRoomBill_dict['total_bill']+" >")
                        colmd1.append(totalAmount_label);
                        colmd2.append(total_amount_input);
                    row__col_one__subrow_six.append(colmd1);
                    row__col_one__subrow_six.append(colmd2);
                col_one__subrow_six.append(row__col_one__subrow_six);

            subrow_six.append(col_one__subrow_six)

            var subrow_seven=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_seven=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_seven=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-3'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var status_label=$("<label class='custom_label_css'>Status</label>");
                            var select=$("<select id='room_status' class='form-control' style='font-size: inherit;'></select>");
                                    
                            if (patRoomBill_dict['status']==='Paid'){
                                var option=$("<option id="+status_list[0]+"-opt value='"+status_list[0]+"'>"+status_list[0]+"</option>");
                                $(select).append(option);
                                var option1=$("<option id="+status_list[1]+"-opt value='"+status_list[1]+"' >"+status_list[1]+"</option>");
                                $(select).append(option1);          
                            }
                            else{
                                var option=$("<option id="+status_list[1]+"-opt value='"+status_list[1]+"'>"+status_list[1]+"</option>");
                                $(select).append(option);
                                var option1=$("<option id="+status_list[0]+"-opt value='"+status_list[0]+"'>"+status_list[0]+"</option>");
                                $(select).append(option1);          
                            }                               
                        colmd1.append(status_label);
                        colmd2.append(select);
                    row__col_one__subrow_seven.append(colmd1);
                    row__col_one__subrow_seven.append(colmd2);
                col_one__subrow_seven.append(row__col_one__subrow_seven);

            subrow_seven.append(col_one__subrow_seven)
           
        main_subcol.append(subrow_zero)
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

            var subrow_zero=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px; '></div>")

                var col_one__subrow_zero=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_zero=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-6 offset-md-1'></div>")
                            var wardBill_label=$("<label for='heading_tag' class='custom_label_css' style='text-decoration:underline;'>Ward Bill Details</label>");
                        colmd1.append(wardBill_label)
                    row__col_one__subrow_zero.append(colmd1);
                col_one__subrow_zero.append(row__col_one__subrow_zero);

            subrow_zero.append(col_one__subrow_zero)
                    
            var subrow_one=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_one=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-3'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var Ward_label=$("<label for='Ward_tag' class='custom_label_css'>Ward Number</label>");
                            var ward_no_label=$("<label id='ward_no_label' class='form-control-static'>"+patWardBill_dict['ward_no']+"</label>")
                        colmd1.append(Ward_label)
                        colmd2.append(ward_no_label)
                    row__col_one__subrow_one.append(colmd1);
                    row__col_one__subrow_one.append(colmd2);
                col_one__subrow_one.append(row__col_one__subrow_one);

            subrow_one.append(col_one__subrow_one)

            var subrow_two=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_two=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_two=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-3'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var bed_label=$("<label class='custom_label_css'>Bed Number</label>");
                            var bed_no_label=$("<label id='bed_no_label' class='form-control-static'>"+patWardBill_dict['bed_no']+"</label>")
                        colmd1.append(bed_label);
                        colmd2.append(bed_no_label);
                    row__col_one__subrow_two.append(colmd1);
                    row__col_one__subrow_two.append(colmd2);
                col_one__subrow_two.append(row__col_one__subrow_two);

            subrow_two.append(col_one__subrow_two)

            var subrow_three=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_three=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_three=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-3'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var charges_label=$("<label for='charges_tag' class='custom_label_css'>Room Charges/Day</label>");
                            var charge_label=$("<label id='charge_label' class='form-control-static'>"+patWardBill_dict['charge_per_day']+"</label>")
                        colmd1.append(charges_label)
                        colmd2.append(charge_label)
                    row__col_one__subrow_three.append(colmd1);
                    row__col_one__subrow_three.append(colmd2);
                col_one__subrow_three.append(row__col_one__subrow_three);

            subrow_three.append(col_one__subrow_three)

            var subrow_four=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_four=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_four=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-3'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var totalDays_label=$("<label class='custom_label_css'>Days Stayed</label>");
                            var total_days_label=$("<label id='total_days_label' class='form-control-static'>"+patWardBill_dict['total_days']+" </label>")
                        colmd1.append(totalDays_label);
                        colmd2.append(total_days_label);
                    row__col_one__subrow_four.append(colmd1);
                    row__col_one__subrow_four.append(colmd2);
                col_one__subrow_four.append(row__col_one__subrow_four);

            subrow_four.append(col_one__subrow_four)

            var subrow_five=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_five=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_five=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-3'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var totalAmount_label=$("<label class='custom_label_css'>Total Amount</label>");
                            var total_amount_label=$("<input class='form-control custom_input_css' id='ward_amount_input' onfocusin='valueFocusInWard()' onfocusout='valueFocusOutWard($(this))' value="+patWardBill_dict['total_bill']+" >")
                        colmd1.append(totalAmount_label);
                        colmd2.append(total_amount_label);
                    row__col_one__subrow_five.append(colmd1);
                    row__col_one__subrow_five.append(colmd2);
                col_one__subrow_five.append(row__col_one__subrow_five);

            subrow_five.append(col_one__subrow_five)

            var subrow_six=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_six=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_six=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-3'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var status_label=$("<label class='custom_label_css'>Status</label>");
                            var select=$("<select id='ward_status' class='form-control' style='font-size: inherit;'></select>");
                                    
                            if (patWardBill_dict['status']==='Paid'){
                                var option=$("<option id="+status_list[0]+"-opt value='"+status_list[0]+"'>"+status_list[0]+"</option>");
                                $(select).append(option);
                                var option1=$("<option id="+status_list[1]+"-opt value='"+status_list[1]+"' >"+status_list[1]+"</option>");
                                $(select).append(option1);          
                            }
                            else{
                                var option=$("<option id="+status_list[1]+"-opt value='"+status_list[1]+"'>"+status_list[1]+"</option>");
                                $(select).append(option);
                                var option1=$("<option id="+status_list[0]+"-opt value='"+status_list[0]+"'>"+status_list[0]+"</option>");
                                $(select).append(option1);          
                            }                               
                        colmd1.append(status_label);
                        colmd2.append(select); 
                    row__col_one__subrow_six.append(colmd1);
                    row__col_one__subrow_six.append(colmd2);
                col_one__subrow_six.append(row__col_one__subrow_six);

            subrow_six.append(col_one__subrow_six)
        
        main_subcol.append(subrow_zero)
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

var gnt=0
function valueFocusInPres(){
    var presTotal= $("#pres_amount_input").val();
    var net_total=$("#nettotal_label").text();
    presTotal=parseInt(presTotal)
    net_total=parseInt(net_total)
    gnt= net_total-presTotal;
    
    console.log("presTotal--in",presTotal);
    console.log("net_total--",net_total);
    console.log("gnt--",gnt);
}
function valueFocusOutPres(element){
    var newPresTotal= $("#pres_amount_input").val();
    newPresTotal=parseInt(newPresTotal)
    if (newPresTotal===""){
        newPresTotal=0
        gnt= gnt+newPresTotal;
        console.log("gnt1111111111",gnt);

        $("#pres_amount_input").val('0');
    }
    gnt= gnt+newPresTotal;
    console.log("totalAmount",gnt);
    $("#nettotal_label").text(gnt);
}
function valueFocusInDesp(){
    var despTotal= $("#Desp_amount_input").val();
    var net_total=$("#nettotal_label").text();
    despTotal=parseInt(despTotal)
    net_total=parseInt(net_total)
    gnt= net_total-despTotal;
}
function valueFocusOutDesp(element){
    var newDespTotal= $("#Desp_amount_input").val();
    newDespTotal=parseInt(newDespTotal)
    if (newDespTotal==""){
        newDespTotal=0
        gnt= gnt+newDespTotal;
        $("#Desp_amount_input").val('0');
    }
    gnt= gnt+newDespTotal;
    $("#nettotal_label").text(gnt);
}
function valueFocusInRoom(){
    var roomTotal= $("#room_amount_input").val();
    var net_total=$("#nettotal_label").text();
    roomTotal=parseInt(roomTotal)
    net_total=parseInt(net_total)
    gnt= net_total-roomTotal;
}
function valueFocusOutRoom(element){
    var newRoomTotal= $("#room_amount_input").val();
    newRoomTotal=parseInt(newRoomTotal)
    gnt= gnt+newRoomTotal;
    $("#nettotal_label").text(gnt);
}
function valueFocusInWard(){
    var wardTotal= $("#ward_amount_input").val();
    var net_total=$("#nettotal_label").text();
    wardTotal=parseInt(wardTotal)
    net_total=parseInt(net_total)
    gnt= net_total-wardTotal; 
}
function valueFocusOutWard(element){
    var newWardTotal= $("#ward_amount_input").val();
    newWardTotal=parseInt(newWardTotal)
    gnt= gnt+newWardTotal;

    $("#nettotal_label").text(gnt);
}
function valueFocusInSurg(){
    var surgTotal=$("#pres_amount_input").val();
    var net_total=$("#nettotal_label").text();
    surgTotal=parseInt(surgTotal)
    net_total=parseInt(net_total)
    gnt= net_total-surgTotal;
}
function valueFocusOutSurg(element){
    var newSurgTotal=$("#pres_amount_input").val();
    newSurgTotal=parseInt(newSurgTotal)

    gnt= gnt+newSurgTotal;
    $("#nettotal_label").text(gnt);
}
function valueFocusInProc(){
    var procTotal= $("#pres_amount_input").val();
    var net_total=$("#nettotal_label").text();
    procTotal=parseInt(procTotal)
    net_total=parseInt(net_total)
    gnt= net_total-procTotal;
}
function valueFocusOutProc(element){
    var newProcTotal= $("#pres_amount_input").val();
    newProcTotal=parseInt(newProcTotal)

    gnt= gnt+newProcTotal;
    $("#nettotal_label").text(gnt);
}

function netTotalAmountRow(){

    var row_div_last=$("<div class='row' id='total_amount_div'></div>");
        var main_subcol=$("<div class='col-md-12'></div>");

            var subrow_zero=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px; '></div>")

                var col_one__subrow_zero=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_zero=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-6 offset-md-1'></div>")
                            var totalBill_label=$("<label for='heading_tag' class='custom_label_css' style='text-decoration:underline;'>Patient Total Bill</label>");
                        colmd1.append(totalBill_label)
                    row__col_one__subrow_zero.append(colmd1);
                col_one__subrow_zero.append(row__col_one__subrow_zero);

            subrow_zero.append(col_one__subrow_zero)

            var subrow_one=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px;'></div>")

                var col_one__subrow_one=$("<div class='col-md-5'></div>");
                    row__col_one__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-3'></div>")
                            var total_label=$("<label for='nettotal_label' class='custom_label_css'>Sub Total</label>");
                            var totalAmount_label=$("<label id='nettotal_label' class='form-control-static'>"+patPresRecord_dict['total_bill']+"</label>")
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
                            var select=$("<select id='invoice_status' class='form-control' onfocusout='valueFocusOutInvoiceStatus($(this))' ></select>");
                                    
                            if (patPresRecord_dict['invoice_status']==='Paid'){
                                var option=$("<option id="+status_list[0]+"-opt value='"+status_list[0]+"'>"+status_list[0]+"</option>");
                                $(select).append(option);
                                var option1=$("<option id="+status_list[1]+"-opt value='"+status_list[1]+"' >"+status_list[1]+"</option>");
                                $(select).append(option1);          
                            }
                            else{
                                var option=$("<option id="+status_list[1]+"-opt value='"+status_list[1]+"'>"+status_list[1]+"</option>");
                                $(select).append(option);
                                var option1=$("<option id="+status_list[0]+"-opt value='"+status_list[0]+"'>"+status_list[0]+"</option>");
                                $(select).append(option1);          
                            }
                        colmd1.append(status_label)
                        colmd2.append(select)
                    row__col_one__subrow_two.append(colmd1);
                    row__col_one__subrow_two.append(colmd2);
                col_one__subrow_two.append(row__col_one__subrow_two);

            subrow_two.append(col_one__subrow_two)

        main_subcol.append(subrow_zero)
        main_subcol.append(subrow_one)
        main_subcol.append(subrow_two)

        row_div_last.append(main_subcol)
    var main_col_div=$("#main_col_div");
    main_col_div.append(row_div_last);

} 

function valueFocusOutInvoiceStatus(element){
    var id=$(element).attr('id')
    var arr_id=id.split("-")
    id= arr_id[1]

    var inv_stat=$(invoice_status).val();

    if(inv_stat==='Paid'){
        $("#ward_status").val('Paid');
        $("#room_status").val('Paid');
        $("#surg_status-"+id+"").val('Paid');
        $("#desp_status").val('Paid');
        $("#proc_status-"+id+"").val('Paid');
        $("#pres_status").val('Paid');
    }

}
function updateButtonRow(){

    var row_div_btn=$("<div class='row' id='btn_div'></div>");
        var main_subcol=$("<div class='col-md-12'></div>");

            var subrow_zero=$("<div class='row' style='padding-top: 5px;padding-bottom: 5px; '></div>")

                var col_one__subrow_zero=$("<div class='col-md-12'></div>");
                    row__col_one__subrow_zero=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-6 offset-md-3'></div>")
                            var updateBtn_label=$('<button class="btn btn-success btn-block fa fa-save" id="update_bttn" onclick="updateInvoice()">  Update Bill</button>');
                        colmd1.append(updateBtn_label)
                    row__col_one__subrow_zero.append(colmd1);
                col_one__subrow_zero.append(row__col_one__subrow_zero);

            subrow_zero.append(col_one__subrow_zero)
        main_subcol.append(subrow_zero)

    row_div_btn.append(main_subcol)
    var main_col_div=$("#main_col_div");
    main_col_div.append(row_div_btn);

} 

function updateInvoice(){
    
    var invoice_no=$("#invoice_label").text();
    var invoice_status=$("#invoice_status").val();
    var netTotal=$("#nettotal_label").text();

    var pres_id=$("#pres_id_input").val();
    var pres_total=$("#pres_amount_input").val();
    var pres_status=$("#pres_status").val();
    var desp_total=$("#Desp_amount_input").val();
    var desp_status=$("#desp_status").val();

    var room_total=$("#room_amount_input").val();
    var room_status=$("#room_status").val();
    var ward_total=$("#ward_amount_input").val();
    var ward_status=$("#ward_status").val();

    // var surg_total=$("#total_days").val();
    // var surg_status=$("#total_days").val();


    var invoice_dict={};
    invoice_dict['invoice_no']=invoice_no;
    invoice_dict['invoice_status']=invoice_status;
    invoice_dict['netTotal']=netTotal;

    var pres_dict={};
    pres_dict['pres_total']=pres_total;
    pres_dict['pres_status']=pres_status;

    var desp_dict={};
    desp_dict['desp_total']=desp_total;
    desp_dict['desp_status']=desp_status;

    var room_dict={};
    room_dict['room_total']=room_total;
    room_dict['room_status']=room_status;

    var ward_dict={};
    ward_dict['ward_total']=ward_total;
    ward_dict['ward_status']=ward_status;

    var proc_dict={};
    console.log("procBillRecord_dict222222",procBillRecord_dict)
    for (key in procBillRecord_dict){
        temp_dict={}
        temp_dict['proc_total']= $("#proc_input-"+key+"").val();
        temp_dict['status']= $("#proc_status-"+key+"").val();
        temp_dict['all_total']= $("#proc_total").text();

        proc_dict[key]=[] ;
        proc_dict[key]=temp_dict
    }
    console.log("proc_dict444444", proc_dict)

    var surg_dict={};
    for (key in surgBillRecord_dict){
        temp_dict={}
        temp_dict['anest_fee']= $("#af_input-"+key+"").val();
        temp_dict['surgeon_fee']= $("#sf_input-"+key+"").val();
        temp_dict['surplus_char']= $("#sc_input-"+key+"").val();
        temp_dict['oper_fee']= $("#otf_input-"+key+"").val();
        temp_dict['surg_total']= $("#surgery_input-"+key+"").text();
        temp_dict['all_total']= $("#surg_total").text();
        temp_dict['status']= $("#surg_status-"+key+"").val();

        surg_dict[key]=[] ;
        surg_dict[key]=temp_dict
    }
    console.log("surg_dict4444444444444", surg_dict)

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
            "pres":JSON.stringify(pres_id),
            "proc_dict":JSON.stringify(proc_dict), 
            "surg_dict":JSON.stringify(surg_dict),
            "room_dict":JSON.stringify(room_dict),
            "ward_dict":JSON.stringify(ward_dict), 
            "pres_dict":JSON.stringify(pres_dict),
            "desp_dict":JSON.stringify(desp_dict), 
            "invoice_dict":JSON.stringify(invoice_dict),
        },
        url: '/update_invoice',
        success: function(data){
            $("#pat_details_div").remove();
            $("#row_pres_bill").remove();
            $("#row_disp_bill").remove();
            $("#row_surgery_bill").remove();
            $("#row_procedure_bill").remove();
            $("#row_room_bill").remove();
            $("#row_ward_bill").remove();
            $("#total_amount_div").remove();
            $("#update_bttn").remove();
        },
    });
}