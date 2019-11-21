var datatable_patient_billlist=[];



$( document ).ready(function(){
   
});

function removeMedForInternalUse(){
    $("#dialog-confirm").hide()
    $('#main_page_content').empty()
    var container_med_dashboard= $('#main_page_content').append('<div class="container-fluid" id="container-med-dashboard"></div>');

    $("#container-med-dashboard").append("<h2 class ='text-center'>Despensory Medicine Removal</h2>");
    $("#container-med-dashboard").append("<hr class='custom_hr'>");
    var main_row_div= $("<div class='row is-flex'></div>");
    $(container_med_dashboard).append(main_row_div);
    var main_col_div=$("<div class='col-md-12'id='main_col_div'></div>");


    $(main_row_div).append(main_col_div);




    retrieveDespensoryMedicine();
}

function retrieveDespensoryMedicine(){
    datatable_med_desp_list=[];
    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
        },
        url: '/retireve_all_desp_med',
        success: function(data){
            createDespMedicineTable();
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
                datatable_med_desp_list.push(templist);
            }
            createDespensoryDataTable();
            createRowDivTwoBill();
            console.log("datatable_med_desp_list",datatable_med_desp_list);
        }
    });
}

function createDespensoryDataTable(){
    $(function(){
        $('#desp_med_table').append('<caption style="color: black;font-weight: bold; ;caption-side: top;text-align: center; text-decoration: underline">Medicines In Despensory</caption>');

        despmed_datatable=$("#desp_med_table").DataTable({
            data:datatable_med_desp_list,
            columns: [
                { title: "Id" },
                { title: "Medicine Name" },
                { title: "Box Stored" },
                { title: 'Strips Stored' },
                { title: "Pieces Stored" },
                { title: "piece_price_unit" },
            

                ],
                paging: false,
                scrollY: 200,
                scrollX: true,
                ordering: true,
                info:false,
    
            });
            $('#desp_med_table tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                }
                else{
                    despid=$(this).find('td').eq(0).text()
                    despmed_datatable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    createMedicineQtyColumn(despid);
                    
                }
            });
        $('.dataTables_filter  input[type="search"]').
        attr('placeholder','Search Medicine ....').
        css({'width':'200px','display':'inline-block'});
        $('.dataTables_filter input').addClass('form-control');
    });
}
function createDespMedicineTable(){
    var row_div_three=$("<div class='row' style='padding-bottom:18px'></div>");
        var col_one__row_div_three=$("<div class='col-md-12'></div>");
            row__col_one__row_div_three=$("<div class='row'></div>");
                colmd1=$("<div class='col-md-12'></div>")
                var table=$('<table id="desp_med_table" class="display" width="100%"></table>')
                colmd1.append(table);
            row__col_one__row_div_three.append(colmd1);
        col_one__row_div_three.append(row__col_one__row_div_three);
    row_div_three.append(col_one__row_div_three);
    var main_col_div=$("#main_col_div")
    $(main_col_div).append(row_div_three);
}
function createRowDivTwoBill(){
    var main_col_div=$("#main_col_div");
    var row_div_four=$("<div class='row' style='padding-bottom:18px'></div>");
        var col_one__row_div_four=$("<div class='col-md-12'></div>");
            row__col_one__row_div_four=$("<div class='row'></div>");
                colmd1=$("<div class='col-md-12'></div>");
                    var row=$("<div class='row'></div>");
                        var col1=$("<div class='col-md-4' id='desp_medicine_qty_form'>");
                        var col2=$("<div class='col-md-8' id='medicine_added_to_form'>");
                            table=$('<table id="bill_table" class="display" width="100%"></table>');
                        col2.append(table)
                    row.append(col1);
                    row.append(col2);
                colmd1.append(row);
            
            row__col_one__row_div_four.append(colmd1);
        col_one__row_div_four.append(row__col_one__row_div_four);
    row_div_four.append(col_one__row_div_four);
main_col_div.append(row_div_four);
billDTable()
}
function billDTable(){
    $(function(){
        $('#bill_table').append('<caption style="color: black;font-weight: bold; ;caption-side: top;text-align: center; text-decoration: underline">Selected Medicines To Remove</caption>');
        bill_datatable=$("#bill_table").DataTable({
            data:datatable_patient_billlist,
            columns: [
                { title: "Id" },
                { title:"Desp Id"},
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
                
            });
            $('#bill_table tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    billdata=bill_datatable.rows(this).data()[0];
                    dspstck_dict={}
                    despmed_datatable.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
                        var data = this.data();
                        console.log("data",data);
                        var meddatadict={}
                        console.log("Bill Data",billdata);
                        var medname=data[1];
                        var billmedname=billdata[3];
                        if (medname===billmedname){
                            delete pbr_dict[medname]
                            console.log("data[2]",data[2])
                            console.log("data[3]",data[3])
                            console.log("data[4]",data[4])

                            console.log("billdata[4]",billdata[4])
                            console.log("billdata[5]",billdata[5])
                            console.log("billdata[6]",billdata[5])

                            meddatadict['boxes_stored']=parseInt(data[2])+parseInt(billdata[4]);
                           
                            strips_stored=parseInt(data[3])+parseInt(billdata[5])
                            
                            meddatadict['strip_stored']=strips_stored;
                            meddatadict['piece_stored']=parseInt(data[4])+parseInt(billdata[6]);
                            console.log("In if")
                        }
                        else{
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
                   

                }
                else{
                    rowid=$(this).find('td').eq(0).text()
                    bill_datatable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    
                }
            });
    });
}

function createMedicineQtyColumn(despid){
    $("#desp_medicine_qty_form").empty();
    var col1=$("#desp_medicine_qty_form")
        var sub_row=$("<div class='row'></div>");
            var sub_col=$("<div class='col-md-12'></div>")
                var sub_sub_row1=$("<div class='row' style='padding-top:60px; padding-bottom:10px'></div>");
                    var col1_sub_sub_row1=$("<div class='col-md-4'></div>");
                        var label=$("<label class='form-control-static'>Medicine Name</label>")
                    col1_sub_sub_row1.append(label);
                    var col2_sub_sub_row1=$("<div class='col-md-6'></div>");
                        var input=$("<input id='desp-med-name' class='form-control' value='"+dspstck_dict[despid]['name']+"'></input>")
                    col2_sub_sub_row1.append(input);
                sub_sub_row1.append(col1_sub_sub_row1);
                sub_sub_row1.append(col2_sub_sub_row1);
    
                var sub_sub_row2=$("<div class='row' style='padding-bottom:10px'></div>");
                    var col1_sub_sub_row2=$("<div class='col-md-4'></div>");
                        var label=$("<label class='form-control-static'>Boxes</label>")
                    col1_sub_sub_row2.append(label);
                    var col2_sub_sub_row2=$("<div class='col-md-6'></div>");
                        var input=$("<input class='form-control' id='boxes_stored'></input>")
                    col2_sub_sub_row2.append(input);
                sub_sub_row2.append(col1_sub_sub_row2);
                sub_sub_row2.append(col2_sub_sub_row2);
                var strip_unit=dspstck_dict[despid]['strip_unit'];
                console.log("strip_unit-->",strip_unit);
                if (strip_unit!=="-" ){
                var sub_sub_row3=$("<div class='row' style='padding-bottom:10px'></div>");
                    var col1_sub_sub_row3=$("<div class='col-md-4'></div>");
                        var label=$("<label class='form-control-static'>Total Strips</label>")
                    col1_sub_sub_row3.append(label);
                    var col2_sub_sub_row3=$("<div class='col-md-6'></div>");
                        var input=$("<input class='form-control' id='strips_stored'></input>")
                    col2_sub_sub_row3.append(input);
                sub_sub_row3.append(col1_sub_sub_row3);
                sub_sub_row3.append(col2_sub_sub_row3);
                }
                var sub_sub_row4=$("<div class='row' style='padding-bottom:10px'></div>");
                    var col1_sub_sub_row4=$("<div class='col-md-4'></div>");
                        var label=$("<label class='form-control-static'>Total Pieces</label>")
                    col1_sub_sub_row4.append(label);
                    var col2_sub_sub_row4=$("<div class='col-md-6'></div>");
                        var input=$("<input class='form-control' id='pieces_stored' ></input>")
                    col2_sub_sub_row4.append(input);
                sub_sub_row4.append(col1_sub_sub_row4);
                sub_sub_row4.append(col2_sub_sub_row4);
                var sub_sub_row5=$("<div class='row'></div>");
                    var col1_sub_sub_row5=$("<div class='col-md-4'></div>");
                    var col2_sub_sub_row5=$("<div class='col-md-6'></div>");
                        var button=$("<button class='btn btn-blocl fa fa-plus-circle' id='add_med_desp' onclick='addMedicineToMedRemoveDT()' style='width:inherit'></button>")
                    col2_sub_sub_row5.append(button);
    
                sub_sub_row5.append(col1_sub_sub_row5);
                sub_sub_row5.append(col2_sub_sub_row5);
            sub_col.append(sub_sub_row1);
            sub_col.append(sub_sub_row2);
    
            if (strip_unit!=="-" ){
                sub_col.append(sub_sub_row3);
            }
    
            sub_col.append(sub_sub_row4);
            sub_col.append(sub_sub_row5);
    
        sub_row.append(sub_col);
    col1.append(sub_row);
}
function addMedicineToMedRemoveDT(){
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
        // pbr_dict={}
        bill_datatable.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
            var data = this.data();
            console.log("Bill DATA",data)
            var tempdict={}
            // tempdict['despid']=data[1]
            tempdict['medname']=data[3]
    
            // tempdict['patientid']=data[2]
            tempdict['boxes']=data[4];
           
            strips_stored=data[5]
            
            tempdict['strips']=strips_stored;
    
            tempdict['pieces']=data[6];
            tempdict['priceperpiece']=data[7];
    
            tempdict['price']=data[8];
            tempdict['amount']=data[9];
    
    
            // // pbr_dict[data[3]]=tempdict
            // pbr_dict[data[1]]=tempdict
    
        } );
        // console.log("pbr_dict",pbr_dict);
        // console.log("Patient Id", patientid);
        if (strips_wanted===undefined){
            no_strips="true";
            strips_wanted="0";
    
        }
        console.log("okokok",strips_wanted)
        console.log("asdasdmkamdkasmd",strips_wanted)
        $.ajax({
            type: 'GET',
            dataType: "json",
            'data': {
                'despid':despid,
                // 'patientid':parseInt(patientid),
                "pieces_wanted":pieces_wanted,
                'boxes_wanted':box_wanted,
                "no_strips":no_strips,
                "strips_wanted":strips_wanted,
                "despStckDict":JSON.stringify(dspstck_dict),
            },
            url: '/retrieve_medicine_from_desp_for_internal_use',
            success: function(data){
                dspstck_dict={};
                datatable_med_desp_list=[];
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
                    datatable_med_desp_list.push(templist);
                    despmed_datatable.row.add( templist ).draw();
    
                } 
                console.log("datatable_med_desp_list",datatable_med_desp_list)
                pbr_dict=JSON.parse(data['pbr_dict'])
                count=1;
                bill_datatable.clear();
                for (med in pbr_dict){
                    templist=[];
                    templist.push(count);
                    templist.push(med);
    
                    // templist.push(pbr_dict[med]['despid']);
                    // templist.push(pbr_dict[med]['patientid']);
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
