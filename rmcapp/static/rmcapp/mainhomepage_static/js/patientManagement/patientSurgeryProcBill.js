var surgery_data_list=[];
var procedure_data_list=[];
var already_discount=0;
var consultant="";
var surgeon="";


function surgeryProcFrom(){

    $('#main_page_content').empty()
    var container= $('#main_page_content').append('<div class="container-fluid" id="container_pat_surg_proc_bill"></div>');
    $("#container_pat_surg_proc_bill").append("<h2 class ='center_h_tag_forms'>Pateint Surgery/Procedure Bill</h2>");
    $("#container_pat_surg_proc_bill").append("<hr class='custom_hr'>");

    var main_row_div= $("<div class='row is-flex'></div>");

    $(container).append(main_row_div);
    var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");
       
    $(main_row_div).append(main_col_div);

        var row_div_one=$("<div class='row' id='row_div_one'></div>");
            var col_one__row_div_one=$("<div class='col-md-12'></div>");
                row__col_one__row_div_one=$("<div class='row' style='padding-bottom:10px'></div>");
                    colmd1=$("<div class='col-md-2'></div>")
                    colmd2=$("<div class='col-md-2'></div>")
                    colmd3=$("<div class='col-md-3'></div>")

                        var pat_id_label=$("<label class='custom_label_css'>Prescription Id</label>");
                        var pat_id_input=$("<input class='form-control' id='search_prescription_id' class='custom_input_css'>")
                        var search_button=$('<button class="search_patientpres_btn fa fa-search" onclick="searchPrescription()">  Search</button>');
                    
                    colmd1.append(pat_id_label)
                    colmd2.append(pat_id_input);
                    colmd3.append(search_button);

                row__col_one__row_div_one.append(colmd1);
                row__col_one__row_div_one.append(colmd2);
                row__col_one__row_div_one.append(colmd3);

            col_one__row_div_one.append(row__col_one__row_div_one);
        row_div_one.append(col_one__row_div_one);
    $(main_col_div).append(row_div_one);

}

function searchPrescription(){
    var pres_id=$("#search_prescription_id").val()
    if (pres_id===""){
        alert("Please Insert Valid Pres id")
        return
    }
    $("#row_div_two").remove();
        
    $("#row_div_three").remove();
    $("#row_div_four").remove();

    retrievePresInfoSurgProcBill(pres_id)    
}
function retrievePresInfoSurgProcBill(id){
    prescription_id=id;
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
            "id":prescription_id,
        },
        url: '/retrieve_pres_info_surg_proc_bill',
        success: function(data){
            if (data['pres_id']===""){
                alert("Please Insert Valid Pres Id")
                $('.modal-loading').hide();

                return
            }
            if (data['data']!=='Valid'){
                alert("Input Not Valid")

                $('.modal-loading').hide();

                return;
            }
            surgery_dict=JSON.parse(data["surgery_dict"])
            procedure_dict=JSON.parse(data["procedure_dict"])
            already_discount=data["already_discount"]
            consultant=data["consultant"] 
            surgeon=data["surgeon"] 
            surgery_data_list=[]
            procedure_data_list=[]
            for (var key in surgery_dict){
                surgery_data_list.push(key)
            }
            for (var key in procedure_dict){
                procedure_data_list.push(key)
            }

            console.log("procedure_data_list",procedure_data_list)
            console.log("surgery_data_list",surgery_data_list)

            createFrom();
            $('.modal-loading').hide();

        },
    }); 
}

function createFrom(){
    basicInfoRet();

}

function basicInfoRet(){
    var row_div_two=$("<div class='row' id='row_div_two'></div>");
    var main_subcol=$("<div class='col-md-12'></div>");

        var subrow_one=$("<div class='row' style='padding-bottom: 20px'></div>")
            //     var col_one__subrow_one=$("<div class='col-md-4'></div>");
            //             row__col_one__subrow_one=$("<div class='row'></div>");
            //                 var colmd1=$("<div class='col-md-6'></div>")
            //                 var colmd2=$("<div class='col-md-6'></div>")
            //                     var pat_name_label=$("<label for='emp_name_tag' class='custom_label_css'>Consultant Name</label>");
            //                     var pat_name_input=$("<label class='form-control-static' id='consultant_name'>"+consultant+"</label>")
            //                 colmd2.append(pat_name_input)
            //                 colmd1.append(pat_name_label)
            //             row__col_one__subrow_one.append(colmd1);
            //             row__col_one__subrow_one.append(colmd2);
            //         col_one__subrow_one.append(row__col_one__subrow_one);


            //     var col_two__subrow_one=$("<div class='col-md-4'></div>");
            //         var row__col_two__subrow_one=$("<div class='row'></div>");
            //             var colmd1=$("<div class='col-md-6'></div>")
            //             var colmd2=$("<div class='col-md-6'></div>")
            //                 var contact_type_label=$("<label class='custom_label_css float-right'>Surgeon Name</label>");
            //                 var contact_type_input=$("<label class='form-control-static' id='surgeon_name'>"+surgeon+"</label>")
            //             colmd1.append(contact_type_label);
            //             colmd2.append(contact_type_input);
    
            //         row__col_two__subrow_one.append(colmd1)
            //         row__col_two__subrow_one.append(colmd2)
            //     col_two__subrow_one.append(row__col_two__subrow_one)

            // subrow_one.append(col_one__subrow_one)
            // subrow_one.append(col_two__subrow_one)
        main_subcol.append(subrow_one)

    row_div_two.append(main_subcol)
var main_col_div=$("#main_col_div");
main_col_div.append(row_div_two);
subFormCreation();
}

var surg_proc_list=['Surgery','Procedure']
function subFormCreation(){
    var row_div_three=$("<div class='row' id='row_div_three' style='margin-left:0px;margin-right:0px;'></div>");
        var main_sidecol1=$("<div class='col-md-6 surgery_procedure_billform2 ' ></div>");
            var row2=$("<div class='surg_proc_bill ' id='bill_div'></div>");
        main_sidecol1.append(row2);


        var main_subcol=$("<div class='col-md-6 ' id='main-column'></div>");
            var subrow_one=$("<div class='row surgery_procedure_billform' id='surg_proc_row-1'></div>")
                var col_one__subrow_one=$("<div class='col-md-12'  id='main_surg_proc-1'></div>");
                    var row__col_one__subrow_one=$("<div class='row removerowmargins_div' id='select_surg_proc-1'></div>");
                        var colmd1=$("<div class='col-md-4'></div>");
                            var surg_proc_label=$("<label class='form-control-static'>Surgery/Procedure</label>")
                        colmd1.append(surg_proc_label)  
                        var colmd2=$("<div class='col-md-7'></div>");
                            var surg_proc_select=$('<select class="form-control" id="surg_proc_sel-1" onchange="selectSurgOrProc($(this))"></select>');
                                var option=$("<option  value='--'>--</option>");
                                $(surg_proc_select).append(option);
                                for (var i=0;i<=surg_proc_list.length;i++){
                                    if (surg_proc_list[i]!==undefined){
                                        var option=$("<option id="+surg_proc_list[i]+"-opt value="+surg_proc_list[i]+">"+surg_proc_list[i]+"</option>");
                                        $(surg_proc_select).append(option);
                                    }
                                }
                        colmd2.append(surg_proc_select);
                    row__col_one__subrow_one.append(colmd1);
                    row__col_one__subrow_one.append(colmd2);
                col_one__subrow_one.append(row__col_one__subrow_one);
            subrow_one.append(col_one__subrow_one)
        main_subcol.append(subrow_one)
    row_div_three.append(main_subcol);
    row_div_three.append(main_sidecol1);

var main_col_div=$("#main_col_div");
main_col_div.append(row_div_three);
rowDivFourCreation();
}   
function selectSurgOrProc(element){
    var div_num=0;
    
    $('[id^="surg_proc_row-"]').each( function(  ) {
        console.log(">>>",$(this).attr('id'))
        row_id=$(this).attr('id');
        splt_arr=row_id.split('-')
        div_num=parseInt(splt_arr[1]);

    });
    grandparent_id=$(element).parent().parent().parent().attr('id');
    grandparent_ele=$("#"+grandparent_id);
    console.log("grandparent id",grandparent_id)
    console.log("value",$(element).val());
    var selected_value=$(element).val();
    splitid_arr=grandparent_id.split("-")
    $("#sub_proc-"+splitid_arr[1]).remove();
    $("#sub_surg-"+splitid_arr[1]).remove();
    num=parseInt(splitid_arr[1]);
    addbutton_flag='On';
    deletebutton_flag='On';
    console.log("div number",div_num)
    console.log("num",num)

    if (num<div_num){
        addbutton_flag="Off";
    }
    if (num===1){
        deletebutton_flag="Off";
    }
    
    if (selected_value==="Procedure"){
        createProcForm(grandparent_id,num,addbutton_flag);
    }
    else{
        createSurgForm(grandparent_id,num,addbutton_flag);
    }

}

function deleteMainRow(button){
   greatgrandparent_id= $(button).parent().parent().parent().parent().attr('id');
   if (greatgrandparent_id==='surg_proc_row-1'){
       return;
   }
   else{
       $("#"+greatgrandparent_id).remove();
   }
}
function createProcForm(grandparent_id,num,addbutton_flag){
    grandparent=$("#"+grandparent_id);
        var sub_proc_col_1=$("<div  id='sub_proc-"+num+"'></div>");
            var row__sel_proc=$("<div class='row removerowmargins_div' id='select_proc-"+num+"' style='padding-top:10px; padding-bottom:10px'></div>");
                var colmd1=$("<div class='col-md-4'></div>");
                    var proc_label=$("<label class='form-control-static'>Procedure</label>")
                colmd1.append(proc_label)  
                var colmd2=$("<div class='col-md-7'></div>");
                    var proc_select=$('<select class="form-control" id="select_proc_ele-'+num+'" onchange="selectProc($(this))"></select>');
                        var option=$("<option  value='--'>--</option>");
                    $(proc_select).append(option);
                        for (var i=0;i<=procedure_data_list.length;i++){
                            if (procedure_data_list[i]!==undefined){
                                var option=$("<option id='"+procedure_data_list[i]+"-opt' value='"+procedure_data_list[i]+"'>"+procedure_data_list[i]+"</option>");
                                $(proc_select).append(option);
                            }
                        }

                colmd2.append(proc_select);
            row__sel_proc.append(colmd1);
            row__sel_proc.append(colmd2);

            var row2__sel_proc=$("<div class='row removerowmargins_div' id='charges_proc-"+num+"' style='padding-bottom:10px'></div>");
                var colmd1=$("<div class='col-md-4'></div>");
                    var proc_label=$("<label class='form-control-static'>Charges</label>")
                colmd1.append(proc_label)  
                var colmd2=$("<div class='col-md-7'></div>");
                    var proc_input=$("<input class='form-control' id='charges_proc_input-"+num+"'></input>")
                colmd2.append(proc_input);
            row2__sel_proc.append(colmd1);
            row2__sel_proc.append(colmd2);

            var row3__sel_proc=$("<div class='row removerowmargins_div' style='padding-bottom:10px'></div>");
            
                var colmd1=$("<div class='col-md-4'></div>");
                if (addbutton_flag=="On"){
                    var add_more=$("<button class='add_btn fa fa-plus-circle'  id='btn_addmore-"+num+"' onclick='addNewFormRow()' >  Add More</label>")
                colmd1.append(add_more)  
                }
            row3__sel_proc.append(colmd1);

        sub_proc_col_1.append(row__sel_proc);
        sub_proc_col_1.append(row2__sel_proc);
        sub_proc_col_1.append(row3__sel_proc);

    $(grandparent).append(sub_proc_col_1)
}
function createSurgForm(grandparent_id,num,addbutton_flag){
    grandparent=$("#"+grandparent_id);
            var sub_surg_col_1=$("<div  id='sub_surg-"+num+"'></div>");
                    var row__sel_surg=$("<div class='row removerowmargins_div' id='select_surg-"+num+"' style='padding-top:10px; padding-bottom:10px'></div>");
                        var colmd1=$("<div class='col-md-4'></div>");
                            var surg_label=$("<label class='form-control-static'>Surgeries</label>")
                        colmd1.append(surg_label)  
                        var colmd2=$("<div class='col-md-7'></div>");
                            var surg_select=$('<select class="form-control" id="select_surg_ele-'+num+'" onchange="selectSurg($(this))"></select>');
                                var option=$("<option  value='--'>--</option>");
                            $(surg_select).append(option);

                                for (var i=0;i<=surgery_data_list.length;i++){
                                    if (surgery_data_list[i]!==undefined){
                                        var option=$("<option id='"+surgery_data_list[i]+"-opt' value='"+surgery_data_list[i]+"'>"+surgery_data_list[i]+"</option>");
                                        $(surg_select).append(option);
                                    }
                                }
                        colmd2.append(surg_select);
                        
                            
                    row__sel_surg.append(colmd1);
                    row__sel_surg.append(colmd2);

                    var row2__surgeon_charges=$("<div class='row removerowmargins_div' id='surgeon_charges-"+num+"' style='padding-bottom:10px'></div>");
                        var colmd1=$("<div class='col-md-4'></div>");
                            var surgeoncharge_label=$("<label class='form-control-static'>Surgeon Charges</label>")
                        colmd1.append(surgeoncharge_label)  
                        var colmd2=$("<div class='col-md-7'></div>");
                            var surgeoncharge_input=$("<input class='form-control' id='surgeon_charges_input-"+num+"' style='padding-bottom:10px'></input>")
                        colmd2.append(surgeoncharge_input);
                    row2__surgeon_charges.append(colmd1);
                    row2__surgeon_charges.append(colmd2);

                    var row3__theatre_charges=$("<div class='row removerowmargins_div' id='theatre_charges-"+num+"' style='padding-bottom:10px'></div>");
                        var colmd1=$("<div class='col-md-4'></div>");
                            var theatre_charges_label=$("<label class='form-control-static'>Theatre Charges</label>")
                        colmd1.append(theatre_charges_label)  
                        var colmd2=$("<div class='col-md-7'></div>");
                            var theatre_charges_input=$("<input class='form-control' id='theatre_charges_input-"+num+"' style='padding-bottom:10px'></input>")
                        colmd2.append(theatre_charges_input);
                    row3__theatre_charges.append(colmd1);
                    row3__theatre_charges.append(colmd2);

                    var row4__anesthetic_charges=$("<div class='row removerowmargins_div' id='anesthetic_charges-"+num+"' style='padding-bottom:10px'></div>");
                        var colmd1=$("<div class='col-md-4'></div>");
                            var anesthetic_charges_label=$("<label class='form-control-static'>Anesthetic Charges</label>")
                        colmd1.append(anesthetic_charges_label)  
                        var colmd2=$("<div class='col-md-7'></div>");
                            var anesthetic_charges_input=$("<input class='form-control' id='anesthetic_charges_input-"+num+"' style='padding-bottom:10px'></input>")
                        colmd2.append(anesthetic_charges_input);
                    row4__anesthetic_charges.append(colmd1);
                    row4__anesthetic_charges.append(colmd2);

                    var row6__surplus_charges=$("<div class='row removerowmargins_div' id='surplus_charges-"+num+"' style='padding-bottom:10px'></div>");
                    var colmd1=$("<div class='col-md-4'></div>");
                        var surplus_charges_label=$("<label class='form-control-static'>Surplus Charges</label>")
                    colmd1.append(surplus_charges_label)  
                    var colmd2=$("<div class='col-md-7'></div>");
                        var surplus_charges_input=$("<input class='form-control' id='surplus_charges_input-"+num+"' style='padding-bottom:10px'></input>")
                    colmd2.append(surplus_charges_input);
                    row6__surplus_charges.append(colmd1);
                    row6__surplus_charges.append(colmd2);

                    var row5=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>");
                        if (addbutton_flag==="On"){

                            var add_more=$("<button  id='btn_addmore-"+num+"' class='btn btn-block fa fa-plus-circle' onclick='addNewFormRow()'> Add More</label>")
                        }
                        colmd1.append(add_more)  
                     
                    row5.append(colmd1);


                sub_surg_col_1.append(row__sel_surg);
                sub_surg_col_1.append(row2__surgeon_charges);
                sub_surg_col_1.append(row3__theatre_charges);
                sub_surg_col_1.append(row4__anesthetic_charges);
                sub_surg_col_1.append(row6__surplus_charges);

                sub_surg_col_1.append(row5);

    $(grandparent).append(sub_surg_col_1)
}
function addNewFormRow(){
    var num=0;
    
    $('[id^="surg_proc_row-"]').each( function(  ) {
        console.log(">>>",$(this).attr('id'))
        row_id=$(this).attr('id');
        splt_arr=row_id.split('-')
        num=parseInt(splt_arr[1]);

    });
    console.log("NUM",num);
    $("#btn_addmore-"+num).remove();
    num=num+1;
    createNewSurgProcForm(num);
}
function createNewSurgProcForm(num){
    var main_column=$("#main-column")
        var subrow=$("<div class='row surgery_procedure_billform' id='surg_proc_row-"+num+"'></div>")
            var col_one__subrow=$("<div class='col-md-12' id='main_surg_proc-"+num+"'></div>");
                var row__col_one__subrow=$("<div class='row removerowmargins_div' id='select_surg_proc-"+num+"'></div>");
                    var colmd1=$("<div class='col-md-4'></div>");
                        var surg_proc_label=$("<label class='form-control-static'>Surgery/Procedure</label>")
                    colmd1.append(surg_proc_label)  
                    var colmd2=$("<div class='col-md-7'></div>");
                        var surg_proc_select=$('<select class="form-control" id="surg_proc_sel-'+num+'" onchange="selectSurgOrProc($(this))"></select>');
                            var option=$("<option  value='--'>--</option>");
                        $(surg_proc_select).append(option);

                        
                            for (var i=0;i<=surg_proc_list.length;i++){
                                if (surg_proc_list[i]!==undefined){
                                    var option=$("<option id='"+surg_proc_list[i]+"-opt' value='"+surg_proc_list[i]+"'>"+surg_proc_list[i]+"</option>");
                                    $(surg_proc_select).append(option);
                                }
                            }
                    colmd2.append(surg_proc_select);
                    var colmd3=$("<div class='col-md-1'></div>");
                        var delete_button=$("<button class='delBtn fa fa-2x fa-remove' onclick='deleteMainRow($(this))'></button>")
                    colmd3.append(delete_button);
                row__col_one__subrow.append(colmd1);
                row__col_one__subrow.append(colmd2);
                row__col_one__subrow.append(colmd3);
            col_one__subrow.append(row__col_one__subrow);
        subrow.append(col_one__subrow)
    main_column.append(subrow)
    // Scroll to bill div
    $('html,body').animate({
        scrollTop: $("#surg_proc_row-"+num+"").offset().top},
        'slow');
   
}
function selectSurg(ele){
    parent_id=$(ele).parent().parent().attr('id');
    splt_arr=parent_id.split("-");
    num=parseInt(splt_arr[1]);
    value=$(ele).val();
    surg_charge_details=surgery_dict[value];
    console.log("surg_charge_details",surg_charge_details)
    $("#surgeon_charges_input-"+num).val(surg_charge_details[0]);
    $("#theatre_charges_input-"+num).val(surg_charge_details[1]);
    $("#anesthetic_charges_input-"+num).val(surg_charge_details[2]);
    $("#surplus_charges_input-"+num).val(surg_charge_details[3]);

}
function selectProc(ele){
    parent_id=$(ele).parent().parent().attr('id');
    console.log("parent_id",parent_id)
    splt_arr=parent_id.split("-");
    num=parseInt(splt_arr[1]);
    value=$(ele).val();

    proc_charge_details=procedure_dict[value];
    $("#charges_proc_input-"+num).val(proc_charge_details[0]);
    console.log("proc_charge_details",proc_charge_details)
}
function rowDivFourCreation(){
    var row_div_four=$("<div class='row removerowmargins_div' id='row_div_four'></div>");
        var main_sidecol1=$("<div class='col-md-12' ></div>");
            var row1=$("<div></div>");
                var subrow1=$("<div class='row  genformdiv1'>")
                    var subcol1=$("<div class='col-md-12'>")
                        var calulate_button=$("<button class='calbtn fa fa-calculator' onclick='calculateBill()'>  Calculate Bill</button>")
                    subcol1.append(calulate_button)
                subrow1.append(subcol1);
            row1.append(subrow1)
        main_sidecol1.append(row1);
    row_div_four.append(main_sidecol1);

var main_col_div=$("#main_col_div");
main_col_div.append(row_div_four);
}
var surgerybill_dict={};
var procedurebill_dict={};
function calculateBill(){
    $("#bill_div").empty();
    surg_count=1
    proc_count=1
    $('[id^="surg_proc_row-"]').each( function(  ) {
        console.log(">>>",$(this).attr('id'))
        row_id=$(this).attr('id');
        splt_arr=row_id.split('-')
        num=parseInt(splt_arr[1]);
        surg_proc_val=$("#surg_proc_sel-"+num).val();
        if (surg_proc_val==="Surgery"){
            selectedsurgery=$("#select_surg_ele-"+num).val();
            if (selectedsurgery!=="--"){

                surgeon_charges=$("#surgeon_charges_input-"+num).val()
                theatre_charges=$("#theatre_charges_input-"+num).val()
                anesthetic_charges=$("#anesthetic_charges_input-"+num).val()
                surplus_charges=$("#surplus_charges_input-"+num).val()
                templist=[];
                templist.push(selectedsurgery)
                templist.push(surgeon_charges);
                templist.push(theatre_charges)
                templist.push(anesthetic_charges)
                templist.push(surplus_charges)
                total_charges=parseInt(surgeon_charges)+parseInt(theatre_charges)+parseInt(anesthetic_charges)+parseInt(surplus_charges)
                templist.push(total_charges)
                surgerybill_dict[surg_count]=templist;
                surg_count++;
            }
        }else if (surg_proc_val==="Procedure"){
            selectedprocedure=$("#select_proc_ele-"+num).val();
            if (selectedprocedure!=="--"){
            charges=$("#charges_proc_input-"+num).val();
            templist=[];
            templist.push(selectedprocedure)
            templist.push(charges);
           
                procedurebill_dict[proc_count]=templist;
                proc_count++;

            }

        }
    });
    console.log("surgerybill_dict",surgerybill_dict);
    console.log("procedurebill_dict",procedurebill_dict);
    var surg_bill_final_div=$("<div id='surg_bill_final_div'   style='padding-top:40px; padding-bottom:40px'>")
        var row1=$("<div><h1><center><u>Surgeries</u></center></h1></div>");
        var row2=$("<div id='surgery_table_row' ></div>")
            var surg_table=$("<table class='datatable_proc_surg_custom' ></table>");
            var thead=$("<thead></thead>");
                var tr=$("<tr style='border-bottom:1px solid black'  >");
                    var th1=$("<th>")
                    th1.append("Syurgery Name")
                    var th2=$("<th>")
                    th2.append("Surgeon Fee")
                    var th3=$("<th>")
                    th3.append("Theatre Fee")
                    var th4=$("<th>")
                    th4.append("Anestheologist Fee")
                    var th5=$("<th>")
                    th5.append("Surplus Fee")
                    var th6=$("<th>")
                    th6.append("Total Fee")
                tr.append(th1);
                tr.append(th2);
                tr.append(th3);
                tr.append(th4);
                tr.append(th5);
                tr.append(th6);
            thead.append(tr);
        $(surg_table).append(thead);

    var tbody=$("<tbody></tbody>");
    $(surg_table).append(tbody);
    var surg_total_bill=0;
    for (key in surgerybill_dict){
        if (surgerybill_dict[key][0]!=="undefined" || surgerybill_dict[key][0]!=='--'){
            var tr=$("<tr style='border-bottom:1px solid black'>");
                var td1=$("<td>");
                td1.append(surgerybill_dict[key][0])

                surgeonfee=surgerybill_dict[key][1];
                var td2=$("<td>");
                td2.append(surgeonfee)

                theatrefee=surgerybill_dict[key][2];
                var td3=$("<td>");
                td3.append(theatrefee)

                anestheticfee=surgerybill_dict[key][3];
                var td4=$("<td>");
                td4.append(anestheticfee)

                surplusfee=surgerybill_dict[key][4];
                var td5=$("<td>");
                td5.append(surplusfee);

                totalfee=surgerybill_dict[key][5];
                var td6=$("<td >");
                td6.append(totalfee)
                surg_total_bill=surg_total_bill+totalfee;
            tr.append(td1);
            tr.append(td2);
            tr.append(td3);
            tr.append(td4);
            tr.append(td5);
            tr.append(td6);
        tbody.append(tr)
           
        }
    }
        var tr=$("<tr style='border-bottom:1px solid black'>");
            var td1=$("<td>");
            var td2=$("<td>");
            var td3=$("<td>");
            var td4=$("<td>");
            var td5=$("<td>");
                var th5=$("<th>");
                th5.append("Surgery Total Bill")
            td5.append(th5);
            var td6=$("<td>");
            nettotalfee=surg_total_bill;
            var th6=$("<th id='totalsurg_bill'>");
                th6.append(nettotalfee)
            td6.append(th6)
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        tr.append(td4);
        tr.append(td5);
        tr.append(td6);
        tbody.append(tr)
    $(row2).append(surg_table)

surg_bill_final_div.append(row1);
surg_bill_final_div.append(row2);

var proc_bill_final_div=$("<div id='proc_bill_final_div'>")
    var row1=$("<div><h1><center><u>Procedures</u></center></h1></div>");
    var row2=$("<div id='procedure_table_row'></div>")
        var proc_table=$("<table class='datatable_proc_surg_custom'></table>");
        var thead=$("<thead></thead>");
            // var tr=$("<tr>");
            //     var th1=$("<th>")
            //     th1.append("Procedure Name")
            //     var th3=$("<th>")
            //     var th2=$("<th>")
            //     th2.append("Charges")
            // tr.append(th1);
            // tr.append(th3);
            // tr.append(th2);

            var tr=$("<tr style='border-bottom:1px solid black'>");
                var th1=$("<th>")
                th1.append("Procedure Name")
                var th2=$("<th>")
                var th3=$("<th>")
                var th4=$("<th>")
                var th5=$("<th>")
                var th6=$("<th>")
                th6.append("Procedure Charges")
            tr.append(th1);
            tr.append(th2);
            tr.append(th3);
            tr.append(th4);
            tr.append(th5);
            tr.append(th6);

        thead.append(tr)
    $(proc_table).append(thead);

       
    var tbody=$("<tbody></tbody>");
    $(proc_table).append(tbody);

    var proc_total_bill=0;
    for (key in procedurebill_dict){
        console.log("Key---->",key);
        if (procedurebill_dict[key][0]!==undefined ||procedurebill_dict[key][0]!=='undefined' || procedurebill_dict[key][0]!=='--'){
            var tr=$("<tr style='border-bottom:1px solid black'>");
                var td1=$("<td>");
                var td2=$("<td>");
                var td3=$("<td>");
                var td4=$("<td>");
                var td5=$("<td>");
                var td6=$("<td>");

                
                td1.append(procedurebill_dict[key][0])
                charges=procedurebill_dict[key][1];
                proc_total_bill=parseInt(charges)+proc_total_bill
                td6.append(charges)
            tr.append(td1);
            tr.append(td3);
            tr.append(td2);
            tr.append(td3);
            tr.append(td4);
            tr.append(td5);
            tr.append(td6);

        tbody.append(tr);
        }
    }
    // var tr=$("<tr>");
    // var td3=$("<td>");
    // var td4=$("<td>");
    // var td5=$("<td>");
    // var td6=$("<td>");
    // var td7=$("<td>");


        var tr=$("<tr style='border-bottom:1px solid black'>");
            var td1=$("<td>");
            var td2=$("<td>");
            var td3=$("<td>");
            var td4=$("<td>");
            var td5=$("<td>");
                var th5=$("<th>");
                th5.append("Procedure Total Bill")
            td5.append(th5);
            var td6=$("<td>");
                var th6=$("<th id='totalproc_bill'>");
                th6.append(proc_total_bill)
            td6.append(th6)
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        tr.append(td4);
        tr.append(td5);
        tr.append(td6);

        tbody.append(tr)
    $(row2).append(proc_table);

$(proc_bill_final_div).append(row1);
$(proc_bill_final_div).append(row2);
        nettotal=proc_total_bill+surg_total_bill;
        var surg_proc_bill_final_div=$("<div id='surg_proc_bill_final_div'>")
            var col_surg_proc_bill_final_div=$("<div class='col-md-12'></div>");
                row__col_surg_proc_bill_final_div=$("<div class='row' style='padding-top:20px;'></div>");
                    colmd1=$("<div class='col-md-6'></div>")
                    colmd2=$("<div class='col-md-2'></div>")
                        var label=$("<label class='surg_proc_bill_label_class'>Total Bill</label>")
                        var totalAmount=$("<label  class='surg_proc_bill_label_class' id='surg_proc_bill_final_value'>"+nettotal+"</label>")
                    colmd1.append(label);
                    colmd2.append(totalAmount);
                row__col_surg_proc_bill_final_div.append(colmd1);
                row__col_surg_proc_bill_final_div.append(colmd2);
            col_surg_proc_bill_final_div.append(row__col_surg_proc_bill_final_div);
        surg_proc_bill_final_div.append(col_surg_proc_bill_final_div);
$("#bill_div").append(surg_bill_final_div);
$("#bill_div").append(proc_bill_final_div);
$("#bill_div").append(surg_proc_bill_final_div);

printSaveRow();

}
function printSaveRow(){
    var row_div_five=$("<div class='row' id='print_save_row'></div>");
        var main_sidecol1=$("<div class='col-md-12' ></div>");
            
            var row0=$("<div></div>");
                var subrow0=$("<div class='row' style='padding-top:10px'>")
                    var subcol1=$("<div class='col-md-3'>")
                    var subcol2=$("<div class='col-md-3 offset-md-2'>")
                    var subcol3=$("<div class='col-md-3'>")
                        var bill_status_label=$("<label for='reason_label' class='custom_label_css'>Add Bill Status</label>");
                    subcol1.append(bill_status_label)
                        var option1_input=$("<input  type='radio' name='YES_NO' value='Paid' checked>Paid</input>");
                    subcol2.append(option1_input);
                        var option2_input=$("<input  type='radio' name='YES_NO' value='Unpaid'>Not Paid</input>");
                    subcol3.append(option2_input);
                subrow0.append(subcol1);
                subrow0.append(subcol2);
                subrow0.append(subcol3);
            row0.append(subrow0)

            var row1=$("<div></div>");
                var subrow1=$("<div class='row' style='padding-top:10px'>")
                    var subcol1=$("<div class='col-md-6'>")
                        var save=$("<button class='save_btn fa fa-save' onclick='saveSurgProcBill()'>  Save</button>")
                    subcol1.append(save)
                    var subcol2=$("<div class='col-md-6'>")
                        var print_btn=$("<button class='save_btn fa fa-print' onclick='printSurgProcBill()'>  Print Bill</button>")
                    subcol2.append(print_btn);
                subrow1.append(subcol1);
                subrow1.append(subcol2);
            row1.append(subrow1)
            
        main_sidecol1.append(row0);
        main_sidecol1.append(row1);


    row_div_five.append(main_sidecol1);

var bill_div=$("#bill_div");
bill_div.append(row_div_five);
// Scroll to bill div
$('html,body').animate({
    scrollTop: $("#bill_div").offset().top},
    'slow');

}
function printSurgProcBill(){
    var printcontent = $("#bill_div").clone();
    $('#patient_dash_first_div').hide();

    $('#surg_proc_bill_div').empty().html(printcontent);
    
    window.print();
    window.close();
    
    $('#surg_proc_bill_div').empty();
    $('#patient_dash_first_div').show();
    // saveSurgProcBill();


}
function saveSurgProcBill(){
    var surg_proc_bill_final_value=$("#surg_proc_bill_final_value").text();
    console.log("surg_proc_bill_final_value",surg_proc_bill_final_value)
    console.log("surg_bill_final_div",surgerybill_dict);
    console.log("proc_bill_final_div",procedurebill_dict);
    pres_id=$("#search_prescription_id").val();
    surg_total_bill=$("#totalsurg_bill").text();
    totalproc_bill=$("#totalproc_bill").text();
    var bill_status=$("input[name='YES_NO']:checked").val();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
            'surgerybill_dict':JSON.stringify(surgerybill_dict),
            "procedurebill_dict":JSON.stringify(procedurebill_dict),
            "surg_proc_bill_final_value":surg_proc_bill_final_value,
            "pres_id":pres_id,
            "surg_total_bill":surg_total_bill,
            'totalproc_bill':totalproc_bill,
            'status':bill_status,

        },
        url: '/save_surg_proc_bill',
        success: function(data){
            alert("Saved")

        }
    });
}