create table PRODUCT
(
    ID          INTEGER auto_increment primary key,
    CATEGORY    VARCHAR(255),
    DESCRIPTION VARCHAR(255),
    NAME        VARCHAR(255),
    PHOTO       VARCHAR(255),
    PRICE       DECIMAL(19, 2)
);
create table USER_ADDRESS
(
    ID      INTEGER auto_increment primary key,
    CITY    VARCHAR(255),
    COUNTRY VARCHAR(255),
    PSC     VARCHAR(255),
    STREET  VARCHAR(255)
);
create table USER
(
    ID              INTEGER auto_increment primary key,
    FIRST_NAME      VARCHAR(255),
    LAST_NAME       VARCHAR(255),
    PASSWORD        VARCHAR(255),
    USERNAME        VARCHAR(255),
    USER_ADDRESS_ID INTEGER,
    constraint FK20X625UX9M5AKVXBH58DE7VQE
        foreign key (USER_ADDRESS_ID) references USER_ADDRESS (ID)
);
create table ORDER_TABLE
(
    ID              INTEGER auto_increment primary key,
    DELIVERY_METHOD VARCHAR(255),
    PAYMENT         VARCHAR(255),
    STATE           VARCHAR(255),
    USER_ID         INTEGER,
    constraint FKNMDJO6OAF01OW2REUBTRHL6EV
        foreign key (USER_ID) references USER (ID)
);
create table ORDER_ITEM
(
    ID         INTEGER auto_increment primary key,
    COUNT      INTEGER,
    PRICE      DECIMAL(19, 2),
    ORDER_ID   INTEGER,
    PRODUCT_ID INTEGER,
    constraint FK551LOSX9J75SS5D6BFSQVIJNA
        foreign key (PRODUCT_ID) references PRODUCT (ID),
    constraint FK8KQ6NPEUCY89UVW8LLGPIATJ6
        foreign key (ORDER_ID) references ORDER_TABLE (ID)
);