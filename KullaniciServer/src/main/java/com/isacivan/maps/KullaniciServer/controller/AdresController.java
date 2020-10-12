package com.isacivan.maps.KullaniciServer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.isacivan.maps.KullaniciServer.model.Adres;
import com.isacivan.maps.KullaniciServer.service.IAdres;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/adres")
public class AdresController {
	
	@Autowired
	private IAdres iAdres;
	
	@GetMapping()
	public ResponseEntity<List<Adres>> get(){
		List<Adres> adres = iAdres.getAll();
		return new ResponseEntity<List<Adres>>(adres,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Adres> getById(@PathVariable int id) {
		return new ResponseEntity<Adres>(iAdres.findById(id),HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<List<Adres>> insert(@RequestBody List<Adres> adres) {
		try {
			iAdres.insert(adres);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping()
	public ResponseEntity<List<Adres>> update(@RequestBody List<Adres> adres) {
		try {
			iAdres.update(adres);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping()
	@RequestMapping("/delete")
	public ResponseEntity<?> delete(@RequestBody int adres_bil_id) {
		try {
			iAdres.delete(adres_bil_id);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
