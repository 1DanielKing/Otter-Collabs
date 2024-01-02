package org.wecancodeit.backend.models;

import jakarta.persistence.*;
import java.util.Objects;

/**
 * Represents a user in the OtterCollab platform.
 * This class holds user details relevant for music collaboration.
 */
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String username;
    private String password;
    private String email;
    private String instrument;
    private String genre;
    private int experienceLevel;
    private String imageURL;

    /**
     * Default constructor.
     */
    public User() {
    }

    /**
     * Constructs a new User with specified details.
     *
     * @param username
     * @param password
     * @param email
     * @param instrument
     * @param genre
     * @param experienceLevel
     * @param imageURL
     */
    public User(String username, String password, String email, String instrument, String genre, int experienceLevel,
            String imageURL) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.instrument = instrument;
        this.genre = genre;
        this.experienceLevel = experienceLevel;
        this.imageURL = imageURL;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public String getInstrument() {
        return instrument;
    }

    public String getGenre() {
        return genre;
    }

    public int getExperienceLevel() {
        return experienceLevel;
    }

    public String getImageURL() {
        return imageURL;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setInstrument(String instrument) {
        this.instrument = instrument;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public void setExperienceLevel(int experienceLevel) {
        this.experienceLevel = experienceLevel;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        User user = (User) o;
        return experienceLevel == user.experienceLevel &&
                Objects.equals(id, user.id) &&
                Objects.equals(username, user.username) &&
                Objects.equals(email, user.email) &&
                Objects.equals(instrument, user.instrument) &&
                Objects.equals(genre, user.genre) &&
                Objects.equals(imageURL, user.imageURL);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, email, instrument, genre, experienceLevel, imageURL);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", instrument='" + instrument + '\'' +
                ", genre='" + genre + '\'' +
                ", experienceLevel=" + experienceLevel +
                ", imageURL='" + imageURL + '\'' +
                '}';
    }
}
