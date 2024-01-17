package org.wecancodeit.backend.models;

public class UserSearchCriteria {
    private Long id;
    private String email;
    private String username;
    private String instrument;
    public UserSearchCriteria(Long id, String email, String username, String instrument) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.instrument = instrument;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getInstrument() {
        return instrument;
    }
    public void setInstrument(String instrument) {
        this.instrument = instrument;
    }

    
}