package org.wecancodeit.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.wecancodeit.backend.models.AudioMetadata;
import org.wecancodeit.backend.services.AudioService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/audio")
public class AudioController {

    private final AudioService audioService;

    public AudioController(AudioService audioService) {
        this.audioService = audioService;
    }

    /**
     * Endpoint for uploading an audio file and its metadata.
     *
     * @param file   the audio file to upload
     * @param title
     * @param artist
     * @param genre
     * @param userId the id of the user owning the audio file
     * @return the saved audio metadata
     */
    @PostMapping("/upload")
    public ResponseEntity<AudioMetadata> uploadAudio(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("artist") String artist,
            @RequestParam("genre") String genre,
            @RequestParam("userId") Long userId) {
        try {
            AudioMetadata metadata = audioService.uploadAudio(file, title, artist, genre, userId);
            return ResponseEntity.ok(metadata);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Endpoint to retrieve all audio metadata.
     *
     * @return a list of all audio metadata
     */
    @GetMapping
    public List<AudioMetadata> getAllAudioMetadata() {
        return audioService.findAll();
    }

    /**
     * Endpoint to delete audio file and data by ID.
     *
     * @param id the ID of the audio to delete
     * @return a response entity
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAudio(@PathVariable Long id) {
        audioService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
