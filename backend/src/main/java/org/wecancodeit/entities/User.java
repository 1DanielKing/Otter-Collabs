package org.wecancodeit.entities;

import org.springframework.stereotype.Indexed;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = Generation.Type.IDENTITY)
    private Long id;
    private String username;
    private String Email;

    @ElementCollection
    private List<String> musicTags;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public List<String> getMusicTags() {
        return musicTags;
    }

    public void setMusicTags(List<String> musicTags) {
        this.musicTags = musicTags;
    }

}
