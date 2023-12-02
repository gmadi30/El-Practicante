package com.elpracticante.backend.degree;

public record Degree(Integer id, String name) {

    public Degree(String name) {
        this(null, name);
    }
}
