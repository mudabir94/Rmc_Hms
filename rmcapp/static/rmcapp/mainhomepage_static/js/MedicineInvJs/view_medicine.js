
var med_registered_vw_datatable; 
var med_stock_vw_datatable;
var med_desp_vw_datatable;
function retrieveMedicineRegistered(){
    console.log("medicine_name_list",medicine_name_list);
   
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
        },
      
    });
}
function createMedRegisteredTable(medicine_name_type_list){
    $("#med_registered_vw_table").empty();
    $('#med_registered_vw_table').append('<caption style="color: black;font-weight: bold; ;caption-side: top;text-align: center;">Regestered Medicines</caption>');
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
                columnDefs: [
                    { width: '100%', targets: '_all' }
                ],
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'print',
                        text: 'Print',
                        title: 'Medicine Registered List',
                        className: 'btn btn-default fa fa-print',

                    },
                     {
                        extend: 'excel',
                        text: 'Export Data in Excel',
                        title: 'Medicine Registered List',
                        className: 'btn btn-default  fas fa-file-excel',

                    },
                     {
                        extend: 'csv',
                        text: 'Export Data in CSV',
                        title: 'Medicine Registered List',
                        className: 'btn btn-default fa fa-file',

                    },
                    {
                        extend: 'pdf',
                        text: 'Export Data in PDF',
                        title:'Medicine Registered List',
                        className: 'btn btn-default fas fa-file-pdf',

                    },
                    {
                        extend: 'copy',
                        text: 'Copy to Clipboard',
                        title: 'Medicine Registered List',
                        className: 'btn btn-default fas fa-copy',

                    },
                ],
                fixedColumns: false,

            });
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
    var main_col_div=$("<div class='col-md-12' style='background: lightyellow;'></div>");
        var med_registered_vw_div=$("<div>")
            var med_registered_vw_table=$('<table id="med_registered_vw_table" class="datatablecss_med" ></table>')
        med_registered_vw_div.append(med_registered_vw_table);
    main_col_div.append(med_registered_vw_div)

    

    $(main_row_div).append(main_col_div);
    retrieveMedicineRegistered();
    

}
function retrieveMedicineFromStock(){
    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
        },
        url: '/retrieve_all_med_stock_info',
        success: function(data){
            allMedStockInfoList=data["allMedStockInfoList"]
            createMedStckDatatableView(allMedStockInfoList);
        },
    });
}
function createMedStckDatatableView(allMedStockInfoList){
    $(function(){
       

    $('#med_stock_vw_table').empty();
   
    $('#med_stock_vw_table').append('<caption style="color: black;font-weight: bold; ;caption-side: top;text-align: center;">Medicines in Stock</caption>');
            med_stock_vw_datatable=$("#med_stock_vw_table").DataTable({
            data: allMedStockInfoList,
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
                searching:false,
                
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'print',
                        text: 'Print',
                        title: 'Medicine Stock List',
                        className: 'btn btn-default fa fa-print',

                    },
                     {
                        extend: 'excel',
                        text: 'Export Data in Excel',
                        title: 'Medicine Stock List',
                        className: 'btn btn-default  fas fa-file-excel',

                    },
                     {
                        extend: 'csv',
                        text: 'Export Data in CSV',
                        title: 'Medicine Stock List',
                        className: 'btn btn-default fa fa-file',

                    },
                    {
                        extend: 'pdf',
                        text: 'Export Data in PDF',
                        title: 'Medicine Stock List',
                        className: 'btn btn-default fas fa-file-pdf',

                    },
                    {
                        extend: 'copy',
                        text: 'Copy to Clipboard',
                        title: 'Medicine Stock List',
                        className: 'btn btn-default fas fa-copy',

                    },
                ],
                columnDefs: [
                    { width: "100%", targets: "_all" }
                ],
            });
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
    var main_col_div=$("<div class='col-md-12' style='background: lightyellow;'></div>");
    var med_stock_vw_div=$("<div>")
            var med_stock_vw_table=$('<table id="med_stock_vw_table" class="datatablecss_med" ></table>')
        med_stock_vw_div.append(med_stock_vw_table);
    main_col_div.append(med_stock_vw_div)
    $(main_row_div).append(main_col_div);
    retrieveMedicineFromStock();

}
function retrieveMedicineFromDesp(){
    $.ajax({
        type: 'GET',
        dataType: "json",
        'data': {
        },
        url: '/retrieve_all_med_desp_info',
        success: function(data){
            allMedDespInfoList=data["allMedDespInfoList"]
            createMedDespDatatableView(allMedDespInfoList);
        },
    });
}
function createMedDespDatatableView(allMedDespInfoList){
    $(function(){
       

        $('#med_desp_vw_table').empty();
       console.log("allMedDespInfoList",allMedDespInfoList)
        $('#med_desp_vw_table').append('<caption style="color: black;font-weight: bold; ;caption-side: top;text-align: center;">Medicines in Despensory</caption>');
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
                            text: 'Print',
                            title: 'Medicine Despenosry List',
                            className: 'btn btn-default fa fa-print',

                        },
                         {
                            extend: 'excel',
                            text: 'Export Data in Excel',
                            title: 'Medicine Despenosry List',
                            className: 'btn btn-default  fas fa-file-excel',

                        },
                         {
                            extend: 'csv',
                            text: 'Export Data in CSV',
                            title: 'Medicine Despenosry List',
                            className: 'btn btn-default fa fa-file',

                        },
                        {
                            extend: 'pdf',
                            text: 'Export Data in PDF',
                            title: 'Medicine Despenosry List',
                            className: 'btn btn-default fas fa-file-pdf',

                        },
                        {
                            extend: 'copy',
                            text: 'Copy to Clipboard',
                            title: 'Medicine Despenosry List',
                            className: 'btn btn-default fas fa-copy',

                        },
                     
                    ],
                    columnDefs: [
                        { width: "100%", targets: "_all" }
                    ],
                });
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
    var main_col_div=$("<div class='col-md-12' style='background: lightyellow;'></div>");
    var med_desp_vw_div=$("<div id='med_desp_vw_div'>")
            var med_desp_vw_table=$('<table id="med_desp_vw_table" class="datatablecss_med" ></table>')
        med_desp_vw_div.append(med_desp_vw_table);
    main_col_div.append(med_desp_vw_div)   
    $(main_row_div).append(main_col_div);
    retrieveMedicineFromDesp();
}