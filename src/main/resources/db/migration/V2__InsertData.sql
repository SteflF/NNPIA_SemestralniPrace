insert into PRODUCT (ID, CATEGORY, DESCRIPTION, NAME, PHOTO, PRICE)
values
('1', 'GPU', 'Graficka karta NVIDIA', 'RTX 2070 SUPER', 'fotka', '12999.99'),
('2', 'GPU', 'Graficka karta AMD', 'RX 5700 XT', 'fotkaRX', '11999'),
('3', 'CPU', 'Procesor AMD', 'Ryzen 7 3700X', 'fotoRyzen', '8699'),
('4', 'CPU', 'Procesor Intel', 'Intel i7-9700K', 'fotoIntel', '10699'),
('5', 'Motherboard', 'Zakladni deska AMD', 'GIGABYTE X570 AORUS MASTER', 'fotoZakladovka', '10990'),
('6', 'Motherboard', 'Zakladni deska Intel', 'GIGABYTE Z390 AORUS ELITE', 'fotoZakladovka', '5642');

insert into USER_ADDRESS (ID, CITY, COUNTRY, PSC, STREET)
values
('1', 'Pelhrimov', 'Czechia', '393 11', 'Prikopy'),
('2', 'Kamenice nad Lipou', 'Czechia', '940 70', 'U Lipy');

insert into USER (ID, FIRST_NAME, LAST_NAME, PASSWORD, USERNAME, USER_ADDRESS_ID)
values ('1', 'Devglan', 'Devglan', '$2a$10$eRwi8CAs6sFDuxa8MZCxp.XffiKde83N94d..clI35I0IfbEUWxWy', 'devglan', '1');

insert into ORDER_TABLE (ID, DELIVERY_METHOD, PAYMENT, STATE, USER_ID)
values ('1', 'Dobirka', 'Kartou', 'Prijato', '1');

insert into ORDER_ITEM (COUNT, PRICE, ORDER_ID, PRODUCT_ID)
values
('1', '12999.99', '1', '1'),
('1', '10699', '1', '4'),
('1', '5642', '1', '6');