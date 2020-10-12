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
import com.isacivan.maps.KullaniciServer.model.KayitBil;
import com.isacivan.maps.KullaniciServer.model.Telefon;
import com.isacivan.maps.KullaniciServer.request.kayitBilDel;
import com.isacivan.maps.KullaniciServer.service.IAdres;
import com.isacivan.maps.KullaniciServer.service.IKayitBil;
import com.isacivan.maps.KullaniciServer.service.ITelefon;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/kayit-bil")
public class KayitBilController {
	
	@Autowired
	private IKayitBil iKayitBil;
	
	@Autowired
	private IAdres iAdres;
	
	@Autowired
	private ITelefon iTelefon;
	
	@GetMapping()
	public ResponseEntity<List<KayitBil>> get(){
		List<KayitBil> mahalles = iKayitBil.getAll();
		return new ResponseEntity<List<KayitBil>>(mahalles,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<KayitBil> getById(@PathVariable int id) {
		return new ResponseEntity<KayitBil>(iKayitBil.findById(id),HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<KayitBil> insert(@RequestBody KayitBil kayitBil) {
		try {
			List<Adres> adres = kayitBil.getAdres();
			List<Telefon> telefons = kayitBil.getTelefons();
			kayitBil.setAdres(null);
			kayitBil.setTelefons(null);
			iKayitBil.insert(kayitBil);
			int id = kayitBil.getId();
			for (int i = 0; i < adres.size(); i++) {
				adres.get(i).setAdres_bil_id(id);
			}
			iAdres.insert(adres);
			for (int i = 0; i < telefons.size(); i++) {
				telefons.get(i).setTelefon_bil_id(id);
			}
			iTelefon.insert(telefons);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping
	public ResponseEntity<KayitBil> update(@RequestBody KayitBil kayitBil) {
		try {
			List<Adres> adres = kayitBil.getAdres();
			List<Telefon> telefons = kayitBil.getTelefons();
			kayitBil.setAdres(null);
			kayitBil.setTelefons(null);
			iKayitBil.update(kayitBil);
			int id = kayitBil.getId();
			for (int i = 0; i < adres.size(); i++) {
				adres.get(i).setAdres_bil_id(id);
			}
			iAdres.update(adres);
			for (int i = 0; i < telefons.size(); i++) {
				telefons.get(i).setTelefon_bil_id(id);
			}
			iTelefon.update(telefons);
			iKayitBil.update(kayitBil);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping()
	@RequestMapping("/delete")
	public ResponseEntity<?> delete(@RequestBody kayitBilDel kayitBil) {
		try {
			iTelefon.delete(kayitBil.getDelId());
			iAdres.delete(kayitBil.getDelId());
			iKayitBil.delete(kayitBil.getDelId());
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
