var rw_type_list=['Room','Ward'];
var room_status_list=['Available', 'Not Available']
var ward_datatable;
var ward_dict;
var ward_id_selected=0;
var ward_list=[]
var room_datatable;
var room_dict;
var room_id_selected=0;
var room_list=[]
var room_data_info_table;
var ward_data_info_table;

$( document ).ready(function() {
  
});
function addRoomWardForm(){
    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': { 

        },
        url: '/room_ward_data_info',
        success: function(data){            
            $('#main_page_content').empty()
            var container_update_room_ward_dashboard= $('#main_page_content').append('<div class="container-fluid" id="container-update-room-ward-dashboard"></div>');
            $("#container-update-room-ward-dashboard").append("<h2 class ='center_h_tag_forms'>Add Room/Ward Bed</h2>");
            $("#container-update-room-ward-dashboard").append("<hr class='custom_hr'>");
            var main_row_div= $("<div class='row is-flex'></div>");
        
            $(container_update_room_ward_dashboard).append(main_row_div);
            var main_col_div=$("<div class='col-md-6' id='main_col_div'></div>");
               
            $(main_row_div).append(main_col_div);
        
                var row_div_one=$("<div class='row' id= 'row_div_one' style='padding-bottom:10px'></div>");
                    var col_one__row_div_one=$("<div class='col-md-6'></div>");
                        row__col_one__row_div_one=$("<div class='row'></div>");
                            colmd1=$("<div class='col-md-4'></div>")
                            colmd2=$("<div class='col-md-4'></div>")
        
                            room_ward_label=$("<label for='room/ward_tag' class='custom_label_css'>Room/Ward</label>");
                            colmd1.append(room_ward_label)
                            var select=$("<select id='rw_type_input' class='form-control' onchange='rw_OnSelect($(this))'></select>");
                                var option=$("<option selected='selected' value='--'>--</option>");
                                var option1=$("<option id="+rw_type_list[0]+"-opt value="+rw_type_list[0]+">"+rw_type_list[0]+"</option>");
        
                                $(select).append(option);
                                $(select).append(option1);
                             colmd2.append(select) 
                            
                                for (var i=1;i<=rw_type_list.length;i++){
                                    if (rw_type_list[i]!==undefined){
                                        var option=$("<option id="+rw_type_list[i]+"-opt value="+rw_type_list[i]+">"+rw_type_list[i]+"</option>");
                                        $(select).append(option);
                                    }
                                } 
                        row__col_one__row_div_one.append(colmd1);
                        row__col_one__row_div_one.append(colmd2);
                    col_one__row_div_one.append(row__col_one__row_div_one);
                    
                        
                              
        
                $(row_div_one).append(col_one__row_div_one);
             
            $(main_col_div).append(row_div_one);
        
            var main_col_div2=$("<div class='col-md-6' id='main_col_div2'></div>");
        
                var room_table_div=$('<div id="room_table_info_div">');
                    var room_table=$("<table id='room_table_info'  class='display' width='100%'></table>")
                room_table_div.append(room_table);
                var ward_table_div=$('<div id="ward_table_info_div">');
                    var ward_table=$("<table id='ward_table_info'  class='display' width='100%'></table>")
                ward_table_div.append(ward_table);
            main_col_div2.append(room_table_div);
            main_col_div2.append(ward_table_div);    
            $(main_row_div).append(main_col_div2);

            room_dict=JSON.parse(data["room_dict"])
            room_info_list=[]

            for (key in room_dict){
                temp_list=[];
                temp_list.push(key)
                temp_list.push(room_dict[key]['floor_no'])
                temp_list.push(room_dict[key]['room_no'])
                temp_list.push(room_dict[key]['charge_per_day'])
                temp_list.push(room_dict[key]['ac_charge_per_day'])
                temp_list.push(room_dict[key]['status'])
                room_info_list.push(temp_list);
                // room_datatable.row.add(temp_list).draw();


            }
            ward_info_list=[];
            ward_dict=JSON.parse(data["ward_dict"])
            for (key in ward_dict){
                temp_list=[];
                temp_list.push(key)
                temp_list.push(ward_dict[key]['ward_no'])
                temp_list.push(ward_dict[key]['bed_no'])
                temp_list.push(ward_dict[key]['charge_per_day'])
                temp_list.push(ward_dict[key]['status'])
                ward_info_list.push(temp_list)
                // ward_datatable.row.add(temp_list).draw();
                
            }
            createRoomTableInfo(room_info_list);
            createWardTableInfo(ward_info_list);
           
        },
    });
   
}
function rw_OnSelect(element){

    optionSelected = $(element).val()
    console.log("optionSelected",optionSelected)

    if(optionSelected === 'Room'){
        $('#row_div_two').remove();
        var main_col_div=$('#main_col_div')
            var row_div_two=$("<div class='row' id='row_div_two' style='padding-bottom:10px'></div>");

                var main_col__row_two=$("<div class='col-md-12'></div>");

                    var row_one=$("<div class='row' style='padding-bottom:10px'></div>")

                        var col_one__row_one=$("<div class='col-md-12'></div>");
                                row__col_one__row_one=$("<div class='row'></div>");
                                colmd1=$("<div class='col-md-2'></div>")
                                colmd2=$("<div class='col-md-2'></div>")
            
                                    roomNo_label=$("<label for='roomNo_tag' class='custom_label_css'>Room Number</label>");
                                    colmd1.append(roomNo_label)
                                    roonNo_input=$("<input id='room_no_input' class='custom_input_css form-control'>")
                                    colmd2.append(roonNo_input)
            
                                row__col_one__row_one.append(colmd1);
                                row__col_one__row_one.append(colmd2);

                            col_one__row_one.append(row__col_one__row_one);

                    row_one.append(col_one__row_one)

                    var row_two=$("<div class='row' style='padding-bottom:10px'></div>")

                        var col_one__row_two=$("<div class='col-md-12'></div>");
                                row__col_one__row_two=$("<div class='row'></div>");
                                colmd1=$("<div class='col-md-2'></div>")
                                colmd2=$("<div class='col-md-2'></div>")
            
                                    floorNo_label=$("<label for='floorNo_tag' class='custom_label_css'>Floor Number</label>");
                                    colmd1.append(floorNo_label)
                                    floor_no_input=$("<input id='floor_no_input' class='custom_input_css form-control'>")
                                    colmd2.append(floor_no_input)
            
                                row__col_one__row_two.append(colmd1);
                                row__col_one__row_two.append(colmd2);

                            col_one__row_two.append(row__col_one__row_two);

                    row_two.append(col_one__row_two)
                    
                    var row_three=$("<div class='row' style='padding-bottom:10px'></div>")

                        var col_one__row_three=$("<div class='col-md-12'></div>");
                            row__col_one__row_three=$("<div class='row'></div>");
                                colmd1=$("<div class='col-md-2'></div>")
                                colmd2=$("<div class='col-md-2'></div>")


                                    roomPrice_label=$("<label for='roomPrice_tag' class='custom_label_css'>Room Cost Per Day</label>");
                                    colmd1.append(roomPrice_label)
                                    room_price_input=$("<input id='room_price_input' class='custom_input_css form-control'>")
                                    colmd2.append(room_price_input)

                            row__col_one__row_three.append(colmd1);
                            row__col_one__row_three.append(colmd2);

                        col_one__row_three.append(row__col_one__row_three);

                    row_three.append(col_one__row_three)
                
                    var row_four=$("<div class='row' style='padding-bottom:10px'></div>")

                        var col_one__row_four=$("<div class='col-md-12'></div>");
                            row__col_one__row_four=$("<div class='row'></div>");
                               
                                colmd1=$("<div class='col-md-2'></div>")
                                colmd2=$("<div class='col-md-2'></div>")

                                    acPrice_label=$("<label for='acPrice_tag' class='custom_label_css'>A/C Cost Per Day</label>");
                                    colmd1.append(acPrice_label)
                                    acPrice_input=$("<input id='acPrice_input' class='custom_input_css form-control'>")
                                    colmd2.append(acPrice_input)

                            row__col_one__row_four.append(colmd1);
                            row__col_one__row_four.append(colmd2);

                        col_one__row_four.append(row__col_one__row_four);
                    row_four.append(col_one__row_four)

                    var row_five=$("<div class='row' style='padding-bottom:10px'></div>")

                        var col_one__row_five=$("<div class='col-md-12'></div>");
                                row__col_one__row_five=$("<div class='row'></div>");
                                    colmd1=$("<div class='col-md-2'></div>")
                                    colmd2=$("<div class='col-md-2'></div>")

                                        room_status_label=$("<label for='acPrice_tag' class='custom_label_css'>Status</label>")
                                        colmd1.append(room_status_label)
                                        var select=$("<select id='status_input' class='form-control'></select>");
                                        var option=$("<option selected='selected' value='--'>--</option>");
                                        var option1=$("<option id="+room_status_list[0]+"-opt value="+room_status_list[0]+">"+room_status_list[0]+"</option>");

                                        $(select).append(option);
                                        $(select).append(option1);
                                        colmd2.append(select) 
                                
                                        for (var i=1;i<=room_status_list.length;i++){
                                            if (room_status_list[i]!==undefined){
                                                var option=$("<option id="+room_status_list[i]+"-opt value="+room_status_list[i]+">"+room_status_list[i]+"</option>");
                                                $(select).append(option);
                                            }
                                        } 
                                row__col_one__row_five.append(colmd1);
                                row__col_one__row_five.append(colmd2);
                        col_one__row_five.append(row__col_one__row_five);
                    row_five.append(col_one__row_five)

                    var row_six=$("<div class='row' style='padding-bottom:10px'></div>")

                        var col_one__row_six=$("<div class='col-md-12'></div>");
                            row__col_one__row_six=$("<div class='row'></div>");
                            colmd1=$("<div class='col-md-2 offset-md-2'></div>")

                            saveRoomDataForm_button=$('<button class="btn btn-success btn-block fa fa-save" onclick="saveRoomWard()">  Save</button>')
                            colmd1.append(saveRoomDataForm_button)

                            row__col_one__row_six.append(colmd1);
                        col_one__row_six.append(row__col_one__row_six);
                    row_six.append(col_one__row_six)

                main_col__row_two.append(row_one)
                main_col__row_two.append(row_two)
                main_col__row_two.append(row_three)
                main_col__row_two.append(row_four)
                main_col__row_two.append(row_five)
                main_col__row_two.append(row_six)

        row_div_two.append(main_col__row_two)
    main_col_div.append(row_div_two)

    }
    else if(optionSelected === 'Ward'){
        $('#row_div_two').remove();
        var main_col_div=$('#main_col_div')
            var row_div_two=$("<div class='row' id='row_div_two' style='padding-bottom:10px'></div>");

            var main_col__row_two=$("<div class='col-md-12'></div>");

                var row_one=$("<div class='row' style='padding-bottom:10px'></div>")

                    var col_one__row_one=$("<div class='col-md-12'></div>");
                            row__col_one__row_one=$("<div class='row'></div>");
                            colmd1=$("<div class='col-md-2'></div>")
                            colmd2=$("<div class='col-md-2'></div>")
        
                                wardNo_label=$("<label for='wardNo_tag' class='custom_label_css'>Ward Number</label>");
                                colmd1.append(wardNo_label)
                                ward_no_input=$("<input id='ward_no_input' class='custom_input_css form-control'>")
                                colmd2.append(ward_no_input)
        
                            row__col_one__row_one.append(colmd1);
                            row__col_one__row_one.append(colmd2);

                        col_one__row_one.append(row__col_one__row_one);

                row_one.append(col_one__row_one)

                var row_two=$("<div class='row' style='padding-bottom:10px'></div>")

                    var col_one__row_two=$("<div class='col-md-12'></div>");
                            row__col_one__row_two=$("<div class='row'></div>");
                            colmd1=$("<div class='col-md-2'></div>")
                            colmd2=$("<div class='col-md-2'></div>")
        
                                bedNo_label=$("<label for='bedNo_tag' class='custom_label_css'>Bed Number</label>");
                                colmd1.append(bedNo_label)
                                bed_no_input=$("<input id='bed_no_input' class='custom_input_css form-control'>")
                                colmd2.append(bed_no_input)
        
                            row__col_one__row_two.append(colmd1);
                            row__col_one__row_two.append(colmd2);

                        col_one__row_two.append(row__col_one__row_two);

                row_two.append(col_one__row_two)
                
                var row_three=$("<div class='row' style='padding-bottom:10px'></div>")

                    var col_one__row_three=$("<div class='col-md-12'></div>");
                        row__col_one__row_three=$("<div class='row'></div>");
                            colmd1=$("<div class='col-md-2'></div>")
                            colmd2=$("<div class='col-md-2'></div>")


                                bedPrice_label=$("<label for='bedPrice_tag' class='custom_label_css'>Cost Per Day</label>");
                                colmd1.append(bedPrice_label)
                                bed_price_input=$("<input id='bed_price_input' class='custom_input_css form-control'>")
                                colmd2.append(bed_price_input)

                        row__col_one__row_three.append(colmd1);
                        row__col_one__row_three.append(colmd2);

                    col_one__row_three.append(row__col_one__row_three);

                row_three.append(col_one__row_three)
            
                var row_four=$("<div class='row' style='padding-bottom:10px'></div>")

                    var col_one__row_four=$("<div class='col-md-12'></div>");
                            row__col_one__row_four=$("<div class='row'></div>");
                                colmd1=$("<div class='col-md-2'></div>")
                                colmd2=$("<div class='col-md-2'></div>")

                                    bed_status_label=$("<label for='status_tag' class='custom_label_css'>Status</label>")
                                    colmd1.append(bed_status_label)
                                    var select=$("<select id='status_input' class='form-control'></select>");
                                    var option=$("<option selected='selected' value='--'>--</option>");
                                    var option1=$("<option id="+room_status_list[0]+"-opt value="+room_status_list[0]+">"+room_status_list[0]+"</option>");

                                    $(select).append(option);
                                    $(select).append(option1);
                                    colmd2.append(select) 
                            
                                    for (var i=1;i<=room_status_list.length;i++){
                                        if (room_status_list[i]!==undefined){
                                            var option=$("<option id="+room_status_list[i]+"-opt value="+room_status_list[i]+">"+room_status_list[i]+"</option>");
                                            $(select).append(option);
                                        }
                                    } 
                            row__col_one__row_four.append(colmd1);
                            row__col_one__row_four.append(colmd2);
                    col_one__row_four.append(row__col_one__row_four);
                row_four.append(col_one__row_four)

                var row_five=$("<div class='row' style='padding-bottom:10px'></div>")

                    var col_one__row_five=$("<div class='col-md-12'></div>");
                        row__col_one__row_five=$("<div class='row'></div>");
                        colmd1=$("<div class='col-md-2 offset-md-2'></div>")

                        saveRoomDataForm_button=$('<button class="btn btn-success btn-block fa fa-save" onclick="saveRoomWard()">  Save</button>')
                        colmd1.append(saveRoomDataForm_button)

                        row__col_one__row_five.append(colmd1);
                    col_one__row_five.append(row__col_one__row_five);
                row_five.append(col_one__row_five)

            main_col__row_two.append(row_one)
            main_col__row_two.append(row_two)
            main_col__row_two.append(row_three)
            main_col__row_two.append(row_four)
            main_col__row_two.append(row_five)

        row_div_two.append(main_col__row_two)
    main_col_div.append(row_div_two)

    }
    else{
        $('#row_div_two').remove();
    }
}
function saveRoomWard(){
    var rw_selected=$("#rw_type_input").val();
    if(rw_selected === 'Room'){

        var room_Ward= rw_selected;
        console.log("room_Ward", room_Ward);

        var roomNo=$("#room_no_input").val();
        console.log("roomNo", roomNo);

        var floorNo=$("#floor_no_input").val();
        console.log("floorNo", floorNo);

        var roomCharge=$("#room_price_input").val();
        console.log("roomCharge", roomCharge);

        var ac_price=$("#acPrice_input").val();
        console.log("ac_price", ac_price);

        var status=$("#status_input").val();
        console.log("status", status);
        required_fields_left=false
        if (roomNo===""){
            $("#empty_name_check_div_room_no_input").remove();
            var div=$("<div class='empty_name_check_div' id='empty_name_check_div_room_no_input'><span  class='glyphicon' style='color:red'>&#x2a;Required</span></div>")
            $("#room_no_input").parent().append(div);
            required_fields_left=true
        }
        else{
            if($("#room_no_input").parent().find(".empty_name_check_div").length > 0){
                $("#empty_name_check_div_room_no_input").remove();
            }
        }
        if (floorNo===""){
            $("#empty_name_check_div_floor_no_input").remove();
            var div=$("<div class='empty_name_check_div' id='empty_name_check_div_floor_no_input'><span  class='glyphicon' style='color:red'>&#x2a;Required</span></div>")
            $("#floor_no_input").parent().append(div);
            required_fields_left=true
        }
        else{
            if($("#floor_no_input").parent().find(".empty_name_check_div").length > 0){
                $("#empty_name_check_div_floor_no_input").remove();
            }
        }
        if (required_fields_left===true){
            return;
        }
        $.ajax({
            type: 'POST',
            dataType: "json",
            'data': {
                "room_number":roomNo,
                "floor_no":floorNo,
                "room_charges":roomCharge,
                "ac_charges":ac_price,
                "status":status,
            },
            url: '/add_room_form',
            success: function(data){
                roompresent=data['roompresent']
                if (roompresent==="present"){
                    alert("This Room No is Already Entered")
                }
                else{
                    $("#room_no_input").val("");
                    $("#floor_no_input").val("");
                    $("#room_price_input").val("");
                    $("#acPrice_input").val("");
                    $("#status_input").val("");


                }
                room_dict=JSON.parse(data["room_dict"])
                room_info_list=[]
                room_data_info_table.clear()
                for (key in room_dict){
                    temp_list=[];
                    temp_list.push(key)
                    temp_list.push(room_dict[key]['floor_no'])
                    temp_list.push(room_dict[key]['room_no'])
                    temp_list.push(room_dict[key]['charge_per_day'])
                    temp_list.push(room_dict[key]['ac_charge_per_day'])
                    temp_list.push(room_dict[key]['status'])
                    // room_info_list.push(temp_list);
                    room_data_info_table.row.add(temp_list).draw();
    
    
                }
            },
        });
    }
    else{
        var room_Ward= rw_selected;
        console.log("room_Ward", room_Ward);

        var wardNo=$("#ward_no_input").val();
        console.log("wardNo", wardNo);
        

        var bedNo=$("#bed_no_input").val();
        console.log("bedNo", bedNo);

        var bedCharges=$("#bed_price_input").val();
        console.log("bedCharges", bedCharges);
       

        var status=$("#status_input").val();
        console.log("status", status);
        required_fields_left=false
        if (wardNo===""){
            $("#empty_name_check_div_ward_no_input").remove();
            var div=$("<div class='empty_name_check_div' id='empty_name_check_div_ward_no_input'><span  class='glyphicon' style='color:red'>&#x2a;Required</span></div>")
            $("#ward_no_input").parent().append(div);
            required_fields_left=true
        }
        else{
            if($("#ward_no_input").parent().find(".empty_name_check_div").length > 0){
                $("#empty_name_check_div_ward_no_input").remove();
            }
        }
        if (bedNo===""){
            $("#empty_name_check_div_bed_no_input").remove();
            var div=$("<div class='empty_name_check_div' id='empty_name_check_div_bed_no_input'><span  class='glyphicon' style='color:red'>&#x2a;Required</span></div>")
            $("#bed_no_input").parent().append(div);
            required_fields_left=true
        }
        else{
            if($("#bed_no_input").parent().find(".empty_name_check_div").length > 0){
                $("#empty_name_check_div_bed_no_input").remove();
            }
        }
        if (required_fields_left===true){
            return;
        }

        $.ajax({
            type: 'POST',
            dataType: "json",
            'data': {
                "ward_number":wardNo,
                "bed_no":bedNo,
                "bedCharges":bedCharges,
                "status":status,
            },
            url: '/add_ward_form',
            success: function(data){
                wardbedpresent=data['wardbedpresent'];
                if (wardbedpresent==="present"){
                    alert("This Bed is Already Entered")
                }
                else{
                    $("#ward_no_input").val("");
                    $("#bed_no_input").val("");
                    $("#bed_price_input").val("");
                    $("#status_input").val("")
                    $("#bed_no_input").val("");

                }
                ward_info_list=[];
                ward_dict=JSON.parse(data["ward_dict"])
                ward_data_info_table.clear();
                for (key in ward_dict){
                    temp_list=[];
                    temp_list.push(key)
                    temp_list.push(ward_dict[key]['ward_no'])
                    temp_list.push(ward_dict[key]['bed_no'])
                    temp_list.push(ward_dict[key]['charge_per_day'])
                    temp_list.push(ward_dict[key]['status'])
                    ward_data_info_table.row.add(temp_list).draw();
                
                    
                }
            },

        });
    }
}
function updateRoomWardForm(){
    $('#main_page_content').empty()
    var container_update_room_ward_dashboard= $('#main_page_content').append('<div class="container-fluid" id="container-update-room-ward-dashboard"></div>');
    $("#container-update-room-ward-dashboard").append("<h2 class ='center_h_tag_forms'>Update Room/Ward Info</h2>");
    $("#container-update-room-ward-dashboard").append("<hr class='custom_hr'>");
    var main_row_div= $("<div class='row is-flex'></div>");

    $(container_update_room_ward_dashboard).append(main_row_div);
    var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");
       
    $(main_row_div).append(main_col_div);

        var row_div_one=$("<div class='row' id= 'row_div_one' style='padding-bottom:10px'></div>");
            var col_one__row_div_one=$("<div class='col-md-6'></div>");
                row__col_one__row_div_one=$("<div class='row'></div>");
                    colmd1=$("<div class='col-md-4'></div>")
                    colmd2=$("<div class='col-md-3'></div>")

                    room_ward_label=$("<label for='room/ward_tag' class='custom_label_css'>Room/Ward</label>");
                    colmd1.append(room_ward_label)
                    var select=$("<select id='rw_type_input' class='form-control' onchange='update_rw_OnSelect($(this))'></select>");
                        var option=$("<option selected='selected' value='--'>--</option>");
                        var option1=$("<option id="+rw_type_list[0]+"-opt value="+rw_type_list[0]+">"+rw_type_list[0]+"</option>");

                        $(select).append(option);
                        $(select).append(option1);
                     colmd2.append(select) 
                    
                        for (var i=1;i<=rw_type_list.length;i++){
                            if (rw_type_list[i]!==undefined){
                                var option=$("<option id="+rw_type_list[i]+"-opt value="+rw_type_list[i]+">"+rw_type_list[i]+"</option>");
                                $(select).append(option);
                            }
                        } 
                row__col_one__row_div_one.append(colmd1);
                row__col_one__row_div_one.append(colmd2);
            col_one__row_div_one.append(row__col_one__row_div_one);

        $(row_div_one).append(col_one__row_div_one);
    $(main_col_div).append(row_div_one);

}
function availableRoomWardRowDivTwo(){
    var main_col_div=$("#main_col_div");
        var row_div_two=$("<div class='row' id='row_div_two'></div>");
        // Datatable Name
            var col_one__row_div_two=$("<div class='col-md-12'></div>");
                var row__col_one__row_div_two=$("<div class='row'></div>");
                    var colmd1=$("<div class='col-md-12'></div>")
                        var available_room_ward_table=$('<table id="available_room_ward_table" class="display" width="100%"></table>')

                    colmd1.append(available_room_ward_table)
                row__col_one__row_div_two.append(colmd1);

            col_one__row_div_two.append(row__col_one__row_div_two);
        $(row_div_two).append(col_one__row_div_two);
    main_col_div.append(row_div_two)
}
function update_rw_OnSelect(element){

    var Room_WardSelected = $(element).val()
    
    console.log("Room_WardSelected",Room_WardSelected)
    if (Room_WardSelected==='Room'){
        $("#row_div_three").remove();
        $("#row_div_two").remove();

        if (room_datatable!==undefined){
            room_datatable.destroy();

        }
        if (ward_datatable!==undefined){
            ward_datatable.destroy();

        }
    
        availableRoomWardRowDivTwo();
        retrieveAllRoomInfoInRoomWard();
       
        // else if (ward_datatable!==undefined){

        //     ward_datatable.destroy();
        //     $("#row_div_two").remove();

        //     availableRoomWardRowDivTwo()
        //     retrieveAllRoomInfoInRoomWard()
        // }
        // else{
        //     availableRoomWardRowDivTwo()
        //     retrieveAllRoomInfoInRoomWard()
        // }
        
    }
    else if (Room_WardSelected==='Ward'){
        $("#row_div_three").remove();
        $("#row_div_two").remove();

        if (room_datatable!==undefined){
            room_datatable.destroy();

        }
        if (ward_datatable!==undefined){
            ward_datatable.destroy();

        }
    
        
        availableRoomWardRowDivTwo();
        retrieveAllWardInfoInRoomWard();
    

    }
    else{
        $("#row_div_three").remove();
        if (room_datatable!==undefined){
            room_datatable.destroy();
            $("#row_div_two").remove();
        }
        else if (ward_datatable!==undefined){

            ward_datatable.destroy();
            $("#row_div_two").remove();
        }
    }

}
function createRoomDTable(){
    console.log("room_list----------",room_list)
    $(function(){
        room_datatable=$("#available_room_ward_table").DataTable({
            data:room_list,
            columns: [
                { title: "Id" },
                { title: "Floor" },
                { title: "Room Number" },
                { title: 'Charge Per Day' },
                { title: "AC Charge Per Day" },
                { title: "Status" },
                ],
                paging: false,
                scrollY: 200,
                scrollX: true,
                ordering: true,
                info:false,
                searching:false,

            });
            $('#available_room_ward_table tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    alert("clicked same entry")
                }
                else{
                    room_id_selected=$(this).find('td').eq(0).text()
                    console.log("room_id_selected",room_id_selected)
                    room_datatable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    console.log("room dict on click",room_dict);
                    $("#row_div_three").remove();

                    var row_div_three=$("<div class='row' id='row_div_three' style='padding-top:10px'></div>");
                        var main_subcol=$("<div class='col-md-12'></div>");

                            var subrow_one=$("<div class='row' style='padding-bottom:10px'></div>")

                                    var col_one__subrow_one=$("<div class='col-md-6'></div>");
                                            row__col_one__subrow_one=$("<div class='row'></div>");
                                                var colmd1=$("<div class='col-md-3'></div>")
                                                var colmd2=$("<div class='col-md-3 offset-md-1'></div>")
                                                    var floorNo_label=$("<label for='floorNo_label' class='custom_label_css'>Floor Number</label>");
                                                    var floor_no_input=$("<input  id='floor_no_input' class='form-control' value='"+room_dict[room_id_selected]['floor_no']+"' disabled>")
                                                colmd1.append(floorNo_label)
                                                colmd2.append(floor_no_input)
                                            row__col_one__subrow_one.append(colmd1);
                                            row__col_one__subrow_one.append(colmd2);
                                        col_one__subrow_one.append(row__col_one__subrow_one);

                                        var col_two__subrow_one=$("<div class='col-md-6'></div>");
                                            row__col_two__subrow_one=$("<div class='row'></div>");
                                                var colmd1=$("<div class='col-md-3'></div>")
                                                var colmd2=$("<div class='col-md-3'></div>")
                                                    var roomNo_label=$("<label for='roomNo_label' class='custom_label_css'>Room Number</label>");
                                                    var room_no_input=$("<input  id='room_no_input' class='form-control' value='"+room_dict[room_id_selected]['room_no']+"' disabled>")
                                                colmd1.append(roomNo_label)
                                                colmd2.append(room_no_input)
                                            row__col_two__subrow_one.append(colmd1);
                                            row__col_two__subrow_one.append(colmd2);
                                        col_two__subrow_one.append(row__col_two__subrow_one);

                            subrow_one.append(col_one__subrow_one)
                            subrow_one.append(col_two__subrow_one)


                            var subrow_two=$("<div class='row' style='padding-bottom:10px'></div>")
                                var col_one_subrow_two=$("<div class='col-md-6'></div>");
                                    var row__col_one_subrow_two=$("<div class='row'></div>");
                                        colmd1=$("<div class='col-md-4'></div>")
                                        colmd2=$("<div class='col-md-3'></div>")

                                            var roomCharges_label=$("<label class='custom_label_css'>Room Charges Per Day</label>");
                                            var room_charges_input=$("<input  id='room_charges_input' class='form-control' value='"+room_dict[room_id_selected]['charge_per_day']+"'>")

                                        colmd1.append(roomCharges_label)
                                        colmd2.append(room_charges_input)
                            
                                    row__col_one_subrow_two.append(colmd1);
                                    row__col_one_subrow_two.append(colmd2);
                            
                                col_one_subrow_two.append(row__col_one_subrow_two);

                                var col_two_subrow_two=$("<div class='col-md-6'></div>");
                                    var row__col_two_subrow_two=$("<div class='row'></div>");
                                        colmd1=$("<div class='col-md-3 '></div>")
                                        colmd2=$("<div class='col-md-3'></div>")

                                            var acCharges_label=$("<label class='custom_label_css'>A/C Charges Per Day</label>");
                                            var ac_charges_input=$("<input  id='ac_charges_input' class='form-control' value='"+room_dict[room_id_selected]['ac_charge_per_day']+"'>")

                                        colmd1.append(acCharges_label)
                                        colmd2.append(ac_charges_input)
                            
                                    row__col_two_subrow_two.append(colmd1);
                                    row__col_two_subrow_two.append(colmd2);
                        
                                col_two_subrow_two.append(row__col_two_subrow_two);

                            subrow_two.append(col_one_subrow_two)
                            subrow_two.append(col_two_subrow_two)

                            var subrow_three=$("<div class='row' style='padding-bottom:10px'></div>")
                                var col_one__subrow_three=$("<div class='col-md-6'></div>");
                                    var row__col_one__subrow_three=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-4'></div>")
                                        var colmd2=$("<div class='col-md-3'></div>")
                                        
                                            var status_label=$("<label  class='custom_label_css'>Status</label>");
                                            var select=$("<select id='status_input' class='form-control' ></select>");
                                    
                                            for (var i=0;i<=room_status_list.length;i++){
                                                if (room_status_list[i]!==undefined){
                                                    var option=$("<option id="+room_status_list[i]+"-opt  value='"+room_status_list[i]+"'>"+room_status_list[i]+"</option>");
                                                    $(select).append(option);
                                                    if(room_dict[room_id_selected]['status']==room_status_list[i]){
                                                        $(option).attr('selected', 'selected');
                                                    }                                        
                                                }
                                            }                                         
                                        colmd1.append(status_label)
                                        colmd2.append(select);
                                
                                        row__col_one__subrow_three.append(colmd1);
                                        row__col_one__subrow_three.append(colmd2);
                                col_one__subrow_three.append(row__col_one__subrow_three);
                               
                            subrow_three.append(col_one__subrow_three)

                            var subrow_four=$("<div class='row'></div>")
                                var col_one__subrow_four=$("<div class='col-md-12'></div>");
                                    var row__col_one__subrow_four=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-3'></div>")
                                        var colmd2=$("<div class='col-md-6'></div>")
                                        var colmd3=$("<div class='col-md-3'></div>")
                                        
                                            var printPres_button=$('<button class="btn btn-success btn-block fa fa-save" onclick="updateRoomData()">  Update Room Data</button>')
                                            colmd2.append(printPres_button);
                                
                                        row__col_one__subrow_four.append(colmd1);
                                        row__col_one__subrow_four.append(colmd2);
                                        row__col_one__subrow_four.append(colmd3);

                                col_one__subrow_four.append(row__col_one__subrow_four);

                            subrow_four.append(col_one__subrow_four)

                        main_subcol.append(subrow_one)
                        main_subcol.append(subrow_two)
                        main_subcol.append(subrow_three)
                        main_subcol.append(subrow_four)

                    row_div_three.append(main_subcol)
                var main_col_div=$("#main_col_div");
            main_col_div.append(row_div_three)
            }
        });
    });
}
function createWardDTable(){
    console.log("ward_list",ward_list)
    $(function(){
        ward_datatable=$("#available_room_ward_table").DataTable({
            data:ward_list,
            columns: [
                { title: "Id" },
                { title: "Ward No" },
                { title: "Bed Number" },
                { title: 'Charge Per Day' },
                { title: 'Status' },

                ],
                paging: false,
                scrollY: 200,
                scrollX: true,
                ordering: true,
                info:false,
    
            });
            $('#available_room_ward_table tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    alert("clicked same entry")
                }
                else{
                    ward_id_selected=$(this).find('td').eq(0).text()

                    ward_datatable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    console.log("ward dict on click",ward_dict);
                    $("#row_div_three").remove();
                    var row_div_three=$("<div class='row' id='row_div_three'></div>");
                        var main_subcol=$("<div class='col-md-12'></div>");

                            var subrow_one=$("<div class='row' style='padding-bottom:10px'></div>")

                                var col_one__subrow_one=$("<div class='col-md-6'></div>");
                                        row__col_one__subrow_one=$("<div class='row'></div>");
                                            var colmd1=$("<div class='col-md-3'></div>")
                                            var colmd2=$("<div class='col-md-3 offset-md-1'></div>")
                                                var wardNo_label=$("<label for='wardNo_label' class='custom_label_css'>Ward Number</label>");
                                                var ward_no_input=$("<input  id='ward_no_input' class='form-control' value='"+ward_dict[ward_id_selected]['ward_no']+"' disabled>")
                                            colmd1.append(wardNo_label)
                                            colmd2.append(ward_no_input)
                                        row__col_one__subrow_one.append(colmd1);
                                        row__col_one__subrow_one.append(colmd2);
                                    col_one__subrow_one.append(row__col_one__subrow_one);

                                    var col_two__subrow_one=$("<div class='col-md-6'></div>");
                                        row__col_two__subrow_one=$("<div class='row'></div>");
                                            var colmd1=$("<div class='col-md-3'></div>")
                                            var colmd2=$("<div class='col-md-3'></div>")
                                                var bedNo_label=$("<label for='bedNo_label' class='custom_label_css'>Bed Number</label>");
                                                var bed_no_input=$("<input  id='bed_no_input' class='form-control' value='"+ward_dict[ward_id_selected]['bed_no']+"' disabled>")
                                            colmd1.append(bedNo_label)
                                            colmd2.append(bed_no_input)
                                        row__col_two__subrow_one.append(colmd1);
                                        row__col_two__subrow_one.append(colmd2);
                                    col_two__subrow_one.append(row__col_two__subrow_one);

                            subrow_one.append(col_one__subrow_one)
                            subrow_one.append(col_two__subrow_one)


                            var subrow_two=$("<div class='row' style='padding-bottom:10px'></div>")
                                var col_one_subrow_two=$("<div class='col-md-6'></div>");
                                    var row__col_one_subrow_two=$("<div class='row'></div>");
                                        colmd1=$("<div class='col-md-4'></div>")
                                        colmd2=$("<div class='col-md-3'></div>")

                                            var bedCharges_label=$("<label class='custom_label_css'>Charges Per Day</label>");
                                            var bedCharges_input=$("<input  id='room_charges_input' class='form-control' value='"+ward_dict[ward_id_selected]['charge_per_day']+"'>")

                                        colmd1.append(bedCharges_label)
                                        colmd2.append(bedCharges_input)
                            
                                    row__col_one_subrow_two.append(colmd1);
                                    row__col_one_subrow_two.append(colmd2);
                            
                                col_one_subrow_two.append(row__col_one_subrow_two);

                            subrow_two.append(col_one_subrow_two)

                            var subrow_three=$("<div class='row' style='padding-bottom:10px'></div>")
                                var col_one__subrow_three=$("<div class='col-md-6'></div>");
                                    var row__col_one__subrow_three=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-4'></div>")
                                        var colmd2=$("<div class='col-md-3'></div>")
                                        
                                            var status_label=$("<label  class='custom_label_css'>Status</label>");
                                            var select=$("<select id='status_input' class='form-control' ></select>");
                                    
                                            for (var i=0;i<=room_status_list.length;i++){
                                                if (room_status_list[i]!==undefined){
                                                    var option=$("<option id="+room_status_list[i]+"-opt  value='"+room_status_list[i]+"'>"+room_status_list[i]+"</option>");
                                                    $(select).append(option);
                                                    if(ward_dict[ward_id_selected]['status']==room_status_list[i]){
                                                        $(option).attr('selected', 'selected');
                                                    }                                        
                                                }
                                            }                                         
                                        colmd1.append(status_label)
                                        colmd2.append(select);
                                
                                        row__col_one__subrow_three.append(colmd1);
                                        row__col_one__subrow_three.append(colmd2);
                                col_one__subrow_three.append(row__col_one__subrow_three);
                            
                            subrow_three.append(col_one__subrow_three)

                            var subrow_four=$("<div class='row'></div>")
                                var col_one__subrow_four=$("<div class='col-md-12'></div>");
                                    var row__col_one__subrow_four=$("<div class='row'></div>");
                                        var colmd1=$("<div class='col-md-3'></div>")
                                        var colmd2=$("<div class='col-md-6'></div>")
                                        var colmd3=$("<div class='col-md-3'></div>")
                                        
                                            var printPres_button=$('<button class="btn btn-success btn-block fa fa-save" onclick="updateWardData()" >  Update Ward Data</button>')
                                            colmd2.append(printPres_button);
                                
                                        row__col_one__subrow_four.append(colmd1);
                                        row__col_one__subrow_four.append(colmd2);
                                        row__col_one__subrow_four.append(colmd3);

                                col_one__subrow_four.append(row__col_one__subrow_four);
                            subrow_four.append(col_one__subrow_four)
                                
                        main_subcol.append(subrow_one)
                        main_subcol.append(subrow_two)
                        main_subcol.append(subrow_three)
                        main_subcol.append(subrow_four)

                    row_div_three.append(main_subcol)
                    
                var main_col_div=$("#main_col_div");
                main_col_div.append(row_div_three) 
            }
        });
    });
}
function updateRoomData(){
    var floor=$("#floor_no_input").val();;
    var room_no=$("#room_no_input").val();
    var charge_per_day=$("#room_charges_input").val();
    var ac_charge_per_day=$("#ac_charges_input").val();
    var status=$("#status_input").val();
    
    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            "floor":JSON.stringify(floor),
            "room_no":JSON.stringify(room_no),
            "charge_per_day":JSON.stringify(charge_per_day),
            "ac_charge_per_day":JSON.stringify(ac_charge_per_day),
            "status":JSON.stringify(status),

        },
        url: '/update_room_data',
        success: function(data){
            $("#row_div_three").remove();
            room_dict=JSON.parse(data["room_dict"])
            room_datatable.clear();
            for (key in room_dict){
                temp_list=[];
                temp_list.push(key)
                temp_list.push(room_dict[key]['floor_no'])
                temp_list.push(room_dict[key]['room_no'])
                temp_list.push(room_dict[key]['charge_per_day'])
                temp_list.push(room_dict[key]['ac_charge_per_day'])
                temp_list.push(room_dict[key]['status'])
                room_datatable.row.add(temp_list).draw();


            }
            console.log("After Update",room_dict);
            console.log(data['Success']);
            alert("Updated")
        },
    });
}
function updateWardData(){
    var ward_no=$("#ward_no_input").val();
    var bed_no=$("#bed_no_input").val();
    var charge_per_day=$("#room_charges_input").val();
    var status=$("#status_input").val();
    
    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            "ward_no":JSON.stringify(ward_no),
            "bed_no":JSON.stringify(bed_no),
            "charge_per_day":JSON.stringify(charge_per_day),
            "status":JSON.stringify(status),

        },
        url: '/update_ward_data',
        success: function(data){
            $("#row_div_three").remove();
            ward_dict=JSON.parse(data["ward_dict"])
            ward_datatable.clear();
            for (key in ward_dict){
                temp_list=[];
                temp_list.push(key)
                temp_list.push(ward_dict[key]['ward_no'])
                temp_list.push(ward_dict[key]['bed_no'])
                temp_list.push(ward_dict[key]['charge_per_day'])
                temp_list.push(ward_dict[key]['status'])
                ward_datatable.row.add(temp_list).draw();
                
            }
            console.log("After Update",ward_dict);
            console.log(data['Success']);
        },
    });
}
function retrieveAllWardInfoInRoomWard(){

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {

        },
        url: '/retireve_all_ward_info_in_room_ward',
        success: function(data){
            console.log("ward_dict",data["ward_dict"]);
            ward_dict={};
            ward_list=[]
            ward_dict=JSON.parse(data["ward_dict"])
            for (ward in ward_dict){
                templist=[];
                console.log("ward",ward);
                templist.push(ward)
                templist.push(ward_dict[ward]['ward_no'])
                templist.push(ward_dict[ward]['bed_no'])
                templist.push(ward_dict[ward]['charge_per_day'])
                templist.push(ward_dict[ward]['status'])

                ward_list.push(templist)
            }
            console.log("ward_dict",ward_dict);
            console.log(ward_list)
            $('#available_ward_table').show()

            createWardDTable()


        },
    }); 

}
function retrieveAllRoomInfoInRoomWard(){

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {

        },
        url: '/retireve_all_room_info_in_room_ward',
        success: function(data){
            console.log("room_dict",data["room_dict"]);
            room_dict={};
            room_list=[]
            room_dict=JSON.parse(data["room_dict"])
            for (room in room_dict){
                templist=[];
                console.log("room",room);
                templist.push(room)
                templist.push(room_dict[room]['floor_no'])
                templist.push(room_dict[room]['room_no'])
                templist.push(room_dict[room]['charge_per_day'])
                templist.push(room_dict[room]['ac_charge_per_day'])
                templist.push(room_dict[room]['status'])

                room_list.push(templist)
            }
            console.log("room_dict",room_dict);
            console.log(room_list)

            createRoomDTable()

        },
    }); 
}

function createRoomTableInfo(room_info_list){
    $(function(){
        room_data_info_table=$("#room_table_info").DataTable({
            data:room_info_list,
            columns: [
                { title: "Id" },
                { title: "Floor" },
                { title: "Room Number" },
                { title: 'Charge Per Day' },
                { title: "AC Charge Per Day" },
                { title: "Status" },
                ],
                paging: false,
                scrollY: 200,
                scrollX: true,
                ordering: true,
                info:false,
                searching:true,
                dom: 'Bfrtip',
                buttons: [
                    {
                    extend: 'print',
                    text: ' Print',
                    title: 'Rooms List',
                    className: 'btn btn-default fa fa-print',
                    }
                ],

            });
            $('#available_room_ward_table tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    alert("clicked same entry")
                }
                else{
            }
        });
    });
}
function createWardTableInfo(ward_info_list){
    $(function(){
        ward_data_info_table=$("#ward_table_info").DataTable({
            data:ward_info_list,
            columns: [
                { title: "Id" },
                { title: "Ward No" },
                { title: "Bed Number" },
                { title: 'Charge Per Day' },
                { title: 'Status' },

                ],
                paging: false,
                scrollY: 200,
                scrollX: true,
                ordering: true,
                info:false,
                dom: 'Bfrtip',
                buttons: [
                    {
                    extend: 'print',
                    text: ' Print',
                    title: 'Wards List',
                    className: 'btn btn-default fa fa-print',
                    }
                ],
    
            });
            $('#available_room_ward_table tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    alert("clicked same entry")
                }
                else{

                }
        });
    });
}
function ViewRoomList(){
    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': { 

        },
        url: '/room_ward_data_info',
        success: function(data){            
            $('#main_page_content').empty()
            var container_room_viewlist= $('#main_page_content').append('<div class="container-fluid" id="container_room_viewlist"></div>');
            $("#container_room_viewlist").append("<h2 class ='center_h_tag_forms'>View Rooms</h2>");
            $("#container_room_viewlist").append("<hr class='custom_hr'>");
            var main_row_div= $("<div class='row is-flex'></div>");

            $(container_room_viewlist).append(main_row_div);
            var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");
                var room_table_div=$('<div id="room_table_info_div">');
                    var room_table=$("<table id='room_table_info'  class='display' width='100%'></table>")
                room_table_div.append(room_table);
            main_col_div.append(room_table_div);
            $(main_row_div).append(main_col_div);
             
            room_dict=JSON.parse(data["room_dict"])
            room_info_list=[]
            for (key in room_dict){
                temp_list=[];
                temp_list.push(key)
                temp_list.push(room_dict[key]['floor_no'])
                temp_list.push(room_dict[key]['room_no'])
                temp_list.push(room_dict[key]['charge_per_day'])
                temp_list.push(room_dict[key]['ac_charge_per_day'])
                temp_list.push(room_dict[key]['status'])
                room_info_list.push(temp_list);


            }
            createRoomTableInfo(room_info_list);
        }
    });
}
function ViewWardList(){
    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': { 

        },
        url: '/room_ward_data_info',
        success: function(data){       
            $('#main_page_content').empty()
            var container_ward_viewlist= $('#main_page_content').append('<div class="container-fluid" id="container_ward_viewlist"></div>');
            $("#container_ward_viewlist").append("<h2 class ='center_h_tag_forms'>View Ward Beds</h2>");
            $("#container_ward_viewlist").append("<hr class='custom_hr'>");
            
            var main_row_div= $("<div class='row is-flex'></div>");

            $(container_ward_viewlist).append(main_row_div);
            var main_col_div=$("<div class='col-md-12' id='main_col_div'></div>");
                var ward_table_div=$('<div id="ward_table_info_div">');
                    var ward_table=$("<table id='ward_table_info'  class='display' width='100%'></table>")
                ward_table_div.append(ward_table);
            main_col_div.append(ward_table_div);
            $(main_row_div).append(main_col_div);
           

            ward_info_list=[];
            ward_dict=JSON.parse(data["ward_dict"])
            for (key in ward_dict){
                temp_list=[];
                temp_list.push(key)
                temp_list.push(ward_dict[key]['ward_no'])
                temp_list.push(ward_dict[key]['bed_no'])
                temp_list.push(ward_dict[key]['charge_per_day'])
                temp_list.push(ward_dict[key]['status'])
                ward_info_list.push(temp_list)
                
            }
            createWardTableInfo(ward_info_list);

        }
    });
}