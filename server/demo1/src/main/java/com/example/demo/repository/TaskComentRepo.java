package com.example.demo.repository;

import com.example.demo.models.TaskComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskComentRepo extends JpaRepository<TaskComment, Long> {
}
