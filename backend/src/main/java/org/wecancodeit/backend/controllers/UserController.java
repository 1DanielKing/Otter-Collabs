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

    /**
     * POST endpoint to create a new user.
     *
     * @param user
     * @return created user
     */
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.saveOrUpdateUser(user);
    }

    /**
     * PUT endpoint to update a user.
     *
     * @param id   should be zero or omitted
     * @param user updated user information
     * @return the updated user
     */
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.findUserById(id)
                .map(existingUser -> {
                    user.setId(id); // Ensure the user's ID remains unchanged
                    return ResponseEntity.ok(userService.saveOrUpdateUser(user));
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
