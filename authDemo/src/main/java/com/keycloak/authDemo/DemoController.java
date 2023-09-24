package com.keycloak.authDemo;

import jakarta.annotation.security.RolesAllowed;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.adapters.springsecurity.token.KeycloakAuthenticationToken;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
public class DemoController {

    @GetMapping(path = "/")
    @PreAuthorize("hasRole('user')")
    public HashMap index(Authentication authentication) {
        // get a successful user login
        if(authentication instanceof KeycloakAuthenticationToken){
            KeycloakAuthenticationToken token = (KeycloakAuthenticationToken) authentication;
            KeycloakPrincipal principal = (KeycloakPrincipal) token.getPrincipal();
            String userId = principal.getName();
            System.out.println("User id found ".concat(userId));
        }
//        OAuth2User user = ((OAuth2User) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
//        System.out.println("User "+user.toString());
        return new HashMap(){{
            put("id", "world");
            put("email", "max");
        }};
    }


    @GetMapping(path = "/unauthenticated")
    public HashMap unauthenticatedRequests() {
        return new HashMap(){{
            put("this is ", "unauthenticated endpoint");
        }};
    }

}
