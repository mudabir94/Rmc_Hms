select med.medicine_name, pbr.pieces_stored, ds.piece_price_unit
from newdb.rmcapp_patient as pat,
newdb.rmcapp_medicine as med 
inner join newdb.rmcapp_despensorystock as ds
on med.id = ds.medicine_id 
inner join newdb.rmcapp_patientbillrecords as pbr 
on ds.id = pbr.desp_id where pat.id=1;

select med.medicine_name, pbr.pieces_stored, ds.piece_price_unit
from newdb.rmcapp_medicine as med, 
newdb.rmcapp_despensorystock as ds, 
newdb.rmcapp_patient as pat,
newdb.rmcapp_patientbillrecords as pbr
where med.id = ds.medicine_id and 
ds.id = pbr.desp_id and pat.id=1;


select * from newdb.rmcapp_patientbillrecords;