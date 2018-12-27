CREATE TABLE IF NOT EXISTS arcus (
    family varchar(250) DEFAULT NULL, 
    product varchar(320) DEFAULT NULL,  
    experience int(255) DEFAULT NULL, 
    client varchar(320) DEFAULT NULL,
    contact varchar(320) DEFAULT NULL,
    overview text(65532) DEFAULT NULL,
    provider varchar(100) DEFAULT NULL,
    project varchar(320) DEFAULT NULL, 
    start_date varchar(100) DEFAULT NULL,
    end_date varchar(320) DEFAULT NULL,
    status varchar(100) DEFAULT NULL,
    contact_email varchar(320) DEFAULT NULL
);
