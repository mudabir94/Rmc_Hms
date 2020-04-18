
var med_registered_vw_datatable; 
var med_stock_vw_datatable;
var med_desp_vw_datatable;
var med_stock_edit_datatable;
var med_stock_edit_selectedrow;
function retrieveMedicineRegistered(){
    console.log("medicine_name_list",medicine_name_list);
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
        },
        url: '/retrieve_medicine_name',
        success: function(data){
            medicine_name_type_list=[]
            medicine_name_list=data["medicine_name_list"];
            med_name_type_dict=JSON.parse(data["med_name_type_dict"]);
            medicine_name_type_list=JSON.parse(JSON.stringify(data['medicine_name_type_list']));
            console.log("med_name_type_dict",med_name_type_dict)
            console.log("success",medicine_name_list);
            createMedRegisteredTable(medicine_name_type_list)
            $('.modal-loading').hide();

        },
      
    });
}
function createMedRegisteredTable(medicine_name_type_list){ 
    $("#med_registered_vw_table").empty();
    $('#med_registered_vw_table').append('<caption style="caption-side: top;text-align: center;" class="datatable_heading_label1">Regestered Medicines</caption>');
        med_registered_vw_datatable=$("#med_registered_vw_table").DataTable({

            data: medicine_name_type_list,
            columns: [
                { title: "Medicine" },
                { title: "Type" },
                ],
                paging: true,
                scrollY: true,
                scrollX: true,
                ordering: true,
                info:false,
                searching:true,
                // columnDefs: [
                //     { width: '100%', targets: '_all' }
                // ],
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'print',
                        text: ' PRINT',
                        title: 'Medicine Registered List',
                        className: 'datatable_button printbtn fas fa-print',

                    },
                     {
                        extend: 'excel',
                        text: ' EXCEL',
                        title: 'Medicine Registered List',
                        className: 'datatable_button excelbtn fas fa-file-excel',

                    },
                     {
                        extend: 'csv',
                        text: ' CSV',
                        title: 'Medicine Registered List',
                        className: 'datatable_button csvbtn fas fa-file',

                    },
                    {
                        extend: 'pdf',
                        text: ' PDF',
                        title:'Medicine Registered List',
                        className: 'datatable_button pdfbtn  fas fa-file-pdf',

                    },
                    {
                        extend: 'copy',
                        text: ' Copy to Clipboard',
                        title: 'Medicine Registered List',
                        className: 'datatable_button copybtn fas fa-copy',

                    },
                ],
                // fixedColumns: false,

            });
            $('.dataTables_filter  input[type="search"]').
            attr('placeholder','search medicine ....').
            css({'width':'200px','display':'inline-block'});
            $('.dataTables_filter input').addClass('form-control-custom');

            $('#med_registered_vw_table tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    // alert("clicked same entry")
                    $(this).removeClass('selected');
                }
                else {
                    var medicine_name=$(this).find('td').eq(0).text()
                    med_registered_vw_datatable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                   
                }
            });
}
function viewMedicineRegistered(){
    
    $('#main_page_content').empty();
    var main_page_content= $('#main_page_content').append('<div class="container-fluid" id="container-med-registered-view"></div>');

    $("#container-med-registered-view").append("<h2 class='center_h_tag_forms'>Medicine Registered List</h2>");
    $("#container-med-registered-view").append("<hr>");
    var main_row_div= $("<div class='row is-flex backgroundcss_medToInv'></div>");
    $("#container-med-registered-view").append(main_row_div);
    var main_col_div=$("<div class='col-md-12' ></div>");
        var med_registered_vw_div=$("<div>")
            var med_registered_vw_table=$('<table id="med_registered_vw_table" width="100%" class="datatablecss_med" ></table>')
        med_registered_vw_div.append(med_registered_vw_table);
    main_col_div.append(med_registered_vw_div)

    

    $(main_row_div).append(main_col_div);
    retrieveMedicineRegistered();
    

}
function retrieveMedicineFromStock(){
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
        },
        url: '/retrieve_all_med_stock_info',
        success: function(data){
            allMedStockInfoList=data["allMedStockInfoList"]
            createMedStckDatatableView(allMedStockInfoList);
            $('.modal-loading').hide();

        },
    });
}
function createMedStckDatatableView(allMedStockInfoList){
    $(function(){
       

    $('#med_stock_vw_table').empty();
   
    $('#med_stock_vw_table').append('<caption style="caption-side: top;text-align: center;"class="datatable_heading_label1">Medicines in Stock</caption>');
            med_stock_vw_datatable=$("#med_stock_vw_table").DataTable({
            data: allMedStockInfoList,
            columns: [
                { title: "Medicine" },
                { title: "BatchNo" },
                { title: "Boxes" },
                { title: "Strips" },
                { title: "Pieces" },
                {title:"Price Per Piece"},

            
                ],
                paging: false,
                scrollY: "300px",
                scrollX: true,
                ordering: true,
                info:false,
                searching:false,
                
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'print',
                        text: 'PRINT',
                        title: 'Medicine Stock List',
                        className: 'datatable_button printbtn fa fa-print',

                    },
                     {
                        extend: 'excel',
                        text: ' EXCEL',
                        title: 'Medicine Stock List',
                        className: 'datatable_button  excelbtn fas fa-file-excel',

                    },
                     {
                        extend: 'csv',
                        text: ' CSV',
                        title: 'Medicine Stock List',
                        className: 'datatable_button csvbtn fa fa-file',

                    },
                    {
                        extend: 'pdf',
                        text: ' PDF',
                        title: 'Medicine Stock List',
                        className: 'datatable_button pdfbtn fas fa-file-pdf',

                    },
                    {
                        extend: 'copy',
                        text: ' Copy to Clipboard',
                        title: 'Medicine Stock List',
                        className: 'datatable_button copybtn fas fa-copy',

                    },
                ],
                // columnDefs: [
                //     { width: "100%", targets: "_all" }
                // ],
            });
            $('.dataTables_filter  input[type="search"]').
            attr('placeholder','search medicine ....').
            css({'width':'200px','display':'inline-block'});
            $('.dataTables_filter input').addClass('form-control-custom');

            $('#med_stock_vw_table tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    // alert("clicked same entry")
                    $(this).removeClass('selected');
                }
                else {
                    var medicine_name=$(this).find('td').eq(0).text()
                    med_stock_vw_datatable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });
    });
}
function viewMedicineInStock(){
    
    $('#main_page_content').empty();
    var main_page_content= $('#main_page_content').append('<div class="container-fluid" id="container-med-view-stock"></div>');

    $("#container-med-view-stock").append("<h2 class='center_h_tag_forms'>Medicine in Stock List</h2>");
    $("#container-med-view-stock").append("<hr>");
    var main_row_div= $("<div class='row is-flex backgroundcss_medToInv'></div>");
    $("#container-med-view-stock").append(main_row_div);
    var main_col_div=$("<div class='col-md-12' ></div>");
    var med_stock_vw_div=$("<div>")
            var med_stock_vw_table=$('<table id="med_stock_vw_table" class="datatablecss_med"  width="100%"></table>')
        med_stock_vw_div.append(med_stock_vw_table);
    main_col_div.append(med_stock_vw_div)
    $(main_row_div).append(main_col_div);
    retrieveMedicineFromStock();

}
function retrieveMedicineFromDesp(){
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
        },
        url: '/retrieve_all_med_desp_info',
        success: function(data){
            allMedDespInfoList=data["allMedDespInfoList"]
            createMedDespDatatableView(allMedDespInfoList);
            $('.modal-loading').hide();

        },
    });
}
function createMedDespDatatableView(allMedDespInfoList){
    $(function(){
       

        $('#med_desp_vw_table').empty();
       console.log("allMedDespInfoList",allMedDespInfoList)
        $('#med_desp_vw_table').append('<caption style="caption-side: top;text-align: center;" class="datatable_heading_label1">Medicines in Despensory</caption>');
                med_desp_vw_datatable=$("#med_desp_vw_table").DataTable({
                data: allMedDespInfoList,
                columns: [
                    { title: "Medicine" },
                    { title: "BatchNo" },
                    { title: "Boxes" },
                    { title: "Strips" },
                    { title: "Pieces" },
    
                
                    ],
                    paging: false,
                    scrollY: "300px",
                    scrollX: true,
                    ordering: true,
                    info:false,
                    searching:true,
                    
                    dom: 'Bfrtip',
                    buttons: [
                        // "copy","csv","excel","pdf","print",
                        {
                            extend: 'print',
                            text: ' PRINT',
                            title: 'Medicine Despenosry List',
                            className: 'datatable_button printbtn fa fa-print',

                        },
                         {
                            extend: 'excel',
                            text: ' EXCEL',
                            title: 'Medicine Despenosry List',
                            className: 'datatable_button excelbtn fas fa-file-excel',

                        },
                         {
                            extend: 'csv',
                            text: ' CSV',
                            title: 'Medicine Despenosry List',
                            className: 'datatable_button csvbtn  fa fa-file',

                        },
                        {
                            extend: 'pdf',
                            text: ' PDF',
                            title: 'Medicine Despenosry List',
                            className: 'datatable_button  pdfbtn fas fa-file-pdf',

                        },
                        {
                            extend: 'copy',
                            text: ' Copy to Clipboard',
                            title: 'Medicine Despenosry List',
                            className: 'datatable_button copybtn fas fa-copy',

                        },
                     
                    ],
                    // columnDefs: [
                    //     { width: "100%", targets: "_all" }
                    // ],
                });
                $('.dataTables_filter  input[type="search"]').
                attr('placeholder','Search Medicine ....').
                css({'width':'200px','display':'inline-block'});
                $('.dataTables_filter input').addClass('form-control-custom');

                $('#med_desp_vw_table tbody').on( 'click', 'tr', function () {
                    if ( $(this).hasClass('selected') ) {
                        // alert("clicked same entry")
                        $(this).removeClass('selected');
                    }
                    else {
                        var medicine_name=$(this).find('td').eq(0).text()
                        med_desp_vw_datatable.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });
        });
}
function viewMedicineInDespensory(){
    
    $('#main_page_content').empty();
    var main_page_content= $('#main_page_content').append('<div class="container-fluid" id="container-med-view-desp"></div>');

    $("#container-med-view-desp").append("<h2 class='center_h_tag_forms'>Medicine In Despensory</h2>");
    $("#container-med-view-desp").append("<hr>");
    var main_row_div= $("<div class='row is-flex backgroundcss_medToInv'></div>");
    $("#container-med-view-desp").append(main_row_div);
    var main_col_div=$("<div class='col-md-12' '></div>");
    var med_desp_vw_div=$("<div id='med_desp_vw_div'>")
            var med_desp_vw_table=$('<table id="med_desp_vw_table" width="100%" class="datatablecss_med" ></table>')
    med_desp_vw_div.append(med_desp_vw_table);
 
    main_col_div.append(med_desp_vw_div)   

    $(main_row_div).append(main_col_div);

    retrieveMedicineFromDesp();
}

function editMedicinePriceInStock(){
    $('#main_page_content').empty();
    var main_page_content= $('#main_page_content').append('<div class="container-fluid" id="container-med-view-stock"></div>');

    $("#container-med-view-stock").append("<h2 class='center_h_tag_forms'>Medicine in Stock List</h2>");
    $("#container-med-view-stock").append("<hr>");
    var main_row_div= $("<div class='row is-flex backgroundcss_medToInv'></div>");
    $("#container-med-view-stock").append(main_row_div);
    var main_col_div=$("<div class='col-md-12''></div>");
    var med_stock_edit_div=$("<div>")
            var med_stock_edit_table=$('<table id="med_stock_edit_table" width="100%" class="datatablecss_med" ></table>')
        med_stock_edit_div.append(med_stock_edit_table);
    var med_dialog_editdiv=$("<div id='med_dialog_editdiv'></div>");
        var med_label_tag=$("<label id='med_label_tag'></label>")
        var sellprice_tag=$("<label >Edit Selling Price Of Piece</label>")
        var sellprice_input=$("<input id='sellprice_input' ></input>")
    med_dialog_editdiv.append(med_label_tag)
    med_dialog_editdiv.append(sellprice_tag)
    med_dialog_editdiv.append(sellprice_input)
    var submitupdateddatadiv=$("<div id='updateMedStckPriceDataDiv'></div>");
        button=$("<button class='btn btn-success' id='updateMedStckPriceDataBtn' onclick='updateMedStckPriceData()'>Update Changes</button>")
    submitupdateddatadiv.append(button)
    main_col_div.append(med_dialog_editdiv) 
    main_col_div.append(med_stock_edit_div)
    main_col_div.append(submitupdateddatadiv)

    $(main_row_div).append(main_col_div);
    $("#med_dialog_editdiv").hide();

    retrieveMedicineFromStockForEdit();
}
var medStckDict;
function retrieveMedicineFromStockForEdit(){
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
        },
        url: '/retrieve_all_med_stock_info_for_edit',
        success: function(data){
            allMedStockInfoList=data["allMedStockInfoList"]
            medStckDict=JSON.parse(data["medStckDict"])
            console.log("medStckDict",medStckDict)
            createMedStckDatatableEdit(allMedStockInfoList);
            $('.modal-loading').hide();

        },
    });
}
function createMedStckDatatableEdit(allMedStockInfoList)
{   
    $(function(){
       

        $('#med_stock_vw_table').empty();
       
        $('#med_stock_vw_table').append('<caption style="caption-side: top;text-align: center;" class="datatable_heading_label1">Medicines in Stock</caption>');
                med_stock_edit_datatable=$("#med_stock_edit_table").DataTable({
                data: allMedStockInfoList,
                columns: [
                    { title: "Id" },
                    { title: "Medicine" },
                    { title: "BatchNo" },
                    { title: "Boxes" },
                    { title: "Strips" },
                    { title: "Pieces" },
                    {title:"Price Per Piece"},    
                    ],
                    paging: false,
                    scrollY: "300px",
                    scrollX: true,
                    ordering: true,
                    info:false,
                    searching:false,
                    
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            extend: 'print',
                            text: ' PRINT',
                            title: 'Medicine Stock List',
                            className: 'datatable_button printbtn fas fa-print',
    
                        },
                         {
                            extend: 'excel',
                            text: ' EXCEL',
                            title: 'Medicine Stock List',
                            className: 'datatable_button  excelbtn fas fa-file-excel',
    
                        },
                         {
                            extend: 'csv',
                            text: '  CSV',
                            title: 'Medicine Stock List',
                            className: 'datatable_button csvbtn fas fa-file',
    
                        },
                        {
                            extend: 'pdf',
                            text: '  PDF',
                            title: 'Medicine Stock List',
                            className: 'datatable_button pdfbtn fas fa-file-pdf',
    
                        },
                        {
                            extend: 'copy',
                            text: ' Copy to Clipboard',
                            title: 'Medicine Stock List',
                            className: 'datatable_button  copybtn fas fa-copy',
    
                        },
                    ],
                    // columnDefs: [
                    //     { width: "100%", targets: "_all" }
                    // ],
                });
                $('#med_stock_edit_table tbody').on( 'click', 'tr', function () {
                    med_stock_edit_selectedrow=this
                    if ( $(this).hasClass('selected') ) {
                        // alert("clicked same entry")
                        $(this).removeClass('selected');
                    }
                    else {
                            var medicine_name=$(this).find('td').eq(1).text();
                            var sellprice=$(this).find('td').eq(7).text()
                            var id=$(this).find('td').eq(0).text()
                            med_stock_edit_datatable.$('tr.selected').removeClass('selected');
                            $(this).addClass('selected');
                            
                                $("#med_dialog_editdiv").show();
                                $("#med_label_tag").empty();
                                $("#med_label_tag").text(medicine_name);

                                $("#sellprice_input").val(sellprice);
                                $( "#med_dialog_editdiv" ).dialog({
                                resizable: false,
                                height: "auto",
                                width: 400,
                                modal: true,
                                buttons: {
                                    "Save": function() {
                                        sellprice=$("#sellprice_input").val()
                                        
                                        $(med_stock_edit_selectedrow).find('td').eq(6).text(sellprice)
                                        
                                        medStckDict[id]["piece_price_unit"]=parseFloat(sellprice)
                                        $( this ).dialog( "close" );
                                    },
                                    "Cancel": function() {
                                    $( this ).dialog( "close" );
                                    }
                                }
                                });
                            
                        }
                });
        });
}

function updateMedStckPriceData(){
    $('.modal-loading').show();

    $.ajax({
        type: 'POST',
        dataType: "json",
        'data': {
            "medStckDict":JSON.stringify(medStckDict),
        },
        url: '/update_all_med_stock_info_from_edit',
        success: function(data){
           alert("Changes Updated")
           $('.modal-loading').hide();

        },
    });
}
function viewMedicineInTemporaryDespensoryStock(){
    $('#main_page_content').empty();
    var main_page_content= $('#main_page_content').append('<div class="container-fluid" id="container-med-tempview-desp"></div>');

    $("#container-med-tempview-desp").append("<h2 class='center_h_tag_forms'>Medicine In Despensory</h2>");
    $("#container-med-tempview-desp").append("<hr>");
    var main_row_div= $("<div class='row is-flex backgroundcss_medToInv'></div>");
    $("#container-med-tempview-desp").append(main_row_div);
    var main_col_div=$("<div class='col-md-12' '></div>");
    var med_tempdesp_vw_div=$("<div id='med_desp_vw_div'>")
            var med_tempdesp_vw_table=$('<table id="med_tempdesp_vw_table" width="100%" class="datatablecss_med" ></table>')
    med_tempdesp_vw_div.append(med_tempdesp_vw_table);
 
    main_col_div.append(med_tempdesp_vw_div)   

    $(main_row_div).append(main_col_div);

    retrieveMedicineFromDespTempStock();
}
function retrieveMedicineFromDespTempStock(){
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
        },
        url: '/retrieve_all_med_temp_desp_stock',
        success: function(data){
            allMedTempDespInfoList=data["allMedTempDespInfoList"]
            createTempMedDespDatatableView(allMedTempDespInfoList);
            $('.modal-loading').hide();

        },
    });
}
var med_tempdesp_vw_datatable;
function createTempMedDespDatatableView(allMedTempDespInfoList){
    $(function(){
       

        $('#med_tempdesp_vw_table').empty();
        $('#med_tempdesp_vw_table').append('<caption style="caption-side: top;text-align: center;" class="datatable_heading_label1">Despensory Temporary Medicine Stock </caption>');
                med_tempdesp_vw_datatable=$("#med_tempdesp_vw_table").DataTable({
                data:allMedTempDespInfoList ,
                columns: [
                    { title: "Medicine" },
                    { title: "BatchNo" },
                    { title: "Boxes" },
                    { title: "Strips" },
                    { title: "Pieces" },
    
                
                    ],
                    paging: false,
                    scrollY: "300px",
                    scrollX: true,
                    ordering: true,
                    info:false,
                    searching:true,
                    
                    dom: 'Bfrtip',
                    buttons: [
                        // "copy","csv","excel","pdf","print",
                        {
                            extend: 'print',
                            text: ' PRINT',
                            title: ' Despenosry Temporary Stock Medicine List',
                            className: 'datatable_button printbtn fa fa-print',

                        },
                         {
                            extend: 'excel',
                            text: ' EXCEL',
                            title: 'Despenosry Temporary Stock Medicine List',
                            className: 'datatable_button excelbtn fas fa-file-excel',

                        },
                         {
                            extend: 'csv',
                            text: ' CSV',
                            title: 'Medicine Despenosry List',
                            className: 'datatable_button csvbtn  fa fa-file',

                        },
                        {
                            extend: 'pdf',
                            text: ' PDF',
                            title: 'Despenosry Temporary Stock Medicine List',
                            className: 'datatable_button  pdfbtn fas fa-file-pdf',

                        },
                     
                     
                    ],
                    // columnDefs: [
                    //     { width: "100%", targets: "_all" }
                    // ],
                });
                $('.dataTables_filter  input[type="search"]').
                attr('placeholder','Search Medicine ....').
                css({'width':'200px','display':'inline-block'});
                $('.dataTables_filter input').addClass('form-control-custom');

                $('#med_tempdesp_vw_table tbody').on( 'click', 'tr', function () {
                    if ( $(this).hasClass('selected') ) {
                        // alert("clicked same entry")
                        $(this).removeClass('selected');
                    }
                    else {
                        var medicine_name=$(this).find('td').eq(0).text()
                        med_tempdesp_vw_datatable.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });
        });
}
function viewMedicineInTemporaryMainStock(){
    $('#main_page_content').empty();
    var main_page_content= $('#main_page_content').append('<div class="container-fluid" id="container-med-tempview-mainstock"></div>');

    $("#container-med-tempview-mainstock").append("<h2 class='center_h_tag_forms'>Medicine In Despensory</h2>");
    $("#container-med-tempview-mainstock").append("<hr>");
    var main_row_div= $("<div class='row is-flex backgroundcss_medToInv'></div>");
    $("#container-med-tempview-mainstock").append(main_row_div);
    var main_col_div=$("<div class='col-md-12' '></div>");
    var med_tempmainstock_vw_div=$("<div id='med_desp_vw_div'>")
            var med_tempmainstock_vw_table=$('<table id="med_tempmainstock_vw_table" width="100%" class="datatablecss_med" ></table>')
    med_tempmainstock_vw_div.append(med_tempmainstock_vw_table);
 
    main_col_div.append(med_tempmainstock_vw_div)   

    $(main_row_div).append(main_col_div);

    retrieveMedicineFromTempMainStock();
}

function retrieveMedicineFromTempMainStock(){
    $('.modal-loading').show();

    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
        },
        url: '/retrieve_all_med_temp_main_stock',
        success: function(data){
            allMedTempStockInfoList=data["allMedTempStockInfoList"]
            createTempMedMainStockDatatableView(allMedTempStockInfoList);
            $('.modal-loading').hide();

        },
    });
}
var med_tempmainstock_vw_datatable;
function createTempMedMainStockDatatableView(allMedTempStockInfoList){
    $(function(){
       

        $('#med_tempmainstock_vw_table').empty();
        $('#med_tempmainstock_vw_table').append('<caption style="caption-side: top;text-align: center;" class="datatable_heading_label1">Temporary Medicine In Main Stock </caption>');
        med_tempmainstock_vw_datatable=$("#med_tempmainstock_vw_table").DataTable({
                data:allMedTempStockInfoList ,
                columns: [
                    { title: "Medicine" },
                    { title: "BatchNo" },
                    { title: "Boxes" },
                    { title: "Strips" },
                    { title: "Pieces" },
    
                
                    ],
                    paging: false,
                    scrollY: "300px",
                    scrollX: true,
                    ordering: true,
                    info:false,
                    searching:true,
                    
                    dom: 'Bfrtip',
                    buttons: [
                        // "copy","csv","excel","pdf","print",
                        {
                            extend: 'print',
                            text: ' PRINT',
                            title: '  Temporary Main Stock Medicine List',
                            className: 'datatable_button printbtn fa fa-print',

                        },
                         {
                            extend: 'excel',
                            text: ' EXCEL',
                            title: 'Temporary Main Stock Medicine List',
                            className: 'datatable_button excelbtn fas fa-file-excel',

                        },
                         {
                            extend: 'csv',
                            text: ' CSV',
                            title: 'Temporary Main Stock Medicine List',
                            className: 'datatable_button csvbtn  fa fa-file',

                        },
                        {
                            extend: 'pdf',
                            text: ' PDF',
                            title: 'Temporary Main Stock Medicine List',
                            className: 'datatable_button  pdfbtn fas fa-file-pdf',

                        },
                     
                     
                    ],
                    // columnDefs: [
                    //     { width: "100%", targets: "_all" }
                    // ],
                });
                $('.dataTables_filter  input[type="search"]').
                attr('placeholder','Search Medicine ....').
                css({'width':'200px','display':'inline-block'});
                $('.dataTables_filter input').addClass('form-control-custom');

                $('#med_tempmainstock_vw_table tbody').on( 'click', 'tr', function () {
                    if ( $(this).hasClass('selected') ) {
                        // alert("clicked same entry")
                        $(this).removeClass('selected');
                    }
                    else {
                        var medicine_name=$(this).find('td').eq(0).text()
                        med_tempmainstock_vw_datatable.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });
        });
}
// function getCookie(name) {
//     var cookieValue = null;
//     if (document.cookie && document.cookie !== "") {
//         var cookies = document.cookie.split(';');
//         for (var i = 0; i < cookies.length; i++) {
//             var cookie = jQuery.trim(cookies[i]);
//             // Check if this cookie string begin with the name we want
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//              }
//          }
//     }
//     return cookieValue;
// }


// function csrfSafeMethod(method) {
//     // these HTTP methods do not require CSRF protection
//     return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
// }
// $.ajaxSetup({
//     beforeSend: function(xhr, settings) {
//         if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
//             xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
//         }
//     }
// });