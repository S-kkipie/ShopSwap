package org.jda.shopswap.models.categorias;

import lombok.RequiredArgsConstructor;
import org.jda.shopswap.models.user.User;
import org.jda.shopswap.models.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/models/categorias")
public class CategoriasController {
    @Autowired
    private CategoriasRepository categoriasRepository;
    private final CategoriasService categoriasService;

    @PostMapping("/createCategory")
    public ResponseEntity createCategorias(@RequestBody Categorias categorias, @RequestHeader String authorization ) {
        Categorias categoria = categoriasService.createCategorias(categorias , authorization);
        if(categoria == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }
    @GetMapping("/all")
    public List<Categorias> getAllCategorias() { return categoriasRepository.findAll();
    }
    @PutMapping("/update/{id}")
    public ResponseEntity updateCategorias(@PathVariable Long id , @RequestBody Categorias categoryData, @RequestHeader String authorization) {
        try {
            Categorias updatedCategoria = categoriasService.updateCategorias(id, categoryData, authorization);
            return ResponseEntity.ok(updatedCategoria);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    @DeleteMapping("/delete/{id}")
    public void deleteCategorias(@PathVariable Long id) {
        categoriasRepository.deleteById(id);
    }


}
