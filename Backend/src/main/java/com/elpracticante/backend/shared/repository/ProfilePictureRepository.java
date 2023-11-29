package com.elpracticante.backend.shared.repository;

import com.elpracticante.backend.shared.entity.ProfilePictureEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfilePictureRepository extends JpaRepository<ProfilePictureEntity, Integer> {

    Optional<ProfilePictureEntity> findByName(String name);
}
