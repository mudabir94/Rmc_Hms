var surgery_data_list=[];
var procedure_data_list=[];
var already_discount=0;
var consultant="";
var surgeon="";


function surgeryProcFrom(){

    $('#main_page_content').empty()
    var container= $('#main_page_content').append('<div class="container-fluid" id="container_pat_surg_proc_bill"></div>');
    $("#container_pat_surg_proc_bill").append("<h2 class ='text-center'>Pateint Surgery/Procedure Bill</h2>");
    $("#container_pat_surg_proc_bill").append("<hr class='custom_hr'>");

    var main_row_div= $("<div class='row is-flex'></div>");

    $(container).append(main_row_div);
    var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");
       
    $(main_row_div).append(main_col_div);

    var row_div_one=$("<div class='row' id='row_div_one'></div>");
        var col_one__row_div_one=$("<div class='col-md-4'></div>");
        row__col_one__row_div_one=$("<div class='row'></div>");
            colmd1=$("<div class='col-md-4'></div>")
            colmd2=$("<div class='col-md-6'></div>")
            
            colmd3=$("<div class='col-md-2'></div>")


            pat_id_label=$("<label class='custom_label_css'>Prescription id</label>");
            colmd1.append(pat_id_label)

            pat_id_input=$("<input class='form-control' id='search_prescription_id' class='custom_input_css'>")

            colmd2.append(pat_id_input);
            var search_button=$('<button onclick="searchPrescription()">Search</button>');
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
    retrievePresInfoSurgProcBill(pres_id)    
}
function retrievePresInfoSurgProcBill(id){
    prescription_id=id;
    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
            "id":prescription_id,
        },
        url: '/retrieve_pres_info_surg_proc_bill',
        success: function(data){
            surgery_dict=JSON.parse(data["surgery_dict"])
            procedure_dict=JSON.parse(data["procedure_dict"])
            already_discount=data["already_discount"]
            consultant=data["consultant"] 
            surgeon=data["surgeon"] 
            for (var key in surgery_dict){
                surgery_data_list.push(key)
            }
            for (var key in procedure_dict){
                procedure_data_list.push(key)
            }

            console.log("procedure_data_list",procedure_data_list)
            console.log("surgery_data_list",surgery_data_list)

            createFrom();
        },
    }); 
}

function createFrom(){
    basicInfoRet();

}

function basicInfoRet(){
    var row_div_two=$("<div class='row' id='row_div_two'></div>");
    var main_subcol=$("<div class='col-md-12'></div>");

        var subrow_one=$("<div class='row'></div>")


                var col_one__subrow_one=$("<div class='col-md-6'></div>");
                        row__col_one__subrow_one=$("<div class='row'></div>");
                            var colmd1=$("<div class='col-md-4'></div>")
                            var colmd2=$("<div class='col-md-6'></div>")
                                var pat_name_label=$("<label for='emp_name_tag' class='custom_label_css'>Consultant</label>");
                                var pat_name_input=$("<input class='form-control' id='consultant_name' class='custom_input_css' value='"+consultant+"' disabled>")
                            colmd2.append(pat_name_input)
                            colmd1.append(pat_name_label)
                        row__col_one__subrow_one.append(colmd1);
                        row__col_one__subrow_one.append(colmd2);
                    col_one__subrow_one.append(row__col_one__subrow_one);


                var col_two__subrow_one=$("<div class='col-md-6'></div>");
                    var row__col_two__subrow_one=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>")
                        var colmd2=$("<div class='col-md-6'></div>")
                            var contact_type_label=$("<label class='custom_label_css'>Surgeon</label>");
                            var contact_type_input=$("<input class='form-control' id='surgeon_name' class='custom_input_css' value='"+surgeon+"'></input>")
                        colmd1.append(contact_type_label);
                        colmd2.append(contact_type_input);
    
                    row__col_two__subrow_one.append(colmd1)
                    row__col_two__subrow_one.append(colmd2)
                col_two__subrow_one.append(row__col_two__subrow_one)

            subrow_one.append(col_one__subrow_one)
            subrow_one.append(col_two__subrow_one)


        main_subcol.append(subrow_one)

    row_div_two.append(main_subcol)
var main_col_div=$("#main_col_div");
main_col_div.append(row_div_two);
subFormCreation();
}

var surg_proc_list=['Surgery','Procedure']
function subFormCreation(){
    var row_div_three=$("<div class='row' id='row_div_three'></div>");
    var main_sidecol1=$("<div class='col-md-1' ></div>");
    var main_sidecol2=$("<div class='col-md-5' ></div>");
     
        var row1=$("<div></div>");
            var subrow1=$("<div class='row'>")
                var subcol1=$("<div class='col-md-2'>")
                    var calulate_button=$("<button onclick='calculateBill()'>Calculate Bill</button>")
                subcol1.append(calulate_button)
                var subcol2=$("<div class='col-md-8'>")
                var subcol3=$("<div class='col-md-2'>")
                    var print_btn=$("<button onclick='printBill()'>print</button>")
                subcol3.append(print_btn)


            subrow1.append(subcol1);
            subrow1.append(subcol2);
            subrow1.append(subcol3);

        row1.append(subrow1)
        var row2=$("<div class='surg_proc_bill' id='bill_div'></div>");
    main_sidecol2.append(row1);
    main_sidecol2.append(row2);


    var main_subcol=$("<div class='col-md-6' id='main-column'></div>");

        var subrow_one=$("<div class='row' id='surg_proc_row-1'></div>")


                var col_one__subrow_one=$("<div class='col-md-12'  id='main_surg_proc-1'></div>");
                    var row__col_one__subrow_one=$("<div class='row' id='select_surg_proc-1'></div>");
                        var colmd1=$("<div class='col-md-4'></div>");
                            var surg_proc_label=$("<label>Surgery/Procedure</label>")
                        colmd1.append(surg_proc_label)  
                        var colmd2=$("<div class='col-md-6'></div>");
                            var surg_proc_select=$('<select id="surg_proc_sel-1" onchange="selectSurgOrProc($(this))"></select>');
                                var option=$("<option  value='--'>--</option>");
                                $(surg_proc_select).append(option);
                                for (var i=0;i<=surg_proc_list.length;i++){
                                    if (surg_proc_list[i]!==undefined){
                                        var option=$("<option id="+surg_proc_list[i]+"-opt value="+surg_proc_list[i]+">"+surg_proc_list[i]+"</option>");
                                        $(surg_proc_select).append(option);
                                    }
                                }
                        colmd2.append(surg_proc_select);
                        var colmd3=$("<div class='col-md-2'></div>");
                        //     var delete_button=$("<button onclick='deleteMainRow($(this))'>Delete</button>")
                        // colmd3.append(delete_button);

                            
                    row__col_one__subrow_one.append(colmd1);
                    row__col_one__subrow_one.append(colmd2);
                    row__col_one__subrow_one.append(colmd3);

                col_one__subrow_one.append(row__col_one__subrow_one);


            subrow_one.append(col_one__subrow_one)


        main_subcol.append(subrow_one)
        
    row_div_three.append(main_sidecol1);
    row_div_three.append(main_subcol);
    row_div_three.append(main_sidecol2);

var main_col_div=$("#main_col_div");
main_col_div.append(row_div_three);

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
            var sub_proc_col_1=$("<div   id='sub_proc-"+num+"'></div>");
                    var row__sel_proc=$("<div class='row' id='select_proc-"+num+"'></div>");
                        var colmd1=$("<div class='col-md-4'></div>");
                            var proc_label=$("<label>Procedures</label>")
                        colmd1.append(proc_label)  
                        var colmd2=$("<div class='col-md-6'></div>");
                            var proc_select=$('<select id="select_proc_ele-'+num+'" onchange="selectProc($(this))"></select>');
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
                    var row2__sel_proc=$("<div class='row' id='charges_proc-"+num+"'></div>");
                        var colmd1=$("<div class='col-md-4'></div>");
                            var proc_label=$("<label>Charges</label>")
                        colmd1.append(proc_label)  
                        var colmd2=$("<div class='col-md-6'></div>");
                            var proc_input=$("<input id='charges_proc_input-"+num+"'></input>")
                        colmd2.append(proc_input);
                    row2__sel_proc.append(colmd1);
                    row2__sel_proc.append(colmd2);
                    var row3__sel_proc=$("<div class='row'></div>");
                    
                        var colmd1=$("<div class='col-md-4'></div>");
                        if (addbutton_flag=="On"){
                            var add_more=$("<button  id='btn_addmore-"+num+"' onclick='addNewFormRow()' >Add More</label>")
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
                    var row__sel_surg=$("<div class='row' id='select_surg-"+num+"'></div>");
                        var colmd1=$("<div class='col-md-4'></div>");
                            var surg_label=$("<label>Surgeries</label>")
                        colmd1.append(surg_label)  
                        var colmd2=$("<div class='col-md-6'></div>");
                            var surg_select=$('<select id="select_surg_ele-'+num+'" onchange="selectSurg($(this))"></select>');
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

                    var row2__surgeon_charges=$("<div class='row' id='surgeon_charges-"+num+"'></div>");
                        var colmd1=$("<div class='col-md-4'></div>");
                            var surgeoncharge_label=$("<label>Surgeon Charges</label>")
                        colmd1.append(surgeoncharge_label)  
                        var colmd2=$("<div class='col-md-6'></div>");
                            var surgeoncharge_input=$("<input  id='surgeon_charges_input-"+num+"'></input>")
                        colmd2.append(surgeoncharge_input);
                    row2__surgeon_charges.append(colmd1);
                    row2__surgeon_charges.append(colmd2);
                    var row3__theatre_charges=$("<div class='row' id='theatre_charges-"+num+"'></div>");
                        var colmd1=$("<div class='col-md-4'></div>");
                            var theatre_charges_label=$("<label>Theatre Charges</label>")
                        colmd1.append(theatre_charges_label)  
                        var colmd2=$("<div class='col-md-6'></div>");
                            var theatre_charges_input=$("<input id='theatre_charges_input-"+num+"'></input>")
                        colmd2.append(theatre_charges_input);
                    row3__theatre_charges.append(colmd1);
                    row3__theatre_charges.append(colmd2);
                    var row4__anesthetic_charges=$("<div class='row' id='anesthetic_charges-"+num+"'></div>");
                        var colmd1=$("<div class='col-md-4'></div>");
                            var anesthetic_charges_label=$("<label>Anesthetic Charges</label>")
                        colmd1.append(anesthetic_charges_label)  
                        var colmd2=$("<div class='col-md-6'></div>");
                            var anesthetic_charges_input=$("<input id='anesthetic_charges_input-"+num+"' ></input>")
                        colmd2.append(anesthetic_charges_input);
                    row4__anesthetic_charges.append(colmd1);
                    row4__anesthetic_charges.append(colmd2);
                    var row6__surplus_charges=$("<div class='row' id='surplus_charges-"+num+"'></div>");
                    var colmd1=$("<div class='col-md-4'></div>");
                        var surplus_charges_label=$("<label>Surplus Charges</label>")
                    colmd1.append(surplus_charges_label)  
                    var colmd2=$("<div class='col-md-6'></div>");
                        var surplus_charges_input=$("<input id='surplus_charges_input-"+num+"' ></input>")
                    colmd2.append(surplus_charges_input);
                    row6__surplus_charges.append(colmd1);
                    row6__surplus_charges.append(colmd2);
                    var row5=$("<div class='row'></div>");
                        var colmd1=$("<div class='col-md-4'></div>");
                        if (addbutton_flag==="On"){

                            var add_more=$("<button  id='btn_addmore-"+num+"' onclick='addNewFormRow()'>Add More</label>")
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
        var subrow=$("<div class='row' id='surg_proc_row-"+num+"'></div>")


                    var col_one__subrow=$("<div class='col-md-12'  id='main_surg_proc-"+num+"'></div>");
                        var row__col_one__subrow=$("<div class='row' id='select_surg_proc-"+num+"'></div>");
                            var colmd1=$("<div class='col-md-4'></div>");
                                var surg_proc_label=$("<label>Surgery/Procedure</label>")
                            colmd1.append(surg_proc_label)  
                            var colmd2=$("<div class='col-md-6'></div>");
                                var surg_proc_select=$('<select id="surg_proc_sel-'+num+'" onchange="selectSurgOrProc($(this))"></select>');
                                    var option=$("<option  value='--'>--</option>");
                                $(surg_proc_select).append(option);

                                
                                    for (var i=0;i<=surg_proc_list.length;i++){
                                        if (surg_proc_list[i]!==undefined){
                                            var option=$("<option id='"+surg_proc_list[i]+"-opt' value='"+surg_proc_list[i]+"'>"+surg_proc_list[i]+"</option>");
                                            $(surg_proc_select).append(option);
                                        }
                                    }
                            colmd2.append(surg_proc_select);
                            var colmd3=$("<div class='col-md-2'></div>");
                                var delete_button=$("<button onclick='deleteMainRow($(this))'>Delete</button>")
                            colmd3.append(delete_button);

                                
                        row__col_one__subrow.append(colmd1);
                        row__col_one__subrow.append(colmd2);
                        row__col_one__subrow.append(colmd3);

                    col_one__subrow.append(row__col_one__subrow);


                subrow.append(col_one__subrow)


        main_column.append(subrow)

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
var surgerybill_dict={};
var procedurebill_dict={};
function calculateBill(){
    $("#bill_div").empty();
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
                templist.push(surgeon_charges);
                templist.push(theatre_charges)
                templist.push(anesthetic_charges)
                templist.push(surplus_charges)
                total_charges=parseInt(surgeon_charges)+parseInt(theatre_charges)+parseInt(anesthetic_charges)+parseInt(surplus_charges)
                templist.push(total_charges)
                surgerybill_dict[selectedsurgery]=templist;
            }
        }else if (surg_proc_val==="Procedure"){
            selectedprocedure=$("#select_proc_ele-"+num).val();
            if (selectedprocedure!=="--"){
            charges=$("#charges_proc_input-"+num).val();
            templist=[];
            templist.push(charges);
            procedurebill_dict[selectedprocedure]=templist;
            }

        }
    });
    console.log("surgerybill_dict",surgerybill_dict);
    console.log("procedurebill_dict",procedurebill_dict);
    var surg_bill_final_div=$("<div id='surg_bill_final_div'>")
        var row1=$("<div>Surgeries</div>");
        var row2=$("<div id='surgery_table_row'></div>")
            var surg_table=$("<table></table>");
            var thead=$("<thead></thead>");
                var tr=$("<tr>");
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
        if (key!=="undefined" || key!=='--'){
            var tr=$("<tr>");
                var td1=$("<td>");
                td1.append(key)

                surgeonfee=surgerybill_dict[key][0];
                var td2=$("<td>");
                td2.append(surgeonfee)

                theatrefee=surgerybill_dict[key][1];
                var td3=$("<td>");
                td3.append(theatrefee)

                anestheticfee=surgerybill_dict[key][2];
                var td4=$("<td>");
                td4.append(anestheticfee)

                surplusfee=surgerybill_dict[key][3];
                var td5=$("<td>");
                td5.append(surplusfee);

                totalfee=surgerybill_dict[key][4];
                var td6=$("<td>");
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
        var tr=$("<tr>");
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
            var th6=$("<th>");
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
    var row1=$("<div>Procedures</div>");
    var row2=$("<div id='procedure_table_row'></div>")
        var proc_table=$("<table></table>");
        var thead=$("<thead></thead>");
            var tr=$("<tr>");
                var th1=$("<th>")
                th1.append("Procedure Name")
                var th3=$("<th>")
                var th2=$("<th>")
                th2.append("Charges")
            tr.append(th1);
            tr.append(th3);
            tr.append(th2);

        thead.append(tr)
    $(proc_table).append(thead);

       
    var tbody=$("<tbody></tbody>");
    $(proc_table).append(tbody);

    var proc_total_bill=0;
    for (key in procedurebill_dict){
        console.log("Key---->",key);
        if (key!==undefined ||key!=='undefined' || key!=='--'){
            var tr=$("<tr>");
                var td1=$("<td>");
                td1.append(key)

                charges=procedurebill_dict[key][0];
                
                proc_total_bill=parseInt(charges)+proc_total_bill
                var td3=$("<td>")

                var td2=$("<td>");
                td2.append(charges)
            tr.append(td1);
            tr.append(td3);
            tr.append(td2);
            tbody.append(tr);
        }
    }
    var tr=$("<tr>");
    var td3=$("<td>");

    var td1=$("<td>");
    var th1=$("<th>");
    th1.append("Procedure Total Bill");
    td1.append(th1);
    var td2=$("<td>");
    var th2=$("<th>");
        th2.append(proc_total_bill);
    td2.append(th2);

    tr.append(td3);
    tr.append(td1);
    tr.append(td2);
    tbody.append(tr);
    $(row2).append(proc_table);

$(proc_bill_final_div).append(row1);
$(proc_bill_final_div).append(row2);
nettotal=proc_total_bill+surg_total_bill;
var surg_proc_bill_final_div=$("<div id='surg_proc_bill_final_div'>")
    var h3=$("<h3>Net Total:</h3>")
    var label=$("<label>"+nettotal+"</label>")
surg_proc_bill_final_div.append(h3);
surg_proc_bill_final_div.append(label);



$("#bill_div").append(surg_bill_final_div);
$("#bill_div").append(proc_bill_final_div);
$("#bill_div").append(surg_proc_bill_final_div);




}
function printBill(){
    var printcontent = $("#bill_div").clone();
    $('#patient_dash_first_div').hide();

    $('#surg_proc_bill_div').empty().html(printcontent);
    
    window.print();
    
    $('#surg_proc_bill_div').empty();
    $('#patient_dash_first_div').show();

  
}