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

import com.isacivan.maps.KullaniciServer.model.Telefon;
import com.isacivan.maps.KullaniciServer.service.ITelefon;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/telefon")
public class TelefonController {
	
	@Autowired
	private ITelefon iTelefon;
	
	@GetMapping()
	public ResponseEntity<List<Telefon>> get(){
		List<Telefon> telefons = iTelefon.getAll();
		return new ResponseEntity<List<Telefon>>(telefons,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Telefon> getById(@PathVariable int id) {
		return new ResponseEntity<Telefon>(iTelefon.findById(id),HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<List<Telefon>> insert(@RequestBody List<Telefon> telefon) {
		try {
			iTelefon.insert(telefon);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping()
	public ResponseEntity<List<Telefon>> update(@RequestBody List<Telefon> telefon) {
		try {
			iTelefon.update(telefon);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping()
	@RequestMapping("/delete")
	public ResponseEntity<?> delete(@RequestBody int telefon_bil_id) {
		try {
			iTelefon.delete(telefon_bil_id);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}	
}
