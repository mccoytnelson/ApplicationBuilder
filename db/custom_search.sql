select * from listing where
position ILIKE concat('%',$1,'%') or
salary ILIKE concat('%',$1,'%') or
company_name ILIKE concat('%',$1,'%') or
location ILIKE concat('%',$1,'%');
-- timestamp ILIKE concat('%',$1,'%')

