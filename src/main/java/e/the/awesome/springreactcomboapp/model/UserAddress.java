package e.the.awesome.springreactcomboapp.model;

import javax.persistence.*;

@Entity
@Table(name = "user_address")
public class UserAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column
    private String city;
    @Column
    private String street;
    @Column
    private String psc;
    @Column
    private String country;
    @OneToOne(mappedBy = "address")
    private User user;

    public UserAddress(){}

    public UserAddress(String city, String street, String psc, String country){
        this.city = city;
        this.street = street;
        this.psc = psc;
        this.country = country;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getPsc() {
        return psc;
    }

    public void setPsc(String psc) {
        this.psc = psc;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}
