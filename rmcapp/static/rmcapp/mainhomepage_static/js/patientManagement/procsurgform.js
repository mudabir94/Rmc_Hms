var ps_type_list=['Minor Procedures','Surgeries'];
var surg_dict;
var surg_id_selected=0;
var surg_list=[]
var proc_dict;
var proc_id_selected=0;
var proc_list=[]
var surg_data_info_datatable;
var proc_data_info_datatable;
var proc_datatable;
var surg_datatable;
$( document ).ready(function() {
   
});

function addProcSurgForm(){
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': { 

        },
        url: '/get_proc_surg_info',
        success: function(data){   
            $('#main_page_content').empty()
            var container_procedure_surgery_dashboard= $('#main_page_content').append('<div class="container-fluid" id="container-procedure-surgery-dashboard"></div>');
            $("#container-procedure-surgery-dashboard").append("<h2 class ='center_h_tag_forms'>Procedures & Surgeries</h2>");
            $("#container-procedure-surgery-dashboard").append("<hr class='custom_hr'>");
            var main_row_div= $("<div class='row is-flex'></div>");
        
            $(container_procedure_surgery_dashboard).append(main_row_div);
            var main_col_div=$("<div class='col-md-6' id='main_col_div'></div>");
               
            $(main_row_div).append(main_col_div);
        
                var row_div_one=$("<div class='row' style='padding-bottom:10px'></div>");
                    var col_one__row_div_one=$("<div class='col-md-12'></div>");
                        row__col_one__row_div_one=$("<div class='row'></div>");
                            colmd1=$("<div class='col-md-6'></div>")
                            colmd2=$("<div class='col-md-6'></div>")
        
                            procedure_label=$("<label for='procedure_tag' class='custom_label_css'>Procedure/Surgery</label>");
                            colmd1.append(procedure_label)
                            var select=$("<select id='ps_type_select' class='form-control-custom' onchange='proc_surgery_OnSelect($(this))'></select>");
                                var option=$("<option selected='selected' value='--'>--</option>");
                                var option1=$("<option id="+ps_type_list[0]+"-opt value="+ps_type_list[0]+">"+ps_type_list[0]+"</option>");
        
                                $(select).append(option);
                                $(select).append(option1);
                             colmd2.append(select) 
                            
                                for (var i=1;i<=ps_type_list.length;i++){
                                    if (ps_type_list[i]!==undefined){
                                        var option=$("<option id="+ps_type_list[i]+"-opt value="+ps_type_list[i]+">"+ps_type_list[i]+"</option>");
                                        $(select).append(option);
                                    }
                                } 
                        row__col_one__row_div_one.append(colmd1);
                        row__col_one__row_div_one.append(colmd2);
                    col_one__row_div_one.append(row__col_one__row_div_one);
        
            $(row_div_one).append(col_one__row_div_one);
            $(main_col_div).append(row_div_one);
            var main_col_div2=$("<div class='col-md-6' id='main_col_div2'></div>");
                
                var surg_table_div=$('<div class="genformdiv2_procsurg_addtable" id="surg_table_info_div">');
                    var surg_table=$("<table id='surg_table_info'  class='datatable_procsurg' width='100%'></table>")
                surg_table_div.append(surg_table);
                var proc_table_div=$('<div class="genformdiv2_procsurg_addtable" id="proc_table_info_div">');
                    var proc_table=$("<table id='proc_table_info'  class='datatable_procsurg' width='100%'></table>")
                proc_table_div.append(proc_table);
            main_col_div2.append(surg_table_div);
            main_col_div2.append(proc_table_div);    
            $(main_row_div).append(main_col_div2); 
            surgery_list=data['surgery_list']        
            proc_list=data['proc_list']  
            createSurgTableInfo(surgery_list);
            createProcTableInfo(proc_list);  
            $('.modal-loading').hide();
  
        },
    });
   

}

function proc_surgery_OnSelect(element){

    optionSelected = $(element).val()
    console.log("optionSelected",optionSelected)

    if(optionSelected === 'Minor'){
        $('#row_div_two').remove();
        var main_col_div=$('#main_col_div')
            var row_div_two=$("<div class='row removerowmargins_div genformdiv1' id='row_div_two' style='padding-bottom:10px'></div>");

                var main_col__row_two=$("<div class='col-md-12'></div>");

                    var row_one=$("<div class='row' style='padding-bottom:10px'></div>")

                        var col_one__row_one=$("<div class='col-md-12'></div>");
                                row__col_one__row_one=$("<div class='row'></div>");
                                colmd1=$("<div class='col-md-6'></div>")
                                colmd2=$("<div class='col-md-6'></div>")
            
                                    procedure_label=$("<label for='procedure_tag' class='custom_label_css'>Procedure Name</label>");
                                    colmd1.append(procedure_label)
                                    procedure_input=$("<input id='procedure_input' class='custom_input_css form-control-custom'>")
                                    colmd2.append(procedure_input)
            
                                row__col_one__row_one.append(colmd1);
                                row__col_one__row_one.append(colmd2);

                            col_one__row_one.append(row__col_one__row_one);

                    row_one.append(col_one__row_one)

                    var row_two=$("<div class='row' style='padding-bottom:10px'></div>")

                    var col_one__row_two=$("<div class='col-md-12'></div>");
                            row__col_one__row_two=$("<div class='row'></div>");
                            colmd1=$("<div class='col-md-6'></div>")
                            colmd2=$("<div class='col-md-6'></div>")
        
                                price_label=$("<label for='price_label' class='custom_label_css'>Treatment Cost</label>");
                                colmd1.append(price_label)
                                price_input=$("<input id='price_input' class='custom_input_css form-control-custom'>")
                                colmd2.append(price_input)
        
                            row__col_one__row_two.append(colmd1);
                            row__col_one__row_two.append(colmd2);

                        col_one__row_two.append(row__col_one__row_two);

                row_two.append(col_one__row_two)
                
            var row_three=$("<div class='row'></div>")

                var col_one__row_three=$("<div class='col-md-12'></div>");
                     
                        addprocedure_button=$('<button class="save_btn fa fa-plus-circle" onclick="addProcedure()">  Add Procedure</button>')
                      

                    col_one__row_three.append(addprocedure_button);

            row_three.append(col_one__row_three)

            main_col__row_two.append(row_one)
            main_col__row_two.append(row_two)
            main_col__row_two.append(row_three)

        row_div_two.append(main_col__row_two)
    main_col_div.append(row_div_two)

    }
    else if(optionSelected === 'Surgeries'){
        $('#row_div_two').remove();
        var main_col_div=$('#main_col_div')
            var row_div_two=$("<div class='row removerowmargins_div genformdiv1' id='row_div_two' style='padding-bottom:10px'></div>");

                var main_col__row_two=$("<div class='col-md-12'></div>");

                    var row_one=$("<div class='row' style='padding-bottom:10px'></div>")

                        var col_one__row_one=$("<div class='col-md-12'></div>");
                                row__col_one__row_one=$("<div class='row'></div>");
                                colmd1=$("<div class='col-md-6'></div>")
                                colmd2=$("<div class='col-md-6'></div>")
            
                                    surgery_label=$("<label for='surgery_tag' class='custom_label_css'>Surgery Name</label>");
                                    colmd1.append(surgery_label)
                                    surgery_input=$("<input id='surgery_input' class='custom_input_css form-control-custom'>")
                                    colmd2.append(surgery_input)
            
                                row__col_one__row_one.append(colmd1);
                                row__col_one__row_one.append(colmd2);

                            col_one__row_one.append(row__col_one__row_one);

                    row_one.append(col_one__row_one)

                    var row_two=$("<div class='row' style='padding-bottom:10px'></div>")


                    var col_one__row_two=$("<div class='col-md-12'></div>");
                            row__col_one__row_two=$("<div class='row'></div>");
                            colmd1=$("<div class='col-md-6'></div>")
                            colmd2=$("<div class='col-md-6'></div>")
        
                                price_label=$("<label for='price_tag' class='custom_label_css'>Treatment Cost</label>");
                                colmd1.append(price_label)
                                price_input=$("<input id='price_input' value='0' class='custom_input_css form-control-custom'>")
                                colmd2.append(price_input)
        
                            row__col_one__row_two.append(colmd1);
                            row__col_one__row_two.append(colmd2);

                    col_one__row_two.append(row__col_one__row_two);

                    var col_one__row_three=$("<div class='col-md-12'></div>");
                            row__col_one__row_three=$("<div class='row'></div>");
                            colmd1=$("<div class='col-md-6'></div>")
                            colmd2=$("<div class='col-md-6'></div>")
        
                                surgeon_fee_label=$("<label class='custom_label_css'>Surgeon Fee</label>");
                                colmd1.append(surgeon_fee_label)
                                surgeon_fee_input=$("<input id='surgeon_fee'  value='0' class='custom_input_css form-control-custom'>")
                                colmd2.append(surgeon_fee_input)
        
                            row__col_one__row_three.append(colmd1);
                            row__col_one__row_three.append(colmd2);

                        col_one__row_three.append(row__col_one__row_three);

                    var col_one__row_four=$("<div class='col-md-12'></div>");
                            row__col_one__row_four=$("<div class='row'></div>");
                            colmd1=$("<div class='col-md-6'></div>")
                            colmd2=$("<div class='col-md-6'></div>")
        
                                opth_fee_label=$("<label  class='custom_label_css'>Operation Theatre Fee</label>");
                                colmd1.append(opth_fee_label)
                                optheatre_fee_input=$("<input id='optheatre_fee'  value='0' class='custom_input_css form-control-custom'>")
                                colmd2.append(optheatre_fee_input)
        
                            row__col_one__row_four.append(colmd1);
                            row__col_one__row_four.append(colmd2);

                    col_one__row_four.append(row__col_one__row_four);

                    var col_one__row_five=$("<div class='col-md-12'></div>");
                            row__col_one__row_five=$("<div class='row'></div>");
                            colmd1=$("<div class='col-md-6'></div>")
                            colmd2=$("<div class='col-md-6'></div>")
        
                                anesth_fee_label=$("<label for='price_tag' class='custom_label_css'>Anestheologist Fee</label>");
                                colmd1.append(anesth_fee_label)
                                anesth_fee_input=$("<input id='anesth_fee'  value='0' class='custom_input_css form-control-custom'>")
                                colmd2.append(anesth_fee_input)
        
                            row__col_one__row_five.append(colmd1);
                            row__col_one__row_five.append(colmd2);

                    col_one__row_five.append(row__col_one__row_five);

                    var col_one__row_six=$("<div class='col-md-12'></div>");
                            row__col_one__row_six=$("<div class='row'></div>");
                            colmd1=$("<div class='col-md-6'></div>")
                            colmd2=$("<div class='col-md-6'></div>")
        
                                surplus_charge_label=$("<label for='price_tag' class='custom_label_css'>Surplus Charges</label>");
                                colmd1.append(surplus_charge_label)
                                surplus_charge_input=$("<input id='surplus_charge'  value='0' class='custom_input_css form-control-custom'>")
                                colmd2.append(surplus_charge_input)
        
                            row__col_one__row_six.append(colmd1);
                            row__col_one__row_six.append(colmd2);

                        col_one__row_six.append(row__col_one__row_six);


                row_two.append(col_one__row_two)
                row_two.append(col_one__row_three)
                row_two.append(col_one__row_four)
                row_two.append(col_one__row_five)
                row_two.append(col_one__row_six)

                
                var row_three=$("<div class='row'></div>")

                    var col_one__row_three=$("<div class='col-md-12'></div>");
                        addSurgery_button=$('<button class="save_btn fa fa-plus-circle" onclick="addSurgery()">  Add Surgery</button>')
                    col_one__row_three.append(addSurgery_button);

                row_three.append(col_one__row_three)

            main_col__row_two.append(row_one)
            main_col__row_two.append(row_two)
            main_col__row_two.append(row_three)

        row_div_two.append(main_col__row_two)
    main_col_div.append(row_div_two)

    }
    else{
        $('#row_div_two').remove();
    }
}

function addProcedure(){

    var procedure_name=$("#procedure_input").val();
    console.log("procedure_name", procedure_name);
    $("#procedure_input").val("");
    var procedure_price=$("#price_input").val();
    console.log("procedure_price", procedure_price);
    $("#price_input").val("");
    if (procedure_name=="" || procedure_price==""){
        alert("Please Add Info")
        return
    }
    $('.modal-loading').show();

    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            "procedure_name":JSON.stringify(procedure_name),
            "charges":JSON.stringify(procedure_price),
        },
        url: '/add_procedure',
        success: function(data){
            $('.modal-loading').hide();

            procedurList=data["procedurList"]
            proc_data_info_datatable.clear().draw()
            for (var i in procedurList){
                proc_data_info_datatable.row.add( procedurList[i] ).draw();
            } 

            $('html,body').animate({
                scrollTop: $("#proc_table_info_div").offset().top},
            'slow');

        },
    });
}
function addSurgery(){

    var surgery_name=$("#surgery_input").val();
    $("#surgery_input").val("");
    var surgery_price=$("#price_input").val();
    $("#price_input").val("");
    var surgeon_fee=$("#surgeon_fee").val();
    $("#surgeon_fee").val("");
    var optheatre_fee=$("#optheatre_fee").val();
    $("#optheatre_fee").val("");
    var anesth_fee=$("#anesth_fee").val();
    $("#anesth_fee").val("");
    var surplus_charge=$("#surplus_charge").val();
    $("#surplus_charge").val("");

    $('.modal-loading').show();

    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            "surgery_name":JSON.stringify(surgery_name),
            "charges":JSON.stringify(surgery_price),
            "surgeon_fee":JSON.stringify(surgeon_fee),
            "optheatre_fee":JSON.stringify(optheatre_fee),
            "anesth_fee":JSON.stringify(anesth_fee),
            "surplus_charge":JSON.stringify(surplus_charge),

        },
        url: '/add_surgery',
        success: function(data){
            surgList=data['surgList'];
            surg_data_info_datatable.clear().draw()
            for (var i in surgList){
                surg_data_info_datatable.row.add( surgList[i] ).draw();
            } 
            $('.modal-loading').hide();

        },
    });
}

function updateProcSurgForm(){

    $('#main_page_content').empty()
    var container_update_ps_dashboard= $('#main_page_content').append('<div class="container-fluid" id="container-update-ps-dashboard"></div>');
    $("#container-update-ps-dashboard").append("<h2 class ='center_h_tag_forms'>Update Procedures/Surgeries</h2>");
    $("#container-update-ps-dashboard").append("<hr class='custom_hr'>");
    var main_row_div= $("<div class='row is-flex'></div>");

    $(container_update_ps_dashboard).append(main_row_div);
    var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");
       
    $(main_row_div).append(main_col_div);

        var row_div_one=$("<div class='row' style='padding-bottom:10px'></div>");
            var col_one__row_div_one=$("<div class='col-md-6'></div>");
                row__col_one__row_div_one=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-4'></div>")
                    colmd2=$("<div class='col-md-6'></div>")

                    procedure_label=$("<label for='procedure_tag' class='custom_label_css'>Procedure/Surgery</label>");
                    colmd1.append(procedure_label)
                    var select=$("<select id='ps_type_select' class='form-control-custom' onchange='ps_OnSelect($(this))'></select>");
                        var option=$("<option selected='selected' value='--'>--</option>");
                        var option1=$("<option id="+ps_type_list[0]+"-opt value="+ps_type_list[0]+">"+ps_type_list[0]+"</option>");

                        $(select).append(option);
                        $(select).append(option1);
                    colmd2.append(select) 
                    
                        for (var i=1;i<=ps_type_list.length;i++){
                            if (ps_type_list[i]!==undefined){
                                var option=$("<option id="+ps_type_list[i]+"-opt value="+ps_type_list[i]+">"+ps_type_list[i]+"</option>");
                                $(select).append(option);
                            }
                        } 
                row__col_one__row_div_one.append(colmd1);
                row__col_one__row_div_one.append(colmd2);
            col_one__row_div_one.append(row__col_one__row_div_one);

    $(row_div_one).append(col_one__row_div_one);
    $(main_col_div).append(row_div_one);

}
function ps_OnSelect(element){

    var ps_selected = $(element).val()
    
    console.log("ps_selected",ps_selected)
    if (ps_selected==='Minor'){
        $("#row_div_three").remove();

        if (proc_datatable!==undefined){
            
            proc_datatable.destroy();
            $("#row_div_two").remove();
            
            availableProcedureRowDivTwo()
            retrieveAllProcInfo()
        }
        else if (surg_datatable!==undefined){

            surg_datatable.destroy();
            $("#row_div_two").remove();

            availableProcedureRowDivTwo()
            retrieveAllProcInfo()
        }
        else{
            availableProcedureRowDivTwo()
            retrieveAllProcInfo()
        }
        
    }
    else if (ps_selected==='Surgeries'){
        $("#row_div_three").remove();

        if (proc_datatable!==undefined){
            proc_datatable.destroy();
            $("#row_div_two").remove();

            availableSurgeryRowDivTwo()
            retrieveAllSurgInfo()

        }
        else if (surg_datatable!==undefined){

            surg_datatable.destroy();
            $("#row_div_two").remove();

            availableSurgeryRowDivTwo()
            retrieveAllSurgInfo()

        }
        else{
            availableSurgeryRowDivTwo()
            retrieveAllSurgInfo()
        }
    
    }
    else{
        $("#row_div_three").remove();
        if (proc_datatable!==undefined){
            proc_datatable.destroy();
            proc_datatable=undefined
            $("#row_div_two").remove();
        }
        else if (surg_datatable!==undefined){

            surg_datatable.destroy();
            surg_datatable=undefined;
            $("#row_div_two").remove();
        }
    }

}

function availableSurgeryRowDivTwo(){
    var main_col_div=$("#main_col_div");
        var row_div_two=$("<div class='row removerowmargins_div genformdiv1' id='row_div_two'></div>");
        // Datatable Name
            var col_one__row_div_two=$("<div class='col-md-12'></div>");
                var row__col_one__row_div_two=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-12'></div>")
                        var available_surg_table=$('<table id="available_surg_table" class="datatable_procsurg" width="100%"></table>')

                    colmd1.append(available_surg_table)
                row__col_one__row_div_two.append(colmd1);

            col_one__row_div_two.append(row__col_one__row_div_two);
        $(row_div_two).append(col_one__row_div_two);
    main_col_div.append(row_div_two)
}
function availableProcedureRowDivTwo(){
    var main_col_div=$("#main_col_div");
        var row_div_two=$("<div class='row removerowmargins_div genformdiv1' id='row_div_two'></div>");
        // Datatable Name
            var col_one__row_div_two=$("<div class='col-md-12'></div>");
                var row__col_one__row_div_two=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-12'></div>")
                        var available_proc_table=$('<table id="available_proc_table" class="datatable_procsurg" width="100%"></table>')

                        colmd1.append(available_proc_table)
                row__col_one__row_div_two.append(colmd1);

            col_one__row_div_two.append(row__col_one__row_div_two);
        $(row_div_two).append(col_one__row_div_two);
    main_col_div.append(row_div_two)
}
function retrieveAllSurgInfo(){
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {

        },
        url: '/retrieve_all_surg_info',
        success: function(data){
            console.log("surg_dict",data["surg_dict"]);
            surg_dict={};
            surg_list=[]
            surg_dict=JSON.parse(data["surg_dict"])
            for (surg in surg_dict){
                templist=[];
                console.log("surg",surg);
                templist.push(surg)
                templist.push(surg_dict[surg]['surgery_name'])
                templist.push(surg_dict[surg]['charges'])
                templist.push(surg_dict[surg]['surgeon_fee'])
                templist.push(surg_dict[surg]['operation_theater_fee'])
                templist.push(surg_dict[surg]['anesthesiologist_fee'])
                templist.push(surg_dict[surg]['surplus_fee'])
                surg_list.push(templist)
            }
            console.log("surg_dict",surg_dict);
            console.log(surg_list)
            $('#available_surg_table').show()

            createSurgDataTable();
            $('.modal-loading').hide();

        },
    }); 
}

function retrieveAllProcInfo(){
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {

        },
        url: '/retrieve_all_proc_info',
        success: function(data){
            console.log("proc_dict",data["proc_dict"]);
            proc_dict={};
            proc_list=[]
            proc_dict=JSON.parse(data["proc_dict"])
            for (proc in proc_dict){
                templist=[];
                console.log("proc",proc);
                templist.push(proc)
                templist.push(proc_dict[proc]['procedure_name'])
                templist.push(proc_dict[proc]['charges'])
                proc_list.push(templist)
            }
            console.log("proc_dict",proc_dict);
            console.log(proc_list)

            createProcDataTable()
            $('.modal-loading').hide();

        },
    }); 
}
function createProcDataTable(){
    $(function(){
        proc_datatable=$("#available_proc_table").DataTable({
            data:proc_list,
            columns: [
                { title: "Id" },
                { title: "Procedures" },
                { title: "Charges" },
                ],
                paging: false,
                scrollY: 200,
                scrollX: true,
                ordering: true,
                info:false,
                searching:false,
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'print',
                        text:  ' PRINT',
                        title: 'Procedures',
                        className: 'datatable_button printbtn fa fa-print',

                    },
                     {
                        extend: 'excel',
                        text: ' EXCEL',
                        title: 'Procedures',
                        className: 'datatable_button excelbtn  fas fa-file-excel',

                    },
                     {
                        extend: 'csv',
                        text: ' CSV',
                        title: 'Procedures',
                        className: 'datatable_button csvbtn fa fa-file',

                    },
                    {
                        extend: 'pdf',
                        text: ' PDF',
                        title: 'Procedures',
                        className: 'datatable_button pdfbtn fas fa-file-pdf',

                    },
                  
                ],
            });
            $('#available_proc_table tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    alert("clicked same entry")
                }
                else{
                    proc_id_selected=$(this).find('td').eq(0).text()
                    console.log("proc_id_selected",proc_id_selected)
                    proc_datatable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    console.log("proc dict on click",proc_dict);
                    $("#row_div_three").remove();

                    var row_div_three=$("<div class='row removerowmargins_div genformdiv2' id='row_div_three' style='padding-top:10px'></div>");
                        var main_subcol=$("<div class='col-md-12'></div>");

                            var subrow_one=$("<div class='row' style='padding-bottom:10px'></div>")

                                    var col_one__subrow_one=$("<div class='col-md-12'></div>");
                                            row__col_one__subrow_one=$("<div class='row'></div>");
                                                var colmd1=$("<div class='col-md-2'></div>")
                                                var colmd2=$("<div class='col-md-5'></div>")
                                                    var proc_label=$("<label for='proc_label' class='custom_label_css'>Procedure Name</label>");
                                                    var proc_input=$("<input  id='proc_input' class='form-control-custom' value='"+proc_dict[proc_id_selected]['procedure_name']+"'>")
                                                colmd1.append(proc_label)
                                                colmd2.append(proc_input)
                                            row__col_one__subrow_one.append(colmd1);
                                            row__col_one__subrow_one.append(colmd2);
                                        col_one__subrow_one.append(row__col_one__subrow_one);

                            subrow_one.append(col_one__subrow_one)

                            var subrow_two=$("<div class='row' style='padding-bottom:10px'></div>")
                                var col_one_subrow_two=$("<div class='col-md-12'></div>");
                                    var row__col_one_subrow_two=$("<div class='row'></div>");
                                        colmd1=$("<div class='col-md-2'></div>")
                                        colmd2=$("<div class='col-md-2'></div>")

                                            var procCharges_label=$("<label class='custom_label_css'>Charges</label>");
                                            var procCharges_input=$("<input  id='procCharges_input' class='form-control-custom' value='"+proc_dict[proc_id_selected]['charges']+"'>")

                                        colmd1.append(procCharges_label)
                                        colmd2.append(procCharges_input)
                            
                                    row__col_one_subrow_two.append(colmd1);
                                    row__col_one_subrow_two.append(colmd2);
                            
                                col_one_subrow_two.append(row__col_one_subrow_two);

                            subrow_two.append(col_one_subrow_two)

                            var subrow_three=$("<div class='row'></div>")
                                var col_one__subrow_three=$("<div class='col-md-12'></div>");
                                    var row__col_one__subrow_three=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-3'></div>")
                                            var del_button=$('<button class="deletebtn" id="deletebtn-'+proc_id_selected+'" onclick="deleteProcData($(this))">  Delete Procedure Record </button>')
                                        colmd1.append(del_button);
                                        var colmd2=$("<div class='col-md-3'></div>")
                                            var update_button=$('<button class="save_btn fa fa-save" onclick="updateProcData()">  Update Procedure</button>')
                                        colmd2.append(update_button);
                                
                                        row__col_one__subrow_three.append(colmd1);
                                        row__col_one__subrow_three.append(colmd2);


                                col_one__subrow_three.append(row__col_one__subrow_three);

                            subrow_three.append(col_one__subrow_three)

                        main_subcol.append(subrow_one)
                        main_subcol.append(subrow_two)
                        main_subcol.append(subrow_three)

                    row_div_three.append(main_subcol)
                var main_col_div=$("#main_col_div");
            main_col_div.append(row_div_three)
            $('html,body').animate({
                scrollTop: $("#row_div_three").offset().top},
                'slow');
            }
        });
    });
}

function createSurgDataTable(){
    console.log("surg_list----------",surg_list)
    $(function(){
        surg_datatable=$("#available_surg_table").DataTable({
            data:surg_list,
            columns: [
                { title: "Id" },
                { title: "Surgeries" },
                { title: "Total Charges" },
                { title: "Surgeon Fee" },
                { title: "Operation Theatre Fee" },
                { title: "anestheiologist_fee" },
                { title: "surplus_fee" },
                ],
                paging: false,
                scrollY: 200,
                scrollX: true,
                ordering: true,
                info:false,
                searching:false,
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'print',
                        text: ' PRINT',
                        title: 'Surgeries',
                        className: 'datatable_button printbtn fas fa-print',

                    },
                     {
                        extend: 'excel',
                        text: ' EXCEL',
                        title: 'Surgeries',
                        className: 'datatable_button excelbtn fas fa-file-excel',

                    },
                     {
                        extend: 'csv',
                        text: ' CSV',
                        title: 'Surgeries',
                        className: 'datatable_button csvbtn fas fa-file',

                    },
                    {
                        extend: 'pdf',
                        text: ' PDF',
                        title: 'Surgeries',
                        className: 'datatable_button pdfbtn fas fa-file-pdf',

                    },
               
                ],
            });
            $('#available_surg_table tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    alert("clicked same entry")
                }
                else{
                    surg_id_selected=$(this).find('td').eq(0).text()
                    console.log("surg_id_selected",surg_id_selected)
                    surg_datatable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    console.log("proc dict on click",surg_dict);
                    $("#row_div_three").remove();

                    var row_div_three=$("<div class='row removerowmargins_div genformdiv2' id='row_div_three' style='padding-top:10px'></div>");
                        var main_subcol=$("<div class='col-md-12'></div>");

                            var subrow_one=$("<div class='row' style='padding-bottom:10px'></div>")

                                    var col_one__subrow_one=$("<div class='col-md-12'></div>");
                                            row__col_one__subrow_one=$("<div class='row'></div>");
                                                var colmd1=$("<div class='col-md-2'></div>")
                                                var colmd2=$("<div class='col-md-5'></div>")
                                                    var surg_label=$("<label for='surg_label' class='custom_label_css'>Surgery Name</label>");
                                                    var surg_input=$("<input  id='surg_input' class='form-control-custom' value='"+surg_dict[surg_id_selected]['surgery_name']+"'>")
                                                colmd1.append(surg_label)
                                                colmd2.append(surg_input)
                                            row__col_one__subrow_one.append(colmd1);
                                            row__col_one__subrow_one.append(colmd2);
                                        col_one__subrow_one.append(row__col_one__subrow_one);

                            subrow_one.append(col_one__subrow_one)

                            var subrow_two=$("<div class='row' style='padding-bottom:10px'></div>")
                                var col_one_subrow_two=$("<div class='col-md-12'></div>");
                                    var row__col_one_subrow_two=$("<div class='row'></div>");
                                        colmd1=$("<div class='col-md-2'></div>")
                                        colmd2=$("<div class='col-md-2'></div>")

                                            var surgCharges_label=$("<label class='custom_label_css'>Charges</label>");
                                            var surgCharges_input=$("<input  id='surgCharges_input' class='form-control-custom' value='"+surg_dict[surg_id_selected]['charges']+"'>")

                                        colmd1.append(surgCharges_label)
                                        colmd2.append(surgCharges_input)
                            
                                    row__col_one_subrow_two.append(colmd1);
                                    row__col_one_subrow_two.append(colmd2);
                            
                                col_one_subrow_two.append(row__col_one_subrow_two);
                                    var col_one_subrow_three=$("<div class='col-md-12'></div>");
                                        var row__col_one_subrow_three=$("<div class='row'></div>");
                                            colmd1=$("<div class='col-md-2'></div>")
                                            colmd2=$("<div class='col-md-2'></div>")

                                                var surgCharges_label=$("<label class='custom_label_css'>Surgeon Fee</label>");
                                                var surgCharges_input=$("<input  id='surgeon_fee_input' class='form-control-custom' value='"+surg_dict[surg_id_selected]['surgeon_fee']+"'>")

                                            colmd1.append(surgCharges_label)
                                            colmd2.append(surgCharges_input)
                                
                                        row__col_one_subrow_three.append(colmd1);
                                        row__col_one_subrow_three.append(colmd2);
                                
                                    col_one_subrow_three.append(row__col_one_subrow_three);
                                var col_one_subrow_four=$("<div class='col-md-12'></div>");
                                    var row__col_one_subrow_four=$("<div class='row'></div>");
                                        colmd1=$("<div class='col-md-2'></div>")
                                        colmd2=$("<div class='col-md-2'></div>")

                                            var operation_theater_fee_label=$("<label class='custom_label_css'>Operation Theatre Fee</label>");
                                            var operation_theater_fee_input=$("<input  id='operation_theater_fee_input' class='form-control-custom' value='"+surg_dict[surg_id_selected]['operation_theater_fee']+"'>")

                                        colmd1.append(operation_theater_fee_label)
                                        colmd2.append(operation_theater_fee_input)
                            
                                    row__col_one_subrow_four.append(colmd1);
                                    row__col_one_subrow_four.append(colmd2);
                            
                                col_one_subrow_four.append(row__col_one_subrow_four);

                                var col_one_subrow_five=$("<div class='col-md-12'></div>");
                                    var row__col_one_subrow_five=$("<div class='row'></div>");
                                        colmd1=$("<div class='col-md-2'></div>")
                                        colmd2=$("<div class='col-md-2'></div>")

                                            var anesthesiologist_fee_label=$("<label class='custom_label_css'>Anestheologist Fee</label>");
                                            var anesthesiologist_fee_input=$("<input  id='anesthesiologist_fee_input' class='form-control-custom' value='"+surg_dict[surg_id_selected]['anesthesiologist_fee']+"'>")

                                        colmd1.append(anesthesiologist_fee_label)
                                        colmd2.append(anesthesiologist_fee_input)
                            
                                    row__col_one_subrow_five.append(colmd1);
                                    row__col_one_subrow_five.append(colmd2);
                            
                                col_one_subrow_five.append(row__col_one_subrow_five);

                                var col_one_subrow_six=$("<div class='col-md-12'></div>");
                                    var row__col_one_subrow_six=$("<div class='row'></div>");
                                        colmd1=$("<div class='col-md-2'></div>")
                                        colmd2=$("<div class='col-md-2'></div>")

                                            var surplus_fee_label=$("<label class='custom_label_css'>Surplus Charges</label>");
                                            var surplus_fee_input=$("<input  id='surplus_fee_input' class='form-control-custom' value='"+surg_dict[surg_id_selected]['surplus_fee']+"'>")

                                        colmd1.append(surplus_fee_label)
                                        colmd2.append(surplus_fee_input)
                            
                                    row__col_one_subrow_six.append(colmd1);
                                    row__col_one_subrow_six.append(colmd2);
                            
                                col_one_subrow_six.append(row__col_one_subrow_six);

                            subrow_two.append(col_one_subrow_two)
                            subrow_two.append(col_one_subrow_three)
                            subrow_two.append(col_one_subrow_four)
                            subrow_two.append(col_one_subrow_five)
                            subrow_two.append(col_one_subrow_six)
                            
                            var subrow_three=$("<div class='row'></div>")
                                var col_one__subrow_three=$("<div class='col-md-12'></div>");
                                    var row__col_one__subrow_three=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-3'></div>")   
                                            var delete_btn=$('<button class="deletebtn" id="deletebtn-'+surg_id_selected+'" onclick="deleteSurgData($(this))">Delete  Surgery Record</button>')
                                        colmd1.append(delete_btn);
                                        var colmd2=$("<div class='col-md-3'></div>")
                        
                                        
                                            var update_button=$('<button class="save_btn fa fa-save" onclick="updateSurgData()">  Update Surgery</button>')
                                        colmd2.append(update_button);

                                    row__col_one__subrow_three.append(colmd1);
                                    row__col_one__subrow_three.append(colmd2);

                                col_one__subrow_three.append(row__col_one__subrow_three);

                            subrow_three.append(col_one__subrow_three)

                        main_subcol.append(subrow_one)
                        main_subcol.append(subrow_two)
                        main_subcol.append(subrow_three)

                    row_div_three.append(main_subcol)
                var main_col_div=$("#main_col_div");
            main_col_div.append(row_div_three);
            $('html,body').animate({
                scrollTop: $("#row_div_three").offset().top},
                'slow');
            }
        });
    });
}

function updateProcData(){
    var procedure_name=$("#proc_input").val();;
    var charges=$("#procCharges_input").val();
    var id=proc_id_selected;

    $('.modal-loading').show();

    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            "procedure_name":procedure_name,
            "charges":charges,
            "id":id,


        },
        url: '/update_proc_data',
        success: function(data){
            $("#row_div_three").remove();
            proc_dict=JSON.parse(data["proc_dict"])
            proc_datatable.clear();
            for (key in proc_dict){
                temp_list=[];
                temp_list.push(key)
                temp_list.push(proc_dict[key]['procedure_name'])
                temp_list.push(proc_dict[key]['charges'])
                temp_list.push(proc_dict[key]['id'])
                proc_datatable.row.add(temp_list).draw();
            }
            console.log("After Update",proc_dict);
            alert("Updated")   
            $('.modal-loading').hide();

        },
    });
}
function deleteProcData(ele){
    id=$(ele).attr('id');
    idarr=id.split('-')
    procid=idarr[1]
    $('.modal-loading').show();

    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            "id":procid,
        },
        url: '/delete_proc_data',
        success: function(data){
            $("#row_div_three").remove();
            proc_dict=JSON.parse(data["proc_dict"])
            proc_datatable.clear();
            for (key in proc_dict){
                temp_list=[];
                temp_list.push(key)
                temp_list.push(proc_dict[key]['procedure_name'])
                temp_list.push(proc_dict[key]['charges'])
                temp_list.push(proc_dict[key]['id'])
                proc_datatable.row.add(temp_list).draw();
            }
           alert("Procedure Record Deleted");
           $('.modal-loading').hide();

        },
    });

}
function updateSurgData(){
    var surgery_name=$("#surg_input").val();;
    var charges=$("#surgCharges_input").val();
    var surgeon_fee_input=$("#surgeon_fee_input").val();
    var operation_theater_fee_input=$("#operation_theater_fee_input").val();
    var anesthesiologist_fee_input= $("#anesthesiologist_fee_input").val();
    var surplus_fee_input=$("#surplus_fee_input").val()
    var id=surg_id_selected

    $('.modal-loading').show();

    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            "surgery_name":surgery_name,
            "charges":charges,
            "surgeon_fee":surgeon_fee_input,
            "operation_theater_fee":operation_theater_fee_input,
            "anesthesiologist_fee":anesthesiologist_fee_input,
            "surplus_fee":surplus_fee_input,
            "id":id,

        },
        url: '/update_surg_data',
        success: function(data){
            $("#row_div_three").remove();
            surg_dict=JSON.parse(data["surg_dict"])
            surg_datatable.clear();
            for (key in surg_dict){
                temp_list=[];
                temp_list.push(key)
                temp_list.push(surg_dict[key]['surgery_name'])
                temp_list.push(surg_dict[key]['charges'])
                temp_list.push(surg_dict[key]['surgeon_fee'])
                temp_list.push(surg_dict[key]['operation_theater_fee'])
                temp_list.push(surg_dict[key]['anesthesiologist_fee'])
                temp_list.push(surg_dict[key]['surplus_fee'])
                temp_list.push(surg_dict[key]['id'])


                surg_datatable.row.add(temp_list).draw();
            }
            console.log("After Update",surg_dict);
            alert("Updated")
            $('.modal-loading').show();
        },
    });
}
function deleteSurgData(ele){
    id=$(ele).attr('id');
    idarr=id.split('-')
    surgid=idarr[1]
    $('.modal-loading').show();

    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            "id":surgid,

        },
        url: '/delete_surg_data',
        success: function(data){
            $("#row_div_three").remove();
            surg_dict=JSON.parse(data["surg_dict"])
            surg_datatable.clear();
            for (key in surg_dict){
                temp_list=[];
                temp_list.push(key)
                temp_list.push(surg_dict[key]['surgery_name'])
                temp_list.push(surg_dict[key]['charges'])
                temp_list.push(surg_dict[key]['surgeon_fee'])
                temp_list.push(surg_dict[key]['operation_theater_fee'])
                temp_list.push(surg_dict[key]['anesthesiologist_fee'])
                temp_list.push(surg_dict[key]['surplus_fee'])
                temp_list.push(surg_dict[key]['id'])
                surg_datatable.row.add(temp_list).draw();
            }
            console.log("After Update",surg_dict);
            alert("Deleted Successfully");
            $('.modal-loading').hide();

        },
    });
}

function createSurgTableInfo(surgery_list){
    $(function(){
        surg_data_info_datatable=$("#surg_table_info").DataTable({
            data:surgery_list,
            columns: [
                { title: "Id" },
                { title: "Surgery" },
                { title: "charges" },
                { title: 'surgeon_fee' },
                { title: "operation_theatre_fee" },
                { title: "anesthesiologist_fee" },
                { title:"surplus_fee"},
                ],
                paging: false,
                scrollY: 200,
                scrollX: true,
                ordering: true,
                info:false,
                searching:false,
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'print',
                        text: 'PRINT',
                        title: 'Surgies List',
                        className: 'datatable_button printbtn fas fa-print',

                    },
                     {
                        extend: 'excel',
                        text: ' EXCEL',
                        title: 'Surgies List',
                        className: 'datatable_button excelbtn fas fa-file-excel',

                    },
                     {
                        extend: 'csv',
                        text: ' CSV',
                        title:'Surgies List',
                        className: 'datatable_button csvbtn fa fa-file',

                    },
                    {
                        extend: 'pdf',
                        text: ' PDF',
                        title: 'Surgies List',
                        className: 'datatable_button pdfbtn fas fa-file-pdf',

                    },
                 
                ],

            });
            $('#surg_table_info tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    alert("clicked same entry")
                }
                else{
            }
        });
    });
}
function createProcTableInfo(proc_list){
    $(function(){
        proc_data_info_datatable=$("#proc_table_info").DataTable({
            data:proc_list,
            columns: [
                { title: "Id" },
                { title: "Procedure" },
                { title: "charges" },
             
                ],
                paging: false,
                scrollY: 200,
                scrollX: true,
                ordering: true,
                info:false,
                searching:false,
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'print',
                        text: ' PRINT',
                        title: 'Procedure List',
                        className: 'datatable_button printbtn fa fa-print',

                    },
                     {
                        extend: 'excel',
                        text: ' Excel',
                        title: 'Procedure List',
                        className: 'datatable_button excelbtn fas fa-file-excel',

                    },
                     {
                        extend: 'csv',
                        text: ' CSV',
                        title: 'Procedure List',
                        className: 'datatable_button csvbtn fa fa-file',

                    },
                    {
                        extend: 'pdf',
                        text: ' PDF',
                        title: 'Procedure List',
                        className: 'datatable_button pdfbtn fas fa-file-pdf',

                    },
                  
                ],

            });
            $('#proc_table_info tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    alert("clicked same entry")
                }
                else{
            }
        });
    });
}

function ViewSurgList(){
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': { 

        },
        url: '/get_proc_surg_info',
        success: function(data){            
            $('#main_page_content').empty()
            var container_surg_viewlist= $('#main_page_content').append('<div class="container-fluid" id="container_surg_viewlist"></div>');
            $("#container_surg_viewlist").append("<h2 class ='center_h_tag_forms'>View Surgery list</h2>");
            $("#container_surg_viewlist").append("<hr class='custom_hr'>");
            var main_row_div= $("<div class='row is-flex'></div>");

            $(container_surg_viewlist).append(main_row_div);
            var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");
                var surg_table_div=$('<div id="surg_table_info_div">');
                    var surg_table=$("<table id='surg_table_info'  class='datatable_procsurg' width='100%'></table>")
                surg_table_div.append(surg_table);
            main_col_div.append(surg_table_div);
            $(main_row_div).append(main_col_div);
             
            surgery_list=data['surgery_list']
            createSurgTableInfo(surgery_list);
            $('.modal-loading').hide();

        }
    });
}
function ViewProcList(){
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': { 

        },
        url: '/get_proc_surg_info',
        success: function(data){            
            $('#main_page_content').empty()
            var container_proc_viewlist= $('#main_page_content').append('<div class="container-fluid" id="container_proc_viewlist"></div>');
            $("#container_proc_viewlist").append("<h2 class ='center_h_tag_forms'>View Procedure list</h2>");
            $("#container_proc_viewlist").append("<hr class='custom_hr'>");
            var main_row_div= $("<div class='row is-flex'></div>");

            $(container_proc_viewlist).append(main_row_div);
            var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");
                var proc_table_div=$('<div id="proc_table_info_div">');
                    var proc_table=$("<table id='proc_table_info'  class='datatable_procsurg' width='100%'></table>")
                proc_table_div.append(proc_table);
            main_col_div.append(proc_table_div);
            $(main_row_div).append(main_col_div);
             
            proc_list=data['proc_list']
            createProcTableInfo(proc_list);    
            $('.modal-loading').hide();

        }
    });
}