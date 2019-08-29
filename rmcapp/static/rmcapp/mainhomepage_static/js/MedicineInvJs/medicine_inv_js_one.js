// Functions for populating html to main page content.
var medicine_type_list=["S","T"]
var medicine_name;
var selected_type;
var med_details;
var medicine_name_list=[];
var med_name_type_dict={};
var package_type_list=[];
var medicine_batch_in_stock_dict={}
var medicine_in_stock=[];
var medicine_batch_in_stock_list=[];
var medicine_name_type_list=[];

$( document ).ready(function() {
    retrieveMedicineType();
    retrieveMedicineNames();
    retrieveMedicineGenDataFromStock();
    // retrievePackageTypes();
   
});

function mainDashBoard(){
    $('#main_page_content').empty()
    var main_page_content= $('#main_page_content').append('<div class="container-fluid" id="container-med-dashboard"></div>');
    $("#container-med-dashboard").append("<h2>Medicine Dashboard</h2>");
    $("#container-med-dashboard").append("<hr>");
    var row_div= $("<div class='row'></div>");
    $("#container-med-dashboard").append(row_div);
    var form_group_col_md_12=$("<div class='form-group col-md-12'></div>")
    $(row_div).append(form_group_col_md_12)
    form_group_col_md_12.append("<p>TEXT/....</p>")

}
function retrieveMedicineType(){
    console.log("m",medicine_type_list)
    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
        },
        url: '/retrieve_medicine_type',
        success: function(data){
            console.log(data['Success'])
           
            medicine_type_list=data["medicine_type_list"];
            console.log("success",medicine_type_list);
        },
      
    });
   

}

function retrieveMedicineNames(){
    console.log("m",medicine_name_list);
   
    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
        },
        url: '/retrieve_medicine_name',
        success: function(data){

            medicine_name_list=data["medicine_name_list"];
            med_name_type_dict=JSON.parse(data["med_name_type_dict"]);
            medicine_name_type_list=data['medicine_name_type_list'];
            console.log("med_name_type_dict",med_name_type_dict)
            console.log("success",medicine_name_list);
        },
      
    });
   

}

function retrievePackageTypes(){
    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
        },
        url: '/retrieve_package_types',
        success: function(data){

            package_type_list=data["package_type_list"];
            package_type_list=JSON.parse(data["package_type_list"]);
            console.log("package_type_list",package_type_list)
        },
      
    });
}
function retrieveMedicineGenDataFromStock(){
    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
        },
        url: '/retrieve_medicine_gen_data_from_stock',
        success: function(data){
            medicine_batch_in_stock_dict=JSON.parse(data["medicine_batch_in_stock_dict"])
            medicine_in_stock=data["medicine_in_stock"]
            medicine_batch_in_stock_list=data["medicine_batch_in_stock_list"]
            console.log("medicine_batch_in_stock_list",medicine_batch_in_stock_list)
            console.log("medicine_batch_in_stock_dict",medicine_batch_in_stock_dict);
            console.log("medicine_in_stock",medicine_in_stock);
        },
    });
}
function addMedicineForm(){
    
    $('#main_page_content').empty();
    var main_page_content= $('#main_page_content').append('<div class="container-fluid" id="container-med-dashboard"></div>');

    $("#container-med-dashboard").append("<h2>Add Medicine To Inventory</h2>");
    $("#container-med-dashboard").append("<hr>");
    var main_row_div= $("<div class='row is-flex backgroundcss_medToInv'></div>");
    $("#container-med-dashboard").append(main_row_div);
    var main_col_div=$("<div class='col-md-8'></div>");
    var main_col2_div=$("<div class='col-md-4'></div>");

    $(main_row_div).append(main_col_div);
    $(main_row_div).append(main_col2_div);

    var row_div_one=$("<div class='row'></div>");
    var package_info_row_div=$("<div class='row'></div>");
    var row_div_three=$("<div class='row'></div>");
    var row_div_four=$("<div class='row'></div>");

    col_one__row_div_one=$("<div class='col-md-4'></div>");
    row_div_one__col_one__row_div_one=$("<div class='row'></div>");
    $(col_one__row_div_one).append(row_div_one__col_one__row_div_one);
    col_one__row_div_one__col_one__row_div_one=$("<div class='col-md-4 '><label>Medicine</label></div>");
    
    col_two__row_div_one__col_one__row_div_one=$("<div class='col-md-8' onfocusout='focusOut_medicineNameAddMedForm($(this))'id='med_name_input_div'><input type='text' id='med_name_input' class='form-control'></input></div>");

    $(row_div_one__col_one__row_div_one).append(col_one__row_div_one__col_one__row_div_one);
    $(row_div_one__col_one__row_div_one).append(col_two__row_div_one__col_one__row_div_one);

   
   
    col_two__row_div_one=$("<div class='col-md-4'></div>");
    row_div_one__col_two__row_div_one=$("<div class='row'></div>");
    $(col_two__row_div_one).append(row_div_one__col_two__row_div_one);
    col_one__row_div_one__col_two__row_div_one=$("<div class='col-md-6 '><label>Medicine Type</label></div>");
    var select=$("<select id='med_type_sel' class='form-control'></select>");
    var option=$("<option selected='selected' id="+medicine_type_list[0]+"-opt value="+medicine_type_list[0]+">"+medicine_type_list[0]+"</option>");
    $(select).append(option);

    for (var i=1;i<=medicine_type_list.length;i++){
        if (medicine_type_list[i]!==undefined){
            var option=$("<option id="+medicine_type_list[i]+"-opt value="+medicine_type_list[i]+">"+medicine_type_list[i]+"</option>");
            $(select).append(option);
        }
    }
    col_two__row_div_one__col_two__row_div_one=$("<div class='col-md-6 '></div>");
    $(col_two__row_div_one__col_two__row_div_one).append(select)
    $(row_div_one__col_two__row_div_one).append(col_one__row_div_one__col_two__row_div_one);
    $(row_div_one__col_two__row_div_one).append(col_two__row_div_one__col_two__row_div_one);
   
    
    col_three__row_div_one=$("<div class='col-md-4'></div>");

    $(row_div_one).append(col_one__row_div_one);

    $(row_div_one).append(col_two__row_div_one);

    $(row_div_one).append(col_three__row_div_one);



    // Html of row one completed. 
    // <--------------------------------------------------------->
  



    // Html of row 2 starting. 
      
    col_one__package_info_row_div=$("<div class='col-md-2'></div>");
    p__col_one__package_info_row_div=$("<label>Medicine Details</label>");
    col_one__package_info_row_div.append(p__col_one__package_info_row_div);
    col_two__package_info_row_div=$("<div class='col-md-6'></div>");
    p__col_two__package_info_row_div=$("<input type='textarea' class='form-control' id='med_details'></input>");
    col_two__package_info_row_div.append(p__col_two__package_info_row_div);
    col_three__package_info_row_div=$("<div class='col-md-4'></div>");
    package_info_row_div.append(col_one__package_info_row_div)
    package_info_row_div.append(col_two__package_info_row_div)
    package_info_row_div.append(col_three__package_info_row_div)

    // HTML of row2 completed
    // <----------------------------------------------------------->


    // Html of row 3 starting. 
    col_one__row_div_three=$("<div class='col-md-2'></div>");
    col_two__row_div_three=$("<div class='col-md-6'></div>");
    
    col_three__row_div_three=$("<div class='col-md-4'></div>");
    row_div_three.append(col_one__row_div_three)
    row_div_three.append(col_two__row_div_three)
    row_div_three.append(col_three__row_div_three)

    // HTML of row 3 completed
    // <----------------------------------------------------------->

    // Html of row 4 starting. 
    col_one__row_div_four=$("<div class='col-md-4'></div>");
    col_two__row_div_four=$("<div class='col-md-4'></div>");
    
    col_three__row_div_four=$("<div class='col-md-4'></div>");
    p__col_one__row_div_four=$("<button class='btn btn-success' onclick='saveMedicineToDb()'>Save</button>");
    col_two__row_div_four.append(p__col_one__row_div_four);
    row_div_four.append(col_one__row_div_four)
    row_div_four.append(col_two__row_div_four)
    row_div_four.append(col_three__row_div_four)

    // HTML of row 4 completed
    // <----------------------------------------------------------->



    $(main_col_div).append(row_div_one)
    $(main_col_div).append("<hr>")

    $(main_col_div).append(package_info_row_div)
    $(main_col_div).append(row_div_three);
    $(main_col_div).append("<hr>")
    $(main_col_div).append(row_div_four);
    $(main_col_div).append("<hr>")

    var row_two__col_one__row_div_one=$("<div class='row'></div>");
        var table=$('<table id="med_table" class="display" width="100%"></table>')
    row_two__col_one__row_div_one.append(table)
    $(main_col2_div).append(row_two__col_one__row_div_one)
    $(function(){

        med_table_datatable=$("#med_table").DataTable({
            data: medicine_name_type_list,
            columns: [
                { title: "Medicine" },
                { title: "Type" },
                ],
                paging: false,
                scrollY: 200,
                scrollX: true,
                ordering: true,
                info:false,
    
            });
        });
    }
function saveMedicineToDb(){
    med_name_input_div= $("#med_name_input_div")
    if ($("#med_name_input").is(':empty')){
        var div=$("<div id='empty_name_check_div'><span  class='glyphicon' style='color:red'>&#x2a;Required</span></div>")
        $("#med_name_input_div").append(div)
        alert("Medicine name empty")
        return;
    }
    console.log("medicine_name_type_list",medicine_name_type_list)
    var med_name= $("#med_name_input").val()
    var med_type= $("#med_type_sel").val()
    var med_lst= []
    med_lst.push(med_name)
    med_lst.push(med_type)
    same_med_found_flag=false
// For checkinng medicine name and type in db.. 
   
    for (lst in medicine_name_type_list){
        console.log("lst",medicine_name_type_list[lst])
        if(JSON.stringify(med_lst)==JSON.stringify(medicine_name_type_list[lst])) {
            alert("found")
            same_med_found_flag=true
            break
        }
}
    if (same_med_found_flag===true){
        return;
    }
    else {
            $( function() {

            $( "#dialog-confirm" ).dialog({
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
                "Save": function() {
                    medicine_name=$("#med_name_input").val()
                    console.log("medicine_name",medicine_name)
                    $("#med_name_input").val("");
                    selected_type = $("#med_type_sel").children("option:selected").val();
                    // $("#med_type_sel").children("option:selected").val("Syrup");
                    console.log("selected_type",selected_type)
                    med_details=$("#med_details").val();
                    $("#med_details").val("");
                    console.log("med_details",med_details);
                    // first validate the data then send to DB. 
                    // But for now just save the data. 
                    sendAjaxReqToSaveMedicineToDb(medicine_name,selected_type,med_details);
                    $( this ).dialog( "close" );

                },
                "Cancel": function() {
                $( this ).dialog( "close" );
                }
            }
            });
        } );
    }
    
    
}
function sendAjaxReqToSaveMedicineToDb(medicine_name,selected_type,med_details){
    console.log("selected_type",selected_type)
    $.ajax({
        type: 'POST',
        dataType: "json",
        // the ajax call is sent to  url name in the post function.  
        url: '/save_med_to_db',
        'data': {
            "medicine_name":JSON.stringify(medicine_name),
            "selected_type":JSON.stringify(selected_type),
            "med_details":JSON.stringify(med_details),
        },
        
        success: function(data){

        },
    });
}
function addMedicineToWhStockFrom(){
    //  Create MedStorage Form. 
    retrieveMedicineType();
    retrieveMedicineNames();
    retrieveMedicineGenDataFromStock();

    $('#main_page_content').empty();
    var main_page_content= $('#main_page_content').append('<div class="container-fluid" id="container-med-dashboard"></div>');
    $("#container-med-dashboard").append("<h2>Add Medicine To Storage</h2>");
    $("#container-med-dashboard").append("<hr class='custom_hr'>");
    var main_row_div= $("<div class='row is-flex'></div>");
    $("#container-med-dashboard").append(main_row_div);
    var main_col_div=$("<div class='col-md-6' id='medstorage_main_col_div'></div>");
    var main_col_div1=$("<div class='col-md-6'></div>");
       
    $(main_row_div).append(main_col_div);
    $(main_row_div).append(main_col_div1);

        var row_div_one=$("<div class='row'></div>");
            // Medicine Name
            col_one__row_div_one=$("<div class='col-md-4'></div>");
                row__col_one__row_div_one=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-5'></div>")
                    colmd2=$("<div class='col-md-7'></div>")

                    med_name_label=$("<label for='medicine_name_tag' class='custom_label_css'>Medicine</label>");
                    colmd1.append(med_name_label)
                    med_name_input=$("<input class='form-control' id='medicine_name_tag' onfocusout='focusOut_medicineName($(this))' class='custom_input_css'>")
                    colmd2.append(med_name_input)
                row__col_one__row_div_one.append(colmd1);
                row__col_one__row_div_one.append(colmd2);
            col_one__row_div_one.append(row__col_one__row_div_one);

            // Medicine Type
            col_two__row_div_one=$("<div class='col'></div>");
                row__col_two__row_div_one=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-6'></div>")
                    colmd2=$("<div class='col-md-6'></div>")
                    med_type_label=$("<label class='custom_label_css'>Medicine Type:</label>");
                    colmd1.append(med_type_label);
                    med_type_input=$("<input class='form-control' id='medicine_type_input' class='custom_input_css' ></input>")
                    colmd2.append(med_type_input);

                row__col_two__row_div_one.append(colmd1)
                row__col_two__row_div_one.append(colmd2)

            col_two__row_div_one.append(row__col_two__row_div_one)


            // Batch No
            col_three__row_div_one=$("<div class='col'></div>");
                row__col_three__row_div_one=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-6'></div>")
                    colmd2=$("<div class='col-md-6'></div>")
                    batchno_label=$("<label class='custom_label_css'>batchno: </label>");
                    colmd1.append(batchno_label)
                    batchno_input=$("<input class='form-control' id='batchno_input' onfocus='checkBatchNo()' class='custom_input_css'></input>")
                    colmd2.append(batchno_input)
                row__col_three__row_div_one.append(colmd1)
                row__col_three__row_div_one.append(colmd2)
            col_three__row_div_one.append(row__col_three__row_div_one)
        $(row_div_one).append(col_one__row_div_one);
        $(row_div_one).append(col_two__row_div_one);
        $(row_div_one).append(col_three__row_div_one);
        // Second Row.. 

        
    $(main_col_div).append(row_div_one);
   
      $( "#medicine_name_tag" ).autocomplete({
        source: medicine_name_list
      });
   

      $("#main_col_div1").append();

      var row_two__col_one__row_div_one=$("<div class='row'></div>");
        var table=$('<table id="med_table" class="display" width="100%"></table>')
      row_two__col_one__row_div_one.append(table)
      $(main_col_div1).append(row_two__col_one__row_div_one)

      var row_one__col_one__row_div_one=$("<div class='row'></div>");
      var table=$('<table id="med_in_stock" class="display" width="100%"></table>')
      row_one__col_one__row_div_one.append(table)
      $(main_col_div1).append(row_one__col_one__row_div_one)
      console.log("medicine_name_list",medicine_name_list)
      $(function(){

        med_table_datatable=$("#med_table").DataTable({
            data: medicine_name_type_list,
            columns: [
                { title: "Medicine" },
                { title: "Type" },
                ],
                paging: false,
                scrollY: 200,
                scrollX: true,
                ordering: true,
                info:false,

            });

        medstck_datatable=$("#med_in_stock").DataTable({
            data: medicine_batch_in_stock_list,
            columns: [
                { title: "Medicine" },
                { title: "BatchNo" },
            
                ],
                paging: false,
                scrollY: 200,
                scrollX: true,
                ordering: true,
                info:false,

            });

    });

}
function checkBatchNo(){
    medicine_name=$("#medicine_name_tag").val()
    console.log("SSSSSSs",$('#batchno_input').val())
    if($('#batchno_input').val().length!==0){
       
    }
    else{
        $.ajax({
            type: 'POST',
            dataType: "json",
            // the ajax call is sent to  url name in the post function.  
            url: '/checkmedin_medicineBatches',
            'data': {
                "medicine_name":medicine_name,
            },
            
            success: function(data){
                batchno=data['batchno']
                console.log("BATCH No",batchno)
                $('#batchno_input').val(batchno);
                $("#batchno_input").prop('disabled',true)
            },
        });
    }
}

function focusOut_medicineName(element){
    $("#medicine_type_input").val("");
    $("#batchno_input").val("");


    // check if input is valid. 
    var medicine_name=$(element).val();
    if (med_name_type_dict[medicine_name]!==undefined){
        $("#medicine_type_input").val(med_name_type_dict[medicine_name]);
        $("#medicine_type_input").prop('disabled', true);
        checkBatchNo();

        $("#row_div_two_box").remove();
        $("#row_div_four_save_box").remove();
        $("#row_div_four_save_bottle").remove();
        $("#row_div_two_bottle").remove();
        $(".custom_hr").remove();

        $("#dates_row_div").remove();

        if (med_name_type_dict[medicine_name]!=="Custom Syrup"){
            
            addRowDivTwo();
            addRowDivThree();
            addRowDivFour();
        }
        else{
            addRowDivTwoCustomSyrup();

            addRowDivThree();
            addRowDivFourCustomSyrup();
        }
    }
    else{
        console.log("Please enter a valid Medicine Name")
        $("#medicine_name_tag").focus()
    }
    // if it is then extract the med type from dict and populate in input of med type. 
    // else show a validation error and ask for right medicine name.   
}
var sublevel=0;
var sublevel_list=[];
var subpack_type_list=[]
function package_typeOnSelect(element){
    // remove every sub package on select change. 
    //  and repopulate. '
    // first Check if Medicine, Medcinice Type and Batch No are not empty then allow change.
    // medicine_name_filled=$("#medicine_name_tag").val()
    // med_type_disabled=$("#medicine_type_input").prop('disabled')
    // batch_disabled=$("#batchno_input").prop('disabled');
    // if ()
    sublevel_list=[]
    $("[id^=subpack_row_div_]").remove();
    var optionSelected = $(element).find("option:selected");
    var pack_type=optionSelected.val();
    if (pack_type==="--"){
        $("[id^=subpack_row_div_]").remove();
    }
    else{
            sublevel=1;
            sublevel_list.push(sublevel);

            console.log("sublevel_list",sublevel_list)
            console.log("package_type_list",package_type_list)
            if (pack_type!=="Piece"){

                if (pack_type==="Carton"){
                    subpack_type_list=["Box","Strip","Piece"]

                }else if(pack_type==="Box"){
                     subpack_type_list=["Strip","Piece"]
                }
                
                // var subpack_type_list=JSON.parse(JSON.stringify(package_type_list))
                // // remove all elements before 
                // var index = subpack_type_list.indexOf(pack_type);
                // console.log("index",index)
                // if (index > -1) {
                //     // subpack_type_list.shift(index); 
                //     subpack_type_list.splice(0,index+1);
                // }
                // console.log("subpack_type_list",subpack_type_list)
                subPackageHtml(pack_type,sublevel,subpack_type_list);
            }
    }
}
function subpackage_typeOnSelect(element){

    var optionSelected = $(element).find("option:selected");
   
    console.log("sublevel_list",sublevel_list)

    console.log("parent id ",$(element).parent().parent().parent().attr('id'))
    parentid=$(element).parent().parent().parent().attr('id')
    parentid=parentid.split("_");
    console.log("SUBLEVEL retrieved",parentid[3][8]);
    sublevel=parseInt(parentid[3][8])
    // if sublevellist length equal to value of sublevel, then this means that there can be more sublevels. 
    // else if value of sublevel is less than the length of sublevellist then it means that we dont have to create more sublevels,
    // in fact we have to delete rest of the sublevels. 
    var index = sublevel_list.indexOf(sublevel);
    console.log("INDEX",index);
    index=parseInt(index)
    console.log("sublevel_list LENGTH",sublevel_list.length)
    if (index===sublevel_list.length-1){
        
         
        var pack_type=optionSelected.val();
        
        if (pack_type!=="Piece" &&  pack_type!=="--"){
            var temp_subpack_type_list=JSON.parse(JSON.stringify(subpack_type_list))
            // remove all elements before 
            var index = temp_subpack_type_list.indexOf(pack_type);
            console.log("index",index)
            if (index > -1) {
                // subpack_type_list.shift(index); 
                temp_subpack_type_list.splice(0,index+1);
            }
            console.log("subpack_type_list",temp_subpack_type_list)
            sublevel=sublevel+1;
            sublevel_list.push(sublevel);
            subPackageHtml(pack_type,sublevel,temp_subpack_type_list);
            
        }
        
        
        
    }
    else if (index<sublevel_list.length){
        if (index > -1) {
            // subpack_type_list.shift(index); 
            deleted_sublevel_list=sublevel_list.splice(index+1, sublevel_list.length );
            console.log("deleted_sublevel_list",deleted_sublevel_list);
            for(var i in deleted_sublevel_list){
                console.log("deleted_sublevel_list[i]",deleted_sublevel_list[i])
                div_id="#subpack_row_div_sublevel"+deleted_sublevel_list[i]
                console.log("div_id",div_id)
                $(div_id).remove();
            }

        }
    }


 

}
function subpackage_typeOnButtonDel(parent_id,package_type){
     
    console.log("sublevel_list",sublevel_list)
    parentid=parent_id;
    parentid=parentid.split("_");
    console.log("SUBLEVEL retrieved",parentid[3][8]);
    sublevel=parseInt(parentid[3][8])
    var index = sublevel_list.indexOf(sublevel);
    index=parseInt(index);
    if (index===sublevel_list.length-1){


        sublevel_list.splice(index, sublevel_list.length);

        if (sublevel==1){
                $("[id^=subpack_row_div_]").remove();
                $("#mainpackage_type_select").val("--");

        }
        else{
            // console.log("sublevel_list",sublevel_list);
            $("#"+parent_id).remove();
        }
    }
    else if (index<sublevel_list.length){
        if (index > -1) {
            // subpack_type_list.shift(index); 
            deleted_sublevel_list=sublevel_list.splice(index+1, sublevel_list.length);
            console.log("deleted_sublevel_list",deleted_sublevel_list);
            for(var i in deleted_sublevel_list){
                console.log("deleted_sublevel_list[i]",deleted_sublevel_list[i])
                div_id="#subpack_row_div_sublevel"+deleted_sublevel_list[i]
                console.log("div_id",div_id)
                $(div_id).remove();
            }

        }
    }


}

function subPackageHtml(pack_type,sublevel,subpack_type_list){
    var medstorage_main_col_div=$('#cont_row_div_two');
            var row_div=$("<div class='row subpacks' id='subpack_row_div_sublevel"+sublevel+"' ></div>");
                 var col_one__row_div=$("<div class='col'  id='subpack_info_col_div_sublevel"+sublevel+"'></div>");
                    var row_one__col_one__row_div=$("<div class='row'></div>");
                            var subpackage_type_label=$("<label>Sub Package Type</label>");
                            var subpackage_type_select=$("<select onchange='subpackage_typeOnSelect($(this))' id='subpackage_type_select"+pack_type+"' class='form-control'></select>");
                            var option=$("<option value='--'>--</option>");
                            $(subpackage_type_select).append(option);
                            
                            // Remove package type selected. 
                            for (var i=0;i<=subpack_type_list.length;i++){
                                if (subpack_type_list[i]!==undefined){
                                    console.log("asas",subpack_type_list[i])
                                    var option=$("<option  id="+subpack_type_list[i]+"-opt value="+subpack_type_list[i]+">"+subpack_type_list[i]+"</option>");
                                    $(subpackage_type_select).append(option);
                                }
                            }

                    row_one__col_one__row_div.append(subpackage_type_label);
                    row_one__col_one__row_div.append(subpackage_type_select);
                col_one__row_div.append(row_one__col_one__row_div)

                    row_two__col_one__row_div=$("<div class='row'></div>");
                        quantity_subpackage_type_label=$("<label>Quantity:</label>");
                        quantity_subpackage_type_input=$("<input class='form-control' type='number' placeholder='1.0' step='1.00' min='1 id='sublevel"+sublevel+"' name='sublevel_input'></input>");
                    
                    row_two__col_one__row_div.append(quantity_subpackage_type_label);
                    row_two__col_one__row_div.append(quantity_subpackage_type_input);
                col_one__row_div.append(row_two__col_one__row_div)


                //     row_three__col_one__row_div=$("<div class='row'></div>");
                //         priceperpackage_label=$("<label>Price Per Package:</label>");
                //         priceperpackage_input=$("<input></input>");
                //     row_three__col_one__row_div.append(priceperpackage_label)
                //     row_three__col_one__row_div.append(priceperpackage_input)
                // col_one__row_div.append(row_three__col_one__row_div)

            var col_two__row_div=$("<div class='col'><button onclick='deleteSubPackdiv($(this))'>Delete</button></div>");
            var col_three__row_div=$("<div class='col'></div>");
            row_div.append(col_one__row_div);
            row_div.append(col_two__row_div);
            row_div.append(col_three__row_div);

        
        $(medstorage_main_col_div).append(row_div)


}

function deleteSubPackdiv(element){
    console.log($(element).parent().parent().attr('id'));
    var parent_id=$(element).parent().parent().attr('id');
    console.log($('#subpack_row_div_sublevel1 option:selected').val());
    var package_type=$('#subpack_row_div_sublevel1 option:selected').val()

    subpackage_typeOnButtonDel(parent_id,package_type)

}
var sublevel_data=[]
var previous_sublevel_data=[];
var recursive_count=0
var quantity_mainpackage=0;
var purchaseprice=0
var priceperpack=0;
function calculateFunc(){
    sublevel_data=[];
    previous_sublevel_data=[];
    recursive_count=0
    var selectedoption=$(mainpackage_type_select).val()
    quantity_mainpackage= $('#main_quantity_input').val()
    purchaseprice=$('#main_priceperpack_input').val();
    var sublev=[]
    sublevel_data=$("[id^=subpack_row_div_sublevel]").map(
    function(){
        var selectedoption=$(this).find('select').val()
        var inputval=$(this).find('input').val();
        var inputid=$(this).find('input').attr('id')
        var temp_list=[];
        temp_list=[inputid,selectedoption,inputval]
        sublev.push(temp_list)
        return sublev;
    }).get();
    sublevel_data=sublev;
    console.log("sublevel_data",sublevel_data);
    // calculate purchase price of one main  package. 
    priceperpack=purchaseprice/quantity_mainpackage;
    // check sublevel1 and store its vals use those vals for sublevels 2,3.. 
    // sublevels=['Strip','Piece']
    var j=1;
    console.log("sublevel_data.length",sublevel_data.length)
    if (sublevel_data.length!==1){
        list_length=sublevel_data.length
        $('#calc_res_info_form').empty();
            var container=$('<div class="container-left" id="container_sublevels"> </div>');
                var row=$("<div class='row' id='row_sublevels'></div>");
                    var row_div_one=$("<div class='row' id='sublevelsmainrow_"+selectedoption+"'></div>");
                        var col_one__row_div=$("<div class='col-md-12'></div>");
                            row1_col_one__row_div=$("<div class='row'></div>");
                                col__row1_col_one__row_div=$("<div class='col-md-12'></div>");
                                    priceofonepack_label=$("<label id='"+selectedoption+"_unit-label' >price of one"+selectedoption +":</label>");
                                    priceofonepack_input=$("<input id='"+selectedoption+"_unit-price' value="+priceperpack+"  disabled></input>");
                                col__row1_col_one__row_div.append(priceofonepack_label)
                                col__row1_col_one__row_div.append(priceofonepack_input)
                            row1_col_one__row_div.append(col__row1_col_one__row_div);
                        col_one__row_div.append(row1_col_one__row_div)
                    row_div_one.append(col_one__row_div);
                row.append(row_div_one)
            container.append(row)    
        $('#calc_res_info_form').append(container)    
        recursiveFunc(list_length);
    }
    else{
        // Only piece as sublevel.
        // calculate total no of pieces in all of main packs. 
        totalnoofpieces=quantity_mainpackage*sublevel_data[0][2]
        // price of 1 piece 
        priceof1piece=priceperpack/sublevel_data[0][2]
        
        
        console.log("totalnoofpieces--",totalnoofpieces)
        console.log("priceof1piece",priceof1piece)
        $('#calc_res_info_form').empty();
        var container=$('<div class="container"></div>');
            var row=$("<div class='row' id='row_sublevels'></div>");
                var row_div_one=$("<div class='row'  id='sublevelsmainrow_"+selectedoption+"'></div>");
                    var col_one__row_div=$("<div class='col-md-12'></div>");
                        var row1_col_one__row_div=$("<div class='row'></div>");
                            var col__row1_col_one__row_div=$("<div class='col-md-12'></div>");

                                priceofonepack_label=$("<label id='"+selectedoption+"_unit-label' value="+selectedoption+">price of one"+selectedoption +":</label>");
                                priceofonepack_input=$("<input id='"+selectedoption+"_unit-price' value="+priceperpack+" disabled></input>");
                            col__row1_col_one__row_div.append(priceofonepack_label)
                            col__row1_col_one__row_div.append(priceofonepack_input)
                        row1_col_one__row_div.append(col__row1_col_one__row_div);
                    col_one__row_div.append(row1_col_one__row_div)
                row_div_one.append(col_one__row_div);
                var row_div_two=$("<div class='row' id='sublevelssubrowquantity_Piece'></div>");
                    var col_one__row_div=$("<div class='col-md-12'></div>");
                        var row1_col_one__row_div=$("<div class='row'></div>");
                            var col_row1_col_one__row_div=$("<div class='col-md-12'></div>");
                                totalnoofpieces_label=$("<label id='Piece_total-label' value='Piece'>total no of Pieces:</label>");
                                totalnoofpieces_input=$("<input id='Piece_total-quant' value="+totalnoofpieces+" disabled ></input>");
                            col_row1_col_one__row_div.append(totalnoofpieces_label);
                            col_row1_col_one__row_div.append(totalnoofpieces_input);
                        row1_col_one__row_div.append(col_row1_col_one__row_div);
                    col_one__row_div.append(row1_col_one__row_div)
                row_div_two.append(col_one__row_div);
                var row_div_three=$("<div class='row'  id='sublevelssubrowprice_Piece'></div>");
                    var col_one__row_div=$("<div class='col-md-12'></div>");
                        var row1_col_one__row_div=$("<div class='row'></div>");
                            var col_row1_col_one__row_div=$("<div class='col-md-12'></div>");

                                prieceofonepiece_label=$("<label id='Piece_unit-label ' value='Piece' >Price of Piece:</label>");
                                prieceofonepiece_input=$("<input id='Piece_unit-price' value="+priceof1piece+" disabled ></input>");
                            col_row1_col_one__row_div.append(prieceofonepiece_label);
                            col_row1_col_one__row_div.append(prieceofonepiece_input);
                        row1_col_one__row_div.append(col_row1_col_one__row_div);
                    col_one__row_div.append(row1_col_one__row_div)
                row_div_three.append(col_one__row_div);

                
            row.append(row_div_one);
            row.append(row_div_two);
            row.append(row_div_three);


        container.append(row)
        $('#calc_res_info_form').append(container);



        
    }
}

function recursiveFunc(list_length){
    console.log("list_length",list_length)
    if (list_length>0){
        console.log("Hellooo")

        

        if (recursive_count==0){
            sublevel=sublevel_data[0][0]
            package_name=sublevel_data[0][1]
            quantityofsublevel=sublevel_data[0][2]
            
            totalofsublevel1=quantity_mainpackage*quantityofsublevel
            console.log("Total no of strips",totalofsublevel1);
            // price of 1 piece 
            priceof1sublevel=priceperpack/quantityofsublevel
            console.log("price of one strip",priceof1sublevel)
            var temp_list=[sublevel,package_name,quantityofsublevel,priceof1sublevel];
            previous_sublevel_data.push(temp_list);
            sublevel_data.shift();

           
            var row_div_one=$("<div class='row' id='sublevelssubrowquantity_"+package_name+"'></div>");
                    var col_one__row_div=$("<div class='col-md-12'></div>");
                        var row1_col_one__row_div=$("<div class='row'></div>");
                            var col_row1_col_one__row_div=$("<div class='col-md-12'></div>");
                                var totalofsublevel_label=$("<label id='"+package_name+"_total-label' >total no of"+package_name +":</label>");
                                var totalofsublevel_input=$("<input id='"+package_name+"_total-quant'  value="+totalofsublevel1+" disabled></input>");
                            col_row1_col_one__row_div.append(totalofsublevel_label)
                            col_row1_col_one__row_div.append(totalofsublevel_input)
                        row1_col_one__row_div.append(col_row1_col_one__row_div);
                    col_one__row_div.append(row1_col_one__row_div)
            row_div_one.append(col_one__row_div);

            var row_div_two=$("<div class='row' id='sublevelssubrowprice_"+package_name+"'></div>");
                var col_one__row_div=$("<div class='col-md-12'></div>");
                    var row1_col_one__row_div=$("<div class='row'></div>");
                        var col_row1_col_one__row_div=$("<div class='col-md-12'></div>");
                            priceofonepack_label=$("<label id='"+package_name+"_unit-label'>price  of one"+package_name +":</label>");
                            priceofonepack_input=$("<input id='"+package_name+"_unit-price' value="+priceof1sublevel+" disabled ></input>");
                        col_row1_col_one__row_div.append(priceofonepack_label)
                        col_row1_col_one__row_div.append(priceofonepack_input)
                    row1_col_one__row_div.append(col_row1_col_one__row_div);
                col_one__row_div.append(row1_col_one__row_div)
            row_div_two.append(col_one__row_div);

        $('#row_sublevels').append(row_div_one);
        $('#row_sublevels').append(row_div_two);

            

        }
        else{
            sublevel1=sublevel_data[0][0];
            package_name1=sublevel_data[0][1];
            quant1=sublevel_data[0][2];

            sublevel=previous_sublevel_data[previous_sublevel_data.length-1][0]
            package_name=previous_sublevel_data[previous_sublevel_data.length-1][1]
            quantityofsublevel=previous_sublevel_data[previous_sublevel_data.length-1][2]
            priceof1sublevel=previous_sublevel_data[previous_sublevel_data.length-1][3]

            totalnoofsublevel=quantityofsublevel*quant1*quantity_mainpackage;
            price=priceof1sublevel/quant1;
            console.log("total no of pieces",totalnoofsublevel);
            console.log("price of one piece",price);
            temp_list=[sublevel1,package_name1,quant1,price];
            previous_sublevel_data.push(temp_list);
            sublevel_data.shift();
            var row_div_one=$("<div class='row' id='sublevelssubrowquantity_"+package_name1+"'></div>");
                    var col_one__row_div=$("<div class='col-md-12'></div>");
                        row1_col_one__row_div=$("<div class='row'></div>");
                            var col_row1_col_one__row_div=$("<div class='col-md-12'></div>");
                                var priceofonepack_label=$("<label  id='"+package_name1+"_total-label'  >total no of"+package_name1 +":</label>");
                                var priceofonepack_input=$("<input  id='"+package_name1+"_total-price'  value="+totalnoofsublevel+" disabled></input>");
                            col_row1_col_one__row_div.append(priceofonepack_label)
                            col_row1_col_one__row_div.append(priceofonepack_input)
                        row1_col_one__row_div.append(col_row1_col_one__row_div);
                    col_one__row_div.append(row1_col_one__row_div)
            row_div_one.append(col_one__row_div);
            var row_div_two=$("<div class='row' id='sublevelssubrowprice_"+package_name1+"'></div>");
                var col_one__row_div=$("<div class='col-md-12'></div>");
                    row1_col_one__row_div=$("<div class='row'></div>");
                        var col_one__row_div=$("<div class='col-md-12'></div>");

                            priceofonepack_label=$("<label id='"+package_name1+"_unit-label' >price  of one"+package_name1 +":</label>");
                            priceofonepack_input=$("<input id='"+package_name1+"_unit-price' value="+price+" disabled></input>");
                        col_row1_col_one__row_div.append(priceofonepack_label)
                        col_row1_col_one__row_div.append(priceofonepack_input)
                    row1_col_one__row_div.append(col_row1_col_one__row_div);
                col_one__row_div.append(row1_col_one__row_div)
            row_div_two.append(col_one__row_div);
        $('#row_sublevels').append(row_div_one);
        $('#row_sublevels').append(row_div_two);

        }
        recursive_count=recursive_count+1;
        return recursiveFunc(sublevel_data.length)
    }
    else if (list_length<=0){
        console.log("sublevel_data",sublevel_data);
        console.log("previous_sublevel_data",previous_sublevel_data);
        return "process complete"
       
    }
}
packages_priceandquant_dict={}

function saveMedicineToWhStock(){
    if ($('#calc_res_info_form').is(':empty')){
        alert("Please Calculate")
    }
    else{
        var flag=true
        $('#calc_res_info_form input').each(function() {
            console.log("sss",$(this).val())
            if ($(this).val()==="NaN"){
                flag=false;
                alert("Please Correct your calcs")
                return;
            }
       });
    }
    if (flag===true){
                $( function() {
                    $( "#dialog-confirm" ).dialog({
                    resizable: false,
                    height: "auto",
                    width: 400,
                    modal: true,
                    buttons: {
                        "Save": function() {
        
                            packages_priceandquant_dict={}
                            var medicine_name=$("#medicine_name_tag").val();
                        
                            var batchno=$("#batchno_input").val();
                            var manufactor_date=$("#manudatepicker").val();
                            var purchaserate=$("#main_priceperpack_input").val();
                            console.log("purchaserate",purchaserate);
                            var exp_date=$("#expdatepicker").val();
                            var main_package_type=$("#mainpackage_type_select").val();
                            var main_quantity_input=$("#main_quantity_input").val();
                            packages_priceandquant_dict[main_package_type]=[parseInt(main_quantity_input)];
                            sublev=[];
                            $("[id^=subpack_row_div_sublevel]").map(
                                function(){
                                    var selectedoption=$(this).find('select').val()
                                    var inputval=$(this).find('input').val();
                                    // var inputid=$(this).find('input').attr('id')
                                    var temp_list=[];
                                    temp_list=[selectedoption,inputval]
                                    sublev.push(temp_list)
                                }).get();
                            console.log("sublevel data------",sublev);
                            // For Main Package... 
                            $("#row_sublevels").find($('[id^=sublevelsmainrow]')).map(
                                function(){
                                    row=$(this).find('input').attr('id');
                                    main_package_unit=$(this).find('input').val();
                                    split1=row.split('_');
                                    console.log(split1[0]);
                                    package_name=split1[0];
                                    if  (packages_priceandquant_dict[package_name]!==undefined){
                                        packages_priceandquant_dict[package_name].push(parseInt(main_package_unit))
                                    }
                        
                                }).get();
                            
                            //    For Sub Levl Rows
                            $("#row_sublevels").find($('[id^=sublevelssubrow]')).map(
                                function(){
                                    row=$(this).find('input').attr('id');
                                    package_name_unit_or_total=$(this).find('input').val();
                                    console.log("ROWWW",row)
                                    split1=row.split('_');
                                    console.log(split1[0]);
                                    package_name=split1[0];
                                    console.log(split1[1]);
                                    split2=split1[1].split('-')
                                    console.log(split2[0])
                                    console.log(split2[1])
                        
                                    price_or_quant=split2[1]
                                    
                                    
                                    // total no of pieces
                                    if  (packages_priceandquant_dict[package_name]===undefined){
                                        packages_priceandquant_dict[package_name]=[parseInt(package_name_unit_or_total)]
                                    }
                                    else{
                                        packages_priceandquant_dict[package_name].push(parseInt(package_name_unit_or_total))
                                    }
                                }).get();
                            
                                
                        
                            console.log("sublevel data------",sublev);
                            console.log("data-dict",packages_priceandquant_dict);
                            //  Send the data to view for saving. . . 
                            $.ajax({
                                type: 'POST',
                                dataType: "json",
                                'data': {
                                    "medicine_name":medicine_name,
                                    "batchno":batchno,
                                    "manufactor_date":manufactor_date,
                                    "exp_date":exp_date,
                                    "main_package_type":main_package_type,
                                    "main_quantity_input":main_quantity_input,
                                    'purchaserate':parseInt(purchaserate),
                                    "subleveldata":JSON.stringify(sublev),
                                    "packages_priceandquant_dict":JSON.stringify(packages_priceandquant_dict),
                                    
                                },
                                url: '/save_medicine_to_wh_stock',
                                success: function(data){
                                    console.log(data['Success']);
                                },
                            
                            });
                        
        
                        $( this ).dialog( "close" );
                        addMedicineToWhStockFrom();
        
                        },
                        Cancel: function() {
                        $( this ).dialog( "close" );
                        }
                    }
                    });
                } );
        }  
    
        
    
   
    
}

function addRowDivTwo()
{
    var main_col_div=$('#medstorage_main_col_div');

    var row_div_two=$("<div class='row' id='row_div_two_box'></div>");

    var container_row_div_two=$("<div class='container-left' id='cont_row_div_two'></div>")

    var package_info_row_div=$("<div class='row' id='package_info_row_div'></div>");
        col_one__package_info_row_div=$("<div class='col'  id='package_info_col_div'></div>");

            row_one__col_one__package_info_row_div=$("<div class='row'></div>");
                mainpackage_type_label=$("<label>Main Package Type</label>");
                var mainpackage_type_select=$("<select class='form-control' onchange='package_typeOnSelect($(this))' id='mainpackage_type_select'></select>");
                var option=$("<option value='--'>--</option>");
                $(mainpackage_type_select).append(option);
                // if medicine type is syrup then populate with this data 
                package_type_list=['Box'];
                // else use defualt package type --package_type_list=['Box','Strip','piece'];
                for (var i=0;i<=package_type_list.length;i++){
                    if (package_type_list[i]!==undefined){
                        console.log("asas",package_type_list[i])
                        var option=$("<option  id="+package_type_list[i]+"-opt value="+package_type_list[i]+">"+package_type_list[i]+"</option>");
                        $(mainpackage_type_select).append(option);
                    }
                }

            row_one__col_one__package_info_row_div.append(mainpackage_type_label);
            row_one__col_one__package_info_row_div.append(mainpackage_type_select);

            row_two__col_one__package_info_row_div=$("<div class='row'></div>");
                quantity_mainpackage_type_label=$("<label>Quantity:</label>");
                quantity_mainpackage_type_input=$("<input class='form-control' type='number' placeholder='1.0' step='1.00' min='1'  id='main_quantity_input' name='main_quantity_input'></input>");
            
            row_two__col_one__package_info_row_div.append(quantity_mainpackage_type_label);
            row_two__col_one__package_info_row_div.append(quantity_mainpackage_type_input);

            row_three__col_one__package_info_row_div=$("<div class='row'></div>");
                priceperpackage_label=$("<label>Total Purchase Rate:</label>");
                priceperpackage_input=$("<input class='form-control' type='number' placeholder='0.0' step='50.00' min='0'  id='main_priceperpack_input' name='main_priceperpack_input'></input>");
            row_three__col_one__package_info_row_div.append(priceperpackage_label)
            row_three__col_one__package_info_row_div.append(priceperpackage_input)




        col_one__package_info_row_div.append(row_one__col_one__package_info_row_div);
        col_one__package_info_row_div.append("<hr>");

        col_one__package_info_row_div.append(row_two__col_one__package_info_row_div);
        col_one__package_info_row_div.append("<hr>");

        col_one__package_info_row_div.append(row_three__col_one__package_info_row_div);
        col_one__package_info_row_div.append("<hr>");


        col_two__package_info_row_div=$("<div class='col' id='calc_res_info_form'></div>");
        col_three__package_info_row_div=$("<div class='col' id='calculate_button_div'></div>");
            row_div=$('<div class="row"></div>');
            var calculate_button=$('<button class="btn btn-primary" onclick="calculateFunc()">Calculate</button>')
            row_div.append(calculate_button);
        col_three__package_info_row_div.append(row_div);

    
    package_info_row_div.append(col_one__package_info_row_div)
    package_info_row_div.append(col_two__package_info_row_div)
    package_info_row_div.append(col_three__package_info_row_div)
    container_row_div_two.append(package_info_row_div);

    row_div_two.append(container_row_div_two);

    $(main_col_div).append(row_div_two);
    $(main_col_div).append("<hr class='custom_hr'>");

}
function addRowDivThree(){
    var main_col_div=$('#medstorage_main_col_div');

    var row_div_three=$("<div class='row' id='dates_row_div'></div>");
    
        col_one__row_div_three=$("<div class='col-md-5'></div>");
                row_one__col_one__row_div_three=$("<div class='row'></div>");
                    manufact_date_label=$("<label for='from'>Manufactoring Date</label>");
                    manufact_input=$("<input class='form-control' id='manudatepicker'>");
                    // manufact_input=$("<input  id='from'>");

                row_one__col_one__row_div_three.append(manufact_date_label);
                row_one__col_one__row_div_three.append(manufact_input);
            col_one__row_div_three.append(row_one__col_one__row_div_three);
            col_two__row_div_three=$("<div class='col-md-5'></div>");
                row_one__col_two__row_div_three=$("<div class='row'></div>");
                    exp_date_label=$("<label for='to'>Exp Date</label>");
                    exp_date_input=$("<input class='form-control' id='expdatepicker'>");
                    // exp_date_input=$("<input id='to'>");

                     row_one__col_two__row_div_three.append(exp_date_label);
                row_one__col_two__row_div_three.append(exp_date_input);
            col_two__row_div_three.append(row_one__col_two__row_div_three);
    
        row_div_three.append(col_one__row_div_three);
        row_div_three.append(col_two__row_div_three);
        
        row_div_three.append(col_one__row_div_three);
        row_div_three.append(col_two__row_div_three);

        $(main_col_div).append(row_div_three);
        $(main_col_div).append("<hr class='custom_hr'>");

        var dateFormat = "mm/dd/yy",
        from = $( "#manudatepicker" )
          .datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 3
          })
          .on( "change", function() {
            to.datepicker( "option", "minDate", getDate( this ) );
          }),
        to = $( "#expdatepicker" ).datepicker({
          defaultDate: "+1w",
          changeMonth: true,
          numberOfMonths: 3
        })
        .on( "change", function() {
          from.datepicker( "option", "maxDate", getDate( this ) );
        });
   
      function getDate( element ) {
        var date;
        try {
          date = $.datepicker.parseDate( dateFormat, element.value );
        } catch( error ) {
          date = null;
        }
   
        return date;
      }
  
        // $('#expdatepicker').datepicker();
        // $( "#manudatepicker").datepicker();
     
}
function addRowDivFour(){
    var main_col_div=$('#medstorage_main_col_div');

    var row_div_four=$("<div class='row' id='row_div_four_save_box'></div>");

        col_one__row_div_four=$("<div class='col-md-12'></div>");
            col_two__row_div_four=$("<div class='col-md-12'></div>");
            col_three__row_div_four=$("<div class='col-md-12'></div>");
                row_one__col_three__row_div_four=$("<div class='row'></div>");
                    savetomedstrgForm_button=$('<button class="btn btn-success btn-sm btn-block" onclick="saveMedicineToWhStock()">Save</button>')
                row_one__col_three__row_div_four.append(savetomedstrgForm_button);
            col_three__row_div_four.append(row_one__col_three__row_div_four);
        row_div_four.append(col_one__row_div_four);
        row_div_four.append(col_two__row_div_four)
        row_div_four.append(col_three__row_div_four)

    $(main_col_div).append(row_div_four);
    $(main_col_div).append("<hr class='custom_hr'>");

    
}

function addRowDivTwoCustomSyrup(){
    var main_col_div=$('#medstorage_main_col_div');

    var row_div_two=$("<div class='row' id='row_div_two_bottle'></div>");
    var container_row_div_two=$("<div class='container-left' id='cont_row_div_two'></div>")
            var package_info_row_div=$("<div class='row' id='package_info_row_div'></div>");
            col_one__package_info_row_div=$("<div class='col'  id='package_info_col_div'></div>");
                row_one__col_one__package_info_row_div=$("<div class='row'></div>");
                    mainpackage_type_label=$("<label>Main Med Package Type</label>");
                    var mainpackage_type_select=$("<select class='form-control' onchange='customPackage_typeOnSelect($(this))' id='mainpackage_type_select'></select>");
                    var option=$("<option value='--'>--</option>");
                    $(mainpackage_type_select).append(option);
                    // if medicine type is syrup then populate with this data 
                    package_type_list=['MainBottle','DispensoryBottle'];
                    // else use defualt package type --package_type_list=['Box','Strip','piece'];
                    for (var i=0;i<=package_type_list.length;i++){
                        if (package_type_list[i]!==undefined){
                            console.log("asas",package_type_list[i])
                            var option=$("<option  id="+package_type_list[i]+"-opt value="+package_type_list[i]+">"+package_type_list[i]+"</option>");
                            $(mainpackage_type_select).append(option);
                        }
                    }
                    row_one__col_one__package_info_row_div.append(mainpackage_type_label);
                    row_one__col_one__package_info_row_div.append(mainpackage_type_select);

                    row_two__col_one__package_info_row_div=$("<div class='row main_inputfields_bottle' ></div>");
                        ml_quantity_mainpackage_type_label=$("<label>Amount of ml in Main Package(def-Bottle):</label>");
                        ml_quantity_mainpackage_type_input=$("<input class='form-control' type='number' placeholder='1.0' step='1.00' min='1'  id='main_ml_quant_input' name='main_ml_quant_input'></input>");
                    
                    row_two__col_one__package_info_row_div.append(ml_quantity_mainpackage_type_label);
                    row_two__col_one__package_info_row_div.append(ml_quantity_mainpackage_type_input);

                    row_three__col_one__package_info_row_div=$("<div class='row'></div>");
                        priceperpackage_label=$("<label>Total Purchase Rate:</label>");
                        priceperpackage_input=$("<input class='form-control' type='number' placeholder='0.0' step='50.00' min='0'  id='main_priceperpack_input' name='main_priceperpack_input'></input>");
                    row_three__col_one__package_info_row_div.append(priceperpackage_label)
                    row_three__col_one__package_info_row_div.append(priceperpackage_input)

                    row_four__col_one__package_info_row_div=$("<div class='row'></div>");
                        quantityofpackage_label=$("<label>Quantity of Main Package(def-Bottle) :</label>");
                        quantityofpackage_input=$("<input class='form-control' type='number' placeholder='0.0' step='1.00' min='0'  id='main_quantity_input' name='main_quantity_input'></input>");
                    row_four__col_one__package_info_row_div.append(quantityofpackage_label)
                    row_four__col_one__package_info_row_div.append(quantityofpackage_input)

            col_one__package_info_row_div.append(row_one__col_one__package_info_row_div);
            col_one__package_info_row_div.append("<hr>");
    
            col_one__package_info_row_div.append(row_two__col_one__package_info_row_div);
            col_one__package_info_row_div.append("<hr>");
    
            col_one__package_info_row_div.append(row_three__col_one__package_info_row_div);
            col_one__package_info_row_div.append("<hr>");

            col_one__package_info_row_div.append(row_four__col_one__package_info_row_div);
            col_one__package_info_row_div.append("<hr>");
    
    
            col_two__package_info_row_div=$("<div class='col' id='calc_res_info_form'></div>");
            col_three__package_info_row_div=$("<div class='col' id='calculate_button_div'></div>");
                row_div=$('<div class="row"></div>');
                var calculate_button=$('<button class="btn btn-primary" onclick="calculate_medPriceQuantity_Custom()">Calculate</button>')
                row_div.append(calculate_button);
            col_three__package_info_row_div.append(row_div);
        
            
            package_info_row_div.append(col_one__package_info_row_div)
            package_info_row_div.append(col_two__package_info_row_div)
            package_info_row_div.append(col_three__package_info_row_div)

        container_row_div_two.append(package_info_row_div);
        row_div_two.append(container_row_div_two);

    $(main_col_div).append(row_div_two);
    $(main_col_div).append("<hr class='custom_hr'>");


}
function addRowDivFourCustomSyrup(){
    var main_col_div=$('#medstorage_main_col_div');

    var row_div_four=$("<div class='row' id='row_div_four_save_bottle'></div>");

        col_one__row_div_four=$("<div class='col'></div>");
            col_two__row_div_four=$("<div class='col'></div>");
            col_three__row_div_four=$("<div class='col'></div>");
                row_one__col_three__row_div_four=$("<div class='row'></div>");
                    savetomedstrgForm_button=$('<button class="btn btn-primary" onclick="saveMedicineToWhStock_Bottle()">Save</button>')
                row_one__col_three__row_div_four.append(savetomedstrgForm_button);
            col_three__row_div_four.append(row_one__col_three__row_div_four);
        row_div_four.append(col_one__row_div_four);
        row_div_four.append(col_two__row_div_four)
        row_div_four.append(col_three__row_div_four)

    $(main_col_div).append(row_div_four);
    $(main_col_div).append("<hr class='custom_hr'>");

    
}
function saveMedicineToWhStock_Bottle(){
    var medicine_name=$("#medicine_name_tag").val();
    var main_package_type=$("#mainpackage_type_select").val();
    var batchno=$("#batchno_input").val();
    var purchaserate=$("#main_priceperpack_input").val();
    var manufactor_date=$("#manudatepicker").val();

    var exp_date=$("#expdatepicker").val();

    MainBottle_total_quant=parseFloat($("#MainBottle_total-quant").val());
    MainBottle_unit_price=parseFloat($("#MainBottle_unit-price").val());
    DispensoryBottle_unit_quant=parseFloat($("#DispensoryBottle_unit-quant").val());
    DispensoryBottle_total_quant=parseFloat($("#DispensoryBottle_total-quant").val());
    DispensoryBottle_unit_price=parseFloat($("#DispensoryBottle_unit-price").val());
    console.log("medicine_name",medicine_name)
    console.log("batchno",batchno)
    console.log("purchaserate",purchaserate)
    console.log("manufactor_date",manufactor_date)
    console.log("exp_date",exp_date)
    console.log("MainBottle_total_quant",MainBottle_total_quant)
    console.log("MainBottle_unit_price",MainBottle_unit_price)
    console.log("DispensoryBottle_unit_quant",DispensoryBottle_unit_quant)
    console.log("DispensoryBottle_total_quant",DispensoryBottle_total_quant)
    console.log("DispensoryBottle_unit_price",DispensoryBottle_unit_price)



    
    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            "medicine_name":medicine_name,
            "batchno":batchno,
            "manufactor_date":manufactor_date,
            "exp_date":exp_date,
            "main_package_type":main_package_type,
            'purchaserate':parseInt(purchaserate),
            "mainbottle_total_quant":MainBottle_total_quant,
            "mainbottle_unit_price":MainBottle_unit_price,
            "dispensorybottle_unit_quant":DispensoryBottle_unit_quant,
            "dispensorybottle_total_quant":DispensoryBottle_total_quant,
            "dispensorybottle_unit_price":DispensoryBottle_unit_price,
        },
        url: '/save_medicine_to_wh_stock_bottle',
        success: function(data){
            console.log(data['Success']);
        },
      
    });

}
var sublevel_custom=0;
var sublevel_custom_list=[];
var subpack_customtype_list=[]
function customPackage_typeOnSelect(element){
    sublevel_custom_list=[];
    $("[id^=subpack_custom_row_div_sublevel]").remove();
    $("#calc_res_info_form").empty();
    $("#main_ml_quant_input").val(1)
    $("#main_priceperpack_input").val(0);
    $("#main_quantity_input").val(0);

    var optionSelected = $(element).find("option:selected");
    var pack_type=optionSelected.val();
    if (pack_type==="--" ){
        // $("[id^=subpack_custom_row_div_]").remove();
    }
    else{
        if (pack_type!=="DispensoryBottle"){

            sublevel_custom=1;
            sublevel_custom_list.push(sublevel_custom);

            subpack_customtype_list=["DispensoryBottle"]
            subPackageCustomHtml(pack_type,sublevel_custom,subpack_customtype_list);

        }
       
    }
}
function subPackageCustomHtml(pack_type,sublevel_custom,subpack_customtype_list){
    var medstorage_main_col_div=$('#cont_row_div_two');
        var row_div=$("<div class='row subpacks_custom' id='subpack_custom_row_div_sublevel_custom"+sublevel_custom+"' ></div>");
            var col_one__row_div=$("<div class='col'  id='subpack_custom_info_col_div_sublevel_custom"+sublevel_custom+"'></div>");
                var row_one__col_one__row_div=$("<div class='row'></div>");
                        var subpack_customtype_label=$("<label>Sub Package Type</label>");
                        var subpack_customtype_select=$("<select class='form-control' onchange='subpack_customtypeOnSelect($(this))' id='subpack_customtype_select"+pack_type+"'></select>");
                        var option=$("<option value='--'>--</option>");
                        $(subpack_customtype_select).append(option);
                        
                        // Remove package type selected. 
                        for (var i=0;i<=subpack_customtype_list.length;i++){
                            if (subpack_customtype_list[i]!==undefined){
                                console.log("asas",subpack_customtype_list[i])
                                var option=$("<option  id="+subpack_customtype_list[i]+"-opt value="+subpack_customtype_list[i]+">"+subpack_customtype_list[i]+"</option>");
                                $(subpack_customtype_select).append(option);
                            }
                        }
                row_one__col_one__row_div.append(subpack_customtype_label);
                row_one__col_one__row_div.append(subpack_customtype_select);
            col_one__row_div.append(row_one__col_one__row_div)

                row_two__col_one__row_div=$("<div class='row'></div>");
                    quantity_subpack_customtype_label=$("<label>Capicity of Disp Bottle(ml):</label>"); 
                    quantity_subpack_customtype_input=$("<input class='form-control' type='number' placeholder='1.0' step='1.00' min='1' id='sublevel"+sublevel_custom+"' name='sublevel_input'></input>");
                
                row_two__col_one__row_div.append(quantity_subpack_customtype_label);
                row_two__col_one__row_div.append(quantity_subpack_customtype_input);
            col_one__row_div.append(row_two__col_one__row_div)
            
            var col_two__row_div=$("<div class='col'><button class='btn' onclick='deleteSubPackCustomdiv($(this))'>Delete</button></div>");
            var col_three__row_div=$("<div class='col'></div>");
            row_div.append(col_one__row_div);
            row_div.append(col_two__row_div);
            row_div.append(col_three__row_div);

    
    $(medstorage_main_col_div).append(row_div)

}
function subpack_customtypeOnSelect(element){
    console.log("subpack_customtypeOnSelect");
}
function deleteSubPackCustomdiv(element){
    console.log("deleteSubPackCustomdiv");
    console.log($(element).parent().parent().attr('id'));
    var parent_id=$(element).parent().parent().attr('id');
    console.log($('#subpack_custom_row_div_sublevel_custom1 option:selected').val());
    var package_type=$('#subpack_custom_row_div_sublevel_custom1 option:selected').val()

    subpackageCustom_typeOnButtonDel(parent_id,package_type)
}
function subpackageCustom_typeOnButtonDel(parent_id,package_type){
    console.log("sublevel_custom_list",sublevel_custom_list)
    parentid=parent_id;

    parentid=parentid.split("_");
    console.log("SUBLEVEL retrieved",parentid[5][6]);
    sublevel_custom=parseInt(parentid[5][6])
    var index = sublevel_custom_list.indexOf(sublevel_custom);
    index=parseInt(index);
    console.log("index",index)
    console.log("sublevel_custom_list",sublevel_custom_list.length)
    // if (sublevel_custom_list.length===0){
    if (index===sublevel_custom_list.length-1){


        sublevel_custom_list.splice(index, sublevel_custom_list.length);
        console.log("sublevel_custom",sublevel_custom)
        if (sublevel_custom==1){
                $("[id^=subpack_custom_row_div_]").remove();
                $("#mainpackage_type_select").val("--");
                $("#main_ml_quant_input").val(1)
                $("#main_priceperpack_input").val(0);
                $("#main_quantity_input").val(0);

        }
    }
}

function calculate_medPriceQuantity_Custom(){
    var selectedoption=$("#mainpackage_type_select").val()
    quantity_mainpackage= $('#main_quantity_input').val()
    purchaseprice=$('#main_priceperpack_input').val();
    amount=$("#main_ml_quant_input").val();
    var sublevel_customtemplist=[]
    $("[id^=subpack_custom_row_div_sublevel]").map(

    function(){
            var option=$(this).find('select').val()
            var inputval=$(this).find('input').val();
            var inputid=$(this).find('input').attr('id')
            var temp_list=[];
            temp_list=[inputid,option,inputval]
            sublevel_customtemplist.push(temp_list)
        }).get();
    console.log("Main Package",selectedoption)
    console.log("quantity_mainpackage",quantity_mainpackage)
    console.log("purchaseprice",purchaseprice)
    console.log("amount",amount)
    console.log("sublevel_customtemplist",sublevel_customtemplist)
    noofbottles=quantity_mainpackage;
    mlinonebottle=amount;
    totalpurchaserate=purchaseprice;
    priceofonebottle=totalpurchaserate/noofbottles;
    console.log("sublevel_customtemplist[2]",sublevel_customtemplist[0][2])
    mlinoneminibottle=parseInt(sublevel_customtemplist[0][2])
    noofdespbottleinonebottle=mlinonebottle/mlinoneminibottle;
    totaldespbottle=noofdespbottleinonebottle*noofbottles;
    priceofonedespbottle=totalpurchaserate/totaldespbottle;
    console.log("noofbottles",noofbottles);
    console.log("mlinonebottle",mlinonebottle);
    console.log("totalpurchaserate",totalpurchaserate);
    console.log("priceofonebottle",priceofonebottle);
    console.log("mlinoneminibottle",mlinoneminibottle);
    console.log("noofdespbottleinonebottle",noofdespbottleinonebottle);
    console.log("totaldespbottle",totaldespbottle);
    console.log("priceofonedespbottle",priceofonedespbottle);
    $('#calc_res_info_form').empty();
    var container=$('<div class="container-left" id="container_sublevels"> </div>');
        var row=$("<div class='row' id='row_sublevels'></div>");
        var row_div_one=$("<div class='row' id='sublevelsmainrowquant_"+selectedoption+"'></div>");
                var col_one__row_div=$("<div class='col-md-12'></div>");
                    var row1_col_one__row_div=$("<div class='row'></div>");
                            var col1__row1_col_one__row_div=$("<div class='col-md-12'></div>");
                                quanttotal_label=$("<label id='"+selectedoption+"_total' >No of Bottles:</label>");
                                quanttotal_input=$("<input id='"+selectedoption+"_total-quant' value="+noofbottles+"  disabled></input>");
                            col1__row1_col_one__row_div.append(quanttotal_label)
                            col1__row1_col_one__row_div.append(quanttotal_input)
                    row1_col_one__row_div.append(col1__row1_col_one__row_div);
                col_one__row_div.append(row1_col_one__row_div)
            row_div_one.append(col_one__row_div);
        row.append(row_div_one)
        var row_div_two=$("<div class='row' id='sublevelsmainrowmlunit_"+selectedoption+"'></div>");
                var col_one__row_div=$("<div class='col-md-12'></div>");
                    var row1_col_one__row_div=$("<div class='row'></div>");
                        var col1__row1_col_one__row_div=$("<div class='col-md-12'></div>");
                            mlperunit_label=$("<label id='"+selectedoption+"_unit' >Ml in 1 Bottle:</label>");
                            mlperunit_input=$("<input id='"+selectedoption+"_unit-ml' value="+mlinonebottle+"  disabled></input>");
                        col1__row1_col_one__row_div.append(mlperunit_label)
                        col1__row1_col_one__row_div.append(mlperunit_input)
                    row1_col_one__row_div.append(col1__row1_col_one__row_div);
                col_one__row_div.append(row1_col_one__row_div)
                row_div_two.append(col_one__row_div);
        row.append(row_div_two)
        var row_div_three=$("<div class='row' id='sublevelsmainrowpriceunit_"+selectedoption+"'></div>");
            var col_one__row_div=$("<div class='col-md-12'></div>");
                var row1_col_one__row_div=$("<div class='row'></div>");
                    var col1__row1_col_one__row_div=$("<div class='col-md-12'></div>");
                        priceofonepack_label=$("<label id='"+selectedoption+"_unit' >price of one Bottle:</label>");
                        priceofonepack_input=$("<input id='"+selectedoption+"_unit-price' value="+priceofonebottle+"  disabled></input>");
                    col1__row1_col_one__row_div.append(priceofonepack_label)
                    col1__row1_col_one__row_div.append(priceofonepack_input)
                row1_col_one__row_div.append(col1__row1_col_one__row_div);
            col_one__row_div.append(row1_col_one__row_div)
            row_div_three.append(col_one__row_div);
        row.append(row_div_three)
        var row_div_four=$("<div class='row' id='sublevelsSubrowquantunit_"+sublevel_customtemplist[0][1]+"'></div>");
                var col_one__row_div=$("<div class='col-md-12'></div>");
                    var row1_col_one__row_div=$("<div class='row'></div>");
                        var col1__row1_col_one__row_div=$("<div class='col-md-12'></div>");
                            quantperunit_label=$("<label id='"+sublevel_customtemplist[0][1]+"_unit' >No of Dispensory Bottles in 1 Bottle :</label>");
                            quantperunit_input=$("<input id='"+sublevel_customtemplist[0][1]+"_unit-quant' value="+noofdespbottleinonebottle+"  disabled></input>");
                        col1__row1_col_one__row_div.append(quantperunit_label)
                        col1__row1_col_one__row_div.append(quantperunit_input)
                    row1_col_one__row_div.append(col1__row1_col_one__row_div);
                col_one__row_div.append(row1_col_one__row_div)
                row_div_four.append(col_one__row_div);
        row.append(row_div_four)
        var row_div_five=$("<div class='row' id='sublevelsSubrowmlunit_"+sublevel_customtemplist[0][1]+"'></div>");
            var col_one__row_div=$("<div class='col-md-12'></div>");
                var row1_col_one__row_div=$("<div class='row'></div>");
                    var col1__row1_col_one__row_div=$("<div class='col-md-12'></div>");
                        mlperunit_label=$("<label id='"+sublevel_customtemplist[0][1]+"_unit' >Ml in one Dispensory Bottles :</label>");
                        mlperunit_input=$("<input id='"+sublevel_customtemplist[0][1]+"_unit-ml' value="+mlinoneminibottle+"  disabled></input>");
                    col1__row1_col_one__row_div.append(mlperunit_label)
                    col1__row1_col_one__row_div.append(mlperunit_input)
                row1_col_one__row_div.append(col1__row1_col_one__row_div);
            col_one__row_div.append(row1_col_one__row_div)
            row_div_five.append(col_one__row_div);
        row.append(row_div_five)
        var row_div_six=$("<div class='row' id='sublevelsSubrowquanttotal_"+sublevel_customtemplist[0][1]+"'></div>");
            var col_one__row_div=$("<div class='col-md-12'></div>");
                var row1_col_one__row_div=$("<div class='row'></div>");
                    var col1__row1_col_one__row_div=$("<div class='col-md-12'></div>");
                        quantTotal_label=$("<label id='"+sublevel_customtemplist[0][1]+"_total' >Total Dispensory Bottles:</label>");
                        quantTotal_input=$("<input id='"+sublevel_customtemplist[0][1]+"_total-quant' value="+totaldespbottle+"  disabled></input>");
                    col1__row1_col_one__row_div.append(quantTotal_label)
                    col1__row1_col_one__row_div.append(quantTotal_input)
                row1_col_one__row_div.append(col1__row1_col_one__row_div);
            col_one__row_div.append(row1_col_one__row_div)
            row_div_six.append(col_one__row_div);
        row.append(row_div_six)
        var row_div_seven=$("<div class='row' id='sublevelsSubrowpriceunit_"+sublevel_customtemplist[0][1]+"'></div>");
            var col_one__row_div=$("<div class='col-md-12'></div>");
                var row1_col_one__row_div=$("<div class='row'></div>");
                    var col1__row1_col_one__row_div=$("<div class='col-md-12'></div>");
                        priceperunit_label=$("<label id='"+sublevel_customtemplist[0][1]+"_unit' >Price of one Dispensory Bottle:</label>");
                        priceperunit_input=$("<input id='"+sublevel_customtemplist[0][1]+"_unit-price' value="+priceofonedespbottle+"  disabled></input>");
                    col1__row1_col_one__row_div.append(priceperunit_label)
                    col1__row1_col_one__row_div.append(priceperunit_input)
                row1_col_one__row_div.append(col1__row1_col_one__row_div);
            col_one__row_div.append(row1_col_one__row_div)
            row_div_seven.append(col_one__row_div);
        row.append(row_div_seven)
    container.append(row)    
    $('#calc_res_info_form').append(container);


}
var inactive_datatable;
var medstck_datatable;
var medicine_batch_in_tempstock_list=[]
function addMedicineToDespStockForm(){
    $("#med_in_stock").remove();
    $("#med_in_temp_stock").remove();
    if (inactive_datatable!==undefined ){
        inactive_datatable.destroy();
    }
    if (medstck_datatable!==undefined){
        medstck_datatable.destroy();
    }
    $('#main_page_content').empty();
    var main_page_content= $('#main_page_content').append('<div class="container-fluid" id="container-med-dashboard"></div>');
    $("#container-med-dashboard").append("<h2>Add Medicine To Despensory</h2>");
    $("#container-med-dashboard").append("<hr class='custom_hr'>");
    var main_row_div= $("<div class='row is-flex'></div>");
    $("#container-med-dashboard").append(main_row_div);
    var main_col_div_1=$("<div class='col-md-8' id='despstorage_first_col_div'></div>");
    var main_col_div_2=$("<div class='col-md-4' id='despstorage_second_col_div'></div>");

    $(main_row_div).append(main_col_div_1);
    $(main_row_div).append(main_col_div_2);
    despMedFormMainColOne(main_col_div_1);
    despMedFormMainColTwo(main_col_div_2);
    console.log("medicine_batch_in_stock_list",medicine_batch_in_stock_list)
    $(function(){

    medstck_datatable=$("#med_in_stock").DataTable({
        data: medicine_batch_in_stock_list,
        columns: [
            { title: "Medicine" },
            { title: "BatchNo" },
        
            ],
            paging: false,
            scrollY: 200,
            scrollX: true,
            ordering: true,
            info:false,



        });

        $('#med_in_stock tbody').on( 'click', 'tr', function () {
            if ( $(this).hasClass('selected') ) {
                alert("clicked same entry")

                $(this).removeClass('selected');
            }
            else {
                var medicine_name=$(this).find('td').eq(0).text()
                medstck_datatable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                // if (inactive_datatable!==undefined){
                //     inactive_datatable.destroy();
                // }
                $("#med_in_temp_stock_datatable_row").remove();
                $("#active_batch_data_row").remove();
                $("#medicine_name_tag").val(medicine_name);
                focusOut_medicineNameDesp($("#medicine_name_tag"));
                var pieces=0;
                var strips=0;
                var boxes=0;
                var active_row_div_two=$("<div class='row despstorage_second_col_div_three_rows' id='active_batch_data_row'></div>");
                    var col_one__row_div_two=$("<div class='col'></div>");
                        var row__col_one__row_div_two=$("<div class='row'></div>");
                            label=$("<lable>Active Batch Stock Data</label>")
                        row__col_one__row_div_two.append(label)

                        var row1__col_one__row_div_two=$("<div class='row'></div>");
                        var row3__col_one__row_div_two=$("<div class='row'></div>");
                        var row2__col_one__row_div_two=$("<div class='row'></div>");



                                
                                            // based on medicine name and get current data in stock through ajax,
                                            $.ajax({
                                                type:"POST",
                                                dataType:"json",
                                                'data':{
                                                    "medicine_name":medicine_name,
                                                },
                                                url:"/retrieve_medicine_stock_data_from_stock",
                                                success:function (data){
                                                    boxes=data["boxes"]
                                                    strips=data['strips']
                                                    pieces=data["pieces"]
                                                    console.log("boxes",boxes)
                                                    console.log("pieces",pieces)


                                                        var colmd1=$("<div class='col-md-6'></div>")
                                                            boxamount_label=$("<label class='custom_label_css'>No of Boxes Stored:</label>");
                                                        colmd1.append(boxamount_label)
                                                        var colmd2=$("<div class='col-md-6'></div>")
                                                             boxamount_input=$("<input class='form-control' type='number' id='active_box_input' class='custom_input_css' value='"+boxes+"' disabled> </input>")
                                                        colmd2.append(boxamount_input)
                                                        row1__col_one__row_div_two.append(colmd1);
                                                        row1__col_one__row_div_two.append(colmd2);
                                                    if (strips!==0){
                                                            var colmd1=$("<div class='col-md-6'></div>")
                                                                pieceamount_label=$("<label class='custom_label_css'>No of Strips Stored:</label>");
                                                            colmd1.append(pieceamount_label)
                                                            var colmd2=$("<div class='col-md-6'></div>")
                                                                pieceamount_input=$("<input class='form-control' type='number' id='active_strip_input' value='"+strips+"'  class='custom_input_css' disabled> </input>")
                                                            colmd2.append(pieceamount_input)
                                                        row3__col_one__row_div_two.append(colmd1);
                                                        row3__col_one__row_div_two.append(colmd2);
                                                    }
                    
                                                        var colmd1=$("<div class='col-md-6'></div>")
                                                            pieceamount_label=$("<label class='custom_label_css'>No of Pieces Stored:</label>");
                                                        colmd1.append(pieceamount_label)
                                                        var colmd2=$("<div class='col-md-6'></div>")
                                                            pieceamount_input=$("<input class='form-control' type='number' id='active_piece_input' value='"+pieces+"'  class='custom_input_css' disabled> </input>")
                                                        colmd2.append(pieceamount_input)
                                                    row2__col_one__row_div_two.append(colmd1);
                                                    row2__col_one__row_div_two.append(colmd2);
                                                },
                                            });
                    col_one__row_div_two.append(row__col_one__row_div_two)
                    col_one__row_div_two.append(row1__col_one__row_div_two);         
                    col_one__row_div_two.append(row2__col_one__row_div_two);         
                    col_one__row_div_two.append(row3__col_one__row_div_two);         
                active_row_div_two.append(col_one__row_div_two);    
                $(main_col_div_2).append(active_row_div_two);


                var temp_row_div_three=$("<div class='row despstorage_second_col_div_three_rows' id='med_in_temp_stock_datatable_row'></div>");
                var col_one__row_div_three=$("<div class='col'></div>");

                    var row1__col_one__row_div_three=$("<div class='row'></div>");
                        var label=$("<label>InActive Batches of Medicine </label>")
                    row1__col_one__row_div_three.append(label);

                    var row2__col_one__row_div_three=$("<div class='row'></div>");
                            table=$('<table id="med_in_temp_stock" class="display"></table>')
                    row2__col_one__row_div_three.append(table);

                col_one__row_div_three.append(row1__col_one__row_div_three);         
                col_one__row_div_three.append(row2__col_one__row_div_three);   
                      
            temp_row_div_three.append(col_one__row_div_three);    
            $(main_col_div_2).append(temp_row_div_three);
            $.ajax({
                type:"POST",
                dataType:"json",
                'data':{
                    "medicine_name":medicine_name,
                },
                url:"/retrieve_medicine_tempstock_from_tempstock",
                success:function (data){
                   
                    medicine_batch_in_tempstock_list=data['medicine_batch_in_tempstock_list'];
                    console.log(medicine_batch_in_tempstock_list)
                    $(function(){
                    
                            inactive_datatable=$("#med_in_temp_stock").DataTable({
                            data:medicine_batch_in_tempstock_list ,
                            columns: [
                                { title: "Med" },
                                { title: "BatNo" },
                                
                                { title: "boxes" },
                                { title: "Strips" },

                                { title: "pieces" },
                            
                                ],
                                
                                paging: false,
                                "scrollY": 100,
                                "scrollX": 50,
                                "ordering": true,
                                "searching":false,
                                "autoWidth": false,
                                info:false,
                    
                            });
                    
                        
                    });
           

                },
            });
        
            }   
        } );
    });
   

}
function despMedFormMainColOne(main_col_div_1){
    var row_div_one=$("<div class='row desp_col_div_rows'></div>");
    // Medicine Name
    col_one__row_div_one=$("<div class='col '></div>");
        row__col_one__row_div_one=$("<div class='row'></div>");
            colmd1=$("<div class='col-md-6'></div>")
            colmd2=$("<div class='col-md-6'></div>")

            med_name_label=$("<label for='medicine_name_tag' class='custom_label_css'>Medicine</label>");
            colmd1.append(med_name_label)
            med_name_input=$("<input class='form-control' id='medicine_name_tag' onfocusout='focusOut_medicineNameDesp($(this))'  class='custom_input_css'>")
            colmd2.append(med_name_input)
        row__col_one__row_div_one.append(colmd1);
        row__col_one__row_div_one.append(colmd2);
    col_one__row_div_one.append(row__col_one__row_div_one);

    
    // Batch No
    col_three__row_div_one=$("<div class='col'></div>");
        row__col_three__row_div_one=$("<div class='row'></div>");
            colmd1=$("<div class='col-md-6'></div>")
            colmd2=$("<div class='col-md-6'></div>")
            batchno_label=$("<label class='custom_label_css'>batchno: </label>");
            colmd1.append(batchno_label)
            batchno_input=$("<input class='form-control' type='number'  id='batchno_input'  class='custom_input_css'></input>")
            colmd2.append(batchno_input)
        row__col_three__row_div_one.append(colmd1)
        row__col_three__row_div_one.append(colmd2)
    col_three__row_div_one.append(row__col_three__row_div_one)
$(row_div_one).append(col_one__row_div_one);
$(row_div_one).append(col_three__row_div_one);
// Second Row.. 
var row_div_four=$("<div class='row desp_col_div_rows'></div>");
col_one__row_div_four=$("<div class='col-md-10'></div>");
col_two__row_div_four=$("<div class='col-md-2'></div>");
    row__col_two__row_div_four=$("<div class='row'></div>");
        var colmd1=$("<div class='col-md-12'></div>")
        var add_button=$("<button class='add_all_stk' onclick='addAllstck()' >Add All Stock</button>")
        colmd1.append(add_button)
    row__col_two__row_div_four.append(colmd1);
col_two__row_div_four.append(row__col_two__row_div_four);
row_div_four.append(col_one__row_div_four);
row_div_four.append(col_two__row_div_four);


$(main_col_div_1).append(row_div_one);
$(main_col_div_1).append(row_div_four);



 $( "#medicine_name_tag" ).autocomplete({
        source: medicine_in_stock
      });

}
function addAllstck(){
        var abc = $("#active_box_input").val()
        if (abc === undefined){
            alert("Please select a medicine")
        }
        else{
            console.log("oooo", $("#active_box_input").val())
            $("#noofboxes_input").val($("#active_box_input").val())    
        }
}

function despMedFormMainColTwo(main_col_div_2){
    var row_div_one=$("<div class='row despstorage_second_col_div_three_rows' id='med_in_stock_table_row'></div>");
        col_one__row_div_one=$("<div class='col '></div>");
            row__col_one__row_div_one=$("<div class='row'></div>");
                table=$('<table id="med_in_stock" class="display" width="100%"></table>')
                
                
                
            row__col_one__row_div_one.append(table)
        col_one__row_div_one.append(row__col_one__row_div_one);         
    row_div_one.append(col_one__row_div_one);

    $(main_col_div_2).append(row_div_one);


}

function focusOut_medicineNameDesp(element){
    var medicine_name=$(element).val();
    if (medicine_batch_in_stock_dict[medicine_name]!==undefined){
        batchno=medicine_batch_in_stock_dict[medicine_name];
        $('#batchno_input').val(parseInt(batchno));
        $("#batchno_input").prop('disabled',true);   
        $.ajax({
            type:"POST",
            dataType:"json",
            'data':{
                "medicine_name":medicine_name,
            },
            url:"/retrieve_medicine_stock_data_from_stock",
            success:function (data){
                boxes=data["boxes"]
                strips=data['strips'];
                pieces=data["pieces"];

                $("#row_div_two").remove()
                $("#row_div_three").remove()
                var despstorage_first_col_div=$("#despstorage_first_col_div")
                    var row_div_two=$("<div class='row' id='row_div_two'></div>");
                        col_one__row_div_two=$("<div class='col-md-10'></div>");
                            row1__col_one__row_div_two=$("<div class='row desp_col_div_rows'></div>");
                                var colmd1=$("<div class='col-md-6'></div>")
                                var colmd2=$("<div class='col-md-6'></div>")
                                boxamount_label=$("<label class='custom_label_css'>No of Boxes:</label>");
                                colmd1.append(boxamount_label)
                                boxamount_input=$("<input class='form-control' type='number' id='noofboxes_input' class='custom_input_css' value='0'> </input>")
                                colmd2.append(boxamount_input)
                            row1__col_one__row_div_two.append(colmd1);
                            row1__col_one__row_div_two.append(colmd2);
                        if (strips!==0){
                            row3__col_one__row_div_two=$("<div class='row desp_col_div_rows'></div>")
                                var colmd1=$("<div class='col-md-6'></div>")
                                var colmd2=$("<div class='col-md-6'></div>")
                                pieceamount_label=$("<label class='custom_label_css'>No of Strips:</label>");
                                colmd1.append(pieceamount_label)
                                pieceamount_input=$("<input class='form-control' type='number' id='noofstrips_input' value='0'  class='custom_input_css'> </input>")
                                colmd2.append(pieceamount_input)
                            row3__col_one__row_div_two.append(colmd1);
                            row3__col_one__row_div_two.append(colmd2);
                        }

                            row2__col_one__row_div_two=$("<div class='row desp_col_div_rows'></div>");
                                var colmd1=$("<div class='col-md-6'></div>")
                                var colmd2=$("<div class='col-md-6'></div>")
                                pieceamount_label=$("<label class='custom_label_css'>No of Pieces:</label>");
                                colmd1.append(pieceamount_label)
                                pieceamount_input=$("<input class='form-control' type='number' id='noofpieces_input' value='0'  class='custom_input_css'> </input>")
                                colmd2.append(pieceamount_input)
                            row2__col_one__row_div_two.append(colmd1);
                            row2__col_one__row_div_two.append(colmd2);

                        col_one__row_div_two.append(row1__col_one__row_div_two);
                        col_one__row_div_two.append(row2__col_one__row_div_two);
                        if (strips!==0){
                        col_one__row_div_two.append(row3__col_one__row_div_two);
                        }





                        col_two__row_div_two=$("<div class='col-md-2'></div>");
                            row__col_two__row_div_two=$("<div class='row'></div>");
                        col_two__row_div_two.append(row__col_two__row_div_two);

                    row_div_two.append(col_one__row_div_two);
                    row_div_two.append(col_two__row_div_two);


                    var row_div_three=$("<div class='row desp_col_div_rows' id='row_div_three'></div>");
                        col_one__row_div_three=$("<div class='col-md-10'></div>");

                        col_two__row_div_three=$("<div class='col-md-2'></div>");
                            row__col_two__row_div_three=$("<div class='row'></div>");
                                    var colmd1=$("<div class='col-md-12'></div>")
                                    var save_button=$("<button class='btn btn-success' onclick='SaveToDespStock()'>Save</button>")
                                    colmd1.append(save_button)
                            row__col_two__row_div_three.append(colmd1);
                        col_two__row_div_three.append(row__col_two__row_div_three);

                    row_div_three.append(col_one__row_div_three);
                    row_div_three.append(col_two__row_div_three);

                $(despstorage_first_col_div).append(row_div_two);
                $(despstorage_first_col_div).append(row_div_three);        
            },
        });

        
    }
    else{
        console.log("Please enter a valid Medicine Name")
        $("#medicine_name_tag").focus()
    }

}
function SaveToDespStock(){

    var med_name=$("#medicine_name_tag").val();
    var batch_no=$("#batchno_input").val();
    var noofboxes=$("#noofboxes_input").val();
    var noofpieces=$("#noofpieces_input").val();
    if($("#noofstrips_input").length){
        var noofstrips=$("#noofstrips_input").val();
    }else{
        var noofstrips=0;
    }

    
    console.log("med_name",med_name)
    console.log("batch_no",batch_no)
    console.log("noofstrips",noofstrips)
    console.log("noofboxes",noofboxes)
    console.log("noofpieces",noofpieces)
    $.ajax({
        type:"POST",
        dataType:"json",
        'data':{
            "medicine_name":med_name,
            "batch_no":batch_no,
            "noofboxes":parseInt(noofboxes),
            "noofstrips":parseInt(noofstrips),
            "noofpieces":parseInt(noofpieces),
        },
        url:"/save_to_desp_stock",
        success:function (data){
            console.log("data")
            addMedicineToDespStockForm();
           
        },
    });


}


function focusOut_medicineNameAddMedForm(element){
    $("#empty_name_check_div").remove()
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


   
   
