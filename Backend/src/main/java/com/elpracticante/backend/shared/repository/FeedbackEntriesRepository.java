package com.elpracticante.backend.shared.repository;

import com.elpracticante.backend.shared.entity.FeedbackEntriesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackEntriesRepository extends JpaRepository<FeedbackEntriesEntity,Integer > {
}
