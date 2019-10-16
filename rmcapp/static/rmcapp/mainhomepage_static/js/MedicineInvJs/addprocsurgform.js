var ps_type_list=['Minor Procedures','Surgeries'];


$( document ).ready(function() {
    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': { 

        },
        url: '/add_proc_surg_form',
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
                    var select=$("<select id='ps_type_input' class='form-control' onchange='proc_surgery_OnSelect($(this))'></select>");
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

                        addprocedure_button=$('<button class="btn btn-success btn-sm btn-block" onclick="addProcedure()">Add Procedure</button>')
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

                            addSurgery_button=$('<button class="btn btn-success btn-sm btn-block" onclick="addSurgery()">Add Surgery</button>')
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





