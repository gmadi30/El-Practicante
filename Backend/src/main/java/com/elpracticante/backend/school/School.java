package com.elpracticante.backend.school;

public record School (Integer id, String name) {

    public School(String name) {
        this(null, name);
    }
}
