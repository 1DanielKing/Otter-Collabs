package org.wecancodeit.backend.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.wecancodeit.backend.models.AudioMetadata;
import org.wecancodeit.backend.models.User;
import org.wecancodeit.backend.repositories.AudioMetadataRepository;
import org.wecancodeit.backend.repositories.UserRepository;

// imports for Checking Duration of uploaded audio files
import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AudioService {

    private final AudioMetadataRepository audioMetaDataRepository;
    private final UserRepository userRepository;

    @Value("${app.file.storage-location}") // Storage location configuration
    private String storageLocation;

    public AudioService(AudioMetadataRepository audioMetaDataRepository, UserRepository userRepository) {
        this.audioMetaDataRepository = audioMetaDataRepository;
        this.userRepository = userRepository;
    }

    /**
     * Retrieves all audio metadata entries.
     *
     * @return a list of all audio metadata entries
     */
    public List<AudioMetadata> findAll() {
        return audioMetaDataRepository.findAll();
    }

    /**
     * Finds audio metadata by its ID.
     *
     * @param id the ID of the audio metadata
     * @return an Optional containing the audio metadata if found
     */
    public Optional<AudioMetadata> findById(@NonNull Long id) {
        return audioMetaDataRepository.findById(id);
    }

    /**
     * Retrieves all audio metadata entries for a given user.
     *
     * @param userId the ID of the user
     * @return a list of audio metadata entries for the user
     */
    public List<AudioMetadata> findAllByUserId(Long userId) {
        return audioMetaDataRepository.findByUserId(userId);
    }

    /**
     * Saves or updates audio metadata.
     *
     * @param audioMetaData the audio metadata to save or update
     * @return the saved or updated audio metadata
     */
    public AudioMetadata updateMetadata(@NonNull AudioMetadata audioMetaData) {
        return audioMetaDataRepository.save(audioMetaData);
    }

    /**
     * Handles the uploading of an audio file and creation of its metadata.
     *
     * @param file   the audio file to upload
     * @param title  the title of the audio piece
     * @param artist the artist of the audio piece
     * @param genre  the genre of the audio piece
     * @return the saved audio metadata
     */
    @Transactional
    public AudioMetadata uploadAudio(MultipartFile file, String title, String artist, String genre, @NonNull Long userId)
            throws IOException {
        User owner = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("audio/")) {
            throw new IllegalArgumentException("File must be an audio file");
        }
        // no videos allowed
        if (isVideoContentType(contentType)) {
            throw new IllegalArgumentException("Video uploads are not allowed");
        }

        String fileName = storeFile(file);

        // Finds the file being uploaded and calculates the audio files duration
        String filePath = Paths.get("/wcci/OtterCollab/media").resolve(fileName).toString();
        Double duration = getAudioFileDuration(filePath);

        AudioMetadata metaData = new AudioMetadata(title, artist, genre, duration, new Date(), fileName);
        metaData.setUser(owner);
        return audioMetaDataRepository.save(metaData);
    }

    // no videos allowed
    private boolean isVideoContentType(String contentType) {
        return contentType.startsWith("video/");
    }

    /**
     * Deletes audio metadata and its corresponding file by the metadata's ID.
     *
     * @param id the ID of the audio metadata to delete
     */
    @Transactional
    public void deleteById(@NonNull Long id) {
        Optional<AudioMetadata> metaData = audioMetaDataRepository.findById(id);
        metaData.ifPresent(m -> {
            deleteFile(m.getFilePath());
            audioMetaDataRepository.deleteById(id);
        });
    }

    /**
     * 
     * @param filePath to the audio file
     * @return the duration of the audio file in seconds
     */
    private Double getAudioFileDuration(String filePath) {
        try {
            File file = new File(filePath);
            AudioInputStream audioInputStream = AudioSystem.getAudioInputStream(file);
            AudioFileFormat fileFormat = AudioSystem.getAudioFileFormat(audioInputStream);
            long microseconds = (long) fileFormat.properties().get("duration");
            return microseconds / 1_000_000.0; // Converts Microseconds to seconds
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private String storeFile(MultipartFile file) throws IOException {
        Path fileStorageLocation = Paths.get(storageLocation);
        Path targetLocation = fileStorageLocation.resolve(file.getOriginalFilename());
        Files.createDirectories(fileStorageLocation);
        Files.copy(file.getInputStream(), targetLocation);

        return targetLocation.toString();
    }

    private void deleteFile(String filePath) {
        try {
            Path file = Paths.get(filePath);
            Files.deleteIfExists(file);
        } catch (IOException e) {
            // Handle the exception, possibly log it
            e.printStackTrace();
        }
    }
}
