package com.example.backend.controller;

import java.util.List;
import java.util.Optional;
import com.example.backend.model.Tarea;
import com.example.backend.repository.TareaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE,
        RequestMethod.PUT })
public class TareaController {

    public TareaController(TareaRepository tareaRepository) {
        this.tareaRepository = tareaRepository;
    }

    @Autowired
    private TareaRepository tareaRepository;

    @PostMapping("/create")
    public void createTarea(@RequestBody Tarea tarea) {
        tareaRepository.insert(tarea);

    }

    @DeleteMapping("/delete/{id}")
    public void deleteTarea(@PathVariable String id) {

        tareaRepository.deleteById(id);

    }

    @GetMapping("/list")
    public List<Tarea> listTarea() {

        return tareaRepository.findAll();

    }

    @RequestMapping(method = RequestMethod.PUT, value = "/update/{id}")
    public Tarea update(@PathVariable String id, @RequestBody Tarea tarea) {
        Optional<Tarea> optcontact = tareaRepository.findById(id);
        Tarea c = optcontact.get();
        if (tarea.getNombre() != null)
            c.setNombre(tarea.getNombre());

        tareaRepository.save(c);
        return c;
    }

}
