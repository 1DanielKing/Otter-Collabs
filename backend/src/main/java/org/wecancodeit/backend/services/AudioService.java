package org.wecancodeit.backend.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.wecancodeit.backend.models.AudioMetadata;
import org.wecancodeit.backend.models.User;
import org.wecancodeit.backend.repositories.AudioMetadataRepository;
import org.wecancodeit.backend.repositories.UserRepository;

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

    @Value("${app.file.storage-location}") // Storage location in app properties
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
    public Optional<AudioMetadata> findById(Long id) {
        return audioMetaDataRepository.findById(id);
    }

    /**
     * Saves or updates audio metadata.
     *
     * @param audioMetaData the audio metadata to save or update
     * @return the saved or updated audio metadata
     */
    public AudioMetadata updateMetadata(AudioMetadata audioMetaData) {
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
    public AudioMetadata uploadAudio(MultipartFile file, String title, String artist, String genre, Long userId)
            throws IOException {
        User owner = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("audio/")) {
            throw new IllegalArgumentException("File must be an audio file");
        }

        String fileName = storeFile(file);
        AudioMetadata metaData = new AudioMetadata(title, artist, genre, null, new Date(), fileName);
        metaData.setUser(owner);
        return audioMetaDataRepository.save(metaData);
    }

    /**
     * Deletes audio metadata and its corresponding file by the metadata's ID.
     *
     * @param id the ID of the audio metadata to delete
     */
    @Transactional
    public void deleteById(Long id) {
        Optional<AudioMetadata> metaData = audioMetaDataRepository.findById(id);
        metaData.ifPresent(m -> {
            deleteFile(m.getFilePath());
            audioMetaDataRepository.deleteById(id);
        });
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
