INSERT INTO newdb.rmcapp_employee (name, dob,gender,phone_no,address,qualification,employee_type_id,user_id) 
values("Ruby","1993-05-01","Female","2222222","Lahore,Pakistan","Diploma",2,1);
values("Dr.Sara","1992-05-01","Female","000000","Lahore,Pakistan","Diploma",1,1);
values("Ali","1990-05-01","Male","2222222","Lahore,Pakistan","Diploma",3,1);
select * from newdb.rmcapp_employee;
delete from newdb.rmcapp_employee where id=2;
UPDATE newdb.rmcapp_employee
set name="Alex", dob="1992-04-02", phone_no=333333
where id=5;
UPDATE newdb.rmcapp_employee
set qualification="Mbbs,ENT"
where id=3;
