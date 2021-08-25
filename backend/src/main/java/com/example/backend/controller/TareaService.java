package com.example.backend.controller;

import java.util.ArrayList;

import com.example.backend.model.Tarea;
import com.example.backend.repository.TareaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TareaService {
    @Autowired
    TareaRepository tareaRepository;

    public ArrayList<Tarea> obtenerTarea() {
        return (ArrayList<Tarea>) tareaRepository.findAll();
    }

}
