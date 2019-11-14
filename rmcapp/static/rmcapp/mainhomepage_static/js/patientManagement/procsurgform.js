var ps_type_list=['Minor Procedures','Surgeries'];
var surg_datatable;
var surg_dict;
var surg_id_selected=0;
var surg_list=[]
var proc_datatable;
var proc_dict;
var proc_id_selected=0;
var proc_list=[]


$( document ).ready(function() {
    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': { 

        },
        url: '/proc_surg_form',
        success: function(data){            
        },
    });
});

function addProcSurgForm(){
    $('#main_page_content').empty()
    var container_procedure_surgery_dashboard= $('#main_page_content').append('<div class="container-fluid" id="container-procedure-surgery-dashboard"></div>');
    $("#container-procedure-surgery-dashboard").append("<h2 class ='text-center'>Procedures & Surgeries</h2>");
    $("#container-procedure-surgery-dashboard").append("<hr class='custom_hr'>");
    var main_row_div= $("<div class='row is-flex'></div>");

    $(container_procedure_surgery_dashboard).append(main_row_div);
    var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");
       
    $(main_row_div).append(main_col_div);

        var row_div_one=$("<div class='row' style='padding-bottom:10px'></div>");
            var col_one__row_div_one=$("<div class='col-md-6'></div>");
                row__col_one__row_div_one=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-4'></div>")
                    colmd2=$("<div class='col-md-6'></div>")

                    procedure_label=$("<label for='procedure_tag' class='custom_label_css'>Procedure/Surgery</label>");
                    colmd1.append(procedure_label)
                    var select=$("<select id='ps_type_select' class='form-control' onchange='proc_surgery_OnSelect($(this))'></select>");
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

function proc_surgery_OnSelect(element){

    optionSelected = $(element).val()
    console.log("optionSelected",optionSelected)

    if(optionSelected === 'Minor'){
        $('#row_div_two').remove();
        var main_col_div=$('#main_col_div')
            var row_div_two=$("<div class='row' id='row_div_two' style='padding-bottom:10px'></div>");

                var main_col__row_two=$("<div class='col-md-12'></div>");

                    var row_one=$("<div class='row' style='padding-bottom:10px'></div>")

                        var col_one__row_one=$("<div class='col-md-12'></div>");
                                row__col_one__row_one=$("<div class='row'></div>");
                                colmd1=$("<div class='col-md-2'></div>")
                                colmd2=$("<div class='col-md-3'></div>")
            
                                    procedure_label=$("<label for='procedure_tag' class='custom_label_css'>Procedure Name</label>");
                                    colmd1.append(procedure_label)
                                    procedure_input=$("<input id='procedure_input' class='custom_input_css form-control'>")
                                    colmd2.append(procedure_input)
            
                                row__col_one__row_one.append(colmd1);
                                row__col_one__row_one.append(colmd2);

                            col_one__row_one.append(row__col_one__row_one);

                    row_one.append(col_one__row_one)

                    var row_two=$("<div class='row' style='padding-bottom:10px'></div>")

                    var col_one__row_two=$("<div class='col-md-12'></div>");
                            row__col_one__row_two=$("<div class='row'></div>");
                            colmd1=$("<div class='col-md-2'></div>")
                            colmd2=$("<div class='col-md-3'></div>")
        
                                price_label=$("<label for='price_label' class='custom_label_css'>Treatment Cost</label>");
                                colmd1.append(price_label)
                                price_input=$("<input id='price_input' class='custom_input_css form-control'>")
                                colmd2.append(price_input)
        
                            row__col_one__row_two.append(colmd1);
                            row__col_one__row_two.append(colmd2);

                        col_one__row_two.append(row__col_one__row_two);

                row_two.append(col_one__row_two)
                
            var row_three=$("<div class='row'></div>")

                var col_one__row_three=$("<div class='col-md-6'></div>");
                        row__col_one__row_three=$("<div class='row'></div>");
                        colmd1=$("<div class='col-md-4 offset-md-5'></div>")

                        addprocedure_button=$('<button class="btn btn-success btn-block fa fa-plus-circle" onclick="addProcedure()">  Add Procedure</button>')
                        colmd1.append(addprocedure_button)

                        row__col_one__row_three.append(colmd1);
                    col_one__row_three.append(row__col_one__row_three);

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
            var row_div_two=$("<div class='row' id='row_div_two' style='padding-bottom:10px'></div>");

                var main_col__row_two=$("<div class='col-md-12'></div>");

                    var row_one=$("<div class='row' style='padding-bottom:10px'></div>")

                        var col_one__row_one=$("<div class='col-md-12'></div>");
                                row__col_one__row_one=$("<div class='row'></div>");
                                colmd1=$("<div class='col-md-2'></div>")
                                colmd2=$("<div class='col-md-3'></div>")
            
                                    surgery_label=$("<label for='surgery_tag' class='custom_label_css'>Surgery Name</label>");
                                    colmd1.append(surgery_label)
                                    surgery_input=$("<input id='surgery_input' class='custom_input_css form-control'>")
                                    colmd2.append(surgery_input)
            
                                row__col_one__row_one.append(colmd1);
                                row__col_one__row_one.append(colmd2);

                            col_one__row_one.append(row__col_one__row_one);

                    row_one.append(col_one__row_one)

                    var row_two=$("<div class='row' style='padding-bottom:10px'></div>")

                    var col_one__row_two=$("<div class='col-md-12'></div>");
                            row__col_one__row_two=$("<div class='row'></div>");
                            colmd1=$("<div class='col-md-2'></div>")
                            colmd2=$("<div class='col-md-3'></div>")
        
                                price_label=$("<label for='price_tag' class='custom_label_css'>Treatment Cost</label>");
                                colmd1.append(price_label)
                                price_input=$("<input id='price_input' class='custom_input_css form-control'>")
                                colmd2.append(price_input)
        
                            row__col_one__row_two.append(colmd1);
                            row__col_one__row_two.append(colmd2);

                        col_one__row_two.append(row__col_one__row_two);
                row_two.append(col_one__row_two)
                
                var row_three=$("<div class='row'></div>")

                    var col_one__row_three=$("<div class='col-md-6'></div>");
                            row__col_one__row_three=$("<div class='row'></div>");
                            colmd1=$("<div class='col-md-4 offset-md-5'></div>")

                            addSurgery_button=$('<button class="btn btn-success btn-block fa fa-plus-circle" onclick="addSurgery()">  Add Surgery</button>')
                            colmd1.append(addSurgery_button)

                            row__col_one__row_three.append(colmd1);
                        col_one__row_three.append(row__col_one__row_three);

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

    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            "procedure_name":JSON.stringify(procedure_name),
            "charges":JSON.stringify(procedure_price),
        },
        url: '/add_procedure',
        success: function(data){
        console.log(data['Success']);
        $("#row_div_two").remove();        
        },
    });
}
function addSurgery(){

    var surgery_name=$("#surgery_input").val();
    console.log("surgery_name", surgery_name);
    $("#surgery_input").val("");
    var surgery_price=$("#price_input").val();
    console.log("surgery_price", surgery_price);
    $("#price_input").val("");
    

    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            "surgery_name":JSON.stringify(surgery_name),
            "charges":JSON.stringify(surgery_price),
        },
        url: '/add_surgery',
        success: function(data){
        console.log(data['Success']);
        $("#row_div_two").remove();        
        },
    });
}

function updateProcSurgForm(){

    $('#main_page_content').empty()
    var container_update_ps_dashboard= $('#main_page_content').append('<div class="container-fluid" id="container-update-ps-dashboard"></div>');
    $("#container-update-ps-dashboard").append("<h2 class ='text-center'>Update Procedures/Surgeries</h2>");
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
                    var select=$("<select id='ps_type_select' class='form-control' onchange='ps_OnSelect($(this))'></select>");
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
            
            availablePSRowDivTwo()
            retrieveAllProcInfo()
        }
        else if (surg_datatable!==undefined){

            surg_datatable.destroy();
            $("#row_div_two").remove();

            availablePSRowDivTwo()
            retrieveAllProcInfo()
        }
        else{
            availablePSRowDivTwo()
            retrieveAllProcInfo()
        }
        
    }
    else if (ps_selected==='Surgeries'){
        $("#row_div_three").remove();

        if (proc_datatable!==undefined){
            proc_datatable.destroy();
            $("#row_div_two").remove();

            availablePSRowDivTwo()
            retrieveAllSurgInfo()

        }
        else if (surg_datatable!==undefined){

            surg_datatable.destroy();
            $("#row_div_two").remove();

            availablePSRowDivTwo()
            retrieveAllSurgInfo()

        }
        else{
            availablePSRowDivTwo()
            retrieveAllSurgInfo()
        }
    
    }
    else{
        $("#row_div_three").remove();
        if (proc_datatable!==undefined){
            proc_datatable.destroy();
            $("#row_div_two").remove();
        }
        else if (surg_datatable!==undefined){

            surg_datatable.destroy();
            $("#row_div_two").remove();
        }
    }

}

function availablePSRowDivTwo(){
    var main_col_div=$("#main_col_div");
        var row_div_two=$("<div class='row' id='row_div_two'></div>");
        // Datatable Name
            var col_one__row_div_two=$("<div class='col-md-12'></div>");
                var row__col_one__row_div_two=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-12'></div>")
                        var available_proc_surg_table=$('<table id="available_proc_surg_table" class="display" width="100%"></table>')

                    colmd1.append(available_proc_surg_table)
                row__col_one__row_div_two.append(colmd1);

            col_one__row_div_two.append(row__col_one__row_div_two);
        $(row_div_two).append(col_one__row_div_two);
    main_col_div.append(row_div_two)
}
function retrieveAllSurgInfo(){

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
                surg_list.push(templist)
            }
            console.log("surg_dict",surg_dict);
            console.log(surg_list)
            $('#available_proc_surg_table').show()

            createSurgDataTable()
        },
    }); 
}

function retrieveAllProcInfo(){

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
        },
    }); 
}
function createProcDataTable(){
    console.log("proc_list----------",proc_list)
    $(function(){
        proc_datatable=$("#available_proc_surg_table").DataTable({
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
            });
            $('#available_proc_surg_table tbody').on( 'click', 'tr', function () {
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

                    var row_div_three=$("<div class='row' id='row_div_three' style='padding-top:10px'></div>");
                        var main_subcol=$("<div class='col-md-12'></div>");

                            var subrow_one=$("<div class='row' style='padding-bottom:10px'></div>")

                                    var col_one__subrow_one=$("<div class='col-md-12'></div>");
                                            row__col_one__subrow_one=$("<div class='row'></div>");
                                                var colmd1=$("<div class='col-md-2'></div>")
                                                var colmd2=$("<div class='col-md-5'></div>")
                                                    var proc_label=$("<label for='proc_label' class='custom_label_css'>Procedure Name</label>");
                                                    var proc_input=$("<input  id='proc_input' class='form-control' value='"+proc_dict[proc_id_selected]['procedure_name']+"'>")
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
                                            var procCharges_input=$("<input  id='procCharges_input' class='form-control' value='"+proc_dict[proc_id_selected]['charges']+"'>")

                                        colmd1.append(procCharges_label)
                                        colmd2.append(procCharges_input)
                            
                                    row__col_one_subrow_two.append(colmd1);
                                    row__col_one_subrow_two.append(colmd2);
                            
                                col_one_subrow_two.append(row__col_one_subrow_two);

                            subrow_two.append(col_one_subrow_two)

                            var subrow_three=$("<div class='row'></div>")
                                var col_one__subrow_three=$("<div class='col-md-12'></div>");
                                    var row__col_one__subrow_three=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-3 offset-md-3' offset-md-1></div>")
                        
                                        
                                            var update_button=$('<button class="btn btn-success btn-block fa fa-save" onclick="updateProcData()">  Update Procedure</button>')
                                            colmd1.append(update_button);
                                
                                        row__col_one__subrow_three.append(colmd1);

                                col_one__subrow_three.append(row__col_one__subrow_three);

                            subrow_three.append(col_one__subrow_three)

                        main_subcol.append(subrow_one)
                        main_subcol.append(subrow_two)
                        main_subcol.append(subrow_three)

                    row_div_three.append(main_subcol)
                var main_col_div=$("#main_col_div");
            main_col_div.append(row_div_three)
            }
        });
    });
}

function createSurgDataTable(){
    console.log("surg_list----------",surg_list)
    $(function(){
        surg_datatable=$("#available_proc_surg_table").DataTable({
            data:surg_list,
            columns: [
                { title: "Id" },
                { title: "Surgeries" },
                { title: "Charges" },
                ],
                paging: false,
                scrollY: 200,
                scrollX: true,
                ordering: true,
                info:false,
                searching:false,
            });
            $('#available_proc_surg_table tbody').on( 'click', 'tr', function () {
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

                    var row_div_three=$("<div class='row' id='row_div_three' style='padding-top:10px'></div>");
                        var main_subcol=$("<div class='col-md-12'></div>");

                            var subrow_one=$("<div class='row' style='padding-bottom:10px'></div>")

                                    var col_one__subrow_one=$("<div class='col-md-12'></div>");
                                            row__col_one__subrow_one=$("<div class='row'></div>");
                                                var colmd1=$("<div class='col-md-2'></div>")
                                                var colmd2=$("<div class='col-md-5'></div>")
                                                    var surg_label=$("<label for='surg_label' class='custom_label_css'>Surgery Name</label>");
                                                    var surg_input=$("<input  id='surg_input' class='form-control' value='"+surg_dict[surg_id_selected]['surgery_name']+"'>")
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
                                            var surgCharges_input=$("<input  id='surgCharges_input' class='form-control' value='"+surg_dict[surg_id_selected]['charges']+"'>")

                                        colmd1.append(surgCharges_label)
                                        colmd2.append(surgCharges_input)
                            
                                    row__col_one_subrow_two.append(colmd1);
                                    row__col_one_subrow_two.append(colmd2);
                            
                                col_one_subrow_two.append(row__col_one_subrow_two);

                            subrow_two.append(col_one_subrow_two)

                            var subrow_three=$("<div class='row'></div>")
                                var col_one__subrow_three=$("<div class='col-md-12'></div>");
                                    var row__col_one__subrow_three=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-3 offset-md-3'></div>")
                        
                                        
                                            var update_button=$('<button class="btn btn-success btn-block fa fa-save" onclick="updateSurgData()">  Update Surgery</button>')
                                            colmd1.append(update_button);
                                
                                        row__col_one__subrow_three.append(colmd1);

                                col_one__subrow_three.append(row__col_one__subrow_three);

                            subrow_three.append(col_one__subrow_three)

                        main_subcol.append(subrow_one)
                        main_subcol.append(subrow_two)
                        main_subcol.append(subrow_three)

                    row_div_three.append(main_subcol)
                var main_col_div=$("#main_col_div");
            main_col_div.append(row_div_three)
            }
        });
    });
}

function updateProcData(){
    var procedure_name=$("#proc_input").val();;
    var charges=$("#procCharges_input").val();
    var id=proc_id_selected;

    
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
            console.log(data['Success']);
        },
    });
}

function updateSurgData(){
    var surgery_name=$("#surg_input").val();;
    var charges=$("#surgCharges_input").val();
    var id=surg_id_selected

    
    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            "surgery_name":surgery_name,
            "charges":charges,
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
                temp_list.push(surg_dict[key]['id'])

                surg_datatable.row.add(temp_list).draw();
            }
            console.log("After Update",surg_dict);
            console.log(data['Success']);
        },
    });
}