package com.renan.inventorymanager.controllers;

import com.renan.inventorymanager.models.auth.Role;
import com.renan.inventorymanager.models.auth.RoleEnum;
import com.renan.inventorymanager.models.auth.User;
import com.renan.inventorymanager.repositories.IRoleRepository;
import com.renan.inventorymanager.repositories.IUserRepository;
import com.renan.inventorymanager.security.jwt.JwtUtils;
import com.renan.inventorymanager.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;
    final IUserRepository userRepository;
    final IRoleRepository roleRepository;
    final PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    public AuthController(IUserRepository userRepository, IRoleRepository roleRepository, PasswordEncoder encoder)
    {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody User loginRequest) {

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

        /*List<Role> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());*/

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(new User(userDetails.getId(),
                        userDetails.getUsername(),
                        userDetails.getEmail(),
                        null));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User signUpRequest) {

        if (userRepository.findByUsername(signUpRequest.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        if (userRepository.findByEmail(signUpRequest.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<Role> roles = signUpRequest.getRoles();

        if (roles == null) {
            Role userRole = roleRepository.findByName(String.valueOf(RoleEnum.ROLE_USER));

            if(userRole == null)
            {
                throw new RuntimeException("Error: Role is not found.");
            }

            roles.add(userRole);
        } else {
            roles.forEach(role -> {
                switch (String.valueOf(role.getName())) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(String.valueOf(RoleEnum.ROLE_ADMIN));

                        if(adminRole == null)
                        {
                            throw new RuntimeException("Error: Role is not found.");
                        }

                        roles.add(adminRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(String.valueOf(RoleEnum.ROLE_USER));

                        if(userRole == null)
                        {
                            throw new RuntimeException("Error: Role is not found.");
                        }

                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser() {
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("You've been signed out!");
    }
}
