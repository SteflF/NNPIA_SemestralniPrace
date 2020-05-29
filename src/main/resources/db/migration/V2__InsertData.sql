insert into PRODUCT (ID, CATEGORY, DESCRIPTION, NAME, PHOTO, PRICE)
values
('1', 'GPU', 'Graficka karta NVIDIA', 'RTX 2070 SUPER', 'https://iczc.cz/f8lnmsmboihfv932ov25d2d5bf-3_7/obrazek', '12999.99'),
('2', 'GPU', 'Graficka karta AMD', 'RX 5700 XT', 'https://iczc.cz/11bud31iv4hal8k4na0eqv9tl2-3_7/obrazek', '11999'),
('3', 'CPU', 'Procesor AMD', 'Ryzen 7 3700X', 'https://iczc.cz/563gjip43mjhl96l6jkduh2lng-3_7/obrazek', '8699'),
('4', 'CPU', 'Procesor Intel', 'Intel i7-9700K', 'https://iczc.cz/0rompok8rcj229qoerv6gcl5v2-5_7/obrazek', '10699'),
('5', 'Motherboard', 'Zakladni deska AMD', 'GIGABYTE X570 AORUS MASTER', 'https://iczc.cz/e64knbjq2aivt9vk9rdqnnciv6-3_7/obrazek', '10990'),
('6', 'Motherboard', 'Zakladni deska Intel', 'GIGABYTE Z390 AORUS ELITE', 'https://iczc.cz/66diilrl6sh0h8biqq9iejmn37-11_7/obrazek', '5642');

insert into USER_ADDRESS (ID, CITY, COUNTRY, PSC, STREET)
values
('1', 'Pelhrimov', 'Czechia', '393 11', 'Prikopy'),
('2', 'Kamenice nad Lipou', 'Czechia', '940 70', 'U Lipy');

insert into USER (ID, FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER , PASSWORD, USERNAME, USER_ADDRESS_ID)
values ('1', 'Devglan', 'Devglan', 'stefl.frantisek@gmail.com' , '123456789', '$2a$10$eRwi8CAs6sFDuxa8MZCxp.XffiKde83N94d..clI35I0IfbEUWxWy', 'devglan', '1');

insert into ORDER_TABLE (ID, DELIVERY_METHOD, PAYMENT, STATE, USER_ID)
values ('1', 'Dobirka', 'Prevodem', 'Prijato', '1');

insert into ORDER_ITEM (COUNT, PRICE, ORDER_ID, PRODUCT_ID)
values
('1', '12999.99', '1', '1'),
('1', '10699', '1', '4'),
('1', '5642', '1', '6');