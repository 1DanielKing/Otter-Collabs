package org.wecancodeit.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.wecancodeit.backend.models.User;
import org.wecancodeit.backend.services.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * GET endpoint to retrieve all users.
     *
     * @return a list of all users
     */

    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAllUsers();
    }

    /**
     * GET endpoint to retrieve a user by ID.
     *
     * @param id
     * @return the user or a not found response
     */

    @GetMapping("/search")
    public ResponseEntity<?> getUser(@RequestParam(required = false) Long id,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String username) {
        if (id != null) {
            return userService.findUserById(id)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } else if (email != null) {
            return userService.findUserByEmail(email)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());

        } else if (username != null) {
            return userService.findUserByUsername(username)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } else {
            // Handle case where neither id nor email is provided
            return ResponseEntity.badRequest().body("Either id, username, or email must be provided");
        }
    }

    // Fetch sender user data
    @GetMapping("/sender")
    public ResponseEntity<User> getSenderUserData(@RequestParam String senderUsername) {
        // create a method in service to get the sender user data
        User senderUser = userService.getSenderUserData(senderUsername);
        if (senderUser != null) {
            return ResponseEntity.ok(senderUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    /**
     * POST endpoint to create a new user.
     *
     * @param user
     * @return created user
     */
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    // Fetch receiver user data
    @GetMapping("/receiver")
    public ResponseEntity<User> getReceiverUserData(@RequestParam String receiverUsername) {
        User receiverUser = userService.getReceiverUserData(receiverUsername);
        if (receiverUser != null) {
            return ResponseEntity.ok(receiverUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Updates an existing user's information, excluding the password.
     *
     * @param id          the ID of the user to update
     * @param updatedUser the user information to update
     * @return ResponseEntity containing the updated user or a not found status
     */
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userService.findUserById(id)
                .map(existingUser -> {
                    updatedUser.setPassword(existingUser.getPassword());

                    updatedUser.setId(id);

                    return ResponseEntity.ok(userService.updateUser(updatedUser));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * DELETE endpoint to remove a user by ID.
     *
     * @param id
     * @return a response entity
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        return userService.findUserById(id)
                .map(user -> {
                    userService.deleteUser(id);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
