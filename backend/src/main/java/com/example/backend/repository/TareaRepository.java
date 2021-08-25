package com.example.backend.repository;

import com.example.backend.model.Tarea;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TareaRepository extends MongoRepository<Tarea, String> {

}
