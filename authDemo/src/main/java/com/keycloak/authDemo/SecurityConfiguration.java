package com.keycloak.authDemo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http.cors().configurationSource(request -> {
            CorsConfiguration cors = new CorsConfiguration();
            cors.setAllowedOrigins(Collections.singletonList("*"));
            cors.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
            cors.setAllowedHeaders(Collections.singletonList("*"));
            return cors;
        });
//        http
//                .oauth2Client()
//                .and()
//                .oauth2Login()
//                .tokenEndpoint()
//                .and()
//                .userInfoEndpoint();
//
//        http
//                .sessionManagement()
//                .sessionCreationPolicy(SessionCreationPolicy.ALWAYS);
//
//        http
//                .authorizeHttpRequests()
//                .requestMatchers("/unauthenticated", "/oauth2/**", "/login/**").permitAll()
//                .anyRequest()
//                .fullyAuthenticated()
//                .and()
//                .logout()
//                .logoutSuccessUrl("http://localhost:8080/realms/demo/protocol/openid-connect/logout?redirect_uri=http://localhost:5000/");

        return http.build();
    }
}
