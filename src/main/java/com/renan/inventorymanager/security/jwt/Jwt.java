package com.renan.inventorymanager.security.jwt;

public class Jwt {

    private String Token;

    public Jwt(String token) {
        Token = token;
    }

    public String getToken() {
        return Token;
    }

    public void setToken(String token) {
        Token = token;
    }
}
